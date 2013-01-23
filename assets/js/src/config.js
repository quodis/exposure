var APP = window.APP || {};

APP.config = {
	endpoint: 'http://d1yspmzor1g36p.cloudfront.net/',
	sizes: [
		{
			max: 320,
			name: 'small'
		},
		{
			max: 720,
			name: 'medium'
		},
		{
			max: 1440,
			name: 'large'
		},
		{
			max: Infinity,
			name: 'huge'
		}
	],
	reference: {
		width: 2880,
		height: 1920
	},
	extension: '.png',
	clickAreas: [
		{
			x: 1910,
			y: 1170,
			width: 660,
			height: 746
		},
		{
			x: 235,
			y: 855,
			width: 667,
			height: 1070
		},
		{
			x: 780.33,
			y: 159.15,
			width: 407,
			height: 690
		},
		{
			x: 1587.25,
			y: 63.63,
			width: 376,
			height: 922
		},
		{
			x: 1982,
			y: 553,
			width: 540,
			height: 586
		}
	],
	frames: [
		{
			x: 1250,
			y: 929,
			width: 1630,
			height: 992,
			images: ['1-10', '1-11', '1-12', '1-13', '1-14', '1-15', '1-1', '1-2', '1-3', '1-4', '1-5', '1-6', '1-7', '1-8', '1-9']
		},
		{
			x: 0,
			y: 283.04,
			width: 1566,
			height: 1638,
			images: ['2-10', '2-11', '2-12', '2-13', '2-14', '2-15', '2-16', '2-17', '2-18', '2-19', '2-1', '2-20', '2-21', '2-2', '2-3', '2-4', '2-5', '2-6', '2-7', '2-8', '2-9']
		},
		{
			x: 500.33,
			y: 161.77,
			width: 931,
			height: 854,
			images: ['3-10', '3-11', '3-12', '3-13', '3-14', '3-15', '3-16', '3-17', '3-18', '3-19', '3-1', '3-20', '3-2', '3-3', '3-4', '3-5', '3-6', '3-7', '3-8', '3-9']
		},
		{
			x: 1437.25,
			y: 63.63,
			width: 761,
			height: 1087,
			images: ['4-11', '4-12', '4-13', '4-14', '4-15', '4-16', '4-17', '4-18', '4-19', '4-1', '4-2', '4-3', '4-4', '4-5', '4-6', '4-7', '4-8', '4-9', '4-10']
		},
		{
			x: 1860.03,
			y: 353.28,
			width: 1021,
			height: 1098,
			images: ['5-11', '5-12', '5-13', '5-14', '5-15', '5-1', '5-2', '5-3', '5-4', '5-5', '5-6', '5-7', '5-8', '5-9', '5-10']
		}
	],
	people: {
		bruno: [
			["1-10", "1-11", "1-13"],
			["2-1", "2-3", "2-4", "2-21"],
			["3-5", "3-6", "3-18"],
			["4-5", "4-6", "4-7", "4-8", "4-10", "4-19"],
			["5-9", "5-10"]
		],
		jan: [
			["1-7", "1-7", "1-9", "1-14"],
			["2-13", "2-14"],
			["3-1", "3-3", "3-4", "3-16", "3-17"],
			["4-4"],
			["5-5", "5-6", "5-7", "5-8"]
		],
		leihla:[
			["1-6"],
			["2-8", "2-12", "2-18"],
			["3-13", "3-14", "3-15", "3-19"],
			["4-1", "4-2", "4-3", "4-14", "4-15"],
			["5-4"]
		],
		leo: [
			["1-3", "1-4"],
			["2-2", "2-8", "2-9", "2-10", "2-11"],
			["3-11", "3-12", "3-13"],
			["4-12", "4-13"],
			["5-1", "5-2", "5-3", "5-14"]
		],
		ricardo: [
			["1-1", "1-2"],
			["2-5", "2-6", "2-16"],
			["3-2", "3-7", "3-8", "3-9", "3-10", "3-14"],
			["4-9", "4-10", "4-11", "4-16", "4-17", "4-18"],
			["5-11", "5-12"]
		]
	}
};

window.APP = APP;