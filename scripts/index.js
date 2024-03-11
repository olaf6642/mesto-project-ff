const mainContent = document.querySelector('.content');
const placesList = mainContent.querySelector('.places__list');
const addButton = mainContent.querySelector('.profile__add-button');
const editButton = mainContent.querySelector('.profile__edit-button');

const popup = document.querySelector('.popup_type_new-card');
const popClose = popup.querySelector('.popup__close');
const saveButton = popup.querySelector('.popup__button');

function createCard(cardName, cardPicture) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

	const cardTitle = cardElement.querySelector('.card__title');
	const cardImg = cardElement.querySelector('.card__image');

	const delButton = cardElement.querySelector('.card__delete-button');

  cardTitle.textContent = cardName;
	cardImg.alt = cardName;
  cardImg.src = cardPicture;
	
	delButton.addEventListener('click', () => deleteCard(cardElement))

	return cardElement;
}

function deleteCard(card) {
	card.remove()
}

addButton.addEventListener('click', function () { 							
	popup.classList.add('popup_is-opened');
});
	
popClose.addEventListener('click', function () {								
	popup.classList.remove('popup_is-opened');
})
	
saveButton.addEventListener('click', function () { 							
	const placeName = popup.querySelector('.popup__input_type_card-name');
  const placeLink = popup.querySelector('.popup__input_type_url');

  const saveCard = createCard(placeName.value, placeLink.value);
	placesList.append(saveCard);
	popup.classList.remove('popup_is-opened');

	placeName.value = '';
	placeLink.value = '';
});

for (let i = 0; i < initialCards.length; i++) { 
  const createdCard = createCard(initialCards[i].name, initialCards[i].link);
	placesList.append(createdCard);
}