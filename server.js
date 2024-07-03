const exrpress = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const crypto = require('crypto')
const contract = require('./contract')
const sendEmail = require('./sendEmail.js')
const app = exrpress()
const port = 8001
app.use(bodyParser.json())
let corsOptions = {
    origin : '*',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))


app.post('/issue-certificate', cors(corsOptions),async(req,res)=>{
    if(!req.body.tracking_id){
        return res.status(400).json({data:"Fileds Are Missing"})
    }

    let cert_hash  = crypto.createHash('sha256')
    let cert_id = Math.floor(Math.random() * 12562) * Math.floor(Math.random() * 25641);
    let track_id = req.body.tracking_id;
    let student_name,student_email;

    try {

        request = await contract.read_request(track_id.toString())
        request = JSON.parse(request)
        student_name = request.Student_Name
        student_email = request.Student_Email
        let newRequest = JSON.stringify(request)
        cert_hash = cert_hash.update(`${newRequest.Student_Name},${newRequest.Student_Id},${newRequest.Student_Email},${newRequest.Degree},${newRequest.Major},${newRequest.Result},${newRequest.Requester_Authority},${cert_id}`);
        cert_hash = cert_hash.digest('hex')
 
       
    } catch(error) {
        if (error){
            console.log(error)
            return res.status(500).json({data:`No data found for  id ${track_id}`})
        }
    }

    try {
       
        let result = await contract.issue_certificate(track_id.toString(),cert_hash,cert_id.toString())
        if (parseInt(result) === 0 ){
            return res.status(200).json({data: `Certificate Already Created For The Tracking Id ${track_id}`})
        }
        if( result === "Something Went Wrong"){
            return res.status(500).json({data:"Failed To Connect The Blokchain Network"})
        }
        let emailStatus = await sendEmail(student_name,track_id,student_email)
        if (emailStatus === false) {

            return res.status(500).json({data:`Certificate Created With The Certificate Id ${result}. But Email Was not Sent`})
            
        }
        return res.status(201).json({data: `Certificate Created With The Certificate Id ${result}`})
    } catch (error) {
        if (error){
            console.log(error)
            return res.status(500).json({data:`No data found for  id ${track_id}`})
        }
    }
})

app.get('/get-all-the-request', cors(corsOptions), async(req,res)=>{

    try {
        const result = await contract.get_all_request()
        let requests = JSON.parse(result)
        requests.forEach(request =>{
            if(request.Is_Reqeust_Completed){
                request.Requester_Authority = "Dhaka College"
                request.Issuer_Authority = "Dhaka Univertsity"
            } else {
                request.Requester_Authority = "Dhaka College"
            }
        })
        return res.status(200).json({data:requests})
    } catch (error) {
        console.log(error)
        return res.status(500).json({data:"Failed To Connect The Blokchain Network"})
    }
})

app.post('/history-of-certificate', cors(corsOptions),async (req,res)=>{

    let tracking_id = req.body.tracking_id
    if(!tracking_id){
        return res.status(400).json({data:"Required Fields Tracking_Id  Is  Missing"})
    }

    try {
        let request_history =  await contract.history_of_a_request(tracking_id.toString())
        let requests = JSON.parse(request_history)
        requests.forEach(request =>{
            if(request.Is_Reqeust_Completed){
                request.Requester_Authority = "Dhaka College"
                request.Issuer_Authority = "Dhaka Univertsity"
            } else {
                request.Requester_Authority = "Dhaka College"
            }
        })
        
        return res.status(200).json({data:requests})

    } catch (error) {
        if (error) {
            return res.status(500).json({data:`Certficate History Is Not Found For The Tracking Id : ${tracking_id}`})
        }
    }
})

// For Click from the list
app.get('/read-request/:tracking_id', cors(corsOptions),async (req,res)=>{

    const track_id = req.params.tracking_id
    if(!track_id){
        return res.status(400).json({data:"Invlaid Path"})
    }
    try {
        let request_history =  await contract.read_request(track_id.toString())
        return res.status(200).json({data:JSON.parse(request_history)})
    } catch (error) {
        if (error) {
            return res.status(500).json({data:`No data found for  id ${track_id}`})
        }
    }
})

// For Searching From Search bar
app.post('/read-request', cors(corsOptions),async (req,res)=>{

    const track_id = req.body.tracking_id
    if(!track_id){
        return res.status(400).json({data:"Missing Required Tracking Id"})
    }
    try {
        let request_history =  await contract.read_request(track_id.toString())
        return res.status(200).json({data:JSON.parse(request_history)})
    } catch (error) {
        if (error) {
            return res.status(500).json({data:`No data found for  id ${track_id}`})
        }
    }
})

app.post('/read-certificate-by-id', cors(corsOptions), async(req,res)=>{

    let cert_id = req.body.certificate_id

    

    try {
        const certificate = await contract.read_certificate_by_certid(cert_id.toString())
        let cert = JSON.parse(certificate);
        cert.Requester_Authority = "Dhaka College"
        cert.Issuer_Authority = "Dhaka University"
        return res.status(200).json({data:cert})
    } catch (error) {
        if (error) {
            return res.status(500).json({data:`Certificate Not Found For The Id ${cert_id}`})
        }
    }
})

app.post('/verify-by-hash', cors(corsOptions), async(req,res)=>{
    
    let certificate_hash = req.body.certificate_hash
    if(!certificate_hash){
        return res.status(400).json({data:"Required Certificate Hash Is Missing"})
    }
    try {
        let result = await contract.verify_by_hash(certificate_hash.toString())
        let cert = JSON.parse(result);
        cert.Requester_Authority = "Dhaka College"
        cert.Issuer_Authority = "Dhaka University"
        return res.status(200).json({data:cert})
    } catch (error) {

        if (error) {
            console.log(error)
            return res.status(500).json({data:`Certificate Not Found For The Hash ${certificate_hash}`})
        }
    }
})



app.get('/history-of-certificate/:tracking_id', cors(corsOptions),async (req,res)=>{

    let tracking_id = req.params.tracking_id
    if(!tracking_id){
        return res.status(400).json({data:"Required Fields Tracking_Id  Is  Missing"})
    }

    try {
        let request_history =  await contract.history_of_a_request(tracking_id.toString())
        let requests = JSON.parse(request_history)
        requests.forEach(request =>{
            if(request.Is_Reqeust_Completed){
                request.Requester_Authority = "Dhaka College"
                request.Issuer_Authority = "Dhaka Univertsity"
            } else {
                request.Requester_Authority = "Dhaka College"
            }
        })
        
        return res.status(200).json({data:requests})

    } catch (error) {
        if (error) {
            return res.status(500).json({data:`Certficate History Is Not Found For The Tracking Id : ${tracking_id}`})
        }
    }
})

app.get('/read-certificate-by-id/:certificate_id', cors(corsOptions), async(req,res)=>{

    let cert_id = req.params.certificate_id

    

    try {
        const certificate = await contract.read_certificate_by_certid(cert_id.toString())
        let cert = JSON.parse(certificate);
        cert.Requester_Authority = "Dhaka College"
        cert.Issuer_Authority = "Dhaka University"
        return res.status(200).json({data:cert})
    } catch (error) {
        if (error) {
            return res.status(500).json({data:`Certificate Not Found For The Id ${cert_id}`})
        }
    }
})











app.listen(port,()=>{
    console.log(`Server Running At ${port}`)
})
