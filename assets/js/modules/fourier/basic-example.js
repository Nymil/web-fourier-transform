import drawer from "../drawer/drawer.js";

let amountOfCircles = 1;
let time = 0;
const startingCircleCenter = { x: 300, y: 300 };
const startingCircleRadius = 75 * (4 / Math.PI);
let wave = [];
const waveTypes = ["square", "sawtooth", "triangle"];
let currentWaveType = "square";

let animation = null;

function startAnimation(circleCount = 2) {
    amountOfCircles = circleCount;
    time = 0;
    wave = [];

    animateFrame();
}

function animateFrame() {
    animation = setInterval(() => {
        time = (time + 0.02) % (2 * Math.PI);
        drawer.clearCanvas();
        drawer.drawLine("white", [600, 0, 600, 600], 1)

        let currentCenterCoords = { ...startingCircleCenter };

        for (let i = 0; i < amountOfCircles; i++) {
            const n = calculateNextN(i);
            const currentRadius = calculateCurrentRadius(startingCircleRadius, n);
            try {
                drawer.drawCircle("#6e6e6e", [currentCenterCoords.x, currentCenterCoords.y], Math.abs(currentRadius), 1);
            } catch (e) {}
            const previousCenterCoords = { ...currentCenterCoords };

            currentCenterCoords = calculateNextCenterCoords(previousCenterCoords, currentRadius, n, time);
            drawer.drawLine("white", [previousCenterCoords.x, previousCenterCoords.y, currentCenterCoords.x, currentCenterCoords.y]);
        }


        wave.unshift(currentCenterCoords.y);
        for (let i = 0; i < wave.length - 1; i++) {
            const startY = wave[i];
            const endY = wave[i + 1];
            drawer.drawLine("white", [i + startingCircleCenter.x + 300, startY, i + 1 + startingCircleCenter.x + 300, endY]);
        }

        drawer.drawLine("white", [currentCenterCoords.x, currentCenterCoords.y, 600, currentCenterCoords.y]);

        if (wave.length > 600) {
            wave.pop();
        }
    }, 1000 / 60);
}

function calculateNextCenterCoords(currentCenterCoords, radius, n, time) {
    return {
        x: currentCenterCoords.x + radius * Math.cos(n * time),
        y: currentCenterCoords.y - radius * Math.sin(n * time)
    };
}

function calculateCurrentRadius(radius, n) {
    switch (currentWaveType) {
        case "square":
            return radius / n;
        case "sawtooth":
            return (radius / n) * Math.pow(-1, n + 1);
        case "triangle":
            return (radius / Math.pow(n, 2)) * Math.pow(-1, (n - 1) / 2);
        default:
            throw new Error("Invalid wave type");
    }
}

function calculateNextN(i) {
    switch (currentWaveType) {
        case "square":
            return i * 2 + 1;
        case "sawtooth":
            return i + 1;
        case "triangle":
            return i * 2 + 1;
        default:
            throw new Error("Invalid wave type");
    }
}

function stopAnimation() {
    clearInterval(animation);
}

function setAmountOfCircles(amount) {
    amountOfCircles = amount;
}

function setWaveType(type) {
    if (!waveTypes.includes(type)) {
        throw new Error("Invalid wave type");
    }

    currentWaveType = type;
}

export default { startAnimation, stopAnimation, setAmountOfCircles, setWaveType };
