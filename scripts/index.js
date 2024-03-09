const mainContent = document.querySelector('.content');
const placesList = mainContent.querySelector('.places__list');
const addButton = mainContent.querySelector('.profile__add-button');
const editButton = mainContent.querySelector('.profile__edit-button');

const popup = document.querySelector('.popup_type_new-card');
const popClose = popup.querySelector('.popup__close');
const saveButton = popup.querySelector('.popup__button');

function addCard(cardName, cardPicture) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = cardName;
  cardElement.querySelector('.card__image').src = cardPicture;

	placesList.addEventListener('click', removeEvent);

  placesList.append(cardElement);
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

  addCard(placeName.value, placeLink.value);
	popup.classList.remove('popup_is-opened');

	placeName.value = '';
	placeLink.value = '';
});

for (let i = 0; i < initialCards.length; i++) { 
  addCard(initialCards[i].name, initialCards[i].link);
}

function removeEvent(e) {
	if(e.target.classList.contains('card__delete-button')) {
		placesList.removeChild(e.target.parentElement);
		placesList.removeChild(placesList);
	}
}