import { $, Signal, component$, useOn, useOnDocument, useOnWindow, useSignal, useStore, useVisibleTask$ } from "@builder.io/qwik";
import type { DocumentHead, RequestHandler } from "@builder.io/qwik-city";
import Card from "~/components/card/card";
import { Maize } from "~/components/maize/maize";

export const onGet: RequestHandler = async ({ error }) => {
}
;
function useDimensions() {
  const dimensions = useStore({
    width: 0,
    height: 0,
  });

  useOnWindow(
    'load',
    $((event) => {
      const window = (event.target as Document).defaultView
      if (!window) return;
      const { innerWidth, innerHeight } = window;
      dimensions.width = innerWidth;
      dimensions.height = innerHeight;
    })
  );

  useOnWindow(
    'resize',
    $((event) => {
      const window = event.target as Window;
      if (!window) return;
      const { innerWidth, innerHeight } = window;
      dimensions.width = innerWidth;
      dimensions.height = innerHeight;
    })
  );

  return dimensions;
}

export default component$(() => {
  const dimensions = useDimensions();
  const { width } = dimensions;
  const maxChars =
  width > 2400 ? 200
  : width > 2000 ? 180
  : width > 1800 ? 140
  : width > 1700 ? 130
  : width > 1600 ? 120
  : width > 1537 ? 100
  : width > 1440 ? 160
  : width > 1024 ? 140
  : width > 819 ? 100
  : width > 767 ? 80
  : width > 640 ? 200
  : width > 540 ? 160
  : width > 414 ? 139
  : 80

  return (<>
    <section class="flex w-full h-auto flex-wrap gap-y-5">
     {Array(30).fill(1).map((_i, j) => <Card maxChars={maxChars} key={j}/>)}
    </section>
    </>
  );
});

export const head: DocumentHead = {
  title: "Home",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};

