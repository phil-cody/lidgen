const sliderArr = Array.from(document.querySelectorAll(".slider"));
const prevArr = Array.from(document.querySelectorAll(".button__prev"));
const nextArr = Array.from(document.querySelectorAll(".button__next"));

const fault = 4;

for (let i = 0; i < sliderArr.length; i++) {
  const cards = Array.from(sliderArr[i].children);
  const prev = prevArr[i];
  const next = nextArr[i];

  if (sliderArr[i].scrollLeft <= fault) {
    prev.disabled = true;
  }

  sliderArr[i].addEventListener("scroll", () => {
    let sliderWidth = sliderArr[i].scrollWidth;
    let viewSliderWidth = sliderArr[i].clientWidth;
    const style = getComputedStyle(sliderArr[i]);
    const paddingLeft = parseFloat(style.paddingLeft);

    const maxScroll = sliderWidth - viewSliderWidth + paddingLeft;

    if (maxScroll <= 0) {
      next.disabled = true;
      prev.disabled = true;
      return;
    }

    if (sliderArr[i].scrollLeft >= maxScroll - fault) {
      next.disabled = true;
    } else if (sliderArr[i].scrollLeft <= fault) {
      prev.disabled = true;
    } else {
      next.disabled = false;
      prev.disabled = false;
    }
  });

  prev.addEventListener("click", () => {
    let target = null;

    const sliderRect = sliderArr[i].getBoundingClientRect();

    for (let j = cards.length - 1; j >= 0; j--) {
      const card = cards[j];
      const cardRect = card.getBoundingClientRect();

      if (cardRect.left < sliderRect.left - fault) {
        target = card;
        break;
      }
    }

    if (!target) return;

    const slider = sliderArr[i];

    const targetRect = target.getBoundingClientRect();

    const style = getComputedStyle(slider);
    const paddingLeft = parseFloat(style.paddingLeft);

    const delta = targetRect.left - sliderRect.left;

    const newScroll = slider.scrollLeft + delta - paddingLeft;

    sliderArr[i].scrollTo({
      left: newScroll,
      behavior: "smooth",
    });
  });

  next.addEventListener("click", () => {
    let target = null;

    const sliderRect = sliderArr[i].getBoundingClientRect();

    for (let j = 0; j < cards.length; j++) {
      const card = cards[j];
      const cardRect = card.getBoundingClientRect();

      const style = getComputedStyle(sliderArr[i]);
      const paddingLeft = parseFloat(style.paddingLeft);

      if (cardRect.left > sliderRect.left + paddingLeft + fault) {
        target = card;
        break;
      }
    }

    if (!target) return;

    const slider = sliderArr[i];

    const targetRect = target.getBoundingClientRect();

    const style = getComputedStyle(slider);
    const paddingLeft = parseFloat(style.paddingLeft);

    const delta = targetRect.left - sliderRect.left;

    const newScroll = slider.scrollLeft + delta - paddingLeft;

    sliderArr[i].scrollTo({
      left: newScroll,
      behavior: "smooth",
    });
  });
}
