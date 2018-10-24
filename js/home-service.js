'use strict';

function handleImageFromInput(ev, onImageReady) {
    document.querySelector('.share-container').innerHTML = ''
    var reader = new FileReader();

    reader.onload = function (event) {
        var img = new Image();
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result;
    }
    reader.readAsDataURL(ev.target.files[0]);
}

function filterImg(key) {
    return gImgs.filter(function (currImg) {
        for (let i = 0; i < currImg.keywords.length; i++) {

            let word = currImg.keywords[i];
            if (word.indexOf(key) !== -1) return true;
        }
        return false;
    });
}