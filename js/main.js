'use strict';

function init() {
<<<<<<< HEAD
    gImgs = [];

    for (let i = 1; i < 26; i++) {
        gImgs.push(createImg(i));
    }

    elMemeEditor = document.querySelector('.memeEditor');
    gCanvas = document.querySelector('#memeCanvas');

    setCanvasSize();

    gCtx = gCanvas.getContext('2d');
    elGallery = document.querySelector('.galleryWrap');

    renderGallery(gImgs);
}

// ***********************************************************************

function handleMouseDown(ev) {
    // console.log('I am in here');

    let rect = gCanvas.getBoundingClientRect();
    startX = ev.clientX - rect.left;
    startY = ev.clientY - rect.top;
    console.log(startX, startY);

    for (let i = 0; i < gMeme.txts.length; i++) {
        // console.log(gUserInput[i].x, gUserInput[i].y);
        if (elHit(startX, startY, i)) {
            gIsClicked = true;
            console.log('in');
            currEl = i;
            gMeme.txts[i].gapX = startX - gMeme.txts[i].x;
            gMeme.txts[i].gapY = gMeme.txts[i].y - startY;
        }
    }
}

// done dragging
function handleMouseUp(ev) {
    if (currEl === -1) return;
    else {
        gMeme.txts[currEl].isActive = 0;
        currEl = -1;
    }
    gIsClicked = false;
}

function canvasStartingCoords() {

    var distance = gCanvas.getBoundingClientRect();
    console.log('start coord rect', distance);

    canvasStartingPointX = distance.left;
    canvasStartingPointY = distance.top;

    console.log('start coord x', distance.left);
    console.log('start coord y', distance.top);

}


function handleMouseMove(ev) {
    if (currEl < 0 || !gIsClicked) {
        return;
    }
    let rect = gCanvas.getBoundingClientRect();
    let mouseX = ev.clientX - rect.left;
    let mouseY = ev.clientY - rect.top;

    // Put your mousemove stuff here
    let newX = mouseX - startX;
    let newY = mouseY - startY;
    startX = mouseX;
    startY = mouseY;

    // let canvasEl = gUserInput[currEl];
    let canvasEl = gMeme.txts[currEl];
    canvasEl.x += newX;
    canvasEl.y += newY;
    renderCanvas();
}

function elHit(x, y, idx) {
    var canvasEl = gMeme.txts[idx];
    return (canvasEl.x <= x && x <= canvasEl.x + canvasEl.width
        && canvasEl.y >= y && y >= canvasEl.y - canvasEl.font_size);
}

// ***********************************************************************

//gonna be needed, when taking care of the responsive canvse
function setCanvasSize() {

    gCanvas.width = 500;
    gCanvas.height = 500;

    // canvas.width = window.innerWidth / 2;
    // canvas.height = window.innerHeight / 2;
    // console.log('1=>',canvas.width );
    // console.log('1=>',canvas.height ); 
}

function createImg(idx) {

    let currWords = keyWords[idx - 1].split(',');
    return {
        id: idx,
        url: `img/${idx}.jpg`,
        keywords: currWords
    };
=======
    
    createImages();
    renderGallery(gImgs);
    
    elMemeEditor = document.querySelector('.memeEditor');
    gCanvas = document.querySelector('#memeCanvas');
    gCtx = gCanvas.getContext('2d');
    elGallery = document.querySelector('.galleryWrap');

    setCanvasSize();
>>>>>>> 5dd92dd93bffe01725bcaac255205bf1114c449f
}

function renderGallery() {

    var strHtml = '',images = gImgs;

    strHtml = images.map(function(img,idx){
        return `<img src="${img.url}" 
        alt="image of ${img.keywords[0]}"  
        data-img = '${img.id}'
        onclick="openEditorOfMeme(this)"> \n`;
    });

    strHtml = strHtml.join('');
    strHtml += `<div class="box">
                    <img src="img/add-pic.png" alt=""> 
                    <input type="file" class="file" name="image" onchange="onFileInputChange(event)" />
                </div>`
<<<<<<< HEAD
=======

>>>>>>> 5dd92dd93bffe01725bcaac255205bf1114c449f
    document.querySelector('.gallery').innerHTML = strHtml;
}


function showGallery() {
    elMemeEditor.style.display = "none";
    elGallery.style.display = "block";
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
<<<<<<< HEAD
}

// function toggleMenu(ev) {
//     ev.stopPropagation();
//     document.body.classList.toggle('open');
// }

// function goToAbout(ev) {
//     ev.stopPropagation();
//     window.location.href = 'about.html';
// }
// function goToContact(ev) {
//     ev.stopPropagation();
//     window.location.href = 'contact.html';
// }

function openEditorOfMeme(elImg) {

    gMeme.selectedImgId = +elImg.getAttribute("data-img");

    //for tomorrow set a random width and height for the canvas upon the windows width & height
    //for niw it'll be .5 the window
    elMemeEditor.style.display = "flex";
    elGallery.style.display = "none";
    canvasStartingCoords();

    gMeme.memeImage.src = `img/${gMeme.selectedImgId}.jpg`;

    gMeme.memeImage.onload = function () {
        // var width = img.height;
        // var height = img.width;
        // canvas.width = 500;
        // canvas.height = 500;
        gCtx.drawImage(gMeme.memeImage, 0, 0, gCanvas.width, gCanvas.height)
    }
}

//this function takes care of each change done by the user
function renderCanvas() {

    var img = new Image();
    img.src = `img/${gMeme.selectedImgId}.jpg`;

    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);

    gCtx.font = `${gMeme.txts[0].bold} ${gMeme.txts[0].size}px Arial`;

    if (gMeme.txts[0].text_shadow) {
        gCtx.offsetX = 10;
        gCtx.offsetY = 10;
        gCtx.shadowColor = gMeme.txts[0].color;
        gCtx.shadowBlur = 20;
    } else {
        gCtx.offsetX = 0;
        gCtx.offsetY = 0;
        gCtx.shadowColor = '';
        gCtx.shadowBlur = 0;
    }
    gCtx.fillStyle = gMeme.txts[0].color;
    gMeme.txts[0].y = (gCanvas.height + canvasStartingPointY) / 2;
    gMeme.txts[0].x = (gCanvas.width + canvasStartingPointX) / 2;
    gCtx.textAlign = gMeme.txts[0].alignText;

    gCtx.fillText(gMeme.txts[0].line, gMeme.txts[0].x, gMeme.txts[0].y);

}

function showGallery() {
    elMemeEditor.style.display = "none";
    elGallery.style.display = "block";
}

function writeText(elInput) {
    var idx = elInput.getAttribute("data-idx");
    gMeme.txts[idx - 1].width = gCtx.measureText(elInput.value).width;
    gMeme.txts[idx - 1].line = elInput.value;
    renderCanvas();
}

function updateFontSize(elInput) {
    var idx = elInput.getAttribute("data-input") - 1;

    if (elInput.innerHTML === '+' && gMeme.txts[idx].x < 1000) gMeme.txts[idx].size += 10;
    else if (elInput.innerHTML === '-' && gMeme.txts[idx].x >= 20) gMeme.txts[idx].size -= 10;
    renderCanvas();
}

function updateFontColor(elInput) {
    var idx = elInput.getAttribute("data-inputColor") - 1;
    console.log('color is ', elInput.value, 'index is ', idx);
    if (elInput.value) gMeme.txts[idx].color = elInput.value;
    renderCanvas();
}

function updateTextShadow(elInput) {
    var idx = elInput.getAttribute("data-checkBox") - 1;
    // console.log('elInput.value',elInput.value);
    console.log('I was clicked for line number', idx);

    if (elInput.checked === true) {
        console.log('check box was clicked for index number', idx);
        gMeme.txts[idx].text_shadow = 1;
    }
    else {
        console.log('check was removed for index number', idx);
        gMeme.txts[idx].text_shadow = 0;
    }

    renderCanvas();
}

function downloadMeme(elLink) {
    // var can = document.querySelector('#memeCanvas');
    elLink.href = gCanvas.toDataURL();
    elLink.download = 'my_canvas.jpg';
}

function alignText(direction) {
    console.log('I was clicked to the ', direction);
    gMeme.txts[0].alignText = direction;
    renderCanvas();
=======
>>>>>>> 5dd92dd93bffe01725bcaac255205bf1114c449f
}