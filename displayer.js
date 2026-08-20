// Elements
const startAnim = document.getElementById("start-anim");
const HDDIcon2 = document.getElementById("hdd-icon-2");
const header = document.getElementById("header");
const leftNav = document.getElementById("left-nav");
const main = document.getElementById("main");
const footer = document.getElementById("footer");
const aboutButton = document.getElementById("about-button");
const project1Button = document.getElementById("project-1-button");
const project2Button = document.getElementById("project-2-button");
const pageMyself = document.getElementById("page-myself");
const pageSnpda = document.getElementById("page-snpda");
const pagePrairie = document.getElementById("page-prairie");

aboutButton.onclick = () => {setPage(false, 0)}
project1Button.onclick = () => {setPage(false, 1)}
project2Button.onclick = () => {setPage(false, 2)}

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
    header.style.display = "flex";
    animIn(header, 400, 0.9);
    dealWithMobile();
    showLeftNav();
    setPage(true, 0);
    setTimeout(() => {footer.style.display = "block";}, 100);
    // Start listening to window resizing when done with opening anim
    window.addEventListener("resize", () => {dealWithMobile()})
})

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

function setPage(first = false, page = 0) {
    let loadDelay;
    if (first) {loadDelay = 100}
    else {loadDelay = 1000}

    if (pageActive !== page) {
        switch (pageActive) {
            case -1: // Display page
                main.style.display = "block";
                animIn(main, 600, 0.95);
                dealWithMobile();
                break;
            case 0:
                aboutButton.innerHTML = "&nbsp;&nbsp;Myself";
                aboutButton.classList.remove("list-item-selected")
                const anim1 = animOut(pageMyself, 200, 0.98)
                animHDD();
                anim1.finished.then(() => {
                    pageMyself.style.display = "none";
                })
                break;
            case 1:
                project1Button.innerHTML = "&nbsp;&nbsp;SN-PDA";
                project1Button.classList.remove("list-item-selected")
                const anim2 = animOut(pageSnpda, 200, 0.98)
                animHDD();
                anim2.finished.then(() => {
                    pageSnpda.style.display = "none";
                })
                break;
            case 2:
                project2Button.innerHTML = "&nbsp;&nbsp;Prairie";
                project2Button.classList.remove("list-item-selected")
                const anim3 = animOut(pagePrairie, 200, 0.98)
                animHDD();
                anim3.finished.then(() => {
                    pagePrairie.style.display = "none";
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
                aboutButton.innerHTML = "&nbsp;&nbsp;> Myself <";
                aboutButton.classList.add("list-item-selected")
                setTimeout(() => {
                    pageMyself.style.display = "flex";
                    animIn(pageMyself, 200, 0.98);
                    animInChildren(pageMyself, 500, 0.95);
                }, loadDelay);
                break;
            case 1:
                project1Button.innerHTML = "&nbsp;&nbsp;> SN-PDA <";
                project1Button.classList.add("list-item-selected");
                setTimeout(() => {
                    pageSnpda.style.display = "flex";
                    animIn(pageSnpda, 200, 0.98);
                    animInChildren(pageSnpda, 500, 0.95);
                }, loadDelay);
                break;
            case 2:
                project2Button.innerHTML = "&nbsp;&nbsp;> Prairie <";
                project2Button.classList.add("list-item-selected");
                setTimeout(() => {
                    pagePrairie.style.display = "flex";
                    animIn(pagePrairie, 200, 0.98);
                    animInChildren(pagePrairie, 500, 0.95);
                }, loadDelay);
                break;
        }
    }
    pageActive = page;
}