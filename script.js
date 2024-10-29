const container = document.getElementById('container');
const graphic = document.getElementById('graphic');

let scale = 1;
let startX, startY, isPanning = false;
let translateX = 0;
let translateY = 0;

window.onload = () => {
    const rect = graphic.getBoundingClientRect();
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    // Calculate scale to fit the image within the viewport
    const widthScale = containerWidth / rect.width;
    const heightScale = containerHeight / rect.height;
    scale = Math.min(widthScale, heightScale); // Use the smaller scale to fit
    graphic.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
};

container.addEventListener('mousedown', (e) => {
    startX = e.clientX;
    startY = e.clientY;
    isPanning = true;
    container.style.cursor = 'grabbing';
});

container.addEventListener('mousemove', (e) => {
    if (!isPanning) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    translateX += dx;
    translateY += dy;
    graphic.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    startX = e.clientX;
    startY = e.clientY;
});

container.addEventListener('mouseup', () => {
    isPanning = false;
    container.style.cursor = 'grab';
});

container.addEventListener('mouseleave', () => {
    isPanning = false;
    container.style.cursor = 'grab';
});

container.addEventListener('wheel', (e) => {
    e.preventDefault();
    const zoomFactor = 0.1;
    const rect = graphic.getBoundingClientRect();

    // Calculate mouse position relative to the graphic
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Calculate new scale
    const newScale = scale + (e.deltaY > 0 ? -zoomFactor : zoomFactor);
    if (newScale < 0.1) return; // Prevent zooming out too much

    // Adjust translation to zoom in/out from the mouse position
    const zoom = newScale / scale;
    translateX -= (mouseX * (zoom - 1));
    translateY -= (mouseY * (zoom - 1));

    scale = newScale;
    graphic.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
});