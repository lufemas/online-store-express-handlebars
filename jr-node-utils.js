const capitalizeFirst = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const formatCurrency = (num) => num.toFixed(2) 

module.exports = {
  capitalizeFirst: capitalizeFirst,
  formatCurrency : formatCurrency
}