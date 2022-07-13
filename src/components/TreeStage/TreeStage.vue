<template>
    <div class="p-tree">
        <TreeNode
                :lastStage="lastStage"
                v-for="(item, ind) in treeData"
                :key="item.id+'-'+ind"
                :treeItem="item"
                :triangleShow="!!(item.children&&item.children.length)"
                :index="String(ind)"
                :change="change"
        />
    </div>
</template>

<script>
    import TreeNode from './depend/treeNode';
    import { ChangeStatus } from '../static/utils/TreeTool';

    export default {
        name: "TreeStage",

        components: { TreeNode },
        props: {
            /**
             * 只能选择末级
             */
            lastStage: {
                type: Boolean,
                default: false
            },
            /**
             * 树形结构数据列表
             */
            data: {
                type: Array,
                default: () => []
            }
        },
        computed: {
            treeData: {
                get() {
                    return this.data;
                },
                set(newData) {
                    return newData;
                }
            }
        },
        methods: {
            /**
             * 点击某项
             * @param obj
             * @param index 索引串
             */
            change(obj, index) {
                let treeData=this.treeData;
                const { id }=obj;
                let checkedIds=[], checkedObj=[];

                if (!this.lastStage) {
                    let iArr=(index.split('-')); // 拿到索引值
                    iArr.pop(); // 这里不需要遍历最后一个索引的数据
                    this.changeParentChecked(treeData, iArr);
                }
                checkedObj=this.filterIds(treeData);
                checkedIds=checkedObj.map(d => d.id);
                /**
                 * 点击某项返回的数据
                 * @param id
                 * @param checkedIds 选择的id组，多选时才返回
                 * @param obj 选择的当前对象，多选时才返回
                 * @param checkedObj 选择的对象组，多选时才返回
                 * @type Function
                 */
                this.$emit('change', {id, checkedIds, obj, checkedObj});
            },
            /**
             * 筛选出选中的项
             * @param arr 接收选中的项
             * @param treeData 树形结构数据
             */
            getCheckedItem(arr, treeData) {
                treeData.forEach(d => {
                    if (d.checked==='checked') arr.push(d);
                    if (d.children && d.children.length) this.getCheckedItem(arr, d.children);

                    return arr;
                });
            },
            // 设置当前点击项的子项状态
            setChildStatus(data) {
                return data.map(d => {
                    // d.disabled = true;
                    this.$set(d, 'disabled', true);
                    if (d.children && d.children.length) d.children=this.setChildStatus(d.children);
                    return d;
                })
            },
            /**
             * 改变被筛选到的数据的状态
             * @param data
             * @param iArr
             */
            changeParentChecked(data, iArr) {
                // 当前筛选的数据
                const curr=[];
                this.currentData(data, iArr, curr);

                curr.forEach(d => {
                    const status=ChangeStatus(d.children);
                    d.checked=status;
                    if (status === 'checked') this.setChildStatus(d.children);
                });
            },
            /**
             * 递归筛选子项有选中的数据
             * @param data
             * @param iArr
             * @param curr 筛选到的数据放入数组
             */
            currentData(data, iArr, curr) {
                let ind=iArr.shift();
                data.forEach((d, i) => {
                    if (ind && i===Number(ind)) {
                        curr.unshift(d);
                        if (d.children && d.children.length) this.currentData(d.children, iArr, curr);
                    }
                });
            },
            /**
             *  筛选选中的id
             */
            filterIds(data) {
                let arr=[];
                this.recursionIds(data, arr);

                return arr;
            },
            /**
             * 筛选选中的id
             * @param data
             * @param arr
             */
            recursionIds(data, arr) {
                data.forEach(d => {
                    if (d.checked === 'checked') arr.push(d);
                    if (d.children && d.children.length) this.recursionIds(d.children, arr);
                });
            }
        }
    }
</script>

<style lang="stylus">
@import "../static/stylus/tree/tree.styl"

</style>