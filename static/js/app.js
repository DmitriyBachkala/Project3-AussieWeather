// Get data paths
const location_summary = "../Data/location_summary.json";
const locationData = "../Data/location.json";
const RainyDays = "/Data/rainydays.json";
const state_summary = "../Data/state_summary.json";

let data = {}

// Fetch the JSON data (with d3.csv) and console log it
d3.csv(state_summary).then(function (result) {
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
    for (let i = 0; i < months.length; i++){
      let row = body.append('tr');
      row.append('td').text(months[i].RainyDaysPerYear);
      row.append('td').text(months[i].Location);
      row.append('td').text(months[i].TotalRainfall_inch);
      row.append('td').text(months[i].TotalRainfallPerYear_mm);
          }
  });
}
function optionChanged(id) {
  populateData(id)
  addBarCharts(id)
  console.log(id);
};


function addBarCharts(selectedMonth) {
  d3.json(location_summary).then((data) => {
    //filter by the month selected
    let barMonths = data.filter(results => results.Month === selectedMonth);
    console.log(barMonths);

    //select all of the cities
    // let cityLocation = [barMonths.Location];
    // let mornHumidity = [barMonths.Avg_Humidity9am];
    //console.log(cityLocation);
    let cityLocation = [];
    let mornHumidity = [];
    let aftHumidity = [];

    for (let i = 0; i < barMonths.length; i++) {
      cityLocation.push(barMonths[i].Location);
      mornHumidity.push(barMonths[i].Avg_Humidity9am);
      aftHumidity.push(barMonths[i].Avg_Humidity3pm);
    }
    console.log(mornHumidity);

  // Create our first trace
  let morningHumidity = {
    x: cityLocation,
    y: mornHumidity,
    type: "bar",
    name: "Morning Humidity"
  };


  //  "Avg_Humidity9am" "Avg_Humidity3pm"
  // Create our second trace
  let afternoonHumidity = {
    x: cityLocation,
    y: aftHumidity,
    type: "bar",
    name: "Afternoon Humidity"
  };

  // let afternoonHumidity = {
  //   x: [0, 1, 2, 3, 4, 5],
  //   y: [0, 1, 4, 9, 16, 25],
  //   type: "bar"
  // };

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


  // The data array consists of both traces
  let chartInfo = [morningHumidity, afternoonHumidity];

  // Note that we omitted the layout object this time
  // This will use default parameters for the layout
  Plotly.newPlot("humidityplot", chartInfo, layout);


  })
};// Get data paths
const location_summary = "../Data/location_summary.csv";
const locationData = "../Data/location.csv";
const RainyDays = "/Data/rainydays.json";
const state_summary = "../Data/state_summary.csv";

let data = {}

// Fetch the JSON data (with d3.csv) and console log it
d3.csv(state_summary).then(function (result) {
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
    for (let i = 0; i < months.length; i++){
      let row = body.append('tr');
      row.append('td').text(months[i].RainyDaysPerYear);
      row.append('td').text(months[i].Location);
      row.append('td').text(months[i].TotalRainfall_inch);
      row.append('td').text(months[i].TotalRainfallPerYear_mm);
          }
  });
}
function optionChanged(id) {
  populateData(id)
  console.log(id);
};


