const nodemailer = require("nodemailer");

module.exports =  async (to, subject, text) =>{
    
    const smtpTransport = nodemailer.createTransport({
        //host: process.env.SMTP_SERVER,
        //port:parseInt(process.env.SMTP_PORT),
        service:"gmail",
        //secure:true,
        auth:{
            user:process.env.SMTP_USERNAME,
            pass:process.env.SMTP_PASSWORD
        }
    })

    const message = {
        to,
        from: process.env.SMTP_USERNAME,
        subject,
        text
    }

    try {
        
        await smtpTransport.sendMail(message);
        console.log("E-mail enviado com éxito");
        
    } catch (error) {
        console.error(error);
        throw error;
    }
    finally{
        smtpTransport.close();
    }

}