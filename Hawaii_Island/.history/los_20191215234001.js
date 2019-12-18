var Hilo = [];
var Kona = [];
var Molokai = [];
var Kauai = [];
var Lanai = [];
var Maui = [];
var Oahu = [];

Plotly.d3.csv("los.csv", function(data) {
 console.log(data);
var year = data.map(row => row.Year)
console.log('Island',year);


});
