<template>
    <div class="Button">
        <div class="component component-padding">
             <h1 class="components-title">DropGroup组件</h1>
            <!--
                组件说明:
                    参数   说明           默认值   类型   是否必须   可选值
                    value  当前绑定的值 --   String false
                    dataSelect 下拉菜单数据列表  [] Array true
                    position 下拉菜单位置  'left' String false  【'left', 'right'】
            -->
            <div>
                <DropGroup :value="selVal" :data="dataSelect" @change="groupChange">
                    <span class="text">{{selText}}</span>
                </DropGroup>
            </div>

            <div style="font-size: 16px; text-align: right">
                <DropGroup :value="selVal" :data="dataSelect" @change="groupChange" trigger="click">
                    <span class="text">{{selText}}</span>
                </DropGroup>
            </div>

            <div style="background-color: #004375">
                <DropGroup :value="selVal" :data="dataSelect" theme="dark" @change="groupChange">
                    <span class="text" style="color: #fff">{{selText}}</span>
                </DropGroup>
            </div>

        </div>
    </div>
</template>

<script>
const data = [
    {
        id: 'id_xcxm',
        name: '新城项目',
        children: [
            {
                id: 'xincehng',
                url: 'http://47.95.122.141:8200/HedyLamarrFrontend/V2/index.html',
                name: '新城项目'
            }
        ]
    },
    {
        id: 'id_index',
        name: '首页',
        children: [
            {
                id: 'tencent',
                url: 'https://cloud.tencent.com',
                name: '腾讯云'
            },
            {
                id: 'animate',
                url: 'https://daneden.github.io/animate.css',
                name: 'animate',
                disabled: true
            },
            {
                id: 'aliyun',
                url: 'https://www.aliyun.com/',
                name: '阿里云'
            }
        ]
    }
];

export default {
    name: 'DropGroupView',
    data() {
        return {
            selVal: 'xincehng',
            selText: '新城项目',
            dataSelect: data
        };
    },
    methods: {
        groupChange({ cId, cName, pId }) {
            console.log(cId, cName, pId);
            this.selVal = cId;
            this.selText = cName;
        }
    }
};
</script>

<style lang="stylus" scoped>

.text
    font-size 14px
    color $grey-900
    line-height 16px

.avatar
    display inline-block
    vertical-align middle
    padding-top 8px
    padding-bottom 8px
    img
        width 20px
        height @width

</style>
