
document.getElementById('send-button').addEventListener('click', function() {
    const userInput = document.getElementById('user-input').value;
    if (userInput) {
        // Display the user's message
        const userMessageElement = document.createElement('div');
        userMessageElement.classList.add('user-message');
        userMessageElement.textContent = userInput;
        document.querySelector('.messages').appendChild(userMessageElement);

        // Clear the input field
        document.getElementById('user-input').value = '';

        // Display bot's thinking message
        const botMessageElement = document.createElement('div');
        botMessageElement.classList.add('bot-message');
        botMessageElement.textContent = 'Echo Mind is thinking...';
        document.querySelector('.messages').appendChild(botMessageElement);

        // Make a real-time API call to get the bot's response
        fetch('http://localhost:5000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userMessage: userInput }),
        })
        .then(response => response.json())
        .then(data => {
            // Replace the thinking message with the bot's response
            botMessageElement.textContent = data.botResponse;
        })
        .catch(error => {
            console.error('Error:', error);
            botMessageElement.textContent = 'Sorry, something went wrong.';
        });

        // Scroll to the bottom
        document.querySelector('.messages').scrollTop = document.querySelector('.messages').scrollHeight;
    }
});
