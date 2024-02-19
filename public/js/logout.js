
  // Select the logout link by its ID or another unique selector
  const logoutLink = document.querySelector('#logoutButton');

  // Define the logout function
  const logout = async (event) => {
    event.preventDefault(); 
    console.log('Logout clicked'); 

    try {
      console.log('Preparing to send logout request'); 
      const response = await fetch('/api/users/logout', {
        method: "POST",
        credentials: "include"});
      
      console.log('Logout request sent, response received', response); 

      if (response.ok) {
        console.log('Logout successful');
        window.location.href='/login';
      } else {
        alert('Failed to log out');
      }
    } catch (error) {
      console.error('Logout error:', error); 
    }
  };

  
  if (logoutLink) {
    logoutLink.addEventListener('click', logout);
  } else {
    console.error('Logout link not found'); 
  }
