'use strict';

var gImgs;
// var gMeme = {
//     selectedImgId: 5, txts: [{
//         line: 'I never eat Falafel', size: 20, align: 'left',
//         color: 'red'
//     }]
// }

function init() {
    gImgs = [];
    for (let i = 1; i < 26; i++) {
        gImgs.push(createImg(i));
    }
    // console.log(gImgs);
    renderGallery(gImgs);
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
        strHtml += `<img src="${images[i].url}" alt=""> \n`;
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