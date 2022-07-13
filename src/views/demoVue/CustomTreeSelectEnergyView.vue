<template>
    <div class="customTreeSelectEnergyView">
        <Button @click="showClick">选中项互不影响</Button>
        <br>
        <!--
        -->
        <CustomTreeSelectEnergy
            :show.sync="show"
            title="添加设备"
            :omit="true"
            :jointParent="true"
            :moreBtn="moreBtn"
            v-model="value1"
            :data="data1"
            @change="change"
            @addGroup="addGroup"
        />
        <br><br>
        <Button @click="showClick2">选中项相互影响</Button>
        <br>
        <!--
        -->
        <CustomTreeSelectEnergy
            :show.sync="show2"
            :linkage="true"
            :includeParent="false"
            :jointParent="true"
            :moreBtn="moreBtn2"
            v-model="value2"
            :data="data2"
            :autoClose="true"
            @change="change"
            @prevStep="prevStep"
        />
    </div>
</template>

<script>
const data = [
    {
        id: '0',
        name: '顶级顶级顶级顶级顶级顶级顶级顶级顶级顶级顶级顶级',
        tag: { name: '分项', color: '#aa7803', bgColor: '#faf1d1' },
        open: true,
        defaultDisabled: true,
        children: [
            {
                id: '1',
                name: '一级1',
                open: true,
                defaultDisabled: true,
                children: [
                    {
                        id: '12', name: '二级2', defaultDisabled: true, tag: { name: '计算单元', color: '#373c43', bgColor: '#eff0f1' }
                    },
                    { id: '121', name: '二级3', defaultDisabled: true },
                    {
                        id: '122', name: '二级4', defaultDisabled: true, tag: { name: '分项', color: '#aa7803', bgColor: '#faf1d1' }
                    },
                    {
                        id: '1321',
                        name: '二级1',
                        defaultDisabled: true,
                        children: [
                            {
                                id: '13', name: '三级2', tag: { name: '计算单元', color: '#373c43', bgColor: '#eff0f1' }
                            },
                            {
                                id: '131', name: '三级3', tag: { name: '计算单元', color: '#373c43', bgColor: '#eff0f1' }
                            },
                            {
                                id: '132', name: '三级4', tag: { name: '计算单元', color: '#373c43', bgColor: '#eff0f1' }
                            }
                        ]
                    }
                ]
            },
            {
                id: '2',
                name: '一级2',
                children: [
                    { id: '222', name: '二级2' },
                    { id: '2221', name: '二级1' },
                    { id: '2222', name: '二级3' }
                ]
            },
            {
                id: '3',
                name: '一级3',
                children: [
                    { id: '322', name: '二级2' },
                    { id: '3220', name: '二级0' },
                    { id: '3221', name: '二级1' }
                ]
            }
        ]
    }
];
const dataTTT = [
    {
        id: 'VOEi56c25a67412a417fbf225ca1722f3a27',
        itemLocalId: 'EI1001',
        name: '华润生命科学园（电）',
        parentLocalId: '-1',
        itemRatedPower: 17800,
        disable: true,
        order: 0,
        children: []
    },
    {
        id: 'VOEi5a021cf0370b491c8e1752a6349377cd',
        itemLocalId: 'EI10101010202002',
        name: '外租用电',
        parentLocalId: 'EI2001',
        itemRatedPower: 4800,
        disable: true,
        order: 1,
        children: []
    },
    {
        id: 'VOEi4d531815dee9447c80ac43493d684b07',
        itemLocalId: 'EI10102001',
        name: '公区用电',
        parentLocalId: 'EI2001',
        itemRatedPower: 13000,
        disable: true,
        order: 2,
        children: []
    },
    {
        id: 'VOEid35081d797414c319032948692dd807b',
        itemLocalId: 'EI101020102001',
        name: '应急动力',
        parentLocalId: 'EI12001',
        itemRatedPower: 1000,
        disable: true,
        order: 3,
        children: [
            {
                id: 'VOCu11067291a5ca430a8c10d30f5522b9b0',
                calculateLocalId: 'CU001178',
                name: '3AA8-1 415-1 B1层B1APE3Za（主） 应急动力',
                calculateRatedPower: 100,
                disable: true
            },
            {
                id: 'VOCu2cb4300c3d44480d91d7cee442373246',
                calculateLocalId: 'CU001139',
                name: '2AA9-2 425-2 B1层B1APE2Zb（备） 应急动力',
                calculateRatedPower: 100,
                disable: true
            },
            {
                id: 'VOCu36b53e8b87fc4dab8cdfbe35ca0d082d',
                calculateLocalId: 'CU001200',
                name: '3AA12-7 422-7 1层APEb（备） 应急动力',
                calculateRatedPower: 100,
                disable: true
            },
            {
                id: 'VOCu3b2c94c0d4ae4464a6e2fb748fbf8c71',
                calculateLocalId: 'CU001039',
                name: '1AA8-1 415-1 B1层B1APE1ZQ（主） 应急动力（主）',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu4c84d30bb11c4b928a146911ec587e8b',
                calculateLocalId: 'CU001068',
                name: '1AA9-2 425-2 B1层B1APEIQ（备） 应急动力',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCuba50cfb83af54ad9b752b917bd869462',
                calculateLocalId: 'CU001194',
                name: '3AA9-2 425-2 B1层B1APE3Zb（备） 应急动力',
                calculateRatedPower: 100,
                disable: true
            },
            {
                id: 'VOCuc1858273217d4a4c98f8acffbaf70b34',
                calculateLocalId: 'CU001119',
                name: '2AA13-3 421-3 1层APRZQ 应急动力',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCuc615454263c042f399875deccf6e3eee',
                calculateLocalId: 'CU001137',
                name: '2AA10-4 424-4 B1层B1APE2 ZD应急动力',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCudb662a7b95dd43dab352123c77cf5f1b',
                calculateLocalId: 'CU001159',
                name: '3AA5-1 412-1 1层APEQ（主） 应急动力',
                calculateRatedPower: 100,
                disable: true
            },
            {
                id: 'VOCuefbd15a9fa224106a4cababafd8c61f3',
                calculateLocalId: 'CU001088',
                name: '2AA4-2 411-2 1层APEZb（备） 应急动力',
                calculateRatedPower: 100,
                disable: false
            }
        ]
    },
    {
        id: 'VOEifd6fe92ea0f54b0ba8146a4663442447',
        itemLocalId: 'EI101020201001',
        name: '室内照明插座',
        parentLocalId: 'EI12002',
        itemRatedPower: 1100,
        disable: false,
        order: 4,
        children: []
    },
    {
        id: 'VOEidcf736c19d2d4aa6a820240678e4eca8',
        itemLocalId: 'EI10102020101001',
        name: '普通照明',
        parentLocalId: 'EI101020201001',
        itemRatedPower: 500,
        disable: false,
        order: 5,
        children: [
            {
                id: 'VOCu3d28863fefb4457a8f56ec47255b487d',
                calculateLocalId: 'CU001132',
                name: '2AA11-5 423-5 1层1ALZ 照明',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu4158d8ac65634548ba1e6e486cffdfb8',
                calculateLocalId: 'CU001100',
                name: '2AA6-3 413-3 B1层B1AL2Z 照明插座',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCub813cf4aaa95427599aebd9b7656553c',
                calculateLocalId: 'CU001203',
                name: '3AA11-3 423-3 B1层B1AL3 Z照明',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCuf1bcf97264cc4781ae300f2026a05556',
                calculateLocalId: 'CU001028',
                name: '1AA6-2 413-2 B1层B1AL1Z公区照明',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCuf58225ce04384894afab43394a099c75',
                calculateLocalId: 'CU001204',
                name: '3AA11-4 423-4 1层AL2照明',
                calculateRatedPower: 100,
                disable: false
            }
        ]
    },
    {
        id: 'VOEi416b14aa9640491a8c92eb893a4cf4a3',
        itemLocalId: 'EI10102020102001',
        name: '应急照明',
        parentLocalId: 'EI101020201001',
        itemRatedPower: 600,
        disable: false,
        order: 6,
        children: [
            {
                id: 'VOCu144cb48962e14c58b738e28993d5e888',
                calculateLocalId: 'CU001138',
                name: '2AA9-1 425-1 1层ALEZQ（主） 应急照明',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu21b3fcf027144519b9800d1580884754',
                calculateLocalId: 'CU001094',
                name: '2AA5-4 412-4 B1ALE-sub2（主） 应急照明',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu4407a5576ace4078947a9632442370f2',
                calculateLocalId: 'CU001124',
                name: '2AA12-4 422-4 B1层ALE-sub2（备） 应急照明',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu5dab79ee6ac44d829c6d29e3671da3cd',
                calculateLocalId: 'CU001193',
                name: '3AA9-1 425-1 1层ALEZa（主） 应急照明',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu6589b6a944b9446f80d08af5bc33cabd',
                calculateLocalId: 'CU001179',
                name: '3AA8-2 415-2 1层ALEb（备） 应急照明',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu920350d75c194e59802c148bf062cd92',
                calculateLocalId: 'CU001110',
                name: '2AA8-1 415-1 1层ALEb（备） 应急照明',
                calculateRatedPower: 100,
                disable: false
            }
        ]
    },
    {
        id: 'VOEi6fe09e25548d414d9ccc86bd444cb80e',
        itemLocalId: 'EI101020202001',
        name: '室外照明',
        parentLocalId: 'EI12002',
        itemRatedPower: 500,
        disable: false,
        order: 7,
        children: []
    },
    {
        id: 'VOEi949d627733ff4bce879258d6089558ca',
        itemLocalId: 'EI1010202020101001',
        name: '景观照明',
        parentLocalId: 'EI101020202001',
        itemRatedPower: 100,
        disable: false,
        order: 8,
        children: [
            {
                id: 'VOCu88e53f593a474a77a62d60faebb0d9b9',
                calculateLocalId: 'CU001174',
                name: '3AA7-3 414-3 1层园林',
                calculateRatedPower: 100,
                disable: false
            }
        ]
    },
    {
        id: 'VOEib06f4b8f22864a8f8c9e46394f0339bb',
        itemLocalId: 'EI10102020202001',
        name: '泛光照明',
        parentLocalId: 'EI101020202001',
        itemRatedPower: 400,
        disable: false,
        order: 9,
        children: [
            {
                id: 'VOCu00c37c7869614eecaa85a062ac4f5190',
                calculateLocalId: 'CU001018',
                name: '1AA4-3 411-3 3层 FGIA2 夜间照明',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu06b463e479db4e8eaed7b1d6ed281345',
                calculateLocalId: 'CU001096',
                name: '2AA5-6 412-6 4层FG2AL 泛光',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu17256cad99be482c9351f64fe35ab8de',
                calculateLocalId: 'CU001059',
                name: '1AA11-3 423-3 夜景照明',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu26517373edc3408c82b967866d06992f',
                calculateLocalId: 'CU001166',
                name: '3AA6-1 413-1 3ALE-sub3 泛光',
                calculateRatedPower: 100,
                disable: false
            }
        ]
    },
    {
        id: 'VOEic5f026a6a21c40388e1c4921d252965c',
        itemLocalId: 'EI101020301001',
        name: '普通动力',
        parentLocalId: 'EI12001',
        itemRatedPower: 1900,
        disable: true,
        order: 10,
        children: [
            {
                id: 'VOCu0776b0bbe6bd4648a54ff6173625c998',
                calculateLocalId: 'CU001030',
                name: '1AA6-4 413-4 楼顶2AP空调动力',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu0a8d0a60b2df4d1dbe601874808ab270',
                calculateLocalId: 'CU001167',
                name: '3AA6-2 413-2 1层AP2动力',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu1a1ca498aec54b9287565a15b1b0b1a7',
                calculateLocalId: 'CU001170',
                name: '3AA6-5 413-5 B1层B1AP3 Z动力',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu1a85e898d8fe46d8994285a3acc63a33',
                calculateLocalId: 'CU001127',
                name: '2AA12-7 422-7 B1层B1AT 1-3动力',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu2542aeed5e674bfa8fd0207a88e6f619',
                calculateLocalId: 'CU001199',
                name: '3AA12-6 422-6 1层APRZ（备） 动力',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu28d93616c47e463aa5dbe95aa93e0069',
                calculateLocalId: 'CU001035',
                name: '1AA7-3 414-3 楼顶WAPK-LL1 空调动力',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu29e00ac79e8342228b05298511f6dcd3',
                calculateLocalId: 'CU001102',
                name: '2AA6-5 413-5 B1层B1AP-ZQ 动力热力站',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu40c3774e130d45418b1dffff2ae48d16',
                calculateLocalId: 'CU001111',
                name: '2AA8-2 415-2 B1层B1APE2ZQ（主） 动力应急',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu997e341e27e94eb6aaf8af0d49ab447a',
                calculateLocalId: 'CU001187',
                name: '3AA13-3 421-3 B1层XFB8（主） 喷淋泵',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCua3bfaf7f9379483496cc8cd96de05864',
                calculateLocalId: 'CU001156',
                name: '3AA4-2 411-2 B1层XFB8（备） 喷淋泵',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCua81283d695424cac90b213c3dc77822c',
                calculateLocalId: 'CU001131',
                name: '2AA11-4 423-4 1层1APZ动力',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCuc4ff4d2c19c34068a104f40c70a8823a',
                calculateLocalId: 'CU001155',
                name: '3AA4-1 411-1 B1层XFB1（主） 消防泵',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCud41cefaf32184b25ba936af8cc4f66f8',
                calculateLocalId: 'CU001188',
                name: '3AA13-4 421-4 B1层XFB1（备） 消防泵',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCue4c3d9f513d4473e900421cecde556d6',
                calculateLocalId: 'CU001202',
                name: '3AA11-2 423-2 B1层B1AP-GS 生活泵房',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCuf3e612a7a44544748cb372c016efabc7',
                calculateLocalId: 'CU001101',
                name: '2AA6-4 413-4 B1层B1AP-Z3 中水泵',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCuf3f558d681624b9ab7f9d5014d0be902',
                calculateLocalId: 'CU001050',
                name: '1AA12-1 422-1 楼顶Z-FAPE 厨房风机',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCuf5a214602766495c9b7e97bf99b48474',
                calculateLocalId: 'CU001016',
                name: '1AA4-1 411-1 B1层 APZ动力',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCuf88dd6641c1f4cc6bdec79f1c9137408',
                calculateLocalId: 'CU001108',
                name: '2AA7-5 414-5 B1层B1APE2 ZC动力',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCufd77bb2982b641fda0ccbe4292e91608',
                calculateLocalId: 'CU001099',
                name: '2AA6-2 413-2 B1层B1AP2Z 风机动力',
                calculateRatedPower: 100,
                disable: false
            }
        ]
    },
    {
        id: 'VOEi3b526600f1084f2cb83456aa115dd641',
        itemLocalId: 'EI101020304001',
        name: '电梯动力',
        parentLocalId: 'EI12001',
        itemRatedPower: 1100,
        disable: true,
        order: 11,
        children: [
            {
                id: 'VOCu00bd71945910444984483b9ec171243b',
                calculateLocalId: 'CU001058',
                name: '1AA11-2 423-2 楼顶WAPDT4 1#电梯动力',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu0b354952c8e34f21a4d1bb89a8f9dfea',
                calculateLocalId: 'CU001129',
                name: '2AA11-2 423-2 楼顶APDT3 6#、7#电梯',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu1379bb17a69344e7ba1e7873b26318c3',
                calculateLocalId: 'CU001169',
                name: '3AA6-4 413-4 楼顶APDT3 12#电梯',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu34ca9188bcbf4562ab25e40abd61a18d',
                calculateLocalId: 'CU001103',
                name: '2AA6-6 413-6 楼顶APDT1 8#、9#电梯动力',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu4cfb884baf244a359938208876d6ec1a',
                calculateLocalId: 'CU001027',
                name: '1AA6-1 413-1 楼顶WAPPT2 2#、3#电梯动力',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu6b25bc6f3174467c8b1aa3dfffbaf8f1',
                calculateLocalId: 'CU001168',
                name: '3AA6-3 413-3 楼顶APDT1 13#、14#电梯',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu91626dc598bf4f38b811f87167fd3382',
                calculateLocalId: 'CU001130',
                name: '2AA11-3 423-3 楼顶APDT4 10#电梯',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCuab64429fad5d4f21be9b68be61ac5fb8',
                calculateLocalId: 'CU001104',
                name: '2AA7-1 414-1 楼顶APDT2 11#电梯动力',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCubec40d01c1ec413181ec5f86cf3709ae',
                calculateLocalId: 'CU001205',
                name: '3AA11-5 423-5 楼顶APDT2 15#、16#电梯',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCud101cfb38b43427194b7b01e4b3a3301',
                calculateLocalId: 'CU001029',
                name: '1AA6-3 413-3 楼顶WAPPT1 5#电梯动力',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCud86b3c034639414f812095df2fa60300',
                calculateLocalId: 'CU001057',
                name: '1AA11-1 423-1 楼顶WAPDT3 4#电梯动力',
                calculateRatedPower: 100,
                disable: false
            }
        ]
    },
    {
        id: 'VOEif123016cd49d4018a4f1000efca4fa8e',
        itemLocalId: 'EI12001',
        name: '动力用电',
        parentLocalId: 'EI10102001',
        itemRatedPower: 4000,
        disable: true,
        order: 12,
        children: []
    },
    {
        id: 'VOEiaf430091037d4224a036bd461a54d301',
        itemLocalId: 'EI12002',
        name: '照明用电',
        parentLocalId: 'EI10102001',
        itemRatedPower: 1600,
        disable: true,
        order: 13,
        children: []
    },
    {
        id: 'VOEid9cfd59d8de54dbe98140592276250cf',
        itemLocalId: 'EI12003',
        name: '展厅用电',
        parentLocalId: 'EI10102001',
        itemRatedPower: 800,
        disable: true,
        order: 14,
        children: [
            {
                id: 'VOCu048b31a71e214cfda0e30307d05a111c',
                calculateLocalId: 'CU001025',
                name: '1AA5-6 412-6 1层 AL照明（咖啡厅）',
                calculateRatedPower: 100,
                disable: true
            },
            {
                id: 'VOCu5525196e783f470690f67fbf16c2959c',
                calculateLocalId: 'CU001054',
                name: '1AA12-5 422-5 1层ALEB（备）应急照明',
                calculateRatedPower: 100,
                disable: true
            },
            {
                id: 'VOCu6cfc15f15faf4ce5bee55294452f9fcc',
                calculateLocalId: 'CU001038',
                name: '1AA7-6 414-6 1层WAPK1 动力',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu7cc82b0f99984e50ba922893da2c8a46',
                calculateLocalId: 'CU001053',
                name: '1AA12-4 422-4 1层ALZ照明动力',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu9965a1731ee54c52adbaa07d779037a0',
                calculateLocalId: 'CU001067',
                name: '1AA9-1 425-1 1层APEQ（备） 应急照明',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCuaacb99d228e340b0b5270ac027f25b76',
                calculateLocalId: 'CU001062',
                name: '1AA11-6 423-6 1层ALE 照明插座',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCuda8ee87600534c4a9207ff0be847015f',
                calculateLocalId: 'CU001040',
                name: '1AA8-2 415-2 1层APEQ（主） 应急动力（主）',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCue1fdc2b591984f648eb7c606eacf421e',
                calculateLocalId: 'CU001022',
                name: '1AA5-3 412-3 1层 ALE（主）应急照明',
                calculateRatedPower: 100,
                disable: false
            }
        ]
    },
    {
        id: 'VOEif2f3101739bf4ba7b0dc271ae95e28ef',
        itemLocalId: 'EI12004',
        name: '连廊用电',
        parentLocalId: 'EI10102001',
        itemRatedPower: 400,
        disable: true,
        order: 15,
        children: [
            {
                id: 'VOCu4579d4d09a99414f84e7366f8d4e3360',
                calculateLocalId: 'CU001177',
                name: '3AA7-6 414-6 楼顶WAPK-LL3 空调',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu46d2a795b5cf4458a93d6b3d14e2a455',
                calculateLocalId: 'CU001133',
                name: '2AA11-6 423-6 楼顶WAPK-LL2 空调',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCudfda71feba4140d29eb1e1f2a9c60b01',
                calculateLocalId: 'CU001033',
                name: '1AA7-1 414-1 2层2AL照明插座',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCue5153cee141d42f9a8fe564b08a1a96a',
                calculateLocalId: 'CU001089',
                name: '2AA4-3 411-3 楼顶WPD1（主） 风冷机组',
                calculateRatedPower: 100,
                disable: false
            }
        ]
    },
    {
        id: 'VOEif8e1cdc6d2fc4521ba8deb6aa1506e93',
        itemLocalId: 'EI12005',
        name: '餐厅用电',
        parentLocalId: 'EI10102001',
        itemRatedPower: 600,
        disable: true,
        order: 16,
        children: [
            {
                id: 'VOCu90c014835645402d9de3a9d66eeba8ae',
                calculateLocalId: 'CU001024',
                name: '1AA5-5 412-5 B1层 Z-B1AP动力（厨房）',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu9cf180f8b9264599a524a7cfd720feeb',
                calculateLocalId: 'CU001031',
                name: '1AA6-5 413-5 B1层AP-AHT照明插座',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu9e6960093ad44403893ac4363cd94857',
                calculateLocalId: 'CU001063',
                name: '1AA10-1 424-1 B1层Z-B1AT1（备）动力',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCuaba1a9d0d033456e90d3081b233f000e',
                calculateLocalId: 'CU001032',
                name: '1AA6-6 413-6 B1层AP1Z 动力',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCubbddd760d9484266ae751d4ccb62a0c4',
                calculateLocalId: 'CU001019',
                name: '1AA4-4 411-4 B1层 AP-CHF 动力',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCue18e25a41baf48b4a2116b99b334f073',
                calculateLocalId: 'CU001036',
                name: '1AA7-4 414-4 B1层Z-APAT1（主）动力',
                calculateRatedPower: 100,
                disable: false
            }
        ]
    },
    {
        id: 'VOEife1232ad230e4031b793cfe7a6bda3c4',
        itemLocalId: 'EI12006',
        name: '机房用电',
        parentLocalId: 'EI10102001',
        itemRatedPower: 1200,
        disable: true,
        order: 17,
        children: [
            {
                id: 'VOCu09dc7e3c1e6c445eb84cfebed8e797fe',
                calculateLocalId: 'CU001161',
                name: '3AA5-3 412-6 直流1路电源（备）',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu0b8a58c42a224091a9c5ec5c716d1187',
                calculateLocalId: 'CU001093',
                name: '2AA5-3 412-3 B1层APRZ（主） 弱电总柜',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu0e73817e992b455886002139d08ef593',
                calculateLocalId: 'CU001122',
                name: '2AA12-2 422-2 B1层直流',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu2a578ccf4cd648d68d1bc955e196b86e',
                calculateLocalId: 'CU001160',
                name: '3AA5-2 412-2 1层APRZ（主） 弱电总柜',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu41e040a7ec324d749c82d8f8cde80dd3',
                calculateLocalId: 'CU001209',
                name: '3AA10-3 424-3 B1滤波',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu53bbd0cf5a1c479197ed5035e66afb8c',
                calculateLocalId: 'CU001021',
                name: '1AA5-2 412-2 B1层 APR2弱电总电源',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu5546ae01011c42b5bc8eacb554e27c09',
                calculateLocalId: 'CU001186',
                name: '3AA13-2 421-2 B1层B1AP-JF（备） 电话网络机房',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu6a343c42d74a47c596fbb8a140a4ab42',
                calculateLocalId: 'CU001125',
                name: '2AA12-5 422-5 B1层APR2（备） 弱电总柜',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu7397f09dddb04f0aae62d2cba89c4478',
                calculateLocalId: 'CU001064',
                name: '1AA10-2 424-2 B1层滤波电源',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu7908fdc3e4144403afa8b23c87071431',
                calculateLocalId: 'CU001055',
                name: '1AA12-6 422-6 B1APRZ（备） 弱电总柜',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu8bc664e0ed174e81b55add9e01e43ee3',
                calculateLocalId: 'CU001157',
                name: '3AA4-3 411-3 B1层B1AP-JF（主）弱电机房总电',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCub31c7fb0ed554c1fa9d04dd3475dde16',
                calculateLocalId: 'CU001173',
                name: '3AA7-2 414-2 滤波',
                calculateRatedPower: 100,
                disable: false
            }
        ]
    },
    {
        id: 'VOEifa934d1784044105bfffa936e81f8a8e',
        itemLocalId: 'EI12007',
        name: '其它用电',
        parentLocalId: 'EI10102001',
        itemRatedPower: 4400,
        disable: true,
        order: 18,
        children: []
    },
    {
        id: 'VOEi0ddc0cb81c86445aa3c0878142122d27',
        itemLocalId: 'EI2001',
        name: '北三栋用电',
        parentLocalId: 'EI1001',
        itemRatedPower: 17800,
        disable: true,
        order: 19,
        children: []
    },
    {
        id: 'VOEi2c283cd21e2247ffad63190073dc0724',
        itemLocalId: 'EI3001',
        name: '南三栋用电',
        parentLocalId: 'EI1001',
        itemRatedPower: null,
        disable: true,
        order: 20,
        children: []
    },
    {
        id: 'VOEi11288aa22ad2437088687927356ccae5',
        itemLocalId: 'EI5201314001',
        name: '艺妙',
        parentLocalId: 'EI10101010202002',
        itemRatedPower: 1900,
        disable: true,
        order: 21,
        children: [
            {
                id: 'VOCu00685e984d254e2abac5a5fa8c80d95b',
                calculateLocalId: 'CU001120',
                name: '2AA13-4 421-4 楼顶WAPD2 风冷机组1（主）',
                calculateRatedPower: 100,
                disable: true
            },
            {
                id: 'VOCu04b11b17bbfe49f5a613e420fd215289',
                calculateLocalId: 'CU001023',
                name: '1AA5-4 412-4 3B-1F 艺妙 1APZ 动力',
                calculateRatedPower: 100,
                disable: true
            },
            {
                id: 'VOCu2c9294d554c54f2d89ff294a9c4a4147',
                calculateLocalId: 'CU001087',
                name: '2AA4-1 411-1 4层4AP-UPS UPS供电',
                calculateRatedPower: 100,
                disable: true
            },
            {
                id: 'VOCu3c86abb195804426b6be2d6d7356ee16',
                calculateLocalId: 'CU002018',
                name: '增3-6 426-6 3B-4F 艺妙 MCC4-空调1',
                calculateRatedPower: 100,
                disable: true
            },
            {
                id: 'VOCu41086c840f8d4515964ce744655db11a',
                calculateLocalId: 'CU002013',
                name: '增3-1 426-1 3B-4F 艺妙 MCC5-空调2',
                calculateRatedPower: 100,
                disable: true
            },
            {
                id: 'VOCu4cba3ee7f97248a492815ee9bad82926',
                calculateLocalId: 'CU002008',
                name: '增2-2 417-2 3B-楼顶 艺妙 WAPD2（备）-风冷机组',
                calculateRatedPower: 100,
                disable: true
            },
            {
                id: 'VOCu5d64603136654aa79d47329152e04329',
                calculateLocalId: 'CU002017',
                name: '增3-5 426-5 3B-4F 艺妙 MCC2-空调4',
                calculateRatedPower: 100,
                disable: true
            },
            {
                id: 'VOCu600720ea20b84677ae7bdaad4008f5d6',
                calculateLocalId: 'CU002014',
                name: '增3-2 426-2 计算机（预留）4APJF（主用）',
                calculateRatedPower: 100,
                disable: true
            },
            {
                id: 'VOCu98aa545dba6b4d88aa9016d6a9ff7bd3',
                calculateLocalId: 'CU002016',
                name: '增3-4 426-4 3B-4F 艺妙 4APS1-风机盘管',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu9faa517a482a417da814eeff7c6a7fe7',
                calculateLocalId: 'CU002019',
                name: '增3-7 426-7 3B-4F 艺妙 MCC1-空调3',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCua0a98e19e97c4deea6c625b4d569a9e0',
                calculateLocalId: 'CU001118',
                name: '2AA13-2 421-2 楼顶WAPD1 风冷机组2（备）',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCua674b91c78cd4383b6c521e16332dbbf',
                calculateLocalId: 'CU001098',
                name: '2AA6-1 413-1 4层4APK5（主） 动力',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCuac6c1e8000424fd3a782ceb7ef343160',
                calculateLocalId: 'CU002012',
                name: '增2-6 417-6 3B-4F 艺妙 4APG-g1-动力1',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCub8684f9f87114c98a0bf111e559451ba',
                calculateLocalId: 'CU002010',
                name: '增2-4 417-4 3B-4F 艺妙 4APEZ2-动力4',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCubc39d3d445424a11b5350d5af30a910a',
                calculateLocalId: 'CU002015',
                name: '增3-3 426-3 3B-4F 艺妙 4APEZ1-动力3',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCubf6afc3eea5b47b7aef4c195b009d378',
                calculateLocalId: 'CU002007',
                name: '增2-1 417-1 计算机（预留）4APJF（备用）',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCud5bdae96d0e84d38a88e62dbae914e72',
                calculateLocalId: 'CU002011',
                name: '增2-5 417-5 3B-4F 艺妙 4APG1-动力2',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCudec6770d2d514c16b4613c38cda09262',
                calculateLocalId: 'CU002020',
                name: '增3-8 426-8 3B-4F 艺妙 4APK5-动力5',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCuf8c7a6020799456fad4fadf6142293a0',
                calculateLocalId: 'CU002009',
                name: '增2-3 417-3 3B-B1 艺妙 B2AP2-动力6',
                calculateRatedPower: 100,
                disable: false
            }
        ]
    },
    {
        id: 'VOEi545e3bdde3534a76a76cedfbca519510',
        itemLocalId: 'EI5201314002',
        name: '瑞博',
        parentLocalId: 'EI10101010202002',
        itemRatedPower: 2100,
        disable: true,
        order: 22,
        children: [
            {
                id: 'VOCu0fda90687b104820bcd8377b1ff8dc6c',
                calculateLocalId: 'CU001091',
                name: '2AA5-1 412-1 3层3ALEQ（主） 应急照明',
                calculateRatedPower: 100,
                disable: true
            },
            {
                id: 'VOCu165877873f8743ba8eb5e3c3c2e48365',
                calculateLocalId: 'CU002002',
                name: '增1-2 416-2 3B-楼顶 瑞博 WAPK1-多联机空调',
                calculateRatedPower: 100,
                disable: true
            },
            {
                id: 'VOCu1b3f4f41ea384dc4a747658a025c3dd6',
                calculateLocalId: 'CU001135',
                name: '2AA10-2 424-2 3层3APG3 照明插座',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu1d9838268a634b5195e395547f6add1e',
                calculateLocalId: 'CU002025',
                name: '增3-5 427-5 3B-楼顶 瑞博 WAPK2（备）-风冷机组',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu2d5ed33d8f134a1ba7403d0fdbc87d32',
                calculateLocalId: 'CU001136',
                name: '2AA10-3 424-3 3层3APR-JF（主） 弱电机房',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu2e46c3249bf84af782773bb8dff654be',
                calculateLocalId: 'CU001105',
                name: '2AA7-2 414-2 3层3APG1照明 插座空调',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu354317d9d4e44ac989e042994ed84bf1',
                calculateLocalId: 'CU002003',
                name: '增1-3 416-3 3B-3F 瑞博 WAPa（备）消防补风排烟',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu3fad0a7d6e044944a494cf738d24008b',
                calculateLocalId: 'CU002005',
                name: '增1-5 416-5 3B-楼顶 瑞博 WAPK2（主）-风冷机组',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu4889f11bc6fa4fa396c87c38aa20a5a6',
                calculateLocalId: 'CU002001',
                name: '增1-1 416-1 3B-3F 瑞博 3APK-XF 变频柜（化学区）',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu526e8be5ddaa42ef9eafcb2eb324ac13',
                calculateLocalId: 'CU001106',
                name: '2AA7-3 414-3 3层3APR-JF（备） 弱电机房',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu79c18741488a44679d54dcb7dc600f44',
                calculateLocalId: 'CU002026',
                name: '增3-6 416-6 3B-楼顶 瑞博 WAPK3（备）-风冷机组',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu7a1060d14fd3475baf9e2542463ad6ec',
                calculateLocalId: 'CU001107',
                name: '2AA7-4 414-4 3层3APG2（主） 动物房',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu7e0d55e66eea42599b890f75a7455378',
                calculateLocalId: 'CU002006',
                name: '增1-6 427-6 3B-楼顶 瑞博 WAPK3（主）-风冷机组',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu82ecd993fabe4eaf8846b0b2339c8268',
                calculateLocalId: 'CU002004',
                name: '增1-4 416-4 3B-楼顶 瑞博 WAPK4（备）变频柜及冷冻泵',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu9407c295f1d94c47914e583595ada645',
                calculateLocalId: 'CU002021',
                name: '增3-1 427-1 3B-楼顶 瑞博 WAPK5-排风',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCuaab17fed2da4464fb8a7c3db41b0336e',
                calculateLocalId: 'CU001095',
                name: '2AA5-5 412-5 3层3AL1 照明',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCub35af53546f14950b212e697c3394e4d',
                calculateLocalId: 'CU001134',
                name: '2AA10-1 424-1 3层3APG2（备） 动物房',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCub8441bfef5bb4ff79e8767aeeb05fa45',
                calculateLocalId: 'CU002024',
                name: '增3-4 427-4 3B-楼顶 瑞博 WAPK4（主）-变频柜及冷水泵',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCuc4a80413c90d4a47b7c2e1a39843d219',
                calculateLocalId: 'CU002022',
                name: '增3-2 427-2 3B-3F 瑞博 3ALEb（备）应急照明及疏散指示',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCudba89f573e9e4cad96589c856908a3c6',
                calculateLocalId: 'CU001123',
                name: '2AA12-3 422-3 3层3ALZ 照明插座',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCue18d514f54c74c8998380975fff3befc',
                calculateLocalId: 'CU002023',
                name: '增3-3 427-3 3B-3F 瑞博 4WAPEb（主）-消防补风排烟',
                calculateRatedPower: 100,
                disable: false
            }
        ]
    },
    {
        id: 'VOEiddde0ef28cf449199425d46cc22f0504',
        itemLocalId: 'EI5201314003',
        name: '安博瑞',
        parentLocalId: 'EI10101010202002',
        itemRatedPower: 100,
        disable: true,
        order: 23,
        children: [
            {
                id: 'VOCu3ecdb0c8300c47b7b539d748608c28f5',
                calculateLocalId: 'CU001046',
                name: '1AA13-1 421-1 2层AT动力',
                calculateRatedPower: 100,
                disable: false
            }
        ]
    },
    {
        id: 'VOEi18772d9fbb9440ca982a24c7eaf67457',
        itemLocalId: 'EI5201314004',
        name: '礼腾',
        parentLocalId: 'EI10101010202002',
        itemRatedPower: 500,
        disable: true,
        order: 24,
        children: [
            {
                id: 'VOCu09f7debaccac431d969677802508904a',
                calculateLocalId: 'CU001210',
                name: '3AA10-4 424-4 2层AP2-01照明插座',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu4e47154adeac430e9d2d9fd496e5adc0',
                calculateLocalId: 'CU002034',
                name: '新增2-4 3C-2F 礼腾 APZ-05-模块机组',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu9e3de790e37d4293a074c6209833908a',
                calculateLocalId: 'CU001158',
                name: '3AA4-4 411-4 2层APZ-02 空调1',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCua7f6fa410cbe4d1d993a9d1d67f62ef3',
                calculateLocalId: 'CU001185',
                name: '3AA13-1 421-1 2层APZ-03 空调2',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCuf1114230d79a49ffb4cd53bfd7cf93b2',
                calculateLocalId: 'CU002031',
                name: '新增2-1 3C-2F 礼腾 APZ-04-工艺',
                calculateRatedPower: 100,
                disable: false
            }
        ]
    },
    {
        id: 'VOEie923a6d91e0e4aceb91ccbbe0e09d6c3',
        itemLocalId: 'EI5201314005',
        name: '国润九和',
        parentLocalId: 'EI10101010202002',
        itemRatedPower: 200,
        disable: true,
        order: 25,
        children: [
            {
                id: 'VOCu85709cd6b79b4df0804d9759ce89391f',
                calculateLocalId: 'CU001162',
                name: '3AA5-4 412-4 1层王琦',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCue9c101deab8843139139feb430cf7fdc',
                calculateLocalId: 'CU001163',
                name: '3AA5-5 412-5 楼顶王琦',
                calculateRatedPower: 100,
                disable: false
            }
        ]
    },
    {
        id: 'VOEi85ab0c9bba244f2795fa6b06ef963158',
        itemLocalId: 'EI5201314006',
        name: '备用支路',
        parentLocalId: 'EI12007',
        itemRatedPower: 4000,
        disable: false,
        order: 26,
        children: [
            {
                id: 'VOCu02345939c301482ea898f7adccaee110',
                calculateLocalId: 'CU001051',
                name: '1AA12-2 422-2 备用',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu0360634011284465a48d3d18b940fe57',
                calculateLocalId: 'CU001198',
                name: '3AA12-5 422-5 备用',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu041e8079c2274270af6471e9e35ac194',
                calculateLocalId: 'CU002032',
                name: '新增2-2 备用',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu04d086e0b09e44d583d62a7a9d65f842',
                calculateLocalId: 'CU001189',
                name: '3AA12-1 422-1 备用',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu0847dc418e434e708ee7149ccff1a576',
                calculateLocalId: 'CU001164',
                name: '3AA5-6 412-3 备用',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu0a2b391698d844a19593c0f78356217c',
                calculateLocalId: 'CU001171',
                name: '3AA6-6 413-6 备用',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu136ff4701328428bbcbb24776af910ac',
                calculateLocalId: 'CU001176',
                name: '3AA7-5 414-5 备用',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu1cb3cd835a2f400b8a61d57f043ba96f',
                calculateLocalId: 'CU001090',
                name: '2AA4-4 411-4 备用',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu1e64f1c70dd64ca194da69a2b6a315a4',
                calculateLocalId: 'CU001049',
                name: '1AA13-4 421-4 备用',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu2514ddca77c64019a61d3031e7503637',
                calculateLocalId: 'CU001109',
                name: '2AA7-6 414-6 备用',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu28349233dacc46e18d860b039b35fad3',
                calculateLocalId: 'CU001201',
                name: '3AA11-1 423-1 备用',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu29d4f57b2fba47d784c7c74e9e57a8fa',
                calculateLocalId: 'CU001017',
                name: '1AA4-2 411-2 备用',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu2af5d2b1b91e456a86897691269aa486',
                calculateLocalId: 'CU001117',
                name: '2AA13-1 421-1 备用',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu3b559751a7524c0f8b823bc0da880cb2',
                calculateLocalId: 'CU001206',
                name: '3AA11-6 423-6 备用',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu3b872a86106141c7982401791b9233c1',
                calculateLocalId: 'CU002030',
                name: '新增1-4 备用',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu3ef53f4af0ab481fabe796411f814688',
                calculateLocalId: 'CU001066',
                name: '1AA10-4 424-4 备用',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu3f87f522e38f40f8a6019522c2675a56',
                calculateLocalId: 'CU001207',
                name: '3AA10-1 424-1 备用',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu4167bf2d583743cdaa6b0936938b1ed8',
                calculateLocalId: 'CU001128',
                name: '2AA11-1 423-1 备用',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu47366d4e29894c788a04ebe1ebb12846',
                calculateLocalId: 'CU001052',
                name: '1AA12-3 422-3 备用',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu5ed49bbfac9e427cb4d0f69841924843',
                calculateLocalId: 'CU001060',
                name: '1AA11-4 423-4 备用',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu776dae85b11c4ebf954d5d3560ede436',
                calculateLocalId: 'CU001020',
                name: '1AA5-1 412-1 备用',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu7e08d1e9119b4bb2b568edcc830f5801',
                calculateLocalId: 'CU001065',
                name: '1AA10-3 424-3 备用',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu8dad87aa980843508bdc528bb1e42cc0',
                calculateLocalId: 'CU001190',
                name: '3AA12-2 422-2 备用',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu9f23d5ee11e84da794b670ee52a7da20',
                calculateLocalId: 'CU001165',
                name: '3AA5-7 412-7 备用',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCua70b6bf8083f44d484900833f4779384',
                calculateLocalId: 'CU001061',
                name: '1AA11-5 423-5 备用',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCuab69a02d6fd446f8b5a6d13677a11414',
                calculateLocalId: 'CU001037',
                name: '1AA7-5 414-5 备用',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCuacea98f69fed43e88311057aaf7c8e0f',
                calculateLocalId: 'CU002028',
                name: '新增1-2 备用',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCub2bf29a26093449a806ee6a1d4a9177c',
                calculateLocalId: 'CU001175',
                name: '3AA7-4 414-4 备用',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCub5671aaa7e4a4431a2f4972d15d6d09e',
                calculateLocalId: 'CU001121',
                name: '2AA12-1 422-1 备用',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCub72681e6a2be4293a44bca429b4dc5e5',
                calculateLocalId: 'CU001172',
                name: '3AA7-1 414-1 备用',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCubde9ad90bc8e4fc18891a7f6b6650103',
                calculateLocalId: 'CU001208',
                name: '3AA10-2 424-2 备用',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCuc283cee9e50642cb97ff2d83f947f8df',
                calculateLocalId: 'CU001192',
                name: '3AA12-4 422-4 备用',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCuc28f4ddf78e049c4b14c6133de1d0972',
                calculateLocalId: 'CU002033',
                name: '新增2-3 备用',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCucddace4ff3c14e7283710f856725e2d7',
                calculateLocalId: 'CU001034',
                name: '1AA7-2 414-2 备用',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCuce2241ccf02343739b810b5d22a0fbad',
                calculateLocalId: 'CU001056',
                name: '1AA12-7 422-7 备用',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCud479cdfbb4944f25b59b0ff5415c8cba',
                calculateLocalId: 'CU001191',
                name: '3AA12-3 422-3 备用',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCue34687abada149a6b2ff8bc974b0bdd3',
                calculateLocalId: 'CU002027',
                name: '新增1-1 备用',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCue98cca3a2805472aa55cc415f85c197b',
                calculateLocalId: 'CU001047',
                name: '1AA13-2 421-2 备用',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCuf015706ee5d14deb815f66876a73120a',
                calculateLocalId: 'CU001097',
                name: '2AA5-7 412-7 备用',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCufb1e98c0035e42249ab8602b54e09443',
                calculateLocalId: 'CU002029',
                name: '新增1-3 备用',
                calculateRatedPower: 100,
                disable: false
            }
        ]
    },
    {
        id: 'VOEi95c64532bf69467aab52fbf6d0cffb5f',
        itemLocalId: 'EI5201314007',
        name: '其他设备',
        parentLocalId: 'EI12007',
        itemRatedPower: 400,
        disable: false,
        order: 27,
        children: [
            {
                id: 'VOCu0825555180b74b409d4c201066538cab',
                calculateLocalId: 'CU001126',
                name: '2AA12-6 422-6 1层1AP-AF（主） 安防',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCu4c3042e8fac445ba9f9eb2597767c0b9',
                calculateLocalId: 'CU001026',
                name: '1AA5-7 412-7 南三临时电（备用）',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCuab26c3ccb5e540629318d5016b7788f8',
                calculateLocalId: 'CU001048',
                name: '1AA13-3 421-3 内用',
                calculateRatedPower: 100,
                disable: false
            },
            {
                id: 'VOCuedb78a6154f94643a353cdec5d381303',
                calculateLocalId: 'CU001092',
                name: '2AA5-2 412-2 1层1AP-AF（备） 安防',
                calculateRatedPower: 100,
                disable: false
            }
        ]
    }
];

export default {
    name: 'CustomTreeSelectEnergyView',
    data() {
        return {
            value1: ['222'],
            // value1: [],
            data1: JSON.parse(JSON.stringify(data)),
            // value2: ['122', '2'],
            value2: [],
            data2: JSON.parse(JSON.stringify(data)),
            valueTTT: [],
            dataTTT,
            show: false,
            show2: false,
            // 开启更多按钮
            moreBtn: {
                open: true,
                // weight: true, // 权重
                disabled: false,
                // text: '上一步',
                text: '添加至分组',
                event: 'addGroup'
            },
            // 开启更多按钮
            moreBtn2: {
                open: true,
                weight: true, // 权重
                disabled: false,
                text: '上一步2',
                // text: '下一步',
                event: 'prevStep'
            }
        };
    },
    methods: {
        showClick() {
            console.log(123);
            this.show = true;
        },
        showClick2() {
            console.log(123);
            this.show2 = true;
        },
        change({ item, checkedIds, checkedData }) {
            console.log(item, checkedIds, checkedData);
        },
        addGroup({ item, checkedIds, checkedData }) {
            console.log(item, checkedIds, checkedData);
        },
        prevStep() {
            console.log('上一步');
        }
    }
};
</script>

<style lang="stylus">
.customTreeSelectEnergyView
    padding 40px

</style>
