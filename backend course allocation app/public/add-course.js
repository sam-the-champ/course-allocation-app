document.addEventListener("DOMContentLoaded", function() {
    // Get the elements
    const menuToggle = document.getElementById("menuToggle");
    const sidebar = document.getElementById("sidebar");
    const mainContent = document.getElementById("main-content")

    // Sidebar toggle
    menuToggle.addEventListener("click", function() {
        sidebar.classList.toggle("open");
        mainContent.classList.toggle("with-sidebar")

        menuToggle.classList.toggle("open")
    })

    const form = document.getElementById("add-course-form");
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const courseCode = document.getElementById("course-code").value.trim();
      const courseTitle = document.getElementById("course-title").value.trim();
      const semester = document.getElementById("semester").value;
      const description = document.getElementById("course-description").value.trim();
  
      // Basic validation
      if (!courseCode || !courseTitle || !semester) {
        alert("Please fill in all required fields.");
        return;
      }
  
      const courseData = {
        courseCode,
        courseTitle,
        semester,
        description
      };
  
      try {
        const response = await fetch("http://localhost:5000/api/admin/add-course", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(courseData)
        });
  
        const result = await response.json();
  
        if (response.ok) {
          alert(result.message);
          form.reset();
        } else {
          alert(result.message || "Failed to add course.");
        }
      } catch (error) {
        console.error("Error adding course:", error);
        alert("An error occurred. Please try again.");
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
  