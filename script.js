// --- CONFIGURATION SUPABASE CENTRALISÉE ---
const SUPABASE_URL = "https://cbaiwrlsuqyxhosnigkf.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNiYWl3cmxzdXF5eGhvc25pZ2tmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1NDkxNjIsImV4cCI6MjA5NjEyNTE2Mn0.u-mA4YEDwiZQ5qkGc9vDssUh_wDRUYrXtEO9be5gYfg";

const SupabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

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
            adminSubtitle: "Ajouter une nouvelle rediffusion (via lien Internet Archive) :",
            lblTitle: "Titre de l'émission :",
            lblInfo: "Date ou détails :",
            lblFile: "Lien direct du MP3 :",
            btnSubmit: "Ajouter le podcast",
            uploadStatus: "Enregistrement du lien sur le serveur en cours...",
            btnLogout: "Se déconnecter",
            settingsTitle: "Réglages Généraux",
            settingsLang: "Langue :",
            settingsMedia: "Thème Visuel :",
            settingsMediaDft: "Mode Sombre (Par défaut)",
            settingsMediaEar: "Mode Clair",
            settingsFont: "Taille de la police :",
            settingsFontSm: "Petite",
            settingsFontMd: "Normale",
            settingsFontLg: "Grande",
            settingsSave: "Enregistrer les réglages"
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
            adminSubtitle: "Add a new replay (via Internet Archive link):",
            lblTitle: "Show title:",
            lblInfo: "Date or details:",
            lblFile: "Direct MP3 Link:",
            btnSubmit: "Add podcast",
            uploadStatus: "Saving link to server...",
            btnLogout: "Log out",
            settingsTitle: "General Settings",
            settingsLang: "Language:",
            settingsMedia: "Visual Theme:",
            settingsMediaDft: "Dark Mode (Default)",
            settingsMediaEar: "Light Mode",
            settingsFont: "Font size:",
            settingsFontSm: "Small",
            settingsFontMd: "Normal",
            settingsFontLg: "Large",
            settingsSave: "Save settings"
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
            adminSubtitle: "Añadir una nouvelle retransmisión (vía enlace de Internet Archive):",
            lblTitle: "Título del programa:",
            lblInfo: "Fecha o détails:",
            lblFile: "Enlace directo MP3:",
            btnSubmit: "Añadir podcast",
            uploadStatus: "Guardando enlace en el servidor...",
            btnLogout: "Cerrar sesión",
            settingsTitle: "Ajustes Génales",
            settingsLang: "Idioma:",
            settingsMedia: "Tema Visual:",
            settingsMediaDft: "Modo Oscuro (Por defecto)",
            settingsMediaEar: "Modo Claro",
            settingsFont: "Tamaño de fuente:",
            settingsFontSm: "Pequeña",
            settingsFontMd: "Normal",
            settingsFontLg: "Grande",
            settingsSave: "Guardar ajustes"
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

    // Chargement automatique global depuis Supabase au lancement
    loadPodcastsFromSupabase();

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
            if (modalMenuParam) modalMenuParam.classList.remove('hidden');
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
            loadPodcastsFromSupabase(); 
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

    // --- ENREGISTRER LE LIEN DU PODCAST DANS SUPABASE ---
    if (addPodcastForm) {
        addPodcastForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const urlInput = document.getElementById('pod-url');
            const categorySelect = document.getElementById('pod-category');
            const titleInput = document.getElementById('pod-title');
            const infoInput = document.getElementById('pod-info');
            
            if (!urlInput || !urlInput.value.trim()) return;
            const audioUrl = urlInput.value.trim();

            if (btnSubmitPodcast) btnSubmitPodcast.disabled = true;
            if (uploadStatus) uploadStatus.classList.remove('hidden');

            const title = titleInput ? titleInput.value.trim() : "Sans titre";
            const info = infoInput ? infoInput.value.trim() : "";
            const category = categorySelect ? categorySelect.value : "autres";

            // Envoi des données du lien dans la table Supabase podcasts_ia
            const { data, error } = await SupabaseClient
                .from('podcasts_ia')
                .insert([{ title, info, category, url: audioUrl }]);

            if (error) {
                console.error("Erreur lors de l'envoi :", error);
                alert("Erreur lors de la sauvegarde du podcast.");
            } else {
                addPodcastForm.reset();
                loadPodcastsFromSupabase();
            }

            if (btnSubmitPodcast) btnSubmitPodcast.disabled = false;
            if (uploadStatus) uploadStatus.classList.add('hidden');
        });
    }

    // --- CHARGER LA GRILLE COMMUNE DEPUIS SUPABASE ---
    async function loadPodcastsFromSupabase() {
        categoriesList.forEach(cat => {
            const grid = document.getElementById(`grid-${cat}`);
            if (grid) grid.innerHTML = "";
        });

        // Lecture globale pour tous les élèves du lycée
        const { data: podcasts, error } = await SupabaseClient
            .from('podcasts_ia')
            .select('*')
            .order('id', { ascending: false });

        if (error || !podcasts || podcasts.length === 0) {
            categoriesList.forEach(cat => {
                const grid = document.getElementById(`grid-${cat}`);
                if (grid) grid.innerHTML = `<p style='color: var(--text-muted); text-align:center; padding:10px;'>${translations[currentLang].noPodcast}</p>`;
            });
            rafraichirCompteurs();
            return;
        }

        podcasts.forEach(pod => {
            const targetGrid = document.getElementById(`grid-${pod.category}`) || document.getElementById('grid-autres');

            if (targetGrid) {
                const card = document.createElement('div');
                card.className = 'podcast-card';
                card.innerHTML = `
                    <div class="podcast-info">
                        <h3>${pod.title}</h3>
                        <p>${pod.info}</p>
                    </div>
                    <div class="podcast-actions-wrapper">
                        <button class="btn-play" data-url="${pod.url}" data-title="${pod.title}">${translations[currentLang].listenBtn}</button>
                        <button class="btn-delete" data-id="${pod.id}">&times;</button>
                    </div>
                `;
                targetGrid.appendChild(card);
            }
        });

        // Gestion de la lecture
        document.querySelectorAll('.btn-play').forEach(btn => {
            btn.addEventListener('click', () => {
                const audioUrl = btn.getAttribute('data-url');
                const title = btn.getAttribute('data-title');
                if (mainAudioPlayer) {
                    mainAudioPlayer.src = audioUrl;
                    mainAudioPlayer.play().catch(err => console.log(err));
                    if (customPlayBtn) customPlayBtn.innerText = "⏸";
                    if (currentTitle) currentTitle.innerText = `▶ ${title}`;
                    if (playerStatus) playerStatus.innerText = translations[currentLang].playing;
                }
            });
        });

        // Suppression de la ligne pour l'admin
        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', async () => {
                if (confirm(translations[currentLang].confirmDelete)) {
                    const idToDelete = btn.getAttribute('data-id');
                    const { error } = await SupabaseClient
                        .from('podcasts_ia')
                        .delete()
                        .eq('id', idToDelete);

                    if (error) {
                        console.error("Erreur de suppression :", error);
                        alert("Impossible de supprimer la rediffusion.");
                    } else {
                        loadPodcastsFromSupabase();
                    }
                }
            });
        });

        rafraichirCompteurs();
    }

    function rafraichirCompteurs() {
        categoriesList.forEach(cat => {
            const grid = document.getElementById(`grid-${cat}`);
            const badge = document.getElementById(`count-${cat}`);
            if (grid && badge) {
                const count = grid.querySelectorAll('.podcast-card').length;
                badge.textContent = `(${count})`;
            }
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

    // --- ACCÈS DIRECT ET ÉCRANS SPLASH ---
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

    // --- POPUP DE CONNEXION ---
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

            const usernameInput = userField.value.trim();
            const passwordInput = passField.value.trim();

            const encoder = new TextEncoder();
            const data = encoder.encode(passwordInput);
            const hashBuffer = await crypto.subtle.digest('SHA-256', data);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const passwordHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

            if (usernameInput === "Radio 6" && passwordHash === "987804915f7a36e81ea33983df6a650243705fa2a740b748e83ad7ac9f32ad51") {
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

window.closeParamModal = function(modalId) {
    const targetModal = document.getElementById(modalId);
    if (targetModal) {
        targetModal.classList.add('hidden');
    }
};
