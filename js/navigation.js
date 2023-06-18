/**
 * File navigation.js.
 *
 * Handles toggling the navigation menu for small screens and enables TAB key
 * navigation support for dropdown menus.
 */
( function() {
	const siteNavigation = document.getElementById( 'site-navigation' );

	// Return early if the navigation doesn't exist.
	if ( ! siteNavigation ) {
		return;
	}

	const button = siteNavigation.getElementsByTagName( 'button' )[ 0 ];

	// Return early if the button doesn't exist.
	if ( 'undefined' === typeof button ) {
		return;
	}

	const menu = siteNavigation.getElementsByTagName( 'ul' )[ 0 ];

	// Hide menu toggle button if menu is empty and return early.
	if ( 'undefined' === typeof menu ) {
		button.style.display = 'none';
		return;
	}

	if ( ! menu.classList.contains( 'nav-menu' ) ) {
		menu.classList.add( 'nav-menu' );
	}

	// Toggle the .toggled class and the aria-expanded value each time the button is clicked.
	button.addEventListener( 'click', function() {
		siteNavigation.classList.toggle( 'toggled' );

		if ( button.getAttribute( 'aria-expanded' ) === 'true' ) {
			button.setAttribute( 'aria-expanded', 'false' );
		} else {
			button.setAttribute( 'aria-expanded', 'true' );
		}
	} );

	// Remove the .toggled class and set aria-expanded to false when the user clicks outside the navigation.
	document.addEventListener( 'click', function( event ) {
		const isClickInside = siteNavigation.contains( event.target );

		if ( ! isClickInside ) {
			siteNavigation.classList.remove( 'toggled' );
			button.setAttribute( 'aria-expanded', 'false' );
		}
	} );

	// Get all the link elements within the menu.
	const links = menu.getElementsByTagName( 'a' );

	// Get all the link elements with children within the menu.
	const linksWithChildren = menu.querySelectorAll( '.menu-item-has-children > a, .page_item_has_children > a' );

	// Toggle focus each time a menu link is focused or blurred.
	for ( const link of links ) {
		link.addEventListener( 'focus', toggleFocus, true );
		link.addEventListener( 'blur', toggleFocus, true );
	}

	// Toggle focus each time a menu link with children receive a touch event.
	for ( const link of linksWithChildren ) {
		link.addEventListener( 'touchstart', toggleFocus, false );
	}

	/**
	 * Sets or removes .focus class on an element.
	 */
	function toggleFocus() {
		if ( event.type === 'focus' || event.type === 'blur' ) {
			let self = this;
			// Move up through the ancestors of the current link until we hit .nav-menu.
			while ( ! self.classList.contains( 'nav-menu' ) ) {
				// On li elements toggle the class .focus.
				if ( 'li' === self.tagName.toLowerCase() ) {
					self.classList.toggle( 'focus' );
				}
				self = self.parentNode;
			}
		}

		if ( event.type === 'touchstart' ) {
			const menuItem = this.parentNode;
			event.preventDefault();
			for ( const link of menuItem.parentNode.children ) {
				if ( menuItem !== link ) {
					link.classList.remove( 'focus' );
				}
			}
			menuItem.classList.toggle( 'focus' );
		}
	}


/**************************
 * ----Projektets koder 
 * *************************/

// To get shadow under navbar and change textcolor if on home screen when scrolling down
const navbar = document.querySelector('.site-header');
const navitems = document.querySelectorAll('.nav-menu>li>a');
/*Listen for when the scroll is more than 0, if so add a navbar-shadow-class*/
/* Check if the current page is the front page nad mobile size and add the "text-color" class */
if (document.body.classList.contains('home') && window.innerWidth > 37.5 * parseFloat(getComputedStyle(document.documentElement).fontSize)) {
	navitems.forEach(function(navitem) {
	  navitem.classList.add('text-white');
	});
  }

window.addEventListener('scroll', function() {
  if (window.scrollY > 0) {
    navbar.classList.add('navbar-shadow');
	//check if screen is phone size
	if (document.body.classList.contains('home') && window.innerWidth > 37.5 * parseFloat(getComputedStyle(document.documentElement).fontSize)) {
	navitems.forEach(function(navitem) {
		navitem.classList.add('text-color');
		navitem.classList.remove('text-white');
	  });
	}
  } else {
    navbar.classList.remove('navbar-shadow');
	//check if screen is phone size
	if (document.body.classList.contains('home') && window.innerWidth > 37.5 * parseFloat(getComputedStyle(document.documentElement).fontSize)) {
		navitems.forEach(function(navitem) {
			navitem.classList.remove('text-color');
			navitem.classList.add('text-white');

		  });
		}
  }
});



// Add the "current-menu-item" class to the appropriate menu item to display active site
function CurrentMenuItem() {
	var currentUrl = window.location.href;
	var menuItems = document.querySelectorAll('.menu li a');
  
	for (var i = 0; i < menuItems.length; i++) {
	  var menuItem = menuItems[i];
	  if (menuItem.href === currentUrl) {
		menuItem.parentNode.classList.add('current-menu-item');
		break;
	  }
	}
  }
  
  // Call the function to highlight the current menu item
  CurrentMenuItem();

//Animation for taglines and arrow when site has loaded
  document.addEventListener('DOMContentLoaded', function() {
	// Get the element you want to add the class to
	var tagline = document.querySelector('.hero-inspire div');
	var arrow = document.querySelector('.arrow-down');
	var projects = document.querySelector('.hero-projects');

  
	// Add the "activated" class to the element
		tagline.classList.add('activated');
		arrow.classList.add('activated');
		projects.classList.add('activated');

  });

	
}() );
