

function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
var formData = document.querySelectorAll(".formData");
//je cible le bouton de fermeture de la modale
const modalBtnClose = document.querySelector(".close");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
// Ajout d'un évènement au click sur le bouton close et appel de la fonction closeModal
modalBtnClose.addEventListener("click", closeModal);

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

const form = document.getElementById('myForm');
const firstName = document.getElementById('first');
const lastName = document.getElementById('last');
const mail = document.getElementById('email');
const birthdate = document.getElementById('birthdate');
const quantity = document.getElementById('quantity');
const btnRadio = document.querySelectorAll('input[type=radio]');
const conditionG = document.getElementById('checkbox1');
const checked = document.getElementById('Checked');
const submitBtn = document.getElementById('submitBtn');
const textLabel = document.querySelector('.text-label');


const mailValid = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/;
const quantityValid = /^[1-9]$/;

form.addEventListener('submit', function(e) {
  e.preventDefault();
  
  validData();
});


const setError = (element, message) => {
  const formData = element.parentElement;
  const errorDisplay = formData.querySelector('.erreur');

  errorDisplay.innerHTML = message;
  formData.classList.add('erreurMessage');
  formData.classList.remove('success');
}

const setSuccess = (element) => {
  const formData = element.parentElement;
  const errorDisplay = formData.querySelector('.erreur');

  errorDisplay.innerText = "";
  formData.classList.add('success');
  formData.classList.remove('erreurMessage');
}

const validate = () => {
  const firstNameValue = firstName.value.trim();
  const lastNameValue = lastName.value.trim();
  const mailValue = mail.value.trim();
  const birthdateValue = birthdate.value.trim();
  const quantityValue = quantity.value.trim();
  
  if(firstNameValue == "") {
    setError(firstName, 'Le prénom est requis');
  } else if (firstNameValue.length < 2) {
    setError(firstName, "Veuillez entrer 2 caractères ou plus pour le champ du prénom.");
  } else {
    setSuccess(firstName);
  }
  if(lastNameValue == "") {
    setError(lastName, 'Le nom est requis');
  } else if (lastNameValue.length < 2) {
    setError(lastName, "Veuillez entrer 2 caractères ou plus pour le champ du nom.");
  } else {
    setSuccess(lastName);
  }
  if(mailValue == "") {
    setError(mail, 'L\'adresse email est requise');
  } else if (mailValid.test(mailValue) == false) {
    setError(mail, "Votre adresse mail n\'a pas le bon format.")
  } else {
    setSuccess(mail);
  }
  if(birthdateValue == "") {
    setError(birthdate, "Vous devez entrer votre date de naissance.");
  } else {
    setSuccess(birthdate);
  }
  if(quantityValue == "") {
    setError(quantity, 'Veuillez saisir un chiffre');
  } else {
    setSuccess(quantity);
  }
  radioCheckedTrue();
  generalCheckedTrue();

}

const radioCheckedTrue = () => {
  const btnRadio = document.querySelectorAll('input[type=radio]');
  let isFormValid = false;

  for(let i = 0; i < btnRadio.length; i++) {
    if(btnRadio[i].checked) {
      isFormValid = true;
      break;
    }
  }

  if(isFormValid) {
    setSuccess(checked);
  } else {
    setError(checked, "Vous devez choisir une option.");
  }
}

const generalCheckedTrue = () => {
  const conditionG = document.getElementById('checkbox1');
  const check = document.getElementById('check');
  let checkedCondition = false;

  if(conditionG.checked) {
    checkedCondition = true;
    setSuccess(check);
  } else {
    setError(check, "Vous devez vérifier que vous acceptez les termes et conditions.");
  }
}


const validData = () => {
  var dataValid = false;
  var verifChamps = 0;
  const verif = document.querySelectorAll('.formData');
  for(let i = 0; i < verif.length; i++){
    if(verif[i].classList.contains("success")){
      verifChamps += 1;
      if(verifChamps == verif.length){
        dataValid = true;
        const dataFormValid = new FormData(form);
        const formJson = JSON.stringify(Object.fromEntries(dataFormValid));
        localStorage.setItem("dataFormValid", formJson);
        modalSuccess();
      } else {
        validate();
      }
    } 
  }
}

const modalSuccess = () => {
  const modalValid = document.querySelectorAll('.success');
  for(let i = 0; i < modalValid.length; i++) {
    modalValid[i].classList.add('hidden');
  }
  textLabel.classList.add('textValid');
  textLabel.innerHTML = "Merci pour votre inscription";
  submitBtn.value = "Fermer";

  if(submitBtn.value == "Fermer") {
    submitBtn.addEventListener('click', function() {
      closeModal();
      localStorage.removeItem("dataFormValid");
    });
  }
}

