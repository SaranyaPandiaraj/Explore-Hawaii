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
    // category=excellent.map(i =>i.island)
    // excellent_exp=excellent_data.map(i =>i.Expenditures)
    // Hawaii_exp=Hawaii_data.map(i =>i.Expenditures)
    // Kauai_exp=Kauai_data.map(i =>i.Expenditures)
    // Honolulu_exp=Honolulu_data.map(i =>i.Expenditures)
    // Honolulu_exp_2016=Honolulu_data_2016.map(i =>i.Expenditures)
    // SF_exp_2016=SF_data_2016.map(i =>i.Expenditures)
    // Seattle_exp_2016=Seattle_data_2016.map(i =>i.Expenditures)
    // Phonix_exp_2016=Phonix_data_2016.map(i =>i.Expenditures)
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