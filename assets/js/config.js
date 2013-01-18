var APP = window.APP || {};

APP.config = {
	sizes: [
		{
			max: 320,
			name: 'small'
		},
		{
			max: 1024,
			name: 'medium'
		},
		{
			max: Infinity,
			name: 'large'
		}
	],
	reference: {
		width: 2880,
		height: 1920
	},
	extension: '.png',
	frames: [
		{
			x: 1250,
			y: 930,
			width: 1630,
			height: 992,
			images: ['1-1', '1-2']
		},
		{
			x: 0,
			y: 285,
			width: 1566,
			height: 1638,
			images: ['2-1', '2-2']
		},
		{
			x: 522.25,
			y: 160.2,
			width: 931,
			height: 854,
			images: ['3-1', '3-2']
		},
		{
			x: 1437.25,
			y: 63.63,
			width: 761,
			height: 1087,
			images: ['4-1', '4-2']
		},
		{
			x: 1860.03,
			y: 353.28,
			width: 1021,
			height: 1098,
			images: ['5-1', '5-2']
		}
	]
};

window.APP = APP;