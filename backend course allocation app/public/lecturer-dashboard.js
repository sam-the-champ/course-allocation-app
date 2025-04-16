document.addEventListener("DOMContentLoaded", function () {
  const lecturerId = localStorage.getItem("lecturerId"); // Make sure lecturerId is stored here after login

  if (!lecturerId) {
    alert("Lecturer ID not found. Please log in again.");
    return;
  }
  const menuToggle = document.getElementById("menuToggle");
    const sidebar = document.getElementById("sidebar");
    const mainContent = document.getElementById("main-content");

    // Sidebar toggle functionality
    menuToggle.addEventListener("click", function() {
        sidebar.classList.toggle("open");
        mainContent.classList.toggle("with-sidebar");
        menuToggle.classList.toggle("open");
    });

  

  async function getLecturerData(){
    try{
      const response = await fetch(`http://localhost:5000/api/lecturer/get-lecturer-info/${JSON.parse(lecturerId)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json()
      if(data.lecturer){
        document.getElementById('welcomeMsg').innerText = data.lecturer.name;
        document.getElementById('lecturerName').innerText = data.lecturer.name;
        document.getElementById('lecturerEmail').innerText = data.lecturer.email;
        document.getElementById('lecturerDept').innerText = data.lecturer.department;
        if(data.courses){
          loadCourses(data.courses)
        }else{
          alert('No course has been allocated to this lecturer!!');
        }
      }else{
        alert('Lecturer data not found');
      }
      console.log(data)
    }catch(error){
        console.error('Error fetching lecturer data:', error);
        alert('Error fetching lecturer data');
      }
    }
  getLecturerData();


  // Fetch the lecturer's allocated courses
  // async function getAllocatedCourses(){
  //   try{
  //     const response = await fetch(`http://localhost:5000/api/lecturer/allocated-courses/${JSON.parse(lecturerId)}`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     })
  //     const data = await response.json()

  //     if (data.courses) {
  //       loadCourses(data.courses);
  //     } else {
  //         alert('No courses allocated');
  //     }
  //   }catch(error){
  //     console.error('Error fetching allocated courses:', error);
  //     alert('Error fetching allocated courses');
  //   }
  // }

  // getAllocatedCourses();
  

  // Function to dynamically load courses into the table
  function loadCourses(courses) {
    const coursesTableBody = document.getElementById('coursesTableBody');
    coursesTableBody.innerHTML = ""; // Clear existing rows

    courses.forEach(course => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${course.courseCode}</td>
        <td>${course.courseTitle}</td>
        <td>${course.level}</td>
        <td>${course.semester}</td>
        <td>${course.units}</td>
        <td>${course.date}</td>
        <td>${course.time}</td>
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
