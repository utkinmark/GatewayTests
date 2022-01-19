import { GatewayController } from '../src/api/gateway.controller'
import { Customer } from '../src/helpers/customer'
const apiClient = new GatewayController
jest.setTimeout(200000)


test('getReferralInfo by new user', async () => {
    let user = new Customer()
    user.createFakeCustomerInfo(true)
    let metadata = await apiClient.getUserMetadata(user.phone)
    let result = await apiClient.getReferralInfo(metadata)
    expect(result).toMatchObject({
        "refereeId": 0,
        "balance": 0,
        "totalEarned": 0,
        "peopleInvited": 0,
        "withdraws": [],
        "status": 0,
        "minWithdrawAmount": 300,
        "lowCommission": 15,
        "highCommission": 20,
        "totalBonusPoints": 0
    })
}) 