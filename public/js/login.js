console.info('login.js')

import {$,toogleDisplay} from '/js/jr-utils.js'

// $('#login-modal').style.display = 'none'

$('#login-modal').onclick = (e)=>{
  if(e.target == $('#login-modal') )
  toogleDisplay($('#login-modal'))
}

$('#login-form').addEventListener('submit', (e)=>{
  $('#login-current-route').value = location.pathname
})


