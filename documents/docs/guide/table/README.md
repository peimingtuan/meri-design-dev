### Table 表格

<template>
    <div>
        <div class="demo">
            <h4>基础表格-指定列宽</h4>
            <br />
            <Button type="primary" @click="setBaseTableSource">加载数据</Button>
            <div class="component-wrapper">
                <div class="component-wrapper-demo">
                    <div class="tableView1">
                        <Table
                            :loading="loading"
                            :head="baseHeadList"
                            :source="baseSource"
                            height="100%"
                        > 
                        </Table>
                    </div>
                </div>
                <div class="lock-code" @click="showCode(0)" ref="xxx">
                    <span class="lock-code-word">{{isShow[0] === false ? '显示代码' : '隐藏代码'}}</span>
                </div>
                <div class="code-content" style="height: 0;">
                    <div class="code-content-height">
                        <pre><code class="vue">
                        {{defaultTableCode}}
                        </code></pre>
                    </div>
                </div>
            </div>
        </div>
        <br/>
        <div class="demo">
            <h4>分页、分组表格</h4>
            <div class="component-wrapper">
                <div class="component-wrapper-demo">
                    <div class="tableView">
                        <Table
                            :head="headList2"
                            :source="source2Computed[page2-1]"
                            :group="groupMsg"
                            :selectWidth="180"
                            :pageCount="source2.length"
                            :pagination="true"
                            :reloadPage="true"
                            :pageSizeSetting="true"
                            height="100%"
                            @page-size-change="pageSize2ChangeHandle"
                            @reload-page="reloadPageHandle"
                        > 
                        </Table>
                    </div>
                </div>
                <div class="lock-code" @click="showCode(1)" ref="xxx">
                    <span class="lock-code-word">{{isShow[1] === false ? '显示代码' : '隐藏代码'}}</span>
                </div>
                <div class="code-content" style="height: 0;">
                    <div class="code-content-height">
                        <pre><code class="vue">
                        {{groupAndPaginationCode}}
                        </code></pre>
                    </div>
                </div>
            </div>
        </div>
        <br/>
        <div class="demo">
            <h4>可筛选、多选(默认按钮)、带工具栏表格</h4>
            <div class="component-wrapper">
                <div class="component-wrapper-demo">
                    <div class="tableView">
                        <Table
                            :head="headList2"
                            :source="filterTableSource"
                            :filtersList="filters"
                            :toolButtons="toolBtns"
                            :checkAble="true"
                            height="100%"
                            @tool-button-click="buttonClickHandle"
                            @filter-change="filterChangeHandle"
                        > 
                        </Table>
                    </div>
                </div>
                <div class="lock-code" @click="showCode(2)" ref="xxx">
                    <span class="lock-code-word">{{isShow[2] === false ? '显示代码' : '隐藏代码'}}</span>
                </div>
                <div class="code-content" style="height: 0;">
                    <div class="code-content-height">
                        <pre><code class="vue">
                        {{filterTableCode}}
                        </code></pre>
                    </div>
                </div>
            </div>
        </div>
        <br/>
        <div class="demo">
            <h4>标签、列设置、排序功能、多选(按钮插槽)的表格</h4>
            <div class="component-wrapper">
                <div class="component-wrapper-demo">
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
                                    :color="tag.tag"
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
                </div>
                <div class="lock-code" @click="showCode(3)" ref="xxx">
                    <span class="lock-code-word">{{isShow[3] === false ? '显示代码' : '隐藏代码'}}</span>
                </div>
                <div class="code-content" style="height: 0;">
                    <div class="code-content-height">
                        <pre><code class="vue">
                        {{tagTableCode}}
                        </code></pre>
                    </div>
                </div>
            </div>
        </div>
        <br/>
         <div class="demo">
            <h4>可变列宽表格</h4>
            <div class="component-wrapper">
                <div class="component-wrapper-demo">
                    <div class="tableView1">
                        <Table
                            :head="headList2"
                            :source="source1"
                            height="100%"
                            :setColumnWidth="true"
                        ></Table> 
                    </div>
                </div>
                <div class="lock-code" @click="showCode(4)" ref="xxx">
                    <span class="lock-code-word">{{isShow[4] === false ? '显示代码' : '隐藏代码'}}</span>
                </div>
                <div class="code-content" style="height: 0;">
                    <div class="code-content-height">
                        <pre><code class="vue">
                        {{setColumnWidthTableCode}}
                        </code></pre>
                    </div>
                </div>
            </div>
        </div>
        <br/>
    </div>

</template>

<script>
import codeStr from './code.js'
import mixin from '../../.vuepress/mixin.js'
export default {
    name: 'TableView', 
    mixins: [mixin],
    data() {
        return {
            // 加载中
            loading: false,
            // 基础表格代码
            defaultTableCode: codeStr.defaultTableCode.replace(/^\s*$/g,''),
            // 分页分组表格代码
            groupAndPaginationCode: codeStr.groupAndPaginationCode,
            // 可筛选表格代码
            filterTableCode: codeStr.filterTableCode,
            // 标签、排序、列设置、多选表格代码
            tagTableCode: codeStr.tagTableCode,
            // 可变列宽表格代码
            setColumnWidthTableCode: codeStr.setColumnWidthTableCode,
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
            // 可配表格表头列表
            headList1: [
                  {
                    title: "设备状态",
                    key: "state",
                    show: true
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
                    show: true,
                    isOrder: true
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
            // 基础表格表头列表
            baseHeadList: [
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
            // 标签表表头列表
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
            // 表头默认配置
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
            // 保存默认的列配置
            headList3Static: [],
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
            // filterTableSourceStatic副本
            filterTableSourceStatic: [],
            // 可筛选表格数据
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
            // 分页表格的数据
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
            // 可配表格数据
            source: [
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
                    _tags: [
                        {
                            key: "state",
                            tag: "rejected"
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
                    _tags: [
                        {
                            key: "state",
                            tag: "processing"
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
                    _tags: [
                        {
                            key: "state",
                            tag: "completed"
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
                    _tags: [
                        {
                            key: "state",
                            tag: "rejected"
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
                    _tags: [
                        {
                            key: "state",
                            tag: "remove"
                        }
                    ]
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
                    position: "档案室",
                    _tags: [
                        {
                            key: "state",
                            tag: "completed"
                        }
                    ]
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
                    position: "休息室",
                    _tags: [
                        {
                            key: "state",
                            tag: "error"
                        }
                    ]
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
                    position: "电梯机房",
                    _tags: [
                        {
                            key: "state",
                            tag: "error"
                        }
                    ]
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
                    position: "清洁间",
                    _tags: [
                        {
                            key: "purchaseType",
                            tag: "rejected"
                        }
                    ]
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
                    position: "会议室",
                    _tags: [
                        {
                            key: "state",
                            tag: "remove"
                        }
                    ]
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
                    position: "办公室",
                    _tags: [
                        {
                            key: "state",
                            tag: "rejected"
                        }
                    ]
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
                    position: "服务用房",
                    _tags: [
                        {
                            key: "state",
                            tag: "processing"
                        }
                    ]
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
                    position: "服务用房",
                    _tags: [
                        {
                            key: "state",
                            tag: "completed"
                        }
                    ]
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
                    position: "休息室",
                    _tags: [
                        {
                            key: "state",
                            tag: "error"
                        }
                    ]
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
                    position: "起居室",
                    _tags: [
                        {
                            key: "state",
                            tag: "rejected"
                        }
                    ]
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
                    position: "电气开关室",
                    _tags: [
                        {
                            key: "state",
                            tag: "remove"
                        }
                    ]
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
                    position: "档案室",
                    _tags: [
                        {
                            key: "state",
                            tag: "completed"
                        }
                    ]
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
                    position: "电梯机房",
                    _tags: [
                        {
                            key: "state",
                            tag: "error"
                        }
                    ]
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
                    position: "清洁间",
                    _tags: [
                        {
                            key: "purchaseType",
                            tag: "rejected"
                        }
                    ]
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
                    position: "会议室",
                    _tags: [
                        {
                            key: "state",
                            tag: "remove"
                        }
                    ]
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
                    position: "电梯机房",
                    _tags: [
                        {
                            key: "state",
                            tag: "error"
                        }
                    ]
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
                    position: "服务用房",
                    _tags: [
                        {
                            key: "state",
                            tag: "completed"
                        }
                    ]
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
                    position: "休息室",
                    _tags: [
                        {
                            key: "state",
                            tag: "error"
                        }
                    ]
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
                    position: "办公室",
                    _tags: [
                        {
                            key: "state",
                            tag: "rejected"
                        }
                    ]
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
                    position: "起居室",
                    _tags: [
                        {
                            key: "state",
                            tag: "rejected"
                        }
                    ]
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
                    position: "服务用房",
                    _tags: [
                        {
                            key: "state",
                            tag: "processing"
                        }
                    ]
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
                    position: "电气开关室",
                    _tags: [
                        {
                            key: "state",
                            tag: "remove"
                        }
                    ]
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
                    position: "档案室",
                    _tags: [
                        {
                            key: "state",
                            tag: "completed"
                        }
                    ]
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
                    position: "会议室",
                    _tags: [
                        {
                            key: "state",
                            tag: "remove"
                        }
                    ]
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
                    position: "清洁间",
                    _tags: [
                        {
                            key: "purchaseType",
                            tag: "rejected"
                        }
                    ]
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
                    position: "办公室",
                    _tags: [
                        {
                            key: "state",
                            tag: "rejected"
                        }
                    ]
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
                    position: "服务用房",
                    _tags: [
                        {
                            key: "state",
                            tag: "processing"
                        }
                    ]
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
                    position: "服务用房",
                    _tags: [
                        {
                            key: "state",
                            tag: "completed"
                        }
                    ]
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
                    position: "休息室",
                    _tags: [
                        {
                            key: "state",
                            tag: "error"
                        }
                    ]
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
                    position: "起居室",
                    _tags: [
                        {
                            key: "state",
                            tag: "rejected"
                        }
                    ]
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
                    position: "电气开关室",
                    _tags: [
                        {
                            key: "state",
                            tag: "remove"
                        }
                    ]
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
                    position: "档案室",
                    _tags: [
                        {
                            key: "state",
                            tag: "completed"
                        }
                    ]
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
                    position: "电梯机房",
                    _tags: [
                        {
                            key: "state",
                            tag: "error"
                        }
                    ]
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
                    position: "清洁间",
                    _tags: [
                        {
                            key: "purchaseType",
                            tag: "rejected"
                        }
                    ]
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
                    position: "会议室",
                    _tags: [
                        {
                            key: "state",
                            tag: "remove"
                        }
                    ]
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
            // 操作按钮组 (非必填)
             toolBtns: [
                {
                    icon: "edit", // 按钮的icon
                    name: "编辑", // 按钮名称
                    type: "action", // 图标类型
                    disabled: true // 是否禁用
                },
                {
                    icon: "copy",
                    name: "复制",
                    type: "action"
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
            page2: 1, // 分页表格的当前页码
            pageSize2: 20, // 分页表格每页数据条数
            page: 1, // 可配表格的当前页码
            pageSize: 20, // 可配表格每页数据条数
        };
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
        /**
         * 可配置表格计算数据
         */
        sourceComputed() {
            const len = this.source.length;
            let pagecount = Math.ceil(len / this.pageSize);
            let source = [];

            for (let i=1; i<=pagecount; i++) {
                const temp = [];
                for (let j=0; j<len; j++) {
                    if ((j > (i-1)*this.pageSize || j === 0) && j <= i*this.pageSize-1) {
                        temp.push(this.source[j])
                    }
                }
                source.push(temp);
            }
            return source;
        }
    },
    methods: {
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
         * 列的顺序和显隐改变时回调方法
         * @param {Array} data: 改变顺序和显隐属性的表头列表
        */
        columnSetHandle(data) {
            console.log(data);
        },
        /**
         * 基础表格页码改变时的回调方法 
         * @param {Object} pageSize: {newPage: '当前页码'， newPageSize: '当前每页条数'}
        */
        pageSize2ChangeHandle(pageSize) {
            this.page2 = pageSize.newPage;
            this.pageSize2 = pageSize.newPageSize;
        },
        /** 
         * 页码或者每页条数改变时的回调方法
         * @param {Object} pageSize: {newPage: '当前页码'， newPageSize: '当前每页条数'}
        */
        pageSizeChangeHandle(pageSize) {
            this.page = pageSize.newPage;
            this.pageSize = pageSize.newPageSize; 
        },
        /** 
         * 列设置中恢复默认设置的事件
         * 注意：需要开发人员保存一份默认的列信息，this.headCopy = [...this.head]列表,在回调方法中使用
        */
        resumeColumnSetHandle() {
            console.log("恢复默认");
            this.headList3 = JSON.parse(JSON.stringify(this.headList3Static))
        },
        /** 
         * 列的上下箭头排序回调方法
         * @param {Object} data: { key: 列的key值, orderType: 'desc降序或asc升序' }
        */
        tableSortHandle(data) {
            console.log(data);
            // 升序
            if (data.orderType == 'asc') 
                this.tagSource.sort((a, b) => a[data.key] - b[data.key]);
            // 降序
            if (data.orderType == 'desc') 
                this.tagSource.sort((a, b) => b[data.key] - a[data.key]);
            
        },
        /** 
         * 按钮组点击回调方法
         * @param {Object} obj
         * tool: 按钮数据
         * item: 当前行数据
        */
        buttonClickHandle(obj) {
            console.log(obj);
        },
        /** 
         * 改变分组回调方法
         * @param {String} key: 分组的key值，及this.groupMsg.key
        */
        groupMsgChangeHandle(key) {
            console.log(key);
        },
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
         * 刷新当前页回调方法
         * @param {Object} page: {newPage: '当前页码', newPageSize: '当前每页条数'}
        */
        reloadPageHandle(page) {
            console.log(page)
            alert(JSON.stringify(page)+'\n'+'调用接口刷新本页数据');
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
        },
        /** 
         * 设置基础表格数据
        */
        setBaseTableSource() {
            this.loading = true;
            setTimeout(() => {
                this.baseSource = JSON.parse(JSON.stringify(this.source1));
                this.loading = false;
            },3000)
        }
    },
    created() {
        this.headList3Static = JSON.parse(JSON.stringify(this.headList3));
        this.filterTableSourceStatic =  JSON.parse(JSON.stringify(this.filterTableSource));
    }
}; 
</script>

<style lang="stylus">
    .tableView
        height 400px
    .tableView1
        height 290px

ul
    padding 0 !important

</style>


### Attributes

| 参数     | 说明  | 类型    | 默认值  | 必须    |
| ------- | ---- | ------ | ------- | ------ |
|  head   | 表格列的配置描述,见下表  |  Array | [] |    True  |
|  headDefault   | 表格列的默认配置，同head,点击恢复默认时，按照headDefault渲染表头，不传时，组件会把head的副本当做默认配置  |  Array | [] |    False  |
|  source  |  数据数组，见下表  |  Array  |  []  |  No  |
|  group  | 分组信息，见下表 |  Object |  {}  |  No  |
|   selectWidth  |   分组和条件筛选组件的宽度  |   Number\|String   |  180   |  No  |
|    toolButtons    |    操作按钮数组，见下表  |   Array   |   []  |    No  |
|    toolButtonType    |    按钮类型(icon:图标 text:文字 iconText:图标+文字)  |   String   |   iconText  |    No  |
|   filtersList  |  筛选条件数组，见下表   |   Array   |   []   |  No   |
|  defaultButtonNumber  |   默认显示的按钮个数  |   Number  |  8   |  No  |
|  width  |  表格宽度  |  String\|Number |  100%  |   No |
|  height  |  表格高度  |  String\|Number |  默认300px  |   No |
|   rowHeight    |    行高    |     Number\|String    |    48px     |   No     |
|  bordered  |  是否展示边框  |  Boolean |  false  |  No  |
|  align  |  文字对齐方式  |  String |  left [left, right, center]   |  No  |
|  fontFamily  | 内容字体   | String  |    |  No  |
|  fontColor  |  内容颜色  |  String |  #1F2329  |  No  |
|  headFontColor  |  表头颜色  | String  |  #646A73  |  No  |
|  headFontSize  |  表头字号  | String  | 12px  |  No  |
|  fontSize  |  内容字号  |  String |  14px  |  No  |
|  fontWeight  |  内容字体宽度  |  String | normal   | No   |
|  headFontWeight  |  表头字体宽度  |  String |   normal | No   |
|  setColumnWidth  |  是否允许列宽设置  |  Boolean |  false  |   No |
|  checkAble  |  是否允许多选  | Boolean  |  false  |  No  |
| columnSet   |  是否允许列的排序和显隐  | Boolean  |   false |  No  |
| isTitleShow   |  是否使用单元格默认的title属性  | Boolean  |   true |  No  |
|  pagination  |   是否展示分页器和进行分页 | Number  | false  |  No  |
|  pageCount  |   source数组长度 | Number  |   |  Yes  |
|  pageCountShow   |  是否展示数据条数   |  Boolean   |   true   |  No    |
|  pageSize  | 每页条数   | String\|Number  |  20  |  No  |
| page   |  当前页码  | Number |  1  |  No  |
|  fastStep  |  快速翻页步长  | Number  |  5  |  No  |
|  basePage  |  当前按钮所在的位置  |  Number |   3 |  No  |
|  fast  | 是否使用快速翻页   |  Boolean |  true  | No   |
|  visiblePages  |  默认显示的页码个数  |  Number |  5  | No   |
|  reloadPage  |  是否展示刷新按钮  |  Boolean |  false  |  No |
|  pageSizeSetting  |  是否允许设置每页条数  | Boolean  |   false |  No  |
| simple   |  是否使用简易分页器  |  Boolean |  false  |  No  |
| loading   |  是否显示加载动画  |  Boolean |  false  |  No  |


### 列数据 head

|   参数   | 说明  |  类型   | 
| -------- | ---- | ------ | 
|   key    |   列的标识    |   String    | 
|   title    |   列的名称    |   String    | 
|   show    |   是否显示该列 true:显示；false:不显示   |   Boolean    | 
|   width    |   列宽 （最小值为80）  |   Number    | 
|   isOrder    |   是否可排序 true:可排序；flase:不可排序   |   Boolean    | 
|   titleAlign    |   表头内容对齐方式   |   left、center、right    |
|   contentAlign    |   列内容对齐方式   |   left、center、right    |


### 行数据 source

说明：source中的键值，需要与head中的key值对应，如：head:[{title:'状态'，key:'state'}]  source: [{state: '使用中'}]
|   参数   | 说明  |  类型   | 
| -------- | ---- | ------ | 
| id | 行的标识，不一定叫做id,需要保证其唯一性 |  | 
| disabled | 禁止行勾选 | Boolean | 
| checked | 默认勾选状态 | Boolean |  


### 分组配置 group

|   参数   | 说明  |  类型   | 
| -------- | ---- | ------ | 
| key | 选中的分组条件的id值，'all'为内置数据，代表无分组 | String |
| isGroup | 是否使用分组功能 true:使用；false:不使用 | Boolean | 
| options | 分组条件列表，参考Select组件数据要求.例：[{id:'state', name:'状态'}] | Array |


### 操作按钮数组 toolButtons

|   参数   | 说明  |  类型   | 
| -------- | ---- | ------ | 
| icon | 按钮图标名称（可选值参考Icon组件文档） | String |
| name | 按钮名称名称 | String | 
| type | 图标类型(可选值参考Icon组件文档) | String | 
| disabled | 是否禁用 true:禁用；false:可用 | Bolean | 


### 筛选条件数组 filtersList

|   参数   | 说明  |  类型   | 
| -------- | ---- | ------ | 
| title |筛选条件的名称 | String |
| key | 条件标识 | String | 
| source | 条件列表，参考Select组件数据要求.例：[{id:'state', name:'闲置'}] | Array | 


### 事件 Events 

| 名称     | 说明  | 参数    | 返回值  |
| ------- | ---- | ------ | ------- |
|  check-change  |   多选事件  |     |   Array [{被选中的行},...]   |
|    page-size-change   |    分页器事件    |      |   Object {newPage: 页码, newPageSize: 每页条数}    |
|   reload-page  |   刷新当前页面数据   |     |   Object {newPage: 页码, newPageSize: 每页条数}  |
|  column-set-resume   |   恢复表格列顺序默认设置   |     |      |
|  column-set-change   |   表格列顺序和显隐改变事件   |     |  Array 经过设置的 head 数组  |
|   order-change  |   数据排序（adc:升序、desc:降序）   |      |     Object { key: 列的key值, orderType: 'desc\|asc' }  |
|   tool-button-click  |   操作按钮点击事件   |      |   Object {tool:{icon:'***',name:'***',type:'***'},item:工具栏所在行数据}   |
|  group-change   |   分组条件改变事件   |      |   String 当前分组条件   |
|   filter-change  |   筛选条件改变事件   |      |   Object {key: 当前筛选条件的key值， value: 筛选条件的value值}   |
|   delete  |   删除已勾选行事件   |      |   Array [{已勾选行数据}, ... ]   |
|   download  |   下载事件   |      |   Array [{已勾选行数据}, ... ]   |
|   row-click  |   行点击事件   |      |   object 返回当前点击的行数据   |
