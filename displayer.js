let mainVisible = false;
const main = document.getElementById("main");
const aboutButton = document.getElementById("about-button");

aboutButton.onclick = () => {toggleMain()}

main.style.display = "none";

function toggleMain() {
    if (!mainVisible) {
        mainVisible = true;
        main.style.display = "block";
    }
    else {
        mainVisible = false;
        main.style.display = "none";
    }
}