'use strict'

function onInitGallery() {
    renderGallery()
}

function renderGallery() {
    document.querySelector('.main-gallery').style.display = 'block'
    document.querySelector('.main-editor').style.display = 'none'
    const images = getImages()
    let strHtml =  images.map(img => `
        <img src="${img.url}" onclick="onImgSelect(${img.id})">
    `)
    document.querySelector('.gallery-imgs').innerHTML = strHtml.join('')
}

function onImgSelect(imgId) {
    let img = getImages().find(img => img.id === imgId)
    setImg(img)
    renderSelectedImg(img)
}