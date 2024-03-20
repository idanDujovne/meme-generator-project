'use strict'

function onInitGallery() {
    renderGallery()
}

function renderGallery() {
    const images = getImages()
    let strHtml =  images.map(img => `
        <img src="${img.url}" onclick="onImgSelect(${img.id})">
    `)
    document.querySelector('.main-gallery').innerHTML = strHtml.join('')
}

function onImgSelect(imgId) {
    let img = getImages().find(img => img.id === imgId)
    setImg(img)
    renderSelectedImg(img)
}