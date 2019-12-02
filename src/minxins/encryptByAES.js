import CryptoJS from 'crypto-js'

export default {
  name: 'encryptByAES',
  methods: {
    encryptByAES (message) {
      let keyHex = CryptoJS.enc.Utf8.parse('q1w2e3r4t5y6u7i8')
      let encrypted = CryptoJS.AES.encrypt(message, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      })
      return encrypted.toString()
    },
    decryptByAES (ciphertext) {
      let keyHex = CryptoJS.enc.Utf8.parse('q1w2e3r4t5y6u7i8');
      let decrypted = CryptoJS.AES.decrypt(
        {
          ciphertext: CryptoJS.enc.Base64.parse(ciphertext)
        }, keyHex,
        {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7
        }
      );
      return decrypted.toString(CryptoJS.enc.Utf8);
    }
  }
}
