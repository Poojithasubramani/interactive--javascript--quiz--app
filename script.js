//Create a questions array with at least 8 question objects — each with a
///question string, an options array of 4 strings, and the correct answer string

const questions =[
    {
        question:"1. Which DOM method is used to select the first element that matches a given CSS selector?",
        options:["getElementById()","querySelector()","getElementsByClassName()","querySelectorAll()"],
        correctAnswer:"querySelector()"
    },
    {
        question:"2. What is the main purpose of event.preventDefault() when used inside a form submit event?",
        options:["It stops the event from bubbling","It removes the form","It prevents the browser's default form submission behavior","It clears all input values"],
        correctAnswer:"It prevents the browser's default form submission behavior"

    },
    {
        question:"3. Which classList method is used to add a class if it is not present and remove it if it is already present?",
        options:["add()","remove()","toggle()","contains()"],
        correctAnswer:"toggle()" 
    },
    {
        question:"4. When an event moves from the target element upward through its parent elements, which phase of event propagation is this?",
        options:["Capturing","Bubbling","Loading","Rendering"],
        correctAnswer:"Bubbling"
    },
    {
        question:"5. You have an array of objects containing product prices. Which array method is most suitable when you want to create a new array containing only products whose price is greater than 1000?",
        options:["map()","filter()","reduce()","find()"],
        correctAnswer:"filter()"
    },
    {
        question:"6. You have an array of numbers and need to calculate the total of all the numbers. Which method is most suitable?",
        options:["forEach()","filter()","reduce()","find()"],
        correctAnswer:"reduce()"
    },
    {
        question:"7. Which CSS position value makes an element behave like a relatively positioned element until a specified scroll position is reached, after which it sticks in place?",
        options:["absolute","fixed","sticky","static"],
        correctAnswer:"sticky"
    },
    {
        question:" 8. You are creating a CSS Grid layout and want to control the space between rows and columns. Which property is most suitable?",
        options:["padding","margin","gap","spacing"],
        correctAnswer:"gap"
    }
];
    let totalIndex = questions.length-1;

    //Hidden scorecontainer - After Finished Quizz ScoreContainer Will Displayed

    let scoreContainer = document.querySelector("#scorecontainer");
    scoreContainer.hidden=true;


    //Render the current question text and 4 option buttons dynamically to the page 
    // using currentIndex=0
   
    let currentIndex=0;
    let scoreValue=0;

    function dynamicPageContent(currentIndex){
        const quiz=document.querySelector("#quizz");
        quiz.textContent=questions[currentIndex].question;
        const options=document.querySelector("#options");
        const optionArray = questions[currentIndex].options;
        const nextBtn = document.querySelector("#nextBtn");
        const quizRange=document.querySelector("#quizRange");
        const scoreCard=document.querySelector("#scoreCard");
        nextBtn.hidden=true;
        options.innerHTML=""; 
        let correctButton;
    
        optionArray.forEach((option)=>{
            const button = document.createElement("button");
            button.classList.add("btn", "btn-outline-secondary","text-start","py-2","px-3","fw-medium");
            options.appendChild(button);
            button.textContent=option;
            let isCorrect = questions[currentIndex].correctAnswer;

            if(option===isCorrect){
                correctButton=button;
            }
            button.addEventListener("click",function(){
                if(isCorrect===option){
                    button.style.backgroundColor="green";                
                    button.style.color="white";
                    
                    //Each Correct Score is  incremented by 5
                    scoreValue+=5;
                    scoreCard.textContent="🏆Score:"+scoreValue;
                    button.disabled=true;
                }
                else {
                    button.style.backgroundColor="red";
                    button.style.color="white";
                    button.disabled=true;
                    setTimeout(() => {
                        correctButton.style.backgroundColor="green";
                        correctButton.style.color="white";
                        correctButton.disabled=true;
                    }, 500);
                }
            //Call Final Score Screen Page

            showFinalScreen(currentIndex);
            

            });
        })
    }

    // Call Function when Page Loaded
    dynamicPageContent(currentIndex) ;   
    

    //After the Quizz Update Final Score Screen

    function showFinalScreen(currentIndex){
        setTimeout(() => {
            if(currentIndex==totalIndex){
                nextBtn.hidden=true;
                let quizblock=document.querySelector(".quizblock");
                quizblock.hidden = true;
                scoreContainer.hidden=false;
                scoreContainer.classList.remove("d-none");
                scoreContainer.classList.add("d-flex");
                let scored = document.querySelector("#scored")
                scored.textContent=`You Scored ${scoreValue} out of 40`;
                scored.nextElementSibling.textContent=`${scoreValue}`;

                //Feedback Message Based on Score
                let feedbackTitle = document.querySelector("#feedbacktitle");
                if(scoreValue===0){
                    feedbackTitle.textContent="Better Luck Next Time! 🌱";
                    feedbackTitle.nextElementSibling.textContent="Don’t worry about the score! Keep learning, practice more, and try again. You can do better!";
                }
                else if(scoreValue>=5 && scoreValue<15){
                    feedbackTitle.textContent=" Needs Improvement 📚";
                    feedbackTitle.nextElementSibling.textContent="Good attempt! You need a little more practice. Review the concepts and try again!";
                }
                    else if(scoreValue>=15 && scoreValue<25){
                    feedbackTitle.textContent=" Good Effort! 😊";
                    feedbackTitle.nextElementSibling.textContent="Good effort! You’re doing well. Practice a little more to improve your score!";
                } else if(scoreValue>=25 && scoreValue<=35){
                    feedbackTitle.textContent="  Very Good! 👍";
                    feedbackTitle.nextElementSibling.textContent="Very good! You have a good understanding of the concepts. Keep improving!";
                } else if(scoreValue>35){
                    feedbackTitle.textContent="Excellent! 🎉";
                    feedbackTitle.nextElementSibling.textContent="Outstanding! You answered all the questions correctly. Excellent work!"                    
                }

                // Reloaded into first index page
                let restartBtn = document.querySelector("#restartbtn");
                restartBtn.addEventListener("click",()=>{
                    location.reload();
                })
            }
            else{
            nextBtn.hidden=false;
            }
        }, 1000);

    }

    //Progress Bar Update

    let currentQuestion=1;
    let totalQuestion =8;

    function updateProgress(currentQuestion,totalQuestion){
        let progressBar = document.getElementById("quizProgress");
        let percentage = (currentQuestion/totalQuestion)*100;
        progressBar.style.width=percentage +"%";
    }

    //Add a 'Next Question' button that advances to the next question using
    //an index variable — disable or hide it until an option is selected.

    nextBtn.addEventListener("click",function(){
        currentIndex++;
        currentQuestion++;
        quizRange.textContent=currentQuestion;
        dynamicPageContent(currentIndex) ; 
        updateProgress(currentQuestion,totalQuestion);  
    });