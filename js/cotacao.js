const axios = require('axios');

// Função para obter o preço atual do Dogecoin
export async function getDogecoinPrice() {
  try {
	
    const response = await axios.get('https://api.binance.com/api/v3/ticker/price?symbol=DOGEUSDT');
    return response.data.price;

  } catch (error) {

    console.error('Erro ao recuperar o preço do Dogecoin:', error);
	throw error;

  }
}