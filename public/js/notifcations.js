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

  
  fetch('/api/notifications/', {
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

function getIconLabel(iconPath) {
  const iconMap = {
    "/assets/Dumbbell.png": "Dumbbell",
    "/assets/sammich.png": "Sandwich",
    "/assets/water.png": "Water Bottle",
    "/assets/stretch.png": "Stretch",
    "/assets/music.png": "Music",
    // Add more mappings as needed
  };
  return iconMap[iconPath] || "Unknown Icon"; // Default case if the iconPath is not in the map
}


async function fetchAndRenderNotifications() {
  console.log('Starting to fetch notifications...');
  try {
    const response = await fetch('/api/notifications/', { credentials: 'include' });
    console.log('Received response from server');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    let notifications = await response.json(); // Ensure this is an array
    console.log('Parsed JSON data:', notifications);

    notifications = notifications.map(notification => ({
      ...notification,
      notificationIcon: getIconLabel(notification.notificationIcon) // Replace path with label
    }));

    if (notifications.length > 0) {
      console.log('Processing and displaying notifications');

      // Define the Handlebars template string with the new structure
      const templateString = `
        {{#each notifications}}
          <div class="notification" data-id="{{this.id}}">
            <h3 class="title-display">{{this.title}}</h3>
            <input type="text" class="title-input" value="{{this.title}}" style="display: none;">
            
            <p class="message-display">{{this.message}}</p>
            <textarea class="message-input" style="display: none;">{{this.message}}</textarea>
            <div></div>
            <p>Type: {{this.notificationType}}</p>
            {{#if this.dayOfWeek}}
              <p>Day of Week: {{this.dayOfWeek}}</p>
            {{/if}}
            {{#if this.specificDate}}
              <p>Specific Date: {{this.specificDate}}</p>
            {{/if}}
            <p>Notification Icon: {{this.notificationIcon}}</p>
            <p>Notification Color: {{this.notificationColor}}</p>
            <button class="edit-btn">Edit</button>
            <button class="save-btn" style="display: none;">Save</button>
            <button class="delete-btn" data-id="{{this.id}}">Delete</button>
          </div>
        {{else}}
          <p>No notifications found.</p>
        {{/each}}`;

      // Compile the template with Handlebars
      const template = Handlebars.compile(templateString);
      // Execute the compiled template and pass the data
      const html = template({ notifications: notifications });

      // Insert the resulting HTML into the DOM
      document.getElementById('notifications-container').innerHTML = html;
      console.log('Notifications rendered on the page');
      
      // After rendering, add event listeners for edit, save, and delete buttons
      addNotificationEventListeners();
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

// Function to add event listeners for edit, save, and delete actions
// Function to add event listeners for edit, save, and delete actions
function addNotificationEventListeners() {
  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const notificationDiv = this.closest('.notification');
      notificationDiv.querySelector('.title-display').style.display = 'none';
      notificationDiv.querySelector('.message-display').style.display = 'none';
      notificationDiv.querySelector('.title-input').style.display = 'block';
      notificationDiv.querySelector('.message-input').style.display = 'block';
      this.style.display = 'none';
      notificationDiv.querySelector('.save-btn').style.display = 'inline';
    });
  });

  document.querySelectorAll('.save-btn').forEach(btn => {
    btn.addEventListener('click', async function() {
      const notificationDiv = this.closest('.notification');
      const id = notificationDiv.getAttribute('data-id');
      const title = notificationDiv.querySelector('.title-input').value;
      const message = notificationDiv.querySelector('.message-input').value;

      // Send update request to server
      try {
        const response = await fetch(`/api/notifications/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, message })
        });
        if (!response.ok) throw new Error('Failed to update notification');
        console.log('Notification updated successfully');
      } catch (error) {
        console.error('Error updating notification:', error);
      }

      // Update UI to reflect changes
      notificationDiv.querySelector('.title-display').textContent = title;
      notificationDiv.querySelector('.message-display').textContent = message;
      notificationDiv.querySelector('.title-display').style.display = 'block';
      notificationDiv.querySelector('.message-display').style.display = 'block';
      notificationDiv.querySelector('.title-input').style.display = 'none';
      notificationDiv.querySelector('.message-input').style.display = 'none';
      this.style.display = 'none';
      notificationDiv.querySelector('.edit-btn').style.display = 'inline';
    });
  });

  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', async function() {
      const notificationDiv = this.closest('.notification');
      const id = notificationDiv.getAttribute('data-id');

      // Send delete request to server
      try {
        const response = await fetch(`/api/notifications/${id}`, {
          method: 'DELETE',
          credentials: 'include'
        });
        if (!response.ok) throw new Error('Failed to delete notification');
        console.log('Notification deleted successfully');
        notificationDiv.remove(); // Remove the notification from the DOM
      } catch (error) {
        console.error('Error deleting notification:', error);
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', fetchAndRenderNotifications);




