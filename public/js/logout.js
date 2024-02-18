
  // Select the logout link by its ID or another unique selector
  const logoutLink = document.querySelector('#logoutButton');

  // Define the logout function
  const logout = async (event) => {
    event.preventDefault(); // Prevent the default anchor action
    console.log('Logout clicked'); // Confirm the click event triggers the function

    try {
      console.log('Preparing to send logout request'); // Before sending the fetch request
      const response = await fetch('/api/users/logout', {
        method: "POST",
        credentials: "include"});
      
      console.log('Logout request sent, response received', response); // After fetch executes

      if (response.ok) {
        // Redirect to the desired location after successful logout
        window.location.href='/login';
      } else {
        alert('Failed to log out');
      }
    } catch (error) {
      console.error('Logout error:', error); // Catch any errors during fetch
    }
  };

  // Add click event listener to the logout link
  if (logoutLink) {
    logoutLink.addEventListener('click', logout);
  } else {
    console.error('Logout link not found'); // If the logout link is not found
  }

