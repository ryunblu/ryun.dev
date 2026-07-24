// Elements
const startAnim = document.getElementById("start-anim");
const HDDIcon2 = document.getElementById("hdd-icon-2");
const header = document.getElementById("header");
const leftNav = document.getElementById("left-nav");
const main = document.getElementById("main");
const footer = document.getElementById("footer");
const aboutButton = document.getElementById("about-button");
const project1Button = document.getElementById("project-1-button");
const pageMyself = document.getElementById("page-myself");
const pageSnpda = document.getElementById("page-snpda");

aboutButton.onclick = () => {toggleMain(false, 0)}
project1Button.onclick = () => {toggleMain(false, 1)}

let pageActive = -1;

// Reusable animations
function animIn(elem, animTime, startingScale) {
    elem.getAnimations().forEach(anim => {anim.cancel()});
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
    elem.getAnimations().forEach(anim => {anim.cancel()});
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
// Animate each child list item w/delay between
function animInChildren(parent, animTime) {
    let wait = 100;
    for (const child of parent.children) {
        child.getAnimations().forEach(anim => {anim.cancel()})
        child.style.opacity = "0";
        child.style.transform = "scale(0.9)";
        setTimeout(() => {animIn(child, animTime, 0.9);}, wait)
        wait += 80;
    }
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

    dealWithMobile();
    showLeftNav();
    toggleMain(true, 0);
    setTimeout(() => {footer.style.display = "block";}, 100);
    anim.finished.then(
        () => {
            // Start listening to window resizing when done with opening anim
            window.addEventListener("resize", () => {dealWithMobile()})
            animOut(startAnim, 200, 0.9)
        }
    );
})

// Show left-nav w/anim
function showLeftNav() {
    if (leftNav.style.display === "none" || leftNav.style.display === "") {
        let animTime = 600;
        leftNav.style.display = "flex";
        animIn(leftNav, animTime, 0.9);
        animInChildren(leftNav, animTime)
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
function toggleMain(first = false, page = 0) {
    let animTime;
    if (first) {animTime = 600}
    else {animTime = 250}

    if (pageActive !== page) {
        switch (pageActive) {
            case -1: // Display page
                main.style.display = "block";
                animIn(main, animTime, 0.9);
                dealWithMobile();
                break;
            case 0:
                aboutButton.innerHTML = "&nbsp;&nbsp;Myself";
                aboutButton.classList.remove("list-item-selected")
                const anim1 = animOut(pageMyself, 200, 0.98)
                anim1.finished.then(() => {
                    pageMyself.style.display = "none";
                })
                break;
            case 1:
                project1Button.innerHTML = "&nbsp;&nbsp;SN-PDA";
                project1Button.classList.remove("list-item-selected")
                const anim2 = animOut(pageSnpda, 200, 0.98)
                anim2.finished.then(() => {
                    pageSnpda.style.display = "none";
                })
                break;
        }
        switch (page) {
            case -1: // Hide page
                const anim = animOut(main, animTime, 0.9);
                anim.finished.then(() => {
                    main.style.display = "none";
                    dealWithMobile();
                });
                break;
            case 0:
                aboutButton.innerHTML = "&nbsp;&nbsp;-> Myself";
                aboutButton.classList.add("list-item-selected")
                setTimeout(() => {
                    pageMyself.style.display = "flex";
                    animIn(pageMyself, 200, 0.95);
                    animInChildren(pageMyself, 600);
                }, 200);
                break;
            case 1:
                project1Button.innerHTML = "&nbsp;&nbsp;-> SN-PDA";
                project1Button.classList.add("list-item-selected");
                setTimeout(() => {
                    pageSnpda.style.display = "flex";
                    animIn(pageSnpda, 200, 0.95);
                    animInChildren(pageSnpda, 600);
                }, 200);
                break;
        }
    }
    pageActive = page;
}