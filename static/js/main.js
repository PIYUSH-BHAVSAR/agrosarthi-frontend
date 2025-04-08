// Main JavaScript file for AgriTech website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initAnimations();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize back to top button
    initBackToTop();
    
    // Initialize form submissions
    initFormSubmissions();
});

// Animation on scroll functionality
function initAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    // Show elements that are already in viewport on page load
    checkAnimations();
    
    // Check elements on scroll
    window.addEventListener('scroll', checkAnimations);
    
    function checkAnimations() {
        const triggerBottom = window.innerHeight * 0.8;
        
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('show');
            }
        });
    }
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-bars');
            this.querySelector('i').classList.toggle('fa-times');
        });
    }
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            }
            
            // Update active link
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Update active link on scroll
    window.addEventListener('scroll', updateActiveLink);
    
    function updateActiveLink() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

// Back to top button functionality
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        });
        
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Form submissions
function initFormSubmissions() {
    // Crop Prediction Form
    const cropPredictionForm = document.getElementById('crop-prediction-form');
    if (cropPredictionForm) {
        cropPredictionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // This would normally send data to a backend API
            // For demo purposes, we'll just show a simulated result
            simulateCropPrediction();
        });
    }
    
    // Price Estimation Form
    const priceEstimationForm = document.getElementById('price-estimation-form');
    if (priceEstimationForm) {
        priceEstimationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // This would normally send data to a backend API
            // For demo purposes, we'll just show a simulated result
            simulatePriceEstimation();
        });
    }
    
    // Yield Prediction Form
    const yieldPredictionForm = document.getElementById('yield-prediction-form');
    if (yieldPredictionForm) {
        yieldPredictionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // This would normally send data to a backend API
            // For demo purposes, we'll just show a simulated result
            simulateYieldPrediction();
        });
    }
    
    // Chatbot Form
    const chatbotForm = document.getElementById('chatbot-form');
    if (chatbotForm) {
        chatbotForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const userInput = document.getElementById('user-input').value.trim();
            if (userInput) {
                addUserMessage(userInput);
                document.getElementById('user-input').value = '';
                // Simulate bot response after a short delay
                setTimeout(() => {
                    simulateBotResponse(userInput);
                }, 600);
            }
        });
        
        // Suggestion chips
        const suggestionChips = document.querySelectorAll('.suggestion-chip');
        suggestionChips.forEach(chip => {
            chip.addEventListener('click', function() {
                const chipText = this.textContent;
                document.getElementById('user-input').value = chipText;
                chatbotForm.dispatchEvent(new Event('submit'));
            });
        });
        
        // Voice input button
        const voiceInputBtn = document.getElementById('voice-input-btn');
        if (voiceInputBtn && 'webkitSpeechRecognition' in window) {
            const recognition = new webkitSpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = 'en-US';
            
            voiceInputBtn.addEventListener('click', function() {
                recognition.start();
                voiceInputBtn.classList.add('listening');
                voiceInputBtn.querySelector('i').classList.remove('fa-microphone');
                voiceInputBtn.querySelector('i').classList.add('fa-spinner');
                voiceInputBtn.querySelector('i').classList.add('fa-spin');
            });
            
            recognition.onresult = function(event) {
                const transcript = event.results[0][0].transcript;
                document.getElementById('user-input').value = transcript;
                chatbotForm.dispatchEvent(new Event('submit'));
            };
            
            recognition.onend = function() {
                voiceInputBtn.classList.remove('listening');
                voiceInputBtn.querySelector('i').classList.add('fa-microphone');
                voiceInputBtn.querySelector('i').classList.remove('fa-spinner');
                voiceInputBtn.querySelector('i').classList.remove('fa-spin');
            };
            
            recognition.onerror = function() {
                voiceInputBtn.classList.remove('listening');
                voiceInputBtn.querySelector('i').classList.add('fa-microphone');
                voiceInputBtn.querySelector('i').classList.remove('fa-spinner');
                voiceInputBtn.querySelector('i').classList.remove('fa-spin');
            };
        } else if (voiceInputBtn) {
            // Hide voice button if not supported
            voiceInputBtn.style.display = 'none';
        }
    }
}

// Helper function to add user message to chat
function addUserMessage(message) {
    const chatMessages = document.getElementById('chatbot-messages');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', 'user-message');
    messageElement.innerHTML = `
        <div class="message-content">
            <p>${message}</p>
        </div>
    `;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Helper function to add bot message to chat
function addBotMessage(message) {
    const chatMessages = document.getElementById('chatbot-messages');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', 'bot-message');
    messageElement.innerHTML = `
        <div class="message-content">
            <p>${message}</p>
        </div>
    `;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Simulate bot response based on user input
function simulateBotResponse(userInput) {
    const lowerInput = userInput.toLowerCase();
    let response = "I'm sorry, I don't have information about that yet. Please try asking about common crops, fertilizers, or farming practices.";
    
    // Simple pattern matching for demo purposes
    if (lowerInput.includes('fertilizer') && lowerInput.includes('tomato')) {
        response = "For tomatoes, a balanced NPK fertilizer with a ratio of 5-10-10 is recommended. Apply it when planting and again when the first fruits appear. Organic options include compost tea or well-rotted manure.";
    } else if (lowerInput.includes('aphid')) {
        response = "To control aphids naturally, you can spray plants with a mixture of water and mild soap, introduce ladybugs as natural predators, or use neem oil. For severe infestations, consider organic insecticides specifically labeled for aphid control.";
    } else if (lowerInput.includes('harvest') && lowerInput.includes('wheat')) {
        response = "Wheat is typically ready for harvest when the stalks and heads turn from green to golden yellow and the kernels become hard. In most regions, this occurs in early to mid-summer, about 7-8 months after planting for winter wheat.";
    } else if (lowerInput.includes('water') && lowerInput.includes('rice')) {
        response = "Rice typically requires 1,200 to 1,500 mm of water per growing season. Maintain a water depth of 5-10 cm during the vegetative stage. Water management is crucial - fields should be drained 2-3 weeks before harvest.";
    } else if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
        response = "Hello! I'm your farming assistant. How can I help you with your agricultural questions today?";
    } else if (lowerInput.includes('thank')) {
        response = "You're welcome! If you have any more questions about farming, feel free to ask.";
    }
    
    addBotMessage(response);
}

// Simulate crop prediction results
function simulateCropPrediction() {
    const nitrogen = parseFloat(document.getElementById('nitrogen').value);
    const phosphorus = parseFloat(document.getElementById('phosphorus').value);
    const potassium = parseFloat(document.getElementById('potassium').value);
    const temperature = parseFloat(document.getElementById('temperature').value);
    const humidity = parseFloat(document.getElementById('humidity').value);
    const rainfall = parseFloat(document.getElementById('rainfall').value);
    const ph = parseFloat(document.getElementById('ph').value);
    
    const resultsContainer = document.getElementById('crop-results');
    
    // Simple logic for demonstration purposes
    let recommendedCrops = [];
    
    // High N, P, K values (rice, wheat, maize)
    if (nitrogen > 80 && phosphorus > 40 && potassium > 40) {
        recommendedCrops.push('Rice', 'Wheat', 'Maize');
    }
    
    // Low pH, high rainfall (tea, coffee)
    if (ph < 6 && rainfall > 200) {
        recommendedCrops.push('Tea', 'Coffee');
    }
    
    // High temperature, low rainfall (cotton, millet)
    if (temperature > 25 && rainfall < 100) {
        recommendedCrops.push('Cotton', 'Millet');
    }
    
    // Moderate temperature, high humidity (vegetables)
    if (temperature > 15 && temperature < 30 && humidity > 60) {
        recommendedCrops.push('Tomato', 'Cucumber', 'Cabbage');
    }
    
    // Ensure we have at least some recommendations
    if (recommendedCrops.length === 0) {
        recommendedCrops = ['Wheat', 'Barley', 'Potato'];
    }
    
    // Remove duplicates
    recommendedCrops = [...new Set(recommendedCrops)];
    
    // Display results
    let resultsHTML = '<div class="prediction-results">';
    resultsHTML += '<h4>Based on your soil and climate data:</h4>';
    resultsHTML += '<ul class="crop-list">';
    
    recommendedCrops.forEach(crop => {
        resultsHTML += `<li><i class="fas fa-check-circle"></i> ${crop}</li>`;
    });
    
    resultsHTML += '</ul>';
    resultsHTML += '<p class="note">These recommendations are based on the provided data. For more accurate results, consider consulting with a local agricultural expert.</p>';
    resultsHTML += '</div>';
    
    resultsContainer.innerHTML = resultsHTML;
}

// Simulate price estimation results
function simulatePriceEstimation() {
    const crop = document.getElementById('crop-select').value;
    const market = document.getElementById('market-select').value;
    const quantity = parseFloat(document.getElementById('quantity').value);
    
    const resultsContainer = document.getElementById('price-results');
    const chartContainer = document.getElementById('price-chart');
    const estimatedValueContainer = document.getElementById('estimated-value');
    
    // Sample price data (in rupees per kg) for demonstration
    const priceData = {
        rice: { local: 25, state: 28, national: 30 },
        wheat: { local: 22, state: 24, national: 26 },
        maize: { local: 18, state: 20, national: 22 },
        cotton: { local: 60, state: 65, national: 70 },
        sugarcane: { local: 3, state: 3.5, national: 4 },
        potato: { local: 15, state: 18, national: 20 },
        tomato: { local: 25, state: 30, national: 35 },
        onion: { local: 20, state: 25, national: 30 }
    };
    
    // Sample monthly price trends for the past 6 months
    const months = ['January', 'February', 'March', 'April', 'May', 'June'];
    const trendData = {
        rice: [24, 25, 26, 28, 29, 30],
        wheat: [20, 21, 22, 23, 24, 26],
        maize: [16, 17, 18, 19, 20, 22],
        cotton: [55, 58, 60, 63, 65, 70],
        sugarcane: [2.8, 3.0, 3.2, 3.5, 3.8, 4.0],
        potato: [12, 14, 15, 16, 18, 20],
        tomato: [20, 22, 25, 28, 30, 35],
        onion: [15, 18, 20, 22, 25, 30]
    };
    
    // Calculate estimated value
    const currentPrice = priceData[crop][market];
    const estimatedValue = currentPrice * quantity;
    
    // Create chart
    if (chartContainer) {
        // Clear previous chart if it exists
        chartContainer.innerHTML = '<canvas id="price-trend-chart"></canvas>';
        
        const ctx = document.getElementById('price-trend-chart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: months,
                datasets: [{
                    label: `${crop.charAt(0).toUpperCase() + crop.slice(1)} Price Trend (₹/kg)`,
                    data: trendData[crop],
                    backgroundColor: 'rgba(76, 175, 80, 0.2)',
                    borderColor: 'rgba(76, 175, 80, 1)',
                    borderWidth: 2,
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: false,
                        title: {
                            display: true,
                            text: 'Price (₹/kg)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Month'
                        }
                    }
                }
            }
        });
    }
    
    // Display estimated value
    if (estimatedValueContainer) {
        estimatedValueContainer.innerHTML = `
            <p>Current Market Price: ₹${currentPrice}/kg</p>
            <p>Estimated Value for ${quantity}kg: <strong>₹${estimatedValue.toLocaleString()}</strong></p>
        `;
    }
    
    // Remove placeholder text
    const placeholderText = resultsContainer.querySelector('.placeholder-text');
    if (placeholderText) {
        placeholderText.remove();
    }
}

// Simulate yield prediction results
function simulateYieldPrediction() {
    const crop = document.getElementById('yield-crop-select').value;
    const area = parseFloat(document.getElementById('area').value);
    const soil = document.getElementById('soil-type').value;
    const irrigation = document.getElementById('irrigation').value;
    const fertilizer = document.getElementById('fertilizer-use').value;
    
    const resultsContainer = document.getElementById('yield-results');
    
    // Base yield data (in quintals per acre) for demonstration
    const baseYieldData = {
        rice: 25,
        wheat: 20,
        maize: 30,
        cotton: 15,
        sugarcane: 350,
        potato: 120,
        tomato: 150,
        onion: 100
    };
    
    // Soil type multipliers
    const soilMultipliers = {
        clay: 0.9,
        loamy: 1.2,
        sandy: 0.8,
        black: 1.1,
        red: 0.95
    };
    
    // Irrigation method multipliers
    const irrigationMultipliers = {
        drip: 1.3,
        sprinkler: 1.2,
        flood: 1.0,
        rainfed: 0.7
    };
    
    // Fertilizer usage multipliers
    const fertilizerMultipliers = {
        high: 1.3,
        medium: 1.1,
        low: 0.9,
        organic: 1.0
    };
    
    // Calculate estimated yield
    const baseYield = baseYieldData[crop];
    const soilFactor = soilMultipliers[soil];
    const irrigationFactor = irrigationMultipliers[irrigation];
    const fertilizerFactor = fertilizerMultipliers[fertilizer];
    
    const estimatedYield = baseYield * soilFactor * irrigationFactor * fertilizerFactor;
    const totalYield = estimatedYield * area;
    
    // Display results
    let resultsHTML = '<div class="yield-results">';
    resultsHTML += '<h4>Yield Prediction Results:</h4>';
    resultsHTML += `<p class="yield-estimate">Estimated Yield: <strong>${estimatedYield.toFixed(2)} quintals/acre</strong></p>`;
    resultsHTML += `<p class="total-yield">Total Expected Yield for ${area} acres: <strong>${totalYield.toFixed(2)} quintals</strong></p>`;
    
    // Add recommendations based on inputs
    resultsHTML += '<h4>Recommendations to Improve Yield:</h4>';
    resultsHTML += '<ul class="recommendations-list">';
    
    // Soil-based recommendations
    if (soil === 'sandy') {
        resultsHTML += '<li><i class="fas fa-info-circle"></i> Sandy soil has poor water retention. Consider adding organic matter to improve soil structure.</li>';
    } else if (soil === 'clay') {
        resultsHTML += '<li><i class="fas fa-info-circle"></i> Clay soil has poor drainage. Consider raised beds or adding organic matter to improve drainage.</li>';
    }
    
    // Irrigation-based recommendations
    if (irrigation === 'flood') {
        resultsHTML += '<li><i class="fas fa-info-circle"></i> Flood irrigation is less efficient. Consider switching to drip irrigation to save water and improve yield.</li>';
    } else if (irrigation === 'rainfed') {
        resultsHTML += '<li><i class="fas fa-info-circle"></i> Rainfed agriculture is dependent on rainfall patterns. Consider water harvesting techniques or supplemental irrigation.</li>';
    }
    
    // Fertilizer-based recommendations
    if (fertilizer === 'low') {
        resultsHTML += '<li><i class="fas fa-info-circle"></i> Low fertilizer usage may limit yield potential. Consider soil testing to optimize fertilizer application.</li>';
    } else if (fertilizer === 'high') {
        resultsHTML += '<li><i class="fas fa-info-circle"></i> High fertilizer usage may lead to environmental issues. Consider precision agriculture techniques to optimize application.</li>';
    }
    
    resultsHTML += '</ul>';
    resultsHTML += '<p class="note">These predictions are estimates based on general data. Actual yields may vary based on specific local conditions, seed quality, and management practices.</p>';
    resultsHTML += '</div>';
    
    resultsContainer.innerHTML = resultsHTML;
}