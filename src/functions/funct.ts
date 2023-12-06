export function setUserName(){
    let name =<String>prompt('write you name to greet at you every time you enter')
    if(name){
        const motivationPhrase = <HTMLElement>document.querySelector('#motivationPhrase')
        motivationPhrase.classList.toggle('appear')
    }
}
