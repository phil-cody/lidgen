const container = document.querySelector(".example__review");

container.addEventListener("click", (e) => {
  const block = e.target.closest(".review__block");
  if (!block) return;

  const content = block.querySelector(".review__text");
  if (!content) return;

  const isOpen = content.style.maxHeight && content.style.maxHeight !== "0px";

  document.querySelectorAll(".review__block").forEach((b) => {
    const el = b.querySelector(".review__text");
    if (el) el.style.maxHeight = "0px";
    b.classList.remove("active");
  });

  if (!isOpen) {
    block.classList.add("active");
    content.style.maxHeight = content.scrollHeight + "px";
  }
});