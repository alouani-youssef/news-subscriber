export enum UserOperationTypes {
    CREATE_USER = 'CREATE_USER',
    UPDATE_USER = 'UPDATE_USER',
    FETCH_USER_INFO = 'FETCH_PROFILE_INFORMATION',
    CONFIRM_PROFILE = 'CONFIRM_PROFILE',
    PROFILE_LOGIN = 'USER_LOGIN',
    SUBSCRIBE_TO_TOPIC = 'SUBSCRIBE_TO_TOPIC',
}


export enum SubscrbtionOperationTypes {
    SUBSCRIBE = 'SUBSCRIBE',
    UN_SUBSCRIBE = 'UN_SUBSCRIBE',
    STOP_SUBSCRIBTION = 'STOP_SUBSCRIBTION',
    ACTIVATE_SUBSCRIBTION = 'ACTIVATE_SUBSCRIBTION',
    DELETE_SUBSCRIBTION = 'DELETE_SUBSCRIBTION',
    UPDATE_SUBSCRIBTION = 'DELETE_SUBSCRIBTION',
}

export type createUserTransactionDTO = {
    type: UserOperationTypes,
    address_ip: string;
    user_agent: string;
    city: string;
    region: string;
    country: string;
};


export type createSubscrbtionTransactionDTO = {
    type: SubscrbtionOperationTypes,
    topic: string,
    address_ip: string;
    user_agent: string;
    city: string;
    region: string;
    country: string;
};