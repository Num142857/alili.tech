---
title: '基于Vue.js 2.x系列 + Element UI + RBAC/AUTH权限 的响应式后台管理系统' 
date: 2018-12-03 2:30:08
hidden: true
slug: nh58q1952xk
categories: [reprint]
---

{{< raw >}}

                    
<h1>项目全面更新 <a href="https://segmentfault.com/a/1190000015619977">https://segmentfault.com/a/11...</a>
</h1>
<h2>前言</h2>
<p><strong>项目前端地址：</strong> <a href="https://github.com/lmxdawn/vue-admin-html" rel="nofollow noreferrer">https://github.com/lmxdawn/vu...</a></p>
<p><strong>项目后端地址：</strong> <a href="https://github.com/lmxdawn/vue-admin-php" rel="nofollow noreferrer">https://github.com/lmxdawn/vu...</a></p>
<p>欢迎大家的star</p>
<h2>20180519 更新</h2>
<p>这次加了一个通宵班， 没办法强迫症。</p>
<ul><li>1.增加文件上传插件，主要用于管理后台的资源，之前我们运营是每次都要去上传文件，而有了这个插件管理，就可以不用上传重复的资源。上传插件实现了把汉字自动转成拼音（都知道中文路径时不友好的）。现目前上传的文件没有用数据库来管理，而是直接用获取文件的形式，也是偷懒，有时间再实现吧。</li></ul>
<h3>废话不多说，贴图</h3>
<p><span class="img-wrap"><img data-src="/img/bVbaObm" src="https://static.alili.tech/img/bVbaObm" alt="图片描述" title="图片描述"></span></p>
<h2>20180428 更新</h2>
<ul>
<li>1.增加 mock 模拟数据。注意（改为API接口数据时一定要把 main.js 里面引入的 mock.js 删掉）</li>
<li>2.增加左侧导航栏的左右收折功能，特别注意一点就是 由于 element-ui 的导航菜单的原因，在el-submenu 外层加了 div 时，收折就隐藏不了文字，所以要自己加上 css 样式，放在 base.scss 下面</li>
</ul>
<pre><code>// 左侧导航栏的折叠后的样式
.slide-hide {
    .el-menu--collapse {
        .el-submenu {
            .el-submenu__title {
                span {
                    height: 0;
                    width: 0;
                    overflow: hidden;
                    visibility: hidden;
                    display: inline-block;
                }
                .el-submenu__icon-arrow {
                    display: none;
                }
            }
        }
        .el-menu-item {
            .el-tooltip {
                span {
                    height: 0;
                    width: 0;
                    overflow: hidden;
                    visibility: hidden;
                    display: inline-block;
                }
            }
        }
    }
}</code></pre>
<p>效果如下：<br><span class="img-wrap"><img data-src="/img/bV9DDo" src="https://static.alili.tech/img/bV9DDo" alt="图片描述" title="图片描述"></span><span class="img-wrap"><img data-src="/img/bV9DC8" src="https://static.alili.tech/img/bV9DC8" alt="图片描述" title="图片描述"></span></p>
<h2>PC版</h2>
<p><span class="img-wrap"><img data-src="https://lmxdawn.github.io/images/pc.png" src="https://static.alili.techhttps://lmxdawn.github.io/images/pc.png" alt="donate" title="donate"></span></p>
<h2>手机版</h2>
<p><span class="img-wrap"><img data-src="https://lmxdawn.github.io/images/phone.png" src="https://static.alili.techhttps://lmxdawn.github.io/images/phone.png" alt="图片描述" title="图片描述"></span><span class="img-wrap"><img data-src="https://lmxdawn.github.io/images/phone-1.png" src="https://static.alili.techhttps://lmxdawn.github.io/images/phone-1.png" alt="图片描述" title="图片描述"></span></p>
<h2>功能</h2>
<ul>
<li>[x] 管理员登录</li>
<li>[x] 登录</li>
<li>[x] 修改密码</li>
<li>[x] 角色管理</li>
<li>[x] 权限管理</li>
<li>[x] 401/404错误页面</li>
<li>[x] 动态面包屑</li>
<li>[x] 动态侧边栏</li>
</ul>
<h2>安装步骤</h2>
<pre><code>git clone https://github.com/lmxdawn/vue-admin-html.git      // 把模板下载到本地
cd vue-admin-html    // 进入模板目录
npm install         // 安装项目依赖，等待安装完成之后
</code></pre>
<h2>本地开发</h2>
<pre><code>// 开启服务器，浏览器访问 http://localhost:8080
npm run dev
</code></pre>
<h2>构建生产</h2>
<pre><code>// 执行构建命令，生成的dist文件夹放在服务器下即可访问
npm run build
</code></pre>
<h2>用到的东西</h2>
<ul><li>icon 图标： 用阿里巴巴矢量图标库，地址 <a href="http://www.iconfont.cn" rel="nofollow noreferrer">http://www.iconfont.cn</a> 怎么下载图标及下载 自行百度，图标放在  src/assets/icons  目录下面，把 iconfont 里创建的项目图标现在 解压后直接放入 这个目录即可，值得注意的是，因为采用了 eslint ，所以 iconfont.js 头部要加 <code>/*eslint-disable */</code>  忽略错误</li></ul>
<h2>Online Demo</h2>
<p>（建议使用最新版Chrome浏览器）<br><a href="https://lmxdawn.github.io/vue-admin" rel="nofollow noreferrer">在线 Demo</a></p>
<h2>写在最后</h2>
<p>一些文章地址：<br><a href="https://juejin.im/post/59097cd7a22b9d0065fb61d2" rel="nofollow noreferrer">VUE后台管理的文章</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于Vue.js 2.x系列 + Element UI + RBAC/AUTH权限 的响应式后台管理系统

## 原文链接
[https://segmentfault.com/a/1190000014637728](https://segmentfault.com/a/1190000014637728)

