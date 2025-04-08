document.getElementById("crop-prediction-form").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get form data
    const formData = new FormData(event.target);

    // Create an object from the form data
    const data = {
        nitrogen: formData.get('nitrogen'),
        phosphorus: formData.get('phosphorus'),
        potassium: formData.get('potassium'),
        ph: formData.get('ph'),
        humidity: formData.get('humidity'),
        rainfall: formData.get('rainfall'),
        temperature: formData.get('temperature'),
    };

    try {
        // Send a POST request to the backend (FastAPI)
        const response = await fetch('https://agrosarthi-backend-885337506715.asia-south1.run.app/predict/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), // Send data as JSON
        });

        // Handle the response from the backend
       // Handle the response from the backend
       const result = await response.json();

       if (response.ok) {
           // Assuming result contains the predicted crops, update the webpage with the result
           const predictionContainer = document.getElementById('crop-results');
           if (predictionContainer) {
               predictionContainer.innerHTML = `
                   <h3>Predicted Suitable Crops</h3>
                   <p>${result.predicted_crop}</p>
               `;
           }
       } else {
           console.error('Error:', result.detail);
       }
   } catch (error) {
       console.error('Error while fetching the data:', error);
   }
});