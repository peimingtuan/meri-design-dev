<template>
    <div class="p-image-upload">
        <div v-if="!previewMode && (disabledStatus ? showTrigger : true)" :class="['p-image-upload-centent', disabledStatus ? 'p-image-upload-disabled' : '']">
            <Add />
            <input
                class="p-add-image-input"
                type="file"
                :multiple="multiple"
                :accept="acceptExtend"
                :disabled="disabledStatus"
                @dragenter="inputDrag"
                @change="changeFileChose"
            />
            <span class="p-label">添加图片</span>
            <span class="p-number">{{`${renderImageList.length}/${limitMaxNumber}`}}</span>
        </div>
        <div
            :class="['p-image-list',`p-image-list-${item.status}`]"
            v-for="(item, index) in renderImageList"
            :key="index"
        >
<!--            <Delete v-if="!previewMode" @click="deleteImage(item)" class="p-delete-icon" />-->
            <Delete v-if="!previewMode" @click.native="deleteImage(item)" class="p-delete-icon" />
            <template v-if="item.status === 'pending'">
                <span class="p-list-label">上传中</span>
                <div class="p-progress-bar">
                    <div class="p-progress-rate" :style="{width: item.progressRate + '%'}"></div>
                </div>
            </template>
            <template v-if="item.status === 'done'">
                <div class="p-small-image-box">
                    <img
                        @click="showBigImage(item)"
                        class="p-list-image"
                        :src="hosts + item.id" alt="image">
                </div>
            </template>
            <template v-if="item.status === 'fail'">
                <FailImg class="p-fail-icon" />
                <span class="p-fail-text">上传图片失败</span>
            </template>
        </div>
        <div class="p-image-modal" v-show="displayModal">
            <div class="p-image-modal-back"></div>
            <div class="p-image-header">
                <div class="p-size-box">
                    <OriginalSize v-if="!isZoomImage" />
                    <SmallImage v-else />
                    <span class="p-size-label" @click="resetOriginSize" v-if="!isZoomImage">原始尺寸</span>
                    <span class="p-size-label" @click="adaptionScreen" v-else>适应屏幕</span>
                </div>
                <div class="p-download-box" @click="downloadFile">
                    <Download />
                    <span class="p-size-label">下载原图</span>
                </div>
                <div class="p-close-box">
                    <Close @click.native="closeImageModal" />
                </div>
            </div>
            <div class="p-image-content">
                <span v-if="changeLimit !== 'first' && changeLimit !== 'all'"
                      class="p-control p-control-left"
                      @click="changeCurrentImage('prev')"
                    >
                    <Left />
                </span>
                <div ref="imageBox" class="p-image-box" @mousewheel="zoomImage" @DOMMouseScroll="zoomImage">
                    <img
                        ref="scaleImage"
                        @mousedown="imageChosed"
                        @mousemove="imageMove"
                        @mouseup="imageUp"
                        @mouseleave="imageLeave"
                        @drop="defaultDrag"
                        @dragstart="defaultDrag"
                        class="p-big-image"
                        :src="hosts + currentImageId"
                        alt="图片名字"
                    />
                </div>
                <span @click="changeCurrentImage('next')" v-if="changeLimit !== 'last' && changeLimit !== 'all'" class="p-control p-control-right">
                    <Left />
                </span>
            </div>
        </div>
    </div>
</template>
<script>
import Add from '../static/iconSvg/add.svg';
import Delete from '../static/iconSvg/clear2.svg';
import FailImg from '../static/iconSvg/fail_img.svg';
import Left from '../static/iconSvg/left.svg';
import Close from '../static/iconSvg/close.svg';
import Download from '../static/iconSvg/download.svg';
import OriginalSize from '../static/iconSvg/original_size.svg';
import SmallImage from '../static/iconSvg/small_image.svg';

import Message from '../Message';
import ajax from '../static/utils/Ajax';

export default {
    name: 'ImageUpload',
    components: {
        Add,
        Delete,
        FailImg,
        Close,
        Download,
        OriginalSize,
        SmallImage,
        Left
    },
    data() {
        return {
            changeLimit: '', // 切换图片限制
            currentImageId: '', // 当前大图显示的id
            currentImageName: '', // 当前大图显示的name
            displayModal: false, // 查看大图的弹窗状态
            isDrop: false, // 设置文件输入框的改变
            currentChoseImages: [], // 当前选中的文件暂存
            renderImageList: [], // 显示上传的文件列表
            // 大图缩放和拖动的数据
            params: {
                zoomVal: 1,
                left: 0,
                top: 0,
                currentX: 0,
                currentY: 0,
                flag: false
            }
        };
    },
    props: {
        /**
         * 文件服务器根
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
            default: 9
        },
        /**
         * 接受上传的文件类型
         */
        accept: {
            type: Array,
            default: () => ['gjf', 'jpeg', 'jpe', 'jpg', 'png']
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
        }
    },
    computed: {
        // 限制上传
        disabledStatus() {
            return this.renderImageList.length >= this.limitMaxNumber;
        },
        // 允许上传的文件类型
        acceptExtend() {
            return this.accept.map((x) => `.${x}`).join(',');
        },
        // 最大限制数
        limitMaxNumber() {
            return this.maxNumber >= 9 ? 9 : this.maxNumber;
        },
        // 是否缩放了图片
        isZoomImage() {
            return this.params.zoomVal === 1;
        }
    },
    watch: {
        defaultFileList: {
            handler(newVal, oldVal) {
                const templateList = JSON.parse(JSON.stringify(this.defaultFileList)),
                    flag = !this.previewMode ? this.defaultFileList.length > this.limitMaxNumber : false;
                if (flag) templateList.splice(this.limitMaxNumber, templateList.length - 1);
                this.renderImageList = templateList;
            },
            deep: true
        }
    },
    mounted() {
        const templateList = JSON.parse(JSON.stringify(this.defaultFileList)),
            flag = !this.previewMode ? this.defaultFileList.length > this.limitMaxNumber : false;
        if (flag) templateList.splice(this.limitMaxNumber, templateList.length - 1);
        this.renderImageList = templateList;
    },
    methods: {
        // 图片缩放
        zoomImage(event) {
            // var targetImage = document.querySelector(".p-big-image")
            const targetImage = this.$refs.scaleImage;
            this.params.zoomVal += (event.wheelDelta || event.detail * 24) / 1200;
            if (this.params.zoomVal >= 0.2) {
                targetImage.style.transform = `scale(${this.params.zoomVal})`;
            } else {
                this.params.zoomVal = 0.2;
                targetImage.style.transform = `scale(${this.params.zoomVal})`;
                return false;
            }
        },
        // 按住鼠标选择中图片事件
        imageChosed(event) {
            this.params.flag = true;
            if (!event) {
                event = window.event;
                // 防止IE文字选中
                event.target.onselectstart = function () {
                    return false;
                };
            }
            if (event.target.style.left !== 'auto' && event.target.style.left !== '') {
                this.params.left = event.target.style.left;
            }
            if (event.target.style.top !== 'auto' && event.target.style.top !== '') {
                this.params.top = event.target.style.top;
            }
            this.params.currentX = event.clientX;
            this.params.currentY = event.clientY;
        },
        // 鼠标离开图片区域
        imageLeave(event) {
            this.params.flag = false;
        },
        // 阻止默认的拖动事件
        defaultDrag(event) {
            event.stopPropagation();
            event.preventDefault();
        },
        // 松开鼠标事件
        imageUp(event) {
            this.params.flag = false;
        },
        // 鼠标移动事件
        imageMove(event) {
            event.preventDefault();
            if (this.params.flag) {
                const nowX = event.clientX,
                    nowY = event.clientY,
                    disX = nowX - this.params.currentX,
                    disY = nowY - this.params.currentY;
                event.target.style.left = `${parseInt(this.params.left) + disX}px`;
                event.target.style.top = `${parseInt(this.params.top) + disY}px`;
            }
        },
        // 点击显示大图预览
        showBigImage(data) {
            const _index = this.renderImageList.findIndex(item => item.id === data.id);
            if (this.renderImageList.length === 1) {
                this.changeLimit = 'all';
            } else if (_index === 0) {
                // 第一张图片
                this.changeLimit = 'first';
            } else if (_index === this.renderImageList.length - 1) {
                // 最后一张图片
                this.changeLimit = 'last';
            } else {
                this.changeLimit = '';
            }
            this.currentImageId = data.id;
            this.currentImageName = data.name;
            this.displayModal = true;
            const bigImage = this.$refs.scaleImage;
            bigImage.style.width = 'auto';
            this.adaptionScreen();
        },
        // 重置图片的原始比例
        resetOriginSize() {
            // let bigImage = document.querySelector('.p-big-image'),
            const bigImage = this.$refs.scaleImage,
                bigImageBox = this.$refs.imageBox;
            bigImage.style.width = 'auto';
            bigImage.style.left = 'auto';
            bigImage.style.top = '0';
            bigImage.style.transform = 'scale(1)';
            this.params.zoomVal = 1;
        },
        // 适应屏幕
        adaptionScreen() {
            this.$nextTick(() => {
                const bigImage = this.$refs.scaleImage,
                    bigImageBox = this.$refs.imageBox,
                    boxHeight = bigImageBox.clientHeight,
                    imageTest = new Image();
                imageTest.src = bigImage.src;
                imageTest.onload = () => {
                    const imageHeight = imageTest.naturalHeight;
                    bigImage.style.width = 'auto';
                    bigImage.style.left = 'auto';
                    bigImage.style.top = 'auto';
                    const scaleNumber = Number((boxHeight / imageHeight).toFixed(3));
                    if (scaleNumber < 1) {
                        bigImage.style.transform = `scale(${scaleNumber})`;
                        this.params.zoomVal = scaleNumber;
                    } else {
                        bigImage.style.transform = 'scale(1)';
                        this.params.zoomVal = 1;
                    }
                };
            });
        },
        // 关闭图片预览弹窗
        closeImageModal() {
            this.params.zoomVal = 1;
            this.displayModal = false;
        },
        // 切换大图
        changeCurrentImage(flag) {
            const _index = this.renderImageList.findIndex(item => item.id === this.currentImageId);
            if (flag === 'prev') {
                this.currentImageId = this.renderImageList[_index - 1].id;
                if (_index === 1) {
                    // 第一张图片
                    this.changeLimit = 'first';
                } else {
                    this.changeLimit = '';
                }
            } else {
                this.currentImageId = this.renderImageList[_index + 1].id;
                if (_index === this.renderImageList.length - 2) {
                    // 最后一张图片
                    this.changeLimit = 'last';
                } else {
                    this.changeLimit = '';
                }
            }
            this.adaptionScreen();
        },
        // 文件上传框的拖拽事件
        inputDrag(evt) {
            this.isDrop = true;
            return false;
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
                document.querySelector('.p-add-image-input').value = null;
                this.isDrop = false;
                return false;
            }
            let { files } = evt.target;
            if (!this.checkFileType(files)) { return false; }
            // 上传文件加上当前上传文件数已经大于等于限制上传数
            if (this.renderImageList.length + files.length >= this.limitMaxNumber) {
                const templateFiles = [];
                for (let i = 0; i < this.limitMaxNumber - this.renderImageList.length; i++) {
                    templateFiles.push(files[i]);
                }
                files = templateFiles;
            }
            if (files) this.fileReader(files);
            document.querySelector('.p-add-image-input').value = null;
        },
        /**
         * 文件上传读取的处理
         *
         */
        fileReader(files) {
            for (let index = 0; index < files.length; index++) {
                const item = files[index];
                this.featchUpload(item);
            }
        },
        /**
         * 上传文件
         */
        featchUpload(fileItem) {
            const _currentIndex = this.renderImageList.findIndex(item => item.name === fileItem.name);
            if (_currentIndex !== -1) {
                this.renderImageList.splice(_currentIndex, 1, {
                    status: 'pending',
                    name: fileItem.name,
                    progressRate: 0
                });
            } else {
                this.renderImageList.push({
                    status: 'pending',
                    name: fileItem.name,
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
            const _index = this.renderImageList.findIndex(item => item.name === file.name);
            const loading = Math.round(event.loaded / event.total * 100);
            this.renderImageList.splice(_index, 1, {
                status: 'pending',
                name: file.name,
                progressRate: loading
            });
        },
        /**
         * 处理上传返回的数据
         * 参数 【当前上传文件，当前返回值，上传状态】
         */
        handleData(fileItem, response, status) {
            const _this = this,
                _currentIndex = _this.renderImageList.findIndex(item => item.name === fileItem.name);
            if (_currentIndex !== -1) {
                // 判断上传是否成功
                if (status === 'done') {
                    const templateFile = {
                        id: response.url, // 唯一标识，使用接口返回的url
                        name: fileItem.name,	// 文件名
                        status,					// 上传状态
                        url: response.url,		// 文件的url
                        suffix: response.suffix,	// 文件格式
                        progressRate: 100,	// 上传进度
                        size: response.size
                    };
                    _this.renderImageList.splice(_currentIndex, 1, templateFile);
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
                    _this.renderImageList.splice(_currentIndex, 1, templateFile);
                }
            }
            this.$emit('change', this.renderImageList);
        },
        // 删除当前项,并返回改变的数据
        deleteImage(data) {
            const currentIndex = this.renderImageList.findIndex(item => item.name === data.name);
            this.renderImageList.splice(currentIndex, 1);
            this.$emit('change', this.renderImageList);
        },
        // 下载
        async downloadFile() {
            // 下载资源方法
            const url = `${this.hosts}${this.currentImageId}`;
            const response = await fetch(url),
                blob = await response.blob(),
                objectUrl = window.URL.createObjectURL(blob),
                aTag = document.createElement('a');

            aTag.href = objectUrl;
            aTag.download = this.currentImageName;
            aTag.click();
            aTag.remove();
        }
    }
};
</script>
<style lang="stylus">
.p-image-upload
    display: inline-flex
    flex-wrap: wrap
    width: 100%
    font-size: 0
    .p-image-upload-centent
        position: relative
        display: flex
        flex-direction: column
        align-items: center
        width: 112px
        height: @width
        margin-right: 12px
        margin-bottom: 20px
        padding-top: 20px
        padding-bottom: 12px
        border: 1px dashed $grey-400
        border-radius: 4px
        background: $grey-50
        cursor: pointer
        transition: all 0.36s
        .p-add-image-input
            position: absolute
            top: 0
            left: 0
            background none
            width: 100%
            height: 100%
            opacity: 0
            cursor: pointer
        .p-label
            font-size: 14px
            font-weight: 400
            line-height: 22px
            color: $grey-900
            margin-top: 8px
            margin-bottom: 4px
            cursor pointer
        .p-number
            font-size: 14px
            font-weight: 400
            line-height: 22px
            color: $grey-500
        &:hover
            border-color: $blue-500
    .p-image-upload-disabled
        cursor: default
        .p-add-image-input
            cursor: default
        .p-label
            color: $grey-400
            cursor not-allowed
        .p-number
            color: $grey-400
        svg
            rect
                fill: $grey-400
        &:hover
            border-color: $grey-400
    .p-image-list
        position: relative
        display: flex
        flex-direction: column
        align-items: center
        width: 112px
        height: @width
        margin-right: 12px
        margin-bottom: 20px
        border: 1px dashed $grey-400
        border-radius: 4px
        background: $grey-50
        cursor: pointer
        .p-delete-icon
            width 16px
            height 16px
            position: absolute
            opacity: 0
            top 8px
            right 8px
            transition opacity .3s
            path
                transition fill .36s
            &:hover
                path
                    fill $blue-500
    .p-image-list-done
        padding: 4px
        border: 1px solid $grey-400
        border-radius: 4px
        background: $theme
        .p-small-image-box
            display flex
            justify-content center
            align-items center
            width: 100%
            height: 100%
            overflow: hidden
            .p-list-image
                height 100%
        &:hover
            .p-delete-icon
                opacity: 1
    .p-image-list-fail
        border: 1px solid $grey-400
        border-radius: 4px
        background: $grey-50
        .p-fail-icon
            margin-top: 28px
            margin-bottom: 4px
        .p-fail-text
            font-size: 14px
            font-weight: 400
            line-height: 22px
            color: $grey-500
        &:hover
            .p-delete-icon
                opacity: 1
    .p-image-list-pending
        &:hover
            .p-delete-icon
                opacity: 1
        .p-list-label
            display: inline-block
            margin-top: 36px
            font-size: 14px
            font-weight: 400
            line-height: 22px
            color: $grey-500
        .p-progress-bar
            width: calc(100% - 16px)
            height: 4px
            margin-top: 8px
            border-radius: 2px
            background: $grey-300
            .p-progress-rate
                width: 0
                height: 4px
                background: $blue-500
                border-radius: 2px
                transition: width 2s
    .p-image-modal
        position: fixed
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: $theme
        z-index: 7000
        .p-image-modal-back
            position: fixed
            top: 56px
            width: 100%
            height: calc(100% - 56px)
            background: $grey-600
            opacity: 0.5
        .p-image-header
            display: flex
            align-items: center
            justify-content: flex-end
            width: 100%
            height: 56px
            padding-left: 32px
            padding-right: 32px
            background: $grey-50
            span
                font-size: 14px
                line-height: 22px
            div
                margin-left: 24px
                display: flex
                align-items: center
                cursor: pointer
            .p-size-box
                svg
                    width 16px
                    height 16px
                    >g>path
                        transition: all 0.36s
                    rect, circle
                        transition all 0.36s
                .p-size-label
                    display: inline-block
                    margin-left: 4px
                    transition: all 0.36s
                &:hover
                    color: $blue-500
                    svg>g
                        path:first-child
                            fill: $blue-500
                        path:last-child
                            stroke: $blue-500
                        rect, circle
                            fill: $blue-500
            .p-download-box
                .p-size-label
                    display: inline-block
                    margin-left: 4px
                    transition: all 0.36s
                svg
                    width 16px
                    height 16px
                    >g>path
                        transition all 0.36s
                &:hover
                    color: $blue-500
                    svg>g>path
                        fill: $blue-500
            .p-close-box
                position: relative
                svg
                    width 16px
                    height 16px
                    path, rect
                        transition all 0.36s
                &::before
                    content: ''
                    position: absolute
                    left: -12px
                    width: 1px
                    height: 22px
                    background: $grey-400
                &:hover
                    svg
                        path,rect
                            fill: $blue-500
        .p-image-content
            position: relative
            display: flex
            justify-content: space-between
            align-items: center
            width: 100%
            height: calc(100% - 56px)
            padding-left: 32px
            padding-right: 32px
            .p-image-box
                position: relative
                width: 100%
                height: 100%
                overflow: hidden
                display: flex
                justify-content: center
                align-items: center
                .p-big-image
                    position: relative
                    width: 100%
                    cursor: move
                    user-select: none
            .p-control
                position: absolute
                display: flex
                justify-content: center
                align-items: center
                width: 40px
                height: @width
                background: $grey-50
                border: 1px solid $grey-50
                border-radius: 20px
                cursor: pointer
                transition: all 1s
                z-index: 1000
                svg
                    width 20px
                    height 20px
                &:hover
                    svg
                        path
                            stroke: $blue-500
            .p-control-right
                right: 32px
                transform: rotate(180deg)

</style>
