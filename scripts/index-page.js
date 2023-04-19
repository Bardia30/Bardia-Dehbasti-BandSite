let commentsArray = [
    // {
    //     name: "Connor Walton",
    //     comment: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
    //     timestamp: 1613538000000
    // },
    // {
    //     name: "Emilie Beach",
    //     comment: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
    //     timestamp: 1578546000000
    // },
    // {
    //     name: "Miles Acosta",
    //     comment: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
    //     timestamp: 1608440400000
    // }
];

let bandSiteCommentsURL= 'https://project-1-api.herokuapp.com/comments';

const api_key = 'fb991a13-3922-4755-8731-2ed260aebdc9';

bandSiteCommentsURL += '?api_key='+api_key;

console.log(bandSiteCommentsURL);



const getComments = () => {
    return axios.get(bandSiteCommentsURL)
    .then(result => {
        return result.data;
    })
}

const addCommentsToArray = () => {
    return getComments().then(responseArray => {
        responseArray.forEach(comment => {
            commentsArray.unshift(comment);
        })
        return commentsArray;
    });
}







//a function to return a converted timestamp to local date string
const  convertDate = d => {
    const newDate = new Date(d); //create a new Date object instance with the time set to a specific timestap in numerical format
    const dateConverted = newDate.toLocaleDateString(); //convert to x/xx/xxxx date format
    return dateConverted;
};



//finding the section with class convo and storing it as a variable with name sectionParent
const sectionParent = document.querySelector(".convo");


//a function that takes in an object as argument
// and creates displays a single comment block on the webpage
const displayComment = (commentObject) => {
    //storing the name, comment and timestamp of each object from the commentsArray
    let name = commentObject.name; 
    let comment = commentObject.comment;
    let date = convertDate(commentObject.timestamp); //converting the timestamp to m/dd/yyyy format
    let likes = commentObject.likes;
    let id = commentObject.id;


    //create a new parent div element called newParentDiv 
    //with class previous-comment and appending it to the sectionParent
    const newParentDiv = document.createElement("div");
    newParentDiv.classList.add("previous-comment");
    sectionParent.appendChild(newParentDiv);
    
    //create a new parent div element called profilePic
    //with class previous-comment__pic-placeholder 
    //and appending it to the newParentDiv
    //note: this is the gray profile pic 
    const profilePicDiv = document.createElement("div");
    profilePicDiv.classList.add("previous-comment__pic-placeholder");
    newParentDiv.appendChild(profilePicDiv);
    

    //another parent div is created do enclose all the texts as children
    //it is appended to newParentDiv (under profilePic)
    const textParent = document.createElement("div");
    textParent.classList.add("previous-comment__texts");
    newParentDiv.appendChild(textParent);



    //a child div is created do enclose name and date as children
    //and it is added to textParent
    const textTopDiv = document.createElement("div");
    textTopDiv.classList.add("previous-comment__texts-top");
    textParent.appendChild(textTopDiv);


    //a paragraph element is created to enclose the commentText and is added to textParent
    const longParagraph = document.createElement("p");
    longParagraph.classList.add("previous-comment__long-paragraph");
    longParagraph.innerText = comment //innerText value is taken dynamically from the current object's property commentText
    textParent.appendChild(longParagraph);
    
    
    //a paragraph element is created to enclose the name and is added to textTopDiv
    const nameUser = document.createElement("p");
    nameUser.classList.add("previous-comment__name");
    nameUser.innerText = name; //innerText value is taken dynamically from the current object's property name
    textTopDiv.appendChild(nameUser);

    //a paragraph element is created to enclose the date and is added to textTopDiv
    const dateComment = document.createElement("p");
    dateComment.classList.add("previous-comment__date");
    dateComment.innerText = date; //innerText value is taken dynamically from the current object's property timestamp
    textTopDiv.appendChild(dateComment);


    const likeSection = document.createElement('div');
    likeSection.classList.add('previous-comment__like-section');
    textParent.append(likeSection);

    const likeCount = document.createElement('p');
    likeCount.classList.add('previous-comment__counter');
    likeCount.innerText = likes;
    likeSection.append(likeCount);

    const likeCounter = document.createElement('img');
    likeCounter.classList.add('previous-comment__like');
    likeCounter.src = './Design-Package/Assets/Icons/SVG/icon-like.svg';
    likeCounter.id = id;
    likeSection.append(likeCounter);

    const deleter = document.createElement('img');
    deleter.classList.add('previous-comment__delete');
    deleter.src = './Design-Package/Assets/Icons/SVG/icon-delete.svg';
    deleter.id = id;
    likeSection.append(deleter);


    

    //a horizantal rule element is created and added beneath the previous-comment div
    const horRule = document.createElement("hr");
    horRule.classList.add("convo-divider");
    sectionParent.appendChild(horRule);
}


//a function that loops through each item in commentsArray
// with .forEach() method and uses displayComment function
//to render the comments on DOM
const displayAllComments = (array) => {
    array.forEach((comment) => {
        displayComment(comment);
    });
};


const showComments = () => {
    return addCommentsToArray().then(arr => {
        displayAllComments(arr);
    })
}



//TODO: function for PUT request 
const deleteLike = (id) => {
    return axios.delete(bandSiteCommentsURL+'/'+id+'')
        .then(res => console.log(res))
        .catch(err => console.error(err.message))
}





showComments().then(res => {
    const deleteButton = document.querySelectorAll('.previous-comment__delete');

    deleteButton.forEach(button => {
        button.addEventListener('click', () => {
            deleteLike(button.id);
        })
    })
})



//a function to clear all the previous-comments divs, and all the horizantal rules that where added
const clearCommentsSection = () => {
    //finds an array of all elements with "previous-comment" class and store it as an variable name allCommentsDivs
    const allCommentDivs = sectionParent.querySelectorAll(".previous-comment");
    //finds an array of all elements with "convo-divider" class and store it as an variable name allCommentsDivs
    const allHorRules = sectionParent.querySelectorAll(".convo-divider");
    //loop through the array created above and delete all comments and hr elements
    allCommentDivs.forEach((comment,i) => {
        comment.remove();
        allHorRules[i].remove();
    })
    commentsArray =[];
}




//adding new comments to commentsArray

//TODO: function to add new comment to the API taking in an object of new comments

const postCommentToAPI = (obj) => {
    return axios.post(bandSiteCommentsURL, obj, {headers : {"Content-Type": "application/json"}})
        .then(result => console.log(result.data));
}



//finding the form, and the button and storing them as variables
const form = document.querySelector(".comment__form");
const button = document.querySelector(".comment__btn");


//we call renderCommentsSection in order to render the 
//three default comments as required upon page reload



//a function that returns today's date in numeric format
//const generateTodayDate = () => {
//     const todayDate = new Date();
//     return todayDate[Symbol.toPrimitive]('number');
// }


//adding an event listener to the form which is fired by the submit event
//i.e. the anonymous callback funciton is triggered when the submit button is clicked
form.addEventListener('submit', (e) => {
    e.preventDefault(); // to prevent the page reload when button is clicked
    
    //storing what the user has typed in the name input and <textarea> (userComment) input
    // as userName and userComment variables
    let userName = form.elements.userName.value;
    let userComments = form.elements.userComments.value;
    
    
    //call generateTodayDate() function and assign it to variable dateOfComment
    //this will be the date that the user has entered the comment
    //let dateOfComment = generateTodayDate();


    //create a new empty obect named newCommentObject with properties name, commentText, ands timestamp
    let newCommentObject = {};
    //the name property value is equal to the value entered by the user in the Name field
    newCommentObject.name = userName;
    //the comment property value is equal to userComments entered by the user
    newCommentObject.comment = userComments;
    //the timestamp property value is equal to dateOfComment which is the today's date converted from numeric format to m/dd/yyyy format
    //newCommentObject.timestamp = dateOfComment;

    // commentsArray.unshift(newCommentObject);
    //instructions to add new comments to the API
    postCommentToAPI(newCommentObject);
    

    //we call clearCommentsSection function to clear all the previously rendered functions 
    //and then call renderCommentsSection function to render the commentsArray which 
    //now includes the newly added comment object entered by the user.  
    clearCommentsSection(); 
    
    setTimeout(()=>{
        showComments();
    }, 200)
    //showComments();

    
    //we use the form method .reset() in order to bring back the values of 
    //input and textarea elements back to default
    form.reset();
});



