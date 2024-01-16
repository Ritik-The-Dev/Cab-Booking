const cabSchema = require("../schema")
const nodeMailer =  require("nodemailer")
exports.cabBooking = async(req,res)=>{
    try{
       const {PhoneNumber,PickupLocation,DropoffLocation,Date,Time} = req.body
       if(!PhoneNumber,!PickupLocation || !DropoffLocation || !Date ||!Time){
        return res.json({msg:"Please provide all fields"})
       }

       const email = "ratanjeetsinghrandhawa@gmail.com"  

       const transporter = nodeMailer.createTransport({
         host:process.env.MAIL_HOST,
         auth:{
           user:process.env.MAIL_USER,
           pass:process.env.MAIL_PASS
         }
       })
   
       try{
         const MailInfo = await transporter.sendMail({
           from:"New Booking",
           to:email,
           subject:"New Booking",
           html: `<h1>New Booking </h1>
           <br>
           <h2>
           PhoneNumber : ${PhoneNumber}
           <br>
           PickupLocation : ${PickupLocation}
           <br>
           DropoffLocation:${DropoffLocation}
           <br>
           Date:${Date}
           <br>
           Time:${Time}}
           </h2>`
         })
       }
       catch(err){
         console.log(`Failed to send Email` ,err)
       }
       const data = await cabSchema.create({PhoneNumber,PickupLocation,DropoffLocation,Date,Time})
       return res.json({
        success:true,
        data:data,
        message:"Booking Accepted"
       })
    }
    catch(err){
        console.log(err)
    }
}