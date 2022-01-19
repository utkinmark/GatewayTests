import request from "./request"

export class GatewayController {
    async getInit(metadata: Object) {
        const response = await request.get("/gateway/getInit", metadata)
        return response
    }

    async sendCode(phone: String, metadata: Object) {
        const response = await request.post("/gateway/sendCode", { "phoneNumber": phone }, metadata)
        return response
    }

    async approveCode(code: String, metadata: Object) {
        const response = await request.post("/gateway/approveCode", { "smsCode": code }, metadata)
        return response
    }


    async getUserMetadata(phone: String) {
        let deviceCode = (await this.getInit({})).newDeviceCode
        await this.sendCode(phone, { "deviceCode": deviceCode })
        let token = (await this.approveCode("1234", { "devicecode": deviceCode })).token
        return { "deviceCode": deviceCode, "token": token }
    }

    async getCurrentLoanDetails(metadata: Object) {
        const response = await request.get("/gateway/getCurrentLoanDetails", metadata)
        return response
    }

    async register(metadata: Object, customer: Object) {
        const response = await request.post("/gateway/register", customer, metadata)
        return response
    }

    async savePoll(metadata: Object, poll: Object) {
        const response = await request.post("/gateway/savePoll", poll, metadata)
        return response
    }

    async addContactPersons(metadata: Object, contacts: Object) {
        const response = await request.post("/gateway/addContactPersons", contacts, metadata)
        return response
    }

    async savePhoto(metadata: Object, photo: Number[], type: Number) {
        const response = await request.post("/gateway/savePhoto", {
            "content": photo,
            "type": type,
            "extension": "jpg"
        }, metadata)
        return response
    }

    async sendEvent(metadata: Object, event: String) {
        const response = await request.post("/gateway/sendEvent", { "data": event }, metadata)
        return response
    }

    async takeLoan(amount: Number, purpose: Number, periodicPayment: Number, productType: Number, metadata: Object) {
        const response = await request.post("/gateway/takeLoan", {
            "amount": amount,
            "purpose": purpose,
            "periodicPayment": periodicPayment,
            "productType": productType
        }, metadata)
        return response
    }

    async getPhotosStatus(metadata: Object) {
        const response = await request.get("/gateway/getPhotosStatus", metadata)
        return response
    }

    async getSchedulePrediction(metadata: Object, amount: number, loanTerm: number, termUnit: number, dayRate: number) {
        const response = await request.get("/gateway/getSchedulePrediction", metadata,{
            "amount": amount,
            "loanTerm": loanTerm,
            "termUnit": termUnit,
            "dayRate": dayRate
          })
        return response
    }
    
    async getClientStatistic(metadata: Object) {
        const response = await request.get("/gateway/getClientStatistic", metadata)
        return response
    }

    async getPhoto(metadata: Object, fileType: Number) {
        const response = await request.get("/gateway/getPhoto", metadata,{
            "fileType": fileType
          })
        return response
    }

    async getNewMessages(metadata: Object) {
        const response = await request.get("/gateway/getNewMessages", metadata)
        return response
    }

    async getLoanOffers(metadata: Object) {
        const response = await request.get("/gateway/getLoanOffers", metadata)
        return response
    }

    async getProductStatuses(metadata: Object) {
        const response = await request.get("/gateway/getProductStatuses", metadata)
        return response
    }

    async getContactPersons(metadata: Object) {
        const response = await request.get("/gateway/getContactPersons", metadata)
        return response
    }

    async getPromoActions(metadata: Object) {
        const response = await request.get("/gateway/getPromoActions", metadata)
        return response
    }

    async getUserTags(metadata: Object) {
        const response = await request.get("/gateway/getUserTags", metadata)
        return response
    }

    async getReferralInfo(metadata: Object) {
        const response = await request.get("/gateway/getReferralInfo", metadata)
        return response
    }
    async getAccountInfo(metadata: Object) {
        const response = await request.get("/gateway/getAccountInfo", metadata)
        return response
    }
}