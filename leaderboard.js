let leaderBoardScore = [];
let localLeaderBoard;
leaderBoardScore = getLocalLeaderBoard();
let maxPointLeader = leaderBoardScore[0].point;
let leaderTable = document.getElementById("leadTable");

function setLocalLeaderBoard() {
    localStorage.setItem("localLeaderBoard", JSON.stringify(leaderBoardScore));
}

function getLocalLeaderBoard() {
    localLeaderBoard = localStorage.getItem("localLeaderBoard") ? JSON.parse(localStorage.getItem("localLeaderBoard")) : leaderBoardScore;
    return localLeaderBoard;
}

function checkLeaderBoard(point) {
    for (let i = 0; i < 5 ; i++) {
        if (leaderBoardScore[i].point < point){
            leaderBoardScore.splice(i, 0, newRecord);
            leaderBoardScore.pop();
            break;
        }
        maxPointLeader = leaderBoardScore[0].point;
    }
    setLocalLeaderBoard();
}
let htmlLeaderBoard
function DisplayLeaderBoard() {
    htmlLeaderBoard = "<table>";
    htmlLeaderBoard += "<tr>" +
        "<th> Hạng </th>" +
        "<th> Người chơi </th>" +
        "<th> Điểm </th>" +
        "</tr>";
    for (let i = 0; i < 5; i++) {
        htmlLeaderBoard += "<tr>" +
            "<td>" + (i + 1) + "</td>" +
            "<td>" + leaderBoardScore[i].name + "</td>" +
            "<td>" + leaderBoardScore[i].point + "</td>" +
            "</tr>"
    }
    htmlLeaderBoard += "</table>";
    leadTable.innerHTML = htmlLeaderBoard;
    return htmlLeaderBoard;
}

