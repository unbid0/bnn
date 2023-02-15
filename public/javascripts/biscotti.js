//serve per impostare il cookie da salvare nel browser
setCookie = (cName, cValue, days) =>{
    let date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 *60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = cName + "=" + (cValue +"; ") + expires + "; path=/";
}

//serve per trovare il nostro cookie 
getCookie = (cName) =>{
    const name = cName;
    const cDecoded = decodeURIComponent(document.cookie);
    const cArr = cDecoded.split("; "); 
    let value;

    cArr.forEach(val => {
        if (val.indexOf(name) === 0) value = val.substring(name.lenght);
    })

    return value;
}


//quando si clicca su accetta cookie la funzione fa scomparire il messaggio di popup e imposta il cookie nel browser dell'utente
document.getElementById("accept").addEventListener("click", () => {
    setTimeout(() =>{
        document.getElementById("consent-popup").style.display = "none";
    }, 1000);
    setCookie("BA_consent", true, 30);
})

//quando si clicca sull'icona x il popup viene nascosto
document.getElementById("close").addEventListener("click", () => {
    document.getElementById("consent-popup").style.display = "none";
})

//la funzione serve per capire se mostrare o meno il popup in base alla presenza del nostro cookie
cookieMessage = () =>{
    if(!getCookie("BA_consent"))
        document.getElementById("consent-popup").style.display = "block";
}

//quando la pagina viene caricata invoca la funzione cookieMessage
window.addEventListener("load", cookieMessage);