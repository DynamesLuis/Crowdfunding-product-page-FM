const $navBtn = document.querySelector(".nav-btn");
const $backBtn = document.querySelector(".back-btn");
const $bookmarkBtn = document.querySelector(".bookmark-btn");

initEvents();

function initEvents() {
    $navBtn.addEventListener('click', handleMenu);
    $backBtn.addEventListener('click', showRewardModal);
    $bookmarkBtn.addEventListener('click', handleBookmark);
}

function handleMenu() {
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
}

function showRewardModal() {
    const $rewardModal = document.querySelector(".reward");
    $rewardModal.style.display = "block";

    const $closeBtn = $rewardModal.querySelector(".closemodal-btn");
    $closeBtn.addEventListener('click', () => {
        $rewardModal.style.display = "none";
    })
}
function handleBookmark() {
    $bookmarkBtn.classList.toggle("bookmarked");
    const $imgBtn = $bookmarkBtn.querySelector("img");
    if ($bookmarkBtn.classList.contains("bookmarked")) {
        $imgBtn.src = "./images/icon-bookmark-true.svg";
    } else {
        $imgBtn.src = "./images/icon-bookmark.svg";
    }
}