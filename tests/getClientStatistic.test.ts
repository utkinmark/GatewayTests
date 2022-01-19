import { GatewayController } from '../src/api/gateway.controller'
import { Customer } from '../src/helpers/customer'
const apiClient = new GatewayController
jest.setTimeout(200000)


test('getClientStatistic by new user', async () => { // спросить а ок ли
  let user = new Customer()
  await user.getMetadata(apiClient)

  let result = await apiClient.getClientStatistic(user.metadata)
  expect(result).toStrictEqual({
    "issuedLoansCount": 0,
    "previousMaxDelayDays": 0
  });

});
