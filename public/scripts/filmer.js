$(document).ready( () => {
    var elements = document.querySelectorAll('.filmElement');
    var inspect = document.querySelector('#inspectMovie');

    elements.forEach(element => {
        element.addEventListener("keypress", (event) => {
            if (event.key == "Enter") {
                element.click();
                inspect.focus();
            }
        })
    });

    const urlParams = new URLSearchParams(window.location.search);
    const openElement = urlParams.get('openElement') || 'false'

    if (openElement == 'true') {
        let target = 'filmElement' + urlParams.get('openID');
        movieElementClicked(target);
    }
    
    window.setTimeout(() => {
        $('#information').css({
            'box-shadow': '-2px 2px 4px #bd1818'
        });

        window.setTimeout(() => {
            $('#information').css({
                'box-shadow': '0px 0px 4px #582B39'
            });
        }, 1200);
    }, 500);
});

function setInspectorHeights() {
    var inspectPoster = $('#inspectBody .poster');
    var inspectGenre = $('#inspectBody .genre');
    var inspectDescription = $('#inspectBody .description');
    var inspectFooter = $('#inspectFooter');

    var inspectPosterHeight = inspectPoster[0].clientHeight
    var inspectGenreHeight = inspectGenre[0].getBoundingClientRect().bottom;

    inspectPoster.css({
        'top': inspectGenreHeight - inspectPosterHeight,
    })

    var inspectDescriptionTop = inspectDescription[0].getBoundingClientRect().top;
    var inspectFooterTop = inspectFooter[0].getBoundingClientRect().top;

    inspectDescription.css({
        'max-height': inspectFooterTop - inspectDescriptionTop - 20
    })

}

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

let inspectTop = 0;

var inspectOpen = false;
var scrollStart = window.scrollY;

let touchStartY = 0;
let touchEndY = 0;
let lastTouchY = 0;
let distanceToStart = 0;

function mobileInspectDragRelease() {
    if (distanceToStart > 50) {
        $('#inspectMovie').css({
            'transition': 'margin-top 0ms',
            'margin-top': inspectTop,
        });

        closeInspect();
    } else {
        $('#inspectMovie').css({
            'transition': 'margin-top 80ms ease-out'
        })

        $('#inspectMovie').css({
            'margin-top': inspectTop,
        })
    }
    
}

function calculation(x) {
    return (5 * Math.pow(x, -0.75));
}

var totalTopResult = 0;

function mobileInspectDrag(moveY) {
    distanceToStart = (Math.abs(touchStartY - moveY)) / 2

    let multiplier = calculation(distanceToStart);
    multiplier = multiplier > 1 ? 1 : multiplier;

    const diffY = lastTouchY - moveY;

    totalTopResult -= diffY * multiplier;

    // document.querySelector('#inspectMovie').style.marginTop = inspectTop + totalTopResult + 'px'

    $('#inspectMovie').css({
        'margin-top': inspectTop + totalTopResult + 'px'
    })

    lastTouchY = moveY;
}

function closeInspect() {
    document.getElementById('inspectMovieBackground').classList.add('hidden');
    document.getElementById('inspectMovie').classList.add('hidden');
    
    document.querySelector('#inspectTrailer .youtubeTrailer').setAttribute('src', '');

    document.removeEventListener('scroll', scrollClose);
    
    document.querySelector('#inspectMovie').removeEventListener('touchstart', () => {});
    document.querySelector('#inspectMovie').removeEventListener('touchend', () => {});
    document.querySelector('#inspectMovie').removeEventListener('touchmove', () => {});
    document.getElementById('inspectMovie').removeEventListener('keypress', () => {});

    if (document.querySelector('nav').dataset.isMobile == 'true') {
        enableScroll();
    }

    inspectOpen = false;

    touchStartY = 0;
    touchEndY = 0;
    lastTouchY = 0;
}

function scrollClose() {
    if (Math.abs(window.scrollY - scrollStart) > 30) {
        closeInspect();
    }
}

function movieElementClicked(targetID) {

    targetID = '#' + targetID;

    let trailerURL = document.querySelector(targetID + ' .youtubeTrailer').getAttribute('src');

    if (trailerURL.length > 12) {
        document.querySelector('#inspectTrailer .youtubeTrailer').setAttribute('src', trailerURL);
    }

    document.querySelector('#inspectBody .poster img').setAttribute('src', document.querySelector(targetID + ' .poster').getAttribute('src'));

    const ticketButton = document.querySelector('#inspectFooter .ticket');
    if (document.querySelector(targetID + ' .type').innerHTML != 'kontrast') {
        ticketButton.setAttribute('href', document.querySelector(targetID + ' .ticketURL').getAttribute('href'));
        ticketButton.classList.remove('grey')
    } else {
        ticketButton.removeAttribute('href')
        ticketButton.classList.add('grey')
    }

    let inspectMovie = document.getElementById('inspectMovie');

    document.querySelector('#inspectBody .title').innerHTML = document.querySelector(targetID + ' .title').innerHTML;
    document.querySelector('#inspectBody .genre').innerHTML = document.querySelector(targetID + ' .genre').innerHTML;
    document.querySelector('#inspectBody .runtime').innerHTML = document.querySelector(targetID + ' .runtime').innerHTML;
    document.querySelector('#inspectBody .runDate').innerHTML = document.querySelector(targetID + ' .runDate').innerHTML;
    document.querySelector('#inspectBody .description').innerHTML = document.querySelector(targetID + ' .description').innerHTML;

    document.getElementById('inspectMovieBackground').classList.remove('hidden');
    inspectMovie.classList.remove('hidden');
    
    inspectTop = document.querySelector('#inspectMovie').style.marginTop;
    inspectMovie.focus();

    inspectMovie.addEventListener('keyup', (event) => {
        console.log(event);
        if (event.key == "Escape") {
            closeInspect();
        }
    })

    inspectOpen = true;

    if (document.querySelector('nav').dataset.isMobile == 'true') {
        setInspectorHeights();

        disableScroll();

        document.querySelector('#inspectMovie').addEventListener('touchstart', (event) => {
            if (event.touches.length == 1) {
                totalTopResult = inspectTop;
                touchStartY = event.changedTouches[0].screenY;
                lastTouchY = touchStartY;
            }

            document.querySelector('#inspectMovie').addEventListener('touchmove', (event) => {
                if (event.touches.length == 1) {
                    mobileInspectDrag(event.changedTouches[0].screenY);
                }
            });
        });

        document.querySelector('#inspectMovie').addEventListener('touchend', (event) => {
            if (event.touches.length == 1) {
                touchEndY = event.changedTouches[0].screenY;
                mobileInspectDragRelease();

                touchStartY = 0;
            }
        });
    } else {
        scrollStart = window.scrollY;
        document.addEventListener('scroll', scrollClose);
    }
}


// // Close Nav on Swipe Right
// document.addEventListener('touchstart', handleTouchStartFilmer, false);
// document.addEventListener('touchmove', handleTouchMoveFilmer, false);

// var marginFilmer = 0;

// var xDownFilmer = null;                                                        
// var yDownFilmer = null;

// function getTouchesFilmer(evt) {
//   return evt.touches ||             // browser API
//          evt.originalEvent.touches; // jQuery
// }

// function handleTouchStartFilmer(evt) {
//     const firstTouch = getTouchesFilmer(evt)[0];
//     xDownFilmer = firstTouch.clientX;
//     yDownFilmer = firstTouch.clientY;
// };

// function handleTouchMoveFilmer(evt) {
//     if ( ! xDownFilmer || ! yDownFilmer ) {
//         return;
//     }

//     var xUpFilmer = evt.touches[0].clientX;
//     var yUpFilmer = evt.touches[0].clientY;

//     var xDiffFilmer = xDownFilmer - xUpFilmer;
//     var yDiffFilmer = yDownFilmer - yUpFilmer;
    
//     if ( Math.abs( xDiffFilmer ) > Math.abs( yDiffFilmer ) ) {/*most significant*/
//         if ( xDiffFilmer > 0 ) {
//             /* right swipe */
//         } else {
//             /* left swipe */
            
//         }

//         if (inspectOpen && Math.abs(xDiffFilmer) > 15) {
//             closeInspect();
//         }
//     } else {
//         if ( yDiffFilmer > 0 ) {
//             /* down swipe */ 
            
//         } else { 
//             /* up swipe */

//         }                                  
//     }
//     /* reset values */
//     xDownFilmer = null;
//     yDownFilmer = null;                                             
// };