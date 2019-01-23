---
title: '如何获取、安装和制作 GTK 主题' 
date: 2019-01-24 2:30:11
hidden: true
slug: 12n101yue03m
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#如何获取安装和制作-gtk-主题"></a>如何获取、安装和制作 GTK 主题</h1>
<p>多数桌面版 Linux 都支持主题。GUI（LCTT 译注：图形用户界面）独有的外观或者“风格”叫做主题。用户可以改变主题让桌面看起来与众不同。通常，用户也会更改图标，然而，主题和图标包是两个独立的实体。很多人想制作他们自己的主题，因此这是一篇关于 GTK 主题的制作以及各种制作时所必需的信息的文章。</p>
<p><strong>注意：</strong> 这篇文章着重讨论 GTK3，但会稍微谈一下 GTK2、Metacity 等。本文不会讨论光标和图标。</p>
<p>###基本概念</p>
<p>GIMP 工具包（简称 GTK）是一个用来在多种系统上（因此造就了 GTK 的跨平台）创建图形用户界面的构件工具包。GTK（<a href="http://www.gtk.org/">http://www.gtk.org/</a>）通常被误认为代表“GNOME 工具包”，但实际上它代表“GIMP 工具包”，因为最初创造它是为了给 GIMP 设计用户界面。GTK 是一个用 C 语言编写的面向对象工具包（GTK 本身不是一种语言）。GTK 遵循 LGPL 协议完全开源。GTK 是一个广泛使用的图形用户界面工具包，它含有很多用于 GTK 的工具。</p>
<p>为 GTK 制作的主题无法用在基于 Qt 的应用上。QT 应用需要使用 Qt 主题。</p>
<p>主题使用层叠样式表（CSS）来生成主题样式。这里的 CSS 和网站开发者在网页上使用的相同。然而不是引用 HTML 标签，而是引用 GTK 构件的专用标签。学习 CSS 对主题开发者来说很重要。</p>
<h3><a href="#主题存放位置"></a>主题存放位置</h3>
<p>主题可能会存储在 <code>~/.themes</code> 或者 <code>/usr/share/themes</code> 文件夹中。存放在 <code>~/.themes</code> 文件夹下的主题只有此 home 文件夹的所有者可以使用。而存放在 <code>/usr/share/themes</code> 文件夹下的全局主题可供所有用户使用。当执行 GTK 程序时，它会按照某种确定的顺序检查可用主题文件的列表。如果没有找到主题文件，它会尝试检查列表中的下一个文件。下述文字是 GTK3 程序检查时的顺序列表。</p>
<ol>
<li><code>$XDG_CONFIG_HOME/gtk-3.0/gtk.css</code> （另一写法 <code>~/.config/gtk-3.0/gtk.css</code>）</li>
<li><code>~/.themes/NAME/gtk-3.0/gtk.css</code></li>
<li><code>$datadir/share/themes/NAME/gtk-3.0/gtk.css</code> （另一写法 <code>/usr/share/themes/name/gtk-3.0/gtk.css</code>）</li>
</ol>
<p><strong>注意：</strong> “NAME”代表当前主题名称。</p>
<p>如果有两个主题名字相同，那么存放在用户 home 文件夹（<code>~/.themes</code>）里的主题会被优先使用。开发者可以利用这个 GTK 主题查找算法的优势来测试存放在本地 home 文件夹的主题。</p>
<h3><a href="#主题引擎"></a>主题引擎</h3>
<p>主题引擎是软件的一部分，用来改变图形用户界面构件的外观。引擎通过解析主题文件来了解应当绘制多少种构件。有些引擎随着主题被开发出来。每种引擎都有优点和缺点，还有些引擎添加了某些特性和特色。</p>
<p>从默认软件源中可以获取很多主题引擎。Debian 系的 Linux 发行版可以执行 <code>apt-get install gtk2-engines-murrine gtk2-engines-pixbuf gtk3-engines-unico</code> 命令来安装三种不同的引擎。很多引擎同时支持 GTK2 和 GTK3。以下述列表为例：</p>
<ul>
<li>gtk2-engines-aurora - Aurora GTK2 引擎</li>
<li>gtk2-engines-pixbuf - Pixbuf GTK2 引擎</li>
<li>gtk3-engines-oxygen - 将 Oxygen 组件风格移植 GTK 的引擎</li>
<li>gtk3-engines-unico - Unico GTK3 引擎</li>
<li>gtk3-engines-xfce - 用于 Xfce 的 GTK3 引擎</li>
</ul>
<h3><a href="#创作-gtk3-主题"></a>创作 GTK3 主题</h3>
<p>开发者创作 GTK3 主题时，或者从空文件着手，或者将已有的主题作为模板。从现存主题着手可能会对新手有帮助。比如，开发者可以把主题复制到用户的 home 文件夹，然后编辑这些文件。</p>
<p>GTK3 主题的通用格式是新建一个以主题名字命名的文件夹。然后新建一个名为 <code>gtk-3.0</code> 的子目录，在子目录里新建一个名为 <code>gtk.css</code> 的文件。在文件 <code>gtk.css</code> 里，使用 CSS 代码写出主题的外观。为了测试可以将主题移动到 <code>~/.theme</code> 里。使用新主题并在必要时进行改进。如果有需求，开发者可以添加额外的组件，使主题支持 GTK2、Openbox、Metacity、Unity 等桌面环境。</p>
<p>为了阐明如何创造主题，我们会学习 Ambiance 主题，通常可以在 <code>/usr/share/themes/Ambiance</code> 找到它。此目录包含下面列出的子目录以及一个名为 <code>index.theme</code> 的文件。</p>
<ul>
<li>gtk-2.0</li>
<li>gtk-3.0</li>
<li>metacity-1</li>
<li>unity</li>
</ul>
<p><code>index.theme</code> 含有元数据（比如主题的名字）和一些重要的配置（比如按钮的布局）。下面是 Ambiance 主题的 <code>index.theme</code> 文件内容。</p>
<pre><code class="hljs ini"><span class="hljs-section">[Desktop Entry]</span>
<span class="hljs-attr">Type</span>=X-GNOME-Metatheme
<span class="hljs-attr">Name</span>=Ambiance
<span class="hljs-attr">Comment</span>=Ubuntu Ambiance theme
<span class="hljs-attr">Encoding</span>=UTF-<span class="hljs-number">8</span>
<span class="hljs-section">
[X-GNOME-Metatheme]</span>
<span class="hljs-attr">GtkTheme</span>=Ambiance
<span class="hljs-attr">MetacityTheme</span>=Ambiance
<span class="hljs-attr">IconTheme</span>=ubuntu-mo<span class="hljs-literal">no</span>-dark
<span class="hljs-attr">CursorTheme</span>=DMZ-White
<span class="hljs-attr">ButtonLayout</span>=close,minimize,maximize:
<span class="hljs-attr">X-Ubuntu-UseOverlayScrollbars</span>=<span class="hljs-literal">true</span>

</code></pre><p><code>gtk-2.0</code> 目录包括支持 GTK2 的文件，比如文件 <code>gtkrc</code> 和文件夹 <code>apps</code>。文件夹 <code>apps</code> 包括具体程序的 GTK 配置。文件 <code>gtkrc</code> 是 GTK2 部分的主要 CSS 文件。下面是 <code>/usr/share/themes/Ambiance/gtk-2.0/apps/nautilus.rc</code> 文件的内容。</p>
<pre><code class="hljs vala"><span class="hljs-meta"># ==============================================================================</span>
<span class="hljs-meta"># NAUTILUS SPECIFIC SETTINGS</span>
<span class="hljs-meta"># ==============================================================================</span>

style <span class="hljs-string">"nautilus_info_pane"</span> {
   bg[NORMAL] = @bg_color
}

widget_class <span class="hljs-string">"*Nautilus*&lt;GtkNotebook&gt;*&lt;GtkEventBox&gt;"</span> style <span class="hljs-string">"nautilus_info_pane"</span>
widget_class <span class="hljs-string">"*Nautilus*&lt;GtkButton&gt;"</span> style <span class="hljs-string">"notebook_button"</span>
widget_class <span class="hljs-string">"*Nautilus*&lt;GtkButton&gt;*&lt;GtkLabel&gt;"</span> style <span class="hljs-string">"notebook_button"</span>

</code></pre><p><code>gtk-3.0</code> 目录里是 GTK3 的文件。GTK3 使用 <code>gtk.css</code> 取代了 <code>gtkrc</code> 作为主文件。对于 Ambiance 主题，此文件有一行 <code>@import url("gtk-main.css");</code>。<code>settings.ini</code> 包含重要的主题级配置。GTK3 主题的 <code>apps</code> 目录和 GTK2 有同样的作用。<code>assets</code> 目录里有单选按钮、多选框等的图像文件。下面是 <code>/usr/share/themes/Ambiance/gtk-3.0/gtk-main.css</code> 的内容。</p>
<pre><code class="hljs less"><span class="hljs-comment">/*default color scheme */</span>
<span class="hljs-variable">@define-color</span> bg_color <span class="hljs-number">#f2f1f0</span>;
<span class="hljs-variable">@define-color</span> fg_color <span class="hljs-number">#4c4c4c</span>;
<span class="hljs-variable">@define-color</span> base_color <span class="hljs-number">#ffffff</span>;
<span class="hljs-variable">@define-color</span> text_color <span class="hljs-number">#3C3C3C</span>;
<span class="hljs-variable">@define-color</span> selected_bg_color <span class="hljs-number">#f07746</span>;
<span class="hljs-variable">@define-color</span> selected_fg_color <span class="hljs-number">#ffffff</span>;
<span class="hljs-variable">@define-color</span> tooltip_bg_color <span class="hljs-number">#000000</span>;
<span class="hljs-variable">@define-color</span> tooltip_fg_color <span class="hljs-number">#ffffff</span>;

<span class="hljs-comment">/* misc colors used by gtk+
 *
 * Gtk doesn't currently expand color variables for style properties. Thus,
 * gtk-widgets.css uses literal color names, but includes a comment containing
 * the name of the variable. Please remember to change values there as well
 * when changing one of the variables below.
 */</span>
<span class="hljs-variable">@define-color</span> info_fg_color rgb (<span class="hljs-number">181</span>, <span class="hljs-number">171</span>, <span class="hljs-number">156</span>);
<span class="hljs-variable">@define-color</span> info_bg_color rgb (<span class="hljs-number">252</span>, <span class="hljs-number">252</span>, <span class="hljs-number">189</span>);
<span class="hljs-variable">@define-color</span> warning_fg_color rgb (<span class="hljs-number">173</span>, <span class="hljs-number">120</span>, <span class="hljs-number">41</span>);
<span class="hljs-variable">@define-color</span> warning_bg_color rgb (<span class="hljs-number">250</span>, <span class="hljs-number">173</span>, <span class="hljs-number">61</span>);
<span class="hljs-variable">@define-color</span> question_fg_color rgb (<span class="hljs-number">97</span>, <span class="hljs-number">122</span>, <span class="hljs-number">214</span>);
<span class="hljs-variable">@define-color</span> question_bg_color rgb (<span class="hljs-number">138</span>, <span class="hljs-number">173</span>, <span class="hljs-number">212</span>);
<span class="hljs-variable">@define-color</span> error_fg_color rgb (<span class="hljs-number">235</span>, <span class="hljs-number">235</span>, <span class="hljs-number">235</span>);
<span class="hljs-variable">@define-color</span> error_bg_color rgb (<span class="hljs-number">223</span>, <span class="hljs-number">56</span>, <span class="hljs-number">44</span>);
<span class="hljs-variable">@define-color</span> link_color <span class="hljs-variable">@selected_bg_color</span>;
<span class="hljs-variable">@define-color</span> success_color <span class="hljs-number">#4e9a06</span>;
<span class="hljs-variable">@define-color</span> error_color <span class="hljs-number">#df382c</span>;

<span class="hljs-comment">/* theme common colors */</span>
<span class="hljs-variable">@define-color</span> button_bg_color shade (<span class="hljs-variable">@bg_color</span>, <span class="hljs-number">1.02</span>); <span class="hljs-comment">/*shade (#cdcdcd, 1.08);*/</span>
<span class="hljs-variable">@define-color</span> notebook_button_bg_color shade (<span class="hljs-variable">@bg_color</span>, <span class="hljs-number">1.02</span>);
<span class="hljs-variable">@define-color</span> button_insensitive_bg_color mix (<span class="hljs-variable">@button_bg_color</span>, <span class="hljs-variable">@bg_color</span>, <span class="hljs-number">0.6</span>);
<span class="hljs-variable">@define-color</span> dark_bg_color <span class="hljs-number">#3c3b37</span>;
<span class="hljs-variable">@define-color</span> dark_fg_color <span class="hljs-number">#dfdbd2</span>;

<span class="hljs-variable">@define-color</span> backdrop_fg_color mix (<span class="hljs-variable">@bg_color</span>, <span class="hljs-variable">@fg_color</span>, <span class="hljs-number">0.8</span>);
<span class="hljs-variable">@define-color</span> backdrop_text_color mix (<span class="hljs-variable">@base_color</span>, <span class="hljs-variable">@text_color</span>, <span class="hljs-number">0.8</span>);
<span class="hljs-variable">@define-color</span> backdrop_dark_fg_color mix (<span class="hljs-variable">@dark_bg_color</span>, <span class="hljs-variable">@dark_fg_color</span>, <span class="hljs-number">0.75</span>);
<span class="hljs-comment">/*@define-color backdrop_dark_bg_color mix (@dark_bg_color, @dark_fg_color, 0.75);*/</span>
<span class="hljs-variable">@define-color</span> backdrop_selected_bg_color shade (<span class="hljs-variable">@bg_color</span>, <span class="hljs-number">0.92</span>);
<span class="hljs-variable">@define-color</span> backdrop_selected_fg_color <span class="hljs-variable">@fg_color</span>;

<span class="hljs-variable">@define-color</span> focus_color alpha (<span class="hljs-variable">@selected_bg_color</span>, <span class="hljs-number">0.5</span>);
<span class="hljs-variable">@define-color</span> focus_bg_color alpha (<span class="hljs-variable">@selected_bg_color</span>, <span class="hljs-number">0.1</span>);

<span class="hljs-variable">@define-color</span> shadow_color alpha(black, <span class="hljs-number">0.5</span>);

<span class="hljs-variable">@define-color</span> osd_fg_color <span class="hljs-number">#eeeeec</span>;
<span class="hljs-variable">@define-color</span> osd_bg_color alpha(<span class="hljs-number">#202526</span>, <span class="hljs-number">0.7</span>);
<span class="hljs-variable">@define-color</span> osd_border_color alpha(black, <span class="hljs-number">0.7</span>);

<span class="hljs-keyword">@import</span> url(<span class="hljs-string">"gtk-widgets-borders.css"</span>);
<span class="hljs-keyword">@import</span> url(<span class="hljs-string">"gtk-widgets-assets.css"</span>);
<span class="hljs-keyword">@import</span> url(<span class="hljs-string">"gtk-widgets.css"</span>);
<span class="hljs-keyword">@import</span> url(<span class="hljs-string">"apps/geary.css"</span>);
<span class="hljs-keyword">@import</span> url(<span class="hljs-string">"apps/unity.css"</span>);
<span class="hljs-keyword">@import</span> url(<span class="hljs-string">"apps/baobab.css"</span>);
<span class="hljs-keyword">@import</span> url(<span class="hljs-string">"apps/gedit.css"</span>);
<span class="hljs-keyword">@import</span> url(<span class="hljs-string">"apps/nautilus.css"</span>);
<span class="hljs-keyword">@import</span> url(<span class="hljs-string">"apps/gnome-panel.css"</span>);
<span class="hljs-keyword">@import</span> url(<span class="hljs-string">"apps/gnome-terminal.css"</span>);
<span class="hljs-keyword">@import</span> url(<span class="hljs-string">"apps/gnome-system-log.css"</span>);
<span class="hljs-keyword">@import</span> url(<span class="hljs-string">"apps/unity-greeter.css"</span>);
<span class="hljs-keyword">@import</span> url(<span class="hljs-string">"apps/glade.css"</span>);
<span class="hljs-keyword">@import</span> url(<span class="hljs-string">"apps/california.css"</span>);
<span class="hljs-keyword">@import</span> url(<span class="hljs-string">"apps/software-center.css"</span>);
<span class="hljs-keyword">@import</span> url(<span class="hljs-string">"public-colors.css"</span>);

</code></pre><p><code>metacity-1</code> 文件夹含有 Metacity 窗口管理器按钮（比如“关闭窗口”按钮）的图像文件。此目录还有一个名为 <code>metacity-theme-1.xml</code> 的文件，包括了主题的元数据（像开发者的名字）和主题设计。然而，主题的 Metacity 部分使用 XML 文件而不是 CSS 文件。</p>
<p><code>unity</code> 文件夹含有 Unity 按钮使用的 SVG 文件。除了 SVG 文件，这里没有其他的文件。</p>
<p>一些主题可能也会包含其他的目录。比如， Clearlooks-Phenix 主题有名为 <code>openbox-3</code> 和 <code>xfwm4</code> 的文件夹。<code>openbox-3</code> 文件夹仅有一个 <code>themerc</code> 文件，声明了主题配置和外观（下面有文件示例）。<code>xfwm4</code> 目录含有几个 xpm 文件、几个 png 图像文件（在 <code>png</code> 文件夹里）、一个 <code>README</code> 文件，还有个包含了主题配置的 <code>themerc</code> 文件（就像下面看到的那样）。</p>
<p>/usr/share/themes/Clearlooks-Phenix/xfwm4/themerc</p>
<pre><code class="hljs ini"><span class="hljs-comment"># Clearlooks XFWM4 by Casey Kirsle</span>

<span class="hljs-attr">show_app_icon</span>=<span class="hljs-literal">true</span>
<span class="hljs-attr">active_text_color</span>=#FFFFFF
<span class="hljs-attr">inactive_text_color</span>=#<span class="hljs-number">939393</span>
<span class="hljs-attr">title_shadow_active</span>=frame
<span class="hljs-attr">title_shadow_inactive</span>=<span class="hljs-literal">false</span>
<span class="hljs-attr">button_layout</span>=O|HMC
<span class="hljs-attr">button_offset</span>=<span class="hljs-number">2</span>
<span class="hljs-attr">button_spacing</span>=<span class="hljs-number">2</span>
<span class="hljs-attr">full_width_title</span>=<span class="hljs-literal">true</span>
<span class="hljs-attr">maximized_offset</span>=<span class="hljs-number">0</span>
<span class="hljs-attr">title_vertical_offset_active</span>=<span class="hljs-number">1</span>
<span class="hljs-attr">title_vertical_offset_inactive</span>=<span class="hljs-number">1</span>

</code></pre><p>/usr/share/themes/Clearlooks-Phenix/openbox-3/themerc</p>
<pre><code class="hljs mel">!# Clearlooks-Evolving
!# Clearlooks as it evolves <span class="hljs-keyword">in</span> gnome-git...
!# Last updated <span class="hljs-number">09</span>/<span class="hljs-number">03</span>/<span class="hljs-number">10</span>

# Fonts
# these are really halos, but who cares?

*.font: shadow=n
<span class="hljs-keyword">window</span>.active.label.<span class="hljs-keyword">text</span>.font:shadow=y:shadowtint=<span class="hljs-number">30</span>:shadowoffset=<span class="hljs-number">1</span>
<span class="hljs-keyword">window</span>.inactive.label.<span class="hljs-keyword">text</span>.font:shadow=y:shadowtint=<span class="hljs-number">00</span>:shadowoffset=<span class="hljs-number">0</span>
<span class="hljs-keyword">menu</span>.items.font:shadow=y:shadowtint=<span class="hljs-number">0</span>:shadowoffset=<span class="hljs-number">1</span>

!# general stuff

border.width: <span class="hljs-number">1</span>
padding.width: <span class="hljs-number">3</span>
padding.height: <span class="hljs-number">2</span>
<span class="hljs-keyword">window</span>.handle.width: <span class="hljs-number">3</span>
<span class="hljs-keyword">window</span>.client.padding.width: <span class="hljs-number">0</span>
<span class="hljs-keyword">menu</span>.overlap: <span class="hljs-number">2</span>
*.justify: center

!# lets set our damn shadows here, eh?

*.bg.highlight: <span class="hljs-number">50</span>
*.bg.shadow:  <span class="hljs-number">05</span>

<span class="hljs-keyword">window</span>.active.title.bg.highlight: <span class="hljs-number">35</span>
<span class="hljs-keyword">window</span>.active.title.bg.shadow:  <span class="hljs-number">05</span>

<span class="hljs-keyword">window</span>.inactive.title.bg.highlight: <span class="hljs-number">30</span>
<span class="hljs-keyword">window</span>.inactive.title.bg.shadow:  <span class="hljs-number">05</span>

<span class="hljs-keyword">window</span>.*.grip.bg.highlight: <span class="hljs-number">50</span>
<span class="hljs-keyword">window</span>.*.grip.bg.shadow:  <span class="hljs-number">30</span>

<span class="hljs-keyword">window</span>.*.handle.bg.highlight: <span class="hljs-number">50</span>
<span class="hljs-keyword">window</span>.*.handle.bg.shadow:  <span class="hljs-number">30</span>

!# Menu settings

<span class="hljs-keyword">menu</span>.border.<span class="hljs-keyword">color</span>: #aaaaaa
<span class="hljs-keyword">menu</span>.border.width: <span class="hljs-number">1</span>

<span class="hljs-keyword">menu</span>.title.bg: solid flat
<span class="hljs-keyword">menu</span>.title.bg.<span class="hljs-keyword">color</span>: #E6E7E6
<span class="hljs-keyword">menu</span>.title.<span class="hljs-keyword">text</span>.<span class="hljs-keyword">color</span>: #<span class="hljs-number">111111</span>

<span class="hljs-keyword">menu</span>.items.bg: Flat Solid
<span class="hljs-keyword">menu</span>.items.bg.<span class="hljs-keyword">color</span>: #ffffff
<span class="hljs-keyword">menu</span>.items.<span class="hljs-keyword">text</span>.<span class="hljs-keyword">color</span>: #<span class="hljs-number">111111</span>
<span class="hljs-keyword">menu</span>.items.disabled.<span class="hljs-keyword">text</span>.<span class="hljs-keyword">color</span>: #aaaaaa

<span class="hljs-keyword">menu</span>.items.active.bg: Flat Gradient splitvertical border

<span class="hljs-keyword">menu</span>.items.active.bg.<span class="hljs-keyword">color</span>: #<span class="hljs-number">97</span>b8e2
<span class="hljs-keyword">menu</span>.items.active.bg.<span class="hljs-keyword">color</span>.splitTo: #a8c5e9

<span class="hljs-keyword">menu</span>.items.active.bg.colorTo: #<span class="hljs-number">91</span>b3de
<span class="hljs-keyword">menu</span>.items.active.bg.colorTo.splitTo: #<span class="hljs-number">80</span>a7d6
<span class="hljs-keyword">menu</span>.items.active.bg.border.<span class="hljs-keyword">color</span>: #<span class="hljs-number">4</span>b6e99
<span class="hljs-keyword">menu</span>.items.active.<span class="hljs-keyword">text</span>.<span class="hljs-keyword">color</span>: #ffffff

<span class="hljs-keyword">menu</span>.<span class="hljs-keyword">separator</span>.width: <span class="hljs-number">1</span>
<span class="hljs-keyword">menu</span>.<span class="hljs-keyword">separator</span>.padding.width: <span class="hljs-number">0</span>
<span class="hljs-keyword">menu</span>.<span class="hljs-keyword">separator</span>.padding.height: <span class="hljs-number">3</span>
<span class="hljs-keyword">menu</span>.<span class="hljs-keyword">separator</span>.<span class="hljs-keyword">color</span>: #aaaaaa

!# set handles here and only the once?

<span class="hljs-keyword">window</span>.*.handle.bg: Raised solid
<span class="hljs-keyword">window</span>.*.handle.bg.<span class="hljs-keyword">color</span>: #eaebec

<span class="hljs-keyword">window</span>.*.grip.bg: Raised solid
<span class="hljs-keyword">window</span>.*.grip.bg.<span class="hljs-keyword">color</span>: #eaebec

!# Active

<span class="hljs-keyword">window</span>.*.border.<span class="hljs-keyword">color</span>: #<span class="hljs-number">585</span>a5d

<span class="hljs-keyword">window</span>.active.title.<span class="hljs-keyword">separator</span>.<span class="hljs-keyword">color</span>: #<span class="hljs-number">4e76</span>a8

*.title.bg: Raised Gradient splitvertical
*.title.bg.<span class="hljs-keyword">color</span>: #<span class="hljs-number">8</span>CB0DC
*.title.bg.<span class="hljs-keyword">color</span>.splitTo: #<span class="hljs-number">99</span>BAE3
*.title.bg.colorTo: #<span class="hljs-number">86</span>ABD9
*.title.bg.colorTo.splitTo: #<span class="hljs-number">7</span>AA1D1

<span class="hljs-keyword">window</span>.active.label.bg: Parentrelative
<span class="hljs-keyword">window</span>.active.label.<span class="hljs-keyword">text</span>.<span class="hljs-keyword">color</span>: #ffffff

<span class="hljs-keyword">window</span>.active.<span class="hljs-keyword">button</span>.*.bg: Flat Gradient splitvertical Border

<span class="hljs-keyword">window</span>.active.<span class="hljs-keyword">button</span>.*.bg.<span class="hljs-keyword">color</span>: #<span class="hljs-number">92</span>B4DF
<span class="hljs-keyword">window</span>.active.<span class="hljs-keyword">button</span>.*.bg.<span class="hljs-keyword">color</span>.splitTo: #B0CAEB
<span class="hljs-keyword">window</span>.active.<span class="hljs-keyword">button</span>.*.bg.colorTo: #<span class="hljs-number">86</span>ABD9
<span class="hljs-keyword">window</span>.active.<span class="hljs-keyword">button</span>.*.bg.colorTo.splitTo: #<span class="hljs-number">769</span>FD0

<span class="hljs-keyword">window</span>.active.<span class="hljs-keyword">button</span>.*.bg.border.<span class="hljs-keyword">color</span>: #<span class="hljs-number">49678</span>B
<span class="hljs-keyword">window</span>.active.<span class="hljs-keyword">button</span>.*.<span class="hljs-keyword">image</span>.<span class="hljs-keyword">color</span>: #F4F5F6

<span class="hljs-keyword">window</span>.active.<span class="hljs-keyword">button</span>.hover.bg.<span class="hljs-keyword">color</span>: #b5d3ef
<span class="hljs-keyword">window</span>.active.<span class="hljs-keyword">button</span>.hover.bg.<span class="hljs-keyword">color</span>.splitTo: #b5d3ef
<span class="hljs-keyword">window</span>.active.<span class="hljs-keyword">button</span>.hover.bg.colorTo: #<span class="hljs-number">9</span>cbae7
<span class="hljs-keyword">window</span>.active.<span class="hljs-keyword">button</span>.hover.bg.colorTo.splitTo: #<span class="hljs-number">8</span>caede
<span class="hljs-keyword">window</span>.active.<span class="hljs-keyword">button</span>.hover.bg.border.<span class="hljs-keyword">color</span>: #<span class="hljs-number">4</span>A658C
<span class="hljs-keyword">window</span>.active.<span class="hljs-keyword">button</span>.hover.<span class="hljs-keyword">image</span>.<span class="hljs-keyword">color</span>: #ffffff

<span class="hljs-keyword">window</span>.active.<span class="hljs-keyword">button</span>.pressed.bg: Flat solid Border
<span class="hljs-keyword">window</span>.active.<span class="hljs-keyword">button</span>.pressed.bg.<span class="hljs-keyword">color</span>: #<span class="hljs-number">7</span>aa1d2

<span class="hljs-keyword">window</span>.active.<span class="hljs-keyword">button</span>.hover.bg.border.<span class="hljs-keyword">color</span>: #<span class="hljs-number">4</span>A658C

!# inactive

!#<span class="hljs-keyword">window</span>.inactive.border.<span class="hljs-keyword">color</span>: #<span class="hljs-number">7e8285</span>
<span class="hljs-keyword">window</span>.inactive.title.<span class="hljs-keyword">separator</span>.<span class="hljs-keyword">color</span>: #<span class="hljs-number">96999</span>d

<span class="hljs-keyword">window</span>.inactive.title.bg: Raised Gradient splitvertical
<span class="hljs-keyword">window</span>.inactive.title.bg.<span class="hljs-keyword">color</span>: #E3E2E0
<span class="hljs-keyword">window</span>.inactive.title.bg.<span class="hljs-keyword">color</span>.splitTo: #EBEAE9
<span class="hljs-keyword">window</span>.inactive.title.bg.colorTo: #DEDCDA
<span class="hljs-keyword">window</span>.inactive.title.bg.colorTo.splitTo: #D5D3D1

<span class="hljs-keyword">window</span>.inactive.label.bg: Parentrelative
<span class="hljs-keyword">window</span>.inactive.label.<span class="hljs-keyword">text</span>.<span class="hljs-keyword">color</span>: #<span class="hljs-number">70747</span>d

<span class="hljs-keyword">window</span>.inactive.<span class="hljs-keyword">button</span>.*.bg: Flat Gradient splitVertical Border
<span class="hljs-keyword">window</span>.inactive.<span class="hljs-keyword">button</span>.*.bg.<span class="hljs-keyword">color</span>: #ffffff
<span class="hljs-keyword">window</span>.inactive.<span class="hljs-keyword">button</span>.*.bg.<span class="hljs-keyword">color</span>.splitto: #ffffff
<span class="hljs-keyword">window</span>.inactive.<span class="hljs-keyword">button</span>.*.bg.colorTo: #F9F8F8
<span class="hljs-keyword">window</span>.inactive.<span class="hljs-keyword">button</span>.*.bg.colorTo.splitto: #E9E7E6
<span class="hljs-keyword">window</span>.inactive.<span class="hljs-keyword">button</span>.*.bg.border.<span class="hljs-keyword">color</span>: #<span class="hljs-number">928</span>F8B
<span class="hljs-keyword">window</span>.inactive.<span class="hljs-keyword">button</span>.*.<span class="hljs-keyword">image</span>.<span class="hljs-keyword">color</span>: #<span class="hljs-number">6</span>D6C6C

!# osd (pop ups and what not, dock?)

osd.border.width: <span class="hljs-number">1</span>
osd.border.<span class="hljs-keyword">color</span>:  #aaaaaa

osd.bg: flat border gradient splitvertical
osd.bg.<span class="hljs-keyword">color</span>: #F0EFEE
osd.bg.<span class="hljs-keyword">color</span>.splitto: #f5f5f4
osd.bg.colorTo: #EAEBEC
osd.bg.colorTo.splitto: #E7E5E4

osd.bg.border.<span class="hljs-keyword">color</span>: #ffffff

osd.active.label.bg: parentrelative
osd.active.label.bg.<span class="hljs-keyword">color</span>: #efefef
osd.active.label.bg.border.<span class="hljs-keyword">color</span>: #<span class="hljs-number">9</span>c9e9c
osd.active.label.<span class="hljs-keyword">text</span>.<span class="hljs-keyword">color</span>: #<span class="hljs-number">444</span>

osd.inactive.label.bg: parentrelative
osd.inactive.label.<span class="hljs-keyword">text</span>.<span class="hljs-keyword">color</span>: #<span class="hljs-number">70747</span>d

!# yeah whatever, this is fine anyhoo?
osd.hilight.bg: flat vertical gradient
osd.hilight.bg.<span class="hljs-keyword">color</span>: #<span class="hljs-number">9</span>ebde5
osd.hilight.bg.colorTo: #<span class="hljs-number">749</span>dcf
osd.unhilight.bg: flat vertical gradient
osd.unhilight.bg.<span class="hljs-keyword">color</span>: #BABDB6
osd.unhilight.bg.colorTo: #efefef

</code></pre><h3><a href="#测试主题"></a>测试主题</h3>
<p>在创作主题时，测试主题并且微调代码对得到想要的样子是很有帮助的。有相当的开发者想要用到“主题预览器”这样的工具。幸运的是，已经有了。</p>
<ul>
<li>GTK+ Change Theme - 这个程序可以更改 GTK 主题，开发者可以用它预览主题。这个程序由一个含有很多构件的窗口组成，因此可以为主题提供一个完整的预览。要安装它，只需输入命令 <code>apt-get install gtk-chtheme</code>。</li>
<li>GTK Theme Switch - 用户可以使用它轻松地更换用户主题。测试主题时确保打开了一些应用，方便预览效果。要安装它，只需输入命令 <code>apt-get install gtk-theme-switch</code>，然后在终端敲出 <code>gtk-theme-switch2</code> 即可运行。</li>
<li>LXappearance - 它可以更换主题，图标以及字体。</li>
<li>PyWF - 这是基于 Python 开发的一个 The Widget Factory 的替代品。可以在 <a href="http://gtk-apps.org/content/show.php/PyTWF?content=102024">http://gtk-apps.org/content/show.php/PyTWF?content=102024</a> 获取 PyWF。</li>
<li>The Widget Factory - 这是一个古老的 GTK 预览器。要安装它，只需输入命令 <code>apt-get install thewidgetfactory</code>，然后在终端敲出 <code>twf</code> 即可运行。</li>
</ul>
<h3><a href="#主题下载"></a>主题下载</h3>
<ul>
<li>Cinnamon - <a href="http://gnome-look.org/index.php?xcontentmode=104">http://gnome-look.org/index.php?xcontentmode=104</a></li>
<li>Compiz - <a href="http://gnome-look.org/index.php?xcontentmode=102">http://gnome-look.org/index.php?xcontentmode=102</a></li>
<li>GNOME Shell - <a href="http://gnome-look.org/index.php?xcontentmode=191">http://gnome-look.org/index.php?xcontentmode=191</a></li>
<li>GTK2 - <a href="http://gnome-look.org/index.php?xcontentmode=100">http://gnome-look.org/index.php?xcontentmode=100</a></li>
<li>GTK3 - <a href="http://gnome-look.org/index.php?xcontentmode=167">http://gnome-look.org/index.php?xcontentmode=167</a></li>
<li>KDE/Qt - <a href="http://kde-look.org/index.php?xcontentmode=8x9x10x11x12x13x14x15x16">http://kde-look.org/index.php?xcontentmode=8x9x10x11x12x13x14x15x16</a></li>
<li>Linux Mint Themes - <a href="http://linuxmint-art.org/index.php?xcontentmode=9x14x100">http://linuxmint-art.org/index.php?xcontentmode=9x14x100</a></li>
<li>Metacity - <a href="http://gnome-look.org/index.php?xcontentmode=101">http://gnome-look.org/index.php?xcontentmode=101</a></li>
<li>Ubuntu Themes - <a href="http://www.ubuntuthemes.org/">http://www.ubuntuthemes.org/</a></li>
</ul>
<h3><a href="#延伸阅读"></a>延伸阅读</h3>
<ul>
<li>Graphical User Interface (GUI) Reading Guide - <a href="http://www.linux.org/threads/gui-reading-guide.6471/">http://www.linux.org/threads/gui-reading-guide.6471/</a></li>
<li>GTK - <a href="http://www.linux.org/threads/understanding-gtk.6291/">http://www.linux.org/threads/understanding-gtk.6291/</a></li>
<li>Introduction to Glade - <a href="http://www.linux.org/threads/introduction-to-glade.7142/">http://www.linux.org/threads/introduction-to-glade.7142/</a></li>
<li>Desktop Environment vs Window Managers - <a href="http://www.linux.org/threads/desktop-environment-vs-window-managers.7802/">http://www.linux.org/threads/desktop-environment-vs-window-managers.7802/</a></li>
<li>Official GTK+ 3 Reference Manual - <a href="https://developer.gnome.org/gtk3/stable/">https://developer.gnome.org/gtk3/stable/</a></li>
<li>GtkCssProvider - <a href="https://developer.gnome.org/gtk3/stable/GtkCssProvider.html">https://developer.gnome.org/gtk3/stable/GtkCssProvider.html</a></li>
</ul>
<hr>
<p>via: <a href="http://www.linux.org/threads/installing-obtaining-and-making-gtk-themes.8463/">http://www.linux.org/threads/installing-obtaining-and-making-gtk-themes.8463/</a></p>
<p>作者：<a href="http://www.linux.org/members/devyncjohnson.4843/">DevynCJohnson</a> 译者：<a href="https://github.com/fuowang">fuowang</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何获取、安装和制作 GTK 主题

## 原文链接
[https://www.zcfy.cc/article/installing-obtaining-and-making-gtk-themes](https://www.zcfy.cc/article/installing-obtaining-and-making-gtk-themes)

