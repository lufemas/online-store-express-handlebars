console.info('jr-utils')
export const $ = (e) => document.querySelector(e)

export const toogleDisplay = (el)=>{
 
  if( !el.offsetParent ){
    el.style.display = 'inline-block' 
  }else{
    el.style.display = 'none'
  }
}


