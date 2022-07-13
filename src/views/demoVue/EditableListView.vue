<template>
    <div class="editableList">
         <h3 class="components-title-h3">单选 </h3>
        <EditableList
                :data="editableData"
                width="240"
                @iconHandle="iconHandle"
                @enter="enterHandle"
                @open="openHandle"
                @change="change"
        />
         <h3 class="components-title-h3">多选 </h3>
        <EditableList
                :data="editableData2"
                :showCheckbox="true"
                width="240"
                @iconHandle="iconHandle2"
                @enter="enterHandle2"
                @open="openHandle2"
                @change="change2"
        />
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
                {id: '0011', name: '1#号制冷主机', dot: '#2ea121', tag: '分项', tagColor: '#e1f2ff', checked: 'uncheck'},
                {id: '0012', name: '2#号制冷主机', dot: '#de7802', tag: '支路', tagColor: '#d5f6f2', checked: 'uncheck'},
                {id: '0013', name: '3#号制冷主机', dot: '#c3c7cb', tag: '支路', tagColor: '#d9f5d6', checked: 'uncheck'},
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
                {id: '1001', name: '1#号制冷主机', dot: '#2ea121', tag: '分项', tagColor: '#e1f2ff', checked: 'uncheck'},
                {id: '1002', name: '2#号制冷主机', dot: '#de7802', tag: '支路', tagColor: '#d5f6f2', checked: 'uncheck'},
                {id: '1003', name: '3#号制冷主机', dot: '#c3c7cb', tag: '支路', tagColor: '#d9f5d6', checked: 'uncheck'},
            ]
        }
    ];
    export default {
        name: "EditableView",
        data() {
            return {
                editableData: JSON.parse(JSON.stringify(data)),
                editableData2: JSON.parse(JSON.stringify(data))
            }
        },
        methods: {
            // 点击图标回调
            iconHandle(id, iconName) {
                console.log(id, iconName);
            },
            // 回车回调
            enterHandle(item, data) {
                console.log(item, data);
            },
            // 展开
            openHandle(id, status) {
                console.log('openHandle:::', id, status);
            },
            // 子项被选中
            change(id, item) {
                console.log('change:::', id, item);
            },

            // 点击图标回调
            iconHandle2(id, iconName) {
                console.log(id, iconName);
            },
            // 回车回调
            enterHandle2(item, data) {
                console.log(item, data);
            },
            // 展开
            openHandle2(id, status) {
                console.log('openHandle:::', id, status);
            },
            // 子项被选中
            change2(id, item) {
                console.log('change:::', id, item);
            }
        }
    }
</script>

<style lang="stylus">
.editableList
    padding 20px 50px
    background-color $grey-50
    h4
        margin-top 24px
        margin-bottom 12px
        font-size 16px

</style>
