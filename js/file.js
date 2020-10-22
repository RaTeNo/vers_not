//jQuery plugin
(function($) {

    $.fn.uploader = function(options) {
        var settings = $.extend({
            MessageAreaText: "",
            MessageAreaTextWithFiles: "",
            DefaultErrorMessage: "Unable to open this file.",
            BadTypeErrorMessage: "Не поддерживаемый формат файла.",
            acceptedFileTypes: ['pdf', 'jpg', 'gif', 'jpeg', 'bmp', 'tif', 'tiff', 'png', 'xps', 'doc', 'docx',
                'fax', 'wmp', 'ico', 'txt', 'cs', 'rtf', 'xls', 'xlsx'
            ]
        }, options);

        var uploadId = 1;
        //update the messaging 
        $('.file-uploader__message-area p').text(options.MessageAreaText || settings.MessageAreaText);

        //create and add the file list and the hidden input list
        var fileList = $('<ul class="file-list"></ul>');
        var hiddenInputs = $('<div class="hidden-inputs hidden"></div>');
        $('.file-uploader__message-area').after(fileList);
        $('.file-list').after(hiddenInputs);

        //when choosing a file, add the name to the list and copy the file input into the hidden inputs
        $('.file-chooser__input').on('change', function() {
            var file = $('.file-chooser__input').val();
            var fileName = (file.match(/([^\\\/]+)$/)[0]);

            //clear any error condition
            $('.file-chooser').removeClass('error');
            $('.error-message').remove();

            //validate the file
            var check = checkFile(fileName);
            if (check === "valid") {

                // move the 'real' one to hidden list 
                $('.hidden-inputs').append($('.file-chooser__input'));

                //insert a clone after the hiddens (copy the event handlers too)
                $('.file-chooser').append($('.file-chooser__input').clone({ withDataAndEvents: true }));

                //add the name and a remove button to the file-list
                $('.file-list').append('<li style="display: none;"><svg width="14" height="28" viewBox="0 0 14 28" fill="none" xmlns="http://www.w3.org/2000/svg">                                                <path d="M5.09091 0C2.2943 0 0 2.2943 0 5.09091V21C0 24.8507 3.14927 28 7 28C10.8507 28 14 24.8507 14 21V6.36364H11.4545V21C11.4545 23.4747 9.47472 25.4545 7 25.4545C4.52528 25.4545 2.54545 23.4747 2.54545 21V5.09091C2.54545 3.6697 3.6697 2.54545 5.09091 2.54545C6.51212 2.54545 7.63636 3.6697 7.63636 5.09091V18.4545C7.63636 18.8197 7.36519 19.0909 7 19.0909C6.63481 19.0909 6.36364 18.8197 6.36364 18.4545V6.36364H3.81818V18.4545C3.81818 20.197 5.25756 21.6364 7 21.6364C8.74244 21.6364 10.1818 20.197 10.1818 18.4545V5.09091C10.1818 2.2943 7.88752 0 5.09091 0Z"/>                                            </svg><span class="file-list__name">' + fileName + '</span><button class="removal-button" data-uploadid="' + uploadId + '"></button></li>');
                $('.file-list').find("li:last").show();

                //removal button handler
                $('.removal-button').on('click', function(e) {
                    e.preventDefault();

                    //remove the corresponding hidden input
                    $('.hidden-inputs input[data-uploadid="' + $(this).data('uploadid') + '"]').remove();

                    //remove the name from file-list that corresponds to the button clicked
                    $(this).parent().hide().queue(function() { $(this).remove(); });

                    //if the list is now empty, change the text back 
                    if ($('.file-list li').length === 0) {
                        $('.file-uploader__message-area').text(options.MessageAreaText || settings.MessageAreaText);
                    }
                });

                //so the event handler works on the new "real" one
                $('.hidden-inputs .file-chooser__input').removeClass('file-chooser__input').attr('data-uploadId', uploadId);

                //update the message area
                $('.file-uploader__message-area').text(options.MessageAreaTextWithFiles || settings.MessageAreaTextWithFiles);

                uploadId++;

            } else {
                //indicate that the file is not ok
                $('.file-chooser').addClass("error");
                var errorText = options.DefaultErrorMessage || settings.DefaultErrorMessage;

                if (check === "badFileName") {
                    errorText = options.BadTypeErrorMessage || settings.BadTypeErrorMessage;
                }

                $('.file-chooser__input').after('<p class="error-message">' + errorText + '</p>');
            }
        });

        var checkFile = function(fileName) {
            var accepted = "invalid",
                acceptedFileTypes = this.acceptedFileTypes || settings.acceptedFileTypes,
                regex;

            for (var i = 0; i < acceptedFileTypes.length; i++) {
                regex = new RegExp("\\." + acceptedFileTypes[i] + "$", "i");

                if (regex.test(fileName)) {
                    accepted = "valid";
                    break;
                } else {
                    accepted = "badFileName";
                }
            }

            return accepted;
        };
    };
}(jQuery));

//init 
$(document).ready(function() {
    $('.fileUploader').uploader({
        MessageAreaText: "Файлы не выбраны."
    });
});