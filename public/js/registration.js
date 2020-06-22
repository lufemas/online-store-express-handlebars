console.info('registration.js')

import {$, toogleDisplay} from '/js/jr-utils.js'

$('#registration-modal').style.display = 'none'

$('#registration-modal').onclick = (e)=>{
  if(e.target == $('#registration-modal') )
  toogleDisplay($('#registration-modal'))
}




