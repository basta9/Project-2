'use strict';

var gImgs;
var elMemeEditor,elGallery;
var canvas,ctx;
var gUserInput = [];

var gCurrImg = {
    id: 0,
    src:''
};

function init() {
    gImgs = [];
    for (let i = 1; i < 26; i++) {
        gImgs.push(createImg(i));
    }
    
    elMemeEditor = document.querySelector('.memeEditor');
    canvas = document.querySelector('#memeCanvas');
    setCanvasSize();
    ctx = canvas.getContext('2d');
    
    elGallery = document.querySelector('.galleryWrap');
    
    renderGallery(gImgs);


gUserInput = [{
    content: '',
    font_size: 0,
    color: '#ffffff',
    font_size: 16,
    coorX: 20,
    coordY: 20
},
{
    content: '',
    font_size: 0,
    color: '#ffffff',
    font_size: 16,
    coorX: 20,
    coordY: canvas.height - 100
}
];

}

//gonna be needed, when taking care of the responsive canvse
function setCanvasSize() {

    canvas.width = 500;
    canvas.height = 500;

    // canvas.width = window.innerWidth / 2;
    // canvas.height = window.innerHeight / 2;
    // console.log('1=>',canvas.width );
    // console.log('1=>',canvas.height ); 
}

function createImg(idx) {
    let keyWords = [
        'kiss,love,boxing,box', //1
        'view,dance,dancing,happy', //2
        'trump,politic,rabbit', //3
        'cute, dogs, love', //4
        'succes, win, kid', //5
        'cute, dog, baby', //6
        'cat, sleep, work', //7
        'funny,satisfied', //8
        'kid,cheeky,evil', //9
        'explain, so-so', //10
        'evil, quote, funny', //11
        'haim, you', //12
        'dance, africa, kids', //13
        'toy, pixar, explain', //14
        'obama, funny, smile', //15
        'funny, dog, drag', //16
        'baby, funny, happy', //17
        'trump, win, funny', //18
        'surprise, you', //19
        'leo , cheers', //20
        'matrix, cool', //21
        'lord of the rings, chill', //22
        'oprah, happy', //23
        'star trek, laugh, joke', //24
        'potin, politic', //25

    ];

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

    gCurrImg.id = elImg.getAttribute("data-img");
    gCurrImg.src = `img/${gCurrImg.id}.jpg`;

    //for tomorrow set a random width and height for the canvas upon the windows width & height
    //for niw it'll be .5 the window
    elMemeEditor.style.display = "flex";
    elGallery.style.display = "none";

    var img = new Image();
    img.src = `img/${gCurrImg.id}.jpg`
    img.onload = function () {
        // var width = img.height;
        // var height = img.width;
        // canvas.width = 500;
        // canvas.height = 500;

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    }
}

//this function takes care of each change done by the user
function renderCanvas() {

    var img = new Image();
    img.src = `img/${gCurrImg.id}.jpg`
    img.onload = function () {

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        ctx.font = `${gUserInput[0].font_size}px Arial`;
        ctx.fillStyle = gUserInput[0].color;
        ctx.fillText(gUserInput[0].content, gUserInput[0].coorX, gUserInput[0].coordY);
        ctx.font = `${gUserInput[1].font_size}px Arial`;
        ctx.fillStyle = gUserInput[1].color;
        ctx.fillText(gUserInput[1].content, gUserInput[1].coorX, gUserInput[1].coordY);
    }
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
    // console.log('elInput ',elInput.innerHTML);
    // console.log('idx ',idx);
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

function downloadMeme(elLink){
    // var can = document.querySelector('#memeCanvas');
    elLink.href = canvas.toDataURL();
    elLink.download = 'my_canvas.jpg';
}
