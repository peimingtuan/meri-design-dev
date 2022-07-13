import Vue from 'vue';

import RemoveDom from '../static/utils/RemoveDom';

import IL from './IndexLoading';

const LoadingExtend = Vue.extend(IL);

let vm = null; // 当前实例

const IndexLoading = () => {
    const dom = document.body;
    vm = new LoadingExtend(); // 实例化
    vm = vm.$mount(); // 挂载

    dom.appendChild(vm.$el); // 插入dom

    return vm;
};

IndexLoading.remove = RemoveDom;

export default IndexLoading;
