var slideshows = [];
var slideshowElements;

var touchStartX = 0;
var touchEndX = 0;

var clock = 0;
var active = true;                 

$(document).ready ( () => {
    slideshowElements = document.getElementsByClassName("slideshow");

    for (let index = 0; index < slideshowElements.length; index++) {
        const element = slideshowElements[index]

        element.addEventListener('mouseenter', stopClock);
        element.addEventListener('mouseleave', startClock);
        
        element.addEventListener('touchstart', (event) => {
            touchStartX = event.changedTouches[0].screenX;
            stopClock();
        });
        element.addEventListener('touchend', (event) => {
            touchEndX = event.changedTouches[0].screenX;
            startClock();
            handleSwipeGesture(event.target);
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

// Slideshow automation

function stopClock() {
    clock = 0;
    active = false;
}

function startClock() {
    active = true;
}

(function () {
    if (active) {
        clock += 500;
    }

    if (clock >= 6000) {
        for (let index = 0; index < slideshowElements.length; index++) {
            const element = slideshowElements[index];

            rightClicked(element);
        };

        clock = 0;
    }

    setTimeout(arguments.callee, 500);
})();


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
        }, 500, 'easeInOutCubic', () => {
            $(slideshow).css({
                left: getOffset(slideshows[slideshowIndex].slideCount) + "px"
            });
        });

        slideshows[slideshowIndex].currentSlide = slideshows[slideshowIndex].slideCount;
    } else if (targetSlide > slideshows[slideshowIndex].slideCount) {
        $(slideshow).animate({
            left: offset + "px",
        }, 500, 'easeInOutCubic', () => {
            $(slideshow).css({
                left: getOffset(1) + "px"
            });
        });

        slideshows[slideshowIndex].currentSlide = 1;
    } else {
        console.log(offset)
        $(slideshow).animate({
            left: offset + "px",
        }, 500, 'easeInOutCubic');

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

function handleSwipeGesture(target) {
    if (touchEndX < touchStartX) {
        // Left

        if (Math.abs(touchEndX - touchStartX) > 20) {
            leftClicked(target)
        }
    } else if(touchEndX > touchStartX) {
        // Right

        if (Math.abs(touchEndX - touchStartX) > 20) {
            rightClicked(target)
        }
    }
}