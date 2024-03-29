'use strict'

let gElCanvas
let gCtx

function onInitCanvas() {
    gElCanvas = document.querySelector('.editor-canvas')
    gCtx = gElCanvas.getContext('2d')
}

function renderSelectedImg(img) {
    document.querySelector('.main-gallery').style.display = 'none'
    document.querySelector('.main-editor').style.display = 'grid'
    resizeCanvas(img)
    renderMemeAndText()
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

function resizeCanvas() {
    let img = new Image
    const canvasHeight = (img.height + gElCanvas.width) / img.width
    gElCanvas.height = canvasHeight
}

function onAlignTxt(align) {
    const { lines, selectedLineIdx } = getMeme()
    const text = lines[selectedLineIdx].txt

    gCtx.font = `${lines[selectedLineIdx].size}px ${lines[selectedLineIdx].font}`
    const textWidth = gCtx.measureText(text).width

    switch (align) {
        case 'right':
            lines[selectedLineIdx].pos.x = gElCanvas.width - textWidth - 10
            break
        case 'center':
            lines[selectedLineIdx].pos.x = (gElCanvas.width - textWidth) / 2
            break
        case 'left':
            lines[selectedLineIdx].pos.x = 10
            break
        case 'up':
            lines[selectedLineIdx].pos.y = 40
            break
        case 'down':
            lines[selectedLineIdx].pos.y = gElCanvas.height - 40
            break
        default:
            break
    }
    renderMeme()
}


function onRemoveLine() {
    removeLine()
    renderMemeAndText()
}

function onAddLine() {
    const { lines } = getMeme()
    addLine()
    updateSelectedLine(lines.length - 1)
    renderMemeAndText()
}

function onSwitchLine() {
    let { selectedLineIdx } = getMeme()
    updateSelectedLine(++selectedLineIdx)
    renderMemeAndText()
}

function onChangeFont(font) {
    changeFont(font)
    renderMemeAndText()
}

function onChangeTxt(txt) {
    const meme = getMeme()
    setLineTxt(txt)
    drawText(meme)
    renderMeme()
}

function onChangeFontSize(diff) {
    let { lines, selectedLineIdx } = getMeme()
    lines[selectedLineIdx].size += diff

    renderMeme()
}

function onCanvasClick(ev) {
    const { offsetX, offsetY } = ev
    const { lines } = getMeme()

    lines.forEach((line, idx) => {
        const textWidth = gCtx.measureText(line.txt).width
        const textHeight = line.size

        const minX = line.pos.x
        const minY = line.pos.y - textHeight
        const maxX = line.pos.x + textWidth
        const maxY = line.pos.y

        if (offsetX >= minX && offsetX <= maxX &&
            offsetY >= minY && offsetY <= maxY) {

            updateSelectedLine(idx)
            renderMemeAndText()
        }
    })
}

function drawText(meme) {
    meme.lines.forEach((line, idx) => {
        const originalFillStyle = gCtx.fillStyle
        const originalStrokeStyle = gCtx.strokeStyle

        gCtx.font = `${line.size}px ${line.font}`
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

function renderMemeAndText() {
    renderMeme()
    renderTxt()
}