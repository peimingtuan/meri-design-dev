<template>
    <div class="FileUpload">
        <h1 class="components-title">FileUploadView组件</h1>
        <div class="component component-padding">
            <h2 class="components-title-h2">组件类型 可选【 base drop 】</h2>
            <div class="upload">
                <section class="list">
                    <FileUpload
                        hosts='http://192.168.100.236:80/api'
                        action="/upload/meos"
                        :multiple="true"
                        @change="changeFile"
                        :defaultFileList='defaultFileList'
                        :maxNumber='10'
                        :previewMode='false'
                    />
                </section>
                <section class="list">
                    <FileUpload
                        type="drop"
                        :maxNumber='7'
                        hosts='http://192.168.100.236:80/api'
                        action="/upload/meos"
                        :multiple="true"
                        @change="changeFile"
                        :defaultFileList='defaultFileList'
                        :previewMode='false'
                    />
                </section>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FileUploadView',
    data() {
        return {
            defaultFileList: [],
            //  音频类
            // 	*.3gpp，*.ac3，*.asf，*.au，*.mp2，*.mp3，*.aac，*.adpcm，*.amr，
            // 	*.dsd，*.mp1，*.pcm，*.wma，*.wax
            // 	视频类
            // 	*.mp4，*.mpeg，*.mpg，*.avi，*.flv，*.m3u8，*.asf，*.wmv，*.mkv，
            // 	*.mov，*.ts，*.webm，*.3gp
            // 	文档类
            // 	*.css，*.csv，*.doc，*.dot，*.dtd，*.pdf，*.pot，*.pps，*.ppt，*.rtf，
            // 	*.txt，*.wps，*.xlc，*.xlm，*.xls，*.xlsm，*.xlsx，*.docx，*.pptx，*.odt，
            // 	*.xlsb，*.one，*.onetoc2，*.ppsm，*.ppsx，*.pptm，*.docm，*.dotm，
            // 	*.dotx，*.ods，
            // 	图片类
            // 	*.gif，*.jp2，*.jpe，*.jpeg，*.jpg，*.png，*.svf，*.tif，*.tiff，*.bmp，*.ai，
            // 	*.psd，*.eps
            // 	压缩文件
            // 	*.zip，*.rar
            // 	AutoCAD
            // 	*.dwg，*.dxf，*.dwt，*.dws
            // 	三维图纸格式
            // 	*.step，*.stp，*.part
            /**
             * 可上传的文件数
             */
            maxNumber: 4,
            /**
             * 接受上传的文件类型
             */
            accept: {
                type: Array,
                default: () => ['3gpp', 'ac3', 'asf', 'au', 'mp2', 'mp3', 'aac', 'adpcm', 'amr', 'dsd', 'mp1', 'pcm', 'wma', 'wax', 'mp4', 'mpeg', 'mpg',
                    'avi', 'flv', 'm3u8', 'asf', 'wmv', 'mkv', 'mov', 'ts', 'webm', '3gp', 'css', 'csv', 'doc', 'dot', 'dtd', 'pdf', 'pot', 'pps', 'ppt', 'rtf', 'txt',
                    'wps', 'xlc', 'xlm', 'xls', 'xlsm', 'xlsx', 'docx', 'pptx', 'odt', 'xlsb', 'one', 'onetoc2', 'ppsm', 'ppsx', 'pptm', 'docm', 'dotm', 'dotx',
                    'ods', 'gif', 'jp2', 'jpe', 'jpeg', 'jpg', 'png', 'svf', 'tif', 'tiff', 'bmp', 'ai', 'psd', 'eps', 'zip', 'rar', 'dwg', 'dxf', 'dwt', 'dws', 'step',
                    'stp', 'part']
            },
            /**
             * 上传是否可以选择多个
             */
            multiple: {
                type: Boolean,
                default: true
            }
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
.FileUpload
    .upload
        display flex

        .list
            margin-right 20px

</style>
