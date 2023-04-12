const showsArray = [
    {
        date: "Mon Sept 06 2021",
        venue: "Ronald Lane",
        location: "San Francisco, CA"
    },
    {
        date: "Tue Sept 21 2021",
        venue: "Pier 3 East",
        location: "San Francisco, CA"
    },
    {
        date: "Fri Oct 15 2021",
        venue: "View Lounge",
        location: "San Francisco, CA"
    },
    {
        date: "Sat Nov 06 2021",
        venue: "Hyatt Agency",
        location: "San Francisco, CA"
    },
    {
        date: "Fri Nov 26 2021",
        venue: "Moscow Center",
        location: "San Francisco, CA"
    },
    {
        date: "Wed Dec 15 2021",
        venue: "Press Club",
        location: "San Francisco, CA"
    }
]



const addNewChildElement = (elementType, className, innerText) => {
    let newElement = document.createElement(elementType);
    newElement .classList.add(className);
    newElement .innerText = innerText;
    return newElement;
}

//finding the <div class="shows__right-section"> and assigning it to a variable
const parentDiv = document.querySelector(".shows__right-section");

//looping through each item of showsArray (each item is an object)
for (let i = 0; i < showsArray.length; i++){
    //assigning each object's property value to a variable
    let date = showsArray[i].date;
    let venue = showsArray[i].venue;
    let location = showsArray[i].location;

    //creating a new section element and assigning it to a new variable
    //, giving it a new class name
    const newSection = document.createElement("section");
    newSection.classList.add("shows-row");
    

    // create a new h3 element with class shows-row__title for date
    const headerDate = addNewChildElement("h3","shows-row__title",'date');
    newSection.appendChild(headerDate);
    
    
    //create a new p element with class show-row__date
    //and giving it a value from our showsArray
    const paragraphDate = addNewChildElement("h3","shows-row__date",date);
    newSection.appendChild(paragraphDate);

    //create a new h3 element with class shows-row__tile for venue
    const headerVenue = addNewChildElement("h3","shows-row__title",'venue');
    newSection.appendChild(headerVenue);

    //create a new div with class shows-row__venue-location-section
    const childDiv = document.createElement("div");
    childDiv.classList.add("shows-row__venue-location-section");

    //create a new p element for venue and assigning the venue from shows array
    //and adding this element to childDiv
    const paragraphVenue = addNewChildElement("p","shows-row__venue",venue );
    childDiv.appendChild(paragraphVenue);


    //create a new header element for location
    const headerLocation = addNewChildElement("h3","shows-row__title",'location' );
    childDiv.appendChild(headerLocation);

    ////create a new p element for location and assigning the location from shows array
    //and adding this element to childDiv
    const paragraphLocation = addNewChildElement("p", "shows-row__venue", location );
    childDiv.appendChild(paragraphLocation);

    //adding childDiv to newSection
    newSection.appendChild(childDiv);

    //create a new anchor element
    const anchor = document.createElement("a");
    anchor.href = "";
    //create new button element
    const button = document.createElement("button");
    button.classList.add("shows-row__btn");
    button.classList.add("btn");
    button.innerText = 'buy tickets';
    //adding button as child to anchor
    anchor.appendChild(button);

    //adding anchor to newSection parent
    newSection.appendChild(anchor);

    
    //appending the section element as a child to parentDiv
    parentDiv.appendChild(newSection);

    //create a new horizontal rule element with a className of "show-divider"
    // const horizontalRule = document.createElement("hr");
    // horizontalRule.classList.add("show-divider");
    // parentDiv.appendChild(horizontalRule);
}


const showsRow = document.getElementsByClassName('shows-row');

for (let i=0; i<showsRow.length; i++){
    let selectedRow = null;
    showsRow[i].addEventListener('click', (e)=>{
        showsRow[i].classList.add("shows-row--selected")
        selectedRow = e.target;
        if (selectedRow !== null){
            selectedRow.style.backgroundColor = "none";
        };
        
        console.log(selectedRow);
    })
    
}