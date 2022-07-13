### Tooltip 标签页

<template>
    <div id="baseexample">
        <h2>鼠标移入后显示省略类容或提示信息</h2>
        <div class="display-panel">
            <h5>显示省略类容 无需传值</h5>
            <div class="tool-tip" v-ptitle>我是天空里的一片云,你不必讶异，更无须欢喜，在转瞬间消灭了踪影。，偶尔投影在你的波心。</div>
        </div>
        <div class="display-panel">
            <h5>显示提示信息 需要传值</h5>
            <div class="tool-tip-info" v-ptitle="testText">你我相逢在黑夜的海上，你有你的，我有我的，方向；你记得也好，最好你忘掉，在这交会时互放的光亮！</div>
            <div class="tool-tip-info" v-ptitle="testText"><router-link to="/guide/avatar/">123</router-link></div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            testText: '这是徐志摩的诗'
        };
    }
};
</script>

```vue
<template>
    <div id="baseexample">
        <h2>鼠标移入后显示省略类容或提示信息</h2>
        <div class="display-panel">
            <h5>显示省略类容 无需传值</h5>
            <div class="tool-tip" v-ptitle>我是天空里的一片云,你不必讶异，更无须欢喜，在转瞬间消灭了踪影。，偶尔投影在你的波心。</div>
        </div>
        <div class="display-panel">
            <h5>显示提示信息 需要传值</h5>
            <div class="tool-tip-info" v-ptitle="testText">你我相逢在黑夜的海上，你有你的，我有我的，方向；你记得也好，最好你忘掉，在这交会时互放的光亮！</div>
            <div class="tool-tip-info" v-ptitle="testText"><router-link to="/selectView">123</router-link></div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            testText: '这是徐志摩的诗'
        };
    }
};
</script>

```

```vue
<template>
    <div id="baseexample">
        <h2>按需引入</h2>
        <div class="display-panel">
            <h5>显示省略类容 无需传值</h5>
            <div class="tool-tip" v-ptitle>我是天空里的一片云,你不必讶异，更无须欢喜，在转瞬间消灭了踪影。，偶尔投影在你的波心。</div>
        </div>
        <div class="display-panel">
            <h5>显示提示信息 需要传值</h5>
            <div class="tool-tip-info" v-ptitle="'这是徐志摩的诗'">你我相逢在黑夜的海上，你有你的，我有我的，方向；你记得也好，最好你忘掉，在这交会时互放的光亮！</div>
        </div>
    </div>
</template>

<script>
import Tooltip from 'meri-design-dev';
export default {
    name: 'TooltipView',
    directives: {
      ptitle: {
        // 指令的定义
        inserted: Tooltip,
        unbind: Tooltip.remove
      }
    }
};
</script>

```

### Attributes

| 参数       |    说明     | 类型    | 默认值  | 必须    |
| -------   |   ----      | ------ | ------- | ------ |
| v-ptitle  | 自定义的指令 | String |    null | Yes     |
| v-ptitle:width:200  | 自定义最大宽度为200 | String |    420 | No     |
