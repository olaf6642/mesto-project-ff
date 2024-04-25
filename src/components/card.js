import { addLike, removeLike } from "./api";

const cardTemplate = document.querySelector('#card-template').content;
let cardToDeleteId, cardToDelete;

const deleteCallback = (openModal, popupDelete, cardId, cardElement) => {
	openModal(popupDelete);
	cardToDeleteId = cardId;
	cardToDelete = cardElement;
}

const likeCallback = (cardId, likeButton, likeCounter) => {
	const likeMethod = likeButton.classList.contains('card__like-button_is-active') ? removeLike : addLike;
	likeMethod(cardId) 
					.then((res) => {
						likeCounter.textContent = res.likes.length; 
						likeButton.classList.toggle("card__like-button_is-active"); 
					})
	.catch(err => console.log(err));
}

	function createCard(currentUserId, cardData, openModal, popupDelete, openCard ) {
	const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
	const cardTitle = cardElement.querySelector('.card__title');
	const cardImg = cardElement.querySelector('.card__image');
	const delButton = cardElement.querySelector('.card__delete-button');
	const likeButton = cardElement.querySelector('.card__like-button');
	const likeCounter = cardElement.querySelector('.like__counter');
	cardTitle.textContent = cardData.name;
	cardImg.alt = cardData.name;
	cardImg.src = cardData.link;
	likeCounter.textContent = cardData.likes.length;

	if (cardData.owner._id != currentUserId) {
		delButton.remove();
	} else {
		delButton.addEventListener('click', () => { 
			deleteCallback(openModal, popupDelete, cardData._id, cardElement);
		});
	}

	if(cardData.likes.some(item => item._id === currentUserId)){ 
		likeButton.classList.add("card__like-button_is-active"); 
	}

	likeButton.addEventListener('click', () => { 
		likeCallback(cardData._id, likeButton, likeCounter)
	});
	cardElement.addEventListener('click', openCard);
	return cardElement;
}

function deleteCard(card) {
	card.remove()
}

export { createCard, deleteCard, cardToDeleteId, cardToDelete }