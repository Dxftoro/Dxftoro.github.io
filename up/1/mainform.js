function saveInput() {
    const formData = {
        fullName: $('#fullName').val(),
        email: $('#email').val(),
        phone: $('#phone').val(),
        progLanguage: $('#progLanguage').val(),
        message: $('#message').val()
    };

    // Сохранение данных в LocalStorage
    localStorage.setItem('fullName', formData.fullName);
    localStorage.setItem('email', formData.email);
    localStorage.setItem('phone', formData.phone);
    localStorage.setItem('progLanguage', formData.progLanguage);
    localStorage.setItem('message', formData.message);

    return formData;
}

$(document).ready(function() {
    // Открытие попапа и изменение URL
    $('#openForm').click(function() {
        $('#feedbackModal').modal('show');
        history.pushState(null, null, '?feedback=true');
    });

    // Закрытие попапа и восстановление URL
    $(window).on('popstate', function() {
        $('#feedbackModal').modal('hide');
        history.pushState(null, null, location.href); // Для блокировки кнопки "Назад"
    });

    // Восстановление данных из LocalStorage
    $('#fullName').val(localStorage.getItem('fullName'));
    $('#email').val(localStorage.getItem('email'));
    $('#phone').val(localStorage.getItem('phone'));
    $('#progLanguage').val(localStorage.getItem('progLanguage'));
    $('#message').val(localStorage.getItem('message'));


    $('#feedbackForm').on('change', function(e) {
        saveInput();
        console.log("Input saved!");
    });

    // Отправка формы
    $('#feedbackForm').on('submit', function(e) {
        e.preventDefault();
        const formData = saveInput();

        // Отправка данных на сервер
        $.ajax({
            url: 'https://formcarry.com/s/kaclKO75WmG',
            method: 'POST',
            dataType: "json",
            data: formData,
            success: function(response) {
                if (response.status == "success") {
                    $('#responseMessage').text('Ваше сообщение успешно отправлено!').css('color', 'cyan').show();
                    $('#feedbackForm')[0].reset(); // Очистка формы
                    localStorage.clear(); // Очистка LocalStorage
                }
                else {
                    $('#responseMessage').text('Произошла ошибка: '+ response.status + ' - пожалуйста, попробуйте ещё раз!').css('color', 'red').show();
                }
            },
            error: function(response) {
                $('#responseMessage').text(response.status + ' - ' + response.message).css('color', 'red').show();
            }
        });
    });
});
