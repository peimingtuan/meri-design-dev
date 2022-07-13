<template>
    <div class="TreeViem">
        <Tree
                :data="treeData"
                @change="change"
                @openNode="openNode"
        />
    </div>
</template>

<script>
    export default {
        name: "TreeViem",
        data() {
            const dataArr = [
                {
                    id: '0',
                    name: '顶级顶级顶级顶级顶级顶级顶级顶级顶级顶级顶级顶级',
                    open: true,
                    checked: 'uncheck',
                    children: [
                        {
                            id: '1',
                            name: '一级1',
                            open: true,
                            checked: 'uncheck',
                            children: []
                        },
                        {
                            id: '2',
                            name: '一级2',
                            open: true,
                            checked: 'uncheck',
                            children: [
                                { id: '222', name: '二级2', checked: 'uncheck' },
                            ]
                        },
                    ]
                }
            ];
            return {
                treeData:dataArr,
            }
        },
        watch: {},
        computed: {},
        created() {
        },
        mounted() {
            let arr=[]
            this.cloneFunc(this.treeData,arr,'0')
            this.treeData=arr
        },
        methods: {
            cloneFunc(tdata,newArray,parentId){
                if(Array.isArray(tdata) && tdata.length>0){
                    tdata.forEach((v,i)=>{
                        let item=JSON.parse(JSON.stringify(v))
                        if(v.hasOwnProperty('children')&&v.children.length>0){
                            newArray[i]={
                                id:item.id,
                                parentId,
                                name:item.name,
                                open:false,
                            }
                            let arr=[]
                            this.cloneFunc(v.children,arr,item.id);
                            newArray[i].children=arr;
                        }else{
                            newArray[i]={
                                id:item.id,
                                parentId,
                                name:item.name,
                                open:false,
                                children:[]
                            }
                        }
                    });
                }
            },

            change(id) {
                console.log('选择的项::::', id);
            },
            openNode(item){
                console.log('openNode:',item)
            }
        },
        updated() {
        },
        beforeDestroy() {
        }
    }
</script>

<style lang="stylus" scoped>
    .TreeViem {

    }
</style>
<style lang="less">

</style>