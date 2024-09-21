const dropArea = document.getElementById("drop-area");
const inputFile = document.getElementById("input-file");
const imgView = document.getElementById("img-view");
const roastButton = document.getElementById("Roast-btn");
const apiResponseDiv = document.getElementById("api-response");
const RoastBox = document.getElementById("roast-box");

let imageUrl;

inputFile.addEventListener("change", uploadImage);

async function uploadImage() {
  // Converting it into Local URL
  let imgLink = URL.createObjectURL(inputFile.files[0]);

  // DOM manipulation for showing Image
  imgView.style.backgroundImage = `url(${imgLink})`;
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
    })
    .catch((err) => {
      console.log(err);
    });
}

roastButton.addEventListener("click", (e) => {
  e.preventDefault();

  if (!imageUrl) {
    alert("Image is still uploading, please wait.");
    return;
  }

  console.log("Roast Button clicked");
  alert("Plese wait, response will be generated in 15 Seconds. dont click again")
  RoastHisFriend();
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
      .then((response) => {if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.text();}) // Use response.text() to get plain text data) // Parse JSON from the response
      .then((data) => {
        responseReceived(data);
        // Display the JSON data in the div
      })
      .catch((error) => console.error("Error fetching data:", error));
  }


function responseReceived(data) {
  RoastBox.classList.remove("hidden");
  let cleanData = data.replaceAll(/"/g, '').replaceAll(/\n\n/g, ' ').replace(/^"(.*)"$/, '$1')
  apiResponseDiv.textContent = JSON.stringify(cleanData, null, 2);
}

dropArea.addEventListener("dragover", function (e) {
  e.preventDefault();
});

dropArea.addEventListener("drop", function (e) {
  e.preventDefault();
  inputFile.files = e.dataTransfer.files;
  uploadImage();
});
