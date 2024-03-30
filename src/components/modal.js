function openModal(modalElement) {
	modalElement.classList.add('popup_is-opened');
	const popClose = modalElement.querySelector('.popup__close');
	popClose.addEventListener('click', () => { closeModal(modalElement) });
	document.addEventListener('keydown', closeModalEscKey);
	document.addEventListener('click', clickModalOverlay);
}

function closeModal(modalElement) {
	modalElement.classList.remove('popup_is-opened');
	document.removeEventListener('click', clickModalOverlay);
}

function closeModalEscKey(evt) {
	if (evt.key === 'Escape') {
		const popupQ = document.querySelector('.popup_is-opened');
		closeModal(popupQ);
	}
	document.removeEventListener('keydown', closeModalEscKey);
}

function clickModalOverlay(evt) {
	const hasClass = evt.target.classList.contains('popup_is-opened');
	if (hasClass) {
		closeModal(evt.target)
	}
}

function openCard(evt) {
	const isImage = evt.target.classList.contains('card__image');
	if (isImage) { 
		const imgAlt = evt.target.alt;
	const imgSrc = evt.target.src;

	const img = document.querySelector('.popup__image');
	img.src = imgSrc;
	img.alt = imgAlt;

	const caption = document.querySelector('.popup__caption');
	caption.textContent = imgAlt;

	const popupImage = document.querySelector('.popup_type_image');
	openModal(popupImage);
	}
}

export { openModal, closeModal, closeModalEscKey, clickModalOverlay, openCard }