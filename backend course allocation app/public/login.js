document.addEventListener('DOMContentLoaded', function () {
  const roleSelect = document.getElementById('role');
  const adminLogin = document.getElementById('admin-login');
  const lecturerLogin = document.getElementById('lecturer-login');

  const adminFields = [
    document.getElementById('admin-username'),
    document.getElementById('admin-password')
  ];

  const lecturerFields = [
    document.getElementById('lecturer-id'),
    document.getElementById('lecturer-surname')
  ];

  const setRequiredFields = (fields, required) => {
    fields.forEach(field => {
      if (required) {
        field.removeAttribute('disabled'); // Enable input
        field.setAttribute('required', 'required');
      } else {
        field.removeAttribute('required');
        field.setAttribute('disabled', 'disabled'); // Disable input
      }
    });
  };
  

  roleSelect.addEventListener('change', function () {
    const role = this.value;

    if (role === 'admin') {
      adminLogin.style.display = 'block';
      lecturerLogin.style.display = 'none';
      setRequiredFields(adminFields, true);
      setRequiredFields(lecturerFields, false);
    } else if (role === 'lecturer') {
      adminLogin.style.display = 'none';
      lecturerLogin.style.display = 'block';
      setRequiredFields(adminFields, false);
      setRequiredFields(lecturerFields, true);
    }
  });

  document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const role = roleSelect.value;
    let loginData = {};

    // 👇 ADDITIONAL GUARD AGAINST INVALID SUBMISSION
    if (!role) {
      alert('Please select a role.');
      return;
    }

    if (role === 'admin') {
      if (!adminFields[0].value || !adminFields[1].value) {
        alert('Please enter admin username and password.');
        return;
      }
      loginData = {
        username: adminFields[0].value,
        password: adminFields[1].value
      };
    } else if (role === 'lecturer') {
      if (!lecturerFields[0].value || !lecturerFields[1].value) {
        alert('Please enter lecturer ID and surname.');
        return;
      }
      loginData = {
        lecturerId: lecturerFields[0].value,
        surname: lecturerFields[1].value.toUpperCase()
      };
    }

    const loginRoute = role === 'admin'
      ? 'http://localhost:5000/api/auth/admin/login'
      : 'http://localhost:5000/api/auth/lecturer/login';

    async function loginUser() {
      try{
        const response = await fetch(loginRoute, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(loginData)
        })
        const data = await response.json()

        if (data.redirectTo) {
          localStorage.setItem("lecturerId", JSON.stringify(data.token))
          window.location.href = data.redirectTo;

        } else {
          alert(data.message || 'Login failed');
        }
      }catch(error){
          console.error('Error:', error);
          alert('An error occurred. Please try again.');
        }
 
    }

    loginUser();
  });
});
