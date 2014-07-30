$(function(){
	//utils 
	function random(n,m){
		return parseInt(Math.random()*(m-n)+n);
	}
	function distinct(arr){
		var ret = [];
		var	tmp = {};
		for (var i = 0; i < arr.length; i++) {
			var item = arr[i];
			var key = typeof(item) + item;
			if(tmp[key] !==1 ){
				ret.push(item)
				tmp[key]=1
			}
		};
		return ret;
	}
	function addCSSRule(sheet, selector, rules, index) {
		if(sheet.insertRule) {
			sheet.insertRule(selector + "{" + rules + "}", index);
			console.log(1)
		}
		else {
			sheet.addRule(selector, rules, index);
		}
	}
	window.kn_anim = {};
	//page size
	function modSize(){
		$('.main,body').css({
			'width': $(window).outerWidth(),
			'height': $(window).outerHeight()
		})
	}
	modSize()
	$(window).resize(modSize)

	//mouseover shake
	;(function(){
		$('.item-mod').on('mouseenter',function(){
			$(this).removeClass('fadeIn').addClass('normal');
			if(!$(this).hasClass('shake')){
				$(this).addClass('shake');
			}
		})
		$('.item-mod').on('mouseleave',function(){
			$(this).removeClass('shake')
		})
	})();
	//random fadein
	;(function(){
		var rdmArr = [],
			rdmLength = 5; //random max value
		while(rdmArr.length<rdmLength-1){
			rdmArr.push(random(1,rdmLength));
			rdmArr = distinct(rdmArr);
		}
		rdmArr.unshift(0)
		function fadeIn(){
			$('.bezel').removeClass('hidden');
			$('.item-mod').each(function(index){
				var _this = $(this);
				var delay = (index==0)?0:rdmArr[index%rdmLength]*1000+500;
				setTimeout(function(){
					_this.addClass('fadeIn')
				},delay)
			});
			setTimeout(function(){
				$('.bezel').addClass('hidden');
			},Math.max.apply(null,rdmArr)*1000+500+2000)
		};
		window['kn_anim']['fadeIn'] = fadeIn;
	})();
	//step
	;(function(){
		var h_timer = null;
		$('.heading .arrow-down i').on('click',function(){
			clearTimeout(h_timer);
			if($(this).hasClass('icon-double-angle-up')){
				$(this).removeClass('icon-double-angle-up');
				$(this).addClass('icon-double-angle-down');
				$('.heading').css({'top':'100px'});
				h_timer = setTimeout(function(){
					$('.member').addClass('member-show')
				}, 1000)
				increase(1)
			} else {
				$(this).addClass('icon-double-angle-up');
				$(this).removeClass('icon-double-angle-down');
				$('.heading').css({'top':'40%'});
				$('.member').removeClass('member-show')
			}
		})
		var m_timer = null;
		$('.member .arrow-right i').on('click',function(){
			$('.content').addClass('step-2');
			window.location.hash = '#list1';
			increase(2);
			clearTimeout(m_timer);
			m_timer = setTimeout(function(){
				$('#list1').removeClass('hidden');
				window.kn_anim.fadeIn();
			},1000)
		})
	})();
	function increase(i){
		$('.step-view').children('.step-item').eq(i).children('span').addClass('increase')
	};
	;(function(){
		var z_timer = null;
		$('.item-mod').on('click',function(){
			var _this = $(this);
			$('.item-mod').addClass('fall');
			$(this).removeClass('fall').addClass('fadeOut-this');
			clearTimeout(z_timer);
			z_timer = setTimeout(function(){
				$('.item-view').addClass('zoom-show');
				_this.parent().addClass('hidden');
			}, 2000)
		});
		$('.item-view').css({'margin-top':-($('.item-view').height()/2)+'px'});
		//create a style sheet
		var sheet = (function() {
			var style = document.createElement("style");
			style.appendChild(document.createTextNode(""));
			document.head.appendChild(style);
			style.type = "text/css";
			style.title = "kn-self";
			return style.sheet;
		})();
		function transform_pic(ele,i){
			var parentWidth = ele.offsetParent().width();
			var value = parseInt((parentWidth*0.3333*i)+(parentWidth*0.3333-ele.width())/2);
			var rule = 'left: '+value+'px;top: 50px;z-index: 10';
			//ele.css({'left':(parentWidth*0.3333*i)+(parentWidth*0.3333-ele.width())/2+'px','top':'50px','z-index':'10'})
			if(!ele.hasClass('float-img-'+i+'-transform')) {
				addCSSRule(sheet,'.float-img-'+i+'-transform',rule);
				ele.addClass('float-img-'+i+'-transform');
			} else {
				ele.removeClass('float-img-'+i+'-transform')
			}
		}
		var t_timer = null;
		$('.transform').on('click',function(event){
			event.stopPropagation();
			var _this = $(this);
			clearTimeout(t_timer);
			if(!$(this).hasClass('rotate-icon')){
				$(this).removeClass('rotate-icon-0').addClass('rotate-icon');
			} else {
				$(this).removeClass('rotate-icon').addClass('rotate-icon-2');
				t_timer = setTimeout(function(){
					_this.removeClass('rotate-icon-2').addClass('rotate-icon-0')
				}, 1000)
			}
			$('.float-img').each(function(i){
				$(this).toggleClass('mid-zoom')
				transform_pic($(this),i)
			});
			$('.item-view .desc').toggleClass('desc-fadeIn');
			$('.float-img').each(function(i){
				$(this).on('mouseover',function(){
					if(!$(this).hasClass('mid-zoom')) return false;
					$('.column-3').children('div').eq(i).addClass('col-show');
				})
				$(this).on('mouseout',function(){
					if(!$(this).hasClass('mid-zoom')) return false;
					$('.column-3').children('div').eq(i).removeClass('col-show');
				})
			})
		})
		var s_timer = null;
		$('.return').on('click',function(){
			$('.item-view').addClass('slide-out');
			clearTimeout(s_timer);
			setTimeout(function(){
				$('.item-view').removeClass('zoom-show').removeClass('slide-out');
			}, 1000)
		})
	})();
	;(function(){
		var s_timer = null;
		var b_timer = null;
		$('.list-show').on('click',function(event){
			event.stopPropagation();
			var ele = (window.location.hash == '#list1')?$('#list1'):$('#list2');
			if(!ele.hasClass('hidden')) return false;
			ele.addClass('hidden');
			$('.item-mod').removeClass('fall normal shake fadeIn fadeOut-this').addClass('fadeIn');
			ele.removeClass('hidden');
			$('.item-view').addClass('slide-out');
			clearTimeout(s_timer);
			setTimeout(function(){
				$('.item-view').removeClass('zoom-show').removeClass('slide-out');
			}, 1000);
			$('.bezel').removeClass('hidden');
			clearTimeout(b_timer);
			b_timer = setTimeout(function(){
				$('.bezel').addClass('hidden');
			}, 3000)
		})
	})();
	;(function(){
		var in_timer = null;
		var out_timer = null;
		var t_timer = null;
		$('.list-next').on('click',function(){
			var _this = $(this);
			$('.star-bg').toggleClass('tabs-bg');
			if(window.location.hash=='#list1') {
				$('#list1').addClass('get-out');
				$('#list2').find('.item-mod').removeClass('fall normal shake fadeIn fadeOut-this').addClass('fadeIn');
				$('#list2').removeClass('hidden');
				clearTimeout(in_timer);
				timer = setTimeout(function(){
					$('#list2').removeClass('get-out');
					window.location.hash = '#list2';
				}, 1000)
			} else {
				$('#list2').addClass('get-out');
				$('#list1').find('.item-mod').removeClass('fall normal shake fadeIn fadeOut-this').addClass('fadeIn');
				$('#list1').removeClass('hidden');
				clearTimeout(out_timer);
				timer = setTimeout(function(){
					$('#list1').removeClass('get-out');
					window.location.hash = '#list1';
				}, 1000)
			}
			clearTimeout(t_timer);
			var icon = _this.children('div');
			if(!icon.hasClass('rotate-icon')){
				icon.removeClass('rotate-icon-0').addClass('rotate-icon');
			} else {
				icon.removeClass('rotate-icon').addClass('rotate-icon-2');
				t_timer = setTimeout(function(){
					icon.removeClass('rotate-icon-2').addClass('rotate-icon-0')
				}, 1000)
			}
		})
	})();
	//load
	;(function(){
		$(window).on('load',function(){
			increase(0)
		});
		//调试
		// $('.content').addClass('hidden');
		// $('.item-view').show()
	})();
})