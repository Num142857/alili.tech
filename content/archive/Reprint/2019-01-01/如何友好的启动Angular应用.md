---
title: '如何友好的启动Angular应用' 
date: 2019-01-01 2:30:07
hidden: true
slug: 0vsv0p1flh1m
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">一、引言</h1>
<p>一个单页应用第一次启动从文档的下载（包括各种资源）再到初始化至成功渲染这一过程基本上都是以秒为单位的。</p>
<p>Angular应用的 <code>index.html</code> 会在文档当中写入根组件，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<app-root>Loading...</app-root>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">app-root</span>&gt;</span>Loading...<span class="hljs-tag">&lt;/<span class="hljs-name">app-root</span>&gt;</span></code></pre>
<p>直到Angular初始化完成后 Loading... 字样才会从页面消失，并进入实际的应用。当然相比较一版空白着实还算优雅一点。</p>
<p>然而一个好的应用的体验怎能这样呢，有兴趣的可以先看一下 <a href="https://github.com/cipchk/ng-alain" rel="nofollow noreferrer" target="_blank">ng-alain</a> 是如何友好的启动Angular的。</p>
<h1 id="articleHeader1">二、如何才算友好？</h1>
<p>我们知道浏览器需要先接收一个HTML文档，然后解析文档并加载相应的样式及脚本文件，这里有很多优化相关的技术细节，但更多细节本文不作探讨。</p>
<p>对于Angular而言，真正开始渲染组件会在 <code>platformBrowserDynamic().bootstrapModule</code> 之后，因此若说友好，理应在此之前把那该死的 Loading... 换成一个动画或更友好的效果。</p>
<p>所以，得出第一个要点：<strong>尽可能早显示启动动画，并尽可能在组件渲染之前关掉动画</strong>。</p>
<p>然而，现实与想法的有点不同，那就是绝大部分启动过程中是需要依赖于远程数据，亦或者指引用户应该是进入登录页，还是控制页。</p>
<p>因此，第二个要点：<strong>启动前需要至少一次远程交互</strong>。</p>
<h1 id="articleHeader2">三、如何做呢？</h1>
<h2 id="articleHeader3">1、启动动画</h2>
<p>HTML文档下载之后会立即显示，因此，可以利用这一点，把启动动画直接写在 <code>index.html</code> 页面当中。但，我们不应该像开头那样，而是一个复杂的CSS3动画，以下是一摘自 <a href="https://github.com/cipchk/ng-alain" rel="nofollow noreferrer" target="_blank">ng-alain</a>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!doctype html>
<html>

<head>
    <meta charset=&quot;utf-8&quot;>
    <title>ngAlain</title>
    <base href=&quot;/&quot;>

    <meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot;>
    <link rel=&quot;icon&quot; type=&quot;image/x-icon&quot; href=&quot;favicon.ico&quot;>
    <style type=&quot;text/css&quot;>
        .preloader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            background: #49a9ee;
            z-index: 9999;
            transition: opacity .65s;
        }

        .preloader-hidden-add {
            opacity: 1;
            display: block;
        }

        .preloader-hidden-add-active {
            opacity: 0;
        }

        .preloader-hidden {
            display: none;
        }

        .cs-loader {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
        }

        .cs-loader-inner {
            -webkit-transform: translateY(-50%);
            transform: translateY(-50%);
            top: 50%;
            position: absolute;
            width: calc(100% - 200px);
            color: #FFF;
            padding: 0 100px;
            text-align: center;
        }

        .cs-loader-inner label {
            font-size: 20px;
            opacity: 0;
            display: inline-block;
        }

        @-webkit-keyframes lol {
            0% {
                opacity: 0;
                -webkit-transform: translateX(-300px);
                transform: translateX(-300px);
            }
            33% {
                opacity: 1;
                -webkit-transform: translateX(0px);
                transform: translateX(0px);
            }
            66% {
                opacity: 1;
                -webkit-transform: translateX(0px);
                transform: translateX(0px);
            }
            100% {
                opacity: 0;
                -webkit-transform: translateX(300px);
                transform: translateX(300px);
            }
        }

        @keyframes lol {
            0% {
                opacity: 0;
                -webkit-transform: translateX(-300px);
                transform: translateX(-300px);
            }
            33% {
                opacity: 1;
                -webkit-transform: translateX(0px);
                transform: translateX(0px);
            }
            66% {
                opacity: 1;
                -webkit-transform: translateX(0px);
                transform: translateX(0px);
            }
            100% {
                opacity: 0;
                -webkit-transform: translateX(300px);
                transform: translateX(300px);
            }
        }

        .cs-loader-inner label:nth-child(6) {
            -webkit-animation: lol 3s infinite ease-in-out;
            animation: lol 3s infinite ease-in-out;
        }

        .cs-loader-inner label:nth-child(5) {
            -webkit-animation: lol 3s 100ms infinite ease-in-out;
            animation: lol 3s 100ms infinite ease-in-out;
        }

        .cs-loader-inner label:nth-child(4) {
            -webkit-animation: lol 3s 200ms infinite ease-in-out;
            animation: lol 3s 200ms infinite ease-in-out;
        }

        .cs-loader-inner label:nth-child(3) {
            -webkit-animation: lol 3s 300ms infinite ease-in-out;
            animation: lol 3s 300ms infinite ease-in-out;
        }

        .cs-loader-inner label:nth-child(2) {
            -webkit-animation: lol 3s 400ms infinite ease-in-out;
            animation: lol 3s 400ms infinite ease-in-out;
        }

        .cs-loader-inner label:nth-child(1) {
            -webkit-animation: lol 3s 500ms infinite ease-in-out;
            animation: lol 3s 500ms infinite ease-in-out;
        }

    </style>
</head>

<body>
    <app-root></app-root>
    <div class=&quot;preloader&quot;>
        <div class=&quot;cs-loader&quot;>
            <div class=&quot;cs-loader-inner&quot;>
                <label>    ●</label>
                <label>    ●</label>
                <label>    ●</label>
                <label>    ●</label>
                <label>    ●</label>
                <label>    ●</label>
            </div>
        </div>
    </div>
</body>

</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!doctype html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>ngAlain<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">base</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"/"</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"icon"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"image/x-icon"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"favicon.ico"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="css">
        <span class="hljs-selector-class">.preloader</span> {
            <span class="hljs-attribute">position</span>: fixed;
            <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
            <span class="hljs-attribute">overflow</span>: hidden;
            <span class="hljs-attribute">background</span>: <span class="hljs-number">#49a9ee</span>;
            <span class="hljs-attribute">z-index</span>: <span class="hljs-number">9999</span>;
            <span class="hljs-attribute">transition</span>: opacity .<span class="hljs-number">65s</span>;
        }

        <span class="hljs-selector-class">.preloader-hidden-add</span> {
            <span class="hljs-attribute">opacity</span>: <span class="hljs-number">1</span>;
            <span class="hljs-attribute">display</span>: block;
        }

        <span class="hljs-selector-class">.preloader-hidden-add-active</span> {
            <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
        }

        <span class="hljs-selector-class">.preloader-hidden</span> {
            <span class="hljs-attribute">display</span>: none;
        }

        <span class="hljs-selector-class">.cs-loader</span> {
            <span class="hljs-attribute">position</span>: absolute;
            <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
            <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
        }

        <span class="hljs-selector-class">.cs-loader-inner</span> {
            <span class="hljs-attribute">-webkit-transform</span>: <span class="hljs-built_in">translateY</span>(-50%);
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateY</span>(-50%);
            <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
            <span class="hljs-attribute">position</span>: absolute;
            <span class="hljs-attribute">width</span>: <span class="hljs-built_in">calc</span>(100% - 200px);
            <span class="hljs-attribute">color</span>: <span class="hljs-number">#FFF</span>;
            <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span> <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">text-align</span>: center;
        }

        <span class="hljs-selector-class">.cs-loader-inner</span> <span class="hljs-selector-tag">label</span> {
            <span class="hljs-attribute">font-size</span>: <span class="hljs-number">20px</span>;
            <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">display</span>: inline-block;
        }

        @-<span class="hljs-keyword">webkit</span>-<span class="hljs-keyword">keyframes</span> lol {
            0% {
                <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
                <span class="hljs-attribute">-webkit-transform</span>: <span class="hljs-built_in">translateX</span>(-300px);
                <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(-300px);
            }
            33% {
                <span class="hljs-attribute">opacity</span>: <span class="hljs-number">1</span>;
                <span class="hljs-attribute">-webkit-transform</span>: <span class="hljs-built_in">translateX</span>(0px);
                <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(0px);
            }
            66% {
                <span class="hljs-attribute">opacity</span>: <span class="hljs-number">1</span>;
                <span class="hljs-attribute">-webkit-transform</span>: <span class="hljs-built_in">translateX</span>(0px);
                <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(0px);
            }
            100% {
                <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
                <span class="hljs-attribute">-webkit-transform</span>: <span class="hljs-built_in">translateX</span>(300px);
                <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(300px);
            }
        }

        @<span class="hljs-keyword">keyframes</span> lol {
            0% {
                <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
                <span class="hljs-attribute">-webkit-transform</span>: <span class="hljs-built_in">translateX</span>(-300px);
                <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(-300px);
            }
            33% {
                <span class="hljs-attribute">opacity</span>: <span class="hljs-number">1</span>;
                <span class="hljs-attribute">-webkit-transform</span>: <span class="hljs-built_in">translateX</span>(0px);
                <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(0px);
            }
            66% {
                <span class="hljs-attribute">opacity</span>: <span class="hljs-number">1</span>;
                <span class="hljs-attribute">-webkit-transform</span>: <span class="hljs-built_in">translateX</span>(0px);
                <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(0px);
            }
            100% {
                <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
                <span class="hljs-attribute">-webkit-transform</span>: <span class="hljs-built_in">translateX</span>(300px);
                <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(300px);
            }
        }

        <span class="hljs-selector-class">.cs-loader-inner</span> <span class="hljs-selector-tag">label</span><span class="hljs-selector-pseudo">:nth-child(6)</span> {
            <span class="hljs-attribute">-webkit-animation</span>: lol <span class="hljs-number">3s</span> infinite ease-in-out;
            <span class="hljs-attribute">animation</span>: lol <span class="hljs-number">3s</span> infinite ease-in-out;
        }

        <span class="hljs-selector-class">.cs-loader-inner</span> <span class="hljs-selector-tag">label</span><span class="hljs-selector-pseudo">:nth-child(5)</span> {
            <span class="hljs-attribute">-webkit-animation</span>: lol <span class="hljs-number">3s</span> <span class="hljs-number">100ms</span> infinite ease-in-out;
            <span class="hljs-attribute">animation</span>: lol <span class="hljs-number">3s</span> <span class="hljs-number">100ms</span> infinite ease-in-out;
        }

        <span class="hljs-selector-class">.cs-loader-inner</span> <span class="hljs-selector-tag">label</span><span class="hljs-selector-pseudo">:nth-child(4)</span> {
            <span class="hljs-attribute">-webkit-animation</span>: lol <span class="hljs-number">3s</span> <span class="hljs-number">200ms</span> infinite ease-in-out;
            <span class="hljs-attribute">animation</span>: lol <span class="hljs-number">3s</span> <span class="hljs-number">200ms</span> infinite ease-in-out;
        }

        <span class="hljs-selector-class">.cs-loader-inner</span> <span class="hljs-selector-tag">label</span><span class="hljs-selector-pseudo">:nth-child(3)</span> {
            <span class="hljs-attribute">-webkit-animation</span>: lol <span class="hljs-number">3s</span> <span class="hljs-number">300ms</span> infinite ease-in-out;
            <span class="hljs-attribute">animation</span>: lol <span class="hljs-number">3s</span> <span class="hljs-number">300ms</span> infinite ease-in-out;
        }

        <span class="hljs-selector-class">.cs-loader-inner</span> <span class="hljs-selector-tag">label</span><span class="hljs-selector-pseudo">:nth-child(2)</span> {
            <span class="hljs-attribute">-webkit-animation</span>: lol <span class="hljs-number">3s</span> <span class="hljs-number">400ms</span> infinite ease-in-out;
            <span class="hljs-attribute">animation</span>: lol <span class="hljs-number">3s</span> <span class="hljs-number">400ms</span> infinite ease-in-out;
        }

        <span class="hljs-selector-class">.cs-loader-inner</span> <span class="hljs-selector-tag">label</span><span class="hljs-selector-pseudo">:nth-child(1)</span> {
            <span class="hljs-attribute">-webkit-animation</span>: lol <span class="hljs-number">3s</span> <span class="hljs-number">500ms</span> infinite ease-in-out;
            <span class="hljs-attribute">animation</span>: lol <span class="hljs-number">3s</span> <span class="hljs-number">500ms</span> infinite ease-in-out;
        }

    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">app-root</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">app-root</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"preloader"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"cs-loader"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"cs-loader-inner"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>    ●<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>    ●<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>    ●<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>    ●<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>    ●<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>    ●<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>HTML 文档包括了动画需要的所有代码，因此可以完成<strong>尽可能早显示启动动画</strong>这一前提。而后者<strong>尽可能在组件渲染之前关掉动画</strong>又当如何处理呢？</p>
<p>组件树的渲染会在 <code>bootstrapModule</code> 之后，而其接口又是返回一个 <code>Promise&lt;NgModuleRef&lt;AppModule&gt;&gt;</code>，没错 <code>Promise</code> 意味者允许我们通过 <code>then</code> 来感受Angular启动后做点什么擦屁股的问题，例如去掉动画代码。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const bootstrap = () => {
  return platformBrowserDynamic().bootstrapModule(AppModule);
};

bootstrap().then(() => {
    document.querySelector('.preloader').className += ' preloader-hidden-add preloader-hidden-add-active';
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">const</span> bootstrap = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-keyword">return</span> platformBrowserDynamic().bootstrapModule(AppModule);
};

bootstrap().then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.preloader'</span>).className += <span class="hljs-string">' preloader-hidden-add preloader-hidden-add-active'</span>;
});</code></pre>
<p>此问题就这么轻松的解决。</p>
<h2 id="articleHeader4">2、启动前加载数据</h2>
<p>一种非常理所当然的想法便是在 <code>bootstrapModule</code> 之间发送AJAX请求不就可以了。话虽简单，那ajax代码怎么写？是不是还得考虑兼容性问题？远程数据加载后难道用 <code>window.xxx</code> 来存储吗？</p>
<p>若你这么做，那你太小看Angular，Angular是非常强大的。</p>
<p>Angular提供一个叫 <code>APP_INITIALIZER</code> 的 Token 值，用于在应用初始化时执行相应的函数。</p>
<p>所以只需要像其它服务编码一样，写一个用于在启动应用时所需要的服务逻辑，以下是一摘自 <a href="https://github.com/cipchk/ng-alain" rel="nofollow noreferrer" target="_blank">ng-alain</a>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Router } from '@angular/router';
import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuService } from &quot;../menu/menu.service&quot;;
import { TranslatorService } from &quot;../translator/translator.service&quot;;
import { SettingsService } from &quot;../settings/settings.service&quot;;
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
/**
 * 用于应用启动时
 * 一般用来获取应用所需要的基础数据等
 */
@Injectable()
export class StartupService {
    constructor(
        private menuService: MenuService,
        private tr: TranslatorService,
        private settingService: SettingsService,
        private httpClient: HttpClient,
        private injector: Injector) { }

    load(): Promise<any> {
        // only works with promises
        // https://github.com/angular/angular/issues/15088
        let ret = this.httpClient
                    .get('./assets/app-data.json')
                    .toPromise()
                    .then((res: any) => {
                        // just only injector way if you need navigate to login page.
                        // this.injector.get(Router).navigate([ '/login' ]);

                        this.settingService.setApp(res.app);
                        this.settingService.setUser(res.user);
                        // 初始化菜单
                        this.menuService.add(res.menu);
                        // 调整语言
                        this.tr.use('en');
                    })
                    .catch((err: any) => {
                        return Promise.resolve(null);
                    });

        return ret.then((res) => { });
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { Router } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/router'</span>;
<span class="hljs-keyword">import</span> { Injectable, Injector } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;
<span class="hljs-keyword">import</span> { HttpClient } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/common/http'</span>;
<span class="hljs-keyword">import</span> { MenuService } <span class="hljs-keyword">from</span> <span class="hljs-string">"../menu/menu.service"</span>;
<span class="hljs-keyword">import</span> { TranslatorService } <span class="hljs-keyword">from</span> <span class="hljs-string">"../translator/translator.service"</span>;
<span class="hljs-keyword">import</span> { SettingsService } <span class="hljs-keyword">from</span> <span class="hljs-string">"../settings/settings.service"</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">'rxjs/add/operator/do'</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">'rxjs/add/operator/toPromise'</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">'rxjs/add/operator/catch'</span>;
<span class="hljs-comment">/**
 * 用于应用启动时
 * 一般用来获取应用所需要的基础数据等
 */</span>
<span class="hljs-meta">@Injectable</span>()
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> StartupService {
    <span class="hljs-keyword">constructor</span>(<span class="hljs-params">
        <span class="hljs-keyword">private</span> menuService: MenuService,
        <span class="hljs-keyword">private</span> tr: TranslatorService,
        <span class="hljs-keyword">private</span> settingService: SettingsService,
        <span class="hljs-keyword">private</span> httpClient: HttpClient,
        <span class="hljs-keyword">private</span> injector: Injector</span>) { }

    load(): <span class="hljs-built_in">Promise</span>&lt;<span class="hljs-built_in">any</span>&gt; {
        <span class="hljs-comment">// only works with promises</span>
        <span class="hljs-comment">// https://github.com/angular/angular/issues/15088</span>
        <span class="hljs-keyword">let</span> ret = <span class="hljs-keyword">this</span>.httpClient
                    .get(<span class="hljs-string">'./assets/app-data.json'</span>)
                    .toPromise()
                    .then(<span class="hljs-function">(<span class="hljs-params">res: <span class="hljs-built_in">any</span></span>) =&gt;</span> {
                        <span class="hljs-comment">// just only injector way if you need navigate to login page.</span>
                        <span class="hljs-comment">// this.injector.get(Router).navigate([ '/login' ]);</span>

                        <span class="hljs-keyword">this</span>.settingService.setApp(res.app);
                        <span class="hljs-keyword">this</span>.settingService.setUser(res.user);
                        <span class="hljs-comment">// 初始化菜单</span>
                        <span class="hljs-keyword">this</span>.menuService.add(res.menu);
                        <span class="hljs-comment">// 调整语言</span>
                        <span class="hljs-keyword">this</span>.tr.use(<span class="hljs-string">'en'</span>);
                    })
                    .catch(<span class="hljs-function">(<span class="hljs-params">err: <span class="hljs-built_in">any</span></span>) =&gt;</span> {
                        <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-literal">null</span>);
                    });

        <span class="hljs-keyword">return</span> ret.then(<span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> { });
    }
}</code></pre>
<p>这里有两点需要注意：</p>
<ul>
<li>
<code>load()</code> 返回值必须是 <code>Promise</code> 类型。</li>
<li>若需要路由跳转，尽可能采用 <code>this.injector.get(Router)</code> 方式来获取路由实例，不然很容易引起循环依赖BUG。</li>
</ul>
<p>服务是需要注册的，自然在根模块中完成。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export function StartupServiceFactory(startupService: StartupService): Function {
    return () => { return startupService.load() };
}

@NgModule({
    providers: [
        StartupService,,
        {
            provide: APP_INITIALIZER,
            useFactory: StartupServiceFactory,
            deps: [StartupService],
            multi: true
        }
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">StartupServiceFactory</span>(<span class="hljs-params">startupService: StartupService</span>): <span class="hljs-title">Function</span> </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> { <span class="hljs-keyword">return</span> startupService.load() };
}

<span class="hljs-meta">@NgModule</span>({
    providers: [
        StartupService,,
        {
            provide: APP_INITIALIZER,
            useFactory: StartupServiceFactory,
            deps: [StartupService],
            multi: <span class="hljs-literal">true</span>
        }
    ],
    bootstrap: [ AppComponent ]
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppModule { }</code></pre>
<p>到此，两件事已经完成了。</p>
<h1 id="articleHeader5">四、结论</h1>
<p>本文的想法还是来源里群里总有人在问一下问题，如何在Angular启用时先加载远程数据；其中 <code>APP_INITIALIZER</code> 算是很少有人提及的，其它的都是一些日常写法，了无新意。</p>
<p>希望此文能帮助各位。</p>
<p>Happy coding!</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何友好的启动Angular应用

## 原文链接
[https://segmentfault.com/a/1190000011064837](https://segmentfault.com/a/1190000011064837)

