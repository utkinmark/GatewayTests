import { GatewayController } from '../src/api/gateway.controller'
import { Customer } from '../src/helpers/customer'
const apiClient = new GatewayController
jest.setTimeout(200000)

test('getPhotoStatus without photos', async () => { // спросить а ок ли
    let user = new Customer('+254')
    await user.createFakeCustomerInfo(true)
    await user.getMetadata(apiClient)
    
    let result = await apiClient.getPhotosStatus(user.metadata)
    expect(result).toStrictEqual({
        "hasCard": false,
        "hasSelfie": false
      });

});

test('getPhotoStatus with photos', async () => { // спросить а ок ли
    let user = new Customer('+254')
    await user.createFakeCustomerInfo(true)
    await user.saveCustomerToServer(apiClient)
    
    let result = await apiClient.getPhotosStatus(user.metadata)
    expect(result).toStrictEqual({
        "hasCard": true,
        "hasSelfie": true
      });

});