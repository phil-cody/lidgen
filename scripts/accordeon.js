const reviewBlocks = document.querySelectorAll(".review__block");

reviewBlocks.forEach((block) => {
  const content = block.querySelector(".review__text");
  if (!content) return;

  block.addEventListener("click", () => {
    const isOpen = content.style.maxHeight && content.style.maxHeight !== "0px";

    if (isOpen) {
      content.style.maxHeight = "0px";
      block.classList.remove("active");
      return;
    }

    reviewBlocks.forEach((b) => {
      const el = b.querySelector(".review__text");
      if (el) el.style.maxHeight = "0px";
      b.classList.remove("active");
    });

    block.classList.add("active");
    content.style.maxHeight = content.scrollHeight + "px";
  });
});