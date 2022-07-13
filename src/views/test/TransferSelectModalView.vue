<template>
    <div class="TransferSelectModalView">
        <Button @click="open">确定</Button>
        <TransferSelectModal
                :modalShow="modalShow"
                placeholder="请输入人员姓名或账号2"
                :linkage="false"
                :isShow="false"
                :lastStage="true"
                :isEnter="true"
                :selectedIds="selectedIds"
                :data="selectData"
                @cancel="treeCancel"
                @confirm="treeConfirm"
                @keyupEnter="keyupEnter"
        />
        <!--<input type="text" @keyup.enter="show" />-->
        <!--<Button type="primary" @click="modalShow2=true">1.一维结构</Button>-->
        <!--<TransferSelectModal-->
                <!--:modalShow="modalShow2"-->
                <!--placeholder="添加设备"-->
                <!--:linkage="false"-->
                <!--:lastStage="true"-->
                <!--:selectedIds="selectedIds2"-->
                <!--:data="selectData"-->
                <!--@cancel="modalShow2=false"-->
                <!--@confirm="treeConfirm"-->
        <!--/>-->
    </div>
</template>

<script>
    export default {
        name: "TransferSelectModalView",
        data() {
            return {
                modalShow:false,
                modalShow2:false,
                selectedIds:["RY1d488cb6ca1b4bf69200fc32f2e094b0","RYb44f8c81eaa943c2bd2a070916cd98c2"],
                selectData:[
                    {
                        id: "RY1d488cb6ca1b4bf69200fc32f2e094b0",
                        id_number: "111111111",
                        name: "aaaa (111111111) ",
                        selected: false,
                        zName: "aaaa"
                    },
                    {
                        id: "RYb44f8c81eaa943c2bd2a070916cd98c2",
                        id_number: "dddddddddd",
                        name: "dddd (dddddddddd) ",
                        selected: false,
                        zName: "dddd",
                    },
                    {
                        id: "RYc85506d36f1c446bae323fa8f354224b",
                        id_number: "gepengfei-101402",
                        name: "gepengfei (gepengfei-101402) ",
                        selected: false,
                        zName: "gepengfei",
                    }

                    ],
                selectData2:[
                    {
                        id: "RY1d488cb6ca1b4bf69200fc32f2e094b0",
                        id_number: "111111111",
                        name: "aaaa (111111111) ",
                        selected: false,
                        zName: "aaaa"
                    },
                    {
                        id: "RYb44f8c81eaa943c2bd2a070916cd98c2",
                        id_number: "dddddddddd",
                        name: "dddd (dddddddddd) ",
                        selected: false,
                        zName: "dddd",
                    },
                    {
                        id: "RYc85506d36f1c446bae323fa8f354224b",
                        id_number: "gepengfei-101402",
                        name: "gepengfei (gepengfei-101402) ",
                        selected: false,
                        zName: "gepengfei",
                    }

                ],
                 selectData : [
                    {id: '100', name: '乔峰', selected: false},
                    {id: '200', name: '阿三2', selected: false, disabled: true},
                    {id: '300', name: '段誉3', selected: true},
                    {id: '400', name: '阿紫4', selected: false},
                    {id: '500', name: '洪七公5', selected: true},
                    {id: '600', name: '慕容复6', selected: false},
                    {id: '700', name: '欧阳锋7', selected: false},
                    {id: '800', name: '黄老邪8', selected: false},
                    {id: '900', name: '段正淳9', selected: false},
                    {id: '1000', name: '王语嫣10', selected: false},
                    {id: '1100', name: '王重阳11', selected: false},
                    {id: '1200', name: '周伯通12', selected: false},
                    {id: '1300', name: '虚竹13', selected: false}
                ],
                selectedIds2:['100','600'],
            }
        },
        watch: {},
        computed: {},
        created() {
        },
        mounted() {
        },
        methods: {
            keyupEnter(val){
               console.log('是我啊啊啊啊',val)
            },
            open(){
                this.selectData=this.selectData2
                this.selectedIds=["RY1d488cb6ca1b4bf69200fc32f2e094b0"]// JSON.parse(JSON.stringify(this.selectedIds))
                this.modalShow=true
            },
            treeCancel(){
                this.modalShow=false
            },
            treeConfirm(){
                this.modalShow=false
            }
        },
        updated() {
        },
        beforeDestroy() {
        }
    }
</script>

<style lang="stylus"  scoped>
    .TransferSelectModalView {

    }
</style>
<style>

</style>