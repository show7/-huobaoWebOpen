import JSEncrypt from 'jsencrypt'
import CryptoJS from 'crypto-js'

export function getRandom (length) {
  var str = Math.random().toString(36).substr(2)
  if (str.length >= length) {
    return str.substr(0, length)
  }
  str += getRandom(length - str.length)
  return str
}
function un (a) {
  a = unescape(a)
  var c = String.fromCharCode(a.charCodeAt(0) - a.length)
  for (var i = 1; i < a.length; i++) {
    c += String.fromCharCode(a.charCodeAt(i) - c.charCodeAt(i - 1))
  }
  return c
}
export function de () {
  var c = '%u03FCZZZZo%87%8C%90%97np%A2%9B%9F%97%95%99ek%90%9E%86ZZZZ7*@@@m%96%92%8C%A7%CB%B0%8B%83%85%85%8F%90%A9%D2%DC%D9%D3%D4%B0%80%B0%A7r%83%92%96%8B%87%82%94%96%84%AE%AE%B8%DE%CE%B1%AD%A4%A8%AC%86%82%B0%B6%89%83%8C%9F%C7%C3%C8%CE%9C%B9%A7j%A9%ED%EA%9B%5C%3B*@@@c%B4%DE%E7%C0%87%88%BD%C0%83%87%C6%A3n%8C%90vuuh%A3%A2%AA%DD%A3%B2%E7%DA%C0%B4%DA%ABa%7E%80%93%AF%92t%A2%A8%9D%A1%9A%B6%AA%88%88%AC%86%88%C4%D5%B1%BE%C1%9B%C5%EC%E3%DD%C8%A5%88C*@@@s%CD%BC%91%C1%B9%94%C6%CE%C2%98ll%96%DE%DF%B8%7E%A6%C5%B7%98%98%91%7D%94%9B%A3%8D%94%C7%AE%7F%9B%CD%DD%B3%95%B0%CD%92fx%93%83%7F%B4%D0%99%86%B0%A3%B1%D3%B1%BE%CF%A0%A3%88_a%5C%5E%3D*@@@t%84%7C%AE%91%92%AD%9D%A0%84%A4%E3%BA%AA%C0%CD%A2%A6%DD%AC%93%AF%CB%B8%A6%9E%BE%EB%B5%A8%B4%8F%83%82%86%88%AA%C0%9B%94%A1%81%A8%A8k%A5%C4%D1%EE%BD%BB%E7%DA%DB%D6%96%A3%9F%7E%91%9D%AF%C7%DCu*@@@%83%93%8A%BD%D9%BB%96%BA%D8%A5%A4%DC%E0%D5%94%60%87%90zx%81%AE%C7%9A%AD%D8%C6%B8%A1%BD%C5%99%A9%A9%8Bw%A8%B2%7F%AC%9Eoz%9A%C7%D8%D3%D2%D7%C2%AB%BA%BA%A8%BF%D6%9C%85%91%92%A5%A5%BE%DDy*@@@bsr%A2%96%A9%C9%9F%BF%E4%C0%BB%DA%B3%BC%E5%A5%88%9F%99%7D%98%9Am%AB%E2%E8%E5%E2%B9%A3%95%A8%A8%9D%D2%DD%9Fo%AF%9F%96%BB%D2%EA%BD%A4%A7z%9D%D3%99%9B%D2%A0%A6%CB%85w%7B%89%AC%A1%B0o*@@@y%BC%A6rrt%A4%D8%B3%BB%E4%E2%C5%B3%B3%CB%B2%92%9B%8C%83%8F%BD%A0%7F%99%A3%AD%85y%8F%B2%E4%F2%C1%B9%E1%BC%B2%94%A3%C8%7Fa%89%CA%F1%EE%C8%BA%B2%80y%BD%EB%E8%B9%99%CA%DE%B3%AE%A5%BA%83*@@@Q%A0%C8%A3%8F%A7%B3%C2%A0f%9E%BF%A1%9C%87%AD%EF%E1%B0%9C%C2%AE%94%9A%B2%C1%C6%9Eb%AB%E1%CA%AA%BB%BF%B1%DB%CE%D1%CC%A8%CD%BD%88%94%A2%95%86%A8%AF%9A%B8%AAn%7E%C4%BA%AF%B5%C5%BA%A9%CE%AEO*@@@S%A2%C0%C5%BEyu%B9%E8%A7%8C%8E%9F%CC%B8%9C%7D%A8%A7%A8%A0swg%7B%AA%B3%82%81%99%8B%AB%9At%8E%A3%CF%D7%B8%A7%A5%9C%B0%D5%D6%E4%CB%BF%B6%8F%89%96%CE%A9%7B%8Eq%87%CC%D8%B3%9D%95%BE%81*@@@%92%DD%A4%9D%A5%AC%B0%86%B6%ED%EC%C1%A5%BA%BB%D2%D3%9B%8B%B6%9Fkj%82%A0%94%AE%AD%B5%DC%CB%AE%91%88%9B%BD%97%88%CC%E6%A2%9E%98%7E%C5%E8%ED%BEru%9A%B6%B0%7C%97%98%94%D0%DF%B5%9F%9C%8C%9C%5C*@@@p%A5%84h%A6%A5%A8%B2%8C%BF%C8%8A%7F%A0%CF%AF%89%96%B6%B4%84%A8%9F%7Dzz%88%88%96%A2%9B%8B%8A%B3%99d%8D%8B%95%C4%C8%D3%C7%A9%9B%A6%A1%B5%E2%B9%9B%D0%D2%C3%A2%AE%EF%C1t%7F%CA%ED%E6%B1L*@@@i%80%B0%CC%8C%B0%C6%84%A8%BB%7D%8D%9F%BD%BDr%7E%BC%D2%D3%D5%BA%9F%AA%A8%85%A7%B4%8Bv%7D%C7%E1%DD%A8%89%81%5Ds%99%9E%7F%81%A1%9E%9F%A8%BF%C2%C7%A7z%91%99%9B%8B%92%8A%A4%D7%DB%D3%AF%8FN*@@@d%AE%BD%88%9C%B5%BC%D0%99%9D%DE%EB%C6%9D%83n%60s%C0%EC%A7y%C0%A5%8D%A9z%9B%D9%E3%E3%DB%E4%DB%B7%BA%B7%A3%A5%AC%B9%B9%B0%C8%A7%82%BE%E9%A5%AA%D3%91%A3%D8%BE%B2%B6%8A%9C%CE%92%93%CB%CDt*@@@Xp%AF%A6en%8D%BB%DA%C0%B8%C0%CE%BB%7EzG*@@@MZZZZr%93%92dp%A2%9B%9F%97%95%99ek%90%9E%86ZZZZ'
  c = un(c)
  var a = new JSEncrypt()
  a.setPrivateKey(c)
  return a
}

export function aesDecode (encryptedStr) {
  const key = CryptoJS.enc.Utf8.parse('akyn896ntgrbdz9w')
  const iv = CryptoJS.enc.Utf8.parse('akyn896ntgrbdz9w')
  if (encryptedStr.includes('www.msgpush.com')) {
    let newArr = encryptedStr.split('www.msgpush.com').filter(v => v !== '')
    let str = []
    newArr.forEach(v => {
      const len = Number(v.slice(0, 12))
      const body = v.slice(12)
      if (len !== body.length) return []
      const decryptedData = CryptoJS.AES.decrypt(body, key, { iv, mode: CryptoJS.mode.CFB, padding: CryptoJS.pad.NoPadding })
      const result = decryptedData.toString(CryptoJS.enc.Utf8)
      str.push(result)
    })
    return str
  } else {
    return []
  }
}
