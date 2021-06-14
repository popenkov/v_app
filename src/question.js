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
        .then(response => {console.log(response)
        })
    }
}