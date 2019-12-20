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
//crimeplot();
//===================================================
function expenditure(){
  var Maui_data=[];
  var Hawaii_data=[];
  var Kauai_data=[];
  var Honolulu_data=[];
  var SF_data_2016=[];
  var Seattle_data_2016=[];
  var Phonix_data_2016=[];
  var Honolulu_data_2016=[];

  Plotly.d3.csv("/static/js/pricesIslands.csv", function(tvData) {
    for (var i=0;i<tvData.length;i++) {
      if (tvData[i].island=="Maui") {
        Maui_data.push(tvData[i])
      }
      else if (tvData[i].island=="Hawaii") {
        Hawaii_data.push(tvData[i])
      }
      else if (tvData[i].island=="Kauai") {
        Kauai_data.push(tvData[i])
      }
      else if (tvData[i].island=="Honolulu") {
        Honolulu_data.push(tvData[i])
      }
      else if (tvData[i].island=="Honolulu_2016") {
        Honolulu_data_2016.push(tvData[i])
      }
      else if (tvData[i].island=="SF_2016") {
        SF_data_2016.push(tvData[i])
      }
      else if (tvData[i].island=="Seattle_2016") {
        Seattle_data_2016.push(tvData[i])
      }
      else {
        Phonix_data_2016.push(tvData[i])
      }
    var category=Maui_data.map(i =>i.Category);
    var Maui_exp=Maui_data.map(i =>i.Expenditures);
    var Hawaii_exp=Hawaii_data.map(i =>i.Expenditures);
    var Kauai_exp=Kauai_data.map(i =>i.Expenditures);
    var Honolulu_exp=Honolulu_data.map(i =>i.Expenditures);
    var Honolulu_exp_2016=Honolulu_data_2016.map(i =>i.Expenditures);
    var SF_exp_2016=SF_data_2016.map(i =>i.Expenditures);
    var Seattle_exp_2016=Seattle_data_2016.map(i =>i.Expenditures);
    var Phonix_exp_2016=Phonix_data_2016.map(i =>i.Expenditures);
    }
  console.log(Honolulu_exp);

    var trace1={
      x: category,
      y: Maui_exp,
      name: "Maui",
      type:"bar"
    };
    var trace2={
      x: category,
      y: Hawaii_exp,
      name:"Hawaii",
      type:"bar"
    };
    var trace3={
      x: category,
      y: Kauai_exp,
      name: "Kauiai",
      type:"bar"
    };
    var trace4={
      x: category,
      y: Honolulu_exp,
      name: "Honolulu",
      type:"bar"
    };
    data=[trace1,trace2,trace3,trace4];
    var layout={
      title: "VISITOR EXPENDITURES by place"
    }
    Plotly.newPlot("exp_bars",data,layout)


    var trace5 = {
      x: category,
      y: Honolulu_exp_2016,
      type: "scatter",
      name: "Honolulu",
      marker: {
        color: "blue",
        symbol: "cross"
      }
    };
    var trace6 = {
      x: category,
      y: SF_exp_2016,
      type: "scatter",
      name: "SF",
      marker: {
        color: "red",
        symbol: "cross"
      }
    };
    var trace7 = {
      x: category,
      y: Seattle_exp_2016,
      type: "scatter",
      name: "Seattle",
      marker: {
        color: "orange",
        symbol: "cross"
      }
    };
    var trace8 = {
      x: category,
      y: Phonix_exp_2016,
      type: "scatter",
      name: "Phonix",
      marker: {
        color: "green",
        symbol: "cross"
      }
    };
  //Create the data array for the plot
    var data = [trace5, trace6, trace7,trace8];

  // Define the plot layout
    var layout = {
      title: "Expenditures comparison by cities",
      yaxis: { title: "expenditures" }
    };

  // Plot the chart to a div tag with id "plot"
    Plotly.plot("plot", data, layout);



  });
}

//====================================================
function activities(){
  var sightseeing=[];
  var recreation=[];
  var entertainment=[];
  var shopping=[];
  var culture=[];
  var transportation=[];
  var island=[];

  Plotly.d3.csv("/static/js/activities.csv", function(tvData) {
    for (var i=0;i<tvData.length;i++) {
      island.push(tvData[i].island);
      sightseeing.push(tvData[i].sightseeing);
      recreation.push(tvData[i].recreation);
      entertainment.push(tvData[i].entertainment);
      shopping.push(tvData[i].shopping);
      culture.push(tvData[i].culture);
      transportation.push(tvData[i].transportation);

    }
    console.log(transportation);

    var trace1={
      x: island,
      y: sightseeing,
    // name: "sightseeing (drive around, scenic views, whale watching,visiting communities etc.)",
      name: "sightseeing ",
      type:"bar"
    };
    var trace2={
      x: island,
      y: recreation,
    // name:"recreations (beach, swimming, parks, running etc.)",
      name:"recreations",
      type:"bar"
    };
    var trace3={
     x: island,
      y: entertainment,
    // name: "entertainment & dining (restaurant, live music, ethnic dining etc.)",
      name: "entertainment & dining",
      type:"bar"
    };
    var trace4={
      x: island,
      y: shopping,
    // name: "shopping (local shops,malls, hotel stores etc.)",
      name: "shopping ",
      type:"bar"
    };
    var trace5={
      x: island,
      y: culture,
    // name: "history, culture, fine arts (historic place, museum, festival etc.)",
      name: "history, culture, fine arts",
      type:"bar"
    };
    var trace6={
      x: island,
      y: transportation,
    // name: "transportation (rent, airport shuttle, tour bus etc.)",
      name: "transportation",
      type:"bar" 
    };
    data=[trace1,trace2,trace3,trace4,trace5,trace6];
    var options={
      title: " Visitors Participation in Activities",
    // width:1500,
      width:1000,
      height:400,
      legend: {position:"right", maxLines:3}

    }

  
  
    Plotly.newPlot("bars",data,options)
  });
}

//======================================================
function impression(){
  var a1=[];
var a2=[];
var a3=[];
var a4=[];
var a5=[];
var a6=[];
var a7=[];
var b1=[];
var b2=[];
var b3=[];
var b4=[];
var b5=[];
var b6=[];
var b7=[];
var c1=[];
var c2=[];
var c3=[];
var c4=[];
var c5=[];
var c6=[];
var c7=[];
var d1=[];
var d2=[];
var d3=[];
var d4=[];
var d5=[];
var d6=[];
var d7=[];
var categoties=["US West", "US East", "Japan"]


Plotly.d3.csv("/static/js/islandImpres.csv", function(data) {

  for (var i=0; i<data.length; i++) {
    if (data[i].island=="Oahu") {
      if (data[i].rating=="   Poor") {
        a1.push(data[i].USWest);
        a1.push(data[i].USEast);
        a1.push(data[i].Japan);
      }
      else if (data[i].rating=="   Below average") {
        b1.push(data[i].USWest);
        b1.push(data[i].USEast);
        b1.push(data[i].Japan);
      }
      else if (data[i].rating=="   Above average") {
        c1.push(data[i].USWest);
        c1.push(data[i].USEast);
        c1.push(data[i].Japan);
      }
      else {
        d1.push(data[i].USWest);
        d1.push(data[i].USEast);
        d1.push(data[i].Japan);
      }
    }
    else if (data[i].island=="Maui") {
      if (data[i].rating=="   Poor") {
        a2.push(data[i].USWest);
        a2.push(data[i].USEast);
        a2.push(data[i].Japan);
      }
      else if (data[i].rating=="   Below average") {
        b2.push(data[i].USWest);
        b2.push(data[i].USEast);
        b2.push(data[i].Japan);
      }
      else if (data[i].rating=="   Above average") {
        c2.push(data[i].USWest);
        c2.push(data[i].USEast);
        c2.push(data[i].Japan);
      }
      else {
        d2.push(data[i].USWest);
        d2.push(data[i].USEast);
        d2.push(data[i].Japan);
      }
      
    }
    else if (data[i].island=="Molokai") {
      if (data[i].rating=="   Poor") {
        a3.push(data[i].USWest);
        a3.push(data[i].USEast);
        a3.push(data[i].Japan);
      }
      else if (data[i].rating=="   Below average") {
        b3.push(data[i].USWest);
        b3.push(data[i].USEast);
        b3.push(data[i].Japan);
      }
      else if (data[i].rating=="   Above average") {
        c3.push(data[i].USWest);
        c3.push(data[i].USEast);
        c3.push(data[i].Japan);
      }
      else {
        d3.push(data[i].USWest);
        d3.push(data[i].USEast);
        d3.push(data[i].Japan);
      }
    }
    else if (data[i].island=="Lanai") {
      if (data[i].rating=="   Poor") {
        a4.push(data[i].USWest);
        a4.push(data[i].USEast);
        a4.push(data[i].Japan);
      }
      else if (data[i].rating=="   Below average") {
        b4.push(data[i].USWest);
        b4.push(data[i].USEast);
        b4.push(data[i].Japan);
      }
      else if (data[i].rating=="   Above average") {
        c4.push(data[i].USWest);
        c4.push(data[i].USEast);
        c4.push(data[i].Japan);
      }
      else {
        d4.push(data[i].USWest);
        d4.push(data[i].USEast);
        d4.push(data[i].Japan);
      }
    }
    else if (data[i].island=="Hilo") {
      if (data[i].rating=="   Poor") {
        a5.push(data[i].USWest);
        a5.push(data[i].USEast);
        a5.push(data[i].Japan);
      }
      else if (data[i].rating=="   Below average") {
        b5.push(data[i].USWest);
        b5.push(data[i].USEast);
        b5.push(data[i].Japan);
      }
      else if (data[i].rating=="   Above average") {
        c5.push(data[i].USWest);
        c5.push(data[i].USEast);
        c5.push(data[i].Japan);
      }
      else {
        d5.push(data[i].USWest);
        d5.push(data[i].USEast);
        d5.push(data[i].Japan);
      }
    }
    else if (data[i].island=="Kona") {
      if (data[i].rating=="   Poor") {
        a6.push(data[i].USWest);
        a6.push(data[i].USEast);
        a6.push(data[i].Japan);
      }
      else if (data[i].rating=="   Below average") {
        b6.push(data[i].USWest);
        b6.push(data[i].USEast);
        b6.push(data[i].Japan);
      }
      else if (data[i].rating=="   Above average") {
        c6.push(data[i].USWest);
        c6.push(data[i].USEast);
        c6.push(data[i].Japan);
      }
      else {
        d6.push(data[i].USWest);
        d6.push(data[i].USEast);
        d6.push(data[i].Japan);
      }
    }
    else {
      if (data[i].rating=="   Poor") {
        a7.push(data[i].USWest);
        a7.push(data[i].USEast);
        a7.push(data[i].Japan);
      }
      else if (data[i].rating=="   Below average") {
        b7.push(data[i].USWest);
        b7.push(data[i].USEast);
        b7.push(data[i].Japan);
      }
      else if (data[i].rating=="   Above average") {
        c7.push(data[i].USWest);
        c7.push(data[i].USEast);
        c7.push(data[i].Japan);
      }
      else {
        d7.push(data[i].USWest);
        d7.push(data[i].USEast);
        d7.push(data[i].Japan);
      }
    }
    
  }
  console.log(c7);
  console.log(b7);
  console.log(d7);
  console.log(a7);


  Plotly.newPlot(
    "impres_bars",
    [
      {
        x: categoties, y: a1, type: "bar",
        name: "poor", xaxis: 'x1',
        barmode: 'stack', marker: {color: '#448'}
      },
      {
        x: categoties, y: b1, type: "bar",
        name: "Below average", xaxis: 'x1',
        barmode: 'stack', marker: {color: '#88C'}
      },
      {
        x: categoties, y: c1, type: "bar",
        name: "Above average", xaxis: 'x1',
        barmode: 'stack', marker: {color: '#b7b7e5'}
      },
      {
        x: categoties, y: d1, type: "bar",
        name: "Excellent", xaxis: 'x1',
        barmode: 'stack', marker: {color: '#CCF'}
      },
      {
        x: categoties, y: a2, type: "bar",
        name: "poor", xaxis: 'x2',
        barmode: 'stack', marker: {color: '#080'}
      },
      {
        x: categoties, y: b2, type: "bar",
        name: "Below average", xaxis: 'x2',
        barmode: 'stack', marker: {color: '#8c8'}
      },
      {
        x: categoties, y: c2, type: "bar",
        name: "Above average", xaxis: 'x2',
        barmode: 'stack', marker: {color: '#a9c8ad'}
      },
      {
        x: categoties, y: d2, type: "bar",
        name: "Excellent", xaxis: 'x2',
        barmode: 'stack', marker: {color: '#CFC'}
      },
      {
        x: categoties, y: a3, type: "bar",
        name: "poor", xaxis: 'x3',
        barmode: 'stack', marker: {color: '#666644'}
      },
      {
        x: categoties, y: b3, type: "bar",
        name: "Below average", xaxis: 'x3',
        barmode: 'stack', marker: {color: '#7a7a51'}
      },
      {
        x: categoties, y: c3, type: "bar",
        name: "Above average", xaxis: 'x3',
        barmode: 'stack', marker: {color: '#b7b77a'}
      },
      {
        x: categoties, y: d3, type: "bar",
        name: "Excellent", xaxis: 'x3',
        barmode: 'stack', marker: {color: '#e5e5b7'}
      },
      {
        x: categoties, y: a4, type: "bar",
        name: "poor", xaxis: 'x4',
        barmode: 'stack', marker: {color: '#b24f2e'}
      },
      {
        x: categoties, y: b4, type: "bar",
        name: "Below average", xaxis: 'x4',
        barmode: 'stack', marker: {color: '#e5653b'}
      },
      {
        x: categoties, y: c4, type: "bar",
        name: "Above average", xaxis: 'x4',
        barmode: 'stack', marker: {color: '#ff7f54'}
      },
      {
        x: categoties, y: d4, type: "bar",
        name: "Excellent", xaxis: 'x4',
        barmode: 'stack', marker: {color: '#ffa98d'}
      },
      {
        x: categoties, y: a5, type: "bar",
        name: "poor", xaxis: 'x5',
        barmode: 'stack', marker: {color: '#248386'}
      },
      {
        x: categoties, y: b5, type: "bar",
        name: "Below average", xaxis: 'x5',
        barmode: 'stack', marker: {color: '#2ea9ac'}
      },
      {
        x: categoties, y: c5, type: "bar",
        name: "Above average", xaxis: 'x5',
        barmode: 'stack', marker: {color: '#48c2c6'}
      },
      {
        x: categoties, y: d5, type: "bar",
        name: "Excellent", xaxis: 'x5',
        barmode: 'stack', marker: {color: '#99dddf'}
      },
      {
        x: categoties, y: a6, type: "bar",
        name: "poor", xaxis: 'x6',
        barmode: 'stack', marker: {color: '#970099'}
      },
      {
        x: categoties, y: b6, type: "bar",
        name: "Below average", xaxis: 'x6',
        barmode: 'stack', marker: {color: '#fd00ff'}
      },
      {
        x: categoties, y: c6, type: "bar",
        name: "Above average", xaxis: 'x6',
        barmode: 'stack', marker: {color: '#fd4cff'}
      },
      {
        x: categoties, y: d6, type: "bar",
        name: "Excellent", xaxis: 'x6',
        barmode: 'stack', marker: {color: '#fe99ff'}
      },
      {
        x: categoties, y: a7, type: "bar",
        name: "poor", xaxis: 'x7',
        barmode: 'stack', marker: {color: '#4a4a4a'}
      },
      {
        x: categoties, y: b7, type: "bar",
        name: "Below average", xaxis: 'x7',
        barmode: 'stack', marker: {color: '#858585'}
      },
      {
        x: categoties, y: c7, type: "bar",
        name: "Above average", xaxis: 'x7',
        barmode: 'stack', marker: {color: '#a9a9a9'}
      },
      {
        x: categoties, y: d7, type: "bar",
        name: "Excellent", xaxis: 'x7',
        barmode: 'stack', marker: {color: '#d4d4d4'}
      },

    ],
    {
      barmode: "stack",
      title: "USWest,USEast and Japan Visitors-Experience",
      xaxis: {
        domain: [0, 0.14],
        anchor: 'x1', title: 'Oahu'
      },
      xaxis2: {
        domain: [0.14, 0.28],
        anchor: 'x2', title: 'Maui'
      },
      xaxis3: {
        domain: [0.28, 0.42],
        anchor: 'x3', title: 'Molokai'
      },
      xaxis4: {
        domain: [0.43, 0.56],
        anchor: 'x4', title: 'Lanai'
      },
      xaxis5: {
        domain: [0.57, 0.71],
        anchor: 'x5', title: 'Hilo'
      },
      xaxis6: {
        domain: [0.71, 0.85],
        anchor: 'x6', title: 'Kona'
      },
      xaxis7: {
        domain: [0.85, 1.0],
        anchor: 'x7', title: 'Kauai'
      }
    }
  );
});
}

//=====================================================
function yearlyVisitors(sample) {
     
  var Maui_data=[];
  var Oahu_data=[]
  var Kauai_data=[]
  var Hawaii_data=[]
  var Others_data=[]
  var summa=[];
  var isl=["MAUI and MAUI CTY", "O'AHU", "KAUA'I", "HAWAI'I ISLAND","Others"]
  Plotly.d3.csv('/static/js/VisitorsNew.csv', function (err, data) {
      //if (error) return console.warn(error);
      data.forEach(function(samp) {
      samp.Totalamount= +samp.Totalamount;
      });
      sample = +sample;
      function selectYear(person) {
          return person.year=="sample";
        }
        
      data.filter(selectYear);
      for (var j = 0; j < data.length; j++) {
          if (data[j].year==sample) {
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
  title: "Visitors Arrival Yearly",
  height: 400,
  width: 400
};

// var PANEL = d3.select("#pie");
// pie.html("");  
Plotly.newPlot("pie", data, layout);
  });
}

//=====================================================
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
//===================================================
function animation(){
  Plotly.d3.csv('/static/js/VisitorsNew.csv', function (err, data) {

    var lookup = {};
    function getData(year, island) {
      var byYear, trace;
      if (!(byYear = lookup[year])) {;
        byYear = lookup[year] = {};
      }
      if (!(trace = byYear[island])) {
        trace = byYear[island] = {
          x: [],
          y: [],
          id: [],
          text: [],
          marker: {size: []}
        };
      }
      return trace;
    }
    for (var i = 0; i < data.length; i++) {
      var datum = data[i];
      var trace = getData(datum.year, datum.island);
      trace.x.push(datum.month);
      trace.y.push(datum.Totalamount);
      trace.marker.size.push(datum.Totalamount*400);
    }
    var years = Object.keys(lookup);
  
    var firstYear = lookup[years[0]];
    var islands = Object.keys(firstYear);
  
    var traces = [];
    for (i = 0; i < islands.length; i++) {
      var data = firstYear[islands[i]];
      traces.push({
        name: islands[i],
        x: data.x.slice(),
        y: data.y.slice(),
        mode: 'markers',
        marker: {
          size: data.marker.size.slice(),
          sizemode: 'area',
          sizeref: 200000
        }
      });
    }
    var frames = [];
    for (i = 0; i < years.length; i++) {
      frames.push({
        name: years[i],
        data: islands.map(function (island) {
          return getData(years[i], island);
        })
      })
    console.log(frames)
    }
    var sliderSteps = [];
    for (i = 0; i < years.length; i++) {
      sliderSteps.push({
        method: 'animate',
        label: years[i],
        args: [[years[i]], {
          mode: 'immediate',
          transition: {duration: 300},
          frame: {duration: 300, redraw: false},
        }]
      });
    }
    var layout = {
      width:1000,
      yaxis: {
        title: 'Number of visiters'
      },
      hovermode: 'closest',
      updatemenus: [{
        x: 0,
        y: 0,
        yanchor: 'top',
        xanchor: 'left',
        showactive: false,
        direction: 'left',
        type: 'buttons',
        pad: {t: 87, r: 10},
        buttons: [{
          method: 'animate',
          args: [null, {
            mode: 'immediate',
            fromcurrent: true,
            transition: {duration: 300},
            frame: {duration: 500, redraw: false}
          }],
          label: 'Play'
        }, {
          method: 'animate',
          args: [[null], {
            mode: 'immediate',
            transition: {duration: 0},
            frame: {duration: 0, redraw: false}
          }],
          label: 'Pause'
        }]
      }],
      sliders: [{
        pad: {l: 130, t: 55},
        currentvalue: {
          visible: true,
          prefix: 'Year:',
          xanchor: 'right',
          font: {size: 20, color: '#666'}
        },
        steps: sliderSteps
      }]
    };
    // Create the plot:
    Plotly.newPlot('chart', {
      data: traces,
      layout: layout,
      frames: frames,
    });
  });
}
//animation();
//==================================================

function init(){
  var selector = d3.select("#selDataset");
   Plotly.d3.csv('/static/js/VisitorsNew.csv', function (error,islanddata) {
    //if (error) return console.warn(error);
    var yearData = {};
    function getData(year) {
      var byYear;
      if (!(byYear = yearData[year])) {;
        byYear = yearData[year] = {};
      }
    }
    for (var i = 0; i < islanddata.length; i++) {
      var datum = islanddata[i];
      getData(datum.year);
      }
      var years = Object.keys(yearData);
      
      years=years.slice(-10)
      years.reverse();
        
      // cast the data from the csv as numbers
      console.log(years);
      years.forEach(function(data) {
      selector
          .append("option")
          .text(data)
          .property("value",data);
      });
      const firstYear = years[0];
      console.log(firstYear)
      
      yearlyVisitors(firstYear);
      
      lengthstayplot(firstYear);
      crimeplot();
      animation();
      expenditure();
      impression();
      activities(); 
      
      
  });
      
}
function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  yearlyVisitors(newSample);
  lengthstayplot(newSample);
 
  
}
// crimeplot();
// animation();
// expenditure();
// impression();
// activities(); 
init();
    