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
   return options.value
};

// Define helper function to gather all text entries
function retrieve_inputs() {
    var inputs = d3.selectAll("input");
    var inputs = inputs._groups[0];
    var input_obj = {};
    inputs.forEach(input => {
    // Ensure inputs are converted to lower case to match data in data.js
    input_obj[String(input.id)] = input.value.toLowerCase();
    });
    //console.log(input_obj);
    return input_obj;
};

// Define helper function to drop the previous table values
function clear_table() {
    var temp_tr = d3.selectAll(".temp-tr").remove();
}

filterTable.on("submit", function() {
  // Prevent the page from refreshing
  d3.event.preventDefault();
  clear_table();
  // use helper functions to retrieve inputs
  var shape = monitor_shape();
  var input_obj =  retrieve_inputs();
  // add shape into input obj
  input_obj['shape'] = shape;
  // Declare filter variables
  var filtdate = input_obj['datetime'];
  var filtcity = input_obj['city'];
  var filtstate = input_obj['state'];
  var filtcountry = input_obj['country'];
  var filtshape = input_obj['shape'];

  // Filter the tableData for an exact match for the criteria provided
  var filteredData = tableData.filter(event => {
    // If all values are undefined ("") filter no events
    // This is almost certainly a suboptimal solution
    if (filtdate === "") {var _date = event.datetime}
    else {var _date = filtdate}
    if (filtcity === "") {var _city = event.city}
    else {var _city = filtcity}
    if (filtstate === "") {var _state = event.state}
    else {var _state = filtstate}
    if (filtcountry === "") {var _country = event.country}
    else {var _country = filtcountry}
    if (filtshape === "") {var _shape = event.shape}
    else {var _shape = filtshape}
    if (_date === event.datetime &&
        _city === event.city &&
        _state === event.state &&
        _country === event.country &&
        _shape === event.shape) {return event};
});
  // Loop over the filteredData and add <tr> and <td> elements to hold data
  var tableBody = d3.select("#ufo-table").select("tbody");
  filteredData.forEach(object => {
    tableBody.append("tr").attr("class","temp-tr"),
    tableBody.append("td").text(object.datetime).attr("class","temp-tr"),
    tableBody.append("td").text(object.city.toUpperCase()).attr("class","temp-tr"),
    tableBody.append("td").text(object.state.toUpperCase()).attr("class","temp-tr"),
    tableBody.append("td").text(object.country.toUpperCase()).attr("class","temp-tr"),
    tableBody.append("td").text(object.shape).attr("class","temp-tr"),
    tableBody.append("td").text(object.durationMinutes).attr("class","temp-tr"),
    tableBody.append("td").text(object.comments).attr("class","temp-tr")
  });
});