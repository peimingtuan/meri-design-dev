<template>
  <div class="p-radio-group" v-if="groupData.length > 0">
    <div class="p-radio-group-title" v-if="title && type === 'single'">{{title}}</div>
    <div class="p-radio-group-multiple" v-if="type === 'multiple'">
      <template  v-for="(item, index) in groupData">
        <div class="p-radio-group-multiple-title" :class="{'radio-top': index > 0}">
          <Radio class="p-radio-group-item" @change="handleTitleRadioChange(item.id, $event)" :class="{'disabled': item.disabled}"
                 :checked="item.checked === 'checked' ? 'checked' : 'uncheck'" :disabled="item.disabled">{{item.name}}</Radio>
        </div>
        <div class="p-radio-group-single">
          <template v-for="i in item.children">
            <div :is="item.type" class="p-radio-group-item" @change="handleRadioContentChange(item.id, i.id, $event)" :class="{'disabled': i.disabled}"
                 :checked="i.checked === 'checked' ? 'checked' : 'uncheck'" :disabled="i.disabled" :key="i.id">{{i.name}}</div>
          </template>
        </div>
      </template>
    </div>
    <div v-else class="p-radio-group-single">
      <Radio class="p-radio-group-item" @change="handleChange(item.id, $event)" :checked="item.checked === 'checked' ? 'checked' : 'uncheck'" :class="{'disabled': item.disabled}"
             :disabled="item.disabled" v-for="item in groupData" :key="item.id">{{item.name}}</Radio>
    </div>
  </div>
</template>

<script>
    import Radio from '../Radio'
    export default {
        name: "RadioGroup",
        data () {
            return {}
        },
        components: { Radio },
        props: {
            /**
             * RadioGroup类型 （可选值： single -单行RadioGroup， multiple -多行RadioGroup）
             */
            type: {
                type: String,
                default: 'single'
            },
            /**
             * RadioGroup状态数据
             */
            groupData: {
                type: Array,
                default: () => []
            },
            /**
             * RadioGroup标题
             */
            title: {
                type: String,
                default: ''
            }
        },
        created () {
            if (this.type === 'multiple') {
                let arr = JSON.parse(JSON.stringify(this.groupData));
                arr = arr.map(value => {
                    let status = value.checked !== 'checked';
                    value.children = value.children.map((v) => {
                        v.disabled = status;
                        return v
                    });
                    return value
                });
                this.$emit('update:groupData', arr)
            }
        },
        methods: {
            /**
             * 横竖状态下单个radio状态发生改变时
             */
            handleChange (id, e) {
                if (e === 'uncheck') return;
                let arr = JSON.parse(JSON.stringify(this.groupData));
                arr = arr.map(v => {
                    if (!v.disabled) v.checked = 'uncheck';
                    return v
                });
                arr[arr.findIndex(v => v.id === id)].checked = e;
                this.$emit('update:groupData', arr);
                let res = arr.filter(v => v.checked === 'checked' && !v.disabled);
                res = res.map(v => v.id);
                this.$emit('change', res);
            },
            handleTitleRadioChange (id, e) {
                if (e === 'uncheck') return;
                let arr = JSON.parse(JSON.stringify(this.groupData));
                arr = arr.map(value => {
                    let status = !(value.id === id);
                    value.checked = status ? 'uncheck' : 'checked';
                    value.children = value.children.map((v) => {
                        v.disabled = status;
                        return v
                    });
                    return value
                });
                this.$emit('update:groupData', arr)
            },
            handleRadioContentChange (oneId, twoId, e) {
                let arr = JSON.parse(JSON.stringify(this.groupData));
                let oneIndex = arr.findIndex(v => v.id === oneId);
                let twoIndex = arr[oneIndex].children.findIndex(v => v.id === twoId);

                if (arr[oneIndex].type === 'radio') {
                    if (e === 'uncheck') return;
                    arr[oneIndex].children = arr[oneIndex].children.map(v => {
                        v.checked = 'uncheck';
                        return v
                    });
                }

                arr[oneIndex].children[twoIndex].checked = e;
                this.$emit('update:groupData', arr);

                let arr2 = JSON.parse(JSON.stringify(arr));
                let res = arr2.filter(value => {
                    if (value.checked === 'checked' && !value.disabled) {
                        value.children = value.children.filter(v => v.checked === 'checked' && !v.disabled)
                    }
                    return value.checked === 'checked' && !value.disabled
                });

                let a = JSON.parse(JSON.stringify(res));
                a = a.filter(val => val.checked === 'checked');
                a = a.map(val => {
                    let m = val.children.filter(v => v.checked === 'checked' && !v.disabled);
                    val.children = m.map(v => v.id);
                    return val
                });
                this.$emit('change', a);
            }

        }
    }
</script>

<style lang="stylus">
  .p-radio-group
    display inline-flex
    align-items center
    flex-direction: column
    justify-content flex-start
    padding 0 0 16px 16px
    .p-radio-group-item.disabled
      .p-checkbox-text,.p-radio-text
        color $grey-400
    .p-radio-group-title
      width 100%
      padding 16px 0 8px 0
    .p-radio-group-multiple
      .p-radio-group-multiple-title.radio-top
        margin-top 28px
      .p-radio-group-multiple-title
        margin-right 16px
        margin-left 0
        margin-top 16px
    .p-radio-group-single
      display inline-flex
      align-items center
      flex-wrap: wrap
      .p-radio-group-item
        margin-right 16px
        margin-left 0
        margin-top 16px

</style>
