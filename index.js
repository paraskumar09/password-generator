const lengthSlider=document.querySelector("[length-slider]")
const lengthdiv=document.querySelector("[pass-length]");
const symbolString="!@#$%^&*()_+/*~ ,./<>?[]{}|;':=-";
const indicator=document.querySelector("#strength-indicator");

const upperCase=document.querySelector('#uppercase');
const lowerCase=document.querySelector('#lowercase');
const number=document.querySelector('#number');
const symbol=document.querySelector('#symbol');
const copyBtn=document.querySelector("#copy-btn");
const generatedPass=document.querySelector("#password");
const passGenerator=document.querySelector('#generatebtn');
 const copy_btn=document.querySelector('#copy-btn');
 const checkbox=document.querySelectorAll('.check');

let password="";
let passlength=10;
let checkCount=0;

function handleSlider()
{
    slidder.value=passlength;
    lengthdiv.textContent=passlength;
    const max=slidder.max;
    const min=slidder.min;
    console.log(max);
    console.log(min);
    console.log((passlength-min)*100/(max-min));
   
    slidder.style.backgroundSize=((passlength-min)*100/(max-min))+"% 100%";
}

handleSlider();
function getInt(min,max)
{
    let num=Math.floor(Math.random()*(max-min))+min;
    return num;
}

function getUpperCase()
{
    return String.fromCharCode(getInt(65,91));
}
function getLowerCase()
{
    return String.fromCharCode(getInt(97,123));
}

function getNumber(){
    return getInt(0,10);
}

function getSymbol()
{
    
    return symbolString.charAt(getInt(0,symbolString.length));
}

function setindicator(color)
{
    indicator.style.backgroundColor=color;
    indicator.style.boxShadow="0px 0px 5px 3px " + color;
    
}

function strengthcheck()
{
    if(upperCase.checked && lowerCase.checked && (number.checked || symbol.checked) && passlength>=8)
    {
        setindicator("#0f0");
    }
    else if((upperCase.checked || lowerCase.checked) && (number.checked || symbol.checked)  && passlength>=6)
    {
        setindicator("#ff0");
    }
    else{
        setindicator("#f00");
    }
}

async function copy()
{
    try{
        await navigator.clipboard.writeText(generatedPass.textContent);
    }
    catch(e)
    {

    }
    
}

lengthSlider.addEventListener('input',(e)=>{
    passlength=e.target.value;
    handleSlider();

})




copy_btn.addEventListener('click',(e)=>{
    if(generatedPass.textContent)
    {
        copy();
    }
})

function handlechecks(){
    checkCount=0;
    checkbox.forEach(box=>{
        if(box.checked)
        {
    
            checkCount++;
        }
    })

    if(checkCount>passlength)
    {
        passlength=checkCount;
        handleSlider();
        console.log(passlength);
    }
}
checkbox.forEach(box => {
    box.addEventListener('change',handlechecks)
})


passGenerator.addEventListener('click',(e)=>{
    if(checkCount<=0)
    {
        return;
    }

    handlechecks();
    let funcarr=[];
    password="";

    if(upperCase.checked)
    {
    
        funcarr.push(getUpperCase);

    }

    if(lowerCase.checked)
    {
        funcarr.push(getLowerCase);
    }

    if(number.checked)
    {
        funcarr.push(getNumber);
    }

    if(symbol.checked)
    {
        funcarr.push(getSymbol);
    }

    for(let i=0;i<funcarr.length;i++)
    {
        password+=funcarr[i]();
    }

    for(let i=0;i<passlength-funcarr.length;i++)
    {
        let index=getInt(0,funcarr.length);
        password+=funcarr[index]();
    }

    password=shuffle(Array.from(password));

    generatedPass.textContent=password;
    strengthcheck();

})

function shuffle(arr)
{
    for(let i=arr.length-1;i>0;i--)
    {
        const j=Math.floor(Math.random()*(i+1));

        const temp=arr[i];
        arr[i]=arr[j];
        arr[j]=temp;
    }

    let str="";
    arr.forEach(element => {
        str+=element;
    });

    return str;
}
