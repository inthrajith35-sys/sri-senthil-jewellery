import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 3000);

app.set("trust proxy", 1);
app.use(express.json());

app.use((req, res, next) => {
  if (process.env.NODE_ENV === "production" && req.headers["x-forwarded-proto"] === "http") {
    return res.redirect(301, `https://${req.headers.host}${req.originalUrl}`);
  }

  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=(self)");

  if (process.env.NODE_ENV === "production") {
    res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  }

  next();
});

interface LiveRates {
  gold24k: number;
  gold22k: number;
  gold18k: number;
  silver: number;
  lastUpdated: string;
  source: string;
}

let cachedRates: LiveRates | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000;
const GOLD_API_BASE_URL = "https://www.goldapi.io/api";
const TROY_OUNCE_GRAMS = 31.1034768;

function getBackendApiKey(): string {
  const goldApiKey = process.env.GOLD_API_KEY;

  if (!goldApiKey || goldApiKey.trim().length === 0 || goldApiKey.includes("YOUR_")) {
    throw new Error("GOLD_API_KEY is missing from the backend .env file");
  }

  return goldApiKey.trim();
}

function getIndiaTimestamp(): string {
  return `${new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" })} IST`;
}

function toPricePerGram(data: any, metalLabel: string): number {
  const gramPrice = Number(data?.price_gram_24k);
  const ouncePrice = Number(data?.price);

  if (Number.isFinite(gramPrice) && gramPrice > 0) {
    return gramPrice;
  }

  if (Number.isFinite(ouncePrice) && ouncePrice > 0) {
    return ouncePrice / TROY_OUNCE_GRAMS;
  }

  console.error(`[rates] ${metalLabel} API response did not include a usable price`, data);
  throw new Error(`${metalLabel} API response did not include a usable price`);
}

async function fetchGoldApiMetal(symbol: "XAU" | "XAG", apiKey: string) {
  const endpoint = `${GOLD_API_BASE_URL}/${symbol}/INR`;
  console.log(`[rates] Fetching ${symbol}/INR from GoldAPI.io`);

  const response = await fetch(endpoint, {
    headers: {
      "x-access-token": apiKey,
      "Content-Type": "application/json",
    },
  });

  console.log(`[rates] GoldAPI.io ${symbol}/INR status: ${response.status}`);

  if (!response.ok) {
    const responseText = await response.text();
    console.error(`[rates] GoldAPI.io ${symbol}/INR failed`, {
      status: response.status,
      body: responseText.slice(0, 500),
    });
    throw new Error(`GoldAPI.io ${symbol}/INR failed with status ${response.status}`);
  }

  const data = await response.json();
  console.log(`[rates] GoldAPI.io ${symbol}/INR response received`, {
    hasPrice: Boolean(data?.price),
    hasGram24k: Boolean(data?.price_gram_24k),
  });

  return data;
}

async function fetchRates(): Promise<LiveRates> {
  const goldApiKey = getBackendApiKey();
  const [goldData, silverData] = await Promise.all([
    fetchGoldApiMetal("XAU", goldApiKey),
    fetchGoldApiMetal("XAG", goldApiKey),
  ]);

  const gold24kPerGram = toPricePerGram(goldData, "Gold");
  const gold22kPerGram = Number(goldData?.price_gram_22k) || gold24kPerGram * 0.916;
  const gold18kPerGram = Number(goldData?.price_gram_18k) || gold24kPerGram * 0.75;
  const silverPerGram = toPricePerGram(silverData, "Silver");

  const liveRates: LiveRates = {
    gold24k: Math.round(gold24kPerGram),
    gold22k: Math.round(gold22kPerGram),
    gold18k: Math.round(gold18kPerGram),
    silver: Math.round(silverPerGram * 10) / 10,
    lastUpdated: getIndiaTimestamp(),
    source: "GoldAPI.io Live",
  };

  console.log("[rates] Live rates parsed successfully", liveRates);
  return liveRates;
}

app.get("/api/rates", async (req, res) => {
  const now = Date.now();

  if (cachedRates && now - lastFetchTime < CACHE_DURATION) {
    console.log("[rates] Returning cached rates");
    return res.json(cachedRates);
  }

  try {
    console.log("[rates] Cache expired or empty. Fetching fresh rates.");
    const freshRates = await fetchRates();
    cachedRates = freshRates;
    lastFetchTime = now;
    return res.json(freshRates);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown rate fetch error";
    console.error("[rates] Failed to load live gold and silver rates", e);
    return res.status(502).json({
      error: "Failed to load live gold and silver rates",
      details: message,
      lastUpdated: getIndiaTimestamp(),
    });
  }
});

app.get("/api/live-rates", (req, res) => {
  res.redirect(307, "/api/rates");
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath, {
      index: false,
      maxAge: "1y",
      immutable: true,
      setHeaders: (res, filePath) => {
        if (/\.(html|xml|txt|webmanifest)$/i.test(filePath)) {
          res.setHeader("Cache-Control", "public, max-age=300");
        }
      },
    }));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server started on http://localhost:${PORT}`);
    console.log("Rates endpoint available at GET /api/rates");
  });
}

startServer();
