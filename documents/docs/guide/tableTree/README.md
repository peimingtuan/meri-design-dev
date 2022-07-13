### TableTree 树形表格

::: tip
第二版Table树形结构<br>
:::

#### 1.width + border + setting + fixed
<template>
    <TableTree
        width="1200"
        :maxHeight="height"
        :border="true"
        :setting="true"
        :header="header1"
        :data="data1"
        :statistics="statistics"
        :rowTools="rowTools"
        @sortHandle="sortHandle"
        @select="selectHandle"
        @screenHandle="screenHandle"
        @rowClick="rowClick"
        key="tableTree1"
    />
</template>

::: details 查看示例
```vue
<TableTree
        width="1000"
        :maxHeight="height"
        :border="true"
        :setting="true"
        :header="header1"
        :data="data1"
        :statistics="statistics"
        :rowTools="rowTools"
        @sortHandle="sortHandle"
        @select="selectHandle"
        @screenHandle="screenHandle"
        @rowClick="rowClick"
        key="tableTree1"
    />

const header = [
  {
      key: 'name',
      text: '项目名称',
      fixed: 'left',
      width: 300,
      resizable: true
  },
  {
      key: 'date',
      text: '日期',
      width: 160
  },
  {
      key: 'strategyStatus',
      text: '策略状态',
      align: 'right',
      tip: {
          open: true,
          text: '策略状态包括已执行、未执行、审核中、已审批'
      },
      resizable: true,
      minWidth: 100,
      screen: {
          open: true,
          status: 'multiple',
          data: [
              {
                  id: 'executed',
                  name: '已执行',
                  checked: 'checked'
              },
              {
                  id: 'non-execution',
                  name: '未执行',
                  checked: 'checked'
              },
              {
                  id: 'audit',
                  name: '审核中'
              },
              {
                  id: 'has-approval',
                  name: '已审批'
              }
          ],
          event: 'screenHandle'
      },
      width: 240
  },
  {
      key: 'strategyTime',
      text: '策略推送时间',
      screen: {
          open: true,
          status: 'multiple',
          data: [
              {
                  id: 'all',
                  name: '全部'
              },
              {
                  id: '06:30',
                  name: '06:30'
              },
              {
                  id: '06:31',
                  name: '06:31'
              },
              {
                  id: '06:32',
                  name: '06:32'
              },
              {
                  id: '06:33',
                  name: '06:33'
              }
          ],
          event: 'screenHandle'
      }
  },
  {
      key: 'executeTime',
      text: '应执行时间',
      checked: 'uncheck'
  },
  {
      key: 'dataStatus',
      text: '数据状态',
      tip: {
          open: true,
          text: '1.室外平均温度=逐日营业时段室外平均温度均'
      }
  },
  {
      key: 'viscosityTemperature',
      text: '室内最高温度(℃)',
      tip: {
          open: true,
          text: '2.室外平均温度=逐日营业时段室外平均温度均'
      }
  },
  {
      key: 'outdoorTemperature',
      text: '室外温度(℃)',
      tip: {
          open: true,
          text: '3.室外平均温度=逐日营业时段室外平均温度'
      },
      align: 'right',
      sort: {
          open: true,
          status: 'ord',
          type: 'number',
          event: 'sortHandle',
          closeDefault: true
      }
  }
];

const data = [
      {
          id: '000',
          name: { text: '青阳万达广场0青阳万达广场0青阳万达广场0青阳万达广场0青阳万达广场0' },
          date: { text: '2020.08.10' },
          strategyStatus: {
              text: '已执行',
              dot: '#4eb1fd'
          },
          strategyTime: {
              text: '06:30',
              arrow: { dir: 'down' }
          },
          executeTime: { text: '01:10' },
          dataStatus: {
              text: '异常',
              color: '#f00',
              link: true
          },
          viscosityTemperature: { text: 20 },
          outdoorTemperature: { text: 30 },
          link: true,
          selected: true,
          tools: {
              data: [
                  { id: 'tjbm', name: '添加部门', disabled: true },
                  { id: 'tjgw', name: '添加岗位', disabled: true },
                  { id: 'bj', name: '编辑' },
                  { id: 'sc', name: '删除' }
              ],
              moreOpen: true,
              moreId: '',
              more: [
                  { id: 'm1', name: 'more1', disabled: true },
                  { id: 'm2', name: 'more2' },
                  { id: 'm3', name: 'more3' }
              ]
          },
          children: [
              {
                  id: '000-1',
                  name: { text: '青阳万达广场0-1' },
                  date: { text: '2020.08.10' },
                  strategyStatus: {
                      text: '已执行',
                      dot: '#4eb1fd'
                  },
                  strategyTime: { text: '06:30' },
                  executeTime: { text: '01:10' },
                  dataStatus: {
                      text: '异常',
                      color: '#f00'
                  },
                  viscosityTemperature: { text: 20 },
                  outdoorTemperature: { text: 30 },
                  tools: {
                      data: [
                          { id: 'tjbm', name: '添加部门' },
                          { id: 'tjgw', name: '添加岗位' },
                          { id: 'bj', name: '编辑' },
                          { id: 'sc', name: '删除' }
                      ]
                  },
                  children: [
                      {
                          id: '0001-1',
                          name: { text: '青阳万达广场01-1' },
                          date: { text: '2020.08.11' },
                          strategyStatus: {
                              text: '未执行',
                              dot: '#f76b64'
                          },
                          strategyTime: { text: '06:31' },
                          executeTime: { text: '01:11' },
                          dataStatus: { text: '正常1' },
                          viscosityTemperature: { text: 21 },
                          outdoorTemperature: { text: 31 },
                          tools: {
                              data: [
                                  { id: 'tjbm', name: '添加部门' },
                                  { id: 'tjgw', name: '添加岗位' },
                                  { id: 'bj', name: '编辑' },
                                  { id: 'sc', name: '删除' }
                              ]
                          }
                      }
                  ]
              },
              {
                  id: '001-2',
                  name: { text: '青阳万达广场1-1' },
                  date: { text: '2020.08.11' },
                  strategyStatus: {
                      text: '未执行',
                      dot: '#f76b64'
                  },
                  strategyTime: { text: '06:31' },
                  executeTime: { text: '01:11' },
                  dataStatus: { text: '正常1' },
                  viscosityTemperature: { text: 21 },
                  outdoorTemperature: { text: 31 },
                  tools: {
                      data: [
                          { id: 'tjbm', name: '添加部门' },
                          { id: 'tjgw', name: '添加岗位' },
                          { id: 'bj', name: '编辑' },
                          { id: 'sc', name: '删除' }
                      ]
                  }
              },
              {
                  id: '002-3',
                  name: { text: '青阳万达广场2-1' },
                  date: { text: '2020.08.12' },
                  strategyStatus: {
                      text: '审核中',
                      dot: '#14e1c6'
                  },
                  strategyTime: { text: '06:32' },
                  executeTime: { text: '01:12' },
                  dataStatus: { text: '正常2' },
                  viscosityTemperature: { text: 22 },
                  outdoorTemperature: { text: 32 },
                  tools: {
                      data: [
                          { id: 'tjbm', name: '添加部门' },
                          { id: 'tjgw', name: '添加岗位' },
                          { id: 'bj', name: '编辑' },
                          { id: 'sc', name: '删除' }
                      ]
                  }
              },
              {
                  id: '003-4',
                  name: { text: '青阳万达广场3-1' },
                  date: { text: '2020.08.13' },
                  strategyStatus: {
                      text: '已审批',
                      dot: '#62d256'
                  },
                  strategyTime: { text: '06:33' },
                  executeTime: { text: '01:13' },
                  dataStatus: { text: '正常3' },
                  viscosityTemperature: { text: 23 },
                  outdoorTemperature: { text: 33 },
                  tools: {
                      data: [
                          { id: 'tjbm', name: '添加部门' },
                          { id: 'tjgw', name: '添加岗位' },
                          { id: 'bj', name: '编辑' },
                          { id: 'sc', name: '删除' }
                      ]
                  }
              },
              {
                  id: '004-5',
                  name: { text: '青阳万达广场4-1' },
                  date: { text: '2020.08.14' },
                  strategyStatus: {
                      text: '已执行',
                      dot: '#4eb1fd'
                  },
                  strategyTime: { text: '06:34' },
                  executeTime: { text: '01:14' },
                  dataStatus: { text: '正常4' },
                  viscosityTemperature: { text: 24 },
                  outdoorTemperature: { text: 34 },
                  tools: {
                      data: [
                          { id: 'tjbm', name: '添加部门' },
                          { id: 'tjgw', name: '添加岗位' },
                          { id: 'bj', name: '编辑' },
                          { id: 'sc', name: '删除' }
                      ]
                  }
              }
          ]
      },
      {
          id: '001',
          name: { text: '青阳万达广场1' },
          date: { text: '2020.08.11' },
          strategyStatus: {
              text: '未执行',
              dot: '#f76b64'
          },
          strategyTime: {
              text: '06:31',
              arrow: { dir: 'up' }
          },
          executeTime: { text: '01:11' },
          dataStatus: { text: '正常1' },
          viscosityTemperature: { text: 21 },
          outdoorTemperature: { text: 31 },
          tools: {
              data: [
                  { id: 'tjbm', name: '添加部门' },
                  { id: 'tjgw', name: '添加岗位' },
                  { id: 'bj', name: '编辑' },
                  { id: 'sc', name: '删除' }
              ]
          }
      },
      {
          id: '002',
          name: { text: '青阳万达广场2' },
          date: { text: '2020.08.12' },
          strategyStatus: {
              text: '审核中',
              dot: '#14e1c6'
          },
          strategyTime: { text: '06:32' },
          executeTime: { text: '01:12' },
          dataStatus: { text: '正常2' },
          viscosityTemperature: { text: 22 },
          outdoorTemperature: { text: 32 },
          tools: {
              data: [
                  { id: 'tjbm', name: '添加部门' },
                  { id: 'tjgw', name: '添加岗位' },
                  { id: 'bj', name: '编辑' },
                  { id: 'sc', name: '删除' }
              ]
          },
          children: [
              {
                  id: '002-1',
                  name: { text: '青阳万达广场2-1' },
                  date: { text: '2020.08.12' },
                  strategyStatus: {
                      text: '审核中',
                      dot: '#14e1c6'
                  },
                  strategyTime: { text: '06:32' },
                  executeTime: { text: '01:12' },
                  dataStatus: { text: '正常2' },
                  viscosityTemperature: { text: 22 },
                  outdoorTemperature: { text: 32 },
                  tools: {
                      data: [
                          { id: 'tjbm', name: '添加部门' },
                          { id: 'tjgw', name: '添加岗位' },
                          { id: 'bj', name: '编辑' },
                          { id: 'sc', name: '删除' }
                      ]
                  }
              },
              {
                  id: '002-2',
                  name: { text: '青阳万达广场2-2' },
                  date: { text: '2020.08.12' },
                  strategyStatus: {
                      text: '审核中',
                      dot: '#14e1c6'
                  },
                  strategyTime: { text: '06:32' },
                  executeTime: { text: '01:12' },
                  dataStatus: { text: '正常2' },
                  viscosityTemperature: { text: 22 },
                  outdoorTemperature: { text: 32 },
                  tools: {
                      data: [
                          { id: 'tjbm', name: '添加部门' },
                          { id: 'tjgw', name: '添加岗位' },
                          { id: 'bj', name: '编辑' },
                          { id: 'sc', name: '删除' }
                      ]
                  }
              }
          ]
      },
      {
          id: '003',
          name: { text: '青阳万达广场3' },
          date: { text: '2020.08.13' },
          strategyStatus: {
              text: '已审批',
              dot: '#62d256'
          },
          strategyTime: { text: '06:33' },
          executeTime: { text: '01:13' },
          dataStatus: { text: '正常3' },
          viscosityTemperature: { text: 23 },
          outdoorTemperature: { text: 33 },
          tools: {
              data: [
                  { id: 'tjbm', name: '添加部门' },
                  { id: 'tjgw', name: '添加岗位' },
                  { id: 'bj', name: '编辑' },
                  { id: 'sc', name: '删除' }
              ]
          }
      },
      {
          id: '004',
          name: { text: '青阳万达广场4' },
          date: { text: '2020.08.14' },
          strategyStatus: {
              text: '已执行',
              dot: '#4eb1fd'
          },
          strategyTime: { text: '06:34' },
          executeTime: { text: '01:14' },
          dataStatus: { text: '正常4' },
          viscosityTemperature: { text: 24 },
          outdoorTemperature: { text: 34 },
          tools: {
              data: [
                  { id: 'tjbm', name: '添加部门' },
                  { id: 'tjgw', name: '添加岗位' },
                  { id: 'bj', name: '编辑' },
                  { id: 'sc', name: '删除' }
              ]
          }
      }
     ];
const dataSelect = [
    { id: 'test1', name: '选择项' },
    { id: 'test2', name: '单平米' },
    { id: 'test3', name: '下级分项' },
    { id: 'test4', name: '滑动平均滑动平均' }
];
const rowTools = {
    open: true, // 开启显示操作
    fixed: 'right', // 与header数据的fixed一样
    width: 380, // 与header数据的width一样
    align: '', // 与header数据的align一样
    text: '', // 头部显示的文字，默认是操作
    moreOpen: true,
    event: 'rowToolHandle'
};
const statistics = {
    open: true,
    id: 'statistics-id',
    name: { text: '50' },
    date: { text: '2020.08.11' },
    strategyStatus: { text: '未执行', dot: '#f76b64' },
    strategyTime: { text: '06:31' },
    executeTime: { text: '01:11' },
    dataStatus: { text: '正常1' },
    viscosityTemperature: { text: 21 },
    outdoorTemperature: { text: 31 }
};
```
:::

#### 业务场景下的数据
<template>
<TableTree
        width="1000"
        maxHeight="400"
        :header="header4"
        :data="data4"
        key="tableTree4"
/>
</template>

::: details 查看示例
```vue
<TableTree
        width="1000"
        maxHeight="400"
        :header="header4"
        :data="data4"
        key="tableTree4"
/>

const header4 = [
    {
        text: '管理分区',
        key: 'managementRegionName',
        width: 300,
        fixed: 'left'
    }, {
        text: '实际能耗 (kWh)',
        key: 'realEnergy',
        width: 150
    }, {
        text: '单平米能耗 (kWh/m²)',
        key: 'energyPerSquare'
    }, {
        text: '管控值',
        key: 'gwData',
        width: 100
    }, {
        text: '管控值',
        key: 'gwData'
    }, {
        text: '实际能耗占管控值比',
        key: 'realEnergyGwDataRatio'
    }, {
        text: '目标值 (kWh)',
        key: 'target'
    }, {
        text: '能耗同比',
        key: 'energySameRatio'
    }, {
        text: '能耗环比',
        key: 'energyRingRatio'
    },
    {
        text: '年累计实际能耗 (kWh)',
        key: 'realEnergyYear'
    }, {
        text: '年总定额 (kWh)',
        key: 'targetYear'
    }, {
        text: '年实际能耗占年总定额比',
        key: 'realEnergyTargetYearRatio',
        align: 'right',
        fixed: 'right'
    }
];

const data4 = [
    {
        id: 'dsgdsvgsfasgsgswtgw',
        managementRegionName: { text: '东南运营中心' },
        realEnergyTargetRatio: { text: '--' },
        realEnergy: { text: '--' },
        energyPerSquare: { text: '--' },
        gwData: { text: '--' },
        realEnergyGwDataRatio: { text: '--' },
        target: { text: 3447397.05389872 },
        energySameRatio: { text: '--' },
        energyRingRatio: { text: '--' },
        realEnergyYear: { text: 7314034.966831948 },
        targetYear: { text: 26173088.85432993 },
        realEnergyTargetYearRatio: { text: 27.94486736945439 },
        children: [{
            id: 'dsgdsvgsfasgsgswtgw1',
            managementRegionName: { text: '厦门区域' },
            realEnergyTargetRatio: { text: '--' },
            realEnergy: { text: '--' },
            energyPerSquare: { text: '--' },
            gwData: { text: '--' },
            realEnergyGwDataRatio: { text: '--' },
            target: { text: 950534.2 },
            energySameRatio: { text: '--' },
            energyRingRatio: { text: '--' },
            realEnergyYear: { text: 2410892.7057124395 },
            targetYear: { text: 8098866.12620034 },
            realEnergyTargetYearRatio: { text: 29.768274572573194 }
        }, {
            id: 'dsgdsvgsfasgsgswtgw22',
            managementRegionName: { text: '宁波区域' },
            realEnergyTargetRatio: { text: '--' },
            realEnergy: { text: '--' },
            energyPerSquare: { text: '--' },
            gwData: { text: '--' },
            realEnergyGwDataRatio: { text: '--' },
            target: { text: 1783317.96029502 },
            energySameRatio: { text: '--' },
            energyRingRatio: { text: '--' },
            realEnergyYear: { text: 3466341.062147084 },
            targetYear: { text: 12811945.04586246 },
            realEnergyTargetYearRatio: { text: 27.055541135547706 }
        }, {
            id: 'dsgdsvgsfasgsgswtgw33',
            managementRegionName: { text: '杭州区域' },
            realEnergyTargetRatio: { text: '--' },
            realEnergy: { text: '--' },
            energyPerSquare: { text: '--' },
            gwData: { text: '--' },
            realEnergyGwDataRatio: { text: '--' },
            target: { text: 713544.8936037 },
            energySameRatio: { text: '--' },
            energyRingRatio: { text: '--' },
            realEnergyYear: { text: 1436801.1989724236 },
            targetYear: { text: 5262277.68226713 },
            realEnergyTargetYearRatio: { text: 27.30378907624295 }
        }]
    }, {
        id: 'df4gdf5g458df4g',
        managementRegionName: { text: '华东运营中心' },
        realEnergyTargetRatio: { text: '--' },
        realEnergy: { text: '--' },
        energyPerSquare: { text: '--' },
        gwData: { text: '--' },
        realEnergyGwDataRatio: { text: '--' },
        target: { text: 3447397.05389872 },
        energySameRatio: { text: '--' },
        energyRingRatio: { text: '--' },
        realEnergyYear: { text: 7314034.966831948 },
        targetYear: { text: 26173088.85432993 },
        realEnergyTargetYearRatio: { text: 27.94486736945439 },
        children: [{
            id: 'df4gdf5g458df4g1454df5',
            managementRegionName: { text: '上海区域' },
            realEnergyTargetRatio: { text: '--' },
            realEnergy: { text: '--' },
            energyPerSquare: { text: '--' },
            gwData: { text: '--' },
            realEnergyGwDataRatio: { text: '--' },
            target: { text: 3048541.64233005 },
            energySameRatio: { text: '--' },
            energyRingRatio: { text: '--' },
            realEnergyYear: { text: 6309564.76872908 },
            targetYear: { text: 21168279.71687967 },
            realEnergyTargetYearRatio: { text: 29.806695929560156 }
        }, {
            id: '45df4gdf4g5df45g',
            managementRegionName: { text: '南京区域' },
            realEnergyTargetRatio: { text: '--' },
            realEnergy: { text: '--' },
            energyPerSquare: { text: '--' },
            gwData: { text: '--' },
            realEnergyGwDataRatio: { text: '--' },
            target: { text: 1692574.95238982 },
            energySameRatio: { text: '--' },
            energyRingRatio: { text: '--' },
            realEnergyYear: { text: 3346657.6507607647 },
            targetYear: { text: 11669360.48980841 },
            realEnergyTargetYearRatio: { text: 28.679015046999467 }
        }, {
            id: 'ds4gds5g45ds5g',
            managementRegionName: { text: '无锡区域' },
            realEnergyTargetRatio: { text: '--' },
            realEnergy: { text: '--' },
            energyPerSquare: { text: '--' },
            gwData: { text: '--' },
            realEnergyGwDataRatio: { text: '--' },
            target: { text: 2523691.30765399 },
            energySameRatio: { text: '--' },
            energyRingRatio: { text: '--' },
            realEnergyYear: { text: 4569474.08776884 },
            targetYear: { text: 17006533.38101439 },
            realEnergyTargetYearRatio: { text: 26.86893316465112 }
        }]
    }
];
```
:::

#### 自定义渲染 —— 详见TableGrid自定义渲染

#### methods
::: details 查看示例
```vue
methods: {
    // 筛选
    screenHandle(key, id) {
        console.log('筛选::', key, id);
    },
    // 排序回调
    sortHandle(status, key) {
        console.log('status::', status, '  ', 'key::', key);
    },
    // 选中的数据
    selectHandle(ids, data) {
        console.log(ids, data);
    },
    // 顶部按钮回调
    topButtonHandle(id) {
        console.log('顶部按钮回调::', id);
    },
    // 每列操作回调
    rowToolHandle({ itemId, toolId }) {
        console.log('每列操作回调::', itemId, toolId);
    },

    dataSelectChange(data) {
        console.log(data);
    },
    // 点击每行
    rowClick(item) {
        console.log('点击每行::', item);
    }
}
```
:::

<script>
const header = [
   {
       key: 'name',
       text: '项目名称',
       fixed: 'left',
       width: 300,
       resizable: true
   },
   {
       key: 'date',
       text: '日期',
       width: 160
   },
   {
       key: 'strategyStatus',
       text: '策略状态',
       align: 'right',
       tip: {
           open: true,
           text: '策略状态包括已执行、未执行、审核中、已审批'
       },
       resizable: true,
       minWidth: 100,
       screen: {
           open: true,
           status: 'multiple',
           data: [
               {
                   id: 'executed',
                   name: '已执行',
                   checked: 'checked'
               },
               {
                   id: 'non-execution',
                   name: '未执行',
                   checked: 'checked'
               },
               {
                   id: 'audit',
                   name: '审核中'
               },
               {
                   id: 'has-approval',
                   name: '已审批'
               }
           ],
           event: 'screenHandle'
       },
       width: 240
   },
   {
       key: 'strategyTime',
       text: '策略推送时间',
       screen: {
           open: true,
           status: 'multiple',
           data: [
               {
                   id: 'all',
                   name: '全部'
               },
               {
                   id: '06:30',
                   name: '06:30'
               },
               {
                   id: '06:31',
                   name: '06:31'
               },
               {
                   id: '06:32',
                   name: '06:32'
               },
               {
                   id: '06:33',
                   name: '06:33'
               }
           ],
           event: 'screenHandle'
       }
   },
   {
       key: 'executeTime',
       text: '应执行时间',
       checked: 'uncheck'
   },
   {
       key: 'dataStatus',
       text: '数据状态',
       tip: {
           open: true,
           text: '1.室外平均温度=逐日营业时段室外平均温度均'
       }
   },
   {
       key: 'viscosityTemperature',
       text: '室内最高温度(℃)',
       tip: {
           open: true,
           text: '2.室外平均温度=逐日营业时段室外平均温度均'
       }
   },
   {
       key: 'outdoorTemperature',
       text: '室外温度(℃)',
       tip: {
           open: true,
           text: '3.室外平均温度=逐日营业时段室外平均温度'
       },
       align: 'right',
       sort: {
           open: true,
           status: 'ord',
           type: 'number',
           event: 'sortHandle',
           closeDefault: true
       }
   }
];
const header4 = [
    {
        text: '管理分区',
        key: 'managementRegionName',
        width: 300,
        fixed: 'left'
    }, {
        text: '实际能耗 (kWh)',
        key: 'realEnergy',
        width: 150
    }, {
        text: '单平米能耗 (kWh/m²)',
        key: 'energyPerSquare'
    }, {
        text: '管控值',
        key: 'gwData',
        width: 100
    }, {
        text: '管控值',
        key: 'gwData'
    }, {
        text: '实际能耗占管控值比',
        key: 'realEnergyGwDataRatio'
    }, {
        text: '目标值 (kWh)',
        key: 'target'
    }, {
        text: '能耗同比',
        key: 'energySameRatio'
    }, {
        text: '能耗环比',
        key: 'energyRingRatio'
    },
    {
        text: '年累计实际能耗 (kWh)',
        key: 'realEnergyYear'
    }, {
        text: '年总定额 (kWh)',
        key: 'targetYear'
    }, {
        text: '年实际能耗占年总定额比',
        key: 'realEnergyTargetYearRatio',
        align: 'right',
        fixed: 'right'
    }
];
const data = [
 {
     id: '000',
     name: { text: '青阳万达广场0青阳万达广场0青阳万达广场0青阳万达广场0青阳万达广场0' },
     date: { text: '2020.08.10' },
     strategyStatus: {
         text: '已执行',
         dot: '#4eb1fd'
     },
     strategyTime: {
         text: '06:30',
         arrow: { dir: 'down' }
     },
     executeTime: { text: '01:10' },
     dataStatus: {
         text: '异常',
         color: '#f00',
         link: true
     },
     viscosityTemperature: { text: 20 },
     outdoorTemperature: { text: 30 },
     link: true,
     selected: true,
     tools: {
         data: [
             { id: 'tjbm', name: '添加部门', disabled: true },
             { id: 'tjgw', name: '添加岗位', disabled: true },
             { id: 'bj', name: '编辑' },
             { id: 'sc', name: '删除' }
         ],
         moreOpen: true,
         moreId: '',
         more: [
             { id: 'm1', name: 'more1', disabled: true },
             { id: 'm2', name: 'more2' },
             { id: 'm3', name: 'more3' }
         ]
     },
     children: [
         {
             id: '000-1',
             name: { text: '青阳万达广场0-1' },
             date: { text: '2020.08.10' },
             strategyStatus: {
                 text: '已执行',
                 dot: '#4eb1fd'
             },
             strategyTime: { text: '06:30' },
             executeTime: { text: '01:10' },
             dataStatus: {
                 text: '异常',
                 color: '#f00'
             },
             viscosityTemperature: { text: 20 },
             outdoorTemperature: { text: 30 },
             tools: {
                 data: [
                     { id: 'tjbm', name: '添加部门' },
                     { id: 'tjgw', name: '添加岗位' },
                     { id: 'bj', name: '编辑' },
                     { id: 'sc', name: '删除' }
                 ]
             },
             children: [
                 {
                     id: '0001-1',
                     name: { text: '青阳万达广场01-1' },
                     date: { text: '2020.08.11' },
                     strategyStatus: {
                         text: '未执行',
                         dot: '#f76b64'
                     },
                     strategyTime: { text: '06:31' },
                     executeTime: { text: '01:11' },
                     dataStatus: { text: '正常1' },
                     viscosityTemperature: { text: 21 },
                     outdoorTemperature: { text: 31 },
                     tools: {
                         data: [
                             { id: 'tjbm', name: '添加部门' },
                             { id: 'tjgw', name: '添加岗位' },
                             { id: 'bj', name: '编辑' },
                             { id: 'sc', name: '删除' }
                         ]
                     }
                 }
             ]
         },
         {
             id: '001-2',
             name: { text: '青阳万达广场1-1' },
             date: { text: '2020.08.11' },
             strategyStatus: {
                 text: '未执行',
                 dot: '#f76b64'
             },
             strategyTime: { text: '06:31' },
             executeTime: { text: '01:11' },
             dataStatus: { text: '正常1' },
             viscosityTemperature: { text: 21 },
             outdoorTemperature: { text: 31 },
             tools: {
                 data: [
                     { id: 'tjbm', name: '添加部门' },
                     { id: 'tjgw', name: '添加岗位' },
                     { id: 'bj', name: '编辑' },
                     { id: 'sc', name: '删除' }
                 ]
             }
         },
         {
             id: '002-3',
             name: { text: '青阳万达广场2-1' },
             date: { text: '2020.08.12' },
             strategyStatus: {
                 text: '审核中',
                 dot: '#14e1c6'
             },
             strategyTime: { text: '06:32' },
             executeTime: { text: '01:12' },
             dataStatus: { text: '正常2' },
             viscosityTemperature: { text: 22 },
             outdoorTemperature: { text: 32 },
             tools: {
                 data: [
                     { id: 'tjbm', name: '添加部门' },
                     { id: 'tjgw', name: '添加岗位' },
                     { id: 'bj', name: '编辑' },
                     { id: 'sc', name: '删除' }
                 ]
             }
         },
         {
             id: '003-4',
             name: { text: '青阳万达广场3-1' },
             date: { text: '2020.08.13' },
             strategyStatus: {
                 text: '已审批',
                 dot: '#62d256'
             },
             strategyTime: { text: '06:33' },
             executeTime: { text: '01:13' },
             dataStatus: { text: '正常3' },
             viscosityTemperature: { text: 23 },
             outdoorTemperature: { text: 33 },
             tools: {
                 data: [
                     { id: 'tjbm', name: '添加部门' },
                     { id: 'tjgw', name: '添加岗位' },
                     { id: 'bj', name: '编辑' },
                     { id: 'sc', name: '删除' }
                 ]
             }
         },
         {
             id: '004-5',
             name: { text: '青阳万达广场4-1' },
             date: { text: '2020.08.14' },
             strategyStatus: {
                 text: '已执行',
                 dot: '#4eb1fd'
             },
             strategyTime: { text: '06:34' },
             executeTime: { text: '01:14' },
             dataStatus: { text: '正常4' },
             viscosityTemperature: { text: 24 },
             outdoorTemperature: { text: 34 },
             tools: {
                 data: [
                     { id: 'tjbm', name: '添加部门' },
                     { id: 'tjgw', name: '添加岗位' },
                     { id: 'bj', name: '编辑' },
                     { id: 'sc', name: '删除' }
                 ]
             }
         }
     ]
 },
 {
     id: '001',
     name: { text: '青阳万达广场1' },
     date: { text: '2020.08.11' },
     strategyStatus: {
         text: '未执行',
         dot: '#f76b64'
     },
     strategyTime: {
         text: '06:31',
         arrow: { dir: 'up' }
     },
     executeTime: { text: '01:11' },
     dataStatus: { text: '正常1' },
     viscosityTemperature: { text: 21 },
     outdoorTemperature: { text: 31 },
     tools: {
         data: [
             { id: 'tjbm', name: '添加部门' },
             { id: 'tjgw', name: '添加岗位' },
             { id: 'bj', name: '编辑' },
             { id: 'sc', name: '删除' }
         ]
     }
 },
 {
     id: '002',
     name: { text: '青阳万达广场2' },
     date: { text: '2020.08.12' },
     strategyStatus: {
         text: '审核中',
         dot: '#14e1c6'
     },
     strategyTime: { text: '06:32' },
     executeTime: { text: '01:12' },
     dataStatus: { text: '正常2' },
     viscosityTemperature: { text: 22 },
     outdoorTemperature: { text: 32 },
     tools: {
         data: [
             { id: 'tjbm', name: '添加部门' },
             { id: 'tjgw', name: '添加岗位' },
             { id: 'bj', name: '编辑' },
             { id: 'sc', name: '删除' }
         ]
     },
     children: [
         {
             id: '002-1',
             name: { text: '青阳万达广场2-1' },
             date: { text: '2020.08.12' },
             strategyStatus: {
                 text: '审核中',
                 dot: '#14e1c6'
             },
             strategyTime: { text: '06:32' },
             executeTime: { text: '01:12' },
             dataStatus: { text: '正常2' },
             viscosityTemperature: { text: 22 },
             outdoorTemperature: { text: 32 },
             tools: {
                 data: [
                     { id: 'tjbm', name: '添加部门' },
                     { id: 'tjgw', name: '添加岗位' },
                     { id: 'bj', name: '编辑' },
                     { id: 'sc', name: '删除' }
                 ]
             }
         },
         {
             id: '002-2',
             name: { text: '青阳万达广场2-2' },
             date: { text: '2020.08.12' },
             strategyStatus: {
                 text: '审核中',
                 dot: '#14e1c6'
             },
             strategyTime: { text: '06:32' },
             executeTime: { text: '01:12' },
             dataStatus: { text: '正常2' },
             viscosityTemperature: { text: 22 },
             outdoorTemperature: { text: 32 },
             tools: {
                 data: [
                     { id: 'tjbm', name: '添加部门' },
                     { id: 'tjgw', name: '添加岗位' },
                     { id: 'bj', name: '编辑' },
                     { id: 'sc', name: '删除' }
                 ]
             }
         }
     ]
 },
 {
     id: '003',
     name: { text: '青阳万达广场3' },
     date: { text: '2020.08.13' },
     strategyStatus: {
         text: '已审批',
         dot: '#62d256'
     },
     strategyTime: { text: '06:33' },
     executeTime: { text: '01:13' },
     dataStatus: { text: '正常3' },
     viscosityTemperature: { text: 23 },
     outdoorTemperature: { text: 33 },
     tools: {
         data: [
             { id: 'tjbm', name: '添加部门' },
             { id: 'tjgw', name: '添加岗位' },
             { id: 'bj', name: '编辑' },
             { id: 'sc', name: '删除' }
         ]
     }
 },
 {
     id: '004',
     name: { text: '青阳万达广场4' },
     date: { text: '2020.08.14' },
     strategyStatus: {
         text: '已执行',
         dot: '#4eb1fd'
     },
     strategyTime: { text: '06:34' },
     executeTime: { text: '01:14' },
     dataStatus: { text: '正常4' },
     viscosityTemperature: { text: 24 },
     outdoorTemperature: { text: 34 },
     tools: {
         data: [
             { id: 'tjbm', name: '添加部门' },
             { id: 'tjgw', name: '添加岗位' },
             { id: 'bj', name: '编辑' },
             { id: 'sc', name: '删除' }
         ]
     }
 }
];
const data4 = [
    {
        id: 'dsgdsvgsfasgsgswtgw',
        managementRegionName: { text: '东南运营中心' },
        realEnergyTargetRatio: { text: '--' },
        realEnergy: { text: '--' },
        energyPerSquare: { text: '--' },
        gwData: { text: '--' },
        realEnergyGwDataRatio: { text: '--' },
        target: { text: 3447397.05389872 },
        energySameRatio: { text: '--' },
        energyRingRatio: { text: '--' },
        realEnergyYear: { text: 7314034.966831948 },
        targetYear: { text: 26173088.85432993 },
        realEnergyTargetYearRatio: { text: 27.94486736945439 },
        children: [{
            id: 'dsgdsvgsfasgsgswtgw1',
            managementRegionName: { text: '厦门区域' },
            realEnergyTargetRatio: { text: '--' },
            realEnergy: { text: '--' },
            energyPerSquare: { text: '--' },
            gwData: { text: '--' },
            realEnergyGwDataRatio: { text: '--' },
            target: { text: 950534.2 },
            energySameRatio: { text: '--' },
            energyRingRatio: { text: '--' },
            realEnergyYear: { text: 2410892.7057124395 },
            targetYear: { text: 8098866.12620034 },
            realEnergyTargetYearRatio: { text: 29.768274572573194 }
        }, {
            id: 'dsgdsvgsfasgsgswtgw22',
            managementRegionName: { text: '宁波区域' },
            realEnergyTargetRatio: { text: '--' },
            realEnergy: { text: '--' },
            energyPerSquare: { text: '--' },
            gwData: { text: '--' },
            realEnergyGwDataRatio: { text: '--' },
            target: { text: 1783317.96029502 },
            energySameRatio: { text: '--' },
            energyRingRatio: { text: '--' },
            realEnergyYear: { text: 3466341.062147084 },
            targetYear: { text: 12811945.04586246 },
            realEnergyTargetYearRatio: { text: 27.055541135547706 }
        }, {
            id: 'dsgdsvgsfasgsgswtgw33',
            managementRegionName: { text: '杭州区域' },
            realEnergyTargetRatio: { text: '--' },
            realEnergy: { text: '--' },
            energyPerSquare: { text: '--' },
            gwData: { text: '--' },
            realEnergyGwDataRatio: { text: '--' },
            target: { text: 713544.8936037 },
            energySameRatio: { text: '--' },
            energyRingRatio: { text: '--' },
            realEnergyYear: { text: 1436801.1989724236 },
            targetYear: { text: 5262277.68226713 },
            realEnergyTargetYearRatio: { text: 27.30378907624295 }
        }]
    }, {
        id: 'df4gdf5g458df4g',
        managementRegionName: { text: '华东运营中心' },
        realEnergyTargetRatio: { text: '--' },
        realEnergy: { text: '--' },
        energyPerSquare: { text: '--' },
        gwData: { text: '--' },
        realEnergyGwDataRatio: { text: '--' },
        target: { text: 3447397.05389872 },
        energySameRatio: { text: '--' },
        energyRingRatio: { text: '--' },
        realEnergyYear: { text: 7314034.966831948 },
        targetYear: { text: 26173088.85432993 },
        realEnergyTargetYearRatio: { text: 27.94486736945439 },
        children: [{
            id: 'df4gdf5g458df4g1454df5',
            managementRegionName: { text: '上海区域' },
            realEnergyTargetRatio: { text: '--' },
            realEnergy: { text: '--' },
            energyPerSquare: { text: '--' },
            gwData: { text: '--' },
            realEnergyGwDataRatio: { text: '--' },
            target: { text: 3048541.64233005 },
            energySameRatio: { text: '--' },
            energyRingRatio: { text: '--' },
            realEnergyYear: { text: 6309564.76872908 },
            targetYear: { text: 21168279.71687967 },
            realEnergyTargetYearRatio: { text: 29.806695929560156 }
        }, {
            id: '45df4gdf4g5df45g',
            managementRegionName: { text: '南京区域' },
            realEnergyTargetRatio: { text: '--' },
            realEnergy: { text: '--' },
            energyPerSquare: { text: '--' },
            gwData: { text: '--' },
            realEnergyGwDataRatio: { text: '--' },
            target: { text: 1692574.95238982 },
            energySameRatio: { text: '--' },
            energyRingRatio: { text: '--' },
            realEnergyYear: { text: 3346657.6507607647 },
            targetYear: { text: 11669360.48980841 },
            realEnergyTargetYearRatio: { text: 28.679015046999467 }
        }, {
            id: 'ds4gds5g45ds5g',
            managementRegionName: { text: '无锡区域' },
            realEnergyTargetRatio: { text: '--' },
            realEnergy: { text: '--' },
            energyPerSquare: { text: '--' },
            gwData: { text: '--' },
            realEnergyGwDataRatio: { text: '--' },
            target: { text: 2523691.30765399 },
            energySameRatio: { text: '--' },
            energyRingRatio: { text: '--' },
            realEnergyYear: { text: 4569474.08776884 },
            targetYear: { text: 17006533.38101439 },
            realEnergyTargetYearRatio: { text: 26.86893316465112 }
        }]
    }
];
const rowTools = {
    open: true,
    fixed: 'right',
    width: 380,
    align: '',
    text: '',
    moreOpen: true,
    event: 'rowToolHandle'
};
const topButton = [
    { id: 'btn0', text: '删除', type: 'default', event: 'topButtonHandle' },
    { id: 'btn1', text: '下载', type: 'primary', event: 'topButtonHandle' }
];
const dataSelect = [
    { id: 'test1', name: '选择项' },
    { id: 'test2', name: '单平米' },
    { id: 'test3', name: '下级分项' },
    { id: 'test4', name: '滑动平均滑动平均' }
];
const statistics = {
    open: true,
    id: 'statistics-id',
    name: { text: '50' },
    date: { text: '2020.08.11' },
    strategyStatus: { text: '未执行', dot: '#f76b64' },
    strategyTime: { text: '06:31' },
    executeTime: { text: '01:11' },
    dataStatus: { text: '正常1' },
    viscosityTemperature: { text: 21 },
    outdoorTemperature: { text: 31 }
};
export default {
    name: 'TableTreeView',
    data() {
        return {
            header1: header,
            header4,
            data1: data,
            data4,
            statistics,
            topButton,
            rowTools,
            height: 500,
            dataSelect1: JSON.parse(JSON.stringify(dataSelect)),
            dataMarge: []
        };
    },
    methods: {
        screenHandle(key, id) {
            console.log('筛选::', key, id);
        },
        sortHandle(status, key) {
            console.log('status::', status, '  ', 'key::', key);
        },
        selectHandle(ids, data) {
            console.log(ids, data);
        },
        topButtonHandle(id) {
            console.log('顶部按钮回调::', id);
        },
        rowToolHandle({ itemId, toolId }) {
            console.log('每列操作回调::', itemId, toolId);
        },
        dataSelectChange(data) {
            console.log(data);
        },
        rowClick(item) {
            console.log('点击每行::', item);
        },
        noteHandle(item) {
            console.log('item:', item);
        }
    }
};
</script>

### Attributes

| 参数     | 说明    | 类型    | 默认值   | 必须  |
| ------- | ----    | ------  | ------- | ------|
| width    | 宽度(如果设置为`100%`，组件会基于父级标签撑满并自动分配没有设置固定宽度的列的宽度) | String/Number | 500    | no     |
| height    | 高度 | String | auto     | no     |
| maxHeight    | 最大高度 | String | ''     | no     |
| loading    | 设置loading | Boolean | false    | no     |
| border    | 是否显示竖向边框 | Boolean | false     | no     |
| setting    | 开启设置 | Boolean | false     | no     |
| draggable    | 开启设置列表可多动排序 | Boolean | false     | no     |
| sortAjax    | 是否后端排序 | Boolean | false     | no     |
| header    | table头部数据 | Array | []     | yes     |
| statistics    | 行头数据，详见以下statistics说明 | Object | {}     | no     |
| data    | table主体数据 | Array | []     | no     |
| topButton    | 头部选中数据的操作按钮组 | Array | []     | no     |
| rowTools    | 每行的回调工具 | Object | []     | no     |
| average    | 每列的默认宽度 | Number, String | 80     | no     |
| render    | 设置用户渲染数据，设置为custom表示自定义渲染 | String | ''     | no     |
| openSelect    | 开启选中单行效果 | Boolean | false     | no     |
| @select    | checkbox状态改变回调 | Function | (status) => {}     | no     |
| @resizableHandle    | 当前拖动的宽度 | Function | (w, colWidth) => {}     | no     |
| @rowClick    | 点击行的回调，注意 需要设置data中的link为true | Function | (item) => {}     | no     |
| @settingChange    | 点击设置确定的回调，type返回confirm | Function | (item, type) => {}     | no     |
| @settingCancel    | 点击设置底部按钮的回调，type返回cancel | Function | (type) => {}     | no     |
| @settingReset    | 点击设置底部按钮的回调，type返回reset | Function | (type) => {}     | no     |
| key    | 唯一标识符，当一个标签下使用多个TableTree时，建议加上该属性 | String | ''     | no     |

### 提示说明

::: danger 警告
    该组件单页在理论情况(即页面只存在TableTree) header数据为8条，data数据为400条渲染没毛病，当前情况下data数据达到500条会有明显卡顿，
    另外data数据条数包括父级和子级之和
:::

::: tip 建议
    为了更好的视觉效果：
    height和maxHeight只需设置一个即可
:::

::: tip 若需强制重置数据，请调用以下方法，以下方法会重新初始化并覆盖TableTree组件数据
    1.重置header数据：this.$refs.xxx.resetHeaderData(headerData);
    2.重置data数据：this.$refs.xxx.resetTableData(tableData);
    3.其他说明：
        由于此组件初始化的时候会在mounted保存一次历史数据，后续操作会依赖保存的历史数据进行计算，
        如需修改、重置数据可调用此方法
:::

::: warning 注意
    1.event为自定义事件名称
    2.disabled设置禁用
    3.text为显示的字符串（内容）
    4.自定义事件返回的是传入的id值或状态
    5.若有自定义事件必须将事件传递给组件
    6.header数据中建议保留最后一项不设置固定宽度
:::

::: tip header数据说明
     1.item中的key属性值对应data中的key
     2.item中的sort设置排序规则，其中demo中所使用的[event: 'sortHandle']是组件提交给父级的自定义函数名称，
        (1)用户可自行定义event名称，status 取值['', 'seq', 'ord']，默认为空、seq-正序、ord-倒序，设置closeDefault为true不支持回到默认;
        (2)如果初始化传入的有多个排序，默认排序高亮状态以header数据中的第一个排序规则为准;
        (3)默认是按照字符串排序，type取值范围`string/number/date`
        (4)open-开启dom显示
        (5)event-开启注册排序函数
        (6)若需要默认排序，请设置一个status的值，如果组件在遍历的时候没有找到设置的status，默认不会进行排序
     3.item中的checked设置列显示隐藏，可选值['checked', 'uncheck']
     4.item中的align设置列对齐方式，可选值['left', 'right', 'center']
     5.item中的width设置宽度
     6.item中的tip设置提示信息，open设置显示隐藏，text表示提示的文字信息
     7.item中设置resizable: true开启拖动表头改变宽度
:::

::: tip header.screen数据说明
     1.open设置打开关闭状态，
     2.status设置筛选4种状态【'single', 'multiple', 'singleSearch', 'multipleSearch'】
     3.data设置列表
        data数据示例 [{ id: 'xxx', name: 'xxx', checked: 'xxx' }]
        checked设置选中，设置默认选中时-如果是单选条件下设置多个checked会以第一个选中的checked进行筛选
        在单选条件下如果有name='全部'，需设置id为'all'或者空字符串
     4.event设置回调
:::

::: tip statistics数据说明
    1.数据中的key对应header中key属性值，同以下data
    2.open设置显示统计数据
:::

::: tip data数据说明
     1.item中的key对应header中的key属性值
     2.item中key的text属性为table中显示的值；dot设置text左边显示点的颜色；color设置text的颜色；arrow设置箭头，arrow中的dir设置箭头方向，可选值['up', 'down']
     3.item中link设置鼠标指针为手型，并开启点击行回调
     4.item中open设置展开子集
:::

::: tip data: tools数据格式 - 可参考TableGrid设置
     1.data: [ // 操作数据
         { id: 'tjbm', name: '添加部门', disabled: true },
         { id: 'tjgw', name: '添加岗位', disabled: true },
         { id: 'bj', name: '编辑' },
         { id: 'sc', name: '删除' }
     ],
     2.moreOpen: true, // 开启更多
     3.moreId: '',
     4.more: [ // 更多数据
         { id: 'm1', name: 'more1', disabled: true },
         { id: 'm2', name: 'more2' },
         { id: 'm3', name: 'more3' }
     ]
:::

::: tip rowTools数据说明
     1.icon表示Icon组件的name
     2.text为当前icon显示的名称
     3.event为自定义事件的名称
     4.disabled为是否禁用点击
:::

::: tip topButton数据说明
     1.type为Button组件的type属性
     2.text为当前icon显示的名称
     3.event为自定义事件的名称
:::

::: danger 自定义内容（插槽）
     返回参数
     headerKey：header数据中的key
     rowIndex：行索引
     colIndex：列索引
     item：当前项
:::

::: tip 配合SidebarCustom使用
     当手动拖动SidebarCustom改变侧边栏宽度时，SidebarCustom会出发change事件，
     此时页面宽度改变需要手动调用TableGrid的重新计算列宽函数`this.$refs.xxx.resizeTableWidth()`
:::
