import MockAdapter from "axios-mock-adapter";

import { API_URLS } from "~/constants";

export function auth(mock: MockAdapter) {
    mock.onPost(`${API_URLS.PUBLIC_API.AUTH_LOGIN}`).reply(200, {
        success: true,
        message: "Login with google successfully",
        data: {
            accessToken:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsInVzZXIiOiJtb3JfMjMxNCIsImlhdCI6MTcyODcxODk3MH0.lq4mo5IOr9ml5RFT42Wg7jSpMkDwWI-3Ss0Hu3TfNXQ",
            refreshToken:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsInVzZXIiOiJtb3JfMjMxNCIsImlhdCI6MTcyODcxODk3MH0.lq4mo5IOr9ml5RFT42Wg7jSpMkDwWI-3Ss0Hu3TfNXQ",
            expiredAt: 3600
        }
    });

    mock.onPost(`${API_URLS.PUBLIC_API.AUTH_LOGIN_WITH_GOOGLE}`).reply(200, {
        success: true,
        message: "Login with google successfully",
        data: {
            accessToken:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsInVzZXIiOiJtb3JfMjMxNCIsImlhdCI6MTcyODcxODk3MH0.lq4mo5IOr9ml5RFT42Wg7jSpMkDwWI-3Ss0Hu3TfNXQ",
            refreshToken:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsInVzZXIiOiJtb3JfMjMxNCIsImlhdCI6MTcyODcxODk3MH0.lq4mo5IOr9ml5RFT42Wg7jSpMkDwWI-3Ss0Hu3TfNXQ",
            expiredAt: 3600
        }
    });

    mock.onPost(`${API_URLS.PROTECTED_API.GET_ME}`).reply(200, {
        success: true,
        message: "Get info successfully",
        data: {
            id: "1234567890",
            firstName: "John",
            lastName: "Doe",
            emailAddress: "johndoe@example.com",
            city: "New York",
            streetAddress: "5th Avenue, No. 101",
            phone: "0123456789"
        }
    });

    mock.onPatch(`${API_URLS.PROTECTED_API.CHANGE_INFO}`).reply(400, {
        success: true,
        message: "Get info successfully",
        data: {
            id: "1234567890",
            firstName: "John",
            lastName: "Doe",
            emailAddress: "johndoe@example.com",
            city: "New York",
            streetAddress: "5th Avenue, No. 101",
            phone: "0123456789"
        }
    });

    mock.onPost(`${API_URLS.PUBLIC_API.AUTH_REGISTER}`).reply(200, {
        success: true,
        message: "Register successfully",
        data: []
    });
}
