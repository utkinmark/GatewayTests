import { GatewayController } from '../src/api/gateway.controller'
import { Customer } from '../src/helpers/customer'
const apiClient = new GatewayController
jest.setTimeout(200000)


test('getLoanOffers by new user', async () => { 
    let user = new Customer()
    await user.createFakeCustomerInfo(true)
    await user.getMetadata(apiClient)
    
    let result = await apiClient.getLoanOffers(user.metadata)
    expect(result).toMatchObject({
        "offers": []
      });

});