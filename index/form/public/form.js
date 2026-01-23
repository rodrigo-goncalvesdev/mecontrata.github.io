document.getElementById("nascimento").addEventListener("change", e => {
  const nasc = new Date(e.target.value);
  const hoje = new Date();
  let idade = hoje.getFullYear() - nasc.getFullYear();
  const m = hoje.getMonth() - nasc.getMonth();
  if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) {
    idade--;
  }
  document.getElementById("idade").textContent = `Idade: ${idade} anos`;
});

//CEP
document.getElementById("cep").addEventListener("blur", async () => {
  const cepInput = document.getElementById("cep");
  const enderecoInput = document.getElementById("endereco");
  const cep = cepInput.value.replace(/\D/g, "");
  if (cep.length !== 8) {
    enderecoInput.value = "";
    return;
  }
  try {
    const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await res.json();
    if (!data.erro) {
      enderecoInput.value =
        `${data.logradouro}, ${data.bairro} - ${data.localidade}/${data.uf}`;
    } else {
      enderecoInput.value = "";
    }
  } catch {
    enderecoInput.value = "";
  }
});
async function salvar() {
  const nome = document.getElementById("nome").value.trim();
  const cpf = document.getElementById("cpf").value.replace(/\D/g, "");
  const email = document.getElementById("email").value.trim();
  const nascimento = document.getElementById("nascimento").value;
  const cep = document.getElementById("cep").value.replace(/\D/g, "");
  const endereco = document.getElementById("endereco").value.trim();
  const error = document.getElementById("error");
  const cpfError = document.getElementById("cpfError");
  error.textContent = "";
  cpfError.textContent = "";
  if (!nome || !cpf || !email || !nascimento || !cep || !endereco) {
    error.textContent = "Preencha todos os campos";
    return;
  }
  try {   // Verificar CPF no back
    const cpfCheck = await fetch("http://localhost:3000/check-cpf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cpf })
    }).then(r => r.json());
    if (cpfCheck.exists) {
      cpfError.textContent = "CPF já cadastrado";
      return;
    }
  } catch {
    error.textContent = "Erro ao conectar com o servidor";
    return;
  }
  try {  // Salvar perfil
    const res = await fetch("http://localhost:3000/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome,
        cpf,
        email,
        nascimento,
        cep,
        endereco
      })
    });
    const data = await res.json();
    if (data.success) {
      alert("Cadastro realizado com sucesso!");
    } else {
      error.textContent = data.message;
    }
  } catch {
    error.textContent = "Erro ao conectar com o servidor";
  }
}