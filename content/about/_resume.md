---
title: 个人简历
date: 2016-05-27 14:31:51
hidden: true
---

# 联系方式

- Email：incomparable9527@foxmail.com
<!-- - 电  话：15658001769 -->

---

# 个人信息

 - Fan/男/1992
 <!-- - 工作年限：5年 -->
 - 技术博客：http://alili.tech 
 - Github：https://github.com/Fantasy9527
 - 期望职位：前端开发工程师
 - 期望城市：杭州

---

# 工作经历

## 金诚集团 （ 2017年7月 ~ 2018年7月 ）
>  任职为信息技术部研发五局前端团队负责人.主要负责前端内部系统的开发,部门前端规范的制定，组建团队,提高团队工作效率,前端架构设计.以及公司的前端工具的基础建设.

* 汇报对象: 信息技术部 研发五局 高级经理 
* 下属: 12人


### 金诚人后台管理系统 
用于管理公司组织架构,人员信息,招聘,薪资,福利,绩效,考勤,股权管理等数据

应用类型: 单页面后台管理系统

前端技术概要: React + Ant Design of React + `微前端架构`

项目简介:
该项目为公司重点项目,开发人数与产品线多,周期长.最终以`微前端`的形式开发该项目.
`微前端`解决了以下难题:
* 杜绝了代码量超多的日后成为巨无霸项目
* 日后不限于最初技术选型
* 项目能选择多种技术框架
* 规避了多团队同时开发,部署产生相互影响

### OTRS工单管理系统二次开发 (金诚助手)
OTRS工单管理系统,多用于内部服务部门的工单派发与统计.
后在部门开发资源紧缺的情况下用Nodejs对该系统做了二次开发.

后端技术概要: Perl + Nodejs (Egg) + MySQL + Redis
前端技术概要: Vue + Vuex + Hybrid

项目简介:
国内Perl开发者比较稀缺,信息技术部众多服务部门的工单管理依赖于OTRS工单管理系统.
在开发资源极度紧缺的情况下,我用Nodejs对该系统做了二次开发.
最终该系统做成了,公司IT运维部门,IT基础架构部门,人事部门,财务部门,法务部门,行政部门等等,面相员工的服务工单管理系统.
前端页面以Hybrid的形式嵌在公司App中,方便所有公司员工使用.

### 内部股权管理 (基于以太坊开发的区块链项目)
基于以太坊开发的股权管理项目.
技术概要: Solidity + Nodejs (Egg) + Web3.js

项目简介:
为保证公司内部股权交易数据的安全性,所以用以太坊开发内部期权相关模块.
最终选用Solidity开发以太坊智能合约,Nodejs与Web3.js为中间层与用户交互.

### 内部前端脚手架自动化管理工具
基于Nodejs开发的命令行工具.
结合内部私有npm服务器,用于管理React,Angular,Nodejs相关项目的脚手架.

项目简介:
部门有大量项目启动,为了快速启动项目所以开发了该工具.
最终有利于所有项目的架构保持一致与统一.
降低项目与项目之间人员调配后的后期学习成本.
开发时可快速的生成代码模板,并且快速进入开发状态.


### 其他项目
- 行政后台管理系统 
- 招商采购后台管理系统 
- 内部培训后台管理系统
- 档案后台管理系统 
- ESB企业服务总线的数据可视化

### 基础建设与其他事项
- 搭建公司内部私有Npm服务器
- 搭建部门前端团队的博客
- 每周组织前端高质量的分享学习活动
- 搭建内部Mock系统


## 深圳市彩虹云宝网络有限公司 （ 2014年12月 ~ 2017年3月 ）
> 公司前端团队负责人,负责公司前端规范的制定，组建前端团队。所有的前端项目核心代码的编写,以及项目工程化的相关工作。

* 汇报对象: 技术总监 

* 下属: 4人


### 食通宝后台管理系统
用于餐馆数据、菜品数据、促销活动、会员卡、微信公众平台配置 ,餐馆营业报表的统计展示,餐馆营业实时数据展示

应用类型:SPA 单页面应用

本项目一共有将近200个页面。 为了更好的组织代码,本人做了以下处理:

* 所有的代码文件,根据业务类型分类。

* 基于Angularjs兼容了旧的Ractive.js

* 基于 requirejs,Angularjs实现了按需加载。 并且实现了Angularjs官方没有实现的第三方模块热加载功能。不会因为Angularjs启动时就加载所有第三方模块，导致首页加载极慢。

* 基于自动化工具,提取Angularjs所有的html模板文件合并到一个js文件里（200多个页面的模板合并后，加上Gzip的压缩只有100k+，文件体积是可以接受的）。当页面加载时，会把所有模板注入到Angularjs。

* 当切换页面的时候，每个页面只会加载一个很小的js文件（业务代码）。因为减少了模板文件请求，提升了所有的页面加载速度。

* bower管理第三方库。用Grunt以及其插件实现代码的压缩,合并,丑化,自动依赖注入,编译less,postcss,文件名添加MD5后缀,自动构建压缩 zip,自动上传部署, 等一系列任务。

最终只要一个命令的持续集成。


本地开发时,运用Grunt实现了非常智能的请求代理功能 (比webpack的代理要好用灵活非常多) 前端开发的电脑上不需要安装任何的后台服务,新同事从Github上clone项目下来,

运行一下命令便可启动整个前端项目：
```
npm install //安装npm依赖

npm start // 映射的是grunt serve
```

最终实现了：

* 不需要配置CORS跨域（因为大量的option请求看着很糟心）。
* 不需要mock。
* 可以随意配置数据源
* 随时随地，任意电脑直接开发

运用 echarts 做数据的可视化。
使用 webscoket 实现了门店的实时数据的展示。

使用的主要开源库与工具有: 
* AngularJs
* echarts 
* jQuery
* RequireJs
* Bootstrap 
* Grunt 
* Bower 
* Ractive.js



### 食通宝微信(支付宝)点餐 （2015.12 ~ 2017.03）
所有的前端功能的设计与开发

应用类型:移动端 SPA 单页面应用

这次项目我最满意地方是: 

 为了在移动端保证更快的加载速度,去除了除 AngularJs,RequireJs 以外的所有插件。 代码合并压缩 gzip 之后不超过70k。 并且使用了 application cahe,缓存了很多经常使用的资源。 加载速度又一次得到了一定的提升

功能运用场景: 餐厅的餐桌贴上特制的二维码,可以直接可以用微信(支付宝)扫一扫直接进行点菜,加菜,支付的一系列操作。

使用的主要开源库与工具有: 

* AngularJs
* RequireJs
* Grunt
* Bower

### 其他项目

- 食通宝融合支付/微信与支付宝 (2017年2月 ~ 2017年3月)

- 食通宝进销存管理系统 (2016年10月 ~ 2017年3月)

- 食通宝运营支撑系统 (2016年4月 ~ 2017年3月)

- 食通宝微信会员 (2015年7月 ~ 2017年3月)

- 食通宝老板助手 (2017年2月 ~ 2017年3月)

- 食通宝打赏小二 (2015年8月 ~ 2015年11月)

- 食通宝pad电子菜单 (2017年2月 ~ 2017年3月)

 
## 广西易谷网络科技有限公司 （ 2013年7月 ~ 2014年9月 ）

### 大愿说法佛经电子书
一款嵌入ios的web电子书应用,基于Javascript开发了一套文字图片高速自动排版引擎.

---


## 开源项目

 - [lotusjs-cli](https://fantasy9527.github.io/lotusjs-cli/#/)：前端通用脚手架管理工具
 - [lotus-scaffold-micro-frontend-portal](https://github.com/Fantasy9527/lotus-scaffold-micro-frontend-portal) : 微前端动态模块加载器
 - [micro-auto-config](https://github.com/Fantasy9527/micro-auto-config) : 微前端配置自动化工具
 - [lotus-scaffold-micro-antd](https://github.com/Fantasy9527/lotus-scaffold-micro-antd) : 微前端Antd脚手架
 - [lotus-scaffold-micro-react](https://github.com/Fantasy9527/lotus-scaffold-micro-react) : 微前端React脚手架
 - [lotus-scaffold](https://github.com/Fantasy9527/lotus-scaffold) : 脚手架初始化工具
 - [everygreen](https://github.com/Fantasy9527/everygreen)：Hack github contribution,让你的contribution面板一绿到底
 - [AliToSingn](https://github.com/Fantasy9527/AliToSign) :基于nodejs的阿里云API签名生成工具


# 技能清单
以下均为我熟练使用的技能

- 前端框架：React/AngularJS/Angular2.0+/Vue
- 前端工具：Bower/Grunt/Less/webpack/create-react-app/vue-cli/angular-cli
- UI框架：Antd for React/NG-ZORRO/Angularstrap/vux/ElementUI/bootstrap/weUI
- 后台框架：Express/Egg.js/Feather
- 数据库 ：Mysql / MongoDB

---
## 自我评价

5年WEB前端开发经验。3年团队管理经验.

5年时间里带领团队完成众多项目,期间踩过无数技术坑与人员管理的坑.

近两三年来一直致力于项目的高度工程化,自动化的探索与实践.

也在十几名前端开发人员同时开发的大型项目中,完成了`前端微服务化`的构想与落地.

进而摆脱了当前前端技术栈的限制. 解决了大项目中多条产品线并行开发,部署的众多问题.

在金诚集团期间,带领团队完成了众多高难度项目,解决了众多技术与开发效率的问题.

也参与了公司的区块链项目的开发.

希望可以遇到更有挑战性的工作,经历更多有趣的事情.

---

# 致谢
感谢您花时间阅读
期待能有机会与您共事。
