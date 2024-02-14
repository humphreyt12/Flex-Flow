

console.log('trees')

document.addEventListener('DOMContentLoaded', function() {
  const specificDay = document.getElementById('specificDay');
  const specificDate = document.getElementById('specificDate');
  const dayOfWeek = document.getElementById('dayOfWeek');
  const CalendarDate = document.getElementById('CalendarDate');
  const onReopen = document.getElementById('onReopen')

  function updateInputFields() {
    if (specificDay.checked) {
      dayOfWeek.style.display = 'block';
      CalendarDate.style.display = 'none';
    } else if (specificDate.checked) {
      dayOfWeek.style.display = 'none';
      CalendarDate.style.display = 'block'
    } else if (onReopen.checked) {
      dayOfWeek.style.display = 'none';
      CalendarDate.style.display = 'none'
    } else {
      dayOfWeek.style.display = 'none';
      CalendarDate.style.display = 'none';
    }
  }
  onReopen.addEventListener('change', function(){
    if (this.checked) {
      specificDate.checked = false;
      specificDay.checked = false;
    }
    updateInputFields();
  })
  
  specificDate.addEventListener('change', function(){
    if (this.checked) {
      specificDay.checked = false;
      onReopen.checked = false;
    }
    updateInputFields();
  })
  specificDay.addEventListener('change',function() {
    if (this.checked) {
      specificDate.checked = false;
      onReopen.checked = false;
    }
    updateInputFields();
  })
  updateInputFields();
})

function saveFormData() {
  let notificationType = '';
  let associatedDate = '';
  
  if (document.getElementById('onReopen').checked) {
    notificationType = 'onReopen';
  } else if (document.getElementById('specificDay').checked) {
    notificationType = 'specificDay';
    associatedDate = document.getElementById('dayOfWeek').value;
  } else if (document.getElementById('specificDate').checked) {
    notificationType = 'specificDate';
    associatedDate = document.getElementById('CalendarDate').value;
  }

  const formData = {
    title: document.getElementById('titleInput').value,
    message: document.getElementById('messageInput').value,
    notificationType,
    associatedDate,
    notificationColor: document.getElementById('colorSelector').value,
    notificationIcon: document.getElementById('iconSelector').value,
  };

  
  fetch('/api/notifications', {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log('Success:', data);
    window.location.reload(); // Reload the page to show the updated notifications list
  })
  .catch((error) => {
    console.error('Error:', error);
  });
  console.log(formData)
}




async function fetchAndRenderNotifications() {
  console.log('Starting to fetch notifications...');
  try {
    const response = await fetch('/api/notifications/', { credentials: 'include' });
    console.log('Received response from server');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const notifications = await response.json();
    console.log('Parsed JSON data:', notifications);

    if (notifications.length !== 0) {
      console.log('Processing and displaying notifications');

      // Directly defining the Handlebars template string within the JavaScript
      const templateString = `
        {{#each notifications}}
          <div class="notification">
            <h3>{{title}}</h3>
            <p>{{message}}</p>
            <p>Type: {{notificationType}}</p>
            {{#if dayOfWeek}}
              <p>Day of Week: {{dayOfWeek}}</p>
            {{/if}}
            {{#if specificDate}}
              <p>Specific Date: {{specificDate}}</p>
            {{/if}}
            <p>Notification Icon: {{notificationIcon}}</p>
            <p>Notification Color: {{notificationColor}}</p>
            <button class="update-btn" data-id="{{id}}">Update</button>
            <button class="delete-btn" data-id="{{id}}">Delete</button>
          </div>
        {{else}}
          <p>No notifications found.</p>
        {{/each}}
      `;

      const template = Handlebars.compile(templateString);
      const html = template({ notifications: notifications });

      document.getElementById('notifications-container').innerHTML = html;
      console.log('Notifications rendered on the page');
    } else {
      document.getElementById('notifications-container').innerHTML = '<p>No notifications found.</p>';
      console.log('No notifications found');
    }
  } catch (error) {
    console.error('Error fetching notifications:', error);
    document.getElementById('notifications-container').innerHTML = `<p>Error fetching notifications: ${error.message}</p>`;
    console.log('Error occurred during fetch and render process:', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  fetchAndRenderNotifications();
});






async function updateNotification(id, updatedData) {
  try {
      const response = await fetch(`/api/notifications/${id}`, {
          credentials: 'include',
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
      }

      const updatedNotification = await response.json();
      console.log('Updated notification:', updatedNotification);
      // Handle the response data...
  } catch (error) {
      console.error('Failed to update notification:', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const deleteButtons = document.querySelectorAll('.delete-btn');
  const updateButtons = document.querySelectorAll('.update-btn');

  deleteButtons.forEach(button => {
    button.addEventListener('click', function() {
      const notificationId = this.getAttribute('data-id');
      deleteNotification(notificationId);
    });
  });

  updateButtons.forEach(button => {
    button.addEventListener('click', function() {
      const notificationId = this.getAttribute('data-id');
      // Additional logic to handle update, possibly showing a form to edit notification details
      updateNotification(notificationId);
    });
  });
});

function deleteNotification(id) {
  fetch(`/api/notifications/${id}`, {
    credentials: 'include',
    method: 'DELETE',
  })
  .then(response => response.json())
  .then(data => {
    console.log('Delete successful', data);
    // Optionally, remove the notification element from the DOM or reload parts of the page to reflect the deletion
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

function updateNotification(id) {
  // Example function structure, replace with your actual update logic
  // This might involve fetching current notification data and displaying it in a form for editing,
  // then sending a PUT request with the updated data
}

function checkSessionAndProceed() {
  fetch('/api/session', { credentials: 'include' }) // Make sure to include credentials for cookies to be sent
    .then(response => response.json())
    .then(data => {
      if (data.loggedIn) {
        console.log('User is logged in. User ID:', 1);
        // Proceed with actions that require authentication
      } else {
        console.log('User is not logged in.');
        // Redirect to login or disable certain actions
      }
    })
    .catch(error => console.error('Error fetching session data:', error));
}

document.addEventListener('DOMContentLoaded', () => {
  checkSessionAndProceed();
});






/*
document.getElementById('notificationForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = {
        title: document.getElementById('titleInput').value,
        message: document.getElementById('messageInput').value,
        displayType: document.getElementById('displayType',  ).value,
        notificationType: document.getElementById('colorSelector').value,
        iconSelector: document.getElementById('iconSelector').value
    };

    fetch('/submit-notification', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.text())
    .then(data => {
        alert(data); // Or handle your success case here
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    fetchNotifications();
  });
  
  function fetchNotifications() {
    fetch('/notifications')
      .then(response => response.json())
      .then(data => {
        console.log(data); // Process and display notifications as needed
        // For example, checking if current time is past notification's triggerTime and display it
      });
  }

  function fetchAndDisplayNotifications() {
    // Fetch notifications from your backend
    fetch('/notifications')
      .then(response => response.json())
      .then(notifications => {
        const today = new Date().getDay(); // Gets the current day of the week (0-6)
        const todaysNotifications = notifications.filter(notification => notification.dayOfWeek === today);
        
        // Display today's notifications
        todaysNotifications.forEach(notification => {
          displayNotification(notification);
        });
      });
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    fetchAndDisplayNotifications();
  });

  function fetchAndDisplayNotifications() {
    fetch('/notifications')
      .then(response => response.json())
      .then(notifications => {
        const now = new Date();
        const today = now.getDay();
        const currentTime = now.toTimeString().substr(0, 5); // "HH:MM" format
  
        notifications.forEach(notification => {
          switch (notification.displayType) {
            case 'onReopen':
              displayNotification(notification);
              break;
            case 'specificDay':
              if (notification.dayOfWeek === today) {
                displayNotification(notification);
              }
              break;
            case 'specificTime':
              // Compare both day and time if needed
              if (notification.timeOfDay === currentTime) {
                displayNotification(notification);
              }
              break;
          }
        });
      });
  }
  
  document.addEventListener('DOMContentLoaded', fetchAndDisplayNotifications);

  document.addEventListener('DOMContentLoaded', function() {
    const displayTypeSelect = document.getElementById('displayType');
    const dayOfWeekInput = document.getElementById('dayOfWeek');
    const timeOfDayInput = document.getElementById('timeOfDay');
    const specificDateInput = document.getElementById('specificDate');

    function updateInputVisibility() {
      // Hide all input fields first
      dayOfWeekInput.classList.add('hidden');
      timeOfDayInput.classList.add('hidden');
      specificDateInput.classList.add('hidden');
      
      // Show the relevant input field based on the selected option
      const displayType = displayTypeSelect.value;
      if (displayType === 'specificDay') {
        dayOfWeekInput.classList.remove('hidden');
      } else if (displayType === 'specificTime') {
        timeOfDayInput.classList.remove('hidden');
      } else if (displayType === 'specificDate') {
        specificDateInput.classList.remove('hidden');
      }
    }

    // Listen for changes to the display type and update input visibility accordingly
    displayTypeSelect.addEventListener('change', updateInputVisibility);

    // Initial update in case the form is pre-filled or defaults need applying
    updateInputVisibility();
  });

  /*
  let title = document.getElementById('titleInput').value
  let message = document.getElementById('messageInput').value
  let displayType = document.getElementById('displayType').value
  let notificationType = document.getElementById('colorSelector').value
  let iconSelector = document.getElementById('iconSelector').value
  */