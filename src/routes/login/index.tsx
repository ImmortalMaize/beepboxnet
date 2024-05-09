import { component$ } from "@builder.io/qwik";
import { RequestEvent, RequestHandler, routeLoader$ } from "@builder.io/qwik-city";
import { request } from "http";

export const onGet: RequestHandler = async ({ cookie, redirect }: RequestEvent) => {
    const headers = new Headers();
    const sessionID = cookie.get('net.sesh');
    if (sessionID) {
        headers.set('cookie', 'net.sesh=' + sessionID.value);
    }

    const session = await fetch("http://localhost:3000/me", {
        headers
    })
    
    if (session.status === 200) {
        throw redirect(302, "/");
    }
}


export default component$(() => {
    return (
        <div>
            
        <a href="http://localhost:3000/me/login">Sign In</a>
        </div>
    );
});

