// document.addEventListener('DOMContentLoaded', () => {
  const scheduleFormHandler = async (event) => {
    event.preventDefault();

    // Retrieve values from form fields
    const workoutName = document.querySelector('input[type="text"]').value.trim();
    const workoutDate = document.querySelector('input[type="date"]').value.trim();
    const workoutTime = document.querySelector('input[type="time"]').value.trim();

    if (workoutName && workoutDate && workoutTime) {
      // Assuming a server-side endpoint exists to save the scheduled workouts
      const response = await fetch(`/api/workouts`, {
        method: 'POST',
        body: JSON.stringify({ workout: workoutName, date: workoutDate, time: workoutTime }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const scheduledWorkoutsList = document.getElementById('scheduledWorkoutsList');
        // Check if the "No scheduled workouts yet" message exists and remove it
        const noWorkoutsMessage = document.querySelector('#scheduledWorkoutsList li.text-gray-600');
        if (noWorkoutsMessage && noWorkoutsMessage.textContent === 'No scheduled workouts yet.') {
          scheduledWorkoutsList.removeChild(noWorkoutsMessage);
        }

        // Append the new workout to the list
        const workoutDiv = document.createElement('div');
workoutDiv.classList.add( 'grid', 'grid-col-4', 'col-span-2', 'bg-gray-100', 'p-4', 'rounded-lg', 'shadow-md', 'mb-4', 'text-black', 'font-semibold', 'text-lg',  'justify-between', 'items-center');
workoutDiv.innerHTML = `
  <div class="workout-info">
    <div>Workout: ${workoutName}</div>
    <div>Date: ${workoutDate}</div>
    <div>Time: ${workoutTime}</div>
  </div>
  <button class="delete-btn px-4 py-2 bg-red-500 text-white rounded">Delete</button>
`;
scheduledWorkoutsList.appendChild(workoutDiv);


        // Reset form fields after submission
        document.querySelector('input[type="text"]').value = '';
        document.querySelector('input[type="date"]').value = '';
        document.querySelector('input[type="time"]').value = '';
      } else {
        alert('Failed to schedule workout');
      }
    } else {
      alert('Please fill out all fields.');
    }
  };
    
  // Add event listener to the form submission
 document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.querySelector('.scheduleForm');
    if(form) {
        form.addEventListener('submit', scheduleFormHandler);
    } else {
        console.error('Form not found');
    }
});

  document.getElementById('scheduledWorkoutsList').addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('delete-btn')) {
      // Remove the parent <li> element of the delete button
      e.target.parentNode.remove();
    }
  
  });
    
