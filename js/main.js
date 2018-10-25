'use strict';

function init() {

    createImages();
    renderGallery(gImgs);

    elMemeEditor = document.querySelector('.memeEditor');
    gCanvas = document.querySelector('#memeCanvas');
    gCtx = gCanvas.getContext('2d');
    elGallery = document.querySelector('.galleryWrap');

    setCanvasSize();
}

function renderGallery(images) {
    //for searching
    if (!images) {
        images = gImgs;
    }

    var strHtml = ''
    strHtml = images.map(function (img, idx) {
        return `<img src="${img.url}" 
        alt="image of ${img.keywords[0]}"  
        data-img = '${img.id}'
        onclick="openEditorOfMeme(this)"> \n`;
    });

    strHtml = strHtml.join('');
    strHtml += `<div class="box">
                    <img src="img/add-pic.png" alt=""> 
                    <input type="file" class="file" name="image" onchange="handleImageFromInput(event)" />
                </div>`

    document.querySelector('.gallery').innerHTML = strHtml;
}

function onSearchImg(searchKey) {
    if (!searchKey) {
        searchKey = document.querySelector('#search').value;
    }
    searchKey = searchKey.toLowerCase();
    let filters = filterImg(searchKey);
    renderGallery(filters);
}

function onFileInputChange(ev) {
    handleImageFromInput(ev, renderCanvas)
}