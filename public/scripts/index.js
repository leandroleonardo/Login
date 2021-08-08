let loginForm = document.querySelector('#loginForm')

    loginForm.addEventListener('submit', e => {
        
        e.preventDefault();

        const formData = {
            email: document.querySelector('input[name = "email"]').value,
            password: document.querySelector('input[name = "password"]').value
        }

        const messageLogin = document.querySelector('#message')

        let url = '/user/login'
        let options = {
            method: 'POST',
            headers : { 
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }

        async function login(){
        
            const res = await fetch(url,options)
            const token = await res.json() 
            const status = await res.status

            if(status === 401) messageLogin.innerHTML = `<p>${token}</p>`
            else {
                messageLogin.innerHTML = ``
                localStorage.setItem('token',token)
                window.location.href = "/user/home";
            }
        }
        
    login()
})