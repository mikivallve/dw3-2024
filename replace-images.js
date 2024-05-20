const { replaceInFile } = require('replace-in-file');

(async () => {
    try {
        const results = await replaceInFile({
            files: '**/*.html',
            from: /(?<!\.webp)(?:\.(jpg|jpeg|png))/gi,
            to: '.webp',
        });
        console.log('Replacement results:', results);
    } catch (error) {
        console.error('Error occurred:', error);
    }
})();
