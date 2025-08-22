// Map 


// Initialize map centered at New Delhi by default
var map = L.map('map').setView([28.6139, 77.2090], 12);

// Load and display OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Marker (to update location)
var marker = L.marker([28.6139, 77.2090]).addTo(map)
    .bindPopup('<b>New Delhi</b><br>Default location.')
    .openPopup();
