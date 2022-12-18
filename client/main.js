// Try to set up WebSocket connection with the handshake at "http://localhost:8080/stomp"
let sock = new SockJS("http://localhost:8080/test");

// Create a new StompClient object with the WebSocket endpoint
let client = Stomp.over(sock);

// Start the STOMP communications, provide a callback for when the CONNECT frame arrives.
client.connect(
  {
    'Authorization':
      "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtc3phYmkwMzEwIiwiaWF0IjoxNjcwOTMzMzc2LCJleHAiOjE2NzEwMTk3NzZ9.lZjN54IAcemfx_H0-a1U-c94r-shewRhwyHM_uPk7XMSQJpVIDXrvX9SC8ROnZW5eoLC2rMO-f2wjG53MV_E6Q",
  },
  (frame) => {
    // Subscribe to "/topic/messages". Whenever a message arrives add the text in a list-item element in the unordered list.
    client.subscribe("/topic/messages", (payload) => {
      let message_list = document.getElementById("message-list");
      let message = document.createElement("li");

      message.appendChild(document.createTextNode(JSON.parse(payload.body).message));
      message_list.appendChild(message);
    });
  }
);

// Take the value in the ‘message-input’ text field and send it to the server with empty headers.
function sendMessage() {
  let input = document.getElementById("message-input");
  let message = input.value;

  client.send("/app/chat", {}, JSON.stringify({ message: message }));
}
