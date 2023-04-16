import { sendForm } from "./request.js";

export class People {
  constructor() {
    this.allPeopleCards = document.querySelectorAll(".person-card");
    this.activateCreateForm();
  }

  activateCreateForm() {
    const peopleForm = document.querySelector(".person-create-card form");
    new CreatePersonForm(peopleForm);
  }
}

class CreatePersonForm {
  constructor(el) {
    this.form = el;
    this.createButton = el.querySelector("button[data-action='create']");
    this.createButton.addEventListener(
      "click",
      this.handleCreateClick.bind(this)
    );
  }

  handleCreateClick(event) {
    event.preventDefault();
    sendForm(this.form, "POST", "/api/people", this.addPersonToList);
    this.form.reset();
  }

  addPersonToList(rawData) {
  // Lets see what this rawData is.

//  [Log] { (people.js, line 33)
//  "fname": "Cringe",
//  "id": 10,
//  "lname": "Machine",
//  "notes": [],
//  "timestamp": "2023-04-16T19:15:05.739636"
//}

    //console.log(rawData)
    const data = JSON.parse(rawData);
        //Simplifies it into JSON
    // console.log(document.querySelectorAll("*"))
        //This prints the entire html code of all pages combined into one
    const personCard = document.querySelector(".person-card").cloneNode(true); //clones it.
    const personContent = personCard.querySelector(".person-content"); //edit the clone.

    const personFirstName = personContent.querySelector("[data-person-fname]"); //This is a CSS Selector
    personFirstName.textContent = data.fname;
    personFirstName.setAttribute("data-person-fname", data.fname); //sets that value to that.

    const personLastName = personContent.querySelector("[data-person-lname]");
    personLastName.textContent = data.lname;
    personLastName.setAttribute("data-person-lname", data.lname);

    personCard.setAttribute("data-person-id", data.id);
    document.querySelector(".people-list").appendChild(personCard);
  }
}
