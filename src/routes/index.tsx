import { $, Signal, component$, useOn, useOnDocument, useOnWindow, useSignal, useStore, useVisibleTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Card from "~/components/card/card";

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
  const maxChars = width > 2000 ? 160
  : width > 1800 ? 130
  : width > 1600 ? 100
  : width > 1700 ? 100
  : width > 1600 ? 60 : 60;

  return (<>
    <div>Client Width: {dimensions.width}</div>
    <section class="flex w-full h-auto flex-wrap gap-y-5">
     {Array(5).fill(1).map(() => <Card maxChars={maxChars}/>)}
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

