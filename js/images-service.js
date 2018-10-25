'use strict';

function createImages() {

    gImgs = getFromStorage(KEY_IMAGES);

    if(!gImgs){
        gImgs = [];
        for(let i = 1;i <= keyWords.length;i++)  gImgs.push(createImg(i));   
    }
}

function createImg(idx) { 

    let currKeyWords = keyWords[idx - 1].split(',');
    return {
        id: idx,
        url: `img/${idx}.jpg`,
        keywords: currKeyWords
    };
}

function addImage(img) {
    gImgs.unshift(createImg(gImgs.length+1));
    saveToStorage(KEY_IMAGES, gImgs);
}

function getImagesCount() {
    return gImgs.length;
}

function pagination(goNextPrev){

    var elInputTxt = document.querySelector('.inputText');
    var elInputClr = document.querySelector('.colorPicker');
    var lineLen = gMeme.txts.length - 1;
    
    console.log('lineslen',lineLen);
    console.log('currLine',currLine);
    
    if(goNextPrev === 'next')  currLine++;
    else if(goNextPrev === 'prev')  currLine--;
    
    if(currLine < 0)    currLine = 0;
    else if(currLine >= lineLen) currLine = lineLen -1;

    elInputTxt.value = (gMeme.txts[currLine].line === '')?'Empty Line':gMeme.txts[currLine].line;
    elInputClr.value = gMeme.txts[currLine].color;
    
}

function onDeleteLine(){
    deleteLine(currLine);
    renderCanvas();
}

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