exports.version = 1
exports.apiRequired = 8.8
exports.description = "Redirect users on not-found"
exports.repo = "rejetto/404"

exports.config = {
    url: { label:"URL", helperText: "Where to redirect" }
}

exports.init = api => ({
    middleware(ctx) {
        if (!ctx.path.startsWith(api.Const.SPECIAL_URI)  // special uris should be excluded...
            && ctx.path !== '/favicon.ico')
            return () => { // execute after other middlewares are done
                if (ctx.status !== 404) return
                const url = api.getConfig('url')
                if (!url) return
                ctx.redirect(url)
                ctx.stop()
            }
    }
})