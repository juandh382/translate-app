$(document).ready(function () {
    $("form").submit(function (e) {
        e.preventDefault();
        const data = new FormData($('form')[0]);
        $.ajax({
            url: '/files',
            type: 'POST',
            contentType: false,
            processData: false,
            cache: false,
            data,
            success: function (res) {
                const { ok, msg } = res;
                if (ok) {
                    Export2Word(msg);
                }
            },
            error: function () {
                console.log('Error: In sending the request!');
            }
        })
    });
});



const Export2Word = (content, filename = '') => {
    const preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
    const postHtml = "</body></html>";
    const html = preHtml + content + postHtml;

    const blob = new Blob(['\ufeff', html], {
        type: 'application/msword'
    });

    // Specify link url
    const url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);

    // Specify file name
    filename = filename ? filename + '.doc' : 'document.doc';

    // Create download link element
    const downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);

    if (navigator.msSaveOrOpenBlob) {
        navigator.msSaveOrOpenBlob(blob, filename);
    } else {
        // Create a link to the file
        downloadLink.href = url;

        // Setting the file name
        downloadLink.download = filename;

        //triggering the function
        downloadLink.click();
    }

    document.body.removeChild(downloadLink);
}