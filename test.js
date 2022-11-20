var xhr = new XMLHttpRequest();
let url = "https://script.google.com/macros/s/AKfycby9JSFodDBd9ZZA8X-lWMshCJD6jdCNSjPssc3qMo9NEjQkVAZZfn2uFEbiq3Zg2LB7/exec"


xhr.open('GET', url + "?sheetName=input", true)

xhr.send()

xhr.onload = () => {
    if (xhr.status == 200) {
        //success
        let json = xhr.response
        json = JSON.parse(json)

        let maxName = ""
        let maxScore = 0



        for (let i = 0; i < json.data.length; i++){
            console.log(i)
            if(Number(json.data[i].score) >= maxScore){
                maxName = json.data[i].name
                maxScore = Number(json.data[i].score)
            }
        }

        console.log(maxName)
        console.log(maxScore)

        
        
    }
    else {
        //failed
    }
}




