const dashBoardLoader = (req,res)=>{

 
  if(req.session.userInfo.credential==="admin")
  {
      res.redirect("/products/dashboard");
  }
  else
  {
      res.render("userDashboard");
  }

}

const adminOnly = (req,res,next)=>{

  if(req.session.userInfo){
    
    if(req.session.userInfo.credential==="admin")
    {
        next()
    }
  }
  
  else
  {
      res.redirect('/')
  }

}

module.exports = {
  dashBoardLoader,
  adminOnly
};