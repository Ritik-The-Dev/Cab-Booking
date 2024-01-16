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
          from: 'New Booking',
          to: email,
          subject: 'New Booking',
          html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 20px; background-color: #f4f4f4;">
              <h1 style="color: #3498db; text-align: center; margin-bottom: 20px;">New Booking</h1>
              <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <h2 style="color: #333; margin-bottom: 20px; font-size: 1.2em;">
                  <strong>Booking Details:</strong>
                </h2>
                <ul style="list-style: none; padding: 0; margin: 0;">
                  <li style="margin-bottom: 10px; color: #555;">
                    <strong>Phone Number:</strong> ${PhoneNumber}
                  </li>
                  <li style="margin-bottom: 10px; color: #555;">
                    <strong>Pickup Location:</strong> ${PickupLocation}
                  </li>
                  <li style="margin-bottom: 10px; color: #555;">
                    <strong>Dropoff Location:</strong> ${DropoffLocation}
                  </li>
                  <li style="margin-bottom: 10px; color: #555;">
                    <strong>Date:</strong> ${Date}
                  </li>
                  <li style="margin-bottom: 10px; color: #555;">
                    <strong>Time:</strong> ${Time}
                  </li>
                </ul>
              </div>
            </div>
          `,
        });        
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