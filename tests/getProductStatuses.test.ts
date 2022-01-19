import { GatewayController } from '../src/api/gateway.controller'
import { Customer } from '../src/helpers/customer'
const apiClient = new GatewayController
jest.setTimeout(200000)


test('getProductStatuses by new user', async () => {
    let user = new Customer()
    user.createFakeCustomerInfo(true)
    let metadata = await apiClient.getUserMetadata(user.phone)
    let result = await apiClient.getProductStatuses(metadata)
    expect(result).toStrictEqual({
        "pdlHold": 0,
        "pilHold": 0,
        "pilUnlocked": false
    })
}) 