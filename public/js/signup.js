

      
      const signupFormHandler = async (event) => {
        event.preventDefault();
      
        // Retrieve values from form fields
        const name = document.querySelector('#name-signup').value.trim();
        const username = document.querySelector('#username-signup').value.trim();
        const email = document.querySelector('#email-signup').value.trim();
        const password = document.querySelector('#password-signup').value.trim();
        const passwordConfirm = document.querySelector('#password-confirm-signup').value.trim(); // Added line for password confirmation
      
        // Check if all fields are filled and passwords match
        if (name && username && email && password && password === passwordConfirm) {
          const response = await fetch('/api/users/', {
            method: 'POST',
            body: JSON.stringify({ name, username, email, password }),
            headers: { 'Content-Type': 'application/json' },
          });
      
          if (response.ok) {
            document.location.replace('/homepage');
          } else {
            alert(response.statusText);
          }
        } else if (password !== passwordConfirm) {
          alert('Passwords do not match.'); // Alert the user if passwords do not match
        } else {
          alert('Please fill out all fields.'); // Alert if any field is missing
        }
      };
      
      /*
      document.querySelector('.signup-form').addEventListener('submit', (event) => signupFormHandler(event));
    })
    */
   
    const signupForm = document.querySelector('.signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', signupFormHandler);
    }
    
