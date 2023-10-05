const isMobile = $('#nav').data('isMobile');
const lowerContent = document.querySelector('#lowerContent');

$("#arrowBorder").click(function() {
    $([document.documentElement, document.body]).animate({
        scrollTop: 
            $("#lowerContent").offset().top - $('#hiddenHelper').height()
    }, 1200);
});

function moveBackground() {
    $('#landingBackground').css({top: -window.scrollY / 4});
}

document.addEventListener('scroll', moveBackground);

// var rellax = new Rellax('.rellax');