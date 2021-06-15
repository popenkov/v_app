/* https://podcast---app-default-rtdb.europe-west1.firebasedatabase.app/ */
export class Question {
    static create (question) {
        return fetch('https://podcast---app-default-rtdb.europe-west1.firebasedatabase.app/questions.json', {
            method: 'POST',
            body: JSON.stringify(question),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(response => {
            question.id = response.name; // для объекта вопроса создаем новое моле со сгенерированным именем ответа.
            return question;
        })
        .then(addToLocalStorage)
        .then(Question.renderList) 
    }

    static fetch (token) {
        if (!token) {
            return Promise.resolve('<p class="error">У вас нет токена</p>')
        }
        return fetch(`https://podcast---app-default-rtdb.europe-west1.firebasedatabase.app/questions.json?auth=${token}`)
            .then(response => response.json())
            .then(response => {
                if (response && response.error) {
                    return `<p class="error">${response.error}</p>`;
                }

                return response  ? Object.keys(response).map(key => ({ //сделает из объекта ответа массив ключей привычного формата
                    ...response[key],
                    id: key
                })) : [];

                
            })
        
    }

    //теперь надо отрендерить вопросы на страницу. сделаем статичным методом, так как будем использовать его и в аппжс
    static renderList () {
        const questions = getQuestionsFromLocalStorage();

        const html = questions.length 
        ? questions.map(toCard).join('') // метод 
        : `<div class="mui--text-headline">Вы пока ничего не спрашивали</div>`;

        const list = document.querySelector('#list');
        list.innerHTML = html;

    }

    static listToHTML (questions) {
        return questions.length
            ? `<ol>${questions.map(q => `<li>${q.text}</li>`).join('')}</ol>`
            : `<p>Вопросов пока нет</p>`
    }
}

function addToLocalStorage (question) {
    //чтобы не перезаписывать значение локалсторэйдж (что происходит при каждом новом запросе), надо сначала получить значение из ЛС, а затем добавить в него новое
    const all = getQuestionsFromLocalStorage(); // это массив
    all.push(question); // добавляем вопрос
    localStorage.setItem('questions', JSON.stringify(all)); // отправляем не один вопрос, а весь массив
}

function getQuestionsFromLocalStorage () {
    return JSON.parse(localStorage.getItem('questions') || '[]'); // функция вернет массив с вопросами ИЛИ пустой массив на случай, если ЛС пуст. 
}

function toCard (question) {
    return `
    <div class="mui--text-black-54">${new Date(question.date).toLocaleDateString()} ${new Date(question.date).toLocaleTimeString()}    </div>
    <div>${question.text}</div>
    <br>
    `
}
    