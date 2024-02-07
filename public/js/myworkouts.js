document.addEventListener('DOMContentLoaded', () => {
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
          // If you have a server-side to handle the data saving, you may need to refresh or fetch the updated list
          // For simplicity, this example directly appends the new workout to the list without saving to a database
          const scheduledWorkoutsList = document.getElementById('scheduledWorkoutsList');
          const li = document.createElement('li');
          li.classList.add('text-gray-600');
          li.innerHTML = `
            <div>Description: ${workoutName}</div>
            <div>Date: ${workoutDate}</div>
            <div>Time: ${workoutTime}</div>
          `;
          scheduledWorkoutsList.appendChild(li);
  
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
    document.getElementById('scheduleForm').addEventListener('submit', scheduleFormHandler);
});
