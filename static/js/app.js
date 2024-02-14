// Get data paths
const location_summary = "../Data/location_summary.csv";
const locationData = "../Data/location.csv";
const RainyDays = "/Data/rainydays.json";
const state_summary = "/Data/state_summary.json";

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
  const dropdownWeatherType = d3.select("#selWeatherType");
  // Array of month names
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const weatherType = ["Rain","Wind","Sun"]
  // Clear existing options
  dropdownMenu.html("");
  dropdownWeatherType.html("");
  // Iterate over months to create options
  months.forEach(month => {
    dropdownMenu.append("option").text(month).property("value", month);
  });

  weatherType.forEach(type => {
    dropdownWeatherType.append("option").text(type).property("value", type);
  });

  // Automatically populate with the first month
  optionChanged(months[0]);
  //weatherTypeChanged(weatherType[0]);
}

// Call updateDropdown() initially 
updateDropdown();

function populateData(selectedMonth) {
  // Add data to panel
  d3.json(RainyDays).then((data) => {
     //console.log(data);
    let months = data.filter(process => process.Month === selectedMonth);
    // console.log(months);
  
  let body = d3.select("#locTableBody");
    body.html("");
    for (let i = 0; i < months.length; i++){
      let row = body.append('tr');
      row.append('td').text(months[i].Location);
      row.append('td').text(months[i].RainyDaysPerYear);
      row.append('td').text(months[i].TotalRainfallPerYear_inch);
      row.append('td').text(months[i].TotalRainfallPerYear_mm);
          }
  });

    // Add data to panel for states
    d3.json(state_summary).then((data) => {
      let months = data.filter(state => state.Month === selectedMonth);
      let body = d3.select("#stateTableBody");
      body.html("");
      for (let i = 0; i < months.length; i++){
        let row = body.append('tr');
        row.append('td').text(months[i].State);
        row.append('td').text((months[i].Avg_Rainfall * 0.0393701).toFixed(2)); // Convert mm to inches and round to 2 decimal places
        row.append('td').text(months[i].Avg_Rainfall.toFixed(2)); // Round to 2 decimal places
        // Add more columns as needed
      }
    });


}
function optionChanged(id) {
  populateData(id)
  console.log(id);
};


