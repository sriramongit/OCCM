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
                <h5 style="margin-bottom: 5px; margin-top: 8px;">Roll No: ${candidate.roll_no}</h5>
                <h5 style="margin-top: 0px; margin-bottom: 5px;">Rank: ${candidate.rank}</h5>
                <h5 style="margin-top: 5px; margin-bottom: 0;">
                    Choices: ${Object.values(candidate.choices).map((choice) => choice.toUpperCase()).join(", ")}
                </h5>
            </div>          
            <div class="edit-data">
                <button 
                    class="btn btn-reorder-choice-priority" 
                    style="color: white; background-color: green;">
                    Reorder choice priority
                </button>
                <button 
                    class="btn btn-delete-candidate-from-list" 
                    style="background-color: rgb(255, 32, 32); color: white;"
                    data-rollno="${candidate.roll_no}">
                    Delete candidate from list
                </button>
            </div>
        </div>
        `;
    });

    document.querySelector(".candidate-cards").innerHTML = listHTML;

    // Attach delete event listeners after rendering
    document.querySelectorAll('.btn-delete-candidate-from-list').forEach((button) => { 
        const RollNo = button.getAttribute('data-rollno');
        button.addEventListener('click', () => { 
            const index = candidates.findIndex(candidate => candidate.roll_no.toString() === RollNo);
            if (index !== -1) {
                candidates.splice(index, 1);
                localStorage.setItem('candidates', JSON.stringify(candidates)); // Update localStorage
                RenderList();
            }
        });
    });
}

let storedCandidates = localStorage.getItem('candidates');
if (storedCandidates) {
    candidates.length = 0; // Clear the imported array
    JSON.parse(storedCandidates).forEach(c => candidates.push(c));
}

RenderList();

console.log(candidates)

// User adds choices (updates candidateCredentials.choices)
addChoice.addEventListener('click', () => {
  if (choice.value) {
    candidateCredentials.choices[Object.keys(candidateCredentials.choices).length + 1] = choice.value;
    // Optionally update preview
  }
});

// User clicks "Add Candidate" (saves candidate with all choices)
addCadidate_btn.addEventListener('click', () => {
  candidateCredentials.name = name.value;
  candidateCredentials.roll_no = rollNo.value;
  candidateCredentials.rank = rank.value;

  candidates.push(JSON.parse(JSON.stringify(candidateCredentials))); // Deep copy
  localStorage.setItem('candidates', JSON.stringify(candidates));
  // Reset for next candidate
  candidateCredentials = { name: "", roll_no: "", rank: "", choices: {} };
});



