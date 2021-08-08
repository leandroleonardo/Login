let registerForm = document.querySelector('#loginForm')

registerForm.addEventListener('submit', e =>{
    
    let message = document.querySelector('#message')
    e.preventDefault()

    let formData = {
        name: document.querySelector('input[name="name"]').value,
        email: document.querySelector('input[name="email"]').value,
        password: document.querySelector('input[name="password"]').value
    }
    
    const url = '/user/register'
    
    const options = {
        method:'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(formData)
    }
    
    async function register(){
        
        const req = await fetch(url, options)
        const data = await req.json()
        const status = await req.status

        message.innerHTML = '<div></div>'

        if(status === 200) {
            message.innerHTML = `<div><p class="registerAccept">${data}</p></div>` 
            setTimeout(()=>{ 
                window.location.href = "/user/login";
            },1500)
        }else{
            message.innerHTML += `<div><p>${data}</p></div>` 
        }
    }
    register()
})