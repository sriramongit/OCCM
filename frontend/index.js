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
    
  }
}


addCadidate_btn.addEventListener('click', () => { 
  //validating error if fields are empty
  if (name.value === '' || rollNo.value === '' || rank.value === '' || choice.value === '') { 
    const error = 'empty field error';
    validateError(error);
    return;
  }

  preview_name.innerHTML = `Name: ${name.value.toUpperCase()}`
  preview_rollno.innerHTML = `Roll No: ${rollNo.value}`
  preview_rank.innerHTML = `Rank: ${rank.value}`
  preview_branches.innerHTML = `Choices: ${choice.value.toUpperCase()}`
})

addChoice.addEventListener('click', () => { 
  branches.push(choice.value);
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


