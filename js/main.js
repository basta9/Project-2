'use strict';

function init() {
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
}

function renderGallery(images) {

    var strHtml = '';
    for (let i = 0; i < images.length; i++) {

        strHtml += `<img src="${images[i].url}" 
        alt="image of ${images[i].keywords[0]}"  
        data-img = '${images[i].id}'
        onclick="openEditorOfMeme(this)"> \n`;
    }

    strHtml += `<div class="box">
                    <img src="img/add-pic.png" alt=""> 
                    <input type="file" class="file" name="image" onchange="onFileInputChange(event)" />
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

function toggleMenu(ev) {
    ev.stopPropagation();
    document.body.classList.toggle('open');
}

function goToInTouch(ev) {
    ev.stopPropagation();
    console.log('get in touch');

}
function goToAbout(ev) {
    ev.stopPropagation();
    console.log('about');

}
function goToContact(ev) {
    ev.stopPropagation();
    console.log('contact');

}

function openEditorOfMeme(elImg) {

    gMeme.selectedImgId = +elImg.getAttribute("data-img");

    //for tomorrow set a random width and height for the canvas upon the windows width & height
    //for niw it'll be .5 the window
    elMemeEditor.style.display = "flex";
    elGallery.style.display = "none";

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
    img.src = `img/${gMeme.selectedImgId}.jpg`
    // img.onload = function () {

        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);

        gCtx.font = `${gUserInput[0].font_size}px Arial`;
        
        if(gUserInput[0].text_shadow)   {
            gCtx.offsetX = 10;
            gCtx.offsetY = 10;
            gCtx.shadowColor = gUserInput[0].color;
            gCtx.shadowBlur = 20;
        }else{
            gCtx.offsetX = 0;
            gCtx.offsetY = 0;
            gCtx.shadowColor = '';
            gCtx.shadowBlur = 0;
        }
       
        gCtx.fillStyle = gUserInput[0].color;
        gCtx.fillText(gUserInput[0].content, gUserInput[0].coorX, gUserInput[0].coordY);

        gCtx.font = `${gUserInput[1].font_size}px Arial`;

        if(gUserInput[1].text_shadow)  {
            gCtx.offsetX = 10;
            gCtx.offsetY = 10;
            gCtx.shadowColor = gUserInput[1].color;
            gCtx.shadowBlur = 20;
        }else{
            gCtx.offsetX = 0;
            gCtx.offsetY = 0;
            gCtx.shadowColor = '';
            gCtx.shadowBlur = 0;
        }

        gCtx.fillStyle = gUserInput[1].color;
        gCtx.fillText(gUserInput[1].content, gUserInput[1].coorX, gUserInput[1].coordY);
    // }
}

function showGallery() {
    elMemeEditor.style.display = "none";
    elGallery.style.display = "block";
}

function writeText(elInput) {
    var idx = elInput.getAttribute("data-idx");
    gUserInput[idx - 1].content = elInput.value;
    renderCanvas();
}

function updateFontSize(elInput) {
    var idx = elInput.getAttribute("data-input") - 1;

    if(elInput.innerHTML === '+' && gUserInput[idx].coorX < 1000)   gUserInput[idx].font_size += 10;
    else if(elInput.innerHTML === '-' && gUserInput[idx].coorX >= 20)  gUserInput[idx].font_size -= 10;
    renderCanvas();
}

function updateFontColor(elInput) {
    var idx = elInput.getAttribute("data-inputColor") - 1;
    console.log('color is ',elInput.value,'index is ',idx);
    if(elInput.value)   gUserInput[idx].color = elInput.value;
    renderCanvas();
}

function updateTextShadow(elInput){
    var idx = elInput.getAttribute("data-checkBox") - 1;
    // console.log('elInput.value',elInput.value);
    console.log('I was clicked for line number', idx);

    if(elInput.checked === true) {
        console.log('check box was clicked for index number', idx);
        gUserInput[idx].text_shadow = 1;
    }
    else {
        console.log('check was removed for index number', idx);
        gUserInput[idx].text_shadow = 0;
    }

    renderCanvas();
}

function downloadMeme(elLink){
    // var can = document.querySelector('#memeCanvas');
    elLink.href = gCanvas.toDataURL();
    elLink.download = 'my_canvas.jpg';
}
