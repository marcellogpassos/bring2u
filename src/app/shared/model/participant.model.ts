import { UserData } from './user-data.model';

export interface Participant {
    email: string;
    user?: UserData;
}
