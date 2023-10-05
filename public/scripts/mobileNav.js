var burgerOpen = false;
var scrollHeightWhenOpened = 0;

function burgerClicked() {
    if (!burgerOpen) {  // If closed and should open
        // Make burger menu a cross
        document.getElementById('topLine').setAttribute('id', 'topLineCross');
        document.getElementById('middleLine').setAttribute('id', 'middleLineCross');
        document.getElementById('bottomLine').setAttribute('id', 'bottomLineCross');
        
        $('#nav').css({display: 'flex'});

        $('#nav').animate({
            opacity: '1',
            left: '0px',
        }, 200, 'swing');

        scrollHeightWhenOpened = window.scrollY;
    } 
    
    else {  // If open and should close
        // Turn cross back to burger menu
        document.getElementById('topLineCross').setAttribute('id', 'topLine');
        document.getElementById('middleLineCross').setAttribute('id', 'middleLine');
        document.getElementById('bottomLineCross').setAttribute('id', 'bottomLine');

        $('#nav').animate({
            opacity: '0',
            left: '50vw',
        }, 200, 'swing');

        setTimeout( () => {
            $('#nav').css({display: 'none'});
        }, 200);
    }

    
    burgerOpen = !burgerOpen;
}

function scrolledUpdateBurgerClicked() {
    if (!burgerOpen) return;
    
    if (window.scrollY == 0 || scrollHeightWhenOpened == 0 || Math.abs(window.scrollY - scrollHeightWhenOpened) > 5) {
        burgerClicked();
    } else {
        return;
    }
}

window.addEventListener('scroll', scrolledUpdateBurgerClicked)