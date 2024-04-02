const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

function createCard(cardName, cardPicture, cardOpen ) {
	const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
	const cardTitle = cardElement.querySelector('.card__title');
	const cardImg = cardElement.querySelector('.card__image');
	const delButton = cardElement.querySelector('.card__delete-button');
	cardTitle.textContent = cardName;
	cardImg.alt = cardName;
	cardImg.src = cardPicture;
	delButton.addEventListener('click', () => deleteCard(cardElement));
	placesList.addEventListener('click', likeCard);
	placesList.addEventListener('click', cardOpen);
	return cardElement;
}

function deleteCard(card) {
	card.remove()
}

function likeCard(evt) {
	if (evt.target.classList.contains('card__like-button')) {
		evt.target.classList.toggle('card__like-button_is-active');
	}
}

export { createCard }