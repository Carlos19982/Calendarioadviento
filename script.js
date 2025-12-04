document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('calendar-grid');
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const closeBtn = document.querySelector('.close-btn');

    // --- RELLENA ESTO CON TUS IDEAS ---
    const regalos = [
        { dia: 1, text: "Vale por un masaje relajante 💆‍♂️" },
        { dia: 2, text: "Vale por una cena romántica en tu sitio favorito 🍣" },
        { dia: 3, text: "Noche de pelis y manta: ¡Tú eliges! 🎬" },
        { dia: 4, text: "Vale por un desayuno en la cama 🥐" },
        { dia: 5, text: "Nosotros dentro del mundo de tu primer anime", img: "imagenes/dia5.png" },
        { dia: 6, text: "UNuestros primeros días de paticos y garricos", img: "imagenes/dia6.jpg" },
        { dia: 7, text: "Yo allá todo asustado por si veo medusillas maxo", img: "imagenes/dia7.jpg" },
        { dia: 8, text: "Churros navideños 🍩" },
        { dia: 9, text: "Vale por un paseo navideño para ver las luces del centro (y comer heladico 🍦)" },
        { dia: 10, text: "La foto mas linda que tenemos mixi, que preciosos somos joder maxo.", img: "imagenes/dia11.jpg" }, //si tienes dudas la imagen esta bien
        { dia: 11, text: "Familia como a usted le gusta jejejej", img: "imagenes/dia10.jpg" },
        { dia: 12, text: "Hoy te vengo a recordar que eres lo mas bonito de mi vida, la chica con la que quiero absolutamente todo, TAMICO LINDA 🥰" },
        { dia: 13, text: "Vale por un chocolatico sin frutos secos 🍫" },
        { dia: 14, text: "Aun recuerdo el viaje a Vigo que bien nos lo pasamos linda mia 🥰", img: "imagenes/dia14.jpg" },
        {dia: 15, text: "Xomu Navideño te desea Feliz Navidad linda 🐶", img: "imagenes/dia15.png"},
        {dia: 16, text: "Elige para ver Mario Bros la Pelicula o Como entrenar a tu Dragon lindo 🐲"},
        {dia: 17, text: "El próximo viaje que haremos sera a:$$\Huge{\text{𝕾} \text{𝕱} \text{𝕯} \text{𝕰} \text{𝕮} \text{𝕬} \text{𝕭} \text{𝕹} \text{𝕸} \text{𝕷} \text{𝕶} \text{𝕵} \text{𝕴} \text{𝕳} \text{𝕲} \text{𝕽} \text{𝕼} \text{𝕻} \text{𝕺} \text{𝕎} \text{𝖁} \text{𝖀} \text{𝕿} \text{𝕾} \text{𝕽} \text{𝕼}}$$", img: "imagenes/dia17.png"},
      

        // ... Rellena hasta el 24
    ];

    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth(); // 0 = Enero, 11 = Diciembre

    // Generar 24 puertas
    for (let i = 1; i <= 24; i++) {
        const door = document.createElement('div');
        door.classList.add('door');

        // Estructura segura para CSS: Número dentro de un SPAN
        door.innerHTML = `<span>${i}</span>`;

        // Comprobar si ya se abrió antes
        if (localStorage.getItem(`adviento-day-${i}`) === 'opened') {
            door.classList.add('opened');
            door.innerHTML = "<span>🎁</span>";
        }

        door.addEventListener('click', () => handleDoorClick(i, door));
        grid.appendChild(door);
    }

    function handleDoorClick(day, element) {
        // Lógica Anti-Trampas

        // 1. Verificar mes (Descomentar para producción si quieres bloquear fuera de Diciembre)
        /*
        if (currentMonth !== 11) {
             alert("¡Espera a diciembre! 🎅");
             return;
        }
        */

        // 2. Verificar día futuro
        if (day > currentDay) {
            alert(`¡Eh, tramposilla! Hoy es día ${currentDay}, no puedes abrir el ${day} todavía. 👮‍♂️`);
            element.classList.add('locked');
            return;
        }

        openGift(day, element);
    }

    function openGift(day, element) {
        // Buscar contenido
        const content = regalos.find(r => r.dia === day);
        const mensaje = content ? content.text : "¡Sorpresa! (Falta rellenar este día 😅)";
        const imagen = content && content.img ? `<img src="${content.img}" class="modal-img">` : '';

        // Rellenar modal
        modalTitle.innerText = `🎄 Día ${day} 🎄`;
        modalBody.innerHTML = `<p>${mensaje}</p>${imagen}`;

        // Mostrar modal
        modal.classList.remove('hidden');

        // Marcar abierto
        if (!element.classList.contains('opened')) {
            element.classList.add('opened');
            element.innerHTML = "<span>🎁</span>";
            localStorage.setItem(`adviento-day-${day}`, 'opened');
        }
    }

    // Cerrar modal
    closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.add('hidden');
    });
});