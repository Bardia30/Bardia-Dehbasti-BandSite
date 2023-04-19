let showsArray = [
    // {
    //     date: "Mon Sept 06 2021",
    //     venue: "Ronald Lane",
    //     location: "San Francisco, CA"
    // },
    // {
    //     date: "Tue Sept 21 2021",
    //     venue: "Pier 3 East",
    //     location: "San Francisco, CA"
    // },
    // {
    //     date: "Fri Oct 15 2021",
    //     venue: "View Lounge",
    //     location: "San Francisco, CA"
    // },
    // {
    //     date: "Sat Nov 06 2021",
    //     venue: "Hyatt Agency",
    //     location: "San Francisco, CA"
    // },
    // {
    //     date: "Fri Nov 26 2021",
    //     venue: "Moscow Center",
    //     location: "San Francisco, CA"
    // },
    // {
    //     date: "Wed Dec 15 2021",
    //     venue: "Press Club",
    //     location: "San Francisco, CA"
    // }
]



const addNewChildElement = (elementType, className, innerText) => {
    let newElement = document.createElement(elementType);
    newElement .classList.add(className);
    newElement .innerText = innerText;
    return newElement;
}

//finding the <div class="shows__right-section"> and assigning it to a variable
const parentDiv = document.querySelector(".shows__right-section");



//a function to return a converted timestamp to local date string
const  convertDate = d => {
    const newDate = new Date(d); //create a new Date object instance with the time set to a specific timestap in numerical format
    const dateConverted = newDate.toDateString(); //convert to x/xx/xxxx date format
    return dateConverted;
};


//looping through each item of showsArray (each item is an object)
const displayShowsArray = (array) => {
    array.forEach(show => {
        let date = convertDate(show.date);
        let place = show.place;
        let location = show.location;
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
        const paragraphVenue = addNewChildElement("p","shows-row__venue", place );
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
    })
}


let bandSiteShowdatesURL = 'https://project-1-api.herokuapp.com/showdates';
const api_key = 'fb991a13-3922-4755-8731-2ed260aebdc9';
bandSiteShowdatesURL += "?api_key="+api_key;



const getShows =() => {
    return axios(bandSiteShowdatesURL)
        .then(response => {
            let showdateArray = response.data;
            showdateArray.forEach(showdate => {
                showsArray.push(showdate);
            })
            return showsArray;
        })
        .then(res => {
            return displayShowsArray(res);
        })
}




//to add the selected state to each row when clicked

const makeHighlight = () => {
    const showRows = document.querySelectorAll('.shows-row'); //return a list of all previously rendered rows
    console.log(showRows);
    //create a undefined variable to later capture the clicked row
    let prevRow;
    //loop through each item of showRows
    showRows.forEach(row => {
        //adding an event listener to each row actived byclick
        row.addEventListener('click', ()=>{
            //checks if there is a row clicked before, i.e. the prevRow is not undefined, 
            //and then removes the class name shows-row--selected sass modifier
            if (prevRow){
                prevRow.classList.remove('shows-row--selected');
            }

            //adds the sass class modifier --selected to make it 'selected' state
            row.classList.add('shows-row--selected');

            //keeps track of the clicked row by assigning it to prevRow variable
            prevRow = row;
        })
    })
}

window.onload = () => {
    getShows().then(res => {
        //console.log(res);
        makeHighlight();
    });
}
