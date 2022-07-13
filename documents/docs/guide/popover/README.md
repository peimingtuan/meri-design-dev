### Popover 气泡框

<template>
	<div class="Popover">
		<h3>hover显示</h3>
		<div class="popover-box">
			<Popover titleText="我是标题" type="base" placement="top-left">
				<template #content>
					<article>
						我是第一行内容
						我是第二行内容
						我是第三行内容
						我是第四行内容
					</article>
				</template>
				<Input v-model="value1" />
			</Popover>
		</div>
		<h3>click点击显示</h3>
		<div class="popover-click">
			<div class="popover-top">
				<Popover  type="confirm" placement="top-left" @cancelEvent="cancel" @confirmEvent="confirm" :onRight='false'>
					<template #content>
						<Input :width="300" v-model="value2" />
					</template>
					<Button type="primary" size="large">top-left</Button>
				</Popover>
				<Popover  type="confirm" placement="top-center">
					<template slot="content">
						<p>测试点击显示popover</p>
					</template>
					<Button type="primary" size="large">top-center</Button>
				</Popover>
				<Popover  type="confirm" placement="top-right">
					<template slot="content">
						<p>测试点击显示popover</p>
					</template>
					<Button type="primary" size="large">top-right</Button>
				</Popover>
			</div>
			<div class="popover-bottom">
				<Popover  type="confirm" placement="bottom-left">
					<template slot="content">
						<p>测试点击显示popover</p>
					</template>
					<Button type="primary" size="large">bottom-left</Button>
				</Popover>
				<Popover  type="confirm" placement="bottom-center">
					<template slot="content">
						<p>测试点击显示popover</p>
					</template>
					<Button type="primary" size="large">bottom-center</Button>
				</Popover>
				<Popover  type="confirm" placement="bottom-right">
					<template slot="content">
						<p>测试点击显示popover</p>
					</template>
					<Button type="primary" size="large">bottom-right</Button>
				</Popover>
			</div>
		</div>
	</div>
</template>

<script>
    export default {
		name: "PopoverView",
		data() {
			return {
				value: '',
				value1: '',
				value2: '',
			}
		},
		methods: {
			confirm(e) {
				console.log(e)
			},
			cancel(e) {
				console.log(e)
			},
		}
    }
</script>

<style lang="stylus" scoped>
.Popover
	width: 100%
	padding 50px
	.popover-box
		margin 50px
		display flex
		align-items center
	.popover-click
		width 40%
		padding 50px
		>div
			display flex
			justify-content space-between
			margin-bottom 50px
</style>


### 代码演示

```vue
<template>
	<div class="Popover">
		<h3>hover显示</h3>
		<div class="popover-box">
			<Popover titleText="我是标题" type="base" placement="top-left">
				<template #content>
					<article>
						我是第一行内容
						我是第二行内容
						我是第三行内容
						我是第四行内容
					</article>
				</template>
				<Input v-model="value1" />
			</Popover>
		</div>
		<h3>click点击显示</h3>
		<div class="popover-click">
			<div class="popover-top">
				<Popover  type="confirm" placement="top-left" @cancelEvent="cancel" @confirmEvent="confirm" :onRight='false'>
					<template #content>
						<Input :width="300" v-model="value2" />
					</template>
					<Button type="primary" size="large">top-left</Button>
				</Popover>
				<Popover  type="confirm" placement="top-center">
					<template slot="content">
						<p>测试点击显示popover</p>
					</template>
					<Button type="primary" size="large">top-center</Button>
				</Popover>
				<Popover  type="confirm" placement="top-right">
					<template slot="content">
						<p>测试点击显示popover</p>
					</template>
					<Button type="primary" size="large">top-right</Button>
				</Popover>
			</div>
			<div class="popover-bottom">
				<Popover  type="confirm" placement="bottom-left">
					<template slot="content">
						<p>测试点击显示popover</p>
					</template>
					<Button type="primary" size="large">bottom-left</Button>
				</Popover>
				<Popover  type="confirm" placement="bottom-center">
					<template slot="content">
						<p>测试点击显示popover</p>
					</template>
					<Button type="primary" size="large">bottom-center</Button>
				</Popover>
				<Popover  type="confirm" placement="bottom-right">
					<template slot="content">
						<p>测试点击显示popover</p>
					</template>
					<Button type="primary" size="large">bottom-right</Button>
				</Popover>
			</div>
		</div>
	</div>
</template>

<script>
    export default {
		name: "PopoverView",
		data() {
			return {
				value: '',
				value1: '',
				value2: '',
			}
		},
		methods: {
			confirm(e) {
				console.log(e)
			},
			cancel(e) {
				console.log(e)
			},
		}
    }
</script>


```

### Attributes

| 参数     | 说明  | 类型    | 默认值  | 必须    |
| ------- | ---- | ------ | ------- | ------ |
| type    | 类型可选【base confirm】 | String | base | no     |
| titleText    | title文字 | String | -- | no     |
| confirmText    | 确认按钮提示文字 | String | 确认 | no     |
| cancelText    | 取消按钮提示文字 | String | 取消 | no     |
| placement    | 对齐位置 | String | top-center | no     |
| placement    | 对齐位置 | String | top-center | no     |
| onRight    | 按钮位置 | Boolean | true | no     |
| componentId    | 组件content区的唯一id，类似html标签的id | String | '' | no     |
| @cancelEvent    | 取消回调 | Function | -- | no     |
| @confirmEvent    | 确定回调 | Function | -- | no     |
