// Get data paths
const location_summary = "/Data/location_summary.json";
const RainyDays = "/Data/rainydays.json";
const state_summary = "/Data/state_summary.json";

let weatherType = "Rain"; // Initialize weatherType with "Rain"

// Fetch the JSON data (with d3.csv) and console log it
d3.csv(state_summary).then(function(result) {
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
    const weatherTypes = ["Rain", "Temp", "Wind", "Humidity"]
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
        d3.select("#windploty").style("display", "none");
        d3.select("#humidityplot").style("display", "none");
        d3.select("#tempploty").style("display", "none");


        // Show rain tables
        d3.select("#locTableRain").style("display", "block");
        d3.select("#stateTableRain").style("display", "block");
    } else if (weatherType === "Temp") {
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
                row.append('td').text(month.Avg_MaxTemp.toFixed(2));
                row.append('td').text(((month.Avg_MinTemp * 9 / 5) + 32).toFixed(2));
                row.append('td').text(((month.Avg_MaxTemp * 9 / 5) + 32).toFixed(2));
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
                row.append('td').text(((month.Avg_MinTemp * 9 / 5) + 32).toFixed(2));
                row.append('td').text(((month.Avg_MaxTemp * 9 / 5) + 32).toFixed(2));

            });
        });

        // Hide rain tables
        d3.select("#locTableRain").style("display", "none");
        d3.select("#stateTableRain").style("display", "none");
        d3.select("#locTableWind").style("display", "none");
        d3.select("#stateTableWind").style("display", "none");
        d3.select("#locTableHum").style("display", "none");
        d3.select("#stateTableHum").style("display", "none");
        d3.select("#windploty").style("display", "none");
        d3.select("#humidityplot").style("display", "none");


        // Show temperature tables
        d3.select("#locTableTemp").style("display", "block");
        d3.select("#stateTableTemp").style("display", "block");
        d3.select("#tempploty").style("display", "block");
    } else if (weatherType === "Wind") {
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
        d3.select("#tempploty").style("display", "none");
  
        d3.select("#humidityplot").style("display", "none");

        // Show Wind tables
        d3.select("#locTableWind").style("display", "block");
        d3.select("#stateTableWind").style("display", "block");
        d3.select("#windploty").style("display", "block");

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
        d3.select("#windploty").style("display", "none");
        d3.select("#tempploty").style("display", "none");
        // Show Wind tables
        d3.select("#locTableHum").style("display", "block");
        d3.select("#stateTableHum").style("display", "block");

        d3.select("#humidityplot").style("display", "block");

    }
}

function addBarCharts(selectedMonth, weatherType) {
    if (weatherType === "Humidity") {
        d3.json(location_summary).then((data) => {
            //filter by the month selected
            let barMonths = data.filter(results => results.Month === selectedMonth);
            console.log(barMonths);

            //select all of the cities
            let cityLocation = [];
            let mornHumidity = [];
            let aftHumidity = [];

            for (let i = 0; i < barMonths.length; i++) {
                cityLocation.push(barMonths[i].Location);
                mornHumidity.push(barMonths[i].Avg_Humidity9am);
                aftHumidity.push(barMonths[i].Avg_Humidity3pm);
            }

            // Create traces for humidity data
            let morningHumidity = {
                x: cityLocation,
                y: mornHumidity,
                type: "bar",
                name: "Morning Humidity"
            };

            let afternoonHumidity = {
                x: cityLocation,
                y: aftHumidity,
                type: "bar",
                name: "Afternoon Humidity"
            };

            // Apply a title to the layout
            let layout = {
                title: `Humidity by City in ${selectedMonth}`,
                barmode: "group",
                // Include margins in the layout so the x-tick labels display correctly
                margin: {
                    l: 50,
                    r: 50,
                    b: 200,
                    t: 50,
                    pad: 4
                }
            };

            // The data array consists of both humidity traces
            let chartInfo = [morningHumidity, afternoonHumidity];
            // Plot the humidity chart
            Plotly.newPlot("humidityplot", chartInfo, layout);
        });
    } else if (weatherType === "Wind") {
        d3.json(location_summary).then((data) => {
            //filter by the month selected
            let barMonths = data.filter(results => results.Month === selectedMonth);
            console.log(barMonths);

            //select all of the cities
            let cityLocation = [];
            let mornW = [];
            let aftW = [];

            for (let i = 0; i < barMonths.length; i++) {
                cityLocation.push(barMonths[i].Location);
                mornW.push(barMonths[i].Avg_WindSpeed9am);
                aftW.push(barMonths[i].Avg_WindSpeed3pm);
            }

            // Create traces for humidity data
            let morningW = {
                x: cityLocation,
                y: mornW,
                type: "bar",
                name: "Morning Wind Speed"
            };

            let afternoonW = {
                x: cityLocation,
                y: aftW,
                type: "bar",
                name: "Afternoon Wind Speed"
            };

            // Apply a title to the layout
            let layout = {
                title: `Wind by City in ${selectedMonth}`,
                barmode: "group",
                // Include margins in the layout so the x-tick labels display correctly
                margin: {
                    l: 50,
                    r: 50,
                    b: 200,
                    t: 50,
                    pad: 4
                }
            };

            // The data array consists of both humidity traces
            let chartInfo = [morningW, afternoonW];
            // Plot the humidity chart
            Plotly.newPlot("windplot", chartInfo, layout);
        });
    }   else if (weatherType === "Temp") {
        d3.json(location_summary).then((data) => {
            //filter by the month selected
            let barMonths = data.filter(results => results.Month === selectedMonth);
            console.log(barMonths);

            //select all of the cities
            let cityLocation = [];
            let mornW = [];
            let aftW = [];

            for (let i = 0; i < barMonths.length; i++) {
                cityLocation.push(barMonths[i].Location);
                mornW.push(barMonths[i].Avg_Temp9am);
                aftW.push(barMonths[i].Avg_Temp3pm);
            }

            // Create traces for humidity data
            let morningW = {
                x: cityLocation,
                y: mornW,
                type: "bar",
                name: "Morning Temp"
            };

            let afternoonW = {
                x: cityLocation,
                y: aftW,
                type: "bar",
                name: "Afternoon Temp"
            };

            // Apply a title to the layout
            let layout = {
                title: `Temp by City in ${selectedMonth}`,
                barmode: "group",
                // Include margins in the layout so the x-tick labels display correctly
                margin: {
                    l: 50,
                    r: 50,
                    b: 200,
                    t: 50,
                    pad: 4
                }
            };

            // The data array consists of both humidity traces
            let chartInfo = [morningW, afternoonW];
            // Plot the humidity chart
            Plotly.newPlot("tempplot", chartInfo, layout);
        });
    } 
    else {
        // Code for handling other weather types
    }
}


// Fetch the location summary data for markers
d3.json("../Data/location_summary.json").then(function(locations) {
    // Iterate over the locations
    locations.forEach(function(location) {
        // Extract relevant information
        var name = location.Location;
        var latitude = parseFloat(location.Latitude);
        var longitude = parseFloat(location.Longitude);
        var month = location.Month;
        var minTemp = location.Avg_MinTemp.toFixed(2);
        var maxTemp = location.Avg_MaxTemp.toFixed(2);
  
        // Create a marker with a popup containing temperature information
        var marker = L.marker([latitude, longitude])
            .bindPopup("Location: " + name + "<br> Month: " + month + "<br> Avg Min Temp: " + minTemp + "°C<br> Avg Max Temp: " + maxTemp + "°C")
            .addTo(map);
    });
  });




function optionChanged(id, type) {
    populateData(id, type)
    addBarCharts(id, type)
    console.log(id);
};

 