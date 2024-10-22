const bar = document.getElementById("bar");
const nav = document.getElementById("navbar");
const close = document.getElementById("close");

if (bar) {
  bar.addEventListener("click", () => {
    nav.classList.add("active");
  });
}

if (close) {
  close.addEventListener("click", () => {
    nav.classList.remove("active");
  });
}

//  Add Card Functionality

const badge = document.getElementById("card-badge");
const addButton = document.getElementById("add-card-btn");

let badgeCount = parseInt(localStorage.getItem("badgeCount")) || 0;

// Function to update the badge visibility based on count
function updateBadge() {
  if (badgeCount === 0) {
    badge.style.display = "none"; // Hide the badge
  } else {
    badge.style.display = "inline"; // Show the badge
    badge.textContent = badgeCount; // Update badge text
  }

  // Store the updated badge count in localStorage to sync across pages
  localStorage.setItem("badgeCount", badgeCount);
}

//Add event listener to update badge on page load

window.addEventListener("DOMContentLoaded", () => {
  updateBadge(); // Update the badge after page load
});

// Add event listener to the Add button (if present)
if (addButton) {
  addButton.addEventListener("click", () => {
    // Increment the badge count
    badgeCount += 1;
    updateBadge(); // Update the badge after incrementing
  });
}

// Function to update the table rows based on badgeCount
function updateTableRows() {
  const tbody = document.querySelector("table tbody"); // Select the table body
  tbody.innerHTML = ""; // Clear existing rows

  // Create rows based on badgeCount
  for (let i = 0; i < badgeCount; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td style="cursor:pointer" class="remove-card-btn"><a ><i  class="far fa-times-circle"></i></a></td>
            <td> <div style="cursor:pointer" onclick="window.location.href='sproduct.html';" ><img src="assets/products/f1.jpg" alt=""></div> </td>
            <td>Cartoon Astronaut T-Shirts</td>
            <td>₹3999</td>
            <td><input type="number" value="1"></td>
            <td>₹4299</td>
        `;
    tbody.appendChild(row); // Append the new row to the table body
  }

  // Reattach event listeners to the new remove buttons
  const removeButtons = document.querySelectorAll(".remove-card-btn");
  removeButtons.forEach((removeButton) => {
    removeButton.addEventListener("click", () => {
      // Decrement the badge count if it's greater than 0
      if (badgeCount > 0) {
        badgeCount -= 1; // Decrement the badge count
        updateBadge(); // Update the badge
        updateTableRows(); // Update the table rows after removal
      }
    });
  });
}

// On page load, update the table rows based on badgeCount
updateTableRows();
