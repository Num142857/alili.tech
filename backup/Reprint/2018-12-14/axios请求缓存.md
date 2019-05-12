---
title: 'axios请求缓存' 
date: 2018-12-14 2:30:11
hidden: true
slug: l7rdwfh3hh
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">源代码</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import axios from 'axios'

// 数据存储
export const cache = {
  data: {},
  set (key, data, bol = false) {
    if (bol) {
      localStorage.setItem(key, JSON.stringify(data))
    } else {
      this.data[key] = data
    }
  },
  get (key, bol = false) {
    if (bol) {
      return JSON.parse(localStorage.getItem(key))
    } else {
      return this.data[key]
    }
  },
  clear (key, bol = false) {
    if (bol) {
      localStorage.removeItem(key)
    } else {
      delete this.data[key]
    }
  }
}

// 建立唯一的key值
function buildUrl (url, params = {}) {
  const sortedParams = Object.keys(params).sort().reduce((result, key) => {
    result[key] = params[key]
    return result
  }, {})

  url += `?${JSON.stringify(sortedParams)}`
  return url
}

// 缓存,建议只给get加缓存
export default (options = {}) => config => {
  const { url, method, params, data } = config
  const { local = false } = options
  // 建立索引
  let index
  if (method === 'get') {
    index = buildUrl(url, params)
  } else {
    index = buildUrl(url, data)
  }
  const indexData = index + '-data'
  let response = cache.get(indexData, local)
  let responsePromise = cache.get(index)
  if (response) {
    return Promise.resolve(JSON.parse(JSON.stringify(response))) // 对象是引用，为了防止污染数据源
  } else if (!responsePromise) {
    responsePromise = (async () => {
      try {
        const response = await axios.defaults.adapter(config)
        cache.set(indexData, response, local)
        return Promise.resolve(JSON.parse(JSON.stringify(response))) // 同时发送多次一样的请求，没办法防止污染数据源，只有业务中去实现
      } catch (reason) {
        cache.clear(index, local)
        cache.clear(indexData)
        return Promise.reject(reason)
      }
    })()

    // put the promise for the non-transformed response into cache as a placeholder
    cache.set(index, responsePromise)
  }
  return responsePromise
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">'axios'</span>

<span class="hljs-comment">// 数据存储</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> cache = {
  <span class="hljs-attr">data</span>: {},
  set (key, data, bol = <span class="hljs-literal">false</span>) {
    <span class="hljs-keyword">if</span> (bol) {
      localStorage.setItem(key, <span class="hljs-built_in">JSON</span>.stringify(data))
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">this</span>.data[key] = data
    }
  },
  get (key, bol = <span class="hljs-literal">false</span>) {
    <span class="hljs-keyword">if</span> (bol) {
      <span class="hljs-keyword">return</span> <span class="hljs-built_in">JSON</span>.parse(localStorage.getItem(key))
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.data[key]
    }
  },
  clear (key, bol = <span class="hljs-literal">false</span>) {
    <span class="hljs-keyword">if</span> (bol) {
      localStorage.removeItem(key)
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">delete</span> <span class="hljs-keyword">this</span>.data[key]
    }
  }
}

<span class="hljs-comment">// 建立唯一的key值</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">buildUrl</span> (<span class="hljs-params">url, params = {}</span>) </span>{
  <span class="hljs-keyword">const</span> sortedParams = <span class="hljs-built_in">Object</span>.keys(params).sort().reduce(<span class="hljs-function">(<span class="hljs-params">result, key</span>) =&gt;</span> {
    result[key] = params[key]
    <span class="hljs-keyword">return</span> result
  }, {})

  url += <span class="hljs-string">`?<span class="hljs-subst">${<span class="hljs-built_in">JSON</span>.stringify(sortedParams)}</span>`</span>
  <span class="hljs-keyword">return</span> url
}

<span class="hljs-comment">// 缓存,建议只给get加缓存</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> (options = {}) =&gt; <span class="hljs-function"><span class="hljs-params">config</span> =&gt;</span> {
  <span class="hljs-keyword">const</span> { url, method, params, data } = config
  <span class="hljs-keyword">const</span> { local = <span class="hljs-literal">false</span> } = options
  <span class="hljs-comment">// 建立索引</span>
  <span class="hljs-keyword">let</span> index
  <span class="hljs-keyword">if</span> (method === <span class="hljs-string">'get'</span>) {
    index = buildUrl(url, params)
  } <span class="hljs-keyword">else</span> {
    index = buildUrl(url, data)
  }
  <span class="hljs-keyword">const</span> indexData = index + <span class="hljs-string">'-data'</span>
  <span class="hljs-keyword">let</span> response = cache.get(indexData, local)
  <span class="hljs-keyword">let</span> responsePromise = cache.get(index)
  <span class="hljs-keyword">if</span> (response) {
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-built_in">JSON</span>.parse(<span class="hljs-built_in">JSON</span>.stringify(response))) <span class="hljs-comment">// 对象是引用，为了防止污染数据源</span>
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (!responsePromise) {
    responsePromise = <span class="hljs-function">(<span class="hljs-params"><span class="hljs-keyword">async</span> (</span>) =&gt;</span> {
      <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> axios.defaults.adapter(config)
        cache.set(indexData, response, local)
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-built_in">JSON</span>.parse(<span class="hljs-built_in">JSON</span>.stringify(response))) <span class="hljs-comment">// 同时发送多次一样的请求，没办法防止污染数据源，只有业务中去实现</span>
      } <span class="hljs-keyword">catch</span> (reason) {
        cache.clear(index, local)
        cache.clear(indexData)
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(reason)
      }
    })()

    <span class="hljs-comment">// put the promise for the non-transformed response into cache as a placeholder</span>
    cache.set(index, responsePromise)
  }
  <span class="hljs-keyword">return</span> responsePromise
}
</code></pre>
<h2 id="articleHeader1">API</h2>
<p>例如</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import axios from 'axios'
import cache from './cache'
 
// 获取列表
export async function getListData (payload) {
  return axios.get('/Thermodynamic', {
    params: payload,
    adapter: cache({
      local: false // 是否永久保留在本地，默认为false
    })
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">'axios'</span>
<span class="hljs-keyword">import</span> cache <span class="hljs-keyword">from</span> <span class="hljs-string">'./cache'</span>
 
<span class="hljs-comment">// 获取列表</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getListData</span> (<span class="hljs-params">payload</span>) </span>{
  <span class="hljs-keyword">return</span> axios.get(<span class="hljs-string">'/Thermodynamic'</span>, {
    <span class="hljs-attr">params</span>: payload,
    <span class="hljs-attr">adapter</span>: cache({
      <span class="hljs-attr">local</span>: <span class="hljs-literal">false</span> <span class="hljs-comment">// 是否永久保留在本地，默认为false</span>
    })
  })
}</code></pre>
<h2 id="articleHeader2">注意点</h2>
<ol><li>不建议将local设置成true</li></ol>
<h2 id="articleHeader3">疑难解答</h2>
<ol><li>问：为什么不建议永久储存在本地<br>   答：储存在内存中，能保证每次刷新浏览器，加载的都是最新数据；储存在本地，拿不到最新数据；如果需要做到储存在本地，可把每一次数据设置一个版本号，进入应用时向后台发送一个请求，来判断当前请求得到的版本号是否与储存的版本号一致</li></ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
axios请求缓存

## 原文链接
[https://segmentfault.com/a/1190000013167994](https://segmentfault.com/a/1190000013167994)

