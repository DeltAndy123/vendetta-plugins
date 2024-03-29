// Code from SecretMessage by m4fn3
// https://github.com/m4fn3/SecretMessage/blob/master/src/utils/encryption.ts

// good luck with Japanese

let aruaruNaMozitati = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"

function e(text, key) {
    let result = ''
    for (let i = 0; i < text.length; i++) {
        result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length))
    }
    return result
}

function getSikibetu(key) {
    return `${e("secret", key).slice(0, 3).padStart(3, '?')}` // 3桁の認識キーを生成
}

function getSuffixRegex(key) {
    return new RegExp(` \`<${key.slice(0, 2)}${'\\*'.repeat(Math.max(key.length - 2, 0))}>\`$`)
}

function sounyuu(moziretu, basyo, sounyuu) {
    const senntou = moziretu.slice(0, basyo) // slice(a,b) -> [a:b-1]
    const matubi = moziretu.slice(basyo)
    return `${senntou}${sounyuu}${matubi}`
}

function sakuzyo(moziretu, basyo) {
    const senntou = moziretu.slice(0, basyo)
    const matubi = moziretu.slice(basyo + 1)
    return `${senntou}${matubi}`
}

function ransuuSeisei(saisyou, saidai) {
    saisyou = Math.ceil(saisyou)
    saidai = Math.floor(saidai)
    return Math.floor(Math.random() * (saidai - saisyou + 1)) + saisyou
}

function kakoi() {
    return aruaruNaMozitati[ransuuSeisei(0, aruaruNaMozitati.length - 1)]
}

function encryptMessage(text: string, key: string, shorten_text?: boolean) {
    let encrypted = shorten_text ? angouKaigyou(e(text, key)) : e(text, key)
    let kankaku = Math.floor(encrypted.length / 3)
    let sikibetu = getSikibetu(key)
    if (kankaku == 0) { // ~二文字
        encrypted = `${sikibetu}${encrypted}`
    } else { // 三~文字
        [3, 2, 1].forEach(n => {
            encrypted = sounyuu(encrypted, kankaku * n - 1, sikibetu[n - 1])
        })
    }
    return `${kakoi()}${kakoi()}${encrypted}${kakoi()}${kakoi()}`
}

function hukugoukaSubekika(naiyou, sikibetu) {
    let zure = 2

    if (naiyou.length <= 9) {
        if (naiyou.slice(2, 5) == sikibetu) {
            return naiyou.slice(5, -2)
        }
    } else {
        let kankaku = Math.floor((naiyou.length - zure * 2 - 3) / 3)
        let sikibetu_ = `${naiyou[kankaku - 1 + (1 - 1) + zure]}${naiyou[kankaku * 2 - 1 + (2 - 1) + zure]}${naiyou[kankaku * 3 - 1 + (3 - 1) + zure]}`
        naiyou = naiyou.slice(2, -2)
        if (sikibetu == sikibetu_) {
            [3, 2, 1].forEach(n => { // 後ろから消していかないと位置変わる
                naiyou = sakuzyo(naiyou, kankaku * n - 1 + (n - 1))
            })
            return naiyou
        }
    }
    return false
}

function decryptMessage(text: string, key: string): { wasEncrypted: boolean, text: string, key?: string } {
    let sikibetu = getSikibetu(key)
    let mozi = hukugoukaSubekika(text, sikibetu)
    if (mozi) {
        let decrypted = e(angouKaigyou(mozi), key)
        return { wasEncrypted: true, text: decrypted }
    }
    return { wasEncrypted: false, text }
}

function hukugouKaigyou(text) { // replace with spaces commonly used
    return text.replaceAll("\u2004", "\r").replaceAll("\u2001", "\n").replaceAll("\u2002", "\x0B").replaceAll("\u2003", "\x0C")
}

function angouKaigyou(text) {
    // return get(name, "shorten_text") ? text.replaceAll("\x0B", "\u2002").replaceAll("\x0C", "\u2003").replaceAll("\r", "\u2004").replaceAll("\n", "\u2001") : text
    return text.replaceAll("\x0B", "\u2002").replaceAll("\x0C", "\u2003").replaceAll("\r", "\u2004").replaceAll("\n", "\u2001")
}

export {e, decryptMessage, encryptMessage, getSikibetu, getSuffixRegex}