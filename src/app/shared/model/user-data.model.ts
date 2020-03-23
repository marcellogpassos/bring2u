import { PhoneNumber } from './phone-number.model';
import { Address } from './address.model';

export interface UserData {
    address: Address;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: PhoneNumber;
    username: string;
}
