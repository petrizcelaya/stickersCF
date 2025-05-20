let zIndexCounter = 1;

function addSticker(imageName) {
  const canvas = document.getElementById("canvas");
  const sticker = document.createElement("img");

  sticker.src = imageName;
  sticker.className = "sticker";
  sticker.style.position = "absolute";
  sticker.style.top = "150px";
  sticker.style.left = "250px";
  sticker.style.zIndex = zIndexCounter++;
  sticker.style.transform = "rotate(0deg)";
  sticker.dataset.rotation = "0"; // Guarda el ángulo actual

  let offsetX, offsetY, isDragging = false;

  sticker.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
    sticker.style.zIndex = zIndexCounter++;
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    if (e.altKey) {
      // ROTAR
      const rect = sticker.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const angleRad = Math.atan2(e.clientY - centerY, e.clientX - centerX);
      const angleDeg = angleRad * (180 / Math.PI);

      sticker.style.transform = `rotate(${angleDeg}deg)`;
      sticker.dataset.rotation = angleDeg;
      
    } else {
      // MOVER
      sticker.style.left = `${e.pageX - canvas.offsetLeft - offsetX}px`;
      sticker.style.top = `${e.pageY - canvas.offsetTop - offsetY}px`;
    }
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });

  canvas.appendChild(sticker);
}

function downloadImage() {
  const canvas = document.getElementById("canvas");
  html2canvas(canvas).then(canvas => {
    const link = document.createElement("a");
    link.download = "mi-computadora-decorada.png";
    link.href = canvas.toDataURL();
    link.click();
  });
}

