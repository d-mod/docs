<template>
    <div class="home-box">
        <div class="home-header">
            <slot name="header"></slot>
        </div>
        <div class="home-content">
            <slot></slot>
        </div>
        <div class="home-footer">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "home"
    }
</script>

<style scoped lang="stylus">
    .home-header
        width 100%
        font-size 3rem
        margin auto
        font-weight bolder
        text-align center
    .home-content
        width 25rem
        margin auto
        padding 20px
    .home-footer
        width 100%
        text-align center
</style>