<template>
    <div class="p-pagination">
        <!-- 总条数 -->
        <div
            class="lf p-total"
            v-if="!simple&&pageCountShow"
        >
            共 {{pageCount}} 条
        </div>
        <!-- 左箭头 -->
        <div class="lf">
            <p
                class="lf p-prev-btn"
                :class="{'p-disabled': currentPage === 1||_totalPage===0, 'p-simple': simple}"
                @mouseenter="arrowBtnMouseenterHandle('prev')"
                @mouseleave="arrowBtnMouseleaveHandle('prev')"
                @click.stop="prevPage"
            >
                <arrow-bottom v-if="!prevHover || currentPage === 1"></arrow-bottom>
                <arrow-bottom-blue v-else></arrow-bottom-blue>
            </p>
        </div>
        <!-- 页码 -->
        <ul class="lf">
            <li
                class="lf"
                v-if="pageItem !== 'right' && pageItem !== 'left'"
                :class="{'active': pageItem === currentPage, 'p-simple': simple}"
                v-for="(pageItem, index) in visiblePageArr"
                :key="index"
                @mouseenter="rightArrow=leftArrow=true"
                @mouseleave="rightArrow=leftArrow=true"
                @click="changePage(pageItem)"
            >
                {{pageItem}}</li>
            <!-- 快速后翻页 -->
            <li
                class="lf"
                :class="{'p-simple': simple}"
                v-else-if="pageItem === 'right'"
                @mouseenter="rightArrow=!rightArrow"
                @mouseleave="rightArrow=!rightArrow"
                @click="fastForward"
            >
                <more v-if="rightArrow" />
                <arrow-right-double v-if="!rightArrow" />
            </li>
            <!-- 快速前翻页 -->
            <li
                class="lf p-left-more"
                :class="{'p-simple': simple}"
                v-else-if="pageItem === 'left'"
                @mouseenter="leftArrow=!leftArrow"
                @mouseleave="leftArrow=!leftArrow"
                @click="fastBackward"
            >
                <more v-if="leftArrow" />
                <arrow-right-double v-if="!leftArrow" />
            </li>
        </ul>
        <!-- 右箭头 -->
        <div class="lf right-btn">
            <p
                class="lf p-next-btn"
                :class="{'p-disabled': currentPage === _totalPage || _totalPage===0, 'p-simple': simple}"
                @mouseenter="arrowBtnMouseenterHandle('next')"
                @mouseleave="arrowBtnMouseleaveHandle('next')"
                @click.stop="nextPage"
            >
                <arrow-bottom v-if="!nextHover || currentPage === _totalPage"></arrow-bottom>
                <arrow-bottom-blue v-else></arrow-bottom-blue>
            </p>
        </div>
        <!-- 每页条数设置 -->
        <div
            class="lf p-page-size-set"
            v-if="!simple&&pageSizeSetting"
        >
            <p-select
                size="small"
                width="90"
                :selectdata="pageOption"
                :hideClear="true"
                :isReadOnly="true"
                v-model="currentPageSize"
                @change="pageSizeChange"
            ></p-select>
        </div>
        <!-- 重置 -->
        <div
            class="lf p-resetting"
            v-if="!simple&&reloadPage"
            @click="reladPage"
        >
            <resetting />
        </div>
    </div>
</template>

<script>
import PSelect from '../Select';
import ArrowBottom from '../static/iconSvg/arrow_bottom.svg';
import ArrowBottomBlue from '../static/iconSvg/arrow_bottom_blue.svg';
import More from '../static/iconSvg/defaultMore.svg';
import ArrowRightDouble from '../static/iconSvg/arrow_right_double_blue.svg';
import Resetting from '../static/iconSvg/resetting.svg';

export default {
    name: 'Pagination',
    props: {
        /**
         * 默认选中的页码
         */
        page: {
            type: Number,
            default: 1
        },
        /**
         * 快速翻页按钮显示的基数
         */
        basePage: {
            type: Number,
            default: 3
        },
        /**
         * 的每页条数
         */
        pageSize: {
            type: [String, Number],
            default: '20'
        },
        /**
         * 数据总数
         */
        pageCount: {
            type: Number,
            required: true
        },
        /**
         * 默认显示的页码个数
         */
        visiblePages: {
            type: Number,
            default: 5
        },
        /**
         * 是否启用快速翻页
         */
        fast: {
            type: Boolean,
            default: true
        },
        /**
         * 快速翻页步长
         */
        fastStep: {
            type: Number,
            default: 5
        },
        /**
         * 是否启用刷新页面数据
         */
        reloadPage: {
            type: Boolean,
            default: false
        },
        /**
         * 是否显示总条数
         */
        pageCountShow: {
            type: Boolean,
            default: false
        },
        /**
         * 每页条数设置
         */
        pageSizeSetting: {
            type: Boolean,
            default: false
        },
        /**
         * 简易分页器
         */
        simple: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            currentPage: this.page, // 当前页码
            rightArrow: true, // 下一页按钮状态
            leftArrow: true, // 前一页按钮状态
            currentPageSize: String(this.pageSize), // 当前每页条数
            prevHover: false, // 向前按钮是否获取焦点
            nextHover: false, // 向后按钮是否失去焦点
            pageOption: [
                { name: '10/页', id: '10' },
                { name: '20/页', id: '20' },
                { name: '30/页', id: '30' },
                { name: '40/页', id: '40' }
            ]
        };
    },
    computed: {
        /**
         * 显示的页码和按钮
         */
        visiblePageArr() {
            const visiblePages = this.visiblePages > this._totalPage
                    ? this._totalPage
                    : this.visiblePages,
                basePage = this.basePage > visiblePages ? visiblePages : this.basePage;
            let start = this.currentPage - basePage <= 0
                ? 0
                : this.currentPage - basePage;
            start = start + visiblePages > this._totalPage
                ? this._totalPage - visiblePages
                : start;
            const end = start + visiblePages,
                arr = [];
            let newArr = [];
            for (let i = 0; i < this._totalPage; i++) {
                arr.push(i + 1);
            }
            newArr = arr.slice(start, end);
            // if (end < this._totalPage - 1 && this.fast) {
            //     newArr.splice(visiblePages, 0, 'right');
            //     newArr.splice(visiblePages + 1, 0, this._totalPage);
            // }
            if (end <= this._totalPage - 1 && this.fast) {
                if (end < this._totalPage - 1) {
                    newArr.splice(visiblePages, 0, 'right');
                    newArr.splice(visiblePages + 1, 0, this._totalPage);
                }
                if (end === this._totalPage - 1) {
                    newArr.splice(visiblePages + 1, 0, this._totalPage);
                }
            }
            if (start > 0 && this.fast) {
                newArr.splice(0, 1, 'left');
                newArr.splice(0, 0, 1);
            }
            return newArr;
        },
        /**
         * 总页码
         */
        _totalPage() {
            if (Number(this.currentPageSize)) return Math.ceil(this.pageCount / this.currentPageSize);
            throw new Error('参数不正确');
        }
    },
    components: {
        PSelect,
        ArrowBottom,
        ArrowBottomBlue,
        More,
        ArrowRightDouble,
        Resetting
    },
    watch: {
        /**
         * 切换页码
         * @returns {object} newPage: number 当前页码；newPageSize: number 当前每页条数
         *
         */
        // currentPage(newVal, oldVal) {
        //     if (newVal === oldVal) return;
        //     this.$emit('update:page', newVal);
        //     this.$emit('change', {
        //         newPage: newVal,
        //         newPageSize: Number(this.currentPageSize)
        //     });
        // },
        /**
         * 切换页码
         * @returns {object} newPage: number 当前页码；newPageSize: number 当前每页条数
         *
         */
        // currentPageSize(newVal, oldVal) {
        //     if (newVal === oldVal) return;
        //     this.currentPage = 1;
        //     this.$emit('update:page', this.currentPage);
        //     this.$emit('change', {
        //         newPage: this.currentPage,
        //         newPageSize: Number(this.currentPageSize)
        //     });
        //     this.$emit('update:pageSize', this.currentPageSize);
        // },
        /**
         * 监听当前页的参数
         */
        page(newVal, oldVal) {
            this.currentPage = newVal;
        },
        /**
         * 监听当前每页条数的变化
         */
        pageSize(newVal, oldVal) {
            if (newVal === oldVal) return;
            this.currentPageSize = String(newVal);
        }
    },
    methods: {
        /**
         * 切换页码
         * @param {number} page 当前页码
         */
        changePage(page) {
            this.currentPage = page;
            this.$emit('update:page', page);
            this.$emit('change', {
                newPage: this.currentPage,
                newPageSize: Number(this.currentPageSize)
            });
        },
        /**
         * 切换每页条数
         */
        pageSizeChange(val) {
            this.currentPage = 1;
            this.currentPageSize = val.id;
            this.$emit('update:page', this.currentPage);
            this.$emit('update:pageSize', val.id);
            this.$emit('change', {
                newPage: this.currentPage,
                newPageSize: Number(this.currentPageSize)
            });
        },
        /**
         * 上一页、下一页按钮获取焦点
         * @param {string} type prev:上一页 next:下一页
         */
        arrowBtnMouseenterHandle(type) {
            this.prevHover = type === 'prev';
            this.nextHover = type === 'next';
        },
        /**
         * 上一页、下一页按钮失去焦点
         * @param {string} type prev:上一页 next:下一页
         */
        arrowBtnMouseleaveHandle(type) {
            this.prevHover = type === 'prev' && (this.prevHover = false);
            this.nextHover = type === 'next' && (this.nextHover = false);
        },
        /**
         * 点击上一页按钮
         */
        prevPage() {
            if (this._totalPage === 0 || this.currentPage === 1) return;
            this.currentPage === 1 ? 1 : this.currentPage--;
            this.$emit('update:page', this.currentPage);
            this.$emit('change', {
                newPage: this.currentPage,
                newPageSize: Number(this.currentPageSize)
            });
        },
        /**
         * 点击下一页按钮
         */
        nextPage() {
            if (this._totalPage === 0 || this.currentPage === this._totalPage) return;
            this.currentPage === this._totalPage
                ? (this.currentPage = this._totalPage)
                : this.currentPage++;
            this.$emit('update:page', this.currentPage);
            this.$emit('change', {
                newPage: this.currentPage,
                newPageSize: Number(this.currentPageSize)
            });
        },
        /**
         * 快速向前翻页
         */
        fastForward() {
            const step = this.currentPage + this.fastStep;
            if (step > this._totalPage) this.leftArrow = this.rightArrow = true;
            this.currentPage = step > this._totalPage ? this._totalPage : step;
            this.$emit('update:page', this.currentPage);
            this.$emit('change', {
                newPage: this.currentPage,
                newPageSize: Number(this.currentPageSize)
            });
        },
        /**
         * 快速向后翻页
         */
        fastBackward() {
            const step = this.currentPage - this.fastStep;
            if (step < 1) this.leftArrow = this.rightArrow = true;
            this.currentPage = step < 1 ? 1 : step;
            this.$emit('update:page', this.currentPage);
            this.$emit('change', {
                newPage: this.currentPage,
                newPageSize: Number(this.currentPageSize)
            });
        },
        /**
         * 重置页码
         */
        reladPage() {
            this.$emit('reload-page', {
                newPage: this.currentPage,
                newPageSize: Number(this.currentPageSize)
            });
        }
    },
    created() {
        this.staticPage = this.page;
        this.staticPageSize = this.pageSize;
    }
};
</script>

<style lang="stylus">
.lf
    float left
.rf
    float right
.clearfix:after
    content ''
    display block
    clear both
    height 0
    overflow hidden
    visibility hidden
.p-pagination
    display flex
    align-items center
    -moz-user-select none
    -khtml-user-select none
    user-select none
    color $grey-600
    font-size 0
    svg
        width 16px
        height 16px
    .p-total
        height 28px
        line-height 27px
        text-align center
        font-size 14px
        margin-right 13px
        //background $white
    &>div
        p
            display flex
            align-items center
            justify-content center
            width 28px
            height 28px
            cursor pointer
            background $theme
            border-radius 4px
            border 1px solid $grey-400
            margin-right 8px
            transition all .3s
            &:hover
                color $blue-500
                background $theme
                border 1px solid $blue-500
            &.p-disabled
                color $grey-50
                cursor not-allowed
                background-color $grey-200
                border-color $grey-400
            &.p-simple
                border 0
                background $theme
        .p-prev-btn
            svg
                width 16px
                height 16px
                transform rotate(90deg)
        .p-next-btn
            margin-right 0
            svg
                width 16px
                height 16px
                transform rotate(-90deg)
    ul
        li
            display flex
            align-items center
            justify-content center
            font-size 14px
            min-width 28px
            height 28px
            text-align center
            cursor pointer
            background $theme
            border-radius 4px
            border 1px solid $grey-400
            margin-right 8px
            transition all .3s
            &:hover
                color $blue-500
                background $theme
                border 1px solid $blue-500
            &.active
                color $blue-500
                background $blue-100
                border 1px solid $blue-500
            &.p-simple
                border 0
                background $theme
        .p-left-more
            svg
                transform rotate(180deg)

    .p-page-size-set
        margin-left 8px
    .p-resetting
        display flex
        align-items center
        justify-content center
        margin-left 12px
        cursor pointer
.p-select-title-text
    color $grey-600 !important

</style>
