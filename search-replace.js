module.exports = {
    files: 'dist/index.html',
    from: ['dist/', '<link rel="stylesheet" href="plugin/highlight/monokai.css" />', "plugins: [RevealMarkdown, RevealHighlight, RevealNotes],", '<script src="plugin/highlight/highlight.js"></script>', '<script src="plugin/notes/notes.js"></script>', '<script src="plugin/markdown/markdown.js"></script>'],
    to: '',
};