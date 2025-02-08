import { selectNavigation } from "./modules/navigation/navigation.js";
import drawer from "./modules/drawer/drawer.js";
import basicExample from "./modules/fourier/basic-example.js";

function main() {
    setEventListeners();
    setCanvas();

    startCircleAnimation();    
}

function startCircleAnimation() {
    basicExample.startAnimation();
}

function setEventListeners() {
    setNavigationEventListeners();
    setCircleCountSelectorInput();
    setWaveTypeSelector();
}

function setCanvas() {
    drawer.setCanvas(document.querySelector("section:not(.hidden) canvas"), 1200, 600);
}

function setCircleCountSelectorInput() {
    const input = document.querySelector("#circle-count");
    const increaseButton = document.querySelector("#increase-circle-count");
    const decreaseButton = document.querySelector("#decrease-circle-count");

    const maxCircleCount = 75;

    increaseButton.addEventListener("click", () => {
        input.value = Math.min(maxCircleCount, parseInt(input.value) + 1);
        basicExample.setAmountOfCircles(input.value);
    });

    decreaseButton.addEventListener("click", () => {
        input.value = Math.max(1, parseInt(input.value) - 1);
        basicExample.setAmountOfCircles(input.value);
    });
}

function setWaveTypeSelector() {
    const select = document.querySelector("#type-selection");

    select.addEventListener("change", () => {
        const selectedType = select.value;
        basicExample.setWaveType(selectedType);
        document.querySelector("#circle-count").value = 2;
        basicExample.setAmountOfCircles(2);
    });
}

function setNavigationEventListeners() {
    const navItems = document.querySelectorAll("header nav li");
    navItems.forEach($nav => {
        $nav.addEventListener("click", () => {
            selectNavigation($nav.id);
            setCanvas();
        });
    });
}

main();
