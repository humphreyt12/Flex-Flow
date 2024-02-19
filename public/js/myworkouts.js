  const scheduleFormHandler = async (event) => {
    event.preventDefault();

    
    // Retrieve values from form fields
    const workout_name = document.querySelector('#workout-name').value.trim();
    const date = document.querySelector('#workout-date').value.trim();
    const time = document.querySelector('#workout-time').value.trim();

    if (workout_name && date && time) {
      // Assuming a server-side endpoint exists to save the scheduled workouts
      const response = await fetch(`/api/workouts`, {
        method: 'POST',
        
        body: JSON.stringify({ workout_name, date, time }),
        headers: {
          'Content-Type': 'application/json',
        
        },
      });
// Log the response status code
console.log('Response status code:', response.status);

      if (response.ok) {
        const workouts = await response.json(); // Parse the response body as JSON
        console.log('Workout:', workouts); // Log the workouts array
        document.location.replace('/myworkouts');
      } else {
        alert('Failed to create workout');
      }
    }
  };

  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/workouts/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/myworkouts');
      } else {
        console.error('failed to delete workout');
        alert('Failed to delete workout');
      }
    }
  };

  document.querySelector('.scheduleForm')
  .addEventListener('submit', scheduleFormHandler);



document.querySelector('.scheduledWorkoutsList')
.addEventListener('click', delButtonHandler);


    
