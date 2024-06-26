function openModal(modalElement) {
	modalElement.classList.add('popup_is-opened');
	document.addEventListener('keydown', closeModalEscKey);
	document.addEventListener('click', clickModalOverlay);
}

function closeModal(modalElement) {
	modalElement.classList.remove('popup_is-opened');
	document.removeEventListener('click', clickModalOverlay);
	document.removeEventListener('keydown', closeModalEscKey);
}

function closeModalEscKey(evt) {
	if (evt.key === 'Escape') {
		const popup = document.querySelector('.popup_is-opened');
		closeModal(popup);
	}
}

function clickModalOverlay(evt) {
	const hasClass = evt.target.classList.contains('popup_is-opened');
	if (hasClass) {
		closeModal(evt.target)
	}
}

export { openModal, closeModal }