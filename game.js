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
let doneQuestions = []

let questions = [
     {
      "question": "지구와 별 사이의 시차가 1(\")이다. 이때 별까지의 거리는 몇 pc일까?\",",
      "choice1": "1pc",
      "choice2": "2pc",
      "choice3": "3pc",
      "choice4": "0.5pc",
      "choice5": "10pc",
      "answer": 2
     },
     {
      "question": "1등급인 별과 4등급인 별 사이의 밝기 차이는?\",",
      "choice1": "2.5배",
      "choice2": "6.3배",
      "choice3": "16배",
      "choice4": "40배",
      "choice5": "100배",
      "answer": 3
     },
     {
      "question": "지구에서 별까지의 거리가 10pc보다 멀면 나타나는 값은?\",",
      "choice1": "겉보기 등급 - 절대 등급 &gt; 0",
      "choice2": "겉보기 등급 - 절대 등급 = 0",
      "choice3": "겉보기 등급 - 절대 등급 &lt; 0",
      "choice4": "절대 등급 - 겉보기 등급 &gt; 0",
      "answer": 1
     },
     {
      "question": "주어진 보기에서 표면 온도가 두 번째로 높은 별의 색깔은?\",",
      "choice1": "청색",
      "choice2": "청백색",
      "choice3": "백색",
      "choice4": "황색",
      "choice5": "적색",
      "answer": 2
     },
     {
      "question": "태양계는 우리 은하의 ( )에 있다. ( )에 들어갈 말로 알맞은 것은?\",",
      "choice1": "중심",
      "choice2": "헤일로",
      "choice3": "나선팔",
      "choice4": "위 모두에 답이 없음",
      "answer": 3
     },
     {
      "question": "은하에는 별이 약 ( )개 정도가 속해 있다. ( )에 들어갈 말로 알맞은 것은?\",",
      "choice1": "수 십 개",
      "choice2": "수 천 개",
      "choice3": "수 억 개",
      "choice4": "수 천 억 개",
      "choice5": "수 만 개",
      "answer": 4
     },
     {
      "question": "산개 성단은 은하의 ( )에 많이 있다. ( )에 들어갈 말로 알맞은 것은?\",",
      "choice1": "중심",
      "choice2": "헤일로",
      "choice3": "바깥",
      "choice4": "나선팔",
      "answer": 4
     },
     {
      "question": "( )은 주위에 있는 별의 에너지를 흡수해 스스로 빛을 내는 성간 물질이 모여 구름 같이 만들어진 천체이다. ( )에 들어갈 말은?\",",
      "choice1": "암흑 성운",
      "choice2": "방출 성운",
      "choice3": "반사 성운",
      "choice4": "산개 성단",
      "choice5": "구상 성단",
      "answer": 2
     },
     {
      "question": "2등급인 별이 4배 멀어지면 이 별의 등급은?\",",
      "choice1": "1등급",
      "choice2": "2등급",
      "choice3": "3등급",
      "choice4": "4등급",
      "choice5": "5등급",
      "answer": 5
     },
     {
      "question": "시차가 2(\")인 어떤 별의 겉보기 등급이 -1등급인 때, 이 별의 절대 등급은?\",",
      "choice1": "-3등급",
      "choice2": "1등급",
      "choice3": "3등급",
      "choice4": "4등급",
      "choice5": "7등급",
      "answer": 4
     },
     {
      "question": "지구는 달보다 몇배 무거울 까요?",
      "choice1": "74배",
      "choice2": "95배",
      "choice3": "81배",
      "choice4": "69배",
      "answer": 3
     },
     {
      "question": "적색 외성은 최대 몇년 동안 유지 될수 있을까?",
      "choice1": "9000억",
      "choice2": "1조",
      "choice3": "5조",
      "choice4": "10조",
      "choice5": "20조",
      "answer": 4
     },
     {
      "question": "우리는 항상 달의 같은 면만 본다",
      "choice1": "O",
      "choice2": "X",
      "answer": 1
     },
     {
      "question": "은하는 타원, 나선 이렇게 2가지 종류가 있다",
      "choice1": "O",
      "choice2": "X",
      "answer": 2,
      "explain": "은하는 타원, 나선, 불규칙 이렇게 3가지 종류가 있다"
     },
     {
      "question": "우리 은하 밖에서 발견된 최초의 초신성은 SNR 1885이다.",
      "choice1": "O",
      "choice2": "X",
      "answer": 1
     },
     {
      "question": "최초로 찰영된 블랙홀은 지구크기의 100만배이다",
      "choice1": "O",
      "choice2": "X",
      "answer": 2,
      "explain": "최초의 찰영된 블랙홀은 지구의 300만배 이다"
     },
     {
      "question": "우주는 정말 시끄럽다",
      "choice1": "O",
      "choice2": "X",
      "answer": 2,
      "explain": "우주에는 대기가 없어 소리를 들을 수가 없다"
     },
     {
      "question": "허블망원경은 강장 많은 것을 알아냈다",
      "choice1": "O",
      "choice2": "X",
      "answer": 1
     },
     {
      "question": "최초의 인공위성은 스푸트니크이다",
      "choice1": "O",
      "choice2": "X",
      "answer": 1
     },
     {
      "question": "달은 매년 지구의 중력으로 인해 가까워지고 있다",
      "choice1": "O",
      "choice2": "X",
      "answer": 2,
      "explain": "달은 매년 지구로부터 4cm씩 떨어지고 있다"
     },
     {
      "question": "천왕성에 이름은 예전과 동일하다",
      "choice1": "O",
      "choice2": "X",
      "answer": 2,
      "explain": "천왕성은 예전에 조지의 별이라고 불렸다"
     },
     {
      "question": "지구는 달보다 몇배 무거울 까요?",
      "choice1": "74배",
      "choice2": "95배",
      "choice3": "81배",
      "choice4": "69배",
      "choice5": "51배",
      "answer": 3
     },
     {
      "question": "우주로 떠난 최초의 살아있는 동물은 개이다",
      "choice1": "O",
      "choice2": "X",
      "answer": 1
     },
     {
      "question": "적색 외성은 최대 몇년 동안 유지 될수 있을까?",
      "choice1": "9000억",
      "choice2": "1조",
      "choice3": "5조",
      "choice4": "10조",
      "choice5": "20조",
      "answer": 4
     },
     {
      "question": "목성의 붉은 반점은 점점 커지고 있다",
      "choice1": "O",
      "choice2": "X",
      "answer": 2,
      "explain": "목성의 붉은 반점은 점점 작아지고 있다"
     },
     {
      "question": "수성의 하루는 58일이다",
      "choice1": "O",
      "choice2": "X",
      "answer": 1
     },
     {
      "question": "빛이 지구에서 달로 가는데 얼마나 걸릴까요?",
      "choice1": "1.3초",
      "choice2": "4.2초",
      "choice3": "8.9초",
      "choice4": "10.3초",
      "choice5": "12.8초",
      "answer": 1
     },
     {
      "question": "태양계의 나이는?",
      "choice1": "45억 6800만년",
      "choice2": "47억년",
      "choice3": "50억년",
      "choice4": "47억 7200만년",
      "choice5": "43억 2300만년",
      "answer": 1
     },
     {
      "question": "처음 발견된 나선은하는 M51이다",
      "choice1": "O",
      "choice2": "X",
      "answer": 1
     },
     {
      "question": "달01에도 바람이 불어 발자국이 사라진다",
      "choice1": "O",
      "choice2": "X",
      "answer": 2,
      "explain": "달에는 대기가 없어 바람이 불지 않아 발자국이 그대로 남아있다"
     },
     {
      "question": "목성을 도는 위성은 몇개 일까요?",
      "choice1": "52개",
      "choice2": "67개",
      "choice3": "79개",
      "choice4": "81개",
      "choice5": "43개",
      "answer": 3
     },
     {
      "question": "NASA는 달에서 물의 증거를 찾았다",
      "choice1": "O",
      "choice2": "X",
      "answer": 1
     },
     {
      "question": "태양의 자전주기는?",
      "choice1": "20~26일",
      "choice2": "25~33일",
      "choice3": "30~34일",
      "choice4": "36~42일",
      "choice5": "2~3일",
      "answer": 2
     },
     {
      "question": "태양계에서 신의 이름을 따지 않은 행성은 없다",
      "choice1": "O",
      "choice2": "X",
      "answer": 2,
      "explain": "태양계에서 유일하게 지구는 신의 이름을 따지 않았다"
     },
     {
      "question": "천왕성은 몇개의 위성을 가지고 있을까요?",
      "choice1": "24개",
      "choice2": "25개",
      "choice3": "26개",
      "choice4": "27개",
      "choice5": "28개",
      "answer": 4
     },
     {
      "question": "해왕성의 위성인 트리톤은 반대로 공전한다",
      "choice1": "O",
      "choice2": "X",
      "answer": 1
     },
     {
      "question": "트리톤은 점점 해왕성으로부터 멀어지고 있다",
      "choice1": "O",
      "choice2": "X",
      "answer": 2,
      "explain": "트리톤은 점점 해왕성으로부터 멀어지고 있다."
     },
     {
      "question": "우리는 우주의 5%만 볼 수 있다",
      "choice1": "O",
      "choice2": "X",
      "answer": 1,
      "explain": "우주에는 우리가 볼 수 없는 암흑에너지가 68%, 암흑 물질이 27%가 존재하기 때문이다"
     },
     {
      "question": "햇빛이 지구에 도달하는데 약 8분이 걸린다",
      "choice1": "O",
      "choice2": "X",
      "answer": 1
     },
     {
      "question": "지구의 자전은 점점 빨라지고 있다",
      "choice1": "O",
      "choice2": "X",
      "answer": 2,
      "explain": "지구의 자전은 100년에 0.002초씩 느려지고 있다"
     },
     {
      "question": "지구에서 우주는 얼마나 떨어져 있을까?",
      "choice1": "100km",
      "choice2": "200km",
      "choice3": "500km",
      "choice4": "1000km",
      "choice5": "그 이상",
      "answer": 1
     },
     {
      "question": "국제 우주정거장은 지구를 2시간 주기로 돌고있다",
      "choice1": "O",
      "choice2": "X",
      "answer": 2,
      "explain": "국제 우주정거장은 지구를 92분 주기로 돌고있다."
     },
     {
      "number": "",
      "type": "",
      "question": "지구와 별 사이의 시차가 1(\")이다. 이때 별까지의 거리는 몇 pc일까?\",",
      "choice1": "1pc",
      "choice2": "2pc",
      "choice3": "3pc",
      "choice4": "0.5pc",
      "choice5": "10pc",
      "answer": "2",
      "explain": ""
     },
     {
      "number": "",
      "type": "",
      "question": "1등급인 별과 4등급인 별 사이의 밝기 차이는?\",",
      "choice1": "2.5배",
      "choice2": "6.3배",
      "choice3": "16배",
      "choice4": "40배",
      "choice5": "100배",
      "answer": "3",
      "explain": ""
     },
     {
      "number": "",
      "type": "",
      "question": "지구에서 별까지의 거리가 10pc보다 멀면 나타나는 값은?\",",
      "choice1": "겉보기 등급 - 절대 등급 &gt; 0",
      "choice2": "겉보기 등급 - 절대 등급 = 0",
      "choice3": "겉보기 등급 - 절대 등급 &lt; 0",
      "choice4": "절대 등급 - 겉보기 등급 &gt; 0",
      "choice5": "",
      "answer": "1",
      "explain": ""
     },
     {
      "number": "",
      "type": "",
      "question": "주어진 보기에서 표면 온도가 두 번째로 높은 별의 색깔은?\",",
      "choice1": "청색",
      "choice2": "청백색",
      "choice3": "백색",
      "choice4": "황색",
      "choice5": "적색",
      "answer": "2",
      "explain": ""
     },
     {
      "number": "",
      "type": "",
      "question": "태양계는 우리 은하의 ( )에 있다. ( )에 들어갈 말로 알맞은 것은?\",",
      "choice1": "중심",
      "choice2": "헤일로",
      "choice3": "나선팔",
      "choice4": "위 모두에 답이 없음",
      "choice5": "",
      "answer": "3",
      "explain": ""
     },
     {
      "number": "",
      "type": "",
      "question": "은하에는 별이 약 ( )개 정도가 속해 있다. ( )에 들어갈 말로 알맞은 것은?\",",
      "choice1": "수 십 개",
      "choice2": "수 천 개",
      "choice3": "수 억 개",
      "choice4": "수 천 억 개",
      "choice5": "수 만 개",
      "answer": "4",
      "explain": ""
     },
     {
      "number": "",
      "type": "",
      "question": "산개 성단은 은하의 ( )에 많이 있다. ( )에 들어갈 말로 알맞은 것은?\",",
      "choice1": "중심",
      "choice2": "헤일로",
      "choice3": "바깥",
      "choice4": "나선팔",
      "choice5": "",
      "answer": "4",
      "explain": ""
     },
     {
      "number": "",
      "type": "",
      "question": "( )은 주위에 있는 별의 에너지를 흡수해 스스로 빛을 내는 성간 물질이 모여 구름 같이 만들어진 천체이다. ( )에 들어갈 말은?\",",
      "choice1": "암흑 성운",
      "choice2": "방출 성운",
      "choice3": "반사 성운",
      "choice4": "산개 성단",
      "choice5": "구상 성단",
      "answer": "2",
      "explain": ""
     },
     {
      "number": "",
      "type": "",
      "question": "2등급인 별이 4배 멀어지면 이 별의 등급은?\",",
      "choice1": "1등급",
      "choice2": "2등급",
      "choice3": "3등급",
      "choice4": "4등급",
      "choice5": "5등급",
      "answer": "5",
      "explain": ""
     },
     {
      "number": "",
      "type": "",
      "question": "시차가 2(\")인 어떤 별의 겉보기 등급이 -1등급인 때, 이 별의 절대 등급은?\",",
      "choice1": "-3등급",
      "choice2": "1등급",
      "choice3": "3등급",
      "choice4": "4등급",
      "choice5": "7등급",
      "answer": "4",
      "explain": ""
     },
     {
      "number": "",
      "type": "",
      "question": "지구는 달보다 몇배 무거울 까요?",
      "choice1": "74배",
      "choice2": "95배",
      "choice3": "81배",
      "choice4": "69배",
      "choice5": "",
      "answer": "3",
      "explain": ""
     },
     {
      "number": "",
      "type": "",
      "question": "적색 외성은 최대 몇년 동안 유지 될수 있을까?",
      "choice1": "9000억",
      "choice2": "1조",
      "choice3": "5조",
      "choice4": "10조",
      "choice5": "20조",
      "answer": "4",
      "explain": ""
     },
     {
      "number": "",
      "type": "",
      "question": "우리는 항상 달의 같은 면만 본다",
      "choice1": "O",
      "choice2": "X",
      "choice3": "",
      "choice4": "",
      "choice5": "",
      "answer": "1",
      "explain": ""
     },
     {
      "number": "",
      "type": "",
      "question": "은하는 타원, 나선 이렇게 2가지 종류가 있다",
      "choice1": "O",
      "choice2": "X",
      "choice3": "",
      "choice4": "",
      "choice5": "",
      "answer": "2",
      "explain": "은하는 타원, 나선, 불규칙 이렇게 3가지 종류가 있다"
     },
     {
      "number": "",
      "type": "",
      "question": "우리 은하 밖에서 발견된 최초의 초신성은 SNR 1885이다.",
      "choice1": "O",
      "choice2": "X",
      "choice3": "",
      "choice4": "",
      "choice5": "",
      "answer": "1",
      "explain": ""
     },
     {
      "number": "",
      "type": "",
      "question": "최초로 찰영된 블랙홀은 지구크기의 100만배이다",
      "choice1": "O",
      "choice2": "X",
      "choice3": "",
      "choice4": "",
      "choice5": "",
      "answer": "2",
      "explain": "최초의 찰영된 블랙홀은 지구의 300만배 이다"
     },
     {
      "number": "",
      "type": "",
      "question": "우주는 정말 시끄럽다",
      "choice1": "O",
      "choice2": "X",
      "choice3": "",
      "choice4": "",
      "choice5": "",
      "answer": "2",
      "explain": "우주에는 대기가 없어 소리를 들을 수가 없다"
     },
     {
      "number": "",
      "type": "",
      "question": "허블망원경은 강장 많은 것을 알아냈다",
      "choice1": "O",
      "choice2": "X",
      "choice3": "",
      "choice4": "",
      "choice5": "",
      "answer": "1",
      "explain": ""
     },
     {
      "number": "",
      "type": "",
      "question": "최초의 인공위성은 스푸트니크이다",
      "choice1": "O",
      "choice2": "X",
      "choice3": "",
      "choice4": "",
      "choice5": "",
      "answer": "1",
      "explain": ""
     },
     {
      "number": "",
      "type": "",
      "question": "달은 매년 지구의 중력으로 인해 가까워지고 있다",
      "choice1": "O",
      "choice2": "X",
      "choice3": "",
      "choice4": "",
      "choice5": "",
      "answer": "2",
      "explain": "달은 매년 지구로부터 4cm씩 떨어지고 있다"
     },
     {
      "number": "",
      "type": "",
      "question": "천왕성에 이름은 예전과 동일하다",
      "choice1": "O",
      "choice2": "X",
      "choice3": "",
      "choice4": "",
      "choice5": "",
      "answer": "2",
      "explain": "천왕성은 예전에 조지의 별이라고 불렸다"
     },
     {
      "number": "",
      "type": "",
      "question": "지구는 달보다 몇배 무거울 까요?",
      "choice1": "74배",
      "choice2": "95배",
      "choice3": "81배",
      "choice4": "69배",
      "choice5": "51배",
      "answer": "3",
      "explain": ""
     },
     {
      "number": "",
      "type": "",
      "question": "우주로 떠난 최초의 살아있는 동물은 개이다",
      "choice1": "O",
      "choice2": "X",
      "choice3": "",
      "choice4": "",
      "choice5": "",
      "answer": "1",
      "explain": ""
     },
     {
      "number": "",
      "type": "",
      "question": "적색 외성은 최대 몇년 동안 유지 될수 있을까?",
      "choice1": "9000억",
      "choice2": "1조",
      "choice3": "5조",
      "choice4": "10조",
      "choice5": "20조",
      "answer": "4",
      "explain": ""
     },
     {
      "number": "",
      "type": "",
      "question": "목성의 붉은 반점은 점점 커지고 있다",
      "choice1": "O",
      "choice2": "X",
      "choice3": "",
      "choice4": "",
      "choice5": "",
      "answer": "2",
      "explain": "목성의 붉은 반점은 점점 작아지고 있다"
     },
     {
      "number": "",
      "type": "",
      "question": "수성의 하루는 58일이다",
      "choice1": "O",
      "choice2": "X",
      "choice3": "",
      "choice4": "",
      "choice5": "",
      "answer": "1",
      "explain": ""
     },
     {
      "number": "",
      "type": "",
      "question": "빛이 지구에서 달로 가는데 얼마나 걸릴까요?",
      "choice1": "1.3초",
      "choice2": "4.2초",
      "choice3": "8.9초",
      "choice4": "10.3초",
      "choice5": "12.8초",
      "answer": "1",
      "explain": ""
     },
     {
      "number": "",
      "type": "",
      "question": "태양계의 나이는?",
      "choice1": "45억 6800만년",
      "choice2": "47억년",
      "choice3": "50억년",
      "choice4": "47억 7200만년",
      "choice5": "43억 2300만년",
      "answer": "1",
      "explain": ""
     },
     {
      "number": "",
      "type": "",
      "question": "처음 발견된 나선은하는 M51이다",
      "choice1": "O",
      "choice2": "X",
      "choice3": "",
      "choice4": "",
      "choice5": "",
      "answer": "1",
      "explain": ""
     },
     {
      "number": "",
      "type": "",
      "question": "달01에도 바람이 불어 발자국이 사라진다",
      "choice1": "O",
      "choice2": "X",
      "choice3": "",
      "choice4": "",
      "choice5": "",
      "answer": "2",
      "explain": "달에는 대기가 없어 바람이 불지 않아 발자국이 그대로 남아있다"
     },
     {
      "number": "",
      "type": "",
      "question": "목성을 도는 위성은 몇개 일까요?",
      "choice1": "52개",
      "choice2": "67개",
      "choice3": "79개",
      "choice4": "81개",
      "choice5": "43개",
      "answer": "3",
      "explain": ""
     },
     {
      "number": "",
      "type": "",
      "question": "NASA는 달에서 물의 증거를 찾았다",
      "choice1": "O",
      "choice2": "X",
      "choice3": "",
      "choice4": "",
      "choice5": "",
      "answer": "1",
      "explain": ""
     },
     {
      "number": "",
      "type": "",
      "question": "태양의 자전주기는?",
      "choice1": "20~26일",
      "choice2": "25~33일",
      "choice3": "30~34일",
      "choice4": "36~42일",
      "choice5": "2~3일",
      "answer": "2",
      "explain": ""
     },
     {
      "number": "",
      "type": "",
      "question": "태양계에서 신의 이름을 따지 않은 행성은 없다",
      "choice1": "O",
      "choice2": "X",
      "choice3": "",
      "choice4": "",
      "choice5": "",
      "answer": "2",
      "explain": "태양계에서 유일하게 지구는 신의 이름을 따지 않았다"
     },
     {
      "number": "",
      "type": "",
      "question": "천왕성은 몇개의 위성을 가지고 있을까요?",
      "choice1": "24개",
      "choice2": "25개",
      "choice3": "26개",
      "choice4": "27개",
      "choice5": "28개",
      "answer": "4",
      "explain": ""
     },
     {
      "number": "",
      "type": "",
      "question": "해왕성의 위성인 트리톤은 반대로 공전한다",
      "choice1": "O",
      "choice2": "X",
      "choice3": "",
      "choice4": "",
      "choice5": "",
      "answer": "1",
      "explain": ""
     },
     {
      "number": "",
      "type": "",
      "question": "트리톤은 점점 해왕성으로부터 멀어지고 있다",
      "choice1": "O",
      "choice2": "X",
      "choice3": "",
      "choice4": "",
      "choice5": "",
      "answer": "2",
      "explain": "트리톤은 점점 해왕성으로부터 멀어지고 있다."
     },
     {
      "number": "",
      "type": "",
      "question": "우리는 우주의 5%만 볼 수 있다",
      "choice1": "O",
      "choice2": "X",
      "choice3": "",
      "choice4": "",
      "choice5": "",
      "answer": "1",
      "explain": "우주에는 우리가 볼 수 없는 암흑에너지가 68%, 암흑 물질이 27%가 존재하기 때문이다"
     },
     {
      "number": "",
      "type": "",
      "question": "햇빛이 지구에 도달하는데 약 8분이 걸린다",
      "choice1": "O",
      "choice2": "X",
      "choice3": "",
      "choice4": "",
      "choice5": "",
      "answer": "1",
      "explain": ""
     },
     {
      "number": "",
      "type": "",
      "question": "지구의 자전은 점점 빨라지고 있다",
      "choice1": "O",
      "choice2": "X",
      "choice3": "",
      "choice4": "",
      "choice5": "",
      "answer": "2",
      "explain": "지구의 자전은 100년에 0.002초씩 느려지고 있다"
     },
     {
      "number": "",
      "type": "",
      "question": "지구에서 우주는 얼마나 떨어져 있을까?",
      "choice1": "100km",
      "choice2": "200km",
      "choice3": "500km",
      "choice4": "1000km",
      "choice5": "그 이상",
      "answer": "1",
      "explain": ""
     },
     {
      "number": "",
      "type": "",
      "question": "국제 우주정거장은 지구를 2시간 주기로 돌고있다",
      "choice1": "O",
      "choice2": "X",
      "choice3": "",
      "choice4": "",
      "choice5": "",
      "answer": "2",
      "explain": "국제 우주정거장은 지구를 92분 주기로 돌고있다."
     }
    ]

console.log(questions)

const SCORE_POINTS = 9999
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
    
    
    questionsIndex = Math.floor(Math.random() * availableQuestions.length)
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