(function($) {
    "use strict";

    
    //     const wc = new PerfectScrollbar('.widget-chat');
    //     const wt = new PerfectScrollbar('.widget-todo');
    //   const wtm = new PerfectScrollbar(".widget-team");
    //     const wtl = new PerfectScrollbar('.widget-timeline');
    //     const wcm = new PerfectScrollbar('.widget-comments');
   
   $('#usa').vectorMap({ 
        map: 'usa_en',
        backgroundColor: 'transparent',
        borderColor: 'rgb(0, 131, 143)',
        borderOpacity: 0.25,
        borderWidth: 1,
        color: 'rgba(0, 131, 143, 0.6)',
        enableZoom: true,
        hoverColor: 'rgba(0, 131, 143, 1)',
        hoverOpacity: null,
        normalizeFunction: 'linear',
        scaleColors: ['#b6d6ff', '#005ace'],
        selectedColor: 'rgba(0, 131, 143, 1)',
        selectedRegions: null,
        showTooltip: true,
        onRegionClick: function(element, code, region)
        {
            var message = 'You clicked "'
                + region
                + '" which has the code: '
                + code.toUpperCase();
     
            alert(message);
        },
		colors: {
			mo: '#00838f',
			fl: '#00838f',
			or: '#00838f',
			nm: '#00838f',
			ak: '#00838f',
			ny: '#00838f',
		}
    });
	
	
	//#chart_widget_9

	if(jQuery('#chart_widget_9').length > 0 ){

    const chart_widget_9 = document.getElementById("chart_widget_9").getContext('2d');

    new Chart(chart_widget_9, {
        type: "line",
        data: {
            labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "January", "February", "March", "April"],
            datasets: [{
                label: "Sales Stats",
                backgroundColor: "#aedfe3",
                borderColor: '#00838f',
                pointBackgroundColor: '#aedfe3',
                pointBorderColor: '#00838f',
                pointHoverBackgroundColor: '#aedfe3',
                pointHoverBorderColor: '#00838f',
                data: [20, 10, 18, 15, 32, 18, 15, 22, 8, 6, 12, 13, 10, 18, 14, 24, 16, 12, 19, 21, 16, 14, 24, 21, 13, 15, 27, 29, 21, 11, 14, 19, 21, 17]
            }]
        },
        options: {
            title: {
                display: !1
            },
            tooltips: {
                intersect: !1,
                mode: "nearest",
                xPadding: 10,
                yPadding: 10,
                caretPadding: 10
            },
            legend: {
                display: !1
            },
            responsive: !0,
            maintainAspectRatio: !1,
            hover: {
                mode: "index"
            },
            scales: {
                xAxes: [{
                    display: !1,
                    gridLines: !1,
                    scaleLabel: {
                        display: !0,
                        labelString: "Month"
                    }
                }],
                yAxes: [{
                    display: !1,
                    gridLines: !1,
                    scaleLabel: {
                        display: !0,
                        labelString: "Value"
                    },
                    ticks: {
                        beginAtZero: !0
                    }
                }]
            },
            elements: {
                line: {
                    tension: .15
                },
                point: {
                    radius: 2,
                    borderWidth: 1
                }
            },
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 5,
                    bottom: 0
                }
            }
        }
    });

	}

	
	//#chart_widget_10
	if(jQuery('#chart_widget_10').length > 0 ){

    const chart_widget_10 = document.getElementById("chart_widget_10").getContext('2d');

    new Chart(chart_widget_10, {
        type: "line",
        data: {
            labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            datasets: [{
                label: "Sales Stats",
                backgroundColor: "#b4bae4",
                borderColor: '#283593',
                pointBackgroundColor: '#b4bae4',
                pointBorderColor: '#283593',
                pointHoverBackgroundColor: '#b4bae4',
                pointHoverBorderColor: '#283593',
                borderWidth: 3, 
                data: [20, 10, 18, 10, 32, 15, 15, 22, 18, 6, 12, 13]
            }]
        },
        options: {
            title: {
                display: !1
            },
            tooltips: {
                intersect: !1,
                mode: "nearest",
                xPadding: 10,
                yPadding: 10,
                caretPadding: 10
            },
            legend: {
                display: !1
            },
            responsive: !0,
            maintainAspectRatio: !1,
            hover: {
                mode: "index"
            },
            scales: {
                xAxes: [{
                    display: !1,
                    gridLines: !1,
                    scaleLabel: {
                        display: !0,
                        labelString: "Month"
                    }
                }],
                yAxes: [{
                    display: !1,
                    gridLines: !1,
                    scaleLabel: {
                        display: !0,
                        labelString: "Value"
                    },
                    ticks: {
                        beginAtZero: !0
                    }
                }]
            },
            elements: {
                line: {
                    tension: .7
                },
                point: {
                    radius: 0,
                    borderWidth: 0
                }
            },
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 5,
                    bottom: 0
                }
            }
        }
    });

	}


    var nk = document.getElementById("sold-product");
    // nk.height = 50
    new Chart(nk, {
        type: 'pie',
        data: {
            defaultFontFamily: 'Poppins',
            datasets: [{
                data: [45, 25, 20, 10],
                borderWidth: 0,
                backgroundColor: [
                    "rgba(85, 139, 47, .9)",
                    "rgba(85, 139, 47, .7)",
                    "rgba(85, 139, 47, .5)",
                    "rgba(85, 139, 47, .07)"
                ],
                hoverBackgroundColor: [
                    "rgba(85, 139, 47, .9)",
                    "rgba(85, 139, 47, .7)",
                    "rgba(85, 139, 47, .5)",
                    "rgba(85, 139, 47, .07)"
                ]

            }],
            labels: [
                "one",
                "two",
                "three",
                "four"
            ]
        },
        options: {
            responsive: true,
            legend: false,
            maintainAspectRatio: false
        }
    });

    var data = {
        labels: ["0", "1", "2", "3", "4", "5", "6", "0", "1", "2", "3", "4", "5", "6"],
        datasets: [{
            label: "My First dataset",
            backgroundColor: "rgba(0,131,143,1)",
            strokeColor: "rgba(0,131,143,1)",
            pointColor: "rgba(0,0,0,0)",
            pointStrokeColor: "rgba(0,0,0,0)",
            pointHighlightFill: "rgba(0,131,143,1)",
            pointHighlightStroke: "rgba(0,131,143,1)",
            data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40]
        }]
    };

    var ctx = document.getElementById("activeUser").getContext("2d");
    var chart = new Chart(ctx, {
        type: "bar",
        data: data,
        options: {
            responsive: !0,
            maintainAspectRatio: false,
            legend: {
                display: !1
            },
            tooltips: {
                enabled: false
            },
            scales: {
                xAxes: [{
                    display: !1,
                    gridLines: {
                        display: !1
                    },
                    barPercentage: 0.9,
                    categoryPercentage: 1
                }],
                yAxes: [{
                    display: !1,
                    ticks: {
                        padding: 10,
                        stepSize: 10,
                        max: 100,
                        min: 0
                    },
                    gridLines: {
                        display: !0,
                        drawBorder: !1,
                        lineWidth: 1,
                        zeroLineColor: "#0277bd"
                    }
                }]
            }
        }
    });

    setInterval(function() {
        chart.config.data.datasets[0].data.push(
            Math.floor(10 + Math.random() * 80)
        );
        chart.config.data.datasets[0].data.shift();
        chart.update();
    }, 2000);

    ////////////
    function r(t, r) {
        return Math.floor(Math.random() * (r - t + 1) + t);
    }
		
	var direction =  getUrlParams('dir');
	if(direction != 'rtl')
	{direction = 'ltr'; }
	
	new dezSettings({
		typography: "roboto",
		version: "light",
		layout: "vertical",
		headerBg: "color_1",
		navheaderBg: "color_9",
		sidebarBg: "color_9",
		sidebarStyle: "icon-hover",
		sidebarPosition: "fixed",
		headerPosition: "fixed",
		containerLayout: "wide",
		direction: direction
	}); 
		
})(jQuery);


const wt = new PerfectScrollbar('.widget-todo');
const wtl = new PerfectScrollbar('.widget-timeline');