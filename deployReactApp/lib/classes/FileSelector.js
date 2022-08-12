const fs = require('fs');

fs.mkdir('./classes/', (err) => {
    if(err) console.log(err)
})