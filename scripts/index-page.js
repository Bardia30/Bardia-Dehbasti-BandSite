let commentsArray = [
    {
        name: "Connor Walton",
        commentText: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
        timestamp: 1613538000000
    },
    {
        name: "Emilie Beach",
        commentText: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
        timestamp: 1578546000000
    },
    {
        name: "Miles Acosta",
        commentText: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
        timestamp: 1608440400000
    }
];


//a function to return a converted timestamp to local date string
const  convertDate = d => {
    const newDate = new Date(d); //create a new Date object instance with the time set to a specific timestap in numerical format
    const dateConverted = newDate.toLocaleDateString(); //convert to x/xx/xxxx date format
    return dateConverted;
};


//a function that loops through each item in commentsArray
// with .forEach() method and uses displayComment function 
//to render the comments on DOM
const renderCommentsSection = () => {
    commentsArray.forEach((comment) => {
        displayComment(comment);
    });
};





const displayComment = (commentObject) => {
    let name = commentObject.name;
    let comment = commentObject.commentText;
    let date = convertDate(commentObject.timestamp);

    const newParentDiv = document.createElement("div");
    newParentDiv.classList.add("previous-comment");
    sectionParent.appendChild(newParentDiv);
    

    const profilePicDiv = document.createElement("div");
    profilePicDiv.classList.add("previous-comment__pic-placeholder");
    newParentDiv.appendChild(profilePicDiv);
    

    const textParent = document.createElement("div");
    textParent.classList.add("previous-comment__texts");
    newParentDiv.appendChild(textParent);

    const textTopDiv = document.createElement("div");
    textTopDiv.classList.add("previous-comment__texts-top");
    textParent.appendChild(textTopDiv);

    const longParagraph = document.createElement("p");
    longParagraph.classList.add("previous-comment__long-paragraph");
    longParagraph.innerText = comment
    textParent.appendChild(longParagraph);

    const nameUser = document.createElement("p");
    nameUser.classList.add("previous-comment__name");
    nameUser.innerText = name;
    textTopDiv.appendChild(nameUser);

    const dateComment = document.createElement("p");
    dateComment.classList.add("previous-comment__date");
    dateComment.innerText = date;
    textTopDiv.appendChild(dateComment);


    //insert horizantal rule
    const horRule = document.createElement("hr");
    horRule.classList.add("convo-divider");
    sectionParent.appendChild(horRule);
}




const clearCommentsSection = () => {
    const allCommentDivs = sectionParent.querySelectorAll(".previous-comment");
    const allHorRules = sectionParent.querySelectorAll(".convo-divider");
    for (i = 0; i < allCommentDivs.length;i++) {
        allCommentDivs[i].remove();
        allHorRules[i].remove();
    }
}



const sectionParent = document.querySelector(".convo");
//adding comments to commentsArray

const form = document.querySelector(".comment__form");
const button = document.querySelector(".comment__btn");




renderCommentsSection();

const generateTodayDate = () => {
    const todayDate = new Date();
    return todayDate[Symbol.toPrimitive]('number');
}


form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let userName = form.elements.userName.value;
    let userComments = form.elements.userComments.value
    
    

    let dateOfComment = generateTodayDate();

    let newCommentObject = {};
    newCommentObject.name = userName;
    newCommentObject.commentText = userComments;
    newCommentObject.timestamp = dateOfComment;
    commentsArray.unshift(newCommentObject);


    clearCommentsSection(); //fix these 
    renderCommentsSection();

    

    form.reset();
});



