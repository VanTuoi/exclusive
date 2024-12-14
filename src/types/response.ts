export interface ResponseData<T> {
    data: T;
    statusCode?: string | number;
    statusText?: string;
    message?: string;
    success?: boolean;
}
