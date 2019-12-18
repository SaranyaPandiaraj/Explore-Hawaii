d3.csv("Average LOS-Sheet1.csv", function(data) {
 console.log(data);
var island_name = data.map(row => row.Island)
console.log('Island',island_name);

})