console.info('login.js')

import {$,toogleDisplay} from '/js/jr-utils.js'

$('#login-modal').style.display = 'none'

$('#login-modal').onclick = (e)=>{
  if(e.target == $('#login-modal') )
  toogleDisplay($('#login-modal'))
}



function closeButton(el){
  toogleDisplay(el)
}

