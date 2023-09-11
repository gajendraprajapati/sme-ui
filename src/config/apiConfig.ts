export interface ApiConfigInterface {
    protocol: string;
    host: string;
}

export const apiConfig: ApiConfigInterface = {
    protocol: 'http',
    host: 'localhost:4000'
};