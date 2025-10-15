const menuBtn = document.getElementById('menu-btn');
const menuList = document.getElementById('header-cont-two');
let animationMenu = false;
let menuAtivo = false;

const inputOc = document.getElementById('oc1f');

function finalAnimationMenu() {
  animationMenu = false;
}

menuBtn.addEventListener('click', () => {
  menuAtivo = !menuAtivo;
  if (animationMenu) return;
  animationMenu = true;

  menuBtn.classList.toggle('active');
  menuList.classList.toggle('active');

  setTimeout(finalAnimationMenu, 500);
});

const cardOneC1 = document.getElementById('card-one-cont-one');
const cardTwoC1 = document.getElementById('card-two-cont-one');
const cardThreeC1 = document.getElementById('card-three-cont-one');
const cardFourC1 = document.getElementById('card-four-cont-one');
const cardsC1 = [cardOneC1, cardTwoC1, cardThreeC1, cardFourC1];

function CardsEntryAnimation() {
  cardsC1.forEach((c, i) => {
        if (!c.classList.contains('active')) {
            c.style.display = 'flex';
            setTimeout(() => {
                c.classList.add('active');
            }, 200 * i);
        }
    });
}

function CardsOffAnimation() {
  cardsC1.forEach(c => {
        if (c.classList.contains('active')) {
        c.style.display = 'none';
        c.classList.remove('active');
        }
    });
}

window.addEventListener('load', CardsEntryAnimation);

const input = document.getElementById('c1fvi');
const selects = document.getElementById('c1fv');
let files = [];

input.addEventListener('change', (e) => {
    const selectedFiles = Array.from(e.target.files);
    const allowedExtensions = [
        '.xlsx', '.jpg', '.jpeg', '.jfif', '.jpe', '.png',
        '.webp', '.avif', '.tif', '.tiff', '.gif', '.svg',
        '.heic', '.heif'
    ];

    const validFiles = selectedFiles.filter(file => {
        const ext = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
        return allowedExtensions.includes(ext);
    });

    if (validFiles.length === 0) {
        alert('Selecione os arquivos com as extensões permitidas');
        input.value = '';
        return;
    }

    if (validFiles.length > 0) {
        document.getElementById('c1fvt').classList.add('desativado');
    }

    validFiles.forEach(file => {
        const alreadyAdded = files.some(f => f.name === file.name && f.size === file.size && f.type === file.type);
        if (alreadyAdded) return;

        files.push(file);

        const fileItem = document.createElement('a');
        fileItem.className = 'c1fvdocument';
        let shortName = file.name;

        const width = screen.width;
        let widthExp = false;

        if (width > 440) widthExp = true;

        if (shortName.length > 35 && widthExp) {
            shortName = shortName.slice(0, 35) + "...";
        } else if (shortName.length > 20 && !widthExp) {
            shortName = shortName.slice(0, 20) + "...";
        }

        fileItem.textContent = shortName + " ";

        const iOne = document.createElement('i');
        const iTwo = document.createElement('i');

        iOne.className = 'fa-regular fa-file';
        iTwo.className = 'fa-solid fa-xmark';

        iTwo.onclick = () => {
            const fileIndex = files.indexOf(file);
            if (fileIndex > -1) files.splice(fileIndex, 1);

            fileItem.remove();

            if (files.length === 0) {
                document.getElementById('c1fvt').classList.remove('desativado');
                boxItem();
            }
        };

        fileItem.appendChild(iOne);
        fileItem.appendChild(iTwo);
        selects.appendChild(fileItem);

        input.value = '';

        boxItem();
    });
});

selects.addEventListener('dragover', (e) => {
    e.preventDefault();
    selects.style.borderColor = 'rgb(0, 44, 59, 0.5)';
    document.getElementById('c1fvt').style.color = 'rgb(0, 44, 59, 0.5)';
});

selects.addEventListener('dragleave', () => {
  selects.style.borderColor = 'rgb(0, 44, 59)';
  document.getElementById('c1fvt').style.color = 'rgb(0, 44, 59)';
});

selects.addEventListener('drop', (e) => {
  e.preventDefault();
  selects.style.borderColor = 'rgb(0, 44, 59)';
  document.getElementById('c1fvt').style.color = 'rgb(0, 44, 59)';

  const filesDrop = e.dataTransfer.files;

  const dataTransfer = new DataTransfer();
  for (let i = 0; i < filesDrop.length; i++) {
    dataTransfer.items.add(filesDrop[i]);
  }

  input.files = dataTransfer.files;
  input.dispatchEvent(new Event('change'));
});

function boxItem() {
    if (files.length === 0) {
        document.getElementById('c1fv').style.borderStyle = 'dashed';
        document.getElementById('c1fv').style.borderWidth = '2px';
    } else {
        document.getElementById('c1fv').style.borderStyle = 'solid';
        document.getElementById('c1fv').style.borderWidth = '1px';
    }
}

let block = false;

function loading() {
    const loadingI = document.getElementById('loading');
    if (!block) {
        block = true;
        loadingI.classList.remove('desativado');
    } else {
        block = false;
        loadingI.classList.add('desativado');
    }
}

async function Executar(type) {
    if (files.length < 1) {
        alert("Você não selecionou nenhum arquivo!");
        return;
    } else loading();

    const formData = new FormData();
    files.forEach(f => formData.append('arquivos[]', f));
    formData.append('targetKb', inputOc.value);

    try {
        const res = await fetch(`https://shapesbackend.onrender.com/${type}`, {
            method: 'POST',
            body: formData
        });

        let tipo = null;

        if (type === 'compact') {
            tipo = 'Arquivos Compactados';
        } else if (type === 'retornos') {
            tipo = 'Retornos';
        } else if (type === 'formatar') {
            tipo = 'Arquivos Formatados';
        } else if (type === 'extandcomp') {
            tipo = 'Arquivos extraídos e comprimidos';
        }

        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        if (/iP(hone|ad|od)/.test(navigator.userAgent)) {
            location.href = url;
        } else {
            const a = document.createElement('a');
            a.href = url;
            a.download = `${tipo}.zip`;
            document.body.appendChild(a);
            a.click();
            a.remove();
        }
        window.URL.revokeObjectURL(url);
    } finally {
        loading();
    }
}

async function Ext() {
    if (files.length < 1) {
        alert("Você não selecionou nenhum arquivo!");
        return;
    } else loading();

    const formData = new FormData();
    files.forEach(f => formData.append('arquivos[]', f, f.name));

    try {
        const res = await fetch('https://shapesbackend.onrender.com/extract', {
            method: 'POST',
            body: formData
        });

        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        if (/iP(hone|ad|od)/.test(navigator.userAgent)) {
            location.href = url;
        } else {
            const a = document.createElement('a');
            a.href = url;
            a.download = `Imagens Extraídas.zip`;
            document.body.appendChild(a);
            a.click();
            a.remove();
        }
        window.URL.revokeObjectURL(url);
    } finally {
        loading();
    }
}

function clearInputFiles() {
    files = [];
    input.value = '';

    selects.querySelectorAll('.c1fvdocument').forEach(el => el.remove());

    document.getElementById('c1fvt').classList.remove('desativado');

    boxItem();
}

const home = document.querySelectorAll('.home');
const Suporte = document.getElementById('body-cont-three');
const EnginesMenu = document.getElementById('body-cont-four');
const Sobre = document.getElementById('body-cont-five');
const all = [...home, Suporte, EnginesMenu, Sobre];

function ativarMenu(ativo) {
    const ativos = (ativo instanceof NodeList || Array.isArray(ativo)) ? [...ativo] : [ativo];

    ativos.forEach(a => {
        if (a.classList.contains('desativado')) a.classList.remove('desativado');
    });

    const outros = all.filter(ao => !ativos.includes(ao));

    outros.forEach(o => {
        if (!o.classList.contains('desativado')) o.classList.add('desativado');
    });

    if (ativo === home) {
        CardsEntryAnimation();
    } else {
        CardsOffAnimation();
    }
}

window.addEventListener('click', () => {
    if (menuBtn.classList.contains('active')) menuBtn.click();
});

function FecharEngine() {
    const painel = document.querySelector('#body-cont-four .painel-oc .buttons');
    if (!painel.classList.contains('desativado')) {
        painel.classList.add('desativado');
    }
}

function AbrirEngine() {
    const painel = document.querySelector('#body-cont-four .painel-oc .buttons');
    if (painel.classList.contains('desativado')) {
        painel.classList.remove('desativado');
    }
}

const slider = document.querySelector('#body-cont-four .body .line');
const handle = document.querySelector('#body-cont-four .body .circle');

let dragging = false;

function getClientX(e) {
  if (e.touches && e.touches.length > 0) {
    return e.touches[0].clientX;
  }
  return e.clientX;
}

function startDrag(e) {
  dragging = true;
  e.preventDefault();
}

function stopDrag() {
  dragging = false;
}

function onMove(e) {
  if (!dragging) return;

  const rect = slider.getBoundingClientRect();
  let newLeft = getClientX(e) - rect.left - handle.offsetWidth / 2;

  newLeft = Math.max(0, Math.min(newLeft, rect.width - handle.offsetWidth));

  handle.style.left = newLeft + 'px';

  const percentage = newLeft / (rect.width - handle.offsetWidth);
  inputOc.value = Math.round(percentage * 100);
}

handle.addEventListener('mousedown', startDrag);
document.addEventListener('mouseup', stopDrag);
document.addEventListener('mousemove', onMove);

handle.addEventListener('touchstart', startDrag);
document.addEventListener('touchend', stopDrag);
document.addEventListener('touchmove', onMove);

const min = parseFloat(inputOc.min);
const max = parseFloat(inputOc.max);

inputOc.addEventListener('input', () => {
    let val = parseFloat(inputOc.value);

    if (val > max) val = max;

    inputOc.value = val;

    const rect = slider.getBoundingClientRect();

    const percentage = (val < min ? min : val - min) / (max - min);
    handle.style.left = percentage * (rect.width - handle.offsetWidth) + 'px';
});

inputOc.addEventListener('blur', () => {
    let val = parseFloat(inputOc.value);

    if (!val) val = 35;

    if (val < min) val = min;
    inputOc.value = val;

    atualizarHandle();
});

function atualizarHandle() {
    const val = parseFloat(inputOc.value);
    const min = parseFloat(inputOc.min);
    const max = parseFloat(inputOc.max);
    const rect = slider.getBoundingClientRect();

    const percentage = (val < min ? 0 : (val - min) / (max - min));
    handle.style.left = percentage * (rect.width - handle.offsetWidth) + 'px';
}

const formSup = document.getElementById('form-sup');
const contactSup = document.getElementById('contact-sup');

formSup.addEventListener('submit', function(event) {
  const valor = contactSup.value;

  const temArroba = valor.includes('@');
  const temNumero = /\d/.test(valor);

  if (!temArroba && !temNumero) {
    event.preventDefault();
    alert('Meio de contato inválido!');
  }
});



