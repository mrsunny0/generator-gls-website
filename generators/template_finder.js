const path = require('path')

// store template folders
template_folder = {
    root: "template-gh-pages",
    yml: "template-yml-files",
    scss: "template-scss-files"
}

// export path finder, with source root provided in argument
module.exports = function(sourceRoot) {
    return function(which, file) {
        return path.join(
            sourceRoot,
            template_folder[which],
            file
        )	
    }
}