---
title: '基于iview的后台管理模板布局页面' 
date: 2018-12-02 2:30:15
hidden: true
slug: a67eg5cjtmg
categories: [reprint]
---

{{< raw >}}

                    
<p>最近项目使用iview来开发，iview UI设计还是蛮好的相对于element-ui，但是后台模板布局是块硬伤，所以自己写了一个通用页面，以便以后可以直接拿来用，下面贴上代码，分享一下：<br>view admin的后台管理系统模板，但是个人愚见感觉有点太重了，所以自己结合iview的页面布局自己写了一套通用的模板页面，方便后续开发使用。</p>
<p><span class="img-wrap"><img data-src="/img/bVbaHkt?w=2878&amp;h=1498" src="https://static.alili.tech/img/bVbaHkt?w=2878&amp;h=1498" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVbaHjW?w=2876&amp;h=1504" src="https://static.alili.tech/img/bVbaHjW?w=2876&amp;h=1504" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>首先，我们新建一个Layout.vue页面，这个页面就是整个布局模板的页面，我们设置好sidebar、topbar、以及中间的content就好，然后content，我们放上&lt;router-view&gt;就可以了，路由就随便你怎么跳转了。</p>
<p>Layout.vue</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style lang=&quot;less&quot; scoped>
@import '../../../assets/gls-theme/common.less';
.ivu-layout.ivu-layout-has-sider{
    height: 100%;
}
.ivu-layout-sider{
    background: #fff;
}
.ivu-layout-header{
    height: 100px;
    line-height: 18px;
}
.ivu-menu{
    height: 100%;
}
.admin-layout-container{
    position: absolute;
    width: 100%;
    height: 100%;
    .layout{
        background: #f5f7f9;
        position: relative;
        overflow: hidden;
        height: 100%;
        &amp; .dropdown-wrap{
            background: rgb(73, 80, 96);
        }
        &amp; .logo{
            background: #4c364f80;
            border-bottom: 1px solid #363e4f;
            width: auto;
            height: 60px;
            display: flex;
            text-align: center;
            align-items: center;
            justify-content: center;
            cursor: pointer;
        }
    }
    .layout-header-bar{
        background: #fff;
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }
    .menu-icon{
        transition: all .3s;
    }
    .rotate-icon{
        transform: rotate(-90deg);
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
}

</style>
<template>
  <section class=&quot;admin-layout-container&quot;>
      <div class=&quot;layout&quot;>
        <Layout>
            <Sider ref=&quot;side1&quot; hide-trigger collapsible :collapsed-width=&quot;78&quot; v-model=&quot;isCollapsed&quot; style=&quot;background: rgb(73, 80, 96);&quot;>
                <div class=&quot;logo&quot; >
                    <img :src=&quot;logo&quot; width=&quot;100&quot; v-if=&quot;!isCollapsed&quot;/>
                    <Avatar icon=&quot;person&quot; size=&quot;large&quot; v-else/>
                </div>
                <Menu 
                    ref=&quot;side_menu&quot;
                    :active-name=&quot;activeMenuName&quot; 
                    :open-names=&quot;openMenuName&quot;
                    theme=&quot;dark&quot;
                    width=&quot;auto&quot; 
                    :class=&quot;menuitemClasses&quot;
                    @on-select=&quot;choosedMenu&quot;
                    v-if=&quot;!isCollapsed&quot;>
                    <template v-for=&quot;(menu,menu_index) in menus&quot;>
                        <Submenu :name=&quot;menu.name&quot; v-if=&quot;menu.children&quot;>
                            <template slot=&quot;title&quot;>
                                <Icon :size=&quot;20&quot; :type=&quot;menu.icon&quot;></Icon>
                                "{{"menu.title"}}"
                            </template>
                            <MenuItem :name=&quot;child.name&quot; v-for=&quot;(child ,child_index) in menu.children&quot; :key=&quot;child_index&quot;>
                                <Icon :size=&quot;20&quot; :type=&quot;child.icon&quot;></Icon>
                                "{{"child.title"}}"
                            </MenuItem>
                        </Submenu>
                        <MenuItem :name=&quot;menu.name&quot; v-if=&quot;!menu.children &amp;&amp; menu.showInMenus&quot;>
                             <Icon :size=&quot;20&quot; :type=&quot;menu.icon&quot;></Icon>
                            "{{"menu.title"}}"
                        </MenuItem>
                    </template>                    
                </Menu>
                <div class=&quot;dropdown-wrap&quot;>
                    <template v-for=&quot;(menu,menu_index) in menus&quot; v-if=&quot;isCollapsed&quot;>
                        <Dropdown transfer placement=&quot;right-start&quot; v-if=&quot;menu.children&quot; @on-click=&quot;dropdownClick&quot;>
                            <Button style=&quot;width: 85px;margin-left: -5px;padding:10px 0;&quot; type=&quot;text&quot;>
                                <Icon :size=&quot;25&quot; color=&quot;#fff&quot; :type=&quot;menu.icon&quot;></Icon>
                            </Button>
                            <DropdownMenu style=&quot;width: 200px;&quot; slot=&quot;list&quot;>
                                <template v-for=&quot;(child, i) in menu.children&quot;>
                                    <DropdownItem :name=&quot;child.name&quot;>
                                        <div style=&quot;display:flex;align-items:center;&quot;>
                                            <Icon :size=&quot;16&quot; :type=&quot;child.icon&quot;></Icon>
                                            <span style=&quot;padding-left:10px;&quot;>
                                                "{{" child.title "}}"
                                            </span>
                                        </div>
                                    </DropdownItem>
                                </template>  
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown transfer v-if=&quot;!menu.children &amp;&amp; menu.showInMenus&quot; placement=&quot;right-start&quot; @on-click=&quot;dropdownClick&quot;>
                            <Button style=&quot;width: 85px;margin-left: -5px;padding:10px 0;&quot; type=&quot;text&quot;>
                                <Icon :size=&quot;25&quot; color=&quot;#fff&quot; :type=&quot;menu.icon&quot;></Icon>
                            </Button>
                            <DropdownMenu style=&quot;width: 200px;&quot; slot=&quot;list&quot;>
                                <DropdownItem :name=&quot;menu.name&quot;>
                                    <div style=&quot;display:flex;align-items:center;&quot;>
                                        <Icon :size=&quot;16&quot; :type=&quot;menu.icon&quot;></Icon>
                                        <span style=&quot;padding-left:10px;&quot;>
                                            "{{" menu.title "}}"
                                        </span>
                                    </div>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </template>         
                </div>            
            </Sider>
            <Layout>
                <Header :style=&quot;{position: 'fixed',
                        width: isCollapsed?'calc(100% - 78px)':'calc(100% - 200px)',
                        padding: 0,
                        display:'flex',
                        flexDirection:'column',
                        zIndex:20
                    }&quot; class=&quot;layout-header-bar&quot;>
                    <div style=&quot;
                        display:flex;
                        align-tems:center;
                        justify-content:space-between;
                        position: relative;
                        height:60px;
                        line-height: 60px;
                        z-index: 1;
                        box-shadow: 0 2px 1px 1px rgba(100, 100, 100, 0.1);&quot;>
                        <div style=&quot;display:flex;align-items:center;&quot;>
                            <Icon @click.native=&quot;collapsedSider&quot; :class=&quot;rotateIcon&quot; :style=&quot;{margin: '0 20px 0'}&quot; type=&quot;navicon-round&quot; size=&quot;24&quot;></Icon>
                            <span style=&quot;font-size:18px;font-weight:bold&quot;>"{{"user.mechanism.name"}}"后台管理系统</span>
                        </div>
                        <div style=&quot;margin-right:20px&quot;>
                            <!-- <Button type=&quot;text&quot; icon=&quot;person&quot; size=&quot;large&quot;>个人中心</Button>
                            <Button type=&quot;text&quot; icon=&quot;android-notifications&quot; size=&quot;large&quot; @click=&quot;clickNotice&quot;>消息通知</Button> -->
                            <Button type=&quot;text&quot; icon=&quot;android-exit&quot; size=&quot;large&quot; @click=&quot;quit&quot;>退出系统</Button>
                        </div>
                    </div>     
                    <div style=&quot;display: flex;
                                position: relative;
                                padding-left:10px;
                                height: 40px;
                                background: #f5f7f9;
                                align-items: center;
                                box-shadow: 0 2px 1px 1px rgba(100, 100, 100, 0.1);&quot;>
                        <template v-for=&quot;(tab,tab_index) in tags&quot;>
                            <Tag type=&quot;dot&quot; 
                            :closable=&quot;tab.closable&quot; 
                            :color=&quot;tab.choosed ? 'blue':'#e9eaec'&quot;
                            :name=&quot;tab.name&quot;
                            @click.native=&quot;clickTag(tab)&quot;
                            @on-close=&quot;closeTag&quot; >
                                "{{"tab.title"}}"
                            </Tag>
                        </template>
                    </div>                  
                </Header>                
                <Content :style=&quot;{
                    height: 'calc(100% - 100px)',
                    position: 'absolute',
                    top: '100px',
                    overflow: 'auto',
                    padding: '10px',
                    width:isCollapsed?'calc(100% - 78px)':'calc(100% - 200px)'
                    }&quot;>
                    <!--保存组件状态到内存，避免重新渲染-->
                    <keep-alive>
                        <router-view/>    
                    </keep-alive>               
                </Content>
            </Layout>
        </Layout>
    </div>
  </section>
</template>
<script>
import {mapActions,mapState} from 'vuex'

export default {
    data(){
        return{
            logo:`${this.$qiniuFileUrl}${process.env.LOGO}`,
            isCollapsed: false,
            // ------------------------------  菜单操作开始  --------------------------------
            title:'首页',
            activeMenuName:'admin',
            openMenuName:[],
            menus:[
                {
                    title:'首页',
                    num:1,
                    name:'admin',
                    icon:'home',
                    href:'/admin',
                    closable:false,
                    showInTags:true,
                    showInMenus:true,
                    choosed:true,
                },
                {
                    title:'课程管理',
                    name:'course-manage',
                    icon:'ios-bookmarks',
                    href:'/admin/course',
                    closable:true,
                    showInTags:false,
                    showInMenus:true,
                    choosed:false,
                },
                {
                    title:'老师管理',
                    name:'teacher-manage',
                    icon:'person-stalker',
                    href:'/admin/teacher',
                    closable:true,
                    showInTags:false,
                    showInMenus:true,
                    choosed:false,
                },               
                {
                    title:'学生管理',
                    name:'student-manage',
                    icon:'university',
                    href:'/admin/student',
                    closable:true,
                    showInTags:false,
                    showInMenus:true,
                    choosed:false,
                },
                {
                    title:'课堂',
                    name:'class-manage-parent',
                    icon:'easel',
                    children:[
                        {
                            title:'课堂管理',
                            name:'classroom-manage',
                            icon:'erlenmeyer-flask',
                            href:'/admin/classroom',
                            closable:true,
                            showInTags:false,
                            showInMenus:true,
                            choosed:false,
                        },
                        {
                            title:'上课管理',
                            name:'class-manage',
                            icon:'android-time',
                            href:'/admin/class',
                            closable:true,
                            showInTags:false,
                            showInMenus:true,
                            choosed:false,
                        }
                    ]
                },
                {
                    title:'APK管理',
                    name:'apk-manage',
                    icon:'social-android',
                    href:'/admin/apk',
                    closable:true,
                    showInTags:false,
                    showInMenus:true,
                    choosed:false,
                },
                {
                    title:'设置',
                    name:'setting',
                    icon:'gear-a',
                    href:'/admin/setting',
                    closable:true,
                    showInTags:false,
                    showInMenus:true,
                    choosed:false,
                },
                {
                    title:'消息通知',
                    name:'notice',
                    icon:'ios-navigate',
                    href:'/notice',
                    closable:true,
                    showInTags:false,
                    showInMenus:false,
                    choosed:false,
                }
            ]
            // ------------------------------  菜单操作结束  --------------------------------   
        }
    },
    computed: {
        ...mapState(
            {
                user:state=>state.user
            }
        ),
        // 筛选menus中选中的menu
        tags(){
            let tags = [];
            // 将menus中showInTags=true的标签放到tags数组中
            this.menus.forEach(menu=>{
                if(menu.showInTags){
                    tags.push(menu);
                }else if(menu.children){
                    menu.children.forEach(child=>{
                        if(child.showInTags){
                            tags.push(child)
                        }
                    })
                }
            });
            console.log('tags=>',tags)

            //标签数组排序，从小到到
            tags.sort((a,b)=>{
                return (a.num - b.num)
            })
            return tags;
        },
        rotateIcon () {
            return [
                'menu-icon',
                this.isCollapsed ? 'rotate-icon' : ''
            ];
        },
        menuitemClasses () {
            return [
                'menu-item',
                this.isCollapsed ? 'collapsed-menu' : ''
            ]
        }
    },
    // ------------------------------  菜单操作开始  --------------------------------
    //刷新页面之后保存并选中最后一次菜单和标签
    beforeRouteEnter (to, from, next) {
        next(vm => {
            // 通过 `vm` 访问组件实例
            let activeMenuName = localStorage.activeMenuName;
            vm.activeMenuName = activeMenuName;

            let tags_last_num = vm.tags[vm.tags.length - 1].num; 

            if(activeMenuName &amp;&amp; activeMenuName.length != 0){
                vm.menus.forEach(_menu=>{
                    if(activeMenuName == _menu.name){                        
                        _menu.choosed = true;
                        _menu.showInTags = true;
                        _menu.num = tags_last_num + 1;
                    }
                    else if(_menu.children){
                        _menu.children.forEach(child=>{
                            if(activeMenuName == child.name){
                                child.choosed = true;
                                child.showInTags = true;
                                child.num = tags_last_num + 1;
                                vm.openMenuName = [_menu.name];      
                            }
                        })                 
                    }
                    else{
                        // 排除首页
                        if(_menu.name != 'admin'){
                            _menu.choosed = false;
                            _menu.showInTags = false;
                        }else{
                            _menu.choosed = false;
                        }
                    }
                })
            }
            vm.$nextTick(()=>{
                vm.$refs.side_menu.updateOpened();
                vm.$refs.side_menu.updateActiveName();
            });           
        })        
    },
    // ------------------------------  菜单操作结束  --------------------------------
    methods: {
        ...mapActions([
            'logout'
        ]),
        quit(){
            this.logout();
            localStorage.removeItem('token');
            localStorage.removeItem('activeMenuName');
            this.$router.push('/login')
        },
        clickNotice(){
            this.choosedMenu('notice');
        },
        collapsedSider() {
            this.$refs.side1.toggleCollapse();
        },
        // ------------------------------  菜单操作开始  --------------------------------
        closeTag(event, name){
            // 判断该标签是否是选中状态
            // 如果是那么就要设置标签数组中最后一个标签成选中状态
            // 如果否那么就直接删除就好
            let is_choosed = false;
            this.menus.forEach((menu,_index)=>{
                if(menu.name == name){
                    is_choosed = menu.choosed;
                    menu.showInTags = false;
                }else if(menu.children){
                    menu.children.forEach(child=>{
                        if(child.name == name){
                            is_choosed = child.choosed;
                            child.showInTags = false;
                        }
                    })
                }
            })          
            // 关闭标签并选中tags中最后一个标签高亮  
            if(is_choosed){
                let last_tag = this.tags[this.tags.length-1];
                last_tag.choosed = true;
                this.$router.push(last_tag.href);
                this.activeMenuName = last_tag.name;
                localStorage.activeMenuName = this.activeMenuName;
            }            
        },
        clickTag(tag){
            this.tags.forEach(_tag=>{
                if(_tag.name == tag.name){
                    _tag.choosed=true;
                }else{
                    _tag.choosed= false;
                }
            })
            // 设置菜单选中name
            this.activeMenuName = tag.name;
            localStorage.activeMenuName = this.activeMenuName;
            // 刷新菜单
            this.$nextTick(()=>{
                if(this.$refs.side_menu){
                    this.$refs.side_menu.updateActiveName()
                }
            });
            //点击tab跳转
            this.$router.push(`${tag.href}`);
        },
        choosedMenu(name){
            // 获取标签数组最后一个元素的num
            let tags_last_num = this.tags[this.tags.length - 1].num;
            // 设置选中菜单name
            this.activeMenuName = name;
            localStorage.activeMenuName = this.activeMenuName;
            let if_tab = false;

            //根据name查找对应的菜单对象
            let menu = null;
            this.menus.forEach(_menu=>{
                if(_menu.name == name){   
                    // 只有不在tags数组中的元素才能设置num                 
                    if(!_menu.showInTags){                   
                        _menu.num = tags_last_num + 1;
                    }
                    menu = _menu;
                    _menu.showInTags = true;
                    _menu.choosed = true;                
                                        
                }
                else if(_menu.children){
                    _menu.children.forEach(child=>{
                        if(child.name == name){     
                            // 只有不在tags数组中的元素才能设置num                       
                            if(!_menu.showInTags){
                                child.num = tags_last_num + 1; 
                            }            
                            menu = child;                
                            child.showInTags = true;
                            child.choosed = true;
                            
                        }else{
                            child.choosed = false;
                        }
                    })
                }
                else {
                    _menu.choosed = false;
                }
            })
            this.$router.push(`${menu.href}`);
        },
        dropdownClick(name){
            this.choosedMenu(name);
        }
        // ------------------------------  菜单操作结束  --------------------------------
    }
}
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre><code>&lt;style lang="less" scoped&gt;
@import '../../../assets/gls-theme/common.less';
.ivu-layout.ivu-layout-has-sider{
    height: 100%;
}
.ivu-layout-sider{
    background: #fff;
}
.ivu-layout-header{
    height: 100px;
    line-height: 18px;
}
.ivu-menu{
    height: 100%;
}
.admin-layout-container{
    position: absolute;
    width: 100%;
    height: 100%;
    .layout{
        background: #f5f7f9;
        position: relative;
        overflow: hidden;
        height: 100%;
        &amp; .dropdown-wrap{
            background: rgb(73, 80, 96);
        }
        &amp; .logo{
            background: #4c364f80;
            border-bottom: 1px solid #363e4f;
            width: auto;
            height: 60px;
            display: flex;
            text-align: center;
            align-items: center;
            justify-content: center;
            cursor: pointer;
        }
    }
    .layout-header-bar{
        background: #fff;
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }
    .menu-icon{
        transition: all .3s;
    }
    .rotate-icon{
        transform: rotate(-90deg);
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
}

&lt;/style&gt;
&lt;template&gt;
  &lt;section class="admin-layout-container"&gt;
      &lt;div class="layout"&gt;
        &lt;Layout&gt;
            &lt;Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed" style="background: rgb(73, 80, 96);"&gt;
                &lt;div class="logo" &gt;
                    &lt;img :src="logo" width="100" v-if="!isCollapsed"/&gt;
                    &lt;Avatar icon="person" size="large" v-else/&gt;
                &lt;/div&gt;
                &lt;Menu 
                    ref="side_menu"
                    :active-name="activeMenuName" 
                    :open-names="openMenuName"
                    theme="dark"
                    width="auto" 
                    :class="menuitemClasses"
                    @on-select="choosedMenu"
                    v-if="!isCollapsed"&gt;
                    &lt;template v-for="(menu,menu_index) in menus"&gt;
                        &lt;Submenu :name="menu.name" v-if="menu.children"&gt;
                            &lt;template slot="title"&gt;
                                &lt;Icon :size="20" :type="menu.icon"&gt;&lt;/Icon&gt;
                                "{{"menu.title"}}"
                            &lt;/template&gt;
                            &lt;MenuItem :name="child.name" v-for="(child ,child_index) in menu.children" :key="child_index"&gt;
                                &lt;Icon :size="20" :type="child.icon"&gt;&lt;/Icon&gt;
                                "{{"child.title"}}"
                            &lt;/MenuItem&gt;
                        &lt;/Submenu&gt;
                        &lt;MenuItem :name="menu.name" v-if="!menu.children &amp;&amp; menu.showInMenus"&gt;
                             &lt;Icon :size="20" :type="menu.icon"&gt;&lt;/Icon&gt;
                            "{{"menu.title"}}"
                        &lt;/MenuItem&gt;
                    &lt;/template&gt;                    
                &lt;/Menu&gt;
                &lt;div class="dropdown-wrap"&gt;
                    &lt;template v-for="(menu,menu_index) in menus" v-if="isCollapsed"&gt;
                        &lt;Dropdown transfer placement="right-start" v-if="menu.children" @on-click="dropdownClick"&gt;
                            &lt;Button style="width: 85px;margin-left: -5px;padding:10px 0;" type="text"&gt;
                                &lt;Icon :size="25" color="#fff" :type="menu.icon"&gt;&lt;/Icon&gt;
                            &lt;/Button&gt;
                            &lt;DropdownMenu style="width: 200px;" slot="list"&gt;
                                &lt;template v-for="(child, i) in menu.children"&gt;
                                    &lt;DropdownItem :name="child.name"&gt;
                                        &lt;div style="display:flex;align-items:center;"&gt;
                                            &lt;Icon :size="16" :type="child.icon"&gt;&lt;/Icon&gt;
                                            &lt;span style="padding-left:10px;"&gt;
                                                "{{" child.title "}}"
                                            &lt;/span&gt;
                                        &lt;/div&gt;
                                    &lt;/DropdownItem&gt;
                                &lt;/template&gt;  
                            &lt;/DropdownMenu&gt;
                        &lt;/Dropdown&gt;
                        &lt;Dropdown transfer v-if="!menu.children &amp;&amp; menu.showInMenus" placement="right-start" @on-click="dropdownClick"&gt;
                            &lt;Button style="width: 85px;margin-left: -5px;padding:10px 0;" type="text"&gt;
                                &lt;Icon :size="25" color="#fff" :type="menu.icon"&gt;&lt;/Icon&gt;
                            &lt;/Button&gt;
                            &lt;DropdownMenu style="width: 200px;" slot="list"&gt;
                                &lt;DropdownItem :name="menu.name"&gt;
                                    &lt;div style="display:flex;align-items:center;"&gt;
                                        &lt;Icon :size="16" :type="menu.icon"&gt;&lt;/Icon&gt;
                                        &lt;span style="padding-left:10px;"&gt;
                                            "{{" menu.title "}}"
                                        &lt;/span&gt;
                                    &lt;/div&gt;
                                &lt;/DropdownItem&gt;
                            &lt;/DropdownMenu&gt;
                        &lt;/Dropdown&gt;
                    &lt;/template&gt;         
                &lt;/div&gt;            
            &lt;/Sider&gt;
            &lt;Layout&gt;
                &lt;Header :style="{position: 'fixed',
                        width: isCollapsed?'calc(100% - 78px)':'calc(100% - 200px)',
                        padding: 0,
                        display:'flex',
                        flexDirection:'column',
                        zIndex:20
                    }" class="layout-header-bar"&gt;
                    &lt;div style="
                        display:flex;
                        align-tems:center;
                        justify-content:space-between;
                        position: relative;
                        height:60px;
                        line-height: 60px;
                        z-index: 1;
                        box-shadow: 0 2px 1px 1px rgba(100, 100, 100, 0.1);"&gt;
                        &lt;div style="display:flex;align-items:center;"&gt;
                            &lt;Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px 0'}" type="navicon-round" size="24"&gt;&lt;/Icon&gt;
                            &lt;span style="font-size:18px;font-weight:bold"&gt;"{{"user.mechanism.name"}}"后台管理系统&lt;/span&gt;
                        &lt;/div&gt;
                        &lt;div style="margin-right:20px"&gt;
                            &lt;!-- &lt;Button type="text" icon="person" size="large"&gt;个人中心&lt;/Button&gt;
                            &lt;Button type="text" icon="android-notifications" size="large" @click="clickNotice"&gt;消息通知&lt;/Button&gt; --&gt;
                            &lt;Button type="text" icon="android-exit" size="large" @click="quit"&gt;退出系统&lt;/Button&gt;
                        &lt;/div&gt;
                    &lt;/div&gt;     
                    &lt;div style="display: flex;
                                position: relative;
                                padding-left:10px;
                                height: 40px;
                                background: #f5f7f9;
                                align-items: center;
                                box-shadow: 0 2px 1px 1px rgba(100, 100, 100, 0.1);"&gt;
                        &lt;template v-for="(tab,tab_index) in tags"&gt;
                            &lt;Tag type="dot" 
                            :closable="tab.closable" 
                            :color="tab.choosed ? 'blue':'#e9eaec'"
                            :name="tab.name"
                            @click.native="clickTag(tab)"
                            @on-close="closeTag" &gt;
                                "{{"tab.title"}}"
                            &lt;/Tag&gt;
                        &lt;/template&gt;
                    &lt;/div&gt;                  
                &lt;/Header&gt;                
                &lt;Content :style="{
                    height: 'calc(100% - 100px)',
                    position: 'absolute',
                    top: '100px',
                    overflow: 'auto',
                    padding: '10px',
                    width:isCollapsed?'calc(100% - 78px)':'calc(100% - 200px)'
                    }"&gt;
                    &lt;!--保存组件状态到内存，避免重新渲染--&gt;
                    &lt;keep-alive&gt;
                        &lt;router-view/&gt;    
                    &lt;/keep-alive&gt;               
                &lt;/Content&gt;
            &lt;/Layout&gt;
        &lt;/Layout&gt;
    &lt;/div&gt;
  &lt;/section&gt;
&lt;/template&gt;
&lt;script&gt;
import {mapActions,mapState} from 'vuex'

export default {
    data(){
        return{
            logo:`${this.$qiniuFileUrl}${process.env.LOGO}`,
            isCollapsed: false,
            // ------------------------------  菜单操作开始  --------------------------------
            title:'首页',
            activeMenuName:'admin',
            openMenuName:[],
            menus:[
                {
                    title:'首页',
                    num:1,
                    name:'admin',
                    icon:'home',
                    href:'/admin',
                    closable:false,
                    showInTags:true,
                    showInMenus:true,
                    choosed:true,
                },
                {
                    title:'课程管理',
                    name:'course-manage',
                    icon:'ios-bookmarks',
                    href:'/admin/course',
                    closable:true,
                    showInTags:false,
                    showInMenus:true,
                    choosed:false,
                },
                {
                    title:'老师管理',
                    name:'teacher-manage',
                    icon:'person-stalker',
                    href:'/admin/teacher',
                    closable:true,
                    showInTags:false,
                    showInMenus:true,
                    choosed:false,
                },               
                {
                    title:'学生管理',
                    name:'student-manage',
                    icon:'university',
                    href:'/admin/student',
                    closable:true,
                    showInTags:false,
                    showInMenus:true,
                    choosed:false,
                },
                {
                    title:'课堂',
                    name:'class-manage-parent',
                    icon:'easel',
                    children:[
                        {
                            title:'课堂管理',
                            name:'classroom-manage',
                            icon:'erlenmeyer-flask',
                            href:'/admin/classroom',
                            closable:true,
                            showInTags:false,
                            showInMenus:true,
                            choosed:false,
                        },
                        {
                            title:'上课管理',
                            name:'class-manage',
                            icon:'android-time',
                            href:'/admin/class',
                            closable:true,
                            showInTags:false,
                            showInMenus:true,
                            choosed:false,
                        }
                    ]
                },
                {
                    title:'APK管理',
                    name:'apk-manage',
                    icon:'social-android',
                    href:'/admin/apk',
                    closable:true,
                    showInTags:false,
                    showInMenus:true,
                    choosed:false,
                },
                {
                    title:'设置',
                    name:'setting',
                    icon:'gear-a',
                    href:'/admin/setting',
                    closable:true,
                    showInTags:false,
                    showInMenus:true,
                    choosed:false,
                },
                {
                    title:'消息通知',
                    name:'notice',
                    icon:'ios-navigate',
                    href:'/notice',
                    closable:true,
                    showInTags:false,
                    showInMenus:false,
                    choosed:false,
                }
            ]
            // ------------------------------  菜单操作结束  --------------------------------   
        }
    },
    computed: {
        ...mapState(
            {
                user:state=&gt;state.user
            }
        ),
        // 筛选menus中选中的menu
        tags(){
            let tags = [];
            // 将menus中showInTags=true的标签放到tags数组中
            this.menus.forEach(menu=&gt;{
                if(menu.showInTags){
                    tags.push(menu);
                }else if(menu.children){
                    menu.children.forEach(child=&gt;{
                        if(child.showInTags){
                            tags.push(child)
                        }
                    })
                }
            });
            console.log('tags=&gt;',tags)

            //标签数组排序，从小到到
            tags.sort((a,b)=&gt;{
                return (a.num - b.num)
            })
            return tags;
        },
        rotateIcon () {
            return [
                'menu-icon',
                this.isCollapsed ? 'rotate-icon' : ''
            ];
        },
        menuitemClasses () {
            return [
                'menu-item',
                this.isCollapsed ? 'collapsed-menu' : ''
            ]
        }
    },
    // ------------------------------  菜单操作开始  --------------------------------
    //刷新页面之后保存并选中最后一次菜单和标签
    beforeRouteEnter (to, from, next) {
        next(vm =&gt; {
            // 通过 `vm` 访问组件实例
            let activeMenuName = localStorage.activeMenuName;
            vm.activeMenuName = activeMenuName;

            let tags_last_num = vm.tags[vm.tags.length - 1].num; 

            if(activeMenuName &amp;&amp; activeMenuName.length != 0){
                vm.menus.forEach(_menu=&gt;{
                    if(activeMenuName == _menu.name){                        
                        _menu.choosed = true;
                        _menu.showInTags = true;
                        _menu.num = tags_last_num + 1;
                    }
                    else if(_menu.children){
                        _menu.children.forEach(child=&gt;{
                            if(activeMenuName == child.name){
                                child.choosed = true;
                                child.showInTags = true;
                                child.num = tags_last_num + 1;
                                vm.openMenuName = [_menu.name];      
                            }
                        })                 
                    }
                    else{
                        // 排除首页
                        if(_menu.name != 'admin'){
                            _menu.choosed = false;
                            _menu.showInTags = false;
                        }else{
                            _menu.choosed = false;
                        }
                    }
                })
            }
            vm.$nextTick(()=&gt;{
                vm.$refs.side_menu.updateOpened();
                vm.$refs.side_menu.updateActiveName();
            });           
        })        
    },
    // ------------------------------  菜单操作结束  --------------------------------
    methods: {
        ...mapActions([
            'logout'
        ]),
        quit(){
            this.logout();
            localStorage.removeItem('token');
            localStorage.removeItem('activeMenuName');
            this.$router.push('/login')
        },
        clickNotice(){
            this.choosedMenu('notice');
        },
        collapsedSider() {
            this.$refs.side1.toggleCollapse();
        },
        // ------------------------------  菜单操作开始  --------------------------------
        closeTag(event, name){
            // 判断该标签是否是选中状态
            // 如果是那么就要设置标签数组中最后一个标签成选中状态
            // 如果否那么就直接删除就好
            let is_choosed = false;
            this.menus.forEach((menu,_index)=&gt;{
                if(menu.name == name){
                    is_choosed = menu.choosed;
                    menu.showInTags = false;
                }else if(menu.children){
                    menu.children.forEach(child=&gt;{
                        if(child.name == name){
                            is_choosed = child.choosed;
                            child.showInTags = false;
                        }
                    })
                }
            })          
            // 关闭标签并选中tags中最后一个标签高亮  
            if(is_choosed){
                let last_tag = this.tags[this.tags.length-1];
                last_tag.choosed = true;
                this.$router.push(last_tag.href);
                this.activeMenuName = last_tag.name;
                localStorage.activeMenuName = this.activeMenuName;
            }            
        },
        clickTag(tag){
            this.tags.forEach(_tag=&gt;{
                if(_tag.name == tag.name){
                    _tag.choosed=true;
                }else{
                    _tag.choosed= false;
                }
            })
            // 设置菜单选中name
            this.activeMenuName = tag.name;
            localStorage.activeMenuName = this.activeMenuName;
            // 刷新菜单
            this.$nextTick(()=&gt;{
                if(this.$refs.side_menu){
                    this.$refs.side_menu.updateActiveName()
                }
            });
            //点击tab跳转
            this.$router.push(`${tag.href}`);
        },
        choosedMenu(name){
            // 获取标签数组最后一个元素的num
            let tags_last_num = this.tags[this.tags.length - 1].num;
            // 设置选中菜单name
            this.activeMenuName = name;
            localStorage.activeMenuName = this.activeMenuName;
            let if_tab = false;

            //根据name查找对应的菜单对象
            let menu = null;
            this.menus.forEach(_menu=&gt;{
                if(_menu.name == name){   
                    // 只有不在tags数组中的元素才能设置num                 
                    if(!_menu.showInTags){                   
                        _menu.num = tags_last_num + 1;
                    }
                    menu = _menu;
                    _menu.showInTags = true;
                    _menu.choosed = true;                
                                        
                }
                else if(_menu.children){
                    _menu.children.forEach(child=&gt;{
                        if(child.name == name){     
                            // 只有不在tags数组中的元素才能设置num                       
                            if(!_menu.showInTags){
                                child.num = tags_last_num + 1; 
                            }            
                            menu = child;                
                            child.showInTags = true;
                            child.choosed = true;
                            
                        }else{
                            child.choosed = false;
                        }
                    })
                }
                else {
                    _menu.choosed = false;
                }
            })
            this.$router.push(`${menu.href}`);
        },
        dropdownClick(name){
            this.choosedMenu(name);
        }
        // ------------------------------  菜单操作结束  --------------------------------
    }
}
&lt;/script&gt;
</code></pre>
<p>在路由页面里面，我引入了几个页面，你们可以根据我的路径自己新建一下即可，然后把组件和路由结合起来就可以成功运行并应用我的Layout.vue页面进行后台整个页面的布局了，是不是超方便的。</p>
<p>Router.vue</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/admin/Home.vue'
import AdminLayout from '@/components/admin/Layout.vue'
import Admin from '@/views/admin/Admin.vue'
import UserManage from '@/views/admin/UserManage.vue'
import CityManage from '@/views/admin/CityManage.vue'
import ConditionManage from '@/views/admin/ConditionManage.vue'
import ConditionTypeManage from '@/views/admin/ConditionTypeManage.vue'
import IndustryManage from '@/views/admin/IndustryManage.vue'
import Setting from '@/views/admin/Setting.vue'
import Notice from '@/views/admin/Notice.vue'

import Login from '@/views/login/Login.vue'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'admin',
      component: AdminLayout,
      children:[
        {
          path:'',
          name:'index',
          meta:{
            title:'首页',
          },
          component:Admin
        },        
        {
          path:'usermanage',
          name:'user-manage',
          meta:{
            title:'用户管理',
          },
          component:UserManage
        },
        {
          path:'citymanage',
          name:'citymanage',
          meta:{
            title:'城市管理'
          },
          component:CityManage
        },
        {
          path:'conditiontypemanage',
          name:'conditiontypemanage',
          meta:{
            title:'条件类型管理'
          },
          component:ConditionTypeManage
        },
        {
          path:'conditionmanage',
          name:'conditionmanage',
          meta:{
            title:'条件管理'
          },
          component:ConditionManage
        },
        {
          path:'industrymanage',
          name:'industrymanage',
          meta:{
            title:'一级行业'
          },
          component:IndustryManage
        },
        {
          path:'setting',
          name:'setting',
          meta:{
            title:'设置'
          },
          component:Setting
        },
        {
          path:'notice',
          name:'notice',
          meta:{
            title:'通知'
          },
          component:Notice
        },
        {
          path:'test',
          name:'test',
          meta:{
            title:'测试'
          },
          component:Setting
        }
      ]
    },
    {
      path:'/login',
      name:'login',
      meta:{
        title:'登录',
      },
      component:Login
    },
  ]
})


router.beforeEach((to, from, next) => {
  let token = localStorage.token;
  if(token &amp;&amp; to.name != 'login'){
    next()
  }else if(token &amp;&amp; to.name == 'login'){
    next('/');
  }else if(!token &amp;&amp; to.name != 'login'){
    next('/login')
  }else{
    next()
  }
})

export default router;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xl"><code><span class="hljs-keyword">import</span> Vue from 'vue'
<span class="hljs-keyword">import</span> Router from 'vue-router'
<span class="hljs-keyword">import</span> Home from '@/views/admin/Home.vue'
<span class="hljs-keyword">import</span> AdminLayout from '@/components/admin/Layout.vue'
<span class="hljs-keyword">import</span> Admin from '@/views/admin/Admin.vue'
<span class="hljs-keyword">import</span> UserManage from '@/views/admin/UserManage.vue'
<span class="hljs-keyword">import</span> CityManage from '@/views/admin/CityManage.vue'
<span class="hljs-keyword">import</span> ConditionManage from '@/views/admin/ConditionManage.vue'
<span class="hljs-keyword">import</span> ConditionTypeManage from '@/views/admin/ConditionTypeManage.vue'
<span class="hljs-keyword">import</span> IndustryManage from '@/views/admin/IndustryManage.vue'
<span class="hljs-keyword">import</span> Setting from '@/views/admin/Setting.vue'
<span class="hljs-keyword">import</span> Notice from '@/views/admin/Notice.vue'

<span class="hljs-keyword">import</span> Login from '@/views/login/Login.vue'

Vue.use(Router)

let router = new Router({
  mode: <span class="hljs-string">'history'</span>,
  routes: [
    {
      <span class="hljs-built_in">path</span>: <span class="hljs-string">'/'</span>,
      <span class="hljs-keyword">name</span>: <span class="hljs-string">'admin'</span>,
      component: AdminLayout,
      children:[
        {
          <span class="hljs-built_in">path</span>:<span class="hljs-string">''</span>,
          <span class="hljs-keyword">name</span>:<span class="hljs-string">'index'</span>,
          meta:{
            <span class="hljs-built_in">title</span>:<span class="hljs-string">'首页'</span>,
          },
          component:Admin
        },        
        {
          <span class="hljs-built_in">path</span>:<span class="hljs-string">'usermanage'</span>,
          <span class="hljs-keyword">name</span>:<span class="hljs-string">'user-manage'</span>,
          meta:{
            <span class="hljs-built_in">title</span>:<span class="hljs-string">'用户管理'</span>,
          },
          component:UserManage
        },
        {
          <span class="hljs-built_in">path</span>:<span class="hljs-string">'citymanage'</span>,
          <span class="hljs-keyword">name</span>:<span class="hljs-string">'citymanage'</span>,
          meta:{
            <span class="hljs-built_in">title</span>:<span class="hljs-string">'城市管理'</span>
          },
          component:CityManage
        },
        {
          <span class="hljs-built_in">path</span>:<span class="hljs-string">'conditiontypemanage'</span>,
          <span class="hljs-keyword">name</span>:<span class="hljs-string">'conditiontypemanage'</span>,
          meta:{
            <span class="hljs-built_in">title</span>:<span class="hljs-string">'条件类型管理'</span>
          },
          component:ConditionTypeManage
        },
        {
          <span class="hljs-built_in">path</span>:<span class="hljs-string">'conditionmanage'</span>,
          <span class="hljs-keyword">name</span>:<span class="hljs-string">'conditionmanage'</span>,
          meta:{
            <span class="hljs-built_in">title</span>:<span class="hljs-string">'条件管理'</span>
          },
          component:ConditionManage
        },
        {
          <span class="hljs-built_in">path</span>:<span class="hljs-string">'industrymanage'</span>,
          <span class="hljs-keyword">name</span>:<span class="hljs-string">'industrymanage'</span>,
          meta:{
            <span class="hljs-built_in">title</span>:<span class="hljs-string">'一级行业'</span>
          },
          component:IndustryManage
        },
        {
          <span class="hljs-built_in">path</span>:<span class="hljs-string">'setting'</span>,
          <span class="hljs-keyword">name</span>:<span class="hljs-string">'setting'</span>,
          meta:{
            <span class="hljs-built_in">title</span>:<span class="hljs-string">'设置'</span>
          },
          component:Setting
        },
        {
          <span class="hljs-built_in">path</span>:<span class="hljs-string">'notice'</span>,
          <span class="hljs-keyword">name</span>:<span class="hljs-string">'notice'</span>,
          meta:{
            <span class="hljs-built_in">title</span>:<span class="hljs-string">'通知'</span>
          },
          component:Notice
        },
        {
          <span class="hljs-built_in">path</span>:<span class="hljs-string">'test'</span>,
          <span class="hljs-keyword">name</span>:<span class="hljs-string">'test'</span>,
          meta:{
            <span class="hljs-built_in">title</span>:<span class="hljs-string">'测试'</span>
          },
          component:Setting
        }
      ]
    },
    {
      <span class="hljs-built_in">path</span>:<span class="hljs-string">'/login'</span>,
      <span class="hljs-keyword">name</span>:<span class="hljs-string">'login'</span>,
      meta:{
        <span class="hljs-built_in">title</span>:<span class="hljs-string">'登录'</span>,
      },
      component:Login
    },
  ]
})


router.beforeEach((to, from, next) =&gt; {
  let token = localStorage.token;
  <span class="hljs-keyword">if</span>(token &amp;&amp; to.<span class="hljs-keyword">name</span> != <span class="hljs-string">'login'</span>){
    next()
  }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(token &amp;&amp; to.<span class="hljs-keyword">name</span> == <span class="hljs-string">'login'</span>){
    next(<span class="hljs-string">'/'</span>);
  }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(!token &amp;&amp; to.<span class="hljs-keyword">name</span> != <span class="hljs-string">'login'</span>){
    next(<span class="hljs-string">'/login'</span>)
  }<span class="hljs-keyword">else</span>{
    next()
  }
})

export default router;</code></pre>
<p>最后，总结一下：其实网上有好多类似的模板管理页面，但是个人感觉一般，所以自己写了一个，相信在不久的将来这样的模板布局页面会越来越多的。</p>
<p>如果你觉得帮助到你了，可以打赏我更有动力来更新文章</p>
<p><span class="img-wrap"><img data-src="/img/bVbhA0O?w=900&amp;h=1350" src="https://static.alili.tech/img/bVbhA0O?w=900&amp;h=1350" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>1、<a href="https://www.iviewui.com/components/layout" rel="nofollow noreferrer" target="_blank">iview官网</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于iview的后台管理模板布局页面

## 原文链接
[https://segmentfault.com/a/1190000014737755](https://segmentfault.com/a/1190000014737755)

