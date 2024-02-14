// Get data paths
const location_summary = "../Data/location_summary.csv";
const locationData = "../Data/location.csv";
const RainyDays = "/Data/rainydays.json";
const state_summary = "../Data/state_summary.csv";

let data = {};

// Fetch the JSON data (with d3.csv) and console log it
d3.csv(state_summary).then(function(result) {
    data = result;
    console.log(data);
    updateDropdown(); // Call the function after data is fetched
});

// Create functions
function updateDropdown() {
    const dropdownMenu = d3.select("#selDataset");

    // Array of month names
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // Clear existing options
    dropdownMenu.html("");

    // Iterate over months to create options
    months.forEach(month => {
        dropdownMenu.append("option").text(month).property("value", month);
    });

    // Automatically populate with the first month
    optionChanged(months[0]);
}

// Call updateDropdown() initially 
updateDropdown();

function populateData(selectedMonth) {
    // Add data to panel
    d3.json(RainyDays).then((data) => {
        // console.log(data);
        let months = data.filter(process => process.Month === selectedMonth);
        // console.log(months);

        let body = d3.select("tbody");
        body.html("");
        for (let i = 0; i < months.length; i++) {
            let row = body.append('tr');
            row.append('td').text(months[i].RainyDaysPerYear);
            row.append('td').text(months[i].Location);
            row.append('td').text(months[i].TotalRainfall_inch);
            row.append('td').text(months[i].TotalRainfallPerYear_mm);
        }
    });
}

function optionChanged(id) {
    populateData(id);
    console.log(id);
}

// Leaflet Map Initialization
function initMap() {
    // Initialize map
    const map = L.map('map').setView([-25.2744, 133.7751], 4);

    // Add a tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
}

// Call initMap() after the DOM has loaded
document.addEventListener('DOMContentLoaded', function() {
    initMap();
});

// Fetch the location summary data for markers
d3.json("../Data/location_summary.json").then(function(locations) {
  // Iterate over the locations
  locations.forEach(function(location) {
      // Extract relevant information
      var name = location.Location;
      var latitude = parseFloat(location.Latitude);
      var longitude = parseFloat(location.Longitude);
      var minTemp = location.Avg_MinTemp.toFixed(2);
      var maxTemp = location.Avg_MaxTemp.toFixed(2);

      // Create a marker with a popup containing temperature information
      var marker = L.marker([latitude, longitude])
          .bindPopup("Location: " + name + "<br> Avg Min Temp: " + minTemp + "°C<br> Avg Max Temp: " + maxTemp + "°C")
          .addTo(map);
  });
});

