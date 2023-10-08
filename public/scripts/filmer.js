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