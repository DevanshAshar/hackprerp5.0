// const { title } = require("process");

const expenseForm = document.getElementById("expense-form");
const expenseList = document.getElementById("expense-list");
const totalAmountElement = document.getElementById("total-amount");

// Initialize expenses array from localStorage
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Function to render expenses in tabular form
function getExpenses() {
    console.log("IN")
  fetch("http://localhost:3001/expenses")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Clear expenseList before adding new data
      const expenseList = document.getElementById("expense-list");
      expenseList.innerHTML = "";

      // Initialize total amount
      let totalAmount = 0;

      // Iterate over the fetched expenses
      data.forEach((expense, i) => {
        const expenseRow = document.createElement("tr");
        expenseRow.innerHTML = `
                <td>${expense.title}</td>
                <td>$${expense.amount}</td>
                <td class="delete-btn" data-id="${expense.id}">Delete</td>
            `;
        expenseList.appendChild(expenseRow);

        // Update total amount
        totalAmount += expense.amount;
      });

      // Update total amount display
      const totalAmountElement = document.getElementById("total-amount");
      totalAmountElement.textContent = totalAmount.toFixed(2);
    })
    .catch((error) => {
      console.error("There was a problem:", error);
    });
}

// Function to add expense
async function addExpense(event) {
  event.preventDefault();

  // Get expense name and amount from form
  const expenseNameInput = document.getElementById("expense-name");
  const expenseAmountInput = document.getElementById("expense-amount");
  const expenseName = expenseNameInput.value;
  const expenseAmount = parseFloat(expenseAmountInput.value);

  // Clear form inputs
  expenseNameInput.value = "";
  expenseAmountInput.value = "";

  // Validate inputs
  if (expenseName === "" || isNaN(expenseAmount)) {
    alert("Please enter valid expense details.");
    return;
  }

  // Create new expense object
  const expense = {
    title: expenseName,
    amount: expenseAmount,
  };

  await fetch("http://localhost:3001/expenses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(expense),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("POST request successful:", data);
    })
    .catch((error) => {
      console.error("There was a problem with the POST request:", error);
    });

  getExpenses();
}

// Function to delete expense
function deleteExpense(event) {
  if (event.target.classList.contains("delete-btn")) {
    // Get expense index from data-id attribute
    const expenseIndex = parseInt(event.target.getAttribute("data-id"));

    
    expenses.splice(expenseIndex, 1);

    // Render expenses
    getExpenses();
  }
}

// Add event listeners
expenseForm.addEventListener("submit", addExpense);
expenseList.addEventListener("click", deleteExpense);

// Render initial expenses on page load
getExpenses();
