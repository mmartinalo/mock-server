const fs = require('fs');

module.exports = {
    saveFile: function (filename, data) {

        const path = `output/rq`
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, { recursive: true });
        }

        fs.writeFile(`${path}/${filename}`, data, function (err) {
            if (err) return console.log(err);
            console.log(`Body stored as '${filename}' into path ${path}`);
        });
    }

};

