<template>
    <transition :name="position?'selectDownUpExtend':'selectDownUpExtendTop'">
        <div class="p-area-select-panel"
             v-show="transferShow"
             @mouseenter="boxEnter"
             @mouseleave="boxLeave"
             @wheel.stop
        >
            <TransferMini
                    ref="transferMini"
                    :data.sync="data"
                    :linkage="linkage"
                    :lastStage="lastStage"
                    :notNull="notNull"
                    :returnParentNode="returnParentNode"
                    :height="height"
                    :width="width"
                    :overWidth="overWidth"
                    @clickCallBack="clickCallBack"
                    :childDisabled="childDisabled"
                    :searchValue="searchValue"
                    :showChoseData="showChoseData"
                    @cancel="transferCancel"
                    @confirm="transferConfirm"
            />
        </div>
    </transition>
</template>
<script>
import TransferMini from './TransferMini';

export default {
    name: 'AreaSelect',
    components: {
        TransferMini
    },
    data() {
        return {
            treeData: []
        };
    },
    methods: {
        boxEnter() {
            this.$emit('modalStatus', false);
        },
        boxLeave() {
            this.$emit('modalStatus', true);
        },
        /**
         * 穿梭框取消回调-关闭弹窗
         */
        transferCancel() {
            this.$emit('cancelModal', false);
            this.transferShow = false;
        },
        /**
         * 穿梭框确定函数
         * @param ids 选中的id
         * @param sd 选中的数据
         * @param len length
         */
        transferConfirm(ids, sd, len) {
            this.transferShow = false;
            this.$emit('confirm', { ids, sd, len });
        },
        // 点击某一项的回调函数
        clickCallBack(obj) {
            this.$emit('clickCallBack', obj);
        }
    }
};
</script>
<style lang='stylus'>
    .p-area-select-panel
        position absolute
        border 1px solid $grey-300
        border-radius 4px
        z-index 7500
        min-width 180px
        max-width 600px
        outline none

</style>
