const { response } = require('express');

const handleFiles = (req, res = response) => {
    res.send('todo bn')
}

module.exports = {
    handleFiles
}