import { getData } from "./request.js";

export class DebugForm {
  constructor() {
    this.debugCard = document.querySelector(".debug-card");
    this.form = this.debugCard.querySelector(".debug-form");
    this.clearButton = this.form.querySelector("button[data-action='clear']");
    this.clearButton.addEventListener(
      "click",
      this.handleClearClick.bind(this)
    );
    this.sendButton = this.form.querySelector("button[data-action='read']");
    this.sendButton.addEventListener("click", this.handleSendClick.bind(this));
  }

  handleClearClick(event) {
    event.preventDefault();
    let code = this.debugCard.querySelector("code");
    code.innerText = "";
  }

  handleSendClick(event) {
    event.preventDefault();
    const input = document.querySelector(".debug-card input");
    // And this is where endpoint is set then passed to the GetData part of Requests
    const endpoint = input.value;
    getData(endpoint, this.showResponse);
  }
// sets the data up!
  showResponse(data) {

    console.log('From Show Response in debug.js')
    console.log(data)

    const debugCard = document.querySelector(".debug-card");
    let code = debugCard.querySelector("code");
    code.innerText = data;
  }
}
