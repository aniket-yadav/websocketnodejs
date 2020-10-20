let signupEmailError = document.querySelector('.signupEmailError');
let signupPasswordError = document.querySelector('.signupPasswordError');
let signupUsernameError = document.querySelector('.signupUsernameError');
let signupConfirmPasswordError = document.querySelector('.signupConfirmPasswordError');
let signupForm = document.querySelector('.signup');

if(signupForm){
    signupForm.addEventListener('submit', async (e)=>{
    e.preventDefault();

    
    //reset error
    signupEmailError.textContent = '';
    signupPasswordError.textContent = '';
    signupConfirmPasswordError.textContent = '';
    
    //get value
    

        const signupEmail = signupForm.semail.value;
        const signupPassword = signupForm.spassword.value;
        const signupConfirmPassword = signupForm.sconfirmpassword.value;
        const signupUsername = signupForm.susername.value;

        if(signupConfirmPassword === signupPassword)
{
    try{
        const res = await fetch('/signup',{
            method : 'POST',
            headers:{'Content-Type':'application/json'},
            body : JSON.stringify({email:signupEmail,password:signupPassword,username:signupUsername}),
        });
        
        const data = await res.json();
        if(data.errors){
            signupEmailError.textContent = data.errors.email;
            signupPasswordError.textContent = data.errors.password;
            signupUsernameError.textContent = data.errors.username;
        }
        if(data.user){
            location.assign('/');
        }
    }
    catch(err){

    }
}else{
    signupConfirmPasswordError.textContent = 'Password and Confirm Password should be same.';
}
});
   
}