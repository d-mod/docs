<!-- 
    @author kritsu
    @date 2018/9/2 13:28
-->
<template>
    <div></div>
</template>

<script>
    export default {
        name: "redirect",
        props:["to"],
        created(){
            let to=this.to
            if(!to.endsWith(".html")){
                to+=".html"
            }
            this.$router.push(to)
        }
    }
</script>

<style scoped>

</style>