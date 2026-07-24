// Elements
const startAnim = document.getElementById("start-anim");
const HDDIcon2 = document.getElementById("hdd-icon-2");
const header = document.getElementById("header");
const leftNav = document.getElementById("left-nav");
const main = document.getElementById("main");
const footer = document.getElementById("footer");
const aboutButton = document.getElementById("about-button");
const backButton = document.getElementById("back-button");

aboutButton.onclick = () => {toggleMain()}
backButton.onclick = () => {toggleMain()}

// Reusable animations
function animIn(elem, animTime, startingScale) {
    return elem.animate(
        [
            {opacity: 0, transform: `scale(${startingScale})`, easing: "steps(3, end)"},
            {opacity: 1, transform: "scale(1)"},
        ],
        {
            duration: animTime,
            fill: "forwards",
        }
    );
}
function animOut(elem, animTime, endingScale) {
    return elem.animate(
        [
            {opacity: 1, transform: "scale(1)", easing: "steps(3, end)"},
            {opacity: 0, transform: `scale(${endingScale})`},
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

    header.style.display = "flex";
    animIn(header, 250, 0.9);
    const anim = HDDIcon2.animate(
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
            dealWithMobile();
            showLeftNav();
            toggleMain(true);
            setTimeout(() => {footer.style.display = "block";}, 100);
            animOut(startAnim, 200, 0.9)
            // Start listening to window resizing when done with opening anim
            window.addEventListener("resize", () => {dealWithMobile()})
        }
    );
})

// Show left-nav w/anim
function showLeftNav() {
    if (leftNav.style.display === "none" || leftNav.style.display === "") {
        let animTime = 600;
        leftNav.style.display = "flex";
        animIn(leftNav, animTime, 0.9);
        // Animate each child list item
        let waitTime = 40;
        for (const child of leftNav.children) {
            child.getAnimations().forEach(anim => {anim.cancel()})
            child.style.opacity = "0";
            child.style.transform = "scale(0.9)";
            setTimeout(() => {animIn(child, animTime, 0.9);}, waitTime)
            waitTime += 60;
        }
    }
}

// Code to deal with mobile displays
function isMobile() {
    return innerWidth < 600;
}
function dealWithMobile() {
    // TODO: REMAKE
}

// Display main window or not
function toggleMain(first = false) {
    let animTime;
    if (first) {animTime = 600}
    else {animTime = 250}
    
    if (main.style.display === "none" || main.style.display === "") {
        main.style.display = "block";
        animIn(main, animTime, 0.9);
        dealWithMobile();
    }
    else {
        const anim = animOut(main, animTime, 0.9);
        anim.finished.then(() => {
            main.style.display = "none";
            dealWithMobile();
        });
    }
}