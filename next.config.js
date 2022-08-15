const withImages = require('next-images')
module.exports = withImages({
    inlineImageLimit: 0,
    images: {
        disableStaticImages: true,
    },
    webpack(config, options) {
        return config
    }
})