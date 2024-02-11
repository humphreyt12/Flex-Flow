// document.getElementById('notificationForm').addEventListener('submit', function(e) {
//     e.preventDefault();

//     const formData = {
//         title: document.getElementById('titleInput').value,
//         message: document.getElementById('messageInput').value,
//         notificationTime: document.getElementById('notificationTime').value,
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