const WIDTH = 100; //in percentage
const HEIGHT = 35; //in vh
let container = document.querySelector(".carousel-container");
container.style.width = WIDTH + "%";
container.style.height = HEIGHT + "vh";
let imgContainer = document.querySelector(".carousel-image-wrapper");
let currentImage = 1;
let noOfImgs = imgContainer.children.length;
let imgTransition = true;

function addButton() {
  let btnObj = { left: "\u2039", right: "\u203A" };
  for (let elem in btnObj) {
    let newBtn = document.createElement("button");
    newBtn.classList.add(`arrow`);
    newBtn.classList.add(`${elem}-arrow`);
    newBtn.innerText = btnObj[elem];
    container.appendChild(newBtn);
  }
}

function addIndicator() {
  let indicatorDiv = document.createElement("div");
  indicatorDiv.classList.add("indicator-div");
  for (let i = 0; i < noOfImgs; i++) {
    let indicator = document.createElement("div");
    indicator.classList.add(`indicator`);
    indicator.classList.add(`indicator-${i + 1}`);
    indicator.innerText = i + 1;
    indicatorDiv.appendChild(indicator);
    imgContainer.children[i].classList.add(`img-${i + 1}`);
  }
  container.appendChild(indicatorDiv);
}

function addTransitionListener() {
  let timer = null;
  imgContainer.addEventListener("scroll", function () {
    if (timer != null) {
      clearTimeout(timer);
      imgTransition = false;
    }
    timer = setTimeout(function () {
      imgTransition = true;
    }, 500);
  });
}

/**
 * Slides individual slide in desired direction of either left or right or jumps to a desired slide
 *
 * @param {*} direction
 * @param {*} toPosition
 * @returns void
 */
function imageSlide(direction = null, toPosition = null) {
  if (imgTransition === true) {
    let image = document.querySelector(".img-1");
    if (direction == "left") {
      if (currentImage == 1) {
        currentImage = noOfImgs;
        imgContainer.scrollLeft += noOfImgs * image.offsetWidth;
        return;
      }
      imgContainer.scrollLeft -= image.offsetWidth;
      currentImage--;
    } else if (direction == "right") {
      if (currentImage == noOfImgs) {
        currentImage = 1;
        imgContainer.scrollLeft -= noOfImgs * image.offsetWidth;
        return;
      }
      imgContainer.scrollLeft += image.offsetWidth;
      currentImage++;
    } else {
      imgContainer.scrollLeft += toPosition * image.offsetWidth;
    }
  }
}

function runCarousel() {
  document.querySelector(".left-arrow").addEventListener("click", () => {
    imageSlide((direction = "left"));
  });

  document.querySelector(".right-arrow").addEventListener("click", () => {
    imageSlide((direction = "right"));
  });

  for (let i = 1; i <= noOfImgs; i++) {
    document.querySelector(`.indicator-${i}`).addEventListener("click", () => {
      imageSlide((direction = null), (toPosition = i - currentImage));
      currentImage = i;
    });
  }
}

function main() {
  window.onload = () => {
    setInterval(function () {
      imageSlide((direction = "right"));
    }, 2000);
  };
  addButton();
  addIndicator();
  addTransitionListener();
  runCarousel();
}

main();
