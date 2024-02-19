

console.log('trees')


  

  function updateInputFields() {
    let specificDay = document.getElementById('specificDay');
    let specificDate = document.getElementById('specificDate');
    let dayOfWeek = document.getElementById('dayOfWeek');
    let CalendarDate = document.getElementById('CalendarDate');
    let onReopen = document.getElementById('onReopen')

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


function saveFormData() {
  let notificationType = '';
  let associatedDate = '';
  
  if (onReopen.checked) {
    notificationType = 'onReopen';
  } else if (specificDay.checked) {
    notificationType = 'specificDay';
    associatedDate = dayOfWeek.value;
  } else if (specificDate.checked) {
    notificationType = 'specificDate';
    associatedDate = CalendarDate.value;
  }


  const formData = {
    title: document.getElementById('titleInput').value,
    message: document.getElementById('messageInput').value,
    notificationType,
    associatedDate,
    notificationColor: document.getElementById('colorSelector').value,
    notificationIcon: document.getElementById('iconSelector').value,
  };
;
  
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
    window.location.reload(); 
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
  };
  return iconMap[iconPath] || "Unknown Icon"; 
}


async function fetchAndRenderNotifications() {
  console.log('Starting to fetch notifications...');
  try {
    const response = await fetch('/api/notifications/', { credentials: 'include' });
    console.log('Received response from server');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    let notifications = await response.json();
    console.log('Parsed JSON data:', notifications);

    notifications = notifications.map(notification => ({
      ...notification,
      notificationIcon: getIconLabel(notification.notificationIcon)
    }));

    if (notifications.length !== 0) {
      console.log('Processing and displaying notifications');

      const templateString = `
      {{#each notifications}}
<div class="notification bg-white shadow-lg rounded-lg p-6 mb-4" data-id="{{this.id}}">
  <h3 class="title-display text-xl font-semibold text-gray-800">{{this.title}}</h3>
  
  <!-- Hidden by default, shown when editing -->
  <input type="text" class="title-input bg-gray-100 border border-gray-300 rounded p-2 text-gray-700 w-full mt-2" value="{{this.title}}" style="display: none;">
  
  <p class="message-display mt-2 text-gray-600">{{this.message}}</p>
  
  <!-- Hidden by default, shown when editing -->
  <textarea class="message-input bg-gray-100 border border-gray-300 rounded p-2 text-gray-700 w-full mt-2" style="display: none;">{{this.message}}</textarea>
  
  <div class="mt-4"></div>
  
  <p class="notificationType font-medium text-gray-600">Type: {{this.notificationType}}</p>
  
  {{#if this.dayOfWeek}}
  <p class="dayOfWeek text-gray-600">Day of Week: {{this.dayOfWeek}}</p>
  {{/if}}
  
  {{#if this.specificDate}}
  <p class="specificDate text-gray-600">Specific Date: {{this.specificDate}}</p>
  {{/if}}
  
  <p class="notificationIcon text-gray-600">Notification Icon: {{this.notificationIcon}}</p>
  <p class="notificationColor text-gray-600">Notification Color: {{this.notificationColor}}</p>
  
  <div class="flex items-center justify-start space-x-2 mt-4">
    <button class="edit-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">Edit</button>
    <button class="save-btn bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" style="display: none;">Save</button>
    <button class="delete-btn bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">Delete</button>
  </div>
</div>
{{else}}
<p class="text-gray-600 text-center py-4">No notifications found.</p>
{{/each}}
`;

      const template = Handlebars.compile(templateString);

      const html = template({ notifications: notifications });

      document.getElementById('notifications-container').innerHTML = html;
      console.log('Notifications rendered on the page');

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


  fetchAndRenderNotifications();

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

        notificationDiv.querySelector('.title-display').textContent = title;
        notificationDiv.querySelector('.message-display').textContent = message;
        notificationDiv.querySelector('.title-display').style.display = 'block';
        notificationDiv.querySelector('.message-display').style.display = 'block';
        notificationDiv.querySelector('.title-input').style.display = 'none';
        notificationDiv.querySelector('.message-input').style.display = 'none';
        this.style.display = 'none';
        notificationDiv.querySelector('.edit-btn').style.display = 'inline';
      });


      document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', async function() {
          const notificationDiv = this.closest('.notification');
          const id = notificationDiv.getAttribute('data-id');

          try {
            const response = await fetch(`/api/notifications/${id}`, {
              method: 'DELETE',
              credentials: 'include'

            });

              if (!response.ok) throw new Error('Failed to delete notification');
        console.log('Notification deleted successfully');
        notificationDiv.remove(); 
      } catch (error) {
        console.error('Error deleting notification:', error);
      }
    });
  });
});
  };

