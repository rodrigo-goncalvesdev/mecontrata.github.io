const valorInput = document.getElementById("valor");
const moedaOrigem = document.getElementById("moedaOrigem");
const moedaDestino = document.getElementById("moedaDestino");
const resultado = document.getElementById("resultado");
valorInput.addEventListener("input", converter);
moedaOrigem.addEventListener("change", converter);
moedaDestino.addEventListener("change", converter);
async function converter() {
    const valor = valorInput.value;
    if (!valor || valor <= 0) {
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
            `https://api.frankfurter.app/latest?amount=${valor}&from=${moedaOrigem.value}&to=${moedaDestino.value}`
        );
        const data = await response.json();
        const convertido = data.rates[moedaDestino.value];
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
    } catch {
        resultado.textContent = "Erro ao buscar cotação.";
    }
}
function inverterMoedas() {
    const temp = moedaOrigem.value;
    moedaOrigem.value = moedaDestino.value;
    moedaDestino.value = temp;
    converter();
}