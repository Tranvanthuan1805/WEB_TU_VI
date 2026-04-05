
window.elfinderTinyMceConfig = {
    setup: function (editor) {
        editor.ui.registry.addButton('elfinder', {
            icon: 'browse',
            tooltip: 'Chọn ảnh từ elFinder',
            onAction: function () {
                window.elfinderDialog(editor);
            }
        });
    }
};

window.elfinderDialog = function (editor) {
    $('<div/>').dialogelfinder({
        baseUr: '/lib/elfinder/',
        url: '/file-manager-connector',
        lang: 'vi',
        width: 840,
        height: 450,
        destroyOnClose: true,
        getFileCallback: function (file) {
            const selected = Array.isArray(file) ? file[0] : file;
            const url = selected?.url || '';
            if (!url) return;

            editor.insertContent(`<img src="${url}" />`);
        },
        commandsOptions: {
            getfile: {
                oncomplete: 'close',
                folders: false
            }
        }
    });
};