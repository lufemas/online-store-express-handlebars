const user = {
  logged: false,
  name: '',
  logIn(name){
    this.name = name;
    this.logged = true
  }
}

module.exports = user