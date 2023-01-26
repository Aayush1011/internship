let container = document.querySelector(".container");
const characters = {
  lowCase: Array.from(Array(26)).map((e, i) => String.fromCharCode(i + 97)),
  upCase: Array.from(Array(26)).map((e, i) => String.fromCharCode(i + 65)),
  num: Array.from(Array(10).keys()),
  symbols: [
    "`",
    "~",
    "!",
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "(",
    ")",
    "_",
    "-",
    "=",
    "+",
    "[",
    "]",
  ],
};
function createInput(inputType, id, labelText, checked = false) {
  let inputVar = document.createElement("input");
  inputVar.setAttribute("type", inputType);
  inputVar.setAttribute("id", id);
  if (checked) {
    inputVar.setAttribute("checked", "checked");
  }
  let inputVarLabel = document.createElement("label");
  inputVarLabel.setAttribute("for", id);
  inputVarLabel.innerText = labelText;
  return [inputVarLabel, inputVar];
}

function createDiv(className) {
  let newDiv = document.createElement("div");
  newDiv.classList.add(className);
  return newDiv;
}

let outerDiv = document.createElement("div");
outerDiv.classList.add("outer-div");
function pushToContainer(element, divName, pushContainer) {
  let newDiv = createDiv(divName);
  if (Array.isArray(element)) {
    for (let elem of element) {
      newDiv.appendChild(elem);
    }
  } else {
    newDiv.appendChild(element);
  }
  if (divName === "input-div") {
    outerDiv.appendChild(newDiv);
    pushContainer.appendChild(outerDiv);
    return;
  }
  pushContainer.appendChild(newDiv);
}

let title = document.createElement("h1");
title.classList.add("title");
title.innerText = "PASSWORD GENERATOR";
pushToContainer(title, "title-div", container);

let characterCount = document.createElement("input");
characterCount.setAttribute("type", "range");
characterCount.setAttribute("id", "characterCount");
characterCount.setAttribute("min", 10);
characterCount.setAttribute("max", 20);
characterCount.setAttribute("step", 1);
characterCount.setAttribute("value", 10);
characterCount.setAttribute(
  "oninput",
  "this.nextElementSibling.value = this.value"
);

let characterCountLabel = document.createElement("label");
characterCountLabel.setAttribute("for", "characterCount");
characterCountLabel.innerText = "Set password length between 10-20 characters";
let characterValue = document.createElement("output");
characterValue.innerText = "10";
pushToContainer(
  [characterCountLabel, characterCount, characterValue],
  "input-div",
  container
);

let lowerCaseCheckbox = createInput(
  "checkbox",
  "lowerCaseCheckbox",
  "Include Lowercase",
  true
);
pushToContainer(lowerCaseCheckbox, "input-div", container);

let upperCaseCheckbox = createInput(
  "checkbox",
  "upperCaseCheckbox",
  "Include Uppercase"
);
pushToContainer(upperCaseCheckbox, "input-div", container);

let numberCheckbox = createInput(
  "checkbox",
  "numberCheckbox",
  "Include Numbers"
);
pushToContainer(numberCheckbox, "input-div", container);

let specialCharactersCheckbox = createInput(
  "checkbox",
  "specialCharactersCheckbox",
  "Include Symbols"
);
pushToContainer(specialCharactersCheckbox, "input-div", container);

let pwdGenBtn = document.createElement("button");
pwdGenBtn.classList.add("pwd-gen-btn");
pwdGenBtn.innerText = "Generate Passwords";
pushToContainer(pwdGenBtn, "btnDiv", container);

let pwdDiv = document.createElement("div");
pwdDiv.classList.add("pwd-div");

let subTitle = document.createElement("h2");
subTitle.classList.add("subTitle");
subTitle.innerText = "Generated Passwords:";
pwdDiv.appendChild(subTitle);

const noOfPwd = 4;
for (let i = 0; i < noOfPwd; i++) {
  let pwd = document.createElement("p");
  pwd.classList.add(`pwd-${i}`);
  let singlePwdDiv = document.createElement("div");
  singlePwdDiv.classList.add("single-pwd-div");
  singlePwdDiv.appendChild(pwd);
  pwdDiv.appendChild(singlePwdDiv);
}
container.appendChild(pwdDiv);

const charCount = document.querySelector("#characterCount");
const lowCase = document.querySelector("#lowerCaseCheckbox");
const upCase = document.querySelector("#upperCaseCheckbox");
const num = document.querySelector("#numberCheckbox");
const symbols = document.querySelector("#specialCharactersCheckbox");

let selectionObj = {
  lowCase: lowCase,
  upCase: upCase,
  num: num,
  symbols: symbols,
};
let selected = [];
for (let elem in selectionObj) {
  if (selectionObj[elem].checked) {
    selected = [...selected, ...characters[elem]];
  }
  selectionObj[elem].addEventListener("change", (Event) => {
    if (Event.currentTarget.checked) {
      selected = [...selected, ...characters[elem]];
    } else {
      selected.splice(
        selected.indexOf(characters[elem][0]),
        characters[elem].length
      );
    }
  });
}

const genPwd = document.querySelector(".pwd-gen-btn");
let pwds = [];
genPwd.addEventListener("click", (Event) => {
  for (let i = 0; i < noOfPwd; i++) {
    let pwd = "";
    for (let j = 0; j < charCount.value; j++) {
      pwd += selected[Math.floor(Math.random() * selected.length)];
    }
    document.querySelector(`.pwd-${i}`).innerText = pwd;
  }
  document.querySelector(".pwd-div").style.display = "flex";
});
