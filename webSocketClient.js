
const socket = new WebSocket("ws://localhost:5000");

socket.onmessage = (event) => {
    const message = event.data;
    if (message === "Reload!") {
        location.reload();
    }
};

