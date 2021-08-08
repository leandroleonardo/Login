function logout(){
    localStorage.removeItem('token')
    window.location.href = "/user/login";
}

function load(){

    const token = localStorage.getItem('token')
    const url = '/user/home'
    
    const options = {
        method:'post', 
        headers: {'Content-Type':'aplication/json','authorization-token':token},
    }

    async function authToken(){
        
        const res = await fetch(url,options)
        const data = await res.json()
        const status = await res.status

        let home = document.querySelector('#home')

        if(status === 200) home.innerHTML = `<h3>${data}</h3><button onclick="logout()" id="logout">Sair</button>`
        else {
            home.innerHTML = `<h3>${status}</h3><a href="/user/login">Fazer Login</a>` 
        }
    }

    authToken()
}

load()