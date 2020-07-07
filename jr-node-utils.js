const capitalizeFirst = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const formatCurrency = (num) => num.toFixed(2) 

const isObjEmpty = (obj) => {
  for(let key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}

module.exports = {
  capitalizeFirst: capitalizeFirst,
  formatCurrency : formatCurrency,
  isObjEmpty : isObjEmpty
}