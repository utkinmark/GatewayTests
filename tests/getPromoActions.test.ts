import { GatewayController } from '../src/api/gateway.controller'
import { Customer } from '../src/helpers/customer'
const apiClient = new GatewayController
jest.setTimeout(200000)


test('getPromoActions by new user', async () => {
    let user = new Customer()
    user.createFakeCustomerInfo(true)
    user.getMetadata(apiClient)

    let result = await apiClient.getPromoActions(user.metadata)
    expect(result).toMatchObject({
        "promoActions": []
    })
}) 