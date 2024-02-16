const dietFormHandler = async (event) => {
  event.preventDefault();



    // Capture the form input values
    const mealName = document.getElementById('mealName').value.trim();
    const mealDate = document.getElementById('mealDate').value.trim();
    const mealTime = document.getElementById('mealTime').value.trim();

    // Check if any field is empty
    if (mealName  && mealDate && mealTime) {
    // Assuming a server-side endpoint exists to save the diet plans
    const response = await fetch(`/api/diets`, {
      method: 'POST',
      body: JSON.stringify({ mealName: mealName, mealDate: mealDate, mealTime: mealTime }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const dietPlansList = document.getElementById('dietPlansList');
        // Check if the "No scheduled workouts yet" message exists and remove it
        const noDietMessage = document.querySelector('#dietPlanList li.text-gray-600');
        if (noDietMessage && noDietMessage.textContent === 'No scheduled meals yet.') {
          dietPlansList.removeChild(noDietMessage);
        }
      // Append the new diet plan to the list dynamically
      const dietPlanDiv = document.createElement('div');
      dietPlanDiv.classList.add('col-span-2', 'bg-gray-100', 'p-4', 'rounded-lg', 'shadow-md', 'mb-4', 'text-black', 'font-semibold', 'text-lg', 'justify-between', 'items-center');
      dietPlanDiv.innerHTML = `
        <div class="diet-info">
          <div>Meal: ${mealName}</div>
          <div>Date: ${mealDate}</div>
          <div>Time: ${mealTime}</div>
        </div>
        <button class="delete-btn px-4 py-2 bg-red-500 text-white rounded">Delete</button>
      `;
      dietPlansList.appendChild(dietPlanDiv);

      // Optionally clear the form fields after submission
      document.getElementById('mealName').value = '';
      document.getElementById('mealDate').value = '';
      document.getElementById('mealTime').value = '';
    } else {
      alert('Failed to add diet plan');
    }
    } else {
      alert('Please fill out all fields.');
    }
  };


    const form = document.querySelector('.dietPlanForm');
    if(form) {
        form.addEventListener('submit', dietFormHandler);
    } else {
        console.error('Form not found');
    }


  // Event listener for delete buttons
  document.getElementById('dietPlansList').addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('delete-btn')) {
      // Remove the parent <li> element of the delete button
      e.target.parentNode.remove();
    }
  });