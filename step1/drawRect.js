const canvas = document.getElementById("canvas");
const drawButton = document.querySelector(".draw");

drawButton.addEventListener("click", () => {
  drawCanvas();
});

function drawCanvas() {
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "red";
  ctx.fillRect(100, 100, 100, 100);
}
