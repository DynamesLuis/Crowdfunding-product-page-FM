const $navBtn = document.querySelector(".nav-btn");
const $backBtn = document.querySelector(".back-btn");
const $bookmarkBtn = document.querySelector(".bookmark-btn");
const $selectBtns = document.querySelectorAll(".select-btn");
const $continueBtns = document.querySelectorAll(".continue-btn");
const $rewardModal = document.querySelector(".reward");

initEvents();

function initEvents() {
    $navBtn.addEventListener('click', handleMenu);
    $backBtn.addEventListener('click', () => showRewardModal(""));
    $bookmarkBtn.addEventListener('click', handleBookmark);
    $selectBtns.forEach($selectBtn => {
        $selectBtn.addEventListener('click', () => showRewardModal($selectBtn.dataset.target));
    });
    $continueBtns.forEach($continueBtn => {
        $continueBtn.addEventListener('click', finishTransaction);
    });
}

function finishTransaction() {
    const $pledgeInput = document.querySelector('article:has(input[type="radio"]:checked) input[type="number"]');
    const pledgeValue = parseInt($pledgeInput.value);
    if (!checkValue($pledgeInput)) {
        return;
    }
    
    const $currentBacked = document.querySelector(".current-backed");
    const text = $currentBacked.childNodes[2].textContent.trim();
    const currentValue = parseInt(text.replace(/,/g, ""), 10);
    const newValue = currentValue + pledgeValue
    $currentBacked.childNodes[2].textContent = newValue.toLocaleString("en-US");

    const $currentBackers = document.querySelector(".current-backers");
    const text2 = $currentBackers.firstChild.textContent.trim();
    let currentValue2 = parseInt(text2.replace(/,/g, ""), 10);
    currentValue2++;
    $currentBackers.firstChild.textContent = currentValue2.toLocaleString("en-US");

    const $progressBar = document.querySelector(".stats-section progress");
    $progressBar.value = newValue;

    updateLeftRewards($pledgeInput.getAttribute("min"));
    closeRewardModal();
    showThanksModal();
}

function showThanksModal() {
    const $thanksModal = document.querySelector(".thanks");
    $thanksModal.style.display = "flex";

    const $closeBtn = $thanksModal.querySelector("button");
    $closeBtn.addEventListener('click', () => $thanksModal.style.display = "none");
}

function updateLeftRewards(pladgeValue) {
    const $article = document.querySelector(`.reward-container article:has(button[data-target="${pladgeValue}"])`);
    if(!$article) return;
    const $p = $article.querySelector("p.left");
   
    let leftValue = parseInt($p.firstChild.textContent);
    leftValue--;
    
    $p.textContent = leftValue;
    const $rewardArticle = document.querySelector(`.reward article:has(input[min="${pladgeValue}"]`)
    const $pReward = $rewardArticle.querySelector("p.left")
    $pReward.firstChild.textContent = leftValue;

    if (leftValue === 0) {
        updateOutOfStock($article, $rewardArticle);
    }

}

function updateOutOfStock(articleMain, articleModal) {
    const buttonSelect = articleMain.querySelector("button");
    buttonSelect.classList.add("out-of-stock")
    buttonSelect.textContent = "Out of Stock"
    articleMain.classList.add("out-of-stock");
    articleModal.classList.add("out-of-stock");
}

function checkValue(input) {
    return input.value >= input.getAttribute("min");
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

function showRewardModal(value) {
    $rewardModal.style.display = "block";

    const $input = $rewardModal.querySelector(`input[data-target="${value}"]`);
    if ($input) {
        $input.checked = true;
    }

    const $closeBtn = $rewardModal.querySelector(".closemodal-btn");
    $closeBtn.addEventListener('click', closeRewardModal);
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

function resetInputs() {
    $inputs = document.querySelectorAll('input[name="option"]');
    $inputs.forEach($input => $input.checked = false);
}

function closeRewardModal() {
    $rewardModal.style.display = "none";
    resetInputs();
}