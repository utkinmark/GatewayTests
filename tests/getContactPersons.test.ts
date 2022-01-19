import { GatewayController } from '../src/api/gateway.controller'
import { Customer } from '../src/helpers/customer'
const apiClient = new GatewayController
jest.setTimeout(200000)


test('getContactPersons by new user', async () => { 
    let user = new Customer()
    await user.createFakeCustomerInfo(true)
    await user.getMetadata(apiClient)
    
    let result = await apiClient.getContactPersons(user.metadata)
    expect(result).toMatchObject({
      "contacts": []
  });

});