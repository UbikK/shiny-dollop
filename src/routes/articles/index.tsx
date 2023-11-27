import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
 
export const useArticles = routeLoader$(async (requestEvent) => {
  // This code runs only on the server, after every navigation
  const res = await fetch(`http://localhost:1337/api/articles`, {headers: {authorization: `Bearer ${process.env.CMS_TOKEN}`}});
  const {data: articles, meta} = await res.json();
  console.log("🚀 ~ file: index.tsx:8 ~ useArticles ~ articles:", articles)
  return articles;
});
 
export default component$(() => {
  // In order to access the `routeLoader$` data within a Qwik Component, you need to call the hook.
  const signal = useArticles(); // Readonly<Signal<Product>>
  return <p>Article name: {signal.value.product}</p>;
});