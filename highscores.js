const highScoresList = document.querySelector('#highScoresList')
const highScores = JSON.parse(localStorage.getItem('highScores')) || []


var xhr = new XMLHttpRequest();
let url = "https://script.google.com/macros/s/AKfycby9JSFodDBd9ZZA8X-lWMshCJD6jdCNSjPssc3qMo9NEjQkVAZZfn2uFEbiq3Zg2LB7/exec"
let maxName = ""
let maxDate = ""
let maxScore = 0

xhr.open('GET', url + "?sheetName=input", true)

xhr.send()


xhr.onload = () => {
    if (xhr.status == 200) {
        //success
        let json = xhr.response
        json = JSON.parse(json)

        
        for (let i = 0; i < json.data.length; i++){
            if(Number(json.data[i].score) >= maxScore){
                maxName = json.data[i].name
                maxDate = json.data[i].Timestamp
                maxScore = Number(json.data[i].score)
            }
        }
    }
    else {
        //failed
    }
}

setTimeout(function (){
    console.log(maxName)
    console.log(maxScore)


    highScoresList.innerHTML =
    highScores.map(score => {
        return `<li class ="high-score">${maxDate} - ${maxName} - ${maxScore}</li>`
    }).join('')
},5000)


