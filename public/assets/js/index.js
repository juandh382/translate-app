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
                    console.log(msg);
                    const downloadLink = `<a href="/translations/${msg}" download id="downloadlink"></a>`;
                    document.body.innerHTML += downloadLink;

                    document.getElementById('downloadlink').click();
                    document.body.removeChild(document.getElementById('downloadlink'));
                }
            },
            error: function (error) {
                console.log('Error: In sending the request!', error);
            }
        })
    });
});