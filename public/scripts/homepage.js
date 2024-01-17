const isMobile = $('#nav').data('isMobile');
const lowerContent = document.querySelector('#lowerContent');

$("#arrowBorder").click(function() {
    scrollToTarget("#lowerContent");
});

function moveBackground() {
    $('#landingBackground').css({top: -window.scrollY / 3});
    // $('#landingBackground').css({top: 0});
}

document.addEventListener('scroll', moveBackground);

function scrollToTarget(target) {
    $([document.documentElement, document.body]).animate({
        scrollTop: 
            $(target).offset().top - $('#hiddenHelper').height()
    }, 1200);
}