const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

function createCard(cardName, cardPicture, likes, ownerId, cardId, openModal, closeModal, popupDelete, openCard, removeCard, addLike, removeLike ) {
	const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
	const cardTitle = cardElement.querySelector('.card__title');
	const cardImg = cardElement.querySelector('.card__image');
	const delButton = cardElement.querySelector('.card__delete-button');
	const likeButton = cardElement.querySelector('.card__like-button');
	const likeCounter = cardElement.querySelector('.like__counter');
	cardTitle.textContent = cardName;
	cardImg.alt = cardName;
	cardImg.src = cardPicture;
	likeCounter.textContent = likes.length;

	if (ownerId != "7341fc8cf4cc22fe7c6daef9") {
		cardElement.removeChild(delButton);
	}
	delButton.addEventListener('click', () => {
		openModal(popupDelete);
		const confirmDeleteButton = popupDelete.querySelector('.popup__button');
		confirmDeleteButton.addEventListener('click', function () {
			removeCard(cardId);
			closeModal(popupDelete);
			deleteCard(cardElement);
		});
	});

	if (likes.length !=0) {
		likes.forEach(item => {
			if (item._id === "7341fc8cf4cc22fe7c6daef9") {
				likeButton.classList.add('card__like-button_is-active')
			}
		})
	}
	likeButton.addEventListener('click', likeCard(cardId, addLike, removeLike, likeCounter));

	placesList.addEventListener('click', openCard);
	return cardElement;
}

function deleteCard(card) {
	card.remove()
}

const likeCard = (cardId, addLike, removeLike, likeCounter) => (evt) => {
	const condition1 = evt.target.classList.contains('card__like-button');
	const condition2 = evt.target.classList.contains('card__like-button_is-active');
	if (condition1 && !condition2) {
		evt.target.classList.add('card__like-button_is-active');
		addLike(cardId);
		const updCounterUp = Number(likeCounter.textContent) + 1;
		likeCounter.textContent = updCounterUp;
	}
	if (condition2) {
		evt.target.classList.remove('card__like-button_is-active');
		removeLike(cardId);
		const updCounterDown = Number(likeCounter.textContent) - 1;
		likeCounter.textContent = updCounterDown;
	}
}

export { createCard }