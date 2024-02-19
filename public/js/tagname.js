  new Promise((resolve, reject) => {
      let tag = document.createElement('script');
      tag.src = "/js/index.var.js";
      tag.async = true;
      tag.onload = () => {
          resolve();
      };

      let firstScript = document.getElementsByTagName('script')[0]
      firstScript.parentNode.insertBefore(tag, firstScript);
  }).then(() => {
      notifier = new AWN({
          maxNotifications: 6,
          durations: {
              global: 60000}
          }
      )    
  });
  