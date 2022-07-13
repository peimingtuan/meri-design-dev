v<template>
    <div class="Button">
        <div class="component component-padding">
             <h1 class="components-title">Modal组件</h1>
             <h3 class="components-title-h3">1.提示模态框</h3>
            <Button type="primary" @click="modalShowTip">Tip</Button>
             <h3 class="components-title-h3">2.默认模态框</h3>
            <Button type="default" @click="modalShowDefault">Default</Button>
             <h3 class="components-title-h3">3.最小模态框</h3>
            <Button type="primary" @click="modalShowSmall">Small</Button>
             <h3 class="components-title-h3">4.中模态框</h3>
            <Button type="default" @click="modalShowMiddle">Middle</Button>
             <h3 class="components-title-h3">5.大模态框</h3>
            <Button type="primary" @click="modalShowLarge">Large</Button>
             <h3 class="components-title-h3">6.全屏模态框</h3>
            <Button type="default" @click="modalShowFull">Full</Button>

            <Modal
                    :show="modalStatusTip"
                    mode="tip"
                    type="info"
                    @close="modalClose"
                    @confirm="modalConfirm"
            >
                <template #content>
                    This is a message. 弹窗最小高度144px，最大高度166px (该对话框仅用于删除)
                </template>
<!--                <template #handle>-->
<!--                    <Button @click="modalClose" type="default">close</Button>-->
<!--                    <Button @click="modalConfirm" type="error">primary</Button>-->
<!--                </template>-->
            </Modal>

            <Modal
                    :show="modalStatusDefault"
                    title="弹窗提示"
                    mode="default"
                    @close="modalClose"
            >
                <template #content>
                    <div style="font-size: 20px; padding-left: 16px;padding-top: 16px;">
                        123
                        <br><br><br><br><br><br><br><br>
                        <br><br><br><br><br><br><br><br>
                        <br><br><br><br><br><br><br><br>
                        <PickerTime format="hm" :range="true" />
                        456
                    </div>
                </template>
            </Modal>

            <Modal
                    :show="modalStatusSmall"
                    title="弹窗提示"
                    mode="small"
                    @close="modalClose"
                >
                <template #content>
                    <div style="font-size: 20px; padding-left: 16px;padding-top: 16px;">
                        123456
                        <TreeSelect
                            width='200'
                            style=' margin-right:48px;'
                            :returnParentNode='true'
                            :isShowAllChoice='true'
                            :choseArea='true'
                            :data='datattt'
                            :hideClear='true'
                            :lastStage='true'
                            :notNull='true'
                        />
                    </div>
                </template>
                <template #handle>
                    <Button @click="modalClose" type="default">close</Button>
                    <Button @click="modalConfirm" type="primary">primary</Button>
                </template>
            </Modal>

            <Modal
                    :show="modalStatusMiddle"
                    title="弹窗提示"
                    mode="middle"
                    componentId="middle1111"
                    @close="modalClose"
                    ref="modalStatusMiddle"
            >
                <template #content>
                    <div style="font-size: 20px;  padding-left: 16px;padding-top: 16px;">
                        123
                        <br><br><br><br><br><br><br><br>
                        <br><br><br><br><br><br><br><br>
                        <br><br><br><br>
                        <br><br><br><br><br><br><br><br>
                        <PTree
                            :data="TreeData5"
                        />
                        456
                    </div>
                </template>
                <template #handle>
                    <Button @click="modalClose" type="default">close</Button>
                    <Button @click="modalConfirm" type="primary">primary</Button>
                </template>
            </Modal>

            <Modal
                    :show="modalStatusLarge"
                    title="弹窗提示"
                    mode="large"
                    :secondary="true"
                    ref="largeModal"
                    @close="modalClose"
            >
                <template #content>
                    <div style="font-size: 20px;  padding-left: 16px;padding-top: 16px;">
                        123
                        <br><br><br><br><br><br><br><br>
                        <Button @click="largeModalFn">aaa</Button>
<!--                        <br><br><br><br><br><br><br><br>-->
<!--                        <br><br><br><br><br><br><br><br>-->
<!--                        <br><br><br><br><br><br><br><br>-->
<!--                        <br><br><br><br>-->
<!--                        <br><br><br><br><br><br><br><br>-->
                        <div v-for="item in testNum" :key=item style="height: 100px"></div>
                        456
                    </div>
                </template>
<!--                <template #handle>-->
<!--                    <Button @click="modalClose" type="default">close-large</Button>-->
<!--                    <Button @click="modalClose" type="default">close-large</Button>-->
<!--                    <Button @click="modalConfirm" type="primary">primary-large</Button>-->
<!--                </template>-->
            </Modal>

            <Modal
                    :show="modalStatusFull"
                    title="弹窗提示Full"
                    mode="full"
                    @close="modalClose"
                    @confirm="modalConfirm"
            >
                <template #content>
                    <div style="font-size: 20px;  padding-left: 16px;padding-top: 16px;">
                        123
                        <br><br><br><br><br><br><br><br>
                        <br><br><br><br><br><br><br><br>
                        <br><br><br><br><br><br><br><br>
                        <br><br><br><br><br><br><br><br>
                        <br><br><br><br><br><br><br><br>
                        <br><br><br><br><br><br><br><br>
                        <br><br><br><br><br><br><br><br>
                        <br><br><br><br><br><br><br><br>
                        <br><br><br><br><br><br><br><br>
                        <br><br><br><br><br><br><br><br>
                        <br><br><br><br><br><br><br><br>
                        <br><br><br><br><br><br><br><br>
                        <br><br><br><br><br><br><br><br>
                        <br><br><br><br><br><br><br><br>
                        <br><br><br><br><br><br><br><br>
                        <br><br><br><br><br><br><br><br>
                        <br><br><br><br><br><br><br><br>
                        <br><br><br><br><br><br><br><br>
                        <br><br><br><br><br><br><br><br>
                        <br><br><br><br><br><br><br><br>
                        456
                    </div>
                </template>
                <template #handle>
                    <Button @click="modalClose" type="default">close</Button>
                    <Button @click="modalConfirm" type="primary">primary</Button>
                </template>
            </Modal>
        </div>
    </div>
</template>

<script>

import CreatePTreeJson from 'createPTreeJson';
import IconSearch from '../../components/static/iconSvg/search.svg';
import DomObserver from '../../components/static/utils/DomObserver';

const TreeData5 = CreatePTreeJson(3);

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
            },
            {
                id: 'aliyun2',
                url: 'https://www.aliyun.com/',
                name: '阿里云2'
            },
            {
                id: 'aliyun3',
                url: 'https://www.aliyun.com/',
                name: '阿里云3'
            },
            {
                id: 'aliyun4',
                url: 'https://www.aliyun.com/',
                name: '阿里云4'
            }
        ]
    }
];

const dataTree = [
    {
        id: '0',
        name: '顶级顶级',
        open: true,
        checked: 'checked',
        children: [
            {
                id: '1',
                name: '一级1',
                open: false,
                checked: 'checked',
                children: [
                    {
                        id: '12',
                        name:
                            '测试文字溢出测试文字溢出测试文字溢出测试文字溢出测试文字溢出测',
                        checked: 'checked'
                    },
                    { id: '121', name: '二级3111', checked: 'checked' },
                    { id: '122', name: '二级4', checked: 'checked' },
                    {
                        id: '1321',
                        name: '二级1',
                        open: false,
                        checked: 'checked'
                        // children: [
                        //     { id: "1322", name: "测试222", checked: "checked" },
                        //     { id: "1313", name: "三级3", checked: "checked" },
                        //     { id: "1323", name: "三级4", checked: "checked" }
                        // ]
                    }
                ]
            },
            {
                id: '2',
                name: '一级2',
                open: false,
                checked: 'checked',
                children: [
                    {
                        id: '2220', name: '测试222', checked: 'checked', isleaf: true
                    },
                    {
                        id: '2221', name: '二级21', checked: 'checked', isleaf: true
                    },
                    {
                        id: '2222', name: '二级22', checked: 'checked', isleaf: true
                    }
                ]
            },
            {
                id: '3',
                name: '一级3',
                open: false,
                checked: 'checked',
                children: [
                    {
                        id: '3220', name: '测试222', checked: 'checked', isleaf: true
                    },
                    {
                        id: '32201', name: '二级31', checked: 'checked', isleaf: true, disabled: true
                    },
                    {
                        id: '3221', name: '二级32', checked: 'checked', isleaf: true
                    }
                ]
            },
            {
                id: '4',
                name: '测试末级配置不可选',
                checked: 'checked',
                isleaf: false
            }
        ]
    }
];

const datattt = [
    {
        id: '1008',
        name: '土建装饰',
        children: [
            {
                type: '2',
                id: '2114',
                name: '综合土建/外广场设施/景观小品'
            }, {
                type: '2',
                id: '2105',
                name: '综合土建/燃气阀门'
            }, {
                type: '2',
                id: '2203',
                name: '综合土建/线路桥架支吊架'
            }, {
                type: '2',
                id: '2119',
                name: '综合土建/停车场设施/导视设施'
            }, {
                type: '2',
                id: '2110',
                name: '综合土建/采光顶电动吊点'
            }, {
                type: '2',
                id: '2207',
                name: '综合土建/雨棚'
            }, {
                type: '2',
                id: '1729',
                name: '综合土建/化粪池'
            }, {
                type: '2',
                id: '1925',
                name: '综合土建/防火门'
            }, {
                type: '2',
                id: '2101',
                name: '综合土建/燃气调压站/安全装置'
            }, {
                type: '2',
                id: '2200',
                name: '综合土建/空调水管道支吊架'
            }, {
                type: '2',
                id: '2125',
                name: '工器具/升降机'
            }, {
                type: '2',
                id: '2115',
                name: '综合土建/外广场设施/导视设施'
            }, {
                type: '2',
                id: '2107',
                name: '综合土建/干线设备/燃气管道'
            }, {
                type: '2',
                id: '2097',
                name: '综合土建/卷帘门'
            }, {
                type: '2',
                id: '2204',
                name: '综合土建/屋面LOGO'
            }, {
                type: '2',
                id: '2120',
                name: '综合土建/停车场设施/机械停车位'
            }, {
                type: '2',
                id: '2111',
                name: '综合土建/擦窗机'
            }, {
                type: '2',
                id: '2208',
                name: '综合土建/幕墙'
            }, {
                type: '2',
                id: '1730',
                name: '综合土建/采光顶'
            }, {
                type: '2',
                id: '2103',
                name: '综合土建/燃气切断阀'
            }, {
                type: '2',
                id: '2201',
                name: '综合土建/给排水(消防水)水管道支吊架'
            }, {
                type: '2',
                id: '2116',
                name: '综合土建/外广场设施/休闲设施'
            }, {
                type: '2',
                id: '2108',
                name: '综合土建/遮阳帘'
            }, {
                type: '2',
                id: '2099',
                name: '综合土建/燃气调压站/过滤器'
            }, {
                type: '2',
                id: '2205',
                name: '综合土建/玻璃护栏'
            }, {
                type: '2',
                id: '2121',
                name: '综合土建/停车场设施/压缩垃圾箱'
            }, {
                type: '2',
                id: '2112',
                name: '综合土建/外立面设施'
            }, {
                type: '2',
                id: '1732',
                name: '工器具/测试仪'
            }, {
                type: '2',
                id: '2104',
                name: '综合土建/燃气计量仪表'
            }, {
                type: '2',
                id: '2202',
                name: '综合土建/设备支吊架'
            }, {
                type: '2',
                id: '2117',
                name: '综合土建/外广场设施/垃圾箱'
            }, {
                type: '2',
                id: '2109',
                name: '综合土建/电动窗'
            }, {
                type: '2',
                id: '2213',
                name: '综合土建/风管道支吊架'
            }, {
                type: '2',
                id: '1728',
                name: '综合土建/隔油池'
            }, {
                type: '2',
                id: '2100',
                name: '综合土建/燃气调压站/调压器'
            }, {
                type: '2',
                id: '2206',
                name: '综合土建/检修口'
            }, {
                type: '2',
                id: '2124',
                name: '工器具/热成像仪'
            }
        ]
    }, {
        id: '1007',
        name: '燃气系统',
        children: []
    }, {
        id: '1006',
        name: '电梯系统',
        children: [
            {
                type: '2',
                id: '1502',
                name: '电梯系统/直梯/客梯'
            }, {
                type: '2',
                id: '1507',
                name: '电梯系统/扶梯/人行步道'
            }, {
                type: '2',
                id: '2053',
                name: '电梯系统/监视软件/扶梯'
            }, {
                type: '2',
                id: '1503',
                name: '电梯系统/直梯/货梯'
            }, {
                type: '2',
                id: '1504',
                name: '电梯系统/直梯/观光电梯'
            }, {
                type: '2',
                id: '2050',
                name: '电梯系统/服务器'
            }, {
                type: '2',
                id: '1506',
                name: '电梯系统/扶梯/自动扶梯'
            }, {
                type: '2',
                id: '2052',
                name: '电梯系统/监视软件/直梯'
            }]
    }, {
        id: '1005',
        name: '给排水',
        children: [
            {
                type: '1',
                id: '4602',
                name: '污水处理间'
            }, {
                type: '1',
                id: '501',
                name: '女卫生间'
            }, {
                type: '1',
                id: '4604',
                name: '男卫生间'
            }, {
                type: '1',
                id: '5608',
                name: '隔油间'
            }, {
                type: '1',
                id: '5605',
                name: '污水坑'
            }, {
                type: '2',
                id: '1654',
                name: '给排水/紫外线消毒装置'
            }, {
                type: '2',
                id: '1647',
                name: '给排水/蝶阀'
            }, {
                type: '2',
                id: '1639',
                name: '给排水/给水泵'
            }, {
                type: '2',
                id: '2086',
                name: '给排水/雨水回收机组/控制器'
            }, {
                type: '2',
                id: '2076',
                name: '给排水/中水机组/鼓风机'
            }, {
                type: '2',
                id: '1651',
                name: '给排水/过滤器'
            }, {
                type: '2',
                id: '1644',
                name: '给排水/喷灌泵'
            }, {
                type: '2',
                id: '2082',
                name: '给排水/变频器'
            }, {
                type: '2',
                id: '1655',
                name: '给排水/水位控制器'
            }, {
                type: '2',
                id: '2073',
                name: '给排水/中水机组/给水泵'
            }, {
                type: '2',
                id: '1648',
                name: '给排水/排气阀'
            }, {
                type: '2',
                id: '1640',
                name: '给排水/稳压泵'
            }, {
                type: '2',
                id: '1486',
                name: '给排水/稳压罐'
            }, {
                type: '2',
                id: '1440',
                name: '给排水/隔膜气压罐'
            }, {
                type: '2',
                id: '2087',
                name: '给排水/雨水回收机组/消毒装置'
            }, {
                type: '2',
                id: '2078',
                name: '给排水/太阳能热水机组/集热器'
            }, {
                type: '2',
                id: '1652',
                name: '给排水/压力表'
            }, {
                type: '2',
                id: '1493',
                name: '给排水/泄压阀'
            }, {
                type: '2',
                id: '1645',
                name: '给排水/闸阀'
            }, {
                type: '2',
                id: '2084',
                name: '给排水/雨水回收机组/过滤装置'
            }, {
                type: '2',
                id: '2074',
                name: '给排水/中水机组/过滤器'
            }, {
                type: '2',
                id: '2177',
                name: '给排水/BA监测浮球'
            }, {
                type: '2',
                id: '1649',
                name: '给排水/减压阀'
            }, {
                type: '2',
                id: '1641',
                name: '给排水/成品提升装置'
            }, {
                type: '2',
                id: '2089',
                name: '给排水/干线设备/给水管道'
            }, {
                type: '2',
                id: '2079',
                name: '给排水/太阳能热水机组/保温水箱'
            }, {
                type: '2',
                id: '1653',
                name: '给排水/生活水箱'
            }, {
                type: '2',
                id: '1646',
                name: '给排水/浮球液控阀'
            }, {
                type: '2',
                id: '2085',
                name: '给排水/雨水回收机组/水泵'
            }, {
                type: '2',
                id: '2075',
                name: '给排水/中水机组/水箱'
            }, {
                type: '2',
                id: '1643',
                name: '给排水/排污泵'
            }, {
                type: '2',
                id: '2151',
                name: '给排水/水表'
            }, {
                type: '2',
                id: '2090',
                name: '给排水/干线设备/排水管道'
            }, {
                type: '2',
                id: '2081',
                name: '给排水/太阳能热水机组/循环泵'
            }]
    }, {
        id: '1004',
        name: '弱电系统',
        children: [
            {
                type: '1',
                id: '4001',
                name: '弱电井'
            }, {
                type: '2',
                id: '1616',
                name: '背景音乐系统/均衡器'
            }, {
                type: '2',
                id: '2058',
                name: '客流系统/交换机'
            }, {
                type: '2',
                id: '2210',
                name: '能源系统/温控平台传感器'
            }, {
                type: '2',
                id: '1578',
                name: 'BA系统/温度传感器'
            }, {
                type: '2',
                id: '1801',
                name: '背景音乐系统/话筒输入模块'
            }, {
                type: '2',
                id: '2048',
                name: '慧云系统/集成平台'
            }, {
                type: '2',
                id: '2160',
                name: '能源系统/交换机'
            }, {
                type: '2',
                id: '1738',
                name: '门禁系统/发卡机'
            }, {
                type: '2',
                id: '1608',
                name: '停车场导引系统/超声波感应灯'
            }, {
                type: '2',
                id: '1570',
                name: '电子巡更系统/计算机'
            }, {
                type: '2',
                id: '1786',
                name: '信息发布系统/DVD播放器'
            }, {
                type: '2',
                id: '2040',
                name: '慧云系统/硬件设备/服务器'
            }, {
                type: '2',
                id: '1600',
                name: '停车场管理系统/工作站'
            }, {
                type: '2',
                id: '1629',
                name: '信息发布系统/显示屏控制箱'
            }, {
                type: '2',
                id: '2129',
                name: '门禁系统/控制软件'
            }, {
                type: '2',
                id: '1593',
                name: '停车场管理系统/车场道闸'
            }, {
                type: '2',
                id: '1477',
                name: '停车场管理系统/红外对射'
            }, {
                type: '2',
                id: '1562',
                name: '监控系统/视频矩阵'
            }, {
                type: '2',
                id: '1620',
                name: '背景音乐系统/室外音箱'
            }, {
                type: '2',
                id: '1585',
                name: 'BA系统/变频器'
            }, {
                type: '2',
                id: '1469',
                name: '监控系统/UPS'
            }, {
                type: '2',
                id: '1582',
                name: 'BA系统/压力传感器'
            }, {
                type: '2',
                id: '1805',
                name: 'BA系统/网络控制器'
            }, {
                type: '2',
                id: '1613',
                name: '背景音乐系统/UPS'
            }, {
                type: '2',
                id: '1575',
                name: 'BA系统/CO探测器'
            }, {
                type: '2',
                id: '1794',
                name: 'BA系统/防冻开关'
            }, {
                type: '2',
                id: '2045',
                name: '慧云系统/拼接大屏/拼接屏控制器'
            }, {
                type: '2',
                id: '1605',
                name: '停车场导引系统/服务器'
            }, {
                type: '2',
                id: '1783',
                name: '信息发布系统/LED音箱'
            }, {
                type: '2',
                id: '1635',
                name: '报警系统/红外报警/红外双鉴入侵探测器'
            }, {
                type: '2',
                id: '2135',
                name: '报警系统/软件'
            }, {
                type: '2',
                id: '1871',
                name: '背景音乐系统/控制电脑'
            }, {
                type: '2',
                id: '1597',
                name: '停车场管理系统/出卡机'
            }, {
                type: '2',
                id: '1566',
                name: '监控系统/电脑'
            }, {
                type: '2',
                id: '1625',
                name: '门禁系统/门锁'
            }, {
                type: '2',
                id: '1821',
                name: '停车场管理系统/光收发器'
            }, {
                type: '2',
                id: '1589',
                name: 'BA系统/网络交换机'
            }, {
                type: '2',
                id: '1767',
                name: '监控系统/控制键盘'
            }, {
                type: '2',
                id: '1617',
                name: '背景音乐系统/音频矩阵'
            }, {
                type: '2',
                id: '2059',
                name: '客流系统/终端设备'
            }, {
                type: '2',
                id: '1579',
                name: 'BA系统/水流开关'
            }, {
                type: '2',
                id: '1802',
                name: '背景音乐系统/前置放大器'
            }, {
                type: '2',
                id: '2049',
                name: '慧云系统/UPS'
            }, {
                type: '2',
                id: '2161',
                name: '能源系统/采集箱'
            }, {
                type: '2',
                id: '1739',
                name: '门禁系统/电源供应器'
            }, {
                type: '2',
                id: '1609',
                name: '停车场导引系统/摄像机'
            }, {
                type: '2',
                id: '1571',
                name: '电子巡更系统/打印机'
            }, {
                type: '2',
                id: '2041',
                name: '慧云系统/硬件设备/监视器'
            }, {
                type: '2',
                id: '1450',
                name: '电子巡更系统/巡更信息钮'
            }, {
                type: '2',
                id: '1601',
                name: '停车场管理系统/LED显示屏'
            }, {
                type: '2',
                id: '1630',
                name: '信息发布系统/一般用于天幕'
            }, {
                type: '2',
                id: '2130',
                name: '监控系统/监控软件'
            }, {
                type: '2',
                id: '1594',
                name: '停车场管理系统/地感线圈'
            }, {
                type: '2',
                id: '1478',
                name: '信息发布系统/音频信号矩阵切换器'
            }, {
                type: '2',
                id: '1563',
                name: '监控系统/半球摄像机头'
            }, {
                type: '2',
                id: '1621',
                name: '背景音乐系统/天花喇叭'
            }, {
                type: '2',
                id: '1818',
                name: '停车场管理系统/压力电波防砸车装置'
            }, {
                type: '2',
                id: '1586',
                name: 'BA系统/数据采集器'
            }, {
                type: '2',
                id: '1583',
                name: 'BA系统/电压变送器'
            }, {
                type: '2',
                id: '1806',
                name: 'BA系统/水管压差变送器'
            }, {
                type: '2',
                id: '2056',
                name: '客流系统/客流探测器'
            }, {
                type: '2',
                id: '1614',
                name: '背景音乐系统/CD机'
            }, {
                type: '2',
                id: '1576',
                name: 'BA系统/光传感器'
            }, {
                type: '2',
                id: '2046',
                name: '慧云系统/拼接大屏/VGA矩阵'
            }, {
                type: '2',
                id: '2156',
                name: '能源系统/采集器'
            }, {
                type: '2',
                id: '1606',
                name: '停车场导引系统/电脑'
            }, {
                type: '2',
                id: '1784',
                name: '信息发布系统/视频处理器'
            }, {
                type: '2',
                id: '1636',
                name: '报警系统/红外报警/玻璃破碎探测器'
            }, {
                type: '2',
                id: '1598',
                name: '停车场管理系统/读卡机'
            }, {
                type: '2',
                id: '1482',
                name: '停车场管理系统/网络摄像机'
            }, {
                type: '2',
                id: '1568',
                name: '电子巡更系统/巡更棒'
            }, {
                type: '2',
                id: '1626',
                name: '门禁系统/控制器箱'
            }, {
                type: '2',
                id: '1590',
                name: 'BA系统/机柜'
            }, {
                type: '2',
                id: '1475',
                name: 'BA系统/风阀驱动器'
            }, {
                type: '2',
                id: '1560',
                name: '监控系统/监视器/显示器'
            }, {
                type: '2',
                id: '1618',
                name: '背景音乐系统/功放器'
            }, {
                type: '2',
                id: '2212',
                name: 'BA系统/水阀执行器'
            }, {
                type: '2',
                id: '1580',
                name: 'BA系统/流量传感器'
            }, {
                type: '2',
                id: '1803',
                name: '背景音乐系统/音频输入模块'
            }, {
                type: '2',
                id: '2162',
                name: '能源系统/管理软件'
            }, {
                type: '2',
                id: '1740',
                name: '门禁系统/IC卡'
            }, {
                type: '2',
                id: '1611',
                name: '背景音乐系统/计算机'
            }, {
                type: '2',
                id: '1573',
                name: 'BA系统/DDC控制箱'
            }, {
                type: '2',
                id: '1791',
                name: '门禁系统/门禁末端'
            }, {
                type: '2',
                id: '2042',
                name: '慧云系统/硬件设备/工作站'
            }, {
                type: '2',
                id: '1922',
                name: '报警系统/红外报警/其它'
            }, {
                type: '2',
                id: '1602',
                name: '停车场管理系统/服务器'
            }, {
                type: '2',
                id: '1490',
                name: '停车场导引系统/数据转换设备'
            }, {
                type: '2',
                id: '1631',
                name: '信息发布系统/显示屏'
            }, {
                type: '2',
                id: '2131',
                name: '电子巡更系统/管理软件'
            }, {
                type: '2',
                id: '1595',
                name: '停车场管理系统/入口读卡器'
            }, {
                type: '2',
                id: '1479',
                name: '信息发布系统/光纤收发器'
            }, {
                type: '2',
                id: '1564',
                name: '监控系统/智能快球摄像机头'
            }, {
                type: '2',
                id: '1623',
                name: '门禁系统/服务器'
            }, {
                type: '2',
                id: '1819',
                name: '停车场管理系统/对讲主机'
            }, {
                type: '2',
                id: '1587',
                name: 'BA系统/程控交换机'
            }, {
                type: '2',
                id: '1472',
                name: '信息发布系统/字幕机'
            }, {
                type: '2',
                id: '1764',
                name: '监控系统/光端机'
            }, {
                type: '2',
                id: '1584',
                name: 'BA系统/电流变送器'
            }, {
                type: '2',
                id: '2057',
                name: '客流系统/电脑'
            }, {
                type: '2',
                id: '2167',
                name: '能源系统/服务器'
            }, {
                type: '2',
                id: '1745',
                name: '监控系统/交换机'
            }, {
                type: '2',
                id: '1615',
                name: '背景音乐系统/收音头'
            }, {
                type: '2',
                id: '1577',
                name: 'BA系统/压差传感器'
            }, {
                type: '2',
                id: '2047',
                name: '慧云系统/交换机'
            }, {
                type: '2',
                id: '2060',
                name: '客流系统/客流统计软件'
            }, {
                type: '2',
                id: '2158',
                name: '能源系统/采集器电源'
            }, {
                type: '2',
                id: '1456',
                name: '报警系统/报警主机+键盘'
            }, {
                type: '2',
                id: '1607',
                name: '停车场导引系统/控制箱'
            }, {
                type: '2',
                id: '1569',
                name: '电子巡更系统/数据传输器'
            }, {
                type: '2',
                id: '1785',
                name: '信息发布系统/DVI分配器'
            }, {
                type: '2',
                id: '1637',
                name: '报警系统/红外报警/紧急按钮'
            }, {
                type: '2',
                id: '1599',
                name: '停车场管理系统/图象识别器'
            }, {
                type: '2',
                id: '1628',
                name: '信息发布系统/电脑'
            }, {
                type: '2',
                id: '1825',
                name: '停车场管理系统/交换机'
            }, {
                type: '2',
                id: '1591',
                name: 'BA系统/电脑'
            }, {
                type: '2',
                id: '1476',
                name: '停车场导引系统/引导屏'
            }, {
                type: '2',
                id: '1561',
                name: '监控系统/录像机'
            }, {
                type: '2',
                id: '1619',
                name: '背景音乐系统/监听器'
            }, {
                type: '2',
                id: '1581',
                name: 'BA系统/液位传感器'
            }, {
                type: '2',
                id: '1804',
                name: '背景音乐系统/音频检测模块'
            }, {
                type: '2',
                id: '1741',
                name: '门禁系统/转换器'
            }, {
                type: '2',
                id: '1612',
                name: '背景音乐系统/远程话筒'
            }, {
                type: '2',
                id: '1491',
                name: '停车场导引系统/车位指示灯'
            }, {
                type: '2',
                id: '1574',
                name: 'BA系统/CO2探测器'
            }, {
                type: '2',
                id: '1792',
                name: '背景音乐系统/系统管理主机'
            }, {
                type: '2',
                id: '2044',
                name: '慧云系统/拼接大屏/拼接屏'
            }, {
                type: '2',
                id: '1923',
                name: '监控系统/枪式摄像机'
            }, {
                type: '2',
                id: '1603',
                name: '停车场管理系统/手持收费机'
            }, {
                type: '2',
                id: '1782',
                name: '报警系统/8防区模块'
            }, {
                type: '2',
                id: '1633',
                name: '报警系统/报警箱'
            }, {
                type: '2',
                id: '2132',
                name: 'BA系统/管理软件'
            }, {
                type: '2',
                id: '1839',
                name: 'BA系统/DDC控制模块'
            }, {
                type: '2',
                id: '1596',
                name: '停车场管理系统/出口读卡器'
            }, {
                type: '2',
                id: '1480',
                name: '信息发布系统/功率放大器'
            }, {
                type: '2',
                id: '1565',
                name: '监控系统/彩转黑一体机'
            }, {
                type: '2',
                id: '1624',
                name: '门禁系统/读卡器'
            }, {
                type: '2',
                id: '1820',
                name: '停车场管理系统/停车场管理软件'
            }, {
                type: '2',
                id: '1588',
                name: 'BA系统/UPS'
            }, {
                type: '2',
                id: '1765',
                name: '监控系统/电梯半球摄像机'
            }]
    }, {
        id: '1003',
        name: '消防系统',
        children: [
            {
                type: '1',
                id: '4403',
                name: '消防水泵房'
            }, {
                type: '1',
                id: '319',
                name: '报警阀室'
            }, {
                type: '2',
                id: '1688',
                name: '消防电系统/消防喇叭'
            }, {
                type: '2',
                id: '1811',
                name: '消防电系统/气体喷洒指示灯'
            }, {
                type: '2',
                id: '2169',
                name: '防排烟系统/干线设备/管道'
            }, {
                type: '2',
                id: '1465',
                name: '消防电系统/电气火灾漏电报警设备'
            }, {
                type: '2',
                id: '1746',
                name: '防排烟系统/补风机'
            }, {
                type: '2',
                id: '1457',
                name: '消防电系统/火灾报警控制器'
            }, {
                type: '2',
                id: '1681',
                name: '消防电系统/感烟探测器'
            }, {
                type: '2',
                id: '1910',
                name: '消防水系统/补水泵'
            }, {
                type: '2',
                id: '1673',
                name: '消防水系统/过滤器'
            }, {
                type: '2',
                id: '1827',
                name: '消防电系统/微型自动扫描灭火装置(水炮)'
            }, {
                type: '2',
                id: '1666',
                name: '消防水系统/消火栓'
            }, {
                type: '2',
                id: '2190',
                name: '消防水系统/消火栓泵压力表'
            }, {
                type: '2',
                id: '1773',
                name: '消防电系统/声光报警'
            }, {
                type: '2',
                id: '1693',
                name: '防排烟系统/排烟阀'
            }, {
                type: '2',
                id: '1817',
                name: '消防电系统/水炮录像机'
            }, {
                type: '2',
                id: '1659',
                name: '消防水系统/喷淋泵'
            }, {
                type: '2',
                id: '2181',
                name: '消防水系统/窗玻璃喷淋泵压力表'
            }, {
                type: '2',
                id: '1685',
                name: '消防电系统/控制模块'
            }, {
                type: '2',
                id: '1461',
                name: '消防电系统/消火栓按钮'
            }, {
                type: '2',
                id: '1742',
                name: '消防电系统/打印机'
            }, {
                type: '2',
                id: '1492',
                name: '消防水系统/喷雾泵'
            }, {
                type: '2',
                id: '1453',
                name: '消防电系统/防火卷帘'
            }, {
                type: '2',
                id: '1678',
                name: '消防电系统/报警图形显示器'
            }, {
                type: '2',
                id: '1670',
                name: '消防水系统/止回阀'
            }, {
                type: '2',
                id: '1663',
                name: '消防水系统/报警阀'
            }, {
                type: '2',
                id: '2187',
                name: '消防水系统/消防泵压力表'
            }, {
                type: '2',
                id: '1474',
                name: '消防水系统/喷淋泡沫罐'
            }, {
                type: '2',
                id: '1689',
                name: '消防电系统/消防电话'
            }, {
                type: '2',
                id: '1812',
                name: '消防电系统/紧急启动/停止按钮'
            }, {
                type: '2',
                id: '2170',
                name: '消防电系统/动火离人报警装置'
            }, {
                type: '2',
                id: '1466',
                name: '消防电系统/线性感温控制器'
            }, {
                type: '2',
                id: '1747',
                name: '防排烟系统/补风送风机'
            }, {
                type: '2',
                id: '1458',
                name: '消防电系统/UPS'
            }, {
                type: '2',
                id: '1682',
                name: '消防电系统/感温探测器'
            }, {
                type: '2',
                id: '1789',
                name: '消防电系统/水炮控制箱'
            }, {
                type: '2',
                id: '1675',
                name: '消防电系统/联动报警主机'
            }, {
                type: '2',
                id: '1830',
                name: '消防电系统/微型灭火装置现场手动控制盘'
            }, {
                type: '2',
                id: '1667',
                name: '消防水系统/信号阀'
            }, {
                type: '2',
                id: '2191',
                name: '消防水系统/水炮泵压力表'
            }, {
                type: '2',
                id: '1774',
                name: '消防电系统/消防水炮'
            }, {
                type: '2',
                id: '1694',
                name: '防排烟系统/防火阀'
            }, {
                type: '2',
                id: '1660',
                name: '消防水系统/加密喷淋泵'
            }, {
                type: '2',
                id: '2182',
                name: '消防水系统/隔膜稳压罐压力表'
            }, {
                type: '2',
                id: '1752',
                name: '防排烟系统/排油烟机'
            }, {
                type: '2',
                id: '1686',
                name: '消防电系统/监视模块'
            }, {
                type: '2',
                id: '1462',
                name: '消防电系统/火灾显示盘'
            }, {
                type: '2',
                id: '1743',
                name: '消防电系统/扬声器'
            }, {
                type: '2',
                id: '1455',
                name: '消防电系统/电脑'
            }, {
                type: '2',
                id: '1928',
                name: '消防水系统/消防水末端'
            }, {
                type: '2',
                id: '1679',
                name: '消防电系统/消防广播主机'
            }, {
                type: '2',
                id: '1908',
                name: '消防水系统/消火栓泵'
            }, {
                type: '2',
                id: '1671',
                name: '消防水系统/减压阀'
            }, {
                type: '2',
                id: '2126',
                name: '消防水系统/电伴热'
            }, {
                type: '2',
                id: '1824',
                name: '消防电系统/微型灭火装置监视器'
            }, {
                type: '2',
                id: '1664',
                name: '消防水系统/雨淋阀'
            }, {
                type: '2',
                id: '2188',
                name: '消防水系统/稳压泵压力表'
            }, {
                type: '2',
                id: '1690',
                name: '消防电系统/电话插孔'
            }, {
                type: '2',
                id: '1813',
                name: '消防电系统/智能疏散主机'
            }, {
                type: '2',
                id: '1657',
                name: '消防水系统/消防泵'
            }, {
                type: '2',
                id: '1467',
                name: '消防电系统/安全出口及疏散指示'
            }, {
                type: '2',
                id: '1748',
                name: '防排烟系统/排烟排风机'
            }, {
                type: '2',
                id: '2010',
                name: '消防电系统/EPS'
            }, {
                type: '2',
                id: '1459',
                name: '消防电系统/燃气报警集中控制器'
            }, {
                type: '2',
                id: '1942',
                name: '消防电系统/厨房自动灭火设备'
            }, {
                type: '2',
                id: '1683',
                name: '消防电系统/手动报警按钮'
            }, {
                type: '2',
                id: '1451',
                name: '消防电系统/电源控制'
            }, {
                type: '2',
                id: '1676',
                name: '消防电系统/联动控制柜'
            }, {
                type: '2',
                id: '1832',
                name: '消防电系统/剩余电流式电报火灾探测器'
            }, {
                type: '2',
                id: '1668',
                name: '消防水系统/蝶阀'
            }, {
                type: '2',
                id: '2192',
                name: '消防水系统/消防水末端压力表'
            }, {
                type: '2',
                id: '1695',
                name: '防排烟系统/排烟风机'
            }, {
                type: '2',
                id: '1661',
                name: '消防水系统/水炮泵'
            }, {
                type: '2',
                id: '2183',
                name: '消防水系统/加密喷淋泵压力表'
            }, {
                type: '2',
                id: '1687',
                name: '消防电系统/隔离模块'
            }, {
                type: '2',
                id: '1810',
                name: '消防电系统/气体灭火控制器'
            }, {
                type: '2',
                id: '1463',
                name: '消防电系统/气熔胶设备'
            }, {
                type: '2',
                id: '2209',
                name: '消防电系统/消防远程传输设备'
            }, {
                type: '2',
                id: '1497',
                name: '消防水系统/隔膜稳压罐'
            }, {
                type: '2',
                id: '1680',
                name: '消防电系统/消防对讲主机'
            }, {
                type: '2',
                id: '1909',
                name: '消防水系统/补水水箱'
            }, {
                type: '2',
                id: '1672',
                name: '消防水系统/水流指示器'
            }, {
                type: '2',
                id: '2128',
                name: '消防水系统/干线设备/管道'
            }, {
                type: '2',
                id: '1665',
                name: '消防水系统/接合器'
            }, {
                type: '2',
                id: '2189',
                name: '消防水系统/喷雾泵压力表'
            }, {
                type: '2',
                id: '1772',
                name: '消防电系统/七氟丙烷'
            }, {
                type: '2',
                id: '1692',
                name: '防排烟系统/加压送风机'
            }, {
                type: '2',
                id: '1816',
                name: '消防电系统/微型灭火装置管理主机'
            }, {
                type: '2',
                id: '1658',
                name: '消防水系统/稳压泵'
            }, {
                type: '2',
                id: '2180',
                name: '消防水系统/补水泵压力表'
            }, {
                type: '2',
                id: '1468',
                name: '消防水系统/预作用阀'
            }, {
                type: '2',
                id: '2012',
                name: '消防电系统/应急照明分配电装置'
            }, {
                type: '2',
                id: '1684',
                name: '消防电系统/警铃'
            }, {
                type: '2',
                id: '1650',
                name: '消防水系统/泄压阀'
            }, {
                type: '2',
                id: '1460',
                name: '消防电系统/可燃气体探测器'
            }, {
                type: '2',
                id: '1943',
                name: '消防电系统/燃气报警设备'
            }, {
                type: '2',
                id: '1452',
                name: '消防电系统/CD播放主机'
            }, {
                type: '2',
                id: '1677',
                name: '消防电系统/多线控制柜'
            }, {
                type: '2',
                id: '1669',
                name: '消防水系统/闸阀'
            }, {
                type: '2',
                id: '2193',
                name: '消防水系统/消火栓压力表'
            }, {
                type: '2',
                id: '1662',
                name: '消防水系统/窗玻璃喷淋泵'
            }, {
                type: '2',
                id: '2185',
                name: '消防水系统/喷淋泵压力表'
            }, {
                type: '2',
                id: '1473',
                name: '防排烟系统/排风机'
            }]
    }, {
        id: '1002',
        name: '暖通系统',
        children: [
            {
                type: '1',
                id: '5405',
                name: '热源机房'
            }, {
                type: '1',
                id: '5406',
                name: '送风机房'
            }, {
                type: '1',
                id: '5404',
                name: '排风机房'
            }, {
                type: '1',
                id: '5401',
                name: '空调机房'
            }, {
                type: '1',
                id: '5402',
                name: '水暖井'
            }, {
                type: '1',
                id: '5408',
                name: '制冷机房'
            }, {
                type: '1',
                id: '5609',
                name: '新风机房'
            }, {
                type: '2',
                id: '2008',
                name: '空调系统/换季板块/换季板换手动切换阀'
            }, {
                type: '2',
                id: '1712',
                name: '空调系统/空调末端/新风机组'
            }, {
                type: '2',
                id: '1449',
                name: '空调系统/换季板块/换季板式换热器'
            }, {
                type: '2',
                id: '1724',
                name: '空调系统/平衡阀/静态平衡阀'
            }, {
                type: '2',
                id: '2028',
                name: '空调系统/水蓄冷/换热器'
            }, {
                type: '2',
                id: '1704',
                name: '空调系统/冷冻水泵'
            }, {
                type: '2',
                id: '1717',
                name: '空调系统/闸阀'
            }, {
                type: '2',
                id: '2153',
                name: '空调系统/冷'
            }, {
                type: '2',
                id: '2034',
                name: '空调系统/空调末端/变风量空调末端(VAV-BOX)'
            }, {
                type: '2',
                id: '1708',
                name: '空调系统/分水器'
            }, {
                type: '2',
                id: '1446',
                name: '空调系统/热力板块/地暖板式换热器'
            }, {
                type: '2',
                id: '1720',
                name: '空调系统/电动调节阀（水）'
            }, {
                type: '2',
                id: '1481',
                name: '空调系统/稳压罐'
            }, {
                type: '2',
                id: '1701',
                name: '空调系统/冷(热)水机组/吸收式冷水机组'
            }, {
                type: '2',
                id: '2009',
                name: '空调系统/换季板块/换季板换电动切换阀'
            }, {
                type: '2',
                id: '2211',
                name: '空调系统/分体式空调'
            }, {
                type: '2',
                id: '1714',
                name: '空调系统/空调末端/吊顶风柜'
            }, {
                type: '2',
                id: '1725',
                name: '空调系统/软化水装置'
            }, {
                type: '2',
                id: '1920',
                name: '空调系统/空调末端/组合式空调机组'
            }, {
                type: '2',
                id: '2029',
                name: '空调系统/水蓄冷/布水器'
            }, {
                type: '2',
                id: '1705',
                name: '空调系统/冷却塔'
            }, {
                type: '2',
                id: '1471',
                name: '空调系统/补水泵'
            }, {
                type: '2',
                id: '2005',
                name: '空调系统/换季板块/换季冷却水泵'
            }, {
                type: '2',
                id: '1795',
                name: '空调系统/软化水装置-软水箱'
            }, {
                type: '2',
                id: '1718',
                name: '空调系统/止回阀'
            }, {
                type: '2',
                id: '2036',
                name: '空调系统/空调末端/风幕机'
            }, {
                type: '2',
                id: '1709',
                name: '空调系统/送风口'
            }, {
                type: '2',
                id: '1447',
                name: '空调系统/热力板块/热力板式换热器'
            }, {
                type: '2',
                id: '1721',
                name: '空调系统/电动调节阀（风）'
            }, {
                type: '2',
                id: '1702',
                name: '空调系统/锅炉'
            }, {
                type: '2',
                id: '1771',
                name: '空调系统/冷(热)水机组/压缩式螺杆冷水机组'
            }, {
                type: '2',
                id: '1715',
                name: '空调系统/空调末端/风机盘管'
            }, {
                type: '2',
                id: '1726',
                name: '空调系统/水处理加药装置'
            }, {
                type: '2',
                id: '1775',
                name: '空调系统/板换变频循环泵'
            }, {
                type: '2',
                id: '2032',
                name: '空调系统/过滤器(DN100以上)'
            }, {
                type: '2',
                id: '1706',
                name: '空调系统/膨胀水箱'
            }, {
                type: '2',
                id: '1444',
                name: '空调系统/热力板块/热力循环泵'
            }, {
                type: '2',
                id: '2007',
                name: '空调系统/换季板块/换季冷冻水泵'
            }, {
                type: '2',
                id: '1796',
                name: '空调系统/超市冷却塔'
            }, {
                type: '2',
                id: '2038',
                name: '空调系统/干线设备/管道'
            }, {
                type: '2',
                id: '1710',
                name: '空调系统/回风口'
            }, {
                type: '2',
                id: '1448',
                name: '空调系统/换季板块/换季循环泵'
            }, {
                type: '2',
                id: '1723',
                name: '空调系统/平衡阀/动态平衡阀'
            }, {
                type: '2',
                id: '2025',
                name: '空调系统/水蓄冷/蓄冷水泵'
            }, {
                type: '2',
                id: '1703',
                name: '空调系统/冷却水泵'
            }, {
                type: '2',
                id: '1716',
                name: '空调系统/蝶阀'
            }, {
                type: '2',
                id: '2033',
                name: '空调系统/地板采暖'
            }, {
                type: '2',
                id: '1707',
                name: '空调系统/集水器'
            }, {
                type: '2',
                id: '1445',
                name: '空调系统/热力板块/风幕板式换热器'
            }, {
                type: '2',
                id: '1719',
                name: '空调系统/电磁阀'
            }, {
                type: '2',
                id: '1700',
                name: '空调系统/冷(热)水机组/压缩式离心冷水机组'
            }]
    }, {
        id: '1001',
        name: '供配电系统',
        children: [
            {
                type: '1',
                id: '5204',
                name: '配电间'
            }, {
                type: '1',
                id: '5206',
                name: '强电井'
            }, {
                type: '1',
                id: '5209',
                name: '开闭所'
            }, {
                type: '1',
                id: '5201',
                name: '变电所'
            }, {
                type: '2',
                id: '1512',
                name: '供配电系统/高压配电柜/出线柜'
            }, {
                type: '2',
                id: '2070',
                name: '照明系统/夜景照明/控制软件'
            }, {
                type: '2',
                id: '1549',
                name: '照明系统/室内照明/射灯'
            }, {
                type: '2',
                id: '2062',
                name: '照明系统/公共照明/电脑'
            }, {
                type: '2',
                id: '1541',
                name: '照明系统/室外景观照明/高杆灯'
            }, {
                type: '2',
                id: '1937',
                name: '供配电系统/应急照明配电箱'
            }, {
                type: '2',
                id: '2144',
                name: '供配电系统/电表/机械电表'
            }, {
                type: '2',
                id: '1531',
                name: '供配电系统/应急电源柜'
            }, {
                type: '2',
                id: '2095',
                name: '供配电系统/干线设备/电缆'
            }, {
                type: '2',
                id: '1484',
                name: '供配电系统/低压配电柜/进线柜'
            }, {
                type: '2',
                id: '1524',
                name: '供配电系统/控制箱'
            }, {
                type: '2',
                id: '1516',
                name: '供配电系统/开闭所其他设备'
            }, {
                type: '2',
                id: '1553',
                name: '照明系统/室内照明/其他'
            }, {
                type: '2',
                id: '1750',
                name: '照明系统/室内照明/灯带'
            }, {
                type: '2',
                id: '2014',
                name: '照明系统/泛光灯/点光灯'
            }, {
                type: '2',
                id: '2067',
                name: '照明系统/夜景照明/电脑'
            }, {
                type: '2',
                id: '2165',
                name: '供配电系统/监控系统/供配电监控软件'
            }, {
                type: '2',
                id: '1545',
                name: '照明系统/室外景观照明/地灯'
            }, {
                type: '2',
                id: '1945',
                name: '供配电系统/消防动力配电箱'
            }, {
                type: '2',
                id: '1537',
                name: '照明系统/泛光灯/投光灯'
            }, {
                type: '2',
                id: '1528',
                name: '供配电系统/动力配电箱'
            }, {
                type: '2',
                id: '2092',
                name: '供配电系统/干线设备/母线'
            }, {
                type: '2',
                id: '1521',
                name: '供配电系统/高压配电柜/直流屏'
            }, {
                type: '2',
                id: '1558',
                name: '照明系统/消防照明灯/其他（工矿，防爆灯等）'
            }, {
                type: '2',
                id: '2019',
                name: '照明系统/室外景观照明/LED灯带'
            }, {
                type: '2',
                id: '1513',
                name: '供配电系统/高压配电柜/联络柜'
            }, {
                type: '2',
                id: '1550',
                name: '照明系统/室内照明/穹顶灯'
            }, {
                type: '2',
                id: '2063',
                name: '照明系统/公共照明/控制软件'
            }, {
                type: '2',
                id: '1542',
                name: '照明系统/室外景观照明/草坪灯'
            }, {
                type: '2',
                id: '1938',
                name: '供配电系统/商铺电表配电箱'
            }, {
                type: '2',
                id: '2146',
                name: '供配电系统/电表/智能预付费电表'
            }, {
                type: '2',
                id: '1532',
                name: '供配电系统/真空开关'
            }, {
                type: '2',
                id: '1525',
                name: '供配电系统/开关箱'
            }, {
                type: '2',
                id: '1518',
                name: '供配电系统/低压配电柜/出线柜'
            }, {
                type: '2',
                id: '1555',
                name: '照明系统/消防照明灯/筒灯'
            }, {
                type: '2',
                id: '2015',
                name: '照明系统/泛光灯/洗墙灯'
            }]
    }
];

export default {
    name: 'ModalView',
    components: { IconSearch },
    data() {
        return {
            TreeData5,
            modalStatusTip: false,
            modalStatusDefault: false,
            modalStatusSmall: false,
            modalStatusMiddle: false,
            modalStatusLarge: false,
            modalStatusFull: false,
            selVal: 'xincehng',
            selText: '新城项目',
            dataSelect: data,
            dataSelect4: [
                { id: 'test1', name: '选择项', label: '高级' },
                { id: 'test2', name: '单平米', label: '中级' },
                { id: 'test3', name: '下级分项', label: '初级' },
                { id: 'test4', name: '4444444', label: '低级' },
                { id: 'test5', name: '555555555', label: '低级' },
                { id: 'test6', name: '66666666666', label: '低级' },
                { id: 'test7', name: '6666', label: '低级' },
                { id: 'test8', name: '6', label: '低级' }
            ],
            activeClose: true,
            dataTreeMultiple: JSON.parse(JSON.stringify(dataTree)),
            datattt,
            testNum: 1
        };
    },
    methods: {
        modalShowTip() {
            this.modalStatusTip = true;
        },
        modalShowDefault() {
            this.modalStatusDefault = true;
        },
        modalShowSmall() {
            this.modalStatusSmall = true;
        },
        modalShowMiddle() {
            this.modalStatusMiddle = true;

            // const targetObj = {
            //     middle1111: document.getElementById('middle1111')
            // };
            // const ele = this.$refs.modalStatusMiddle.$el;
            // const func = (e) => {
            //     console.log(e);
            //     const { target } = e;
            //     if (document.getElementById('middle1111')) ele.removeEventListener('DOMNodeInserted', func);
            // };
            // ele.addEventListener('DOMNodeInserted', func);
        },
        modalShowLarge() {
            this.modalStatusLarge = true;
        },
        modalShowFull() {
            this.modalStatusFull = true;
        },
        modalClose(secondary) {
            console.log(secondary);
            if (secondary === true) {
                this.modalStatusTip = true;
            } else {
                this.modalStatusTip = false;
                this.modalStatusDefault = false;
                this.modalStatusSmall = false;
                this.modalStatusMiddle = false;
                this.modalStatusLarge = false;
            }
        },
        modalConfirm() {
            console.log('alertConfirm');
        },
        groupChange({ cId, cName, pId }) {
            console.log(cId, cName, pId);
            this.selVal = cId;
            this.selText = cName;
        },
        confirm(e) {
            console.log(e);
        },
        cancel(e) {
            console.log(e);
        },
        largeModalFn() {
            this.testNum += 1;
            setTimeout(() => {
                const { $refs: { largeModal } } = this;
                if (largeModal) largeModal.countPos();
            });
        }
    }
};
</script>

<style lang="stylus" scoped>
.component
    h3
        margin 8px
        font-size 16px

</style>
