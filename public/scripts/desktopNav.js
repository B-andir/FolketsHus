var showElements = new Map();

function redirectToUrl(url) {
    location.href = url;
}

function triggerToggleDropdownElement(elementID, parent) {
    return new Promise((resolve) => {
        let timeout = 1000;  // 1.0 seconds
        if (showElements.get(elementID)) timeout = 200;  // 0.2 seconds
        setTimeout(() => {
            let element = document.getElementById(elementID);
            if (showElements.get(elementID) == true && !showElements.get(elementID + 'cancelProcess')) {
                // Show Dropdown
                element.classList.remove('hidden')
                setTimeout(() => {
                    element.style.filter = 'opacity(1)';
                    element.style.transform = 'scaleY(1)';
                    element.style.borderLeft = '1px solid #BB8376';
                    element.style.borderRight = '1px solid #BB8376';
                }, 50);
                resolve('Done');
            } else if (!showElements.get(elementID + 'cancelProcess')) {
                // Hide Dropdown
                element.style.filter = 'opacity(0)';
                element.style.transform = 'scaleY(0.7)';
                element.style.borderLeft = '1px hidden transparent';
                element.style.borderRight = '1px hidden transparent';
                parent.style.borderLeft = '';
                parent.style.borderRight = '';
                parent.style.minWidth = '130px';
                parent.style.width = '11vw'
                setTimeout(() => {
                    element.classList.add('hidden');
                }, 200);
                resolve('Done');
            } else {
                resolve('Cancelled');
            }
        }, timeout);
    });
}

async function toggleDropdownElement(elementID) {
    showElements.set(elementID + 'processUnderway', true);
    const result = await triggerToggleDropdownElement(elementID, event.target)
    if (result == 'Cancelled') showElements.set(elementID + 'cancelProcess', false);
    showElements.set(elementID + 'processUnderway', false);
}

function showDropdownElement(elementID) {
    if (showElements.get(elementID) == true) return;

    event.target.style.borderLeft = '1px solid #BB8376';
    event.target.style.borderRight = '1px solid #BB8376';
    event.target.style.minWidth = '128px';
    event.target.style.width = 'calc(11vw - 2px)'

    if (showElements.get(elementID + 'processUnderway')) showElements.set(elementID + 'cancelProcess', true);
    
    showElements.set(elementID, true);

    toggleDropdownElement(elementID);
}

function hideDropdownElement(elementID) {
    if (showElements.get(elementID) == false) return;

    if (document.getElementById(elementID).classList.contains('hidden')) {
        event.target.style.borderLeft = '';
        event.target.style.borderRight = '';
        event.target.style.minWidth = '130px';
        event.target.style.width = '11vw'
    }

    if (showElements.get(elementID + 'processUnderway')) showElements.set(elementID + 'cancelProcess', true);

    showElements.set(elementID, false);

    toggleDropdownElement(elementID);
}

function kontaktButton() {
    $([document.documentElement, document.body]).animate({
        scrollTop: 
            $("#footer").offset().top
    }, 1200);
}