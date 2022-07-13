<template>
    <div class="icon-view">
        <h3 class="components-title-h3">动作类图标【action】</h3>
        <div class="icon-content">
            <div class="icon-item" v-for="(iconName, index) in iconData.actionIcon" :key="index">
                <span>{{iconName}}</span>
                <Icon :name='iconName' />
            </div>
        </div>
        <h3 class="components-title-h3">导航类图标【navigation】</h3>
        <div class="icon-content" style="background: #004375">
            <div class="icon-item" v-for="(iconName, index) in iconData.navigation" :key="index">
                <span style="color:#F2FFFF;">{{iconName}}</span>
                <Icon :name='iconName' />
            </div>
        </div>
        <h3 class="components-title-h3">应用类图标【application】</h3>
        <div class="icon-content" >
            <div class="icon-item" v-for="(iconName, index) in iconData.application" :key="index">
                <span>{{iconName}}</span>
                <Icon :name='iconName' />
            </div>
        </div>
        <h3 class="components-title-h3">建筑机电类图标【electromechanical】</h3>
        <div class="icon-content" style="background: #004375">
            <div class="icon-item" v-for="(iconName, index) in iconData.electromechanical" :key="index">
                <span style="color:#F2FFFF;">{{iconName}}</span>
                <Icon :name='iconName' />
            </div>
        </div>
        <h3 class="components-title-h3">设置颜色的图标</h3>
        <div class="icon-content">
            <div class="icon-item">
                <span>edit</span>
                <Icon name='edit' hoverColor="#f01d94" />
            </div>
            <div class="icon-item">
                <span>menu</span>
                <Icon name='menu' color="#0091ff" hoverColor="#f01d94" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'IconView',
    data() {
        return {
            iconData: {
                actionIcon: [
                    'edit',
                    'menu',
                    'reportForm',
                    'save',
                    'alarm',
                    'strategy',
                    'revoke',
                    'processing',
                    'print',
                    'pending',
                    'export',
                    'map',
                    'elevator',
                    'contrast',
                    'release',
                    'return',
                    'cost',
                    'distribution',
                    'analysis',
                    'subitem',
                    'copy',
                    'subscription',
                    'more',
                    'close',
                    'link',
                    'manage',
                    'chainRatio',
                    'heatExchangerRoom',
                    'reply',
                    'plan',
                    'record',
                    'plus',
                    'monitor',
                    'control',
                    'reduce',
                    'descendingOrder',
                    'pay',
                    'unlock',
                    'mute',
                    'electricalSubstation',
                    'switch',
                    'start',
                    'dominate',
                    'fastForward',
                    'rewind',
                    'coolingStation',
                    'coolingRoom',
                    'evaluate',
                    'confirm',
                    'calendar',
                    'journal',
                    'scan',
                    'filter',
                    'delete',
                    'upload',
                    'moveUp',
                    'setUp',
                    'apply',
                    'audit',
                    'ascendingOrder',
                    'pumpHouse',
                    'voice',
                    'timeTable',
                    'collection',
                    'favorites',
                    'retract',
                    'data',
                    'refresh',
                    'search',
                    'lock',
                    'tips',
                    'weather',
                    'addCollection',
                    'adjustTimeRange',
                    'cease',
                    'yearOnYear',
                    'statistics',
                    'complaint',
                    'signOut',
                    'complete',
                    'maintenance',
                    'repair',
                    'position',
                    'temperature',
                    'steadyPressurePumpHouse',
                    'moveDown',
                    'download',
                    'details',
                    'firePumpHouse',
                    'onSiteInspection',
                    'hide',
                    'warning',
                    'preview',
                    'working',
                    'suspend',
                    'expandItem',
                    'quota',
                    'assign',
                    'bottomSetting',
                    'isTop',
                    'reclaimedWaterPumpingStation',
                    'transferOrder',
                    'handOver',
                    'transferTask',
                    'overview',
                    'expandPage',
                    'backLog',
                    'deleteUpload',
                    'tagCompleted',
                    'tagError',
                    'tagProcessing',
                    'tagRejected',
                    'computerTerminal',
                    'department',
                    'dimission',
                    'mobileTerminal',
                    'otherMaterial',
                    'station',
                    'prompt',
                    'note',
                    'screen'
                ],
                navigation: [
                    'BIAM',
                    'SRM',
                    'AIS',
                    'PAM',
                    'PDM',
                    'WFM',
                    'SCM',
                    'EMS',
                    'EHM',
                    'GC',
                    'PES',
                    'ICSOCS',
                    'EQM',
                    'HRM',
                    'EOM',
                    'OMS',
                    'IM'
                ],
                application: [
                    'BIAM_filled',
                    'SRM_filled',
                    'AIS_filled',
                    'PAM_filled',
                    'PDM_filled',
                    'WFM_filled',
                    'SCM_filled',
                    'EMS_filled',
                    'EHM_filled',
                    'GC_filled',
                    'PES_filled',
                    'ICSOCS_filled',
                    'EQM_filled',
                    'HRM_filled',
                    'EOM_filled',
                    'OMS_filled',
                    'IM_filled'
                ],
                electromechanical: [
                    'waterChillingUnit',
                    'heatPumpUnit',
                    'boiler',
                    'waterPump',
                    'livingWaterTank',
                    'straightLadder',
                    'sewagePit',
                    'camera',
                    'electricCabinet',
                    'coolingTower'
                ]
            }
        };
    }
};
</script>

<style lang="stylus" scoped>
.icon-view
    padding 16px
    .icon-content
        display: flex;
        flex-wrap: wrap;
        .icon-item
            width 210px
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin: 10px;
            color $grey-900
            span
                margin-bottom 10px
</style>
