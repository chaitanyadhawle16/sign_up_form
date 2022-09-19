const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmpass = document.getElementById('confirmpass');
const eye1 = document.getElementById('eye1');
const eye2 = document.getElementById('eye2');
var pop = document.getElementById('pop-up-container');
var state = false;

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    eye1.className = 'fa fa-eye-slash';
    eye2.className = 'fa fa-eye-slash';
    check();
});

eye1.addEventListener('click', function passDisplay(){
    if(state){
        eye1.className = 'fa fa-eye-slash';
        password.setAttribute('type','password');
        state  = false; 
    }
    else{
        eye1.className = 'fa fa-eye';
        password.setAttribute('type','text');
        state = true; 
    }
});

eye2.addEventListener('click', function passDisplay(){
    if(state){
        eye2.className = 'fa fa-eye-slash';
        confirmpass.setAttribute('type','password');
        state  = false; 
    }
    else{
        eye2.className = 'fa fa-eye';
        confirmpass.setAttribute('type','text');
        state = true; 
    }
});

function check(){
    const unValue = username.value.trim();
    const eValue = email.value.trim();
    const pValue = password.value.trim();
    const cpValue = confirmpass.value.trim();
    
    if(unValue.length == 0){
        setError(username,'Username cannot be blank');
    }else if(unValue.length < 3 || unValue.length > 25){
        setError(username,'Username should be between 3 and 25 characters');
    }else{
        setSuccess(username);
    }
    
    if(eValue.length == 0){
        setError(email,'Email cannot be blank');
    }else if(checkEmail(eValue)){
        setSuccess(email);
    }
    else{
        setError(email,"Invalid email");
    }

    if(checkPass(pValue)){
        setSuccess(password);
    }
    else{
        setError(password, 'Password must atleast have 8 characters that include atleast 1 lowecase character, 1 uppercase character, 1 number and 1 special character');
    }

    if(cpValue == pValue){
        if(cpValue.length!=0){
            setSuccess(confirmpass);
        }
        else{
            setError(confirmpass,'Password empty');
        }
    }
    else{
        setError(confirmpass,'Values do not match');
    }
    
    const list =[username.parentElement, email.parentElement, password.parentElement, confirmpass.parentElement];
    var flag = true;
    for(var i=0; i<list.length; i++){
        if(list[i].classList.contains('error')){
            flag = false;
            return;
        }
    }

    if(flag){
        // pop.setAttribute('display','inline');
        alert('Sign up successfull !');
    }
}

function setError(input, message){
    const fc = input.parentElement;
    const msg = fc.querySelector('small');
    msg.innerText = message;

    fc.className = 'form-content error';
}

function setSuccess(input){
    const fc = input.parentElement;
    fc.className = 'form-content success'
}

function checkEmail(email){
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(email.match(mailformat)){
        return true;
    }
    return false;
}

function checkPass(password){
    var criteria =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,25}$/;

    if(password.match(criteria)){
        return true;
    }
    return false;
}