!function e(t,n,o){function r(i,d){if(!n[i]){if(!t[i]){var c="function"==typeof require&&require;if(!d&&c)return c(i,!0);if(a)return a(i,!0);var l=new Error("Cannot find module '"+i+"'");throw l.code="MODULE_NOT_FOUND",l}var s=n[i]={exports:{}};t[i][0].call(s.exports,function(e){var n=t[i][1][e];return r(n?n:e)},s,s.exports,e,t,n,o)}return n[i].exports}for(var a="function"==typeof require&&require,i=0;i<o.length;i++)r(o[i]);return r}({1:[function(){"use strict";function e(){if(!u){var e=c.value;c.value="",s.loadVideoById(e)}}function t(){console.log("ready")}function n(e){-1===e.data?(u=!1,d.classList.add("hide")):e.data===YT.PlayerState.PLAYING?u||(s.pauseVideo(),setTimeout(function(){s.playVideo(),d.classList.remove("hide"),i.classList.remove("hide"),setTimeout(function(){i.classList.add("hide")},3e3)},900),u=!0):e.data===YT.PlayerState.ENDED&&(u=!1,d.classList.add("hide"))}var o=document.createElement("script"),r=document.getElementsByTagName("script")[0],a=document.getElementById("playerWrapper"),i=document.getElementById("playerBottom"),d=document.getElementById("playerInnerWrapper"),c=document.getElementById("idInput"),l=document.getElementById("idButton"),s=void 0,u=!1;o.src="https://www.youtube.com/iframe_api",r.parentNode.insertBefore(o,r),a.addEventListener("click",function(e){e.stopPropagation()}),l.addEventListener("click",function(){console.log("click"),e()}),window.onYouTubeIframeAPIReady=function(){s=new YT.Player("player",{height:405,width:720,playerVars:{autoPlay:1,controls:0,disablekb:1,enablejsapi:1,fs:0,modestbranding:1,rel:0,showinfo:0,iv_load_polacy:3,frameborder:0,playsinline:1},events:{onReady:t,onStateChange:n}})}},{}]},{},[1]);