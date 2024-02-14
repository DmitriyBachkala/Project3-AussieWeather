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

    // Add data to panel for states
    d3.json(state_summary).then((data) => {
      let months = data.filter(state => state.Month === selectedMonth);
      let body = d3.select("#state-table tbody");
      body.html("");
      for (let i = 0; i < months.length; i++){
        let row = body.append('tr');
        row.append('td').text(months[i].state);
        row.append('td').text(months[i].Avg_MaxTemp);
        row.append('td').text(months[i].Avg_MinTemp); 
        // Add more columns as needed
      }
    });


}
function optionChanged(id) {
  populateData(id)
  console.log(id);
};


