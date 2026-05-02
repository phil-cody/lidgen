const reviewBlocks = document.querySelectorAll(".review__block");

reviewBlocks.forEach((block) => {
  const content = block.querySelector(".review__text");
  if (!content) return;

  block.addEventListener("click", () => {
    const isActive = block.classList.contains("active");

    reviewBlocks.forEach((b) => {
      b.classList.remove("active");

      const el = b.querySelector(".review__text");
      if (el) el.style.maxHeight = "0px";
    });

    if (!isActive) {
      block.classList.add("active");

      requestAnimationFrame(() => {
        content.style.maxHeight = content.scrollHeight + "px";
      });
    }
  });
});