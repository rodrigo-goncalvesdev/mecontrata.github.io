async function converter() {
    const valor = parseFloat(valorInput.value);

    if (!valor || valor <= 0) {
        resultado.textContent = "Resultado";
        return;
    }

    if (moedaOrigem.value === moedaDestino.value) {
        resultado.textContent =
            `${valor.toFixed(2)} ${moedaOrigem.value} = ${valor.toFixed(2)} ${moedaDestino.value}`;
        return;
    }

    try {
        const response = await fetch(
            `https://open.er-api.com/v6/latest/${moedaOrigem.value}`
        );

        const data = await response.json();

        const taxa = data.rates[moedaDestino.value];
        const convertido = valor * taxa;

        resultado.textContent =
            `${valor.toFixed(2)} ${moedaOrigem.value} = ${convertido.toFixed(2)} ${moedaDestino.value}`;

    } catch (erro) {
        resultado.textContent = "Erro ao buscar cotação.";
    }
}
