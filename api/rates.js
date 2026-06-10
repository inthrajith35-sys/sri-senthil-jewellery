const GOLD_API_BASE_URL = "https://www.goldapi.io/api";
const TROY_OUNCE_GRAMS = 31.1034768;

function getIndiaTimestamp() {
  return `${new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" })} IST`;
}

function pricePerGram(data, metalLabel) {
  const gramPrice = Number(data?.price_gram_24k);
  const ouncePrice = Number(data?.price);

  if (Number.isFinite(gramPrice) && gramPrice > 0) {
    return gramPrice;
  }

  if (Number.isFinite(ouncePrice) && ouncePrice > 0) {
    return ouncePrice / TROY_OUNCE_GRAMS;
  }

  throw new Error(`${metalLabel} response did not include a usable price`);
}

async function fetchMetal(symbol, apiKey) {
  const response = await fetch(`${GOLD_API_BASE_URL}/${symbol}/INR`, {
    headers: {
      "x-access-token": apiKey,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`GoldAPI.io ${symbol}/INR failed with status ${response.status}: ${body.slice(0, 200)}`);
  }

  return response.json();
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({
      error: "Method not allowed",
      details: "Use GET /api/rates",
      lastUpdated: getIndiaTimestamp(),
    });
  }

  const apiKey = process.env.GOLD_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: "Gold rate API key is not configured",
      details: "Set GOLD_API_KEY in Vercel Project Settings > Environment Variables.",
      lastUpdated: getIndiaTimestamp(),
    });
  }

  try {
    const goldData = await fetchMetal("XAU", apiKey);
    const gold24kPerGram = pricePerGram(goldData, "Gold");
    const gold22kPerGram = Number(goldData?.price_gram_22k) || gold24kPerGram * 0.916;
    const gold18kPerGram = Number(goldData?.price_gram_18k) || gold24kPerGram * 0.75;

    let silverPerGram = null;
    let silverError = null;

    try {
      const silverData = await fetchMetal("XAG", apiKey);
      silverPerGram = pricePerGram(silverData, "Silver");
    } catch (error) {
      silverError = error instanceof Error ? error.message : "Silver rate unavailable";
    }

    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=600");

    return res.status(200).json({
      gold24k: Math.round(gold24kPerGram),
      gold22k: Math.round(gold22kPerGram),
      gold18k: Math.round(gold18kPerGram),
      silver: Number.isFinite(silverPerGram) ? Math.round(silverPerGram * 10) / 10 : null,
      lastUpdated: getIndiaTimestamp(),
      source: "GoldAPI.io Live",
      ...(silverError ? { silverError } : {}),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown GoldAPI.io error";

    return res.status(502).json({
      error: "Failed to load live gold and silver rates",
      details: message,
      lastUpdated: getIndiaTimestamp(),
    });
  }
}
