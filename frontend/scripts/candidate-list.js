import { candidates } from "../../data/candidates.js";



let initial = candidates.length;
console.log(initial);

export function RenderList() { 
    let listHTML = "";
    candidates.forEach((candidate) => {

   listHTML += `
   <div class="candidate-card">
    <div class="image-holder">
    <img class="pfp-icon" src="assets/pfp.png" alt="pfp">
    </div>
    <div class="candidate-data">
    <h2>${candidate.name}</h2>
    <h5 style="margin-bottom: 5px; margin-top: 8px;">Roll No: ${
      candidate.roll_no
    }</h5>
    <h5 style="margin-top: 0px; margin-bottom: 5px;">Rank: ${
      candidate.rank
    }</h5>
    <h5 style="margin-top: 5px; margin-bottom: 0;">
    Choices: ${Object.values(candidate.choices)
      .map((choice) => choice.toUpperCase())
      .join(", ")}
    </h5>
    </div>          
    <div class="edit-data">
        <button class="btn" style="color: white; background-color: green;">Reorder choice priority</button>
        <button class="btn" style="background-color: rgb(255, 32, 32); color: white;">Delete candidate from list</button>
    </div>
    </div>
  `;
    });

    document.querySelector(".candidate-cards").innerHTML = listHTML;
}

RenderList();

console.log(candidates)



