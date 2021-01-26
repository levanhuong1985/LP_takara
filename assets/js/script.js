(function($){

	/* jsCreatedOverlay
	--------------------------------------------------*/
	var jsCreateOverlay = function(){
		var overlay = $('<div class="overlay"></div>');
		overlay.prependTo(document.body);
	}

	/* jsRemoveOverlay
	--------------------------------------------------*/
	var jsRemoveOverlay = function(){
		$(".overlay").remove();
	}

	/* jsAnchors
	--------------------------------------------------*/
	var jsAnchors = function(){
		$('a[href^="#"]:not(".tab-link a, .btn-sellbuy a, .btn-sellbuy-fixed a")').on('click', function(event) {
			var hash = '#' + $(this).attr('href').split('#')[1]
			var element = $(hash)
			if (element.length) {
				event.preventDefault();
				history.pushState(hash, undefined, hash)
				$('html, body').animate({scrollTop: element.offset().top}, 1000)
			}
		});
	}

	/* jsAccodion
	--------------------------------------------------*/
	var jsRollOver = function(){
		$('.imgover').each(function(){
			this.osrc = $(this).find('img').attr('src');
			this.rollover = new Image();
			this.rollover.src = this.osrc.replace(/(\.gif|\.jpg|\.png)/, "_o$1");
		}).hover(function(){
			$(this).find('img').attr('src',this.rollover.src);
		},function(){
			$(this).find('img').attr('src',this.osrc);
		});
	}

	/* jsEffect
	--------------------------------------------------*/
	var jsEffect = function(){
		$(window).on('scroll load', function(){
			var
			sc = $(window).scrollTop(),
			wh = window.innerHeight;
			$('.fadeup, .fadein, .effect').each(function(index, el) {
				var pos = $(this).offset().top;
				if(pos<sc+wh*0.8){
					$(this).addClass('on');
				}
			});
		});
	}

	/* jsFixed
	--------------------------------------------------*/
	var jsFixed = function(){
		$(window).scroll(function() {
			// Side menu
			if ( $(window).scrollTop() > 100){
				$('#side-menu').addClass('fixed');
			} else {
				$('#side-menu').removeClass('fixed');
			}

			// Side contact
			if ( $(window).scrollTop() > 200){
				$('#side-contact').addClass('fixed');
			} else {
				$('#side-contact').removeClass('fixed');
			}

			var $header = $('#header');
			var $height = $header.outerHeight();
			var $windowHeight = $(this).innerHeight();

			if ( $(window).scrollTop() > $windowHeight){
				$header.addClass('fixed');
				$('body').css({
					'padding-top': $height
				});
			} else {
				$header.removeClass('fixed');
				$('body').css({
					'padding-top': 0
				});
			}

			// Hide SELL & BUY navigations
			if ( $(window).scrollTop() < $windowHeight){
				$(".nav-box").removeClass("is-open");
				$(".btn-sellbuy-fixed li").removeClass("active");
			}

			// Fixed bottom SP
			if ( $(window).scrollTop() > $windowHeight){
				$("#fixed-bottom-sp").addClass('fixed');
			} else {
				$("#fixed-bottom-sp").removeClass('fixed');
			}


		});
	}

	/* jsSellBuy Menu
	--------------------------------------------------*/
	var jsSellBuy = function(e){

		//Fixed haven't yet
		$(".btn-sellbuy li").hover(function() {
			if($('.overlay').length <= 0) {
				jsCreateOverlay();
			}
			var $this = $(this);
			$this.siblings('li').removeClass("active");
			$this.addClass("active");
			$this.closest('.btn-sellbuy')
				.nextAll('.nav-sellbuy-wrap')
				.find('.nav-box')
				.removeClass('on'); 

			var $activeNav = $(this).find('a').attr("rel");
			$($activeNav).addClass('on');
			return false;
		});

		$("html, .overlay").mouseover(function(){
			jsRemoveOverlay();
			$(".nav-box").removeClass("on");
			$(".btn-sellbuy li").removeClass("active");
		});
		$(".nav-sellbuy-wrap, .btn-sellbuy").mouseover(function(e){
			e.stopPropagation();
		});

		//Fixed have

		$(".btn-sellbuy-fixed li").hover(function() {
			if($('.overlay').length <= 0) {
				jsCreateOverlay();
			}
			var $this = $(this);
			$this.siblings('li').removeClass("active");
			$this.addClass("active");
			$this.closest('.btn-sellbuy-fixed')
				.parents('#header')
				.nextAll('.nav-sellbuy-wrap')
				.find('.nav-box')
				.removeClass('is-open'); 

			var $activeNav = $(this).find('a').attr("rel");
			$($activeNav).addClass('is-open');
			return false;
		});
		$("html, .overlay").mouseover(function(){
			jsRemoveOverlay();
			$(".nav-box").removeClass("is-open");
			$(".btn-sellbuy-fixed li").removeClass("active");
		});
		$("#header, .nav-sellbuy-wrap, .btn-sellbuy-fixed").mouseover(function(e){
			e.stopPropagation();
		});
	}

	/* jsTabs
	--------------------------------------------------*/
	var jsTabs = function(){
		// $("#tab-news li, #tab-search li").click(function() {
		// 	var elm = $(this);

		// 	elm.siblings()
		// 		.removeClass("active");

		// 	elm.addClass("active");

		// 	elm.parent('.tab-link')
		// 		.next('.tab-content')
		// 		.children(".tab-box")
		// 		.hide();

		// 	var i = elm.index();
		// 	$('.tab-content > div:eq('+i+')').fadeIn();
		// 	return false;
		// });

		$(".tab-link li").click(function() {
			var cTab = $(this);
			cTab.siblings('li').removeClass("active");
			cTab.addClass("active");
			cTab.closest('.tab-link').nextAll('.tab-content').find('.tab-box').hide(); 

			var activeTab = $(this).find('a').attr("href"); //Find the href attribute value to identify the active tab + content
			$(activeTab).fadeIn(); //Fade in the active ID content
			return false;
		});

	}

	/* jsMenu
	--------------------------------------------------*/
	var jsMenu = function(){
		//menuToggle
		$('.openmenu').on('click', function() {
			$('#gnav').toggleClass('open');
			$(this).toggleClass('active');
			$('body, html').toggleClass('noscroll');
		});
		$('.closemenu').on('click', function() {
			$('#gnav').removeClass('open');
			$('.openmenu').removeClass('active');
			$('body, html').removeClass('noscroll');
		});

		$('.openmenu-sup').click(function(){
			$('.openmenu-sup').removeClass('active');
			$('#gnav .sub-list-sellbuy').removeClass('is-show');
			if($(this).next().is(':visible')==false){
				$(this).next().addClass('is-show');
				$(this).addClass('active');
			}
		});
	}


	//function slider() {
	var jsSliderMV = function(){
	    function i() {
	        $("#main-visual").delay(500).queue(function(i) {
	            $(this).addClass("active"), $(".main-text, .btn-pickup, #scroll").delay(500).fadeIn(1500)
	        }), a.eq(l).addClass("active").stop(!0, !0).queue(new Function).delay(1500).queue(function() {
	            e && (a.removeClass("init"), a.eq(n).removeClass("active"), n++)
	        }).dequeue(), l++, d++, r++, n > t && (n = 0), s > t && (s = 0), o > t && (o = 0), l > t && (l = 0), d > t && (d = 0), r > t && (r = 0)
	    }
	    var e = !1,
	        a = $(".main-slider").children("li"),
	        t = a.length - 1,
	        n = 0,
	        s = 0,
	        o = 0,
	        l = 0,
	        d = 1,
	        r = 2;
	    setInterval(function() {
	        e = !0, i()
	    }, 6e3);
	    i()
	}

	/* jsPageTop
	--------------------------------------------------*/
	var jsPageTop = function(){
		var btnTop = $('#pagetop');
		// $(window).scroll(function(event) {
		// 	if ($(this).scrollTop() > 500) {
	 //            $(btnTop).fadeIn(200);
	 //        } else {
	 //            $(btnTop).fadeOut(200);
	 //        }
		// });
		btnTop.click(function () {
			$('body,html').animate({ scrollTop: 0 }, 500);
			return false;
	    });
	}




	/* Dom Ready
	--------------------------------------------------*/
	jsAnchors();
	jsRollOver();
	jsEffect();
	jsFixed();
	jsSellBuy();
	jsTabs();
	jsMenu();
	jsSliderMV();
	jsPageTop();

	$('.matchHeight').matchHeight();

	// MAIN VISUAL LOOPS
	
	var target = $('#slider-loops');

	$('#slider-loops').slick({
		arrows: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: false,
		variableWidth: true,
		autoplay: true,
		autoplaySpeed: 0,
		speed: 2500,
		cssEase: 'linear',
		pauseOnHover: false,
		swipeToSlide: true
	});
	target.slick('unslick'); // Not stop when clicked each item.
	$('#slider-loops').slick({
		arrows: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: false,
		variableWidth: true,
		autoplay: true,
		autoplaySpeed: 0,
		speed: 2500,
		cssEase: 'linear',
		pauseOnHover: false,
		swipeToSlide: true
	});


	// NEW ARRIVAL
	$('#slider-newarrival').slick({
		dots: false,
		slidesToShow: 4,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000,
		arrows: true,
		variableWidth: true,
		pauseOnHover: false,
		prevArrow: $('#arrical-prev'),
		nextArrow: $('#arrical-next'),
		responsive: [
			{
			breakpoint: 768,
				settings: {
					centerMode: true,
					slidesToShow: 1,
					slidesToScroll: 1,
					speed: 500,
				}
			},
		] 
	});

	// VOICE
	$('#slider-voice').slick({
		dots: false,
		slidesToShow: 2,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000,
		arrows: true,
		variableWidth: true,
		pauseOnHover: false,
		responsive: [
			{
			breakpoint: 768,
				settings: {
					slidesToShow: 1,
					speed: 500,
					variableWidth: false
				}
			},
		] 
	});

	// FOR TOPPAGE
	$(window).on('resize load', function() {
		var $this = $(this);
		var $winW = $this.width();
		var $containerW = $('.container').width();
		var $margin = ( $winW - $containerW ) / 2 ;
		$('.img-greeting').css({
			'margin-left': -($margin),
			'width': $containerW/2 + $margin + 45
		});

		var $winW = $(this).innerWidth();
		if($winW < 768) {
			if(!$('#slider-pickup').hasClass('slick-initialized')){
				$('#slider-pickup').slick({
					centerMode: true,
					arrows:false,
					dots:true,
					slidesToShow: 1,
					slidesToScroll: 1,
					infinite: true,
					variableWidth: true,
					autoplay: true,
					autoplaySpeed: 5000,
				});
		}
		}else{
			if($('#slider-pickup').hasClass('slick-initialized')){
				$('#slider-pickup').slick('unslick');
			}
		}
	});

})(jQuery);