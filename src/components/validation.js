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
	if (inputElement.validity.patternMismatch) {
		inputElement.setCustomValidity(inputElement.dataset.errorMessage);
	} 
  else {
		inputElement.setCustomValidity("");
	}
	if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
		inputElement.classList.add('input_error_underline');
  } else {
    hideInputError(formElement, inputElement);
  };
};

const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
	const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
			toggleButtonState(inputList, buttonElement);
    });
  });
};


const enableValidation = validationConfig => { 
  const formList = document.querySelectorAll(validationConfig.formSelector);
  formList.forEach((formElement) => { 
    formElement.addEventListener('submit', function(evt) { 
      evt.preventDefault(); 
    }) 
    setEventListeners(formElement, validationConfig); 
 })
}

 const clearValidation = (modalElement, validationConfig) => {
	const elementForms = modalElement.querySelector(validationConfig.formSelector);
  const elementSubmit = modalElement.querySelector(validationConfig.submitButtonSelector);
	const elementInputs = Array.from(modalElement.querySelectorAll(validationConfig.inputSelector));
	elementInputs.forEach((elementInputs) => {
    hideInputError(elementForms, elementInputs);
	});
  elementSubmit.classList.add('popup__button-disabled');
 }

function hasInvalidInput (inputList) {
	return inputList.some((inputElement) => {
	 return !inputElement.validity.valid;
	})
 }

function toggleButtonState (inputList, buttonElement) {
  if(hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__button-disabled');
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove('popup__button-disabled');
    buttonElement.removeAttribute("disabled");
  }
}

export { enableValidation, clearValidation }