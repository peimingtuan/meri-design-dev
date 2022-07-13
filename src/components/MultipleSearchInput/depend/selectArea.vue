<template>
    <transition :name="position?'selectDownUpExtend':'selectDownUpExtendTop'">
        <div class="p-area-select-panel" tabindex="-1"
             v-show="transferShow"
             @wheel.stop
             @blur="onBlur"
             ref="AreaSelect"
        >
            <transferSelect
                    ref="transferSelect"
                    :data="treeData"
                    :height="height"
                    :width="width"
                    :project="project"
                    :breadObj="breadObj"
                    :allTreeData="allTreeData"
                    :returnParentNode="returnParentNode"
                    :notNull="notNull"
                    :linkage="linkage"
                    :selectedIds="selectedIds"
                    :activeClose="activeClose"
                    :choiceData="choiceData"
                    @cancel="transferCancel"
                    @confirm="transferConfirm"
                    @changeShowData="changeShowData"
                    @changeParentNodeStatus="changeParentNodeStatus"
            />
        </div>
    </transition>
</template>
<script>
import transferSelect from './transferSelect';

export default {
    name: 'AreaSelect',
    components: {
        transferSelect
    },
    data() {
        return {

        };
    },
    watch: {
        transferShow: {
            handler(n, o = false) {
                if (n !== o) {
                    if (n) {
                        this.$nextTick(() => {
                            this.$refs.AreaSelect.focus();
                        });
                    }
                }
            },
            immediate: true
        }
    },
    methods: {
        boxEnter() {
            this.$emit('modalStatus', false);
        },
        boxLeave() {
            this.$emit('modalStatus', true);
        },
        // 切换下拉面板的数据
        changeShowData(item) {
            this.$emit('changeShowData', item);
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
             * @param bol 全选的状态
             */
        transferConfirm(ids, sd, len) {
            this.transferShow = false;
            this.$emit('confirm', { ids, sd });
        },

        // 改变父节点的状态
        changeParentNodeStatus(item) {
            this.$emit('changeParentNodeStatus', item);
        },
        onBlur() {
            this.$emit('blur', false);
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
