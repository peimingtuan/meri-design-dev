<template>
    <div class="p-file-upload" :style="{width: type === 'base' ? width + 'px' : '400px'}">
        <div
            v-if="type === 'base' && !previewMode && isShowTrigger"
            :class="['p-file-upload-base', disabledStatus ? 'p-file-upload-base-disabled' : '']"
        >
            <input
                class="p-add-file-input"
                type="file"
                :multiple="multiple"
                :accept="acceptExtend"
                :disabled="disabledStatus"
                @dragenter="inputDrag"
                @change="changeFileChose"
            />
<!--            <UploadSmall />-->
            <span class="p-label">
                <span class="p-name">点击上传 </span>
                <span class="p-tips">{{renderFileList.length + '/' + limitMaxNumber}}</span>
            </span>
        </div>
        <div
            v-if="type === 'drop' && !previewMode && isShowTrigger"
            :class="['p-file-upload-drop', disabledStatus ? 'p-file-upload-drop-disabled' : '']"
            @drop="drop"
            @dragenter="_suppress"
            @dragover="_suppress"
            @dragleave="leave"
        >
            <UploadLarge />
            <input
                class="p-add-file-input"
                type="file"
                :multiple="multiple"
                :accept="acceptExtend"
                :disabled="disabledStatus"
                @change="changeFileChose"
            />
            <span class="p-name">点击或将文件拖拽到这里上传（{{renderFileList.length + '/' + limitMaxNumber}}）</span>
            <span class="p-tips p-tips-accept">支持扩展名：{{accept.join(' ')}}</span>
        </div>
        <div
            v-if="type === 'mobile' && !previewMode && isShowTrigger"
            :class="['p-file-upload-mobile', disabledStatus ? 'p-file-upload-mobile-disabled' : '']"
        >
            <Add style="width:16px;height:16px;"/>
            <input
                class="p-add-file-input"
                type="file"
                :multiple="multiple"
                :accept="acceptExtend"
                :disabled="disabledStatus"
                @change="changeFileChose"
            />
        </div>
        <div class="p-list-box" :style="type === 'base' ? baseStyle : ''">
          <div class="p-upload-list" :style="{marginRight: type === 'base' ? '20px' : '0'}"  v-for="(item, index) in renderFileList" :key="index">
              <component :is="handleFileIcon(item.name)" />
              <div class="p-upload-list-item" :style="{marginRight: item.status === 'pending' ? '5px' : 0}">
                  <div class="p-file-info">
                      <span class="p-file-name">{{ item.name }}</span>
                      <span class="p-err-tips" v-show="item.status === 'fail'">{{type === 'mobile' ? '上传失败' : '文件上传失败'}}</span>
                      <span @click="reUpload(item)" v-show="item.status === 'fail'" class="p-file-handle-button">重试</span>
                      <span
                          @click="downloadFile(item)"
                          v-show="item.status === 'done'"
                          class="p-file-handle-button p-file-handle-download"
                      >下载</span>
                  </div>
                  <div class="p-progress-bar" v-if="item.status === 'pending'">
                      <div class="p-progress-rate" :style="{width: item.progressRate + '%'}"></div>
                  </div>
              </div>
              <Delete class="p-upload-delete-icon" v-if="item.status !== 'pending' && !previewMode" @click.native="deleteFile(item)" />
              <div v-if="item.status === 'pending' && !previewMode" class="loading">
                  <i></i>
              </div>
          </div>
        </div>
    </div>
</template>
<script>
import UploadLarge from '../static/iconSvg/upload_large.svg';
import UploadSmall from '../static/iconSvg/upload_small.svg';
import Delete from '../static/iconSvg/delete_icon.svg';
import Add from '../static/iconSvg/add.svg';
// 文件类型icon
import Excel from '../static/iconSvg/excel.svg';
import Zip from '../static/iconSvg/zip.svg';
import Video from '../static/iconSvg/video.svg';
import Music from '../static/iconSvg/music.svg';
import Ppt from '../static/iconSvg/ppt.svg';
import Pdf from '../static/iconSvg/pdf.svg';
import Word from '../static/iconSvg/word.svg';
import Pic from '../static/iconSvg/pic.svg';
import File from '../static/iconSvg/file.svg';
import Cad from '../static/iconSvg/cad.svg';

import Message from '../Message';
import ajax from '../static/utils/Ajax';
import cloneDeep from '../static/utils/CloneDeep';
// const _SheetJSFT = [ "xlsx", "xlsb", "xlsm", "xls", "csv" ].map(function(x) { return "." + x; }).join(",");
export default {
    name: 'FileUpload',
    components: {
        UploadLarge,
        UploadSmall,
        Excel,
        Zip,
        Video,
        Music,
        Ppt,
        Pdf,
        Word,
        Pic,
        File,
        Cad,
        Delete,
        Add
    },
    data() {
        return {
            isDrop: false, // 设置文件输入框的改变
            currentChoseFiles: [], // 当前选中的文件暂存
            renderFileList: [], // 显示上传的文件列表
            progressRate: 0, // 上传进度率
            baseStyle: {
                display: 'flex',
                flexWrap: 'wrap'
            }
        };
    },
    props: {
        /**
         * 文件服务器根路径
         */
        hosts: {
            type: String,
            required: true
        },
        /**
         * 可上传的文件数
         */
        maxNumber: {
            type: Number,
            default: 4
        },
        /**
         * 组件类型 可选【 base drop 】
         */
        type: {
            type: String,
            default: 'base'
        },
        /**
         * 接受上传的文件类型
         */
        accept: {
            type: Array,
            default: () => [
                '3gpp', 'ac3', 'asf', 'au', 'mp2', 'mp3', 'aac', 'adpcm', 'amr', 'dsd', 'mp1', 'pcm', 'wma', 'wax', 'mp4', 'mpeg', 'mpg',
                'avi', 'flv', 'm3u8', 'asf', 'wmv', 'mkv', 'mov', 'ts', 'webm', '3gp', 'css', 'csv', 'doc', 'dot', 'dtd', 'pdf', 'pot', 'pps', 'ppt', 'rtf', 'txt',
                'wps', 'xlc', 'xlm', 'xls', 'xlsm', 'xlsx', 'docx', 'pptx', 'odt', 'xlsb', 'one', 'onetoc2', 'ppsm', 'ppsx', 'pptm', 'docm', 'dotm', 'dotx',
                'ods', 'gif', 'jp2', 'jpe', 'jpeg', 'jpg', 'png', 'svf', 'tif', 'tiff', 'bmp', 'ai', 'psd', 'eps', 'zip', 'rar', 'dwg', 'dxf', 'dwt', 'dws', 'step',
                'stp', 'part'
            ]
        },
        /**
         * 上传请求的地址
         */
        action: {
            type: String,
            required: true
        },
        /**
         * 上传是否可以选择多个
         */
        multiple: {
            type: Boolean,
            default: true
        },
        /**
         * 回显 change事件返回的数据结构
         */
        defaultFileList: {
            type: Array,
            default: () => []
        },
        /**
         * 预览模式，为true则只做预览
         */
        previewMode: {
            type: Boolean,
            default: false
        },
        /**
         * 超出最大限制数量后，以哪种模式显示触发器
         */
        showTrigger: {
            type: Boolean,
            default: true
        },
        maxFileSize: {
            type: Number,
            default: 5
        },
        width: {
            type: Number / String,
            default: 400
        }
    },
    computed: {
        // 限制上传
        disabledStatus() {
            return this.renderFileList.length >= this.limitMaxNumber;
        },
        // 允许上传的文件类型
        acceptExtend() {
            return this.accept.map((x) => `.${x}`).join(',');
        },
        // 最大限制数
        limitMaxNumber() {
            return this.maxNumber > 9 ? 9 : this.maxNumber;
        },
        isShowTrigger() {
            return this.disabledStatus ? this.showTrigger : true;
        }
    },
    watch: {
        defaultFileList: {
            handler(newVal, oldVal) {
                const templateList = cloneDeep(this.defaultFileList),
                    flag = !this.previewMode ? templateList.length > this.limitMaxNumber : false;
                if (flag) templateList.splice(this.limitMaxNumber, templateList.length - 1);
                this.renderFileList = templateList;
            },
            deep: true
        }
    },
    mounted() {
        const templateList = cloneDeep(this.defaultFileList),
            flag = !this.previewMode ? templateList.length > this.limitMaxNumber : false;
        if (flag) templateList.splice(this.limitMaxNumber, templateList.length - 1);
        this.renderFileList = templateList;
    },
    methods: {
        // 文件上传框的拖拽事件
        inputDrag(evt) {
            this.isDrop = true;
            return false;
        },
        // 文件拖拽阻止默认事件
        _suppress(evt) {
            evt.stopPropagation();
            evt.preventDefault();
            if (this.disabledStatus) return false;
            evt.currentTarget.style.borderColor = '#0091ff';
        },
        // 拖拽事件离开目标区域
        leave(evt) {
            evt.stopPropagation();
            evt.preventDefault();
            evt.currentTarget.style.borderColor = '#c3c7cb';
        },
        // 文件拖拽事件
        drop(evt) {
            evt.stopPropagation();
            evt.preventDefault();
            // 上传文件已经大于等于限制上传数
            if (this.disabledStatus) return false;
            evt.currentTarget.style.borderColor = '#c3c7cb';
            let originFiles = evt.dataTransfer.files,
                targetFiles = [];
            if (!this.multiple) {
                if (!this.checkFileType(originFiles)) { return false; }
                targetFiles.push(originFiles[0]);
                this.fileReader(targetFiles);
            } else {
                if (!this.checkFileType(originFiles)) { return false; }
                // 上传文件加上当前上传文件数已经大于等于限制上传数
                if (this.renderFileList.length + originFiles.length >= this.limitMaxNumber) {
                    for (let i = 0; i < this.limitMaxNumber - this.renderFileList.length; i++) {
                        targetFiles.push(originFiles[i]);
                    }
                } else {
                    targetFiles = originFiles;
                }
                this.fileReader(targetFiles);
            }
        },
        // 检查拖拽上传的文件是否符合accept限制的文件类型
        checkFileType(files) {
            let flag = true;
            for (let i = 0; i < files.length; i++) {
                const item = files[i],
                    fileType = item.name.split('.').pop();
                if (this.accept.findIndex(item => item.toLocaleLowerCase() === fileType.toLocaleLowerCase()) === -1) {
                    Message.error('含有非支持文件格式');
                    flag = false;
                    return false;
                }
            }
            return flag;
        },
        // 文件上传事件
        changeFileChose(evt) {
            if (this.isDrop) {
                evt.target.value = null;
                this.isDrop = false;
                return false;
            }
            let { files } = evt.target;
            if (!this.checkFileType(files)) { return false; }
            // 上传文件加上当前上传文件数已经大于等于限制上传数
            if (this.renderFileList.length + files.length >= this.limitMaxNumber) {
                const templateFiles = [];
                for (let i = 0; i < this.limitMaxNumber - this.renderFileList.length; i++) {
                    templateFiles.push(files[i]);
                }
                files = templateFiles;
            }
            if (files) this.fileReader(files);
            evt.target.value = null;
        },
        /**
         * 文件上传读取的处理
         *
         */
        fileReader(files) {
            this.currentChoseFiles = [];
            for (let index = 0; index < files.length; index++) {
                const item = files[index];
                // 把每一次上传的文件做一个暂存，上传失败可重试
                this.currentChoseFiles.push(item);
                this.featchUpload(item);
            }
        },
        /**
         * 上传文件
         */
        featchUpload(fileItem) {
            if ((fileItem.size / 1024 / 1024) > this.maxFileSize) {
                this.$emit('fileSizeLimit', fileItem);
                return false;
            }
            const _currentIndex = this.renderFileList.findIndex(item => item.name === fileItem.name);
            if (_currentIndex !== -1) {
                this.renderFileList.splice(_currentIndex, 1, {
                    status: 'pending',
                    name: fileItem.name,	// 文件名
                    progressRate: 0
                });
            } else {
                this.renderFileList.push({
                    status: 'pending',
                    name: fileItem.name,	// 文件名
                    progressRate: 0
                });
            }
            const _this = this,
                formData = new FormData();
            formData.append('file', fileItem);
            ajax({
                type: 'POST',
                url: `${this.hosts}${this.action}`,
                onprogress: (event) => {
                    _this.setProgress(event, fileItem);
                },
                dataType: 'json',
                data: formData,
                success(response) {
                    const _data = typeof response === 'string' ? JSON.parse(response) : response;
                    _this.handleData(fileItem, _data, 'done');
                },
                error(error) {
                    _this.handleData(fileItem, error, 'fail');
                }
            });
        },
        // 文件上传的进度处理
        setProgress(event, file) {
            const _index = this.renderFileList.findIndex(item => item.name === file.name);
            const loading = Math.round(event.loaded / event.total * 100);
            this.renderFileList.splice(_index, 1, {
                status: 'pending',
                name: file.name,	// 文件名
                progressRate: loading
            });
        },
        /**
         * 处理上传返回的数据
         * 参数 【当前上传文件，当前返回值，上传状态】
         */
        handleData(fileItem, response, status) {
            const _this = this,
                _currentIndex = _this.renderFileList.findIndex(item => item.name === fileItem.name);
            if (_currentIndex !== -1) {
                // 判断上传是否成功
                if (status === 'done') {
                    const templateFile = {
                        id: response.url, // 唯一标识，使用接口返回的url
                        name: fileItem.name, // 文件名
                        status,					// 上传状态
                        url: response.url,		// 文件的url
                        suffix: response.suffix,	// 文件格式
                        progressRate: 100,	// 上传进度
                        size: response.size
                    };
                    _this.renderFileList.splice(_currentIndex, 1, templateFile);
                } else {
                    // 上传不成功
                    const templateFile = {
                        id: '', // 唯一标识，使用接口返回的url
                        name: fileItem.name,	// 文件名
                        status,					// 上传状态
                        url: '',		// 文件的url
                        suffix: '',	// 文件格式
                        progressRate: 0,	// 上传进度
                        size: 0
                    };
                    _this.renderFileList.splice(_currentIndex, 1, templateFile);
                }
            }
            this.$emit('change', this.renderFileList);
        },
        // 重试上传
        reUpload(data) {
            this.currentChoseFiles.forEach(item => {
                if (item.name === data.name) {
                    this.fileReader([item]);
                }
            });
        },
        // 删除当前项，返回当前项的数据，并删除当前项
        deleteFile(data) {
            const currentIndex = this.renderFileList.findIndex(item => item.name === data.name);
            this.renderFileList.splice(currentIndex, 1);
            this.$emit('change', this.renderFileList);
        },
        // 下载
        async downloadFile(data) {
            // 下载资源方法
            const url = `${this.hosts}${data.id}`;
            const response = await fetch(url),
                blob = await response.blob(),
                objectUrl = window.URL.createObjectURL(blob),
                aTag = document.createElement('a');

            aTag.href = objectUrl;
            aTag.download = data.name;
            aTag.click();
            aTag.remove();
        },
        // 处理当前文件的显示icon
        handleFileIcon(fileName) {
            let targetFileType = fileName.split('.').pop(),
                targetIcon = 'Excel';
            const targetIconObj = {
                excel: { originType: ['xlsx', 'xls'], icon: 'Excel' },
                zip: { originType: ['zip', 'rar'], icon: 'Zip' },
                video: { originType: ['mp4', 'mpeg', 'mpg', 'avi', 'flv', 'm3u8', 'asf', 'wmv', 'mkv', 'mov', 'ts', 'webm', '3gp'], icon: 'Video' },
                music: { originType: ['3gpp', 'ac3', 'asf', 'au', 'mp2', 'mp3', 'aac', 'adpcm', 'amr', 'dsd', 'mp1', 'pcm', 'wma', 'wax'], icon: 'Music' },
                ppt: { originType: ['ppt', 'pptx'], icon: 'Ppt' },
                pdf: { originType: ['pdf'], icon: 'Pdf' },
                word: { originType: ['doc', 'docx'], icon: 'Word' },
                pic: { originType: ['gif', 'jp2', 'jpe', 'jpeg', 'jpg', 'png', 'svf', 'tif', 'tiff', 'bmp', 'ai', 'psd', 'eps'], icon: 'Pic' },
                file: {
                    originType: ['css', 'csv', 'dot', 'dtd', 'pot', 'pps', 'rtf', 'txt', 'wps', 'xlc', 'xlm', 'xlsm', 'odt',
                        'xlsb', 'one', 'onetoc2', 'ppsm', 'ppsx', 'pptm', 'docm', 'dotm', 'dotx', 'ods'],
                    icon: 'File'
                },
                cad: { originType: ['dwg', 'dxf', 'dwt', 'dw', 'step', 'stp', 'part'], icon: 'Cad' }
            };
            for (const key in targetIconObj) {
                const item = targetIconObj[key],
                    typeIndex = item.originType.findIndex(item => item === targetFileType);
                if (typeIndex !== -1) {
                    targetIcon = item.icon;
                }
            }
            return targetIcon;
        }
    }
};
</script>
<style lang="stylus">
.p-file-upload
    font-size 0
    width: 400px
    overflow: hidden
    //background: $theme
    display inline-block
    .p-add-file-input
        position: absolute
        left 0
        top 0
        width: 100%
        height: 100%
        opacity: 0
        cursor pointer
    .p-file-upload-base
        position: relative
        width: 130px
        height: 32px
        background-color: $theme
        border: 1px solid $grey-400
        //display: inline-flex
        padding: 0 8px
        //justify-content: center
        //align-items: center
        border-radius: 4px
        transition all .36s
        cursor pointer
        .p-label
            display inline-flex
            justify-content center
            align-items center
            width 100%
            height 100%
            cursor pointer
            .p-name
                margin-right 8px
                font-size: 14px
                font-weight: 400
                color $grey-900
                line-height: 22px
            .p-tips
                font-size: 14px
                font-weight: 400
                color: $grey-500
                line-height: 22px
        &:hover
            border: 1px solid $blue-500
            color: $blue-500
            .p-name
                color: $blue-500
            .p-tips
                color: $blue-500
            svg
                g
                    path
                        fill: $blue-500
    .p-file-upload-base-disabled
        color: $grey-400
        font-weight: 400
        background: $grey-200
        border: none
        .p-label
            cursor not-allowed
            .p-name
                color: $grey-400
            .p-tips
                color: $grey-400
        .p-add-file-input
            cursor: default
        svg
            g
                path
                    fill: $grey-400
        &:hover
            border: none
            color: $grey-400
            cursor: default
            .p-name
                color: $grey-400
            .p-tips
                color: $grey-400
            svg
                g
                    path
                        fill: $grey-400
    .p-file-upload-drop
        position: relative
        width: 400px
        height: 200px
        background-color: $grey-50
        border-radius: 4px
        border: 1px dashed $grey-400
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        cursor: pointer
        transition all .36s
        .p-name
            font-size: 16px
            font-weight: 400
            color $grey-900
            line-height: 24px
            margin-bottom: 4px
            margin-top: 16px
        .p-tips
            font-size 14px
            font-weight: 400
            color: $grey-500
            line-height: 22px
        .p-tips-accept
            width 90%
            overflow hidden
            white-space nowrap
            text-overflow ellipsis
        &:hover
            border-color: $blue-500 !important
    .p-file-upload-drop-disabled
        cursor: default
        .p-add-file-input
            cursor: default
        .p-name
            color: $grey-400
        .p-tips
            color: $grey-400
        &:hover
            border-color: $grey-400 !important
        svg
            g
                path
                    fill: $grey-400
                rect
                    fill: $grey-400
    .p-file-upload-mobile
        position: relative
        width: 400px
        height: 48px
        background-color: $grey-50
        border-radius: 4px
        border: 1px dashed $grey-400
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        cursor: pointer
        transition all .36s
        >svg >path
          fill: $grey-400
        &:hover
            border-color: $blue-500 !important
    .p-file-upload-mobile-disabled
      cursor: default
      background: #EFF0F1
      .p-add-file-input
        cursor: default
      &:hover
        border-color: $grey-400 !important
    .p-upload-list
        width: 400px
        height: 48px
        background: $grey-50
        border-radius: 4px
        border: 1px solid $grey-300
        margin-top: 16px
        display: flex
        justify-content: space-between
        align-items: center
        padding: 10px 16px
        .loading
            position relative
            display: block;
            width 16px
            height 16px
            top: 0;
            left: 0;
            z-index: 7000;
            >i
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                width: 16px;
                height: 16px;
                border: 1px solid $blue-500;
                border-right-color: transparent;
                border-radius: 50%;
                animation: loadingAnimation 0.8s infinite Linear;
                margin: auto;
        .p-upload-list-item
            width: calc(100% - 40px)
            .p-file-info
                padding-left: 8px
                padding-right: 16px
                display: flex
                justify-content: space-between
                line-height: 22px
                .p-file-name
                    font-size: 14px
                    font-weight: 400
                    color: $grey-900
                    line-height: 20px
                    width: 50%
                    word-break: keep-all
                    overflow: hidden
                    white-space: nowrap
                    text-overflow: ellipsis
                .p-err-tips
                    font-size: 14px
                    font-weight: 400
                    line-height: 20px
                    color: $red-600
                    padding-right: 16px
                    padding-left: 20px
                    text-align: right
                .p-file-handle-button
                    font-size: 14px
                    line-height: 20px
                    width: 28px
                    float: right
                    color: $blue-500
                    cursor: pointer
            .p-progress-bar
                margin-left: 9px
                height: 2px
                background: $grey-300
                border-radius: 1px
                margin-top: 4px
                .p-progress-rate
                    width: 0
                    height: 2px
                    background: $blue-500
                    border-radius: 1px
                    transition: width 2s
        .p-upload-delete-icon
            cursor:pointer
            width:16px
            height:16px
            path
                transition fill .36s
            &:hover
                path
                    fill $blue-500
@keyframes loadingAnimation
    from
        transform: rotate(0deg)
    to
        transform rotate(360deg)
</style>
