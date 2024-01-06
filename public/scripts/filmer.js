function informationClicked() {
    var target = event.target;

    var iterations = 0;
    while (!target.classList.contains("informationElement")) {
        target = target.parentElement;

        if (iterations > 5) {
            return;
        }

        iterations++
    }

    if (target.classList.contains('expanded')) {
        // Is open and should close

        $(target.childNodes.item(3)).css({opacity: 0});
        
        setTimeout( () => {
            target.classList.remove('expanded')
        }, 200)
    } else {
        // Is closed and should open

        target.classList.add('expanded');

        setTimeout( () => {
            $(target.childNodes.item(3)).css({opacity: 1});
        }, 300)

        
    } 
}


var inspectOpen = false;
var scrollStart = window.scrollY;

function closeInspect() {
    document.getElementById('inspectMovieBackground').classList.add('hidden');
    document.getElementById('inspectMovie').classList.add('hidden');
    
    document.removeEventListener('scroll', scrollClose);

    inspectOpen = false;
}

function scrollClose() {
    if (Math.abs(window.scrollY - scrollStart) > 20) {
        closeInspect();
    }
}

function movieElementClicked(targetID) {

    targetID = '#' + targetID;

    let trailerURL = document.querySelector(targetID + ' .youtubeTrailer').getAttribute('src');
    console.log(trailerURL)



    if (trailerURL.length > 6) {
        document.querySelector('#inspectTrailer .youtubeTrailer').setAttribute('src', trailerURL);
    } else {
        document.querySelector('#inspectTrailer .youtubeTrailer').setAttribute('src', '');
    }

    document.querySelector('#inspectBody .poster img').setAttribute('src', document.querySelector(targetID + ' .poster').getAttribute('src'));

    console.log(document.querySelector(targetID + ' .type').innerHTML);

    const ticketButton = document.querySelector('#inspectFooter .ticket');
    if (document.querySelector(targetID + ' .type').innerHTML != 'kontrast') {
        ticketButton.setAttribute('href', document.querySelector(targetID + ' .ticketURL').getAttribute('href'));
        ticketButton.classList.remove('grey')
    } else {
        ticketButton.removeAttribute('href')
        ticketButton.classList.add('grey')
    }

    document.querySelector('#inspectBody .title').innerHTML = document.querySelector(targetID + ' .title').innerHTML;
    document.querySelector('#inspectBody .genre').innerHTML = document.querySelector(targetID + ' .genre').innerHTML;
    document.querySelector('#inspectBody .runtime').innerHTML = document.querySelector(targetID + ' .runtime').innerHTML;
    document.querySelector('#inspectBody .runDate').innerHTML = document.querySelector(targetID + ' .runDate').innerHTML;
    document.querySelector('#inspectBody .description').innerHTML = document.querySelector(targetID + ' .description').innerHTML;


    document.getElementById('inspectMovieBackground').classList.remove('hidden');
    document.getElementById('inspectMovie').classList.remove('hidden');

    inspectOpen = true;

    if (document.querySelector('nav').dataset.isMobile) {
        scrollStart = window.scrollY;
        document.addEventListener('scroll', scrollClose);
    }
}


// Close Nav on Swipe Right
document.addEventListener('touchstart', handleTouchStartFilmer, false);        
document.addEventListener('touchmove', handleTouchMoveFilmer, false);

var marginFilmer = 0;

var xDownFilmer = null;                                                        
var yDownFilmer = null;

function getTouchesFilmer(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}                                                     
                                                                         
function handleTouchStartFilmer(evt) {
    const firstTouch = getTouchesFilmer(evt)[0];                                      
    xDownFilmer = firstTouch.clientX;                                      
    yDownFilmer = firstTouch.clientY;                                      
};                                                
                                                                         
function handleTouchMoveFilmer(evt) {
    if ( ! xDownFilmer || ! yDownFilmer ) {
        return;
    }

    var xUpFilmer = evt.touches[0].clientX;                                    
    var yUpFilmer = evt.touches[0].clientY;

    var xDiffFilmer = xDownFilmer - xUpFilmer;
    var yDiffFilmer = yDownFilmer - yUpFilmer;
                                                                         
    if ( Math.abs( xDiffFilmer ) > Math.abs( yDiffFilmer ) ) {/*most significant*/
        if ( xDiffFilmer > 0 ) {
            /* right swipe */
        } else {
            /* left swipe */
            
        }                       

        if (inspectOpen && Math.abs(xDiffFilmer) > 15) {
            closeInspect();
        }
    } else {
        if ( yDiffFilmer > 0 ) {
            /* down swipe */ 
            
        } else { 
            /* up swipe */

        }                                  
    }
    /* reset values */
    xDownFilmer = null;
    yDownFilmer = null;                                             
};