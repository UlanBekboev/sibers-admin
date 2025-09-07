const showInputError = (formElement, inputElement, errorMessage) => {
// Find the corresponding error element by using the input's id
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__input_type_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
};

// Check if any input in the list is invalid
const hasInvalidInput = (inputList) => inputList.some((input) => !input.validity.valid);

// Enable or disable the submit button based on form validity
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('form__submit_inactive');
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove('form__submit_inactive');
    buttonElement.disabled = false;
  }
};

// Check if a single input is valid and show/hide error message
const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

// Set event listeners for all inputs in a form
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  const buttonElement = formElement.querySelector('.form__submit');

  // Set initial button state on page load
  toggleButtonState(inputList, buttonElement);

  // Add input event listener to each input
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

// Enable validation for all forms on the page
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((formElement) => setEventListeners(formElement));
};

// Initialize validation
enableValidation();
