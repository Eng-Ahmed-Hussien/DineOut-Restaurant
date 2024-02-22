const elemToggleFunc = (elem) => elem.classList.toggle("active"),
    elemRemoveFunc = (elem, x) => elem.classList.remove(x),
    elemAddFunc = (elem, x) => elem.classList.add(x),
    _set = (key, value) => localStorage.setItem(key, value),
    _get = (x) => localStorage.getItem(x);


const
    leftBtn = document.getElementById('left'),
    rightBtn = document.getElementById('right'),
    imgsBox = document.querySelectorAll('.about-img'),
    menuTabs = document.querySelector(".menu-tabs"),
    image = document.querySelector(".hero-img"),
    navToggler = document.querySelector(".aside-toggler"),
    themeToggleBtn = document.querySelector("[data-theme-btn]"),
    goTopBtn = document.querySelector("[data-go-top]");
let buttons = document.querySelectorAll(".aside-item"),
    arrOfButtons = Array.from(buttons),
    loading = document.querySelector(".loading");



window.addEventListener("onload", loadingInterval(), AOS.init(), getYear());
window.addEventListener("scroll", scrollRotate);
themeToggleBtn.addEventListener("click", toggleTheme);

if (_get("theme") === "light_theme") {
    elemAddFunc(themeToggleBtn, "active")
    elemRemoveFunc(document.body, "dark_theme");
    elemAddFunc(document.body, "light_theme");
} else {
    elemRemoveFunc(themeToggleBtn, "active");
    elemRemoveFunc(document.body, "light_theme");
    elemAddFunc(document.body, "dark_theme");
}
arrOfButtons.forEach((item) => {
    item.addEventListener("click", (e) => {
        loading.style.display = "block";
        setTimeout((e) => {
            loading.style.display = "none";
            item.style.display = "flex";
        }, 3150);
        AOS.init();
    });

});

navToggler.addEventListener("click", toggleNav);

function toggleNav() {
    elemToggleFunc(navToggler)
    elemToggleFunc(document.querySelector(".aside"))
}
document.addEventListener("click", function (e) {
    if (e.target.closest(".aside-item")) {
        toggleNav();
    }
});




menuTabs.addEventListener("click", function (e) {
    if (e.target.classList.contains("menu-tab-item") && !e.target.classList.contains("active")) {
        const target = e.target.getAttribute("data-target");
        elemRemoveFunc(menuTabs.querySelector(".active"), "active");
        elemAddFunc(e.target, "active");
        const menuSection = document.querySelector(".menu-section");
        elemRemoveFunc(menuSection.querySelector(".menu-tab-content.active"), "active");
        elemAddFunc(menuSection.querySelector(target), "active");
        AOS.init();
    }
});

function loadingInterval() {
    setTimeout(() => { loading.style.display = "none"; }, 1800)
}
function scrollRotate() {
    if (window.pageYOffset === 0) {
        image.style.transform = "rotate(205deg)";
        elemRemoveFunc(document.querySelector("header"), "active");
        elemRemoveFunc(goTopBtn), "active";

    } else {
        image.style.transform = "rotate(" + (205 + window.pageYOffset / 2) + "deg)";
        elemAddFunc(document.querySelector("header"), "active");
        elemAddFunc(goTopBtn, "active");
    }
}
function getYear() {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    document.querySelector("#displayYear").innerHTML = currentYear;
}



function toggleTheme() {

    elemToggleFunc(themeToggleBtn);

    if (themeToggleBtn.classList.contains("active")) {
        elemRemoveFunc(document.body, "dark_theme");
        elemAddFunc(document.body, "light_theme");
        _set("theme", "light_theme")
        // localStorage.setItem("theme", "light_theme");
    } else {
        elemRemoveFunc(document.body, "light_theme");
        elemAddFunc(document.body, "dark_theme");
        _set("theme", "dark_theme")
        // localStorage.setItem("theme", "dark_theme");
    }

};
function run() {
    idx++;
    changeImage();
}
var idx = 0,
    interval = setInterval(run, 2000);
function changeImage() {
    idx > imgsBox.length - 1 ? idx = 0 : idx < 0 ? idx = imgsBox.length - 1 : setActiveImg(idx);

}

function resetInterval() {
    clearInterval(interval);
    interval = setInterval(run, 2000);
}
function setActiveImg(k) {
    imgsBox.forEach((img) =>
        img.classList.remove('active'));
    imgsBox[k].classList.add('active');
}