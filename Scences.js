let randomArray = ["Có", "một", "cậu", "bé", "tinh", "nghịch", "sống", "trong", "ngôi", "làng", "dưới", "chân", "một",
    "ngọn", "đồi", "Một", "hôm", "nó", "nghĩ", "tới", "chuyện", "chọc", "cười", "dân", "làng", "Cậu", "bé", "liền",
    "tìm", "một", "tảng", "đá", "cao", "rồi", "trèo", "lên", "và", "lấy", "hết", "sức", "hét", "lớn", "Cọp", "Cọp",
    "Cứu", "tôi", "với", "Cứu", "tôi", "Dân", "làng", "nghe", "thấy", "tiếng", "hét", "liền", "chạy", "đến", "giúp",
    "cậu", "ta", "Nhưng", "khi", "họ", "đến", "đó", "họ", "không", "thấy", "con", "cọp", "nào", "cả", "và", "cậu",
    "bé", "vẫn", "bình", "yên", "vô", "sự", "Cậu", "bé", "phá", "lên", "cười", "lớn", "và", "nói", "với", "dân",
    "làng", "rằng", "Không", "có", "con", "cọp", "nào", "cả", "tôi", "làm", "điều", "này", "cho", "vui", "thôi",
    "Dân", "làng", "rất", "bực", "mình", "và", "trở", "về", "trong", "cơn", "tức", "giận", "Vài", "ngày", "sau",
    "cậu", "bé", "làm", "lại", "như", "thế", "Một", "lần", "nữa", "dân", "làng", "chạy", "đến", "cứu", "cậu", "bé",
    "nhưng", "lại", "bị", "lừa", "một", "lần", "nữa", "Thế", "là", "họ", "quyết", "định", "sẽ", "không", "tin",
    "lời", "cậu", "bé", "nữa", "Thật", "không", "may", "một", "ngày", "nọ", "một", "con", "cọp", "thực", "sự", "đến",
    "đó", "Bấy", "giờ", "cậu", "bé", "lấy", "hết", "sức", "hét", "lên", "Cọp", "Cọp", "Nhưng", "không", "ai", "chạy",
    "đến", "giúp", "cậu", "ta", "cả", "Con", "cọp", "tấn", "công", "cậu", "bé", "Cậu", "bé", "cố", "gắng", "chống",
    "chọi", "lại", "với", "con", "cọp", "nhưng", "trong", "vòng", "vài", "phút", "con", "thú", "dữ", "đã", "giết",
    "chết", "cậu", "bé", "Vì", "thế", "một", "khi", "đã", "nói", "dối", "thì", "sẽ", "luôn", "luôn", "bị", "xem",
    "là", "một", "kẻ", "nói", "dối"];

let questionType = document.getElementById("questionType");
let question = document.getElementById("question");
let answers = document.getElementById("answers");
let displayResult = document.getElementById("result");
let currentPoint = document.getElementById("currentPoint");
let maxPoint = document.getElementById("maxPoint");

let result = [];
let resultHtml = "";

let currentQuestion = 0
let point;

let newRecord = new Leader();

function CreateNewGame(){
    newRecord.name = prompt("Nhập tên người chơi mới đi bro!!");
    point = 0;
    currentQuestion = 0;
    result = [];
}


function DisplayQuestionScences(questionNumber) {
    let html = "";
    DisplayPoint();
    DisplayMaxPoint();
    switch (questionList[questionNumber].type){
        case "AV":
            questionType.innerText = "Dịch sang tiếng Việt";
            question.innerHTML = questionList[questionNumber].question;
            let array = shuffleAnswer(questionNumber);
            for (let i = 0; i < array.length; i++){
                html += "<button type='button' onclick='ApplyResult(this.value,"+ i +")' value='" + array[i] +
                    "' id='answer"+ i +"'>" + array[i] + "</button>";
            }
            answers.innerHTML = html;
    }
}

function random() {
    return Math.floor(Math.random() * randomArray.length);
}

function shuffleAnswer(questionNumber) {
    let array = questionList[questionNumber].answer;
    array = array.split(" ");
    for (let i = 0; i < 4; i++){
        array.push(randomArray[random()]);
    }
    return array.sort(function (a,b) {return 0.5 - Math.random()});
}

function ShuffleQuestionList() {
    let array = questionList;
    return array.sort(function (a,b) {return 0.5 - Math.random()});
}

function ApplyResult(value, pos) {
    result.push(value);
    let idAnswer = "answer" + pos;
    document.getElementById(idAnswer).classList.add("setbackground");
    document.getElementById(idAnswer).setAttribute("disabled", "true");
    resultHtml = displayResult.innerHTML;

    resultHtml += "<button type='button' onclick='RemoveResult(this.value, this.id)' value='" + result[result.length - 1] +
        "' id='"+ (result.length - 1) +"'>" + result[result.length - 1] + "</button>";
    let lastEle = result.length - 1 + "";

    displayResult.innerHTML = resultHtml;
    document.getElementById(lastEle).setAttribute("idAnswer", pos + "");
}

function RemoveResult(value, pos) {
    let index = result.indexOf(value);
    result.splice(index, 1);
    let idAnswer = document.getElementById(pos).getAttribute("idanswer");
    idAnswer = "answer" + idAnswer;

    document.getElementById(pos).remove();
    document.getElementById(idAnswer).classList.remove("setbackground");
    document.getElementById(idAnswer).removeAttribute("disabled");
}

function Continue() {
    let temp = result.join(" ");
    if (temp === questionList[currentQuestion].answer){
        currentQuestion++;
        displayResult.innerHTML = "";
        result = [];
        point++;
        if (currentQuestion < questionList.length){
            DisplayQuestionScences(currentQuestion);
        }
        else{
            alert("Chúc mừng bạn đã phá đảo!!!");
            newRecord.point = point;
            checkLeaderBoard(newRecord.point);
            location.href = "index.html";
        }
    }
    else{
        alert("Bro thua rồi. Nhưng đừng lo, để xem bro có được lưu danh sử sách không nhé!!");
        newRecord.point = point;
        checkLeaderBoard(newRecord.point);
        location.href = "index.html";
    }
}

function DisplayMaxPoint() {
    maxPoint.innerHTML = "Điểm tối đa: <span class='maxPoint'>" + maxPointLeader + "</span>";
}
function DisplayPoint() {
    currentPoint.innerHTML = "Điểm hiện tại: <span class='currentPoint'>" + point + "</span>";
}
function Cancel() {
    let confirmed = confirm("Thoát bây giờ sẽ hủy kết quả. Vẫn thoát chứ??");
    if (confirmed){
        location.href = "index.html";
    }
}