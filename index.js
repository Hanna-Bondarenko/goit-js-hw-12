import{a as L,S as b,i}from"./assets/vendor-DWaGEket.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const h of r.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&a(h)}).observe(document,{childList:!0,subtree:!0});function o(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(t){if(t.ep)return;t.ep=!0;const r=o(t);fetch(t.href,r)}})();const p=e=>`
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
  `,v="45467228-b7d2f005bd7eca51073290ac8",S="https://pixabay.com/api/",y=async(e,s)=>{const o=new URLSearchParams({orientation:"horizontal",image_type:"photo",safesearch:!0,key:v,q:e,page:s,per_page:15}),{data:a}=await L.get(`${S}?${o}`);return a},u=document.querySelector(".js-search-form"),l=document.querySelector(".js-gallery"),d=document.querySelector(".js-loader"),m=document.querySelector(".js-load-more-btn");let n=1,c="";const f=new b(".js-gallery a",{captionsData:"alt",captionDelay:250}),w=async e=>{if(e.preventDefault(),c=u.elements.user_query.value.trim(),c===""){i.error({message:"Sorry, there is no image matching your search query. Please try again!",position:"topRight"});return}n=1,d.classList.remove("is-hidden"),l.innerHTML="",m.classList.add("is-hidden");try{const s=await y(c,n);if(s.hits.length===0){i.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}const o=s.hits.map(a=>p(a)).join("");l.innerHTML=o,g(),f.refresh(),u.reset(),s.totalHits>15&&m.classList.remove("is-hidden")}catch(s){i.error({message:s.message,position:"topRight"})}finally{d.classList.add("is-hidden")}},P=async()=>{n++,d.classList.remove("is-hidden");try{const e=await y(c,n),s=e.hits.map(o=>p(o)).join("");l.insertAdjacentHTML("beforeend",s),g(),f.refresh(),Math.ceil(e.totalHits/15)===n&&(m.classList.add("is-hidden"),i.info({message:"We're sorry, but you've reached the end of search results",position:"topRight"}))}catch(e){i.error({message:e.message,position:"topRight"})}finally{d.classList.add("is-hidden")}},g=()=>{const{height:e}=l.firstElementChild.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})};m.addEventListener("click",P);u.addEventListener("submit",w);
//# sourceMappingURL=index.js.map
