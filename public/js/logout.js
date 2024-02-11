document.addEventListener('DOMContentLoaded', () => {
  // Select the logout link by its ID or another unique selector
  const logoutLink = document.querySelector('a[href="/logout"]');

  const logout = async (event) => {
    event.preventDefault(); // Prevent the default link behavior

    try {
      const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        // Redirect to the desired location after successful logout
        document.location.replace('/login');
      } else {
        alert('Failed to log out');
      }
    } catch (error) {
      console.error('Logout error:', error);
      alert('An error occurred while trying to log out.');
    }
  };
  
  d  // Add click event listener to the logout link
  if (logoutLink) {
    logoutLink.addEventListener('click', logout);
  } else {
    console.error('Logout link not found');
  }
});