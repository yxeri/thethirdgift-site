!function e(t,n,r){function o(a,c){if(!n[a]){if(!t[a]){var s="function"==typeof require&&require;if(!c&&s)return s(a,!0);if(i)return i(a,!0);var u=new Error("Cannot find module '"+a+"'");throw u.code="MODULE_NOT_FOUND",u}var d=n[a]={exports:{}};t[a][0].call(d.exports,function(e){var n=t[a][1][e];return o(n?n:e)},d,d.exports,e,t,n,r)}return n[a].exports}for(var i="function"==typeof require&&require,a=0;a<r.length;a++)o(r[a]);return o}({1:[function(){"use strict";function e(e){e.classList.remove("collapse"),e.classList.add("expand")}function t(e){e.classList.remove("expand"),e.classList.add("collapse")}function n(n,r){d&&d.classList.remove("collapse"),history.replaceState({},"","#"+r.id),t(n),e(r),r.scrollIntoView(!0),d=n,u=r}function r(e){var t=function(e){var t=e.currentTarget;u!==t&&n(u,t)};e.addEventListener("click",t)}function o(){var e=Array.prototype.indexOf.call(s,u),t=e-1;e>0&&t>=0&&n(u,s[t])}function i(){var e=Array.prototype.indexOf.call(s,u),t=s.length-1,r=e+1;t>e&&t>=r&&n(u,s[r])}function a(){return window.innerWidth>window.innerHeight}function c(){for(var t=0;t<s.length;t++)r(s[t]);addEventListener("keydown",function(e){var t="number"==typeof e.which?e.which:e.keyCode;switch(t){case 37:a()&&o();break;case 38:a()||o();break;case 39:a()&&i();break;case 40:a()||i()}}),addEventListener("touchstart",function(e){l=new Date,f=e.touches[0].clientX,h=e.touches[0].clientY,v=0,p=!0}),addEventListener("touchmove",function(e){var t=f-e.touches[0].clientX,n=h-e.touches[0].clientY;(Math.abs(t)<Math.abs(v)||Math.abs(n)>20)&&(p=!1),v=t}),addEventListener("touchend",function(){var e=new Date;p&&Math.abs(v)>50&&e.getSeconds()-l.getSeconds()<=1&&(v>0?i():o())}),addEventListener("orientationchange",function(){u.scrollIntoView(!0)}),location.hash.length>1&&(u=Array.prototype.find.call(s,function(e){return e.id===location.hash.slice(1)})),e(u)}var s=document.getElementById("main").children,u=s[0],d=void 0,l=void 0,f=void 0,h=void 0,v=void 0,p=void 0;c()},{}]},{},[1]);