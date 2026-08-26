const siteTranslations = {
    fr: {
        nav: { home: "Accueil", team: "L'Équipe", help: "Aide", cal: "🗓️ Calendrier", insta: "Instagram" },
        settings: {
            title: '<i class="fa-solid fa-sliders"></i> Réglages Généraux',
            lang: '<i class="fa-solid fa-language"></i> Langue :',
            theme: '<i class="fa-solid fa-palette"></i> Thème Visuel :',
            size: '<i class="fa-solid fa-text-height"></i> Taille de la police :',
            font: '<i class="fa-solid fa-font"></i> Type de police :',
            save: "Enregistrer les réglages"
        },
        ids: {
            "btn-login-open": "Connexion",
            "footer-text": "© 2026 Radio 6 - Espace de rediffusion du Lycée Arcisse de Caumont, Bayeux.",
            
            // --- Page Equipe ---
            "eq-title": "L'Équipe de Radio 6",
            "eq-sub": "Découvrez les coulisses de la Radio d'Art 6 du Lycée Arcisse de Caumont à Bayeux.",
            "eq-h3-hours": "🕒 Horaires d'Ouverture du Studio",
            "eq-p-hours": "Le club et le studio de la radio vous accueillent chaque semaine aux horaires suivants :",
            "eq-badge": "Nouveaux Horaires à revoir pour 2026/2027",
            "eq-p-desc": "Passez nous voir au studio pour découvrir le matériel, assister aux enregistrements ou proposer vos idées d'émissions !",
            "eq-join-title": "🎙️ Rejoignez l'aventure pour 2026 / 2027 !",
            "eq-join-p1": "Tu es passionné par le son, l'actualité, la musique, la technique ou l'animation ? Tu as envie de faire entendre ta voix au lycée ?",
            "eq-join-p2": "Si tu veux <strong>faire partie de l'équipe officielle de la radio pour la rentrée prochaine (saison 2026/2027)</strong>, n'hésite plus !",
            "eq-join-p3": "👉 Viens nous rencontrer directement au studio pour voir comment ça se passe et réserver ta place.",

            // --- Page Aide ---
            "ai-main-title": "Besoin d'aide pour écouter ?",
            "ai-main-sub": "Voici les solutions simples si vous rencontrez une difficulté sur notre espace de rediffusion.",
            "ai-s1-title": '🔇 Le bouton "Écouter" ne lance pas le son',
            "ai-s1-p": "Si vous cliquez sur une émission et que rien ne se passe ou que le compteur reste à 00:00 :",
            "ai-s1-l1-h": "Volume de l'appareil :",
            "ai-s1-l1-t": "Assurez-vous que le commutateur \"Silencieux\" de votre téléphone n'est pas activé et augmentez le volume multimédia de votre appareil.",
            "ai-s1-l2-h": "Forcer la lecture :",
            "ai-s1-l2-t": "Certains téléphones bloquent le démarrage automatique. Une fois que vous avez cliqué sur une émission, appuyez directement sur le bouton \"▶\" situé dans la barre audio grise au centre.",
            "ai-s1-l3-h": "Écouteurs Bluetooth :",
            "ai-s1-l3-t": "Vérifiez que le son n'est pas envoyé vers des écouteurs ou une enceinte restés connectés dans votre sac ou une autre pièce.",
            "ai-s2-title": "📱 Je ne vois pas les mêmes émissions sur mon téléphone et sur mon PC",
            "ai-s2-p": "Il est possible que la liste des rediffusions soit différente d'un appareil à un autre :",
            "ai-s2-l1-h": "Le fonctionnement du site :",
            "ai-s2-l1-t": "Pour stocker des émissions très longues sans coupure, ce site uses la mémoire propre du navigateur de l'appareil (IndexedDB).",
            "ai-s2-l2-h": "Conséquence :",
            "ai-s2-l2-t": "Les fichiers audios restent enregistrés sur l'ordinateur où l'équipe de la radio les a déposés. Si vous changez de PC ou utilisez votre téléphone portable, il est normal de voir une liste différente ou vide.",
            "ai-s3-title": "Playback 🛑 Le son se coupe quand le téléphone se met en veille",
            "ai-s3-p": "Sur certains smartphones, l'écoute peut s'interrompre si l'écran s'éteint :",
            "ai-s3-l1-h": "Laissez l'onglet ouvert :",
            "ai-s3-l1-t": "Évitez de fermer complètement le navigateur ou de basculer sur une application lourde (comme un jeu) pendant l'écoute.",
            "ai-s3-l2-h": "Économiseur de batterie :",
            "ai-s3-l2-t": "Si votre téléphone est en mode \"Énergie faible\", il peut forcer la fermeture du site pour économiser de la batterie. Désactivez-le temporairement pour une écoute fluide.",
            "ai-s4-title": "📥 Je ne trouve pas le bouton pour télécharger le fichier",
            "ai-s4-l1-h": "Écoute exclusive :",
            "ai-s4-l1-t": "Pour protéger le travail et les droits des élèves de la radio, le téléchargement direct des fichiers audio est volontairement bloqué et indisponible sur ce site.",
            "ai-s4-l2": "Les émissions sont disponibles uniquement en streaming direct (écoute libre et illimitée) via notre barre de lecture.",
            "ai-s5-title": "Un bug persiste ? Un fichier semble inaccessible ?",
            "ai-s5-p": "Venez nous le signaler directement au studio de la radio ! En informant l'équipe, nous pourrons remettre le fichier en ligne.",
            "ai-s5-loc": "📍 Studio ouvert le Lundi et Mardi de 12h40 à 13h25",

            // --- Page Calendrier ---
            "cal-title": "🗓️ Calendrier des Émissions",
            "cal-sub": "Retrouvez la programmation et les prochains événements de Radio 6.",
            "cal-upcoming-title": "Prochaines Diffusions",
            "cal-no-events": "Aucun événement prévu pour le moment.",

            // --- Page Instagram ---
            "insta-title": "📸 Notre Actualité Instagram",
            "insta-sub": "Découvrez les coulisses du studio et suivez nos dernières publications en direct.",
            "insta-btn-follow": "S'abonner au compte Instagram"
        }
    },
    en: {
        nav: { home: "Home", team: "The Team", help: "Help", cal: "🗓️ Calendar", insta: "Instagram" },
        settings: {
            title: '<i class="fa-solid fa-sliders"></i> General Settings',
            lang: '<i class="fa-solid fa-language"></i> Language:',
            theme: '<i class="fa-solid fa-palette"></i> Visual Theme:',
            size: '<i class="fa-solid fa-text-height"></i> Font Size:',
            font: '<i class="fa-solid fa-font"></i> Font Type:',
            save: "Save settings"
        },
        ids: {
            "btn-login-open": "Login",
            "footer-text": "© 2026 Radio 6 - Broadcast space of Arcisse de Caumont High School, Bayeux.",
            
            // --- Page Equipe ---
            "eq-title": "The Radio 6 Team",
            "eq-sub": "Discover behind the scenes of Art 6 Radio at Arcisse de Caumont High School.",
            "eq-h3-hours": "🕒 Studio Opening Hours",
            "eq-p-hours": "The radio club and studio welcome you every week at the following times:",
            "eq-badge": "New Schedule to be reviewed for 2026/2027",
            "eq-p-desc": "Come see us at the studio to discover the equipment, attend recordings, or propose your show ideas!",
            "eq-join-title": "🎙️ Join the adventure for 2026 / 2027!",
            "eq-join-p1": "Are you passionate about sound, news, music, technology, or hosting? Do you want your voice heard at school?",
            "eq-join-p2": "If you want to <strong>be part of the official radio team for the next school year (2026/2027 season)</strong>, don't hesitate!",
            "eq-join-p3": "👉 Come meet us directly at the studio to see how it works and reserve your spot.",

            // --- Page Aide ---
            "ai-main-title": "Need help listening?",
            "ai-main-sub": "Here are simple solutions if you encounter a problem on our playback space.",
            "ai-s1-title": '🔇 The "Play" button doesn\'t start the sound',
            "ai-s1-p": "If you click on a show and nothing happens or the counter stays at 00:00:",
            "ai-s1-l1-h": "Device volume:",
            "ai-s1-l1-t": "Make sure your phone's \"Silent\" switch is off and turn up your device's media volume.",
            "ai-s1-l2-h": "Force playback:",
            "ai-s1-l2-t": "Some phones block autoplay. Once you've clicked a show, press the \"▶\" button directly in the gray audio bar in the center.",
            "ai-s1-l3-h": "Bluetooth headphones:",
            "ai-s1-l3-t": "Check that the sound isn't being sent to headphones or a speaker left connected in your bag or another room.",
            "ai-s2-title": "📱 I don't see the same shows on my phone and my PC",
            "ai-s2-p": "It's possible that the list of replays differs from one device to another:",
            "ai-s2-l1-h": "How the site works:",
            "ai-s2-l1-t": "To store very long shows without interruption, this site uses the device browser's own memory (IndexedDB).",
            "ai-s2-l2-h": "Consequence:",
            "ai-s2-l2-t": "The audio files remain saved on the computer where the radio team uploaded them. If you switch PCs or use your mobile phone, it is normal to see a different or empty list.",
            "ai-s3-title": "Playback 🛑 The sound cuts out when the phone goes to sleep",
            "ai-s3-p": "On some smartphones, playback may stop if the screen turns off:",
            "ai-s3-l1-h": "Keep the tab open:",
            "ai-s3-l1-t": "Avoid completely closing the browser or switching to a heavy app (like a game) while listening.",
            "ai-s3-l2-h": "Battery saver:",
            "ai-s3-l2-t": "If your phone is in \"Low power\" mode, it may force close the site to save battery. Disable it temporarily for smooth listening.",
            "ai-s4-title": "📥 I can't find the button to download the file",
            "ai-s4-l1-h": "Exclusive listening:",
            "ai-s4-l1-t": "To protect the work and rights of the radio students, direct downloading of audio files is intentionally blocked and unavailable on this site.",
            "ai-s4-l2": "Shows are available only in direct streaming (free and unlimited listening) via our player bar.",
            "ai-s5-title": "A bug persists? A file seems inaccessible?",
            "ai-s5-p": "Come report it directly to us at the radio studio! By informing the team, we can put the file back online.",
            "ai-s5-loc": "📍 Studio open Monday and Tuesday from 12:40 PM to 1:25 PM",

            // --- Page Calendrier ---
            "cal-title": "🗓️ Broadcast Calendar",
            "cal-sub": "Check out upcoming programs and events on Radio 6.",
            "cal-upcoming-title": "Upcoming Broadcasts",
            "cal-no-events": "No events scheduled at the moment.",

            // --- Page Instagram ---
            "insta-title": "📸 Our Instagram News",
            "insta-sub": "Discover behind the scenes at the studio and follow our latest posts live.",
            "insta-btn-follow": "Follow our Instagram account"
        }
    },
    es: {
        nav: { home: "Inicio", team: "El Equipo", help: "Ayuda", cal: "🗓️ Calendario", insta: "Instagram" },
        settings: {
            title: '<i class="fa-solid fa-sliders"></i> Ajustes Generales',
            lang: '<i class="fa-solid fa-language"></i> Idioma:',
            theme: '<i class="fa-solid fa-palette"></i> Tema Visual:',
            size: '<i class="fa-solid fa-text-height"></i> Tamaño de fuente:',
            font: '<i class="fa-solid fa-font"></i> Tipo de fuente:',
            save: "Guardar ajustes"
        },
        ids: {
            "btn-login-open": "Conexión",
            "footer-text": "© 2026 Radio 6 - Espacio de repetición del Liceo Arcisse de Caumont, Bayeux.",
            
            // --- Page Equipe ---
            "eq-title": "El Equipo de Radio 6",
            "eq-sub": "Descubre los entresijos de la Radio Art 6 en el Liceo Arcisse de Caumont.",
            "eq-h3-hours": "🕒 Horarios de Apertura del Estudio",
            "eq-p-hours": "El club y el estudio de radio te dan la bienvenida cada semana en los siguientes horarios:",
            "eq-badge": "Nuevos horarios a revisar para 2026/2027",
            "eq-p-desc": "¡Ven a vernos al estudio para descubrir el equipo, asistir a grabaciones o proponer tus ideas de programas!",
            "eq-join-title": "🎙️ ¡Únete a la aventura para 2026 / 2027!",
            "eq-join-p1": "¿Te apasiona el sonido, las noticias, la música, la técnica o la animación? ¿Quieres que tu voz se escuche en el instituto?",
            "eq-join-p2": "Si quieres <strong>formar parte del equipo oficial de la radio para el próximo curso (temporada 2026/2027)</strong>, ¡no lo dudes más!",
            "eq-join-p3": "👉 Ven a conocernos directamente al estudio para ver cómo funciona y reservar tu plaza.",

            // --- Page Aide ---
            "ai-main-title": "¿Necesitas ayuda para escuchar?",
            "ai-main-sub": "Aquí tienes soluciones sencillas si encuentras alguna dificultad en nuestro espacio de repetición.",
            "ai-s1-title": '🔇 El botón "Reproducir" no inicia el sonido',
            "ai-s1-p": "Si haces clic en un programa y no pasa nada o el contador se queda en 00:00:",
            "ai-s1-l1-h": "Volumen del dispositivo:",
            "ai-s1-l1-t": "Asegúrate de que el interruptor \"Silencio\" de tu teléfono no esté activado y sube el volumen multimedia de tu dispositivo.",
            "ai-s1-l2-h": "Forzar reproducción:",
            "ai-s1-l2-t": "Algunos teléfonos bloquean la reproducción automática. Una vez que hayas hecho clic en un programa, pulsa directamente el botón \"▶\" en la barra de audio gris central.",
            "ai-s1-l3-h": "Auriculares Bluetooth:",
            "ai-s1-l3-t": "Comprueba que el sonido no se esté enviando a unos auriculares o altavoz que se hayan quedado conectados en tu mochila o en otra habitación.",
            "ai-s2-title": "📱 No veo los mismos programas en mi teléfono y en mi PC",
            "ai-s2-p": "Es posible que la lista de repeticiones sea diferente de un dispositivo a otro:",
            "ai-s2-l1-h": "Cómo funciona el sitio:",
            "ai-s2-l1-t": "Para almacenar programas muy largos sin cortes, este sitio utiliza la propia memoria del navegador del dispositivo (IndexedDB).",
            "ai-s2-l2-h": "Consecuencia:",
            "ai-s2-l2-t": "Los archivos de audio permanecen guardados en el ordenador donde el equipo de radio los subió. Si cambias de PC o usas tu móvil, es normal ver una lista diferente o vacía.",
            "ai-s3-title": "Reproducción 🛑 El sonido se corta cuando el teléfono se bloquea",
            "ai-s3-p": "En algunos smartphones, la escucha puede detenerse si la pantalla se apaga:",
            "ai-s3-l1-h": "Mantén la pestaña abierta:",
            "ai-s3-l1-t": "Evita cerrar completamente el navegador o cambiar a una aplicación pesada (como un juego) mientras escuchas.",
            "ai-s3-l2-h": "Ahorro de batería:",
            "ai-s3-l2-t": "Si tu teléfono está en modo \"Bajo consumo\", puede forzar el cierre del sitio para ahorrar batería. Desactívalo temporalmente para una escucha fluida.",
            "ai-s4-title": "📥 No encuentro el botón para descargar el archivo",
            "ai-s4-l1-h": "Escucha exclusiva:",
            "ai-s4-l1-t": "Para proteger el trabajo y los derechos de los alumnos de la radio, la descarga directa de los archivos de audio está bloqueada intencionadamente y no está disponible en este sitio.",
            "ai-s4-l2": "Los programas solo están disponibles en transmisión directa (escucha libre e ilimitada) a través de nuestra barra de reproducción.",
            "ai-s5-title": "¿Un error persiste? ¿Un archivo parece inaccesible?",
            "ai-s5-p": "¡Ven a informarnos directamente al estudio de radio! Al avisar al equipo, podremos volver a poner el archivo en línea.",
            "ai-s5-loc": "📍 Estudio abierto lunes y martes de 12:40 a 13:25",

            // --- Page Calendrier ---
            "cal-title": "🗓️ Calendario de Emisiones",
            "cal-sub": "Consulta la programación y los próximos eventos de Radio 6.",
            "cal-upcoming-title": "Próximas Difusiones",
            "cal-no-events": "No hay eventos programados por el momento.",

            // --- Page Instagram ---
            "insta-title": "📸 Nuestra Actualidad en Instagram",
            "insta-sub": "Descubre entre bastidores el estudio y sigue nuestras últimas publicaciones en directo.",
            "insta-btn-follow": "Seguir la cuenta de Instagram"
        }
    }
};

window.applyTranslations = function(lang) {
    const t = siteTranslations[lang] || siteTranslations['fr'];

    // 1. Traduction par ID
    for (const [id, text] of Object.entries(t.ids)) {
        const el = document.getElementById(id);
        if (el) el.innerHTML = text;
    }

    // 2. Traduction de la barre de navigation
    const navLinks = {
        "index.html": t.nav.home,
        "equipe.html": t.nav.team,
        "aide.html": t.nav.help,
        "calendrier.html": t.nav.cal,
        "instagram.html": t.nav.insta
    };
    for (const [href, text] of Object.entries(navLinks)) {
        const link = document.querySelector(`nav a[href*="${href}"]`);
        if (link) link.innerHTML = text;
    }

    // 3. Traduction de la modale des paramètres
    const modalSettingsTitle = document.querySelector('#modal-menu-param h3');
    if (modalSettingsTitle) modalSettingsTitle.innerHTML = t.settings.title;

    const paramLabels = document.querySelectorAll('#modal-menu-param .param-row label');
    if (paramLabels.length >= 4) {
        paramLabels[0].innerHTML = t.settings.lang;
        paramLabels[1].innerHTML = t.settings.theme;
        paramLabels[2].innerHTML = t.settings.size;
        paramLabels[3].innerHTML = t.settings.font;
    }

    const saveSettingsBtn = document.querySelector('#modal-menu-param .btn-submit');
    if (saveSettingsBtn) saveSettingsBtn.innerHTML = t.settings.save;

    document.documentElement.lang = lang;
};

document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('siteLang') || 'fr';
    window.applyTranslations(savedLang);
});
