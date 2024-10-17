
const cotacao = document.getElementById('cotacao');

let valCotacao;

// Função para obter o preço atual do Dogecoin
async function getDogecoinPrice() {
    try {

        const response = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=DOGEUSDT');
        const data = await response.json();

        return parseFloat(data.price);  

    } catch (error) {

        console.error('Erro ao recuperar o preço do Dogecoin:', error);
        throw error;
		
    }
}

// Função principal para executar
async function displayPrice() {
  try {

	setInterval(async () => {

		// Chama a função e aguarda o preço
		const price = await getDogecoinPrice();  
		cotacao.innerHTML = price

		// Verifica se preço subiu ou caiu e troca a cor do texto
		if (price > valCotacao) {

            cotacao.classList.remove('text-danger', 'text-success');
            cotacao.classList.add('text-success');

        } else {

            cotacao.classList.remove('text-danger', 'text-success');
            cotacao.classList.add('text-danger');

        }

		valCotacao = price;

	}, 3000);



  } catch (error) {

    console.error('Erro ao executar o script:', error);

  }
}

// Chama a função principal
displayPrice();
