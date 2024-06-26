const exrpress = require('express')
const bodyParser = require('body-parser')
const contract = require('./contract')
const app = exrpress()
const port = 8000
app.use(bodyParser.json())

app.post('/issue-certificate',async(req,res)=>{
    if(!req.body.certificate_hash || !req.body.tracking_id){
        return res.status(400).json({data:"Fileds Are Missing"})
    }
    let cert_id = Math.floor(Math.random() * 12562) * Math.floor(Math.random() * 25641);
    let cert_hash = req.body.certificate_hash;
    let track_id = req.body.tracking_id;

    try {
        let result = await contract.issue_certificate(track_id.toString(),cert_hash,cert_id.toString())
        return res.status(201).json(JSON.parse(result))
    } catch (error) {
        if (error){
            return res.status(500).json({data:`No data found for  id ${track_id}`})
        }
    }
})

app.get('/get-all-the-request', async(req,res)=>{

    try {
        let requests = await contract.get_all_request()
        return res.status(200).json({data:JSON.parse(requests)})
    } catch (error) {
        return res.status(500).json({data:"Failed To Connect The Blokchain Network"})
    }
})

app.get('/history-of-certificate',async (req,res)=>{

    let tracking_id = req.body.tracking_id
    if(!tracking_id){
        return res.status(400).json({data:"Required Fields Tracking_Id  Is  Missing"})
    }

    try {
        let request_history =  await contract.history_of_a_request(tracking_id.toString())
        return res.status(200).json({data:JSON.parse(request_history)})
    } catch (error) {
        if (error) {
            return res.status(500).json({data:`Certficate History Is Not Found For The Tracking Id : ${tracking_id}`})
        }
    }
})

// For Click from the list
app.get('/read-request/:tracking_id',async (req,res)=>{

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
app.get('/read-request',async (req,res)=>{

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

app.get('/read-certificate-by-id',async(req,res)=>{

    let cert_id = req.body.certificate_id

    if(!cert_id){
        return res.status(400).json({data:"Required Certificate Id Is Missing"})
    }

    try {
        const certificate = await contract.read_certificate_by_certid(cert_id.toString())
        return res.status(200).json({data:JSON.parse(certificate)})
    } catch (error) {
        if (error) {
            return res.status(500).json({data:`Certificate Not Found For The Id ${cert_id}`})
        }
    }
})














app.listen(port,()=>{
    console.log(`Server Running At ${port}`)
})
