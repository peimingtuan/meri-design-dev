<template>
    <div class="image-upload">
        <h1 class="components-title">ImageUploadView组件</h1>
        <div class="component component-padding">
            <h2 class="components-title-h2">图片上传组件</h2>
            <div class="upload">
                <section class="list">
                    <ImageUpload
                        @change="changeFile"
                        hosts='http://192.168.100.236:80/api/'
                        action="/upload/meos"
                        :defaultFileList='defaultFileList'
                        :previewMode='false'
                        :multiple='true'
                        :maxNumber="1"
                    />
                </section>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ImageUploadView',
    data() {
        return {
            defaultFileList: []
        };
    },
    methods: {
        changeFile(data) {
            console.log(data);
        }
    }
};
</script>

<style lang="stylus" scoped>
.image-upload
    .upload
        display flex
        margin-top 20px

        .list
            width 500px
</style>
