const textField = document.getElementById("textContainer");

const introduction = document.getElementById("pageButtonIntro");
const aboutMe = document.getElementById("pageButtonAboutMe");
const contact = document.getElementById("pageButtonContact");
let currentPage = introduction;

function InsertTextContent(headerText = "Missing title", paragraph = "Missing text"){
    var container = document.createElement('div');

    container.setAttribute('class', 'text-field');
    container.innerHTML = 
        "<h2>" + headerText + "</h2>"+
        "<p>" + paragraph + "</p>"
    ;
    textField.appendChild(container);
}

function ClearTextField(){
    textField.innerHTML = "";
}

function UpdateSelectedPage(){
    ClearTextField();
    introduction.classList.remove("selected-button");
    aboutMe.classList.remove("selected-button");
    contact.classList.remove("selected-button");

    if(currentPage == introduction){
        introduction.setAttribute('class', 'selected-button');

        InsertTextContent(
            "Hello", 
            "My name is Richard wow"
        );
        
    }else if(currentPage == aboutMe) {
        aboutMe.setAttribute('class', 'selected-button');

        InsertTextContent(
            "About me", 
            "I like video games"
        );

        InsertTextContent(
            "WOwow",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
        );

        InsertTextContent(
            "WOwow",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
        );
    }else if(currentPage == contact) {
        contact.setAttribute('class', 'selected-button');

        InsertTextContent(
            "Contacts", 
            "Mail me or smh"
        );
    }
}

introduction.addEventListener("click", ()=>{
    currentPage = introduction;
    UpdateSelectedPage();
})
aboutMe.addEventListener("click", ()=>{
    currentPage = aboutMe;
    UpdateSelectedPage();
})
contact.addEventListener("click", ()=>{
    currentPage = contact;
    UpdateSelectedPage();
})

currentPage = introduction;
UpdateSelectedPage();