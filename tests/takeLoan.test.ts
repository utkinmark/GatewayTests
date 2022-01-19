import { GatewayController } from '../src/api/gateway.controller'
import { Customer } from '../src/helpers/customer'
const apiClient = new GatewayController
jest.setTimeout(200000)

test('takeLoan by new user', async () => {

  let user = new Customer()
  user.createFakeCustomerInfo(true)
  let metadata = await apiClient.getUserMetadata(user.phone)
  let result = await apiClient.takeLoan(200,1,0,0, metadata)
  expect(result.success).toBeTruthy()
  expect(result.loanId).toBeGreaterThan(0)
});