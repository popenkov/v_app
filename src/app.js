import {Question} from './question';
import {isValid} from './utils';
import './styles.css';

console.log('13');

const form = document.querySelector('#form');
const input = form.querySelector('#question-input');
const submitBtn = form.querySelector('#submit');

form.addEventListener('submit', submitFormHandler);

//валидация формы
input.addEventListener('input', () => {
    submitBtn.disabled = !isValid(input.value);
});

function submitFormHandler (evt) {
    evt.preventDefault();

    if (isValid(input.value)) {
        const question = {
            text: input.value.trim(),
            date: new Date().toJSON(),
        }

        submitBtn.disabled = true; //блокируем на время пока идет запрос на сервер, чтобы не было спама.
        //async request to server to save questions
        Question.create(question).then(() => { //выполниться после все зэн внутри класса
            input.value = '';
            input.className = ''; //убираем красный валидации форм.
            submitBtn.disabled = false; 
        });



        
    }

}