<template>
    <transition :name="position?'selectDownUpExtend':'selectDownUpExtendTop'">
        <div
            class="p-tree-single-panel"
            :style="{width: width + 'px', height: height + 'px'}"
            v-show="dropDownShow"
            @mouseenter="selectOptionEnter"
            @mouseleave="selectOptionLeave"
            @wheel.stop
        >
            <div class="p-select-drop-down-not" v-if="notFound">没有找到任何内容</div>
            <div class="p-select-drop-down-tree" v-else>
                <SelectOption
                    v-show="inputValue"
                    :selectedId="selectedId"
                    :data="searchData"
                    @click="optionClick"
                />
                <Tree v-show="!inputValue" :data="treeData" :lastStage='lastStage' @change="optionTreeClick" :style="{width: `${overWidth}px`}"/>
            </div>
        </div>
    </transition>
</template>
<script>
import SelectOption from '../../SelectOption/SelectOption';
import Tree from '../../Tree';

import { PackageTool, TileTool } from '../../static/utils/TreeTool';

export default {
    name: 'TreeSinglePanel',
    components: {
        SelectOption,
        Tree
    },
    methods: {
        selectOptionEnter() {
            this.$emit('modalStatus', false);
        },
        selectOptionLeave() {
            this.$emit('modalStatus', true);
        },
        /**
         * 提交当前选择的值
         * @param idStr 返回的id组 格式id000/id111/id2222
         */
        optionClick(idStr) {
            const idArr = idStr.split('/');
            const id = idArr.pop();

            const nameArr = this.searchData.find(d => d.id === idStr).name.replace(/<[^<>]+>/g, '').split('/');
            const name = nameArr.pop();

            this.$emit('changeChose', { id, name });
            this.setTreeDataChecked(this.treeData, idArr, id);
        },
        /**
         * 设置树形结构被选中
         * @param arrTree 树形结构数据
         * @param idArr 返回的id组 格式id000/id111/id2222
         * @param id 当前应该被选中的id
         */
        setTreeDataChecked(arrTree, idArr, id) {
            idArr.pop();
            const tileData = TileTool([], arrTree, '-1').map(d => {
                if (d.id === id) d.checked = 'checked';
                else d.checked = 'uncheck';
                return d;
            });
            this.treeData = PackageTool(tileData);
        },
        /**
         * 提交当前选择的值
         * @param obj 返回的选中的对象
         */
        optionTreeClick(obj) {
            this.$emit('changeChose', obj);
        }
    }
};
</script>

<style lang="stylus">
.p-tree-single-panel
    position absolute
    padding-top 8px
    background-color $theme
    border 1px solid $grey-300
    border-radius 4px
    box-shadow $box-shadow-bottom
    min-width 180px
    max-width 600px
    min-height 264px
    z-index 7500
    outline none
    .p-select-drop-down-tree
        height calc(100% - 8px)
        overflow-y auto
    .p-select-drop-down-not
        padding-left 12px
        color $grey-400
        font-size 14px

</style>
