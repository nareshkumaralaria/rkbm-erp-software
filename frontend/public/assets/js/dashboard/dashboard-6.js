(function($) {
    "use strict";


	if(jQuery('#morris_bar_stalked').length > 0)
	{	
		//bar chart
		Morris.Bar({
			element: 'morris_bar_stalked',
			data: [{
				y: 'S',
				a: 66, 
				b: 34
			}, {
				y: 'M',
				a: 75, 
				b: 25
			}, {
				y: 'T',
				a: 50, 
				b: 50
			}, {
				y: 'W',
				a: 75, 
				b: 25
			}, {
				y: 'T',
				a: 50, 
				b: 50
			}, {
				y: 'F',
				a: 16, 
				b: 84
			}, {
				y: 'S',
				a: 70, 
				b: 30
			}, {
				y: 'S',
				a: 30, 
				b: 70
			}, {
				y: 'M',
				a: 40, 
				b: 60
			}, {
				y: 'T',
				a: 29, 
				b: 71
			}, {
				y: 'W',
				a: 44, 
				b: 56
			}, {
				y: 'T',
				a: 30, 
				b: 70
			}, {
				y: 'F',
				a: 60, 
				b: 40
			}, {
				y: 'G',
				a: 40, 
				b: 60
			}, {
				y: 'S',
				a: 46, 
				b: 54
			}],
			xkey: 'y',
			ykeys: ['a', 'b'],
			labels: ['A', 'B'],
			barColors: ['#7356f1', "#F1F3F7"],
			hideHover: 'auto',
			gridLineColor: 'transparent',
			resize: true,
			barSizeRatio: 0.25,
			stacked: true, 
			behaveLikeLine: true, 
			// barRadius: [6, 6, 0, 0]
		});
	}

	if(jQuery('#morris_donught_2').length > 0)
	{
		//donught chart
		Morris.Donut({
			element: 'morris_donught_2',
			data: [{
				label: "\xa0 \xa0 Download Sales \xa0 \xa0",
				value: 12,

			}, {
				label: "\xa0 \xa0 In-Store Sales \xa0 \xa0",
				value: 30
			}, {
				label: "\xa0 \xa0 Mail-Order Sales \xa0 \xa0",
				value: 20
			}],
			resize: true,
			colors: ['#0277bd', '#0277bd', '#0277bd']
		});
	}
	
	if(jQuery('#morris_area').length > 0)
	{
		
		//area chart
		Morris.Area({
			element: 'morris_area',
			data: [{
					period: '2001',
					smartphone: 0,
					windows: 0,
					mac: 0
				}, {
					period: '2002',
					smartphone: 90,
					windows: 60,
					mac: 25
				}, {
					period: '2003',
					smartphone: 40,
					windows: 80,
					mac: 35
				}, {
					period: '2004',
					smartphone: 30,
					windows: 47,
					mac: 17
				}, {
					period: '2005',
					smartphone: 150,
					windows: 40,
					mac: 120
				}, {
					period: '2006',
					smartphone: 25,
					windows: 80,
					mac: 40
				}, {
					period: '2007',
					smartphone: 10,
					windows: 10,
					mac: 10
				}


			],
			lineColors: ['#c62828', '#7356f1', '#1565c0'],
			xkey: 'period',
			ykeys: ['smartphone', 'windows', 'mac'],
			labels: ['Phone', 'Windows', 'Mac'],
			pointSize: 0,
			lineWidth: 2,
			resize: true,
			fillOpacity: 1,
			behaveLikeLine: true,
			gridLineColor: 'transparent',
			hideHover: 'auto'

		});
	}
	
	if(jQuery('#lineChart_1').length > 0)
	{
		let draw = Chart.controllers.line.__super__.draw; //draw shadow
		
		//basic line chart
		const lineChart_1 = document.getElementById("lineChart_1").getContext('2d');

		Chart.controllers.line = Chart.controllers.line.extend({
			draw: function () {
				draw.apply(this, arguments);
				let nk = this.chart.chart.ctx;
				let _stroke = nk.stroke;
				nk.stroke = function () {
					nk.save();
					nk.shadowColor = 'rgba(255, 0, 0, .2)';
					nk.shadowBlur = 10;
					nk.shadowOffsetX = 0;
					nk.shadowOffsetY = 10;
					_stroke.apply(this, arguments)
					nk.restore();
				}
			}
		});
		
		lineChart_1.height = 100;

		new Chart(lineChart_1, {
			type: 'line',
			data: {
				defaultFontFamily: 'Poppins',
				labels: ["Jan", "Febr", "Mar", "Apr", "May", "Jun", "Jul"],
				datasets: [
					{
						label: "My First dataset",
						data: [25, 20, 60, 41, 66, 45, 80],
						borderColor: 'rgba(56, 164, 248, 1)',
						borderWidth: "2",
						backgroundColor: 'transparent',  
						pointBackgroundColor: 'rgba(56, 164, 248, 1)'
					}
				]
			},
			options: {
				legend: false, 
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero: true, 
							max: 100, 
							min: 0, 
							stepSize: 20, 
							padding: 10
						}
					}],
					xAxes: [{
						ticks: {
							padding: 5
						}
					}]
				}
			}
		});
	}
	
	//#chart_widget_4

	if(jQuery('#chart_widget_4').length > 0 ){

		const chart_widget_4 = document.getElementById("chart_widget_4").getContext('2d');
		
		// chart_widget_4.height = 100;

		let barChartData2 = {
			defaultFontFamily: 'Poppins',
			labels: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'forteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty'],
			datasets: [{
				label: 'Expense',
				backgroundColor: '#75B432',
				hoverBackgroundColor: '#75B432', 
				data: [
					'20',
					'14',
					'18',
					'25',
					'27',
					'22',
					'12', 
					'24', 
					'20', 
					'14', 
					'18', 
					'16', 
					'34', 
					'32', 
					'43', 
					'36', 
					'56', 
					'12', 
					'23', 
					'34'
				]
			}, {
				label: 'Earning',
				backgroundColor: '#F1F3F7',
				hoverBackgroundColor: '#F1F3F7', 
				data: [
					'32',
					'58',
					'34',
					'37',
					'15',
					'41',
					'24', 
					'38', 
					'52', 
					'38', 
					'24', 
					'19', 
					'54', 
					'34', 
					'23', 
					'34', 
					'35', 
					'22', 
					'43', 
					'33'
				]
			}]

		};

		new Chart(chart_widget_4, {
			type: 'bar',
			data: barChartData2,
			options: {
				legend: {
					display: false
				}, 
				title: {
					display: false
				},
				tooltips: {
					mode: 'index',
					intersect: false
				},
				responsive: true,
				maintainAspectRatio: false, 
				scales: {
					xAxes: [{
						display: false, 
						stacked: true,
						barPercentage: 1, 
						barThickness: 5, 
						ticks: {
							display: false
						}, 
						gridLines: {
							display: false, 
							drawBorder: false
						}
					}],
					yAxes: [{
						display: false, 
						stacked: true, 
						gridLines: {
							display: false, 
							drawBorder: false
						}, 
						ticks: {
							display: false, 
							max: 100, 
							min: 0
						}
					}]
				}
			}
		});

	}
	
	if(jQuery('#chart_widget_8').length > 0)
	{	
		
		//#chart_widget_8
		new Chartist.Line("#chart_widget_8", {
			//alert("kkk");
			labels: ["1", "2", "3", "4", "5", "6", "7", "8"],
			series: [
				[4, 5, 1.5, 6, 7, 5.5, 5.8, 4.6]
			]
		}, {
			low: 0,
			showArea: !1,
			showPoint: !0,
			showLine: !0,
			fullWidth: !0,
			lineSmooth: !1,
			chartPadding: {
				top: 4,
				right: 0,
				bottom: 0,
				left: 0
			},
			axisX: {
				showLabel: !1,
				showGrid: !1,
				offset: 0
			},
			axisY: {
				showLabel: !1,
				showGrid: !1,
				offset: 0
			}
		});	
		
	}
	
	var direction =  getUrlParams('dir');
	if(direction != 'rtl')
	{direction = 'ltr'; }

	new dezSettings({
		typography: "roboto",
		version: "light",
		layout: "vertical",
		headerBg: "color_1",
		navheaderBg: "color_3",
		sidebarBg: "color_3",
		sidebarStyle: "modern",
		sidebarPosition: "static",
		headerPosition: "static",
		containerLayout: "wide",
		direction: direction
	}); 
	
})(jQuery);


