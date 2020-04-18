<template>
    <a style="text-decoration: none ; color: white" class="action-link" :href="href">
        <slot/>
    </a>
</template>

<script>
    export default {
        name: "action-button",
        props: {
            "href": {
                type: String,
                default: "#"
            },
            "text": {
                type: String,
                default: ""
            }
        }
    }
</script>

<style scoped lang="stylus">
    @import "../override.styl"
    .action-link
        width 10rem
        display inline-block;
        font-size 1rem;
        background-color $titleColor;
        padding 0.8rem 1.6rem;
        border-radius 4px;
        transition background-color 0.1s ease;
        box-sizing border-box;
        text-align center
        margin 1rem
        &:hover
            background $accentColor
</style>