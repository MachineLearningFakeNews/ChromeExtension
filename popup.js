/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 */
(function ($) {

var gauge_value = 0

function getCurrentTabUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;
    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });
}

/**
 * @param {string} searchTerm - Search term for Google Image search.
 * @param {function(string,number,number)} callback - Called when an image has
 *   been found. The callback gets the URL, width and height of the image.
 * @param {function(string)} errorCallback - Called when the image is not found.
 *   The callback gets a string that describes the failure reason.
 */

function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

document.addEventListener('DOMContentLoaded', function() {
  $.getJSON('sources.json', function (sources) {
    console.log(sources);
    // do something with the data
  });
  getCurrentTabUrl(function(url) {
    renderStatus('Performing News Analysis for:\n' + url);
  });
  
  if (gauge_value <= 20) {
    gauge_color =  '#0000FF'
  } else if (gauge_value <= 40) {
    gauge_color =  '#FF0099'
  } else if (gauge_value <= 60) {
    gauge_color = '#FF00FF' 
  } else if (gauge_value <= 80) {
    gauge_color =  '#9900FF'
  } else {
    gauge_color = '#FF0000'
  }

  var opts = {
    angle: 0, // The span of the gauge arc
    lineWidth: 0.39, // The line thickness
    radiusScale: 0.78, // Relative radius
    pointer: {
      length: 0.66, // // Relative to gauge radius
      strokeWidth: 0.062, // The thickness
      color: '#919191' // Fill color
    },
    limitMax: false,     // If false, the max value of the gauge will be updated if value surpass max
    limitMin: false,     // If true, the min value of the gauge will be fixed unless you set it manually
    colorStart: '#CF0202',   // Colors
    colorStop: gauge_color,    // just experiment with them
    strokeColor: '#CFCFCF',  // to see which ones work best for you
    generateGradient: true,
    highDpiSupport: true     // High resolution support
  };
  var target = document.getElementById('foo'); // your canvas element
  var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
  gauge.maxValue = 100; // set max gauge value
  gauge.setMinValue(0);  // Prefer setter over gauge.minValue = 0
  gauge.animationSpeed = 32; // set animation speed (32 is default value)
  gauge.set(gauge_value); // set actual value
});

function ChangePrediction(callback) {
    gauge_value = gauge_value + 20
    if (gauge_value > 100){
      gauge_value = 0
    }
    console.assert(typeof gauge_value == "number", 'tab.gauge_value should be a int');

    callback(gauge_value);
}

document.addEventListener('click', function() {
  ChangePrediction(function(gauge_value) {
    gauge_value = gauge_value + 20
    if (gauge_value > 100) {
      gauge_value = 0
    }
    if (gauge_value <= 20) {
      gauge_color =  '#0000FF'
      alert('This Window would show the results of the machine learning prediction, as well as why we may have found an article to be fake.')
    } else if (gauge_value <= 40) {
      gauge_color =  '#FF0099'
    } else if (gauge_value <= 60) {
      gauge_color = '#FF00FF' 
    } else if (gauge_value <= 80) {
      gauge_color =  '#9900FF'
    } else {
      gauge_color = '#FF0000'
    }
    var opts = {
      angle: 0, // The span of the gauge arc
      lineWidth: 0.39, // The line thickness
      radiusScale: 0.78, // Relative radius
      pointer: {
        length: 0.66, // // Relative to gauge radius
        strokeWidth: 0.062, // The thickness
        color: '#919191' // Fill color
      },
      limitMax: false,     // If false, the max value of the gauge will be updated if value surpass max
      limitMin: false,     // If true, the min value of the gauge will be fixed unless you set it manually
      colorStart: '#CF0202',   // Colors
      colorStop: gauge_color,    // just experiment with them
      strokeColor: '#CFCFCF',  // to see which ones work best for you
      generateGradient: true,
      highDpiSupport: true     // High resolution support
    };
    var target = document.getElementById('foo'); // your canvas element
    var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
    gauge.maxValue = 100; // set max gauge value
    gauge.setMinValue(0);  // Prefer setter over gauge.minValue = 0
    gauge.animationSpeed = 32; // set animation speed (32 is default value)
    gauge.set(gauge_value); // set actual value
  });
});

}(jQuery));
