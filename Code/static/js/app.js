// Use D3 fetch to read the JSON file
// The data from the JSON file is arbitrarily named importedData as the argument
d3.json("samples.json").then((importedData) => {
  //console.log(importedData.names);
  window.data = importedData;
  var select = document.getElementById("selDataset");

  for(var i = 0; i < data.names.length; i++) {
      var ID = data.names[i];
      var selection = document.createElement("option");
      selection.textContent = ID;
      selection.value = ID;
      select.appendChild(selection);
  }

});

//BAR Graph Function (this code from office hours)
function barGraph(sampleId){
  d3.json("samples.json").then((data) => {

    var samples = data.samples;
    var resultArray = samples.filter(s => s.id == sampleId);
    var result = resultArray[0];

    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;

    var yticks =otu_ids.slice(0, 10).map(otuId => `OTU ${otuId}`).reverse()


    var barData = {
      x: sample_values.slice(0, 10).reverse(),
      y: yticks,
      type: "bar",
      text: otu_labels.slice(0, 10).reverse(),
      orientation: "h"
    }

    var barlayout = {
      title: "Top Ten OTU",
      margin: {t: 30, l: 150},
      yaxis: {title:"OTU"},
      xaxis: {title:"Number"},
    }

  Plotly.newPlot("bar", [barData], barlayout);


 });
}
//BUBBLE Graph Function
function bubbleGraph(sampleId){
  d3.json("samples.json").then((data) => {

    var samples = data.samples;
    var resultArray = samples.filter(s => s.id == sampleId);
    var result = resultArray[0];

    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;

    //var yticks =otu_ids.slice(0, 10).map(otuId => `OTU ${otuId}`).reverse()


    var bubbleData = {
      x: otu_ids,
      y: sample_values,
      mode: "markers",
      type: "bubble",
      marker: {size: sample_values, color: otu_ids},
      text: otu_labels
    }

    var bubblelayout = {
      title: "All Samples",
      margin: {t: 30, l: 150},
      yaxis: {title:"Number"},
      xaxis: {title:"OTU ID"},
    }

  Plotly.newPlot("bubble", [bubbleData], bubblelayout);


 });
}


//Create demogaphic function
function optionChanged (selectedID) {
  // Get data
  var filteredData = window.data;
  var selectedIDInt = parseInt(selectedID,10)

  // Reference demographic box
  var demographicBox = d3.select("#sample-metadata");
  //clear box 
  demographicBox.html("");
  console.log(filteredData)

  // Use just the metadata array
  var metadata = filteredData.metadata
  console.log(selectedID)

  //var selectedID = d3.select("#sample-metadata").property("value");
  if (selectedID != "--Select--"){
    var selectedMetadata = metadata.filter(demographicData => {return demographicData.id === selectedIDInt});
  }
  
  console.log(selectedMetadata)
   //fill Demographic Info box with selectedMetadata
  $.each(selectedMetadata[0],function(key,value){
    $('#sample-metadata').append("<p>"+key +": "+value+"</p>")
  });
  //document.getElementById("sample-metadata").innerHTML = selectedMetadata[0].id
    //$('#sample-metadata').append('selectedMetadata')

  var samples = filteredData.samples
  if (selectedID != "--Select--"){
    var selectedSamples = samples.filter(samplesData => {return samplesData.id === selectedIDInt});
  }
  console.log(samples)
  barGraph(selectedIDInt)
  bubbleGraph(selectedIDInt)

}
