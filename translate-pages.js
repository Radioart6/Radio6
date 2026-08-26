document.addEventListener('DOMContentLoaded', () => {
    const translations = {
        fr: {
            navHome: "Accueil",
            navTeam: "L'Équipe",
            navHelp: "Aide",
            footer: "© 2026 Radio 6 - Espace de rediffusion du Lycée Arcisse de Caumont, Bayeux.",
            // Équipe
            eqTitle: "L'Équipe de Radio 6",
            eqSub: "Découvrez les coulisses de la Radio d'Art 6 du Lycée Arcisse de Caumont à Bayeux.",
            eqH3Hours: "🕒 Horaires d'Ouverture du Studio",
            eqPHours: "Le club et le studio de la radio vous accueillent chaque semaine aux horaires suivants :",
            eqBadge: "Lundi et Mardi : 12h40 à 13h25",
            eqPDesc: "Passez nous voir au studio pour découvrir le matériel, assister aux enregistrements ou proposer vos idées d'émissions !",
            eqJoinTitle: "🎙️ Rejoignez l'aventure pour 2026 / 2027 !",
            eqJoinP1: "Tu es passionné par le son, l'actualité, la musique, la technique ou l'animation ? Tu as envie de faire entendre ta voix au lycée ?",
            eqJoinP2: "Si tu veux faire partie de l'équipe officielle de la radio pour la rentrée prochaine (saison 2026/2027), n'hésite plus !",
            eqJoinP3: "👉 Viens nous rencontrer directement au studio le lundi ou le mardi midi pour voir comment ça se passe et réserver ta place.",
            // Aide
            aiMainTitle: "Besoin d'aide pour écouter ?",
            aiMainSub: "Voici les solutions simples si vous rencontrez une difficulté sur notre espace de rediffusion.",
            aiS1Title: "🔇 Le bouton \"Écouter\" ne lance pas le son",
            aiS1P: "Si vous cliquez sur une émission et que rien ne se passe ou que le compteur reste à 00:00 :",
            aiS1L1H: "Volume de l'appareil :",
            aiS1L1T: "Assurez-vous que le commutateur \"Silencieux\" de votre téléphone n'est pas activé et augmentez le volume multimédia de votre appareil.",
            aiS1L2H: "Forcer la lecture :",
            aiS1L2T: "Certains téléphones bloquent le démarrage automatique. Une fois que vous avez cliqué sur une émission, appuyez directement sur le bouton \"▶\" situé dans la barre audio grise au centre.",
            aiS1L3H: "Écouteures Bluetooth :",
            aiS1L3T: "Vérifiez que le son n'est pas envoyé vers des écouteurs ou une enceinte restés connectés dans votre sac ou une autre pièce.",
            aiS2Title: "📱 Je ne vois pas les mêmes émissions sur mon téléphone et sur mon PC",
            aiS2P: "Il est possible que la liste des rediffusions soit différente d'un appareil à un autre :",
            aiS2L1H: "Le fonctionnement du site :",
            aiS2L1T: "Pour stocker des émissions très longues sans coupure, ce site utilise la mémoire propre du navigateur de l'appareil (IndexedDB).",
            aiS2L2H: "Conséquence :",
            aiS2L2T: "Les fichiers audios restent enregistrés sur l'ordinateur où l'équipe de la radio les a déposés. Si vous changez de PC ou utilisez votre téléphone portable, il est normal de voir une liste différente ou vide.",
            aiS3Title: "Playback 🛑 Le son se coupe quand le téléphone se met en veille",
            aiS3P: "Sur certains smartphones, l'écoute peut s'interrompre si l'écran s'éteint :",
            aiS3L1H: "Laissez l'onglet ouvert :",
            aiS3L1T: "Évitez de fermer complètement le navigateur ou de basculer sur une application lourde (comme un jeu) pendant l'écoute.",
            aiS3L2H: "Économiseur de batterie :",
            aiS3L2T: "Si votre téléphone est en mode \"Énergie faible\", il peut forcer la fermeture du site pour économiser de la batterie. Désactivez-le temporairement pour une écoute fluide.",
            aiS4Title: "📥 Je ne trouve pas le bouton pour télécharger le fichier",
            aiS4L1H: "Écoute exclusive :",
            aiS4L1T: "Pour protéger le travail et les droits des élèves de la radio, le téléchargement direct des fichiers audio est volontairement bloqué et indisponible sur ce site.",
            aiS4L2: "Les émissions sont disponibles uniquement en streaming direct (écoute libre et illimitée) via notre barre de lecture.",
            aiS5Title: "Un bug persiste ? Un fichier semble inaccessible ?",
            aiS5P: "Venez nous le signaler directement au studio de la radio ! En informant l'équipe, nous pourrons remettre le fichier en ligne.",
            aiS5Loc: "📍 Studio ouvert le Lundi et Mardi de 12h40 à 13h25",
            // Instagram
            instaMainTitle: "Comptes Instagram du Lycée",
            instaR6Desc: "Podcasts, annonces d'émissions en direct, coulisses des enregistrements et actualités de la web radio du lycée.",
            instaCvlDesc: "Actualités des représentants des élèves, projets engagés, propositions retenues et améliorations de la vie lycéenne.",
            instaMdlDesc: "Événements festifs et culturels, aménagement du foyer, clubs et activités organisés par les élèves.",
            instaTermDesc: "Compte de promotion : suivi des projets de fin d'année, actions de financement et souvenirs de la promo.",
            instaBtsDesc: "Projets professionnels, voyages d'études, visites guidées et actions menées par la section tourisme.",
            instaBtn: "Voir le profil"
        },
        en: {
            navHome: "Home",
            navTeam: "The Team",
            navHelp: "Help",
            footer: "© 2026 Radio 6 - Replay area of Lycée Arcisse de Caumont, Bayeux.",
            // Team
            eqTitle: "The Radio 6 Team",
            eqSub: "Discover what goes on behind the scenes of Radio d'Art 6 at Lycée Arcisse de Caumont in Bayeux.",
            eqH3Hours: "🕒 Studio Opening Hours",
            eqPHours: "The radio club and studio welcome you every week during the following hours:",
            eqBadge: "Monday and Tuesday: 12:40 PM to 1:25 PM",
            eqPDesc: "Drop by the studio to check out the equipment, watch recordings, or pitch your show ideas!",
            eqJoinTitle: "🎙️ Join the adventure for 2026 / 2027!",
            eqJoinP1: "Are you passionate about sound, news, music, technical work, or hosting? Want to make your voice heard at school?",
            eqJoinP2: "If you want to be part of the official radio team for the upcoming school year (2026/2027 season), look no further!",
            eqJoinP3: "👉 Come meet us directly at the studio on Monday or Tuesday at lunchtime to see how it works and save your spot.",
            // Help
            aiMainTitle: "Need help listening?",
            aiMainSub: "Here are simple solutions if you encounter any difficulties on our replay platform.",
            aiS1Title: "🔇 The \"Listen\" button doesn't play sound",
            aiS1P: "If you click on a show and nothing happens or the counter stays at 00:00:",
            aiS1L1H: "Device Volume:",
            aiS1L1T: "Make sure your phone's \"Silent\" switch is not active and increase your device's media volume.",
            aiS1L2H: "Force playback:",
            aiS1L2T: "Some phones block autoplay. Once you have clicked on a show, press the \"▶\" button directly in the grey audio bar in the center.",
            aiS1L3H: "Bluetooth headphones:",
            aiS1L3T: "Check that the sound isn't being sent to wireless headphones or a speaker left connected in your bag or another room.",
            aiS2Title: "📱 I don't see the same shows on my phone and my PC",
            aiS2P: "It is normal for the replay list to vary from one device to another:",
            aiS2L1H: "How the site works:",
            aiS2L1T: "To store very long shows without interruptions, this site uses the device browser's own memory (IndexedDB).",
            aiS2L2H: "Consequence:",
            aiS2L2T: "Audio files remain saved on the computer where the radio team uploaded them. If you change PCs or use your mobile phone, it is normal to see a different or empty list.",
            aiS3Title: "Playback 🛑 Sound cuts off when the phone goes to sleep",
            aiS3P: "On some smartphones, playback may stop if the screen turns off:",
            aiS3L1H: "Leave the tab open:",
            aiS3L1T: "Avoid completely closing the browser or switching to a heavy application (like a game) while listening.",
            aiS3L2H: "Battery saver:",
            aiS3L2T: "If your phone is in \"Low Power Mode,\" it may force close the site to save battery. Disable it temporarily for seamless listening.",
            aiS4Title: "📥 I can't find the button to download the file",
            aiS4L1H: "Exclusive listening:",
            aiS4L1T: "To protect the work and rights of the radio students, direct downloading of audio files is intentionally blocked and unavailable on this site.",
            aiS4L2: "Shows are only available via direct streaming (free and unlimited listening) using our media player.",
            aiS5Title: "Does a bug persist? Does a file seem inaccessible?",
            aiS5P: "Come report it to us directly at the radio studio! By letting the team know, we can put the file back online.",
            aiS5Loc: "📍 Studio open Monday and Tuesday from 12:40 PM to 1:25 PM",
            // Instagram
            instaMainTitle: "High School Instagram Accounts",
            instaR6Desc: "Podcasts, live show announcements, recording backstage news, and high school web radio updates.",
            instaCvlDesc: "Student representative news, committed projects, approved proposals, and high school life improvements.",
            instaMdlDesc: "Festive and cultural events, common room setup, clubs, and student-organized activities.",
            instaTermDesc: "Graduation account: year-end project tracking, fundraising actions, and promo memories.",
            instaBtsDesc: "Professional projects, study trips, guided tours, and actions led by the tourism section.",
            instaBtn: "View profile"
        },
        es: {
            navHome: "Inicio",
            navTeam: "El Equipo",
            navHelp: "Ayuda",
            footer: "© 2026 Radio 6 - Espacio de retransmisión del Lycée Arcisse de Caumont, Bayeux.",
            // Equipo
            eqTitle: "El Equipo de Radio 6",
            eqSub: "Descubre los entresijos de la Radio d'Art 6 del Lycée Arcisse de Caumont en Bayeux.",
            eqH3Hours: "🕒 Horarios de Apertura del Estudio",
            eqPHours: "El club y el estudio de la radio te reciben cada semana en los siguientes horarios:",
            eqBadge: "Lunes y Martes: 12:40 a 13:25",
            eqPDesc: "¡Pásate por el estudio para descubrir el equipo, asistir a las grabaciones o proponer tus ideas de programas!",
            eqJoinTitle: "🎙️ ¡Únete a la aventura para 2026 / 2027!",
            eqJoinP1: "¿Te apasiona el sonido, las noticias, la música, la técnica o la locución? ¿Quieres que se escuche tu voz en el instituto?",
            eqJoinP2: "Si quieres formar parte del equipo oficial de la radio para el próximo curso (temporada 2026/2027), ¡no lo dudes más!",
            eqJoinP3: "👉 Ven a conocernos directamente al estudio los lunes o martes a mediodía para ver cómo funciona y reservar tu plaza.",
            // Ayuda
            aiMainTitle: "¿Necesitas ayuda para escuchar?",
            aiMainSub: "Aquí tienes soluciones sencillas si encuentras alguna dificultad en nuestra plataforma.",
            aiS1Title: "🔇 El botón \"Escuchar\" no reproduce sonido",
            aiS1P: "Si haces clic en un programa y no pasa nada o el contador se queda en 00:00:",
            aiS1L1H: "Volumen del dispositivo:",
            aiS1L1T: "Asegúrate de que el modo \"Silencio\" de tu teléfono no esté activado y sube el volumen multimedia de tu dispositivo.",
            aiS1L2H: "Forzar reproducción:",
            aiS1L2T: "Algunos teléfonos bloquean la reproducción automática. Una vez que hayas hecho clic en un programa, pulsa directamente el botón \"▶\" situado en la barra de audio gris del centro.",
            aiS1L3H: "Auriculares Bluetooth:",
            aiS1L3T: "Comprueba que el sonido no se esté enviando a unos auriculares inalámbricos o a un altavoz que se hayan quedado conectados en tu mochila o en otra habitación.",
            aiS2Title: "📱 No veo los mismos programas en mi teléfono y en mi PC",
            aiS2P: "Es normal que la lista de retransmisiones varíe de un dispositivo a otro:",
            aiS2L1H: "Funcionamiento del sitio:",
            aiS2L1T: "Para almacenar programas muy largos sin interrupciones, este sitio utiliza la propia memoria del navegador del dispositivo (IndexedDB).",
            aiS2L2H: "Consecuencia:",
            aiS2L2T: "Los archivos de audio permanecen guardados en el ordenador donde los subió el equipo de la radio. Si cambias de PC o usas tu teléfono móvil, es normal ver una lista diferente o vacía.",
            aiS3Title: "Playback 🛑 El sonido se corta cuando el teléfono entra en modo de espera",
            aiS3P: "En algunos smartphones, la reproducción puede detenerse si la pantalla se apaga:",
            aiS3L1H: "Deja la pestaña abierta:",
            aiS3L1T: "Evita cerrar por completo el navegador o cambiar a una aplicación pesada (como un juego) mientras escuchas.",
            aiS3L2H: "Ahorro de batería:",
            aiS3L2T: "Si tu teléfono está en modo de \"Bajo consumo\", puede forzar el cierre del sitio para ahorrar batería. Desactívalo temporalmente para una escucha fluida.",
            aiS4Title: "📥 No encuentro el botón para descargar el archivo",
            aiS4L1H: "Escucha exclusiva:",
            aiS4L1T: "Para proteger el trabajo y los derechos de los alumnos de la radio, la descarga directa de archivos de audio está deliberadamente bloqueada y no disponible en este sitio.",
            aiS4L2: "Los programas solo están disponibles a través de streaming directo (escucha libre e ilimitada) utilizando nuestro reproductor.",
            aiS5Title: "¿Persiste el error? ¿Un archivo parece inaccesible?",
            aiS5P: "¡Ven a informarnos directamente al estudio de radio! Al avisar al equipo, podremos volver a poner el archivo en línea.",
            aiS5Loc: "📍 Estudio abierto lunes y martes de 12:40 a 13:25",
            // Instagram
            instaMainTitle: "Cuentas de Instagram del Instituto",
            instaR6Desc: "Podcasts, anuncios de programas en directo, detrás de las cámaras de las grabaciones y noticias de la radio web del instituto.",
            instaCvlDesc: "Noticias de los representantes de los alumnos, proyectos comprometidos, propuestas aprobadas y mejoras de la vida escolar.",
            instaMdlDesc: "Eventos festivos y culturales, acondicionamiento de la sala común, clubes y actividades organizadas por los alumnos.",
            instaTermDesc: "Cuenta de promoción: seguimiento de proyectos de fin de curso, acciones de financiación y recuerdos de la promoción.",
            instaBtsDesc: "Proyectos profesionales, viajes de estudio, visitas guiadas y acciones llevadas a cabo por la sección de turismo.",
            instaBtn: "Ver perfil"
        }
    };

    const currentLang = localStorage.getItem('siteLang') || 'fr';
    const t = translations[currentLang];

    function translate(id, text, isHTML = false) {
        const el = document.getElementById(id);
        if (el) {
            if (isHTML) el.innerHTML = text;
            else el.innerText = text;
        }
    }

    // Navigation et pied de page
    translate('nav-home', t.navHome);
    translate('nav-team', t.navTeam);
    translate('nav-help', t.navHelp);
    translate('footer-text', t.footer);

    // Page Équipe
    translate('eq-title', t.eqTitle);
    translate('eq-sub', t.eqSub);
    translate('eq-h3-hours', t.eqH3Hours);
    translate('eq-p-hours', t.eqPHours);
    translate('eq-badge', t.eqBadge);
    translate('eq-p-desc', t.eqPDesc);
    translate('eq-join-title', t.eqJoinTitle);
    translate('eq-join-p1', t.eqJoinP1);
    translate('eq-join-p2', t.eqJoinP2, true);
    translate('eq-join-p3', t.eqJoinP3);

    // Page Aide
    translate('ai-main-title', t.aiMainTitle);
    translate('ai-main-sub', t.aiMainSub);
    translate('ai-s1-title', t.aiS1Title);
    translate('ai-s1-p', t.aiS1P);
    translate('ai-s1-l1-h', t.aiS1L1H);
    translate('ai-s1-l1-t', t.aiS1L1T);
    translate('ai-s1-l2-h', t.aiS1L2H);
    translate('ai-s1-l2-t', t.aiS1L2T);
    translate('ai-s1-l3-h', t.aiS1L3H);
    translate('ai-s1-l3-t', t.aiS1L3T);
    translate('ai-s2-title', t.aiS2Title);
    translate('ai-s2-p', t.aiS2P);
    translate('ai-s2-l1-h', t.aiS2L1H);
    translate('ai-s2-l1-t', t.aiS2L1T);
    translate('ai-s2-l2-h', t.aiS2L2H);
    translate('ai-s2-l2-t', t.aiS2L2T);
    translate('ai-s3-title', t.aiS3Title);
    translate('ai-s3-p', t.aiS3P);
    translate('ai-s3-l1-h', t.aiS3L1H);
    translate('ai-s3-l1-t', t.aiS3L1T);
    translate('ai-s3-l2-h', t.aiS3L2H);
    translate('ai-s3-l2-t', t.aiS3L2T);
    translate('ai-s4-title', t.aiS4Title);
    translate('ai-s4-l1-h', t.aiS4L1H);
    translate('ai-s4-l1-t', t.aiS4L1T);
    translate('ai-s4-l2', t.aiS4L2);
    translate('ai-s5-title', t.aiS5Title);
    translate('ai-s5-p', t.aiS5P);
    translate('ai-s5-loc', t.aiS5Loc);

    // Page Instagram
    translate('insta-main-title', t.instaMainTitle);
    translate('insta-r6-desc', t.instaR6Desc);
    translate('insta-cvl-desc', t.instaCvlDesc);
    translate('insta-mdl-desc', t.instaMdlDesc);
    translate('insta-term-desc', t.instaTermDesc);
    translate('insta-bts-desc', t.instaBtsDesc);
    
    // Application du texte "Voir le profil" sur les 5 boutons Instagram
    for (let i = 1; i <= 5; i++) {
        translate(`insta-btn-${i}`, t.instaBtn);
    }
});
