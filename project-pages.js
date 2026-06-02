{ // Home button
	const backButton = document.querySelector(".back");
	if (backButton != null) {
		backButton.addEventListener("auxclick", e => {
			if (!(e && (e.which == 2 || e.button == 4))) { return; }
			window.open(backButton.dataset.homepage, 'henriquePortfolioHomepage');
		});
	}
	function OpenHomePage() {
		const lastPageUrl = document.referrer;

		if (lastPageUrl.includes(document.location.host)
			&& lastPageUrl != document.location) { history.back(); } 
		else { window.location.href = backButton != null ? backButton.dataset.homepage : ""; }
	}
} // Home button

{ // Navigation skip
	document.querySelectorAll(".preview-box > nav > button").forEach((navButton) => {
		navButton.innerHTML = "<p>" + navButton.dataset.section + "</p>";
		navButton.addEventListener("click", e => {
			let tryFindSection = document.getElementById(navButton.dataset.section.toLowerCase());
			if (tryFindSection == null) { return; }
			window.scroll(0, tryFindSection.getBoundingClientRect().top + window.scrollY - 60);
		});
	});
} // Navigation skip

{ // Changing previewed image
	const previewedImg = document.getElementById("previewed-img");
	let activeImg = null;

	function ChangePreviewSrc(thisImg) {
		previewedImg.src = thisImg.src;
		if (activeImg != null) { activeImg.classList.remove("selected"); }
		thisImg.classList.add("selected");
		activeImg = thisImg;
	}
} // Changing previewed image