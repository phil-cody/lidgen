(function () {
    // Очистка всех ошибок в форме
    function clearFormErrors(form) {
        form.querySelectorAll('.error').forEach(function (el) {
            el.classList.remove('error');
        });
        form.querySelectorAll('.form__message').forEach(function (msg) {
            msg.remove();
        });
    }

    // Очистка ошибки конкретного поля
    function clearFieldError(field) {
        const container = field.closest('.form__group') || field.parentElement;
        if (!container) return;

        container.classList.remove('error');
        const msg = container.querySelector('.form__message');
        if (msg) msg.remove();
    }

    // Показ ошибки у произвольного required-поля
    function showFieldError(field) {
        let container = field.closest('.form__group') || field.parentElement;
        if (!container) return;

        container.classList.add('error');

        if (!container.querySelector('.form__message')) {
            const msg = document.createElement('div');
            msg.className = 'form__message';
            msg.textContent = field.title || 'Ошибка';
            container.appendChild(msg);
        }
    }

    // Валидация формы: проверяем все .required
    function validateForm(form) {
        let isValid = true;
        clearFormErrors(form);

        const requiredFields = form.querySelectorAll('.required');

        requiredFields.forEach(function (field) {
            const type = field.type;

            // Чекбокс
            if (type === 'checkbox') {
                if (!field.checked) {
                    showFieldError(field);
                    isValid = false;
                }
                return;
            }

            // Остальные поля (input, textarea, select)
            if (!String(field.value).trim()) {
                showFieldError(field);
                isValid = false;
            }
        });

        return isValid;
    }

    // Инициализация
    document.addEventListener('DOMContentLoaded', function () {
        // Вешаем "живую" очистку ошибок на все required-поля
        document.querySelectorAll('form[data-ajax]').forEach(function (form) {
            const requiredFields = form.querySelectorAll('.required');

            requiredFields.forEach(function (field) {
                const type = field.type;

                if (type === 'checkbox' || type === 'radio' || field.tagName === 'SELECT') {
                    field.addEventListener('change', function () {
                        // если чекбокс отмечен / select выбран — убираем ошибку
                        if ((type === 'checkbox' && field.checked) ||
                            (type === 'radio' && field.checked) ||
                            field.tagName === 'SELECT') {
                            clearFieldError(field);
                        }
                    });
                } else {
                    // для текстовых полей — по вводу
                    field.addEventListener('input', function () {
                        if (String(field.value).trim() !== '') {
                            clearFieldError(field);
                        }
                    });
                }
            });

            // Обработка отправки
            form.addEventListener('submit', function (e) {
                e.preventDefault(); // обязательно, чтобы не было перезагрузки

                if (!validateForm(form)) {
                    return;
                }

                const id = form.dataset.ajax; // zvonok / callback
                const btn = form.querySelector('[type="submit"]');
                const originalBtnText = btn ? btn.textContent : '';

                const formData = new FormData(form);
                formData.append('submit' + id, 1); // submitzvonok/submitcallback под ваш PHP

                if (btn) {
                    btn.disabled = true;
                }
                form.classList.add('submiting');

                const url = form.getAttribute('action') || window.location.href;

                fetch(url, {
                    method: 'POST',
                    body: formData
                })
                .then(function (response) {
                    if (!response.ok) {
                        throw new Error('HTTP error: ' + response.status);
                    }
                    return response.json();
                })
                .then(function (data) {
                    if (data.type === 'success') {
                        form.innerHTML = `
                          <div class="form-message form-message--success">
                            <div class="form-message__title">${data.title}</div>
                            <div class="form-message__text">${data.text}</div>
                          </div>
                        `;
                    } else {
                        if (btn) {
                            btn.disabled = false;
                            btn.textContent = originalBtnText;
                        }
                        form.classList.remove('submiting');
                        alert((data.title || 'Ошибка') + '\n' + (data.text || 'Попробуйте позже.'));
                    }
                })
                .catch(function (error) {
                    console.error('Ошибка:', error);
                    if (btn) {
                        btn.disabled = false;
                        btn.textContent = originalBtnText;
                    }
                    form.classList.remove('submiting');
                    alert('Произошла ошибка при отправке. Попробуйте позже.');
                });
            });
        });
    });
})();

"use strict";
$((function() {
    init()
}));
var windowWidth = $(window).width();

function throttle(t, e) {
    var o = 0;
    return function() {
        var n = (new Date).getTime();
        if (!(n - o < e)) return o = n, t.apply(void 0, arguments)
    }
}

function init() {
    scrollHeader(), popup(), mobMenu(), $(window).on("resize", throttle((function() {
        (windowWidth = $(window).width()) > 991.98 && menuLineAnim()
    }), 200)).trigger("resize")
}

function menuLineAnim() {
    var t = $(".menu__list"),
        e = $(".menu__item"),
        o = $(".menu__line");
    e.on("mouseenter", (function() {
        var e = t.offset().left,
            n = $(this).offset().left,
            i = $(this).outerWidth();
        o.css({
            opacity: 1,
            left: n - e + "px",
            width: i + "px"
        })
    })), e.on("mouseleave", (function() {
        var n = e.filter(".active");
        if (n.length) {
            var i = t.offset().left,
                a = n.offset().left,
                l = n.outerWidth();
            o.css({
                opacity: 1,
                left: a - i + "px",
                width: l + "px"
            })
        } else o.css("opacity", 0)
    }))
}

function scrollHeader() {
    var t = $('[data-scroll="header"]'),
        e = $("body"),
        o = 0,
        n = function() {
            var n = $(window).scrollTop();
            (n = n > o) ? (t.addClass("scroll"), e.addClass("scroll")) : (t.removeClass("scroll"), e.removeClass("scroll")), o = n
        };
    return $(window).on("scroll", n), n
}

function popup() {
    var t = $('[data-btn="popup"]'),
        e = $('[data-btn="close"]'),
        o = $(".popup"),
        n = $("body");
    t.on("click", (function(t) {
        t.preventDefault(), $("#popup_" + $(this).attr("name")).addClass("active"), n.addClass("lock")
    })), e.on("click", (function(t) {
        t.preventDefault(), o.removeClass("active"), n.removeClass("lock")
    }))
}

function mobMenu() {
    var t = $('[data-btn="burger-mob"]'),
        e = $("body"),
        o = $('[data-menu="mob"]');
    t.on("click", (function(n) {
        n.preventDefault(), t.toggleClass("active"), o.toggleClass("active"), o.hasClass("active") ? e.addClass("lock") : e.removeClass("lock")
    }))
}