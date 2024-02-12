Months

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
  populateBarChart(months[0]);
}