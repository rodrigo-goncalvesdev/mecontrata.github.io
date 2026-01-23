async function cadastrar() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirm = document.getElementById("confirmPassword").value;
  const error = document.getElementById("error");

  error.textContent = "";

  if (!email || !password || !confirm) {
    error.textContent = "Preencha todos os campos";
    return;
  }

  if (password !== confirm) {
    error.textContent = "As senhas não coincidem";
    return;
  }

  try {
    const res = await fetch("http://localhost:3000/register", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    email,
    password
  })
})
    const data = await res.json();

    if (!data.success) {
      error.textContent = data.message;
    } else {
      alert("Conta criada com sucesso!");
      window.location.href = "login.html";
    }
  } catch (e) {
    error.textContent = "Erro ao conectar com o servidor";
  }

  function validarFormulario() {
  const email = emailInput.value.trim();
  const senha = senhaInput.value;
  const confirmacao = confirmInput.value;

  botao.disabled = !(email && senha && senha === confirmacao);
}

emailInput.addEventListener("input", validarFormulario);
senhaInput.addEventListener("input", validarFormulario);
confirmInput.addEventListener("input", validarFormulario);

}
