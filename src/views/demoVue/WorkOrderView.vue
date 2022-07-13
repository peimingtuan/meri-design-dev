<template>
    <div class="component component-padding">
         <h1 class="components-title">WorkOrder组件</h1>
        <div class="workOrder">
            <WorkOrder :data="orderData" />
        </div>
    </div>
</template>

<script>
    /**
     * 参数说明
     * @flag uncommitted-未提交 disagree-不同意 rejected-已驳回 apply-申请完成 check-审核
     */
    const orderData=[
        {
            id: '1111111111',
            title: '分享任务执行监管措施',
            orderStatus: '逾期',
            flag: ['uncommitted'],
            tags: ['重要级别', '任务类型'],
            finishTime: '2018.10.12',
            createTime: '2018.10.12',
            creator: '胡晓华',
            principal: '胡晓华',
            company: '北京尚格大厦',
        },
        {
            id: '2222222222',
            title: '验收完成确定下一步工作任务',
            orderStatus: '',
            flag: ['disagree'],
            tags: ['重', '任务类型'],
            finishTime: '2018.10.12',
            createTime: '2018.10.12',
            creator: '胡晓华',
            principal: '胡晓华',
            company: '北京尚格大厦',
        }
    ];

    export default {
        name: "WorkOrderView",
        data() {
            return {
                orderData
            }
        }
    }
</script>

<style lang="stylus" scoped>
.workOrder
    padding 16px 32px
    width 472px
    height 800px
    box-shadow $box-shadow-bottom
    overflow-y auto

</style>
