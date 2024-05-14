import { Slot, component$ } from "@builder.io/qwik";

export const SVGContainer = component$((props: {
    width: number;
}) => <div class={`icon flex justify-center items-center w-${props.width} h-${props.width} p-2`}><Slot /></div>);