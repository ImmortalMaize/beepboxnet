import { component$, JSXChildren, Slot, useStyles$ } from "@builder.io/qwik";
import { Link, routeAction$, routeLoader$, useNavigate } from "@builder.io/qwik-city";
import type { RequestHandler } from "@builder.io/qwik-city";



import styles from "./styles.styl?inline";
import { useSession } from "../shared/loaders";
import { QwikRive } from "~/components/rive/rive";
import { NavButton } from "~/components/nav.button";
import * as BootstrapIcons from "@qwikest/icons/bootstrap";
export { useSession } from "~/shared/loaders";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.dev/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export const useLogout = routeAction$(async (_data, requestEvent) => {
  const headers: HeadersInit = new Headers()
  const netSesh = requestEvent.cookie.get('net.sesh')?.value;
  console.log(netSesh ?? "e")
  headers.set('cookie', 'net.sesh=' + netSesh);
  const logout = await fetch("http://localhost:3000/me/logout", {
    headers
  });
  console.log(logout)
});

const LogOutButton = component$(() => {
  const logout = useLogout();
  const nav = useNavigate();

  return <button class="phlox-button" onClick$={async () => {
    await logout.submit().then(() => nav())
  }}>
    <div class="icon"><BootstrapIcons.BsBoxArrowLeft /></div>
    <div class="name">Logout</div>
  </button>
});

const LoggedInActions = component$(() => {
  return <NavActions id="user-actions">
    <LogOutButton />
    <NavButton href="profile" name="Profile" hot={true}><BootstrapIcons.BsPerson /></NavButton>
    <NavButton href="account" name="Account" hot={true}><BootstrapIcons.BsGear /></NavButton>
    <NavButton href="poast" name="Poast" hot={true}><BootstrapIcons.BsPlus /></NavButton>
  </NavActions>
})

const LoggedOutActions = () => <NavActions id="user-actions">
  <NavButton href="login" name="Login" hot={true}><BootstrapIcons.BsBoxArrowInRight /></NavButton>
</NavActions>

const NavActions = (props: {
  id: string;
  children: JSXChildren
}) => <section class="flex gap-2" id={props.id}>{props.children}</section>

const NavPages = () => <NavActions id="nav-pages">
  <NavButton href="users" name="Users"><BootstrapIcons.BsPeople /></NavButton>
  <NavButton href="sheets" name="Sheets"><BootstrapIcons.BsTable /></NavButton>
  <NavButton href="beeps" name="Beeps"><BootstrapIcons.BsVinyl /></NavButton>
</NavActions>

const Header = (props: {
  loggedIn: boolean;
}) => {
  const { loggedIn } = props;

  return (
    <header class="sticky bg-raisin/80 w-screen h-auto top-0 backdrop-blur-sm grid grid-rows-2 2xl:flex px-5 py-2 gap-1 lg:gap-4">
      <section class="row-start-1 flex items-center gap-3">
        <QwikRive options={{
          width: "50%",
          height: "50%",
          src: "/box.riv",
          stateMachines: "pick"
        }} ></QwikRive><h1 class="text-3xl font-bold">beepbox.net</h1>
      </section>
      <nav class="row-start-2 flex justify-between xl:justify-between gap-2">
        <NavActions id="user-actions">{loggedIn ? <LoggedInActions /> : <LoggedOutActions />}</NavActions>
        <NavPages />
      </nav>
    </header>
  );
}

export default component$(() => {
  useStyles$(styles);
  const signal = useSession();
  const { loggedIn } = signal.value
  console.log(loggedIn)
  return (
    <>
      <Header loggedIn={loggedIn} />
      <main>
        <Slot />
      </main>
    </>
  );
});
