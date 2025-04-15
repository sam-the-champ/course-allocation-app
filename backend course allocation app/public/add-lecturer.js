document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const sidebar = document.getElementById("sidebar");
  const form = document.getElementById("add-lecturer-form");
  const toast = document.getElementById("toast");

  // Toggle sidebar and menu icon on click
  menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    menuToggle.classList.toggle("open");
  });

  // Show error message
  function showError(input, message) {
    const errorEl = input.parentElement.querySelector(".error-message");
    errorEl.innerText = message;
    errorEl.style.display = "block";
    input.style.borderColor = "red";
  }

  // Clear error message
  function clearError(input) {
    const errorEl = input.parentElement.querySelector(".error-message");
    errorEl.innerText = "";
    errorEl.style.display = "none";
    input.style.borderColor = "#ccc";
  }

  // Show toast notification
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }

  // Email validation
  function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  // Title validation: must be one of the specific values (Dr, Mr, Prof)
  function validateTitle(title) {
    const validTitles = ["Dr", "Mr", "Mrs" , "Prof"];
    return validTitles.includes(title);
  }

  // Handle form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    const inputs = [
      { id: "lecturer-id", required: true },
      { id: "surname", required: true, custom: (value) => value === value.toUpperCase(), errorMessage: "Surname must be in CAPITAL letters." },
      { id: "first-name", required: true },
      { id: "email", required: true, custom: validateEmail, errorMessage: "Please enter a valid email address." },
      { id: "department", required: true },
      { id: "title", required: true, custom: validateTitle, errorMessage: "Title must be one of the following: Dr, Mr, Prof." }
    ];

    // Validate all inputs
    inputs.forEach(({ id, required, custom, errorMessage }) => {
      const input = document.getElementById(id);
      const value = input.value.trim();

      if (required && !value) {
        showError(input, "This field is required.");
        isValid = false;
      } else if (custom && !custom(value)) {
        showError(input, errorMessage || "Invalid value.");
        isValid = false;
      } else {
        clearError(input);
      }
    });

    // If all inputs are valid, proceed
    if (isValid) {
      const lecturer = {
        lecturerId: document.getElementById("lecturer-id").value.trim(),
        surname: document.getElementById("surname").value.trim(),
        firstname: document.getElementById("first-name").value.trim(),
        email: document.getElementById("email").value.trim(),
        department: document.getElementById("department").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        gender: document.getElementById("gender").value,
        title: document.getElementById("title").value.trim()
      };

      fetch("http://localhost:5000/api/admin/add-lecturer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(lecturer)
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          showToast("Lecturer added successfully!");
          form.reset();
        } else {
          showToast(data.message || "Failed to add lecturer.");
        }
      })
      .catch(err => {
        console.error("Error:", err);
        showToast("Server error. Please try again.");
      });
    }
  });


  const logoutBtn = document.getElementById("logoutBtn");
  async function logout(){
          try{
              const response = await fetch(`http://localhost:5000/api/auth/logout`, {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                });
          }catch(error){
              alert("Error logging out")
          }
      }
  
      logoutBtn.addEventListener("click", ()=>{
          logout();
      })
});
