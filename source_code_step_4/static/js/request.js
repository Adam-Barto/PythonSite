export function getData(endpoint, callback) {
  const request = new XMLHttpRequest(); //Updates the Webpage without reloading it.
  request.onreadystatechange = () => { //Let it cook, wait for a change
    if (request.readyState === 4) {
        //Holds the status of the XMLHttpRequest.
        //0: request not initialized
        //1: server connection established
        //2: request received
        //3: processing request
        //4: request finished and response is ready
      callback(request.response); //This passes the Request response(the data to display) to the function
    }
  };
  // This gets the endpoint data.
  // 'api/people' was printed out with document.write()
  // document.write() is not recommended, can overwrite the page
  // console.log() will print out the the terminal in the dev tools of the browser
  // console.log(endpoint)
  //console.log(callback) //WHat is callback? It's a function. showResponse() in debug.js
  request.open("GET", endpoint);
  request.send();
}

export function sendForm(form, action, endpoint, callback) {
  const formData = new FormData(form); //This is the HTML code of _person_create_form.html
  //console.log(form)
  const dataJSON = JSON.stringify(Object.fromEntries(formData)); //This is the code simplified into JSON
  //console.log(dataJSON)
  const request = new XMLHttpRequest();
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      callback(request.response, form);
    }
  };
  request.open(action, endpoint);
  request.setRequestHeader("Content-Type", "application/json");
  request.send(dataJSON);
}
