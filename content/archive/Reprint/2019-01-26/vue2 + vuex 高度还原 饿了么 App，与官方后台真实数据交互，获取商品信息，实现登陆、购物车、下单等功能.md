---
title: 'vue2 + vuex 高度还原 饿了么 App，与官方后台真实数据交互，获取商品信息，实现登陆、购物车、下单等功能' 
date: 2019-01-26 2:30:18
hidden: true
slug: 3xeyh0d2024
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">前言</h1>
<p>vue2的发布后自己也研究了一段时间，奈何公司的技术栈是以react为主，没有机会好好利用vue2去做一个完整的项目。虽然写了几个demo，但和写一个完整的项目还是有很大差别的。于是自己想着用空余的时间写一个项目，选择了饿了么也只是因为经常用，熟悉它的布局。之前的饿了么官网是用angular写的，最近才发现原来这段时间改成了vue，看来饿了么也入了vue的坑。</p>
<p>既然要写一个完整的项目，就要认真对待，所以除了付款其他所有功能都尽可能的实现，包括登陆、注册、个人中心、搜索、购物车、下单等等，也包括所有我能注意到的细节也都一并做出来，所以这绝对算是一个比较大的项目。</p>
<p>项目不使用模拟数据，所有数据均使用从官网实时获取的真实数据，最大程度实现和官网一样的功能，所以首先遇到的问题是跨域，我们启动本地服务器是获取不到官网数据的，这是跨域的。当然解决的方法很多，jsonp，nginx反向代理，webpack-dev-server的proxy，这里我用的是 http-proxy-middleware 原理都是一样的。</p>
<p><strong>注：此项目纯属个人瞎搞，正常下单请选择饿了么官方客户端。</strong></p>
<h1 id="articleHeader1">源码地址：</h1>
<p><a href="https://github.com/bailicangdu/vue2-elm" rel="nofollow noreferrer" target="_blank">https://github.com/bailicangdu/vue2-elm</a></p>
<h1 id="articleHeader2">效果演示</h1>
<h5>(演示效果为模拟数据，只做展示用，真实效果请下载项目并运行，即可获取真实的官网数据);</h5>
<p><a href="http://test.fe.ptdev.cn/elm/" rel="nofollow noreferrer" target="_blank">demo地址</a>（请用chrome手机模式预览）</p>
<h4>移动端扫描下方二维码</h4>
<p><span class="img-wrap"><img data-src="http://test.fe.ptdev.cn/elm/screenshots/elm_ewm.png" src="https://static.alili.techhttp://test.fe.ptdev.cn/elm/screenshots/elm_ewm.png" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader3">技术栈</h1>
<p>vue2 + vue-rotuer2 + vuex + webpack + ES6/7 + fetch + sass + flex + svg + http-proxy-middleware反向代理</p>
<h1 id="articleHeader4">目标功能</h1>
<p>定位功能 -- 完成</p>
<ul>
<li><p>选择城市 -- 完成</p></li>
<li><p>搜索地址 -- 完成</p></li>
<li><p>展示所选地址附近商家列表 -- 完成</p></li>
<li><p>搜索美食，餐馆 -- 完成</p></li>
<li><p>根据距离、销量、评分、特色菜、配送方式等进行排序和筛选 -- 完成</p></li>
<li><p>餐馆食品列表页 -- 完成</p></li>
<li><p>购物车功能 -- 完成</p></li>
<li><p>店铺评价页面 -- 完成</p></li>
<li><p>单个食品详情页面 -- 完成</p></li>
<li><p>商家详情页 -- 完成</p></li>
<li><p>登陆、注册 -- 完成</p></li>
<li><p>修改密码 -- 完成</p></li>
<li><p>个人中心 -- 完成</p></li>
<li><p>发送短信、语音验证 -- 完成</p></li>
<li><p>下单功能 -- 完成 ✨✨??</p></li>
<li><p>订单列表 -- 完成</p></li>
<li><p>订单详情 -- 完成</p></li>
<li><p>帐户信息</p></li>
<li><p>上传头像，修改用户名</p></li>
<li><p>积分商城</p></li>
<li><p>服务中心</p></li>
<li><p>添加、删除、修改收货地址</p></li>
<li><p>付款(很难实现)</p></li>
</ul>
<h1 id="articleHeader5">项目布局</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="|-- build                            // webpack配置文件
|-- config                           // 项目打包路径
|-- elm                                // 上线项目文件，放在服务器即可正常访问
|-- screenshots                      // 项目截图
|-- src                              // 源码目录
|   |-- components                   // 组件
|       |-- common                   // 公共组件
|            |-- buyCart.js           // 购物车组件
|            |-- loading.js           // 页面初始化加载数据的动画组件
|            |-- mixin.js             // 组件混合(包括：指令-下拉加载更多，处理图片地址)
|            |-- ratingStar.js        // 评论的五颗星组件
|            |-- shoplist.js          // msite和shop页面的餐馆列表公共组件
|       |-- footer                   // 底部公共组件
|       |-- header                      // 头部公共组件
|   |-- config                       // 基本配置
|       |-- env.js                   // 环境切换配置
|       |-- fetch.js                 // 获取数据
|       |-- mUtils.js                // 常用的js方法
|       |-- rem.js                   // px转换rem
|   |-- images                       // 公共图片
|   |-- pages                        // 页面组件
|       |-- city                     // 当前城市页
|        |-- food                      // 食品筛选排序页
|        |-- confirmOrder             // 确认订单页
|          |--children
|            |--invoice                 //    选择发票页
|            |--remark                 //    订单备注页
|            |--payment                 //    付款页
|            |--userValidation         //    用户验证页
|            |--chooseAddress         //    选择地址页
|              |--children
|                |--addAddress        //    添加地址页
|                  |--children
|                    |--searchAddress // 搜索地址页
|       |-- find                     // 发现页
|       |-- forget                   // 忘记密码，修改密码页
|       |-- home                     // 首页
|       |-- login                    // 登陆注册页
|       |-- msite                    // 商铺列表页
|       |-- order                    // 订单列表页
|            |--children
|                |--orderDetail         // 订单详情页
|       |-- profile                  // 个人中心
|            |--children
|                |--balance             // 我的余额
|                |--benefit             // 我的优惠
|                |--info                 // 帐户信息
|                |--points             // 我的积分
|                |--service             // 服务中心
|       |-- search                   // 搜索页
| &nbsp; &nbsp; &nbsp; |-- shop &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // 商铺筛选页
|            |-- children             
|                  |-- foodDetail       // 商铺信息页     
|                  |-- shopDetail       // 单个商铺信息页
|                    |-- children             
|                          |-- shopSafe // 商铺认证信息页     
|       |-- vipcard                  // vip办理页
|
|   |-- plugins                      // 引用的插件
|
|   |-- router                       // 路由配置
|
|   |-- service                      // 数据交互统一调配
|        |-- template                 // 开发阶段的临时数据
|        |-- getData.js               // 获取数据的统一调配文件，对接口进行统一管理
|
|   |-- store                        // vuex的状态管理
|       |-- modules                  // store模块
|       |-- action.js                // 配置actions
|       |-- getters.js               // 配置getters
|       |-- index.js                 // 引用vuex，创建store
|       |-- mutation-types.js        // 定义常量muations名
|       |-- mutations.js             // 配置mutations
|
|   |-- style                        // 各种样式文件
|       |-- common.scss              // 公共样式文件
| &nbsp; &nbsp; &nbsp; |-- mixin.scss &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // 样式配置文件
|
|   |-- App.vue                      // 页面入口文件
|
|   |-- main.js                      // 程序入口文件，加载各种公共组件
|
|-- .babelrc                         // ES6语法编译配置
|-- .editorconfig                    // 代码编写规格
|-- .gitignore                       // 忽略的文件
|-- favicon.ico                      // 页面左上角小图标
|-- index.html                       // 入口html文件
|-- package.json                     // 项目及工具的依赖配置文件
|-- README.md                        // 说明" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gherkin"><code>|<span class="hljs-string">-- build                            // webpack配置文件
</span>|<span class="hljs-string">-- config                           // 项目打包路径
</span>|<span class="hljs-string">-- elm                                // 上线项目文件，放在服务器即可正常访问
</span>|<span class="hljs-string">-- screenshots                      // 项目截图
</span>|<span class="hljs-string">-- src                              // 源码目录
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- components                   // 组件
</span>|<span class="hljs-string">       </span>|<span class="hljs-string">-- common                   // 公共组件
</span>|<span class="hljs-string">            </span>|<span class="hljs-string">-- buyCart.js           // 购物车组件
</span>|<span class="hljs-string">            </span>|<span class="hljs-string">-- loading.js           // 页面初始化加载数据的动画组件
</span>|<span class="hljs-string">            </span>|<span class="hljs-string">-- mixin.js             // 组件混合(包括：指令-下拉加载更多，处理图片地址)
</span>|<span class="hljs-string">            </span>|<span class="hljs-string">-- ratingStar.js        // 评论的五颗星组件
</span>|<span class="hljs-string">            </span>|<span class="hljs-string">-- shoplist.js          // msite和shop页面的餐馆列表公共组件
</span>|<span class="hljs-string">       </span>|<span class="hljs-string">-- footer                   // 底部公共组件
</span>|<span class="hljs-string">       </span>|<span class="hljs-string">-- header                      // 头部公共组件
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- config                       // 基本配置
</span>|<span class="hljs-string">       </span>|<span class="hljs-string">-- env.js                   // 环境切换配置
</span>|<span class="hljs-string">       </span>|<span class="hljs-string">-- fetch.js                 // 获取数据
</span>|<span class="hljs-string">       </span>|<span class="hljs-string">-- mUtils.js                // 常用的js方法
</span>|<span class="hljs-string">       </span>|<span class="hljs-string">-- rem.js                   // px转换rem
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- images                       // 公共图片
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- pages                        // 页面组件
</span>|<span class="hljs-string">       </span>|<span class="hljs-string">-- city                     // 当前城市页
</span>|<span class="hljs-string">        </span>|<span class="hljs-string">-- food                      // 食品筛选排序页
</span>|<span class="hljs-string">        </span>|<span class="hljs-string">-- confirmOrder             // 确认订单页
</span>|<span class="hljs-string">          </span>|<span class="hljs-string">--children
</span>|<span class="hljs-string">            </span>|<span class="hljs-string">--invoice                 //    选择发票页
</span>|<span class="hljs-string">            </span>|<span class="hljs-string">--remark                 //    订单备注页
</span>|<span class="hljs-string">            </span>|<span class="hljs-string">--payment                 //    付款页
</span>|<span class="hljs-string">            </span>|<span class="hljs-string">--userValidation         //    用户验证页
</span>|<span class="hljs-string">            </span>|<span class="hljs-string">--chooseAddress         //    选择地址页
</span>|<span class="hljs-string">              </span>|<span class="hljs-string">--children
</span>|<span class="hljs-string">                </span>|<span class="hljs-string">--addAddress        //    添加地址页
</span>|<span class="hljs-string">                  </span>|<span class="hljs-string">--children
</span>|<span class="hljs-string">                    </span>|<span class="hljs-string">--searchAddress // 搜索地址页
</span>|<span class="hljs-string">       </span>|<span class="hljs-string">-- find                     // 发现页
</span>|<span class="hljs-string">       </span>|<span class="hljs-string">-- forget                   // 忘记密码，修改密码页
</span>|<span class="hljs-string">       </span>|<span class="hljs-string">-- home                     // 首页
</span>|<span class="hljs-string">       </span>|<span class="hljs-string">-- login                    // 登陆注册页
</span>|<span class="hljs-string">       </span>|<span class="hljs-string">-- msite                    // 商铺列表页
</span>|<span class="hljs-string">       </span>|<span class="hljs-string">-- order                    // 订单列表页
</span>|<span class="hljs-string">            </span>|<span class="hljs-string">--children
</span>|<span class="hljs-string">                </span>|<span class="hljs-string">--orderDetail         // 订单详情页
</span>|<span class="hljs-string">       </span>|<span class="hljs-string">-- profile                  // 个人中心
</span>|<span class="hljs-string">            </span>|<span class="hljs-string">--children
</span>|<span class="hljs-string">                </span>|<span class="hljs-string">--balance             // 我的余额
</span>|<span class="hljs-string">                </span>|<span class="hljs-string">--benefit             // 我的优惠
</span>|<span class="hljs-string">                </span>|<span class="hljs-string">--info                 // 帐户信息
</span>|<span class="hljs-string">                </span>|<span class="hljs-string">--points             // 我的积分
</span>|<span class="hljs-string">                </span>|<span class="hljs-string">--service             // 服务中心
</span>|<span class="hljs-string">       </span>|<span class="hljs-string">-- search                   // 搜索页
</span>|<span class="hljs-string"> &nbsp; &nbsp; &nbsp; </span>|<span class="hljs-string">-- shop &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // 商铺筛选页
</span>|<span class="hljs-string">            </span>|<span class="hljs-string">-- children             
</span>|<span class="hljs-string">                  </span>|<span class="hljs-string">-- foodDetail       // 商铺信息页     
</span>|<span class="hljs-string">                  </span>|<span class="hljs-string">-- shopDetail       // 单个商铺信息页
</span>|<span class="hljs-string">                    </span>|<span class="hljs-string">-- children             
</span>|<span class="hljs-string">                          </span>|<span class="hljs-string">-- shopSafe // 商铺认证信息页     
</span>|<span class="hljs-string">       </span>|<span class="hljs-string">-- vipcard                  // vip办理页
</span>|
|<span class="hljs-string">   </span>|<span class="hljs-string">-- plugins                      // 引用的插件
</span>|
|<span class="hljs-string">   </span>|<span class="hljs-string">-- router                       // 路由配置
</span>|
|<span class="hljs-string">   </span>|<span class="hljs-string">-- service                      // 数据交互统一调配
</span>|<span class="hljs-string">        </span>|<span class="hljs-string">-- template                 // 开发阶段的临时数据
</span>|<span class="hljs-string">        </span>|<span class="hljs-string">-- getData.js               // 获取数据的统一调配文件，对接口进行统一管理
</span>|
|<span class="hljs-string">   </span>|<span class="hljs-string">-- store                        // vuex的状态管理
</span>|<span class="hljs-string">       </span>|<span class="hljs-string">-- modules                  // store模块
</span>|<span class="hljs-string">       </span>|<span class="hljs-string">-- action.js                // 配置actions
</span>|<span class="hljs-string">       </span>|<span class="hljs-string">-- getters.js               // 配置getters
</span>|<span class="hljs-string">       </span>|<span class="hljs-string">-- index.js                 // 引用vuex，创建store
</span>|<span class="hljs-string">       </span>|<span class="hljs-string">-- mutation-types.js        // 定义常量muations名
</span>|<span class="hljs-string">       </span>|<span class="hljs-string">-- mutations.js             // 配置mutations
</span>|
|<span class="hljs-string">   </span>|<span class="hljs-string">-- style                        // 各种样式文件
</span>|<span class="hljs-string">       </span>|<span class="hljs-string">-- common.scss              // 公共样式文件
</span>|<span class="hljs-string"> &nbsp; &nbsp; &nbsp; </span>|<span class="hljs-string">-- mixin.scss &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // 样式配置文件
</span>|
|<span class="hljs-string">   </span>|<span class="hljs-string">-- App.vue                      // 页面入口文件
</span>|
|<span class="hljs-string">   </span>|<span class="hljs-string">-- main.js                      // 程序入口文件，加载各种公共组件
</span>|
|<span class="hljs-string">-- .babelrc                         // ES6语法编译配置
</span>|<span class="hljs-string">-- .editorconfig                    // 代码编写规格
</span>|<span class="hljs-string">-- .gitignore                       // 忽略的文件
</span>|<span class="hljs-string">-- favicon.ico                      // 页面左上角小图标
</span>|<span class="hljs-string">-- index.html                       // 入口html文件
</span>|<span class="hljs-string">-- package.json                     // 项目及工具的依赖配置文件
</span>|<span class="hljs-string">-- README.md                        // 说明</span></code></pre>
<h1 id="articleHeader6">总结</h1>
<p>1、因为并不是elm官方，而且因为要开代理，必须在pc端打开，所以预计最多只能做到下单这一步，下单成功后可以在手机客户端查看并付款。</p>
<p>2、目前下单功能已经实现✨✨??，下单功能完全采用官网真实数据，可以控制官网发短信或者打电话到指定的手机号码，下单后可以在手机App中查看并且付款。</p>
<p>3、一般涉及到money的网页逻辑都比较复杂，尤其像饿了么这样一个开放的平台，商家和食品种类繁多，页面与页面之间交互复杂，在写到 购物车 和 下单 功能时众多的数据和逻辑一度让人很头疼，又没有设计和接口文档，只能一步步摸索。</p>
<p>4、vue因其轻量级的框架在中小型项目中表现亮眼，在大型单页面应用中因为vuex的存在，表现依然出色，在处理复杂交互逻辑的时候，vuex的存在是不可或缺的。所以说利用 vue + vuex 完全可以去做大型的单页面项目。</p>
<p>5、在项目中并没有使用太多的插件，所有功能尽可能自己实现，对插件依赖太多并不是一件好事。</p>
<p>6、项目写到现在，从 登陆注册到、首页、搜索、商家列表、购物车、下单、订单列表、个人中心 一个流程走完之后、不但对vue的理解更深一层，而且对以后掌控大型项目的时候也有非常多的帮助，做一个实际的项目才能对自己有很大的提升。</p>
<p>7、项目已完成的页面共 22 个，最主要的购物下单功能已经实现，预计全部完成后总页面数在 35 个左右。</p>
<h1 id="articleHeader7">项目截图</h1>
<h2 id="articleHeader8">城市列表页</h2>
<p><span class="img-wrap"><img data-src="http://test.fe.ptdev.cn/elm/screenshots/home.gif" src="https://static.alili.techhttp://test.fe.ptdev.cn/elm/screenshots/home.gif" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader9">搜索地址页</h2>
<p><span class="img-wrap"><img data-src="http://test.fe.ptdev.cn/elm/screenshots/city.gif" src="https://static.alili.techhttp://test.fe.ptdev.cn/elm/screenshots/city.gif" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader10">商铺列表页</h2>
<p><span class="img-wrap"><img data-src="http://test.fe.ptdev.cn/elm/screenshots/msite.gif" src="https://static.alili.techhttp://test.fe.ptdev.cn/elm/screenshots/msite.gif" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader11">商铺筛选页</h2>
<p><span class="img-wrap"><img data-src="http://test.fe.ptdev.cn/elm/screenshots/food.gif" src="https://static.alili.techhttp://test.fe.ptdev.cn/elm/screenshots/food.gif" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader12">搜索页</h2>
<p><span class="img-wrap"><img data-src="http://test.fe.ptdev.cn/elm/screenshots/search.gif" src="https://static.alili.techhttp://test.fe.ptdev.cn/elm/screenshots/search.gif" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader13">餐馆食品列表与购物车</h2>
<p><span class="img-wrap"><img data-src="http://test.fe.ptdev.cn/elm/screenshots/shop_cart.gif" src="https://static.alili.techhttp://test.fe.ptdev.cn/elm/screenshots/shop_cart.gif" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader14">餐馆评论页</h2>
<p><span class="img-wrap"><img data-src="http://test.fe.ptdev.cn/elm/screenshots/rating.gif" src="https://static.alili.techhttp://test.fe.ptdev.cn/elm/screenshots/rating.gif" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader15">餐馆信息页</h2>
<p><span class="img-wrap"><img data-src="http://test.fe.ptdev.cn/elm/screenshots/shopDetail.gif" src="https://static.alili.techhttp://test.fe.ptdev.cn/elm/screenshots/shopDetail.gif" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader16">登陆页</h2>
<p><span class="img-wrap"><img data-src="http://test.fe.ptdev.cn/elm/screenshots/login.gif" src="https://static.alili.techhttp://test.fe.ptdev.cn/elm/screenshots/login.gif" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader17">个人中心</h2>
<p><span class="img-wrap"><img data-src="http://test.fe.ptdev.cn/elm/screenshots/profile.gif" src="https://static.alili.techhttp://test.fe.ptdev.cn/elm/screenshots/profile.gif" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader18">确认订单页</h2>
<p><span class="img-wrap"><img data-src="http://test.fe.ptdev.cn/elm/screenshots/confrimOrder.gif" src="https://static.alili.techhttp://test.fe.ptdev.cn/elm/screenshots/confrimOrder.gif" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader19">订单列表页</h2>
<p><span class="img-wrap"><img data-src="http://test.fe.ptdev.cn/elm/screenshots/order.gif" src="https://static.alili.techhttp://test.fe.ptdev.cn/elm/screenshots/order.gif" alt="" title="" style="cursor: pointer;"></span></p>
<h5>其他页面正在开发中。。。</h5>
<h1 id="articleHeader20">最后</h1>
<blockquote>
<p>本项目主要用于熟悉如何用 vue2 构建一个中大型项目</p>
<p>vue在开发的过程中的体验很不错，上手快、运行效率高，饿了么从angular转向vue不是没有道理的，看来vue会越来越火</p>
<p>开发环境 macOS 10.12.3  Chrome 55</p>
<p>另外推荐一个 react + redux 开源项目，对react感兴趣的朋友赶紧去看看。<a href="https://github.com/bailicangdu/react-pxq" rel="nofollow noreferrer" target="_blank">地址在这里</a></p>
</blockquote>
<h5>个人时间有限，还有其他的项目要做，在此感谢辰妹子，个人中心的所有页面都由她来完成，辛苦了！?</h5>
<h5>如果觉得不错，请star一下吧 ?</h5>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue2 + vuex 高度还原 饿了么 App，与官方后台真实数据交互，获取商品信息，实现登陆、购物车、下单等功能

## 原文链接
[https://segmentfault.com/a/1190000008428038](https://segmentfault.com/a/1190000008428038)

