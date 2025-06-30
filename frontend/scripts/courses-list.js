import { courses } from "../../data/courses.js";

export function RenderList() { 
    let listHTML = "";

    courses.forEach((course) => { 
        listHTML += ` 
        <div class="candidate-card">
            <div class="image-holder">
                <img class="pfp-icon" src="assets/course-icon.png" alt="pfp">
            </div>
            <div class="candidate-data">
                <h2>${course.name.toUpperCase()}</h2>
                <h5 style="margin-bottom: 5px; margin-top: 8px;">Course & Duration: Btech 4yrs</h5>
                <h5 style="margin-top: 0px; margin-bottom: 5px;">Seats: ${course.seats}</h5>
            </div>          
            <div class="edit-data">
                <button 
                    class="btn" 
                    style="background-color: skyblue; color: white;">
                    Edit Seats
                </button>
                <button
                class="btn btn-delete-course"
                style="background-color: red; color: white">
                Delete Course from list
                </button>
            </div>
        </div>
        `;
    })

    document.querySelector(".candidate-cards").innerHTML = listHTML;
}

RenderList();