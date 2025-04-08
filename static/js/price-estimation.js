document.getElementById('price-estimation-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    // Collect data from the form
    const data = {
        "district": document.getElementById("district-select").value,
        "month": document.getElementById("month-select").value,
        "market": document.getElementById("market-select").value,
        "commodity": document.getElementById("commodity-select").value,
        "variety": document.getElementById("variety-select").value,
        "agri_season": document.getElementById("agri-season-select").value,
        "climate_season": document.getElementById("climate-season-select").value
    };

    // Perform the fetch request to your backend endpoint
    fetch('https://agrosarthi-backend-885337506715.asia-south1.run.app/predict-price/', {
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
        // Display the predicted price on the page
        if (data.predicted_price) {
            document.getElementById('price-results').innerHTML = `Predicted Price: ₹${data.predicted_price}`;
        } else {
            document.getElementById('price-results').innerHTML = 'Error: No price predicted.';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        // Display error message if fetch request fails
        document.getElementById('price-results').innerHTML = 'Error: Unable to fetch prediction.';
    });
});
