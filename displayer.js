let mainVisible = false;
const main = document.getElementById("main");
const header = document.getElementById("header");
const aboutButton = document.getElementById("about-button");
const backButton = document.getElementById("back-button");
let isMobile = innerWidth < 600;

aboutButton.onclick = () => {toggleMain()}
backButton.onclick = () => {toggleMain()}

main.style.display = "none";

dealWithMobile();
window.addEventListener("resize", () => {dealWithMobile()})

function dealWithMobile() {
    isMobile = innerWidth < 600;

    if (mainVisible) {
        if (isMobile) {
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
        if (isMobile) {
            main.style.width = "100vw";
        }
        else {
            main.style.width = "calc(100vw - 270px);";
        }
    }
}

function toggleMain() {
    if (!mainVisible) {
        mainVisible = true;
        main.style.display = "block";
        dealWithMobile();
    }
    else {
        mainVisible = false;
        main.style.display = "none";
        dealWithMobile();
    }
}