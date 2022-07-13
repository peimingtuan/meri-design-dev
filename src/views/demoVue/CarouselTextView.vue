<template>
    <div class="toggleView">
        <div class="component component-padding">
             <h1 class="components-title">CarouselText组件</h1>
            <!--
             data:数据
             time：轮播时间，单位s
             click：点击事件
             -->
            <div class="textCar">
                <CarouselText :data="carData" :time="2" @click="handleCarousel" />
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CarouselTextView",
        data() {
            return {
                carData: [
                    {id: '111', text: '新中国成立70周年庆祝活动总结会议在京举行新中国成立70周年庆祝活动总结会议在京举行新中国成立70周年庆祝活动总结会议在京举行', type: 'commission'},
                    {id: '222', text: '习近平出访两邻国 看点亮点都在这', type: 'executory'},
                    {id: '333', text: '金正恩骑白马登上白头山 俯瞰山峦', type: 'pending'}
                ]
            }
        },
        methods: {
            handleCarousel(id) {
                console.log('********handleCarousel:::', id);
            }
        }
    }
</script>

<style lang="stylus" scoped>

    .textCar
        width 320px

</style>
