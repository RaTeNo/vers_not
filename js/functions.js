$(function(){
	// Проверка браузера
	if ( !supportsCssVars() ) {
		$('body').addClass('lock')
		$('.supports_error').addClass('show')
	}


	// Ленивая загрузка
	setTimeout(function(){
		observer = lozad('.lozad', {
			rootMargin: '200px 0px',
			threshold: 0,
			loaded: function(el) {
				el.classList.add('loaded')
			}
		})

		observer.observe()
	}, 200)


	// Установка ширины стандартного скроллбара
	$(':root').css('--scroll_width', widthScroll() +'px')


	// Кнопка 'Вверх'
	$('body').on('click', '.buttonUp button', function(e) {
		e.preventDefault()

		$('body, html').stop(false, false).animate({
			scrollTop: 0
		}, 1000)
	})


	// Маска ввода
	$('input[type=tel]').inputmask('+7 (999) 999-99-99')

	// Кастомный select
	$('select').niceSelect()

	// Фокус при клике на название поля
	$('body').on('click', '.form .label', function() {
    	$(this).closest('.line').find('.input, textarea').focus()
	})


	// Fancybox
	$.fancybox.defaults.hash = false
	$.fancybox.defaults.backFocus = false
	$.fancybox.defaults.autoFocus = false
	$.fancybox.defaults.animationEffect = 'zoom'
	$.fancybox.defaults.transitionEffect = 'slide'
	$.fancybox.defaults.speed = 500
	$.fancybox.defaults.gutter = 40
	$.fancybox.defaults.i18n = {
		'en' : {
			CLOSE: "Закрыть",
			NEXT: "Следующий",
			PREV: "Предыдущий",
			ERROR: "Запрошенный контент не может быть загружен.<br /> Пожалуйста, повторите попытку позже.",
			PLAY_START: "Запустить слайдшоу",
			PLAY_STOP: "Остановить слайдшоу",
			FULL_SCREEN: "На весь экран",
			THUMBS: "Миниатюры",
			DOWNLOAD: "Скачать",
			SHARE: "Поделиться",
			ZOOM: "Увеличить"
		}
	}

	// Всплывающие окна
	$('body').on('click', '.modal_link', function(e) {
		e.preventDefault()

		$.fancybox.close(true)

		$.fancybox.open({
			src   : $(this).data('content'),
			type  : 'inline',
      		touch : false
		})
	})

	// Увеличение картинки
	$('.fancy_img').fancybox({
		mobile:{
			clickSlide: "close"
		}
	})


	// Изменение количества товара
	$('body').on('click', '.amount .minus', function(e) {
	    e.preventDefault()

	    let parent = $(this).closest('.amount')
	    let input = parent.find('.input')
	    let inputVal = parseFloat( input.val() )
	    let minimum = parseFloat( input.data('minimum') )
	    let step = parseFloat( input.data('step') )
	    let unit = input.data('unit')

	    if( inputVal > minimum ){
	    	input.val( inputVal-step+unit )
	    }

	    if( $(this).hasClass('update_price') ){
	    	updateCartPrice( $(this).closest('.product') )
	    }
	})

	$('body').on('click', '.amount .plus', function(e) {
	    e.preventDefault()

	    let parent = $(this).closest('.amount')
	    let input = parent.find('.input')
	    let inputVal = parseFloat( input.val() )
	    let maximum = parseFloat( input.data('maximum') )
	    let step = parseFloat( input.data('step') )
	    let unit = input.data('unit')

	    if( inputVal < maximum ){
	    	input.val( inputVal+step+unit )
	    }

	    if( $(this).hasClass('update_price') ){
	    	updateCartPrice( $(this).closest('.product') )
	    }
	})

	$('.amount .input').keydown(function() {
		let _self = $(this)

		setTimeout(function(){
			if(_self.val() == '' || _self.val() == 0){
				_self.val( parseInt(_self.data('minimum')) )
			}

		    if( _self.hasClass('update_price') ){
		    	updateCartPrice( _self.closest('.product') )
		    }
		}, 10)
	})


	// Аккордион
	$('body').on('click', '.accordion .item .title', function(e) {
		e.preventDefault()

		let parent = $(this).closest('.item')
		let accordion = $(this).closest('.accordion')

		if( parent.hasClass('active') ) {
			parent.removeClass('active')
			parent.find('.data').slideUp(300)
		} else {
			accordion.find('.item').removeClass('active')
			accordion.find('.data').slideUp(300)

			parent.addClass('active')
			parent.find('.data').slideDown(300)
		}
	})


	// Моб. версия
	if ($(window).width() < 360) $('meta[name=viewport]').attr('content', 'width=360, user-scalable=no')




	// Моб. меню
	$('body').on('click', '.mob_header .mob_menu_link', function(e) {
    	e.preventDefault()

		$(this).addClass('active')
		$('body').addClass('lock')
		$('header').addClass('show')
		$('.overlay').fadeIn(300)
    })

	$('body').on('click', 'header .close, .overlay', function(e) {
    	e.preventDefault()

    	$('.mob_header .mob_menu_link').removeClass('active')
		$('body').removeClass('lock')
		$('header').removeClass('show')
		$('.overlay').fadeOut(300)
    })


    if( is_touch_device() ){
    	$('header .menu .item > a.sub_link').addClass('touch_link')

    	$('body').on('click', 'header .flexMenu-popup > .item > a.sub_link', function(e) {
    		if( $(this).next().css('visibility') == 'hidden' ) {
	    		e.preventDefault()

				$('header .menu .sub_menu').removeClass('show')

				$(this).next().addClass('show')

    		}
    		else
    		{
    			e.preventDefault()
				$('header .menu .sub_menu').removeClass('show')
    		}
	    })

	    $('body').on('click', 'header .menu .item .item > a.sub_link', function(e) {

    		if(!$(this).next().hasClass("show")) {
	    		e.preventDefault()

				$('header .menu .item .item .sub_menu').removeClass('show')

				$(this).next().addClass('show')			

    		}
    		else
    		{
    			e.preventDefault()
				$('header .menu .item .item .sub_menu').removeClass('show')
    		}
	    })
    }
})



$(window).scroll(function(){
	// Кнопка 'Вверх'
	if( $(window).scrollTop() > $(window).innerHeight() ) {
		$('.buttonUp').fadeIn(300)
	} else {
		$('.buttonUp').fadeOut(200)
	}
})



// Вспомогательные функции
function updateCartPrice(context){
	if( context ){
		let price = parseInt(context.find('.price:not(.total)').data('price'))
		let amount = parseInt(context.find('.amount .input').val())
		let totalPrice = price*amount

		context.find('.price.total span').text( totalPrice )
	}

	let totalCartPrice = 0

	$('.cart_info .product .price.total span').each(function(){
		totalCartPrice = (totalCartPrice + parseInt( $(this).text() ))
	})

	$('.cart_info .cart_total .val span').text( totalCartPrice )
}


function setHeight(className){
    let maxheight = 0

    className.each(function() {
    	let elHeight = $(this).outerHeight()

        if( elHeight > maxheight ) {
        	maxheight = elHeight
        }
    })

    className.outerHeight( maxheight )
}


function is_touch_device() {
	return !!('ontouchstart' in window)
}


function widthScroll() {
    let div = document.createElement('div')
    div.style.overflowY = 'scroll'
    div.style.width = '50px'
    div.style.height = '50px'
    div.style.visibility = 'hidden'
    document.body.appendChild(div)

    let scrollWidth = div.offsetWidth - div.clientWidth
    document.body.removeChild(div)

    return scrollWidth
}


var supportsCssVars = function() {
    var s = document.createElement('style'),
        support

    s.innerHTML = ":root { --tmp-var: bold; }"
    document.head.appendChild(s)
    support = !!(window.CSS && window.CSS.supports && window.CSS.supports('font-weight', 'var(--tmp-var)'))
    s.parentNode.removeChild(s)

    return support
}



$(window).resize(() => {
	// Моб. версия
	$('meta[name=viewport]').attr('content', 'width=device-width, initial-scale=1, maximum-scale=1')

	if ($(window).width() < 360) $('meta[name=viewport]').attr('content', 'width=360, user-scalable=no')
})