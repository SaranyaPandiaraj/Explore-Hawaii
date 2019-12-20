function lengthstayplot(sample){
    Plotly.d3.csv("/static/js/los.csv", function(data) {
    var retrived = data;   
    var year = [];
    var kona = [];
    var Maui = [];
    var Hilo = [];
    var Molokai = [];
    var Kauai = [];
    var Lanai = [];
    var Oahu = [];
    
    sample = +sample;
    console.log(sample)
    for(var i =0;i<retrived.length;i++){
       //kona.push(retrived.length)
       
       if( retrived[i].Year == sample ) {
         kona.push(retrived[i].Kona)
         Maui.push(retrived[i].Maui)
         Hilo.push(retrived[i].Hilo)
         Molokai.push(retrived[i].Molokai)
         Kauai.push(retrived[i].Kauai)
         Lanai.push(retrived[i].Lanai)
         Oahu.push(retrived[i].Oahu)
         year.push(retrived[i].Year)
         
     }
     //console.log()
     
     }
     console.log(year);
   
     var trace1 = {
       x: year,
       y: kona,
       type: "bar",
       name: "kona",
       marker: {
         color: "#2077b4",
         symbol: "hexagram"
       }
     };
     var trace2 = {
       x: year,
       y: Hilo,
       type: "bar",
       name: "Hilo",
       marker: {
         color: "red",
         symbol: "hexagram"
       }
     };
     var trace3 = {
       x: year,
       y: Maui,
       type: "bar",
       name: "Maui",
       marker: {
         color: "green",
         symbol: "hexagram"
       }
     };
     var trace4 = {
       x: year,
       y: Molokai,
       type: "bar",
       name: "Molokai",
       marker: {
         color: "Orange",
         symbol: "hexagram"
       }
     };
     var trace5 = {
       x: year,
       y: Kauai,
       type: "bar",
       name: "Kauai",
       marker: {
         color: "Purple",
         symbol: "hexagram"
       }
     };
     var trace6 = {
       x: year,
       y: Lanai,
       type: "bar",
       name: "Lanai",
       marker: {
         color: "Pink",
         symbol: "hexagram"
       }
     };
     var trace7 = {
       x: year,
       y: Oahu,
       type: "bar",
       name: "Oahu",
       marker: {
         color: "yellow",
         symbol: "hexagram"
       }
     };
     var data = [trace1,trace2,trace3,trace4,trace5,trace6,trace7];
   
     // Define the plot layout
     var layout = {
       title: "Average Length Of Stay(LOS)",
       xaxis: { title: "Year" },
       yaxis: { title: "Length of stay" },
       height:400,
       width:400
     };
   
     // Plot the chart to a div tag with id "plot"
     Plotly.newPlot("los_plot", data, layout);
     
     // console.log(kona);
     // console.log(Hilo);
  
   
   //text.on("change", handleSubmit);
   
   
   
   
   
   });
}