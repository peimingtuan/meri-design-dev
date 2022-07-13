<template>
    <div>
        <h2 class="components-title-h2">DropTrigger-触发器使用方式</h2>
        <br>
        <!--
        <DropTrigger
            caption="标题："
            width="200"
            :disabled="true"
        />
        <br><br><br>
        <DropTrigger
            caption="标题："
            width="200"
            :disabled="true"
            :selectedData="selectedDataSingle"
        />
        <br><br><br>
        <DropTrigger
            caption="标题："
            width="200"
            :selectedData="selectedDataSingle"
        />
        -->
        <br><br><br>
        <DropTrigger
            caption="标题"
            width="200"
            :multiple="true"
            :selectedData="selectedData"
            @click="dropClick"
        />
        <br><br><br>
        <!--
        <DropTrigger
            width="200"
            type="tag"
            :selectedData="selectedData"
        />
        -->
    </div>
</template>

<script>
import DropTrigger from '../../components/DropTrigger/DropTrigger';

export default {
    name: 'DropTriggerView',
    components: { DropTrigger },
    data() {
        return {
            dropShow: false,
            selectedData: [
                { id: '000', name: '零' },
                { id: '111', name: '壹壹' },
                { id: '222', name: '贰贰贰' },
                { id: '333', name: '贰贰贰' },
                { id: '444', name: '贰贰贰贰贰贰贰贰贰贰贰贰' },
                { id: '555', name: '贰贰贰贰贰贰贰贰贰' }
            ]
        };
    },
    methods: {
        dropClick() {
            this.dropShow = true;
        }
    }
};
</script>

<style lang="stylus" scoped>
</style>
