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