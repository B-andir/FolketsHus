let slideshows = [];

$(document).ready ( () => {
    let temp = document.getElementsByClassName("slideshow");

    for (let index = 0; index < temp.length; index++) {
        const element = temp[index]

        slideshows[index] = element;

        const slideCount = element.children[0].children.length;

        for (let i = 0; i < slideCount; i++) {
            const slide = element.children[0].children[i];

            let target = window.location.origin + slide.getAttribute('data-src');
            
            slide.style.backgroundImage = "url('" + target + "')";
        }
    }

    
});

function leftClicked() {
    alert("ERROR. Feature not yet implemented.")
}

function rightClicked() {
    alert("ERROR. Feature not yet implemented.")
}

function selectionClicked() {
    alert("ERROR. Feature not yet implemented.")
}