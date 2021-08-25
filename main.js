const resultEl = document.getElementById('result')
const lengthEl = document.getElementById('length')
const uppercaseEl = document.getElementById('uppercase')
const lowercaseEl = document.getElementById('lowercase')
const numbersEl = document.getElementById('numbers')
const symbolsEl = document.getElementById('symbols')
const clipboardEl = document.getElementById('clipboard')
const generateEl = document.getElementById('generate')



// Generator function

const randomFunc =  {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}


generateEl.addEventListener('click',()=>{
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumbers = numbersEl.checked;
    const hasSymbols = symbolsEl.checked;
    resultEl.innerText = generatePassword(hasLower,hasUpper,hasNumbers,hasSymbols,length);
})

function getRandomLower() {
  return  String.fromCharCode(Math.floor(Math.random()*26)+97)
 }

function getRandomUpper() {
    return  String.fromCharCode(Math.floor(Math.random()*26)+65)
  }
  


function getRandomNumber() {
    return  String.fromCharCode(Math.floor(Math.random()*10)+48);
  }

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.'
    return  symbols[Math.floor(Math.random()*symbols.length)]
  }


 clipboardEl.addEventListener('click',()=>{
     const textArea = document.createElement('textarea');
     const password = resultEl.innerText;

     if(!password) {
         return;
     }

     textArea.value = password;
     document.body.appendChild(textArea);
     textArea.select();
     document.execCommand('copy');
     textArea.remove();
     alert('password copied to clipboard')
 }) 
  const generatePassword = (lower,upper,number,symbol,length) => {
        let generatedPassword = ""
        const typesCount = lower+upper+number+symbol;

        const typesArray = [{lower},{number},{upper},{symbol}].filter(item => Object.values(item)[0])
        if(typesCount === 0) {
            return '';
        }

        for(let i=0; i<length; i += typesCount) {
            typesArray.forEach(type => {
                const funcName = Object.keys(type)[0]
            generatedPassword += randomFunc[funcName]();

            })

        }
    let finalPassword = generatedPassword.slice(0,length)
    return finalPassword
 }
  
