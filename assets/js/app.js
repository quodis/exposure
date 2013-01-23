MBP.scaleFix();
MBP.hideUrlBarOnLoad();
MBP.startupImage();

$(document).ready(function() {
	var APP = window.APP || {};

	var isRetina = window.devicePixelRatio > 1,
		clickEvent = ('ontouchstart' in document) ? 'touchstart' : 'click',
		retinaName = "@2x",
		getSize,
		replaceImages,
		loadBackgroundImage,
		positionFrames,
		hideFrames,
		loadImageIntoFrame,
		loadPerson,
		firstRun = true,
		firstLoad = true,
		imagesLoaded = 0,
		imagesToLoad = 6,
		firstLoader,
		loadFromHistory,
		isHashChangeActive = true,
		drawClickAreas,
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

		$('.frame').each(function(index) {
			var $this = $(this),
				current = $this.data('current');

			if (current !== undefined) loadImageIntoFrame(current+1, index+1);
		});
	};

	loadBackgroundImage = function($element, newSrc) {
		var newImage = new Image();
		newImage.src = newSrc;

		if (!firstLoad) {
			$('#content .content > .loader')
			.css({
				opacity: 1,
				display: 'block'
			});
		}

		newImage.onload = function() {
			if (!firstLoad) {
				$('#content .content > .loader')
				.css({
					opacity: 0,
					display: 'none'
				});
			}

			$element.attr('src', newImage.src);
			$(window).trigger('repositionFrames');
			newImage = null;

			firstLoader();
		};
	};

	positionFrames = function() {
		var $background = $('#background'),
			$content = $('#content'),
			referenceWidth = APP.config.reference.width,
			referenceHeight = APP.config.reference.height,
			actualWidth = parseInt($background.css('width'), 10),
			actualHeight = parseInt($background.css('height'), 10);


		$.each(APP.config.frames, function(index, frame) {
			var newX = (frame.x * actualWidth) / referenceWidth,
				newY = (frame.y * actualHeight) / referenceHeight,
				newWidth = (frame.width * actualWidth) / referenceWidth,
				newHeight = (frame.height * actualHeight) / referenceHeight,
				frameIndex = index + 1;
				$frame = $('[data-frame="' + frameIndex + '"]'),
				area = APP.config.clickAreas[index],
				newAreaX = (area.x * actualWidth) / referenceWidth,
				newAreaY = (area.y * actualHeight) / referenceHeight,
				newAreaWidth = (area.width * actualWidth) / referenceWidth,
				newAreaHeight = (area.height * actualHeight) / referenceHeight


			$frame.css({
				left: newX,
				top: newY,
				width: newWidth,
				height: newHeight,
				visibility: 'visible'
			});

			$('[data-area="' +  (index + 1) + '"]')
			.css({
				position: 'absolute',
				left: newAreaX,
				top: newAreaY,
				width: newAreaWidth,
				height: newAreaHeight,
				zIndex: 50
			});
		});
	};

	hideFrames = function() {
		$.each(APP.config.frames, function(index, frame) {
			var frameIndex = index + 1,
				$frame = $('[data-frame="' + frameIndex + '"]');

			$frame.css({
				visibility: 'hidden'
			});
		});
	};

	loadImageIntoFrame = function(imageIndex, frameIndex) {
		var frames = APP.config.frames,
			frame,
			$frame,
			image,
			extension = '.png',
			imageURL,
			imageName;

		frameIndex -= 1;
		imageIndex -= 1;

		if (frameIndex >= frames.length || imageIndex >= frames[frameIndex].length) {
			throw new Error('frame or image out of bounds: frame: ' + frameIndex + ', image: ', imageIndex);
		}

		frame = frames[frameIndex];
		imageName = frame.images[imageIndex];

		$frame = $('[data-frame="' + (frameIndex + 1) + '"]');

		$frame.data('current', imageIndex);

		imageURL = "/assets/img/content/" + imageName + "-" + getSize();

		if (isRetina && getSize() != 'huge') {
			imageURL += retinaName;
		}

		imageURL += extension;

		$frame = $('[data-frame="' + (frameIndex + 1) + '"]');

		//console.log('loading image:' + imageURL + ' into frame: ', $frame);

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
	};


	shuffleImages = function() {
		var frames = APP.config.frames,
			frame,
			randomImageIndex,
			imageSet,
			imageList = [];

		for (var f=0; f<frames.length; f++) {
			frame = frames[f];
			randomImageIndex = Math.floor(Math.random() * frame.images.length) + 1;

			loadImageIntoFrame(randomImageIndex, f+1);

			imageList.push(frame.images[randomImageIndex-1]);
		}

		imageSet = imageList.join(',');

		$.bbq.pushState({set: imageSet});
	};

	loadPerson = function(name) {
		var people = APP.config.people,
			frames = APP.config.frames,
			person = people[name],
			image,
			randomImageIndex,
			imageSet,
			imageList = [];

		for (var f=0; f<frames.length; f++) {
			randomImageIndex = Math.floor(Math.random() * person[f].length);
			image = person[f][randomImageIndex],
			imageIndex = APP.config.frames[f].images.indexOf(image) + 1;

			loadImageIntoFrame(imageIndex, f+1);

			imageList.push(image);
		}

		imageSet = imageList.join(',');

		$.bbq.pushState({set: imageSet});
	};

	firstLoader = function() {
		if (!firstLoad) return;

		imagesLoaded++;

		if (imagesLoaded >= imagesToLoad) {
			$('#content .content > .loader')
			.css({
				opacity: 0,
				display: 'none'
			});

			$('.person, #shuffle').removeClass('disabled');

			firstLoad = false;
		}
	};

	loadFromHistory = function() {
		var state = $.bbq.getState(),
			images,
			imageIndex,
			frame;

		if (!state.set) {
			shuffleImages();
		} else {
			images = state.set.split(',')

			for (var f=0; f<images.length; f++) {
				imageIndex = APP.config.frames[f].images.indexOf(images[f]) + 1;
				loadImageIntoFrame(imageIndex, f+1);
			}
		}
		firstRun = false;
	};

	// Bootstrap
	replaceImages();
	loadFromHistory();

	var lazyReplace = MBP.debounce(replaceImages, 150);
	$(window).resize(lazyReplace);
	$(window).resize(hideFrames);

	$(window).on('repositionFrames', positionFrames);

	$('#shuffle').on(clickEvent, function(evt) {
		evt.preventDefault();
		if (!$(this).hasClass('disabled')) shuffleImages();
	});

	$('.person').on(clickEvent, function(evt) {
		evt.preventDefault();
		if (!$(this).hasClass('disabled')) loadPerson($(this).data('person'));
	});

	// Bind to hashchange event
	$(window).bind( 'hashchange', function( event ) {
		if (!firstRun && isHashChangeActive) loadFromHistory(event);
	});

	// Frame click event
	$('.clickArea').on(clickEvent, function(evt) {
		evt.preventDefault();

		if (firstLoad) return;

		var $this = $(this),
			frameIndex = parseInt($this.data('area'), 10),
			$frame = $('[data-frame="' + frameIndex + '"]'),
			imagesInFrame = APP.config.frames[frameIndex-1].images,
			current = parseInt($frame.data('current'), 10),
			next = current + 1,
			state = $.bbq.getState(),
			images,
			imageSet;

		if (next >= imagesInFrame.length) next = 0;

		loadImageIntoFrame(next+1, frameIndex);

		// Update history
		images = state.set.split(',');
		images[frameIndex-1] = APP.config.frames[frameIndex-1].images[next];

		imageSet = images.join(',');

		isHashChangeActive = false;
		$.bbq.pushState({set: imageSet});

		setTimeout(function() {
			isHashChangeActive = true;
		}, 250);
    });
});