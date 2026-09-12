// Elements
const startAnim = document.getElementById("HDD-anim");
const HDDIcon2 = document.getElementById("hdd-icon-2");
const header = document.getElementById("header");
const leftNav = document.getElementById("left-nav");
const main = document.getElementById("main");
const logoAnim = document.getElementById("logo-anim");
const aboutButton = document.getElementById("about-button");
const project1Button = document.getElementById("project-1-button");
const project2Button = document.getElementById("project-2-button");
const project3Button = document.getElementById("project-3-button");
const pageMyself = document.getElementById("page-myself");
const pageSnpda = document.getElementById("page-snpda");
const pagePrairie = document.getElementById("page-prairie");
const pageTourney = document.getElementById("page-tourney");
const canvasCat = document.getElementById("canvas-cat");
const clockTxt = document.getElementById("clock-txt-1");
const clockTxt2 = document.getElementById("clock-txt-2");
const footer = document.getElementById("footer");

const developmentMode = false;

aboutButton.onclick = () => {setPage(false, 0); setPath("/Myself")}
project1Button.onclick = () => {setPage(false, 1); setPath("/SN-PDA")}
project2Button.onclick = () => {setPage(false, 2); setPath("/Prairie")}
project3Button.onclick = () => {setPage(false, 3); setPath("/TourneyBoard")}

const catCanvas2D = canvasCat.getContext("2d");
const catSpriteSheet = new Image();
catSpriteSheet.src = "/img/reece/cat_spriteSheet.png";
catSpriteSheet.onload = () => {startCat()}
const spriteLength = 96;
let currFrame = 0;
let frameDelay = 130;
const idleFrames = 13;
let lastFrameTime = 0;

let pageActive = -1;

// Reusable animations
function animIn(elem, animTime, startingScale, delay = 0) {
    elem.getAnimations().forEach(anim => {anim.cancel()});
    elem.style.opacity = 1;
    elem.style.transform = "scale(1)";
    return elem.animate(
        [
            {opacity: 0, transform: `scale(${startingScale})`, easing: "steps(3, end)"},
            {opacity: 1, transform: "scale(1)"},
        ],
        {
            delay: delay,
            duration: animTime,
            fill: "backwards",
        }
    );
}
function animOut(elem, animTime, endingScale, delay = 0) {
    elem.getAnimations().forEach(anim => {anim.cancel()});
    elem.style.opacity = 0;
    elem.style.transform = `scale(${endingScale})`;
    return elem.animate(
        [
            {opacity: 1, transform: "scale(1)", easing: "steps(3, end)"},
            {opacity: 0, transform: `scale(${endingScale})`},
        ],
        {
            delay: delay,
            duration: animTime,
            fill: "backwards",
        }
    );
}
// Animate each child list item w/delay between
function animInChildren(parent, animTime, startingScale) {
    let wait = 100;
    for (const child of parent.children) {
        child.getAnimations().forEach(anim => {anim.cancel()})
        animIn(child, animTime, startingScale, wait);
        wait += 80;
    }
}
// HDD icon animation
function animHDD() {
    animIn(startAnim, 250, 0.9);
    const anim = HDDIcon2.animate(
        [
            {opacity: 0},
            {opacity: 0, offset: 0.299},
            {opacity: 1, offset: 0.4},
            {opacity: 1, offset: 0.499},
            {opacity: 0, offset: 0.5},
            {opacity: 0, offset: 0.799},
            {opacity: 1, offset: 0.8},
            {opacity: 1}
        ],
        {
            delay: 150,
            duration: 1500,
            fill: "forwards",
        }
    )
    anim.finished.then(
        () => {
            animOut(startAnim, 200, 0.9)
        }
    );
}

// Start
window.addEventListener('load', () => {
    logoAnim.style.display = "flex";
    setTimeout(() => {start()}, 300);
})

// Back/Forward
window.addEventListener("popstate", () => {openPageWithLink(false)});

function start() {
    startTime();
    header.style.display = "flex";
    animIn(header, 400, 0.9);
    canvasCat.style.display = "flex";
    animIn(canvasCat, 400, 0.9, 250);
    dealWithMobile();
    showLeftNav();
    openPageWithLink();
    animIn(footer, 400, 0.95);
    // Start listening to window resizing when done with opening anim
    window.addEventListener("resize", () => {dealWithMobile()})
}

// Uses /<link> to open specific page, otherwise open default
function openPageWithLink(firstTime = true) {
    const currentPath = window.location.pathname.replace(/\/+$/, "").toLowerCase();
    if (currentPath === "/myself") {setPage(firstTime, 0); setPath("/Myself")}
    else if (currentPath === "/sn-pda") {setPage(firstTime, 1); setPath("/SN-PDA")}
    else if (currentPath === "/prairie") {setPage(firstTime, 2); setPath("/Prairie")}
    else if (currentPath === "/tourneyboard") {setPage(firstTime, 3); setPath("/TourneyBoard")}
    else {setPage(firstTime, 0); setPath("/Myself")}
}

function setPath(path) {
    if (developmentMode) {return;}
    if (window.location.pathname !== path) {history.pushState(null, "", path)}
}

// Start cat
function startCat() {
    catCanvas2D.clearRect(0, 0, spriteLength, spriteLength);
    let frameX = currFrame * spriteLength;
    catCanvas2D.drawImage(catSpriteSheet, frameX, 0, spriteLength, spriteLength, 0, 0, spriteLength, spriteLength);
    let currTime = performance.now();
    if (currTime - lastFrameTime > frameDelay) {
        currFrame = (currFrame + 1) % idleFrames;
        lastFrameTime = currTime;
    }

    requestAnimationFrame(startCat);
}

// Show left-nav w/anim
function showLeftNav() {
    if (leftNav.style.display === "none" || leftNav.style.display === "") {
        let animTime = 600;
        leftNav.style.display = "flex";
        animIn(leftNav, animTime, 0.95);
        animInChildren(leftNav, animTime, 0.9)
    }
}

// Code to deal with mobile displays
function isMobile() {
    return innerWidth < 600;
}
function dealWithMobile() {
    // TODO: REMAKE
}

function startTime() {
    const targetTimeZone = 'America/Los_Angeles';
    const Rtoday = new Date();
    const Rtime = Rtoday.toLocaleTimeString([], { timeZone: targetTimeZone, hour: '2-digit', minute: '2-digit' });
    const Rdate = Rtoday.toLocaleDateString([], { weekday: 'short' });

    const Ltoday = new Date();
    const Ltime = Ltoday.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const Ldate = Ltoday.toLocaleDateString([], { weekday: 'short' });

    clockTxt.innerHTML =  "my time - " + Rtime + " " + Rdate;
    clockTxt2.innerHTML =  "your time - " + Ltime + " " + Ldate;
    setTimeout(startTime, 1000);
}

function setPage(first = false, page = 0) {
    let loadDelay;
    if (first) {loadDelay = 100}
    else {loadDelay = 150}

    deactivateListItems(loadDelay);

    const oldPage = pageActive;
    pageActive = page;

    switch (oldPage) {
        case -1: // Display page
            main.style.display = "block";
            animIn(main, 600, 0.95);
            dealWithMobile();
            break;
        case 0:
            aboutButton.innerHTML = "Myself";
            aboutButton.classList.remove("list-item-selected")
            const anim1 = animOut(pageMyself, loadDelay - 10, 0.98)
            anim1.finished.then(() => {
                pageMyself.style.display = "none";
            })
            break;
        case 1:
            project1Button.innerHTML = "SN-PDA";
            project1Button.classList.remove("list-item-selected")
            const anim2 = animOut(pageSnpda, loadDelay - 10, 0.98)
            anim2.finished.then(() => {
                pageSnpda.style.display = "none";
            })
            break;
        case 2:
            project2Button.innerHTML = "Prairie";
            project2Button.classList.remove("list-item-selected")
            const anim3 = animOut(pagePrairie, loadDelay - 10, 0.98)
            anim3.finished.then(() => {
                pagePrairie.style.display = "none";
            })
            break;
        case 3:
            project3Button.innerHTML = "TourneyBoard";
            project3Button.classList.remove("list-item-selected")
            const anim4 = animOut(pageTourney, loadDelay - 10, 0.98)
            anim4.finished.then(() => {
                pageTourney.style.display = "none";
            })
            break;
    }
    switch (page) {
        case -1: // Hide page
            const anim = animOut(main, 600, 0.95);
            anim.finished.then(() => {
                main.style.display = "none";
                dealWithMobile();
            });
            break;
        case 0:
            aboutButton.innerHTML = "> Myself <";
            aboutButton.classList.add("list-item-selected")
            setTimeout(() => {
                if (pageActive !== 0) {return;}
                pageMyself.style.display = "flex";
                animIn(pageMyself, 200, 0.98);
                animInChildren(pageMyself, 500, 0.95);
            }, loadDelay);
            break;
        case 1:
            project1Button.innerHTML = "> SN-PDA <";
            project1Button.classList.add("list-item-selected");
            setTimeout(() => {
                if (pageActive !== 1) {return;}
                pageSnpda.style.display = "flex";
                animIn(pageSnpda, 200, 0.98);
                animInChildren(pageSnpda, 500, 0.95);
            }, loadDelay);
            break;
        case 2:
            project2Button.innerHTML = "> Prairie <";
            project2Button.classList.add("list-item-selected");
            setTimeout(() => {
                if (pageActive !== 2) {return;}
                pagePrairie.style.display = "flex";
                animIn(pagePrairie, 200, 0.98);
                animInChildren(pagePrairie, 500, 0.95);
            }, loadDelay);
            break;
        case 3:
            project3Button.innerHTML = "> TourneyBoard <";
            project3Button.classList.add("list-item-selected");
            setTimeout(() => {
                if (pageActive !== 3) {return;}
                pageTourney.style.display = "flex";
                animIn(pageTourney, 200, 0.98);
                animInChildren(pageTourney, 500, 0.95);
            }, loadDelay);
            break;
    }
}

function deactivateListItems(delay){
    aboutButton.classList.add("list-item-deactivated");
    project1Button.classList.add("list-item-deactivated");
    project2Button.classList.add("list-item-deactivated");
    project3Button.classList.add("list-item-deactivated");

    setTimeout(() => {
        aboutButton.classList.remove("list-item-deactivated");
        project1Button.classList.remove("list-item-deactivated");
        project2Button.classList.remove("list-item-deactivated");
        project3Button.classList.remove("list-item-deactivated");
    }, delay);
}