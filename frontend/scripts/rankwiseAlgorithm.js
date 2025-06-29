import { courses } from "../../data/courses.js"
import { seatMatrix } from "../../seatMatrix.js";
import { candidates } from "../../data/candidates.js";

//sorting the students rankwise
let rankwise = candidates.sort((a, b) => a.rank - b.rank);

for (let i = 0; i < rankwise.length; i++) {
  let candidate = rankwise[i];
  let choice = Object.values(candidate.choices);

  //iterating through each choice
  innerloop:
  for (let j = 0; j < choice.length; j++) {
    //iterating through each course that the college provides
    for (let k = 0; k < courses.length; k++) {
      //check for seats
      if (choice[j] === courses[k].name && courses[k].seats !== 0) {
        // Optionally assign the course to the candidate here
        seatMatrix.push({
          name: candidate.name,
          candidate_rank: candidate.rank,
          alloted_branch: courses[k].name,
        });

        courses[k].seats -= 1; //decrement the available seats
        break innerloop;
      }
    }
  }
}

console.log(seatMatrix);
