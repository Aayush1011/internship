const request = new XMLHttpRequest();
let data = `action=my_action_callback&parameter=1`;
request.open("POST", my_ajax_form.ajaxurl, true);
request.setRequestHeader(
  "Content-Type",
  "application/x-www-form-urlencoded; charset=UTF-8"
);

request.onload = function () {
  if (this.status >= 200 && this.status < 400) {
    console.log(this.response);
    var content = JSON.parse(this.response);
    console.log("HELLO");
    document
      .querySelector("selector")
      .insertAdjacentHTML("beforeend", content.content);
  } else {
    // console.log(this.status);
  }
};
document.querySelector(".cat-item").addEventListener("click", () => {
  console.log("click");
});
request.onerror = function () {
  // console.log('error');
};
request.send(data);
