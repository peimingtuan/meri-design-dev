### ImageUpload 图片上传组件

<template>
	<div class="image-upload">
		<h1>ImageUploadView组件</h1>
		<div class="component component-padding">
			<h2>图片上传组件</h2>
			<div class="upload">
				<section class="list">
					<ImageUpload
						@change="changeFile"
						hosts="http://47.95.122.141:8209/domita/backend"
						action="/base/attachment/uploadX"
						:defaultFileList='defaultFileList'
						:previewMode='false'
						:multiple='true'
					/>
				</section>
			</div>
		</div>
	</div>
</template>

<script>
    export default {
		name: "ImageUploadView",
		data() {
			return {
				defaultFileList: [
					{
						id: "/base/attachment/upload/id/66",
						status: 'done',
						name: "defaultImage.png",
						suffix: "image/png",
						size: 189554,
						url: "/base/attachment/upload/id/66",
					}
				]
			}
		},
		methods: {
			changeFile(data) {
				console.log(data)
			}
		}
    }
</script>

<style lang="stylus" scoped>
.image-upload
	.upload
		display flex
		margin-top 20px
		.list
			width 500px
</style>

::: details 查看示例
```vue
<template>
	<div class="image-upload">
		<h1>ImageUploadView组件</h1>
		<div class="component component-padding">
			<h2>图片上传组件</h2>
			<div class="upload">
				<section class="list">
					<ImageUpload
						@change="changeFile"
						hosts="http://47.95.122.141:8209/domita/backend"
						action="/base/attachment/uploadX"
						:defaultFileList='defaultFileList'
						:previewMode='false'
						:multiple='true'
					/>
				</section>
			</div>
		</div>
	</div>
</template>

<script>
    export default {
		name: "ImageUploadView",
		data() {
			return {
				defaultFileList: [
					{
						id: "/base/attachment/upload/id/66",
						status: 'done',
						name: "defaultImage.png",
						suffix: "image/png",
						size: 189554,
						url: "/base/attachment/upload/id/66",
					}
				]
			}
		},
		methods: {
			changeFile(data) {
				console.log(data)
			}
		}
    }
</script>

<style lang="stylus" scoped>
.image-upload
	.upload
		display flex
		margin-top 20px
		.list
			width 500px
</style>
```
:::

### Attributes

| 参数     | 说明  | 类型    | 默认值  | 必须    |
| ------- | ---- | ------ | ------- | ------ |
| hosts    | 图片请求服务根地址 | String | 无 | Yes |
| action    | 图片上传请求的接口 | String | 无 | Yes |
| multiple    | 上传是否可以选择多个 | Boolean | true | No |
| accept    | 接受上传的图片类型 【默认值里选】 | Array | ['gjf', 'jpeg', 'jpe', 'jpg', 'png'] | No |
| defaultFileList | 显示已上传的文件list | Array | [] | No |
| previewMode | 预览模式，为true则只做预览 | Boolean | false | No |
| maxNumber | 可上传的文件数（最大上传数为9） | Number | 9 | No |
| showTrigger | 超出最大上传数量（maxNumber）是否显示上传按钮 | Boolean | true | No |
| @change    | 图片列表改变 | Function | -- | No |

### Attributes

defaultFileList格式和change事件返回的数据结构一致
