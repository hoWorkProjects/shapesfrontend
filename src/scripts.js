const menuBtn = document.getElementById('menu-btn');
const menuList = document.getElementById('header-cont-two');
let animationMenu = false;
let menuAtivo = false;

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
    if (c.classList.contains('active')) {
      c.style.display = 'none';
      c.classList.remove('active');
    } else {
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

    if (selectedFiles.length > 0) {
        document.getElementById('c1fvt').classList.add('desativado');
        const painel = document.querySelector('#body-cont-three .painel-oc .buttons');
        painel.classList.remove('desativado');
    }

    selectedFiles.forEach(file => {
        const alreadyAdded = files.some(f => f.name === file.name && f.size === file.size && f.type === file.type);
        if (alreadyAdded) return;

        files.push(file);

        const fileItem = document.createElement('a');
        fileItem.className = 'c1fvdocument';
        let shortName = file.name;

        if (shortName.length > 40) {
        shortName = shortName.slice(0, 40) + "...";
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
            }
        };

        fileItem.appendChild(iOne);
        fileItem.appendChild(iTwo);
        selects.appendChild(fileItem);

        input.value = '';
    });
});

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

async function Rename() {
    if (files.length < 1) {
        alert("Você não selecionou nenhum arquivo!");
        return;
    } else loading();

    const formData = new FormData();
    files.forEach(f => formData.append('arquivos[]', f, f.name));

    try {
        const res = await fetch('http://localhost:3000/rename', {
            method: 'POST',
            body: formData
        });

        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Arquivos Renomeados.zip';
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
    } finally {
        loading();
    }
}

async function Visible() {
    if (files.length < 1) {
        alert("Você não selecionou nenhum arquivo!");
        return;
    } else loading();

    const formData = new FormData();
    files.forEach(f => formData.append('arquivos[]', f, f.name));

    try {
        const res = await fetch('http://localhost:3000/visible', {
            method: 'POST',
            body: formData
        });

        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Arquivos Desocultados.zip';
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
    } finally {
        loading();
    }
}

async function Modify() {
    if (files.length < 1) {
        alert("Você não selecionou nenhum arquivo!");
        return;
    } else loading();

    const formData = new FormData();
    files.forEach(f => formData.append('arquivos[]', f, f.name));

    try {
        const res = await fetch('http://localhost:3000/modify', {
            method: 'POST',
            body: formData
        });

        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Arquivos Modificados.zip';
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
    } finally {
        loading();
    }
}

async function Compact() {
    if (files.length < 1) {
        alert("Você não selecionou nenhum arquivo!");
        return;
    } else loading();

    const formData = new FormData();
    files.forEach(f => formData.append('arquivos[]', f, f.name));

    try {
        const res = await fetch('http://localhost:3000/compact', {
            method: 'POST',
            body: formData
        });

        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Arquivos Compactos.zip';
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
    } finally {
        loading();
    }
}

async function Formatar() {
    if (files.length < 1) {
        alert("Você não selecionou nenhum arquivo!");
        return;
    } else loading();

    const formData = new FormData();
    files.forEach(f => formData.append('arquivos[]', f, f.name));

    try {
        const res = await fetch('http://localhost:3000/formatar', {
            method: 'POST',
            body: formData
        });

        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Arquivos Formatados.zip';
        document.body.appendChild(a);
        a.click();
        a.remove();
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
}

const home = document.querySelectorAll('.home');
const OcMenu = document.getElementById('body-cont-three');
const EngineMenu = document.getElementById('body-cont-four');
const RdoMenu = document.getElementById('body-cont-five');

function AtivarHome() {
    const all = [OcMenu, EngineMenu, RdoMenu];
    all.forEach(a => {
        if (!a.classList.contains('desativado')) a.classList.add('desativado');
    });
    const home = document.querySelectorAll('.home');
    home.forEach(h => {
        if (h.classList.contains('desativado')) {
            h.classList.remove('desativado')
            CardsEntryAnimation();
        }
    });
    if (menuBtn.classList.contains('active')) menuBtn.click();
}

function AtivarEnginesMenu() {
    if (EngineMenu.classList.contains('desativado')) EngineMenu.classList.remove('desativado');
    const all = [...home, OcMenu, RdoMenu];
    all.forEach(a => {
        if (!a.classList.contains('desativado')) a.classList.add('desativado');
    });
    if (menuBtn.classList.contains('active')) menuBtn.click();
    CardsOffAnimation();
}

function AtivarOcMenu() {
    if (OcMenu.classList.contains('desativado')) OcMenu.classList.remove('desativado');
    const all = [...home, EngineMenu, RdoMenu];
    all.forEach(a => {
        if (!a.classList.contains('desativado')) a.classList.add('desativado');
    });
    if (menuBtn.classList.contains('active')) menuBtn.click();
    CardsOffAnimation();
}

function AtivarRdoMenu() {
    if (RdoMenu.classList.contains('desativado')) RdoMenu.classList.remove('desativado');
    const all = [...home, OcMenu, EngineMenu];
    all.forEach(a => {
        if (!a.classList.contains('desativado')) a.classList.add('desativado');
    });
    if (menuBtn.classList.contains('active')) menuBtn.click();
    CardsOffAnimation();
}

function FecharButtons() {
    const painel = document.querySelector('#body-cont-three .painel-oc .buttons');
    if (!painel.classList.contains('desativado')) {
        painel.classList.add('desativado');
    }
}



