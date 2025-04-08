document.getElementById('chatbot-form').addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent the form from reloading the page
    
    const userInput = document.getElementById('user-input').value; // Get the user's input
    
    // Display the user's message in the chatbox
    const chatMessages = document.getElementById('chatbot-messages');
    chatMessages.innerHTML += `<div class="message user-message"><div class="message-content"><p>${userInput}</p></div></div>`;
    
    // Scroll to the bottom of the chat
    chatMessages.scrollTop = chatMessages.scrollHeight;
  
    // Clear the input field
    document.getElementById('user-input').value = '';
  
    // Add a loading message while waiting for the response
    const loadingMessage = document.createElement('div');
    loadingMessage.classList.add('message', 'bot-message');
    loadingMessage.innerHTML = '<div class="message-content"><p>Loading...</p></div>';
    chatMessages.appendChild(loadingMessage);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  
    try {
      // Send the query to the FastAPI backend
      const response = await fetch('https://agrosarthi-backend-885337506715.asia-south1.run.app/query/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userInput })
      });
  
      const data = await response.json(); // Parse the JSON response
  
      // Remove the loading message
      chatMessages.removeChild(loadingMessage);
  
      // Display the response from the Gemini API or error message
      const botResponse = data.response || data.error || "Sorry, I couldn't find an answer.";
      chatMessages.innerHTML += `<div class="message bot-message"><div class="message-content"><p>${botResponse}</p></div></div>`;
      
      // Scroll to the bottom after displaying the response
      chatMessages.scrollTop = chatMessages.scrollHeight;
      
    } catch (error) {
      // If an error occurs while fetching, display an error message
      chatMessages.removeChild(loadingMessage);  // Remove the loading message
      chatMessages.innerHTML += `<div class="message bot-message"><div class="message-content"><p>Sorry, there was an error with the request.</p></div></div>`;
      chatMessages.scrollTop = chatMessages.scrollHeight;
      console.error('Error:', error);  // Log the error in the console for debugging
    }
  });
  