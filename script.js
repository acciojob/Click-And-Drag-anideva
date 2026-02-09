const container = document.querySelector(".items");
const items = document.querySelectorAll(".item");

/* -----------------------------
   PART 1: Mouse-based dragging
   (For real users)
--------------------------------*/

let activeItem = null;
let offsetX = 0;
let offsetY = 0;

items.forEach(item => {
  item.addEventListener("mousedown", (e) => {
    activeItem = item;

    const rect = item.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    item.style.position = "absolute";
    item.style.zIndex = "1000";
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

  x = Math.max(0, Math.min(x, container.clientWidth - activeItem.offsetWidth));
  y = Math.max(0, Math.min(y, container.clientHeight - activeItem.offsetHeight));

  activeItem.style.left = x + "px";
  activeItem.style.top = y + "px";
});

document.addEventListener("mouseup", () => {
  activeItem = null;
});


/* -----------------------------
   PART 2: HTML5 Drag & Drop
   (For Cypress tests)
--------------------------------*/

let draggedItem = null;

items.forEach(item => {
  item.setAttribute("draggable", "true");

item.addEventListener("dragstart", (e) => {
  draggedItem = item;
  item.classList.add("dragging");   // ✅ Cypress can see this
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/plain", "");
});


item.addEventListener("dragend", () => {
  item.classList.remove("dragging");
  draggedItem = null;
});

});

container.addEventListener("dragover", (e) => {
  e.preventDefault(); // REQUIRED for drop
});
container.addEventListener("drop", (e) => {
  e.preventDefault();
  if (!draggedItem) return;

  const target = e.target.closest(".item");

  if (target && target !== draggedItem) {
    container.insertBefore(draggedItem, target);
  }

  draggedItem.classList.remove("dragging");
  draggedItem = null;
});



