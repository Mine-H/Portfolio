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


/* function adjustViewportHeight() {
    const viewportHeight = window.innerHeight;
    document.documentElement.style.setProperty("--vh", `${viewportHeight * 0.01}px`);
}
window.addEventListener("resize", adjustViewportHeight); adjustViewportHeight();
// less.addEventListener("modifyVars", adjustViewportHeight); */

function toggleLightMode() { document.body.classList.toggle("light-mode"); }