import { $, Slot, component$, useStyles$ } from "@builder.io/qwik";
import styles from "./styles.styl?inline";
import { Link } from "@builder.io/qwik-city";

export const NavButton = component$((props: {
    name: string;
    href: string
    hot?: boolean;
    large?: boolean;
}) => {
    const { name, href, hot, large } = props;
    return (<Link href={href}><button class={"nav " + (hot === true ? "phlox-button " : "box-button ") + (large ? "large" : "")} >
    <div class="icon"><Slot /></div>
    <div class="name">{name}</div>
</button></Link>
    );
});