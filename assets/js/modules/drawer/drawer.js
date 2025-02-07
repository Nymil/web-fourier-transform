let _$canvas;
let _ctx;

function checkSetup() {
    if (!_$canvas || !_ctx) {
        throw new Error("Initialize canvas to draw on first using setCanvas()");
    }
}

function setCanvas($canvas, width, height) {
    _$canvas = $canvas;
    _$canvas.width = width || 800;
    _$canvas.height = height || 800;
    _ctx = $canvas.getContext("2d");
}

function checkFourNumberArray(name, arr) {
    if (arr.length !== 4 || arr.some(n => typeof n !== "number")) {
        throw new Error(name, "must be an array of 4 numbers");
    }
} 

// line is an array in format of [startX, startY, endX, endY]
function drawLine(color, line, width = 1) {
    checkSetup();
    checkFourNumberArray("line", line);

    _ctx.beginPath();
    _ctx.strokeStyle = color;
    _ctx.lineWidth = width;
    // 0.5 for displaying clearer lines
    _ctx.moveTo(line[0] + 0.5, line[1] + 0.5);
    _ctx.lineTo(line[2] + 0.5, line[3] + 0.5);
    _ctx.stroke();
}

// rect is an array in format of [startX, startY, width, height]
// when width is null, it will draw a filled rectangle
function drawRect(color, rect, width = null) {
    checkSetup();
    checkFourNumberArray("rect", rect);

    _ctx.beginPath();
    width === null ? _ctx.fillStyle = color : _ctx.strokeStyle = color;
    if (width !== null) _ctx.lineWidth = width;
    width === null ? _ctx.fillRect(rect[0], rect[1], rect[2], rect[3]) : _ctx.strokeRect(rect[0] + width / 2, rect[1] + width / 2, rect[2] - width, rect[3] - width);
    _ctx.stroke();
}

function drawCircle(color, center, radius, width = null) {
    checkSetup();
    if (center.length !== 2 || center.some(n => typeof n !== "number")) {
        throw new Error("center must be an array of 2 numbers");
    }
    
    _ctx.beginPath();
    _ctx.strokeStyle = color;
    _ctx.fillStyle = color;

    if (width !== null) {
        _ctx.lineWidth = width;
        _ctx.arc(center[0], center[1], radius - width / 2, 0, 2 * Math.PI);
        _ctx.stroke();
    } else {
        _ctx.arc(center[0], center[1], radius, 0, 2 * Math.PI);
        _ctx.fill();
    }
}

function clearCanvas() {
    drawRect("black", [0, 0, _$canvas.width, _$canvas.height]);
}

export default { setCanvas, drawLine, drawRect, drawCircle, clearCanvas };