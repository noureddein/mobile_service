$('.arabic_sec').hide()
$('.OTP_form').hide()

const authors_imgs = [
    'Abraham Lincoln',
    'Bruce Lee',
    'Carl Jung',
    'Confucius',
    'Henry Ford',
    'Lao Tzu',
    'Maya Angelou',
    'Napoleon Hill',
    'Oprah Winfrey',
    'Ralph Emerson',
    'Thich Nhat Hanh',
    'Thomas Edison',
    'Tony Robbins',
    'Wayne Dyer',
    'Napoleon Bonaparte'
]

const quotes_settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://type.fit/api/quotes",
    "method": "GET"
}



$.ajax(quotes_settings).done(function (response) {
    const data = JSON.parse(response);
    const indices = get_indices(0, data.length)
    for (i = 0; i < indices.length; i++) {
        if (i % 2 != 0) {
            const quote_data = new Quotes(indices[i], data)
            appending(quote_data, 'left_card')
        } else {
            const quote_data = new Quotes(indices[i], data)
            appending(quote_data, '')
        }
    }

    let scroll = window.requestAnimationFrame || function (callback) { window.setTimeout(callback, 1000 / 60) };
    let elementsToShow = document.querySelectorAll('.show_on')

    function loop() {

        elementsToShow.forEach(function (element) {
            if (isElementInViewport(element)) {
                element.classList.add('is-visible');
            } else {
                element.classList.remove('is-visible');
            }
        });

        scroll(loop);
    }
    loop();
    function isElementInViewport(el) {
        if (typeof jQuery === "function" && el instanceof jQuery) {
            el = el[0];
        }
        let rect = el.getBoundingClientRect();
        return (
            (rect.top <= 0
                && rect.bottom >= 0)
            ||
            (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.top <= (window.innerHeight || document.documentElement.clientHeight))
            ||
            (rect.top >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
        );
    }

});

function get_indices(min, max) {
    let arr = []
    for (i = 0; i < 10; i++) {
        let index = get_random_index(min, max)
        if (!arr.includes(index)) {
            arr.push(index)
        } else {
            get_random_index(min, max)
        }
    }

    return arr
}

function get_random_index(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


function appending(quote_data, dir) {
    const path = `assets/authors/${quote_data.img}`

    const div_container = $("<div class='card mb-3 show_on' style='max-width: 50rem;'></div>").addClass('quotes_card shadow-sm p-3 mb-5 rounded')
    const inner_div = $("<div class='row g-0'> </div>").addClass(dir)
    const div_img = $("<div class='col-md-4'></div>")
    const img = $("<img class='img-fluid rounded-start' alt=''>").attr("src", path);

    const div_desc = $("<div class='col-md-8'></div>")
    const div_inner_desc = $("<div class='card-body'></div>")

    const pEl = $("<p class='card-text'></p>")
    const h5 = $("<h5 class='card-title'></h5>").text(quote_data.author)
    const i = $(`<i class='fas fa-quote-left'></i> ${quote_data.quote} <i class='fas fa-quote-right'> </i>`)

    if (dir == 'left_card') {
        const container = $('#left_side_container')
        container.append(div_container)
        div_container.append(inner_div)
        inner_div.append(div_img)
        div_img.append(img)
        inner_div.append(div_desc)
        div_desc.append(div_inner_desc)
        div_inner_desc.append(pEl)
        pEl.append(i)
        div_inner_desc.append(h5)

    } else {
        const container = $('#right_side_container')
        container.append(div_container)
        div_container.append(inner_div)
        inner_div.append(div_img)
        div_img.append(img)
        inner_div.append(div_desc)
        div_desc.append(div_inner_desc)
        div_inner_desc.append(pEl)
        pEl.append(i)
        div_inner_desc.append(h5)

    }

}

function Quotes(index, data) {
    const unknown_author = 'giphy.gif'
    img_name = data[index].author
    if (authors_imgs.includes(img_name)) {
        this.img = img_name + '.jpeg'
    } else {
        this.img = unknown_author
    }

    this.quote = data[index].text
    this.author = data[index].author
}


$('#change_lang').on('click', function () {
    let button = $('#change_lang').text()
    if (button == 'English') {
        $('#change_lang').text('العربية')
        $('.arabic_sec').hide()
        $('.eng_sec').show()

    } else {
        $('#change_lang').text('English')
        $('.arabic_sec').show()
        $('.eng_sec').hide()
    }
})


const subscribe_form = document.getElementById('subscribe_form')
subscribe_form.addEventListener('submit', function (event) {
    event.preventDefault()
    $(".subscribe_form").hide()
    $(".OTP_form").show()
})

$('.mobile-slider').slick({
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: 'linear'
});

