import { GatewayController } from '../src/api/gateway.controller'
import { Customer } from '../src/helpers/customer'
const apiClient = new GatewayController
jest.setTimeout(200000)


test('addContactPerson by new user', async () => {
    let user = new Customer()
    user.createFakeCustomerInfo(true)
    let metadata = await apiClient.getUserMetadata(user.phone)
    let result = await apiClient.addContactPersons(metadata, user.contactPersons)
    expect(result.success).toBeTruthy()
}) 

test('addContactPerson by new user', async () => {
    let user = new Customer()
    user.createFakeCustomerInfo(true)
    let metadata = await apiClient.getUserMetadata(user.phone)
    let result = await apiClient.addContactPersons(metadata, {
        "contacts": [
          {
            "fullName": "mark",
            "relationship": 1,
            "phoneNumber": "+256777222111"
          }
        ]
      })
    expect(result.success).toBeTruthy()
}) 
