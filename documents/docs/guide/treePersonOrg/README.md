### TreePersonOrg 树形结构业务组件

<template>
	<div class="component component-padding">
		<h1>Tree业务组件</h1>
		<div class="treeCom">
			<div>
				<h3>根据能源预算需求, 树节点后面加icon</h3>
				<TreePersonOrg :data="treeData" @change="change" />
			</div>
			<div>
				<h3>根据人员资源管理系统，树节点加icon和数字</h3>
				<TreePersonOrg :data="treeData1" @change="change" />
			</div>
		</div>
	</div>
</template>

<script>
    /**
     * 参数说明
     * @id id String
     *
     * @name name String
     *
     * @checked 参数状态 String
     * uncheck 未选中
     * checked 选中
     * notNull 非空
     *
     * @open 展开子项 Boolean
     *
     * @isHide 是否隐藏 Boolean
     */
    const dataArr=[
        {
            id: '0', name: '顶级顶级顶级顶级顶级顶级', open: true, checked: 'uncheck', icon: 'department', label: {type: 'number', value: '45'},
            children: [
                {
                    id: '1',  name: '一级1', open: true, checked: 'uncheck', disabled: false, icon: 'department',label: {type: 'number', value: '22'},
                    children: [
                        {id: '12', name: '二级2', checked: 'uncheck', icon: 'station',label: {type: 'number', value: '36'}},
                        {id: '121', name: '二级3', checked: 'uncheck', icon: 'station',label: {type: 'number', value: '15'}},
                        {id: '122', name: '二级4', checked: 'uncheck', icon: 'station',label: {type: 'number', value: '2'}},
                        {
                            id: '1321', name: '二级1', open: true, checked: 'uncheck', icon: 'department',
                            children: [
                                {id: '13', name: '三级2', checked: 'uncheck', icon: 'station',label: {type: 'number', value: '87'}},
                                {id: '131', name: '三级3', checked: 'uncheck', icon: 'station',label: {type: 'number', value: '45'}},
                                {id: '132', name: '三级4', checked: 'uncheck', icon: 'station',label: {type: 'number', value: '89'}},
                            ]
                        }
                    ]
                },
                {
                    id: '3', name: '一级3', open: true, checked: 'uncheck',
                    children: [
                        {id: '322', name: '二级2', checked: 'uncheck',label: {type: 'number', value: '33324'},},
                        {id: '3220', name: '二级0', checked: 'uncheck',label: {type: 'number', value: '334'},},
                        {id: '3221', name: '二级1', checked: 'uncheck',label: {type: 'number', value: '334'},}
                    ]
                }
            ]
		},
		{
            id: '10', name: '顶级222 ', open: true, checked: 'uncheck', label: {type: 'number', value: '334'},
		}
    ];
    export default {
        name: "TreeView",
        data() {
            return {
                treeData: [
					{
						id: '0', name: '第一周(5月1日 - 5月7日)', open: true, checked: 'uncheck', label: {type: 'icon', value: 'prompt', color: '#F76B64'},
						children: [
							{id: '1',  name: '5月1日', open: true, checked: 'uncheck', disabled: false},
							{id: '2',  name: '5月2日', open: true, checked: 'uncheck', disabled: false},
							{id: '3',  name: '5月3日', open: true, checked: 'uncheck', disabled: false},
							{id: '4',  name: '5月4日', open: true, checked: 'uncheck', disabled: false},
							{id: '5',  name: '5月5日', open: true, checked: 'uncheck', disabled: false},
							{id: '6',  name: '5月6日', open: true, checked: 'uncheck', disabled: false},
							{id: '7',  name: '5月7日', open: true, checked: 'uncheck', disabled: false},
						]
					},
				], // type: Array
                treeData1: dataArr, // type: Array
            }
        },
        methods: {
            // 选择的项
            change({id}) {
                console.log('选择的项::::', id);
            },
        }
    }
</script>

<style lang="stylus" scoped>
.component-padding
	padding-bottom: 200px !important
	.treeCom
		display: flex
		width: 100%
		> div
			width: 390px
			margin-right: 24px
			overflow-y: auto
</style>

```vue
<template>
	<div class="component component-padding">
		<h1>Tree业务组件</h1>
		<div class="treeCom">
			<div>
				<h3>根据能源预算需求, 树节点后面加icon</h3>
				<TreePersonOrg :data="treeData" @change="change" />
			</div>
			<div>
				<h3>根据人员资源管理系统，树节点加icon和数字</h3>
				<TreePersonOrg :data="treeData1" @change="change" />
			</div>
		</div>
	</div>
</template>

<script>
    /**
     * 参数说明
     * @id id String
     *
     * @name name String
     *
     * @checked 参数状态 String
     * uncheck 未选中
     * checked 选中
     * notNull 非空
     *
     * @open 展开子项 Boolean
     *
     * @isHide 是否隐藏 Boolean
     */
    const dataArr=[
        {
            id: '0', name: '顶级顶级顶级顶级顶级顶级', open: true, checked: 'uncheck', icon: 'department', label: {type: 'number', value: '45'},
            children: [
                {
                    id: '1',  name: '一级1', open: true, checked: 'uncheck', disabled: false, icon: 'department',label: {type: 'number', value: '22'},
                    children: [
                        {id: '12', name: '二级2', checked: 'uncheck', icon: 'station',label: {type: 'number', value: '36'}},
                        {id: '121', name: '二级3', checked: 'uncheck', icon: 'station',label: {type: 'number', value: '15'}},
                        {id: '122', name: '二级4', checked: 'uncheck', icon: 'station',label: {type: 'number', value: '2'}},
                        {
                            id: '1321', name: '二级1', open: true, checked: 'uncheck', icon: 'department',
                            children: [
                                {id: '13', name: '三级2', checked: 'uncheck', icon: 'station',label: {type: 'number', value: '87'}},
                                {id: '131', name: '三级3', checked: 'uncheck', icon: 'station',label: {type: 'number', value: '45'}},
                                {id: '132', name: '三级4', checked: 'uncheck', icon: 'station',label: {type: 'number', value: '89'}},
                            ]
                        }
                    ]
                },
                {
                    id: '3', name: '一级3', open: true, checked: 'uncheck',
                    children: [
                        {id: '322', name: '二级2', checked: 'uncheck',label: {type: 'number', value: '33324'},},
                        {id: '3220', name: '二级0', checked: 'uncheck',label: {type: 'number', value: '334'},},
                        {id: '3221', name: '二级1', checked: 'uncheck',label: {type: 'number', value: '334'},}
                    ]
                }
            ]
		},
		{
            id: '10', name: '顶级222 ', open: true, checked: 'uncheck', label: {type: 'number', value: '334'},
		}
    ];
    export default {
        name: "TreeView",
        data() {
            return {
                treeData: [
					{
						id: '0', name: '第一周(5月1日 - 5月7日)', open: true, checked: 'uncheck', label: {type: 'icon', value: 'prompt', color: '#F76B64'},
						children: [
							{id: '1',  name: '5月1日', open: true, checked: 'uncheck', disabled: false},
							{id: '2',  name: '5月2日', open: true, checked: 'uncheck', disabled: false},
							{id: '3',  name: '5月3日', open: true, checked: 'uncheck', disabled: false},
							{id: '4',  name: '5月4日', open: true, checked: 'uncheck', disabled: false},
							{id: '5',  name: '5月5日', open: true, checked: 'uncheck', disabled: false},
							{id: '6',  name: '5月6日', open: true, checked: 'uncheck', disabled: false},
							{id: '7',  name: '5月7日', open: true, checked: 'uncheck', disabled: false},
						]
					},
				], // type: Array
                treeData1: dataArr, // type: Array
            }
        },
        methods: {
            // 选择的项
            change({id}) {
                console.log('选择的项::::', id);
            },
        }
    }
</script>

```

### Attributes

| 参数     | 说明  | 类型    | 默认值  | 必须    |
| ------- | ---- | ------ | ------- | ------ |
| data    | 数据列表 | Array | [] | Yes     |
| @change   | 点击回调 | Function | -- | Yes     |

### data参数说明

| 参数     | 说明  | 类型    | 默认值  | 必须    |
| ------- | ---- | ------ | ------- | ------ |
| id    | id | String | '' | Yes     |
| name   | name | String | '' | Yes     |
| open   | 是否展开子项 | Boolean | false | Yes     |
| disabled   | 是否禁用 | Boolean | false | Yes     |
| icon   | 树节点前面的icon（根据icon组件的name传递） | String | '' | No     |
| label   | 树节点后面的label | Object | '' | No     |
| checked   | 是否选中（可选值：uncheck/checked/notNull） | String | uncheck | Yes     |

::: tip
label参数：
<br>
type: icon/number(icon或者数字)
<br>
value: type是icon，传icon组件的name。type是number，传数字
<br>
color: type是icon时生效，icon的颜色
:::
