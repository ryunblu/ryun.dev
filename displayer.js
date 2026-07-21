// Elements
const startAnim = document.getElementById("start-anim");
const HDDIcon2 = document.getElementById("hdd-icon-2")
const main = document.getElementById("main");
const header = document.getElementById("header");
const leftNav = document.getElementById("left-nav");
const aboutButton = document.getElementById("about-button");
const backButton = document.getElementById("back-button");

aboutButton.onclick = () => {toggleMain()}
backButton.onclick = () => {toggleMain()}

// Reusable window animations
function animWindowInOut(elem, animTime, startingScale) {
    return elem.animate(
        [
            {opacity: 0, transform: `scale(${startingScale})`, easing: "steps(3, end)"},
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
function animWindowIn(elem, animTime, startingScale) {
    return elem.animate(
        [
            {opacity: 0, transform: `scale(${startingScale})`, easing: "steps(3, end)"},
            {opacity: 1, transform: "scale(1)", offset: 0.1, ease: "easeIn"},
            {opacity: 1, transform: "scale(1)", offset: 0.9, easing: "steps(2, end)"},
            {opacity: 1, transform: "scale(1)"},
        ],
        {
            duration: animTime,
            fill: "forwards",
        }
    );
}
function animWindowOut(elem, animTime, endingScale) {
    return elem.animate(
        [
            {opacity: 1, transform: "scale(1)", easing: "steps(3, end)"},
            {opacity: 1, transform: `scale(${endingScale})`},
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
    
    const anim = animWindowInOut(startAnim, animTime, 0.8);
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
            // Start listening to window resizing when done with opening anim
            window.addEventListener("resize", () => {dealWithMobile()})
        }
    );
})

function showHeader() {
    if (header.style.display === "none" || header.style.display === "") {
        let animTime = 2500;
        header.style.display = "block";
        animWindowIn(leftNav, animTime, 0.9);
    }
}

// Code to deal with mobile displays
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
            showHeader();
            main.style.width = "calc(100vw - 270px);";
        }
    }
    else {
        showHeader();
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
        let animTime = 2500;
        animWindowIn(main, animTime, 0.9);
        dealWithMobile();
    }
    else {
        let animTime = 250;
        const anim = animWindowOut(main, animTime, 0.9);
        anim.finished.then(() => {
            main.style.display = "none";
            dealWithMobile();
        });
    }
}