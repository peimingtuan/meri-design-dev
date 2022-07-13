<template>
    <div class="Button">
        <div class="component component-padding">
             <h1 class="components-title">DropGroupFrame组件</h1>
            <!--
                组件说明:
                    参数   说明           默认值   类型   是否必须   可选值
                    value  当前绑定的值 --   String false
                    dataSelect 下拉菜单数据列表  [] Array true
                    position 下拉菜单位置  'left' String false  【'left', 'right'】
            -->
            <div>
                <DropGroupFrame trigger="click" :value="selVal0" :data="dataSelect0" search @change="groupChange" key="1" />
            </div>
            <br/><br/><br/>
            <div>
<!--                <DropGroupFrame trigger="click" :value="selVal" :data="dataSelect" divider @change="groupChange" key="2" />-->
            </div>

        </div>
    </div>
</template>

<script>
const data0 = [
    {
        id: 'id_xcxm',
        name: '新城项目',
        children: [
            {
                id: 'xincehng1',
                url: 'http://47.95.122.141:8200/HedyLamarrFrontend/V2/index.html',
                name: '新城项目1'
            },
            {
                id: 'xincehng2',
                url: 'http://47.95.122.141:8200/HedyLamarrFrontend/V2/index.html',
                name: '新城项目2'
            },
            {
                id: 'xincehng3',
                url: 'http://47.95.122.141:8200/HedyLamarrFrontend/V2/index.html',
                name: '新城项目3'
            },
            {
                id: 'xincehng4',
                url: 'http://47.95.122.141:8200/HedyLamarrFrontend/V2/index.html',
                name: '新城项目4'
            },
            {
                id: 'xincehng5',
                url: 'http://47.95.122.141:8200/HedyLamarrFrontend/V2/index.html',
                name: '新城项目5'
            },
            {
                id: 'xincehng6',
                url: 'http://47.95.122.141:8200/HedyLamarrFrontend/V2/index.html',
                name: '新城项目6'
            }
        ]
    }
];
const data1 = [
    {
        id: 'id_xcxm',
        name: '新城项目',
        children: [
            {
                id: 'xincheng',
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
    name: 'DropGroupFrameView',
    data() {
        return {
            selVal0: '',
            dataSelect0: [],
            selVal: '',
            dataSelect: []
        };
    },
    mounted() {
        setTimeout(() => {
            this.dataSelect0 = data0;
            this.selVal0 = 'id_xcxm';
        }, 2000);
    },
    methods: {
        groupChange({ id, name }) {
            console.log(id, name);
            this.selVal = id;
            this.selText = name;
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
