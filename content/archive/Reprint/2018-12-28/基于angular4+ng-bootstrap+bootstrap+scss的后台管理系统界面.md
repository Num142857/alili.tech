---
title: '基于angular4+ng-bootstrap+bootstrap+scss的后台管理系统界面' 
date: 2018-12-28 2:30:11
hidden: true
slug: t3ynmntvxmh
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">描述</h2>
<ol><li>在angular2刚才发布的不久，很多人不懂得怎么应用，直到现在也很多人不懂怎么用，</li></ol>
<p>于是我在余业时间做了这么一个后台管理系统页面，希望对大家有帮助！！</p>
<ol><li>从我个人的感觉来说，angular2语法很舒服，上手起来也比较快（可能是因为我有java方面的经验吧），但同jquery、react这些的思想有所不同，初学者还是要先去了解他们的语法与思想！！</li></ol>
<p><span class="img-wrap"><img data-src="/img/bVWF2V?w=1920&amp;h=1030" src="https://static.alili.tech/img/bVWF2V?w=1920&amp;h=1030" alt="主页" title="主页" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">开源地址</h2>
<p><a href="/img/bVWF2V"></a><a href="https://github.com/myopenresources/cc" rel="nofollow noreferrer" target="_blank">https://github.com/myopenreso...</a></p>
<h2 id="articleHeader2">主要的第三方引用</h2>
<p>一个基于angular4.2.4+ng-bootstrap1.0.0-beta.4+bootstrap4.0.0-beta+scss的后台管理系统界面</p>
<h2 id="articleHeader3">更新情况</h2>
<ol>
<li>搭建环境，分别加入ng-bootstrap1.0.0-alpha.25、bootstrap4.1.3、font-awesome4.7.0、animate.css3.5.2等，cc版本为0.0.1<br>1.1 <a href="https://ng-bootstrap.github.io/#/home" rel="nofollow noreferrer" target="_blank">https://ng-bootstrap.github.i...</a><br>1.2 <a href="https://v4-alpha.getbootstrap.com/" rel="nofollow noreferrer" target="_blank">https://v4-alpha.getbootstrap...</a><br>1.3 <a href="http://fontawesome.io/" rel="nofollow noreferrer" target="_blank">http://fontawesome.io/</a><br>1.4 <a href="https://github.com/daneden/animate.css" rel="nofollow noreferrer" target="_blank">https://github.com/daneden/an...</a>
</li>
<li>登录界面<br>2.1 src/login/login.component.ts</li>
<li>主页界面<br>3.1 src/main/main.component.ts</li>
<li>添加alert与confirm组件<br>4.1 src/app/shared/modal/modal.service.ts</li>
<li>添加toast组件<br>5.1 src/app/shared/toast/toast.service.ts</li>
<li>添加第三方ng-charts组件<br>6.1 <a href="https://github.com/swimlane/ngx-charts" rel="nofollow noreferrer" target="_blank">https://github.com/swimlane/n...</a>
</li>
<li>添加第三方angular-2-dropdown-multiselect组件与angular2-select组件<br>7.1 <a href="https://github.com/softsimon/angular-2-dropdown-multiselect" rel="nofollow noreferrer" target="_blank">https://github.com/softsimon/...</a><br>7.2 <a href="https://github.com/basvandenberg/ng-select)" rel="nofollow noreferrer" target="_blank">https://github.com/basvandenb...</a>
</li>
<li>添加层次图组件<br>8.1 src/app/shared/hierarchy-view/hierarchy-view.component.ts</li>
<li>添加第三方ng2-img-cropper组件<br>9.1 <a href="https://github.com/search?q=ng2-img-cropper&amp;type=Code&amp;utf8=%E2%9C%93" rel="nofollow noreferrer" target="_blank">https://github.com/search?q=n...</a>
</li>
<li>添加头像更换功能<br>10.1 src/main/avatar-cropper.component.ts</li>
<li>添加http服务<br>11.1 src/app/core/http.service.ts</li>
<li>添加utils工具<br>12.1 src/app/core/utils.ts</li>
<li>添加pagination组件<br>13.1 src/app/shared/pagination/pagination.component.ts</li>
<li>添加http-pagination组件<br>14.1 src/app/shared/pagination/http-pagination.component.ts</li>
<li>添加spin组件<br>15.1 src/app/shared/spin/spin.component.ts</li>
<li>添加第三方angular2-ui-switch组件<br>16.1 <a href="https://github.com/yuyang041060120/angular2-ui-switch" rel="nofollow noreferrer" target="_blank">https://github.com/yuyang0410...</a>
</li>
<li>添加时间轴样式<br>17.1 assets/scss/base/_common.scss</li>
<li>添加日期选择datepickerI18n配置<br>18.1 src/app/shared/datepickerI18n/datepickerI18n.ts</li>
<li>添加img-cropper-select指令<br>19.1 src/app/shared/img-cropper-select/img-cropper-select.directive.ts</li>
<li>添加tree组件<br>20.1 src/app/shared/tree/tree.component.ts</li>
<li>添加select-tree组件<br>21.1 src/app/shared/tree/select-tree.component.ts</li>
<li>添加jquery</li>
<li>添加ztree组件<br>23.1 src/app/shared/ztree/ztree.component.ts</li>
<li>添加select-ztree组件<br>24.1 src/app/shared/ztree/select-ztree.component.ts</li>
<li>添加img-select-to-base指令<br>25.1 src/app/shared/img-select/img-select-to-base.directive.ts</li>
<li>添加switch组件<br>26.1 src/app/shared/switch/switche.component.ts</li>
<li>移除第三方angular2-ui-switch组件</li>
<li>升级版本为0.0.2</li>
<li>添加第三方ng2-file-upload组件<br>29.1 <a href="http://valor-software.com/ng2-file-upload/" rel="nofollow noreferrer" target="_blank">http://valor-software.com/ng2...</a>
</li>
<li>添加路由预加载策略，解决懒加载时首次使用卡顿问题<br>30.1 可参考博客<a href="http://blog.csdn.net/rotating_windmill/article/details/75142648" rel="nofollow noreferrer" target="_blank">http://blog.csdn.net/rotating...</a>
</li>
<li>添加custom-scrollbar.directive指令<br>31.1 配置参考：<a href="http://manos.malihu.gr/jquery-custom-content-scroller/" rel="nofollow noreferrer" target="_blank">http://manos.malihu.gr/jquery...</a>
</li>
<li>添加image-viewer.directive指令<br>32.1 配置参考：<a href="https://github.com/fengyuanchen/viewer#methods" rel="nofollow noreferrer" target="_blank">https://github.com/fengyuanch...</a><br>32.2 配置参考：<a href="http://www.cnblogs.com/yi0921/p/7080284.html" rel="nofollow noreferrer" target="_blank">http://www.cnblogs.com/yi0921...</a>
</li>
<li>添加spin.component组件<br>33.1 src/app/shared/spin/spin.component.ts与src/app/shared/spin/spin.service.ts</li>
<li>添加部署Tomcat的方法<br>34.1 参考下面的<code>部署到Tomcat</code>章节说明</li>
<li>解决构建时使用--prod参数的报错问题,使用--prod --aot可提升性能，升级cc版本为0.0.3</li>
<li>升级angular版本，使用yarn进行包版本管理，升级cc版本为0.0.4</li>
<li>升级ng-bootstrap1.0.0-beta.4与bootstrap4.0.0-beta+scss版本，升级cc版本为0.0.5</li>
<li>添加ng2-date-picker组件<br> 38.1 配置参考：<a href="https://github.com/vlio20/angular-datepicker" rel="nofollow noreferrer" target="_blank">https://github.com/vlio20/ang...</a>
</li>
<li>添加localStorage.service与sessionStorage.service服务<br> 39.1 src/app/shared/storage/localStorage.service.ts<br> 39.2 src/app/shared/storage/sessionStorage.service.ts</li>
<li>添加page-browser.component组件<br> 40.1 src/app/shared/page-browser/page-browser.component.ts</li>
<li>添加editor.component组件<br> 41.1 src/app/shared/editor/editor.component.ts<br> 41.2 配置参考：<a href="https://quilljs.com/docs/modules/toolbar/" rel="nofollow noreferrer" target="_blank">https://quilljs.com/docs/modu...</a>
</li>
<li>将shared目录中的共享模块按具体模块拆分，升级cc版本为0.0.6</li>
<li>添加第三方ag-grid组件<br> 43.1 配置参考:<a href="https://www.ag-grid.com/angular-getting-started/?framework=angular" rel="nofollow noreferrer" target="_blank">https://www.ag-grid.com/angul...</a>
</li>
<li>添加simple-data-table.directive指令以及相关组件<br> 44.1 src/app/shared/simple-data-table/simple-data-http-page.component<br> 44.2 src/app/shared/simple-data-table/simple-data-sort.component<br> 44.3 src/app/shared/simple-data-table/simple-data-table.directive</li>
<li>补全各组件、指令、服务spec文件</li>
<li>整理目录，升级cc版本为0.0.7<br> 46.1 business：业务功能目录<br> 46.2 business-service：业务功能服务目录<br> 46.3 business-shared：业务功能共享目录<br> 46.4 error-page：错误页面目录<br> 46.5 login：登录模块目录<br> 46.6 main：主体模块目录<br> 46.7 shared：公共组件共享目录</li>
<li>添加color-picker.component组件<br> 47.1 src/app/shared/color-picker/color-picker.component.ts</li>
<li>整理组件样式，将原来外部直接引入样式移动到组件内部引入，升级cc版本为0.0.8</li>
<li>添加step.component组件<br> 49.1 src/app/shared/step/step.component.ts</li>
<li>添加自定义验证器，正在完善中，目前示例参考修改密码功能<br> 50.1 src/app/shared/custom-validator/custom-validator.ts</li>
<li>添加qrcode.component组件<br> 51.1 src/app/shared/添加qrcode/qrcode.component.ts<br> 51.2 配置参考<a href="https://github.com/neocotic/qrious" rel="nofollow noreferrer" target="_blank">https://github.com/neocotic/q...</a>
</li>
<li>environments配置文件添加domain（域名）属性，根据不同环境的配置请求后端api</li>
<li>添加proxy.config.json配置文件，有需要代理的自行在package.json的start中添加--proxy-config proxy.config.json</li>
<li>添加email验证器</li>
<li>添加url与number验证器</li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于angular4+ng-bootstrap+bootstrap+scss的后台管理系统界面

## 原文链接
[https://segmentfault.com/a/1190000011562305](https://segmentfault.com/a/1190000011562305)

