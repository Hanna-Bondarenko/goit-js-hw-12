import{a as y,S as g,i as m}from"./assets/vendor-DWaGEket.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function i(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(t){if(t.ep)return;t.ep=!0;const r=i(t);fetch(t.href,r)}})();const p=e=>`
    <li class="gallery-card">
      <a href="${e.largeImageURL}">
        <img class="gallery-img" src="${e.webformatURL}" alt="${e.tags}" loading="lazy" />
      </a>
      <div class="info">
        <p class="info-item">
          <b>Likes:</b> ${e.likes}
        </p>
        <p class="info-item">
          <b>Views:</b> ${e.views}
        </p>
        <p class="info-item">
          <b>Comments:</b> ${e.comments}
        </p>
        <p class="info-item">
          <b>Downloads:</b> ${e.downloads}
        </p>
      </div>
    </li>
  `,b="45467228-b7d2f005bd7eca51073290ac8",L="https://pixabay.com/api/",f=async(e,s)=>{const i=new URLSearchParams({orientation:"horizontal",image_type:"photo",safesearch:!0,key:b,q:e,page:s,per_page:15}),{data:a}=await y(`${L}?${i}`);return a},c=document.querySelector(".js-search-form"),l=document.querySelector(".js-gallery");document.querySelector(".js-loader");const u=document.querySelector(".js-load-more-btn");let o=1,d="";const h=new g(".js-gallery a",{captionsData:"alt",captionDelay:250}),S=async e=>{e.preventDefault(),d=c.elements.user_query.value,o=1;try{const s=await f(d,o);if(s.hits.length===0){m.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),l.innerHTML="",c.reset();return}l.innerHTML=s.hits.map(p).join(""),h.refresh(),u.classList.remove("is-hidden")}catch(s){console.log(s)}},v=async()=>{o+=1;try{const e=await f(d,o);l.insertAdjacentHTML("beforeend",e.hits.map(p).join("")),h.refresh(),o*15>=e.totalHits&&(m.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),u.classList.add("is-hidden"))}catch(e){console.log(e)}};c.addEventListener("submit",S);u.addEventListener("click",v);
//# sourceMappingURL=index.js.map
