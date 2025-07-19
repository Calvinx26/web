document.addEventListener('DOMContentLoaded', function () {
    console.log('aboutus-form.js loaded');
    const form = document.querySelector('.contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent actual form submission

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        if (!name || !email || !message) {
            alert('Please enter your Name, email and feedback');
            return;
        }

        // --- Save custom order info to localStorage ---
        let contactOrders = [];
        if (localStorage.getItem('contactOrders')) {
            try {
                contactOrders = JSON.parse(localStorage.getItem('contactOrders'));
            } catch (e) {
                contactOrders = [];
            }
        }

        const newSubmission = {
            name: name,
            email: email,
            message: message,
            submittedAt: new Date().toISOString()
        };

        contactOrders.push(newSubmission);
        localStorage.setItem('contactOrders', JSON.stringify(contactOrders));

        alert('Thank you for your message! Your information has been saved.');
        form.reset();
    });
});
