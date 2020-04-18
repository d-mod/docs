export default function({Vue,router}){
    const redirectConfig= {
        "/guide/": "/guide/file/open-file.html",
        "/example/":"/example/dress.html",
        "/guide/plugin/":"/guide/plugin/dressing-room.html",
        "/feature/":"/feature/downloads.html",
        "/download/":"/feature/downloads.html",
        "/license/":"/license/mit.html"
    }
    Vue.prototype.$redirect=function (path) {
        return this.$withBase(redirectConfig[path])
    }
}

