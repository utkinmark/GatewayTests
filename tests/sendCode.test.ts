import { GatewayController } from '../src/api/gateway.controller'
import { Customer } from '../src/helpers/customer'
const apiClient = new GatewayController
jest.setTimeout(200000)

test('sendCode  by new user', async () => {
    let user = new Customer('+254')
    user.createFakeCustomerInfo(true)
    let deviceCode = (await apiClient.getInit({})).newDeviceCode
    let result = await apiClient.sendCode(user.phone, {'deviceCode': deviceCode})
    expect(result.success).toBeTruthy();
});