const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "지구와 별 사이의 시차가 1()이다. 이때 별까지의 거리는 몇 pc일까?",
        choice1: '1pc',
        choice2: '2pc',
        choice3: '3pc',
        choice4: '0.5pc',
        choice5: '10pc',
        answer: 2,
    },
    {
        question: "1등급인 별과 4등급인 별 사이의 밝기 차이는?",
        choice1: '2.5배',
        choice2: '6.3배',
        choice3: '16배',
        choice4: '40배',
        choice5: '100배',
        answer: 3,
    },

    {
        question: "지구에서 별까지의 거리가 10pc보다 멀면 나타나는 값은?",
        choice1: '겉보기 등급 - 절대 등급 > 0',
        choice2: '겉보기 등급 - 절대 등급 = 0',
        choice3: '겉보기 등급 - 절대 등급 < 0',
        choice4: '절대 등급 - 겉보기 등급 > 0',
        answer: 1,
    },
    {
        question: "주어진 보기에서 표면 온도가 두 번째로 높은 별의 색깔은?",
        choice1: '청색',
        choice2: '청백색',
        choice3: '백색',
        choice4: '황색',
        choice5: '적색',
        answer: 2,
    },
    {
        question: "태양계는 우리 은하의 ( )에 있다. (    )에 들어갈 말로 알맞은 것은?",
        choice1: '중심',
        choice2: '헤일로',
        choice3: '나선팔',
        choice4: '위 모두에 답이 없음',
        answer: 3,
    },
    {
        question: "은하에는 별이 약 ( )개 정도가 속해 있다. (    )에 들어갈 말로 알맞은 것은?",
        choice1: '수 십 개',
        choice2: '수 천 개',
        choice3: '수 억 개',
        choice4: '수 천 억 개',
        choice5: '수 만 개',
        answer: 4,
    },
    {
        question: "산개 성단은 은하의 (          )에 많이 있다. (    )에 들어갈 말로 알맞은 것은?",
        choice1: '중심',
        choice2: '헤일로',
        choice3: '바깥',
        choice4: '나선팔',
        answer: 4,
    },
    {
        question: "(          )은 주위에 있는 별의 에너지를 흡수해 스스로 빛을 내는 성간 물질이 모여 구름 같이 만들어진 천체이다. (    )에 들어갈 말은?",
        choice1: '암흑 성운',
        choice2: '방출 성운',
        choice3: '반사 성운',
        choice4: '산개 성단',
        choice5: '구상 성단',
        answer: 2,
    },
    {
        question: "2등급인 별이 4배 멀어지면 이 별의 등급은?",
        choice1: '1등급',
        choice2: '2등급',
        choice3: '3등급',
        choice4: '4등급',
        choice5: '5등급',
        answer: 5,
    },
    {
        question: "시차가 2()인 어떤 별의 겉보기 등급이 -1등급인 때, 이 별의 절대 등급은?",
        choice1: '-3등급',
        choice2: '1등급',
        choice3: '3등급',
        choice4: '4등급',
        choice5: '7등급',
        answer: 4,
    },
]

const SCORE_POINTS = 1000
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}



getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score)
        localStorage.setItem('mostRecentTime', new Date())
        score = 0

        return window.location.assign('end.html')
    }
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question


    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return
        
        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct'){
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})


incrementScore = num => {
    score += num
    scoreText.innerText = score
    //스코어 저장
}

startGame()