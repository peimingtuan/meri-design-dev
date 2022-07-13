<template>
    <div class="viewTableView">
        <ViewTable
                :tableHeader="header1"
                :data="data1"
                width="2400"
                :height="height"
        />
    </div>
</template>

<script>

const header = [
    {
        key: 'name',
        text: '项目名称',
        fixed: true
    },
    {
        key: 'date',
        text: '日期',
        fixed: true
    },
    {
        key: 'strategyStatus',
        text: '策略状态',
        fixed: true
    },
    {
        key: 'strategyTime',
        text: '策略推送时间'
    },
    {
        key: 'executeTime',
        text: '应执行时间'
    },
    {
        key: 'dataStatus',
        text: '数据状态'
    },
    {
        key: 'viscosityTemperature',
        text: '室内最高温度(℃)'
    },
    {
        key: 'outdoorTemperature',
        text: '室外温度(℃)'
    },
    {
        key: 'beforeHourOutdoorTemperature',
        text: '过去一小时室外平均温度(℃)',
        width: 90
    },
    {
        key: 'futureHourOutdoorTemperature',
        text: '未来两小时室外平均温度(℃)',
        width: 90
    },
    {
        key: 'frozenWaterMainTemperature',
        text: '冷冻水总管供水温度(℃)',
        width: 90
    },
    {
        key: 'frozenWaterMainTemperatureDifference',
        text: '冷冻水总管供回水温差(℃)',
        width: 90
    },
    {
        key: 'comparison',
        text: '对比',
        align: 'center'
    },
    {
        key: 'waterChillingUnit',
        text: '冷水机组',
        children: [
            {
                key: 'openTheNumbers',
                text: '开启台数',
                width: 80
            },
            {
                key: 'supplyWaterTemperature',
                text: '供水温度',
                width: 80
            }
        ]
    },
    {
        key: 'chilledWaterPump',
        text: '冷冻水泵',
        children: [
            {
                key: 'openTheNumbers',
                text: '开启台数',
                width: 80
            },
            {
                key: 'frequency',
                text: '频率',
                width: 80
            }
        ]
    },
    {
        key: 'coolingWaterPump',
        text: '冷却水泵',
        children: [
            {
                key: 'openTheNumbers',
                text: '开启台数',
                width: 80
            },
            {
                key: 'frequency',
                text: '频率',
                width: 80
            }
        ]
    },
    {
        key: 'coolingTower',
        text: '冷却塔',
        children: [
            {
                key: 'openTheNumbers',
                text: '开启台数',
                width: 80
            },
            {
                key: 'frequency',
                text: '频率',
                width: 80
            }
        ]
    }
];
const data = [
    {
        id: '001',
        name: { text: '青阳万达广场' },
        date: { text: '2020.08.12' },
        strategyStatus: { text: '已执行' },
        strategyTime: { text: '08:12' },
        executeTime: { text: '08:12' },
        dataStatus: { text: '正常' },
        viscosityTemperature: { text: '26.1' },
        outdoorTemperature: { text: '28.3', color: 'red' },
        beforeHourOutdoorTemperature: { text: '28.4' },
        futureHourOutdoorTemperature: { text: '28.5' },
        frozenWaterMainTemperature: { text: '28.6' },
        frozenWaterMainTemperatureDifference: { text: '28.7' },
        // comparison: {
        //     proposal: '建议',
        //     reality: '实际'
        // },
        comparison: ['建议', '实际'],
        waterChillingUnit: [
            {
                id: 'c001',
                openTheNumbers: ['1大0小', '1大0小2'],
                width: 80
            },
            {
                id: 'c002',
                supplyWaterTemperature: ['28.7', '28.8'],
                width: 80
            }
        ],
        chilledWaterPump: [
            {
                id: 'c001',
                openTheNumbers: ['1大0小', '1大0小2'],
                width: 80
            },
            {
                id: 'c002',
                frequency: ['28.7', '28.8'],
                width: 80
            }
        ],
        coolingWaterPump: [
            {
                id: 'c001',
                openTheNumbers: ['1大0小', '1大0小2'],
                width: 80
            },
            {
                id: 'c002',
                frequency: ['28.7', '28.8'],
                width: 80
            }
        ],
        coolingTower: [
            {
                id: 'c001',
                openTheNumbers: ['1大0小', '1大0小2'],
                width: 80
            },
            {
                id: 'c002',
                frequency: ['28.7', '28.8'],
                width: 80
            }
        ]
    },
    {
        id: '002',
        name: { text: '青阳万达广场' },
        date: { text: '2020.08.12' },
        strategyStatus: { text: '已执行' },
        strategyTime: { text: '08:12' },
        executeTime: { text: '08:12' },
        dataStatus: { text: '正常' },
        viscosityTemperature: { text: '26.1' },
        outdoorTemperature: { text: '28.3' },
        beforeHourOutdoorTemperature: { text: '28.4' },
        futureHourOutdoorTemperature: { text: '28.5' },
        frozenWaterMainTemperature: { text: '28.6' },
        frozenWaterMainTemperatureDifference: { text: '28.7' },
        // comparison: {
        //     proposal: '建议',
        //     reality: '实际'
        // },
        comparison: ['建议', '实际'],
        waterChillingUnit: [
            {
                id: '2c001',
                openTheNumbers: ['1大0小', '1大0小2'],
                width: 80
            },
            {
                id: '2c002',
                supplyWaterTemperature: ['28.7', '28.8'],
                width: 80
            }
        ],
        chilledWaterPump: [
            {
                id: '2c001',
                openTheNumbers: ['1大0小', '1大0小2'],
                width: 80
            },
            {
                id: '2c002',
                frequency: ['28.7', '28.8'],
                width: 80
            }
        ],
        coolingWaterPump: [
            {
                id: '2c001',
                openTheNumbers: ['1大0小', '1大0小2'],
                width: 80
            },
            {
                id: '2c002',
                frequency: ['28.7', '28.8'],
                width: 80
            }
        ],
        coolingTower: [
            {
                id: '2c001',
                openTheNumbers: ['1大0小', '1大0小2'],
                width: 80
            },
            {
                id: '2c002',
                frequency: ['28.7', '28.8'],
                width: 80
            }
        ]
    },
    {
        id: '003',
        name: { text: '青阳万达广场' },
        date: { text: '2020.08.12' },
        strategyStatus: { text: '已执行' },
        strategyTime: { text: '08:12' },
        executeTime: { text: '08:12' },
        dataStatus: { text: '正常' },
        viscosityTemperature: { text: '26.1' },
        outdoorTemperature: { text: '28.3' },
        beforeHourOutdoorTemperature: { text: '28.4' },
        futureHourOutdoorTemperature: { text: '28.5' },
        frozenWaterMainTemperature: { text: '28.6' },
        frozenWaterMainTemperatureDifference: { text: '28.7' },
        // comparison: {
        //     proposal: '建议',
        //     reality: '实际'
        // },
        comparison: ['建议', '实际'],
        waterChillingUnit: [
            {
                id: '3c001',
                openTheNumbers: ['1大0小', '1大0小2'],
                width: 80
            },
            {
                id: '3c002',
                supplyWaterTemperature: ['28.7', '28.8'],
                width: 80
            }
        ],
        chilledWaterPump: [
            {
                id: '3c001',
                openTheNumbers: ['1大0小', '1大0小2'],
                width: 80
            },
            {
                id: '3c002',
                frequency: ['28.7', '28.8'],
                width: 80
            }
        ],
        coolingWaterPump: [
            {
                id: '3c001',
                openTheNumbers: ['1大0小', '1大0小2'],
                width: 80
            },
            {
                id: '3c002',
                frequency: ['28.7', '28.8'],
                width: 80
            }
        ],
        coolingTower: [
            {
                id: '3c001',
                openTheNumbers: ['1大0小', '1大0小2'],
                width: 80
            },
            {
                id: '3c002',
                frequency: ['28.7', '28.8'],
                width: 80
            }
        ]
    },
    {
        id: '004',
        name: { text: '青阳万达广场' },
        date: { text: '2020.08.12' },
        strategyStatus: { text: '已执行' },
        strategyTime: { text: '08:12' },
        executeTime: { text: '08:12' },
        dataStatus: { text: '正常' },
        viscosityTemperature: { text: '26.1' },
        outdoorTemperature: { text: '28.3' },
        beforeHourOutdoorTemperature: { text: '28.4' },
        futureHourOutdoorTemperature: { text: '28.5' },
        frozenWaterMainTemperature: { text: '28.6' },
        frozenWaterMainTemperatureDifference: { text: '28.7' },
        // comparison: {
        //     proposal: '建议',
        //     reality: '实际'
        // },
        comparison: ['建议', '实际'],
        waterChillingUnit: [
            {
                id: '4c001',
                openTheNumbers: ['1大0小', '1大0小2'],
                width: 80
            },
            {
                id: '4c002',
                supplyWaterTemperature: ['28.7', '28.8'],
                width: 80
            }
        ],
        chilledWaterPump: [
            {
                id: '4c001',
                openTheNumbers: ['1大0小', '1大0小2'],
                width: 80
            },
            {
                id: '4c002',
                frequency: ['28.7', '28.8'],
                width: 80
            }
        ],
        coolingWaterPump: [
            {
                id: '4c001',
                openTheNumbers: ['1大0小', '1大0小2'],
                width: 80
            },
            {
                id: '4c002',
                frequency: ['28.7', '28.8'],
                width: 80
            }
        ],
        coolingTower: [
            {
                id: '4c001',
                openTheNumbers: ['1大0小', '1大0小2'],
                width: 80
            },
            {
                id: '4c002',
                frequency: ['28.7', '28.8'],
                width: 80
            }
        ]
    },
    {
        id: '005',
        name: { text: '青阳万达广场' },
        date: { text: '2020.08.12' },
        strategyStatus: { text: '已执行' },
        strategyTime: { text: '08:12' },
        executeTime: { text: '08:12' },
        dataStatus: { text: '正常' },
        viscosityTemperature: { text: '26.1' },
        outdoorTemperature: { text: '28.3' },
        beforeHourOutdoorTemperature: { text: '28.4' },
        futureHourOutdoorTemperature: { text: '28.5' },
        frozenWaterMainTemperature: { text: '28.6' },
        frozenWaterMainTemperatureDifference: { text: '28.7' },
        // comparison: {
        //     proposal: '建议',
        //     reality: '实际'
        // },
        comparison: ['建议', '实际'],
        waterChillingUnit: [
            {
                id: '5c001',
                openTheNumbers: ['1大0小', '1大0小2'],
                width: 80
            },
            {
                id: '5c002',
                supplyWaterTemperature: ['28.7', '28.8'],
                width: 80
            }
        ],
        chilledWaterPump: [
            {
                id: '5c001',
                openTheNumbers: ['1大0小', '1大0小2'],
                width: 80
            },
            {
                id: '5c002',
                frequency: ['28.7', '28.8'],
                width: 80
            }
        ],
        coolingWaterPump: [
            {
                id: '5c001',
                openTheNumbers: ['1大0小', '1大0小2'],
                width: 80
            },
            {
                id: '5c002',
                frequency: ['28.7', '28.8'],
                width: 80
            }
        ],
        coolingTower: [
            {
                id: '5c001',
                openTheNumbers: ['1大0小', '1大0小2'],
                width: 80
            },
            {
                id: '5c002',
                frequency: ['28.7', '28.8'],
                width: 80
            }
        ]
    }
];

export default {
    name: 'ViewTableView',
    data() {
        return {
            header1: [], // 表头
            data1: [],
            height: 200
        };
    },
    mounted() {
        this.header1 = header;
        setTimeout(() => {
            this.data1 = data;
        }, 0);
        setTimeout(() => {
            this.height = 300;
        }, 3000);
    }
};
</script>

<style lang="stylus">
.viewTableView
    padding 20px

</style>
