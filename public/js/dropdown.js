document.addEventListener( function() {
    // Get the button and the dropdown menu
    const dropdownButton = document.getElementById('Dropdown');
    const dropdownMenu = document.getElementById('dropdown');
    // Add click event listener to the button
    dropdownButton.addEventListener('click', function() {
        // Toggle the 'hidden' class on the dropdown menu
        dropdownMenu.classList.toggle('hidden');
    });
});