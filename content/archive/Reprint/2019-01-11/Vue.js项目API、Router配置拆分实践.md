---
title: 'Vue.js项目API、Router配置拆分实践' 
date: 2019-01-11 2:30:08
hidden: true
slug: 4x2b712fs8j
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前后端分离开发方式前端拥有更高的控制权</h2>
<p>随着前端框架技术的飞速发展，Router这个概念也被迅速普及到前端项目中，在早期前后的没有分离的时期下，并没有明确的路由概念，前端页面跳转大多是通过后端进行请求转发的，比如在Spring MVC项目中，进行一个页面跳转如下（画红线部分）： <br><span class="img-wrap"><img data-src="/img/bVPwS1?w=759&amp;h=516" src="https://static.alili.tech/img/bVPwS1?w=759&amp;h=516" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>前端需要一个超链接，链接的href=/manager，这样这个超链接被转发到scs/waitFollowed路径指定的页面。</p>
<p>前后的分离后，前端页面跳转的方式发生了变化，不再需要后端处理了，数据交换方式也改变了，由此前端需要定义Router配置文件，需要定义API配置文件。在项目的权限配置管理中，完全不需要后端什么事了，可以说，权限配置表可以单独拿出来由前端维护了。 <br><span class="img-wrap"><img data-src="/img/bVPwTn?w=1362&amp;h=526" src="https://static.alili.tech/img/bVPwTn?w=1362&amp;h=526" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>比如这个url字段，在前后端不分离的情况下，严重依赖于后端，url就是后端接口地址，如果需要更改就需要后端修改代码修改接口地址，而现在，前端可以自由控制url的值是什么了。</p>
<p>在接口层面，前端也会有自己的配置文件，可以对后端提供的接口进行重命名，组合等。比如 <br><span class="img-wrap"><img data-src="/img/bVPwTJ?w=903&amp;h=586" src="https://static.alili.tech/img/bVPwTJ?w=903&amp;h=586" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>前端都统一使用<code>模块名+接口名</code>的方式管理，管后端提供的接口叫啥已经不重要，在视觉上和维护上都比较方便。在页面上使用，查询起来也很直观： <br><span class="img-wrap"><img data-src="/img/bVPwT3?w=863&amp;h=271" src="https://static.alili.tech/img/bVPwT3?w=863&amp;h=271" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>看到<code>DISTRBUTE().Leads.dataGrid</code>这个接口，就知道这是<code>DISTRBUTE</code>模块下<code>Leasd</code>功能下的列表查询接口</p>
<h2 id="articleHeader1">Vue.js中的API、Router配置</h2>
<p>在Vue.js项目下，一开始我们只使用一个<code>api.config.js</code>配置文件，所有的接口都定义在这里面，router也一样，都配置在一个<code>router.config.js</code>中，下面是我们项目中API配置文件<br><span class="img-wrap"><img data-src="/img/bVPwUe?w=454&amp;h=592" src="https://static.alili.tech/img/bVPwUe?w=454&amp;h=592" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>可以看到，很多的业务模块，很多的接口，已经达到了570多行，随着业务进一步推进，接口快速膨胀，文件越来越大。</p>
<p>这时候迫切需要拆分，把不同的业务模块单独拆分为一个个API配置文件。同样，我们来看看拆分前的Router配置文件： <br><span class="img-wrap"><img data-src="/img/bVPwUs?w=453&amp;h=536" src="https://static.alili.tech/img/bVPwUs?w=453&amp;h=536" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>这样router一多最大的缺点就是会导致router命名冲突。</p>
<h2 id="articleHeader2">拆分！拆分！拆分！</h2>
<p>首先考虑API配置文件怎么拆分，对于接口，我们肯定有多套环境，多套环境那么API的URL也不一样，拆分成多个文件后多个文件需要共用同一个获取<code>apiBase</code>的方法，所以这个<code>apiBase</code>就要写在公共的地方，在这里原来的<code>api.config.js</code>就变成了公共配置，<code>apiBase</code>就放在此文件内。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export function apiBase() {
  let hostname = window.location.hostname,
    API_BASE_URL = 'http://test2api.dunizb.com';//默认环境
  if(hostname === 'crm.dunizb.cn') {  //正式环境
    API_BASE_URL = 'http://api.dunizb.cn';
  } else if(hostname === 'admin.dunizb.com') {//公网测试环境
    API_BASE_URL = 'http://testapi.dunizb.com';
  } else if(hostname === 'manager.dunizb.com') {//内网测试环境
    API_BASE_URL = 'http://test2api.dunizb.com';
  }
  return API_BASE_URL;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">apiBase</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">let</span> hostname = <span class="hljs-built_in">window</span>.location.hostname,
    API_BASE_URL = <span class="hljs-string">'http://test2api.dunizb.com'</span>;<span class="hljs-comment">//默认环境</span>
  <span class="hljs-keyword">if</span>(hostname === <span class="hljs-string">'crm.dunizb.cn'</span>) {  <span class="hljs-comment">//正式环境</span>
    API_BASE_URL = <span class="hljs-string">'http://api.dunizb.cn'</span>;
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(hostname === <span class="hljs-string">'admin.dunizb.com'</span>) {<span class="hljs-comment">//公网测试环境</span>
    API_BASE_URL = <span class="hljs-string">'http://testapi.dunizb.com'</span>;
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(hostname === <span class="hljs-string">'manager.dunizb.com'</span>) {<span class="hljs-comment">//内网测试环境</span>
    API_BASE_URL = <span class="hljs-string">'http://test2api.dunizb.com'</span>;
  }
  <span class="hljs-keyword">return</span> API_BASE_URL;
}</code></pre>
<p>然后在每个子API配置文件中引入即可：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {apiBase} from '../api.config';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> {apiBase} <span class="hljs-keyword">from</span> <span class="hljs-string">'../api.config'</span>;</code></pre>
<p>具体功能API不需要更改，直接拷贝相应模块API到子模块API配置文件即可。 <br><span class="img-wrap"><img data-src="/img/bVPwUI?w=846&amp;h=536" src="https://static.alili.tech/img/bVPwUI?w=846&amp;h=536" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>Router的拆分稍微复杂一点，拆分后的文件目录与API的目录相同： <br><span class="img-wrap"><img data-src="/img/bVPwUU?w=406&amp;h=477" src="https://static.alili.tech/img/bVPwUU?w=406&amp;h=477" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>拆分思路也完全一样，但要保证只有一个<code>router.start</code>即：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="return router.start(App, '#app');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">return</span> router.start(App, <span class="hljs-string">'#app'</span>);</code></pre>
<p>虽然你在子router配置文件中也写上页面是能正常工作的，但是Vue.js会在控制台报一个错误： <br><span class="img-wrap"><img data-src="/img/bVPwVd?w=654&amp;h=313" src="https://static.alili.tech/img/bVPwVd?w=654&amp;h=313" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>这个错误的意思就是router已经启动，无需启动多次。所以，子router文件中不能存在 <code>return router.start(App, '#app');</code> 这样的代码。</p>
<p>拆分后<code>router.config.js</code>内容如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 路由总文件
 * Created by Bing on 2017/6/19 0019.
 */
import App from './App';
import authority from './routers/authority';
import publics from './routers/public';
import study from './routers/study';
... ...
export default function(router){
  authority(router);//基础与权限模块
  publics(router);//公共模块
  study(router);//教学相关
  ... ...
  return router.start(App, '#app');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
 * 路由总文件
 * Created by Bing on 2017/6/19 0019.
 */</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./App'</span>;
<span class="hljs-keyword">import</span> authority <span class="hljs-keyword">from</span> <span class="hljs-string">'./routers/authority'</span>;
<span class="hljs-keyword">import</span> publics <span class="hljs-keyword">from</span> <span class="hljs-string">'./routers/public'</span>;
<span class="hljs-keyword">import</span> study <span class="hljs-keyword">from</span> <span class="hljs-string">'./routers/study'</span>;
... ...
export <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">router</span>)</span>{
  authority(router);<span class="hljs-comment">//基础与权限模块</span>
  publics(router);<span class="hljs-comment">//公共模块</span>
  study(router);<span class="hljs-comment">//教学相关</span>
  ... ...
  return router.start(App, <span class="hljs-string">'#app'</span>);
}</code></pre>
<p>而子router配置文件的写法就是这样（以study模块为例）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 教学排课
 * 教研
 * Created by Bing on 2017/6/19 0019.
 */
import courseIndex from 'components/studyCourse/index/index';
import waitCourse from 'components/studyCourse/waitCourse/waitCourse';
import alreadyCourse from 'components/studyCourse/alreadyCourse/alreadyCourse';
import gearCourse from 'components/studyCourse/waitCourse/gearCourse';
import courseWare from 'components/teachingResearch/courseware/courseware.vue';
import courseWareLibrary from 'components/teachingResearch/courseware/library.vue';
export default function(router) {
  router.map({
    '/study/index': {component: courseIndex},
    '/study/waitCourse': {component: waitCourse},//待排课程
    '/study/waitCourse/gearCourse': {component: gearCourse},//待排
    '/study/course': {component: alreadyCourse},//已排课程
    '/tr/courseware': {component: courseWare},//课件管理
    '/tr/courseWare/library': {component: courseWareLibrary},//自主上传课件库
  });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
 * 教学排课
 * 教研
 * Created by Bing on 2017/6/19 0019.
 */</span>
<span class="hljs-keyword">import</span> courseIndex <span class="hljs-keyword">from</span> <span class="hljs-string">'components/studyCourse/index/index'</span>;
<span class="hljs-keyword">import</span> waitCourse <span class="hljs-keyword">from</span> <span class="hljs-string">'components/studyCourse/waitCourse/waitCourse'</span>;
<span class="hljs-keyword">import</span> alreadyCourse <span class="hljs-keyword">from</span> <span class="hljs-string">'components/studyCourse/alreadyCourse/alreadyCourse'</span>;
<span class="hljs-keyword">import</span> gearCourse <span class="hljs-keyword">from</span> <span class="hljs-string">'components/studyCourse/waitCourse/gearCourse'</span>;
<span class="hljs-keyword">import</span> courseWare <span class="hljs-keyword">from</span> <span class="hljs-string">'components/teachingResearch/courseware/courseware.vue'</span>;
<span class="hljs-keyword">import</span> courseWareLibrary <span class="hljs-keyword">from</span> <span class="hljs-string">'components/teachingResearch/courseware/library.vue'</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">router</span>) </span>{
  router.map({
    <span class="hljs-string">'/study/index'</span>: {<span class="hljs-attr">component</span>: courseIndex},
    <span class="hljs-string">'/study/waitCourse'</span>: {<span class="hljs-attr">component</span>: waitCourse},<span class="hljs-comment">//待排课程</span>
    <span class="hljs-string">'/study/waitCourse/gearCourse'</span>: {<span class="hljs-attr">component</span>: gearCourse},<span class="hljs-comment">//待排</span>
    <span class="hljs-string">'/study/course'</span>: {<span class="hljs-attr">component</span>: alreadyCourse},<span class="hljs-comment">//已排课程</span>
    <span class="hljs-string">'/tr/courseware'</span>: {<span class="hljs-attr">component</span>: courseWare},<span class="hljs-comment">//课件管理</span>
    <span class="hljs-string">'/tr/courseWare/library'</span>: {<span class="hljs-attr">component</span>: courseWareLibrary},<span class="hljs-comment">//自主上传课件库</span>
  });
}</code></pre>
<p>拆分后，每个模块管理它自己领域的router、api，router.config.js和api.config.js就大大瘦身了，也降低了命名冲突的问题和将来混乱的问题。</p>
<hr>
<p>此前的Vue.js系列文章：</p>
<ul>
<li><p><a href="https://segmentfault.com/a/1190000009832792">Vue.js开发常见问题解析</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000007839771" target="_blank">Vue.js常用开发知识简要入门（一）</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000008048783">Vue.js常用开发知识简要入门（二）</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000008337364" target="_blank">Vue.js常用开发知识简要入门（三）</a></p></li>
</ul>
<blockquote><p>文章首发于我的微信公众号，关注可获得每次最新推送<br><span class="img-wrap"><img data-src="/img/remote/1460000009971455?w=431&amp;h=497" src="https://static.alili.tech/img/remote/1460000009971455?w=431&amp;h=497" alt="文章首发于我的微信公众号，关注可获得每次最新推送" title="文章首发于我的微信公众号，关注可获得每次最新推送" style="cursor: pointer; display: inline;"></span></p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue.js项目API、Router配置拆分实践

## 原文链接
[https://segmentfault.com/a/1190000009858990](https://segmentfault.com/a/1190000009858990)

