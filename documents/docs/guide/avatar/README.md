### Avatar 头像

<template>
	<div class="Avatar">
		<div class="component component-padding">
			<h1>Avatar组件</h1>
			<div class="avatar">
				<h2>默认头像type可选【type logo text】</h2>
				<section class="list">
					<Avatar />
					<Avatar type="image"></Avatar>
					<Avatar type="logo"></Avatar>
					<Avatar type="text"></Avatar>
				</section>
			</div>
			<div class="avatar">
				<h2>自定义内容</h2>
				<section class="list">
					<Avatar type="image">
						<img src="http://47.95.122.141:8200/persagy_ui_kit/images/avatar-default.png" alt="头像">
					</Avatar>
					<Avatar type="logo" :size='48'>
						<img src="http://47.95.122.141:8200/persagy_ui_kit/images/avatar-default.png" alt="logo">
					</Avatar>
					<Avatar type="text">默认多个显示</Avatar>
				</section>
			</div>
			<div class="avatar">
				<h2>size可选【自定义 large medium small minimum】</h2>
				<section class="list">
					<Avatar type="image" :size='48'></Avatar>
					<Avatar type="image" size='large'></Avatar>
					<Avatar type="image" size='medium'></Avatar>
					<Avatar type="image" size='small'></Avatar>
					<Avatar type="image" size='minimum'></Avatar>
				</section>
			</div>
			<div class="avatar">
				<h2>colorType可选值【 blue cyan turquoise green yellow orange red carmine purple】</h2>
				<section class="list">
					<Avatar colorType='blue' type="logo" size='large'></Avatar>
					<Avatar colorType='cyan' type="logo" size='large'></Avatar>
					<Avatar colorType='turquoise' type="logo" size='large'></Avatar>
					<Avatar colorType='green' type="logo" size='large'></Avatar>
					<Avatar colorType='yellow' type="logo" size='large'></Avatar>
					<Avatar colorType='orange' type="logo" size='large'></Avatar>
					<Avatar colorType='red' type="logo" size='large'></Avatar>
					<Avatar colorType='carmine' type="logo" size='large'></Avatar>
					<Avatar colorType='purple' type="logo" size='large'></Avatar>
				</section>
			</div>
			<div class="avatar">
				<h2>colorType可选值【 blue cyan turquoise green yellow orange red carmine purple】</h2>
				<section class="list">
					<Avatar colorType='blue' type="text" :size='52'>示例</Avatar>
					<Avatar colorType='cyan' type="text" :size='48'>多个</Avatar>
					<Avatar colorType='turquoise' type="text" :size='44'>赵</Avatar>
					<Avatar colorType='green' type="text" :size='40'>钱</Avatar>
					<Avatar colorType='yellow' type="text" :size='36'>孙</Avatar>
					<Avatar colorType='orange' type="text" size='large'>李</Avatar>
					<Avatar colorType='red' type="text" size='medium'>周</Avatar>
					<Avatar colorType='carmine' type="text" size='small'>吴</Avatar>
					<Avatar colorType='purple' type="text" size='minimum'>郑</Avatar>
				</section>
			</div>
		</div>
	</div>
</template>

<script>
    export default {
        name: "AvatarView"
    }
</script>

<style lang="stylus" scoped>
.component
	padding: 30px
.avatar
	margin: 20px
	.list
		display: flex
		margin-top: 20px
</style>


### 代码演示

```vue

<template>
	<div class="Avatar">
		<div class="component component-padding">
			<h1>Avatar组件</h1>
			<div class="avatar">
				<h2>默认头像type可选【type logo text】</h2>
				<section class="list">
					<Avatar />
					<Avatar type="image"></Avatar>
					<Avatar type="logo"></Avatar>
					<Avatar type="text"></Avatar>
				</section>
			</div>
			<div class="avatar">
				<h2>自定义内容</h2>
				<section class="list">
					<Avatar type="image">
						<img src="http://47.95.122.141:8200/persagy_ui_kit/images/avatar-default.png" alt="头像">
					</Avatar>
					<Avatar type="logo" :size='48'>
						<img src="http://47.95.122.141:8200/persagy_ui_kit/images/avatar-default.png" alt="logo">
					</Avatar>
					<Avatar type="text">默认多个显示</Avatar>
				</section>
			</div>
			<div class="avatar">
				<h2>size可选【自定义 large medium small minimum】</h2>
				<section class="list">
					<Avatar type="image" :size='48'></Avatar>
					<Avatar type="image" size='large'></Avatar>
					<Avatar type="image" size='medium'></Avatar>
					<Avatar type="image" size='small'></Avatar>
					<Avatar type="image" size='minimum'></Avatar>
				</section>
			</div>
			<div class="avatar">
				<h2>colorType可选值【 blue cyan turquoise green yellow orange red carmine purple】</h2>
				<section class="list">
					<Avatar colorType='blue' type="logo" size='large'></Avatar>
					<Avatar colorType='cyan' type="logo" size='large'></Avatar>
					<Avatar colorType='turquoise' type="logo" size='large'></Avatar>
					<Avatar colorType='green' type="logo" size='large'></Avatar>
					<Avatar colorType='yellow' type="logo" size='large'></Avatar>
					<Avatar colorType='orange' type="logo" size='large'></Avatar>
					<Avatar colorType='red' type="logo" size='large'></Avatar>
					<Avatar colorType='carmine' type="logo" size='large'></Avatar>
					<Avatar colorType='purple' type="logo" size='large'></Avatar>
				</section>
			</div>
			<div class="avatar">
				<h2>colorType可选值【 blue cyan turquoise green yellow orange red carmine purple】</h2>
				<section class="list">
					<Avatar colorType='blue' type="text" :size='52'>示例</Avatar>
					<Avatar colorType='cyan' type="text" :size='48'>多个</Avatar>
					<Avatar colorType='turquoise' type="text" :size='44'>赵</Avatar>
					<Avatar colorType='green' type="text" :size='40'>钱</Avatar>
					<Avatar colorType='yellow' type="text" :size='36'>孙</Avatar>
					<Avatar colorType='orange' type="text" size='large'>李</Avatar>
					<Avatar colorType='red' type="text" size='medium'>周</Avatar>
					<Avatar colorType='carmine' type="text" size='small'>吴</Avatar>
					<Avatar colorType='purple' type="text" size='minimum'>郑</Avatar>
				</section>
			</div>
		</div>
	</div>
</template>

<script>
    export default {
        name: "AvatarView"
    }
</script>

<style lang="stylus" scoped>
.component
	padding: 30px
.avatar
	margin: 20px
	.list
		display: flex
		margin-top: 20px
</style>


```

### Attributes

| 参数     | 说明  | 类型    | 默认值  | 必须    |
| ------- | ---- | ------ | ------- | ------ |
| type    | 头像内容（可选：自定义/logo/text/image） | String | image | no     |
| size    | 头像大小（可选：自定义/larg/medium/small/minimum） | String/Number | medium | no     |
| colorType    | 背景色（可选：blue/cyan/turquoise/green/yellow/orange/red/carmine/purple） | String | blue | no     |