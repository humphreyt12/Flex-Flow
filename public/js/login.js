
const loginFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (username && password) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the profile page
        console.log(this.data)
        document.location.replace('/homepage');
      } else {
        alert(response.statusText);
      }
    } else if (!username) {
      alert('username not found.'); 
    } else if (!password) {
      alert('passwoed not found.'); 
    }
  
  };
  
 
  
 document.querySelector('.login-form')
 .addEventListener('submit', loginFormHandler);





