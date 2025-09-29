const $navBtn = document.querySelector(".nav-btn");

$navBtn.addEventListener("click", () => {
    const $navMenu = document.querySelector(".nav-menu");
    const $navImg = $navBtn.querySelector("img");
    const displayStatus = window.getComputedStyle($navMenu).display;

    if (displayStatus == "none") {
        $navMenu.style.display = "flex";
        $navImg.src = "./images/icon-close-menu.svg";
    } else {
        $navMenu.style.display = "none";
        $navImg.src = "./images/icon-hamburger.svg";
    }
});