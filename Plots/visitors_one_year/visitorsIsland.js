
var Maui_data=[];
var Oahu_data=[]
var Kauai_data=[]
var Hawaii_data=[]
var Others_data=[]
var summa=[];
var isl=["MAUI and MAUI CTY", "O'AHU", "KAUA'I", "HAWAI'I ISLAND","Others"]
d3.csv('VisitorsNew.csv', function (err, data) {
  data.forEach(function(i) {
    i.Totalamount= +i.Totalamount
  })
  for (var j = 0; j < data.length; j++) {
    if (data[j].year=="2016") {
      if ((data[j].island=="MAUI") || (data[j].island=="MAUI CTY")) {
        Maui_data.push(data[j].Totalamount)
      }
      else if (data[j].island=="O'AHU") {
        Oahu_data.push(data[j].Totalamount)
      }
      else if (data[j].island=="KAUA'I") {
        Kauai_data.push(data[j].Totalamount)
      }
      else if (data[j].island=="HAWAI'I ISLAND") {
        Hawaii_data.push(data[j].Totalamount)
      }  
      else  {
        Others_data.push(data[j].Totalamount)
      } 
    var summa=[];
    summa.push(sum(Maui_data));
    summa.push(sum(Oahu_data));
    summa.push(sum(Kauai_data));
    summa.push(sum(Hawaii_data));
    summa.push(sum(Others_data));     
    }
  }
  function sum(listt) {
    var total=0;
    listt.forEach(x => total +=x)
    return total
  }
  var data = [{
    values: summa,
    labels: isl,
    type: "pie",
    hole: 0.35,
    direction: 'clockwise',
    pull: [0, 0, 0.1, 0, 0, 0]
  }];
  var layout = {
    height: 400,
    width: 500
  };  
  Plotly.plot("pie", data, layout);
});
