MBP.scaleFix();
MBP.hideUrlBarOnLoad();
MBP.startupImage();

$(document).ready(function() {
	var APP = window.APP || {};

	var isRetina = window.devicePixelRatio > 1,
		retinaName = "@2x",
		getSize,
		replaceImages,
		loadBackgroundImage,
		positionFrames,
		hideFrames,
		loadBackgroundImageIntoFrame,
		loadBackgroundImageByNameIntoFrame,
		loadPerson,
		firstLoad = true,
		imagesLoaded = 0,
		imagesToLoad = 6,
		firstLoader,
		shuffleImages;

	getSize = APP.getSize = function() {
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
		var size = getSize();

		if (APP.currentSize === size) {
			$(window).trigger('repositionFrames');
			return;
		}

		APP.currentSize = size;

		$('img[data-responsive="true"]').each(function() {
			var $this = $(this),
				imageSrc = $this.data(size),
				extension;

			if (isRetina && getSize() != 'huge') {
				extension = imageSrc.substring(imageSrc.indexOf('.'), imageSrc.length);
				imageSrc = imageSrc.substring(0, imageSrc.indexOf('.'));
				imageSrc += retinaName + extension;
			}

			loadBackgroundImage($this, imageSrc);
			$(window).trigger('repositionFrames');
		});
	};

	loadBackgroundImage = function($element, newSrc) {
		var newImage = new Image();
		newImage.src = newSrc;

		if (!firstLoad) {
			$('#content .loader')
			.css({
				opacity: 1
			});
		}

		newImage.onload = function() {
			if (!firstLoad) {
				$('#content .loader')
				.css({
					opacity: 0
				});
			}

			$element.attr('src', newImage.src);
			$(window).trigger('repositionFrames');
			newImage = null;

			firstLoader();
		};
	};

	positionFrames = APP.positionFrames = function() {
		var $background = $('#background'),
			$content = $('#content'),
			referenceWidth = APP.config.reference.width,
			referenceHeight = APP.config.reference.height,
			actualWidth = parseInt($background.css('width'), 10),
			actualHeight = parseInt($background.css('height'), 10),
			size = getSize()
			offsetX = (size == 'medium' || size == 'small') ? 60 : 30,
			offsetY = (size == 'medium' || size == 'small') ? 60 : 30;

			console.log(offsetX, offsetY);

		offsetX = (offsetX * actualWidth) / referenceWidth;
		offsetY = (offsetY * actualHeight) / referenceHeight;


		_.each(APP.config.frames, function(frame, index) {
			var newX = (frame.x * actualWidth) / referenceWidth,
				newY = (frame.y * actualHeight) / referenceHeight,
				newWidth = (frame.width * actualWidth) / referenceWidth,
				newHeight = (frame.height * actualHeight) / referenceHeight,
				frameIndex = index + 1;
				$frame = $('[data-frame="' + frameIndex + '"]');

			$frame.css({
				left: newX + offsetX,
				top: newY + offsetY,
				width: newWidth,
				height: newHeight,
				visibility: 'visible'
			});
		});
	};

	hideFrames = function() {
		_.each(APP.config.frames, function(frame, index) {
			var frameIndex = index + 1,
				$frame = $('[data-frame="' + frameIndex + '"]');

			$frame.css({
				visibility: 'hidden'
			});
		});
	};

	loadBackgroundImageIntoFrame = function(imageIndex, frameIndex) {
		var frames = APP.config.frames,
			frame,
			imageName;

		frameIndex -= 1;
		imageIndex -= 1;

		if (frameIndex >= frames.length || imageIndex >= frames[frameIndex].length) {
			throw new Error('frame or image out of bounds: frame: ' + frameIndex + ', image: ', imageIndex);
		}

		frame = frames[frameIndex];
		imageName = frame.images[imageIndex];

		loadBackgroundImageByNameIntoFrame(imageName, frameIndex);
	};

	loadBackgroundImageByNameIntoFrame = function(imageName, frameIndex) {
		var image,
			$frame,
			extension = '.png',
			imageURL = "/assets/img/content/" + imageName + "-" + getSize();

		if (isRetina && getSize() != 'huge') {
			imageURL += retinaName;
		}

		imageURL += extension;

		$frame = $('[data-frame="' + (frameIndex + 1) + '"]');

		console.log('loading image:' + imageURL + ' into frame: ', $frame);

		image = new Image()
		image.src = imageURL;

		$frame.addClass('loading');

		image.onload = function() {
			$frame.css({
				"background-image": "url("+ imageURL +")",
				"background-color": 'transparent'
			})
			.removeClass('loading');

			firstLoader();
		};
	}

	APP.shuffleImages = shuffleImages = function() {
		var frames = APP.config.frames,
			frame,
			randomImageIndex;

		for (var f=0; f<frames.length; f++) {
			frame = frames[f];
			randomImageIndex = Math.floor(Math.random() * frame.images.length) + 1;

			loadBackgroundImageIntoFrame(randomImageIndex, f+1);
		}
	};

	APP.loadPerson = loadPerson = function(name) {
		var people = APP.config.people,
			frames = APP.config.frames,
			person = people[name],
			randomImageIndex;

		for (var f=0; f<frames.length; f++) {
			randomImageIndex = Math.floor(Math.random() * person[f].length);

			loadBackgroundImageByNameIntoFrame(person[f][randomImageIndex], f);
		}
	};

	firstLoader = function() {
		if (!firstLoad) return;

		imagesLoaded++;

		if (imagesLoaded >= imagesToLoad) {
			$('#content .loader')
			.css({
				opacity: 0
			});

			firstLoad = false;
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
	});

	$('.person').on('click', function(evt) {
		evt.preventDefault();
		loadPerson($(this).data('person'));
	})
});