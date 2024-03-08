const request = document.getElementById("request");
const response = document.getElementById("response");

const typeBtn = document.getElementById("type-btn");
const executeBtn = document.getElementById("execute-btn");

/* document.getElementById("request").addEventListener("click", function () {
    this.selectionStart = 0;
    this.selectionEnd = 0;
  }); */

document.getElementById("request").addEventListener("keydown", function (e) {
  if (e.key === "Tab") {
    e.preventDefault();
    var start = this.selectionStart;
    var end = this.selectionEnd;

    // Insert tab character at caret position
    this.value =
      this.value.substring(0, start) + "\t" + this.value.substring(end);

    // Move caret position
    this.selectionStart = this.selectionEnd = start + 1;
  }
});

typeBtn.addEventListener("click", () => {
  const text = request.value;
  request.value = "";
  typeWriterEffect(request, text, 0, 10);
});

executeBtn.addEventListener("click", () => {
  /* eval(
      request.value.replace("https://www.fakeapis.io", "http://localhost:5000")
    ); */
  //eval(request.value);

  fetch("http://localhost:5000/rentals/login", {
    method: "POST",
    body: JSON.stringify({
      email: "user26@fakeapis.io",
      password: "F4k3ap1s.io",
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      fetch(
        "http://localhost:5000/rentals/favorite/a1dfbd24-54bc-43e7-b7ad-054a4a6026c7",
        {
          method: "DELETE",
          /* body: JSON.stringify({
          propertyId: "080ceac7-cc12-49d5-9278-f4ce8af8ce9e",
          rating: 5,
          text: "This is a review of the account: 3b85178f-768f-4a1b-b444-3d43f0ce6259",
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        }, */
          credentials: "include",
        }
      )
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          response.textContent = "";
          var p = document.createElement("p");
          p.textContent = "{";
          response.appendChild(p);
          iterateObject(json, 1);
          var p = document.createElement("p");
          p.textContent = "}";
          response.appendChild(p);
        });
    });

  /*   fetch("http://localhost:5000/rentals/login", {
    method: "POST",
    body: JSON.stringify({
      email: "user26@fakeapis.io",
      password: "F4k3ap1s.io",
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      response.textContent = "";
      var p = document.createElement("p");
      p.textContent = "{";
      response.appendChild(p);
      iterateObject(json, 1);
      var p = document.createElement("p");
      p.textContent = "}";
      response.appendChild(p);
    }); */
});

const showResponse = (json) => {
  response.textContent = "";
  var p = document.createElement("p");
  p.textContent = "{";
  response.appendChild(p);
  iterateObject(json, 1);
  var p = document.createElement("p");
  p.textContent = "}";
  response.appendChild(p);
};

const iterateObject = (obj, number) => {
  for (var key in obj) {
    if (Array.isArray(obj[key])) {
      var p = document.createElement("p");
      p.textContent = "\t".repeat(number) + key + ": [";
      response.appendChild(p);
      iterateObject(obj[key], number + 1); // Recursively call the function for nested objects
      var p = document.createElement("p");
      p.textContent = "\t".repeat(number) + "],";
      response.appendChild(p);
    } else if (typeof obj[key] === "object" && obj[key] !== null) {
      var p = document.createElement("p");
      p.textContent = "\t".repeat(number) + key + ": {";
      response.appendChild(p);
      iterateObject(obj[key], number + 1); // Recursively call the function for nested objects
      var p = document.createElement("p");
      p.textContent = "\t".repeat(number) + "},";
      response.appendChild(p);
    } else {
      if (obj.hasOwnProperty(key)) {
        var p = document.createElement("p"); // Create a paragraph element

        if (typeof obj[key] === "string") {
          p.textContent =
            "\t".repeat(number) + key + ": " + '"' + obj[key] + '",';
          response.appendChild(p);
        } else {
          p.textContent = "\t".repeat(number) + key + ": " + obj[key] + ",";
          response.appendChild(p);
        }
      }
    }
  }
};

async function typeWriterEffect(request, text, index, delay) {
  if (index < text.length) {
    request.value += text.charAt(index);
    index++;
    setTimeout(function () {
      typeWriterEffect(request, text, index, delay);
    }, delay);
  }
}
