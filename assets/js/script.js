(function($){

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
		$(".btn-sellbuy li").click(function() {
			var cTab = $(this);
			cTab.siblings('li').removeClass("active");
			cTab.addClass("active");
			cTab.closest('.btn-sellbuy')
				.nextAll('.nav-sellbuy-wrap')
				.find('.nav-box')
				.removeClass('on'); 

			var activeTab = $(this).find('a').attr("href");
			$(activeTab).addClass('on');
			return false;
		});

		$("html").click(function(){
			$(".nav-box").removeClass("on");
			$(".btn-sellbuy li").removeClass("active");
		});
		$(".nav-sellbuy-wrap, .btn-sellbuy").click(function(e){
			e.stopPropagation();
		});

		//Fixed have

		$(".btn-sellbuy-fixed li").click(function() {
			var cTab = $(this);
			cTab.siblings('li').removeClass("active");
			cTab.addClass("active");
			cTab.closest('.btn-sellbuy-fixed')
				.parents('#header')
				.nextAll('.nav-sellbuy-wrap')
				.find('.nav-box')
				.removeClass('is-open'); 

			var activeTab = $(this).find('a').attr("href");
			$(activeTab).addClass('is-open');
			return false;
		});
		$("html").click(function(){
			$(".nav-box").removeClass("is-open");
			$(".btn-sellbuy-fixed li").removeClass("active");
		});
		$(".nav-sellbuy-wrap, .btn-sellbuy-fixed").click(function(e){
			e.stopPropagation();
		});
	}

	/* jsEffect
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
		});
		$('.closemenu').on('click', function() {
			$('#gnav').removeClass('open');
			$('.openmenu').removeClass('active');
		});
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
	jsPageTop();

	$('.matchHeight').matchHeight();

	$('#slider-main-search').slick({
		dots: false,
		slidesToShow: 4,
		slidesToScroll: 2,
		autoplay: true,
		speed: 2500,
		autoplaySpeed: 1000,
		arrows: false,
		variableWidth: true,
		pauseOnHover: false,
		responsive: [
			{
			breakpoint: 768,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					speed: 1500,
				}
			},
		] 
	});

	// $('#gnav .gnav-sellbuy .ttl').click (function(){    
	// 	$(this).removeClass('active');
	// 	if($(this).next().css('display') == 'none') {
	// 		$(this).next().slideDown(500);
	// 		$(this).addClass('active');
	// 	}    
	// 	else {
	// 		$(this).next().slideUp(500);
	// 	}
	// });

	$('#gnav .gnav-sellbuy .ttl').click(function(){
	    $('#gnav .gnav-sellbuy ul').removeClass('active');
	    $('#gnav .gnav-sellbuy ul').slideUp('slow');
	    if($(this).next().is(':visible')==false){
	        $(this).next().slideDown('slow');
	        $(this).addClass('active');
	    }
	})

})(jQuery);