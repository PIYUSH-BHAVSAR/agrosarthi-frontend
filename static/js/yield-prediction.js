document.getElementById('yield-prediction-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    // Collect data from the form
    const data = {
        "state": document.getElementById("state").value,
        "commodity": document.getElementById("commodity").value,
        "district": document.getElementById("district").value,
        "season": document.getElementById("season").value,
        "area_hectare": parseFloat(document.getElementById("area_hectare").value)
    };

    // Perform the fetch request to your backend endpoint
    fetch('https://agrosarthi-backend-885337506715.asia-south1.run.app/predict-yield/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // Send data as JSON
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the JSON response
    })
    .then(data => {
        // Display the predicted yield on the page
        if (data.predicted_yield_ton_ha) {
            document.getElementById('yield-results').innerHTML = `
                <p><strong>Predicted Yield:</strong> ${data.predicted_yield_ton_ha} tons/ha</p>
                <p><strong>State:</strong> ${data.state}</p>
                <p><strong>District:</strong> ${data.district}</p>
                <p><strong>Commodity:</strong> ${data.commodity}</p>
                <p><strong>Season:</strong> ${data.season}</p>
                <p><strong>Area:</strong> ${data.area_hectare} hectares</p>
            `;
        } else {
            document.getElementById('yield-results').innerHTML = 'Error: No yield predicted.';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        // Display error message if fetch request fails
        document.getElementById('yield-results').innerHTML = 'Error: Unable to fetch prediction.';
    });
});
