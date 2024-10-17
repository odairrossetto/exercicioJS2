
const cotacao = document.getElementById('cotacao');

let valCotacao;
let valMedia;
let valSaldo = 1000;

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

function listarAtivos() {

	let url = "http://localhost:3001/carteira";

	fetch(url)
		.then(response => response.json())
		.then(saida => {
			let tbody = document.getElementById("tabela");
			tbody.innerHTML = "";

			for (let i = 0; i < saida.length; i++) {

				// criando a linha
				let linha = document.createElement("tr");
				
				// criando as colunas
				let c1 = document.createElement("td");
				c1.textContent = saida[i].cotacao;

				let c2 = document.createElement("td");
				c2.textContent = saida[i].quantidade;
				
				let c3 = document.createElement("td");
				c3.textContent = saida[i].data;

				linha.appendChild(c1);
				linha.appendChild(c2);
				linha.appendChild(c3);			

				tabela.appendChild(linha);
			}

		});
}

function atualizaSaldo(quantidade) {

	let saldo = document.getElementById("saldo");

	valSaldo -= quantidade;
	saldo.innerHTML = valSaldo;

}

function calculaPrecoMedio() {

	let url = "http://localhost:3001/carteira";

	fetch(url)
		.then(response => response.json())
		.then(saida => {

			let tmpQuantidade = 0;
			let tmpCotacao = 0;

			let prMedio = document.getElementById("prMedio");
			prMedio.innerHTML = "";

			// Calcula Total da carteira e soma dos preços
			for (let i = 0; i < saida.length; i++) {

				tmpQuantidade += parseFloat(saida[i].quantidade);
				tmpCotacao += parseFloat(saida[i].cotacao) * parseFloat(saida[i].quantidade);

			}

			//calcula média
			valMedia = tmpCotacao / tmpQuantidade;
			prMedio.innerHTML = parseFloat(valMedia);

		});
}
// Ação do botão comprar
document.getElementById("comprar").addEventListener("click", function () {

	let quantidade = document.getElementById("quantidade").value;
	let cotacao = document.getElementById("cotacao").value;

	// endpoint
	let url = "http://localhost:3001/carteira";

	let body = JSON.stringify({
		cotacao: valCotacao,
		quantidade: quantidade,
		data: new Date()
	});

	fetch(url, {
		method: 'POST',
		body: body,
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json"
		}
	})
		.then(res => res.json())
		.then(x => {

			calculaPrecoMedio();
			atualizaSaldo(quantidade);
			listarAtivos();

			window.alert('Compra realizada com sucesso!');
		})
		.catch(e => window.alert(e))
});

document.getElementById("vender").addEventListener("click", function () {

	let url = "http://localhost:3001/carteira";

	fetch(url)
		.then(response => response.json())
		.then(saida => {
			let tbody = document.getElementById("tabela");
			tbody.innerHTML = "";

			const menorObjeto = saida.reduce((menor, atual) => {
				return atual.cotacao < menor.cotacao ? atual : menor;
			});

			console.log(menorObjeto);

		});

	// const params = new URLSearchParams(window.location.search);
	// const id = params.get("id");

	// let url = `http://localhost:3001/contatos/${id}`

	// fetch(url, {
	// 	method: 'DELETE',
	// 	headers: {
	// 		"Content-Type": "application/json",
	// 		"Accept": "application/json"
	// 	}
	// })
	// .then(res => res.json())
	// .then(x => {
	// 	window.alert('Contato REMOVIDO com sucesso');
	// 	window.location.href = '/contatos.html';
	// })
	// .catch(e => window.alert(e))

});



// inicializa o preço médio
calculaPrecoMedio()

// iniciaSaldo
atualizaSaldo(0)

// lista cartera
listarAtivos();

// atualiza preço do DodgeCoin
displayPrice();


