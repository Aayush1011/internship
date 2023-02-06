export function createHeader(container, titleName) {
  let header = document.createElement("div");
  header.classList.add("assignment-title");
  let title = document.createElement("h1");
  title.innerText = titleName;
  header.appendChild(title);
  container.appendChild(header);
}

export function createButton(container) {
  let leftDiv = document.createElement("div");
  leftDiv.classList.add("btn-div", "left-btn-div");
  let rightDiv = document.createElement("div");
  rightDiv.classList.add("btn-div", "right-btn-div");
  let leftButton = document.createElement("button");
  leftButton.innerText = "\u003C";
  leftButton.classList.add("arrow", "left-arrow");
  let rightButton = document.createElement("button");
  rightButton.innerText = "\u003E";
  rightButton.classList.add("arrow", "right-arrow");
  let leftText = document.createElement("p");
  leftText.classList.add("btn-text", "left-btn-text");
  leftText.innerText = "Click Me!!!";
  let rightText = document.createElement("p");
  rightText.classList.add("btn-text", "right-btn-text");
  rightText.innerText = "Click Me!!!";
  leftDiv.appendChild(leftButton);
  leftDiv.appendChild(leftText);
  rightDiv.appendChild(rightButton);
  rightDiv.appendChild(rightText);
  container.appendChild(leftDiv);
  container.appendChild(rightDiv);
}

export function createSlides(container, assignments, links) {
  let slides = document.createElement("div");
  slides.classList.add("slides");
  for (let i = 0; i < assignments.length; i++) {
    let slide = document.createElement("div");
    slide.classList.add("slide", `slide-${i}`);
    let title = document.createElement("h2");
    title.innerText = assignments[i];
    slide.appendChild(title);
    let keys = Object.keys(links[i]);
    let values = Object.values(links[i]);
    for (let j = 0; j < keys.length; j++) {
      let btn = document.createElement("a");
      btn.innerText = keys[j];
      btn.setAttribute("href", values[j]);
      btn.classList.add("button");
      slide.appendChild(btn);
    }
    slides.append(slide);
  }
  container.appendChild(slides);
}

export function addButtonClick(currentSlide, assignments) {
  let slides = document.querySelector(".slides");
  let rightDiv = document.querySelector(".right-btn-div");
  let leftDiv = document.querySelector(".left-btn-div");
  let rightButton = document.querySelector(".right-arrow");
  let leftButton = document.querySelector(".left-arrow");
  let leftText = document.querySelector(".left-btn-text");
  let rightText = document.querySelector(".right-btn-text");
  function checkDisabled(assignments) {
    if (currentSlide == 0) {
      leftButton.disabled = true;
      leftText.style.opacity = 0.3;
    }
    if (currentSlide == assignments.length - 1) {
      rightButton.disabled = true;
      rightText.style.opacity = 0.3;
    }
    if (currentSlide > 0 && currentSlide < assignments.length - 1) {
      leftButton.disabled = false;
      leftText.style.opacity = 1;
      rightButton.disabled = false;
      rightText.style.opacity = 1;
    }
  }
  rightDiv.addEventListener("click", () => {
    let slide = document.querySelector(`.slide-${currentSlide}`);
    const slideWidth = slide.offsetWidth;
    slides.scrollLeft += slideWidth;
    currentSlide++;
    checkDisabled(assignments);
  });

  leftDiv.addEventListener("click", () => {
    let slide = document.querySelector(`.slide-${currentSlide}`);
    const slideWidth = slide.offsetWidth;
    slides.scrollLeft -= slideWidth;
    currentSlide--;
    checkDisabled(assignments);
  });
  checkDisabled(assignments);
}
