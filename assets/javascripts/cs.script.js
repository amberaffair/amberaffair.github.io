"use strict";
var firstrun = true,
    touch = false,
    clickEv = 'click';


var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

var switchImage = function(newImageSrc, newImage, mainImageDomEl) {
  
  jQuery(mainImageDomEl).attr('src', newImageSrc);
  $(mainImageDomEl).parents('a').attr('href', newImageSrc);

  
};

/* Fucntion get width browser */
function getWidthBrowser() {
	var myWidth;

	if( typeof( window.innerWidth ) == 'number' ) { 
		//Non-IE 
		myWidth = window.innerWidth;
		//myHeight = window.innerHeight; 
	} 
	else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) { 
		//IE 6+ in 'standards compliant mode' 
		myWidth = document.documentElement.clientWidth; 
		//myHeight = document.documentElement.clientHeight; 
	} 
	else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) { 
		//IE 4 compatible 
		myWidth = document.body.clientWidth; 
		//myHeight = document.body.clientHeight; 
	}
	
	return myWidth;
}

/* Function: Refresh Zoom */
function alwaysUpdateZoom(){
  if(touch == false){
    
    if($('.elevatezoom').length){
      
      var zoomImage = $('.elevatezoom .img-zoom');

      zoomImage.elevateZoom({
        gallery:'gallery_main', 
        galleryActiveClass: 'active', 
        zoomType: 'window',
        cursor: 'pointer',
        zoomWindowFadeIn: 300,
        zoomWindowFadeOut: 300,
        scrollZoom: true,
        easing : true
      });
      
      
        /*//pass the images to Fancybox
        $(".elevatezoom .img-zoom").bind("click", function(e) {  
          var ez =   $('.elevatezoom .img-zoom').data('elevateZoom');	
          $.fancybox(ez.getGalleryList(),{
            closeBtn  : false,
            helpers : {
              buttons	: {}
            }
          });
          return false;
        });*/
      
    }
    
  }
       // is touch
       else{
         
       }
}

// handle Animate
function handleAnimate(){
  if(touch == false){
    $('[data-animate]').each(function(){
      
      var $toAnimateElement = $(this);
      
      var toAnimateDelay = $(this).attr('data-delay');
      
      var toAnimateDelayTime = 0;
      
      if( toAnimateDelay ) { toAnimateDelayTime = Number( toAnimateDelay ); } else { toAnimateDelayTime = 200; }
      
      if( !$toAnimateElement.hasClass('animated') ) {
        
        $toAnimateElement.addClass('not-animated');
        
        var elementAnimation = $toAnimateElement.attr('data-animate');
        
        $toAnimateElement.appear(function () {
          
          setTimeout(function() {
            $toAnimateElement.removeClass('not-animated').addClass( elementAnimation + ' animated');
          }, toAnimateDelayTime);
          
        },{accX: 0, accY: -100},'easeInCubic');
        
      }
    });
  }
}

/* Handle Carousel */
function handleCarousel(){

  /* Handle main slideshow */
  if($('#home-slider').length){
    //var k = (0.6*$(window).innerWidth())+'px';
      var k = '66%';
    $('#home-slider').camera({
        height: k,
        time:2000,
        pagination: false,
        thumbnails: false,
        autoAdvance: true,
        playPause: false,
        fx: 'mosaicRandom'
    });
    // if($(window).innerWidth>=1200)
      //   k = $(window).innerHeight()+'px';
      // else
      //   if($(window).innerWidth>=768)
      //     k = "50%";
      //   else
      //     k = "30%";
      //   $('#home-slider').camera({
      //     height: k,
      // 	time:2000,
      // 	pagination: false,
      //     thumbnails: false,
      //     autoAdvance: true,
      //     playPause: false,
      // 	fx: 'mosaicRandom'
      //   });
  }
}

/* Handle detect platform */
function handleDetectPlatform(){
  /* DETECT PLATFORM */
  $.support.touch = 'ontouchend' in document;
  
  if ($.support.touch) {
    touch = true;
    $('body').addClass('touch');
    clickEv = 'touchstart';
  }
  else{
    $('body').addClass('notouch');
    if (navigator.appVersion.indexOf("Mac")!=-1){
      if (navigator.userAgent.indexOf("Safari") > -1){
        $('body').addClass('macos');
      }
      else if (navigator.userAgent.indexOf("Chrome") > -1){
        $('body').addClass('macos-chrome');
      }
        else if (navigator.userAgent.indexOf("Mozilla") > -1){
          $('body').addClass('macos-mozilla');
        }
    }
  }
}


/* Handle sidebar */
function handleSidebar(){
  /* Add class first, last in sidebar */
  if($('.sidebar').length){
    $('.sidebar').children('.row-fluid').first().addClass('first');
    $('.sidebar').children('.row-fluid').last().addClass('last');
  }
}


/* Handle when window resize */
$(window).resize(function() {
  
  
  /* reset menu with condition */
  if(touch == true || getWidthBrowser() < 1024){
    if($('#top').hasClass('on')){
      $('#top').prev().remove();
      $('#top').removeClass('on').removeClass('animated');
    }
    
    $('#goGrid').trigger('click');
  }
});

function top_other(){
  $.cookie('topother', 'true', { expires: 1});
  $('.top-other').hide();
}

/* handle when window loaded */
// $(window).load(function() {
//   if(touch == false){
//     skrollr.init();
//   }
//
// });

jQuery(document).ready(function($) {
	 
  /* Cokkies Popup */
  // if ($.cookie('mycookie')) {
  //   // it hasn't been one days yet
  // } else {
  //   $.fancybox(
  //     $('.newsletter-popup'),
  //     {
  //       'autoDimensions'    : false,
  //       'width'             : 870,
  //       'height'            : 410,
  //       'autoSize' : false,
  //       'transitionIn'      : 'none',
  //       'transitionOut'     : 'none',
  //       afterLoad: function(){
  //         setTimeout( function() {$.fancybox.close(); },500000);
  //       }
  //     }
  //   );
  // }
  $.cookie('mycookie', 'true', { expires: 1});
       
  if ($.cookie('topother')) {}
  else{  $('.top-other').show(); }

     
  /* SwitchImage */
  $('#product .thumbs a').on('click', function(e) {
    var $this = $(this);
    var parent = $this.parents('.product-image');
    e.preventDefault();
    parent.find('.cloud-zoom-gallery').removeClass('active');
    $this.addClass('active');
    switchImage($(this).attr('href'), null, $('.featured img')[0]);
  });
  
  /* DETECT PLATFORM */
  handleDetectPlatform();

  /* Handle Animate */
  handleAnimate();
  
  /* Handle Carousel */
  handleCarousel();
  
  /* Handle sidebar */
  handleSidebar();
  
  /* Handle zoom for product image */
  alwaysUpdateZoom();
  
  /* Handle product thumbs */
  if(touch){
    updateScrollThumbs();
  }
  else{
    
  }
     
  $('.dropdown-menu').on(clickEv, function (e) {
    e.stopPropagation();
  });
  $('.dropdown-menu').on('click', function (e) {
    e.stopPropagation();
  });
  $('.btn-navbar').on('click', function() {
    return true;
  });
   
  
});