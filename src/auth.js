export function getAuthForm() {
    return `
    <form class="mui-form" id="auth-form">
        <div class="mui-textfield mui-textfield--float-label">
            <input type="email" id="email" required>
            <label for="email">E-Mail</label>
        </div>
        <div class="mui-textfield mui-textfield--float-label">
            <input type="password" id="password" required>
            <label for="password">Password</label>
        </div>

        <button type="submit" class="mui-btn mui-btn--raised mui-btn--primary">Войти</button>
    </form>
    `
}

//также создаем в фаербэйс возможность логиниться по почте и паролю. добавляем себя для теста. гуглим firebase rest auth https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password
//https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY] 
//[API_KEY] мы можем получить в овервью приложения, где мы регистрируем приложение и получаем АПИ
export function authWithEmailAndPassword (email, password) {
    const apiKey= 'AIzaSyBXDaRgGduVzV0ugyrN0ue7otIanNpqnJA';
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
        method: 'POST',
        body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true //это из документации фаербэйс
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => data.idToken)
} 