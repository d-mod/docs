<template>
    <iframe :src="`//player.bilibili.com/player.html?aid=${aid}&cid=${cid}&page=${page}`"
            scrolling="no"
            frameborder="no"
            width="560px"
            height="420px"
            allowfullscreen="true">
    </iframe>
</template>

<script>
    export default {
        name: "bili-player",
        props:{
            aid:{
                type:String
            },
            cid:{
                type:String
            },
            page:{
                type:Number,
                default:1
            }
        }
    }
</script>

<style scoped>

</style>