document.addEventListener('DOMContentLoaded', () => {
    // Function to handle button clicks
    const handleButtonClick = (event) => {
        const buttonId = event.target.id;
        console.log(`Button ${buttonId} was clicked`);

        // Example actions based on buttonId
        switch (buttonId) {
            case 'workouts':
                console.log('Navigating to My Workouts...');
                // Navigate to the My Workouts page or load workouts data
                // Example: window.location.href = '/my-workouts';
                break;
            case 'diets':
                console.log('Navigating to My Diets...');
                // Navigate to the My Diets page or load diets data
                break;
            case 'methods':
                console.log('Navigating to Workout Methods...');
                // Navigate to the Workout Methods page
                break;
            case 'suggestions':
                console.log('Navigating to Diet Suggestions...');
                // Navigate to the Diet Suggestions page
                break;
            default:
                console.log('Unknown button');
        }
    };

    // Attach click event listeners to the buttons
    // Wait for the template to be rendered and buttons to be available in the DOM
    setTimeout(() => {
        const buttons = document.querySelectorAll('button[type="submit"]');
        buttons.forEach(button => {
            button.addEventListener('click', handleButtonClick);
        });
    }, 0); // Using setTimeout with 0 delay as a simple way to wait for the dynamic content
});
