const licenses=[
    "mit", "zlib", "bass", "sharp-zip-lib"
]

const examples=[
    "dress","weapon","pet-and-aura"
]

function faqBar({basic,dress,program}) {
    return [
        {
            title:basic,
            collapsable: true,
            children:[
                "basic/mod-invalid",
                "basic/client-effect"
            ]
        },
        {
            title:dress,
            collapsable:true,
            children:[
                "dress/black-ball",
                "dress/small-doll",
                "dress/clone-dress-code",
                "dress/mask-dress"
            ]
        },
        {
            title:program,
            collapsable:true,
            children:[
                "program/start-error",
                "program/file-error",
                "program/save-error",
                "program/path-invalid",
                "program/sprite-list-empty",
                "program/effect-invalid",
                "program/ruler-cant-move"
            ]
        }
    ]
}

function guideBar({file,sprite,command,plugin,other}) {
    return [
        {
            title: file,
            collapsable: true,
            children: [
                "file/open-file",
                "file/save-file",
                "file/new-file",
                "file/delete-file",
                "file/rename-file",
                "file/replace-file",
                "file/compare-file",
                "file/merge-file",
                "file/repair-file",
                "file/recover-file",
                "file/palette"
            ]
        },
        {
            title: sprite,
            collapsable: true,
            children: [
                "sprite/new-sprite",
                "sprite/delete-sprite",
                "sprite/replace-sprite",
                "sprite/save-sprite",
                "sprite/hide-sprite",
                "sprite/link-sprite",
                "sprite/change-sprite-position",
                "sprite/change-sprite-size",
                "sprite/effect-sprite"
            ]
        },
        {
            title: command,
            collapsable: true,
            children: [
                "command/history",
                "command/action"
            ]
        },
        {
            title:plugin,
            collapsable:true,
            children:[
                "plugin/dressing-room",
                "plugin/avatar",
                "plugin/builder",
                "plugin/downloader",
                "plugin/searcher",
                "plugin/cleaner",
            ]
        },
        {
            title: other,
            collapsable: true,
            children: [
                "other/hot-key",
                "other/language"
            ]
        }
    ]
}

function featuresBar(changelog) {
    return [
        "downloads",
        {
            title:changelog,
            collapsable: true,
            children:[
                "1.7.3.1",
                "1.7.3.0",
                "1.7.2.3",
                "1.7.2.2",
                "1.7.2.1",
                "1.7.2.0",
            ]
        }
    ]
}


module.exports={
    title: "ExtractorSharp",
    base:"/docs",
    dest:"docs/",
    themeConfig: {
        sidebar: {
            "/guide/": guideBar({
                file: "文件",
                sprite: "贴图",
                command: "命令",
                other: "其他",
                plugin: "插件",
            }),
            "/feature/": featuresBar("历史版本"),
            "/faq/": faqBar({
                basic:"基础",
                dress:"时装",
                program:"软件"
            }),
            "/example/": examples,
            "/license/": licenses
        },
        nav: [
            {
                text: "版本",
                link: "/feature/"
            },
            {
                text: "指南",
                link: "/guide/"
            },
            {
                text: "常见问题",
                link: "/faq/"
            },
            {
                text: "教程示例",
                link: "/example/"
            }
        ]
    }
}
