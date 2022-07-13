/************************************** 基础表格 ************************************** */
const defaultTableCode = 
    `<template>
        <div>
            <Button type="primary" @click="setBaseTableSource">加载数据<Button>
            <div class="tableView1">
                <Table
                    :loading="loading"
                    :head="headList2"
                    :source="baseSource"
                    height="100%"
                > 
                </Table>
            </div>
        </div>
    </template>
        <script>
            export default {
                name: 'TableView',
                data() {
                    return {
                        // 加载状态
                        loading: false,
                        // 基础表格表头列表
                        headList2: [
                            {
                                title: "设备状态", // 列的名称
                                key: "state", // 列的标识
                                show: true // 是否显示该列
                            },
                            {
                                title: "设备名称",
                                key: "name",
                                show: true,
                                width: 300
                            },
                            {
                                title: "专业",
                                key: "job",
                                show: true
                            },
                            {
                                title: "购置时间",
                                key: "acquisitionTime",
                                show: true
                            },
                            {
                                title: "采购类型",
                                key: "purchaseType",
                                show: true
                            },
                            {
                                title: "所属部门",
                                key: "department",
                                show: true
                            }
                        ],
                        // 基础表格的数据
                        baseSource: [],
                        source1: [
                            {
                                id: "1", // 该条数据id （可以不叫id,只要保证该字段唯一即可）
                                state: "闲置", // 数据字段，与headList2中字段对应
                                name: "佳能-网络视频录像机-315",
                                job: "强电",
                                system: "给排水系统",
                                type: "通用设备",
                                acquisitionTime: "2018.12.12",
                                purchaseType: "试用",
                                department: "物业部",
                                position: "办公室"
                            },
                            {
                                id: "2",
                                state: "检测中",
                                name: "尼康-摄影机-314",
                                job: "给排水",
                                system: "供配电系统",
                                type: "专业设备",
                                acquisitionTime: "2018.12.11",
                                purchaseType: "租用",
                                department: "资产部",
                                position: "服务用房"
                            },
                            {
                                id: "3",
                                state: "使用中",
                                name: "尼康-网络视频录像机-313",
                                job: "消防",
                                system: "冷热源系统",
                                type: "暖通设备",
                                acquisitionTime: "2018.12.10",
                                purchaseType: "购买",
                                department: "维修部",
                                position: "服务用房"
                            },
                            {
                                id: "5",
                                state: "封存",
                                name: "三菱-立式空调-311",
                                job: "暖通空调",
                                system: "空调系统",
                                type: "仪器仪表",
                                acquisitionTime: "2018.12.08",
                                purchaseType: "租用",
                                department: "资产部",
                                position: "起居室"
                            }
                        ],
                    }
                },
                methods: {
                    setBaseTableSource() {
                        this.loading = true;
                        setTimeout(() => {
                            this.baseSource = JSON.parse(JSON.stringify(this.source1));
                            this.loading = false;
                        }, 3000);
                    }
                }
            }
        <\/script>
        <style lang="stylus">
            .tableView1
                height 290px

        <\/style>`;

/************************************** 分组、分页表格 ************************************** */
const groupAndPaginationCode = 
    `<template>
        <div class="tableView">
            <Table
                :head="headList2"
                :source="source2Computed[page2-1]"
                :group="groupMsg"
                :selectWidth="180"
                :pageCount="source2.length"
                :pagination="true"
                :reloadPage="true"
                height="100%"
                @page-size-change="pageSize2ChangeHandle"
                @reload-page="reloadPageHandle"
            > 
            </Table>
        </div>
    </template>
        <script>
            export default {
                name: 'TableView',
                data() {
                    return {
                        pageSize2: 20, // 分页表格每页数据条数
                        page2: 1, // 分页表格的当前页码
                        // 分页分组表头列表
                        headList2: [
                            {
                                title: "设备状态", // 列的名称
                                key: "state", // 列的标识
                                show: true // 是否显示该列
                            },
                            {
                                title: "设备名称",
                                key: "name",
                                show: true
                            },
                            {
                                title: "专业",
                                key: "job",
                                show: true
                            },
                            {
                                title: "购置时间",
                                key: "acquisitionTime",
                                show: true
                            },
                            {
                                title: "采购类型",
                                key: "purchaseType",
                                show: true
                            },
                            {
                                title: "所属部门",
                                key: "department",
                                show: true
                            }
                        ],
                        // 分页分组表格的数据
                        source2: [
                            {
                                id: "1", // 该条数据id （可以不叫id,只要保证该字段唯一即可）
                                state: "闲置", // 数据字段，与headList2中字段对应
                                name: "佳能-网络视频录像机-315",
                                job: "强电",
                                system: "给排水系统",
                                type: "通用设备",
                                acquisitionTime: "2018.12.12",
                                purchaseType: "试用",
                                department: "物业部",
                                position: "办公室"
                            },
                            {
                                id: "2",
                                state: "检测中",
                                name: "尼康-摄影机-314",
                                job: "给排水",
                                system: "供配电系统",
                                type: "专业设备",
                                acquisitionTime: "2018.12.11",
                                purchaseType: "租用",
                                department: "资产部",
                                position: "服务用房"
                            },
                            {
                                id: "3",
                                state: "使用中",
                                name: "尼康-网络视频录像机-313",
                                job: "消防",
                                system: "冷热源系统",
                                type: "暖通设备",
                                acquisitionTime: "2018.12.10",
                                purchaseType: "购买",
                                department: "维修部",
                                position: "服务用房"
                            },
                            {
                                id: "5",
                                state: "封存",
                                name: "三菱-立式空调-311",
                                job: "暖通空调",
                                system: "空调系统",
                                type: "仪器仪表",
                                acquisitionTime: "2018.12.08",
                                purchaseType: "租用",
                                department: "资产部",
                                position: "起居室"
                            },
                            {
                                id: "6",
                                state: "已报废",
                                name: "尼康-液晶屏-310",
                                job: "弱电",
                                system: "物业管理系统",
                                type: "通用设备",
                                acquisitionTime: "2018.12.07",
                                purchaseType: "购买",
                                department: "维修部",
                                position: "电气开关室"
                            },
                            {
                                id: "7",
                                state: "使用中",
                                name: "海尔-吸尘器-315",
                                job: "综合",
                                system: "信息网络系统",
                                type: "专业设备",
                                acquisitionTime: "2018.12.06",
                                purchaseType: "试用",
                                department: "物业部",
                                position: "档案室"
                            },
                            {
                                id: "4",
                                state: "维修中",
                                name: "三菱-中央变频空调-312",
                                job: "电梯",
                                system: "照明系统",
                                type: "弱电设备",
                                acquisitionTime: "2018.12.09",
                                purchaseType: "试用",
                                department: "物业部",
                                position: "休息室"
                            },
                            {
                                id: "8",
                                state: "维修中",
                                name: "联想-智能摄像机-314",
                                job: "安管",
                                system: "有限电视系统",
                                type: "暖通设备",
                                acquisitionTime: "2018.12.05",
                                purchaseType: "租用",
                                department: "资产部",
                                position: "电梯机房"
                            },
                            {
                                id: "9",
                                state: "封存",
                                name: "萤石-智能摄像头-313",
                                job: "环境",
                                system: "公告广播系统",
                                type: "弱电设备",
                                acquisitionTime: "2018.12.04",
                                purchaseType: "购买",
                                department: "维修部",
                                position: "清洁间"
                            },
                            {
                                id: "10",
                                state: "已报废",
                                name: "佳能-打印机-312",
                                job: "安品",
                                system: "电话交换系统",
                                type: "仪器仪表",
                                acquisitionTime: "2018.12.03",
                                purchaseType: "试用",
                                department: "物业部",
                                position: "会议室"
                            },
                            {
                                id: "11",
                                state: "闲置",
                                name: "佳能-网络视频录像机-315",
                                job: "强电",
                                system: "给排水系统",
                                type: "通用设备",
                                acquisitionTime: "2018.12.12",
                                purchaseType: "试用",
                                department: "物业部",
                                position: "办公室"
                            },
                            {
                                id: "12",
                                state: "检测中",
                                name: "尼康-摄影机-314",
                                job: "给排水",
                                system: "供配电系统",
                                type: "专业设备",
                                acquisitionTime: "2018.12.11",
                                purchaseType: "租用",
                                department: "资产部",
                                position: "服务用房"
                            },
                            {
                                id: "13",
                                state: "使用中",
                                name: "尼康-网络视频录像机-313",
                                job: "消防",
                                system: "冷热源系统",
                                type: "暖通设备",
                                acquisitionTime: "2018.12.10",
                                purchaseType: "购买",
                                department: "维修部",
                                position: "服务用房"
                            },
                            {
                                id: "14",
                                state: "维修中",
                                name: "三菱-中央变频空调-312",
                                job: "电梯",
                                system: "照明系统",
                                type: "弱电设备",
                                acquisitionTime: "2018.12.09",
                                purchaseType: "试用",
                                department: "物业部",
                                position: "休息室"
                            },
                            {
                                id: "15",
                                state: "封存",
                                name: "三菱-立式空调-311",
                                job: "暖通空调",
                                system: "空调系统",
                                type: "仪器仪表",
                                acquisitionTime: "2018.12.08",
                                purchaseType: "租用",
                                department: "资产部",
                                position: "起居室"
                            },
                            {
                                id: "16",
                                state: "已报废",
                                name: "尼康-液晶屏-310",
                                job: "弱电",
                                system: "物业管理系统",
                                type: "通用设备",
                                acquisitionTime: "2018.12.07",
                                purchaseType: "购买",
                                department: "维修部",
                                position: "电气开关室"
                            },
                            {
                                id: "17",
                                state: "使用中",
                                name: "海尔-吸尘器-315",
                                job: "综合",
                                system: "信息网络系统",
                                type: "专业设备",
                                acquisitionTime: "2018.12.06",
                                purchaseType: "试用",
                                department: "物业部",
                                position: "档案室"
                            },
                            {
                                id: "18",
                                state: "维修中",
                                name: "联想-智能摄像机-314",
                                job: "安管",
                                system: "有限电视系统",
                                type: "暖通设备",
                                acquisitionTime: "2018.12.05",
                                purchaseType: "租用",
                                department: "资产部",
                                position: "电梯机房"
                            },
                            {
                                id: "19",
                                state: "封存",
                                name: "萤石-智能摄像头-313",
                                job: "环境",
                                system: "公告广播系统",
                                type: "弱电设备",
                                acquisitionTime: "2018.12.04",
                                purchaseType: "购买",
                                department: "维修部",
                                position: "清洁间"
                            },
                            {
                                id: "20",
                                state: "已报废",
                                name: "佳能-打印机-312",
                                job: "安品",
                                system: "电话交换系统",
                                type: "仪器仪表",
                                acquisitionTime: "2018.12.03",
                                purchaseType: "试用",
                                department: "物业部",
                                position: "会议室"
                            },
                            {
                                id: "21",
                                state: "维修中",
                                name: "联想-智能摄像机-314",
                                job: "安管",
                                system: "有限电视系统",
                                type: "暖通设备",
                                acquisitionTime: "2018.12.05",
                                purchaseType: "租用",
                                department: "资产部",
                                position: "电梯机房"
                            },
                            {
                                id: "22",
                                state: "使用中",
                                name: "尼康-网络视频录像机-313",
                                job: "消防",
                                system: "冷热源系统",
                                type: "暖通设备",
                                acquisitionTime: "2018.12.10",
                                purchaseType: "购买",
                                department: "维修部",
                                position: "服务用房"
                            },
                            {
                                id: "23",
                                state: "维修中",
                                name: "三菱-中央变频空调-312",
                                job: "电梯",
                                system: "照明系统",
                                type: "弱电设备",
                                acquisitionTime: "2018.12.09",
                                purchaseType: "试用",
                                department: "物业部",
                                position: "休息室"
                            },
                            {
                                id: "24",
                                state: "闲置",
                                name: "佳能-网络视频录像机-315",
                                job: "强电",
                                system: "给排水系统",
                                type: "通用设备",
                                acquisitionTime: "2018.12.12",
                                purchaseType: "试用",
                                department: "物业部",
                                position: "办公室"
                            },
                            {
                                id: "25",
                                state: "封存",
                                name: "三菱-立式空调-311",
                                job: "暖通空调",
                                system: "空调系统",
                                type: "仪器仪表",
                                acquisitionTime: "2018.12.08",
                                purchaseType: "租用",
                                department: "资产部",
                                position: "起居室"
                            },
                            {
                                id: "26",
                                state: "检测中",
                                name: "尼康-摄影机-314",
                                job: "给排水",
                                system: "供配电系统",
                                type: "专业设备",
                                acquisitionTime: "2018.12.11",
                                purchaseType: "租用",
                                department: "资产部",
                                position: "服务用房"
                            },
                            {
                                id: "27",
                                state: "已报废",
                                name: "尼康-液晶屏-310",
                                job: "弱电",
                                system: "物业管理系统",
                                type: "通用设备",
                                acquisitionTime: "2018.12.07",
                                purchaseType: "购买",
                                department: "维修部",
                                position: "电气开关室"
                            },
                            {
                                id: "28",
                                state: "使用中",
                                name: "海尔-吸尘器-315",
                                job: "综合",
                                system: "信息网络系统",
                                type: "专业设备",
                                acquisitionTime: "2018.12.06",
                                purchaseType: "试用",
                                department: "物业部",
                                position: "档案室"
                            },
                            {
                                id: "29",
                                state: "已报废",
                                name: "佳能-打印机-312",
                                job: "安品",
                                system: "电话交换系统",
                                type: "仪器仪表",
                                acquisitionTime: "2018.12.03",
                                purchaseType: "试用",
                                department: "物业部",
                                position: "会议室"
                            },
                            {
                                id: "30",
                                state: "封存",
                                name: "萤石-智能摄像头-313",
                                job: "环境",
                                system: "公告广播系统",
                                type: "弱电设备",
                                acquisitionTime: "2018.12.04",
                                purchaseType: "购买",
                                department: "维修部",
                                position: "清洁间"
                            },
                             {
                                id: "31",
                                state: "闲置",
                                name: "佳能-网络视频录像机-315",
                                job: "强电",
                                system: "给排水系统",
                                type: "通用设备",
                                acquisitionTime: "2018.12.12",
                                purchaseType: "试用",
                                department: "物业部",
                                position: "办公室"
                            },
                            {
                                id: "32",
                                state: "检测中",
                                name: "尼康-摄影机-314",
                                job: "给排水",
                                system: "供配电系统",
                                type: "专业设备",
                                acquisitionTime: "2018.12.11",
                                purchaseType: "租用",
                                department: "资产部",
                                position: "服务用房"
                            },
                            {
                                id: "33",
                                state: "使用中",
                                name: "尼康-网络视频录像机-313",
                                job: "消防",
                                system: "冷热源系统",
                                type: "暖通设备",
                                acquisitionTime: "2018.12.10",
                                purchaseType: "购买",
                                department: "维修部",
                                position: "服务用房"
                            },
                            {
                                id: "34",
                                state: "维修中",
                                name: "三菱-中央变频空调-312",
                                job: "电梯",
                                system: "照明系统",
                                type: "弱电设备",
                                acquisitionTime: "2018.12.09",
                                purchaseType: "试用",
                                department: "物业部",
                                position: "休息室"
                            },
                            {
                                id: "35",
                                state: "封存",
                                name: "三菱-立式空调-311",
                                job: "暖通空调",
                                system: "空调系统",
                                type: "仪器仪表",
                                acquisitionTime: "2018.12.08",
                                purchaseType: "租用",
                                department: "资产部",
                                position: "起居室"
                            },
                            {
                                id: "36",
                                state: "已报废",
                                name: "尼康-液晶屏-310",
                                job: "弱电",
                                system: "物业管理系统",
                                type: "通用设备",
                                acquisitionTime: "2018.12.07",
                                purchaseType: "购买",
                                department: "维修部",
                                position: "电气开关室"
                            },
                            {
                                id: "37",
                                state: "使用中",
                                name: "海尔-吸尘器-315",
                                job: "综合",
                                system: "信息网络系统",
                                type: "专业设备",
                                acquisitionTime: "2018.12.06",
                                purchaseType: "试用",
                                department: "物业部",
                                position: "档案室"
                            },
                            {
                                id: "38",
                                state: "维修中",
                                name: "联想-智能摄像机-314",
                                job: "安管",
                                system: "有限电视系统",
                                type: "暖通设备",
                                acquisitionTime: "2018.12.05",
                                purchaseType: "租用",
                                department: "资产部",
                                position: "电梯机房"
                            },
                            {
                                id: "39",
                                state: "封存",
                                name: "萤石-智能摄像头-313",
                                job: "环境",
                                system: "公告广播系统",
                                type: "弱电设备",
                                acquisitionTime: "2018.12.04",
                                purchaseType: "购买",
                                department: "维修部",
                                position: "清洁间"
                            },
                            {
                                id: "40",
                                state: "已报废",
                                name: "佳能-打印机-312",
                                job: "安品",
                                system: "电话交换系统",
                                type: "仪器仪表",
                                acquisitionTime: "2018.12.03",
                                purchaseType: "试用",
                                department: "物业部",
                                position: "会议室"
                            },
                        ],
                        // 分组信息 （非必需）
                        groupMsg: {
                            key: "all", // 当前选中的分组条件的id值，'all'为内置的key,代表无分组
                            isGroup: true, // 是否分组
                            // 分组条件列表，参考Select组件数据要求
                            options: [
                                {
                                    id: "all",
                                    name: "全部"
                                },
                                {
                                    id: "state",
                                    name: "设备状态"
                                },
                                {
                                    id: "purchaseType",
                                    name: "采购类型"
                                }
                            ]
                        },
                    }
                },
                computed: {
                    /**
                     * 分页分组表格分页数据
                     */
                    source2Computed() {
                        const len = this.source2.length;
                        let pagecount = Math.ceil(len / this.pageSize2);
                        let source = [];

                        for (let i=1; i<=pagecount; i++) {
                            const temp = [];
                            for (let j=0; j<len; j++) {
                                if ((j > (i-1)*this.pageSize2 || j === 0) && j <= i*this.pageSize2-1) {
                                    temp.push(this.source2[j])
                                }
                            }
                            source.push(temp);
                        }
                        return source;
                    },
                },
                methods: {
                    /**
                     * 基础表格页码改变时的回调方法 
                     * @param {Object} pageSize: {newPage: '当前页码'， newPageSize: '当前每页条数'}
                    */
                    pageSize2ChangeHandle(pageSize) {
                        this.page2 = pageSize.newPage;
                        this.pageSize2 = pageSize.newPageSize;
                    },
                    /** 
                     * 刷新当前页回调方法
                     * @param {Object} page: {newPage: '当前页码', newPageSize: '当前每页条数'}
                    */
                    reloadPageHandle(page) {
                        console.log(page);
                        alert(JSON.stringify(page)+'\n'+'调用接口刷新本页数据');
                    },
                }
            }
        <\/script>
        <style lang="stylus">
            .tableView
                width 800px
                height 400px

        <\/style>`;

/************************************** 可筛选、多选（默认按钮）、带工具栏表格数据 ************************************** */
const filterTableCode = 
`<template>
    <div class="tableView1">
        <Table
            :head="headList2"
            :source="filterTableSource"
            :checkAble="true"
            :filtersList="filters"
            :toolButtons="toolBtns"
            :selectWidth="180"
            height="100%"
            @tool-button-click="buttonClickHandle"
            @filter-change="filterChangeHandle"
        > 
        </Table>
    </div>
</template>
        <script>
            export default {
                name: 'TableView',
                data() {
                    return {
                        // 可筛选表格表头列表
                        headList2: [
                            {
                                title: "设备状态", // 列的名称
                                key: "state", // 列的标识
                                show: true // 是否显示该列
                            },
                            {
                                title: "设备名称",
                                key: "name",
                                show: true
                            },
                            {
                                title: "专业",
                                key: "job",
                                show: true
                            },
                            {
                                title: "购置时间",
                                key: "acquisitionTime",
                                show: true
                            },
                            {
                                title: "采购类型",
                                key: "purchaseType",
                                show: true
                            },
                            {
                                title: "所属部门",
                                key: "department",
                                show: true
                            }
                        ],
                        // 操作按钮组 (非必填)
                        toolBtns: [
                            {
                                icon: "edit", // 按钮的icon
                                name: "编辑", // 按钮名称
                                disabled: true // 是否禁用
                            },
                            {
                                icon: "copy",
                                name: "复制"
                            },
                            {
                                icon: "print",
                                name: "打印"
                            },
                            {
                                icon: "pending",
                                name: "记录"
                            },
                            {
                                icon: "map",
                                name: "定位"
                            },
                            {
                                icon: "link",
                                name: "链接"
                            }
                        ],
                        // 可筛选表格的数据
                        filterTableSource: [
                            {
                                id: "1", // 该条数据id （可以不叫id,只要保证该字段唯一即可）
                                state: "闲置", // 数据字段，与headList2中字段对应
                                name: "佳能-网络视频录像机-315",
                                job: "强电",
                                system: "给排水系统",
                                type: "通用设备",
                                acquisitionTime: "2018.12.12",
                                purchaseType: "试用",
                                department: "物业部",
                                position: "办公室"
                            },
                            {
                                id: "1.1", // 该条数据id （可以不叫id,只要保证该字段唯一即可）
                                state: "闲置", // 数据字段，与headList2中字段对应
                                name: "佳能-网络视频录像机-315",
                                job: "强电",
                                system: "给排水系统",
                                type: "通用设备",
                                acquisitionTime: "2018.12.12",
                                purchaseType: "租用",
                                department: "物业部",
                                position: "办公室"
                            },
                            {
                                id: "1.2", // 该条数据id （可以不叫id,只要保证该字段唯一即可）
                                state: "闲置", // 数据字段，与headList2中字段对应
                                name: "佳能-网络视频录像机-315",
                                job: "给排水",
                                system: "给排水系统",
                                type: "通用设备",
                                acquisitionTime: "2018.12.12",
                                purchaseType: "购买",
                                department: "物业部",
                                position: "办公室"
                            },
                            {
                                id: "2",
                                state: "检测中",
                                name: "尼康-摄影机-314",
                                job: "给排水",
                                system: "供配电系统",
                                type: "专业设备",
                                acquisitionTime: "2018.12.11",
                                purchaseType: "租用",
                                department: "资产部",
                                position: "服务用房"
                            },
                            {
                                id: "2.1",
                                state: "检测中",
                                name: "尼康-摄影机-314",
                                job: "强电",
                                system: "供配电系统",
                                type: "专业设备",
                                acquisitionTime: "2018.12.11",
                                purchaseType: "租用",
                                department: "资产部",
                                position: "服务用房"
                            },
                            {
                                id: "2.2",
                                state: "检测中",
                                name: "尼康-摄影机-314",
                                job: "强电",
                                system: "供配电系统",
                                type: "专业设备",
                                acquisitionTime: "2018.12.11",
                                purchaseType: "试用",
                                department: "资产部",
                                position: "服务用房"
                            },
                            {
                                id: "2.3",
                                state: "使用中",
                                name: "尼康-摄影机-314",
                                job: "强电",
                                system: "供配电系统",
                                type: "专业设备",
                                acquisitionTime: "2018.12.11",
                                purchaseType: "试用",
                                department: "资产部",
                                position: "服务用房"
                            },
                            {
                                id: "2.4",
                                state: "封存",
                                name: "尼康-摄影机-314",
                                job: "强电",
                                system: "供配电系统",
                                type: "专业设备",
                                acquisitionTime: "2018.12.11",
                                purchaseType: "试用",
                                department: "资产部",
                                position: "服务用房"
                            },
                            {
                                id: "3",
                                state: "使用中",
                                name: "尼康-网络视频录像机-313",
                                job: "消防",
                                system: "冷热源系统",
                                type: "暖通设备",
                                acquisitionTime: "2018.12.10",
                                purchaseType: "购买",
                                department: "维修部",
                                position: "服务用房"
                            },
                            {
                                id: "3.1",
                                state: "闲置",
                                name: "尼康-网络视频录像机-313",
                                job: "消防",
                                system: "冷热源系统",
                                type: "暖通设备",
                                acquisitionTime: "2018.12.10",
                                purchaseType: "购买",
                                department: "维修部",
                                position: "服务用房"
                            },
                            {
                                id: "3.2",
                                state: "闲置",
                                name: "尼康-网络视频录像机-313",
                                job: "消防",
                                system: "冷热源系统",
                                type: "暖通设备",
                                acquisitionTime: "2018.12.10",
                                purchaseType: "试用",
                                department: "维修部",
                                position: "服务用房"
                            },
                            {
                                id: "3.4",
                                state: "封存",
                                name: "尼康-网络视频录像机-313",
                                job: "消防",
                                system: "冷热源系统",
                                type: "暖通设备",
                                acquisitionTime: "2018.12.10",
                                purchaseType: "购买",
                                department: "维修部",
                                position: "服务用房"
                            },
                            {
                                id: "3.5",
                                state: "封存",
                                name: "尼康-网络视频录像机-313",
                                job: "暖通空调",
                                system: "冷热源系统",
                                type: "暖通设备",
                                acquisitionTime: "2018.12.10",
                                purchaseType: "购买",
                                department: "维修部",
                                position: "服务用房"
                            },
                            {
                                id: "3.6",
                                state: "封存",
                                name: "尼康-网络视频录像机-313",
                                job: "暖通空调",
                                system: "冷热源系统",
                                type: "暖通设备",
                                acquisitionTime: "2018.12.10",
                                purchaseType: "租用",
                                department: "维修部",
                                position: "服务用房"
                            },
                            {
                                id: "5",
                                state: "封存",
                                name: "三菱-立式空调-311",
                                job: "暖通空调",
                                system: "空调系统",
                                type: "仪器仪表",
                                acquisitionTime: "2018.12.08",
                                purchaseType: "租用",
                                department: "资产部",
                                position: "起居室"
                            },
                            {
                                id: "5.1",
                                state: "检测中",
                                name: "三菱-立式空调-311",
                                job: "暖通空调",
                                system: "空调系统",
                                type: "仪器仪表",
                                acquisitionTime: "2018.12.08",
                                purchaseType: "租用",
                                department: "资产部",
                                position: "起居室"
                            },
                            {
                                id: "5.1",
                                state: "使用中",
                                name: "三菱-立式空调-311",
                                job: "暖通空调",
                                system: "空调系统",
                                type: "仪器仪表",
                                acquisitionTime: "2018.12.08",
                                purchaseType: "租用",
                                department: "资产部",
                                position: "起居室"
                            },
                            {
                                id: "5.1",
                                state: "使用中",
                                name: "三菱-立式空调-311",
                                job: "该排水",
                                system: "空调系统",
                                type: "仪器仪表",
                                acquisitionTime: "2018.12.08",
                                purchaseType: "试用",
                                department: "资产部",
                                position: "起居室"
                            },
                            {
                                id: "5.1",
                                state: "使用中",
                                name: "三菱-立式空调-311",
                                job: "消防",
                                system: "空调系统",
                                type: "仪器仪表",
                                acquisitionTime: "2018.12.08",
                                purchaseType: "购买",
                                department: "资产部",
                                position: "起居室"
                            },
                        ],
                        // filterTableSourceStatic副本
                        filterTableSourceStatic: [],
                        // 条件筛选列表
                        filters: [
                            {
                                title: "状态:", // 筛选条件的名称
                                key: "state", // 条件标识
                                value: "all", // 当前选中的条件id值
                                // 条件列表，参考Select组件数据要求
                                source: [
                                    {
                                        id: "all",
                                        name: "全部"
                                    },
                                    {
                                        id: "闲置",
                                        name: "闲置"
                                    },
                                    {
                                        id: "检测中",
                                        name: "检测中"
                                    },
                                    {
                                        id: "使用中",
                                        name: "使用中"
                                    },
                                    {
                                        id: "封存",
                                        name: "封存"
                                    },
                                ]
                            },
                            {
                                title: "专业:",
                                key: "job",
                                value: "all",
                                source: [
                                    {
                                        id: "all",
                                        name: "全部"
                                    },
                                    {
                                        id: "强电",
                                        name: "强电"
                                    },
                                    {
                                        id: "给排水",
                                        name: "给排水"
                                    },
                                    {
                                        id: "消防",
                                        name: "消防"
                                    },
                                    {
                                        id: "暖通空调",
                                        name: "暖通空调"
                                    },
                                ]
                            },
                            {
                                title: "采购:",
                                key: "purchaseType",
                                value: "all",
                                source: [
                                    {
                                        id: "all",
                                        name: "全部"
                                    },
                                    {
                                        id: "试用",
                                        name: "试用"
                                    },
                                    {
                                        id: "购买",
                                        name: "购买"
                                    },
                                    {
                                        id: "租用",
                                        name: "租用"
                                    }
                                ]
                            }
                        ],
                    }
                },
                created() {
                    this.filterTableSourceStatic =  JSON.parse(JSON.stringify(this.filterTableSource));
                },
                methods: {
                    /** 
                     * 改变筛选条件回调方法
                     * @param {Object} val: {key: '条件标识key值，及this.filters[i].key', value: '筛选条件的值，及this.filters[i].value'}
                    */
                    filterChangeHandle(val) {
                        console.log(val);
                        let filterSourceCopy = JSON.parse(JSON.stringify(this.filterTableSourceStatic));
                        this.filters.map(f => {
                            filterSourceCopy = filterSourceCopy.filter(s => s[f.key] === f.value || f.value === 'all');
                            
                        })
                        this.filterTableSource = JSON.parse(JSON.stringify(filterSourceCopy));
                    },
                    /** 
                     * 点击工具栏按钮回调方法
                     * @param {Object} Obj {tool:{icon:'icon组件名称',name:'按钮名称',type:'icon组件type'},item:当前行数据}
                    */
                    buttonClickHandle(obj) {
                        console.log(obj);
                    },
                }
            }
        <\/script>
        <style lang="stylus">
            .tableView1
                height 290px

        <\/style>`;

/************************************** 标签、列设置、排序、多选（按钮插槽）表格 ************************************** */
const tagTableCode = 
`<template>
    <div class="tableView1">
        <Table
            :head="headList3"
            :headDefault="headDefault"
            :source="tagSource"
            :columnSet="true"
            :checkAble="true"
            height="100%"
            @column-set-change="columnSetHandle"
            @column-set-resume="resumeColumnSetHandle"
            @order-change="tableSortHandle"
            @check-change="checkedChangeHandle"
            @delete="deleteRowHandle"
        >
        <span
            slot-scope="{col, row}"
            v-if="col.key==='state'"
        >
            <Tag
                size="big"
                v-for="(tag,i) in row._tags"
                v-if="tag.key === col.key"
                :key="i"
                type="dot"
                :status="tag.tag"
            >
                {{row[col.key]}}
            </Tag>
        </span>
        <span v-else>{{row[col.key]}}</span>
        <template #columnHead="col">
            <span v-if="col.col.key === 'name'" style="display:flex;align-items:center;">
                <span style="margin-right:5px;">{{col.col.title}}</span>
                <Dropdown v-model="selVal" :data="dataSelect">
                    <span class="text">{{selText}}</span>
                </Dropdown>
            </span>
        </template>
        <template #topButtons>
            <Button type="default" v-for="b in ['转交','下载','删除','提交']" @click="topBtnClick(b)">{{b}}</Button>
        </template>
        </Table> 
    </div>
</template>
<script>
    export default {
        name: 'TableView',
        data() {
            return {
                // 当前选中的dropdown数据
                selVal: "totalEnergy",
                selText: "总量",
                // dropdown数据
                dataSelect: [
                    { id: "totalEnergy", name: "总量" },
                    { id: "singleParty", name: "单平米" },
                    { id: "lowerLevel", name: "下级分项" },
                    { id: "average", name: "滑动平均", disabled: true }
                ],
                // 保存默认的列配置
                headList3Static: [],
                // 标签、列设置、排序功能、多选表格表头列表
                headList3: [
                    {
                        title: "设备状态", // 列的名称
                        key: "state", // 列的标识
                        show: true // 是否显示该列
                    },
                    {
                        title: "设备名称",
                        key: "name",
                        show: true
                    },
                    {
                        title: "专业",
                        key: "job",
                        show: true
                    },
                    {
                        title: "购置时间",
                        key: "acquisitionTime",
                        show: true
                    },
                    {
                        title: "所属部门",
                        key: "department",
                        show: true
                    },
                    {
                        title: "设备数量",
                        key: "count",
                        isOrder: true,
                        show: true
                    }
                ],
                // 默认表头设置
                headDefault: [
                    {
                        title: "设备状态", // 列的名称
                        key: "state", // 列的标识
                        show: false // 是否显示该列
                    },
                    {
                        title: "专业",
                        key: "job",
                        show: false
                    },
                    {
                        title: "购置时间",
                        key: "acquisitionTime",
                        show: true
                    },
                     {
                        title: "设备名称",
                        key: "name",
                        show: true
                    },
                    {
                        title: "所属部门",
                        key: "department",
                        show: true
                    },
                    {
                        title: "设备数量",
                        key: "count",
                        isOrder: true,
                        show: true
                    }
                ],
                // 标签、列设置、排序功能、多选的表格数据
                tagSource: [
                    {
                        id: "1",
                        state: "闲置",
                        name: "佳能-网络视频录像机-315",
                        job: "强电",
                        system: "给排水系统",
                        type: "通用设备",
                        acquisitionTime: "2018.12.12",
                        purchaseType: "试用",
                        department: "物业部",
                        position: "办公室",
                        count: 1,
                        _tags: [
                            {
                                key: "state",
                                tag: "#E1F2FF"
                            }
                        ]
                    },
                    {
                        id: "2",
                        state: "检测中",
                        name: "尼康-摄影机-314",
                        job: "给排水",
                        system: "供配电系统",
                        type: "专业设备",
                        acquisitionTime: "2018.12.11",
                        purchaseType: "租用",
                        department: "资产部",
                        position: "服务用房",
                        count: 2,
                        _tags: [
                            {
                                key: "state",
                                tag: "#D5F6F2"
                            }
                        ]
                    },
                    {
                        id: "3",
                        state: "使用中",
                        name: "尼康-网络视频录像机-313",
                        job: "消防",
                        system: "冷热源系统",
                        type: "暖通设备",
                        acquisitionTime: "2018.12.10",
                        purchaseType: "购买",
                        department: "维修部",
                        position: "服务用房",
                        count: 3,
                        _tags: [
                            {
                                key: "state",
                                tag: "#D9F5D6"
                            }
                        ]
                    },
                    {
                        id: "5",
                        state: "封存",
                        name: "三菱-立式空调-311",
                        job: "暖通空调",
                        system: "空调系统",
                        type: "仪器仪表",
                        acquisitionTime: "2018.12.08",
                        purchaseType: "租用",
                        department: "资产部",
                        position: "起居室",
                        count: 4,
                        _tags: [
                            {
                                key: "state",
                                tag: "#FAF1D1"
                            }
                        ]
                    },
                    {
                        id: "6",
                        state: "已报废",
                        name: "尼康-液晶屏-310",
                        job: "弱电",
                        system: "物业管理系统",
                        type: "通用设备",
                        acquisitionTime: "2018.12.07",
                        purchaseType: "购买",
                        department: "维修部",
                        position: "电气开关室",
                        count: 5,
                        _tags: [
                            {
                                key: "state",
                                tag: "#FEEAD2"
                            }
                        ]
                    }
                ],
            }
        },
        created() {
            this.headList3Static = JSON.parse(JSON.stringify(this.headList3));
        },
        methods: {
            /**
             * 列的顺序和显隐改变时回调方法
             * @param {Array} data: 改变顺序和显隐属性的表头列表
            */
            columnSetHandle(data) {
                console.log(data);
            },
            /** 
             * 列设置中恢复默认设置的事件
             * 注意：需要开发人员保存一份默认的列信息，this.headCopy = [...this.head]列表,在回调方法中使用
            */
            resumeColumnSetHandle() {
                console.log("恢复默认");
            },
            /** 
             * 列的上下箭头排序回调方法
             * @param {Object} data: { key: 列的key值, orderType: 'desc降序或asc升序' }
            */
            tableSortHandle(data) {
                console.log(data);
                this.source = this.source.reverse();
            },
            /**
             * 行勾选事件回调方法
             * @param {Array} data: 已勾选的行数据列表
             *  例：[{
                        id: '12',
                        state: '维修中',
                        name: '德力西-开关插座-102',
                        job: '综合',
                        system: '访客管理系统',
                        type: '专业设备',
                        acquisitionTime: '2018.12.01',
                        purchaseType: '购买',
                        department: '维修部',
                        position: '接待处'
                    }]
            */
            checkedChangeHandle(data) {
                console.log(data);
            },
            /**
             * 删除已选行回调
             * @param {Array} rows 已勾选的行数据
             */
            deleteRowHandle(rows) {
                const ids = rows.map(row => row.id);
                this.tagSource = this.tagSource.filter(row => !ids.includes(row.id));
            },
            /**
             * 下载事件回调
             * @param {Array} rows 已勾选的行数据
             */
            downloadHandle(rows) {
                console.log(rows)
            },
            /**
             * 头部按钮插槽点击事件 
             */
            topBtnClick(str) {
                console.log(str)
            }
        }
    }
<\/script>
<style lang="stylus">
    .tableView1
        height 290px

<\/style>`
/************************************** 可变列宽表格 ************************************** */
const setColumnWidthTableCode = 
`<template>
    <div class="tableView1">
        <Table
            :head="headList2"
            :source="source1"
            :setColumnWidth="true"
            height="100%"
        ></Table>
    </div>
</template>
<script>
    export default {
        name: 'TableView',
        data() {
            return {
                // 可变列宽表格表头列表
                headList2: [
                    {
                      title: "设备状态", // 列的名称
                      key: "state", // 列的标识
                      show: true // 是否显示该列
                    },
                    {
                        title: "设备名称",
                        key: "name",
                        show: true
                    },
                    {
                        title: "专业",
                        key: "job",
                        show: true
                    },
                    {
                        title: "所属系统",
                        key: "system",
                        show: false
                    },
                    {
                        title: "设备类型",
                        key: "type",
                        show: false
                    },
                    {
                        title: "购置时间",
                        key: "acquisitionTime",
                        show: true
                    },
                    {
                        title: "采购类型",
                        key: "purchaseType",
                        show: true
                    },
                    {
                        title: "所属部门",
                        key: "department",
                        show: true
                    },
                    {
                        title: "设备位置",
                        key: "position",
                        show: false
                    }
                ],
                // 可变列宽表格数据
                source1: [
                    {
                        id: "1", // 该条数据id （可以不叫id,只要保证该字段唯一即可）
                        state: "闲置", // 数据字段，与headList2中字段对应
                        name: "佳能-网络视频录像机-315",
                        job: "强电",
                        system: "给排水系统",
                        type: "通用设备",
                        acquisitionTime: "2018.12.12",
                        purchaseType: "试用",
                        department: "物业部",
                        position: "办公室"
                    },
                    {
                        id: "2",
                        state: "检测中",
                        name: "尼康-摄影机-314",
                        job: "给排水",
                        system: "供配电系统",
                        type: "专业设备",
                        acquisitionTime: "2018.12.11",
                        purchaseType: "租用",
                        department: "资产部",
                        position: "服务用房"
                    },
                    {
                        id: "3",
                        state: "使用中",
                        name: "尼康-网络视频录像机-313",
                        job: "消防",
                        system: "冷热源系统",
                        type: "暖通设备",
                        acquisitionTime: "2018.12.10",
                        purchaseType: "购买",
                        department: "维修部",
                        position: "服务用房"
                    },
                    {
                        id: "5",
                        state: "封存",
                        name: "三菱-立式空调-311",
                        job: "暖通空调",
                        system: "空调系统",
                        type: "仪器仪表",
                        acquisitionTime: "2018.12.08",
                        purchaseType: "租用",
                        department: "资产部",
                        position: "起居室"
                    }
                ],
            }
        },
    }
<\/script>
<style lang="stylus">
    .tableView1
        height 290px

<\/style>`

export default {
    defaultTableCode,
    groupAndPaginationCode,
    tagTableCode,
    setColumnWidthTableCode,
    filterTableCode
}
