let notifier;

//placed in a domcontentloaded to create scope around the notifier and other variables and identifiers in the function 
document.addEventListener('DOMContentLoaded', () => {
  notifier = new AWN({
    maxNotifications: 6,
  });

  fetchAndDisplayNotifications();
});

async function fetchAndDisplayNotifications() {
  try {
    const response = await fetch('/api/notifications/', { credentials: 'include' });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const notifications = await response.json();
    const today = new Date(); 

    notifications.forEach(notification => {
      if (shouldDisplayNotification(notification, today)) {
        displayNotification(notification);
      }
    });
  } catch (error) {
    console.error('Error fetching and displaying notifications:', error);
  }
}

function shouldDisplayNotification(notification, today) {
if (notification.notificationType === 'onReopen') {
  return true;
}

if (notification.notificationType === 'specificDay' && notification.specificDate) {
  if (typeof notificationDate === 'string') {
    notificationDate = new Date(notification.specificDate);
  }
  return notificationDate.toDateString() === today.toDateString();
}

if (notification.notificationType === 'dayOfWeek' && notification.dayOfWeek) {
  const dayOfWeekToday = today.toLocaleString('en-US', { weekday: 'long' }); 
  return notification.dayOfWeek === dayOfWeekToday;
}

return false;
}

function displayNotification(notification) {
  const method = colorToMethod(notification.notificationColor);

  if (method && notifier && typeof notifier[method] === 'function') {
    const options = {
      labels: {
        tip: notification.title,
        alert: notification.title,
        info: notification.title,
        success: notification.title,
        warning: notification.title
      },
      icons: {
        enabled: true,
        prefix: "<img src='",
        [method]: notification.notificationIcon,
        suffix: "'/>"
      }
    };

    notifier[method](notification.message, options);
  }
}

function colorToMethod(color) {
  switch (color) {
    case 'gray': return 'tip';
    case 'blue': return 'info';
    case 'orange': return 'warning';
    case 'green': return 'success';
    case 'red': return 'alert';
    default: console.warn('Unknown notification color:', color); return null;
  }
}