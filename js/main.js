const input = document.querySelector('input')
const btnAdd = document.querySelector('#btn_add')
const btnDarkLight = document.querySelector('button')
const imgToggle1 = document.querySelector('.ligth_dark')
const imgToggle2 = document.querySelector('.dark_ligth')
const ul = document.querySelector('#ul')
const tittleColor = document.querySelector('#list_work_tittleColor')
const pGretting = document.getElementById('gretting')
const motivationPhrase = document.getElementById('motivationPhrase')
const containerListWorkPendientes = document.querySelector('.container-list_work_pendientes')
const listDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thurday', 'Friday', 'Saturday']
const listMoths = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]
function date() {
  const time = new Date()
  let day = time.getDay()
  let date = time.getDate()
  let month = time.getMonth()
  document.getElementById('time').innerHTML = listDay[day] + ' ' + date + ' De ' + listMoths[month]
}
pGretting.addEventListener('click', () => {
  let yourName = prompt(`What's your name?`)
  pGretting.innerHTML = 'Hola , ' + yourName
  motivationPhrase.classList.add('appear')
})
btnAdd.addEventListener('click', () => {
  if (input.value !== '') {
    const li = document.createElement('li')
    const p = document.createElement('p')
    p.innerHTML = input.value
    li.appendChild(p)
    pcolor = document.getElementsByTagName('p')
    // li.appendChild(btnDelete())
    li.appendChild(btnDelete())
    ul.appendChild(li)
    input.value = ''
    const listLi = document.querySelectorAll('li')
    if (listLi.length != null) {
      containerListWorkPendientes.classList.remove('disactive')
      containerListWorkPendientes.classList.add('active')
    }
  }
})
let j = 0
function btnDelete() {
  const btnDelete = document.createElement('button')
  const i = document.createElement('i')
  i.classList.add('bi')
  i.classList.add('bi-trash')
  btnDelete.classList.add('btn')
  btnDelete.classList.add('btn-outline-danger')
  btnDelete.classList.add('btn-sm')
  btnDelete.appendChild(i)
  btnDelete.addEventListener('click', () => {
    ul.classList.add('opacity')
    setTimeout(() => {
      btnDelete.parentElement.remove()
      const listLi = document.querySelectorAll('li')
      console.log(listLi)
      if (listLi.length == 0) {
        containerListWorkPendientes.classList.toggle('disactive')
        containerListWorkPendientes.classList.remove('active')
      }
    }, 100)
  })

  return btnDelete
}
let counter = 0
btnDarkLight.addEventListener('click', () => {
  if (counter == 2) {
    counter = 0
  }
  console.log(counter)
  if (counter == 0) {
    document.body.style.backgroundColor = '#000'

    imgToggle1.classList.add('disactive')
    imgToggle2.classList.remove('disactive')
  }
  if (counter == 1) {
    imgToggle1.classList.remove('disactive')
    imgToggle2.classList.add('disactive')
    document.body.style.backgroundColor = '#f1f1f1'
  }
  counter++
})
setInterval(date, 1000)
