const url = require('url');

const isLoggedIn = (req,res,next)=>{

  console.log('authentication!')
  if(req.session.userInfo)
  {
      next();
  }
  
  else
  {
      // res.redirect("/user/login")
      res.redirect(
        url.format({
          pathname: '/',
          query: {
            error: 'Please Log In',
            loginModal: true,
            loginTry: true,
          },
        })
      );
  }

}

module.exports = isLoggedIn;