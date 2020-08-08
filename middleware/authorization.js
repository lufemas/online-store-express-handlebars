const dashBoardLoader = (req,res)=>{

  if(req.session.userInfo.credential==="admin")
  {
      res.render("clerkDashboard");
  }
  
  else
  {
      res.render("userDashboard");
  }

}

module.exports = dashBoardLoader;