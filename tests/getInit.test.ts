import { GatewayController } from '../src/api/gateway.controller'
import { Customer } from '../src/helpers/customer'
const apiClient = new GatewayController
jest.setTimeout(200000)


test('getInit by new user', async () => {
    let result = await apiClient.getInit({})
    expect(result.customerInfo).toBeNull();
    expect(result.newDeviceCode).toBeDefined();
});

test('getInit by registrated user', async () => {
    let metadata = await apiClient.getUserMetadata('+79114363507')
    let result = await apiClient.getInit(metadata)
    expect(result.customerInfo).toBeDefined();
    expect(result.newDeviceCode).toBeDefined();
});

test('getInit with wrong metadata', async () => { // спросить а ок ли
    let metadata = { "deviceCode": "wrongCode", "token": "wrongToken" }
    let result = await apiClient.getInit(metadata)
    expect(result.customerInfo).toBeNull();
    expect(result.newDeviceCode).toBeDefined();
});

test('getInit with user data', async () => { // спросить а ок ли
    let user = new Customer('+254')
    await user.createFakeCustomerInfo(true)
    await user.saveCustomerToServer(apiClient)
    
    let result = await apiClient.getInit(user.metadata)
    expect(result.customerInfo).toMatchObject({"customer": user.customer, "poll": user.poll});
    expect(result.newDeviceCode).toBeDefined();
});
