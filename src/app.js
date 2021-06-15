import {Question} from './question';
import {createModal, isValid} from './utils';
import {getAuthForm, authWithEmailAndPassword} from './auth'
import './styles.css';


const form = document.querySelector('#form');
const input = form.querySelector('#question-input');
const submitBtn = form.querySelector('#submit');
const modalBtn = document.querySelector('#modal-btn');

window.addEventListener('load', Question.renderList); //при перезагрузке посты пропадают. так они будут отрисовываться заново при каждой перезагрузке
form.addEventListener('submit', submitFormHandler);
modalBtn.addEventListener('click', openModal)
 
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



function openModal() {
    createModal('Авторизация', getAuthForm());
    //теперь когда мы создали верстку форму надо убрать стандартное поведение
    document
        .getElementById('auth-form')
        .addEventListener('submit', authFormHandler, {once: true}); // once - чтобы событие было добавлено только один раз
}

function authFormHandler (evt) {
    evt.preventDefault();

    const btn = evt.target.querySelector('button');
    btn.disabled = true;

    const email = evt.target.querySelector('#email').value;
    const password = evt.target.querySelector('#password').value;
    authWithEmailAndPassword(email, password)
        .then(token=> {
            return Question.fetch(token)
        })
        .then(renderModalAfterAuth)
        .then(() => btn.disabled = false)
        // для защиты данных мы пошли в БД на фаербэйс и выбрали там меню Правила.
        /* {
  "rules": {
    ".read": "auth != null", 
    ".write": true,  
  }
} */
}

function renderModalAfterAuth(content) {
    if (typeof content === 'string') {
        createModal('Ошибка', content)
    } else {
        createModal('Список вопросов', Question.listToHTML(content))
    }
}