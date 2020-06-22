console.info('jr-utils')
export const $ = (e) => document.querySelector(e)

export const toogleDisplay = (el)=>{
  if( el.style.display == 'none' ){
    el.style.display = 'inline-block' 
  }else{
    el.style.display = 'none'
  }
}


