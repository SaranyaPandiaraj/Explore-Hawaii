Plotly.d3.csv('VisitorsNew.csv', function (err, data) {

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
  Plotly.plot('chart', {
    data: traces,
    layout: layout,
    frames: frames,
  });
});