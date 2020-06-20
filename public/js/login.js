console.info('login.js')

import {$,toogleDisplay} from '/js/jr-utils.js'

$('#login-modal').style.display = 'none'

function closeButton(el){
  toogleDisplay(el)
}

