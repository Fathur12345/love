const fs = require('fs-extra')
const { color } = require('./warna')

function uncache(module = '.') {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(module)]
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}

function nocache(module, cb = () => { }) {
    console.log(color('[ MODULE ]', 'yellow'), color(`${module} HERMAN CHANEL MENGINTAI`, 'green'))
    fs.watchFile(require.resolve(module), async () => {
        await uncache(require.resolve(module))
        cb(module)
    })
}

module.exports = {
    uncache,
    nocache
}
