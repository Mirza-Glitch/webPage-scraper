window.onscroll = function () {
  scrollFunction();
};

let goTopBtn = document.getElementById("#goToTop");

function scrollFunction() {
  if (document.documentElement.scrollTop > 400) {
    goToTop.style.opacity = "1";
  } else {
    goToTop.style.opacity = "0";
  }
}
function goTop() {
  document.documentElement.scrollTop = 0;
}

//navbar appear code

let navBtnCh = document.querySelector("#nav-button-check");
let navb = document.querySelector("#nav");
let ToolsBtn = document.querySelector("#tools-check");

navBtnCh.addEventListener("click", function checkNav() {
  if (navBtnCh.checked === true) {
    navb.style.height = "300px";
  } else {
    navb.style.height = "0";
    ToolsBtn.checked = false;
  }
});

// get all the navigation links
const navLinks = document.querySelectorAll("#nav a");

// set the default active link to 'Home'
navLinks[0].classList.add("active-link");

// loop through the links and add click event listeners
navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    // remove the active class from all links
    navLinks.forEach((link) => link.classList.remove("active-link"));

    // add the active class to the clicked link
    this.classList.add("active-link");
  });
});

// For inline tool  Ul
const myEl = document.getElementById("tool-check");
const Ico = document.getElementById("upDownIco");
let checkedMyEl = false;

let arrowUp = `<i class="fa fa-angle-up" aria-hidden="true"></i>`;

let arrowDown = `<i class="fa fa-angle-down" aria-hidden="true"></i>`;

Ico.innerHTML = arrowDown;

myEl.addEventListener("change", function (event) {
  checkedMyEl = !checkedMyEl;
  if (checkedMyEl) {
    myEl.checked = true;
    Ico.innerHTML = arrowUp;
  } else {
    myEl.checked = false;
    Ico.innerHTML = arrowDown;
  }
});

navb.addEventListener("click", (e) => {
  let targetEl = e.target;
  myEl.checked.toggle = true;
  // clicked element
  if (targetEl == myEl) {
    return;
  } else {
    myEl.checked = false;
  }
});

/* Here comes js code for all the form logic */

let webPageUrl;
let customValue;
let optionValue;

let select = document.querySelector("#selectOption");
let arrowHtm = document.querySelector("#optArrow");
let options = document.querySelector("#options");
let hiddenInput = document.querySelector("#customValue");

select.addEventListener("click", function openOptions(e) {
  e.preventDefault();
  switch (options.style.display) {
    case "none":
      arrowHtm.innerHTML = `<i class="fa fa-angle-up" aria-hidden="true"></i>`;
      options.style.display = "flex";
      break;
    case "flex":
      arrowHtm.innerHTML = `<i class="fa fa-angle-down" aria-hidden="true"></i>`;
      options.style.display = "none";
      break;
    default:
      arrowHtm.innerHTML = `<i class="fa fa-angle-down" aria-hidden="true"></i>`;
      options.style.display = "flex";
  }
});

setOption("Links");
function setOption(val) {
  optionValue = val;
  arrowHtm.innerHTML = `<i class="fa fa-angle-down" aria-hidden="true"></i>`;
  document.getElementById("tagToSearch").innerText = val;
  options.style.display = "none";
  if (val == "Custom Value") {
    hiddenInput.style.display = "block";
  } else {
    hiddenInput.style.display = "none";
  }
}

function submitForm() {
  webPageUrl = document.querySelector("#pageUrl").value;
  customValue = document.querySelector("#htmlValue").value;
  let obj = {
    url: webPageUrl,
    customVal: customValue,
    option: optionValue,
  };
  if (checkFormData(obj)) {
    submitBtn.innerText = "fetching...";
    fetch("http://localhost:3000/api/scrape", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((r) => r.json())
      .then((data) => {
        setCodeHtml(data);
        submitBtn.innerText = "submit";
        console.log(data);
      })
      .catch((e) => {
        alert("an error occurred while fetching data\nPlease try again later");
        console.log(e);
      });
  }
}

function checkFormData(obj) {
  var expression =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  var regex = new RegExp(expression);

  if (!obj.url || !obj.url.match(regex)) {
    urlErr.style.display = "block";
    customValErr.style.display = "none";
    return;
  } else if (obj.option == "Custom Value" && !obj.customVal) {
    urlErr.style.display = "none";
    customValErr.style.display = "block";
    return;
  }
  customValErr.style.display = "none";
  urlErr.style.display = "none";
  return true;
}

function setCodeHtml(res) {
  let codeOne = document.querySelector("#code-doc-1");
  let codeTwo = document.querySelector("#code-doc-2");
  let codeThree = document.querySelector("#code-doc-3");
  let codeFour = document.querySelector("#code-doc-4");

  switch (res.Type) {
    case "link": {
      doctContent.style.display = "block";
      htmContent.style.display = "none";
      jsonContent.style.display = "block";
      textContent.style.display = "none";

      codeOne.innerText = res.Htm;
      codeTwo.innerText = "HTML code here";
      codeThree.innerText = JSON.stringify(res.Json, null, 4);
      codeFour.innerText = "Text of fetched query";

      break;
    }
    case "table": {
      doctContent.style.display = "block";
      htmContent.style.display = "block";
      jsonContent.style.display = "block";
      textContent.style.display = "none";

      codeOne.innerText = res.Htm;
      codeTwo.innerText = res.queryHtm;
      codeThree.innerText = JSON.stringify(res.Json, null, 4);
      codeFour.innerText = "Text of fetched query";

      break;
    }
    case "img": {
      doctContent.style.display = "block";
      htmContent.style.display = "none";
      jsonContent.style.display = "block";
      textContent.style.display = "none";

      codeOne.innerText = res.Htm;
      codeTwo.innerText = "HTML code here";
      codeThree.innerText = JSON.stringify(res.Json, null, 4);
      codeFour.innerText = "Text of fetched query";

      break;
    }
    case "custom": {
      doctContent.style.display = "block";
      htmContent.style.display = "block";
      jsonContent.style.display = "none";
      textContent.style.display = "block";

      codeOne.innerText = res.Htm;
      codeTwo.innerText = res.queryHtm;
      codeThree.innerText = "JSON code here";
      codeFour.innerText = res.txt;

      break;
    }
    default:
      doctContent.style.display = "none";
      htmContent.style.display = "none";
      jsonContent.style.display = "none";
      textContent.style.display = "none";

      codeOne.innerText = "HTML code of Webpage";
      codeTwo.innerText = "HTML code here";
      codeThree.innerText = "JSON code here";
      codeFour.innerText = "Text of fetched query";

      alert(
        "There was an error while fetching data from Webpage/Server\nPlease try again later"
      );
      console.log("pleae try again");
  }
}

// ======================= Copy icon code ============================

// Get all copy buttons
const downloadButtons = document.querySelectorAll(".download");

// Add click event listener to each download button
downloadButtons.forEach((button, i) => {
  button.addEventListener("click", () => {
    let contentType = "text/plain";
    let fileName = "scraped.txt";
    switch (i) {
      case 0:
        //download whole doctype html of scraped webpage
        contentType = "text/plain";
        fileName = "webPage.html";
        break;
      case 1:
        //download specific html content of requested query
        contentType = "text/plain";
        fileName = "scraped.html";
        break;
      case 2:
        // download json of requested query
        contentType = "application/json";
        fileName = "scraped.json";
        break;
      case 3:
        //download text data of scraped data
        contentType = "text/plain";
        fileName = "scraped.txt";
        break;
      default:
        contentType = "text/plain";
        fileName = "scraped.txt";
    }

    // Get the pre tag element that contains the code
    const preTag = button.parentElement.querySelector("pre");

    let data = preTag.innerText;

    var a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([data], { type: contentType }));
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });
});

//Copy tooltip code
const downloadedElement = document.querySelector(".downloaded");

for (let i = 0; i < downloadButtons.length; i++) {
  downloadButtons[i].addEventListener("click", function () {
    downloadedElement.classList.add("show-download");

    setTimeout(function () {
      downloadedElement.classList.remove("show-download");
    }, 800);
  });
}
