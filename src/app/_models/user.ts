﻿export class User {
    id: string;
    email: string;
    password: string;
    phone: Phone;
    firstName: string;
    lastName: string;
    exist: boolean;
    isRegistrationFinish: boolean;
    isTutorialFinish: boolean;
}

export class Phone {
    phoneId: string;
    phone: string;
    regionCode: string;
    countryCode: string;
}
export interface Userslist {
    userId: string;
    averageTime: number;
    displayFirstName: string;
    displayLastName: string;
}

export interface Channel {
    id: string;
    name: string;
    admin: string;
    channeltype: number;
    isactive: boolean;
    participants: number;
    requireanswers: number;
    countdatabasequestions: number;
    countquestions: number;
    countusers: number;
    datecreated: Date;
    userslist: Userslist[];
}
