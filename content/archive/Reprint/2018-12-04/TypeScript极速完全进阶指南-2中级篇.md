---
title: 'TypeScript极速完全进阶指南-2中级篇' 
date: 2018-12-04 2:30:05
hidden: true
slug: 18wpz39xcbg
categories: [reprint]
---

{{< raw >}}

                    
<p>好，我们继续那个沉重的话题分割我的财产，上一篇<br><a href="https://segmentfault.com/a/1190000014317765">TypeScript极速完全进阶指南-1初级篇</a><br>我儿子确实拿到钱了，</p>
<pre><code>class Person{
    name:string;
    age:number;
    food:string = "剁椒鱼头";//外面赋值这里赋值一码事
    private money:number = 10000000000000;//别激动，肯定不是中国天堂银行发行的
    //构造函数，人生下来，年龄就定了
    constructor(name:string,age:number){
        this.name = name;
        this.age = age;
    }
    //eat 大彬哥就特么爱吃鱼
    favoriteFood(){
        return this.food;
    }
    makeMoney(salary:number):number{
       return  this.money+=salary;
    }
    //我自己被窝偷着乐，数1后面的0
    touZheLe(){
        return this.money;
    }
}
//1.啥也别说先造个人再说
var dabinge = new Person('大彬哥',18);
//2.想问我多大撩我或者请我吃饭问我爱吃啥我肯定告诉你
console.log(dabinge.age);
console.log(dabinge.favoriteFood());
//3.想问我银行卡里有多少钱？我肯定不告诉你
// console.log(dabinge.money);
// 大彬哥每个月工资不是很多998
dabinge.makeMoney(998);
//4.我自己在被窝可以偷着看自己余额，通过偷着乐函数看私有属性
console.log(dabinge.touZheLe());//10000000000998

class bingeSons extends Person{
    isHandsome:boolean = true;
    constructor(name:string,age:number){
        super(name,age);//都是我的老底儿，姓名年龄cls
    }
}
let binSon = new bingeSons('彬哥2.0',18);
console.log(binSon.food);//我儿子钱都到手了</code></pre>
<p>但是，不管是法律或者大彬哥遗嘱肯定不能这么写，我大儿子能继承我的钱，我二儿子也能继承，我三儿子也能继承，我大女儿能继承，二女儿能继承，这么写估计我还没写完就挂了，或者法律书得多厚啊！一般都会这么说只要是直系亲属这一类人都能继承我的钱，而不用强调某个人。这里我根本不用管单个人。这里我写分钱，写一个特别适用而典型的例子，数学方法。我们平常用数学方法的时候没必要先New一个吧（我不想臭拽那些名词，比如实例化）。</p>
<p>肯定不这样用：</p>
<pre><code>let M = new Math();
M.random()</code></pre>
<p>而是直接用类调用</p>
<pre><code>Math.random()
Math.PI</code></pre>
<p>这个玩意在类里面叫静态属性和方法，用static去修饰，跟private类似。</p>
<pre><code>class BinMath{
    static PI:number=66666;
    static random():number{
        return Math.random();
    }
}
console.log(BinMath.PI);
console.log(BinMath.random());</code></pre>
<p>好，回到财产分配问题，确实给我子女一部分钱了，但是我还是个很精确的人我说的是一部分，而不是所有，因为我想捐给慈善机构一部分。但是这里问题就来了，大家考虑，我不可能说清楚所有慈善基金会的标准，那我岂不是要累死。我只能说这个基金会的大体标准，后续基金会打算拿钱肯定得满足我说的条件，然后还有自己的实际情况。我只能抽象的说些条件，比如慈善机构必须得有名字，存活50年以上的，比如必须财务透明，还有就是教育类的，要解决这个问题就得使用抽象类。抽象类就是只是用来继承而不是实现的类。其实你看极端的情况我只说这类慈善机构必须有名字，实际这个跟没说一样，你随便套一个机构都行，所以说新建一家有名字的机构跟废话一样，但是其他机构必须符合这些条件。这里我解释清楚没有为什么会有抽象类。比如你要开发一个实际组件，你知道这个组件肯定得有名字，得有描述得有版本号，但是这些东西你new出一个对象没有毛用，它只是一个规范，更合适的方式是 按照这个规范去做事，也就是继承它。拿分钱举例，</p>
<pre><code>abstract class Jigoubiaozhun {
    abstract jigouName: string;
    age:number = 50;
    abstract showMoney(money:number):number;//你只要把我钱公示就行了是网上还是其他地方我不管，你自己去实现
    constructor(name: string,age:number) {
    }

}
//假设有一类慈善机构是专门去给沙漠儿童捐款挖井的,想申请，说符合我要求 
class shamoChildren extends Jigoubiaozhun{
    public jigouName = "沙漠挖井基金协会"
    private money: number = 5000000;
    showMoney():number{
        return this.money; 
    }
    constructor(name:string,age:number){
        super(name,age);
    }
}

var xinJiangWajing = new shamoChildren('新疆挖井队',50);
console.log(xinJiangWajing.showMoney());</code></pre>
<p>大彬哥分钱圆满结束！</p>
<p>正写着教程呢，这时候你刘姨打电话跟我说，别吹牛逼了，赶紧找对象，要找个懂事的，工作好的，疼你的，但是你懂得，你问她谁啊？她总是只有标准（接口），让你自己去实现（implements），就像接口一样。接口就是这么一个玩意，我们看看你刘姨的需求。</p>
<pre><code> interface girl {
    dongshi:boolean;
    job:string;
    tengNi(): boolean;//接口不能实现方法 只有规定，跟你刘姨真像
 }

 class GirlFriend implements girl{
     dongshi=true;
     job = 'good';
     tengNi(){
         return true;
     }
 }
var cuihua = new GirlFriend();
console.log(cuihua.job);</code></pre>
<p>为啥要有interface呢，太好理解了你刘姨怕我走歪路呗，好我们看看代码出事儿的情况：</p>
<pre><code>function renshi(meizi:any){
    console.log(meizi.name);
}
function yuehui(meizi:any){
    console.log(meizi.name+'晚上一起看电影吧，记得带身份证');
}
const meizi = {
    name:"白富美"
}
renshi(meizi);
yuehui(meizi);</code></pre>
<p>我修改一点，</p>
<pre><code>const meizi = {
    mingzi:"白富美"
}</code></pre>
<p>完蛋了，约会三件套都得改……有同学说我改meizi一个地方不就行了，这样有两个问题1.你懂大彬哥的妹子有一个加强连那么多你怎么改？第二要是能在写的时候就防止这么写多好？满足你需求。</p>
<pre><code>interface date{
    mingzi:string;
}
function renshi(meizi:date){
    console.log(meizi.name);//报错，直接扼杀错误在摇篮之中
}
function yuehui(meizi:date){
    console.log(meizi.name+'晚上一起看电影吧，记得带身份证');
}
const meizi = {
    name:"白富美"
}
renshi(meizi);
yuehui(meizi);</code></pre>
<p>但是你懂得，不是每一个女孩用约会三件套都好使，比如运动型女孩，你可以找她去打羽毛球，文静型女孩你可以去带她听音乐会，书香门第的女孩你可以带她去逛逛潘家园……你得对症下药，但是问题来了，你刘姨虽然给你介绍一加强连的女孩，但是我在见面之前我是不知道她是什么类型，这就容易产生你对着古典的女孩约她打羽毛球的问题。用代码表示，就是有时候我们一开始并不知道参数的类型，只有在执行的时候才知道。</p>
<pre><code>function showData(data:any){
    return data;
}
showData('leolau').length;
showData(12).length;//这特么不就废了么
showData({ name: 'leo' }).length;
showData([12, 5, 8]).length;</code></pre>
<p>咋整？TS里面又一个牛逼的东西叫做泛型。泛型的意思就是，先别管类型是啥，先到我碗里来，然后处着的时候我在看她是哪种类型。好，我们看下咋整。</p>
<pre><code>function showData&lt;T&gt;(data:T){
    return data;
}
console.log(showData&lt;string&gt;('leolau').length);
console.log(showData&lt;number&gt;(12).length);
console.log(showData({ name: 'leo' }).length);
console.log(showData([12, 5, 8]).length);</code></pre>
<p>话不投机，当场报错，当然了泛型也可以用在类型上，比如说长头发大眼睛是不是很可能是温柔的女孩啊，就像数组很可能装的是数字一样。</p>
<pre><code>const arr: Array&lt;number&gt; = [12, 5, 8];
arr.push('约么');//人家数字类型，你总不好放string吧</code></pre>
<p>函数参数也可以泛型，其实就是不知道啥类型。</p>
<pre><code>function showArray&lt;T&gt;(data:T[]){//这里虽然是泛型但是规定了必须死数组
    for(var i = 0;i&lt;data.length;i++){
        console.log(data);
    }
}
showArray&lt;string&gt;(['leo','lau']);</code></pre>
<p>说到妹子的话差别还是很大的，有些人家境一般有些人是含着金钥匙长大的，但是良好的家境只是人家的装饰，而不是决定一切的，毕竟顺境加个人努力成功的人很多，我说这句话是想说ts里面也有装饰器，它就像手枪的消声器一样。代码如下：</p>
<pre><code>function hasKey(constructor:Function){
    console.log('我含着金钥匙呢');
}
@hasKey
class Person{
    name:string;
    age:number;
    constructor(name: string, age: number){
        this.name = name;
        this.age = age;
        console.log('我是' + name +'，今年'+age+'岁我骄傲了吗');
    }
}

const baifumei = new Person('白富美',18);
console.log(baifumei);</code></pre>
<p>说了很多关于类，和接口的东西，这些其实很大程度上是为了复用和代码简洁！</p>
<p>面我要说另外一个东西，让代码更加简洁和实用的东西-模块化。</p>
<p>新建./Math/two.ts</p>
<pre><code>export const double:number = 2;
export function doubleKill(num:number):number{
    return num * double;
}</code></pre>
<p>新建techMod.ts并引入，</p>
<pre><code>import { double, doubleKill} from "./Math/two";
console.log(double, doubleKill(3));</code></pre>
<p>报错，export未定义，原因是原生js哪怕ES6浏览器都不支持模块化，咋整，实用模块加载库。</p>
<p>个人比较喜欢，SystemJs，为啥喜欢它？喜欢需要理由吗？好吧这么说容易挨打，因为它的语法很可能成为将来的事实标准，这样可以让你省的在学一遍。</p>
<pre><code>npm install systemjs --save</code></pre>
<p>啥也不说了，上一梭子代码。</p>
<pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;meta http-equiv="X-UA-Compatible" content="ie=edge"&gt;
    &lt;title&gt;Document&lt;/title&gt;
    &lt;script src="/node_modules/systemjs/dist/system.js"&gt;&lt;/script&gt;
    &lt;script&gt;
        SystemJS.config({
            baseURL: '/',
            packages:{
                '/':{
                    defaultExtension: 'js'
                }
            }
        });

        // loads /modules/jquery.js
        SystemJS.import('techMod.js');
    &lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
<p>到目前我们已经搞定了大部分TypeScript，但是我知道你在想啥，知道了知识该怎么实际应用呢？比如说如何搭建一个工作流开发项目呢？或者说如何用TS去结合到angular、react、vue框架呢？</p>
<p>我知道大家想的是你是不是想要讲TS怎么用到Angular中啊？既然大家呼声那么高，那我就讲TypeScript如何搭建工作流开发React应用……<br>更多精彩内容欢迎大家观看我的SF讲座<a href="https://segmentfault.com/l/1500000014450043?_ea=3657153">TypeScript极速完全进阶指南</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
TypeScript极速完全进阶指南-2中级篇

## 原文链接
[https://segmentfault.com/a/1190000014535192](https://segmentfault.com/a/1190000014535192)

