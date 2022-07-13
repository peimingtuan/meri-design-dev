<template>
    <div class="split-button-view">
        <div class="component component-padding">
             <h1 class="components-title">Button组件</h1>
            <div class="btn">
                 <h2 class="components-title-h2">size=large</h2>
                <DropDownButton transfer="appContent" @click="tap" type="default" size="large" drop-down-type="split-drop" interactive="tap" :drop-down-list="dropDownList" v-model="value">Click me</DropDownButton>
                <DropDownButton @click="tap" @change="change" :active="false" type="primary" size="large" drop-down-type="split-drop" interactive="tap" :drop-down-list="dropDownList" v-model="value">Click me</DropDownButton>
                <DropDownButton @click="tap" type="default" size="large" drop-down-type="split-drop" interactive="hover" :drop-down-list="dropDownList" v-model="value">Hover me</DropDownButton>
                <DropDownButton @click="tap" type="primary" size="large" drop-down-type="split-drop" interactive="hover" :drop-down-list="dropDownList" v-model="value">Hover me</DropDownButton>
                <DropDownButton @click="tap" type="default" size="large" drop-down-type="drop" interactive="tap" :drop-down-list="dropDownList" v-model="value">Click me</DropDownButton>
                <DropDownButton @click="tap" type="primary" size="large" drop-down-type="drop" interactive="tap" :drop-down-list="dropDownList" v-model="value">Click me</DropDownButton>
                <DropDownButton @click="tap" type="default" size="large" drop-down-type="drop" interactive="hover" :drop-down-list="dropDownList" v-model="value">Hover me</DropDownButton>
                <DropDownButton @click="tap" type="primary" size="large" drop-down-type="drop" interactive="hover" :drop-down-list="dropDownList" v-model="value">Hover me</DropDownButton>
                <DropDownButton @click="tap" type="default" size="large" drop-down-type="default-drop" interactive="tap" :drop-down-list="dropDownList" v-model="value">Click me</DropDownButton>
                <DropDownButton @click="tap" type="default" size="large" drop-down-type="default-drop" interactive="hover" :drop-down-list="dropDownList" v-model="value">Hover me</DropDownButton>
                <DropDownButton @click="tap" type="primary" size="large" drop-down-type="default-drop" interactive="hover" :drop-down-list="dropDownList" v-model="value" :disabled="true">Hover me</DropDownButton>
                <DropDownButton @click="tap" type="primary" size="large" drop-down-type="split-drop" interactive="hover" :drop-down-list="dropDownList" v-model="value" :disabled="true">Hover me</DropDownButton>
            </div>
            <div class="btn">
                 <h2 class="components-title-h2">size=medium</h2>
                <DropDownButton @click="tap" type="default" drop-down-type="split-drop" interactive="tap" :drop-down-list="dropDownList" v-model="value">Click me</DropDownButton>
                <DropDownButton @click="tap" type="primary" drop-down-type="split-drop" interactive="tap" :drop-down-list="dropDownList" v-model="value">Click me</DropDownButton>
                <DropDownButton @click="tap" type="default" drop-down-type="split-drop" interactive="hover" :drop-down-list="dropDownList" v-model="value">Hover me</DropDownButton>
                <DropDownButton @click="tap" type="primary" drop-down-type="split-drop" interactive="hover" :drop-down-list="dropDownList" v-model="value">Hover me</DropDownButton>
                <DropDownButton @click="tap" type="default" drop-down-type="drop" interactive="tap" :drop-down-list="dropDownList" v-model="value">Click me</DropDownButton>
                <DropDownButton @click="tap" type="primary" drop-down-type="drop" interactive="tap" :drop-down-list="dropDownList" v-model="value">Click me</DropDownButton>
                <DropDownButton @click="tap" type="default" drop-down-type="drop" interactive="hover" :drop-down-list="dropDownList" v-model="value">Hover me</DropDownButton>
                <DropDownButton @click="tap" type="primary" drop-down-type="drop" interactive="hover" :drop-down-list="dropDownList" v-model="value">Hover me</DropDownButton>
                <DropDownButton @click="tap" type="default" drop-down-type="default-drop" interactive="tap" :drop-down-list="dropDownList" v-model="value">Click me</DropDownButton>
                <DropDownButton @click="tap" type="default" drop-down-type="default-drop" interactive="hover" :drop-down-list="dropDownList" v-model="value">Hover me</DropDownButton>
                <DropDownButton @click="tap" type="primary" drop-down-type="default-drop" interactive="hover" :drop-down-list="dropDownList" v-model="value" :disabled="true">Hover me</DropDownButton>
                <DropDownButton @click="tap" type="primary" drop-down-type="split-drop" interactive="hover" :drop-down-list="dropDownList" v-model="value" :disabled="true">Hover me</DropDownButton>
            </div>
            <div class="btn">
                 <h2 class="components-title-h2">size=small</h2>
                <DropDownButton @click="tap" type="default" size="small" drop-down-type="split-drop" interactive="tap" :drop-down-list="dropDownList" v-model="value">Click me</DropDownButton>
                <DropDownButton @click="tap" type="primary" size="small" drop-down-type="split-drop" interactive="tap" :drop-down-list="dropDownList" v-model="value">Click me</DropDownButton>
                <DropDownButton @click="tap" type="default" size="small" drop-down-type="split-drop" interactive="hover" :drop-down-list="dropDownList" v-model="value">Hover me</DropDownButton>
                <DropDownButton @click="tap" type="primary" size="small" drop-down-type="split-drop" interactive="hover" :drop-down-list="dropDownList" v-model="value">Hover me</DropDownButton>
                <DropDownButton @click="tap" type="default" size="small" drop-down-type="drop" interactive="tap" :drop-down-list="dropDownList" v-model="value">Click me</DropDownButton>
                <DropDownButton @click="tap" type="primary" size="small" drop-down-type="drop" interactive="tap" :drop-down-list="dropDownList" v-model="value">Click me</DropDownButton>
                <DropDownButton @click="tap" type="default" size="small" drop-down-type="drop" interactive="hover" :drop-down-list="dropDownList" v-model="value">Hover me</DropDownButton>
                <DropDownButton @click="tap" type="primary" size="small" drop-down-type="drop" interactive="hover" :drop-down-list="dropDownList" v-model="value">Hover me</DropDownButton>
                <DropDownButton @click="tap" type="default" size="small" drop-down-type="default-drop" interactive="tap" :drop-down-list="dropDownList" v-model="value">Click me</DropDownButton>
                <DropDownButton @click="tap" type="default" size="small" drop-down-type="default-drop" interactive="hover" :drop-down-list="dropDownList" v-model="value">Hover me</DropDownButton>
                <DropDownButton @click="tap" type="primary" size="small" drop-down-type="default-drop" interactive="hover" :drop-down-list="dropDownList" :disabled="true">Hover me</DropDownButton>
                <DropDownButton @click="tap" type="primary" size="small" drop-down-type="split-drop" interactive="hover" :drop-down-list="dropDownList" :disabled="true">Hover me</DropDownButton>
            </div>
        </div>
        <div class="component component-padding">
            <Button type="default" @click="openModal">打开弹窗</Button>
        </div>
        <Modal :show="modalStatusDefault" title="弹窗提示" :iconLoading="true" mode="default" @close="modalClose" @confirm="modalConfirm">
            <div style="font-size: 20px; width: 600px">
                <DropDownButton transfer="p-modal-content" @click="tap" type="default" size="large" drop-down-type="split-drop" interactive="tap" :drop-down-list="dropDownList" v-model="value">Click me</DropDownButton>
                <DropDownButton transfer="body" @click="tap" type="default" size="large" drop-down-type="split-drop" interactive="tap" :drop-down-list="dropDownList" v-model="value">Click me</DropDownButton>
                <DropDownButton :transfer="transfer" @click="tap" type="default" size="large" drop-down-type="split-drop" interactive="tap" :drop-down-list="dropDownList" v-model="value">Click me</DropDownButton>
                <Button type="default" @click="transfer = 'body'">改变transfer body</Button>
                <Button type="default" @click="transfer = 'p-modal-content'">改变transfer p-modal-content</Button>
                <br><br><br><br><br><br><br><br>
                <br><br><br><br><br><br><br><br>
                <br><br><br><br><br><br><br><br>
                <br><br><br><br><br><br><br><br>
                <br><br><br><br><br><br><br><br>
            </div>
        </Modal>

    </div>
</template>

<script>
export default {
    name: 'DropDownButtonView',
    data() {
        return {
            transfer: 'parent',
            modalStatusDefault: false,
            value: '',
            dropDownList: [
                {
                    id: '1',
                    name: 'option1',
                    disabled: false
                },
                {
                    id: '2',
                    name: 'option2',
                    disabled: false
                },
                {
                    id: '3',
                    name: 'option3',
                    disabled: true
                }
            ]
        };
    },
    watch: {
        value(o, n) {
            console.log(o);
        }
    },
    methods: {
        openModal() {
            this.modalStatusDefault = true;
        },
        modalClose() {
            this.modalStatusDefault = false;
        },
        modalConfirm() {
            console.log('alertConfirm');
        },
        tap() {
            console.log('click');
        },
        change(item) {
            console.log(item);
        }
    }
};
</script>

<style lang="stylus" scoped>
    //.split-button-view
    //    width 1000px
    //    height 800px

</style>
