import { GatewayController } from '../src/api/gateway.controller'
import { Customer } from '../src/helpers/customer'
const apiClient = new GatewayController
jest.setTimeout(200000)

test('getShedulePrediction by new user', async () => {
    let user = new Customer()
    await user.getMetadata(apiClient)
    let result = await apiClient.getSchedulePrediction(user.metadata,100,2,2,0.2)
    expect(result.schedule).toBeDefined();
  });