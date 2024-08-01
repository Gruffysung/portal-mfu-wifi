export function thaid_setdata() {
    return {
        urlAuth: process.env.NEXT_PUBLIC_API_URL,
        urlToken: process.env.NEXT_PUBLIC_API_URL_TOKEN,
        clientID: process.env.NEXT_PUBLIC_CLIENT_ID,
        clientSecret:process.env.NEXT_PUBLIC_CLIENT_SECRET,
        redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,
        redirect_uri_callback: process.env.NEXT_PUBLIC_REDIRECT_URI_CALLBACK,
        scopeText: process.env.NEXT_PUBLIC_SCOPE,
        state: process.env.NEXT_PUBLIC_STATE
    };
}