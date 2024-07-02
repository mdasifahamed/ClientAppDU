require('dotenv').config();
const nodemailer=require('nodemailer')


const mailTransporter =
    nodemailer.createTransport(
        {
            host: process.env.SMTP_HOST,
            port:process.env.SMTP_PORT,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            },
            tls:{
                rejectUnauthorized:false
            }
        }
    );

async function sendEmail(student_name,track_id,student_email){
    let success;

    let msgBody = {
        from: process.env.SENDEREMAIL,
        to: student_email,
        subject: 'Issuance Of The Certificate',
        text: `
            Congratulation  ${student_name}, Your Certificate Has Been Issued.
            You Can Verfied It Via Below Link:
            ${process.env.APIBASEURL}:${process.env.PORT}/read-request/${track_id}

            Check Issuance Process Of The Certificate From The Below Link :

            ${process.env.APIBASEURL}:${process.env.PORT}/history-of-certificate/${track_id}
        `
    }
    
    success = await new Promise((resolve, reject) => {
        mailTransporter.sendMail(msgBody, (err, data) => {
            if (err) {
                console.log(err);
                resolve(false); 
            } else {
                resolve(true); 
            }
        });
    });
    console.log(success)
    return success;
}


    
module.exports=sendEmail;