document.addEventListener("DOMContentLoaded", () => {
    const binaryBg = document.getElementById("binaryBg");
    const chars = ["0", "1"];
    function createBinary() {
        const span = document.createElement("span");
        span.className = "binary";
        span.textContent = chars[Math.floor(Math.random() * chars.length)];
        const duration = 6 + Math.random() * 6;
        span.style.left = Math.random() * window.innerWidth + "px";
        span.style.fontSize = 14 + Math.random() * 10 + "px";
        span.style.opacity = Math.random() * 0.4 + 0.2;
        span.style.animation = `fall ${duration}s linear forwards`;
        binaryBg.appendChild(span);
        span.addEventListener("animationend", () => span.remove());
    }
    setInterval(createBinary, 60);
});
function goTo(path) {
window.location.href = path;
}
//BOTÃO PARA VOLTAR À TELA INICIAL
//function goBack() {
//    window.location.href = "inicial.html";
//}