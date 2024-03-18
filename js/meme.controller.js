'use strict'

let gElCanvas
let gCtx
console.log('test')


function onInitCanvas() {
    gElCanvas = document.querySelector('.editor-canvas')
    gCtx = gElCanvas.getContext('2d')
}

function renderSelectedImg() {
    document.querySelector('.main-gallery').style.display = 'none'
    document.querySelector('.main-editor').style.display = 'grid'
    renderMeme()
    renderTxt()
}

function renderMeme() {
    const meme = getMeme()
    const selectedImg = getImage()
    let img = new Image
    img.src = selectedImg.url

    img.onload = () => {
        gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)

        drawText(meme)
    }
}

function onAddText(ev) {
    console.log('Canvas clicked')
}

function onAddLine() {
    const { lines } = getMeme()
    addLine()
    updateSelectedLine(lines.length - 1)
    renderTxt()
    renderMeme()
}

function onSwitchLine() {
    let { selectedLineIdx } = getMeme()
    updateSelectedLine(++selectedLineIdx)
    renderTxt()
    renderMeme()
}

function onChangeTxt(txt) {
    setLineTxt(txt)
    drawText(getMeme())
    renderMeme()
}

function onChangeFontSize(diff) {
    let { lines, selectedLineIdx } = getMeme()
    lines[selectedLineIdx].size += diff

    renderMeme()
}

function drawText(meme) {
    meme.lines.forEach((line, idx) => {
        const originalFillStyle = gCtx.fillStyle
        const originalStrokeStyle = gCtx.strokeStyle

        gCtx.font = `${line.size}px serif`
        gCtx.fillStyle = line.color
        gCtx.strokeStyle = line.color

        const textX = line.pos.x
        const textY = line.pos.y

        if (idx === meme.selectedLineIdx) {
            const textWidth = gCtx.measureText(line.txt).width
            const textHeight = line.size

            const framePadding = 5
            const frameWidth = textWidth + 2 * framePadding
            const frameHeight = textHeight + 2 * framePadding

            const frameX = textX - framePadding
            const frameY = textY - textHeight - framePadding

            gCtx.beginPath()
            gCtx.strokeStyle = 'black'
            gCtx.rect(frameX, frameY, frameWidth, frameHeight)
            gCtx.stroke()
        }

        gCtx.fillText(line.txt, textX, textY)

        gCtx.fillStyle = originalFillStyle
        gCtx.strokeStyle = originalStrokeStyle
    })
}

function renderTxt() {
    const { lines, selectedLineIdx } = getMeme()
    document.querySelector('.line-txt').value = lines[selectedLineIdx].txt
}

function onDownload(elLink) {
    const dataUrl = gElCanvas.toDataURL('image/png')
    elLink.href = dataUrl
}