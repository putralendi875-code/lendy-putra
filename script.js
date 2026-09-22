/* =====================================================
   KETAN SUSU LENA
   ANIMATED WEBSITE JAVASCRIPT
===================================================== */


/* =====================================================
   DATA KERANJANG
===================================================== */

let keranjang = [];


/* =====================================================
   FORMAT RUPIAH
===================================================== */

function formatRupiah(angka) {

    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(angka);

}


/* =====================================================
   TAMBAH KERANJANG
===================================================== */

function tambahKeranjang(nama, harga) {

    const item = keranjang.find(
        produk => produk.nama === nama
    );


    if (item) {

        item.jumlah += 1;

    } else {

        keranjang.push({
            nama: nama,
            harga: harga,
            jumlah: 1
        });

    }


    updateKeranjang();


    /* animasi tombol cart */

    const cartButton =
        document.querySelector(".cart-btn");

    if (cartButton) {

        cartButton.classList.remove("cart-bounce");

        void cartButton.offsetWidth;

        cartButton.classList.add("cart-bounce");

    }


    /* efek notifikasi */

    tampilkanToast(
        `${nama} ditambahkan ke keranjang 💗`
    );

}


/* =====================================================
   UPDATE KERANJANG
===================================================== */

function updateKeranjang() {

    const badge =
        document.getElementById("cartBadge");

    const totalJumlah =
        keranjang.reduce(
            (total, item) =>
                total + item.jumlah,
            0
        );


    if (badge) {

        badge.textContent = totalJumlah;

    }


    tampilkanKeranjang();

}


/* =====================================================
   TAMPILKAN KERANJANG
===================================================== */

function tampilkanKeranjang() {

    const container =
        document.getElementById("cartItems");

    const totalElement =
        document.getElementById("cartTotal");


    if (!container) return;


    if (keranjang.length === 0) {

        container.innerHTML = `

            <div class="empty-cart">

                🛒

                <p>
                    Keranjang masih kosong
                </p>

            </div>

        `;

        if (totalElement) {
            totalElement.textContent = "Rp0";
        }

        return;

    }


    let total = 0;


    container.innerHTML = keranjang.map(
        (item, index) => {

            const subtotal =
                item.harga * item.jumlah;

            total += subtotal;


            return `

                <div
                    class="cart-item"
                    style="
                    display:flex;
                    align-items:center;
                    justify-content:space-between;
                    gap:12px;
                    padding:12px 0;
                    border-bottom:1px solid #f5dbe7;
                    "
                >

                    <div>

                        <strong
                            style="
                            font-size:13px;
                            color:#54253f;
                            "
                        >
                            ${item.nama}
                        </strong>

                        <div
                            style="
                            color:#f52f87;
                            font-size:11px;
                            margin-top:3px;
                            "
                        >
                            ${formatRupiah(item.harga)}
                        </div>

                    </div>


                    <div
                        style="
                        display:flex;
                        align-items:center;
                        gap:7px;
                        "
                    >

                        <button
                            onclick="ubahJumlah(${index}, -1)"
                            style="
                            width:28px;
                            height:28px;
                            border:none;
                            border-radius:50%;
                            background:#ffe2ee;
                            color:#f52f87;
                            "
                        >
                            −
                        </button>


                        <b>
                            ${item.jumlah}
                        </b>


                        <button
                            onclick="ubahJumlah(${index}, 1)"
                            style="
                            width:28px;
                            height:28px;
                            border:none;
                            border-radius:50%;
                            background:#f52f87;
                            color:white;
                            "
                        >
                            +
                        </button>

                    </div>

                </div>

            `;

        }
    ).join("");


    if (totalElement) {

        totalElement.textContent =
            formatRupiah(total);

    }

}


/* =====================================================
   UBAH JUMLAH
===================================================== */

function ubahJumlah(index, perubahan) {

    if (!keranjang[index]) return;


    keranjang[index].jumlah += perubahan;


    if (keranjang[index].jumlah <= 0) {

        keranjang.splice(index, 1);

    }


    updateKeranjang();

}


/* =====================================================
   CHECKOUT WHATSAPP
===================================================== */

function checkoutWhatsApp() {

    if (keranjang.length === 0) {

        tampilkanToast(
            "Keranjang masih kosong 🛒"
        );

        return;

    }


    let pesan =
        "Halo Ketan Susu Lena! 👋%0A%0A";

    pesan +=
        "*Saya ingin memesan:*%0A";


    let total = 0;


    keranjang.forEach(item => {

        const subtotal =
            item.harga * item.jumlah;

        total += subtotal;


        pesan +=
            `• ${item.nama} x${item.jumlah} = ${formatRupiah(subtotal)}%0A`;

    });


    pesan +=
        `%0A*Total: ${formatRupiah(total)}*%0A%0A`;

    pesan +=
        "Mohon konfirmasi pesanannya ya. Terima kasih 💗";


    /*
       NOMOR WHATSAPP
       Sudah disesuaikan dengan nomor
       yang terlihat pada gambar kamu.
    */

    const nomor =
        "6289673193710";


    const url =
        `https://wa.me/${nomor}?text=${pesan}`;


    window.open(url, "_blank");

}


/* =====================================================
   SEARCH MENU
===================================================== */

const searchInput =
    document.getElementById("searchMenu");


if (searchInput) {

    searchInput.addEventListener(
        "input",
        function () {

            const keyword =
                this.value.toLowerCase().trim();


            const menuItems =
                document.querySelectorAll(".menu-item");


            menuItems.forEach(item => {

                const nama =
                    item
                    .getAttribute("data-name")
                    .toLowerCase();


                if (nama.includes(keyword)) {

                    item.style.display = "";

                    setTimeout(() => {
                        item.classList.add("show-item");
                    }, 10);

                } else {

                    item.classList.remove("show-item");

                    item.style.display = "none";

                }

            });

        }
    );

}


/* =====================================================
   FILTER MENU
===================================================== */

const filterButtons =
    document.querySelectorAll(".filter-btn");


filterButtons.forEach(button => {

    button.addEventListener(
        "click",
        function () {

            filterButtons.forEach(btn => {
                btn.classList.remove("active");
            });


            this.classList.add("active");


            const filter =
                this.getAttribute("data-filter");


            const menuItems =
                document.querySelectorAll(".menu-item");


            menuItems.forEach(item => {

                const category =
                    item.getAttribute(
                        "data-category"
                    );


                if (
                    filter === "all" ||
                    category.includes(filter)
                ) {

                    item.style.display = "";

                    item.classList.remove(
                        "show-item"
                    );


                    setTimeout(() => {

                        item.classList.add(
                            "show-item"
                        );

                    }, 30);

                } else {

                    item.style.display = "none";

                }

            });


            /* scroll sedikit agar terasa smooth */

            const menuSection =
                document.getElementById("menu");

            if (menuSection) {

                menuSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        }
    );

});


/* =====================================================
   NAVBAR SAAT SCROLL
===================================================== */

const navbar =
    document.querySelector(".navbar");


window.addEventListener(
    "scroll",
    function () {

        if (!navbar) return;


        if (window.scrollY > 50) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    },
    {
        passive: true
    }
);


/* =====================================================
   ANIMASI SAAT SCROLL
===================================================== */

const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "show"
                    );

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


document
    .querySelectorAll(".animate-on-scroll")
    .forEach(element => {

        observer.observe(element);

    });


/* =====================================================
   ANIMASI TOPPING CARD
===================================================== */

const toppingCards =
    document.querySelectorAll(
        ".topping-card"
    );


toppingCards.forEach(
    (card, index) => {

        card.style.transitionDelay =
            `${index * 0.05}s`;

    }
);


/* =====================================================
   EFEK PARALLAX HERO
===================================================== */

const heroProduct =
    document.querySelector(".hero-product");


window.addEventListener(
    "mousemove",
    function (event) {

        if (!heroProduct) return;


        /*
           Jangan aktifkan efek berat
           pada layar kecil.
        */

        if (window.innerWidth < 992) return;


        const x =
            (window.innerWidth / 2 - event.clientX)
            / 60;


        const y =
            (window.innerHeight / 2 - event.clientY)
            / 60;


        heroProduct.style.transform =
            `translate(${x}px, ${y}px)`;

    },
    {
        passive: true
    }
);


/* =====================================================
   RESET PARALLAX
===================================================== */

window.addEventListener(
    "mouseleave",
    function () {

        if (!heroProduct) return;

        heroProduct.style.transform =
            "translate(0,0)";

    }
);


/* =====================================================
   TOAST NOTIFICATION
===================================================== */

function tampilkanToast(pesan) {

    let toast =
        document.getElementById(
            "customToast"
        );


    if (!toast) {

        toast =
            document.createElement("div");

        toast.id =
            "customToast";


        toast.style.position =
            "fixed";

        toast.style.bottom =
            "25px";

        toast.style.right =
            "25px";

        toast.style.zIndex =
            "9999";

        toast.style.maxWidth =
            "320px";

        toast.style.padding =
            "13px 18px";

        toast.style.borderRadius =
            "50px";

        toast.style.background =
            "linear-gradient(135deg,#f52f87,#ff78b0)";

        toast.style.color =
            "white";

        toast.style.fontSize =
            "12px";

        toast.style.fontWeight =
            "600";

        toast.style.boxShadow =
            "0 10px 30px rgba(245,47,135,.3)";

        toast.style.transform =
            "translateY(30px)";

        toast.style.opacity =
            "0";

        toast.style.transition =
            "all .4s ease";


        document.body.appendChild(toast);

    }


    toast.textContent =
        pesan;


    requestAnimationFrame(() => {

        toast.style.transform =
            "translateY(0)";

        toast.style.opacity =
            "1";

    });


    clearTimeout(
        toast.hideTimer
    );


    toast.hideTimer =
        setTimeout(() => {

            toast.style.transform =
                "translateY(30px)";

            toast.style.opacity =
                "0";

        }, 2500);

}


/* =====================================================
   SMOOTH NAVBAR LINK
===================================================== */

document
    .querySelectorAll(".nav-link")
    .forEach(link => {

        link.addEventListener(
            "click",
            function () {

                document
                    .querySelectorAll(".nav-link")
                    .forEach(item => {
                        item.classList.remove(
                            "active"
                        );
                    });


                this.classList.add(
                    "active"
                );

            }
        );

    });


/* =====================================================
   ACTIVE NAVBAR BERDASARKAN SECTION
===================================================== */

const sections =
    document.querySelectorAll(
        "section[id]"
    );


window.addEventListener(
    "scroll",
    function () {

        let current = "";


        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 150;


            if (
                window.scrollY >=
                sectionTop
            ) {

                current =
                    section.getAttribute(
                        "id"
                    );

            }

        });


        document
            .querySelectorAll(".nav-link")
            .forEach(link => {

                link.classList.remove(
                    "active"
                );


                if (
                    link.getAttribute(
                        "href"
                    ) === `#${current}`
                ) {

                    link.classList.add(
                        "active"
                    );

                }

            });

    },
    {
        passive: true
    }
);


/* =====================================================
   TYPING EFFECT UNTUK HERO
===================================================== */

const heroDescription =
    document.querySelector(
        ".hero p"
    );


if (heroDescription) {

    heroDescription.style.opacity =
        "1";

}


/* =====================================================
   INITIAL
===================================================== */

updateKeranjang();

console.log(
    "Ketan Susu Lena Website Loaded 💗"
);