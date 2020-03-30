import { Timestamp } from 'src/app/shared/util';
import { UserData } from './user-data.model';

export interface Shopping {
    uid?: string;
    where: string;
    when: string;
    whatTime: string;
    visibility: string[];
    timestamp?: Date | number | Timestamp;
    createdBy?: string;
    createdByUserData?: UserData;
    createdAt?: Date;
}

export function convertWhen(input: Date): string {
    return input.getFullYear() + '-' + (input.getMonth() + 1) + '-' + input.getDate();
}

export function convertWhatTime(input: Date): string {
    return input.getHours() + ':' + input.getMinutes();
}

export function getTimestamp(when: string, whatTime: string): Date {
    const whenDate = new Date(when);
    const whatTimeTokens = whatTime.split(':');
    return new Date(whenDate.getFullYear(), whenDate.getMonth(), whenDate.getDate(), +whatTimeTokens[0], +whatTimeTokens[1]);
}
