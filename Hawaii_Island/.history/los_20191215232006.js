console.log('hello');
Plotly.d3.csv("los.csv", function(data) {
 console.log(data);
var year = data.map(row => row.Year)
console.log('Island',year);

});
// var data = [
//     {
//         "Island":'Hilo',
//         "Year":[2018,2017],
//         "LOS":[4.15,4.07]
  
//     }
//     // {
//     //   Island:'Kona',
//     //   Year:[2018,2017],
//     //   LOS:[6.91,6.8]
  
//     // },
//     // {
//     //   Island:'Molokai',
//     //   Year:[2018,2017],
//     //   LOS:[4.15,4.07]
//     // }
  
//   ];

