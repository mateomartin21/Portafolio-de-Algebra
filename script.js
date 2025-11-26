// script.js - Hill Cipher 2x2 usando módulo 37 (espacio + letras + números)
// Alfabeto:
// 0 = ' ' (espacio)
// 1..26 = 'a'..'z'
// 27..36 = '0'..'9'

const MOD = 37;

const mensaje = document.getElementById('mensaje');
const charCount = document.querySelector('.char-count');
const matrizMensaje = document.getElementById('matrizMensaje');
const k11 = document.getElementById('k11');
const k12 = document.getElementById('k12');
const k21 = document.getElementById('k21');
const k22 = document.getElementById('k22');
const btnEncriptar = document.getElementById('Encriptar');
const btnDesencriptar = document.getElementById('Desencriptar');
const resultado = document.getElementById('resultado');

// --- Utilidades ---
function mod(n, m = MOD) {
    return ((n % m) + m) % m;
}

function charToNum(ch) {
    // acepta letras (may/min), espacio y dígitos
    if (ch === ' ') return 0;
    if (/[a-zA-Z]/.test(ch)) {
        return ch.toLowerCase().charCodeAt(0) - 96; // 'a' -> 1
    }
    if (/[0-9]/.test(ch)) {
        return 27 + (ch.charCodeAt(0) - 48); // '0' -> 27
    }
    return null;
}

function numToChar(n) {
    n = mod(n);
    if (n === 0) return ' ';
    if (n >= 1 && n <= 26) return String.fromCharCode(96 + n).toUpperCase(); // letras en MAYÚSCULAS para visibilidad
    if (n >= 27 && n <= 36) return String.fromCharCode(48 + (n - 27)); // '0'..'9'
    return '?';
}

function textToNums(text) {
    const arr = [];
    for (let ch of text) {
        const v = charToNum(ch);
        if (v !== null) arr.push(v);
    }
    return arr;
}

function numsToText(nums) {
    return nums.map(n => numToChar(n)).join('');
}

// --- Mostrar matriz del mensaje (pares de números) ---
mensaje.addEventListener('input', () => {
    const len = mensaje.value.length;
    charCount.textContent = `${len}/30`;
    mostrarMatrizMensaje();
});

function mostrarMatrizMensaje() {
    const texto = mensaje.value;
    const nums = textToNums(texto);

    if (nums.length === 0) {
        matrizMensaje.textContent = 'Escribe un mensaje primero...';
        return;
    }

    let s = '[';
    for (let i = 0; i < nums.length; i += 2) {
        s += '[' + nums[i] + ', ' + (nums[i + 1] ?? 0) + '] ';
    }
    s += ']';
    matrizMensaje.textContent = s;
}

// --- Inversa modular 2x2 en módulo MOD ---
function inversaModPrimeLike(a, b, c, d) {
    // Calcula det = a*d - b*c (mod MOD)
    let det = mod(a * d - b * c);
    if (det === 0) return null; // no invertible

    // Buscar inverso multiplicativo de det en Z_MOD
    let invDet = null;
    for (let i = 1; i < MOD; i++) {
        if ((det * i) % MOD === 1) {
            invDet = i;
            break;
        }
    }
    if (invDet === null) return null;

    // adjunta: [[d, -b], [-c, a]]
    let A = mod(d * invDet);
    let B = mod((-b) * invDet);
    let C = mod((-c) * invDet);
    let D = mod(a * invDet);

    return [
        [A, B],
        [C, D]
    ];
}

// --- Encriptar ---
btnEncriptar.addEventListener('click', () => {
    // Obtener clave
    const a = parseInt(k11.value, 10);
    const b = parseInt(k12.value, 10);
    const c = parseInt(k21.value, 10);
    const d = parseInt(k22.value, 10);

    if ([a,b,c,d].some(x => Number.isNaN(x))) {
        resultado.textContent = 'Error: Completa la matriz clave (4 números)';
        resultado.classList.add('error');
        return;
    }

    // Texto de entrada: acepta letras, espacios y dígitos
    const textoRaw = mensaje.value;
    const nums = textToNums(textoRaw);

    if (nums.length === 0) {
        resultado.textContent = 'Error: Ingresa un mensaje';
        resultado.classList.add('error');
        return;
    }

    // padding: si longitud impar, añadir espacio (0)
    if (nums.length % 2 !== 0) nums.push(0);

    // encriptar por bloques de 2
    const outNums = [];
    for (let i = 0; i < nums.length; i += 2) {
        const v1 = nums[i], v2 = nums[i+1];
        const c1 = mod(a * v1 + b * v2);
        const c2 = mod(c * v1 + d * v2);
        outNums.push(c1, c2);
    }

    const cipher = numsToText(outNums);
    resultado.classList.remove('error');
    resultado.textContent = cipher;
});

// --- Desencriptar ---
btnDesencriptar.addEventListener('click', () => {
    // Leer clave
    const a = parseInt(k11.value, 10);
    const b = parseInt(k12.value, 10);
    const c = parseInt(k21.value, 10);
    const d = parseInt(k22.value, 10);

    if ([a,b,c,d].some(x => Number.isNaN(x))) {
        resultado.textContent = 'Error: Completa la matriz clave (4 números)';
        resultado.classList.add('error');
        return;
    }

    // Tomamos el texto encriptado desde el div resultado.
    // Si el usuario quiere usar el textarea en su lugar, puede copiar/pegar ahí primero.
    const cipherRaw = resultado.textContent;
    const nums = textToNums(cipherRaw);

    if (nums.length === 0) {
        resultado.textContent = 'Error: No hay texto encriptado para desencriptar';
        resultado.classList.add('error');
        return;
    }

    if (nums.length % 2 !== 0) {
        resultado.textContent = 'Error: Texto encriptado inválido (longitud impar)';
        resultado.classList.add('error');
        return;
    }

    const inv = inversaModPrimeLike(a, b, c, d);
    if (!inv) {
        resultado.textContent = `Error: La matriz NO es invertible modulo ${MOD} (det ≡ 0)`;
        resultado.classList.add('error');
        return;
    }

    // aplicar inversa por bloques
    const plainNums = [];
    for (let i = 0; i < nums.length; i += 2) {
        const v1 = nums[i], v2 = nums[i+1];
        const p1 = mod(inv[0][0] * v1 + inv[0][1] * v2);
        const p2 = mod(inv[1][0] * v1 + inv[1][1] * v2);
        plainNums.push(p1, p2);
    }

    const plainText = numsToText(plainNums);
    resultado.classList.remove('error');
    resultado.textContent = plainText;
});
