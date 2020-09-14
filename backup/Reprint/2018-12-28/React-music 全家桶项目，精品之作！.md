---
title: 'React-music 全家桶项目，精品之作！' 
date: 2018-12-28 2:30:11
hidden: true
slug: luh2tivo4i
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">React-Music 全家桶项目</h2>
<h3 id="articleHeader1">一、简介</h3>
<p>该项目是基于React全家桶开发的一个音乐播放器，技术栈采用：Webpack + React + React-redux + React-router + Node + Sass + Es6 + Localstorage + Css3，基本音乐API使用http-proxy酷狗音乐的，在此感谢酷狗音乐！项目涉及的知识点非常广泛，基于react全家桶技术都有使用，独立开发，精品之作，具有很好的参考价值！</p>
<p>1、项目依赖基本核心版本：</p>
<ul>
<li>react: "^15.6.1",</li>
<li>react-dom: "^15.6.1",</li>
<li>react-router: "^4.2.0",</li>
<li>react-router-dom: "^4.2.2"</li>
<li>react-redux: "^5.0.6",</li>
<li>redux: "^3.7.2",</li>
<li>webpack: "^3.5.5",</li>
<li>webpack-dev-server: "^2.7.1"</li>
</ul>
<p>2、该音乐播放器基本功能：</p>
<ul>
<li>展示最新的推荐歌单、歌单、排行榜、歌手；</li>
<li>音乐的播放、暂停、上一首、下一首、删除当前播放列表功能；</li>
<li>基本搜索功能；</li>
<li>喜欢音乐加入收藏列表；</li>
<li>模拟登录功能（随便输入用户名，密码即可）；</li>
</ul>
<p>3、项目Github地址：<a href="https://github.com/chenjun1127/react-music" rel="nofollow noreferrer" target="_blank">React-music</a></p>
<p>4、项目基本预览：<br><span class="img-wrap"><img data-src="/img/bVWSrC?w=1242&amp;h=2208" src="https://static.alili.tech/img/bVWSrC?w=1242&amp;h=2208" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><span class="img-wrap"><img data-src="/img/bVWSrE?w=1242&amp;h=2208" src="https://static.alili.tech/img/bVWSrE?w=1242&amp;h=2208" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><span class="img-wrap"><img data-src="/img/bVWSrO?w=1242&amp;h=2208" src="https://static.alili.tech/img/bVWSrO?w=1242&amp;h=2208" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bVWSsn?w=1242&amp;h=2208" src="https://static.alili.tech/img/bVWSsn?w=1242&amp;h=2208" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><span class="img-wrap"><img data-src="/img/bVWSsB?w=1242&amp;h=2208" src="https://static.alili.tech/img/bVWSsB?w=1242&amp;h=2208" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><span class="img-wrap"><img data-src="/img/bVWSrZ?w=1242&amp;h=2208" src="https://static.alili.tech/img/bVWSrZ?w=1242&amp;h=2208" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader2">二、项目结构</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├── src（主目录）　　　　　　　　　　　　　　                               
│   ├── actions（Redux action）　　　　　　　　　　                 
│   │   ├── xxx.js
│   │   └── ...
│   ├── components（木偶组件目录）　　　　　　　　              
│   │   ├──    Artist
│   │   │    ├── xxx.js
│   │   │    └── ...
│   │   ├──    Common
│   │   │    ├── xxx.js
│   │   │   └── ...
│   │   ├──    Home
│   │   │    ├── xxx.js
│   │   │    └── ...
│   │   ├──    New
│   │   │    ├── xxx.js
│   │   │    └── ...
│   │   ├──    Play
│   │   │    ├── xxx.js
│   │   │    └── ...
│   │   ├──    Rank
│   │   │    ├── xxx.js
│   │   │    └── ...
│   │   ├──    Search
│   │   │    ├── xxx.js
│   │   │    └── ...  
│   │   └── User
│   │       ├── xxx.js
│   │       └── ...
│   ├── constants（Constant常量）               
│   │   └── index.js
│   ├── reducers（Redux reducer）                
│   │   ├── index.js
│   │   └── ...
│   ├── containers（智能组件目录）                  
│   │   ├──    Artist
│   │   │    ├── xxx.js
│   │   │    └── ...
│   │   ├──    Home
│   │   │    ├── xxx.js
│   │   │    └── ...
│   │   ├──    New
│   │   │    ├── xxx.js
│   │   │    └── ...
│   │   ├──    Play
│   │   │    ├── xxx.js
│   │   │    └── ...
│   │   ├──    Rank
│   │   │    ├── xxx.js
│   │   │    └── ...
│   │   ├──    Search
│   │   │    ├── xxx.js
│   │   │    └── ...  
│   │   └── User
│   │       ├── xxx.js
│   │       └── ...
│   ├── routes（路由）                
│   │   └── index.js
│   ├── static（静态目录）                
│   │   ├──    css
│   │   │    ├── xxx.scss
│   │   │    └── ...  
│   │   └── images
│   │       └── ...
│   ├── store（Redux store）                     
│   │   └── configureStore.js
│   ├── util（工具目录）                      
│   │   ├── xxx.js
│   │   └── ...
├── templates（模板）                          
│   └── index.html   
├── dist（打包目录）                                            
│   ├── css             
│   │   └── xxx.css
│   ├── js                 
│   │    ├── xxx.js
│   │    └── ...
│   ├── favicon.ico
│   └── index.html
├── node_modules                  
│   └── ...                    
├── README.md
├── app.js（Express启动配置）                                 
├── server.js（主服务配置）　　　　　　　　　                               
├── webpack.config.js（基本配置）                     
├── webpack.prod.config.js（生产环境配置）         
├── yarn.lock                    
└── package.json" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">├── src（主目录）　　　　　　　　　　　　　　                               
│   ├── actions（Redux action）　　　　　　　　　　                 
│   │   ├── xxx.js
│   │   └── ...
│   ├── components（木偶组件目录）　　　　　　　　              
│   │   ├──    Artist
│   │   │    ├── xxx.js
│   │   │    └── ...
│   │   ├──    Common
│   │   │    ├── xxx.js
│   │   │   └── ...
│   │   ├──    Home
│   │   │    ├── xxx.js
│   │   │    └── ...
│   │   ├──    New
│   │   │    ├── xxx.js
│   │   │    └── ...
│   │   ├──    Play
│   │   │    ├── xxx.js
│   │   │    └── ...
│   │   ├──    Rank
│   │   │    ├── xxx.js
│   │   │    └── ...
│   │   ├──    Search
│   │   │    ├── xxx.js
│   │   │    └── ...  
│   │   └── User
│   │       ├── xxx.js
│   │       └── ...
│   ├── constants（Constant常量）               
│   │   └── index.js
│   ├── reducers（Redux reducer）                
│   │   ├── index.js
│   │   └── ...
│   ├── containers（智能组件目录）                  
│   │   ├──    Artist
│   │   │    ├── xxx.js
│   │   │    └── ...
│   │   ├──    Home
│   │   │    ├── xxx.js
│   │   │    └── ...
│   │   ├──    New
│   │   │    ├── xxx.js
│   │   │    └── ...
│   │   ├──    Play
│   │   │    ├── xxx.js
│   │   │    └── ...
│   │   ├──    Rank
│   │   │    ├── xxx.js
│   │   │    └── ...
│   │   ├──    Search
│   │   │    ├── xxx.js
│   │   │    └── ...  
│   │   └── User
│   │       ├── xxx.js
│   │       └── ...
│   ├── routes（路由）                
│   │   └── index.js
│   ├── <span class="hljs-keyword">static</span>（静态目录）                
│   │   ├──    css
│   │   │    ├── xxx.scss
│   │   │    └── ...  
│   │   └── images
│   │       └── ...
│   ├── store（Redux store）                     
│   │   └── configureStore.js
│   ├── util（工具目录）                      
│   │   ├── xxx.js
│   │   └── ...
├── templates（模板）                          
│   └── index.html   
├── dist（打包目录）                                            
│   ├── css             
│   │   └── xxx.css
│   ├── js                 
│   │    ├── xxx.js
│   │    └── ...
│   ├── favicon.ico
│   └── index.html
├── node_modules                  
│   └── ...                    
├── README.md
├── app.js（Express启动配置）                                 
├── server.js（主服务配置）　　　　　　　　　                               
├── webpack.config.js（基本配置）                     
├── webpack.prod.config.js（生产环境配置）         
├── yarn.lock                    
└── package.json</code></pre>
<p>screenshot与images.md为截图说明文件，是为了方便查看，与本项目无关！</p>
<h3 id="articleHeader3">三、如何执行</h3>
<h4>1、将项目克隆到本地，cd 到 react-music</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git clone git@github.com:chenjun1127/react-music.git
cd react-music" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">git clone git@github.com:chenjun1127/react-music.git
cd react-music</code></pre>
<h4>2、安装依赖</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install or yarn install" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">npm install or yarn install</code></pre>
<h4>3、执行</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm start or yarn start
// npm run build(打包)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">npm start or yarn start
<span class="hljs-comment">// npm run build(打包)</span></code></pre>
<h4>4、打开浏览器浏览 <a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>:3000/</h4>
<h3 id="articleHeader4">四、项目总结</h3>
<p>整体项目实现了一个基本播放器应有的功能，但个别功能还有待完善，比如收藏列表本地持续化存储、登录注册未做真正限制等。觉得项目不错的，可以给个Star，谢谢！</p>
<p>Tips：在npm install or yarn install 的时候，请确保网络良好，如个别依赖安装不了，请设置淘宝镜像为安装源；</p>
<p>如有问题：请联系QQ：402074940</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React-music 全家桶项目，精品之作！

## 原文链接
[https://segmentfault.com/a/1190000011609613](https://segmentfault.com/a/1190000011609613)

