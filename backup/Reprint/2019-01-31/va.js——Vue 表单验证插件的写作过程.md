---
title: 'va.js——Vue 表单验证插件的写作过程' 
date: 2019-01-31 2:31:16
hidden: true
slug: 98kdcr980mi
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>前段时间，老大搭好了Vue的开发环境，于是我们愉快地从JQ来到了Vue。这中间做的时候，在表单验证上做的不开心，看到vue的插件章节，感觉自己也能写一个，因此就自己开始写了一个表单验证插件va.js。<br>  当然为什么不找个插件呢？ vue-validator呀。</p>
<ol>
<li><p>我想了下，一个是表单验证是个高度定制化的东西，这种网上找到的插件为了兼顾各个公司的需求，所以加了很多功能，这些我们不需要。事实证明，vue-validator有50kb，而我写的va.js只有8kb。</p></li>
<li><p>另一个是，vue-validator的api我真的觉得长, 动不动就v-validate:username="['required']"，这么一长串，而我设计的调用大概如——v-va:Money</p></li>
</ol>
<p>当然，本文仅是展示下，如何写个满足自己公司需求的vue表单验证插件。下面介绍下思路。</p>
<h2 id="articleHeader1">一、表单验证模块的构成</h2>
<p>任何表单验证模块都是由 配置——校验——报错——取值 这几部分构成的。</p>
<ol>
<li><p>配置： 配置规则 和配置报错，以及优先级</p></li>
<li><p>校验： 有在 change 事件校验， 在点击提交按钮的时候校验， 当然也有在input事件取值的</p></li>
<li><p>报错： 报错方式一般要分，报错的文字有模板，也有自定义的</p></li>
<li><p>取值： 将通过验证的数据返还给开发者调用</p></li>
</ol>
<p>下面是我老大针对公司项目给我提出的要求</p>
<ol>
<li><p>集中式的管理 校验规则 和 报错模板。</p></li>
<li><p>报错时机可选</p></li>
<li><p>校验正确后的数据，已经打包成对象，可以直接用</p></li>
<li><p>允许各个页面对规则进行覆盖，对报错信息进行自定义修改，以及允许ajax获取数据后，再对规则进行补充</p></li>
<li><p>按顺序来校验，在第一个报错的框弹出错误</p></li>
</ol>
<p>我就很好奇地问， 为什么要这样子呢？然后老大就跟我一条一条解答：</p>
<ol>
<li><p>集中式管理规则，和报错模板的好处，就是规则可以全局通用，一改全改。老大跟我说，光是昵称的正则就改了三次。如果这些正则写在各个页面，o(￣ヘ￣o#)哼，你就要改N个页面了</p></li>
<li><p>pc和移动的流程不一样，pc很多校验都要在change事件或者input事件就校验并报错了，而移动则一般是要到提交按钮再进行校验。所以写插件的时候要做好两手准备。然后，报错用的ui要可以支持我们现在用的layer插件。当然以后这个报错的ui也可能变，所以你懂滴。</p></li>
<li><p>当然原来jq时代，我们的公用表单验证，就能验证完了，把数据都集合到一个对象里。这样ajax的时候，就不用再去取值了。你这个插件耶要达到这个效果</p></li>
<li><p>原来jq的那个公用脚本，正则和报错都集中到一个地方去了，在很多地方已经很方便了。但是在一些页面需要改东西的时候还不够灵活。像RealName这个规则，最早是针对某个页面配置的，用的是后端接口上的字段名。另一个支付页，后端接口上的字段名改成了PayUser了，但是正则还是RealName的，原来我们是要复写一下RealName。这个就不太方便也不好看了。另外一个，支付金额，有最大值和最小值的限制，这个需要从后端获取的。你也要考虑这个情况。要做到各个页面上也能有一些灵活的地方可以修改规则，自定义报错等等。</p></li>
<li><p>为什么要按顺序校验啊？你忘了上次牛哥让我们输入框，从上到下，按顺序报错。不然用户都不知道哪个地方错了。还有规则也是要按顺序的。哦哦哦。看来这次我放东西的时候，要用下数组了。尽量保持顺序。</p></li>
</ol>
<p>我听了之后，大致懂了，原来之前自己写的jq表单验证还有这么多不舒服的点。-_-|||<br>接下来，是看看vue给我的好东西。让我来写</p>
<h2 id="articleHeader2">二、Vue 的插件怎么写</h2>
<p>我一个vue小白，怎么就开始写vue插件了呢？那是因为想解决方案的时候，翻Vue文档翻到了这里</p>
<p><span class="img-wrap"><img data-src="/img/bVFWLw?w=657&amp;h=885" src="https://static.alili.tech/img/bVFWLw?w=657&amp;h=885" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>这些东东，等我写完va.js的时候，感觉尤大写的真的是很清楚了。</p>
<p>其实我是想写个指令来完成表单验证的事的。结果发现可能有2-3个指令，而且要再Vue.prototype上定义些方法，好让各个子实例内部也能拓展规则。于是老大说，这就相当于插件了。这让我很是吃鲸。</p>
<h3 id="articleHeader3">va.js主要用的是 Vue指令</h3>
<p><span class="img-wrap"><img data-src="/img/bVFWNT?w=615&amp;h=558" src="https://static.alili.tech/img/bVFWNT?w=615&amp;h=558" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVFWNW?w=774&amp;h=930" src="https://static.alili.tech/img/bVFWNW?w=774&amp;h=930" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>Vue 文档真的写得很用心，但是我再补充一点吧<br><strong>vnode.context 就是Vue的实例</strong><br>我们做项目的时候，经常一个根组件上挂着N个子组件，子组件上又可能挂着N个子组件。<strong>vnode.context获取的实例，是绑定该指令的组件的实例。</strong>这个就相当好用了。你可以做很多事情</p>
<h3 id="articleHeader4">当然还用了点Vue.prototype</h3>
<p>Vue.prototype.$method  就是可以在各个组件上调用的方法。可以在组件内部用 this.$method调用的</p>
<p>## 三、具体实现的思路 ##</p>
<p>核心思路如下图：</p>
<p><span class="img-wrap"><img data-src="/img/bVFWTq?w=805&amp;h=121" src="https://static.alili.tech/img/bVFWTq?w=805&amp;h=121" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<ul><li><p>规则的构造函数</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//va配置的构造函数
function VaConfig(type, typeVal, errMsg, name, tag){
    this.type = type, this.typeVal = typeVal, this.errMsg = errMsg, this.name = name, this.tag = tag
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pony"><code><span class="hljs-comment">//va配置的构造函数</span>
function <span class="hljs-type">VaConfig</span>(<span class="hljs-keyword">type</span>, typeVal, errMsg, name, <span class="hljs-meta">tag</span>){
    <span class="hljs-literal">this</span>.<span class="hljs-keyword">type</span> = <span class="hljs-keyword">type</span>, <span class="hljs-literal">this</span>.typeVal = typeVal, <span class="hljs-literal">this</span>.errMsg = errMsg, <span class="hljs-literal">this</span>.name = name, <span class="hljs-literal">this</span>.<span class="hljs-meta">tag</span> = <span class="hljs-meta">tag</span>
}</code></pre>
<ol>
<li><p>type: nonvoid(非空), reg(正则), limit(区间), equal(与某个input相等)，unique(不能相同)</p></li>
<li><p>typeVal: 根据不同type设置不同的值</p></li>
<li><p>errMsg: 自定义的报错信息</p></li>
<li><p>name: 用来传ajax的字段，如Password, Username</p></li>
<li><p>tag：用来报错的名字，如‘银行账号’，‘姓名’</p></li>
</ol>
<h3 id="articleHeader5">设置了三种规则</h3>
<p>1.默认规则： 只要绑定指令，就默认有的校验。 比如非空的校验。 可以额外加修饰符来去除<br>2.选项规则： 通过Vue指令的修饰符添加的规则。<br>3.自定义规则： Vue指令属性值上添加的规则。<br>同一个type的规则只存在一个，也就是说，如果type为reg(正则),那么会互相覆盖。 <br>覆盖的优先级： 自定义规则  &gt; 选项规则  &gt; 默认规则</p>
<p>思路讲的多了。也不知道怎么讲了，下面大家直接看源码把。</p>
<h2 id="articleHeader6">源码</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Vue
var checkWhenChange = true  //每个输入框需要离焦即校验

// 给一个dom添加class
function addClass(dom, className){
  // if (dom.classList){
  //   dom.classList.add(className);
  // }else{
  //   dom.className += ' ' + className;
  // }

  var hasClass = !!dom.className.match(new RegExp('(\\s|^)' + _class + '(\\s|$)'))
  if(!hasClass){
    dom.className += ' ' + _class
  }
}

//常用正则表
var regList = {
  ImgCode: /^[0-9a-zA-Z]{4}$/,
  SmsCode: /^\d{4}$/,
  MailCode: /^\d{4}$/,
  UserName: /^[\w|\d]{4,16}$/,
  Password: /^[\w!@#$%^&amp;*.]{6,16}$/,
  Mobile: /^1[3|4|5|7|8]\d{9}$/,
  RealName: /^[\u4e00-\u9fa5|·]{2,16}$|^[a-zA-Z|\s]{2,20}$/,
  BankNum: /^\d{10,19}$/,
  Money: /^([1-9]\d*|[0-9]\d*\.\d{1,2}|0)$/,
  Answer: /^\S+$/,
  Mail: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
}

// 断言函数
function assert(condition, message){
  if(!condition){
    console.error('[va-warn]:' + message)
  }
}

// Rule构造器
function Rule(ruleType, ruleValue, errMsg){
  this.ruleType = ruleType
  this.ruleValue = ruleValue
  this.errMsg = errMsg || ''
}

//VaForm构造器
function VaForm(el, finalRules, modifiers){
  this.ruleOrder = []
  this.rules = {}
  this.dom = el
  this.value = el.value   //值的副本
  this.validated = false  //是否被验证过
  this.tag = el.getAttribute('tag')   //提示的字段名
  // this.correctMsg = `${this.tag}输入正确！`
  this.correctMsg = ''
  this.modifiers = modifiers   //一些特殊的配置
  this.noCheck = false         //为true则不要校验

  this.ruleOrder = finalRules.map(item=>{
    this.rules[item.ruleType] = item
    return item.ruleType
  })
}

//rules中靠前的配置优先级最高
function mergeRule(...rules){
  var mergeResult = []
  var combineArr = Array.prototype.concat.apply([], rules)
  var hash = {}
  combineArr.forEach((rule)=>{
    if(hash[rule.ruleType] === undefined){
      mergeResult.push(rule)
      hash[rule.ruleType] = mergeResult.length - 1
    }else{
      var index = hash[rule.ruleType]
      Object.assign(mergeResult[index], rule)
    }
  })
  return mergeResult
}

//单个规则的验证结果
function VaResult(ruleType, ruleValue, isPass, errMsg){
  this.ruleType = ruleType
  this.ruleValue = ruleValue
  this.isPass = isPass
  this.errMsg = errMsg
}

// 显示结果的构造器
function DisplayResult(isPass, message){
  this.isPass = isPass
  this.message = message
}

//单个规则的校验，或者单个表单的校验
function validate(field, ruleType){
  assert(field, '未输入要验证的字段')
  var vaForm = this.forms[field]
  var {ruleOrder, rules} = vaForm

  if(ruleType === undefined){
    return this.checkForm(vaForm)
  }else{
    var rule = rules[ruleType] //规则
    return this.checkRule(vaForm, rule)
  }
  // vaForm.validated = true
}

// 获得不同的报错信息
function getErrMsg(vaForm, ruleType, ruleValue){
  var tag = vaForm.tag
  var errMsgs = {
    NonEmpty: `${tag}不能为空`,
    reg: `${tag}格式错误`,
    limit: `${tag}必须在${ruleValue[0]}与${ruleValue[1]}之间`,
    equal:`两次${tag}不相同`,
    length: `${tag}长度必须在${ruleValue[0]}与${ruleValue[1]}之间`,
    unique: `${tag}不能相同`
  }
  return errMsgs[ruleType]
}

//检测非空
function checkEmpty(ruleValue, vaForm, va){
  return vaForm.value.trim() ? true : false
}
//检测正则
function checkReg(ruleValue, vaForm, va){
  return ruleValue.test(vaForm.value) ? true : false
}
//检测数字区间
function checkLimit(ruleValue, vaForm, va){
  var value = vaForm.value
  return ((+value >= ruleValue[0]) &amp;&amp; (+value <= ruleValue[1])) ? true : false
}
//检测相等
function checkEqual(ruleValue, vaForm, va){
  var target = va.forms[ruleValue]
  return target.value === vaForm.value ? true : false
}
//检测字符长度
function checkCharLength(ruleValue, vaForm, va){
  var length = vaForm.value.length
  return ((+length >= ruleValue[0]) &amp;&amp; (+length <= ruleValue[1])) ? true : false
}

//几个输入框要各不相同
function checkUnique(ruleValue, vaForm, va){
  var uniqueGroup = va.uniqueGroup[ruleValue]
  var values = uniqueGroup.map(field=>va.forms[field].value)
  var uniqueValues = values.filter((item,index,arr)=>arr.indexOf(item) === index)
  return values.length === uniqueValues.length ? true : false
}

// 检测单个规则
function checkRule(vaForm, rule){
  var forms = this.forms
  var {ruleType, ruleValue, errMsg} = rule
  //如果有自定义报错就按自定义报错，没有就格式化报错
  errMsg = errMsg || getErrMsg(vaForm, ruleType, ruleValue)

  var ruleCheckers = {
    NonEmpty: checkEmpty,
    reg: checkReg,
    limit: checkLimit,
    equal: checkEqual,
    length: checkCharLength,
    unique: checkUnique
  }

  var ruleChecker = ruleCheckers[ruleType]
  var isPass = ruleChecker(ruleValue, vaForm, this)
  var vaResult = new VaResult(ruleType, ruleValue, isPass, isPass ? null : errMsg)
  return vaResult
}

//检测单个表单
function checkForm(vaForm){
  var results = vaForm.ruleOrder.map(ruleType=>{
    var rule = vaForm.rules[ruleType]
    return this.checkRule(vaForm,rule)
  })

  var errIndex = null
  for(var i = 0;i < results.length;i++){
    var result = results[i]
    if(result.isPass === false){
      errIndex = i
      break
    }
  }

  if(errIndex === null){
    return new DisplayResult(true,  vaForm.correctMsg)
  }else{
    return new DisplayResult(false, results[errIndex].errMsg)
  }
}

//刷新vaForm中的值的数据
function refreshValue(field, newValue){
  this.forms[field].value = newValue + ''
}

//更新所有表单的值
function refreshAllValue(){
  this.fieldOrder.forEach(field=>{
    var vaForm = this.forms[field]
    vaForm.value = vaForm.dom.value
  })
}

// 校验所有的表单，并弹出第一个错误。考虑可以为空的情况
function checkAll(){
  var firstErr = null
  this.fieldOrder.forEach(field=>{
    var vaForm = this.forms[field]
    var canNull = vaForm.ruleOrder.every(ruleType=>ruleType !== 'NonEmpty')  //输入框可以为空
    var noCheckEmpty = (vaForm.value === '' &amp;&amp; canNull)   //该输入框可以为空，且输入为空

    if(vaForm.noCheck === false &amp;&amp; noCheckEmpty === false){
      var result = this.setVmResult(field)
      // var result = this.validate(field)
      // this.vmResult[field] = result
      // vaForm.validated = true

      if(firstErr === null &amp;&amp; result.isPass === false){
        firstErr = result.message
      }
    }

  })
  return firstErr
}

//验证单个字段，返回值，并弹出报错
function setVmResult(field){
  var result = this.validate(field) //本输入框结果
  this.vmResult[field] = result    //将报错弹出
  this.forms[field].validated = true  //校验过了
  return result
}

// 返回各个表单的值对象
function getValue(){
  var dataSet = {}
  for(var field in this.forms){
    dataSet[field] = this.forms[field].value
  }
  return dataSet
}

//添加一个规则
function addRule(field, index, Rule){
  var vaForm = this.forms[field]
  vaForm.ruleOrder.splice(index, 0, Rule.ruleType)
  vaForm.rules[Rule.ruleType] = Rule
}

// function resetAll(){
//   this.fieldOrder.forEach(field=>{
//     this.refreshValue(field, '')
//   })
// }

// 设置不校验的表单
function setNoCheck(field, bool){
  this.forms[field].noCheck = bool
}

function createVa(vm, field){
  var va = {
    vmResult:vm.va,
    fieldOrder:[],
    forms:{},
    group:{
      base:[],
    },
    equalGroup:{},                  //必须相等的字段
    uniqueGroup:{},                 //必须不同的字段
    Rule:Rule,                      //Rule构造器
    VaForm:VaForm,                  //VaForm构造器
    validate: validate,             //暴露的校验函数
    setVmResult: setVmResult,       //校验并报错
    checkRule: checkRule,           //内部的校验单条规则的函数
    checkForm: checkForm,           //内部的校验单个表单的函数
    refreshValue: refreshValue,     //更新某个表单的值
    checkAll: checkAll,             //检查所有的函数
    getValue: getValue,             //获取所有表单的当前值，得到一个对象
    setNoCheck:setNoCheck,          //设置为不校验
    addRule:addRule,                //给一个表单添加一个规则
    refreshAllValue:refreshAllValue //更新所有表单的值
    // resetAll: resetAll
  }

  if(vm.$va){
    return vm.$va
  }else{
    vm.$va = va
    return va
  }
}

//v-va:Password.canNull = &quot;[{reg:/^\d{4}$/}]&quot;
//arg = Password,  modifiers.canNull = true, value为后面相关的
//arg用来存字段名， modifiers用来存特殊配置， value为规则， tag是中文提示名， group 为分组
var main = {}
main.install = function(_Vue, options){
  Vue = _Vue

    Vue.directive('va',{
    bind:function(el, binding, vnode){
      var vm = vnode.context                         //当前的vue实例
      var field = binding.arg === 'EXTEND' ? el.getAttribute('name') : binding.arg // 当arg为EXTEND，从name属性获得值
      var option = binding.modifiers                    //特殊配置（允许非空，编辑新增共用等）
      var value = el.value                              //输入框的初始值
      var group = el.getAttribute('group') || 'base'    //分组，一个表单框在多个组呢？这个还没设，要兼容。 通过类似 'group1 group2 group3 group4'
      var tag = el.getAttribute('tag')
      var regMsg = el.getAttribute('regMsg') || ''   //针对正则的自定义报错
      var baseRule = []                              //默认的校验规则             --不用写，默认存在的规则（如非空），优先级最高
      var customRule = []                            //用户自定义的规则（组件中） --bingding.value
      var optionalRule = []                          //配置项中引申出来的规则，优先级最低

      assert(tag, '未设置输入框的tag')
      assert(vm.va, '实例的data选项上，未设置va对象')  //实例上如果没有设置结果则报错。
      assert(field, '未设置输入框字段')
      var va = createVa(vm, field)  //单例模式创建va，绑定在vm上
      va.fieldOrder.push(field)     //字段的检验顺序
      va.group[group].push(field)   //分组
      var NonEmpty = new Rule('NonEmpty', true, '')
      //默认非空
      if(option.CanNull === undefined){
        baseRule.push(NonEmpty)
      }

      //如果regList里有name对应的，直接就加进optionalConfig
      if(regList[field]){
        optionalRule.push(new Rule('reg', regList[field], regMsg))
      }

      //如果modefiers中的字段有在正则表里，将其加入optionalRule
      var regOptions = Object.keys(option);
      for(var i = 0;i < regOptions.length;i++){
        var regOption = regOptions[i]
        if(regList[regOptions[i]]){
          optionalRule.push(new Rule('reg', regList[regOption], regMsg))
        }
      }

      //用户自定义的规则
      if(binding.value !== undefined){
        customRule = binding.value.map(item=>{
          var ruleType = Object.keys(item)[0];
          var errMsg = ruleType === 'reg' ? regMsg : ''
          return new Rule(ruleType, item[ruleType], errMsg)
        })
      }

      var finalRules = mergeRule(baseRule, optionalRule, customRule)
      var hasUniqueRule = false
      //对联合校验的进行预处理
      finalRules.forEach(rule=>{
        var {ruleType, ruleValue} = rule
        if(ruleType === 'equal'){
          if(va.equalGroup[ruleValue] === undefined){
            va.equalGroup[ruleValue] = [field]
          }else{
            va.equalGroup[ruleValue].push(field)
          }
        }

        if(ruleType === 'unique'){
          hasUniqueRule = ruleValue
          if(va.uniqueGroup[ruleValue] === undefined){
            va.uniqueGroup[ruleValue] = [field]
          }else{
            va.uniqueGroup[ruleValue].push(field)
          }
        }
      })

      var vaForm = new VaForm(el, finalRules, option)
      va.forms[field] = vaForm

      if(checkWhenChange){
        function validateSingle(){
          va.refreshValue(field, el.value)  //更新值
          //如果允许为空的此时为空，不校验
          if(vaForm.value === '' &amp;&amp; option.CanNull){
            va.vmResult[field] = {}   //如果为空，把界面显示上面的提示清掉
            return
          }

          if(vaForm.noCheck === false){
            va.setVmResult(field)
          }

          var isEqualTarget = false
          for(var index in va.equalGroup){
            if(index === field){
              isEqualTarget = true
            }
          }

          //相等框的联合校验
          if(isEqualTarget){
            va.equalGroup[field].forEach(item=>{va.setVmResult(item)})
          }

          //不同框的联合校验
          if(hasUniqueRule){
            va.uniqueGroup[hasUniqueRule].forEach(item=>{va.setVmResult(item)})
          }
        }

        //在change和blur上都绑定了处理事件
        el.addEventListener('change', validateSingle)
        el.addEventListener('blur', validateSingle)
      }

    },
  })
}

export default main
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre><code>var Vue
var checkWhenChange = true  //每个输入框需要离焦即校验

// 给一个dom添加class
function addClass(dom, className){
  // if (dom.classList){
  //   dom.classList.add(className);
  // }else{
  //   dom.className += ' ' + className;
  // }

  var hasClass = !!dom.className.match(new RegExp('(\\s|^)' + _class + '(\\s|$)'))
  if(!hasClass){
    dom.className += ' ' + _class
  }
}

//常用正则表
var regList = {
  ImgCode: /^[0-9a-zA-Z]{4}$/,
  SmsCode: /^\d{4}$/,
  MailCode: /^\d{4}$/,
  UserName: /^[\w|\d]{4,16}$/,
  Password: /^[\w!@#$%^&amp;*.]{6,16}$/,
  Mobile: /^1[3|4|5|7|8]\d{9}$/,
  RealName: /^[\u4e00-\u9fa5|·]{2,16}$|^[a-zA-Z|\s]{2,20}$/,
  BankNum: /^\d{10,19}$/,
  Money: /^([1-9]\d*|[0-9]\d*\.\d{1,2}|0)$/,
  Answer: /^\S+$/,
  Mail: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
}

// 断言函数
function assert(condition, message){
  if(!condition){
    console.error('[va-warn]:' + message)
  }
}

// Rule构造器
function Rule(ruleType, ruleValue, errMsg){
  this.ruleType = ruleType
  this.ruleValue = ruleValue
  this.errMsg = errMsg || ''
}

//VaForm构造器
function VaForm(el, finalRules, modifiers){
  this.ruleOrder = []
  this.rules = {}
  this.dom = el
  this.value = el.value   //值的副本
  this.validated = false  //是否被验证过
  this.tag = el.getAttribute('tag')   //提示的字段名
  // this.correctMsg = `${this.tag}输入正确！`
  this.correctMsg = ''
  this.modifiers = modifiers   //一些特殊的配置
  this.noCheck = false         //为true则不要校验

  this.ruleOrder = finalRules.map(item=&gt;{
    this.rules[item.ruleType] = item
    return item.ruleType
  })
}

//rules中靠前的配置优先级最高
function mergeRule(...rules){
  var mergeResult = []
  var combineArr = Array.prototype.concat.apply([], rules)
  var hash = {}
  combineArr.forEach((rule)=&gt;{
    if(hash[rule.ruleType] === undefined){
      mergeResult.push(rule)
      hash[rule.ruleType] = mergeResult.length - 1
    }else{
      var index = hash[rule.ruleType]
      Object.assign(mergeResult[index], rule)
    }
  })
  return mergeResult
}

//单个规则的验证结果
function VaResult(ruleType, ruleValue, isPass, errMsg){
  this.ruleType = ruleType
  this.ruleValue = ruleValue
  this.isPass = isPass
  this.errMsg = errMsg
}

// 显示结果的构造器
function DisplayResult(isPass, message){
  this.isPass = isPass
  this.message = message
}

//单个规则的校验，或者单个表单的校验
function validate(field, ruleType){
  assert(field, '未输入要验证的字段')
  var vaForm = this.forms[field]
  var {ruleOrder, rules} = vaForm

  if(ruleType === undefined){
    return this.checkForm(vaForm)
  }else{
    var rule = rules[ruleType] //规则
    return this.checkRule(vaForm, rule)
  }
  // vaForm.validated = true
}

// 获得不同的报错信息
function getErrMsg(vaForm, ruleType, ruleValue){
  var tag = vaForm.tag
  var errMsgs = {
    NonEmpty: `${tag}不能为空`,
    reg: `${tag}格式错误`,
    limit: `${tag}必须在${ruleValue[0]}与${ruleValue[1]}之间`,
    equal:`两次${tag}不相同`,
    length: `${tag}长度必须在${ruleValue[0]}与${ruleValue[1]}之间`,
    unique: `${tag}不能相同`
  }
  return errMsgs[ruleType]
}

//检测非空
function checkEmpty(ruleValue, vaForm, va){
  return vaForm.value.trim() ? true : false
}
//检测正则
function checkReg(ruleValue, vaForm, va){
  return ruleValue.test(vaForm.value) ? true : false
}
//检测数字区间
function checkLimit(ruleValue, vaForm, va){
  var value = vaForm.value
  return ((+value &gt;= ruleValue[0]) &amp;&amp; (+value &lt;= ruleValue[1])) ? true : false
}
//检测相等
function checkEqual(ruleValue, vaForm, va){
  var target = va.forms[ruleValue]
  return target.value === vaForm.value ? true : false
}
//检测字符长度
function checkCharLength(ruleValue, vaForm, va){
  var length = vaForm.value.length
  return ((+length &gt;= ruleValue[0]) &amp;&amp; (+length &lt;= ruleValue[1])) ? true : false
}

//几个输入框要各不相同
function checkUnique(ruleValue, vaForm, va){
  var uniqueGroup = va.uniqueGroup[ruleValue]
  var values = uniqueGroup.map(field=&gt;va.forms[field].value)
  var uniqueValues = values.filter((item,index,arr)=&gt;arr.indexOf(item) === index)
  return values.length === uniqueValues.length ? true : false
}

// 检测单个规则
function checkRule(vaForm, rule){
  var forms = this.forms
  var {ruleType, ruleValue, errMsg} = rule
  //如果有自定义报错就按自定义报错，没有就格式化报错
  errMsg = errMsg || getErrMsg(vaForm, ruleType, ruleValue)

  var ruleCheckers = {
    NonEmpty: checkEmpty,
    reg: checkReg,
    limit: checkLimit,
    equal: checkEqual,
    length: checkCharLength,
    unique: checkUnique
  }

  var ruleChecker = ruleCheckers[ruleType]
  var isPass = ruleChecker(ruleValue, vaForm, this)
  var vaResult = new VaResult(ruleType, ruleValue, isPass, isPass ? null : errMsg)
  return vaResult
}

//检测单个表单
function checkForm(vaForm){
  var results = vaForm.ruleOrder.map(ruleType=&gt;{
    var rule = vaForm.rules[ruleType]
    return this.checkRule(vaForm,rule)
  })

  var errIndex = null
  for(var i = 0;i &lt; results.length;i++){
    var result = results[i]
    if(result.isPass === false){
      errIndex = i
      break
    }
  }

  if(errIndex === null){
    return new DisplayResult(true,  vaForm.correctMsg)
  }else{
    return new DisplayResult(false, results[errIndex].errMsg)
  }
}

//刷新vaForm中的值的数据
function refreshValue(field, newValue){
  this.forms[field].value = newValue + ''
}

//更新所有表单的值
function refreshAllValue(){
  this.fieldOrder.forEach(field=&gt;{
    var vaForm = this.forms[field]
    vaForm.value = vaForm.dom.value
  })
}

// 校验所有的表单，并弹出第一个错误。考虑可以为空的情况
function checkAll(){
  var firstErr = null
  this.fieldOrder.forEach(field=&gt;{
    var vaForm = this.forms[field]
    var canNull = vaForm.ruleOrder.every(ruleType=&gt;ruleType !== 'NonEmpty')  //输入框可以为空
    var noCheckEmpty = (vaForm.value === '' &amp;&amp; canNull)   //该输入框可以为空，且输入为空

    if(vaForm.noCheck === false &amp;&amp; noCheckEmpty === false){
      var result = this.setVmResult(field)
      // var result = this.validate(field)
      // this.vmResult[field] = result
      // vaForm.validated = true

      if(firstErr === null &amp;&amp; result.isPass === false){
        firstErr = result.message
      }
    }

  })
  return firstErr
}

//验证单个字段，返回值，并弹出报错
function setVmResult(field){
  var result = this.validate(field) //本输入框结果
  this.vmResult[field] = result    //将报错弹出
  this.forms[field].validated = true  //校验过了
  return result
}

// 返回各个表单的值对象
function getValue(){
  var dataSet = {}
  for(var field in this.forms){
    dataSet[field] = this.forms[field].value
  }
  return dataSet
}

//添加一个规则
function addRule(field, index, Rule){
  var vaForm = this.forms[field]
  vaForm.ruleOrder.splice(index, 0, Rule.ruleType)
  vaForm.rules[Rule.ruleType] = Rule
}

// function resetAll(){
//   this.fieldOrder.forEach(field=&gt;{
//     this.refreshValue(field, '')
//   })
// }

// 设置不校验的表单
function setNoCheck(field, bool){
  this.forms[field].noCheck = bool
}

function createVa(vm, field){
  var va = {
    vmResult:vm.va,
    fieldOrder:[],
    forms:{},
    group:{
      base:[],
    },
    equalGroup:{},                  //必须相等的字段
    uniqueGroup:{},                 //必须不同的字段
    Rule:Rule,                      //Rule构造器
    VaForm:VaForm,                  //VaForm构造器
    validate: validate,             //暴露的校验函数
    setVmResult: setVmResult,       //校验并报错
    checkRule: checkRule,           //内部的校验单条规则的函数
    checkForm: checkForm,           //内部的校验单个表单的函数
    refreshValue: refreshValue,     //更新某个表单的值
    checkAll: checkAll,             //检查所有的函数
    getValue: getValue,             //获取所有表单的当前值，得到一个对象
    setNoCheck:setNoCheck,          //设置为不校验
    addRule:addRule,                //给一个表单添加一个规则
    refreshAllValue:refreshAllValue //更新所有表单的值
    // resetAll: resetAll
  }

  if(vm.$va){
    return vm.$va
  }else{
    vm.$va = va
    return va
  }
}

//v-va:Password.canNull = "[{reg:/^\d{4}$/}]"
//arg = Password,  modifiers.canNull = true, value为后面相关的
//arg用来存字段名， modifiers用来存特殊配置， value为规则， tag是中文提示名， group 为分组
var main = {}
main.install = function(_Vue, options){
  Vue = _Vue

    Vue.directive('va',{
    bind:function(el, binding, vnode){
      var vm = vnode.context                         //当前的vue实例
      var field = binding.arg === 'EXTEND' ? el.getAttribute('name') : binding.arg // 当arg为EXTEND，从name属性获得值
      var option = binding.modifiers                    //特殊配置（允许非空，编辑新增共用等）
      var value = el.value                              //输入框的初始值
      var group = el.getAttribute('group') || 'base'    //分组，一个表单框在多个组呢？这个还没设，要兼容。 通过类似 'group1 group2 group3 group4'
      var tag = el.getAttribute('tag')
      var regMsg = el.getAttribute('regMsg') || ''   //针对正则的自定义报错
      var baseRule = []                              //默认的校验规则             --不用写，默认存在的规则（如非空），优先级最高
      var customRule = []                            //用户自定义的规则（组件中） --bingding.value
      var optionalRule = []                          //配置项中引申出来的规则，优先级最低

      assert(tag, '未设置输入框的tag')
      assert(vm.va, '实例的data选项上，未设置va对象')  //实例上如果没有设置结果则报错。
      assert(field, '未设置输入框字段')
      var va = createVa(vm, field)  //单例模式创建va，绑定在vm上
      va.fieldOrder.push(field)     //字段的检验顺序
      va.group[group].push(field)   //分组
      var NonEmpty = new Rule('NonEmpty', true, '')
      //默认非空
      if(option.CanNull === undefined){
        baseRule.push(NonEmpty)
      }

      //如果regList里有name对应的，直接就加进optionalConfig
      if(regList[field]){
        optionalRule.push(new Rule('reg', regList[field], regMsg))
      }

      //如果modefiers中的字段有在正则表里，将其加入optionalRule
      var regOptions = Object.keys(option);
      for(var i = 0;i &lt; regOptions.length;i++){
        var regOption = regOptions[i]
        if(regList[regOptions[i]]){
          optionalRule.push(new Rule('reg', regList[regOption], regMsg))
        }
      }

      //用户自定义的规则
      if(binding.value !== undefined){
        customRule = binding.value.map(item=&gt;{
          var ruleType = Object.keys(item)[0];
          var errMsg = ruleType === 'reg' ? regMsg : ''
          return new Rule(ruleType, item[ruleType], errMsg)
        })
      }

      var finalRules = mergeRule(baseRule, optionalRule, customRule)
      var hasUniqueRule = false
      //对联合校验的进行预处理
      finalRules.forEach(rule=&gt;{
        var {ruleType, ruleValue} = rule
        if(ruleType === 'equal'){
          if(va.equalGroup[ruleValue] === undefined){
            va.equalGroup[ruleValue] = [field]
          }else{
            va.equalGroup[ruleValue].push(field)
          }
        }

        if(ruleType === 'unique'){
          hasUniqueRule = ruleValue
          if(va.uniqueGroup[ruleValue] === undefined){
            va.uniqueGroup[ruleValue] = [field]
          }else{
            va.uniqueGroup[ruleValue].push(field)
          }
        }
      })

      var vaForm = new VaForm(el, finalRules, option)
      va.forms[field] = vaForm

      if(checkWhenChange){
        function validateSingle(){
          va.refreshValue(field, el.value)  //更新值
          //如果允许为空的此时为空，不校验
          if(vaForm.value === '' &amp;&amp; option.CanNull){
            va.vmResult[field] = {}   //如果为空，把界面显示上面的提示清掉
            return
          }

          if(vaForm.noCheck === false){
            va.setVmResult(field)
          }

          var isEqualTarget = false
          for(var index in va.equalGroup){
            if(index === field){
              isEqualTarget = true
            }
          }

          //相等框的联合校验
          if(isEqualTarget){
            va.equalGroup[field].forEach(item=&gt;{va.setVmResult(item)})
          }

          //不同框的联合校验
          if(hasUniqueRule){
            va.uniqueGroup[hasUniqueRule].forEach(item=&gt;{va.setVmResult(item)})
          }
        }

        //在change和blur上都绑定了处理事件
        el.addEventListener('change', validateSingle)
        el.addEventListener('blur', validateSingle)
      }

    },
  })
}

export default main
</code></pre>
<p>现在项目已经用起来了。当然表单验证这种是高度定制化的。纯粹分享个过程和思路。也算我这个vue新手的一次阶段性成果吧。哈哈~</p>
<h2 id="articleHeader7">使用实例</h2>
<p><span class="img-wrap"><img data-src="/img/bVG8UP?w=810&amp;h=682" src="https://static.alili.tech/img/bVG8UP?w=810&amp;h=682" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>第一个框，加了两条指令</p>
<ol>
<li><p>v-va:Password   这个代表使用配置表中password对应的配置（包括非空和正则，默认规则），同时应用Password作为校验成功获取的 数据对象的key</p></li>
<li><p>tag为报错显示中此输入框的名字</p></li>
</ol>
<p>第二个框，为确认框，也加了两个指令<br>1.v-va:checkPassword.Password =  "[{'equal':'Password'}]"<br>一般v-va后面的第一个字段为数据对象的key，他和正则对应的名字有可能不同。<br>这个字段如果和配置表中的配置匹配，那么自然应用配置。<br>如果不匹配，就要自己在后面用.的方式加配置（选项规则）。像这里的Password。</p>
<p>最后面还有一个 属性值 "[{'equal':'Password'}]"（自定义规则）。<br>这个地方用了数组，即会按这个数组的配置来进行校验。<br>同时这个数组有顺序，顺序代表规则的优先级。 <br>这个配置代表，这个框必须和上面那个Password的框值相等，否则报错。<br>另外确认框不加入最后的结果数据对象。</p>
<p>2.tag 用来作为报错信息的名字</p>
<p>校验触发按钮 上面有一个指令 v-va-check<br>1.用来触发校验<br>2.校验成功后，将数据对象存在实例的vaVal属性下</p>
<h3 id="articleHeader8">根据上面的实例</h3>
<p>规则的优先级：<br>1.自定义规则  &gt; 选项规则  &gt; 默认规则 <br>2.规则中的优先级依照数组顺序</p>
<p>另外，可以看到为了使用者方便，我在我们团队中事先做了一些约定，并可能会用到 v-va、v-va-check、tag等指令，占用了实例的两个属性名vaConfig、vaVal。这些约定和设置可以使使用者使用方便（通过配置控制校验时机， 校验成功后自然生成通过的数据对象，自定义报错信息等等）。但是也减少了这个插件的普适性。</p>
<p>此方案仅提供各位做思路参考。个人认为，表单验证是高度定制化的需求，尽量根据各个业务情况进行取舍。在我的方案中，并不像vue-validator一样做了脏校验。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
va.js——Vue 表单验证插件的写作过程

## 原文链接
[https://segmentfault.com/a/1190000007575302](https://segmentfault.com/a/1190000007575302)

