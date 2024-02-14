// Get data paths
const location_summary = "/Data/location_summary.json";
const locationData = "../Data/location.csv";
const RainyDays = "/Data/rainydays.json";
const state_summary = "/Data/state_summary.json";

let weatherType = "Rain"; // Initialize weatherType with "Rain"

// Fetch the JSON data (with d3.csv) and console log it
d3.csv(state_summary).then(function (result) {
  data = result;
  console.log(data);
  updateDropdown(); // Call the function after data is fetched
});

// Create functions
function updateDropdown() {
  const dropdownMenu = d3.select("#selDataset");
  const dropdownWeatherType = d3.select("#selWeatherType");
  // Array of month names
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const weatherTypes = ["Rain","Temp","Wind", "Humidity"]
  // Clear existing options
  dropdownMenu.html("");
  dropdownWeatherType.html("");
  // Iterate over months to create options
  months.forEach(month => {
    dropdownMenu.append("option").text(month).property("value", month);
  });

  weatherTypes.forEach(type => {
    dropdownWeatherType.append("option").text(type).property("value", type);
  });

  // Automatically populate with the first month
  optionChanged(months[0]);
  // Set the default weather type to "Rain" when the page loads
  dropdownWeatherType.node().value = "Rain";

  // Event listener for weather type dropdown
  dropdownWeatherType.on("change", function() {
    weatherType = this.value; // Update weatherType variable with selected value
    populateData(d3.select("#selDataset").node().value); // Populate data with selected month
  });
}

// Call updateDropdown() initially 
updateDropdown();

function populateData(selectedMonth, weatherType) {
  if (weatherType === "Rain") {
    // Show rain tables and populate rain data
    d3.json(RainyDays).then((data) => {
      let months = data.filter(process => process.Month === selectedMonth);
      let body = d3.select("#locTableBodyRain");
      body.html("");
      months.forEach(month => {
        let row = body.append('tr');
        row.append('td').text(month.Location);
        row.append('td').text(month.RainyDaysPerYear);
        row.append('td').text(month.TotalRainfallPerYear_inch);
        row.append('td').text(month.TotalRainfallPerYear_mm);
      });
    });

    d3.json(state_summary).then((data) => {
      let months = data.filter(state => state.Month === selectedMonth);
      let body = d3.select("#stateTableBodyRain");
      body.html("");
      months.forEach(month => {
        let row = body.append('tr');
        row.append('td').text(month.State);
        row.append('td').text((month.Avg_Rainfall * 0.0393701).toFixed(2)); // Convert mm to inches and round to 2 decimal places
        row.append('td').text(month.Avg_Rainfall.toFixed(2)); // Round to 2 decimal places
         
      });
    });

    // Hide temperature tables
    d3.select("#locTableTemp").style("display", "none");
    d3.select("#stateTableTemp").style("display", "none");
    d3.select("#locTableWind").style("display", "none");
    d3.select("#stateTableWind").style("display", "none");
    d3.select("#locTableHum").style("display", "none");
    d3.select("#stateTableHum").style("display", "none");
    // Show rain tables
    d3.select("#locTableRain").style("display", "block");
    d3.select("#stateTableRain").style("display", "block");
  }  else if (weatherType === "Temp") {
    // Show temperature tables and populate temperature data
    // Use d3.json to fetch JSON data for temperature
    d3.json(location_summary).then((data) => {
      let months = data.filter(process => process.Month === selectedMonth);
      let body = d3.select("#locTableBodyTemp");
      body.html("");
      months.forEach(month => {
        let row = body.append('tr');
        row.append('td').text(month.Location);
        row.append('td').text(month.Avg_MinTemp.toFixed(2));
        row.append('td').text(month.Avg_MaxTemp.toFixed(2) ); 
        row.append('td').text(((month.Avg_MinTemp * 9/5) + 32).toFixed(2));
        row.append('td').text(((month.Avg_MaxTemp * 9/5) + 32).toFixed(2)); 
      });
    });
    d3.json(state_summary).then((data) => {
      let months = data.filter(state => state.Month === selectedMonth);
      let body = d3.select("#stateTableBodyTemp");
      body.html("");
      months.forEach(month => {
        let row = body.append('tr');
        row.append('td').text(month.State);
        row.append('td').text((month.Avg_MinTemp).toFixed(2)); // Convert mm to inches and round to 2 decimal places
        row.append('td').text(month.Avg_MaxTemp.toFixed(2)); // Round to 2 decimal places
        row.append('td').text(((month.Avg_MinTemp * 9/5) + 32).toFixed(2));
        row.append('td').text(((month.Avg_MaxTemp * 9/5) + 32).toFixed(2)); 
        
      });
    });

    // Hide rain tables
    d3.select("#locTableRain").style("display", "none");
    d3.select("#stateTableRain").style("display", "none");
    d3.select("#locTableWind").style("display", "none");
    d3.select("#stateTableWind").style("display", "none");
    d3.select("#locTableHum").style("display", "none");
    d3.select("#stateTableHum").style("display", "none");
    // Show temperature tables
    d3.select("#locTableTemp").style("display", "block");
    d3.select("#stateTableTemp").style("display", "block");
  }  else if (weatherType === "Wind") {
    // Show temperature tables and populate temperature data
    // Use d3.json to fetch JSON data for temperature
    d3.json(location_summary).then((data) => {
      let months = data.filter(process => process.Month === selectedMonth);
      let body = d3.select("#locTableBodyWind"); // Corrected selector here
      body.html("");
      months.forEach(month => {
        let row = body.append('tr');
        row.append('td').text(month.Location);
        if (month.Avg_WindGustSpeed !== null) {
          row.append('td').text(month.Avg_WindGustSpeed.toFixed(2));
          row.append('td').text((month.Avg_WindGustSpeed * 0.621371).toFixed(2)); // Convert km/h to mph and round to 2 decimal places
        } else {
          row.append('td').text(""); // Display blank cell if wind speed is null
          row.append('td').text(""); // Display blank cell if wind speed is null
        }
      });
    });
    d3.json(state_summary).then((data) => {
      let months = data.filter(state => state.Month === selectedMonth);
      let body = d3.select("#stateTableBodyWind");
      body.html("");
      months.forEach(month => {
        let row = body.append('tr');
        row.append('td').text(month.State);
        row.append('td').text(month.Avg_WindGustSpeed.toFixed(2));
        row.append('td').text((month.Avg_WindGustSpeed * 0.621371).toFixed(2)); // Convert km/h to mph and round to 2 decimal places
        
      });
    });

    // Hide rain tables
    d3.select("#locTableRain").style("display", "none");
    d3.select("#stateTableRain").style("display", "none");
    d3.select("#locTableTemp").style("display", "none");
    d3.select("#stateTableTemp").style("display", "none");
    d3.select("#locTableHum").style("display", "none");
    d3.select("#stateTableHum").style("display", "none");
    // Show Wind tables
    d3.select("#locTableWind").style("display", "block");
    d3.select("#stateTableWind").style("display", "block");
  } else if (weatherType === "Humidity") {
    // Show temperature tables and populate temperature data
    // Use d3.json to fetch JSON data for temperature
    d3.json(location_summary).then((data) => {
      let months = data.filter(process => process.Month === selectedMonth);
      let body = d3.select("#locTableBodyHum"); // Corrected selector here
      body.html("");
      months.forEach(month => {
        let row = body.append('tr');
        row.append('td').text(month.Location);
        row.append('td').text(month.Avg_Humidity9am.toFixed(2)); 
        row.append('td').text(month.Avg_Humidity3pm.toFixed(2)); 
      });
    });
    d3.json(state_summary).then((data) => {
      let months = data.filter(state => state.Month === selectedMonth);
      let body = d3.select("#stateTableBodyHum");
      body.html("");
      months.forEach(month => {
        let row = body.append('tr');
        row.append('td').text(month.State);
        row.append('td').text(month.Avg_Humidity9am.toFixed(2)); 
        row.append('td').text(month.Avg_Humidity3pm.toFixed(2)); 
        
      });
    });

    // Hide rain tables
    d3.select("#locTableRain").style("display", "none");
    d3.select("#stateTableRain").style("display", "none");
    d3.select("#locTableTemp").style("display", "none");
    d3.select("#stateTableTemp").style("display", "none");
    d3.select("#locTableWind").style("display", "none");
    d3.select("#stateTableWind").style("display", "none");
    // Show Wind tables
    d3.select("#locTableHum").style("display", "block");
    d3.select("#stateTableHum").style("display", "block");
  }
}

function optionChanged(id, type) {
  populateData(id, type)
  console.log(id);
};

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


