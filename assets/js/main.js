/*
	Alpha by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/


var contentData;

function parseSheet(tsv) {

	var arr = tsv.split("\n").splice(1);

	for (var i = 0; i < arr.length; i++) {
		arr[i] = arr[i].split("\t");
	}

	console.log(arr);
	return arr;

}

function populateContentData(contentData) {

	for (var i = 0; i < contentData.length; i++) {

		document.getElementById(contentData[i][0].substring(1)).innerHTML = contentData[i][1];

	}

}


(function($) {

	var	$window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$banner = $('#banner');

	var offsetTop = 50;

	// Breakpoints.
		breakpoints({
			wide:      ( '1281px',  '1680px' ),
			normal:    ( '981px',   '1280px' ),
			narrow:    ( '737px',   '980px'  ),
			narrower:  ( '737px',   '840px'  ),
			mobile:    ( '481px',   '736px'  ),
			mobilep:   ( null,      '480px'  )
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Dropdowns.
		$('#nav > ul').dropotron({
			alignment: 'center',
			offsetX: -40
		});

	// NavPanel.

		// Button.
			$(
				'<div id="navButton">' +
					'<a href="#navPanel" class="toggle"></a>' +
				'</div>'
			)
				.appendTo($body);

		// Panel.
			$(
				'<div id="navPanel">' +
					'<nav>' +
						$('#nav').navList() +
					'</nav>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'left',
					target: $body,
					visibleClass: 'navPanel-visible'
				});

	// Header.
		//if (!browser.mobile
		//&&	$header.hasClass('alt')
		//&&	$banner.length > 0) {

		//	$window.on('load', function() {

		//		$banner.scrollex({
		//			bottom:		$header.outerHeight(),
		//			terminate:	function() { $header.removeClass('alt'); },
		//			enter:		function() { $header.addClass('alt reveal'); },
		//			leave:		function() { $header.removeClass('alt'); }
		//		});

		//	});

		//}

		window.onscroll = function() {
			if (window.scrollY > (0.75 * window.innerHeight)) {
				this.document.getElementById("header").classList.add("shrunk");
			} else {
				this.document.getElementById("header").classList.remove("shrunk");
			}
		}

		// scroll to
		$('a[href*="#"]').on("click", function(e) {
			e.preventDefault();
			var target = $(this).attr("href");
			window.scrollTo({top: $(target)[0].offsetTop - offsetTop, behavior: "smooth"});
		});

		// loading data from google sheets
		$.ajax({
			type: "get",
			url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vS4Xl3VGd0NcOrr8-46_NrdcBQzv9__wcHvRKg8g-BQsRPcHjcT4G2YqCJ3gaPARzEoU2BKxct6ECmU/pub?output=tsv",
			data: null,
			success: function(response) {
				contentData = parseSheet(response);
				populateContentData(contentData);
			}
		});



})(jQuery);