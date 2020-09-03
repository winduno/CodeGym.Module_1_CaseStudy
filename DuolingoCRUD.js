let questionList = [];
let localQuestion;
questionList = getLocalQuestion();

function setLocalQuestion(){
    localStorage.setItem("localQuestionList", JSON.stringify(questionList));
}

function getLocalQuestion() {
    localQuestion = localStorage.getItem("localQuestionList") ? JSON.parse(localStorage.getItem("localQuestionList")): questionList;
    return localQuestion;
}

function DisplayQuestion() {
    let table = "<table>";
    table += "<tr>" +
            "<th> Câu hỏi </th>" +
            "<th> Đáp án </th>" +
            "<th> Hành động </th>" +
            "</tr>";

    for(let i = 0; i < questionList.length; i++){
        table += "<tr>" +
            "<td>" + questionList[i].question + "</td>" +
            "<td>" + questionList[i].answer + "</td>" +
            "<td>" +
            "<button type='button' onclick='EditQuestion(" + i+ ")'> Edit</button>" +
            "<button type='button' onclick='DeleteQuestion(" + i + ")'> Delete</button>" +
            "</td>" +
            "</tr>"
    }
    table += "</table>";
    document.getElementById("displaying").innerHTML = table;
}

function AddQuestion() {
    let newQuestion = new QuestionType1();
    let input = 0;
    do{
        input = prompt("Nhập vào câu hỏi!!");
    }while (!input);

    newQuestion.question = input;
    input = 0;

    do{
        input = prompt("Nhập câu trả lời!!");
    }while (!input);

    newQuestion.answer = input;

    questionList.push(newQuestion);
    setLocalQuestion();
    DisplayQuestion();
}

function DeleteQuestion(index) {
    questionList.splice(index, 1);
    setLocalQuestion();
    DisplayQuestion();
}

function EditQuestion(index) {
    do{
        input = prompt("Nhập vào câu hỏi!!");
    }while (!input);

    questionList[index].question = input;
    input = 0;

    do{
        input = prompt("Nhập câu trả lời!!");
    }while (!input);

    questionList[index].answer = input;
    setLocalQuestion();
    DisplayQuestion();
}
