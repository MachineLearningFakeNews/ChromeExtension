(function ($) {

  var gauge_value = 0,
      gauge_color;

  /**
   * Get the current URL.
   *
   * @param {function(string)} callback - called when the URL of the current tab
   *   is found.
   */
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

  function ChangePrediction(callback) {
      gauge_value = gauge_value + 20
      if (gauge_value > 100){
        gauge_value = 0
      }
      console.assert(typeof gauge_value == "number", 'tab.gauge_value should be a int');

      callback(gauge_value);
  }

  function renderStatus(statusText) {
    document.getElementById('status').textContent = statusText;
  }

  function render (url, sources) {
    renderStatus('Analysis for:\n' + url);
    
    console.log(sources);

    match = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)/im);
    source = sources[match[1]];

    var target = document.getElementById('foo'); // your canvas element

    if (match[0] === 'chrome') {
      var context = target.getContext('2d');
      context.fillStyle = 'white';
      context.font = '15px serif';
      context.fillText('Visit a news source.', 90, 90);
      return;
    }

    if (source) {
      switch (source.type) {
        case 'unreliable':
          gauge_value = 20;
          gauge_color = '#0000FF';
          break;
        case 'rumor':
          gauge_value = 40;
          gauge_color = '#FF0099';
          break;
        case 'clickbait':
          gauge_value = 60;
          gauge_color = '#FF00FF';
          break;
        case 'bias':
        case 'junksci':
          gauge_value = 80;
          gauge_color = '#9900FF';
          break;
        case 'fake':
        case 'hate':
        case 'fake news':
        case 'conspiracy':
           gauge_value = 100;
           gauge_color = '#FF0000';
           break;
        
      }
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
    var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
    gauge.maxValue = 100; // set max gauge value
    gauge.setMinValue(0);  // Prefer setter over gauge.minValue = 0
    gauge.animationSpeed = 32; // set animation speed (32 is default value)
    gauge.set(gauge_value); // set actual value
  }

  document.addEventListener('DOMContentLoaded', function() {  
    $.getJSON('sources.json', function (sources) {
      getCurrentTabUrl(function (url) {
        render(url, sources);
      });
    });

    $('#more-info').on('click', function () {
      window.open('https://github.com/MachineLearningFakeNews/ChromeExtension')
    });
  });

}(jQuery));
