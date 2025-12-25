const container = document.querySelector(".items");
const items = document.querySelectorAll(".item");

let activeItem = null;
let offsetX = 0;
let offsetY = 0;

items.forEach(item => {
  item.addEventListener("mousedown", (e) => {
    activeItem = item;

    const rect = item.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    // Mouse offset inside the item
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    // Switch to absolute positioning
    item.style.position = "absolute";
    item.style.zIndex = 1000;

    // Move item inside container coordinate system
    item.style.left = rect.left - containerRect.left + "px";
    item.style.top = rect.top - containerRect.top + "px";

    container.appendChild(item);
  });
});

document.addEventListener("mousemove", (e) => {
  if (!activeItem) return;

  const containerRect = container.getBoundingClientRect();

  let x = e.clientX - containerRect.left - offsetX;
  let y = e.clientY - containerRect.top - offsetY;

  // Boundary constraints
  x = Math.max(0, Math.min(x, container.clientWidth - activeItem.offsetWidth));
  y = Math.max(0, Math.min(y, container.clientHeight - activeItem.offsetHeight));

  activeItem.style.left = x + "px";
  activeItem.style.top = y + "px";
});

document.addEventListener("mouseup", () => {
  if (activeItem) {
    activeItem.style.zIndex = 1;
    activeItem = null;
  }
});
