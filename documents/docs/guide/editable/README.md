### Editable 可编辑列表

<template>
    <div class="editableList">
        <div class="list">
            <Editable
                    v-for="(item, ind) in editableData2" :key="`${item.id}-${ind}`"
                    :item="item" width="240"
                    @open="openHandle"
                    @enter="enterHandle"
            />
        </div>
        <div class="list">
            <Editable
                    v-for="(item, ind) in editableData2" :key="`${item.id}-${ind}`"
                    :item="item" width="240"
                    :showCheckbox="true"
                    @iconHandle="iconHandle"
                    @enter="enterHandle"
                    @check="checkHandle"
            />
        </div>
    </div>
</template>

<script>
    const data=[
        {
            id: '001', name: '计划组1：送排风机', checked: 'uncheck', edit: false, openChild: false,
            icons: [
                {
                    name: 'edit', color: '', hoverColor: '#0091dd'
                },
                {
                    name: 'delete', color: '', hoverColor: '#0091dd'
                }
            ],
            children: [
                {id: '0011', name: '1#号制冷主机', dot: '#2ea121', tag: '分项', tagColor: '#e1f2ff'},
                {id: '0012', name: '2#号制冷主机', dot: '#de7802', tag: '支路', tagColor: '#d5f6f2'},
                {id: '0013', name: '3#号制冷主机', dot: '#c3c7cb', tag: '支路', tagColor: '#d9f5d6'},
            ]
        },
        {id: '002', name: '计划组2：T2办公区送排风机', checked: 'uncheck', edit: false, openChild: false,},
        {id: '003', name: '计划组3：暖通空调', checked: 'uncheck', edit: false, openChild: false,},

        {
            id: '100', name: '未分组设备', checked: 'uncheck', edit: false, openChild: false,
            icons: [
                {
                    name: 'edit', color: '', hoverColor: '#0091dd'
                },
                {
                    name: 'delete', color: '', hoverColor: '#0091dd'
                }
            ],
            children: [
                {id: '1001', name: '1#号制冷主机', dot: '#2ea121', tag: '分项', tagColor: '#e1f2ff'},
                {id: '1002', name: '2#号制冷主机', dot: '#de7802', tag: '支路', tagColor: '#d5f6f2'},
                {id: '1003', name: '3#号制冷主机', dot: '#c3c7cb', tag: '支路', tagColor: '#d9f5d6'},
            ]
        }
    ];

    export default {
        name: "EditableListView",
        data() {
            return {
                editableData: JSON.parse(JSON.stringify(data)),
                editableData2: JSON.parse(JSON.stringify(data))
            }
        },
        methods: {
            // 点击图标回调
            iconHandle(id, iconName) {
                console.log('iconHandle:::', id, iconName);
                const editableData=this.editableData2;
                if (iconName === 'delete') {
                    const ind=editableData.findIndex(d => d.id===id);
                    editableData.splice(ind, 1);
                }
            },
            // 回车回调
            enterHandle(item) {
                console.log('回车回调:::', item);
            },
            // 展开回调
            openHandle(id, status) {
                console.log('openHandle:::', id, status);
            },
            // 选中回调
            checkHandle(id, checked, item) {
                console.log('checkHandle:::', id, checked, item);
            }
        }
    }
</script>

<style lang="stylus">
.editableList
    padding 50px
    background-color $grey-50
    .list
        margin 24px

</style>


### 代码演示

```vue

<template>
    <div class="editableList">
        <div class="list">
            <Editable
                    v-for="(item, ind) in editableData2" :key="`${item.id}-${ind}`"
                    :item="item" width="240"
                    @open="openHandle"
                    @enter="enterHandle"
            />
        </div>
        <div class="list">
            <Editable
                    v-for="(item, ind) in editableData2" :key="`${item.id}-${ind}`"
                    :item="item" width="240"
                    :showCheckbox="true"
                    @iconHandle="iconHandle"
                    @enter="enterHandle"
                    @check="checkHandle"
            />
        </div>
    </div>
</template>

<script>
    const data=[
        {
            id: '001', name: '计划组1：送排风机', checked: 'uncheck', edit: false, openChild: false,
            icons: [
                {
                    name: 'edit', color: '', hoverColor: '#0091dd'
                },
                {
                    name: 'delete', color: '', hoverColor: '#0091dd'
                }
            ],
            children: [
                {id: '0011', name: '1#号制冷主机', dot: '#2ea121', tag: '分项', tagColor: '#e1f2ff'},
                {id: '0012', name: '2#号制冷主机', dot: '#de7802', tag: '支路', tagColor: '#d5f6f2'},
                {id: '0013', name: '3#号制冷主机', dot: '#c3c7cb', tag: '支路', tagColor: '#d9f5d6'},
            ]
        },
        {id: '002', name: '计划组2：T2办公区送排风机', checked: 'uncheck', edit: false, openChild: false,},
        {id: '003', name: '计划组3：暖通空调', checked: 'uncheck', edit: false, openChild: false,},

        {
            id: '100', name: '未分组设备', checked: 'uncheck', edit: false, openChild: false,
            icons: [
                {
                    name: 'edit', color: '', hoverColor: '#0091dd'
                },
                {
                    name: 'delete', color: '', hoverColor: '#0091dd'
                }
            ],
            children: [
                {id: '1001', name: '1#号制冷主机', dot: '#2ea121', tag: '分项', tagColor: '#e1f2ff'},
                {id: '1002', name: '2#号制冷主机', dot: '#de7802', tag: '支路', tagColor: '#d5f6f2'},
                {id: '1003', name: '3#号制冷主机', dot: '#c3c7cb', tag: '支路', tagColor: '#d9f5d6'},
            ]
        }
    ];

    export default {
        name: "EditableListView",
        data() {
            return {
                editableData: JSON.parse(JSON.stringify(data)),
                editableData2: JSON.parse(JSON.stringify(data))
            }
        },
        methods: {
            // 点击图标回调
            iconHandle(id, iconName) {
                console.log('iconHandle:::', id, iconName);
                const editableData=this.editableData2;
                if (iconName === 'delete') {
                    const ind=editableData.findIndex(d => d.id===id);
                    editableData.splice(ind, 1);
                }
            },
            // 回车回调
            enterHandle(item) {
                console.log('回车回调:::', item);
            },
            // 展开回调
            openHandle(id, status) {
                console.log('openHandle:::', id, status);
            },
            // 选中回调
            checkHandle(id, checked, item) {
                console.log('checkHandle:::', id, checked, item);
            }
        }
    }
</script>

```

### Attributes

| 参数     | 说明  | 类型    | 默认值  | 必须    |
| ------- | ---- | ------ | ------- | ------ |
| width    | 宽度 | String/Number | 180 | Yes     |
| item    | 数据 | Object | {} | Yes     |
| showCheckbox    | 是否是checkbox状态 | Boolean | false | No     |
| @iconHandle    | 点击图标的回调 | Function | -- | no     |
| @enter    | 点击回车的回调 | Function | -- | no     |
| @open    | 展开子项的回调 | Function | -- | no     |
| @check    | 在checkbox下的回调 | Function | -- | no     |
