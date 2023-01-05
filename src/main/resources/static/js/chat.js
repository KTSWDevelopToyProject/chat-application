let userName = prompt("아이디를 입력하세요.");
let roomNum = prompt("채팅방 번호를 입력하세요.");
document.querySelector("#user_name").innerHTML = "<b>" + userName + "</b>";

const eventSource = new EventSource(`http://localhost:8080/chat/room-number/${roomNum}`);

eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if(data.sender === userName) {
        // 메시지 보낸 사람이 로그인 유저이면 파란색박스(우측)
        initMyMessage(data);
    } else {
        // 그렇지 않으면 회색박스(좌측)
        initYourMessage(data);
    }
}

function getSendMsgBox(data) {

    let md = data.createdAt.substring(5, 10);
    let tm = data.createdAt.substring(11, 16);
    convertedDateTime = tm + " | " + md;

    return `<div class="sent_msg">
    <p>${data.msg}</p>
    <span class="time_date"> ${convertedDateTime}       <b>${data.sender}</b></span>
  </div>`;
}

function getReceiveMsgBox(data) {

    let md = data.createdAt.substring(5, 10);
    let tm = data.createdAt.substring(11, 16);
    convertedDateTime = tm + " | " + md;

    return `<div class="received_withd_msg">
    <p>${data.msg}</p>
    <span class="time_date"> ${convertedDateTime}       <b>${data.sender}</b></span>
  </div>`;
}

function addMessage() {
   
    let msgInput = document.querySelector("#chat-outgoing-msg");
    let chat = {
        sender: userName,
        roomNum: roomNum,
        msg: msgInput.value,
    }

    fetch("http://localhost:8080/chat", {
        method: "post",
        body: JSON.stringify(chat),
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
    });

    msgInput.value = "";
}

// 파란 박스
function initMyMessage(data) {
    let chatBox = document.querySelector("#chat-box");
    let sendBox = document.createElement("div");
    sendBox.className = "outgoing_msg";
    
    sendBox.innerHTML = getSendMsgBox(data);
    chatBox.append(sendBox);

    document.documentElement.scrollTop = document.body.scrollHeight;
}

// 회색 박스
function initYourMessage(data) {
    let chatBox = document.querySelector("#chat-box");
    let receivedBox = document.createElement("div");
    receivedBox.className = "received_msg";
    
    receivedBox.innerHTML = getReceiveMsgBox(data);
    chatBox.append(receivedBox);

    document.documentElement.scrollTop = document.body.scrollHeight;
}

document.querySelector("#chat-send").addEventListener("click", () => {
    addMessage();
});

document.querySelector("#chat-outgoing-msg").addEventListener("keydown", (e) => {
    if(e.keyCode === 13) {
        addMessage();
    }
});