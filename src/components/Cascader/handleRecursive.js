/*
 * @Author: your name
 * @Date: 2020-10-28 17:48:26
 * @LastEditTime: 2020-10-29 19:12:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \md-dev\src\components\Cascader\handleRecursive.js
 */
export default {
    methods: {
        recursiveSetChecked(data, status, disabled) {
            if (data.children && data.children.length) {
                data.children.forEach(item => {
                    if (item.disabled) return;
                    item.checked = status;
                    if (typeof disabled !== 'undefined') {
                        this.$set(item, 'forbidden', disabled);
                    }
                    this.recursiveSetChecked(item, status, disabled);
                });
            }
        },

        checkParent(data) {
            if (this.type !== 'normal') return;
            const parent = this.flatData.find(option => data.parentId === option.nodekey);
            if (!parent || !parent.children) {
                return;
            }
            const { children } = parent;
            if (parent && children && children.length) {
                const selectedLen = children.filter(item => item.checked === 'checked').length;
                const uncheckLen = children.filter(item => item.checked === 'notNull').length;
                const allLen = children.length;
                if (parent) {
                    if (selectedLen === allLen) {
                        parent.checked = 'checked'; // 全选
                    }
                    if (!selectedLen) {
                        parent.checked = 'uncheck'; // 全不选
                    }
                    if ((selectedLen && selectedLen < allLen) || uncheckLen) { // 不全选 不全不选
                        parent.checked = 'notNull';
                    }
                    this.checkParent(parent);
                }
            }
        },
        handleItemStatus(vm, item) {
            if (!item.disabled) {
                if (vm.type === 'final') {
                    if (item.selectCheckbox) {
                        item.checked = 'checked';
                        item.active = true;
                    }
                } else {
                    item.checked = 'checked';
                    if (vm.type === 'normal') {
                        vm.recursiveSetChecked(item, 'checked');
                        vm.checkParent(item);
                    }
                    if (vm.type === 'forbidden') {
                        vm.recursiveSetChecked(item, 'checked', true);
                    }
                }
            }
        }
    }
};
