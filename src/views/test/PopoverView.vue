<template>
    <div class="Popover">
         <h3 class="components-title-h3">hover显示</h3>
        <div class="popover-box">
            <Popover titleText="我是标题" type="base" placement="top-left" :removeDom="true" custom-class="xxx">
                <template #content>
                    <article>
                        我是第一行内容
                        我是第二行内容
                        我是第三行内容
                        我是第四行内容
                    </article>
                </template>
                <Input v-model="inputVal" placeholder="请搜索"/>
            </Popover>
        </div>
         <h3 class="components-title-h3">click点击显示</h3>
        <div class="popover-click">
            <div class="popover-top">
                <Popover type="confirm" placement="top-left" :activeClose="activeClose" @cancelEvent="cancel"
                         @confirmEvent="confirm" :onRight='false'>
                    <template #content>
                        <Input v-model="inputVal1" placeholder="请搜索"/>
                        <TreeSelect
                                width="280"
                                :hideClear="false"
                                :data="dataTreeSingle"
                                :lastStage="false"
                                @focusChange="focusChange"
                        />
                    </template>
                    <Button type="primary" size="large">top-left</Button>
                </Popover>
                <Popover type="confirm" placement="top-center">
                    <template #content>
                        <p>测试点击显示popover</p>
                    </template>
                    <Button type="primary" size="large">top-center</Button>
                </Popover>
                <Popover type="confirm" placement="top-right">
                    <template #content>
                        <p>测试点击显示popover</p>
                    </template>
                    <Button type="primary" size="large">top-right</Button>
                </Popover>
            </div>
            <div class="popover-bottom">
                <Popover type="confirm" placement="bottom-left">
                    <template #content>
                        <p>测试点击显示popover</p>
                    </template>
                    <Button type="primary" size="large">bottom-left</Button>
                </Popover>
                <Popover type="confirm" placement="bottom-center">
                    <template #content>
                        <p>测试点击显示popover</p>
                    </template>
                    <Button type="primary" size="large">bottom-center</Button>
                </Popover>
                <Popover type="confirm" placement="bottom-right">
                    <template #content>
                        <p>测试点击显示popover</p>
                    </template>
                    <Button type="primary" size="large">bottom-right</Button>
                </Popover>
            </div>
            <Popover titleText="支路类型" type="base" placement="bottom-left" :onRight='false'>
                <template #content>
                    <article>
                        二级一下支路不要选择低压进线柜
                    </article>
                </template>
                <Icon class="icon" style="vertical-align: bottom;" name='note' hoverColor="#0091ff" />
            </Popover>
        </div>
    </div>
</template>

<script>
const dataTree = [
    {
        id: '0',
        name: '顶级顶级',
        open: true,
        checked: 'uncheck',
        children: [
            {
                id: '1',
                name: '一级1',
                open: false,
                checked: 'uncheck',
                children: [
                    {
                        id: '12',
                        name:
                                '测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测',
                        checked: 'uncheck'
                    },
                    { id: '121', name: '二级3111', checked: 'uncheck' },
                    { id: '122', name: '二级4', checked: 'uncheck' },
                    {
                        id: '1321',
                        name: '二级1',
                        open: false,
                        checked: 'uncheck',
                        children: [
                            { id: '1322', name: '测试222', checked: 'uncheck' },
                            { id: '1313', name: '三级3', checked: 'uncheck' },
                            { id: '1323', name: '三级4', checked: 'uncheck' }
                        ]
                    }
                ]
            },
            {
                id: '2',
                name: '一级2',
                open: false,
                checked: 'uncheck',
                children: [
                    {
                        id: '2220', name: '测试222', checked: 'uncheck', isleaf: true
                    },
                    {
                        id: '2221', name: '二级21', checked: 'uncheck', isleaf: true
                    },
                    {
                        id: '2222', name: '二级22', checked: 'uncheck', isleaf: true
                    }
                ]
            },
            {
                id: '3',
                name: '一级3',
                open: false,
                checked: 'uncheck',
                children: [
                    {
                        id: '3220', name: '测试222', checked: 'uncheck', isleaf: true
                    },
                    {
                        id: '3220', name: '二级31', checked: 'uncheck', isleaf: true
                    },
                    {
                        id: '3221', name: '二级32', checked: 'uncheck', isleaf: true
                    }
                ]
            },
            {
                id: '4',
                name: '测试末级配置不可选',
                checked: 'uncheck',
                isleaf: false
            }
        ]
    }
];
export default {
    name: 'PopoverView',
    data() {
        return {
            inputVal: '123',
            inputVal1: '',
            dataTreeSingle: JSON.parse(JSON.stringify(dataTree)),
            activeClose: true
        };
    },
    methods: {
        confirm(e) {
            console.log(e);
        },
        cancel(e) {
            console.log(e);
        },
        focusChange(status) {
            this.activeClose = status;
        }
    }
};
</script>

<style lang="stylus" scoped>
    .Popover
        width: 100%
        padding 50px

        .popover-box
            margin 50px
            display flex
            align-items center

        .popover-click
            width 40%
            padding 50px

            > div
                display flex
                justify-content space-between
                margin-bottom 50px
</style>
