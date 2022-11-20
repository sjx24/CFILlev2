const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')
const mostRecentScore = localStorage.getItem('mostRecentScore')

const highScores = JSON.parse(localStorage.getItem('highScores')) || []

const MAX_HIGH_SCORES = 1

let url = "https://script.google.com/macros/s/AKfycbzzJ8xWsc5NX7Ca-Hh07T7TZwj_uHc3_DtrV1LZC3DXz2hiesq9zRprkeWNvl1xC8nT/exec"

finalScore.innerText = mostRecentScore

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value
})



saveHighScore = e => {
    e.preventDefault()

    const score = {
        score: mostRecentScore,
        name: username.value
    }


    //XMLHttpRequest 객체 생성
    var xhr = new XMLHttpRequest();

    //요청을 보낼 방식, url, 비동기여부 설정
    xhr.open('GET', url + "?name=" + username.value + "&score=" + mostRecentScore, true); //?__KEY값__=
    //요청 전송
    xhr.send();
    //Callback
    xhr.onload = () => {
        if (xhr.status == 200) {
            //success
            alert(xhr.response);
            
        } else {
            //failed
        }
    }

    
    

    highScores.push(score)

    highScores.sort((a, b) => {
        return b.score - a.score;
    })

    highScores.splice(1)

    localStorage.setItem('highScores', JSON.stringify(highScores))

    setTimeout(() => console.log("after"), 3000);

    window.location.assign('index.html')
}