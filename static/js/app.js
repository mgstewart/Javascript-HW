// from data.js
var tableData = data;
// populate an array shapes with unique shape values from the data array
var shapes = []
tableData.forEach(x => {
    if (shapes.includes(x.shape)) {}
    else {
        shapes.push(x.shape);
    };
});

// use D3 to select the dropdown
var select = d3.select("select");
// use D3 to append options iteratively of unique shapes within HTML
shapes.forEach(shape => {
    select.append("option")
    .text(shape)
    .attr("value",shape);
});
// Select the Filter Form Submit Button
var filterTable = d3.select("form");

// Define helper function to grab current selected shape
function monitor_shape() {
   var shape_select = d3.select("#shape-select");
   var options = shape_select._groups[0][0]
   //console.log(options.value);
};

// Define helper function to gather all text entries
function retrieve_inputs() {
    var inputs = d3.selectAll("input");
    var inputs = inputs._groups[0]
    inputs.forEach(input => {
        
    });
    console.log(inputs);
};

filterTable.on("submit", function() {
  // Prevent the page from refreshing
  d3.event.preventDefault();
  monitor_shape();
  retrieve_inputs();
  // Use D3 to select all input & select values
  var inputs = d3.select("option");
  console.log(inputs.value);

  // Filter the tableData for an exact match for the criteria provided
  var filteredData = tableData.filter(event => event.datetime === inputValue);
  // Return the filtered Data
  console.log(filteredData);
  // Loop over the filteredData and add <tr> and <td> elements to hold data
  var tableBody = d3.select("#ufo-table").select("tbody");
  filteredData.forEach(object => {
    tableBody.append("tr"),
    tableBody.append("td").text(object.datetime),
    tableBody.append("td").text(object.city.toUpperCase()),
    tableBody.append("td").text(object.state.toUpperCase()),
    tableBody.append("td").text(object.country.toUpperCase()),
    tableBody.append("td").text(object.shape),
    tableBody.append("td").text(object.durationMinutes),
    tableBody.append("td").text(object.comments)
  });
  var newRow = tableBody.append("tr")
});