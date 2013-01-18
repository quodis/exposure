$(document).ready(function() {
	var APP = window.APP || {};

	var testSize,
		replaceImages,
		loadImage,
		positionFrames,
		hideFrames,
		loadImageIntoFrame,
		shuffleImages;

	testSize = APP.testSize = function() {
		var config = APP.config.sizes,
			width = Math.max(document.documentElement.clientWidth, document.documentElement.offsetWidth),
			size = null;

		for (var i=0; i<config.length; i++) {
			size = config[i];
			if (width <= size.max) {
				return size.name;
			}
		}
	};

	replaceImages = APP.replaceImages = function() {
		var size = testSize();

		if (APP.currentSize === size) {
			$(window).trigger('repositionFrames');
			return;
		}

		APP.currentSize = size;

		$('img[data-responsive="true"]').each(function() {
			var $this = $(this);
			loadImage($this, $this.data(size));
			$(window).trigger('repositionFrames');
		});
	};

	loadImage = function($element, newSrc) {
		var newImage = new Image();
		newImage.src = newSrc;

		newImage.onload = function() {
			$element.attr('src', newImage.src);
			$(window).trigger('repositionFrames');
			newImage = null;
		};
	};

	positionFrames = APP.positionFrames = function() {
		var $background = $('#background'),
			referenceWidth = APP.config.reference.width,
			referenceHeight = APP.config.reference.height,
			actualWidth = parseInt($background.css('width'), 10),
			actualHeight = parseInt($background.css('height'), 10);

		_.each(APP.config.frames, function(frame, index) {
			var newX = (frame.x * actualWidth) / referenceWidth,
				newY = (frame.y * actualHeight) / referenceHeight,
				newWidth = (frame.width * actualWidth) / referenceWidth,
				newHeight = (frame.height * actualHeight) / referenceHeight,
				frameIndex = index + 1;
				$frame = $('[data-frame="' + frameIndex + '"]');

			$frame.css({
				left: newX,
				top: newY,
				width: newWidth,
				height: newHeight,
				opacity: 1
			});
		});
	};

	hideFrames = function() {
		_.each(APP.config.frames, function(frame, index) {
			var frameIndex = index + 1,
				$frame = $('[data-frame="' + frameIndex + '"]');

			$frame.css({
				opacity: 0
			});
		});
	};

	loadImageIntoFrame = function(imageIndex, frameIndex) {
		var frames = APP.config.frames,
			frame,
			image,
			$frame;

		frameIndex -= 1;
		imageIndex -= 1;

		if (frameIndex >= frames.length || imageIndex >= frames[frameIndex].length) {
			throw new Error('frame or image out of bounds: frame: ' + frameIndex + ', image: ', imageIndex);
		}

		frame = frames[frameIndex];
		image = frame.images[imageIndex];

		$frame = $('[data-frame="' + (frameIndex + 1) + '"]');

		console.log('loading image:' + image + '.png into frame: ', $frame);

		$frame.css({
			"background-image": "url(/assets/img/content/" + image + ".png)",
			"background-color": 'transparent',
			'opacity': '1'
		});
	};

	APP.shuffleImages = shuffleImages = function() {
		var frames = APP.config.frames,
			frame,
			randomImageIndex;

		for (var f=0; f<frames.length; f++) {
			frame = frames[f];
			randomImageIndex = Math.floor(Math.random() * frame.images.length) + 1;

			loadImageIntoFrame(randomImageIndex, f+1);
		}
	}

	// Bootstrap
	replaceImages();
	shuffleImages();
	var lazyReplace = _.debounce(replaceImages, 150);
	$(window).resize(lazyReplace);
	$(window).resize(hideFrames);

	$(window).on('repositionFrames', positionFrames);


	$('#shuffle').on('click', function(evt) {
		evt.preventDefault();
		shuffleImages();
	})
});