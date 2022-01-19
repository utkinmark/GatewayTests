import * as faker from 'faker';
import * as fs from 'fs';
import { GatewayController } from '../api/gateway.controller'
import * as config from '../config/config.json'

export class Customer {
  phonePrefix: string;
  phone: string;
  poll: Object;
  customer: Object;
  contactPersons: Object;
  antiFraudEvents: Object;
  selfie: number[];
  doc: number[];
  metadata: Object;

  constructor() {
    this.phonePrefix = config.phonePrefix;
    this.phone = this.phonePrefix + faker.phone.phoneNumber('#########')
    this.poll = {}
    this.customer = {}
    this.contactPersons = {}
    this.antiFraudEvents = {
      registration_info: "{\"event_key\":\"registration_info\",\"session_id\":\"test\",\"minimize_id_screen_flag\":false,\"paste_id_flag\":false}",
      device_info: "{\"event_key\":\"device_info\",\"session_id\":\"test\",\"device_brand\":\"motorola motorola\",\"model\":\"moto g(8) plus\",\"camera_count\":2,\"camera_resolution\":11,\"device_language\":\"русский\",\"android_sdk\":28,\"android_version\":\"9\",\"screen_size\":7.889472980271307,\"screen_resolution\":\"1080x2280\",\"pixel_density\":420,\"memory_size\":3644,\"core_count\":8,\"storage_volume\":747,\"free_space\":477576,\"wifi_network_count\":5,\"root_flag\":false}",
      user_install_info: "{\"event_key\":\"user_install_info\",\"session_id\":\"test\",\"click_time\":0,\"install_time\":1592224571}",
      session_start: "{\"event_key\":\"session_start\",\"session_id\":\"test\",\"google_aid\":\"not_available\",\"start_time\":1592397440,\"battery_level\":84,\"battery_status\":\"Not charging\",\"power_on_time\":150.0,\"no_connection\":false}",
      permission_contacts_info: "{\"event_key\":\"permission_contacts_info\",\"session_id\":\"test\",\"is_granted\":true}",
      user_contact_list: "{\"event_key\":\"user_contact_list\",\"session_id\":\"test\",\"contacts\":[{\"phone_number\":\"+73522999596\",\"email\":null,\"display_name\":\", x™ : :v\",\"given_name\":\", x™\",\"company\":null,\"job_title\":null,\"android_account_type\":\"AndroidAccountType.google\",\"android_account_name\":\"kek@gmail.com\"},{\"phone_number\":\"88002500890\",\"email\":null,\"display_name\":\"02 МТС\",\"given_name\":\"02\",\"company\":null,\"job_title\":null,\"android_account_type\":\"AndroidAccountType.google\",\"android_account_name\":\"kek@gmail.com\"}]}",
      deal_info: "{\"event_key\":\"deal_info\",\"device_code\":\"319381b4-fd19-414d-91e9-1a6929496e24\",\"session_id\":\"test\",\"accel_x\":-2.3078322410583496,\"accel_y\":8.102424621582031,\"accel_z\":5.323359966278076,\"linnear_accel_x\":0.0,\"linnear_accel_y\":0.0,\"linnear_accel_z\":0.0,\"light_sensor\":366}"
    } // you must send them by SendEvent from this.mobileGateClient before trying TakeLoan for make DSS able to make deccisision
    this.selfie = Array.from(Uint8Array.from(fs.readFileSync('src/helpers/photos/front.jpg'))) //ready to use in this.mobileGateClient.SendPhoto 
    this.doc = Array.from(Uint8Array.from(fs.readFileSync('src/helpers/photos/selfie.jpg'))) //ready to use in this.mobileGateClient.SendPhoto 
    this.metadata = {}
  }

  async createFakeCustomerInfo(needApprove: boolean) {
    if (needApprove == true) {
      this.customer = {
        "firstName": "joseph",
        "middleName": faker.name.lastName(1),
        "lastName": faker.name.lastName(1),
        "birthDate": 714902866, //сделать фейкером
        "email": faker.internet.email(),
        "gender": faker.datatype.number(2),
        "nationalId": "22462765",
        "phone": this.phone
      }
      this.poll = {
        "department": "Hello", // сделать как у реальных кастомеров
        "martialStatus": faker.datatype.number(6),
        "educationLevel": faker.datatype.number(5),
        "loanPurpose": faker.datatype.number(4),
        "occupation": faker.datatype.number(6),
        "employmentIndustry": faker.datatype.number(20),
        "companyName": faker.company.companyName(),
        "workPhone": this.phonePrefix + faker.phone.phoneNumber('#########'),
        "incomeSource": faker.datatype.number(6),
        "incomeFrequency": faker.datatype.number(5),
        "incomeLevel": faker.datatype.number(12),
        "outstandingLoans": 1
      }
      this.contactPersons = {
        "contacts": [
          {
            "fullName": faker.name.lastName(1) + " " + faker.name.firstName(1),
            "relationship": faker.datatype.number({
              'min': 267,
              'max': 276
            }),
            "phoneNumber": this.phonePrefix + faker.phone.phoneNumber('#########')
          }
        ]
      }
    }
    else {
      this.customer = {
        "id": 20,
        "firstName": faker.name.firstName(1),
        "middleName": faker.name.lastName(1),
        "lastName": faker.name.lastName(1),
        "birthDate": 20, //сделать фейкером
        "email": faker.internet.email(),
        "gender": faker.datatype.number(2),
        "nationalId": faker.helpers.replaceSymbols('#########'),
        "phone": this.phone
      }
      this.poll = {
        "department": "Hello", // сделать как у реальных кастомеров
        "martialStatus": faker.datatype.number(6),
        "educationLevel": faker.datatype.number(5),
        "loanPurpose": faker.datatype.number(4),
        "occupation": faker.datatype.number(6),
        "employmentIndustry": faker.random.number(20),
        "companyName": faker.company.companyName(),
        "workPhone": this.phonePrefix + faker.phone.phoneNumber('#########'),
        "incomeSource": faker.datatype.number(6),
        "incomeFrequency": faker.datatype.number(5),
        "incomeLevel": faker.datatype.number(12),
        "outstandingLoans": faker.random.number(2)
      }
      this.contactPersons = {
        "contacts": [
          {
            "fullName": faker.name.lastName(1) + " " + faker.name.firstName(1),
            "relationship": faker.datatype.number({
              'min': 267,
              'max': 276
            }),
            "phoneNumber": this.phonePrefix + faker.phone.phoneNumber('#########')
          }
        ]
      }
    }

  }

  async saveCustomerToServer(client: GatewayController) {
    await this.getMetadata(client)
    await client.register(this.metadata, this.customer)
    await client.addContactPersons(this.metadata, this.contactPersons)
    await client.savePoll(this.metadata, this.poll)
    await client.savePhoto(this.metadata, this.selfie, 0)
    await client.savePhoto(this.metadata, this.doc, 1)
  }

  async getMetadata(client: GatewayController) {
    let metadata = await client.getUserMetadata(this.phone)
    this.metadata = metadata
  }
}