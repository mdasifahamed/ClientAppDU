const connect_gateway = require('./fabric_connection')
const utf8Decoder = new TextDecoder()
const channelName = 'mychannel';
const chaincodeName = 'basic';
/**
 * @param {string} tacking_id The string
 * @param {string} certitficate_hash The string
 * @param {int} certificate_id The int
 */
async function issue_certificate(tracking_id,certitficate_hash,certificate_id){
    certificate_id = parseInt(certificate_id)

    const {gateway,client} = await connect_gateway()
     
        try {
            const network = await gateway.getNetwork(channelName)
            const contract = await network.getContract(chaincodeName)
            let trx = await contract.submitTransaction('IssueCertificate',
                tracking_id,
                certitficate_hash,
                certificate_id.toString(),
            )
            trx = utf8Decoder.decode(trx)
            return trx
        } catch (error) {
           if(error){
                console.log(error)
                return "Something Went Wrong"
           }
        } finally {
            gateway.close()

            client.close()
        }

}

/**
 * @param {string} tacking_id The tracking with one check a request
 */
async function read_request(tracking_id){
    tracking_id = parseInt(tracking_id)

    const {gateway,client} = await connect_gateway()
     
        try {
            const network = await gateway.getNetwork(channelName)
            const contract = await network.getContract(chaincodeName)
            let trx = await contract.evaluateTransaction('ReadRequest',
                tracking_id.toString()
            )
            trx = utf8Decoder.decode(trx)
            return trx
        } catch (error) {
            if (error) {
                return "Something Went Wrong"
            }
        } finally {
            gateway.close()
            client.close()
        }
}

async function get_all_request(){
    const {gateway,client} = await connect_gateway()
        try {
            const network = await gateway.getNetwork(channelName)
            const contract = await network.getContract(chaincodeName)
            let trx = await contract.evaluateTransaction('GetAllTheRequests')
            trx = utf8Decoder.decode(trx)
            return trx
        } catch (error) {
            if (error) {
                return "Something Went Wrong"
            }
        } finally {
            gateway.close()

            client.close()
        }

}

async function read_certificate_by_certid(certificate_id){
    certificate_id = parseInt(certificate_id)
    const {gateway,client} = await connect_gateway()
        try {
            const network = await gateway.getNetwork(channelName)
            const contract = await network.getContract(chaincodeName)
            let trx = await contract.evaluateTransaction('ReadCertificateByCertificateId', certificate_id.toString())
            trx = utf8Decoder.decode(trx)
            return trx
        } catch (error) {
            if (error) {
                return "Something Went Wrong"
            }
        } finally {
            gateway.close()

            client.close()
        }
}

async function history_of_a_request(tracking_id){
    tracking_id = parseInt(tracking_id)
    const {gateway,client} = await connect_gateway()
        try {
            const network = await gateway.getNetwork(channelName)
            const contract = await network.getContract(chaincodeName)
            let trx = await contract.evaluateTransaction('HistoryOfRequest', tracking_id.toString())
            trx = utf8Decoder.decode(trx)
            return trx
        } catch (error) {

            if (error) {
                return "Something Went Wrong"
            }
        } finally {
            gateway.close()

            client.close()
        }
}


module.exports={
    issue_certificate,
    read_request,
    get_all_request,
    history_of_a_request,
    read_certificate_by_certid,
}