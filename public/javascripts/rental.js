function inserisciRental(param){

    const marca = document.getElementById('marca').value.toLowerCase();
    const immagine = document.getElementById('image');

    addRental(marca, immagine.files[0]);
    setTimeout(5000);
    location.reload();
}

async function addRental(marca, immagine){ 

    const Ur = new FormData();

    Ur.append("image", immagine);
    Ur.append("marca", marca);

    const response = await fetch('http://localhost:3000/unipolrentalCollaboratori/addUR', {
        method: 'POST',
            body: Ur,
            })
        const risposta = await response.json();
        console.log(risposta);
}


function filtraOfferte(param){
    const marca = document.getElementById("formCerca").value.toLowerCase();
    cercaOfferte(marca);
}


async function cercaOfferte(marca){
    await fetch('http://localhost:3000/unipolrental/cercaOfferta/', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            marca:marca,
        }), // Conversion in JSON format
    })
    .then(response => response.json())
    .then(data =>{
        const listino = document.getElementById("listaOfferte");
        while(listino.firstChild){
            listino.removeChild(listino.firstChild);
        }
        for (const offerta of data.offerte){

            const off = document.createElement('div');
            off.classList.add('col');
            off.classList.add('pb-4');

            listino.appendChild(off);

            const img = document.createElement('img');
            img.src = offerta.immagine;
            img.classList.add('rounded');
            img.style.height = '400px';
            img.style.width = '400px';

            off.appendChild(img);
            
        }
    })
    .catch((error) => {
            console.error('Error:', error);
            });
}


async function eliminaTutti(param){
    const element = document.getElementById("Success");
    await fetch('http://localhost:3000/unipolrentalCollaboratori/deleteUR', {
        method: 'DELETE',
            })
            .then(() => 
            setTimeout(5000),
            location.reload(),
            element.innerHTML = "Offerte eliminate correttamente",
            );       
}


