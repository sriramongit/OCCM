import { candidates } from "../data/candidates.js";

const name = document.querySelector('.input-name');
const rollNo = document.querySelector('.input-rollno');
const rank = document.querySelector('.input-rank');
const choice = document.querySelector('.input-choice');

let branches = [];

const addCadidate_btn = document.querySelector('.btn-addCandidate');
const removeCandidate = document.querySelector('.btn-removeCandidate')

let preview_name = document.querySelector('.credential-name');
let preview_rollno = document.querySelector(".credential-rollno");
let preview_rank = document.querySelector(".credential-rank");
let preview_branches = document.querySelector(".credential-branches");
let addChoice = document.querySelector(".btn-add-choice")


function validateError(error) { 
  if (error === 'empty field error') {
    setTimeout(() => {
      document.querySelector(".error").innerHTML = "";
    }, 1000);

    document.querySelector(".error").innerHTML = "Enter all fields first";
  } else { 
    setTimeout(() => {
      document.querySelector(".success").innerHTML = "";
    }, 4000);
    document.querySelector(".success").innerHTML = `Candidate added with ${choice.value.toUpperCase()} as choice 1`;
  }
}

function updatePreview() {
  preview_name.innerHTML = `Name: ${name.value.toUpperCase()}`;
  preview_rollno.innerHTML = `Roll No: ${rollNo.value}`;
  preview_rank.innerHTML = `Rank: ${rank.value}`;
  preview_branches.innerHTML = `Choices: ${choice.value.toUpperCase()}`;
}

name.addEventListener('input', updatePreview);
rollNo.addEventListener('input', updatePreview);
rank.addEventListener('input', updatePreview);
choice.addEventListener('change', updatePreview);


addCadidate_btn.addEventListener('click', () => { 
  //validating error if fields are empty
  if (name.value === '' || rollNo.value === '' || rank.value === '' || choice.value === '') {
    const error = 'empty field error';
    validateError(error);
    return;
  } else { 
    const error = 'no error';
    validateError(error)
  }

  preview_name.innerHTML = `Name: ${name.value.toUpperCase()}`
  preview_rollno.innerHTML = `Roll No: ${rollNo.value}`
  preview_rank.innerHTML = `Rank: ${rank.value}`
  preview_branches.innerHTML = `Choices: ${choice.value.toUpperCase()}`
  

  let candidateCredentials = {
    name: name.value,
    roll_no: rollNo.value,
    rank: rank.value,
    choices: {
      1: choice.value,
    }
  };

  candidates.push(candidateCredentials);
  console.log(candidates);

})

addChoice.addEventListener('click', () => { 
  choice.value = '';
})

removeCandidate.addEventListener('click', () => { 
  name.value = '';
  rollNo.value = '';
  rank.value = '';
  choice.value = '';

  preview_name.innerHTML = "Name:";
  preview_rollno.innerHTML = "Roll No:";
  preview_rank.innerHTML = "Rank:";
  preview_branches.innerHTML = `Branch:`;
})


