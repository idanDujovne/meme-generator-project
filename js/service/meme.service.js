'use strict'

let selectedImg
let gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['funny', 'cat'] },
    { id: 2, url: 'img/2.jpg', keywords: ['funny', 'cat'] },
    { id: 3, url: 'img/3.jpg', keywords: ['funny', 'cat'] },
    { id: 4, url: 'img/4.jpg', keywords: ['funny', 'cat'] },
    { id: 5, url: 'img/5.jpg', keywords: ['funny', 'cat'] },
    { id: 6, url: 'img/6.jpg', keywords: ['funny', 'cat'] },
    { id: 7, url: 'img/7.jpg', keywords: ['funny', 'cat'] },
    { id: 8, url: 'img/8.jpg', keywords: ['funny', 'cat'] },
    { id: 9, url: 'img/9.jpg', keywords: ['funny', 'cat'] },
    { id: 10, url: 'img/10.jpg', keywords: ['funny', 'cat'] },
    { id: 11, url: 'img/11.jpg', keywords: ['funny', 'cat'] },
    { id: 12, url: 'img/12.jpg', keywords: ['funny', 'cat'] },
    { id: 13, url: 'img/13.jpg', keywords: ['funny', 'cat'] },
    { id: 14, url: 'img/14.jpg', keywords: ['funny', 'cat'] },
    { id: 15, url: 'img/15.jpg', keywords: ['funny', 'cat'] },
    { id: 16, url: 'img/16.jpg', keywords: ['funny', 'cat'] },
    { id: 17, url: 'img/17.jpg', keywords: ['funny', 'cat'] },

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
            font: 'Arial, Helvetica, sans-serif'
        },
        {
            pos: { x: 100, y: 100 },
            txt: 'This is the second line',
            size: 30,
            color: 'blue',
            font: 'Arial, Helvetica, sans-serif'
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
    updateSelectedLine(--gMeme.selectedLineIdx)
}

function changeFont(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font
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