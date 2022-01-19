import { GatewayController } from '../src/api/gateway.controller'
import { Customer } from '../src/helpers/customer'
const apiClient = new GatewayController
jest.setTimeout(200000)

test('savePoll by new user', async () => {
    let user = new Customer('+254')
    user.createFakeCustomerInfo(true)
    let metadata = await apiClient.getUserMetadata(user.phone)
    
    let result = await apiClient.savePoll(metadata, user.poll)
    expect(result.success).toBeTruthy()

});