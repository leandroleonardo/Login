function load(){

    let message = document.querySelector("#message")
    
    const token = localStorage.getItem('token')
    const url = '/admin'
    
    const options = {
        method:'post', 
        headers: {'authorization-token':token},
    }

    async function authToken(){

        const res = await fetch(url,options)
        const data = await res.json()
        const status = await res.status

        if(status === 404)
            message.innerHTML += `<p>${data}</p>`
        else
            message.innerHTML += `</p>${data}</p>`
    }

    authToken()
}

load()