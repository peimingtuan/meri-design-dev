<template>
	<transition :name="'slide'+tipPlace">
		<div
			v-show="tipShow"
			:class="['p-select-input-tip', 'p-select-input-tip-'+tipPlace]"
		>
			<span class="p-popover-point"></span>
			<section
				ref="selectedTipItem"
				:class="['p-select-input-tip-item','p-select-input-tip-overflow']"
			>{{tipText}}</section>
		</div>
	</transition>
</template>
<script>
export default {
    name: 'InputPopover',
    data() {
        return {
            tipShow: false
        };
    },
    watch: {
        tipShow(n, o) {
            if (n) {
                this.$nextTick(() => {
                    this.selfVm.renderPosition(this);
                });
            }
        }
    }
};
</script>

<style lang="stylus">
.p-select-input-tip
	position: absolute
	background-color: #fff
	border-radius: 4px
	max-width: 480px
	z-index: 7600
	pointer-events none
	.p-popover-point
		position: absolute
		display: inline-block
		border-style: solid
		border-width: 4px
		width: 0
		height: 0
		transform: rotate(-45deg)
		z-index: 0
	.p-select-input-tip-item
		padding: 8px 12px
		overflow-y auto
		max-height 420px
		line-height: 22px
		font-size: 14px
		word-wrap: break-word
		word-break: break-all
.p-select-input-tip-top
	box-shadow: $box-shadow-bottom
	.p-popover-point
		bottom: -4px
		left: calc(50% - 2px)
		border-style solid
		border-width 6px 6px 0 6px
		width 0
		height 0
		border-color $white transparent transparent transparent
		transform rotate(0)
		z-index: -1
.p-select-input-tip-bottom
	box-shadow: $box-shadow-bottom
	.p-popover-point
		top: -4px
		left: calc(50% - 2px)
		border-style solid
		border-width 6px 6px 0 6px
		width 0
		height 0
		border-color $white transparent transparent transparent
		transform rotate(180deg)
		//filter: drop-shadow()

@keyframes slidetop
	from
		opacity: 0
		transform: translateY(32px)
	to
		opacity: 1
		transform: translateY(0)
.slidetop-enter-active
	animation: slidetop 0.3s
.slidetop-leave-active
	animation: slidetop 0.3s reverse
@keyframes slidebottom
	from
		opacity: 0
		transform: translateY(-32px)
	to
		opacity: 1
		transform: translateY(0)
.slidebottom-enter-active
	animation: slidebottom 0.3s
.slidebottom-leave-active
	animation: slidebottom 0.3s reverse
@keyframes slideleft
	from
		opacity: 0
		transform: translateX(32px)
	to
		opacity: 1
		transform: translateX(0)
.slideleft-enter-active
	animation: slideleft 0.3s
.slideleft-leave-active
	animation: slideleft 0.3s reverse
@keyframes slideright
	from
		opacity: 0
		transform: translateX(-32px)
	to
		opacity: 1
		transform: translateX(0)
.slideright-enter-active
	animation: slideright 0.3s
.slideright-leave-active
	animation: slideright 0.3s reverse

</style>
