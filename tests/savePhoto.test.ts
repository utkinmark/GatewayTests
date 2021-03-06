import { GatewayController } from '../src/api/gateway.controller'
import { Customer } from '../src/helpers/customer'
const apiClient = new GatewayController
jest.setTimeout(200000)

test('savePhoto selfie by new user', async () => {
    let user = new Customer('+254')
    user.createFakeCustomerInfo(true)
    let metadata = await apiClient.getUserMetadata(user.phone)
    let result = await apiClient.savePhoto(metadata, user.selfie, 0)
    expect(result.success).toBeTruthy()
}) 

test('savePhoto doc by new user', async () => {
    let user = new Customer('+254')
    user.createFakeCustomerInfo(true)
    let metadata = await apiClient.getUserMetadata(user.phone)
    let result = await apiClient.savePhoto(metadata, user.doc, 1)
    expect(result.success).toBeTruthy()
}) 