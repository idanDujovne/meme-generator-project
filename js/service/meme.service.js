'use strict'

let selectedImg
let gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] },
    { id: 2, url: 'img/2.jpg', keywords: ['funny', 'cat'] },
    { id: 3, url: 'img/3.jpg', keywords: ['funny', 'cat'] },

]
let gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            pos: { x: 50, y: 50 },
            txt: 'I sometimes eat Falafel',
            size: 20,
            color: 'red',
        },
        {
            pos: { x: 100, y: 100 },
            txt: 'This is the second line',
            size: 30,
            color: 'blue',
        }]
}

function getMeme() {
    return gMeme
}

function getImages() {
    return gImgs
}

function setImg(img) {
    selectedImg = img
}

function getImage() {
    return selectedImg
}

function removeLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
}

function setLineTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function updateSelectedLine(selectedLineIdx) {
    gMeme.selectedLineIdx = gMeme.lines.length === selectedLineIdx ? 0 : selectedLineIdx
}

function addLine() {
    const newLine = {
        pos: { x: 100, y: 30 },
        txt: 'Add Text Here',
        size: 20,
        color: 'black',
    }
    gMeme.lines.push(newLine)
}