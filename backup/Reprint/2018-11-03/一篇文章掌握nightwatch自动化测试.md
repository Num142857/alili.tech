---
title: 一篇文章掌握nightwatch自动化测试
hidden: true
categories: [reprint]
slug: eb1ab444
date: 2018-11-03 10:03:44
---

{{< raw >}}
<p>nightwatch.js&#x662F;&#x4E00;&#x4E2A;web-ui&#x81EA;&#x52A8;&#x5316;&#x6D4B;&#x8BD5;&#x6846;&#x67B6;&#xFF0C;&#x88AB;vue-cli&#x6DF1;&#x5EA6;&#x6574;&#x5408;&#x8FDB;&#x6765;&#x3002;&#x5982;&#x679C;&#x4E00;&#x4E2A;&#x9879;&#x76EE;&#x662F;&#x57FA;&#x4E8E;vue-cli&#x642D;&#x5EFA;&#x7684;&#xFF0C;&#x57FA;&#x672C;&#x53EF;&#x4EE5;&#x505A;&#x5230;&#x5F00;&#x7BB1;&#x5373;&#x7528;&#x3002;</p><p>&#x4F46;&#x662F;&#x6211;&#x4EEC;&#x4E0D;&#x53EF;&#x80FD;&#x4E00;&#x76F4;&#x90FD;&#x4F7F;&#x7528;vue-cli&#x3002;&#x56E0;&#x4E3A;&#x5B83;&#x5F88;&#x591A;&#x65F6;&#x5019;&#x4E0D;&#x80FD;&#x591F;&#x6EE1;&#x8DB3;&#x6211;&#x4EEC;&#x7684;&#x5B9A;&#x5236;&#x5316;&#x9700;&#x6C42;&#x3002;&#x6211;&#x4EEC;&#x5F88;&#x591A;&#x65F6;&#x5019;&#x4F1A;&#x5BF9;&#x6784;&#x5EFA;&#x6846;&#x67B6;&#x8FDB;&#x884C;&#x5B9A;&#x5236;&#xFF0C;&#x6216;&#x8005;&#x5B8C;&#x5168;&#x91CD;&#x65B0;&#x642D;&#x5EFA;&#x3002;&#x8FD9;&#x4E2A;&#x65F6;&#x5019;&#x6574;&#x5408;&#x8FDB;&#x6765;nightwatch&#x5C31;&#x4F1A;&#x5F88;&#x56F0;&#x96BE;&#x3002;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#x5C31;&#x6765;&#x5E26;&#x7740;&#x5927;&#x5BB6;&#x5165;&#x95E8;&#x642D;&#x5EFA;&#x8FD9;&#x4E48;&#x4E00;&#x4E2A;&#x6D4B;&#x8BD5;&#x6846;&#x67B6;&#x3002;</p><h1 id="articleHeader0">&#x6240;&#x9700;&#x73AF;&#x5883;</h1><p>&#x9996;&#x5148;&#x5728;&#x9879;&#x76EE;&#x91CC;&#x9762;&#x5B89;&#x88C5;nightwatch&#xFF0C;&#x5207;&#x6362;&#x5230;&#x9879;&#x76EE;&#x76EE;&#x5F55;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm intall nightwatch -D" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code style="word-break:break-word;white-space:initial"><span class="hljs-built_in">npm</span> intall nightwatch -D</code></pre><p>&#x5B89;&#x88C5;&#x8FD9;&#x4E2A;&#x8FD8;&#x4E0D;&#x591F;&#xFF0C;&#x8FD8;&#x9700;&#x8981;&#x5B89;&#x88C5;selenium-server&#xFF0C;&#x540C;&#x6837;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;npm&#x5B89;&#x88C5;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install selenium-server -D" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs sql"><code style="word-break:break-word;white-space:initial">npm <span class="hljs-keyword">install</span> selenium-<span class="hljs-keyword">server</span> -D</code></pre><p>selenium-server&#x662F;&#x57FA;&#x4E8E;Java&#x5F00;&#x53D1;&#x7684;&#xFF0C;&#x4F5C;&#x7528;&#x662F;&#x7528;&#x6765;&#x8FDE;&#x63A5;&#x6D4F;&#x89C8;&#x5668;&#x7684;&#x3002;&#x6240;&#x4EE5;&#x5B89;&#x88C5;selenium-server&#x4E4B;&#x524D;&#x9700;&#x8981;&#x5B89;&#x88C5;java&#x3002;<a href="https://jingyan.baidu.com/article/bea41d435bc695b4c41be648.html" rel="nofollow noreferrer" target="_blank">&#x5982;&#x4F55;&#x5B89;&#x88C5;Java?</a></p><p>&#x9664;&#x6B64;&#x4E4B;&#x5916;&#x8FD8;&#x9700;&#x8981;&#x5B89;&#x88C5;&#x4E00;&#x4E2A;&#x6D4F;&#x89C8;&#x5668;&#x9A71;&#x52A8;&#x5668;&#xFF0C;&#x4E00;&#x822C;&#x6211;&#x4EEC;&#x4F7F;&#x7528;chrome&#x505A;&#x6D4B;&#x8BD5;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install chromedriver --chromedriver_cdnurl=http://cdn.npm.taobao.org/dist/chromedrive -D" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs awk"><code style="word-break:break-word;white-space:initial">npm install chromedriver --chromedriver_cdnurl=http:<span class="hljs-regexp">//</span>cdn.npm.taobao.org<span class="hljs-regexp">/dist/</span>chromedrive -D</code></pre><p>&#x76F4;&#x63A5;&#x5B89;&#x88C5;chromedriver&#x4F1A;&#x63D0;&#x793A;&#x5B89;&#x88C5;&#x4E0D;&#x6210;&#x529F;&#xFF0C;&#x9700;&#x8981;&#x624B;&#x52A8;&#x6307;&#x5B9A;&#x955C;&#x50CF;&#x5730;&#x5740;</p><p>&#x81F3;&#x6B64;&#x9700;&#x8981;&#x4E0B;&#x8F7D;&#x7684;&#x90E8;&#x5206;&#x5DF2;&#x7ECF;&#x4E0B;&#x8F7D;&#x5B8C;&#x6210;&#x3002;</p><h1 id="articleHeader1">&#x9879;&#x76EE;&#x914D;&#x7F6E;</h1><p>nightwatch&#x9ED8;&#x8BA4;&#x4F7F;&#x7528;&#x9879;&#x76EE;&#x6839;&#x76EE;&#x5F55;&#x7684;<code>nightwatch.conf.js</code>&#x4F5C;&#x4E3A;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x3002;&#x5B98;&#x7F51;&#x4E5F;&#x6709;&#x53E6;&#x5916;&#x4E00;&#x79CD;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x7684;&#x683C;&#x5F0F;&#x5C31;&#x662F;<code>nightwatch.json</code>&#x3002;&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x4F7F;&#x7528;js&#x7684;&#x914D;&#x7F6E;&#x65B9;&#x5F0F;&#xFF0C;&#x56E0;&#x4E3A;&#x683C;&#x5F0F;&#x66F4;&#x7075;&#x6D3B;&#x3002;</p><p>&#x4E0B;&#x9762;&#x8FD9;&#x4E2A;&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
    &apos;src_folders&apos;: [
        &apos;e2e/case&apos;
    ],
    &apos;output_folder&apos;: &apos;reports&apos;,
    &apos;custom_commands_path&apos;: &apos;&apos;,
    &apos;custom_assertions_path&apos;: &apos;&apos;,
    &apos;page_objects_path&apos;: &apos;&apos;,
    &apos;globals_path&apos;: require(&apos;./e2e/config/global.config&apos;).path,
    &apos;selenium&apos;: {
        &apos;start_process&apos;: true,
        &apos;server_path&apos;: require(&apos;selenium-server&apos;).path,
        &apos;log_path&apos;: &apos;&apos;,
        &apos;host&apos;: &apos;127.0.0.1&apos;,
        &apos;port&apos;: 4444,
        &apos;cli_args&apos;: {
            &apos;webdriver.chrome.driver&apos;: require(&apos;chromedriver&apos;).path
        }
    },
    &apos;test_settings&apos;: {
        &apos;default&apos;: {
            &apos;launch_url&apos;: &apos;http://localhost&apos;,
            &apos;selenium_port&apos;: 4444,
            &apos;selenium_host&apos;: &apos;localhost&apos;,
            &apos;silent&apos;: true,
            &apos;screenshots&apos;: {
                &apos;enabled&apos;: false,
                &apos;path&apos;: &apos;&apos;
            },
            &apos;desiredCapabilities&apos;: {
                &apos;browserName&apos;: &apos;chrome&apos;,
                &apos;marionette&apos;: true
            }
        },
        &apos;chrome&apos;: {
            &apos;desiredCapabilities&apos;: {
                &apos;browserName&apos;: &apos;chrome&apos;
            }
        },
        &apos;edge&apos;: {
            &apos;desiredCapabilities&apos;: {
                &apos;browserName&apos;: &apos;MicrosoftEdge&apos;
            }
        }
    }
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xquery"><code>module.exports = {
    <span class="hljs-string">&apos;src_folders&apos;</span>: [
        <span class="hljs-string">&apos;e2e/case&apos;</span>
    ],
    <span class="hljs-string">&apos;output_folder&apos;</span>: <span class="hljs-string">&apos;reports&apos;</span>,
    <span class="hljs-string">&apos;custom_commands_path&apos;</span>: <span class="hljs-string">&apos;&apos;</span>,
    <span class="hljs-string">&apos;custom_assertions_path&apos;</span>: <span class="hljs-string">&apos;&apos;</span>,
    <span class="hljs-string">&apos;page_objects_path&apos;</span>: <span class="hljs-string">&apos;&apos;</span>,
    <span class="hljs-string">&apos;globals_path&apos;</span>: require(<span class="hljs-string">&apos;./e2e/config/global.config&apos;</span>).path,
    <span class="hljs-string">&apos;selenium&apos;</span>: {
        <span class="hljs-string">&apos;start_process&apos;</span>: true,
        <span class="hljs-string">&apos;server_path&apos;</span>: require(<span class="hljs-string">&apos;selenium-server&apos;</span>).path,
        <span class="hljs-string">&apos;log_path&apos;</span>: <span class="hljs-string">&apos;&apos;</span>,
        <span class="hljs-string">&apos;host&apos;</span>: <span class="hljs-string">&apos;127.0.0.1&apos;</span>,
        <span class="hljs-string">&apos;port&apos;</span>: <span class="hljs-number">4444</span>,
        <span class="hljs-string">&apos;cli_args&apos;</span>: {
            <span class="hljs-string">&apos;webdriver.chrome.driver&apos;</span>: require(<span class="hljs-string">&apos;chromedriver&apos;</span>).path
        }
    },
    <span class="hljs-string">&apos;test_settings&apos;</span>: {
        <span class="hljs-string">&apos;default&apos;</span>: {
            <span class="hljs-string">&apos;launch_url&apos;</span>: <span class="hljs-string">&apos;http://localhost&apos;</span>,
            <span class="hljs-string">&apos;selenium_port&apos;</span>: <span class="hljs-number">4444</span>,
            <span class="hljs-string">&apos;selenium_host&apos;</span>: <span class="hljs-string">&apos;localhost&apos;</span>,
            <span class="hljs-string">&apos;silent&apos;</span>: true,
            <span class="hljs-string">&apos;screenshots&apos;</span>: {
                <span class="hljs-string">&apos;enabled&apos;</span>: false,
                <span class="hljs-string">&apos;path&apos;</span>: <span class="hljs-string">&apos;&apos;</span>
            },
            <span class="hljs-string">&apos;desiredCapabilities&apos;</span>: {
                <span class="hljs-string">&apos;browserName&apos;</span>: <span class="hljs-string">&apos;chrome&apos;</span>,
                <span class="hljs-string">&apos;marionette&apos;</span>: true
            }
        },
        <span class="hljs-string">&apos;chrome&apos;</span>: {
            <span class="hljs-string">&apos;desiredCapabilities&apos;</span>: {
                <span class="hljs-string">&apos;browserName&apos;</span>: <span class="hljs-string">&apos;chrome&apos;</span>
            }
        },
        <span class="hljs-string">&apos;edge&apos;</span>: {
            <span class="hljs-string">&apos;desiredCapabilities&apos;</span>: {
                <span class="hljs-string">&apos;browserName&apos;</span>: <span class="hljs-string">&apos;MicrosoftEdge&apos;</span>
            }
        }
    }
}
</code></pre><p>src_folders&#xFF1A;&#x8868;&#x793A;&#x7684;&#x5C31;&#x662F;case&#x6240;&#x5728;&#x7684;&#x6587;&#x4EF6;&#x5939;</p><p>output_folder&#xFF1A;&#x4EE3;&#x8868;&#x7684;&#x662F;&#x62A5;&#x544A;&#x8F93;&#x51FA;&#x7684;&#x6587;&#x4EF6;&#x5939;</p><p>selenium&#x4E0B;&#x9762;&#x7684;server_path&#xFF1A;&#x4EE3;&#x8868;&#x7684;&#x662F;selenium-server&#x7684;&#x5B89;&#x88C5;&#x8DEF;&#x5F84;</p><p>selenium&#x4E0B;&#x9762;&#x7684;start_process&#xFF1A;&#x4EE3;&#x8868;&#x7684;&#x662F;&#x662F;&#x5426;&#x81EA;&#x52A8;&#x542F;&#x52A8;selenium&#x2014;&#x2014;server,&#x5165;&#x80A1;&#x8BBE;&#x4E3A;false,&#x4E0D;&#x4F1A;&#x81EA;&#x52A8;&#x542F;&#x52A8;server&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;cli_args&quot; : {
      &quot;webdriver.chrome.driver&quot; : &quot;&quot;,
      &quot;webdriver.gecko.driver&quot; : &quot;&quot;,
      &quot;webdriver.edge.driver&quot; : &quot;&quot;
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs ada"><code><span class="hljs-string">&quot;cli_args&quot;</span> : {
      <span class="hljs-string">&quot;webdriver.chrome.driver&quot;</span> : &quot;&quot;,
      <span class="hljs-string">&quot;webdriver.gecko.driver&quot;</span> : &quot;&quot;,
      <span class="hljs-string">&quot;webdriver.edge.driver&quot;</span> : &quot;&quot;
    }</code></pre><p>cli_args&#x4E0B;&#x9762;&#x7684;driver&#x8868;&#x793A;&#x51E0;&#x4E2A;driver&#x7684;&#x5B89;&#x88C5;&#x8DEF;&#x5F84;&#xFF0C;&#x5206;&#x522B;&#x5B89;&#x88C5;&#x6210;&#x529F;&#x5C31;&#x53EF;&#x4EE5;&#x4E86;</p><p>test_settings&#x662F;&#x4F20;&#x7ED9;nightwatch&#x5B9E;&#x4F8B;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x8FD9;&#x91CC;&#x9762;&#x53EF;&#x4EE5;&#x914D;&#x7F6E;&#x591A;&#x4E2A;&#x73AF;&#x5883;&#xFF0C;default&#x662F;&#x5FC5;&#x987B;&#x6709;&#x7684;&#xFF0C;&#x5176;&#x4ED6;&#x73AF;&#x5883;&#x53EF;&#x4EE5;&#x81EA;&#x884C;&#x914D;&#x5236;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="nightwatch --env default" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs mel"><code style="word-break:break-word;white-space:initial">nightwatch --<span class="hljs-keyword">env</span> <span class="hljs-keyword">default</span></code></pre><p>&#x7136;&#x540E;&#x6211;&#x4EEC;&#x5728;&#x9879;&#x76EE;&#x91CC;&#x8FD0;&#x884C;&#x4EE5;&#x4E0A;&#x547D;&#x4EE4;&#x3002;</p><p>&#x5728;windows&#x53D1;&#x73B0;&#x62A5;&#x9519;&#x4E86;&#xFF0C;&#x8FD0;&#x884C;&#x4E0D;&#x8D77;&#x6765;&#x7684;&#x3002;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5728;package.json&#x4E0B;&#x9762;&#x914D;&#x7F6E;&#x4E00;&#x4E0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
    &quot;e2e&quot;: &quot;nightwatch --env default&quot;,
  }," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xquery"><code><span class="hljs-string">&quot;scripts&quot;</span>: {
    <span class="hljs-string">&quot;e2e&quot;</span>: <span class="hljs-string">&quot;nightwatch --env default&quot;</span>,
  },</code></pre><p>&#x8FD9;&#x5C31;&#x53EF;&#x4EE5;&#x6B63;&#x5E38;&#x8FD0;&#x884C;&#x4E86;&#x3002;</p><p>&#x5982;&#x679C;&#x9700;&#x8981;&#x770B;&#x5230;&#x771F;&#x5B9E;&#x7684;&#x6548;&#x679C;&#xFF0C;&#x6211;&#x4EEC;&#x5728;case&#x6587;&#x4EF6;&#x5939;&#x4E0B;&#x9762;&#x521B;&#x5EFA;&#x4E00;&#x4E9B;case&#x5C31;&#x53EF;&#x4EE5;&#x4E86;</p><p>&#x6BD4;&#x5982;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
    &apos;Test login&apos;: function (browser) {
        browser
            .windowMaximize()
            .url(&apos;https://trans.qa.17u.cn/saas&apos;)
            .waitForElementVisible(&apos;.login&apos;, 3000)
            .assert.urlContains(&apos;/saas/login&apos;)
    }
    
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs roboconf"><code>module.exports = {
    &apos;<span class="hljs-attribute">Test login&apos;</span>: function (browser) {
        browser
            <span class="hljs-variable">.windowMaximize</span>()
            <span class="hljs-variable">.url</span>(&apos;https://trans<span class="hljs-variable">.qa</span>.17u<span class="hljs-variable">.cn</span>/saas&apos;)
            <span class="hljs-variable">.waitForElementVisible</span>(&apos;<span class="hljs-variable">.login</span>&apos;, 3000)
            <span class="hljs-variable">.assert</span><span class="hljs-variable">.urlContains</span>(&apos;/saas/login&apos;)
    }
    
}</code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
一篇文章掌握nightwatch自动化测试

## 原文链接
[https://segmentfault.com/a/1190000016706019](https://segmentfault.com/a/1190000016706019)

