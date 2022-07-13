### SidebarCustom 自定义侧边栏

<template>
    <div class="sidebarCustom" style="width: 100%; height: 800px;">
        <SidebarCustom @change="sidebarChange">
            <template #left>
                <div style="font-size: 14px;">123</div>
            </template>
            <template #right>
                <div style="font-size: 14px;">456</div>
            </template>
        </SidebarCustom>
    </div>
</template>

<script>
export default {
    name: 'SidebarCustomView',
    methods: {
        sidebarChange(leftWidth, leftShow) {
            console.log('leftWidth::', leftWidth);
            console.log('leftShow::', leftShow);
        }
    }
};
</script>

::: details 查看示例
```vue
<div class="sidebarCustom" style="width: 100%; height: 800px;">
    <SidebarCustom @change="sidebarChange">
        <!--自定义icon-->
        <!--<template #icon><IconMenu /></template>-->
        <template #left>
            <div style="font-size: 14px;">123</div>
        </template>
        <template #right>
            <div style="font-size: 14px;">456</div>
        </template>
    </SidebarCustom>
</div>
```
sidebarChange(leftWidth, leftShow) {
    console.log('leftWidth::', leftWidth);
    console.log('leftShow::', leftShow);
}
:::

### Attributes

| 参数       |    说明     | 类型    | 默认值  | 必须    |
| -------   |   ----      | ------ | ------- | ------ |
| width  | 左侧栏固定宽度 | String/Number |  '' | No     |
| show  | 左侧栏展开/收起 | Boolean |    true | No     |
| changeSize  | 开启改变大小 | Boolean |    true | No     |
| openClose  | 开启点击按钮收起 | Boolean |    true | No     |
| @change  | sidebar宽度改变 | Function | -- | No     |
| #left  | 左侧插槽 | html |    -- | No     |
| #right  | 右侧插槽 | html |    -- | No     |

::: tip change返回两个参数
     1.leftWidth - 左侧宽度
     2.leftShow - 左侧是否显示
:::

::: danger 配合其他组件或工具使用，当拖动侧边栏改变宽度时：
     1.配合TableGrid/TableTree：
        change(leftWidth, leftShow) {
            this.$refs.tableGrid.resizeTableWidth();
            // this.$refs.tableTree.resizeTableWidth();
        }
     2.配合antv使用
        change(leftWidth, leftShow) {
            chart.repaint();
        }
:::
