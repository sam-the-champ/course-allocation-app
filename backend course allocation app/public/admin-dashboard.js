document.addEventListener("DOMContentLoaded", function() {
    // Get the elements
    const menuToggle = document.getElementById("menuToggle");
    const sidebar = document.getElementById("sidebar");
    const mainContent = document.getElementById("main-content");

    // Sidebar toggle functionality
    menuToggle.addEventListener("click", function() {
        sidebar.classList.toggle("open");
        mainContent.classList.toggle("with-sidebar");
        menuToggle.classList.toggle("open");
    });

    // Placeholder for dynamic content (Add Lecturer, Add Course, etc.)
    const contentSection = document.getElementById("content-section");

    // Example dynamic stats - these will be updated as the admin interacts with the dashboard
    const totalCourses = document.getElementById("totalCourses");
    const totalLecturers = document.getElementById("totalLecturers");
    const allocatedCourses = document.getElementById("allocatedCourses");
    const unallocatedCourses = document.getElementById("unallocatedCourses");
    

    // Function to update the stats dynamically (replace these with real data from your backend or API)
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
            const allocatedCoursesNum = getCoursesAllocated(lecturers)

            totalCourses.innerText = courses.length; // Replace with real number of total courses
            totalLecturers.innerText = lecturers.length; // Replace with real number of total lecturers
            allocatedCourses.innerText = `${allocatedCoursesNum}`; // Replace with real number of allocated courses
            unallocatedCourses.innerText = courses.length - allocatedCoursesNum; // Replace with real number of unallocated courses
            console.log(data)
        }catch(error){
            console.error('Error fetching lecturer data:', error);
            alert('Error fetching lecturer data');
          }
        
    };

    // Call updateStats initially to set the default values
    updateStats();

    function getCoursesAllocated(lecturers){
        const coursesAllocated = {}
        let numCoursesAllocated = 0;

        for(let i = 0; i < lecturers.length; i++){
            coursesAllocated[lecturers[i].courses.courseCode] ? coursesAllocated[lecturers[i].courses.courseCode]++ : coursesAllocated[lecturers[i].courses.courseCode] = 0
        }

        for(let key in coursesAllocated){
            numCoursesAllocated++
        }

        return numCoursesAllocated;

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
