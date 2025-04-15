document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menuToggle");
        const sidebar = document.getElementById("sidebar");
        const mainContent = document.getElementById("main-content");
    
        // Sidebar toggle functionality
        menuToggle.addEventListener("click", function() {
            sidebar.classList.toggle("open");
            mainContent.classList.toggle("with-sidebar");
            menuToggle.classList.toggle("open");
        });


        const updateStats = async () => {
            // Example values - replace these with real data when implementing backend
            try{
                const response = await fetch(`http://localhost:5000/api/admin/get-data`, {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  });
                const data = await response.json();
                if(!data){
                    alert("No data available")
                    return;
                }
    
                const {courses, lecturers} = data;
                console.log(lecturers)
                loadList(lecturers)
              
              
            }catch(error){
                console.error('Error fetching lecturer data:', error);
                alert('Error fetching lecturer data');
              }
            
        };
    
        // Call updateStats initially to set the default values
        updateStats();
    
        
    

    function loadList(list) {
      const coursesTableBody = document.getElementById('coursesTableBody');
      coursesTableBody.innerHTML = ""; // Clear existing rows
  
      list.forEach(course => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${course.firstname}</td>
          <td>${course.surname}</td>
          <td>${course.email}</td>
          <td>${course.gender}</td>
          <td>${course.department}</td>
          <td>${course.title}</td>
        `;
        coursesTableBody.appendChild(row);
      });
    }
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
  