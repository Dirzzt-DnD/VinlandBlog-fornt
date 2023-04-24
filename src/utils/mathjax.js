export function injectMathJax(){
    if(!window.MathJax){
        const script = document.createElement('script')
        script.src = 'https://cdn.bootcdn.net/ajax/libs/mathjax/3.2.0/es5/tex-chtml.js'
        script.async = true
        document.head.appendChild(script)
    }
}

export function initMathJax(options={}, callback){
    injectMathJax()
    const defaultConfig = {
        tex: {
            inlineMath: [['$', '$']],
            displayMath: [['$$', '$$']],
            processEnvironments: true,
            processRefs: true,
        },
        options: {
            skipHtmlTags: ['noscript', 'style', 'textarea', 'pre', 'code'],
            ignoreHtmlClass: 'tex2jax_ignore',
        },
        startup: {
            pageReady: () => {
                callback && callback()
            },
        },
        svg: {
            fontCache: 'global',
        },
    }
    const mergeConfig = Object.assign({}, defaultConfig, options)
    window.MathJax = mergeConfig
}

export function renderByMathjax(el){
    if (!window.MathJax || !window.MathJax.version) {
        return
    }

    el = [...document.querySelectorAll(el)]

    return new Promise((resolve, reject) => {
        window.MathJax.typesetPromise(el)
            .then(() => {
                resolve(void 0)
            })
            .catch((err) => reject(err))
    })
}

