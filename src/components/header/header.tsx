import { JSXChildren, component$ } from "@builder.io/qwik";
import { QwikRive } from "../rive/rive";
import { NavButton } from "../nav.button";
import * as BootstrapIcons from "@qwikest/icons/bootstrap"
import { Link, useNavigate } from "@builder.io/qwik-city";
import { routeAction$ } from "@builder.io/qwik-city";

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


const LoggedInActions = component$(() => {
  const logout = useLogout();
  const nav = useNavigate();
  return <NavActions id="user-actions">
    <button name="Logout" onClick$={async () => {
      await logout.submit().then(() => nav())
    }}><BootstrapIcons.BsBoxArrowLeft /></button>
    <NavButton href="profile" name="Profile"><BootstrapIcons.BsPerson /></NavButton>
    <NavButton href="settings" name="settings"><BootstrapIcons.BsGear /></NavButton>
    <NavButton href="poast" name="poast"><BootstrapIcons.BsPlus /></NavButton>
  </NavActions>})

const LoggedOutActions = () => <NavActions id="user-actions">
  <NavButton href="login" name="Login"><BootstrapIcons.BsBoxArrowInRight /></NavButton>
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

export default (props: {
  loggedIn: boolean;
}) => {
  const { loggedIn } = props;

  return (
    <header class="sticky bg-raisin/80 w-screen h-auto top-0 backdrop-blur-sm grid grid-rows-2 xl:flex px-5 py-2 gap-1 lg:gap-2">
      <section class="row-start-1 flex items-center gap-3">
        <QwikRive options={{
          width: "50%",
          height: "50%",
          src: "/box.riv",
          stateMachines: "State Machine 1"
        }} ></QwikRive><h1 class="text-3xl font-bold text-white">beepbox.net</h1>
      </section>
      <nav class="row-start-2 flex justify-between">
        <NavActions id="user-actions">{loggedIn ? <LoggedInActions /> : <LoggedOutActions />}</NavActions>
        <NavPages />
      </nav>
    </header>
  );
}