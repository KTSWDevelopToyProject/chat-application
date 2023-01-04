const eventSource = new EventSource("http://localhost:8080/sender/kdh/receiver/donghyeon");

eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log(2, data);
    initMessage(data);
}

function getSendMsgBox(msg, datetime) {
    return `<div class="sent_msg">
    <p>${msg}</p>
    <span class="time_date"> ${datetime}</span>
  </div>`;
}

function addMessage() {
    let chatBox = document.querySelector("#chat-box");
    let msgInput = document.querySelector("#chat-outgoing-msg");
    let chatOutgoingBox = document.createElement("div");
    let date = new Date();
    let now = date.getHours() + ":" + date.getMinutes() + " | " + date.getMonth() + "/" + date.getDate();

    chatOutgoingBox.innerHTML = getSendMsgBox(msgInput.value, now);
    chatOutgoingBox.className = "outgoing_msg";

    chatBox.append(chatOutgoingBox);
    msgInput.value = "";
}

function initMessage(history) {
    let chatBox = document.querySelector("#chat-box");
    let msgInput = document.querySelector("#chat-outgoing-msg");
    let chatOutgoingBox = document.createElement("div");
    
    chatOutgoingBox.innerHTML = getSendMsgBox(history.msg, history.createdAt);
    chatOutgoingBox.className = "outgoing_msg";

    chatBox.append(chatOutgoingBox);
    msgInput.value = "";
}



document.querySelector("#chat-send").addEventListener("click", () => {
    addMessage();
});

document.querySelector("#chat-outgoing-msg").addEventListener("keydown", (e) => {
    if(e.keyCode === 13) {
        addMessage();
    }
});