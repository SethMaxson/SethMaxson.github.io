"use strict";
function login() {
    let pass = $("#login-password").val();
    let un = $("#login-username").val();
    console.log("Unencrypted:");
    console.log("username: " + un);
    console.log("password: " + pass);
    let encryptedU = CryptoJS.AES.encrypt(un, pass).toString();
    console.log("Encrypted:");
    console.log("username: " + encryptedU);
    console.log("password: " + CryptoJS.AES.encrypt(pass, pass).toString());
    for (let i = 0; i < accounts.length; i++) {
        const a = accounts[i];
        let decryptedUn = CryptoJS.AES.decrypt(a.u, pass).toString(CryptoJS.enc.Utf8);
        if (decryptedUn.length > 1 && decryptedUn == un) {
            storage.isGM = a.gm;
            storage.userId = a.id;
            storage.userName = decryptedUn;
            window.location.href = "/dnd/index.html";
        }
    }
    return false;
}
const accounts = [
    {
        gm: true,
        id: 1,
        p: "U2FsdGVkX1/CKWCTQkVLrfoVxevEtG11W1cUJxAJPjY=",
        u: "U2FsdGVkX1/BCh3BbG+9NaJtETfWrMMfqqiXu672MR0=",
    },
    // Z
    {
        gm: false,
        id: 1,
        p: "U2FsdGVkX18J7uEfDdxfmnGJUuuK8I+ew+cwpW1mOkg=",
        u: "U2FsdGVkX1+wesr7qR+/sFzd/nJpqB8sapmgGyDWHd8=",
    },
    // Enix
    // markymark
    {
        gm: false,
        id: 2,
        p: "U2FsdGVkX1+TxqvhXu2EtkCnDw0wPSuZHI6Vuy8pZA0=",
        u: "U2FsdGVkX19BFPTyGhjiC+x9IN2y5x8GDOzGGqztjXA=",
    },
    // Carl
    // shamous
    {
        gm: false,
        id: 3,
        p: "U2FsdGVkX1+cXsZWFSTGZafUIwSzqVP+sAi9CAbBbHg=",
        u: "U2FsdGVkX18xaj6/QG+AvuXB1zCOXZ+uvOlj5U2Yg6E=",
    },
    // Heracles
    {
        gm: false,
        id: 4,
        p: "U2FsdGVkX1+TxqvhXu2EtkCnDw0wPSuZHI6Vuy8pZA0=",
        u: "U2FsdGVkX19BFPTyGhjiC+x9IN2y5x8GDOzGGqztjXA=",
    },
    // Lizette
    {
        gm: false,
        id: 5,
        p: "U2FsdGVkX1+TxqvhXu2EtkCnDw0wPSuZHI6Vuy8pZA0=",
        u: "U2FsdGVkX19BFPTyGhjiC+x9IN2y5x8GDOzGGqztjXA=",
    }
];
//# sourceMappingURL=login.js.map