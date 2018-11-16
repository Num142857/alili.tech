---
title: react 国际化了解一下
hidden: true
categories: [reprint]
slug: d7abaa10
date: 2018-11-10 02:30:09
---

{{< raw >}}
<h1 id="articleHeader0">&#x80CC;&#x666F;</h1><p>&#x697C;&#x4E3B;&#x6700;&#x8FD1;&#x65B0;&#x63A5;&#x4E86;&#x4E00;&#x4E2A;&#x9879;&#x76EE;&#xFF0C;&#x4ECE;0&#x5F00;&#x59CB;&#x505A;&#xFF0C;&#x9700;&#x8981;&#x505A;&#x591A;&#x8BED;&#x8A00;&#x7684;&#x56FD;&#x9645;&#x5316;&#xFF0C;&#x4ECA;&#x5929;&#x641E;&#x4E86;&#x4E00;&#x4E0B;&#xFF0C;&#x57FA;&#x672C;&#x8FBE;&#x5230;&#x4E86;&#x60F3;&#x8981;&#x7684;&#x6548;&#x679C;&#xFF0C; &#x5728;&#x8FD9;&#x91CC;&#x7B80;&#x5355;&#x5206;&#x4EAB;&#x4E0B;&#xFF1A;</p><hr><h2 id="articleHeader1">&#x4E00;&#x4E9B;&#x63A2;&#x7D22;</h2><p>&#x4E5F;&#x8BF4;&#x4E0D;&#x4E0A;&#x662F;&#x63A2;&#x7D22;&#x5427;&#xFF0C;&#x5C31;Google&#x4E86;&#x4E00;&#x6CE2;&#xFF0C; GitHub &#x4E0A;&#x627E;&#x4E86;&#x4E00;&#x4E2A;&#x6BD4;&#x8F83;&#x6210;&#x719F;&#x7684;&#x5E93; <code>react-i18next</code>&#xFF0C; &#x5199;&#x4E86;&#x4E00;&#x4E9B;&#x4EE3;&#x7801;&#xFF0C;&#x73B0;&#x5C06;&#x8FC7;&#x7A0B;&#x5206;&#x4EAB;&#x4E00;&#x4E0B;&#xFF0C; &#x9644;&#x5E26;&#x8BE6;&#x7EC6;&#x4EE3;&#x7801;&#xFF0C;&#x624B;&#x628A;&#x624B;&#x6559;&#x4F60;&#x5B9E;&#x73B0;&#x56FD;&#x9645;&#x5316;&#x3002;</p><h2 id="articleHeader2">&#x5148;&#x7779;&#x4E3A;&#x5FEB;</h2><p>&#x5148;&#x770B;&#x4E00;&#x4E0B;&#x6700;&#x540E;&#x7684;&#x6210;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" // ...
import i18n from &apos;@src/i18n&apos;;

// xxx component
console.log(&apos;i18n&#x6765;&#x4E00;&#x53D1;:&apos;, i18n.t(&apos;INVALID_ORDER&apos;));

render() { 
  // ...
  &lt;button&gt; {i18n.t(&apos;INVALID_ORDER&apos;)} &lt;/button&gt;
}

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs clean"><code> <span class="hljs-comment">// ...</span>
<span class="hljs-keyword">import</span> i18n <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@src/i18n&apos;</span>;

<span class="hljs-comment">// xxx component</span>
console.log(<span class="hljs-string">&apos;i18n&#x6765;&#x4E00;&#x53D1;:&apos;</span>, i18n.t(<span class="hljs-string">&apos;INVALID_ORDER&apos;</span>));

render() { 
  <span class="hljs-comment">// ...</span>
  &lt;button&gt; {i18n.t(<span class="hljs-string">&apos;INVALID_ORDER&apos;</span>)} &lt;/button&gt;
}

</code></pre><p>&#x63A7;&#x5236;&#x53F0;&#x4E2D;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbgV1d?w=1320&amp;h=82" src="https://static.alili.tech/img/bVbgV1d?w=1320&amp;h=82" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x5BF9;&#x5E94;json &#x4E2D;&#x7684;&#x4FE1;&#x606F;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbgV1A?w=1228&amp;h=260" src="https://static.alili.tech/img/bVbgV1A?w=1228&amp;h=260" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader3">&#x5F00;&#x59CB;</h2><h3 id="articleHeader4">&#x539F;&#x7406;</h3><p>&#x539F;&#x7406;&#x5176;&#x5B9E;&#x5F88;&#x7B80;&#x5355;&#xFF1A; &#x5B57;&#x7B26;&#x4E32;&#x66FF;&#x6362;&#x3002;</p><p>&#x62C9;&#x53D6;&#x8FDC;&#x7A0B;&#x7684;&#x56FD;&#x9645;&#x5316;json&#x6587;&#x4EF6;&#x5230;&#x672C;&#x5730;&#xFF0C;&#x518D;&#x6839;&#x636E;&#x8BED;&#x8A00;&#x505A;&#x4E00;&#x4E2A;&#x6620;&#x5C04;&#x5C31;&#x53EF;&#x4EE5;&#x4E86;&#x3002;</p><p>&#x5E9F;&#x8BDD;&#x4E0D;&#x591A;&#x8BF4;&#xFF0C; &#x6765;&#x770B;&#x4EE3;&#x7801;&#x5427;&#x3002;</p><p>&#x5148;&#x7B80;&#x5355;&#x770B;&#x4E00;&#x4E0B;&#x76EE;&#x5F55;&#x7ED3;&#x6784;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbgVXr?w=578&amp;h=1518" src="https://static.alili.tech/img/bVbgVXr?w=578&amp;h=1518" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x5148;&#x770B;&#x4E00;&#x4E0B; <code>config</code> &#x91CC;&#x9762;&#x7684; &#x76F8;&#x5173;&#x4EE3;&#x7801;&#xFF1A;</p><p><code>env.js</code>:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&apos;use strict&apos;;

const fs = require(&apos;fs&apos;);
const path = require(&apos;path&apos;);
const paths = require(&apos;./paths&apos;);
const languages = require(&apos;./languages&apos;);

// Make sure that including paths.js after env.js will read .env variables.
delete require.cache[require.resolve(&apos;./paths&apos;)];

const NODE_ENV = process.env.NODE_ENV;
if (!NODE_ENV) {
  throw new Error(
    &apos;The NODE_ENV environment variable is required but was not specified.&apos;
  );
}

// https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use
var dotenvFiles = [
  `${paths.dotenv}.${NODE_ENV}.local`,
  `${paths.dotenv}.${NODE_ENV}`,
  // Don&apos;t include `.env.local` for `test` environment
  // since normally you expect tests to produce the same
  // results for everyone
  NODE_ENV !== &apos;test&apos; &amp;&amp; `${paths.dotenv}.local`,
  paths.dotenv,
].filter(Boolean);

// Load environment variables from .env* files. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.  Variable expansion is supported in .env files.
// https://github.com/motdotla/dotenv
// https://github.com/motdotla/dotenv-expand
dotenvFiles.forEach(dotenvFile =&gt; {
  if (fs.existsSync(dotenvFile)) {
    require(&apos;dotenv-expand&apos;)(
      require(&apos;dotenv&apos;).config({
        path: dotenvFile,
      })
    );
  }
});

// We support resolving modules according to `NODE_PATH`.
// This lets you use absolute paths in imports inside large monorepos:
// https://github.com/facebookincubator/create-react-app/issues/253.
// It works similar to `NODE_PATH` in Node itself:
// https://nodejs.org/api/modules.html#modules_loading_from_the_global_folders
// Note that unlike in Node, only *relative* paths from `NODE_PATH` are honored.
// Otherwise, we risk importing Node.js core modules into an app instead of Webpack shims.
// https://github.com/facebookincubator/create-react-app/issues/1023#issuecomment-265344421
// We also resolve them to make sure all tools using them work consistently.
const appDirectory = fs.realpathSync(process.cwd());
process.env.NODE_PATH = (process.env.NODE_PATH || &apos;&apos;)
  .split(path.delimiter)
  .filter(folder =&gt; folder &amp;&amp; !path.isAbsolute(folder))
  .map(folder =&gt; path.resolve(appDirectory, folder))
  .join(path.delimiter);

// Grab NODE_ENV and REACT_APP_* environment variables and prepare them to be
// injected into the application via DefinePlugin in Webpack configuration.
const REACT_APP = /^REACT_APP_/i;

function getClientEnvironment(publicUrl) {
  const raw = Object.keys(process.env)
    .filter(key =&gt; REACT_APP.test(key))
    .reduce(
      (env, key) =&gt; {
        env[key] = process.env[key];
        return env;
      },
      {
        // Useful for determining whether we&#x2019;re running in production mode.
        // Most importantly, it switches React into the correct mode.
        NODE_ENV: process.env.NODE_ENV || &apos;development&apos;,
        // Useful for resolving the correct path to static assets in `public`.
        // For example, &lt;img src={process.env.PUBLIC_URL + &apos;/img/logo.png&apos;} /&gt;.
        // This should only be used as an escape hatch. Normally you would put
        // images into the `src` and `import` them in code to get their paths.
        PUBLIC_URL: publicUrl,
        LANGUAGE: {
          resources: languages.resources,
          defaultLng: languages.defaultLng
        },
        COUNTRY: process.env.COUNTRY
      }
    );
  // Stringify all values so we can feed into Webpack DefinePlugin
  const stringified = {
    &apos;process.env&apos;: Object.keys(raw).reduce((env, key) =&gt; {
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {}),
  };

  return { raw, stringified };
}

module.exports = getClientEnvironment;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-meta">&apos;use strict&apos;</span>;

<span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;fs&apos;</span>);
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path&apos;</span>);
<span class="hljs-keyword">const</span> paths = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./paths&apos;</span>);
<span class="hljs-keyword">const</span> languages = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./languages&apos;</span>);

<span class="hljs-comment">// Make sure that including paths.js after env.js will read .env variables.</span>
<span class="hljs-keyword">delete</span> <span class="hljs-built_in">require</span>.cache[<span class="hljs-built_in">require</span>.resolve(<span class="hljs-string">&apos;./paths&apos;</span>)];

<span class="hljs-keyword">const</span> NODE_ENV = process.env.NODE_ENV;
<span class="hljs-keyword">if</span> (!NODE_ENV) {
  <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(
    <span class="hljs-string">&apos;The NODE_ENV environment variable is required but was not specified.&apos;</span>
  );
}

<span class="hljs-comment">// https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use</span>
<span class="hljs-keyword">var</span> dotenvFiles = [
  <span class="hljs-string">`<span class="hljs-subst">${paths.dotenv}</span>.<span class="hljs-subst">${NODE_ENV}</span>.local`</span>,
  <span class="hljs-string">`<span class="hljs-subst">${paths.dotenv}</span>.<span class="hljs-subst">${NODE_ENV}</span>`</span>,
  <span class="hljs-comment">// Don&apos;t include `.env.local` for `test` environment</span>
  <span class="hljs-comment">// since normally you expect tests to produce the same</span>
  <span class="hljs-comment">// results for everyone</span>
  NODE_ENV !== <span class="hljs-string">&apos;test&apos;</span> &amp;&amp; <span class="hljs-string">`<span class="hljs-subst">${paths.dotenv}</span>.local`</span>,
  paths.dotenv,
].filter(<span class="hljs-built_in">Boolean</span>);

<span class="hljs-comment">// Load environment variables from .env* files. Suppress warnings using silent</span>
<span class="hljs-comment">// if this file is missing. dotenv will never modify any environment variables</span>
<span class="hljs-comment">// that have already been set.  Variable expansion is supported in .env files.</span>
<span class="hljs-comment">// https://github.com/motdotla/dotenv</span>
<span class="hljs-comment">// https://github.com/motdotla/dotenv-expand</span>
dotenvFiles.forEach(<span class="hljs-function"><span class="hljs-params">dotenvFile</span> =&gt;</span> {
  <span class="hljs-keyword">if</span> (fs.existsSync(dotenvFile)) {
    <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;dotenv-expand&apos;</span>)(
      <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;dotenv&apos;</span>).config({
        <span class="hljs-attr">path</span>: dotenvFile,
      })
    );
  }
});

<span class="hljs-comment">// We support resolving modules according to `NODE_PATH`.</span>
<span class="hljs-comment">// This lets you use absolute paths in imports inside large monorepos:</span>
<span class="hljs-comment">// https://github.com/facebookincubator/create-react-app/issues/253.</span>
<span class="hljs-comment">// It works similar to `NODE_PATH` in Node itself:</span>
<span class="hljs-comment">// https://nodejs.org/api/modules.html#modules_loading_from_the_global_folders</span>
<span class="hljs-comment">// Note that unlike in Node, only *relative* paths from `NODE_PATH` are honored.</span>
<span class="hljs-comment">// Otherwise, we risk importing Node.js core modules into an app instead of Webpack shims.</span>
<span class="hljs-comment">// https://github.com/facebookincubator/create-react-app/issues/1023#issuecomment-265344421</span>
<span class="hljs-comment">// We also resolve them to make sure all tools using them work consistently.</span>
<span class="hljs-keyword">const</span> appDirectory = fs.realpathSync(process.cwd());
process.env.NODE_PATH = (process.env.NODE_PATH || <span class="hljs-string">&apos;&apos;</span>)
  .split(path.delimiter)
  .filter(<span class="hljs-function"><span class="hljs-params">folder</span> =&gt;</span> folder &amp;&amp; !path.isAbsolute(folder))
  .map(<span class="hljs-function"><span class="hljs-params">folder</span> =&gt;</span> path.resolve(appDirectory, folder))
  .join(path.delimiter);

<span class="hljs-comment">// Grab NODE_ENV and REACT_APP_* environment variables and prepare them to be</span>
<span class="hljs-comment">// injected into the application via DefinePlugin in Webpack configuration.</span>
<span class="hljs-keyword">const</span> REACT_APP = <span class="hljs-regexp">/^REACT_APP_/i</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getClientEnvironment</span>(<span class="hljs-params">publicUrl</span>) </span>{
  <span class="hljs-keyword">const</span> raw = <span class="hljs-built_in">Object</span>.keys(process.env)
    .filter(<span class="hljs-function"><span class="hljs-params">key</span> =&gt;</span> REACT_APP.test(key))
    .reduce(
      <span class="hljs-function">(<span class="hljs-params">env, key</span>) =&gt;</span> {
        env[key] = process.env[key];
        <span class="hljs-keyword">return</span> env;
      },
      {
        <span class="hljs-comment">// Useful for determining whether we&#x2019;re running in production mode.</span>
        <span class="hljs-comment">// Most importantly, it switches React into the correct mode.</span>
        NODE_ENV: process.env.NODE_ENV || <span class="hljs-string">&apos;development&apos;</span>,
        <span class="hljs-comment">// Useful for resolving the correct path to static assets in `public`.</span>
        <span class="hljs-comment">// For example, &lt;img src={process.env.PUBLIC_URL + &apos;/img/logo.png&apos;} /&gt;.</span>
        <span class="hljs-comment">// This should only be used as an escape hatch. Normally you would put</span>
        <span class="hljs-comment">// images into the `src` and `import` them in code to get their paths.</span>
        PUBLIC_URL: publicUrl,
        <span class="hljs-attr">LANGUAGE</span>: {
          <span class="hljs-attr">resources</span>: languages.resources,
          <span class="hljs-attr">defaultLng</span>: languages.defaultLng
        },
        <span class="hljs-attr">COUNTRY</span>: process.env.COUNTRY
      }
    );
  <span class="hljs-comment">// Stringify all values so we can feed into Webpack DefinePlugin</span>
  <span class="hljs-keyword">const</span> stringified = {
    <span class="hljs-string">&apos;process.env&apos;</span>: <span class="hljs-built_in">Object</span>.keys(raw).reduce(<span class="hljs-function">(<span class="hljs-params">env, key</span>) =&gt;</span> {
      env[key] = <span class="hljs-built_in">JSON</span>.stringify(raw[key]);
      <span class="hljs-keyword">return</span> env;
    }, {}),
  };

  <span class="hljs-keyword">return</span> { raw, stringified };
}

<span class="hljs-built_in">module</span>.exports = getClientEnvironment;
</code></pre><p>&#x4E3B;&#x8981;&#x770B;lannguage &#x76F8;&#x5173;&#x7684;&#x4EE3;&#x7801;&#x5C31;&#x597D;&#x4E86;&#xFF0C; &#x5176;&#x4ED6;&#x7684;&#x90FD;<code>create-react-app</code> &#x7684;&#x76F8;&#x5173;&#x914D;&#x7F6E;&#xFF0C; &#x4E0D;&#x7528;&#x7BA1;&#x3002;</p><p>&#x518D;&#x770B;&#x4E0B; <code>language.js</code> &#x91CC;&#x9762;&#x7684;&#x903B;&#x8F91;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require(&apos;path&apos;);
const paths = require(&apos;./paths&apos;);
const localesHash = require(&apos;../i18n/localesHash&apos;);
const resourcesHash = require(&apos;../i18n/resourcesHash&apos;);

const COUNTRY = process.env.COUNTRY || &apos;sg&apos;;
const country = (COUNTRY).toUpperCase();
const defaultLng = localesHash[country][0];

const langs = [
  &apos;en&apos;,
  &apos;id&apos;
];

const prefixLangs = [];
const entries = {};

for (let i = 0, len = langs.length; i &lt; len; i++) {
  const prefixLang = `dict_${langs[i]}`
  prefixLangs.push(prefixLang)
  entries[prefixLang] = path.resolve(paths.appSrc, `../i18n/locales/${langs[i]}.json`)
}

const resources = {
  [defaultLng]: {
    common: resourcesHash[defaultLng]
  }
}

exports.resources = resources;
exports.defaultLng = defaultLng;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path&apos;</span>);
<span class="hljs-keyword">const</span> paths = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./paths&apos;</span>);
<span class="hljs-keyword">const</span> localesHash = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;../i18n/localesHash&apos;</span>);
<span class="hljs-keyword">const</span> resourcesHash = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;../i18n/resourcesHash&apos;</span>);

<span class="hljs-keyword">const</span> COUNTRY = process.env.COUNTRY || <span class="hljs-string">&apos;sg&apos;</span>;
<span class="hljs-keyword">const</span> country = (COUNTRY).toUpperCase();
<span class="hljs-keyword">const</span> defaultLng = localesHash[country][<span class="hljs-number">0</span>];

<span class="hljs-keyword">const</span> langs = [
  <span class="hljs-string">&apos;en&apos;</span>,
  <span class="hljs-string">&apos;id&apos;</span>
];

<span class="hljs-keyword">const</span> prefixLangs = [];
<span class="hljs-keyword">const</span> entries = {};

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>, len = langs.length; i &lt; len; i++) {
  <span class="hljs-keyword">const</span> prefixLang = <span class="hljs-string">`dict_<span class="hljs-subst">${langs[i]}</span>`</span>
  prefixLangs.push(prefixLang)
  entries[prefixLang] = path.resolve(paths.appSrc, <span class="hljs-string">`../i18n/locales/<span class="hljs-subst">${langs[i]}</span>.json`</span>)
}

<span class="hljs-keyword">const</span> resources = {
  [defaultLng]: {
    <span class="hljs-attr">common</span>: resourcesHash[defaultLng]
  }
}

exports.resources = resources;
exports.defaultLng = defaultLng;
</code></pre><p>&#x903B;&#x8F91;&#x4E5F;&#x6BD4;&#x8F83;&#x7B80;&#x5355;&#xFF0C; &#x6839;&#x636E;&#x8BED;&#x8A00;&#x5217;&#x8868;&#x628A;&#x5BF9;&#x5E94;&#x7684;json &#x5185;&#x5BB9;&#x52A0;&#x8FDB;&#x6765;&#x3002; &#x4F5C;&#x4E3A;&#x793A;&#x4F8B;&#xFF0C;&#x8FD9;&#x91CC;&#x6211;&#x8BBE;&#x7F6E;&#x7684;&#x662F; &#x82F1;&#x6587; &#x548C; &#x5370;&#x5C3C;&#x8BED;&#x3002;</p><p>&#x4E0B;&#x9762;&#x770B; <code>i18n</code> &#x6587;&#x4EF6;&#x91CC;&#x9762;&#x7684;&#x5185;&#x5BB9;&#xFF1A;</p><p><code>locales</code> &#x91CC;&#x9762;&#x653E;&#x7684;&#x662F;&#x8BED;&#x8A00;&#x7684;json &#x6587;&#x4EF6;&#xFF0C; &#x5185;&#x5BB9;&#x5927;&#x6982;&#x662F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;msg_Created&quot;: &quot;Pesanan telah terbuat&quot;
    // ...
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs json"><code>{
    <span class="hljs-attr">&quot;msg_Created&quot;</span>: <span class="hljs-string">&quot;Pesanan telah terbuat&quot;</span>
    // ...
}</code></pre><p><code>localesHash.js</code>:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  SG: [&apos;en&apos;],
  ID: [&apos;id&apos;]
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs java"><code><span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
  SG: [<span class="hljs-string">&apos;en&apos;</span>],
  ID: [<span class="hljs-string">&apos;id&apos;</span>]
}
</code></pre><p><code>resourcesHash.js</code>:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  &apos;en&apos;: require(&apos;./locales/en.json&apos;),
  &apos;id&apos;: require(&apos;./locales/id.json&apos;)
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-string">&apos;en&apos;</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./locales/en.json&apos;</span>),
  <span class="hljs-string">&apos;id&apos;</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./locales/id.json&apos;</span>)
}
</code></pre><p><code>index.js</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require(&apos;path&apos;)
const fs = require(&apos;fs&apos;)
const fetch = require(&apos;isomorphic-fetch&apos;)
const localesHash = require(&apos;./localesHash&apos;)

const argv = process.argv.slice(2)
const country = (argv[0] || &apos;&apos;).toUpperCase()

const i18nServerURI = locale =&gt; {
  const keywords = {
    &apos;en&apos;: &apos;en&apos;,
    &apos;id&apos;: &apos;id&apos;
  }
  const keyword = keywords[locale]
  return keyword === &apos;en&apos;
    ? &apos;your/transify/website/json/download&apos;
    : `your/transify/website/${keyword}/json/download`
}

const fetchKeys = async (locale) =&gt; {
  const uri = i18nServerURI(locale)
  console.log(`Downloading ${locale} keys...\n${uri}`)
  const respones = await fetch(uri)
  const keys = await respones.json()
  return keys
}

const access = async (filepath) =&gt; {
  return new Promise((resolve, reject) =&gt; {
    fs.access(filepath, (err) =&gt; {
      if (err) {
        if (err.code === &apos;EXIST&apos;) {
          resolve(true)
        }
        resolve(false)
      }
      resolve(true)
    })
  })
}

const run = async () =&gt; {
  const locales = localesHash[country] || Object
    .values(localesHash)
    .reduce(
      (previous, current) =&gt;
        previous.concat(current), []
    )
  if (locales === undefined) {
    console.error(&apos;This country is not in service.&apos;)
    return
  }
  for (const locale of locales) {
    const keys = await fetchKeys(locale)
    const data = JSON.stringify(keys, null, 2)
    const directoryPath = path.resolve(__dirname, &apos;locales&apos;)
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath)
    }
    const filepath = path.resolve(__dirname, `locales/${locale}.json`)
    const isExist = await access(filepath)
    const operation = isExist ? &apos;update&apos; : &apos;create&apos;
    console.log(operation)
    fs.writeFileSync(filepath, `${data}\n`)
    console.log(`${operation}\t${filepath}`)
  }
}

run();
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path&apos;</span>)
<span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;fs&apos;</span>)
<span class="hljs-keyword">const</span> fetch = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;isomorphic-fetch&apos;</span>)
<span class="hljs-keyword">const</span> localesHash = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./localesHash&apos;</span>)

<span class="hljs-keyword">const</span> argv = process.argv.slice(<span class="hljs-number">2</span>)
<span class="hljs-keyword">const</span> country = (argv[<span class="hljs-number">0</span>] || <span class="hljs-string">&apos;&apos;</span>).toUpperCase()

<span class="hljs-keyword">const</span> i18nServerURI = <span class="hljs-function"><span class="hljs-params">locale</span> =&gt;</span> {
  <span class="hljs-keyword">const</span> keywords = {
    <span class="hljs-string">&apos;en&apos;</span>: <span class="hljs-string">&apos;en&apos;</span>,
    <span class="hljs-string">&apos;id&apos;</span>: <span class="hljs-string">&apos;id&apos;</span>
  }
  <span class="hljs-keyword">const</span> keyword = keywords[locale]
  <span class="hljs-keyword">return</span> keyword === <span class="hljs-string">&apos;en&apos;</span>
    ? <span class="hljs-string">&apos;your/transify/website/json/download&apos;</span>
    : <span class="hljs-string">`your/transify/website/<span class="hljs-subst">${keyword}</span>/json/download`</span>
}

<span class="hljs-keyword">const</span> fetchKeys = <span class="hljs-keyword">async</span> (locale) =&gt; {
  <span class="hljs-keyword">const</span> uri = i18nServerURI(locale)
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`Downloading <span class="hljs-subst">${locale}</span> keys...\n<span class="hljs-subst">${uri}</span>`</span>)
  <span class="hljs-keyword">const</span> respones = <span class="hljs-keyword">await</span> fetch(uri)
  <span class="hljs-keyword">const</span> keys = <span class="hljs-keyword">await</span> respones.json()
  <span class="hljs-keyword">return</span> keys
}

<span class="hljs-keyword">const</span> access = <span class="hljs-keyword">async</span> (filepath) =&gt; {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    fs.access(filepath, <span class="hljs-function">(<span class="hljs-params">err</span>) =&gt;</span> {
      <span class="hljs-keyword">if</span> (err) {
        <span class="hljs-keyword">if</span> (err.code === <span class="hljs-string">&apos;EXIST&apos;</span>) {
          resolve(<span class="hljs-literal">true</span>)
        }
        resolve(<span class="hljs-literal">false</span>)
      }
      resolve(<span class="hljs-literal">true</span>)
    })
  })
}

<span class="hljs-keyword">const</span> run = <span class="hljs-keyword">async</span> () =&gt; {
  <span class="hljs-keyword">const</span> locales = localesHash[country] || <span class="hljs-built_in">Object</span>
    .values(localesHash)
    .reduce(
      <span class="hljs-function">(<span class="hljs-params">previous, current</span>) =&gt;</span>
        previous.concat(current), []
    )
  <span class="hljs-keyword">if</span> (locales === <span class="hljs-literal">undefined</span>) {
    <span class="hljs-built_in">console</span>.error(<span class="hljs-string">&apos;This country is not in service.&apos;</span>)
    <span class="hljs-keyword">return</span>
  }
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> locale of locales) {
    <span class="hljs-keyword">const</span> keys = <span class="hljs-keyword">await</span> fetchKeys(locale)
    <span class="hljs-keyword">const</span> data = <span class="hljs-built_in">JSON</span>.stringify(keys, <span class="hljs-literal">null</span>, <span class="hljs-number">2</span>)
    <span class="hljs-keyword">const</span> directoryPath = path.resolve(__dirname, <span class="hljs-string">&apos;locales&apos;</span>)
    <span class="hljs-keyword">if</span> (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath)
    }
    <span class="hljs-keyword">const</span> filepath = path.resolve(__dirname, <span class="hljs-string">`locales/<span class="hljs-subst">${locale}</span>.json`</span>)
    <span class="hljs-keyword">const</span> isExist = <span class="hljs-keyword">await</span> access(filepath)
    <span class="hljs-keyword">const</span> operation = isExist ? <span class="hljs-string">&apos;update&apos;</span> : <span class="hljs-string">&apos;create&apos;</span>
    <span class="hljs-built_in">console</span>.log(operation)
    fs.writeFileSync(filepath, <span class="hljs-string">`<span class="hljs-subst">${data}</span>\n`</span>)
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`<span class="hljs-subst">${operation}</span>\t<span class="hljs-subst">${filepath}</span>`</span>)
  }
}

run();
</code></pre><p>&#x518D;&#x770B;&#x4E0B;<code>src</code> &#x4E2D;&#x7684;&#x914D;&#x7F6E;&#xFF1A;</p><p><code>i18nn.js</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
import i18next from &apos;i18next&apos;
import { firstLetterUpper } from &apos;./common/helpers/util&apos;;
const env = process.env;
let LANGUAGE = process.env.LANGUAGE;
LANGUAGE = typeof LANGUAGE === &apos;string&apos; ? JSON.parse(LANGUAGE) : LANGUAGE

const { defaultLng, resources } = LANGUAGE

i18next
  .init({
    lng: defaultLng,
    fallbackLng: defaultLng,
    defaultNS: &apos;common&apos;,
    keySeparator: false,
    debug: env.NODE_ENV === &apos;development&apos;,
    resources,
    interpolation: {
      escapeValue: false
    },
    react: {
      wait: false,
      bindI18n: &apos;languageChanged loaded&apos;,
      bindStore: &apos;added removed&apos;,
      nsMode: &apos;default&apos;
    }
  })

function isMatch(str, substr) {
  return str.indexOf(substr) &gt; -1 || str.toLowerCase().indexOf(substr) &gt; -1
}

export const changeLanguage = (locale) =&gt; {
  i18next.changeLanguage(locale)
}

// Uppercase the first letter of every word. abcd =&gt; Abcd or abcd efg =&gt; Abcd Efg
export const tUpper = (str, allWords = true) =&gt; {
  return firstLetterUpper(i18next.t(str), allWords)
}

// Uppercase all letters. abcd =&gt; ABCD
export const tUpperCase = (str) =&gt; {
  return i18next.t(str).toUpperCase()
}

export const loadResource = lng =&gt; {
  let p;

  return new Promise((resolve, reject) =&gt; {
    if (isMatch(defaultLng, lng)) resolve()

    switch (lng) {
      case &apos;id&apos;:
        p = import(&apos;../i18n/locales/id.json&apos;)
        break
      default:
        p = import(&apos;../i18n/locales/en.json&apos;)
    }

    p.then(data =&gt; {
      i18next.addResourceBundle(lng, &apos;common&apos;, data)
      changeLanguage(lng)
    })
      .then(resolve)
      .catch(reject)
  })
}

export default i18next
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>
<span class="hljs-keyword">import</span> i18next <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;i18next&apos;</span>
<span class="hljs-keyword">import</span> { firstLetterUpper } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./common/helpers/util&apos;</span>;
<span class="hljs-keyword">const</span> env = process.env;
<span class="hljs-keyword">let</span> LANGUAGE = process.env.LANGUAGE;
LANGUAGE = <span class="hljs-keyword">typeof</span> LANGUAGE === <span class="hljs-string">&apos;string&apos;</span> ? <span class="hljs-built_in">JSON</span>.parse(LANGUAGE) : LANGUAGE

<span class="hljs-keyword">const</span> { defaultLng, resources } = LANGUAGE

i18next
  .init({
    <span class="hljs-attr">lng</span>: defaultLng,
    <span class="hljs-attr">fallbackLng</span>: defaultLng,
    <span class="hljs-attr">defaultNS</span>: <span class="hljs-string">&apos;common&apos;</span>,
    <span class="hljs-attr">keySeparator</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">debug</span>: env.NODE_ENV === <span class="hljs-string">&apos;development&apos;</span>,
    resources,
    <span class="hljs-attr">interpolation</span>: {
      <span class="hljs-attr">escapeValue</span>: <span class="hljs-literal">false</span>
    },
    <span class="hljs-attr">react</span>: {
      <span class="hljs-attr">wait</span>: <span class="hljs-literal">false</span>,
      <span class="hljs-attr">bindI18n</span>: <span class="hljs-string">&apos;languageChanged loaded&apos;</span>,
      <span class="hljs-attr">bindStore</span>: <span class="hljs-string">&apos;added removed&apos;</span>,
      <span class="hljs-attr">nsMode</span>: <span class="hljs-string">&apos;default&apos;</span>
    }
  })

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isMatch</span>(<span class="hljs-params">str, substr</span>) </span>{
  <span class="hljs-keyword">return</span> str.indexOf(substr) &gt; <span class="hljs-number">-1</span> || str.toLowerCase().indexOf(substr) &gt; <span class="hljs-number">-1</span>
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> changeLanguage = <span class="hljs-function">(<span class="hljs-params">locale</span>) =&gt;</span> {
  i18next.changeLanguage(locale)
}

<span class="hljs-comment">// Uppercase the first letter of every word. abcd =&gt; Abcd or abcd efg =&gt; Abcd Efg</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> tUpper = <span class="hljs-function">(<span class="hljs-params">str, allWords = <span class="hljs-literal">true</span></span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> firstLetterUpper(i18next.t(str), allWords)
}

<span class="hljs-comment">// Uppercase all letters. abcd =&gt; ABCD</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> tUpperCase = <span class="hljs-function">(<span class="hljs-params">str</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> i18next.t(str).toUpperCase()
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> loadResource = <span class="hljs-function"><span class="hljs-params">lng</span> =&gt;</span> {
  <span class="hljs-keyword">let</span> p;

  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    <span class="hljs-keyword">if</span> (isMatch(defaultLng, lng)) resolve()

    <span class="hljs-keyword">switch</span> (lng) {
      <span class="hljs-keyword">case</span> <span class="hljs-string">&apos;id&apos;</span>:
        p = <span class="hljs-keyword">import</span>(<span class="hljs-string">&apos;../i18n/locales/id.json&apos;</span>)
        <span class="hljs-keyword">break</span>
      <span class="hljs-keyword">default</span>:
        p = <span class="hljs-keyword">import</span>(<span class="hljs-string">&apos;../i18n/locales/en.json&apos;</span>)
    }

    p.then(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> {
      i18next.addResourceBundle(lng, <span class="hljs-string">&apos;common&apos;</span>, data)
      changeLanguage(lng)
    })
      .then(resolve)
      .catch(reject)
  })
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> i18next
</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" // firstLetterUpper

export const firstLetterUpper = (str, allWords = true) =&gt; {
  let tmp = str.replace(/^(.)/g, $1 =&gt; $1.toUpperCase())
  if (allWords) {
    tmp = tmp.replace(/\s(.)/g, $1 =&gt; $1.toUpperCase())
  }
  return tmp;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code> <span class="hljs-comment">// firstLetterUpper</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> firstLetterUpper = <span class="hljs-function">(<span class="hljs-params">str, allWords = <span class="hljs-literal">true</span></span>) =&gt;</span> {
  <span class="hljs-keyword">let</span> tmp = str.replace(<span class="hljs-regexp">/^(.)/g</span>, $<span class="hljs-number">1</span> =&gt; $<span class="hljs-number">1.</span>toUpperCase())
  <span class="hljs-keyword">if</span> (allWords) {
    tmp = tmp.replace(<span class="hljs-regexp">/\s(.)/g</span>, $<span class="hljs-number">1</span> =&gt; $<span class="hljs-number">1.</span>toUpperCase())
  }
  <span class="hljs-keyword">return</span> tmp;
}</code></pre><p>&#x8FD9;&#x4E9B;&#x51C6;&#x5907;&#x5DE5;&#x4F5C;&#x505A;&#x597D;&#x540E;, &#x8FD8;&#x9700;&#x8981;&#x628A;i18n &#x6CE8;&#x5165;&#x5230;app&#x4E2D;&#xFF1A;</p><p><code>index.js</code>:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from &apos;react&apos;;
import { render } from &apos;react-dom&apos;;
import { Provider } from &apos;react-redux&apos;;
import rootReducer from &apos;./common/redux/reducers&apos;;
import { configureStore } from &apos;./common/redux/store&apos;;
import { Router } from &apos;react-router-dom&apos;;
import createBrowserHistory from &apos;history/createBrowserHistory&apos;;
import { I18nextProvider } from &apos;react-i18next&apos;;
import i18n from &apos;./i18n&apos;;
import &apos;./common/styles/index.less&apos;;
import App from &apos;./App&apos;;
export const history = createBrowserHistory();

const ROOT = document.getElementById(&apos;root&apos;);

render(
  &lt;I18nextProvider i18n={i18n}&gt;
    &lt;Provider store={configureStore(rootReducer)} &gt;
      &lt;Router history={history}&gt;
        &lt;App /&gt;
      &lt;/Router&gt;
    &lt;/Provider&gt;
  &lt;/I18nextProvider&gt;,
  ROOT
);
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react&apos;</span>;
<span class="hljs-keyword">import</span> { render } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react-dom&apos;</span>;
<span class="hljs-keyword">import</span> { Provider } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react-redux&apos;</span>;
<span class="hljs-keyword">import</span> rootReducer <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./common/redux/reducers&apos;</span>;
<span class="hljs-keyword">import</span> { configureStore } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./common/redux/store&apos;</span>;
<span class="hljs-keyword">import</span> { Router } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react-router-dom&apos;</span>;
<span class="hljs-keyword">import</span> createBrowserHistory <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;history/createBrowserHistory&apos;</span>;
<span class="hljs-keyword">import</span> { I18nextProvider } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react-i18next&apos;</span>;
<span class="hljs-keyword">import</span> i18n <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./i18n&apos;</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">&apos;./common/styles/index.less&apos;</span>;
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./App&apos;</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> history = createBrowserHistory();

<span class="hljs-keyword">const</span> ROOT = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;root&apos;</span>);

render(
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">I18nextProvider</span> <span class="hljs-attr">i18n</span>=<span class="hljs-string">{i18n}</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Provider</span> <span class="hljs-attr">store</span>=<span class="hljs-string">{configureStore(rootReducer)}</span> &gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Router</span> <span class="hljs-attr">history</span>=<span class="hljs-string">{history}</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">App</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">Router</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">Provider</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">I18nextProvider</span>&gt;</span></span>,
  ROOT
);
</code></pre><h2 id="articleHeader5">&#x5982;&#x4F55;&#x4F7F;&#x7528;</h2><p>&#x52A0;&#x5165;&#x4E0A;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x540E;&#xFF0C; &#x63A7;&#x5236;&#x53F0;&#x4F1A;&#x6709;&#x4E00;&#x4E9B;log &#x4FE1;&#x606F;&#xFF0C; &#x8868;&#x793A;&#x8BED;&#x8A00;&#x5DF2;&#x7ECF;&#x52A0;&#x8F7D;&#x597D;&#x4E86;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/bVbgV0M?w=1750&amp;h=1272" src="https://static.alili.tech/img/bVbgV0M?w=1750&amp;h=1272" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x5728;&#x5177;&#x4F53;&#x7684;&#x4E1A;&#x52A1;&#x7EC4;&#x4EF6;&#x4E2D;&#xFF0C;&#x4F7F;&#x7528;&#x65B9;&#x6CD5;&#x662F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" // ...
import i18n from &apos;@src/i18n&apos;;

console.log(&apos;&#x54C8;&#x54C8;&#x54C8;&#x54C8;&#x54C8;i18n&#x6765;&#x4E00;&#x53D1;:&apos;, i18n.t(&apos;INVALID_ORDER&apos;));

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code> <span class="hljs-comment">// ...</span>
<span class="hljs-keyword">import</span> i18n <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@src/i18n&apos;</span>;

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x54C8;&#x54C8;&#x54C8;&#x54C8;&#x54C8;i18n&#x6765;&#x4E00;&#x53D1;:&apos;</span>, i18n.t(<span class="hljs-string">&apos;INVALID_ORDER&apos;</span>));

</code></pre><p>&#x63A7;&#x5236;&#x53F0;&#x4E2D;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbgV1d?w=1320&amp;h=82" src="https://static.alili.tech/img/bVbgV1d?w=1320&amp;h=82" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x5BF9;&#x5E94;json &#x4E2D;&#x7684;&#x4FE1;&#x606F;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbgV1A?w=1228&amp;h=260" src="https://static.alili.tech/img/bVbgV1A?w=1228&amp;h=260" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x540E;&#x9762;&#x4F60;&#x5C31;&#x53EF;&#x4EE5;&#x6109;&#x5FEB;&#x7684;&#x52A0;&#x5404;&#x79CD;&#x8BCD;&#x6761;&#x4E86;&#x3002;</p><h2 id="articleHeader6">Tips</h2><p>&#x6211;&#x4EEC;&#x5728;src &#x4E2D;&#x7684;&#x6587;&#x4EF6;&#x4E2D;&#x5F15;&#x5165;&#x4E86;src &#x76EE;&#x5F55;&#x5916;&#x7684;&#x6587;&#x4EF6;&#xFF0C; &#x8FD9;&#x662F;create-react-app &#x505A;&#x7684;&#x9650;&#x5236;&#xFF0C; &#x7F16;&#x8BD1;&#x4F1A;&#x62A5;&#x9519;&#xFF0C; &#x628A;&#x5B83;&#x53BB;&#x6389;&#x5C31;&#x597D;&#x4E86;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbgV2u?w=1500&amp;h=660" src="https://static.alili.tech/img/bVbgV2u?w=1500&amp;h=660" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p><span class="img-wrap"><img data-src="/img/bVbgV2x?w=1654&amp;h=392" src="https://static.alili.tech/img/bVbgV2x?w=1654&amp;h=392" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><hr><h1 id="articleHeader7">&#x5173;&#x4E8E;&#x591A;&#x8BED;&#x8A00;&#x7684;&#x8BBE;&#x7F6E;</h1><p>&#x4EE3;&#x7801;&#x793A;&#x4F8B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="i18next.init({
  lng: &apos;en&apos;,
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-tag">i18next</span><span class="hljs-selector-class">.init</span>({
  <span class="hljs-attribute">lng</span>: <span class="hljs-string">&apos;en&apos;</span>,
});</code></pre><p>&#x521D;&#x59CB;&#x5316;&#x7684;&#x65F6;&#x5019;&#x53EF;&#x4EE5;&#x8BBE;&#x7F6E;&#x9ED8;&#x8BA4;&#x8BED;&#x8A00;&#xFF0C; &#x5982;&#x9700;&#x8981;&#x5207;&#x6362;&#x7CFB;&#x7EDF;&#x8BED;&#x8A00;&#xFF0C; &#x53EF;&#x4EE5;&#x8C03;&#x7528; i18n &#x63D0;&#x4F9B;&#x7684;&#x65B9;&#x6CD5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { changeLanguage } from &apos;@src/i18n&apos;;

// ...

  // &#x8BBE;&#x7F6E;&#x4E3A;&#x5370;&#x5C3C;&#x8BED;
  changeLanguage(&apos;id&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> { changeLanguage } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@src/i18n&apos;</span>;

<span class="hljs-comment">// ...</span>

  <span class="hljs-comment">// &#x8BBE;&#x7F6E;&#x4E3A;&#x5370;&#x5C3C;&#x8BED;</span>
  changeLanguage(<span class="hljs-string">&apos;id&apos;</span>);</code></pre><p>&#x4E3A;&#x4E86;&#x4FDD;&#x5B58;&#x8BED;&#x8A00;&#x8BBE;&#x7F6E;, &#x53EF;&#x4EE5;&#x628A; language &#x4FDD;&#x5B58;&#x5728; <code>localStorage</code> &#x4E2D;, &#x4F7F;&#x7528;&#x7684;&#x65F6;&#x5019;&#x76F4;&#x63A5;&#x4ECE; storage &#x91CC;&#x53D6;&#x3002;</p><hr><h1 id="articleHeader8">&#x7ED3;&#x8BED;</h1><p>&#x8FD9;&#x91CC;&#x4F5C;&#x4E3A;&#x4F8B;&#xFF0C; &#x5C31;&#x662F;&#x628A;&#x8BED;&#x8A00;&#x7684;json &#x6587;&#x4EF6;&#x4E0B;&#x8F7D;&#x4E0B;&#x6765;&#x653E;&#x5230;locales &#x76EE;&#x5F55;&#x91CC;&#xFF0C; &#x5982;&#x679C;&#x60F3;&#x5B9E;&#x65F6;&#x62C9;&#x53D6;&#xFF0C;&#x8981;&#x4FDD;&#x8BC1;&#x6587;&#x4EF6;&#x4E0B;&#x8F7D;&#x5B8C;&#x4E4B;&#x540E;&#x518D;render app.</p><p>&#x7C7B;&#x4F3C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="loadResource(getLocale())
  .then(() =&gt; {
    import(&apos;./app.js&apos;)
  })
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code>loadResource(getLocale())
  .<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">import</span>(<span class="hljs-string">&apos;./app.js&apos;</span>)
  })
</code></pre><p><br>&#x5F53;&#x7136;&#x4F60;&#x4E5F;&#x53EF;&#x4EE5;&#x514D;&#x4E86;&#x8FD9;&#x4E00;&#x6B65;&#xFF0C;&#x76F4;&#x63A5;&#x4E0B;&#x8F7D;&#x597D;&#x653E;&#x5230;&#x5DE5;&#x7A0B;&#x91CC;&#x6765;&#x3002;</p><p>&#x5927;&#x6982;&#x5C31;&#x662F;&#x8FD9;&#x6837;&#xFF0C;&#x4EE5;&#x4E0A;&#x5C31;&#x662F;&#x5B9E;&#x73B0;&#x56FD;&#x9645;&#x5316;&#x7684;&#x5168;&#x90E8;&#x4EE3;&#x7801;&#xFF0C;&#x5E0C;&#x671B;&#x5BF9;&#x5927;&#x5BB6;&#x6709;&#x6240;&#x5E2E;&#x52A9;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
react 国际化了解一下

## 原文链接
[https://segmentfault.com/a/1190000016390560](https://segmentfault.com/a/1190000016390560)

