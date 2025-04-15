document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menuToggle");
    const sidebar = document.getElementById("sidebar");
    const mainContent = document.querySelector(".main-content");

    // Sidebar toggle
    menuToggle.addEventListener("click", function () {
        sidebar.classList.toggle("open");
        mainContent.classList.toggle("with-sidebar");
        menuToggle.classList.toggle("open");
    });

    // Handle form submission
    const form = document.getElementById("allocateCourseForm");

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const lecturerId = document.getElementById("lecturerId").value.trim();
        const courseCode = document.getElementById("courseCode").value.trim();
        const courseTitle = document.getElementById("courseTitle").value.trim(); // Optional: used if you want to show feedback
        const level = document.getElementById("courseLevel").value.trim();
        const courseUnits = document.getElementById("courseUnits").value.trim();
        const semester = document.getElementById("semester").value.trim();
        const classDate = document.getElementById("classDate").value;
        const classTime = document.getElementById("classTime").value;

        try {
            const response = await fetch("http://localhost:5000/api/admin/allocate-course", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    lecturerId,
                    courseCode,
                    level,
                    courseUnits,
                    semester,
                    classDate,
                    classTime
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert(`✅ Course "${courseTitle}" allocated successfully!`);
                form.reset();
            } else {
                alert(`❌ Error: ${data.message}`);
            }
        } catch (error) {
            console.error("Request failed:", error);
            alert("❌ Server error. Please try again later.");
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
