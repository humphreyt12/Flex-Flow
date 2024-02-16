let notifier;

// We initialize the AWN notifier after the library has loaded
document.addEventListener('DOMContentLoaded', () => {
  notifier = new AWN({
    maxNotifications: 6,
    // The rest of your global options...
  });

  fetchAndDisplayNotifications();
});

async function fetchAndDisplayNotifications() {
  try {
    const response = await fetch('/api/notifications/', { credentials: 'include' });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const notifications = await response.json();
    const today = new Date(); // Today's date for comparison

    notifications.forEach(notification => {
      // Check if notification should be displayed today
      if (shouldDisplayNotification(notification, today)) {
        displayNotification(notification);
      }
    });
  } catch (error) {
    console.error('Error fetching and displaying notifications:', error);
  }
}

function shouldDisplayNotification(notification, today) {
// Check for "onReopen" type - always display these notifications
if (notification.notificationType === 'onReopen') {
  return true;
}

// Check for "specificDay" type
if (notification.notificationType === 'specificDay' && notification.specificDate) {
  // Convert specificDate to Date object for comparison, if not already done
  if (typeof notificationDate === 'string') {
    notificationDate = new Date(notification.specificDate);
  }
  // Check if the specificDate is today
  return notificationDate.toDateString() === today.toDateString();
}

// Check for "dayOfWeek" type
if (notification.notificationType === 'dayOfWeek' && notification.dayOfWeek) {
  const dayOfWeekToday = today.toLocaleString('en-US', { weekday: 'long' }); // e.g., "Monday"
  // Check if today is the specified day of the week
  return notification.dayOfWeek === dayOfWeekToday;
}

// Default to not displaying the notification
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
