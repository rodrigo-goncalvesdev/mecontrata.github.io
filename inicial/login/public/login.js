let etapa = 1;

async function avancar() {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const error = document.getElementById("error");

  const email = emailInput.value.trim();

  if (!email) {
    error.textContent = "Digite um email válido";
    return;
  }

  // ETAPA 1 — VERIFICAR EMAIL
  if (etapa === 1) {
    try {
      const res = await fetch("http://localhost:3000/check-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      if (!data.exists) {
        error.textContent = "Email não encontrado";
      } else {
        error.textContent = "";
        document.getElementById("passwordBox").style.display = "block";
        etapa = 2;
      }
    } catch (e) {
      error.textContent = "Erro ao conectar com o servidor";
    }
  }

  // ETAPA 2 — VALIDAR SENHA
  else {
    const password = passwordInput.value;

    if (!password) {
      error.textContent = "Digite sua senha";
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!data.success) {
        error.textContent = "Senha inválida. Tente novamente";
      } else {
        window.location.href = "success.html";
      }
    } catch (e) {
      error.textContent = "Erro ao conectar com o servidor";
    }
  }
}
