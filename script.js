(function () {
    var PIX_CHAVE = "75999914620";

    function qrUrlParaPayload(payload) {
        return (
            "https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=10&data=" +
            encodeURIComponent(payload)
        );
    }

    var presentes = [
        {
            id: 1,
            titulo: "Só para dizer que não dei nada",
            descricao: "",
            preco: 50,
            img: "assets/presente-1.jpeg",
            pixCopiaECola:
                "00020126360014BR.GOV.BCB.PIX0114+5575999914620520400005303986540550.005802BR5925Gessica Vitoria Souza dos6009SAO PAULO621405107xVt9XAB0V63048D50",
        },
        {
            id: 2,
            titulo: "Cota para perguntar quando o casal terá fihos",
            descricao: "",
            preco: 100,
            img: "assets/presente-2.jpeg",
            pixCopiaECola: "00020126360014BR.GOV.BCB.PIX0114+55759999146205204000053039865406100.005802BR5925Gessica Vitoria Souza dos6009SAO PAULO62140510sa86R8Nmf063041F17",
        },
        {
            id: 3,
            titulo: "Para a noiva não se atrasar",
            descricao: "",
            preco: 150,
            img: "assets/presente-3.jpeg",
            pixCopiaECola: "00020126360014BR.GOV.BCB.PIX0114+55759999146205204000053039865406150.005802BR5925Gessica Vitoria Souza dos6009SAO PAULO62140510AsrZdnzpBm6304E7F4",
        },
        {
            id: 4,
            titulo: "Um ano de corte para o noivo",
            descricao: "",
            preco: 200,
            img: "assets/presente-4.jpeg",
            pixCopiaECola: "00020126360014BR.GOV.BCB.PIX0114+55759999146205204000053039865406200.005802BR5925Gessica Vitoria Souza dos6009SAO PAULO62140510QJ94ZZlN4T63045053",
        },
        {
            id: 5,
            titulo: "Cobertor para a noiva se cobrir de razão",
            descricao: "",
            preco: 250,
            img: "assets/presente-5.jpeg",
            pixCopiaECola: "00020126360014BR.GOV.BCB.PIX0114+55759999146205204000053039865406250.005802BR5925Gessica Vitoria Souza dos6009SAO PAULO62140510zySqOTlsAS6304C4AE",
        },
        {
            id: 6,
            titulo: "Caixa de ferramentas para o noivo fazer coisas de Homem",
            descricao: "",
            preco: 300,
            img: "assets/caixa-de-ferramenta.jpg",
            pixCopiaECola: "00020126360014BR.GOV.BCB.PIX0114+55759999146205204000053039865406300.005802BR5925Gessica Vitoria Souza dos6009SAO PAULO621405106QdFZoO0Gb63048D07",
        },
        {
            id: 7,
            titulo: "Viagem para Maldivas",
            descricao: "",
            preco: 350,
            img: "assets/presente-7.jpeg",
            pixCopiaECola: "00020126360014BR.GOV.BCB.PIX0114+55759999146205204000053039865406350.005802BR5925Gessica Vitoria Souza dos6009SAO PAULO62140510Hbofw1MlOk63040E1F",
        },
        {
            id: 8,
            titulo: "Ajuda para o noivo comprar kit TPM para a noiva",
            descricao: "",
            preco: 400,
            img: "assets/presente-8.jpeg",
            pixCopiaECola: "00020126360014BR.GOV.BCB.PIX0114+55759999146205204000053039865406400.005802BR5925Gessica Vitoria Souza dos6009SAO PAULO62140510jtNKXsW1sv6304C269",
        },
        {
            id: 9,
            titulo: "Calmante da noiva para aguentar o noivo",
            descricao: "",
            preco: 450,
            img: "assets/presente-9.jpeg",
            pixCopiaECola: "00020126360014BR.GOV.BCB.PIX0114+55759999146205204000053039865406450.005802BR5925Gessica Vitoria Souza dos6009SAO PAULO62140510u7Num7amOT63041370",
        },
        {
            id: 10,
            titulo: "Desejar boa sorte para não chover",
            descricao: "",
            preco: 500,
            img: "assets/presente-10.jpeg",
            pixCopiaECola: "00020126360014BR.GOV.BCB.PIX0114+55759999146205204000053039865406500.005802BR5925Gessica Vitoria Souza dos6009SAO PAULO621405104oB2XI1uSk630431D8",
        },
        {
            id: 11,
            titulo: "Ajudar noivos na lua de mel",
            descricao: "",
            preco: 550,
            img: "assets/presente-11.jpeg",
            pixCopiaECola: "00020126360014BR.GOV.BCB.PIX0114+55759999146205204000053039865406550.005802BR5925Gessica Vitoria Souza dos6009SAO PAULO62140510XhiozXGVnf63048768",
        },
        {
            id: 12,
            titulo: "Se rir paga pix",
            descricao: "",
            preco: 600,
            img: "assets/presente-12.jpeg",
            pixCopiaECola: "00020126360014BR.GOV.BCB.PIX0114+55759999146205204000053039865406600.005802BR5925Gessica Vitoria Souza dos6009SAO PAULO62140510HcHCN0N6Lc63042B7E",
        },
        {
            id: 13,
            titulo: "Levar alguém que não foi convidado",
            descricao: "",
            preco: 1000,
            img: "assets/presente-6.jpeg",
            pixCopiaECola: "00020126360014BR.GOV.BCB.PIX0114+557599991462052040000530398654071000.005802BR5925Gessica Vitoria Souza dos6009SAO PAULO62140510qRmS4b8M7F63048371",
        },
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

    function payloadPixDoPresente(presente) {
        if (
            presente.pixCopiaECola &&
            String(presente.pixCopiaECola).trim() !== ""
        ) {
            return String(presente.pixCopiaECola).trim();
        }
        return PIX_CHAVE;
    }

    function abrirModal(presente) {
        var modal = document.getElementById("modal-pix");
        var nomeEl = document.getElementById("modal-presente-nome");
        var valorEl = document.getElementById("modal-presente-valor");
        var qr = document.getElementById("pix-qr");
        var chaveEl = document.getElementById("pix-chave");
        var labelChave = document.getElementById("pix-label-chave");
        var hintEl = document.getElementById("pix-hint");
        var btnCopiar = document.getElementById("btn-copiar-chave");

        if (!modal || !nomeEl || !valorEl) return;

        var payload = payloadPixDoPresente(presente);
        var usaEmv =
            presente.pixCopiaECola &&
            String(presente.pixCopiaECola).trim() !== "";

        nomeEl.textContent = presente.titulo;
        valorEl.textContent =
            "Sugestão de contribuição: " + formatBRL(presente.preco);

        if (chaveEl) {
            chaveEl.textContent = payload;
            chaveEl.classList.toggle("pix-key--emv", usaEmv);
        }
        if (labelChave) {
            labelChave.textContent = usaEmv
                ? "Código PIX (copia e cola — valor já definido)"
                : "Chave PIX (telefone)";
        }
        if (hintEl) {
            hintEl.textContent = usaEmv
                ? "Escaneie o QR ou cole o código no app do banco — o valor sugerido já está no PIX."
                : "Escaneie com o app do seu banco ou copie a chave acima.";
        }
        if (btnCopiar) {
            btnCopiar.textContent = usaEmv ? "Copiar código PIX" : "Copiar chave";
        }

        if (qr) {
            qr.src = qrUrlParaPayload(payload);
            qr.alt = usaEmv
                ? "QR Code PIX com valor definido"
                : "QR Code PIX — chave " + PIX_CHAVE;
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
