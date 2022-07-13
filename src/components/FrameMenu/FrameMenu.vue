<template>
    <transition name="menuSlideLeftRight">
        <div v-show="show" class="p-frame-menu-fixed">
            <div ref="frameMenu" class="p-frame-menu" tabindex="-1"
                 @blur="menuBlur"
                 @mouseenter="menuEnter"
                 @mouseleave="menuLeave"
            >
                <div class="p-frame-header">
                    <div class="p-frame-header-btn">
                        <IconMenu class="p-frame-icon-menu" @click.native="clickMenu" />
                        <span class="p-frame-system-name p-frame-menu-text-overflow" @mouseenter="TextEllipsis">{{systemName}}</span>
                    </div>
                    <div class="p-frame-header-search">
                        <div class="p-frame-search-label">
                            <IconSearch class="p-frame-search-icon" />
                            <IconClear v-if="inputVal"
                                       class="p-frame-search-clear"
                                       @click.native="clearInput"
                            />
                            <input type="text"
                                   v-model="inputVal"
                                   class="p-frame-search-input"
                                   @input="inputHandle"
                            >
                            <!--
                            <section class="p-frame-search-input"
                                     contenteditable="true"
                                     ref="searchInput"
                                     @input="inputHandle"
                            ></section>
                            -->
                            <span v-show="!inputActive" class="p-frame-search-placeholder">{{placeholder}}</span>
                        </div>
                        <div class="p-frame-search-panel" v-if="searchData && searchData.length">
                            <div v-for="(search, sdi) in searchData" :key="`search-${search.name}-${sdi}`"
                                 class="p-frame-search-panel-item"
                                 @click="searchClick(search)"
                            >
                                <section class="p-frame-search-text-t p-frame-search-f-t p-frame-menu-text-overflow">{{search.threeName}}</section>
                                <section class="p-frame-search-text-t p-frame-search-s-t p-frame-menu-text-overflow">{{search.name}}</section>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="p-frame-content">
                    <div class="p-first-menu">
                        <section v-for="(first, fi) in data" :key="`first-${first.id}-${fi}`"
                                 :class="['p-first-menu-list', currentInd===fi&&'p-first-menu-list-active']"
                                 @mouseenter="firstMenuEnter(fi)"
                        >
                            <i class="p-first-menu-icon">
                                <img v-if="first.icon" :src="first.icon || 'http://47.95.122.141:8200/persagy_ui_kit/images/avatar-default.png'" alt="">
                            </i>
                            <article class="p-first-menu-name p-frame-menu-text-overflow" @mouseenter="TextEllipsis">{{first.name}}</article>
                            <IconArrowRight class="p-first-menu-arrow"/>
                        </section>
                    </div>
                    <div class="p-second-menu" ref="secondMenu" @mouseenter="secondMenuEnter">
                        <div class="p-second-menu-content"
                             :style="secondMenuWidth!==428&&{width: `${secondMenuWidth}px`}"
                        >
                            <div class="p-second-menu-lists" v-for="(item, i) in secondMenuArr" :key="`secondMenuArr-${i}`">
                                <div v-for="(second, si) in item"
                                     :key="`second-${second.id}-${si}`"
                                     class="p-second-menu-box"
                                >
                                    <section class="p-second-menu-title">
                                        <article class="p-second-menu-text p-frame-menu-text-overflow" @mouseenter="TextEllipsis">{{second.name}}</article>
                                    </section>
                                    <section class="p-second-menu-list">
                                        <article v-for="(three, ti) in second.children" :key="`three-${three.id}-${ti}`"
                                                 class="p-second-menu-item p-frame-menu-text-overflow"
                                                 @mouseenter="TextEllipsis"
                                                 @click="threeMenuClick(second, three)"
                                        >{{three.name}}</article>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import IconMenu from '../static/iconSvg/menu.svg';
import IconSearch from '../static/iconSvg/search.svg';
import IconClear from '../static/iconSvg/clear2.svg';
import IconArrowRight from '../static/iconSvg/arrow_right.svg';

import TextEllipsis from '../static/utils/TextEllipsis';

export default {
    name: 'FrameMenu',
    components: {
        IconMenu, IconSearch, IconClear, IconArrowRight
    },
    props: {
        // 菜单显示状态
        show: {
            type: Boolean,
            default: false
        },
        // 系统名称
        systemName: {
            type: String,
            default: '导航栏'
        },
        // 占位符
        placeholder: {
            type: String,
            default: '搜索功能点'
        },
        // 菜单数据
        data: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            // 输入的值
            inputVal: '',
            // input正在输入
            inputActive: '',
            // 当前菜单索引
            currentInd: 0,
            // 二级菜单宽度
            secondMenuWidth: 428,
            // 当前-二级菜单数据
            secondData: [],
            // 当前-二级菜单多维数据
            secondMenuArr: [],
            // 搜索的数据
            searchData: [],
            // 激活关闭
            closeActive: false
        };
    },
    watch: {
        show(n, o) {
            if (n === o) return;
            const { data } = this;
            this.$nextTick(() => {
                if (n && (data && data instanceof Array && JSON.stringify(data).length > 4)) this.firstMenuEnter(this.currentInd);
                this.$refs.frameMenu.focus();
            });
        },
        inputVal(n, o) {
            if (n === o) return;
            if (n) {
                if (this.timeSearch) clearTimeout(this.timeSearch);
                this.timeSearch = setTimeout(() => {
                    this.searchMenu(n);
                }, 500);
            } else {
                this.searchData = [];
            }
        }
    },
    methods: {
        TextEllipsis,
        changeShow(status) {
            this.$emit('changeShow', status);
            if (status) return;
            setTimeout(this.clearInput, 300);
        },
        // 失去焦点
        menuBlur() {
            if (this.closeActive) this.changeShow(false);
        },
        menuEnter() {
            this.closeActive = false;
        },
        menuLeave() {
            this.closeActive = true;
            this.$refs.frameMenu.focus();
        },
        // 点击菜单图标
        clickMenu() {
            this.changeShow(false);
        },
        // 监听input正在输入
        inputHandle(e) {
            /*
            const { data, target: { innerText } } = e;
            this.inputActive = data || innerText;
            this.inputVal = innerText;
            */
            const { data, target: { value } } = e;
            this.inputActive = data || value;
            // this.inputVal = innerText;
        },
        // 清除输入
        clearInput() {
            this.inputVal = '';
            this.inputActive = '';
            this.searchData = [];
            const { $refs: { searchInput } } = this;
            if (searchInput) searchInput.innerText = '';
        },
        // 搜索
        searchMenu(str) {
            const { data } = this,
                searchData = [];
            data.forEach(fd => {
                if (fd.child && fd.child.length) {
                    fd.child.forEach(sd => {
                        if (sd.children && sd.children.length) {
                            sd.children.forEach(td => {
                                if (td.name.includes(str)) {
                                    searchData.push({
                                        id: td.id,
                                        name: `${fd.name}/${sd.name}`,
                                        firstId: fd.id,
                                        firstName: fd.name,
                                        secondId: sd.id,
                                        secondName: sd.name,
                                        three: td,
                                        threeName: td.name
                                    });
                                }
                            });
                        }
                    });
                }
            });
            this.searchData = searchData;
        },
        // 点击搜索
        searchClick(search) {
            const {
                firstId, firstName, secondId, secondName, three
            } = search;
            this.$emit('change', {
                first: { id: firstId, name: firstName },
                second: { id: secondId, name: secondName },
                three
            });
            this.changeShow(false);
            this.clearInput();
        },
        // 鼠标进入一级菜单
        firstMenuEnter(i) {
            if (this.menuTimer) clearTimeout(this.menuTimer);
            this.menuTimer = setTimeout(() => {
                const { data } = this;
                this.currentInd = i;
                const secondData = data[i].child;
                this.secondData = secondData;
                this.secondMenuWidth = this.setMenuWidth(secondData);
            }, 300);
        },
        secondMenuEnter() {
            if (this.menuTimer) clearTimeout(this.menuTimer);
        },
        // 设置二级菜单宽度
        setMenuWidth(data) {
            const { $refs: { secondMenu } } = this,
                smh = secondMenu.clientHeight, // 可容纳的高度
                secondMenuArr = []; // 二级菜单多维数据
            let line = 0, // 菜单列数
                total = 0;
            // 每一项的高
            data.forEach(d => {
                const itemHeight = 86 + ((d.children && d.children.length) ? d.children.length * 32 : 0);
                total += itemHeight;
                if (total >= smh) {
                    total = itemHeight;
                    line++;
                    secondMenuArr.push([d]);
                } else {
                    if (!secondMenuArr[line]) secondMenuArr.push([d]);
                    else secondMenuArr[line].push(d);
                }
            });
            this.secondMenuArr = secondMenuArr;

            const w = secondMenuArr.length * 192;
            if (w <= 428) return 428;
            if (w >= 1018) return 1018;
            if (w > 428 && w < 1018) return w;
            return 428; // 菜单最大宽度1018
        },
        // 点击三级菜单
        threeMenuClick({ id: sid, name: sName }, three) {
            const { data, currentInd } = this,
                { id, name } = data[currentInd];
            this.$emit('change', {
                first: { id, name },
                second: { id: sid, name: sName },
                three
            });
            this.changeShow(false);
        }
    }
};
</script>

<style lang="stylus">
.p-frame-menu-fixed
    position fixed
    left 0
    top 0
    z-index 700
    background-color rgba(255, 255, 255, 0)
    width 100%
    height 100%
.p-frame-menu
    position absolute
    left 0
    top 0
    z-index 700
    outline none
    background-color $blue-900
    box-shadow 20px 0 34px 0 rgba(0, 16, 34, .13);
    min-width 640px
    max-width 1230px
    height 100%
    overflow hidden
    font-size 0

.p-frame-menu-text-overflow
    overflow hidden
    text-overflow ellipsis
    white-space nowrap

.p-frame-header
    display flex
    padding-left 16px
    padding-right 16px
    width 100%
    height 48px
.p-frame-header-btn
    display flex
    align-items center
    border-bottom 1px solid $blue-800
    width 196px
    height 100%
    .p-frame-icon-menu
        width 24px
        height 24px
        font-size 0
        cursor pointer
        path
            fill $white
    .p-frame-system-name
        padding-left 12px
        width calc(100% - 24px)
        color $white
        font-size 16px
.p-frame-header-search
    position relative
    flex auto
    display flex
    align-items center
    border-bottom 1px solid $blue-800
    height 100%
.p-frame-search-label
    position relative
    display flex
    align-items center
    padding-left 12px
    padding-right 12px
    background-color $blue-800
    width 100%
    height 32px
.p-frame-search-icon
    width 20px
    height 20px
    font-size 0
    path
        fill $white
        opacity .5
.p-frame-search-clear
    position absolute
    right 12px
    top 8px
    z-index 3
    width 16px
    height 16px
    cursor pointer
    font-size 0
    path
        fill $white
        opacity .5
        transition opacity .3s
    &:hover
        path
            opacity 1
.p-frame-search-input
    position relative
    z-index 2
    outline none
    background none
    padding-left 8px
    border 0
    border-radius 4px
    width 100%
    height 100%
    line-height 32px
    font-size 14px
    color $white
.p-frame-search-placeholder
    position absolute
    left 0
    top 0
    z-index 1
    padding-left 40px
    width 100%
    height 100%
    line-height 32px
    font-size 14px
    color $white
    opacity .5
.p-frame-search-panel
    position absolute
    top 44px
    left 0
    z-index 10
    padding-left 16px
    padding-right @padding-left
    background-color $blue-800
    border-radius 4px
    box-shadow $box-shadow-bottom
    overflow-x hidden
    overflow-y auto
    width 100%
    max-height 480px
    &::-webkit-scrollbar
        width 6px
        height 6px
    &::-webkit-scrollbar-thumb
        background-color $blue-400
        border-radius 3px
        &:hover
            background-color $blue-500
    &::-webkit-scrollbar-track
        background-color $blue-800
.p-frame-search-panel-item
    position relative
    padding-top 16px
    padding-bottom @padding-top
    width 100%
    height 72px
    transition all .3s
    cursor pointer
    + .p-frame-search-panel-item
        border-top 1px solid $blue-700
    &::before
        position absolute
        left -16px
        top 0
        z-index -1
        width calc(100% + 32px)
        height 100%
        content ''
        display block
        background-color $blue-600
        opacity 0
        transition opacity .3s
    &:hover
        color $white
        &::before
            opacity 1
    .p-frame-search-text-t
        line-height 20px
        font-size 14px
    .p-frame-search-f-t
        color $white
    .p-frame-search-s-t
        color rgba(255,255,255,.8)

.p-frame-content
    display flex
    align-items flex-start
    width 100%
    height calc(100% - 48px)

.p-first-menu
    padding-left 16px
    padding-right 16px
    border-right 1px solid $blue-800
    width 212px
    height 100%
    overflow-x hidden
    overflow-y auto
.p-first-menu-list
    position relative
    display flex
    align-items center
    border-bottom 1px solid $blue-800
    width 100%
    height 55px
    cursor pointer
    transition background-color .3s
    &::before
        position absolute
        left -16px
        top 0
        z-index -1
        content ''
        display block
        background-color $blue-500
        width calc(100% + 32px)
        height 100%
        opacity 0
        transition opacity .3s
    &:hover
        &::before
            opacity 1
    .p-first-menu-icon
        //border-radius 8px
        width 16px
        height @width
        overflow hidden
        img
            width 100%
            height 100%
    .p-first-menu-name
        padding-left 12px
        padding-right 32px
        width calc(100% - 16px)
        font-size 16px
        color $white
    .p-first-menu-arrow
        position absolute
        right 8px
        top 20px
        width 16px
        height 16px
        font-size 0
        path
            fill $white
            opacity .5
.p-first-menu-list-active
    &::before
        opacity 1

.p-second-menu
    //flex auto
    padding-left 36px
    padding-right 36px
    max-width 1018px
    min-width 428px
    height 100%
    overflow-x auto
    overflow-y scroll
    &::-webkit-scrollbar-track
        background-color $blue-900
    &::-webkit-scrollbar
        width 6px
        height 6px
    &::-webkit-scrollbar-thumb
        background-color $blue-400
        border-radius 3px
        &:hover
            background-color $blue-500
.p-second-menu-content
    display flex
    align-items flex-start
    width 428px
.p-second-menu-lists
    width 208px
.p-second-menu-box
    display inline-block
    vertical-align top
    padding-right 36px
    padding-top 16px
    width 100%
.p-second-menu-title
    padding-top 8px
    border-bottom 1px solid $blue-800
    width 100%
    height 38px
    .p-second-menu-text
        padding-left 8px
        color $white
        font-size 16px
        line-height 20px
.p-second-menu-list
    padding-top 16px
    padding-bottom @padding-top
    width 100%
    .p-second-menu-item
        padding-left 8px
        padding-right 8px
        width 100%
        line-height 32px
        color rgba(255,255,255,.8)
        font-size 14px
        cursor pointer
        transition all .3s
        &:hover
            color $white
            background-color rgba(255,255,255,.1)

@keyframes menuSlideInLeft
    from
        opacity .5
        transform translate3d(-100%, 0, 0)
        visibility visible
    to
        opacity 1
        transform translate3d(0, 0, 0)
@keyframes menuSlideOutLeft
    from
        opacity 1
        transform translate3d(0, 0, 0)
    to
        opacity .5
        visibility hidden
        transform translate3d(-100%, 0, 0)
.menuSlideLeftRight-enter-active
    animation menuSlideInLeft .2s ease-out
.menuSlideLeftRight-leave-active
    animation menuSlideOutLeft .2s ease-in

</style>
