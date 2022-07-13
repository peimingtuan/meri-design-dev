### 更新日志

::: tip 2021.07.16
版本：1.5.2<br>
1.TableGrid新增checkboxDisabled是否禁用头部checkbox<br>
2.修改PickerDate、PickerTime、PickerMonth、PickerMonthDay日历左边放在左侧（修改后单选触发器宽度改为200）<br>
:::

::: tip 2021.06.04
版本：1.5.1<br>
1.inputNumber precision为零不能输入小数点<br>
2.修复TableHeader排序按钮<br>
3.SidebarCustom新增自定义Icon<br>
4.Tooltip修复位置<br>
:::

::: tip 2021.05.12
版本：1.5.0<br>
1.TableGrid新增有二级表头时的行点击事件<br>
2.PTree PTreeSelect item新增icon<br>
3.新增es包，使用css3 root属性定义主题色<br>
4.input清空按钮，可以Hover或聚焦的时候再显示<br>
:::

::: tip 2021.04.27
版本：1.4.9<br>
1.CustomTreeSelectEnergy禁用...鼠标事件<br>
2.TableGrid修改筛选handle层级<br>
3.EditableList<br>
    (1)新增设置openChild为true的默认展开<br>
    (2)新增selectedId单选默认选中<br>
4.EmptyStatus新增custom开启自定义url<br>
5.PickerDate新增参数cautionTitle、caution设置提醒开关、选择日期返按钮<br>
6.新增MCascade定制版级联选择<br>
7.Breadcrumb新增ellipsis、change<br>
8.PickerMonthDay修复leapYear参数设置2月29天<br>
9.Table取消了行点击阻止冒泡<br>
10.修改Loading<br>
:::

::: tip 2021.02.04
版本：1.4.8<br>
1.MSelect参数maxCount新增设置8条<br>
2.DropDownButton在IE下新增鼠标在下拉弹出窗上滚动滚轮阻止关闭弹窗<br>
3.TableXxx表头新增阻止触摸板默认事件<br>
:::

::: tip 2021.01.22
版本：1.4.7<br>
1.Input修复异步v-modal绑定至改变，没显示清除按钮<br>
2.FileUpload、ImageUpload修改accept参数转小写后比较<br>
3.***修复webpack css副作用***<br>
:::

::: tip 2021.01.18
版本：1.4.6<br>
1.InputNumber最先值为0，手动输入0，禁用减小按钮<br>
2.Table已修复多选bug<br>
3.Pagination修复点击上一页下一页不生效问题<br>
4.PickerDate修复结束面板活动月点击报错问题<br>
5.Input新增参数computeNumber设置输入框是否计算数量，设置computeNumber之后不再限制输入框输入字符长度限制，且computeNumber目前只针对type="textarea"生效<br>
6.PTreeSelect：<br>
    (1)修复sameParams=true情况选中问题<br>
    (2)新增点击三角形展开收起弹窗<br>
    (3)新增参数onlySearchLastLevel只能搜索最后一级<br>
7.CustomTreeSelectEnergy:<br>
    (1)新增selectedSave点击确定按钮是否保存选中的数据在已选面板<br>
    (2)moreBtn新增selectedSave点击自定义按钮是否保存选中的数据在已选面板<br>
    (3)新增参数onlySearchLastLevel只能搜索最后一级<br>
8.TreeSelect：<br>
    (1)修改item左侧三角形指针展示样式<br>
    (2)修复单选右侧清除按钮位置<br>
    (3)修复单选文字溢出提示<br>
9.InputNumber设置精度precision后，输入末尾为.的值，失去焦点后去掉.小数点<br>
10.FileUpload、ImageUpload修改accept参数转小写后比较<br>
11.修改Popover延迟200ms弹出、关闭<br>
:::

::: tip 2020.12.24
版本：1.4.5<br>
1.Popover修复弹窗左侧位置<br>
2.PickerDate新增动态改变panel参数功能<br>
3.PickerTime2400新增阻止滚动条滚动关闭弹窗功能<br>
4.TreeSelect单选点击三角形后弹窗不关闭问题<br>
5.Checkbox新增.sync修饰符<br>
6.TableGard:<br>
    (1)新增align设置children左中右排列<br>
    (2)新增Checkbox阻止冒泡<br>
    (3)修改rowNumber宽度为68<br>
    (4)新增rowNumberName参数设置行号名字<br>
7.CustomTreeSelectEnergy:<br>
    (1)修复清空，在重新选择的bug<br>
8.PickerDate、PickerMonth、PickerMonthDay、PickerTime:<br>
    (1)新增triggerBorder参数设置是否显示触发器边框<br>
9.CustomTreeSelectEnergy:<br>
    (1)修复选中后清空不清除缓存问题<br>
    (2)修复所有子级选中不生效问题<br>
    (3)修复搜索列表选中，点击清空操作按钮状态不正确问题<br>
    (4)新增不返回父级数据参数includeParent<br>
10.PTreeSelect:<br>
    (1)新增不返回父级数据参数includeParent<br>
11.InputNumber修改精确度，保留小数位数不够，加零补位<br>
12.PTreeSelect：<br>
    (1)设置搜索面板宽度<br>
13.Pagination、Table：<br>
    (1)table添加defaultChecked参数<br>
    (2)增加全选事件all-check-change<br>
    (3)增加排序图标默认高亮设置<br>
    (4)pagination、table组件的page和pageSize修改为双向数据绑定<br>
    (5)解决table组件切换每页条数，触发两次page-size-change事件的问题<br>
    (6)table中checkbox新增阻止默认事件<br>
14.CustomTreeSelectEnergy：<br>
    (1)修复关闭弹窗清空搜索面板<br>
    (2)新增搜索面板选中项联动状态<br>
15.PickerTime选中上一级之后下一级禁用并设置滚动条位置<br>
:::

::: tip 2020.12.10
版本：1.4.4<br>
1.TableGrid<br>
    (1)修复操作栏固定参数<br>
    (2)td设置最大高度为48<br>
    (3)新增当没有data时header可出现横向滚动<br>
    (4)headerSetting弹窗在ie下的兼容<br>
2.CustomTreeSelectEnergy<br>
    (1)修改弹窗层级<br>
    (2)新增自定义按钮及参数<br>
    (3)新增v-modal参数<br>
    (4)新增sortByTree参数设置可选面板的排序方式<br>
3.Modal新增secondary开启二次确认参数，@close回调返回secondary参数<br>
4.PTree、PTreeSelect<br>
    (1)新增sortByTree按照树形结构排序选中的数据<br>
    (2)新增jointParent可选面板是否拼接父级name<br>
    (3)新增sortByTree参数设置可选面板的排序方式<br>
5.MSelect<br>
    (1)新增multiple多选<br>
6.PickerMonth<br>
    (1)修复零界点12不禁用问题<br>
7.SidebarCustom<br>
    (1)新增width和show外部控制参数<br>
8.DropDownButton<br>
    (1)新增change事件，返回当前点击的项<br>
    (2)新增active参数，激活选中项高亮<br>
9.处理相关组件在ie下的dom.remove()兼容<br>
:::

::: tip 2020.11.26
版本：1.4.3<br>
1.DropDown、MSelect修改<br>
    下拉的内容默认最多展示5条内容的高度，如果数据量大默认可展示8条内容的高度，若只有一条内容，则展示1条内容的高度<br>
2.TableGrid、TableTree<br>
    (1)二级表头取消文字最大宽度设置<br>
    (2)转换传入的宽度为Number类型进行计算<br>
    (3)data中tools的更多(more)选项下拉列表高度规则修改，详见1<br>
    (4)修复拖动滚动条时关闭header中的下拉弹窗<br>
    (5)修改header中筛选选中颜色为blue-500<br>
    (6)修复rowClick行点击事件<br>
3.MSelect、PickerDate、Select、TreeSelect、PTreeSelect新增错误提示参数errorText、errorShow<br>
4.Dropdown新增获取下拉列表状态回到<br>
5.InputNumber新增precision数值精度参数<br>
6.新增CustomTreeSelectEnergy运行能耗诊断弹窗选择器业务组件<br>
:::

::: tip
版本：1.4.2<br>
1.修复Caccader下拉弹窗位置 + 统计数量问题<br>
2.TableGrid、TableTree<br>
    (1)修复header设置列表<br>
    (2)修复组件排序不执行问题<br>
    (3)TableGrid二级表头筛选回调新增返回parentKey参数<br>
    (4)TableGrid修复排序重复减去滚动条问题<br>
    (5)新增默认排序参数规则[header数据说明](http://47.95.122.141:8208/guide/tableGrid/)<br>
    (6)修复data数据的text为0的排序<br>
3.Dropdown新增disabled<br>
4.PTreeSelect：<br>
    (1)新增没有生成下拉列表的时候清除tag也提交数据<br>
    (2)新增sameParams参数设置相同name和sameId的值禁用<br>
5.新增MSelect文档<br>
6.从1.4.2开始组件包不在内置第三方`lottie-web`插件<br>
7.Table多选文案改为已选择*项<br>
8.Pagination的总条数显示实际条数<br>
9.修改1.4.1包中Vue大写字母<br>
:::

::: tip
版本：1.4.1<br>
1.修复Caccader下拉弹窗位置<br>
2.TableGrid、TableTree<br>
    (1)重置左右滚动条<br>
    (2)新增width=100%撑满父级标签功能<br>
    (3)修改average默认(最小)宽度为80<br>
    (4)新增页面宽度改变时重新设置列宽函数resizeTableWidth<br>
3.PTreeSelect-tag类型新增标题<br>
    (1)重置左右滚动条<br>
4.新增THead独立表头组件<br>
:::

::: tip
版本：1.4.0<br>
1.Table按照设计要求修改了样式，解决了重置功能的bug<br>
2.PTreeSelect修改搜索列表和已选面板列表文字过长时行头显示省略号<br>
3.优化icon黑色版主题颜色<br>
4.优化Popover失去焦点弹窗被关闭问题<br>
5.修复Input动态清除输入的值后清除按钮不消失<br>
6.TableGrid<br>
    (1)新增二级表头<br>
    (2)新增分组<br>
7.修复Cascader统计数量的bug<br>
8.修改icon图标兼容黑色版主题组件（待完善）<br>
:::

::: tip
版本：1.3.9<br>
***新增黑色版（dark）主题颜色***<br>
1.Table给checkbox传递了自定义数据<br>
2.TableGrid、TableTree：<br>
    (1).筛选下拉弹窗操作栏新增背景颜色<br>
    (2).删选确定按钮新增前后选中的数据比较<br>
    (3).修复后端排序功能数据排序错误问题<br>
    (4).筛选-在没有点击确定情况下关闭下拉弹窗列表清空输入的内容<br>
    (5).新增表头扩拖动增减宽度<br>
    (6).根据新版UI搞修改操作栏<br>
3.PTreeSelect设置childDisable时，如果已选面板数据全部为disabled状态清空按钮状态为disabled<br>
4.Drawer：<br>
    (1).处理其他下拉选择器弹出Drawer关闭问题<br>
    (2).新增遮罩层<br>
5.Dropdown：设置最小高度为5条数据，最大高度为8条数据<br>
6.PickerDate：<br>
    (1).修改初始化传入的时间根据日周年月条件渲染<br>
    (2).修复点击activeYear是新增逻辑开始年不能小于结束年<br>
7.TreeSelect：<br>
    (1).打开下拉列表 - 有搜索的话，再次点击触发器是激活搜索输入框，若需要再次点击触发器收起请设置isReadOnly=true， 这里本来就两个事件引起冲突，所以我提供了两种交互方式<br>
    (2).不带可选面板 - 搜索列表选中后新增逻辑，不统计父级功能<br>
8.PTreeSelect：<br>
    (1).新增type=tag，已选择呈现方式以tag标签显示<br>
    (2).可根据showCheckbox空值显示checkbox显示隐藏<br>
:::

::: tip
版本：1.3.8<br>
1.PickerMonth修复在当前月快速切换之后，无法切换回当前月<br>
2.PTreeSelect：<br>
    a.修复设置childDisable时，在已选面板统计数据不正确的bug<br>
    b.修复父级选中子级没有选中<br>
    c.修改在选中列表中有禁用时隐藏清空按钮<br>
    d.可选面板新增已选计数<br>
3.PickerDate：<br>
    a.单选-设置picker为week时，修复关闭下拉面报错问题<br>
    b.修改滑动滚轮键不关闭弹窗，修改为页面位置发生改变重新计算下拉面板位置<br>
    c.修复设置scope可切换到下一个日期问题<br>
4.TableGrid、TableTree<br>
    a.新增文字超出显示省略号<br>
    b.筛选弹窗打开进行搜索，关闭下拉弹窗之后不会清空搜索内容；手动点击清空按钮方可清空回到筛选前状态<br>
    c.新增初始化默认排序<br>
5.Table新增功能不可以隐藏全部列，至少显示一列<br>
:::

::: tip
版本：1.3.7-rc<br>
Dropdown新增theme属性，可选值['light', 'dark']
:::

::: tip
版本：1.3.7<br>
1.TableGrid、TableTree:<br>
    - 优化组件销毁时移除相关实例<br>
    - 优化设置弹窗呈现位置<br>
    - 新增日期格式排序，sort: { type: 'date' }<br>
    - 取消点击排序时的loading<br>
    - 优化表头筛选
    - 新增初始化筛选、排序
2.新增通过click点击打开Dropdown、DropGroup<br>
3.Input新增type=password类型<br>
4.table组件修改了一个拖动改变列宽的bug<br>
5.TreeSelect单选新增focusChange回调<br>
6.PickerMonth新增maxLen参数控制当前可选时间段的范围<br>
:::

::: tip
版本：1.3.6<br>
1.TableGrid、TableTree新增排序类型type、新增settingBtnHandle点击设置底部按钮的回调，新增选中功能<br>
2.修改下拉展开弹窗在根据计算后的条件可居右对齐触发器<br>
3.ImageUpload、FileUpload新增showTrigger参数设置上传按钮是否显示<br>
4.TreeSelect新增overWidth设置定宽滚动条<br>
5.PickerMonth、PickerDate新增在开关切换时重新计算下拉面板位置<br>
6.Modal——在tip弹窗下新增右边距为32<br>
7.TableTree没有子集左边距多出的40px已删除<br>
8.select, treeSelect, cascader, cascaderList 组件的caption样式，触发器的优化<br>
9.dropDownButton 组件下拉面板的bug<br>
10.select 组件下拉面板向上弹出时margin-bottom 位置bug<br>
11.多维度选择器下拉面板右侧操作按钮部分，影藏投影超出部分<br>
:::

::: tip
版本：1.3.5<br>
1.TableGrid、TableTree新增排序规则（closeDefault设置为true关闭默认排序）<br>
2.新增多维度选择器MultipleSearchInput(开发板)<br>
:::

::: tip
版本：1.3.4-rc<br>
1.设置树形结构item为空时不显示checkbox<br>
2.发布TableGrid、TableTree开发版<br>
:::

::: tip
版本：1.3.4<br>
1.设置树形结构item为空时不显示checkbox<br>
2.Tree新增openNode每项展开收起回调<br>
3.新增TableTree树形table组件<br>
4.修复PickerDate年月切换箭头不能点击<br>
:::

::: tip
版本：1.3.3<br>
1.InputNumber输入与最大值最小值相等的，禁用相应按钮;输入0，input事件返回值0<br>
2.新增TableGrid表格组件，新增功能包括合并列、固定列<br>
3.ImageUpload优化缩略图的显示<br>
4.修复TreeSelect、Cascader、Select、Tree、Table、PickerDate相关已知bug<br>
5.ToolTip新增自定义宽度<br>
:::

::: tip
版本：1.3.2<br>
1.优化Cascader、CascaderSearchList组件popoverTip显示隐藏问题<br>
2.树形结构修复disabled状态问题<br>
3.PickerData修复初始化单、多面板显示问题<br>
4.修复ImageUpload相关问题<br>
:::

::: tip
版本：1.3.1<br>
1.PickerDate取消选中开始时间之后根据选择的开始时间禁用结束时间面板的的选择；修复初始化面板时分秒不能选择的问题<br>
2.PickerMonthDay、PickerTime修复没有点击确定数据没初始化问题<br>
3.TreeSelect、Transfer、Tree、TransferEquipment新增disabled状态和selectedIds选中的id数组属性<br>
4.CascaderSearchList组件的最后一项和按钮操作区域有覆盖现象<br>
:::

::: tip
版本：1.3.0<br>
1.PickerDate临时新增scope监听<br>
2.TooTip放开在没有省略号的情况下也显示提示框<br>
:::

::: tip
版本：1.2.9<br>
1.TreeSelect单选组件修复v-model<br>
2.PickerDate修复结束面板月的右箭头不能切换问题<br>
3.Breadcrumb新增hover颜色和titleTip<br>
4.PopoverTip修改为显示单独的项<br>
5.ToolTip修改在内容宽度足够时不会<br>
6.PickerMonthDay修复没有点击确定时关闭了弹窗的回显问题<br>
:::

::: tip
版本：1.2.8<br>
1.TreeSelect通过传入的selectedIds来设置全选、修复双向绑定<br>
2.Select、Cascader、CascaderList优化popoverTip<br>
3.PickerDate修复在日情况下选择同一天切换到周出现的bug<br>
:::

::: tip
版本：1.2.7<br>
1.PickerDate修复picker参数改变后面板未选中问题<br>
2.TransferEquipment勾选样式与设备名称重叠<br>
3.Cascader、TreeSelect、Select修改popover位置<br>
4.Tree新增returnParentNode不返回选的的父级属性<br>
5.Table添加headDefault，默认列表设置<br>
:::

::: tip
版本：1.2.6<br>
1.TreeSelect修复搜索样式不对问题、组件销毁没移除dom监听事件问题、优化关闭面板<br>
2.PickerDate相关日期选择器新增左侧title栏和右侧图标点击打开下拉列表功能<br>
3.更新PickerDate、PickerTime、TreeSelect、Select文档<br>
:::

::: tip
版本：1.2.5<br>
1.TreeSelect修复搜索样式不对问题、组件销毁没移除dom监听事件问题、优化关闭面板<br>
:::

::: tip
版本：1.2.4<br>
1.TreeSelect新增isShowAllChoice全部属性且在显示全部的情况下不会显示popover、新增caption设置触发器title、新增isReadOnly触发器是否允许输入数据进行数据筛选<br>
2.Table‘暂无数据’在第一行显示、排序按钮的位置跟随列名长度变化、空数据隐藏分页器<br>
3.input增加clear事件<br>
:::

::: tip
版本：1.2.3<br>
1.下拉列表（TreeSelect、Select、PickerDate、Dropdown）等新增在上下空间都不够时的位置计算<br>
2.TreeSelect、Transfer相关组件新增不统计父级的参数returnParentNode<br>
3.PickerDate、PickerTime、PickerMonth新增在没点击确定时关闭了弹窗，再次打开时重新计算选中时间；设置再次点击处理成关闭弹窗<br>
:::

::: tip
版本：1.2.2<br>
1.新增下拉弹窗在上下（左右）宽度不够是向中间弹出，但屏幕宽高不能小于下拉弹窗的宽高<br>
2.TreeSelect修改限制的最小高度为206<br>
:::

::: tip
版本：1.2.1<br>
1.新增PickerTime2400组件（业务单独使用）<br>
2.修复Tooltip点击后 跳转到下一个界面，tips没有消失<br>
3.修复PickerDate优化在没有改变日的情况下切改变了时分秒，确定按钮不可点击问题<br>
4.InputNumber组件，添加了pressEnter事件<br>
5.TreeSelect在搜索列表中新增禁用功能-被禁用的项不能搜索<br>
:::

::: tip
版本：1.2.0<br>
1.Modal修复在iframe情况下高度多了50px的问题<br>
2.Select修复popover为红色的bug<br>
3.Popover组件新增activeClose属性控制是否可关闭弹窗<br>
4.PickerMonthDay筛选项栏位在没有选择条件下，下拉框的确定按钮应该置灰<br>
:::

::: tip
版本：1.1.9<br>
1.表格添加了多选框，回显按钮插槽topButtons；添加了loading功能，和‘暂无数据’提示文字<br>
2.修复PickerDate使用ul、li布局问题<br>
3.修复PickerMonthDay先选择日再选择月出现不完整月日问题<br>
4.修复PickerTime先选择分钟再选择小时出现不完整时分问题<br>
5.修复Select的popover、搜索之后没有重置数据、右侧下拉箭头不一致等问题<br>
6.修复Input不能设置小于180的宽度问题<br>
7.Drawer新增activeClose属性控制是否可关闭弹窗<br>
8.TransferSelectModal新增autoClose属性配置点击遮罩是否可关闭弹窗<br>
9.CascaderSearchList修复在已选择有数据的情况下切换到其他项目之后数据没有回显到上一次选中状态的问题<br>
:::

::: tip
版本：1.1.8<br>
1.PickerDate根据产品需求调整月选择器规则<br>
:::

::: tip
版本：1.1.7<br>
1.表格组件新增page、pageSize监听，head数据中新增表头和内容的文字对齐方式，隐藏hover行的上边框。<br>
2.分页组件总条数大于999，显示成999+<br>
3.修改PickerDate最小时间限制在1900年<br>
4.Editable可编辑列表组件新增在展开下也有checkbox<br>
5.Drawer侧拉窗新增loading<br>
:::

::: tip
版本：1.1.6<br>
1.修复Select、TreeSelect组件v-model问题
:::

::: tip
版本：1.1.5<br>
1.PickerDate更新第二版，新增设置标题功能；在日选择器下新增锁定周期功能；修改已知bug<br>
2.新增PickerMonth业务组件，功能特定-当前月之后的月不可选<br>
3.修复CascaderSearchList级联搜索列表bug<br>
4.修复Cascader、Select组件已知还原度问题<br>
5.修复PickerMonthDay组件bug<br>
6.Icon组件新增note图标<br>
:::

::: tip
版本：1.1.4<br>
1.Modal弹窗新增内容投影<br>
2.FileUpload修改字号<br>
3.新增CascaderSearchList级联搜索列表<br>
:::

::: tip
版本：1.1.3<br>
1.修复Input v-model初始值不起作用<br>
2.修复TreeSelect参数没初始化引起的bug<br>
:::

::: tip
版本：1.1.2<br>
1.修改PickerDate周月年选择器多个日期选择问题<br>
:::

::: tip
版本：1.1.1<br>
1.新增TransferEquipment 针对设备设施项目的穿梭框<br>
2.新增TreePersonOrg 树形结构业务组件<br>
3.修改Select在禁用状态下还能点击的bug<br>
4.修改PickerDate日选择器多个日期选择问题，（其中周月年选择器还有bug，正在修改中...）<br>
:::

::: tip
版本：1.1.0<br>
1.修改PickerDater日周月年切换数据错误问题<br>
2.修改上传组件参数<br>
3.DropdownButton在鼠标hover时的bug<br>
4.Input修改active时光标颜色<br>
:::

::: tip
版本：1.0.9<br>
1.修改了分页器，添加了pagesize属性的监听<br>
2.Table表头设置勾选框支持disabled   表头单元格中加上了 columnHead 具名插槽<br>
3.新增Dynamic、DynamicList组件(待产品规划交互...)<br>
4.PickerData新增placeholder属性<br>
5.PickerTime新增placeholder、hideClear属性，新增限制时间范围，新增选择小时<br>
6.Select、Cascader、TreeSelect优化popover<br>
7.新增PickerMonthDay月日选择器<br>
:::

::: tip
版本：1.0.8<br>
1.修改打包路径<br>
:::

::: tip
版本：1.0.7<br>
1.修改打包路径<br>
:::

::: tip
版本：1.0.6<br>
1.修复Icon上下居中问题，新增hoverColor<br>
:::

::: tip
版本：1.0.5<br>
1.Button修改text类名<br>
2.PickerDate组件日周月年切换新增active背景色<br>
:::

::: tip
版本：1.0.4<br>
1.TreeSelect新增hideClear属性<br>
:::

::: tip
版本：1.0.3<br>
1.Select、Cascader触发器遮挡问题<br>
:::

::: tip
版本：1.0.2<br>
1.修改Message组件的z-index<br>
2.配置打包添加css前缀<br>
3.PickerDate新增hideClear（是否隐藏清除按钮）<br>
:::

::: tip
版本：1.0.1<br>
1.更新弹窗、下拉列表相关的层级（z-index）<br>
2.Drawer侧拉窗头部title内容区新增自定义内容<br>
3.PickerDate新增自定义宽度<br>
4.修复Modal提示框的title遮挡问题<br>
5.修复Tabs初始化没有选中问题<br>
:::

::: tip
版本：1.0.0<br>
1.修复PickerDate在无tab切换下月年切换初始化参数<br>
2.修复Table组件修改表头设置失效的问题<br>
3.Cascader、Select新增已选择提示框和修改还原度<br>
4.Tabs修改还原度和交互优化
:::

::: tip
版本：1.0.0-beta2<br>
1.修复DropGroup、DropdownButton组件bug<br>
2.修复PickerDate组件UI还原度<br>
3.修复Modal组件还原度及新增自定义内容和按钮<br>
4.新增TreeSelect末级可选配置参数<br>
5.Cascader添加用户自定义触发事件功能<br>
6.Tag标签添加宽高
:::

::: tip
版本：1.0.0-bate1<br>
1.新增PickerDate快速切换在可选范围内禁用<br>
2.修改DropdownButton下拉触发方式<br>
:::
