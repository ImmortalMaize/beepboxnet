import { routeLoader$ } from '@builder.io/qwik-city';

// eslint-disable-next-line qwik/loader-location
export const useSession = routeLoader$(async (requestEvent) => {
    console.log("Fetching the data.")
    const requestHeaders: HeadersInit = new Headers();
    const sessionID = requestEvent.cookie.get("net.sesh")
    if (sessionID) requestHeaders.set('cookie', "net.sesh="+sessionID.value)

    const RequestInit: RequestInit = {
        credentials: 'include',
        headers: requestHeaders,   
    }

    const response = await fetch("http://localhost:3000/me", RequestInit);
    console.log(response.status)
    const data = await response.json();
    const { status } = response;
    return { data, loggedIn: status === 200, id: sessionID?.value };
})