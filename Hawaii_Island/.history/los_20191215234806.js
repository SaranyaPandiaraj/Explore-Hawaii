var Hilo = [];
var Kona = [];
var Molokai = [];
var Kauai = [];
var Lanai = [];
var Maui = [];
var Oahu = [];
init();
function init() {
    var data = [{
      values: [4,3],
      labels: [2018,2017],
      type: "line"
    }];
  
    var layout = {
      height: 600,
      width: 800
    };
  
    Plotly.plot("line", data, layout);
  }

Plotly.d3.csv("los.csv", function(data) {
 console.log(data);
var year = data.map(row => row.Year)
console.log('Island',year);
init();
function init() {
    var data = [{
      values: [4,3],
      labels: [2018,2017],
      type: "bar"
    }];
  
    var layout = {
      height: 600,
      width: 800
    };
  
    Plotly.plot("bar", data, layout);
  }
var selected = document.getElementById("selDataset")


});
