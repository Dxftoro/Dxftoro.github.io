let countDesktop = 3;
let countMobile = 1;
let slideWidth = 1;

let totalImages = 1;
let totalPages = 1;
let currentPage = 1;

function getTranslation() {
    let padding = $('.gallery-slide img').innerWidth() - $('.gallery-slide img').width();
    let translation = currentPage * slideWidth - (slideWidth / 2) + padding * currentPage;
    return translation;
}

function setToDesktop() {
    slideWidth = $(".gallery-slide img").width() * countDesktop;
    totalPages = Math.ceil(totalImages / countDesktop);
    currentPage = 1;
    let translation = getTranslation();
    $(".gallery-wrapper").css("transform", `translateX(-${translation}px)`);
}

function setToMobile() {
    slideWidth = $(".gallery-slide img").width() * countMobile;
    totalPages = Math.ceil(totalImages / countMobile);
    currentPage = 1;
    let translation = getTranslation();
    $(".gallery-wrapper").css("transform", `translateX(-${translation}px)`);
}

window.addEventListener("DOMContentLoaded", function(event){
    slideWidth = $(".gallery-slide img").width() * countMobile;
    totalImages = $(".gallery-slide img").length;
    totalPages = Math.ceil(totalImages / 1);
    let windowWidth = $(window).width();
    if (windowWidth >= 800) setToDesktop();
    else setToMobile();

    console.log("DOM loaded!");
});

$(document).ready(function() {
    slideWidth = $(".gallery-slide img").width() * countMobile;
    totalImages = $(".gallery-slide img").length;
    totalPages = Math.ceil(totalImages / 1);

    let windowWidth = $(window).width();
    if (windowWidth >= 800) setToDesktop();
    else setToMobile();

    $("#total-pages").text(totalPages);

    console.log(currentPage * slideWidth - (slideWidth / 2));

    function updatePager() {
        $("#current-page").text(currentPage);
        $("#total-pages").text(totalPages);
    }

    $(".left-arrow").click(function() {
        if (currentPage > 1) {
            currentPage--;
            let translation = getTranslation();
            console.log(translation);
            $(".gallery-wrapper").css("transform", `translateX(-${translation}px)`);
            updatePager();
        }
    });

    $(".right-arrow").click(function() {
        if (currentPage < totalPages) {
            currentPage++;
            let translation = getTranslation();
            console.log(translation);
            $(".gallery-wrapper").css("transform", `translateX(-${translation}px)`);
            updatePager();
        }
    });

    $(window).resize(function() {
        let windowWidth = $(window).width();
        if (windowWidth >= 800) setToDesktop();
        else setToMobile();
        updatePager();
    });
});