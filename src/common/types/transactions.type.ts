export enum UserOperationTypes {
    CREATE_USER = 'CREATE_USER',
    UPDATE_USER = 'UPDATE_USER',
    FETCH_USER_INFO = 'FETCH_PROFILE_INFORMATION',
    CONFIRM_PROFILE = 'CONFIRM_PROFILE',
    PROFILE_LOGIN = 'USER_LOGIN',
    SUBSCRIBE_TO_TOPIC = 'SUBSCRIBE_TO_TOPIC',
}

export type createTransactionDTO = {
    type: UserOperationTypes,
    address_ip: string;
    user_agent: string;
    city: string;
    region: string;
    country: string;
};