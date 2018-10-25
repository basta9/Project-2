'usr strict';


function goToMain(ev) {
    ev.stopPropagation();
    window.location.href = 'index.html';
}

function toggleMenu(ev) {
    if (ev) {
        ev.stopPropagation();
    }
    document.body.classList.toggle('open');
}
function goToContact(ev) {
    ev.stopPropagation();
    window.location.href = 'contact.html';
}

function goToAbout(ev) {
    ev.stopPropagation();
    window.location.href = 'about.html';
}

function showGallery(ev) {
    if (ev) {
        ev.stopPropagation();
    }
    // toggleMenu();
    elMemeEditor.style.display = "none";
    elGallery.style.display = "block";
}