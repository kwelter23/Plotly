//Reference to dropdown
var dropDown = d3.select("#sample-metadata");

// Use D3 fetch to read the JSON file
// The data from the JSON file is arbitrarily named importedData as the argument
d3.json("samples.json").then((importedData) => {
    console.log(importedData.names);
    var data = importedData;
 
    var select = document.getElementById("selDataset"); 
    for(var i = 0; i < importedData.names.length; i++) {
        var ID = importedData.names[i];
        var selection = document.createElement("option");
        selection.textContent = ID;
        selection.value = ID;
        select.appendChild(selection);
    }
//populateDemogaphics(data);


//Sort for Bar Graph
//var topTenOTU = sample_values.sort((a, b) => b-a).slice(0, 10)
//console.log(topTenOTU)


  // Render the plot to the div tag with id "plot"
  //Plotly.newPlot("plot", chartData, layout);
});

//Create demogaphic function
function populateDemogaphics (filteredData) {
  //get data
  //filteredData = data;

  //reference demogrphic box
  var demographicBox = d3.select("#sample-metadata");
  //clear box 
  demographicBox.html("");

  //Get selected ID
 var selectedID = d3.select("#sample-metadata").property("value");
  if (selectedID != "--Select--"){
    var filteredData = filteredData.filter(demographicData => demographicData.id === selectedID);
  }
  console.log(filteredData);
} 
/*/ Getting new data when ID is selected
dropDown.on("optionChanged", function() {
  populateDemogaphics(data)
  console.log("this is filtered");
});*/