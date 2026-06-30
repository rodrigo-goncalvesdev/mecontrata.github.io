const valorInput = document.getElementById("valor");
const moedaOrigem = document.getElementById("moedaOrigem");
const moedaDestino = document.getElementById("moedaDestino");
const resultado = document.getElementById("resultado");

valorInput.addEventListener("input", converter);
moedaOrigem.addEventListener("change", converter);
moedaDestino.addEventListener("change", converter);

async function converter() {

    const valor = parseFloat(valorInput.value);

    if (isNaN(valor) || valor <= 0) {
        resultado.textContent = "Resultado";
        return;
    }

    if (moedaOrigem.value === moedaDestino.value) {

        const valorFormatado = new Intl.NumberFormat("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(valor);

        resultado.textContent =
            `${valorFormatado} ${moedaOrigem.value} = ${valorFormatado} ${moedaDestino.value}`;

        return;
    }

    try {

        const response = await fetch(
            `https://open.er-api.com/v6/latest/${moedaOrigem.value}`
        );

        if (!response.ok) {
            throw new Error("Erro ao acessar a API.");
        }

        const data = await response.json();

        console.log(data);

        if (data.result !== "success") {
            throw new Error("A API retornou erro.");
        }

        const taxa = data.rates[moedaDestino.value];

        if (!taxa) {
            throw new Error("Moeda não encontrada.");
        }

        const convertido = valor * taxa;

        const valorFormatado = new Intl.NumberFormat("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(valor);

        const convertidoFormatado = new Intl.NumberFormat("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(convertido);

        resultado.textContent =
            `${valorFormatado} ${moedaOrigem.value} = ${convertidoFormatado} ${moedaDestino.value}`;

    } catch (erro) {

        console.error("Erro:", erro);

        resultado.textContent =
            "Não foi possível obter a cotação.";

    }

}

function inverterMoedas() {

    const temp = moedaOrigem.value;
    moedaOrigem.value = moedaDestino.value;
    moedaDestino.value = temp;

    converter();

}
