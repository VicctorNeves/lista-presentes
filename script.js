(function () {
    var PIX_CHAVE = "75999914620";
    // QR com a chave PIX (texto); substitua por imagem estática se preferir PIX copia-e-cola EMV
    var QR_URL =
        "https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=10&data=" +
        encodeURIComponent(PIX_CHAVE);

    var presentes = [
        {
            id: 1,
            titulo: "Só para dizer que não dei nada",
            descricao: "",
            preco: 50,
            img: "assets/presente-1.jpeg",
        },
        {
            id: 2,
            titulo: "Cota para perguntar quando o casal terá fihos",
            descricao: "",
            preco: 100,
            img: "assets/presente-2.jpeg",
        },
        {
            id: 3,
            titulo: "Para a noiva não se atrasar",
            descricao: "",
            preco: 150,
            img: "assets/presente-3.jpeg",
        },
        {
            id: 4,
            titulo: "Um ano de corte para o noivo",
            descricao: "",
            preco: 200,
            img: "assets/presente-4.jpeg",
        },
        {
            id: 5,
            titulo: "Cobertor para a noiva se cobrir de razão",
            descricao: "",
            preco: 250,
            img: "assets/presente-5.jpeg",
        },
        {
            id: 6,
            titulo: "Levar alguém que não foi convidado",
            descricao: "",
            preco: 1000,
            img: "assets/presente-6.jpeg",
        },
        {
            id: 7,
            titulo: "Viagem para Maldivas",
            descricao: "",
            preco: 350,
            img: "assets/presente-7.jpeg",
        },
        {
            id: 8,
            titulo: "Ajuda pro noivo comprar kit TPM para a noiva",
            descricao: "",
            preco: 400,
            img: "assets/presente-8.jpeg",
        },
        {
            id: 9,
            titulo: "Calmante da noiva para aguentar o noivo",
            descricao: "",
            preco: 450,
            img: "assets/presente-9.jpeg",
        },
        {
            id: 10,
            titulo: "Desejar boa sorte para não chover",
            descricao: "",
            preco: 500,
            img: "assets/presente-10.jpeg",
        },
        {
            id: 11,
            titulo: "Ajudar noivos na lua de mel",
            descricao: "",
            preco: 550,
            img: "assets/presente-11.jpeg",
        },
        {
            id: 12,
            titulo: "Se rir paga pix",
            descricao: "",
            preco: 600,
            img: "assets/presente-12.jpeg",
        }
    ];

    function formatBRL(valor) {
        return valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
    }

    function renderLista() {
        var container = document.getElementById("lista-presentes");
        if (!container) return;

        var html = presentes
            .map(function (p) {
                var precoFmt = formatBRL(p.preco);
                var busca = (
                    p.titulo +
                    " " +
                    p.descricao +
                    " " +
                    precoFmt
                ).toLowerCase();
                return (
                    '<article class="gift-card" data-busca="' +
                    escapeAttr(busca) +
                    '">' +
                    '<img src="' +
                    escapeAttr(p.img) +
                    '" alt="' +
                    escapeAttr(p.titulo) +
                    '" loading="lazy">' +
                    '<div class="gift-card-body">' +
                    "<h3>" +
                    escapeHtml(p.titulo) +
                    "</h3>" +
                    '<p class="desc">' +
                    escapeHtml(p.descricao) +
                    "</p>" +
                    '<p class="preco">' +
                    precoFmt +
                    "</p>" +
                    '<button type="button" class="btn-pix" data-presente-id="' +
                    p.id +
                    '">Presentear via PIX</button>' +
                    "</div></article>"
                );
            })
            .join("");

        container.innerHTML = html;
    }

    function escapeHtml(str) {
        var div = document.createElement("div");
        div.textContent = str;
        return div.innerHTML;
    }

    function escapeAttr(str) {
        return String(str)
            .replace(/&/g, "&amp;")
            .replace(/"/g, "&quot;")
            .replace(/</g, "&lt;");
    }

    function abrirModal(presente) {
        var modal = document.getElementById("modal-pix");
        var nomeEl = document.getElementById("modal-presente-nome");
        var valorEl = document.getElementById("modal-presente-valor");
        var qr = document.getElementById("pix-qr");

        if (!modal || !nomeEl || !valorEl) return;

        nomeEl.textContent = presente.titulo;
        valorEl.textContent =
            "Sugestão de contribuição: " + formatBRL(presente.preco);
        if (qr) {
            qr.src = QR_URL;
            qr.alt = "QR Code PIX — chave " + PIX_CHAVE;
        }

        modal.hidden = false;
        document.body.style.overflow = "hidden";
        var closeBtn = modal.querySelector(".modal-close");
        if (closeBtn) closeBtn.focus();
    }

    function fecharModal() {
        var modal = document.getElementById("modal-pix");
        if (modal) {
            modal.hidden = true;
            document.body.style.overflow = "";
        }
    }

    function presentePorId(id) {
        for (var i = 0; i < presentes.length; i++) {
            if (presentes[i].id === id) return presentes[i];
        }
        return null;
    }

    function initModalListeners() {
        document.getElementById("lista-presentes").addEventListener("click", function (e) {
            var btn = e.target.closest(".btn-pix");
            if (!btn) return;
            var id = parseInt(btn.getAttribute("data-presente-id"), 10);
            var p = presentePorId(id);
            if (p) abrirModal(p);
        });

        var modal = document.getElementById("modal-pix");
        if (!modal) return;

        modal.querySelectorAll("[data-close-modal]").forEach(function (el) {
            el.addEventListener("click", fecharModal);
        });

        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape" && !modal.hidden) fecharModal();
        });
    }

    function initCopiarChave() {
        var btn = document.getElementById("btn-copiar-chave");
        if (!btn) return;
        btn.addEventListener("click", function () {
            var chave = document.getElementById("pix-chave");
            var texto = chave ? chave.textContent : PIX_CHAVE;

            function ok() {
                var original = btn.textContent;
                btn.textContent = "Copiado!";
                setTimeout(function () {
                    btn.textContent = original;
                }, 2000);
            }

            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(texto).then(ok).catch(fallback);
            } else {
                fallback();
            }

            function fallback() {
                var ta = document.createElement("textarea");
                ta.value = texto;
                ta.style.position = "fixed";
                ta.style.left = "-9999px";
                document.body.appendChild(ta);
                ta.select();
                try {
                    document.execCommand("copy");
                    ok();
                } catch (err) {}
                document.body.removeChild(ta);
            }
        });
    }

    function initBusca() {
        var input = document.getElementById("busca");
        if (!input) return;

        input.addEventListener("input", function () {
            var q = input.value.trim().toLowerCase();
            document.querySelectorAll(".gift-card").forEach(function (card) {
                var hay = card.getAttribute("data-busca") || "";
                if (!q || hay.indexOf(q) !== -1) {
                    card.classList.remove("hidden");
                } else {
                    card.classList.add("hidden");
                }
            });
        });
    }

    renderLista();
    initModalListeners();
    initCopiarChave();
    initBusca();
})();
