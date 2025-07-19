// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function () {
    // Get the subscribe button and the email input field
    const subscribeBtn = document.querySelector('.subscribe-btn');
    const emailInput = document.querySelector('.footer-subscribe input[type="email"]');

    // Add event listener to the subscribe button
    subscribeBtn.addEventListener('click', function () {
        // Check if the email field is empty
        if (!emailInput.value.trim()) {
            alert('Please fill out this field.');
        } else {
            alert('Thank you for subscribing.');
            // Optionally clear the field after successful subscribe
            // emailInput.value = '';
        }
    });
});
