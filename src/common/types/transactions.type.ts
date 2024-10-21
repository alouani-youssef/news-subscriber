export enum TransactionTypes {
    CREATE_USER = 'CREATE_USER',
    UPDATE_USER = 'UPDATE_USER',
    FETCH_USER_INFO = 'FETCH_PROFILE_INFORMATION',
    CONFIRM_PROFILE = 'CONFIRM_PROFILE',
    SUBSCRIBE_TO_TOPIC = 'SUBSCRIBE_TO_TOPIC',
}

export type createTransactionDTO = {
    type: TransactionTypes,
    address_ip: string;
    user_agent: string;
    city: string;
    region: string;
    country: string;
};