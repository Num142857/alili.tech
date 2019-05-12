---
title: '将antd design pro框架的菜单与路由从单个权限改造成支持多个权限' 
date: 2018-12-10 2:30:07
hidden: true
slug: 2qa4smbj1to
categories: [reprint]
---

{{< raw >}}

                    
<p>框架原生权限控制 <a href="https://pro.ant.design/docs/authority-management-cn" rel="nofollow noreferrer" target="_blank">https://pro.ant.design/docs/a...</a></p>
<h2 id="articleHeader0">原生权限控制</h2>
<blockquote>控制菜单显示#<br>如需对某些菜单进行权限控制，只须对菜单配置文件 menu.js 中的菜单项设置 authority 属性即可，代表该项菜单的准入权限，菜单生成文件中会默认调用 Authorized.check 进行判断处理。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  name: '表单页',
  icon: 'form',
  path: 'form',
  children: [{
    name: '基础表单',
    path: 'basic-form',
  }, {
    name: '分步表单',
    path: 'step-form',
  }, {
    name: '高级表单',
    authority: 'admin', // 配置准入权限
    path: 'advanced-form',
  }],
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{
  <span class="hljs-attribute">name</span>: <span class="hljs-string">'表单页'</span>,
  icon: <span class="hljs-string">'form'</span>,
  path: <span class="hljs-string">'form'</span>,
  children: [{
    name: <span class="hljs-string">'基础表单'</span>,
    path: <span class="hljs-string">'basic-form'</span>,
  }, {
    <span class="hljs-attribute">name</span>: <span class="hljs-string">'分步表单'</span>,
    path: <span class="hljs-string">'step-form'</span>,
  }, {
    <span class="hljs-attribute">name</span>: <span class="hljs-string">'高级表单'</span>,
    authority: <span class="hljs-string">'admin'</span>, // 配置准入权限
    path: <span class="hljs-string">'advanced-form'</span>,
  }],
}</code></pre>
<ol>
<li>在登入的时候 会调用 <code>models/login.js</code> 里的<code>changeLoginStatus</code>改变登入信息，<code>setAuthority("admin");</code> 改方法的具体实现是<code>localStorage.setItem('antd-pro-authority', authority);</code>
</li>
<li>改变登入信息后调用<code>reloadAuthorized()</code>刷新权限</li>
<li>在<code>component/Authorized</code>中，会将当前的权限当做<code>CURRENT</code> export</li>
<li>同级目录下有<code>checkPerMissions.js</code>的<code>check</code>方法用来匹配当前权限和菜单权限</li>
<li>
<code>Authorized</code>组件的<code>authority</code>属性支持的<code>string | array | Promise | (currentAuthority) =&gt; boolean</code>,而菜单中配置的值是<code>string</code>,原处理函数</li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  if (typeof authority === 'string') {
    if (authority === currentAuthority) {
      return target;
    }
    return Exception;
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>  <span class="hljs-keyword">if</span> (typeof authority === <span class="hljs-string">'string'</span>) {
    <span class="hljs-keyword">if</span> (authority === currentAuthority) {
      <span class="hljs-keyword">return</span> target;
    }
    <span class="hljs-keyword">return</span> Exception;
  }</code></pre>
<ol>
<li>当<code>setAuthority</code>里设置的值与菜单中的<code>authority</code>相匹配的时候，该菜单的内容就会显示，具体实现不是这篇文章需要关心的。</li>
<li>但是LocalStorage 只支持<code>string</code>,不支持数组类型，所以权限控制起来并不灵活.因为项目需要，就将代码改造了一下。</li>
</ol>
<h1 id="articleHeader1">改造过程</h1>
<ol>
<li>当前登入的权限还是存在<code>LocalStorage</code>中，多个权限由逗号拼接 'admin,user,user2'</li>
<li>上面第三步将分割字符串成数组</li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="          if (currentAuthority.indexOf(&quot;,&quot;)>0){
            CURRENT = currentAuthority.split(&quot;,&quot;)
          }else{
            CURRENT = currentAuthority;
          }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nix"><code>          <span class="hljs-keyword">if</span> (currentAuthority.indexOf(<span class="hljs-string">","</span>)&gt;<span class="hljs-number">0</span>){
            <span class="hljs-attr">CURRENT</span> = currentAuthority.split(<span class="hljs-string">","</span>)
          }<span class="hljs-keyword">else</span>{
            <span class="hljs-attr">CURRENT</span> = currentAuthority;
          }</code></pre>
<p>3.第五步中的check函数中string处理改造</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (Array.isArray(currentAuthority)) {
      let flag = false
      currentAuthority.forEach(element => {
        if (authority===element) {
          flag = true
        }
      });
      if (flag) {
        return target;
      }
    } else if (authority === currentAuthority) {
      return target;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">if</span> (<span class="hljs-built_in">Array</span>.isArray(currentAuthority)) {
      <span class="hljs-keyword">let</span> flag = <span class="hljs-literal">false</span>
      currentAuthority.forEach(<span class="hljs-function"><span class="hljs-params">element</span> =&gt;</span> {
        <span class="hljs-keyword">if</span> (authority===element) {
          flag = <span class="hljs-literal">true</span>
        }
      });
      <span class="hljs-keyword">if</span> (flag) {
        <span class="hljs-keyword">return</span> target;
      }
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (authority === currentAuthority) {
      <span class="hljs-keyword">return</span> target;
    }</code></pre>
<p>4.在<code>setAuthority</code>中传入<code>admin,user</code>即可</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
将antd design pro框架的菜单与路由从单个权限改造成支持多个权限

## 原文链接
[https://segmentfault.com/a/1190000013735946](https://segmentfault.com/a/1190000013735946)

