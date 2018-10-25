'use strict';

var gDev = [
    { img: 'img/sawsan.png', email: 'sawsan.elhade@gmail.com', mail: 'https://mail.google.com/mail/?view=cm&fs=1&to=sawsan.elhade@gmail.com.com&su=SUBJECT&body=Message-Content', phone: 'tel:0549929777', linkedIn: 'https://www.linkedin.com/in/sawsan-elhade-sawsan-elhade/' }, //Sawsan
    { img: 'img/Jake.png', email: 'jake.james.collins@gmail.com', mail: 'https://mail.google.com/mail/?view=cm&fs=1&to=jake.james.collins@hotmail.com&su=SUBJECT&body=Message-Content', phone: 'tel:0523798940', linkedIn: 'https://www.linkedin.com/in/jake-collins-850349143/' } //Jake
];

function init() {
    document.querySelector('#mail').href = gDev[0].mail;
    document.querySelector('#phone').href = gDev[0].phone;
    document.querySelector('#linkedIn').href = gDev[0].linkedIn;
    document.querySelector('#devImg').src = gDev[0].img;
}

function updateContact(id) {
    document.querySelector('#mail').href = gDev[id].mail;
    document.querySelector('#phone').href = gDev[id].phone;
    document.querySelector('#linkedIn').href = gDev[id].linkedIn;
    document.querySelector('#devImg').src = gDev[id].img;
}

function sendMessage() {
    let mail = document.querySelector('#currDev').value;
    mail = gDev[mail].email;
    let sub = document.querySelector('#subject').value;
    let cont = document.querySelector('#content').value;
    console.log(mail, sub, cont);
    let str = 'https://mail.google.com/mail/?view=cm&fs=1&to=' + mail + '&su=' + sub + '&body=' + cont;
    window.location = str;
}