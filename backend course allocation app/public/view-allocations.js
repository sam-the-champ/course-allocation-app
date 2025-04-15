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
                const allocationList = getLecturersCourses(lecturers);
                console.log(allocationList)
                loadList(allocationList)
              
              
            }catch(error){
                console.error('Error fetching lecturer data:', error);
                alert('Error fetching lecturer data');
              }
            
        };
    
        // Call updateStats initially to set the default values
        updateStats();
    
        function getLecturersCourses(lecturers){
            const courses = []
    
            for(let i = 0; i < lecturers.length; i++){
                let currLecturer = lecturers[i]
                for(let j = 0; j < currLecturer.courses.length; j++){
                    console.log(currLecturer)
                    const lecAndCourseObj = {
                        lecturer: `${currLecturer.title} ${currLecturer.surname} ${currLecturer.firstname}`,
                        courseCode: currLecturer.courses[j].courseCode,
                        courseTitle: currLecturer.courses[j].courseTitle,
                        courseUnits: currLecturer.courses[j].courseUnits,
                        semester: currLecturer.courses[j].semester,
                        level: currLecturer.courses[j].level,
                    }
                    courses.push(lecAndCourseObj)
                }
            }
    
            return courses;
    
        }
    

    function loadList(list) {
      const coursesTableBody = document.getElementById('coursesTableBody');
      coursesTableBody.innerHTML = ""; // Clear existing rows
  
      list.forEach(course => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${course.lecturer}</td>
          <td>${course.courseCode}</td>
          <td>${course.courseTitle}</td>
          <td>${course.courseUnits}</td>
          <td>${course.level}</td>
          <td>${course.semester}</td>
        `;
        coursesTableBody.appendChild(row);
      });
    }
  });
  