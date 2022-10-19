var btnStartEL = document.querySelector('.btn--start');
var countdownEL = document.querySelector(".countdown");
var contentEL = document.getElementsByClassName('content');
var contentState = contentEL[0].getAttribute('data-state');
var questionWrapEL = document.getElementsByClassName('question-wrap');
var answerWrapEL = document.getElementsByClassName('answer-wrap');
var indexQuestions = 0;
var questionEL = document.createElement('h1');
var footerEl =document.querySelector('.footer')
var answerEL;
var inforUserEL=document.getElementsByClassName('inforUser');
let timeleft = 75;
var myTime;
var currentTime = document.querySelector('.currentTime');
var initUser =[]
var inputEL = document.querySelector('.inputUser');
var btnSubmitEL = document.querySelector('.btnSubmit');
var hightScoreEL = document.querySelector('.hight-score');
var listScoreEl= document.querySelector('.list-score');
var btnClearEl=document.querySelector('.btn--clear');
var btnBackEl=document.querySelector('.btn--back');
var scoreEl = document.querySelector('.score');
var questions = [
    { question: "Commonly used data types DO NOT include:", answers: ["1. Strings", "2. Booleans", "3. Alerts", "4. Numbers"], correctAnswer: "3. Alerts" },
    { question: "The condition of an if/else statement is enclosed with ______:", answers: ["1. Quotes", "2. Curly Brackets", "3. Parenthesis", "4. Square Brackets"], correctAnswer: "3. Parenthesis" },
    { question: "Arrays in JavaScript can be used to store ____:", answers: ["1. Numbers and Strings", "2. Other Arrays", "3. Booleans", "4. All of the Above"], correctAnswer: "4. All of the Above" },
    { question: "String values must be enclosed within ____ when being assigned to variables", answers: ["1. Commas", "2. Curly Brackets", "3. Quotes", "4. Parenthesis"], correctAnswer: "3. Quotes" },
    { question: "A useful tools used using development and debugging for printing content to debugger is", answers:['1. JavaScript', '2. terminal/bash', '3. for loop', '4. console.log'], correctAnswer: '4. console.log'}
];

function startQuiz () {
    countdown();
    if(contentState==='visible'){
        contentEL[0].style.display="none"
        contentEL[0].dataset.state='hidden'
    }
    indexQuestions = 0;
    createQuiz();

}


function createQuiz() {
    // add question
    answerWrapEL[0].style.display=''
    
    questionEL.classList.add('question');
    questionWrapEL[0].appendChild(questionEL);
    questionEL.innerHTML= questions[indexQuestions].question
    //add element as firstChild
    questionWrapEL[0].prepend(questionEL);
    
    //add answers
    for(var i=0; i<questions[indexQuestions].answers.length; i++) {
        answerEL = document.createElement('button');
        answerWrapEL[0].appendChild(answerEL);
        answerEL.classList.add('answer');
        answerEL.innerHTML= questions[indexQuestions].answers[i]
    }

}

answerWrapEL[0].addEventListener('click',function(event) {
    var buttonEL = event.target
    if(buttonEL.matches('button')){
        var currentQuestion = questions[indexQuestions]
        indexQuestions++;
        answerWrapEL[0].innerHTML='';
        
        if(event.target.innerHTML===currentQuestion.correctAnswer){
            footerEl.innerHTML="Correct!!!"
        }else {
            // if answer is wrong time -10s
            footerEl.innerHTML="Wrong!!!"
            timeleft -= 10;
            if(timeleft<0){
                timeleft=0
                endQuiz();
                return
            }
        }
        footerEl.style.display='Block';

        if(indexQuestions < questions.length) {
            createQuiz()
        } else {
            endQuiz()
        }
        
    }
    
    
});

function endQuiz() {
    // stop time
    currentTime.textContent= timeleft;
    clearInterval(myTime);
    // hide Question & Answer when ended
    questionEL.innerHTML='';
    answerWrapEL[0].style.display='none'
    inforUserEL[0].style.display='block'
}


// store USer
function storeUser(){
    localStorage.setItem('User',JSON.stringify(initUser));
    
}


function renderScore() {
    listScoreEl.textContent=''
    for(var i=0; i<initUser.length;i++) {
        var ScoreItem = document.createElement('li');
        ScoreItem.textContent=initUser[i]
        listScoreEl.append(ScoreItem)
    }
}

btnSubmitEL.addEventListener('click',function() {
    var inputText = inputEL.value + ' ' + timeleft
    initUser.push(inputText)
    storeUser()
    renderScore()
    inforUserEL[0].setAttribute('style','display:none')
    footerEl.setAttribute('style','display:none');
    hightScoreEL.setAttribute('style','display:block');
    inputEL.value=''
});

if(!localStorage.getItem('User')) {
    initUser=[]
} else{
    initUser=JSON.parse(localStorage.getItem('User'));
}


//countdown time
 var countdown = function() {
        timeleft=75
        myTime = setInterval(function() {
        if(timeleft > 0){
            timeleft--
            return countdownEL.innerHTML= timeleft;
        } else if(timeleft<=0){
            timeleft=0
            endQuiz()
        }
    },1000);
}

btnStartEL.addEventListener('click',startQuiz)

// btn Clear
btnClearEl.addEventListener('click',function() {
    localStorage.setItem('User','');
    initUser=[]
    listScoreEl.textContent=''
});

// btn go back
btnBackEl.addEventListener('click',function() {
    hightScoreEL.style.display='none'
    contentEL[0].style.display="block"
    contentEL[0].dataset.state='visible'
    listScoreEl.textContent=''
})

// view hight Score
scoreEl.onclick = (function() {
    hightScoreEL.setAttribute('style','display:block');
    if(contentState==='visible'){
        contentEL[0].style.display="none"
        contentEL[0].dataset.state='hidden'
    }
    renderScore()
})