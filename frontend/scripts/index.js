import { candidates } from "../../data/candidates.js";

const name = document.querySelector('.input-name');
const rollNo = document.querySelector('.input-rollno');
const rank = document.querySelector('.input-rank');
const choice = document.querySelector('.input-choice');

let candidateName = "";
let duplicateRank = false;
let duplicateCandidateName = "";

const addCadidate_btn = document.querySelector('.btn-addCandidate');
const removeCandidate = document.querySelector('.btn-removeCandidate')

let preview_name = document.querySelector('.credential-name');
let preview_rollno = document.querySelector(".credential-rollno");
let preview_rank = document.querySelector(".credential-rank");
let preview_branches = document.querySelector(".credential-branches");
let addChoice = document.querySelector(".btn-add-choice");

let candidateCredentials = {}; 


function validateError(message) { 

    if (message === `${duplicateCandidateName} already exists with the rank ${rank.value}. Please add genuine/distinct ranks to avoid conflicts`) { 
      setTimeout(() => {
        document.querySelector(".error").innerHTML = "";
      }, 5000);

      document.querySelector(".error").innerHTML = message;
      return;
  }
  
    if (
      message ===
      `Candidate with roll no ${rollNo.value} already exists in the candidate list as ${candidateName}. Please add a distinct Roll No!`
    ) {
      setTimeout(() => {
        document.querySelector(".error").innerHTML = "";
      }, 4000);

      document.querySelector(".error").innerHTML = message;
      return;
    }

  if (message === 'Choice already exists! Please choose another branch') { 
    setTimeout(() => {
      document.querySelector(".error").innerHTML = "";
    }, 2000);

    document.querySelector(".error").innerHTML = "Choice already exists!";
    return;
  }
  if (message === 'empty field error') {
    setTimeout(() => {
      document.querySelector(".error").innerHTML = "";
    }, 2000);

    document.querySelector(".error").innerHTML = "Enter all the fields first";
    return;
  } else { 
    setTimeout(() => {
      document.querySelector(".success").innerHTML = "";
    }, 4000);
    document.querySelector(".success").innerHTML = message;
    return;
  }
}

function updatePreview() {
  preview_name.innerHTML = `Name: ${name.value.toUpperCase()}`;
  preview_rollno.innerHTML = `Roll No: ${rollNo.value}`;
  preview_rank.innerHTML = `Rank: ${rank.value}`;

  // Show all choices already added with numbering
  let branches = [];
  if (candidateCredentials.choices) {
    let keys = Object.keys(candidateCredentials.choices);
    // Sort keys numerically to maintain order
    keys.sort((a, b) => Number(a) - Number(b));
    for (let i = 0; i < keys.length; i++) {
      branches.push(`${i + 1}. ${candidateCredentials.choices[keys[i]].toUpperCase()}`);
    }
  }
  // Add the current input if it's not empty and not already present
  if (
    choice.value &&
    (!candidateCredentials.choices ||
      !Object.values(candidateCredentials.choices).includes(choice.value))
  ) {
    branches.push(`${branches.length + 1}. ${choice.value.toUpperCase()}`);
  }
  preview_branches.innerHTML = `Choices: ${branches.join(" ")}`;
}

function clearDetails() { 
  name.value = "";
  rollNo.value = "";
  rank.value = "";
  choice.value = "";

  // preview_name.innerHTML = "Name:";
  // preview_rollno.innerHTML = "Roll No:";
  // preview_rank.innerHTML = "Rank:";
  // preview_branches.innerHTML = `Branch:`;
}

name.addEventListener('input', updatePreview);
rollNo.addEventListener('input', updatePreview);
rank.addEventListener('input', updatePreview);
choice.addEventListener('change', updatePreview);


addCadidate_btn.addEventListener('click', () => { 
  // Reset duplicate flags before checking
  duplicateRank = false;
  duplicateCandidateName = "";

  // Validate error if fields are empty
  if (name.value === '' || rollNo.value === '' || rank.value === '' || choice.value === '') {
    const message = 'empty field error';
    validateError(message);
    return;
  }

  // Check for duplicate roll number
  let exists = false;
  
  candidates.forEach(candidate => {
    if (candidate.roll_no.toString() === rollNo.value) { 
      exists = true;
      candidateName = candidate.name; 
      return;
    }
    if (candidate.rank.toString() === rank.value) {
      duplicateRank = true;
      duplicateCandidateName = candidate.name;
      return;
    }
  });

  if (exists) { 
    const message = `Candidate with roll no ${rollNo.value} already exists in the candidate list as ${candidateName}. Please add a distinct Roll No!`;
    validateError(message);
    return;
  }

  if (duplicateRank) {
    const message = `${duplicateCandidateName} already exists with the rank ${rank.value}. Please add genuine/distinct ranks to avoid conflicts`;
    validateError(message);
    return;
  }

  // Only show success message if candidate is actually added
  const message = `Candidate added with ${choice.value.toUpperCase()} as choice 1`;
  validateError(message);


  //render list on candidate list page on adding the candidate

  preview_name.innerHTML = `Name: ${name.value.toUpperCase()}`
  preview_rollno.innerHTML = `Roll No: ${rollNo.value}`
  preview_rank.innerHTML = `Rank: ${rank.value}`
  preview_branches.innerHTML = `Choices: ${choice.value.toUpperCase()}`

  candidateCredentials = {
    name: name.value,
    roll_no: rollNo.value,
    rank: rank.value,
    choices: {
      1: choice.value,
    }
  };

  candidates.push(candidateCredentials);
  console.log(candidates);
  addChoice.style.opacity = "1";
})

addChoice.addEventListener('click', () => { 
  let key = Object.keys(candidateCredentials.choices);
  let exists = false;

  for (let i = 0; i < key.length; i++) { 
    let ch = candidateCredentials.choices[key[i]];
    if (ch === choice.value) {
      let error = "Choice already exists! Please choose another branch";
      validateError(error);
      exists = true;
      break;
    }
  }

  if (!exists) {
    let numChoice = Object.keys(candidateCredentials.choices).length;
    candidateCredentials.choices[numChoice + 1] = choice.value;
    const message = `${choice.value.toUpperCase()} added as Choice ${numChoice + 1}`
    validateError(message);
    console.log(candidates);
  }
  choice.value = '';
  
  let Branches = `Choices: `;
  for (let i = 0; i < Object.keys(candidateCredentials.choices).length; i++) {
    let ch = candidateCredentials.choices[(i + 1).toString()];
    Branches += `${ch.toUpperCase()} `;
  }
  preview_branches.innerHTML = Branches.trim();


})

removeCandidate.addEventListener('click', clearDetails)



