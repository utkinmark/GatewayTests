import { GatewayController } from '../src/api/gateway.controller'
import { Customer } from '../src/helpers/customer'
const apiClient = new GatewayController
jest.setTimeout(200000)


test('getPhoto without photos doc', async () => { 
    let user = new Customer()
    await user.createFakeCustomerInfo(true)
    await user.getMetadata(apiClient)
    
    let result = await apiClient.getPhoto(user.metadata,0)
    expect(result, 'полученый обьект фото не совпадает с ожидаемым').toMatchObject({
        "content": null,
        "type": 0,
        "extension": null
    });

});

test('getPhoto without photos selfi', async () => { 
    let user = new Customer()
    await user.createFakeCustomerInfo(true)
    await user.getMetadata(apiClient)
    
    let result = await apiClient.getPhoto(user.metadata,1)
    expect(result, 'полученый обьект фото не совпадает с ожидаемым').toMatchObject({
        "content": null,
        "type": 1,
        "extension": null
    });

});

test.skip('getPhoto with photo doc', async () => { // убрать адский вывод 
    let user = new Customer()
    await user.createFakeCustomerInfo(true)
    await user.saveCustomerToServer(apiClient)
    
    let result = await apiClient.getPhoto(user.metadata,0)
    expect(result,'полученый обьект фото не совпадает с ожидаемым').toMatchObject({
        "content": null,
        "type": 0,
        "extension": null
    });

});

test.skip('getPhoto with photo selfi', async () => { // спросить а ок ли
    let user = new Customer()
    await user.createFakeCustomerInfo(true)
    await user.saveCustomerToServer(apiClient)
    
    let result = await apiClient.getPhoto(user.metadata,1)
    expect(result, 'полученый обьект фото не совпадает с ожидаемым').toMatchObject({
        "content": null,
        "type": 0,
        "extension": null
    });

});