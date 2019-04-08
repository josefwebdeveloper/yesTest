

  export interface Meta {
    totalpages: number;
    totalitems: number;
    copyright: string;
    authors: string[];
  }

  export interface Attributes {
    name: string;
    adminid: string;
    countquestions: number;
    countusers: number;
    countdatabasequestions: number;
    isactive: boolean;
    channaltype: number;
    participants: number;
    requeireanswer: number;
    datecreated: Date;
    remainingquestion: number;
  }

  export interface Links {
    self: string;
  }

  export interface Datum {
    id: string;
    type: string;
    attributes: Attributes;
    links: Links;
  }

  export interface Jsonapi {
    version: string;
  }

  export interface Links2 {
    self: string;
  }

  export interface RootObject {
    meta: Meta;
    data: Datum[];
    jsonapi: Jsonapi;
    links: Links2;
  }



