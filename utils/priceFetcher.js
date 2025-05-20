import axios from "axios";

export default async function fetchPrice(symbol) {
  const response = await axios.get(
    `https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=usd`
  );
  return response.data[symbol]?.usd || 0;
}
