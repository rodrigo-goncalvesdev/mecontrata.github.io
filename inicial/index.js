document.addEventListener("DOMContentLoaded", () => {
    const noBtn = document.getElementById("noBtn");
    const overlay = document.getElementById("noOverlay");
    const buttons = document.getElementById("buttons");
    const yesBtn = document.getElementById("yesBtn");
    if (!noBtn || !overlay || !yesBtn) return;
let posX = 0;
let posY = 0;
function positionNoNextToYes() {
    const yesRect = yesBtn.getBoundingClientRect();
    const noRect  = noBtn.getBoundingClientRect();
    const gap = 40;
    posX = yesRect.right + gap;
    posY = yesRect.top + (yesRect.height - noRect.height) / 2;
    noBtn.style.left = "0";
    noBtn.style.top  = "0";
    noBtn.style.transform = `translate(${posX}px, ${posY}px)`;
}
window.addEventListener("load", positionNoNextToYes);
window.addEventListener("resize", positionNoNextToYes);
document.addEventListener("mousemove", e => check(e.clientX, e.clientY));
document.addEventListener("touchstart", e => {
    const t = e.touches[0];
    check(t.clientX, t.clientY);
});
function check(x, y) {
    const r = noBtn.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    if (Math.hypot(x - cx, y - cy) < 90) {
        flee();
    }
}
//fuga segura
function flee() {
    const pad = 16;
    const area = overlay.getBoundingClientRect();
    const btn  = noBtn.getBoundingClientRect();
    const maxX = area.width  - btn.width  - pad;
    const maxY = area.height - btn.height - pad;
    posX = Math.random() * maxX + pad;
    posY = Math.random() * maxY + pad;
    noBtn.style.transform = `translate(${posX}px, ${posY}px)`;
}
const binaryBg = document.getElementById("binaryBg");
const chars = ["0", "1"];
const columns = Math.floor(window.innerWidth / 20); //não remover, pois tira um bug que dá as vezes no começo!
function createBinary() {
    const span = document.createElement("span");
    span.classList.add("binary");
    span.textContent = chars[Math.floor(Math.random() * chars.length)];
    span.style.left = `${Math.random() * 100}vw`;
    span.style.fontSize = `${14 + Math.random() * 10}px`;
    span.style.animationDuration = `${6 + Math.random() * 6}s`;
    span.style.opacity = Math.random() * 0.4 + 0.1;
    binaryBg.appendChild(span);
    setTimeout(() => {
        span.remove();
    }, 12000);
}
setInterval(createBinary, 60);
window.addEventListener("resize", () => {
    binaryBg.innerHTML = "";
});
yesBtn.addEventListener("click", () => {
    window.location.href = "./sim.html";
});
});