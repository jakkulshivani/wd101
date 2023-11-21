function minDate() {
  const today = new Date();
  return new Date(today.getFullYear() - 55, today.getMonth(), today.getDate())
    .toISOString()
    .split("T")[0];
}

function maxDate() {
  const today = new Date();
  return new Date(today.getFullYear() - 18, today.getMonth(), today.getDate())
    .toISOString()
    .split("T")[0];
}

const dobInput = document.getElementById("dob");
dobInput.setAttribute("min", minDate());
dobInput.setAttribute("max", maxDate());

// Function to add form data to the table and localStorage
function addDataToTable() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptTerms = document.getElementById("acceptTerms").checked;

  // Add data to table
  const table = document
    .getElementById("dataTable")
    .getElementsByTagName("tbody")[0];
  const newRow = table.insertRow(table.rows.length);
  const cell1 = newRow.insertCell(0);
  const cell2 = newRow.insertCell(1);
  const cell3 = newRow.insertCell(2);
  const cell4 = newRow.insertCell(3);
  const cell5 = newRow.insertCell(4);

  cell1.innerHTML = name;
  cell2.innerHTML = email;
  cell3.innerHTML = password;
  cell4.innerHTML = dob;
  cell5.innerHTML = acceptTerms ? "Yes" : "No";

  // Save data to localStorage
  const newData = {
    name: name,
    email: email,
    password: password,
    dob: dob,
    acceptTerms: acceptTerms,
  };

  let existingData = JSON.parse(localStorage.getItem("formData")) || [];
  existingData.push(newData);
  localStorage.setItem("formData", JSON.stringify(existingData));
}

// Function to load data from localStorage
function loadTableData() {
  const table = document
    .getElementById("dataTable")
    .getElementsByTagName("tbody")[0];
  let existingData = JSON.parse(localStorage.getItem("formData")) || [];

  existingData.forEach((data) => {
    const newRow = table.insertRow(table.rows.length);
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);
    const cell5 = newRow.insertCell(4);

    cell1.innerHTML = data.name;
    cell2.innerHTML = data.email;
    cell3.innerHTML = data.password;
    cell4.innerHTML = data.dob;
    cell5.innerHTML = data.acceptTerms ? "Yes" : "No";
  });
}

// Call loadTableData() to load existing data on page load
window.onload = loadTableData;

// Modify the form submission function to include adding data to the table and localStorage
document
  .getElementById("registrationForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevents the default form submission
    addDataToTable();
    this.reset(); // Clear form fields after submission
  });

