// Get data paths
// const location_summary = "../Data/location_summary.csv";
const locationData = "../Data/location.csv";
const RainyDays = "/Data/rainydays.json";
const state_summary = "../Data/state_summary.json";

let data = {};

// Fetch the JSON data (with d3.csv) and console log it
d3.json(state_summary).then(function(result) {
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

function updateMarkers(selectedMonth) {
    // Fetch the location summary data for markers
    d3.json("../Data/location_summary.json").then(function(locations) {
        // Clear existing markers
        map.eachLayer(function(layer) {
            if (layer instanceof L.Marker) {
                map.removeLayer(layer);
            }
        });

        // Filter locations based on the selected month
        let filteredLocations = locations.filter(location => location.Month === selectedMonth);

        // Iterate over the filtered locations
        filteredLocations.forEach(function(location) {
            // Extract relevant information
            var name = location.Location;
            var latitude = parseFloat(location.Latitude);
            var longitude = parseFloat(location.Longitude);
            var month = location.Month;
            var minTemp = location.Avg_MinTemp.toFixed(2) + "°C / " + (((location.Avg_MinTemp * 9 / 5) + 32).toFixed(2)) + "°F";
            var maxTemp = location.Avg_MaxTemp.toFixed(2) + "°C / " + (((location.Avg_MaxTemp * 9 / 5) + 32).toFixed(2)) + "°F";
            var rainfall = location.Avg_Rainfall.toFixed(2);
            var windSpeed9am = location.Avg_WindSpeed9am.toFixed(2) + " km/h / " + (location.Avg_WindSpeed9am * 0.621371).toFixed(2) + " mph";
            var windSpeed3pm = location.Avg_WindSpeed3pm.toFixed(2) + " km/h / " + (location.Avg_WindSpeed3pm * 0.621371).toFixed(2) + " mph";
            var humidity9am = location.Avg_Humidity9am.toFixed(2);
            var humidity3pm = location.Avg_Humidity3pm.toFixed(2);

            // Create a marker with a popup information
            var marker = L.marker([latitude, longitude])
            // make location name blue
            .bindPopup("<span style='color: blue; font-size: 16px;'>Location: " + name + "</span><br> Month: " + month + "<br> Avg Min Temp: <span style='color: red;'>" + minTemp + "</span><br> Avg Max Temp: <span style='color: red;'>" + maxTemp + "</span><br> Avg Rainfall: <span style='color: cyan;'>" + rainfall + "mm</span><br> Avg Wind Speed (9am): <span style='color: darkgrey;'>" + windSpeed9am + "</span><br> Avg Wind Speed (3pm): <span style='color: darkgrey;'>" + windSpeed3pm + "</span><br> Avg Humidity (9am): <span style='color: grey;'>" + humidity9am + "%</span><br> Avg Humidity (3pm): <span style='color: grey;'>" + humidity3pm + "%</span>")
                .addTo(map);
        });
    });
}

function optionChanged(id) {
    populateData(id);
    updateMarkers(id);
}
