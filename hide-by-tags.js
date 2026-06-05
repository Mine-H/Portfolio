{
	document.querySelectorAll(".tag-hider-set a").forEach((hider) => {
		hider.addEventListener("click",
			e => { ToggleHide(hider.dataset.hideTag, hider.children[0]); });

		hider.innerHTML = '<span data-showing="true" data-next-icon="Allow">Hide</span> '
			+ hider.innerHTML;
	});

	document.querySelectorAll(".hiderset-hider").forEach((hider) => {
		hider.addEventListener("click",
			e => { ToggleHide(hider.dataset.hideId + ", .tag-hider-set.shown", hider); });

		hider.dataset.showing = "toggle";
	});

	let activeCard;
	function ActivateCard(thisCard, isMobile) {
		if (window.matchMedia(isMobile ? "(hover: none)" : "(hover: hover").matches) {
			thisCard.classList.add("selected");
			activeCard = thisCard;
		}
	}
	function DeactivateCard(thisCard) {
		thisCard.classList.remove("selected");
		if (activeCard == thisCard) { activeCard == null; }
	}
	const hideActiveCard = () => { DeactivateCard(activeCard) }
	const handleClosure = event => activeCard == null && activeCard.contains(event.target) && hideActiveCard();

	window.addEventListener('click', handleClosure);
	window.addEventListener('focusin', handleClosure);

	// Dynamically build project cards based on data-XYZ
	document.querySelectorAll(".project-card").forEach((card) => {
		let content = card.innerHTML;
		card.textContent = "";
		card.classList.add("shown");
		card.addEventListener("click", ActivateCard(card, true));
		card.addEventListener("mouseenter", ActivateCard(card, false));
		card.addEventListener("mouseleave", DeactivateCard(card, false));

		if (card.dataset.imgSrc) {
			let bg = document.createElement("img");
			bg.src = card.dataset.imgSrc;
			bg.loading = "lazy";
			card.appendChild(bg);
		}

		{
			let titleDiv = document.createElement("div");
			titleDiv.classList.add("ctitle");

			let dateP = document.createElement("p");
			dateP.textContent = card.dataset.endDate;
			if (card.dataset.choice) { dateP.textContent = "Author's Choice, " + dateP.textContent; }
			titleDiv.appendChild(dateP);

			let cardTitle = document.createElement("h2");
			cardTitle.textContent = card.dataset.title;
			titleDiv.appendChild(cardTitle);
			
			card.appendChild(titleDiv);
		}

		{
			let contentDiv = document.createElement("div");
			contentDiv.classList.add("ccontent");

			{
				let tagsDiv = document.createElement("div");
				tagsDiv.classList.add("ctags");

				let tagTypes = [card.dataset.tagsA, card.dataset.tagsB, card.dataset.tagsC];
				// Loops through all tag types
				for (let i = 0; i < tagTypes.length; i++) {
					let tagsList = tagTypes[i].split(", ");
					// Loops through all tags from that type
					for (let j = 0; j < tagsList.length; j++) {
						let tagElem = document.createElement("p");
						tagElem.classList.add("cbg" + (i + 1)); // Colours the tag

						// Adds tag text and card's tag-class target
						tagElem.textContent = tagsList[j];
						card.classList.add("p-" + tagsList[j].toLowerCase());

						tagsDiv.appendChild(tagElem);
					}
				}
				contentDiv.appendChild(tagsDiv);
				contentDiv.innerHTML += content;
			}
			
			card.appendChild(contentDiv);
		}
		
		card.dataset.hiddenBy = "0";

		if (card.dataset.href) {
			let anchor = document.createElement("a");
			anchor.href = card.dataset.href;
			anchor.target = card.dataset.title.replaceAll(" ", "");
			card.appendChild(anchor);
		}
	});
}