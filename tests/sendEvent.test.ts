import { GatewayController } from '../src/api/gateway.controller'
import { Customer } from '../src/helpers/customer'
const apiClient = new GatewayController
jest.setTimeout(200000)
//придумать что то с моком эвентов
test('sendEvent by new', async () => {
    let user = new Customer()
    user.createFakeCustomerInfo(true)
    let metadata = await apiClient.getUserMetadata(user.phone)
    let result = await apiClient.sendEvent(metadata, "{\"event_key\":\"registration_info\",\"session_id\":\"test\",\"minimize_id_screen_flag\":false,\"paste_id_flag\":false}")
    expect(result.success).toBeTruthy()
});