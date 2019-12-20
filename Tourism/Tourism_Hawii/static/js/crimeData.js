function crimeplot(){
    var Maui_data=[];
    var Hawaii_data=[];
    var Kauai_data=[];
    var Honolulu_data=[];
    var year=[];
    var State_data=[];
    
    var Maui_data_pc=[];
    var Hawaii_data_pc=[];
    var Kauai_data_pc=[];
    var Honolulu_data_pc=[];
    var year=[];
    var State_data_pc=[];
    
    Plotly.d3.csv("/static/js/crime.csv", function(tvData) {
      for (var i=0;i<tvData.length;i++) {
        Maui_data.push(tvData[i].Maui);
        Hawaii_data.push(tvData[i].Hawaii);
        Kauai_data.push(tvData[i].Kauai);
        Honolulu_data.push(tvData[i].Honolulu);
        year.push(tvData[i].Year);
        State_data.push(tvData[i].State);
      }
      var Maui_data_pc=Maui_data.map(i => i/145)
      var Hawaii_data_pc=Hawaii_data.map(i => i/190)
      var Kauai_data_pc=Kauai_data.map(i => i/70)
      var Honolulu_data_pc=Honolulu_data.map(i => i/998);
      var State_data_pc=State_data.map(i => i/1403);
    
      var trace1 = {
        x: year,
        y: State_data_pc,
        type: "scatter",
        name: "State",
        marker: {
          color: "#2077b4",
          symbol: "hexagram"
        }
      };
      var trace2 = {
        x: year,
        y: Honolulu_data_pc,
        type: "scatter",
        name: "Honolulu city",
        marker: {
          color: "orange",
          symbol: "diamond-x"
        }
      };
      var trace3 = {
        x: year,
        y: Hawaii_data_pc,
        type: "scatter",
        name: "Hawaii island",
        marker: {
        color: "rgba(156, 165, 196, 1.0)",
          symbol: "cross"
        }
      };
      var trace4 = {
        x: year,
        y: Kauai_data_pc,
        type: "scatter",
        name: "Kauai island",
        marker: {
          color: "red",
          symbol: "cross"
        }
      };
      var trace5 = {
        x: year,
        y: Maui_data_pc,
        type: "scatter",
        name: "Maui island",
        marker: {
          color: "blue",
          symbol: "cross"
        }
      };
      //Create the data array for the plot
      var data = [trace1, trace2, trace3,trace4,trace5];
    
      // Define the plot layout
      var layout = {
        title: "ACTUAL INDEX OFFENSES KNOWN TO THE POLICE",
        xaxis: { title: "Year" },
        yaxis: { title: "number of cases per capita" }
      };
    
      // Plot the chart to a div tag with id "plot"
      Plotly.plot("line", data, layout);
    
    
    });
}
crimeplot();