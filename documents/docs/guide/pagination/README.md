### Pagination 分页

<template>
    <div class="toggleView">
        <div class="component component-padding">
            <h1>分页组件</h1>
            <h4>默认</h4>
            <Pagination
                :pageCount="1500"
                @change="currentChangeHandle"
                @reload-page="reloadPageHandle"
            />
            <br />
            <h4>全功能</h4>
            <Pagination
                :pageCountShow="true"
                :pageCount="1500"
                :pageSizeSetting="true"
                :reloadPage="true"
                @change="currentChangeHandle"
                @reload-page="reloadPageHandle"
            />
            <br>
            <h4>简易</h4>
            <Pagination
                :pageCountShow="true"
                :pageCount="1500"
                :simple="true"
                @change="currentChangeHandle"
            />
        </div>
    </div>
</template>

<script>
export default {
    name: "PaginationView",
    methods: {
          /** 
         * 页码或者每页条数改变事件的回调方法
         * @param {Object} pageMsg: {newPage:'当前页码'，newPageSize: '当前设置的每页条数'}
        */
        currentChangeHandle(pageMsg) {
            console.log(pageMsg);
        },
        /** 
         * 刷新当前页回调方法
         * @param {Object} pageMsg: {newPage:'当前页码'，newPageSize: '当前设置的每页条数'}
        */
        reloadPageHandle(pageMsg) {
            console.log(pageMsg);
        }
    }
};
</script>

``` vue
<template>
    <div class="toggleView">
        <div class="component component-padding">
            <h1>分页组件</h1>
            <h4>默认</h4>
            <Pagination
                :pageCount="1500"
                @change="currentChangeHandle"
            />
            <br />
            <h4>全功能</h4>
            <Pagination
                :pageCountShow="true"
                :pageCount="1500"
                :reloadPage="true"
                :pageSizeSetting="true"
                @change="currentChangeHandle"
                @reload-page="reloadPageHandle"
            />
            <br>
            <h4>简易</h4>
            <Pagination
                :pageCountShow="true"
                :pageCount="1500"
                :simple="true"
                @change="currentChangeHandle"
            />
        </div>
    </div>
</template>

<script>
export default {
    name: "PaginationView",
    methods: {
        /** 
         * 页码或者每页条数改变事件的回调方法
         * @param {Object} pageMsg: {newPage:'当前页码'，newPageSize: '当前设置的每页条数'}
        */
        currentChangeHandle(pageMsg) {
            console.log(pageMsg);
        },
        /** 
         * 刷新当前页回调方法
         * @param {Object} pageMsg: {newPage:'当前页码'，newPageSize: '当前设置的每页条数'}
        */
        reloadPageHandle(pageMsg) {
            console.log(pageMsg);
        }
    }
};
</script>

```

### Attributes 属性

| 参数     | 说明  | 类型    | 默认值  | 必须    |
| ------- | ---- | ------ | ------- | ------ |
| page    | 默认选中的页码 | Number | 1 | No     |
| basePage    | 当前页码在页码列表中的位置 | Number | 3 |  No    |
|  pageCount   | 数据总条数 | Number |  |  isTotalDataShow=true时为必填    |
|   pageSize  | 每页条数 | String | 30 |  No    |
|   visiblePages  | 默认显示的页码个数 | Number | 5 |  No   |
|   fast  | 是否显示快速翻页 | Boolean | false |  No    |
|   fastStep  | 快速翻页步长 | Number | 5 |  No    |
|   reloadPage  | 是否启用刷新页面数据 | Boolean | false |  No    |
|   pageCountShow  | 是否显示总条数 | Boolean | false |   No   |
|   pageSizeSetting  | 是否显示每页条数设置 | Boolean | false |  No    |
|   simple  | 是否使用简易分页器 | Boolean | false |  No    |

### events 事件

| 名称     | 说明  | 参数    | 返回值  |
| ------- | ---- | ------ | ------- |
|  change |  当前页码或者每页条数改变事件  |    |  {newPage: 页码, newPageSize: 每页条数}  |
|  reload-page |  点击刷新页面数据事件  |    |  {newPage: 页码, newPageSize: 每页条数}  |


