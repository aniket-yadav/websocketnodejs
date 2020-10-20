let loginEmailError = document.querySelector('.loginEmailError');
let loginPasswordError = document.querySelector('.loginPasswordError');
let loginForm= document.querySelector('.login');

if(loginForm){
loginForm.addEventListener('submit',async (e)=>{
        e.preventDefault();
        
        //reset error
        loginEmailError = '';
        loginPasswordError = 'hgjkbkj';
        
        loginEmailError.textContent = 'enter';
        //set value

        const loginEmail = loginForm.lemail.value;
        const loginPassword = loginForm.lpassword.value;
        try{
            const res = await fetch('/login',{
                method : 'POST',
                headers:{'Content-Type':'application/json'},
                body : JSON.stringify({email:loginEmail,password:loginPassword}),
            });
            
            const data = await res.json();
            if(data.errors){
                loginEmailError.textContent = data.errors.email;
                loginPasswordError.textContent = data.errors.password;
            }
            if(data.user){
                location.assign('/');
            }
        }
        catch(err){
    
        }

    });
}