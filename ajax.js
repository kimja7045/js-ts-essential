// const xhr = new XMLHttpRequest()
const ajax = new XMLHttpRequest()
const URL = 'http://3.35.98.68:8000/v1/sign-up/'
let data = {
    phone_number: '01012345920', // required
    nickname: 'asdf', // localstorage nickname
    level: 3, // localstorage level
    point: 121, // localstorage point
}

ajax.open('POST', URL, false)
ajax.setRequestHeader('Content-Type', 'application/json') // 컨텐츠타입을 json으로
ajax.send(JSON.stringify(data))
