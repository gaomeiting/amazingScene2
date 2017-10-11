$(document).on("touchmove",function(ev){
	ev.preventDefault();
})
$(function(){
	showLoading()
	slideCanvas();
	slidePage()
	function sky() {
		var text1=$("#sky>img").eq(0);
		var text2=$("#sky>img").eq(1);
		text1.css("animation","1.2s infinite flash linear");
		text1.on("webkitAnimationIteration animationIteration",function(ev){
			console.log(ev.originalEvent.elapsedTime)
			if(ev.originalEvent.elapsedTime>=3){
				$(this).hide();
				text2.fadeIn().css("animation","1.2s infinite flash linear");
				$("#sky").on("touchstart",function(){
					$(this).remove()
					$("#c1").trigger("touchstart")
				})
			}
		})
	}
	function slideCanvas (){
		$c=$("#c1");
		$gc=$c.get(0).getContext('2d');
		$c.attr('width',$(window).width());
		$c.attr('height',$(window).height());
		var timer=null;
		var iNow=0;
		var img=new Image();
		var imgTouch=new Image();
		imgTouch.onload=function(){
			$gc.drawImage(img,0,0,img.width,img.height,0,0,$c.get(0).width,$c.get(0).height)
			$gc.globalCompositeOperation = 'destination-out';
			$c.on('touchstart',function(){
				timer=setInterval(function(){
					var i=iNow%4;
					var j=Math.floor(iNow/4);
					$gc.drawImage(imgTouch,Math.ceil(imgTouch.width/4)*i,Math.ceil(imgTouch.height/5)*j,Math.ceil(imgTouch.width/4),Math.ceil(imgTouch.height/5),0,0,$c.get(0).width,$c.get(0).height)

					iNow++;
					if(iNow == 19){
						clearInterval(timer);
						$c.remove();
						cjAnimate.inAn(0);
					}
				},100)
				showMusic();
			})
			
		}
		img.src='images/a.jpg';
		imgTouch.src='images/Touch4.png';
	}
	function slidePage(){
		var $li=$("li");
		var nowIndex=0;
		var nextorprevIndex=0;
		var bBtn = true;
		$li.hide().eq(0).show();
		$li.on("touchstart",function(ev){
			if(bBtn){
				bBtn = false;
				var touch = ev.originalEvent.changedTouches[0];
				startY = touch.pageY;
				nowIndex = $(this).index();
				$li.on('touchend',function(ev){
					var touch = ev.originalEvent.changedTouches[0];
					if( touch.pageY < startY ){  //↑
					
						nextorprevIndex = nowIndex == $li.length-1 ? 0 : nowIndex + 1;
					
						$(this).css('transform','rotateX(90deg)');
						$(this).css('opacity',0);
						$(this).css('transition','1s');
						
						$li.eq(nextorprevIndex).css('transform','rotateX(-50deg)');
						$li.eq(nextorprevIndex).css('opacity',0).show();
						
						setTimeout(function(){
							$li.eq(nextorprevIndex).css('transform','rotateX(0deg)');
							$li.eq(nextorprevIndex).css('opacity',1);
							$li.eq(nextorprevIndex).css('transition','1s');
						},100);
						
					}
					else if( touch.pageY > startY ){ //↓
						
						nextorprevIndex = nowIndex == 0 ? $li.length-1 : nowIndex - 1;
					
						$(this).css('transform','rotateX(-50deg)');
						$(this).css('opacity',0);
						$(this).css('transition','1s');
						
						$li.eq(nextorprevIndex).css('transform','rotateX(90deg)');
						$li.eq(nextorprevIndex).css('opacity',0).show();
						
						setTimeout(function(){
							$li.eq(nextorprevIndex).css('transform','rotateX(0deg)');
							$li.eq(nextorprevIndex).css('opacity',1);
							$li.eq(nextorprevIndex).css('transition','1s');
						},100);
						
					}
					else{
						bBtn = true;
					}
					$("#index").html('<span class="arrow"></span>'+(nextorprevIndex+1)+"/"+$li.length)
					$li.off('touchend');
				});
			}
		})
		$li.on('webkitTransitionEnd transitionEnd',function(ev){
			if(!$li.is(ev.target)){
				return;
			}
			resetFn();
			if(cjAnimate.inAn){
				cjAnimate.inAn(nextorprevIndex);
			}
			if(cjAnimate.outAn){
				cjAnimate.outAn(nowIndex);
			}
		})
		function resetFn(){
			$li.css('transform','');
			$li.css('transition','');
			$li.eq(nextorprevIndex).siblings().hide();
			bBtn=true;
		}

	}
	var cjAnimate={
		inAn : function(index){
			var $img=$("li").eq(index).find("img");
			setTimeout(function(){
				$img.eq(1).css('transform','scale(1)');
				$img.eq(1).css('transition','1s');
				$img.eq(2).css('transform','translate(0,0)');
				$img.eq(2).css('opacity',1);
				$img.eq(2).css('transition','1s 0.2s');
				$img.eq(2).on('transitionEnd webkitTransitionEnd',function(){
					$img.eq(0).addClass("blow")
				})
			},100)
		},
		outAn : function(index){
			var $img=$("li").eq(index).find("img");
			$img.eq(1).css('transform','scale(1.4)');
			$img.eq(2).css('transform','translate(0,3rem)');
			$img.eq(2).css('opacity',0);
			$img.eq(1).css('transition','');
			$img.eq(2).css('transition','');
			$img.eq(0).removeClass("blow")
			
		}
	};
	
	$("li").each(function(i){
		cjAnimate.outAn(i);
	});

	function showMusic(){
		$music=$("#music");
		$a1=$("#a1");
		var bBtn=false;
		$music.on('touchstart',function(){
			
			if(!bBtn){
				$(this).addClass('active');
				$a1.get(0).play();
			}
			else{
				$(this).removeClass('active');
				$a1.get(0).pause();
			}
			bBtn=!bBtn;
		})
		$music.trigger('touchstart');
	}
	function showLoading(){
		var arr=['a.jpg', 'img3.jpg', 'img4.jpg', 'img5.jpg', 'img6.jpg', 'img7.jpg', 'img8.jpg', 'img9.jpg', 'img10.jpg', 'text4.jpg', 'text5.jpg', 'text6.jpg', 'text7.jpg', 'text8.jpg', 'text9.jpg', 'text10.jpg']
		var iNow=0;
		$.each(arr,function(i,imgSrc){
			var objImg=new Image();
			objImg.onload=function(){
				iNow++;
				if(iNow==arr.length){
					$("#loading").animate({'opacity':0},function(){
						$("#loading").remove();
						sky();
					})
				}
				
			}
			objImg.onerror=function(){
				$("#loading").animate({'opacity':0}, function(){
					$("#loading").remove();
					sky();
				})
			}
			objImg.src="images/"+imgSrc;
		})
	}

})