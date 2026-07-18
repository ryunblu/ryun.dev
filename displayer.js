// Elements (script type is module so we good)
const main = document.getElementById("main");
const header = document.getElementById("header");
const aboutButton = document.getElementById("about-button");
const backButton = document.getElementById("back-button");

aboutButton.onclick = () => {toggleMain()}
backButton.onclick = () => {toggleMain()} 

main.style.display = "none";
dealWithMobile();

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