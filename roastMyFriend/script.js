// Cache DOM elements for later use  (Single Responsibility Principle)
const dropArea = document.getElementById("drop-area");
const inputFile = document.getElementById("input-file");
const imgView = document.getElementById("img-view");
const imageLoader = document.getElementById("Image_loader");
const roastButton = document.getElementById("Roast-btn");
const btnLoader = document.getElementById("btn-loader");
const RoastText = document.getElementById("Roast-text");
const RoastBox = document.getElementById("roast-box");
const apiResponseDiv = document.getElementById("api-response");

let imageUrl;

// Event Listners
inputFile.addEventListener("change", handleImageUpload); //Line 22
// roastButton.addEventListener("click", handleRoastButtonClick);
// dropArea.addEventListener("dragover", handleDrogOver)
// dropArea.addEventListner("drop", handleDrop);

// Function to handle Image upload

async function handleImageUpload() {
  // Converting it into Local URL

  imageLoader.classList.remove("hidden");
  imgView.textContent = "";
  imgView.style.border = 0;

  // Puting Data in formData
  const file = inputFile.files[0];
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "RoastMyFriend");
  formData.append("cloud_name", "dmn5lu9qh");

  await fetch("https://api.cloudinary.com/v1_1/dmn5lu9qh/image/upload", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      imageUrl = data.secure_url;

      console.log("Public URL: ", imageUrl);
      imageLoader.classList.add("hidden");

      let imgLink = URL.createObjectURL(inputFile.files[0]);

      // DOM manipulation for showing Image
      imgView.style.backgroundImage = `url(${imgLink})`;
    })
    .catch((err) => {
      console.log(err);
    });
}

roastButton.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("Roast Button clicked");

  if (!imageUrl) {
    alert("Image is still uploading, please wait.");
    return;
  } else {
    RoastHisFriend();
    btnLoader.classList.remove("hidden");
    RoastText.classList.add("hidden");
  }
});

function RoastHisFriend() {
  // Function to fetch API data and display it in a div
  const url = "https://q6ibft.buildship.run/GPT-Chatbot"; // Replace with your API endpoint
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ image: imageUrl }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    }) // Use response.text() to get plain text data) // Parse JSON from the response
    .then((data) => {
      responseReceived(data);
      // Display the JSON data in the div
    })
    .catch((error) => console.error("Error fetching data:", error))
    .finally(() => {});
}

function responseReceived(data) {
  // Btn Loader
  btnLoader.classList.add("hidden");
  RoastText.classList.remove("hidden");

  RoastBox.classList.remove("hidden");

  let cleanData = data
    .replaceAll(/"/g, " ") // Replace all double quotes
    .replaceAll(/\n\n/g, " ") // Replace double newlines with a space
    .replace(/^"(.*)"$/, "$1"); // Remove leading and trailing quotes

  cleanData = cleanData.charAt(0).toUpperCase() + cleanData.slice(1);

  apiResponseDiv.textContent = cleanData;
}

dropArea.addEventListener("dragover", function (e) {
  e.preventDefault();
});

dropArea.addEventListener("drop", function (e) {
  e.preventDefault();
  inputFile.files = e.dataTransfer.files;
  uploadImage();
});
