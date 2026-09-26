/* =====================================================
   KETAN SUSU LENA
   JAVASCRIPT
===================================================== */


/* =====================================================
   KERANJANG
===================================================== */

let keranjang = [];


function tambahKeranjang(nama, harga) {

    const produkAda = keranjang.find(
        item => item.nama === nama
    );

    if (produkAda) {

        produkAda.jumlah++;

    } else {

        keranjang.push({
            nama: nama,
            harga: harga,
            jumlah: 1
        });

    }

    updateKeranjang();

    tampilkanNotifikasi(
        "🛍️ " + nama + " ditambahkan!"
    );
}


function updateKeranjang() {

    const cartCount =
        document.getElementById("cartCount");

    let jumlah = 0;

    keranjang.forEach(item => {
        jumlah += item.jumlah;
    });

    cartCount.textContent = jumlah;


    const cartItems =
        document.getElementById("cartItems");


    if (keranjang.length === 0) {

        cartItems.innerHTML = `

            <div style="text-align:center;padding:40px 10px;">

                <div style="font-size:50px;">
                    🛍️
                </div>

                <h5>
                    Keranjang masih kosong
                </h5>

                <p style="color:#888;">
                    Yuk pilih menu favorit kamu!
                </p>

            </div>

        `;

        document.getElementById("cartTotal")
            .textContent = "Rp0";

        return;
    }


    let html = "";
    let total = 0;


    keranjang.forEach((item, index) => {

        const subtotal =
            item.harga * item.jumlah;

        total += subtotal;


        html += `

            <div class="cart-item">

                <div class="cart-item-info">

                    <strong>
                        ${item.nama}
                    </strong>

                    <small>
                        ${formatRupiah(item.harga)}
                    </small>

                </div>


                <div class="qty-control">

                    <button onclick="kurangiProduk(${index})">
                        -
                    </button>

                    <strong>
                        ${item.jumlah}
                    </strong>

                    <button onclick="tambahJumlah(${index})">
                        +
                    </button>

                </div>

            </div>

        `;

    });


    cartItems.innerHTML = html;

    document.getElementById("cartTotal")
        .textContent = formatRupiah(total);

}


function tambahJumlah(index) {

    keranjang[index].jumlah++;

    updateKeranjang();

}


function kurangiProduk(index) {

    keranjang[index].jumlah--;

    if (keranjang[index].jumlah <= 0) {

        keranjang.splice(index, 1);

    }

    updateKeranjang();

}


function bukaKeranjang() {

    updateKeranjang();

    const modalElement =
        document.getElementById("cartModal");

    const modal =
        new bootstrap.Modal(modalElement);

    modal.show();

}


function kosongkanKeranjang() {

    keranjang = [];

    updateKeranjang();

}


function formatRupiah(angka) {

    return new Intl.NumberFormat(
        "id-ID",
        {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }
    ).format(angka);

}


/* =====================================================
   WHATSAPP
===================================================== */

function checkoutWhatsApp() {

    if (keranjang.length === 0) {

        tampilkanNotifikasi(
            "Keranjang masih kosong 😅"
        );

        return;
    }


    let pesan =
        "Halo Ketan Susu Lena 👋\n\n";

    pesan +=
        "Saya ingin memesan:\n";


    let total = 0;


    keranjang.forEach(item => {

        const subtotal =
            item.harga * item.jumlah;

        total += subtotal;


        pesan +=
            `• ${item.nama} x${item.jumlah} = ${formatRupiah(subtotal)}\n`;

    });


    pesan +=
        `\nTotal: ${formatRupiah(total)}\n\n`;

    pesan +=
        "Mohon dibantu proses pesanannya ya. Terima kasih 🙏";


    const nomor =
        "6289673193710";


    window.open(
        `https://wa.me/${nomor}?text=${encodeURIComponent(pesan)}`,
        "_blank"
    );

}


/* =====================================================
   SEARCH
===================================================== */

const searchInput =
    document.getElementById("searchMenu");


if (searchInput) {

    searchInput.addEventListener(
        "input",
        function () {

            const keyword =
                this.value.toLowerCase();


            const menuItems =
                document.querySelectorAll(".menu-item");


            menuItems.forEach(item => {

                const nama =
                    item.dataset.name.toLowerCase();


                if (nama.includes(keyword)) {

                    item.style.display = "";

                } else {

                    item.style.display = "none";

                }

            });

        }
    );

}


/* =====================================================
   NAVBAR
===================================================== */

window.addEventListener(
    "scroll",
    function () {

        const navbar =
            document.getElementById("navbar");


        if (window.scrollY > 50) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    }
);


/* =====================================================
   SCROLL REVEAL
===================================================== */

const observer =
    new IntersectionObserver(

        function (entries) {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.12
        }

    );


document
    .querySelectorAll(".reveal")
    .forEach(element => {

        observer.observe(element);

    });


/* =====================================================
   HERO PARALLAX
===================================================== */

window.addEventListener(
    "scroll",
    function () {

        const heroImage =
            document.querySelector(".hero-image");

        if (!heroImage) return;

        const scroll =
            window.scrollY;


        heroImage.style.transform =
            `translateY(${scroll * 0.08}px)`;

    }
);


/* =====================================================
   RIPPLE
===================================================== */

document.addEventListener(
    "click",
    function (e) {

        const button =
            e.target.closest(
                ".btn-main, .btn-wa, .product-bottom button, .cart-button, .btn-add-topping, .btn-add-extra"
            );


        if (!button) return;


        const ripple =
            document.createElement("span");


        ripple.classList.add("ripple");


        button.appendChild(ripple);


        setTimeout(
            () => ripple.remove(),
            600
        );

    }
);


/* =====================================================
   NOTIFIKASI
===================================================== */

function tampilkanNotifikasi(teks) {

    const oldToast =
        document.querySelector(".custom-toast");


    if (oldToast) {
        oldToast.remove();
    }


    const toast =
        document.createElement("div");


    toast.className =
        "custom-toast";


    toast.innerHTML = `

        <i class="bi bi-check-circle-fill"></i>

        <span>
            ${teks}
        </span>

    `;


    document.body.appendChild(toast);


    setTimeout(() => {

        toast.classList.add("show");

    }, 50);


    setTimeout(() => {

        toast.classList.remove("show");

        setTimeout(
            () => toast.remove(),
            400
        );

    }, 2500);

}


/* =====================================================
   PRODUCT TILT
===================================================== */

document.addEventListener(
    "mousemove",
    function (e) {

        const cards =
            document.querySelectorAll(".product-card");


        cards.forEach(card => {

            const rect =
                card.getBoundingClientRect();


            if (
                e.clientX >= rect.left &&
                e.clientX <= rect.right &&
                e.clientY >= rect.top &&
                e.clientY <= rect.bottom
            ) {

                const x =
                    (e.clientX - rect.left) /
                    rect.width;

                const y =
                    (e.clientY - rect.top) /
                    rect.height;


                const rotateY =
                    (x - .5) * 5;

                const rotateX =
                    (y - .5) * -5;


                card.style.transform =
                    `perspective(800px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-10px)
                     scale(1.02)`;

            } else {

                card.style.transform = "";

            }

        });

    }
);


/* =====================================================
   LOAD
===================================================== */

window.addEventListener(
    "load",
    function () {

        document.body.classList.add("loaded");

    }
);