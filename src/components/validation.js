const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}_error`);
  inputElement.classList.add('popup__input_error_active');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input_error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}_error`);
  inputElement.classList.remove('popup__input_error_active');
	inputElement.classList.remove('input_error_underline');
  errorElement.classList.remove('popup__input_error_active');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
	if (inputElement.validity.valueMissing) {
		inputElement.setCustomValidity("Вы пропустили это поле.")
	}
	else {
		inputElement.setCustomValidity("");
	}
	if (inputElement.validity.patternMismatch) {
		inputElement.setCustomValidity(inputElement.dataset.errorMessage);
	} 
	if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
		inputElement.classList.add('input_error_underline');
  } else {
    hideInputError(formElement, inputElement);
  };
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
	const buttonElement = formElement.querySelector('.popup__button');
	toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
			toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};
 const clearValidation = (modalElement) => {
	const elementForms = modalElement.querySelector('.popup__form');
	const elementInputs = Array.from(modalElement.querySelectorAll('.popup__input'));
	elementInputs.forEach((elementInputs) => {
    hideInputError(elementForms, elementInputs);
	});
 }

function hasInvalidInput (inputList) {
	return inputList.some((inputElement) => {
	 return !inputElement.validity.valid;
	})
 }

function toggleButtonState (inputList, buttonElement) {
  if(hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__button-disabled')
  } else {
    buttonElement.classList.remove('popup__button-disabled')
  }
}

export { enableValidation, clearValidation }