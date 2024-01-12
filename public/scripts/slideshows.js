var slideshows = [];
var slideshowElements;

var touchStartX = 0;
var touchEndX = 0;
var lastTouchX = 0;
var touchTarget;

var clock = 0;
var active = true;                 

$(document).ready ( () => {
    slideshowElements = document.getElementsByClassName("slideshow");

    for (let index = 0; index < slideshowElements.length; index++) {
        const element = slideshowElements[index]

        element.addEventListener('mouseenter', stopClock);
        element.addEventListener('mouseleave', startClock);
        
        element.addEventListener('touchstart', (event) => {
            touchTarget = getParentSlideshowElement(event.target)['slideshow'];
            touchStartX = lastTouchX = event.changedTouches[0].clientX;
            stopClock();
        });
        
        element.addEventListener('touchend', (event) => {
            touchEndX = event.changedTouches[0].clientX;
            startClock();
            handleSwipeGesture(event.target);
        });

        element.addEventListener('touchmove', (event) => {
            handleTouchMoveSlideshow(event.touches[0].clientX);
        });

        const imageContainer = element.children[0];

        $(imageContainer).css({left: -imageContainer.children[0].clientWidth - 10})

        const slideCount = element.children[0].children.length;

        slideshows[index] = {
            slideCount: slideCount - 2,
            currentSlide: 1
        };

        for (let i = 0; i < slideCount; i++) {
            const slide = element.children[0].children[i];

            let target = window.location.origin + slide.getAttribute('data-src');
            
            slide.style.backgroundImage = "url('" + target + "')";
        }
    }
});


// Utility

function checkVisible(elm, threshold, mode) {
    threshold = threshold || 0;
    mode = mode || 'visible';
  
    var rect = elm.getBoundingClientRect();
    var viewHeight = window.innerHeight;
    var above = rect.bottom - threshold < 0;
    var below = rect.top - viewHeight + threshold >= 0;

    var result = mode === 'above' ? above : (mode === 'below' ? below : !above && !below);

  
    return result;
  }


// Slideshow automation

function stopClock() {
    console.log("Stop");
    clock = 0;
    active = false;
}

function startClock() {
    console.log("Start");
    active = true;
}

(function () {
    if (active) {
        window.requestAnimationFrame( () => {
            clock += 500;
        });
    }

    if (clock >= 6000) {
        window.requestAnimationFrame(advanceAllSlides);

        clock = 0;
    }

    setTimeout(arguments.callee, 500);
})();

function advanceAllSlides() {
    for (let index = 0; index < slideshowElements.length; index++) {
        const element = slideshowElements[index];

        if (checkVisible(element, 190)) {
            rightClicked(element);
        } 
    };
}


// Slideshow functionality

function getOffset(n) {
    return (-slideshowElements[0].children[0].children[0].clientWidth * n) + (10 + (-20) * n);
}

function setSlide(parent, slideshow, slideshowIndex, targetSlide) {
    var currentRadioButton = ($($(parent).children()[2]).children()[slideshows[slideshowIndex].currentSlide - 1]);

    var offset = getOffset(targetSlide);

    if (targetSlide == 0) {
        $(slideshow).animate({
            left: offset + "px",
        }, 600, 'easeOutCubic', () => {
            $(slideshow).css({
                left: getOffset(slideshows[slideshowIndex].slideCount) + "px"
            });
        });

        slideshows[slideshowIndex].currentSlide = slideshows[slideshowIndex].slideCount;
    } else if (targetSlide > slideshows[slideshowIndex].slideCount) {
        $(slideshow).animate({
            left: offset + "px",
        }, 600, 'easeOutCubic', () => {
            $(slideshow).css({
                left: getOffset(1) + "px"
            });
        });

        slideshows[slideshowIndex].currentSlide = 1;
    } else {
        $(slideshow).animate({
            left: offset + "px",
        }, 600, 'easeOutCubic');

        slideshows[slideshowIndex].currentSlide = targetSlide;
    }



    var newRadioButton = ($($(parent).children()[2]).children()[slideshows[slideshowIndex].currentSlide - 1]);
    
    currentRadioButton.innerHTML = "radio_button_unchecked";
    newRadioButton.innerHTML = "radio_button_checked";
}

function getParentSlideshowElement(_child) {
    var child = $(_child)
    var parent = child;

    while (parent.hasClass("slideshow") == false) {
        parent = parent.parent();
    }

    var result = {
        parent: parent,
        slideshowIndex: parent.data('slideshowIndex'),
        slideshow: parent.children()[0],
    }
    
    return result;
}

function leftClicked(target) {
    if (!target) {
        target = event.target;
    }
    
    var parentSlideshowObj = getParentSlideshowElement(target);

    var slideshowIndex = parentSlideshowObj['slideshowIndex'];

    setSlide(parentSlideshowObj['parent'], parentSlideshowObj['slideshow'], slideshowIndex, slideshows[slideshowIndex].currentSlide - 1)

}

function rightClicked(target) {
    if (!target) {
        target = event.target;
    }

    var parentSlideshowObj = getParentSlideshowElement(target);

    var slideshowIndex = parentSlideshowObj['slideshowIndex'];

    setSlide(parentSlideshowObj['parent'], parentSlideshowObj['slideshow'], slideshowIndex, slideshows[slideshowIndex].currentSlide + 1)
}

function selectionClicked(target) {
    if (!target) {
        target = event.target;
    }

    var targetSlide = $(target).index();

    var parentSlideshowObj = getParentSlideshowElement(target);

    setSlide(parentSlideshowObj['parent'], parentSlideshowObj['slideshow'], parentSlideshowObj['slideshowIndex'], targetSlide + 1)
}

function reCenter(target) {
    const elementObj = getParentSlideshowElement(target);

    var slideshowIndex = elementObj['slideshowIndex'];
    var slideshow = elementObj['slideshow'];
    
    var offset = getOffset(slideshows[slideshowIndex].currentSlide);

    $(slideshow).animate({
        left: offset + "px",
    }, 200, 'easeInCubic');
}

function handleSwipeGesture(target) {
    if (touchEndX < touchStartX) {
        // Left

        if (Math.abs(touchEndX - touchStartX) > 100) {
            rightClicked(target)
        } else {
            reCenter(target)
        }
    } else if(touchEndX > touchStartX) {
        // Right

        if (Math.abs(touchEndX - touchStartX) > 100) {
            leftClicked(target)
        } else {
            reCenter(target)
        }
    }
}

function handleTouchMoveSlideshow(moveX) {
    var diff = lastTouchX - moveX;

    $(touchTarget).css('left', '-=' + diff + 'px')

    lastTouchX = moveX;
}