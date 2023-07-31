let wow = new WOW({
    boxClass: 'wow',
    animateClass: 'animate__animated',
    offset: 200,
    mobile: true,
    live: true
})
wow.init();

//слайдер с бургерами
$('.menu__slider_items').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    appendArrows: $('.menu__items_arrows'),
    prevArrow: $('.menu__items_arrow_prev'),
    nextArrow: $('.menu__items_arrow_next'),

    responsive: [
        {
            breakpoint: 1447,
            settings: {
                slidesToShow: 3
            }
        },
        {
            breakpoint: 970,
            settings: {
                slidesToShow: 2
            }
        },
        {
            breakpoint: 769,
            settings: {
                slidesToShow: 1
            }
        }
    ]
});

//слайдер с отзывами
$('.reviews__slider_items').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    appendArrows: $('.reviews__items_arrows'),
    prevArrow: $('.reviews__items_arrow_prev'),
    nextArrow: $('.reviews__items_arrow_next'),
    responsive: [
        {
            breakpoint: 1450,
            settings: {
                slidesPerRow: 2,
                slidesToShow: 2
            }
        },
        {
            breakpoint: 883,
            settings: {
                slidesPerRow: 1,
                slidesToShow: 1
            }
        },

    ]
});

const phone = $('#tel');
const name = $('#name');
const success = $('.success');
phone.inputmask({"mask": "+ 7 (999) 999-9999"});

const count = 30;
// запущен таймер или нет
let started = false;

//таймер
function start() {
    // запоминаем время начала
    const start_time = new Date();
    // получаем время окончания таймера
    const stop_time = start_time.setMinutes(start_time.getMinutes() + count);

    // запускаем ежесекундный отсчёт
    const countdown = setInterval(function () {
        // текущее время
        const now = new Date().getTime();
        // сколько времени осталось до конца таймера
        const remain = stop_time - now;
        // переводим миллисекунды в минуты и секунды
        let min = Math.floor((remain % (1000 * 60 * 60)) / (1000 * 60));
        let sec = Math.floor((remain % (1000 * 60)) / 1000);
        // если значение текущей секунды меньше 10, добавляем вначале ведущий ноль
        sec = sec < 10 ? "0" + sec : sec;
        // отправляем значение таймера на страницу в нужный раздел
        $('.minutes_tens').html(Math.floor(min / 10));
        $('.minutes_units').html(Math.floor(min % 10));
        $('.seconds_tens').html(Math.floor(sec / 10));
        $('.seconds_units').html(Math.floor(sec % 10));
        // если время вышло
        if (remain < 0) {
            // останавливаем отсчёт
            clearInterval(countdown);
        }
    }, 1000);
    // помечаем, что таймер уже запущен
    started = true;
}

start();

//отправка формы
$('#submit_button').click(() => {

    $('.error-input').hide();

    let hasError = false;

    if (!name.val()) {
        name.next().show();
        hasError = true;
        name.css({
            "box-shadow": "0 0 9px 0px red",
            "border-color": "red"
        });
    } else {
        name.css({"box-shadow": "0 0 9px 0px green", "border-color": "green"});
    }

    if (!phone.val()) {
        phone.next().show();
        hasError = true;
        phone.css({
            "box-shadow": "0 0 9px 0px red",
            "border-color": "red"
        });
    } else {
        phone.css({"box-shadow": "0 0 9px 0px green", "border-color": "green"});
    }


    if (!hasError) {
        $.ajax({
            method: "POST",
            url: "https://testologia.site/checkout",
            data: {name: name.val(), phone: phone.val()}
        })
            .done(function (msg) {
                console.log(msg);
                if (msg.success) {
                    success.css({
                        "display": "flex"
                    });
                    $('.form')[0].reset();
                    name.css({
                        "box-shadow": "none", "border": "1px solid rgb(253, 177, 91)"
                    })
                    phone.css({
                        "box-shadow": "none", "border": "1px solid rgb(253, 177, 91)"
                    })
                } else {
                    alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ!');
                }
            });
    }
})
//закрытие попапа по нажатию на крестик
const close = $('#close');

close.click(() => {
    success.hide();
})

$('#burger_menu').click(()=>{
    $('#menu__header-items').addClass('open')
    $('.placeholder__adaptive').css("display", "flex");
});

$('#menu__header-items *').click(()=> {
    $('#menu__header-items').removeClass('open')
    $('.placeholder__adaptive').css("display", "none");
});

