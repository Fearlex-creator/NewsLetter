document.getElementById('subscribe-btn').addEventListener('click', function() {
    const emailInput = document.getElementById('email-input');
    const email = emailInput.value.trim();

    // Simple email validation
    if (email !== '' && email.includes('@') && email.includes('.')) {
        // Get the user's IP address using a free API (you may need to replace this with your own API endpoint)
        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => {
                const ipAddress = data.ip;
                // Send the IP address to the backend
                sendIPAddressToBackend(ipAddress);
                alert(`Thank you for subscribing!\n\nYour IP Address: ${ipAddress}`);
                emailInput.value = ''; // Clear the email input
            })
            .catch(error => {
                console.error('Error fetching IP address:', error);
            });
    } else {
        alert('Please enter a valid email address.');
    }
});

function sendIPAddressToBackend(ipAddress) {
    // Send the IP address to the backend using a POST request
    fetch('/store-ip', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ipAddress }),
    })
        .then(response => {
            if (response.status === 200) {
                console.log('IP address sent to the backend successfully.');
            } else {
                console.error('Failed to send IP address to the backend.');
            }
        })
        .catch(error => {
            console.error('Error sending IP address to the backend:', error);
        });
}
