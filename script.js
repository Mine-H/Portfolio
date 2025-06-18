function toggleHide(idContent, idIcon) {
    var content = document.getElementById(idContent);
    var icon = document.getElementById(idIcon);

    if (content.style.height == "0px") {
        content.style.removeProperty("height");
        icon.innerHTML = "keyboard_arrow_up";
    }
    else {
        content.style.height = "0";
        icon.innerHTML = "keyboard_arrow_down";
    }
}

function ArrowScroll() { window.scroll(0, document.querySelector(".opening").offsetHeight * 0.75); }