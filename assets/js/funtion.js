let name = "";
let time = "";

let socket = io();

let messages = document.querySelector('#messages');
let form = document.querySelector('#sendMessage');
let input = document.querySelector('#input');
let guestName = document.querySelector('#guestName')
let guestNameInput = document.querySelector('#guestName-input')

guestName.addEventListener('submit', function (e) {
    e.preventDefault();
    name = guestNameInput.value;
    socket.emit('new member', name);
    document.querySelector('#chat').classList.remove('hidden');
    document.querySelector('#name').classList.add('hidden');
})

form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (input.value) {
        let date = new Date();
        let hour = date.getHours();
        let minutes = date.getMinutes();
        time = `${hour}:${minutes}`

        socket.emit('chat message', input.value);
        input.value = '';
    }
});

socket.on('new member', function (guest) {
    let item = document.createElement('li');

    if (localStorage.getItem('name') == guest) {
        item.innerHTML += `<span class="bold">Bem vindo ${guest}</span>`;
    }
    else{
        item.innerHTML += `<span class="bold">${guest} juntou-se à conversa</span>`;
        localStorage.setItem('name', guest);
    }

    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
})

socket.on('chat message', function (msg) {
    let item = document.createElement('li');
    item.innerHTML += `<div class="user"> <span class="name bold">${name}</span><span class="time">${time}</span></div>: <span class="msg">${msg}</span>`;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});