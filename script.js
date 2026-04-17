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


const titleSection = document.querySelector(".opening") || document.querySelector(".p-opening");

function ArrowScroll() { window.scroll(0, titleSection.offsetHeight * 0.75); }

const topBar = document.querySelector(".top-bar") || document.querySelector(".p-top-bar");
if (topBar != null) {
	let observer = new IntersectionObserver((entries) => {
	if (!entries[0].intersectionRatio > 0) {
		topBar.classList.add("shown");
	} else {
		topBar.classList.remove("shown");
	}
	});
	observer.observe(titleSection);
}


/* function adjustViewportHeight() {
	const viewportHeight = window.innerHeight;
	document.documentElement.style.setProperty("--vh", `${viewportHeight * 0.01}px`);
}
window.addEventListener("resize", adjustViewportHeight); adjustViewportHeight();
// less.addEventListener("modifyVars", adjustViewportHeight); */

function toggleLightMode() { document.body.classList.toggle("light-mode"); }

function OpenHomePage() {
	const lastPageUrl = document.referrer;

	if (lastPageUrl.includes(document.location.host) && lastPageUrl != document.location) { history.back(); } 
	else { window.location.href = "dev-files"; }
}