{ // Changing previewed image
	const previewedImg = document.getElementById("previewed-img");
	let activeImg = null;

	function ChangePreviewSrc(thisImg) {
		previewedImg.src = thisImg.src;
		if (activeImg != null) { activeImg.classList.remove("selected"); }
		thisImg.classList.add("selected");
		activeImg = thisImg;
	}

	window.onload = (event) => {
		let previewImages = previewedImg.parentElement.querySelectorAll("div > div > img");
		let isFirst = true;
		previewImages.forEach((selector) => {
			selector.addEventListener("click", e => { ChangePreviewSrc(selector); });
			if (isFirst) { ChangePreviewSrc(selector); isFirst = false; }
		});
	};
} // Changing previewed image