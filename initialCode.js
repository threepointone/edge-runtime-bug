import * as Y from "yjs";

addEventListener("fetch", (event) => {
  console.log(Y);
  return event.respondWith(new Response("hello world"));
});
