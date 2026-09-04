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

	if (show == 'toggle') {
		forEachSelected = (content) => { content.classList.toggle('shown'); }
	}
	else if (show) {
		forEachSelected = (content) => {
			if (content.dataset.hiddenBy) {
				let newNum = parseInt(content.dataset.hiddenBy) + 1;
				content.dataset.hiddenBy = newNum;
				if (newNum > 0) { content.classList.remove('shown'); }
			}
			else { content.classList.remove('shown'); }
		};
		iconRef.dataset.showing = "";
	}
	else {
		forEachSelected = (content) => {
			if (content.dataset.hiddenBy) {
				let newNum = parseInt(content.dataset.hiddenBy) - 1;
				content.dataset.hiddenBy = newNum;
				if (newNum <= 0) { content.classList.add('shown'); }
			}
			else { content.classList.add('shown'); }
		};
		iconRef.dataset.showing = true;
	}
	document.querySelectorAll(selector).forEach((content) => {
		forEachSelected(content);
		UpdateTabIndex(content);
	});

	let temp = iconRef.dataset.nextIcon;
	if (!(temp)) { return; }
	iconRef.dataset.nextIcon = iconRef.innerHTML;
	iconRef.innerHTML = temp;
} // New show/hide content

function UpdateTabIndex(parentContent) {
	parentContent.querySelectorAll(
		'.hidden-nav button, .hidden-nav p, .project-card:not(.shown) a'
	).forEach((elem) => { elem.tabIndex = -1; });

	parentContent.querySelectorAll(
		'.hidden-nav.shown > div > button, .hidden-nav.shown > div > div.shown > div > button, .hidden-nav.shown > div > p, .hidden-nav.shown > div > div.shown > div > p, .project-card.shown a'
	).forEach((elem) => { elem.tabIndex = 0; });
}
UpdateTabIndex(document.querySelector('.hidden-nav'));

function EmulateButtonKeyDown(thisElem, event) {
	if(!event.repeat && (event.code=='Space' || event.code=='Enter')) {
		thisElem.onclick();
		event.preventDefault();
	}
}

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
					{ topBar.classList.add('shown'); }
				else
					{ topBar.classList.remove('shown'); }
			});
			observer.observe(titleSection);

			// Navigation skip
			topBar.querySelectorAll(".hidden-nav > div > p").forEach((navButton) => {
				navButton.innerHTML = navButton.dataset.section;
				navButton.addEventListener("click", e => {
					let tryFindSection = document.getElementById(navButton.dataset.section.toLowerCase().replaceAll(" ', '-"));
					if (tryFindSection == null) { return; }
					window.scroll(0, tryFindSection.getBoundingClientRect().top + window.scrollY - 60);
				});
			});
		}
	}
} // Title section (arrow scroll button & top bar)

{ // Add footer section (YouTube, GitHub, & LinkedIn links)
	let footerElem = document.createElement('footer');
	footerElem.innerHTML =
`		<a rel="author external noopener" href="https://www.youtube.com/@HenriqueMatos-is3tl" target="_blank" aria-label="Link to my YouTube account, hosting the videos showcasing each project"><svg class="icon"><use href="icons/symbol-defs.svg#i-youtube"></use></svg></a>
		<a rel="author external noopener" href="https://github.com/Mine-H" target="_blank" aria-label="Link to my GitHub account"><svg class="icon i-github"><use href="icons/symbol-defs.svg#i-github"></use></svg></a>
		<a rel="author external noopener" href="https://www.linkedin.com/in/henrique-matos-14260b284" target="_blank" aria-label="Link to my LinkedIn account"><svg class="icon i-linkedin"><use href="icons/symbol-defs.svg#i-linkedin"></use></svg></a>`;
	document.body.appendChild(footerElem);
} // Add footer section (YouTube, GitHub, & LinkedIn links)

function toggleLightMode() { document.body.classList.toggle('light-mode'); }