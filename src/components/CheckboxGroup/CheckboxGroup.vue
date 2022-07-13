<template>
  <div class="p-checkbox-group" v-if="groupData.length > 0">
    <div class="p-checkbox-group-title" v-if="title && type === 'single'">{{title}}</div>

    <div class="p-checkbox-group-multiple" v-if="type === 'multiple'">
      <div class="p-checkbox-group-multiple-title" v-if="forbidden && forbidden.checked">
        <Checkbox class="p-checkbox-group-item" @change="handleTitleChange($event)"
                  :checked="forbidden.checked === 'checked' ? 'checked' : 'uncheck'">{{forbidden.name}}</Checkbox>
      </div>
      <div class="p-checkbox-group-single">
        <template v-for="item in groupData">
          <Radio class="p-checkbox-group-item" @change="handleSelectChange(item.id, $event)" :class="{'disabled': item.disabled}"
                 :checked="item.checked === 'checked' ? 'checked' : 'uncheck'" :disabled="item.disabled" :key="item.id">{{item.name}}</Radio>
        </template>
      </div>
      <template v-if="groupBundle && groupBundle.children">
        <div class="p-checkbox-group-single" v-for="item in groupBundle.children">
          <template v-for="i in item.children">
            <div :is="item.type" class="p-checkbox-group-item" @change="handleContentChange(item.id, i.id, $event)" :class="{'disabled': i.disabled}"
                 :checked="i.checked === 'checked' ? 'checked' : 'uncheck'" :disabled="i.disabled" :key="i.id">{{i.name}}</div>
          </template>
        </div>
      </template>
    </div>

    <div v-else class="p-checkbox-group-single">
      <Checkbox class="p-checkbox-group-item" @change="handleChange(item.id, $event)" :checked="item.checked === 'checked' ? 'checked' : 'uncheck'"
                :class="{'disabled': item.disabled}" :disabled="item.disabled" v-for="item in groupData" :key="item.id">{{item.name}}</Checkbox>
    </div>

  </div>
</template>

<script>
    import Checkbox from '../Checkbox'
    import Radio from '../Radio'
    export default {
        name: "CheckboxGroup",
        components: { Checkbox, Radio },
        data () {
            return {
                groupBundle : [] // CheckboxGroup切换内数据
            }
        },
        props: {
            /**
             * CheckboxGroup类型 （可选值： single -单行checkbox组， multiple-a -多行checkbox组， multiple-b -多行checkbox组(无禁用)）
             */
            type: {
                type: String,
                default: 'single'
            },
            /**
             * CheckboxGroup状态数据
             */
            groupData: {
                type: Array,
                default: () => []
            },
            /**
             * CheckboxGroup标题
             */
            title: {
                type: String,
                default: ''
            },
            /**
             * CheckboxGroup禁用/启用
             */
            forbidden: {
                type: Object,
                default:  () => {}
            }
        },
        created () {
            this.init();
        },
        methods: {
            /**
             * 数据初始化
             */
            init () {
                let m = JSON.parse(JSON.stringify(this.groupData));
                if (this.forbidden && this.forbidden.checked) {
                    let status = this.forbidden.checked === 'uncheck';
                    m =  m.map(value => {
                        if (value.checked === 'notNull') value.checked = 'uncheck';
                        value.disabled = status;
                        value.children = value.children.map(val => {
                            val.disabled = status;
                            val.children = val.children.map(v => {
                                v.disabled = status;
                                return v
                            });
                            return val
                        });
                        return value
                    });
                }
                if (m.every(v => v.checked === 'uncheck')) {
                    if (this.type === 'multiple') m[0].checked = 'checked';
                    this.groupBundle = m[0];
                } else if (m.every(v => v.checked === 'checked')) {
                    m.map(v => {
                        v.checked = 'uncheck';
                        return v
                    });
                    if (this.type === 'multiple') m[0].checked = 'checked';
                    this.groupBundle = m[0];
                } else {
                    let i = m.findIndex(v => v.checked === 'checked');
                    m[i].checked = 'checked';
                    this.groupBundle = m[i];
                    m.map((v, index) => {
                        if (i !== index) v.checked = 'uncheck';
                        return v
                    });
                }
                this.$emit('update:groupData', m);
            },
            /**
             * 横竖状态下单个checkbox状态发生改变时
             */
            handleChange (id, e) {
                let arr = JSON.parse(JSON.stringify(this.groupData));
                arr[arr.findIndex(v => v.id === id)].checked = e;
                this.$emit('update:groupData', arr);
                let res = arr.filter(v => v.checked === 'checked' && !v.disabled);
                res = res.map(v => v.id);
                this.$emit('change', res);
            },
            /**
             * 多选CheckboxGroup控制每个组所有checkbox的状态
             */
            handleTitleChange (e) {
                let m = JSON.parse(JSON.stringify(this.groupData));
                let forbidden = JSON.parse(JSON.stringify(this.forbidden));
                forbidden.checked = e;
                let status = forbidden.checked === 'uncheck';
                m = m.map(value => {
                    if (value.checked === 'notNull') value.checked = 'uncheck';
                    value.disabled = status;
                    value.children = value.children.map(val => {
                        val.disabled = status;
                        val.children = val.children.map(v => {
                            v.disabled = status;
                            return v
                        });
                        return val
                    });
                    return value
                });
                this.groupBundle = m[m.findIndex(v => v.checked === 'checked')];
                this.$emit('update:groupData', m);
                this.$emit('update:forbidden', forbidden);
            },
            /**
             * 多选CheckboxGroup组内单个checkbox单个发生改变时
             * @param oneId
             * @param twoId
             * @param e
             */
            handleContentChange (oneId, twoId, e) {
                let arr = JSON.parse(JSON.stringify(this.groupBundle)).children;
                let oneIndex = arr.findIndex(v => v.id === oneId);
                if (arr[oneIndex].type === 'radio') {
                    if (e === 'uncheck') return;
                    arr[oneIndex].children = arr[oneIndex].children.map(v => {
                        v.checked = 'uncheck';
                        return v
                    });
                }
                let twoIndex = arr[oneIndex].children.findIndex(v => v.id === twoId);
                arr[oneIndex].children[twoIndex].checked = e;
                this.groupBundle.children = arr;
                let m = JSON.parse(JSON.stringify(this.groupData));
                let index = m.findIndex(v => v.checked === 'checked');
                m[index].children = arr;
                this.$emit('update:groupData', m);

                let PArr = JSON.parse(JSON.stringify(this.groupBundle));
                let a = JSON.parse(JSON.stringify(arr));
                PArr.children = a.map(val => {
                    let m = val.children.filter(v => v.checked === 'checked' && !v.disabled);
                    m = m.map(v => v.id);
                    val.children = m;
                    return val;
                });
                this.$emit('change', PArr);
            },
            /**
             * 切换选项
             * @param id
             * @param e
             */
            handleSelectChange (id, e) {
                let arr = JSON.parse(JSON.stringify(this.groupData));
                arr = arr.map(v => {
                    if (v.id === id) {
                        if (v.checked === 'uncheck') {
                            v.checked = 'checked';
                            this.groupBundle = v;
                        }
                    } else {
                        v.checked = 'uncheck'
                    }
                    return v
                });
                this.$emit('update:groupData', arr)
            }
        }
    }
</script>

<style lang="stylus">
  .p-checkbox-group
    display inline-flex
    align-items center
    flex-direction: column
    justify-content flex-start
    padding 0 0 16px 16px
    transition all .36s
    .p-checkbox-group-item.disabled
      .p-checkbox-text,.p-radio-text
        color $grey-400
    .p-checkbox-group-title
      width 100%
      padding 16px 0 8px 0
    .p-checkbox-group-multiple
      .p-checkbox-group-multiple-title
        margin-right 16px
        margin-left 0
        margin-top 16px
    .p-checkbox-group-single
      display flex
      align-items center
      flex-wrap: wrap
      transition all .36s
      .p-checkbox-group-item
        margin-right 16px
        margin-left 0
        font-size 0
        margin-top 16px
</style>
