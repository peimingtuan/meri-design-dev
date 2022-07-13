<template>
    <div class="transfer-select-modal">
        <transition name="opacityInUiOut">
            <div class="transfer-select-modal-shade" v-show="modalShow" @click="transferClose"></div>
        </transition>
        <transition name="bounceInUiOut">
            <div class="transfer-select-modal-content" v-show="modalShow">
                <Transfer
                        ref="transferNode"
                        :data="data"
                        :isShow="isShow"
                        :isEnter="isEnter"
                        :placeholder="placeholder"
                        :linkage="linkage"
                        :selectedIds="selectedIds"
                        :lastStage="lastStage"
                        :notNull="notNull"
                        :returnParentNode="returnParentNode"
                        @cancel="transferCancel"
                        @confirm="transferConfirm"
                />
            </div>
        </transition>
    </div>
</template>

<script>
import Transfer from '../Transfer';

export default {
    name: 'TransferSelectModal',
    components: { Transfer },
    props: {
        isEnter:{
            type:Boolean,
            default:false
        },
        isShow:{
            type:Boolean,
            default:false
        },
        // 弹窗显示
        modalShow: {
            type: Boolean,
            default: false
        },
        // 选择内容后的title
        title: {
            type: String,
            default: ''
        },
        // 单位
        unit: {
            type: String,
            default: '个'
        },
        // 占位符
        placeholder: {
            type: String,
            default: '请选择'
        },
        // 穿梭框数据
        data: {
            type: Array,
            default: () => []
        },
        // 上下级联动
        linkage: {
            type: Boolean,
            default: true
        },
        /**
         * 是否返回半选状态的id
         */
        notNull: {
            type: Boolean,
            default: false
        },
        // 是否返回半选状态的父对象数据
        returnParentNode: {
            type: Boolean,
            default: true
        },
        // 只能选择末级
        lastStage: {
            type: Boolean,
            default: false
        },
        // 点击遮罩层是否可关闭弹窗
        autoClose: {
            type: Boolean,
            default: true
        },
        // 设置默认选中数据
        selectedIds: {
            type: Array,
            default: () => []
        }
    },
    watch: {
        modalShow(n, o) {
            if (n === o) return;
            const { body } = document;
            if (n) body.style.overflow = 'hidden';
            else setTimeout(() => { body.style.overflow = 'auto'; }, 300);
        }
    },
    methods: {
        // 点击弹窗遮罩，关闭弹窗
        transferClose() {
            if (!this.autoClose) return;
            this.$refs.transferNode.handleCancel();
        },
        /**
         * 穿梭框取消回调
         */
        transferCancel() {
            this.$emit('cancel');
        },
        /**
         * 穿梭框确定函数
         * @param ids 选中的id
         * @param sd 选中的数据
         */
        transferConfirm(ids, sd) {
            this.$emit('confirm', ids, sd);
            this.$emit('cancel');
        }
    }
};
</script>

<style lang="stylus">
@import "../static/stylus/animate/opacityInUiOut.styl"
@import "../static/stylus/animate/bounceInUiOut.styl"

.transfer-select-modal
    display inline
    font-size 0
    .transfer-select-modal-shade
        position fixed
        left 0
        top 0
        background-color $theme-transparency
        width 100%
        height 100%
        z-index 5000
    .transfer-select-modal-content
        position fixed
        left 50%
        top 50%
        margin-left -300px
        margin-top -240px
        z-index 6000

</style>
