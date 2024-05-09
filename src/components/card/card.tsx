import { component$ } from "@builder.io/qwik";

export default component$((props: {
    maxChars: number;
}) => {
    const { maxChars } = props;
    const obj = {
        title: "Title",
        blurb: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi accumsan suscipit elit, et fringilla risus ultricies sit amet. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean pellentesque non enim eget porta. Suspendisse semper neque quis dui congue sodales. Cras elementum iaculis eros ac maximus."
    }
    return <article class="px-5 h-52  md:w-1/2 sm:w-full  2xl:w-1/3 grid grid-rows-4">
        <div class="row-span-1 flex items-end">
        <h2>{obj.title}</h2>
        </div>
        <div class="bg-space/50 rounded-lg backdrop:blur-lg h-full row-span-3 overflow-ellipsis overflow-hidden whitespace-normal grid grid-cols-2">
            <div class="row-span-1"></div>
            <div class="row-span-1">{obj.blurb.slice(0, maxChars ?? 80) + "..."}</div>
        </div>
    </article>
})