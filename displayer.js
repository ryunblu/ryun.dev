// Elements
const startAnim = document.getElementById("start-anim");
const HDDIcon2 = document.getElementById("hdd-icon-2")
const main = document.getElementById("main");
const header = document.getElementById("header");
const aboutButton = document.getElementById("about-button");
const backButton = document.getElementById("back-button");

aboutButton.onclick = () => {toggleMain()}
backButton.onclick = () => {toggleMain()}

// Reusable window animation
function animWindow(elem, animTime) {
    return elem.animate(
        [
            {opacity: 0, transform: "scale(0.8)", easing: "steps(3, end)"},
            {opacity: 1, transform: "scale(1)", offset: 0.1, ease: "easeIn"},
            {opacity: 1, transform: "scale(1)", offset: 0.9, easing: "steps(2, end)"},
            {opacity: 0, transform: "scale(0.9)"},
        ],
        {
            duration: animTime,
            fill: "forwards",
        }
    );
}

// Opening animation
window.addEventListener('load', () => {
    let animTime = 2500;
    
    const anim = animWindow(startAnim, animTime);
    const hddImageSwapAnim = HDDIcon2.animate(
        [
            {opacity: 0},
            {opacity: 0, offset: 0.399},
            {opacity: 1, offset: 0.4},
            {opacity: 1, offset: 0.499},
            {opacity: 0, offset: 0.5},
            {opacity: 0, offset: 0.799},
            {opacity: 1, offset: 0.8},
            {opacity: 1}
        ],
        {
            duration: animTime,
            fill: "forwards",
        }
    )

    anim.finished.then(
        () => {
            startAnim.style.display = "none";
            dealWithMobile();
        }
    )
})

// Code to deal with mobile displays
window.addEventListener("resize", () => {dealWithMobile()})
function isMobile() {
    return innerWidth < 600;
}
function dealWithMobile() {
    if (main.style.display === "block") {
        if (isMobile()) {
            header.style.display = "none";
            main.style.width = "100vw";
        }
        else {
            header.style.display = "block";
            main.style.width = "calc(100vw - 270px);";
        }
    }
    else {
        header.style.display = "block";
        if (isMobile()) {
            main.style.width = "100vw";
        }
        else {
            main.style.width = "calc(100vw - 270px);";
        }
    }
}

// Display main window or not
function toggleMain() {
    if (main.style.display === "none") {
        main.style.display = "block";
        dealWithMobile();
    }
    else {
        main.style.display = "none";
        dealWithMobile();
    }
}