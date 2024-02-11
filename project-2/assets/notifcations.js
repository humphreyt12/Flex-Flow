// console.log('trees')

// document.addEventListener('DOMContentLoaded', function() {
//   const specificDay = document.getElementById('specificDay');
//   const specificDate = document.getElementById('specificDate');
//   const dayOfWeek = document.getElementById('dayOfWeek');
//   const CalendarDate = document.getElementById('CalendarDate');
//   const onReopen = document.getElementById('onReopen')

//   function updateInputFields() {
//     if (specificDay.checked) {
//       dayOfWeek.style.display = 'block';
//       CalendarDate.style.display = 'none';
//     } else if (specificDate.checked) {
//       dayOfWeek.style.display = 'none';
//       CalendarDate.style.display = 'block'
//     } else if (onReopen.checked) {
//       dayOfWeek.style.display = 'none';
//       CalendarDate.style.display = 'none'
//     } else {
//       dayOfWeek.style.display = 'none';
//       CalendarDate.style.display = 'none';
//     }
//   }
//   onReopen.addEventListener('change', function(){
//     if (this.checked) {
//       specificDate.checked = false;
//       specificDay.checked = false;
//     }
//     updateInputFields();
//   })
  
//   specificDate.addEventListener('change', function(){
//     if (this.checked) {
//       specificDay.checked = false;
//       onReopen.checked = false;
//     }
//     updateInputFields();
//   })
//   specificDay.addEventListener('change',function() {
//     if (this.checked) {
//       specificDate.checked = false;
//       onReopen.checked = false;
//     }
//     updateInputFields();
//   })
//   updateInputFields();
// })

// function saveFormData() {

// const formData = {
//         title: document.getElementById('titleInput').value,
//         message: document.getElementById('messageInput').value,
//         onReopen: document.getElementById('onReopen').checked,
//         specificDay: document.getElementById('specificDay').checked,
//         specificDate: document.getElementById('specificDate').checked,
//         dayOfWeek: document.getElementById('dayOfWeek').value,
//         calendarDate: document.getElementById('CalendarDate').value,
//         notificationColor: document.getElementById('colorSelector').value,
//         notificationIcon: document.getElementById('iconSelector').value,
//         // Include user_id if needed, or handle user association on the server-side
//     };
//     // Use Fetch API to send the POST request
//     fetch('/notification', {
//       method: 'POST',
//       headers: {
//           'Content-Type': 'application/json',
//           // Include authentication headers if necessary
//           // 'Authorization': 'Bearer <YourAuthTokenHere>',
//       },
//       body: JSON.stringify(formData),
//   })
//   .then(response => {
//       if (!response.ok) {
//           throw new Error('Network response was not ok');
//       }
//       return response.json();
//   })
//   .then(data => {
//       console.log('Success:', data);
//       // Handle success, such as redirecting to another page or showing a success message
//   })
//   .catch((error) => {
//       console.error('Error:', error);
//       // Handle errors, such as showing an error message to the user
//   });
// }

// document.addEventListener('DOMContentLoaded', function() {
//   // Function to fetch and render notifications
//   function fetchAndRenderNotifications() {
//       fetch('/notifications') // Adjust the endpoint as needed
//           .then(response => {
//               if (!response.ok) {
//                   throw new Error('Network response was not ok');
//               }
//               return response.json();
//           })
//           .then(data => {
//               // Assuming 'data' is an array of notifications
//               const templateScript = document.getElementById('notification-template').innerHTML;
//               const template = Handlebars.compile(templateScript);
//               const html = template({ notifications: data });
//               document.getElementById('notifications-container').innerHTML = html;
//           })
//           .catch(error => {
//               console.error('Error fetching notifications:', error);
//               // Optionally, handle the error in the UI, e.g., show an error message
//           });
//   }

//   // Call the function to fetch and render notifications
//   fetchAndRenderNotifications();
// });

// async function updateNotification(id, updatedData) {
//   try {
//       const response = await fetch(`/api/notifications/${id}`, {
//           method: 'PUT',
//           headers: {
//               'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(updatedData),
//       });

//       if (!response.ok) {
//           throw new Error(`Error: ${response.statusText}`);
//       }

//       const updatedNotification = await response.json();
//       console.log('Updated notification:', updatedNotification);
//       // Handle the response data...
//   } catch (error) {
//       console.error('Failed to update notification:', error);
//   }
// }




// /*
// document.getElementById('notificationForm').addEventListener('submit', function(e) {
//     e.preventDefault();

//     const formData = {
//         title: document.getElementById('titleInput').value,
//         message: document.getElementById('messageInput').value,
//         displayType: document.getElementById('displayType',  ).value,
//         notificationType: document.getElementById('colorSelector').value,
//         iconSelector: document.getElementById('iconSelector').value
//     };

//     fetch('/submit-notification', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//     })
//     .then(response => response.text())
//     .then(data => {
//         alert(data); // Or handle your success case here
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//     });
// });

// document.addEventListener('DOMContentLoaded', function() {
//     fetchNotifications();
//   });
  
//   function fetchNotifications() {
//     fetch('/notifications')
//       .then(response => response.json())
//       .then(data => {
//         console.log(data); // Process and display notifications as needed
//         // For example, checking if current time is past notification's triggerTime and display it
//       });
//   }

//   function fetchAndDisplayNotifications() {
//     // Fetch notifications from your backend
//     fetch('/notifications')
//       .then(response => response.json())
//       .then(notifications => {
//         const today = new Date().getDay(); // Gets the current day of the week (0-6)
//         const todaysNotifications = notifications.filter(notification => notification.dayOfWeek === today);
        
//         // Display today's notifications
//         todaysNotifications.forEach(notification => {
//           displayNotification(notification);
//         });
//       });
//   }
  
//   document.addEventListener('DOMContentLoaded', function() {
//     fetchAndDisplayNotifications();
//   });

//   function fetchAndDisplayNotifications() {
//     fetch('/notifications')
//       .then(response => response.json())
//       .then(notifications => {
//         const now = new Date();
//         const today = now.getDay();
//         const currentTime = now.toTimeString().substr(0, 5); // "HH:MM" format
  
//         notifications.forEach(notification => {
//           switch (notification.displayType) {
//             case 'onReopen':
//               displayNotification(notification);
//               break;
//             case 'specificDay':
//               if (notification.dayOfWeek === today) {
//                 displayNotification(notification);
//               }
//               break;
//             case 'specificTime':
//               // Compare both day and time if needed
//               if (notification.timeOfDay === currentTime) {
//                 displayNotification(notification);
//               }
//               break;
//           }
//         });
//       });
//   }
  
//   document.addEventListener('DOMContentLoaded', fetchAndDisplayNotifications);

//   document.addEventListener('DOMContentLoaded', function() {
//     const displayTypeSelect = document.getElementById('displayType');
//     const dayOfWeekInput = document.getElementById('dayOfWeek');
//     const timeOfDayInput = document.getElementById('timeOfDay');
//     const specificDateInput = document.getElementById('specificDate');

//     function updateInputVisibility() {
//       // Hide all input fields first
//       dayOfWeekInput.classList.add('hidden');
//       timeOfDayInput.classList.add('hidden');
//       specificDateInput.classList.add('hidden');
      
//       // Show the relevant input field based on the selected option
//       const displayType = displayTypeSelect.value;
//       if (displayType === 'specificDay') {
//         dayOfWeekInput.classList.remove('hidden');
//       } else if (displayType === 'specificTime') {
//         timeOfDayInput.classList.remove('hidden');
//       } else if (displayType === 'specificDate') {
//         specificDateInput.classList.remove('hidden');
//       }
//     }

//     // Listen for changes to the display type and update input visibility accordingly
//     displayTypeSelect.addEventListener('change', updateInputVisibility);

//     // Initial update in case the form is pre-filled or defaults need applying
//     updateInputVisibility();
//   });

//   /*
//   let title = document.getElementById('titleInput').value
//   let message = document.getElementById('messageInput').value
//   let displayType = document.getElementById('displayType').value
//   let notificationType = document.getElementById('colorSelector').value
//   let iconSelector = document.getElementById('iconSelector').value
//   */