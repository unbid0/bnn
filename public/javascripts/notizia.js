function inserisciNotizia(param){
        const titolo = document.getElementById('Titolo').value;
        const testo = document.getElementById('Testo').value;
        const data = moment();
        addNotizia(titolo, testo, data);
        location.reload();
        }

async function addNotizia(titolo, testo, data){ 
    const response = await fetch('http://localhost:3000/notiziecollaboratori/addNotizia', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            titolo:titolo,
            testo:testo,
            data:data,
        }), // Conversion in JSON format
        })
        const risposta = await response.json();
        console.log(risposta);
    }

    async function eliminaTutteNotizie(param){
        const element = document.getElementById("Success");
        await fetch('http://localhost:3000/notizieCollaboratori/deleteNotizie', {
            method: 'DELETE',
                })
                .then(() => 
                setTimeout(5000),
                location.reload(),
                element.innerHTML = "Notizie eliminate correttamente",
                );       
    }

    async function eliminaNotizia(param){
        await fetch('http://localhost:3000/notiziecollaboratori/eliminaNotizia', {
         method: 'DELETE',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            titolo:param.id,
        })
        })
        .then(() => 
        setTimeout(5000),
        location.reload()
        )
    }
    
