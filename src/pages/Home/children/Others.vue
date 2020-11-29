<template>
    <!-- 首页其他子页面 -->
    <div class="others">
        <p>我是{{$route.params.name}}板块</p> 
    </div>
</template>

<script>
export default {
   
}
</script>

<style lang="stylus" scoped>
    .others
        overflow-x hidden !important
        width 100%
        height 100%
        background $bg
        font-size 40px
        color red
        p
            text-align center
            height 80px
            line-height 80px
</style>