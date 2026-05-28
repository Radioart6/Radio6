document.addEventListener('DOMContentLoaded', () => {
    // --- ÉLÉMENTS UI GLOBAUX ---
    const splashScreen = document.getElementById('splash-screen');
    const mainContent = document.getElementById('main-content');
    const btnEnter = document.getElementById('btn-enter');
    const btnLoginOpen = document.getElementById('btn-login-open');
    const btnLoginClose = document.getElementById('btn-login-close');
    const loginModal = document.getElementById('login-modal');
    const loginForm = document.getElementById('login-form');
    const loginError = document.getElementById('login-error');
    const adminPanel = document.getElementById('admin-panel');
    const btnLogout = document.getElementById('btn-logout');
    const addPodcastForm = document.getElementById('add-podcast-form');
    const btnSubmitPodcast = document.getElementById('btn-submit-podcast');
    const uploadStatus = document.getElementById('upload-status');
    const mainNav = document.getElementById('main-nav');

    // Gestion des fenêtres de paramètres
    const paramBtn = document.getElementById('param-btn');
    const modalTravaux = document.getElementById('modal-travaux');
    const modalMenuParam = document.getElementById('modal-menu-param');
    const selectPolice = document.getElementById('param-police');
    const selectLangue = document.getElementById('param-langue');
    const selectTheme = document.getElementById('param-media'); 
    const selectTaille = document.getElementById('param-taille-police');

    // Éléments liés à la BARRE AUDIO PERSONNALISÉE
    const mainAudioPlayer = document.getElementById('main-audio-player');
    const customPlayBtn = document.getElementById('custom-play-btn');
    const progressBarBg = document.getElementById('progress-bar-bg');
    const progressBarFill = document.getElementById('progress-bar-fill');
    const currentTimeDisplay = document.getElementById('current-time');
    const totalDurationDisplay = document.getElementById('total-duration');
    const currentTitle = document.getElementById('current-title');
    const playerStatus = document.getElementById('player-status');

    let db;
    let currentObjectUrl = null;
    const categoriesList = ['loisir-sport', 'touristique', 'actualites-infos', 'culture', 'autres'];

    // --- DICTIONNAIRE DE TRADUCTION ---
    const translations = {
        fr: {
            splashBtn: "Entrer dans l'espace rediffusion",
            navLogin: "Connexion",
            navHome: "Accueil",
            navTeam: "L'Équipe",
            navHelp: "Aide",
            ready: "PRÊT À L'ÉCOUTE",
            playing: "LECTURE EN COURS",
            pause: "PAUSE",
            choosePodcast: "🎧 Choisissez une rediffusion ci-dessous",
            noPodcast: "Aucun podcast dans ce dossier.",
            listenBtn: "Écouter la rediffusion",
            confirmDelete: "Voulez-vous vraiment supprimer définitivement cette rediffusion ?",
            sectionTitle: "Liste des Rediffusions",
            adminTitle: "🛠️ Panneau de Gestion (Propriétaire)",
            adminSubtitle: "Ajouter une nouvelle rediffusion (sans limite de taille) :",
            lblTitle: "Titre de l'émission :",
            lblInfo: "Date ou détails :",
            lblFile: "Sélectionner le fichier MP3 :",
            btnSubmit: "Ajouter le podcast",
            uploadStatus: "Traitement du fichier audio en cours...",
            btnLogout: "Se déconnecter",
            travauxTitle: "Zone en travaux",
            travauxNotice: "Cette section est actuellement en cours de développement ou nécessite des privilèges élevés pour être pleinement fonctionnelle.",
            travauxRecent: "Ajout récent :",
            travauxRecentTxt: "• Apparition de l'icône de configuration dans le menu principal.",
            travauxFuture: "Évolution prévue :",
            travauxFutureTxt: "• Ce bouton permettra aux visiteurs d'ajuster leurs préférences de lecture.",
            settingsTitle: "Réglages Général",
            settingsLang: "Langue :",
            settingsMedia: "Thème Visuel :",
            settingsMediaDft: "Mode Sombre (Par défaut)",
            settingsMediaEar: "Mode Clair",
            settingsFont: "Taille de la police :",
            settingsFontSm: "Petite",
            settingsFontMd: "Normale",
            settingsFontLg: "Grande",
            settingsSave: "Enregistrer les réglages",
            lastUpdateTitle: "✅ Dernière mise à jour",
            lastUpdate1: "Intégration du bouton Paramètres dans la barre de navigation.",
            lastUpdate2: "Mode déconnecté : Affichage d'une fenêtre alerte 'Zone en travaux'.",
            lastUpdate3: "Mode connecté : Menu de réglages opérationnel avec modification de la taille de la police.",
            nextUpdateTitle: "🚀 Prochaine mise à jour",
            nextUpdate1: "Le bouton Paramètre aura une fonctionnalité.",
            nextUpdate2: "Ajout imminent de l'émission du 12 mai.",
            nextUpdate3: "Rajout possible d'une IA pour mieux vous aider sur le site."
        },
        en: {
            splashBtn: "Enter the replay area",
            navLogin: "Login",
            navHome: "Home",
            navTeam: "The Team",
            navHelp: "Help",
            ready: "READY TO LISTEN",
            playing: "PLAYING",
            pause: "PAUSED",
            choosePodcast: "🎧 Choose a replay below",
            noPodcast: "No podcasts in this folder.",
            listenBtn: "Listen to the replay",
            confirmDelete: "Are you sure you want to permanently delete this replay?",
            sectionTitle: "Replay List",
            adminTitle: "🛠️ Management Panel (Owner)",
            adminSubtitle: "Add a new replay (no size limit):",
            lblTitle: "Show title:",
            lblInfo: "Date or details:",
            lblFile: "Select MP3 file:",
            btnSubmit: "Add podcast",
            uploadStatus: "Processing audio file...",
            btnLogout: "Log out",
            travauxTitle: "Under Construction",
            travauxNotice: "This section is currently under development or requires elevated privileges to be fully functional.",
            travauxRecent: "Recent update:",
            travauxRecentTxt: "• Settings icon added to the main menu.",
            travauxFuture: "Planned evolution:",
            travauxFutureTxt: "• This button will allow visitors to adjust their playback preferences.",
            settingsTitle: "General Settings",
            settingsLang: "Language:",
            settingsMedia: "Visual Theme:",
            settingsMediaDft: "Dark Mode (Default)",
            settingsMediaEar: "Light Mode",
            settingsFont: "Font size:",
            settingsFontSm: "Small",
            settingsFontMd: "Normal",
            settingsFontLg: "Large",
            settingsSave: "Save settings",
            lastUpdateTitle: "✅ Last update",
            lastUpdate1: "Integration of the Settings button in the navigation bar.",
            lastUpdate2: "Offline mode: display of a 'Under Construction' alert window.",
            lastUpdate3: "Connected mode: Operational settings menu with font size adjustment.",
            nextUpdateTitle: "🚀 Next update",
            nextUpdate1: "The Settings button will have a functionality.",
            nextUpdate2: "Imminent addition of the May 12th show.",
            nextUpdate3: "Possible addition of an AI to better assist you on the site."
        },
        es: {
            splashBtn: "Entrar en el espacio de retransmisión",
            navLogin: "Conexión",
            navHome: "Inicio",
            navTeam: "El Equipo",
            navHelp: "Ayuda",
            ready: "LISTO PARA ESCUCHAR",
            playing: "REPRODUCIENDO",
            pause: "PAUSA",
            choosePodcast: "🎧 Elige una retransmisión abajo",
            noPodcast: "No hay podcasts en esta carpeta.",
            listenBtn: "Escuchar la retransmisión",
            confirmDelete: "¿Estás seguro de que quieres eliminar permanentemente esta retransmisión?",
            sectionTitle: "Lista de Retransmisiones",
            adminTitle: "🛠️ Panel de Gestión (Propietario)",
            adminSubtitle: "Añadir una nouvelle retransmisión (sin límite de tamaño):",
            lblTitle: "Título del programa:",
            lblInfo: "Fecha o détails:",
            lblFile: "Seleccionar archivo MP3:",
            btnSubmit: "Añadir podcast",
            uploadStatus: "Procesando archivo de audio...",
            btnLogout: "Cerrar sesión",
            travauxTitle: "Zona en obras",
            travauxNotice: "Esta sección está actualmente en desarrollo o requiere privilegios elevados para ser totalmente funcional.",
            travauxRecent: "Añadido reciente:",
            travauxRecentTxt: "• Aparición del icono de configuración en el menú principal.",
            travauxFuture: "Evolución prevista:",
            travauxFutureTxt: "• Este botón permitirá a los visitantes ajustar sus preferencias de lectura.",
            settingsTitle: "Ajustes Generales",
            settingsLang: "Idioma:",
            settingsMedia: "Tema Visual:",
            settingsMediaDft: "Modo Oscuro (Por defecto)",
            settingsMediaEar: "Modo Claro",
            settingsFont: "Tamaño de fuente:",
            settingsFontSm: "Pequeña",
            settingsFontMd: "Normal",
            settingsFontLg: "Grande",
            settingsSave: "Guardar ajustes",
            lastUpdateTitle: "✅ Última actualización",
            lastUpdate1: "Integración del botón Configuración en la barra de navegación.",
            lastUpdate2: "Modo desconectado: visualización de una ventana de alerta 'Zona en obras'.",
            lastUpdate3: "Modo conectado: Menú de ajustes operativo con modificación del tamaño de la fuente.",
            nextUpdateTitle: "🚀 Próxima actualización",
            nextUpdate1: "El botón Configuración tendrá una funcionalidad.",
            nextUpdate2: "Adición inminente del programa del 12 de mayo.",
            nextUpdate3: "Posible adición de una IA para ayudarte mejor en el sitio."
        }
    };

    let currentLang = localStorage.getItem('siteLang') || 'fr';

    // --- CONFIGURATION THEME & POLICES AU CHARGEMENT ---
    const savedTheme = localStorage.getItem('siteTheme') || 'dark';
    if (savedTheme === 'light') document.body.classList.add('light-mode');

    const savedSize = localStorage.getItem('siteFontSize') || 'medium';
    document.body.classList.remove('font-small', 'font-medium', 'font-large');
    document.body.classList.add(`font-${savedSize}`);

    const savedFont = localStorage.getItem('siteFont') || 'normal';
    if (savedFont === 'dyslexic') document.body.classList.add('font-dyslexic');

    // --- INITIALISATION INDEXEDDB ---
    const dbRequest = indexedDB.open("Radio6_Database", 1);

    dbRequest.onupgradeneeded = (e) => {
        db = e.target.result;
        if (!db.objectStoreNames.contains("podcasts")) {
            db.createObjectStore("podcasts", { keyPath: "id" });
        }
    };

    dbRequest.onsuccess = (e) => {
        db = e.target.result;
        loadPodcastsFromDB();
    };

    dbRequest.onerror = () => {
        console.error("Impossible d'initialiser le stockage lourd IndexedDB.");
    };

    // --- ACCORDÉON DES DOSSIERS DE PODCASTS ---
    document.querySelectorAll('.folder-box h3').forEach(header => {
        header.addEventListener('click', () => {
            const grid = header.nextElementSibling;
            if (grid) grid.classList.toggle('hidden');
        });
    });

    // --- PARAMÈTRES INTERFACE ---
    if (paramBtn) {
        paramBtn.addEventListener('click', () => {
            const isAdmin = sessionStorage.getItem('adminMode') === 'true';
            if (isAdmin) {
                if (modalMenuParam) modalMenuParam.classList.remove('hidden');
            } else {
                if (modalTravaux) modalTravaux.classList.remove('hidden');
            }
        });
    }

    if (selectPolice) {
        selectPolice.value = savedFont;
        selectPolice.addEventListener('change', (e) => {
            const selectedFont = e.target.value;
            localStorage.setItem('siteFont', selectedFont);
            if (selectedFont === 'dyslexic') {
                document.body.classList.add('font-dyslexic');
            } else {
                document.body.classList.remove('font-dyslexic');
            }
        });
    }

    if (selectTaille) {
        selectTaille.value = savedSize;
        selectTaille.addEventListener('change', (e) => {
            const selectedSize = e.target.value;
            localStorage.setItem('siteFontSize', selectedSize);
            document.body.classList.remove('font-small', 'font-medium', 'font-large');
            document.body.classList.add(`font-${selectedSize}`);
        });
    }

    if (selectLangue) {
        selectLangue.value = currentLang;
        applyTranslations(currentLang);
        selectLangue.addEventListener('change', (e) => {
            currentLang = e.target.value;
            localStorage.setItem('siteLang', currentLang);
            applyTranslations(currentLang);
            loadPodcastsFromDB(); 
        });
    }

    if (selectTheme) {
        selectTheme.value = savedTheme;
        selectTheme.addEventListener('change', (e) => {
            const selectedTheme = e.target.value;
            localStorage.setItem('siteTheme', selectedTheme);
            if (selectedTheme === 'light') {
                document.body.classList.add('light-mode');
            } else {
                document.body.classList.remove('light-mode');
            }
        });
    }

    // --- TRADUCTIONS ---
    function applyTranslations(lang) {
        const t = translations[lang];
        if (!t) return;

        if (btnEnter) btnEnter.innerText = t.splashBtn;
        if (btnLoginOpen) btnLoginOpen.innerText = t.navLogin;
        
        if (mainNav) {
            const navLinks = mainNav.querySelectorAll('a');
            if (navLinks.length >= 3) {
                navLinks[0].innerText = t.navHome;
                navLinks[1].innerText = t.navTeam;
                navLinks[2].innerText = t.navHelp;
            }
        }

        if (mainAudioPlayer && currentTitle && playerStatus) {
            if (mainAudioPlayer.paused && mainAudioPlayer.currentTime === 0) {
                currentTitle.innerText = t.choosePodcast;
                playerStatus.innerText = t.ready;
            } else if (mainAudioPlayer.paused) {
                playerStatus.innerText = t.pause;
            } else {
                playerStatus.innerText = t.playing;
            }
        }

        const sectionTitle = document.querySelector('.podcast-section h2');
        if (sectionTitle) sectionTitle.innerText = t.sectionTitle;

        if (adminPanel) {
            const adminH3 = adminPanel.querySelector('h3');
            if (adminH3) adminH3.innerText = t.adminTitle;
            const adminP = adminPanel.querySelector('p');
            if (adminP) adminP.innerText = t.adminSubtitle;
            const labels = adminPanel.querySelectorAll('.form-group label');
            if (labels.length >= 3) {
                labels[0].innerText = t.lblTitle;
                labels[1].innerText = t.lblInfo;
                labels[2].innerText = t.lblFile;
            }
        }
        
        if (btnSubmitPodcast) btnSubmitPodcast.innerText = t.btnSubmit;
        if (uploadStatus) uploadStatus.innerText = t.uploadStatus;
        if (btnLogout) btnLogout.innerText = t.btnLogout;

        if (modalTravaux) {
            const travauxH3 = modalTravaux.querySelector('h3');
            if (travauxH3) travauxH3.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> ${t.travauxTitle}`;
            const travauxP = modalTravaux.querySelector('.param-notice');
            if (travauxP) travauxP.innerText = t.travauxNotice;
            const travauxBoxes = modalTravaux.querySelectorAll('.param-box-update');
            if (travauxBoxes.length >= 2) {
                if(travauxBoxes[0].querySelector('h5')) travauxBoxes[0].querySelector('h5').innerText = t.travauxRecent;
                if(travauxBoxes[0].querySelector('p')) travauxBoxes[0].querySelector('p').innerText = t.travauxRecentTxt;
                if(travauxBoxes[1].querySelector('h5')) travauxBoxes[1].querySelector('h5').innerText = t.travauxFuture;
                if(travauxBoxes[1].querySelector('p')) travauxBoxes[1].querySelector('p').innerText = t.travauxFutureTxt;
            }
        }

        if (modalMenuParam) {
            const settingsH3 = modalMenuParam.querySelector('h3');
            if (settingsH3) settingsH3.innerHTML = `<i class="fa-solid fa-sliders"></i> ${t.settingsTitle}`;
            const settingsLabels = modalMenuParam.querySelectorAll('.param-row label');
            if (settingsLabels.length >= 3) {
                settingsLabels[0].innerHTML = `<i class="fa-solid fa-language"></i> ${t.settingsLang}`;
                settingsLabels[1].innerHTML = `<i class="fa-solid fa-palette"></i> ${t.settingsMedia}`;
                settingsLabels[2].innerHTML = `<i class="fa-solid fa-font"></i> ${t.settingsFont}`;
            }
            if (selectTheme && selectTheme.options.length >= 2) {
                selectTheme.options[0].text = t.settingsMediaDft;
                selectTheme.options[1].text = t.settingsMediaEar;
            }
            const saveBtn = modalMenuParam.querySelector('.btn-submit');
            if (saveBtn) saveBtn.innerText = t.settingsSave;
        }

        if (selectPolice && selectPolice.options.length >= 3) {
            selectPolice.options[0].text = t.settingsFontSm;
            selectPolice.options[1].text = t.settingsFontMd;
            selectPolice.options[2].text = t.settingsFontLg;
        }

        const updateLast = document.querySelector('.update-box.last');
        if (updateLast) {
            const h4 = updateLast.querySelector('h4');
            if (h4) h4.innerText = t.lastUpdateTitle;
            const lis = updateLast.querySelectorAll('ul li');
            if (lis.length >= 3) {
                lis[0].innerText = t.lastUpdate1;
                lis[1].innerText = t.lastUpdate2;
                lis[2].innerText = t.lastUpdate3;
            }
        }
        
        const updateNext = document.querySelector('.update-box.next');
        if (updateNext) {
            const h4 = updateNext.querySelector('h4');
            if (h4) h4.innerText = t.nextUpdateTitle;
            const lis = updateNext.querySelectorAll('ul li');
            if (lis.length >= 3) {
                lis[0].innerHTML = t.nextUpdate1;
                lis[1].innerHTML = t.nextUpdate2;
                lis[2].innerHTML = t.nextUpdate3;
            }
        }
    }

    // --- BARRE AUDIO PERSONNALISÉE ---
    if (customPlayBtn && mainAudioPlayer) {
        customPlayBtn.addEventListener('click', () => {
            const t = translations[currentLang];
            if (mainAudioPlayer.paused) {
                mainAudioPlayer.play().catch(err => console.log(err));
                customPlayBtn.innerText = "⏸";
                if (playerStatus) playerStatus.innerText = t.playing;
            } else {
                mainAudioPlayer.pause();
                customPlayBtn.innerText = "▶";
                if (playerStatus) playerStatus.innerText = t.pause;
            }
        });

        mainAudioPlayer.addEventListener('timeupdate', () => {
            const current = mainAudioPlayer.currentTime;
            const duration = mainAudioPlayer.duration;
            
            if (duration && progressBarFill) {
                const percentage = (current / duration) * 100;
                progressBarFill.style.width = `${percentage}%`;
                if (currentTimeDisplay) currentTimeDisplay.innerText = formatTime(current);
            }
        });

        mainAudioPlayer.addEventListener('loadedmetadata', () => {
            if (totalDurationDisplay) totalDurationDisplay.innerText = formatTime(mainAudioPlayer.duration);
            customPlayBtn.disabled = false;
        });

        mainAudioPlayer.addEventListener('ended', () => {
            customPlayBtn.innerText = "▶";
            if (playerStatus) playerStatus.innerText = translations[currentLang].ready;
            if (progressBarFill) progressBarFill.style.width = "0%";
            if (currentTimeDisplay) currentTimeDisplay.innerText = "00:00";
            if (currentObjectUrl) {
                URL.revokeObjectURL(currentObjectUrl);
                currentObjectUrl = null;
            }
        });
    }

    if (progressBarBg && mainAudioPlayer) {
        progressBarBg.addEventListener('click', (e) => {
            if (!mainAudioPlayer.duration) return;
            const rect = progressBarBg.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const percentage = clickX / rect.width;
            mainAudioPlayer.currentTime = percentage * mainAudioPlayer.duration;
        });
    }

    function formatTime(seconds) {
        if (isNaN(seconds)) return "00:00";
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.floor(seconds % 60);
        const mStr = m < 10 ? "0" + m : m;
        const sStr = s < 10 ? "0" + s : s;
        return h > 0 ? `${h}:${mStr}:${sStr}` : `${mStr}:${sStr}`;
    }

    // --- ENREGISTRER UN PODCAST DANS LA BASE INDEXEDDB ---
    if (addPodcastForm) {
        addPodcastForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const fileInput = document.getElementById('pod-file');
            const categorySelect = document.getElementById('pod-category');
            
            if (!fileInput || !fileInput.files.length) return;
            const file = fileInput.files[0];

            if (btnSubmitPodcast) btnSubmitPodcast.disabled = true;
            if (uploadStatus) uploadStatus.classList.remove('hidden');

            const newPodcast = {
                id: Date.now(),
                title: document.getElementById('pod-title')?.value || "Sans titre",
                info: document.getElementById('pod-info')?.value || "",
                category: categorySelect ? categorySelect.value : "autres", 
                fileData: file
            };

            const transaction = db.transaction(["podcasts"], "readwrite");
            const store = transaction.objectStore("podcasts");
            const addRequest = store.add(newPodcast);

            addRequest.onsuccess = () => {
                addPodcastForm.reset();
                loadPodcastsFromDB();
                if (btnSubmitPodcast) btnSubmitPodcast.disabled = false;
                if (uploadStatus) uploadStatus.classList.add('hidden');
            };

            addRequest.onerror = (err) => {
                console.error(err);
                if (btnSubmitPodcast) btnSubmitPodcast.disabled = false;
                if (uploadStatus) uploadStatus.classList.add('hidden');
            };
        });
    }

    // --- CHARGER LA GRILLE ET LES DOSSIERS DEPUIS INDEXEDDB ---
    function loadPodcastsFromDB() {
        if (!db) return;
        const transaction = db.transaction(["podcasts"], "readonly");
        const store = transaction.objectStore("podcasts");
        const getAllRequest = store.getAll();

        getAllRequest.onsuccess = () => {
            const list = getAllRequest.result;

            // 1. On vide toutes les grilles pour éviter les doublons
            categoriesList.forEach(cat => {
                const grid = document.getElementById(`grid-${cat}`);
                if (grid) grid.innerHTML = "";
            });

            // 2. Si la BDD globale est vide
            if (list.length === 0) {
                categoriesList.forEach(cat => {
                    const grid = document.getElementById(`grid-${cat}`);
                    if (grid) grid.innerHTML = `<p style='color: var(--text-muted); text-align:center; padding:10px;'>${translations[currentLang].noPodcast}</p>`;
                });
                rafraichirCompteurs();
                return;
            }

            // Tri par date décroissante
            list.sort((a, b) => b.id - a.id);

            // 3. Distribution des cartes dans les bons sous-dossiers HTML
            list.forEach(pod => {
                const podCategory = pod.category || "autres";
                const targetGrid = document.getElementById(`grid-${podCategory}`);

                if (targetGrid) {
                    const card = document.createElement('div');
                    card.className = 'podcast-card'; // Correspond à ton style CSS d'origine
                    card.innerHTML = `
                        <div class="podcast-info">
                            <h3>${pod.title}</h3>
                            <p>${pod.info}</p>
                        </div>
                        <div class="podcast-actions-wrapper">
                            <button class="btn-play" data-id="${pod.id}" data-title="${pod.title}">${translations[currentLang].listenBtn}</button>
                            <button class="btn-delete" data-id="${pod.id}">&times;</button>
                        </div>
                    `;
                    targetGrid.appendChild(card);
                }
            });

            // 4. Attribution des écouteurs d'événements aux boutons créés
            document.querySelectorAll('.btn-play').forEach(btn => {
                btn.addEventListener('click', () => {
                    const id = parseInt(btn.getAttribute('data-id'));
                    const title = btn.getAttribute('data-title');
                    playPodcastFromDB(id, title);
                });
            });

            document.querySelectorAll('.btn-delete').forEach(btn => {
                btn.addEventListener('click', () => {
                    const id = parseInt(btn.getAttribute('data-id'));
                    deletePodcastFromDB(id);
                });
            });

            // 5. Mise à jour en temps réel des badges (0)
            rafraichirCompteurs();
        };
    }

    function playPodcastFromDB(id, title) {
        if (!db || !mainAudioPlayer) return;
        const transaction = db.transaction(["podcasts"], "readonly");
        const store = transaction.objectStore("podcasts");
        const getRequest = store.get(id);

        getRequest.onsuccess = () => {
            const record = getRequest.result;
            if (record && record.fileData) {
                if (currentObjectUrl) URL.revokeObjectURL(currentObjectUrl);
                currentObjectUrl = URL.createObjectURL(record.fileData);
                mainAudioPlayer.src = currentObjectUrl;
                mainAudioPlayer.play().catch(err => console.log(err));

                if (customPlayBtn) customPlayBtn.innerText = "⏸";
                if (currentTitle) currentTitle.innerText = `▶ ${title}`;
                if (playerStatus) {
                    playerStatus.innerText = translations[currentLang].playing;
                }
            }
        };
    }

    function deletePodcastFromDB(id) {
        if (confirm(translations[currentLang].confirmDelete)) {
            const transaction = db.transaction(["podcasts"], "readwrite");
            const store = transaction.objectStore("podcasts");
            const deleteRequest = store.delete(id);
            deleteRequest.onsuccess = () => loadPodcastsFromDB();
        }
    }

    function rafraichirCompteurs() {
        categoriesList.forEach(cat => {
            const grid = document.getElementById(`grid-${cat}`);
            const badge = document.getElementById(`count-${cat}`);
            if (grid && badge) {
                // Compte le nombre exact de cartes (.podcast-card) injectées dans cette grille
                const count = grid.querySelectorAll('.podcast-card').length;
                badge.textContent = `(${count})`;
            }
        });
    }

    // --- LOGIQUE ONGLETS ET ACCÈS SESSIONS ---
    function injectIALink() {
        if (!mainNav || document.getElementById('nav-ia-admin')) return;
        const iaLink = document.createElement('a');
        iaLink.href = 'ia-aide.html';
        iaLink.id = 'nav-ia-admin';
        iaLink.className = 'ia-link';
        iaLink.innerText = 'Aide 2.0';
        const instaLink = mainNav.querySelector('a[href*="instagram.com"]');
        if (instaLink) mainNav.insertBefore(iaLink, instaLink);
        else mainNav.appendChild(iaLink);
    }

    function removeIALink() {
        const iaLink = document.getElementById('nav-ia-admin');
        if (iaLink) iaLink.remove();
    }

    if (sessionStorage.getItem('enteredSite') === 'true') {
        if (splashScreen) splashScreen.classList.add('hidden');
        if (mainContent) mainContent.classList.remove('hidden');
    }

    if (sessionStorage.getItem('adminMode') === 'true') {
        if (adminPanel) adminPanel.classList.remove('hidden');
        if (btnLoginOpen) btnLoginOpen.classList.add('hidden');
        document.body.classList.add('admin-mode');
        injectIALink();
    }

    if (btnEnter) {
        btnEnter.addEventListener('click', () => {
            if (splashScreen) {
                splashScreen.classList.add('fade-out');
                setTimeout(() => splashScreen.classList.add('hidden'), 500);
            }
            if (mainContent) mainContent.classList.remove('hidden');
            sessionStorage.setItem('enteredSite', 'true');
        });
    }

    if (btnLoginOpen) {
        btnLoginOpen.addEventListener('click', () => {
            if (loginModal) loginModal.classList.remove('hidden');
            if (loginError) loginError.classList.add('hidden');
        });
    }

    if (btnLoginClose) {
        btnLoginClose.addEventListener('click', () => {
            if (loginModal) loginModal.classList.add('hidden');
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === loginModal) loginModal.classList.add('hidden');
        if (e.target === modalTravaux) modalTravaux.classList.add('hidden');
        if (e.target === modalMenuParam) modalMenuParam.classList.add('hidden');
    });

if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const userField = document.getElementById('username');
            const passField = document.getElementById('password');
            
            if (!userField || !passField) return;

            // Fonction pour générer l'empreinte SHA-256 du mot de passe saisi
            const encoder = new TextEncoder();
            const data = encoder.encode(passField.value);
            const hashBuffer = await crypto.subtle.digest('SHA-256', data);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const passwordHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

            // L'identifiant reste le même, mais on compare l'empreinte calculée
            // "679878..." correspond à l'empreinte sécurisée de ton mot de passe d'origine
            if (userField.value === "Radio 6" && passwordHash === "6798782a9db30a845929668383cfb1b666795f5ab48386f56434850fa9194ec7") {
                if (loginModal) loginModal.classList.add('hidden');
                if (adminPanel) adminPanel.classList.remove('hidden');
                if (btnLoginOpen) btnLoginOpen.classList.add('hidden');
                document.body.classList.add('admin-mode');
                sessionStorage.setItem('adminMode', 'true');
                injectIALink();
                loginForm.reset();
                applyTranslations(currentLang);
            } else {
                if (loginError) loginError.classList.remove('hidden');
            }
        });
    }
    if (btnLogout) {
        btnLogout.addEventListener('click', () => {
            if (adminPanel) adminPanel.classList.add('hidden');
            if (btnLoginOpen) btnLoginOpen.classList.remove('hidden');
            document.body.classList.remove('admin-mode');
            sessionStorage.setItem('adminMode', 'false');
            removeIALink();
            applyTranslations(currentLang);
        });
    }
});

// --- FERMETURE DES MODALES DE PARAMÈTRES (ACCÈS GLOBAL HTML) ---
window.closeParamModal = function(modalId) {
    const targetModal = document.getElementById(modalId);
    if (targetModal) {
        targetModal.classList.add('hidden');
    }
};
