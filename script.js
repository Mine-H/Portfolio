/* Old show/hide content
function toggleHide(idContent, idIcon) {
	let content = document.getElementById(idContent);
	let icon = document.getElementById(idIcon);

	if (content.style.height == "0px") {
		content.style.removeProperty("height");
		icon.innerHTML = "keyboard_arrow_up";
	}
	else {
		content.style.height = "0";
		icon.innerHTML = "keyboard_arrow_down";
	}
}*/

function ToggleHide(selector, iconRef) { // New show/hide content
	let forEachSelected;
	let show = iconRef.dataset.showing;

	if (show == "toggle") {
		forEachSelected = (content) => { content.classList.toggle("shown"); }
	}
	else if (show) {
		forEachSelected = (content) => {
			if (content.dataset.hiddenBy) {
				let newNum = parseInt(content.dataset.hiddenBy) + 1;
				content.dataset.hiddenBy = newNum;
				if (newNum > 0) { content.classList.remove("shown"); }
			}
			else { content.classList.remove("shown"); }
		};
		iconRef.dataset.showing = "";
	}
	else {
		forEachSelected = (content) => {
			if (content.dataset.hiddenBy) {
				let newNum = parseInt(content.dataset.hiddenBy) - 1;
				content.dataset.hiddenBy = newNum;
				if (newNum <= 0) { content.classList.add("shown"); }
			}
			else { content.classList.add("shown"); }
		};
		iconRef.dataset.showing = true;
	}
	document.querySelectorAll(selector).forEach(forEachSelected);

	let temp = iconRef.dataset.nextIcon;
	if (!(temp)) { return; }
	iconRef.dataset.nextIcon = iconRef.innerHTML;
	iconRef.innerHTML = temp;
} // New show/hide content

{ // Title section (arrow scroll button & top bar)
	const titleSection = document.querySelector(".opening") || document.querySelector(".p-opening");
	function ArrowScroll() {
		if (titleSection == null) { return; }
		window.scroll(0, titleSection.offsetHeight * 0.75);
	}

	// Scrolled past title section ? show top bar : hide top bar
	if (titleSection != null) {
		const topBar = document.querySelector(".top-bar") || document.querySelector(".p-top-bar");
		if (topBar != null) {
			let observer = new IntersectionObserver((entries) => {
				if (!entries[0].intersectionRatio > 0)
					{ topBar.classList.add("shown"); }
				else
					{ topBar.classList.remove("shown"); }
			});
			observer.observe(titleSection);

			// Navigation skip
			topBar.querySelectorAll(".hidden-nav > div > p").forEach((navButton) => {
				navButton.innerHTML = navButton.dataset.section;
				navButton.addEventListener("click", e => {
					let tryFindSection = document.getElementById(navButton.dataset.section.toLowerCase().replaceAll(" ", "-"));
					if (tryFindSection == null) { return; }
					window.scroll(0, tryFindSection.getBoundingClientRect().top + window.scrollY - 60);
				});
			});
		}
	}
} // Title section (arrow scroll button & top bar)

function toggleLightMode() { document.body.classList.toggle("light-mode"); }