const main = document.querySelector('main')
const root = document.querySelector(':root')
const input = document.getElementById('input')
const resultInput = document.getElementById('result')

const allowedKeys = ["(", ")", "/", "*", "-", "+", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", ".", "%", " "]

document.querySelectorAll('.charKey').forEach(function (charKeyBtn){ //selecionando todos os botões e o foreach vai ser executado para quando um dos botões
    charKeyBtn.addEventListener('click', function (){
        const value = charKeyBtn.dataset.value //data.set serve para pegar os atributos do html
        input.value += value
    })
})

document.getElementById('clear').addEventListener('click', function (){
    input.value = ''
    input.focus() //após limpar, vai focar no input
})

input.addEventListener('keydown', function (ev){
    ev.preventDefault() //previnir o comportamento padrão da função, para quando o usuário apertar a tecla não seja escrito
    if (allowedKeys.includes(ev.key)){ //ev.Key tecla associado ao evento = tecla que o usuário pressiomou
        input.value += ev.key //se for uma tecla permitida, ai vamos adiciona-la ao input
        return
    }
    if (ev.key === 'Backspace'){ //ev.key é a tecla q o usuário digitou
        input.value = input.value.slice(0, -1) //vai pegar o último e excluir
    } 
    if (ev.key === 'Enter'){
        calculate()
    }
    
})

document.getElementById('equal').addEventListener('click', calculate)

function calculate (){
    //A função calculate vai por padrão executar as duas primeiras linhas de ERROR, depois vai tentar calcular o resultado com o eval
    resultInput.value ='ERROR'
    resultInput.classList.add('error') //adicionando uma class do css para mudar a estilização do texto
    
    const result = eval(input.value)  //eval serve para avaliar o código js e executar o código, é um método perigoso (2+2=4 exemplo, o js vai avaliar e fazer esse código)
    
    //se o eval for executado ele vai dar o resultado e remover a class de error
    resultInput.value = result
    resultInput.classList.remove('error')
}

document.getElementById("copyToClipboard").addEventListener("click", function (ev) {
    const button = ev.currentTarget
    if(button.innerText === 'Copy'){ //innerText = propriedade do texto interno do elemento
        button.innerText = "Copied!"
        button.classList.add('success') //adicionando uma classe do css (.sucess) no botão
        window.navigator.clipboard.writeText(resultInput.value) //escrevendo o texto do valor do resultado do input para seja copiado com o clipboard
    } else {
        button.innerText = 'Copy'
        button.classList.remove('success')
    }
})


document.getElementById('themeSwitcher').addEventListener('click', function (){
    if (main.dataset.theme === 'dark'){
        root.style.setProperty('--bg-color', '#f1f5f9') //acessar diretamente os estilos do elemento root
        root.style.setProperty('--border-color', '#aaa')
        root.style.setProperty('--font-color', '#212529')
        root.style.setProperty('--primary-color', '#26834a')
        main.dataset.theme = 'light'
    }else {
        root.style.setProperty('--bg-color', '#212529') 
        root.style.setProperty('--border-color', '#666')
        root.style.setProperty('--font-color', '#f1f5f9')
        root.style.setProperty('--primary-color', '#4dff91')
        main.dataset.theme = 'dark'
    }
})