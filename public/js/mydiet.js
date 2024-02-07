document.addEventListener('DOMContentLoaded', function() {
    const dietPlanForm = document.getElementById('dietPlanForm');
    const dietPlansList = document.getElementById('dietPlansList');
    const dietPlanTemplateScript = document.getElementById('diet-plan-template').innerHTML;
    const template = Handlebars.compile(dietPlanTemplateScript);
  
    dietPlanForm.addEventListener('submit', function(event) {
      event.preventDefault();
  
      // Capture the form input values
      const mealName = document.getElementById('mealName').value.trim();
      const mealDescription = document.getElementById('mealDescription').value.trim();
      const mealDate = document.getElementById('mealDate').value.trim();
      const mealTime = document.getElementById('mealTime').value.trim();
  
      // Prepare the data object for the template
      const mealData = {
        mealName,
        mealDescription,
        mealDate,
        mealTime
      };
  
      // Check if any field is empty
      if (!mealName || !mealDescription || !mealDate || !mealTime) {
        alert('Please fill out all fields.');
        return;
      }
  
      // Use the template to create the HTML
      const html = template([mealData]);
  
      // Append the new meal plan to the list
      dietPlansList.insertAdjacentHTML('beforeend', html);
  
      // Optionally clear the form fields after submission
      document.getElementById('mealName').value = '';
      document.getElementById('mealDescription').value = '';
      document.getElementById('mealDate').value = '';
      document.getElementById('mealTime').value = '';
    });
  });
  