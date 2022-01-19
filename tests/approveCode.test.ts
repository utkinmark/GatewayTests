import { GatewayController } from '../src/api/gateway.controller'
import { Customer } from '../src/helpers/customer'
const apiClient = new GatewayController
jest.setTimeout(200000)

test('success approveCode', async () => {
    let customer = new Customer()
    customer.createFakeCustomerInfo(true)
    let deviceCode = (await apiClient.getInit({})).newDeviceCode
    await apiClient.sendCode(customer.phone, {'deviceCode': deviceCode})
    let result = await apiClient.approveCode('1234', {'deviceCode': deviceCode})
    expect(result.success).toBeTruthy();
    expect(result.token).toBeDefined();
});

test('failed approveCode', async () => {
    let customer = new Customer()
    customer.createFakeCustomerInfo(true)
    let deviceCode = (await apiClient.getInit({})).newDeviceCode
    await apiClient.sendCode(customer.phone, {'deviceCode': deviceCode})
    let result = await apiClient.approveCode('3322', {'deviceCode': deviceCode})
    expect(result.success).toBeFalsy();
    expect(result.token).toBeNull();
});