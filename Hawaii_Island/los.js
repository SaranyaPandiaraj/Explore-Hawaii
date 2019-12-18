var Hilo = [];
var Kona = [];
var Molokai = [];
var Kauai = [];
var Lanai = [];
var Maui = [];
var Oahu = [];


Plotly.d3.csv("los.csv", function(data) {
 var retrived = data;
 //console.log(retrived[0].Kona)
 console.log(retrived);
 
// var stringified = JSON.stringify(retrived);
// console.log(stringified);
function handleSubmit() {
  // Prevent the page from refreshing
  d3.event.preventDefault();

  // Select the input value from the form
  var island = d3.select("#selDataset").node().value;
  console.log(island);

  // clear the input value
  d3.select("#stockInput").node().value = "";

  // Build the plot with the new stock
  //buildPlot(island);
}
var island = d3.select("#selDataset").node().value;
console.log(island);
 // console.log(stringified[0].island);

  var item;
  var year = [];
  var kona = [];
  for(var i =0;i<retrived.length;i++){
    year.push(retrived[i].Year);
    if( retrived[i].island == "Hilo" ) {
      kona.push(retrived[i].island)
      
  }
  //console.log()

  }
  console.log(year);
  console.log(kona);
  







});
