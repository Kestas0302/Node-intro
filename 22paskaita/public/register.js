'use strict';

const form = document.forms[0];
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  const newUser = {
    email: emailInput.value,
    password: passwordInput.value,
  };

  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUser),
  };

  emailInput.value = '';
  passwordInput.value = '';

  fetch('http://localhost:3000/v1/auth/register', option)
    .then((res) => res.json())
    .then((response) => console.log(response))
    .catch((err) => console.log(err));
});