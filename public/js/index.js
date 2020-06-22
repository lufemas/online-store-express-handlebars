import {$, toogleDisplay} from '/js/jr-utils.js'


console.info('index.js')


window.onload = ()=>{
  console.log('Are you sure you want to leave?');
  $('#main-footer').style.bottom = '0px'
}


$('#login-link').onclick = (e)=>{
  e.preventDefault()
  toogleDisplay($('#login-modal'))
}

$('#registration-link').onclick = (e)=>{
  e.preventDefault()
  toogleDisplay($('#registration-modal'))
}



// window.onbeforeunload =  (e) => {
//   e.preventDefault()
//   console.log('Are you sure you want to leave?');
// }
