document.addEventListener('DOMContentLoaded', function () {
  // Get the elements
  const showSignUpLink = document.getElementById('showSignUpLink');
  const showSignInLink = document.getElementById('showSignInLink');
  const signInForm = document.getElementById('signInForm');
  const signUpForm = document.getElementById('signUpForm');
  const emailInput = document.getElementById("form2Example1_signup");
  const passwordInput = document.getElementById('form2Example2_signup');
  const confirmPasswordInput = document.getElementById('form2Example2_confirm');
  const passwordHelp = document.getElementById('passwordHelp');
  const emailError = document.getElementById("emailError");
  const submitButton = document.getElementById('submitBtn');
  const successCard = document.getElementById('successCard'); 
  
  // Modal related elements
  const finishButton = document.getElementById('submitcard');
  const modalElement = document.getElementById('LoginSignupModal');

  // Initially disable the submit button
  submitButton.disabled = true;

  // Hide Sign Up form initially
  signUpForm.classList.add('d-none');

  // Show the Sign Up form and hide the Sign In form when Register is clicked
  showSignUpLink.addEventListener('click', function (e) {
    e.preventDefault();
    signInForm.classList.add('d-none');
    signUpForm.classList.remove('d-none');
  });

  // Show the Sign In form and hide the Sign Up form when "Already have an account?" is clicked
  showSignInLink.addEventListener('click', function (e) {
    e.preventDefault();
    signUpForm.classList.add('d-none');
    signInForm.classList.remove('d-none');
  });

  // Email input validation
  emailInput.addEventListener("input", function () {
    if (!emailInput.validity.valid) {
      emailError.classList.remove("d-none"); // Show error message
    } else {
      emailError.classList.add("d-none"); // Hide error message
    }

    validateForm();  // Validate all fields and enable/disable submit button
  });

  // Password validation pattern (at least 8 characters, with one special character)
  const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

  // Show the message when the password input is focused
  passwordInput.addEventListener('focus', function () {
    if (!emailInput.validity.valid) {
      emailInput.focus();  // Bring focus back to email if it's invalid
    } else {
      passwordHelp.classList.remove('d-none');
      passwordHelp.classList.add('show');
    }
  });

  // Validate password
  function validatePassword() {
    return passwordRegex.test(passwordInput.value);
  }

  // Validate confirm password
  function validateConfirmPassword() {
    return confirmPasswordInput.value === passwordInput.value;
  }

  // Prevent focus on password if email is invalid
  passwordInput.addEventListener('focus', function (e) {
    if (!emailInput.validity.valid) {
      e.preventDefault();  // Prevent moving to the password field if email is invalid
      emailInput.focus();  // Keep focus on email
    }
  });

  // Prevent focus from moving to confirm password if the password is invalid
  confirmPasswordInput.addEventListener('focus', function (e) {
    if (!validatePassword()) {
      e.preventDefault();
      e.stopImmediatePropagation();
      passwordInput.focus(); // Keep focus on the password input
    }
  });

  // Validate confirm password when the user types in it
  confirmPasswordInput.addEventListener('input', function () {
    if (validateConfirmPassword()) {
      confirmPasswordInput.classList.remove('is-invalid');
    } else {
      confirmPasswordInput.classList.add('is-invalid');
    }

    validateForm(); // Validate all fields and enable/disable submit button
  });

  // Validate form and enable/disable submit button
  function validateForm() {
    const isEmailValid = emailInput.validity.valid;
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();

    if (isEmailValid && isPasswordValid && isConfirmPasswordValid && emailInput.value && passwordInput.value && confirmPasswordInput.value) {
      submitButton.disabled = false;  // Enable the submit button
    } else {
      submitButton.disabled = true;   // Disable the submit button
    }
  }

  // Submit the form and show success card
  submitButton.addEventListener('click', function (e) {
    e.preventDefault();
    signUpForm.classList.add('d-none');
    signInForm.classList.add('d-none');
    successCard.classList.remove('d-none');
  });

  // Close the modal when the Finish button is clicked
  finishButton.addEventListener('click', function () {
    $('#LoginSignupModal').modal('hide');
  });
});

  document.getElementById('submitcard').addEventListener('click', function() {
    // Get the username value
    let username = document.getElementById('username').value;

    // Get all the checkboxes in the success card
    let checkboxes = document.querySelectorAll('.success .form-check-input');
    let selectedFields = [];

    // Loop through the checkboxes to check which ones are checked
    checkboxes.forEach(function(checkbox) {
      if (checkbox.checked) {
        // Find the label associated with the checkbox and push it to the selectedFields array
        let label = checkbox.closest('.form-check').querySelector('label').textContent;
        selectedFields.push(label);
      }
    });

    // Get the dropdown menu and clear the existing items
    let dropdownMenu = document.querySelector('.dropdown-menu');
    dropdownMenu.innerHTML = ''; // Clear the existing items

    // Always add the "Profile" label at the top
    let profileItem = document.createElement('li');
    let profileText = document.createElement('span');
    profileText.classList.add('dropdown-item');
    profileText.textContent = 'Profile';
    profileItem.appendChild(profileText);
    dropdownMenu.appendChild(profileItem);

    // If there is a username, add it below "Profile"
    if (username) {
      let usernameItem = document.createElement('li');
      let usernameText = document.createElement('span'); 
      usernameText.classList.add('dropdown-item');
      usernameText.textContent = 'Username: ' + username;
      usernameItem.appendChild(usernameText);
      dropdownMenu.appendChild(usernameItem);
    }

    // If there are selected fields, add them below the username
    selectedFields.forEach(function(field) {
      let listItem = document.createElement('li');
      let fieldText = document.createElement('span'); // Use span instead of <a>
      fieldText.classList.add('dropdown-item');
      fieldText.textContent = field;
      listItem.appendChild(fieldText);
      dropdownMenu.appendChild(listItem);
    });

    // If no username or selected fields, just show the "Profile" item without anything below
    if (!username && selectedFields.length === 0) {
      let noInfoItem = document.createElement('li');
      let noInfoText = document.createElement('span');
      noInfoText.classList.add('dropdown-item');
      noInfoText.textContent = 'No information available';
      noInfoItem.appendChild(noInfoText);
      dropdownMenu.appendChild(noInfoItem);
    }
  });
