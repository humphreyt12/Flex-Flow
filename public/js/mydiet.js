const dietFormHandler = async (event) => {
  event.preventDefault();

    // Capture the form input values
    const mealName = document.querySelector('#mealName').value.trim();
    const mealDate = document.querySelector('#mealDate').value.trim();
    const mealTime = document.querySelector('#mealTime').value.trim();

    // Check if any field is empty
    if (mealName  && mealDate && mealTime) {
    // Assuming a server-side endpoint exists to save the diet plans
    const response = await fetch(`/api/diets`, {
      method: 'POST',
      body: JSON.stringify({ mealName, mealDate, mealTime }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Response status code:', response.status);

    if (response.ok) {
      const diets = await response.json(); // Parse the response body as JSON
      console.log('diet:', diets);
      document.location.replace('/mydiets');
    } else {
      alert('Failed to create diet');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/diets/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/mydiets');
    } else {
      console.error('failed to delete diet');
      alert('Failed to delete diet');
    }
  }
};
  
document.querySelector('.dietPlanForm')
  .addEventListener('submit', dietFormHandler);

  document.querySelector('.dietPlansList')
.addEventListener('click', delButtonHandler);