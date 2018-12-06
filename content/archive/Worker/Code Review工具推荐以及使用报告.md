---
title: Code Review工具推荐以及使用报告
tags: 
- Code Review
slug: cf2c83a
Keywords: 
  - Code Review
  - 使用报告
  - 工具推荐
date: 2018-11-12 00:00:00
---

随之团队的扩大，统一编码规范，提高编码质量，变得尤为重要。代码审查作为可以有效提高代码质量的方式之一,有必要在公司推行代码审查制度.
让团队养成代码审查的习惯,提高代码质量,提前规避不必要的问题. 

为了更加高效的代码审核,需要一款代码审查工具.所以才有了这份使用报告.

下面是我在使用中,尝试使用的一些工具.以及一些使用上的评价与总结.

### 1) [CodeStriker](http://codestriker.sourceforge.net/index.html "best code review tools for programmers ")

CodeStriker免费和开源的web应用程序,可以帮助开发人员基于web的代码审查。开发者canensures问题,评论和决策是记录在一个数据库,并提供一个舒适的工作空间实际执行代码检查。

[![技术分享](http://i0.wp.com/devzum.com/wp-content/uploads/2015/04/codestriker-e1427936836285.png?resize=600%2C480)](http://i0.wp.com/devzum.com/wp-content/uploads/2015/04/codestriker-e1427936836285.png)

- 价格: 免费
- UI交互: ★
- 安装维护 :★★★
- 易学程度: ★★★★★

> 总结: CodeStriker 对于一个代码审查工具来说,功能上已经可以基本满足.但是因为开发时间太过久远,已经很长时间没有人在维护了,而且UI比较有历史的味道.

### 2) [RhodeCode](https://rhodecode.com/ "best code review tools for programmers ")

RhodeCode也是一个很好的工具,回顾你的代码并找出代码中的bug和问题并删除后检查代码。

[![技术分享](http://i0.wp.com/devzum.com/wp-content/uploads/2015/04/rhodecode-e1427936979546.png?resize=600%2C375)](http://i0.wp.com/devzum.com/wp-content/uploads/2015/04/rhodecode-e1427936979546.png)

- 价格: 社区版本免费,企业版本收费
- UI交互: ★★★★
- 安装维护 :★★★
- 易学程度: ★★★★★

> 总结: RhodeCode在使用使用过程中,还是比较优秀的.工具的安装部署使用docker也比较方便.使用上比较顺畅,可以作为使用的备选软件.

### 3) [Code Brag](http://codebrag.com/ "best code review tools for programmers ")

Codebrag是一个简单的和轻量级的工具,代码审查,让这一过程为您的团队工作。它有助于解决一些问题像非阻塞的代码评审,智能电子邮件通知,内联注释,喜欢得多。

[![技术分享](http://i0.wp.com/devzum.com/wp-content/uploads/2015/04/codeberg-e1427937091542.png?resize=600%2C375)](http://i0.wp.com/devzum.com/wp-content/uploads/2015/04/codeberg-e1427937091542.png)

- 价格: 免费
- UI交互: ★★★★
- 安装维护 :★★★★
- 易学程度: ★★★★★

> 总结: Codebrag 是一款开源工具,安装起来不算难.也有一定程度上的社交属性.在使用期间官网在国内打不开,软件的安装资源不是很好获取.

### 4) [Phabricator](http://phabricator.org/ "best code review tools for programmers ")

Phabricator是一个开源软件和web应用程序包括代码评审,主持GIT / Hg / SVN,发现错误时,浏览源代码和审计等

[![技术分享](http://i0.wp.com/devzum.com/wp-content/uploads/2015/04/pfabricator1-e1427937361221.png?resize=600%2C375)](http://i0.wp.com/devzum.com/wp-content/uploads/2015/04/pfabricator1-e1427937361221.png)

- 价格: 免费
- UI交互: ★★★★
- 安装维护 :★
- 易学程度: ★

> 总结: Phabricator 是一款非常强大的工具,是facebook做的.安装是在太难,网上的安装使用文档就有140多页.使用的学习成本也需要一定的时间. 

### 5) [Codifferous](https://codifferous.com/ "best code review tools for programmers ")

这是更快的代码评审服务,Codifferous是免费的代码审查工具。Codifferous便于评审代码与您的团队,无论你住在哪里当你工作。

[![技术分享](http://i2.wp.com/devzum.com/wp-content/uploads/2015/04/codifferous-e1427937449256.png?resize=600%2C375)](http://i2.wp.com/devzum.com/wp-content/uploads/2015/04/codifferous-e1427937449256.png)

- 价格: 免费
- UI交互: ★★★★
- 安装维护 :★★★
- 易学程度: ★★★★

> 总结: Codifferous 官网国内打不开,翻墙体验过demo之后,工具比较简单,用起来没有什么问题.也没有太多优点.

### 6) [Getbarkeep](http://getbarkeep.org/ "best code review tools for programmers ")

Barkeep 是“友好的代码评审系统”——一种快速、有趣的方式检查代码。工程组织可以用它来保持高质量栏。通过它你可以看到提交任何Git存储库,看到差别,写评论,这些评论电邮给你的提交者。

[![技术分享](http://i1.wp.com/devzum.com/wp-content/uploads/2015/04/getbarkeep-e1427937557909.png?resize=600%2C375)](http://i1.wp.com/devzum.com/wp-content/uploads/2015/04/getbarkeep-e1427937557909.png)

- 价格: 免费
- UI交互: ★★★★
- 安装维护 :★★★
- 易学程度: ★★★★

> 总结: Barkeep 是一款开源工具,UI简洁,没有太多亮点也没有太多缺点.官网不好打开.资源获取的不是很容易.

### 7) [Crucible](https://www.atlassian.com/software/crucible/overview "best code review tools for programmers ")

Crucible 是另一个最受欢迎的代码复查工具对于开发人员来说,它提供评审代码,讨论修改,并确定缺陷与坩埚的灵活评估工作流。它的代码评审容易颠覆,CVS,必然等等。

[![技术分享](http://i2.wp.com/devzum.com/wp-content/uploads/2015/04/crucible-e1427937724181.png?resize=600%2C375)](http://i2.wp.com/devzum.com/wp-content/uploads/2015/04/crucible-e1427937724181.png)

- 价格: 收费
- UI交互: ★★★★
- 安装维护 :不需要安装
- 易学程度: ★★★★

> 总结: 大厂出品的工具,在使用了免费半之后,完全可以满足代码审查的需求.界面也比较漂亮,交互友好.官方在youtube上有出详细的英文使用教程.



### 8) [Code Review Tool](http://codereviewtool.com/ "best code review tools for programmers ")

Code Review Tool 允许团队成员评审代码协作和高效的方式通过移除大部分的开销定期正式的代码检查。它提供了所有正式的代码检查的好处,需要大大减少时间和精力而正式的代码检查。它同时支持正式和轻量级代码评审流程。

[![技术分享](http://i2.wp.com/devzum.com/wp-content/uploads/2015/04/codereviewtool-e1427937802564.png?resize=600%2C375)](http://i2.wp.com/devzum.com/wp-content/uploads/2015/04/codereviewtool-e1427937802564.png)

- 价格: 收费
- UI交互: ★
- 安装维护 :★★★
- 易学程度: ★★★★

> 总结: 这么丑的软件居然是个收费软件.而且还不便宜.


### 9) [Malevich](http://malevich.codeplex.com/ "best code review tools for programmers ")

审查代码马列 Malevich 的确实是很容易的。评论者可以看到原始的和在浏览器中文件的新版本。评论一行代码,他或她简单地点击这条线,并开始打字。提交评论让他们看到请求的代码复查的人,以及所有其他评论者。

[![技术分享](http://i1.wp.com/devzum.com/wp-content/uploads/2015/04/malevich-e1427937918164.png?resize=600%2C375)](http://i1.wp.com/devzum.com/wp-content/uploads/2015/04/malevich-e1427937918164.png)

- 价格: 免费
- UI交互: ★
- 安装维护 :★★★
- 易学程度: ★★★★

> 总结: 不能审查git仓库的代码

### 10) [SmartBear](http://smartbear.com/product/collaborator/overview/ "best code review tools for programmers ")

Collaborator 是一个代码审查工具,可以帮助开发、测试和管理团队共同努力,生成高质量的代码。它允许团队同行评审代码、用户故事和测试计划在一个透明的,协作框架——立即使整个团队保持速度对代码所做的更改。

[![技术分享](http://i0.wp.com/devzum.com/wp-content/uploads/2015/04/smartbear-e1427938021424.png?resize=600%2C375)](http://i0.wp.com/devzum.com/wp-content/uploads/2015/04/smartbear-e1427938021424.png)

- 价格: 收费
- UI交互: ★★★★
- 安装维护 :★★★
- 易学程度: ★★★★

> 总结: 代码审查绰绰有余,很多大厂都在使用.体验了demo之后感觉是一款非常优秀的工具.

### 11) [Veracode](http://www.veracode.com/security/code-review "best code review tools for programmers ")

Code review 是一个考试的计算机源代码。它的目的是找到并修复错误引入应用程序在开发阶段,提升软件的整体质量和开发人员的技能。代码评审等各种形式的程序做结对编程,非正式的次数,和正式的检查。

[![技术分享](http://i1.wp.com/devzum.com/wp-content/uploads/2015/04/veracode-e1427938137259.png?resize=600%2C375)](http://i1.wp.com/devzum.com/wp-content/uploads/2015/04/veracode-e1427938137259.png)

- 价格: 收费
- UI交互: ★★★★
- 安装维护 :★★★
- 易学程度: ★★★★

### 12) [Gerrit](https://code.google.com/p/gerrit/ "best code review tools for programmers ")

Gerrit 是一个基于web的代码评审系统,促进在线代码评审项目使用Git版本控制系统。

[![技术分享](http://i0.wp.com/devzum.com/wp-content/uploads/2015/04/gerrit-e1427938383133.png?resize=600%2C375)](http://i0.wp.com/devzum.com/wp-content/uploads/2015/04/gerrit-e1427938383133.png)

- 价格: 免费
- UI交互: ★★★★
- 安装维护 :★★★
- 易学程度: ★★★★

> 总结: 这是google的一款代码审查工具,UI已经是上古风格了.

### 13) [Review Assistant](https://visualstudiogallery.msdn.microsoft.com/9ef817b4-2c6d-4213-8b08-5be48f9d91b9 "best code review tools for programmers ")

Review assistant 很简单和更好的代码复查工具visual studio。

1)添加你的评论在审查级别,或特定源代码块或行。  
2)初始化代码与您的团队成员的讨论没有预定的会议。  
3)标记的评论和缺陷需要固定。  
4)评论显示在代码编辑器中。  
5)即时切换检查代码和注释。

[![技术分享](http://i1.wp.com/devzum.com/wp-content/uploads/2015/04/review-assistant-e1427938511235.png?resize=600%2C375)](http://i1.wp.com/devzum.com/wp-content/uploads/2015/04/review-assistant-e1427938511235.png)


- 价格: 免费
- UI交互: ★★★★
- 安装维护 :★★★
- 易学程度: ★★★★

> 总结: 需要结合开发工具,不适用我们现在的状况.

### 14) [Review Board](https://www.reviewboard.org/ "best code review tools for programmers ")

Review board 是更好的代码复查工具程序员节省时间,金钱和理智。你的代码是syntax-highlighted,更快的阅读。我们将向您展示功能一行,替换文本内改变了什么,等等。

[![技术分享](http://i1.wp.com/devzum.com/wp-content/uploads/2015/04/reviewboard-e1427938611206.png?resize=600%2C375)](http://i1.wp.com/devzum.com/wp-content/uploads/2015/04/reviewboard-e1427938611206.png)

- 价格: 免费
- UI交互: ★★★★
- 安装维护 :★★★
- 易学程度: ★★★★

> 总结: UI有点复古也有点小清新,使用了一下,功能是够用了的,可以作为备选.

### 15) [Peer Review Plugin](http://trac-hacks.org/wiki/PeerReviewPlugin "best code review tools for programmers ")

这个插件的目标是消除需要耗费时间代码评审会议通过给开发人员评审代码的能力在自己的时间在一个用户友好的网络环境。

[![技术分享](http://i1.wp.com/devzum.com/wp-content/uploads/2015/04/peerreviewplugin-e1427938775883.png?resize=600%2C375)](http://i1.wp.com/devzum.com/wp-content/uploads/2015/04/peerreviewplugin-e1427938775883.png)

- 价格: 免费
- UI交互: ★★★★
- 安装维护 :★★★
- 易学程度: ★★★★

> 总结: 不能审查git仓库的代码,不考虑使用.

### 16) [Codereview](https://codereview.appspot.com/ "best code review tools for programmers ")

[![技术分享](http://i0.wp.com/devzum.com/wp-content/uploads/2015/04/coderreview-e1427938967801.png?resize=600%2C375)](http://i0.wp.com/devzum.com/wp-content/uploads/2015/04/coderreview-e1427938967801.png)

- 价格: 免费
- UI交互: ★
- 安装维护 :★★★
- 易学程度: ★★★★

> 总结: 不能审查git仓库的代码,不考虑使用.

### 17) [Code Reviewer](https://codereviewer.org/ "best code review tools for programmers ")

CodeReviewer 是免费的,简单,易于部署和使用代码审查工具从SmartBear的公司发明了合作者,该行业的第一个商业代码审查工具。

[![技术分享](http://i2.wp.com/devzum.com/wp-content/uploads/2015/04/codereviwer-e1427939124157.png?resize=600%2C375)](http://i2.wp.com/devzum.com/wp-content/uploads/2015/04/codereviwer-e1427939124157.png)

- 价格: 免费
- UI交互: ★
- 安装维护 :★★★
- 易学程度: ★★★★

> 总结: 但是界面已经比较上古,对git支持不是很好

### 18) [Code Analysis Tool](http://www.castsoftware.com/products/code-analysis-tools "best code review tools for programmers ")

CAST code 把代码分析技术是针对解决两个基本问题。首先,大多数现代IT系统是由成千上万的组件,由多个团队和许多开发人员。测量软件质量在跨多个技术,这些系统需要仔细校准版本和明确的应用程序边界的识别

[![技术分享](http://i1.wp.com/devzum.com/wp-content/uploads/2015/04/code-tool-e1427939448703.png?resize=600%2C375)](http://i1.wp.com/devzum.com/wp-content/uploads/2015/04/code-tool-e1427939448703.png)

- 价格: 收费
- UI交互: ★★★
- 安装维护 :★★★
- 易学程度: ★

> 总结: 工具太过复杂,不适合在公司内部推广

### 19) [jArchitect](http://www.jarchitect.com/ "best code review tools for programmers ")

JArchitect 简化了管理一个复杂的Java代码库。分析代码结构,可以指定设计规则,做有效的代码审查和主进化通过比较不同版本的代码。

[![技术分享](http://i1.wp.com/devzum.com/wp-content/uploads/2015/04/jarcitect-e1427939616591.png?resize=600%2C375)](http://i1.wp.com/devzum.com/wp-content/uploads/2015/04/jarcitect-e1427939616591.png)

- 价格: 收费
- UI交互: ★★★
- 安装维护 :★★★
- 易学程度: ★

> 总结: 界面比较上古,文档完善,很多大公司在使用.

### 20) [Reviewable](https://reviewable.io/ "best code review tools for programmers ")

Reviewales 是新的代码审查工具,它有助于改善与语法突出显示的代码质量,发现bug /问题,使代码更好,干净的界面,定制代码字体和许多更多。

[![技术分享](http://i2.wp.com/devzum.com/wp-content/uploads/2015/04/reviewable-e1427939794960.png?resize=600%2C375)](http://i2.wp.com/devzum.com/wp-content/uploads/2015/04/reviewable-e1427939794960.png)

- 价格: 社区版本免费
- UI交互: ★★★★★
- 安装维护 :★★★
- 易学程度: ★★★★★

> 总结: 交互比较友好,安装使用docker也不麻烦.社区版本是免费的.可以考虑使用该工具

  
### 21) Gitlab

GitLab 是一个用于仓库管理系统的开源项目，使用Git作为代码管理工具，并在此基础上搭建起来的web服务,支持codereview.

- 价格: 社区版本免费
- UI交互: ★★★★★
- 安装维护 :★★★
- 易学程度: ★★★★★

> 总结: 目前公司已经在使用该工具,如果在该工具的基础上进行拓展.是一款不错的代码审查工具.对于团队的学习成本也比较低.比较容易推广.


### 21) Upsource

Upsource是jetbrains出品的code review工具。

- 价格: 收费
- UI交互: ★★★★★
- 安装维护 :★★★★
- 易学程度: ★★★★★

> 总结: 是目前发现最好的代码审查工具,基本上满足代码审查平台的所有需求.免费版本只能注册8个用户.



[参考链接: 20最佳代码审查工具-专门为开发人员准备](http://www.bubuko.com/infodetail-730801.html)
