const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')
const mostRecentScore = localStorage.getItem('mostRecentScore')

const highScores = JSON.parse(localStorage.getItem('highScores')) || []

const MAX_HIGH_SCORES = 5

let url = "https://script.googleusercontent.com/macros/echo?user_content_key=-15P64AfnfmjG_zxq3GqRWUCZIdI56tFQ6I7YBlqU95W6j-YPO5LKA-lkalSw5bN8H71uuHfzJkFD0etQgysuTT012_Utrfsm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnK-JN6DmQWi6Nx_9Yj0ByluqY-sy0KFpm7WWtzAc-66m848hMNxrtCpiE1Psby2o08S2HxMkC_Zu_h2kM7KIVKP7vmwBL0QzfQ&lib=M_S1IgKAT0SVeO0aw9th-aj4UJGmVUE6z"

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
    xhr.open('GET', url + "?School=" + username.value + "&Name=" + mostRecentScore, true); //?__KEY값__=
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

    highScores.splice(5)

    localStorage.setItem('highScores', JSON.stringify(highScores))

    setTimeout(() => console.log("after"), 3000);

    window.location.assign('index.html')
}