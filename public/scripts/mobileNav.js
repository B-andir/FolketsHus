var burgerOpen = false;

function redirectToUrl(url) {
    window.location.href = "/" + url;
}

function burgerClicked() {
    if (!burgerOpen) {  // If closed and should open
        // Make burger menu a cross
        document.getElementById('topLine').setAttribute('id', 'topLineCross');
        document.getElementById('middleLine').setAttribute('id', 'middleLineCross');
        document.getElementById('bottomLine').setAttribute('id', 'bottomLineCross');
        
        disableScroll();

        $('#nav').css({display: 'flex'});

        $('#nav').animate({
            opacity: '1',
            left: '0px',
        }, 250, 'swing');

    } 
    
    else {  // If open and should close
        // Turn cross back to burger menu
        document.getElementById('topLineCross').setAttribute('id', 'topLine');
        document.getElementById('middleLineCross').setAttribute('id', 'middleLine');
        document.getElementById('bottomLineCross').setAttribute('id', 'bottomLine');

        enableScroll();

        $('#nav').animate({
            opacity: '0',
            left: '70vw',
        }, 200, 'swing');

        setTimeout( () => {
            $('#nav').css({display: 'none'});
        }, 250);

    }

    
    burgerOpen = !burgerOpen;
}


// Close Nav on Swipe Right, Scroll Nav on Swipe Up/Down
document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

var margin = 0;

var xDown = null;                                                        
var yDown = null;

function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}                                                     
                                                                         
function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};                                                
                                                                         
function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
                                                                         
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            /* right swipe */
        } else {
            /* left swipe */
            if (burgerOpen && xDiff <= 10) {
                burgerClicked();
            }
        }                       
    } else {
        var nav = $('#nav');
        if ( yDiff > 0 ) {
            /* down swipe */ 
            
        } else { 
            /* up swipe */

        }                                  
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};

// Navigation

var alreadyOpen = null;

function dropdownClicked(target = event.target, close = null) {

    if (target.classList.contains('navElement')) {
        target = target.childNodes.item(1);
    }
    
    let value = target.parentElement.dataset.open;

    let dropdownArrow = target.parentElement.childNodes.item(3);
    let dropdownID = target.parentElement.childNodes.item(1).id + '-dropdown';
    let dropdown = $('#' + dropdownID);
    let allDropdownP = $('#' + target.parentElement.childNodes.item(1).id + '-dropdown p');
    let allSeperatorLines = $('#' + dropdownID + " .seperatorLine");

    let DOMDropdown = document.getElementById(dropdownID);

    if (value == "true" || close == true) {
        // If open and should close

        target.parentElement.dataset.open = "false";

        dropdownArrow.style.transform = "scaleY(1)";
        dropdown.data('should-close', true);
        
        setTimeout( () => {
            dropdown.css({
                'padding-top': '0px',
                'padding-bottom': '0px',
            });

            for (let i = 0; i < allDropdownP.length; i++) {
                const DOMelement = allDropdownP[i];
                const element = $(DOMelement)
                element.css({
                    'padding-top': '0em',
                    'padding-bottom': '0em',
                    'font-size': '0rem',
                })
            }

            for (let i = 0; i < allSeperatorLines.length; i++) {
                const DOMelement = allSeperatorLines[i];
                const element = $(DOMelement)
                element.css({
                    'height': '0px',
                })
            }
        }, 5);


        // setTimeout( () => {
        //     if (dropdown.data('should-close') == false) return;
        //     document.getElementById(dropdownID).classList.add('hidden');
        // }, 300);

        alreadyOpen = null;
    } else if (value == "false") {
        // If closed and should open

        if (alreadyOpen != null) {
            dropdownClicked(alreadyOpen, true);
        }

        target.parentElement.dataset.open = "true";

        dropdownArrow.style.transform = "scaleY(-1)";
        dropdown.data('should-close', false);

        // document.getElementById(dropdownID).classList.remove('hidden');

        setTimeout( () => {
            if (dropdown.data('should-close') == true) return;

            dropdown.css({
                'padding-top': '1vh',
                'padding-bottom': '1vh',
            });

            for (let i = 0; i < allDropdownP.length; i++) {
                const DOMelement = allDropdownP[i];
                const element = $(DOMelement)
                element.css({
                    'padding-top': '1em',
                    'padding-bottom': '1em',
                    'font-size': '1rem',
                })
            }

            for (let i = 0; i < allSeperatorLines.length; i++) {
                const DOMelement = allSeperatorLines[i];
                const element = $(DOMelement)
                element.css({
                    'height': '1px',
                })
            }
    

        }, 5);

        alreadyOpen = target;
    }

}


// Scroll Control

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1, 32: 1, 33: 1, 34: 1, 35: 1, 36: 1};

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; } 
  }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}