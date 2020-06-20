import {$, toogleDisplay} from '/js/jr-utils.js'


console.info('index.js')


window.onload = ()=>{

}


$('#login-link').onclick = (e)=>{
  e.preventDefault()
  toogleDisplay($('#login-modal'))
}

$('#registration-link').onclick = (e)=>{
  e.preventDefault()
  toogleDisplay($('#registration-modal'))
}

const $closeModalBtnCollection = document.getElementsByClassName('close-modal-btn')
for(const $btn of $closeModalBtnCollection){
  $btn.onclick = ()=>{
    toogleDisplay( $( $btn.value ) )
  }
}
