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

const previewedImg = document.getElementById("previewed-img");
var activeImg = null;

function ChangePreviewSrc(thisImg) {
	previewedImg.src = thisImg.src;
	if (activeImg != null) { activeImg.classList.remove("selected"); }
	thisImg.classList.add("selected");
	activeImg = thisImg;
}


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

const backButton = document.querySelector(".back");
if (backButton != null) {
	backButton.addEventListener("auxclick", e => {
		if (e && (e.which == 2 || e.button == 4)) {
			window.open(backButton.dataset.homepage, 'henriquePortfolioHomepage');
		}
	});
}
function OpenHomePage() {
	const lastPageUrl = document.referrer;

	if (lastPageUrl.includes(document.location.host) && lastPageUrl != document.location) { history.back(); } 
	else { window.location.href = backButton != null ? backButton.dataset.homepage : ""; }
}

document.querySelectorAll(".preview-box > nav > button").forEach((navButton) => {
	navButton.innerHTML = "<p>" + navButton.dataset.section + "</p>";
	navButton.addEventListener("click", e => {
		let tryFindSection = document.getElementById(navButton.dataset.section.toLowerCase());
		if (tryFindSection != null) { window.scroll(0, tryFindSection.getBoundingClientRect().top + window.scrollY - 60); }
	})
});