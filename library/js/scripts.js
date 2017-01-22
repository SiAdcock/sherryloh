/*
 * Bones Scripts File
 * Author: Eddie Machado
 *
 * This file should contain any js scripts you want to add to the site.
 * Instead of calling it in the header or throwing it inside wp_head()
 * this file will be called automatically in the footer so as not to
 * slow the page load.
 *
 * There are a lot of example functions and tools in here. If you don't
 * need any of it, just remove it. They are meant to be helpers and are
 * not required. It's your world baby, you can do whatever you want.
*/


/*
 * Get Viewport Dimensions
 * returns object with viewport dimensions to match css in width and height properties
 * ( source: http://andylangton.co.uk/blog/development/get-viewport-size-width-and-height-javascript )
*/
function updateViewportDimensions() {
	var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],x=w.innerWidth||e.clientWidth||g.clientWidth,y=w.innerHeight||e.clientHeight||g.clientHeight;
	return { width:x,height:y }
}
// setting the viewport width
var viewport = updateViewportDimensions();


/*
 * Throttle Resize-triggered Events
 * Wrap your actions in this function to throttle the frequency of firing them off, for better performance, esp. on mobile.
 * ( source: http://stackoverflow.com/questions/2854407/javascript-jquery-window-resize-how-to-fire-after-the-resize-is-completed )
*/
var waitForFinalEvent = (function () {
	var timers = {};
	return function (callback, ms, uniqueId) {
		if (!uniqueId) { uniqueId = "Don't call this twice without a uniqueId"; }
		if (timers[uniqueId]) { clearTimeout (timers[uniqueId]); }
		timers[uniqueId] = setTimeout(callback, ms);
	};
})();

// how long to wait before deciding the resize has stopped, in ms. Around 50-100 should work ok.
var timeToWaitForLast = 100;


/*
 * Here's an example so you can see how we're using the above function
 *
 * This is commented out so it won't work, but you can copy it and
 * remove the comments.
 *
 *
 *
 * If we want to only do it on a certain page, we can setup checks so we do it
 * as efficient as possible.
 *
 * if( typeof is_home === "undefined" ) var is_home = $('body').hasClass('home');
 *
 * This once checks to see if you're on the home page based on the body class
 * We can then use that check to perform actions on the home page only
 *
 * When the window is resized, we perform this function
 * $(window).resize(function () {
 *
 *    // if we're on the home page, we wait the set amount (in function above) then fire the function
 *    if( is_home ) { waitForFinalEvent( function() {
 *
 *      // if we're above or equal to 768 fire this off
 *      if( viewport.width >= 768 ) {
 *        console.log('On home page and window sized to 768 width or more.');
 *      } else {
 *        // otherwise, let's do this instead
 *        console.log('Not on home page, or window sized to less than 768.');
 *      }
 *
 *    }, timeToWaitForLast, "your-function-identifier-string"); }
 * });
 *
 * Pretty cool huh? You can create functions like this to conditionally load
 * content and other stuff dependent on the viewport.
 * Remember that mobile devices and javascript aren't the best of friends.
 * Keep it light and always make sure the larger viewports are doing the heavy lifting.
 *
*/

/*
 * We're going to swap out the gravatars.
 * In the functions.php file, you can see we're not loading the gravatar
 * images on mobile to save bandwidth. Once we hit an acceptable viewport
 * then we can swap out those images since they are located in a data attribute.
*/
function loadGravatars() {
  // set the viewport using the function above
  viewport = updateViewportDimensions();
  // if the viewport is tablet or larger, we load in the gravatars
  if (viewport.width >= 768) {
  jQuery('.comment img[data-gravatar]').each(function(){
    jQuery(this).attr('src',$(this).attr('data-gravatar'));
  });
	}
} // end function

/*
 * Put all your regular jQuery in here.
*/
jQuery(document).ready(function($) {

  /*
   * Let's fire off the gravatar function
   * You can remove this if you don't need it
  */
  loadGravatars();

  bindEvents();

  if ($('#carousel').length) {
    configureCarousel();
  }




  function bindEvents() {
    $('#btn-book-lesson').click(function () {
      document.location.href='contact/';
    });

    $('#btn-find-out-more').click(function () {
      document.location.href='alexander-technique/';
    });

    //location link click
    $('.location-link').click(function (e) {
      var scroll = '#' + $(this).data('scroll');
      scrollTo(scroll, e);
    });
  }



  function configureCarousel() {
    // Using custom configuration
    $('#carousel').carouFredSel({
      items: {
        visible: 1
      },
      circular: false,
      infinite: false,
      scroll: {
        fx: 'fade',
        duration: 5000,
        timeoutDuration: 5000
      }
    });
  }



  function scrollTo(spot, e) {
      e.preventDefault();
      $.scrollTo($(spot + '-scroll-to'), 800);
  };


  function initMap(options, content, id) {
      var map = new google.maps.Map(document.getElementById(id), options),
          marker = new google.maps.Marker({map: map, position: options.center}),
          infowindow = new google.maps.InfoWindow({content: content});

      google.maps.event.addListener(marker, 'click', function () {
          infowindow.open(map,marker);
      });

      infowindow.open(map,marker);
  }

  //Do map stuff
  if ($('#harley-st-map').length || $('#london-bridge-map').length || $('#kemp-town-map').length) {
    if (window.google) {
      google.maps.event.addDomListener(window, 'load', function () {
          var harleyStreet = {
                  zoom: 17,
                  center: new google.maps.LatLng(51.5199653,-0.14743499999997312),
                  mapTypeId: google.maps.MapTypeId.ROADMAP
              },
              koopsMillMews = {
                  zoom: 17,
                  center: new google.maps.LatLng(51.49798793353077,-0.07201585465356065),
                  mapTypeId: google.maps.MapTypeId.ROADMAP
              },
              kempTown = {
                  zoom: 17,
                  center: new google.maps.LatLng(50.8159945,-0.11008540000000266),
                  mapTypeId: google.maps.MapTypeId.ROADMAP
              };
          initMap(harleyStreet, 'Harley Street<br/>London', 'harley-st-map');
          initMap(koopsMillMews, 'Koops Mill Mews<br/>London', 'london-bridge-map');
          initMap(kempTown, 'Lewes Crescent<br/>Brighton', 'kemp-town-map');
      });
    }
  }
}); /* end of as page load scripts */
