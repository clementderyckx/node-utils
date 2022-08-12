const FileSelector = require(`${__dirname}/lib/classes/FileSelector.js`);

( async() => {
  
    const repoSelector = new FileSelector();
    const repo = repoSelector.chooseFolder(`${__dirname}/../../`);   
    console.log(repo);   

})().catch((err) => console.error(err) );
// })