// select elemant 
let countBullet = document.querySelector(".count span");
let bullet = document.querySelector(".bollets")
let bulletContanier = document.querySelector(".bollets .spans")
let questioncon = document.querySelector('.questions');
let answerArea = document.querySelector('.answers-quiz');
let submitButton = document.querySelector('.submit');
let result = document.querySelector(".results");
let clockDown = document.querySelector('.countdown');

//  متغير وهمي
let counterIndex = 0;
let theRightAnswer = 0;
let countDownInterval;
// function getDataQuestions
function getData() {
    let myRequest = new XMLHttpRequest();

    myRequest.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let objectData = JSON.parse(this.responseText);
            let countBullet = objectData.length;

            // colling function create Bullets 
            createBull(countBullet);
            
            // colling function addData 
            addData(objectData[counterIndex], countBullet)
            
            // creata a countDown function
            countDown(5, countBullet);

            submitButton.onclick = () => {
                
                // select right answer 
                let rightAnswer = objectData[counterIndex].right_answer;

                // incrament index 
                counterIndex++;

                checkAnswer(rightAnswer, countBullet);

                //Empty sections 
                questioncon.innerHTML = "";
                answerArea.innerHTML = "";

                 // colling function addData 
                addData(objectData[counterIndex], countBullet);
                
                //create a function for select all spans
                allSpans();

                //creata a countDown function
                clearInterval(countDownInterval)
                countDown(5, countBullet);
                
                // createResult function
                createResult(countBullet);
            }
        }
    }

    myRequest.open("GET", "html_question.json", true);
    myRequest.send();
}
getData()


// create Bullets

function createBull(num) {
    countBullet.innerHTML = num;
    
    // loop for num 
    for (let i = 0; i < num; i++){
        // create spans 
        let bullSpan = document.createElement('span');
        // append bullSpan form bulletContanier 
        bulletContanier.appendChild(bullSpan);

        if (i===0) {
            bullSpan.className = 'open';
        }
    }
}

// create Bullets

// function addData 
function addData(obj, countB) {
    if (counterIndex < countB) {
            // create heading 
    let heading = document.createElement('h2');

    // create textNode 
    let titleHead = document.createTextNode(obj['question']);

    // append titleHead from heading 
    heading.appendChild(titleHead);

    // append heading from questions contaneir
    questioncon.appendChild(heading);

    // looping for Answers 
    for (let i = 1; i <= 4; i++){
        // create mainDiv 
        let mainDiv = document.createElement('div');
        // add class 
        mainDiv.className = 'answer'

        // create input 
        let inputA = document.createElement('input');
        // add id + name + type + dataset to input
        inputA.name = 'question'
        inputA.type = 'radio';
        inputA.id = `answer_${i}`;
        inputA.dataset.answer = obj[`answer_${i}`];

        // check if first Element checked
        if (i === 1) {
            inputA.checked = true; 
        }

        //create label 
        let labelAn = document.createElement('label');
        // add Attribute for label
        labelAn.htmlFor = `answer_${i}`
        // create text node form lable
        let textLabel = document.createTextNode(obj[`answer_${i}`]);
        // append textLabel from label 
        labelAn.appendChild(textLabel)
        // append input + lable form maindiv
        mainDiv.appendChild(inputA)
        mainDiv.appendChild(labelAn)

        // append mainDiv from contaneir 
        answerArea.appendChild(mainDiv);
    }
    }
}
// function addData

// create a function check right_answer
function checkAnswer(ranswer, count) {
    let answers = document.getElementsByName("question");
    let theChoosenAnswer;

    for (let i = 0; i < answers.length; i++){
        if (answers[i].checked) {
            theChoosenAnswer = answers[i].dataset.answer;
        }
        
    }

    if (ranswer === theChoosenAnswer) {
        theRightAnswer++;

    }
}


function allSpans() {
    //select all spans 
    let allSpan = document.querySelectorAll(".bollets .spans span");

    //Spans Array
    let arrayOfSpan = Array.from(allSpan);

    arrayOfSpan.forEach((span, index) => {
        if (counterIndex === index) {
            span.className = 'open';
        }
    })
}


// createResult function 
function createResult(count) {
    let myResult;
    if (counterIndex === count) {
        questioncon.remove();
        answerArea.remove();
        submitButton.remove();
        bullet.remove();

        // the right answers Equl to count
        if (theRightAnswer > count / 2 && theRightAnswer < count ) {
            myResult = `<span class="good">Good</span>, ${theRightAnswer} from ${count}`
        } else if (theRightAnswer === count) {
            myResult = `<span class="Perfect">Perfect</span>, ${theRightAnswer} from ${count}`
        } else {
            myResult = `<span class="bad">Not Good</span>, ${theRightAnswer} from ${count}`
        }
        result.innerHTML = myResult;
        result.style.padding = '10px'
        result.style.textAlign = 'center'
    }
}

// create a countDown

function countDown(duration, count) {
    if (counterIndex < count) {
        let miuntes, secound;
        countDownInterval = setInterval(() => {
            miuntes = parseInt(duration / 60)
            secound = parseInt(duration % 60)

            miuntes = miuntes < 10 ? `0${miuntes}`: miuntes;
            secound = secound < 10 ? `0${secound}` : secound;
            
            clockDown.innerHTML = `${miuntes} : ${secound}`
            if (--duration < 0) {
                clearInterval(countDownInterval)

                submitButton.click();
            }
        }, 1000);
    }
}