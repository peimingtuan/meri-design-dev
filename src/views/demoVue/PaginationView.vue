<template>
    <div class="component component-padding">
         <h1 class="components-title">分页组件</h1>
        <br />
        <div class="ms-pagination">
             <h3 class="components-title-h3">默认 </h3>
            <Pagination
                :pageCount="1500"
                @change="currentChange"
                @reload-page="reloadPage"
            />
            <br />
            <br />
             <h3 class="components-title-h3">全显 </h3>
            <Pagination
                :pageCountShow="true"
                :pageCount="1500"
                :reloadPage="true"
                :pageSizeSetting="true"
                @change="currentChange"
                @reload-page="reloadPage"
            />
            <br>
            <br>
             <h3 class="components-title-h3">简易 </h3>
            <Pagination
                :pageCountShow="true"
                :pageCount="1500"
                :simple="true"
                @change="currentChange"
            />
        </div>
    </div>
</template>

<script>
export default {
    name: "PaginationView",
    methods: {
        currentChange(currentPage) {
            console.log(currentPage);
        },
        reloadPage(page) {
            console.log(page);
        }
    }
};
</script>
