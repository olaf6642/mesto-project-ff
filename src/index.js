import './pages/index.css';
import './scripts/cards.js';
import { openModal, closeModal, openCard } from './components/modal.js'
import { createCard, likeCard } from './components/card.js'
import { initialCards } from './scripts/cards.js'

//константы
const mainContent = document.querySelector('.content');
const placesList = mainContent.querySelector('.places__list');
const addButton = mainContent.querySelector('.profile__add-button');
const editButton = mainContent.querySelector('.profile__edit-button');

const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_new-card');

const profile = document.querySelector('.profile__info')
const profileTitle = profile.querySelector('.profile__title');
const profileDescription = profile.querySelector('.profile__description');

//формы
const profileForm = document.forms.editProfile;
const prName = profileForm.elements.name;
const prDescription = profileForm.elements.description;

const placeForm = document.forms.newPlace;
const placeName = placeForm.elements.placeName;
const link = placeForm.elements.link;

//слушатели
editButton.addEventListener('click', function () {
	openModal(popupEdit)
	prName.value = profileTitle.textContent;
	prDescription.value = profileDescription.textContent;
});

addButton.addEventListener('click', function () {
	openModal(popupAdd)
});

placeForm.addEventListener('submit', function (evt) {
	evt.preventDefault();
	const saveCard = createCard(placeName.value, link.value);
	placesList.prepend(saveCard);
	closeModal(popupAdd);
	placeForm.reset();
});

profileForm.addEventListener('submit', function (evt) {
	evt.preventDefault();
	function editProfile() {
		profileTitle.textContent = prName.value;
		profileDescription.textContent = prDescription.value;
		return profile
	}
	editProfile();
	closeModal(popupEdit);
	placeForm.reset();
});

placesList.addEventListener('click', likeCard);
placesList.addEventListener('click', openCard);

//цикл предзаполнения
for (let i = 0; i < initialCards.length; i++) {
	const createdCard = createCard(initialCards[i].name, initialCards[i].link);
	placesList.append(createdCard);
}