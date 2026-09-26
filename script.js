// --- CONFIGURATION SUPABASE CENTRALISÉE ---
const SUPABASE_URL = "https://cbaiwrlsuqyxhosnigkf.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNiYWl3cmxzdXF5eGhvc25pZ2tmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1NDkxNjIsImV4cCI6MjA5NjEyNTE2Mn0.u-mA4YEDwiZQ5qkGc9vDssUh_wDRUYrXtEO9be5gYfg";

const SupabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let editPodcastId = null;

// ==========================================
// 1. BANDEAU DYNAMIQUE EN DIRECT & COMPTE À REBOURS
// ==========================================
function updateLiveBanner() {
    const banner = document.getElementById('live-banner');
    if (!banner) return;

    const now = new Date();
    const day = now.getDay(); // 0 = Dimanche, 4 = Jeudi
    const hours = now.getHours();
    const minutes = now.getMinutes();

    // Plage horaire du direct : Jeudi de 13h00 (760 min) à 13h25 (805 min)
    const isThursday = (day === 4);
    const currentMinutesOfDay = hours * 60 + minutes;
    const startLive = 13 * 60;
    const endLive = 13 * 60 + 25;

    // Pendant la diffusion en direct
    if (isThursday && currentMinutesOfDay >= startLive && currentMinutesOfDay < endLive) {
        banner.classList.add('is-live');
        banner.innerHTML = '🔴 <strong>EN DIRECT EN CE MOMENT !</strong> Écoutez la radio dans le hall ou les foyers.';
        return;
    }

    // Hors direct : compte à rebours jusqu'au prochain jeudi 13h00
    banner.classList.remove('is-live');

    let nextLive = new Date();
    nextLive.setHours(13, 0, 0, 0);

    let daysUntilThursday = (4 - day + 7) % 7;
    if (daysUntilThursday === 0 && currentMinutesOfDay >= endLive) {
        daysUntilThursday = 7;
    }
    nextLive.setDate(now.getDate() + daysUntilThursday);

    const diff = nextLive - now;

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    const pad = (num) => String(num).padStart(2, '0');

    banner.innerHTML = `⏳ <strong>Prochain direct dans :</strong> ${d}j ${pad(h)}h ${pad(m)}min ${pad(s)}s (Jeudi à 13h00)`;
}

// ==========================================
// 2. RACCOURCIS CLAVIER POUR LE LECTEUR AUDIO
// ==========================================
function initKeyboardShortcuts() {
    const audio = document.getElementById('main-audio-player');

    document.addEventListener('keydown', (e) => {
        const activeElem = document.activeElement;
        const isInputField = activeElem && (
            activeElem.tagName === 'INPUT' || 
            activeElem.tagName === 'TEXTAREA' || 
            activeElem.tagName === 'SELECT' ||
            activeElem.isContentEditable
        );

        if (isInputField || !audio) return;

        // Touche Espace : Play / Pause
        if (e.code === 'Space') {
            e.preventDefault();
            if (audio.paused) {
                audio.play().catch(err => console.log(err));
            } else {
                audio.pause();
            }
        } 
        // Flèche Gauche : Reculer de 10s
        else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            audio.currentTime = Math.max(0, audio.currentTime - 10);
        } 
        // Flèche Droite : Avancer de 10s
        else if (e.key === 'ArrowRight') {
            e.preventDefault();
            audio.currentTime = Math.min(audio.duration || 0, audio.currentTime + 10);
        }
    });
}

// ==========================================
// 3. BOUTON NOTIFICATIONS PUSH (FIREBASE) - SANS LOCALSTORAGE
// ==========================================
function initPushNotifications() {
    if (!('Notification' in window)) return;

    // On ne bloque plus par rapport au localStorage pour pouvoir tester à l'infini
    if (Notification.permission === 'granted' && localStorage.getItem('token_saved') === 'true') {
        return; // Si déjà autorisé ET token déjà sauvegardé, on cache le bouton
    }

    const liveBanner = document.getElementById('live-banner');
    if (!liveBanner) return;

    // Éviter de dupliquer le bouton s'il existe déjà
    if (document.getElementById('notif-prompt-container')) return;

    const notifContainer = document.createElement('div');
    notifContainer.id = 'notif-prompt-container';
    notifContainer.style.cssText = 'text-align: center; margin-bottom: 1rem;';

    const notifBtn = document.createElement('button');
    notifBtn.id = 'btn-enable-notif';
    notifBtn.innerHTML = '🔔 Activer les notifications de direct';
    notifBtn.style.cssText = 'background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: #ffffff; border: none; padding: 10px 20px; font-size: 0.95rem; border-radius: 8px; cursor: pointer; font-weight: bold; box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3); transition: transform 0.2s;';

    notifBtn.addEventListener('click', async () => {
        try {
            console.log("Demande de permission des notifications...");
            const permission = await Notification.requestPermission();
            
            if (permission === 'granted') {
                console.log("Permission accordée ! Récupération du token Firebase...");
                
                if (typeof firebase !== 'undefined' && firebase.messaging) {
                    const messaging = firebase.messaging();
                    
                    const registration = await navigator.serviceWorker.ready;
                    
                    const token = await messaging.getToken({
                        vapidKey: "BKDoENEF8vJFkl3IKXpU2cciCI_FWQCfrxtHhxKFP0VF0HggUtNOt08fRlqM0AWBrNZy9yzT25q5grY3YhVeydU",
                        serviceWorkerRegistration: registration
                    });
                    
                    if (token) {
                        console.log("Jeton d'appareil (Token FCM) récupéré avec succès :", token);
                        
                        const { error } = await SupabaseClient
                            .from('tokens_fcm')
                            .upsert([{ token: token }], { onConflict: 'token' });
                            
                        if (error) {
                            console.error("Erreur Supabase :", error);
                            alert("Erreur Supabase : " + error.message);
                        } else {
                            console.log("Token enregistré dans Supabase avec succès !");
                            localStorage.setItem('token_saved', 'true');
                            notifContainer.remove();
                            alert("Succès ! Le token est enregistré dans Supabase 📻");
                        }
                    } else {
                        alert("Avertissement : Aucun token FCM n'a été généré.");
                    }
                } else {
                    alert("Erreur : Firebase Messaging n'est pas disponible.");
                }
            } else {
                alert("⚠️ Notifications refusées par l'appareil.");
            }
        } catch (error) {
            console.error("Erreur critique :", error);
            alert("Erreur exacte : " + error.message);
        }
    });

    notifContainer.appendChild(notifBtn);
    liveBanner.parentNode.insertBefore(notifContainer, liveBanner);
}
document.addEventListener('DOMContentLoaded', () => {
    // Initialisation du bandeau, des raccourcis et du bouton de notifications
    updateLiveBanner();
    setInterval(updateLiveBanner, 1000);
    initKeyboardShortcuts();
    initPushNotifications();

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

    // Réglages
    const paramBtn = document.getElementById('param-btn');
    const modalTravaux = document.getElementById('modal-travaux');
    const modalMenuParam = document.getElementById('modal-menu-param');
    const selectPolice = document.getElementById('param-police');
    const selectLangue = document.getElementById('param-langue');
    const selectTheme = document.getElementById('param-media'); 
    const selectTaille = document.getElementById('param-taille-police');

    // Lecteur
    const mainAudioPlayer = document.getElementById('main-audio-player');
    const customPlayBtn = document.getElementById('custom-play-btn');
    const progressBarBg = document.getElementById('progress-bar-bg');
    const progressBarFill = document.getElementById('progress-bar-fill');
    const currentTimeDisplay = document.getElementById('current-time');
    const totalDurationDisplay = document.getElementById('total-duration');
    const currentTitle = document.getElementById('current-title');
    const playerStatus = document.getElementById('player-status');

    const categoriesList = ['loisir-sport', 'touristique', 'actualites-infos', 'en-classe', 'culture', 'portrait', 'autres'];

    // --- MENU BURGER MOBILE ---
    const burgerMenuBtn = document.getElementById('burger-menu-btn');
    const navLinksContainer = document.getElementById('nav-links');

    if (burgerMenuBtn && navLinksContainer) {
        burgerMenuBtn.addEventListener('click', () => {
            navLinksContainer.classList.toggle('open');
        });
    }
    
    window.addEventListener('click', (e) => {
        if (navLinksContainer && navLinksContainer.classList.contains('open')) {
            if (!navLinksContainer.contains(e.target) && !burgerMenuBtn.contains(e.target)) {
                navLinksContainer.classList.remove('open');
            }
        }
    });

    let currentLang = localStorage.getItem('siteLang') || 'fr';

    function getTranslation(lang) {
        const dict = window.translations || typeof translations !== 'undefined' ? translations : {};
        return dict[lang] || dict['fr'] || {};
    }

    // --- EFFETS ET ANIMATIONS DU MODE SAISON ---
    function applySeasonEffects() {
        let container = document.getElementById('season-effects');
        
        if (!document.body.classList.contains('season-mode')) {
            if (container) container.remove();
            return;
        }

        if (!container) {
            container = document.createElement('div');
            container.id = 'season-effects';
            document.body.appendChild(container);
        }
        container.innerHTML = '';

        const month = new Date().getMonth();
        let particles = ['✨', '⭐'];

        if (month >= 8 && month <= 10) {
            particles = ['🍂', '🍁', '🌾', '🎃'];
        } else if (month === 11 || month <= 1) {
            particles = ['❄️', '✨', '🌨️'];
        } else if (month >= 2 && month <= 4) {
            particles = ['🌸', '🍃', '🌱'];
        } else {
            particles = ['✨', '☀️', '⭐'];
        }

        for (let i = 0; i < 22; i++) {
            const p = document.createElement('span');
            p.className = 'season-particle';
            p.textContent = particles[Math.floor(Math.random() * particles.length)];
            p.style.left = Math.random() * 100 + 'vw';
            p.style.animationDuration = (Math.random() * 6 + 6) + 's';
            p.style.animationDelay = (Math.random() * 5) + 's';
            p.style.fontSize = (Math.random() * 0.7 + 0.8) + 'rem';
            container.appendChild(p);
        }
    }

    // --- APPLICATION ET GESTION DES THÈMES VISUELS ---
    const savedTheme = localStorage.getItem('siteTheme') || 'season';
    applyTheme(savedTheme);

    function applyTheme(theme) {
        document.body.classList.remove('light-mode', 'dark-mode', 'season-mode');
        
        const splashLogo = document.querySelector('.splash-logo');
        const headerLogo = document.querySelector('.header-logo');
        
        if (theme === 'light') {
            document.body.classList.add('light-mode');
            if (splashLogo) splashLogo.src = 'logo.png';
            if (headerLogo) headerLogo.src = 'logo.png';
        } else if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            if (splashLogo) splashLogo.src = 'logo.png';
            if (headerLogo) headerLogo.src = 'logo.png';
        } else {
            document.body.classList.add('season-mode');
            if (splashLogo) splashLogo.src = 'LogoArt6automne.png';
            if (headerLogo) headerLogo.src = 'LogoArt6automne.png';
        }

        applySeasonEffects();
    }

    const savedSize = localStorage.getItem('siteFontSize') || 'medium';
    document.body.classList.remove('font-small', 'font-medium', 'font-large');
    document.body.classList.add(`font-${savedSize}`);

    const savedFont = localStorage.getItem('siteFont') || 'normal';
    if (savedFont === 'dyslexic') document.body.classList.add('font-dyslexic');

    loadPodcastsFromSupabase();

    // --- ACCORDÉON DES DOSSIERS DE PODCASTS (CLIC SUR TOUTE LA ZONE) ---
    document.querySelectorAll('.folder-box').forEach(folderBox => {
        folderBox.addEventListener('click', (e) => {
            if (e.target.closest('.sort-select') || e.target.closest('.podcast-card')) {
                return;
            }
            const grid = folderBox.querySelector('.podcast-grid');
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
            applyTheme(selectedTheme);
        });
    }

    // --- TRADUCTIONS ---
    function applyTranslations(lang) {
        const t = getTranslation(lang);

        if (btnEnter) btnEnter.innerText = t.splashBtn || "Entrer";
        if (btnLoginOpen) btnLoginOpen.innerText = t.navLogin || "Connexion";
        
        if (mainNav) {
            const linkHome = mainNav.querySelector('a[href="index.html"]');
            if (linkHome) linkHome.innerText = t.navHome || "Accueil";
            
            const linkTeam = mainNav.querySelector('a[href="equipe.html"]');
            if (linkTeam) linkTeam.innerText = t.navTeam || "L'Équipe";

            const linkJoin = mainNav.querySelector('a[href="rejoindre.html"]');
            if (linkJoin) linkJoin.innerText = t.navJoin || "Rejoindre l'équipe";

            const linkHelp = mainNav.querySelector('a[href="aide.html"]');
            if (linkHelp) linkHelp.innerText = t.navHelp || "Aide";
        }

        if (mainAudioPlayer && currentTitle && playerStatus) {
            if (mainAudioPlayer.paused && mainAudioPlayer.currentTime === 0) {
                currentTitle.innerText = t.choosePodcast || "🎧 Choisissez une rediffusion ci-dessous";
                playerStatus.innerText = t.ready || "PRÊT À L'ÉCOUTE";
            } else if (mainAudioPlayer.paused) {
                playerStatus.innerText = t.pause || "PAUSE";
            } else {
                playerStatus.innerText = t.playing || "LECTURE EN COURS";
            }
        }

        const sectionTitle = document.querySelector('.podcast-section h2');
        if (sectionTitle) sectionTitle.innerText = t.sectionTitle || "Liste des Rediffusions";

        if (adminPanel) {
            const adminH3 = adminPanel.querySelector('h3');
            if (adminH3) adminH3.innerText = t.adminTitle || "🛠️ Panneau de Gestion";
            const adminP = adminPanel.querySelector('p');
            if (adminP) adminP.innerText = t.adminSubtitle || "";
            const labels = adminPanel.querySelectorAll('.form-group label');
            if (labels.length >= 3) {
                labels[0].innerText = t.lblTitle || "Titre de l'émission :";
                labels[1].innerText = t.lblInfo || "Date ou détails :";
                labels[2].innerText = t.lblFile || "Lien direct du MP3 :";
            }
        }
        
        if (btnSubmitPodcast && !editPodcastId) btnSubmitPodcast.innerText = t.btnSubmit || "Ajouter le podcast";
        if (uploadStatus) uploadStatus.innerText = t.uploadStatus || "Enregistrement en cours...";
        if (btnLogout) btnLogout.innerText = t.btnLogout || "Se déconnecter";

        if (modalMenuParam) {
            const settingsH3 = modalMenuParam.querySelector('h3');
            if (settingsH3) settingsH3.innerHTML = `<i class="fa-solid fa-sliders"></i> ${t.settingsTitle || "Réglages Généraux"}`;
            const settingsLabels = modalMenuParam.querySelectorAll('.param-row label');
            if (settingsLabels.length >= 3) {
                settingsLabels[0].innerHTML = `<i class="fa-solid fa-language"></i> ${t.settingsLang || "Langue :"}`;
                settingsLabels[1].innerHTML = `<i class="fa-solid fa-palette"></i> ${t.settingsMedia || "Thème Visuel :"}`;
                settingsLabels[2].innerHTML = `<i class="fa-solid fa-font"></i> ${t.settingsFont || "Taille de la police :"}`;
            }
            if (selectTheme && selectTheme.options.length >= 3) {
                selectTheme.options[0].text = t.settingsMediaSsn || "Mode Saison";
                selectTheme.options[1].text = t.settingsMediaDft || "Mode Sombre";
                selectTheme.options[2].text = t.settingsMediaEar || "Mode clair";
            }
            const saveBtn = modalMenuParam.querySelector('.btn-submit');
            if (saveBtn) saveBtn.innerText = t.settingsSave || "Enregistrer";
        }

        if (selectPolice && selectPolice.options.length >= 3) {
            selectPolice.options[0].text = t.settingsFontSm || "Petite";
            selectPolice.options[1].text = t.settingsFontMd || "Normale";
            selectPolice.options[2].text = t.settingsFontLg || "Grande";
        }
    }

    // --- BARRE AUDIO PERSONNALISÉE ---
    if (customPlayBtn && mainAudioPlayer) {
        customPlayBtn.addEventListener('click', () => {
            const t = getTranslation(currentLang);
            if (mainAudioPlayer.paused) {
                mainAudioPlayer.play().catch(err => console.log(err));
                customPlayBtn.innerText = "⏸";
                if (playerStatus) playerStatus.innerText = t.playing || "LECTURE EN COURS";
            } else {
                mainAudioPlayer.pause();
                customPlayBtn.innerText = "▶";
                if (playerStatus) playerStatus.innerText = t.pause || "PAUSE";
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
            const t = getTranslation(currentLang);
            customPlayBtn.innerText = "▶";
            if (playerStatus) playerStatus.innerText = t.ready || "PRÊT À L'ÉCOUTE";
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

    // --- ENREGISTRER OU MODIFIER UN PODCAST DANS SUPABASE ---
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

            const t = getTranslation(currentLang);

            if (editPodcastId) {
                const { error } = await SupabaseClient
                    .from('podcasts_ia')
                    .update({ title, info, category, url: audioUrl })
                    .eq('id', editPodcastId);

                if (error) {
                    console.error("Erreur lors de la modification :", error);
                    alert("Erreur lors de la modification du podcast.");
                } else {
                    editPodcastId = null;
                    addPodcastForm.reset();
                    if (btnSubmitPodcast) {
                        btnSubmitPodcast.innerText = t.btnSubmit || "Ajouter le podcast";
                        btnSubmitPodcast.style.backgroundColor = "";
                    }
                    loadPodcastsFromSupabase();
                }
            } else {
                const { error } = await SupabaseClient
                    .from('podcasts_ia')
                    .insert([{ title, info, category, url: audioUrl }]);

                if (error) {
                    console.error("Erreur lors de l'envoi :", error);
                    alert("Erreur lors de la sauvegarde du podcast.");
                } else {
                    addPodcastForm.reset();
                    loadPodcastsFromSupabase();
                }
            }

            if (btnSubmitPodcast) btnSubmitPodcast.disabled = false;
            if (uploadStatus) uploadStatus.classList.add('hidden');
        });
    }

    async function loadPodcastsFromSupabase() {
        const t = getTranslation(currentLang);

        categoriesList.forEach(cat => {
            const grid = document.getElementById(`grid-${cat}`);
            if (grid) grid.innerHTML = "";
        });

        const { data: podcasts, error } = await SupabaseClient
            .from('podcasts_ia')
            .select('*')
            .order('id', { ascending: false });

        if (error || !podcasts || podcasts.length === 0) {
            categoriesList.forEach(cat => {
                const grid = document.getElementById(`grid-${cat}`);
                if (grid) grid.innerHTML = `<p style='color: var(--text-muted); text-align:center; padding:10px;'>${t.noPodcast || "Aucun podcast dans ce dossier."}</p>`;
            });
            rafraichirCompteurs();
            return;
        }

        const isAdmin = sessionStorage.getItem('adminMode') === 'true';

        podcasts.forEach(pod => {
            const targetGrid = document.getElementById(`grid-${pod.category}`) || document.getElementById('grid-autres');

            if (targetGrid) {
                const card = document.createElement('div');
                card.className = 'podcast-card';

                const editBtnHtml = isAdmin 
                    ? `<button class="btn-edit" data-id="${pod.id}" style="background-color: #f59e0b; color: #ffffff; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; margin-right: 6px; font-weight: bold; font-size: 0.85rem; transition: transform 0.2s;">✏️ Modifier</button>` 
                    : '';

                card.innerHTML = `
                    <div class="podcast-info">
                        <h3>${pod.title}</h3>
                        <p>${pod.info}</p>
                    </div>
                    <div class="podcast-actions-wrapper" style="display: flex; align-items: center;">
                        ${editBtnHtml}
                        <button class="btn-play" data-url="${pod.url}" data-title="${pod.title}">${t.listenBtn || "Écouter la rediffusion"}</button>
                        ${isAdmin ? `<button class="btn-delete" data-id="${pod.id}">&times;</button>` : ''}
                    </div>
                `;
                targetGrid.appendChild(card);
            }
        });

        document.querySelectorAll('.btn-edit').forEach(btn => {
            btn.addEventListener('click', () => {
                const podId = btn.getAttribute('data-id');
                const pod = podcasts.find(p => p.id == podId);
                if (!pod) return;

                editPodcastId = pod.id;

                const titleInput = document.getElementById('pod-title');
                const infoInput = document.getElementById('pod-info');
                const urlInput = document.getElementById('pod-url');
                const categorySelect = document.getElementById('pod-category');

                if (titleInput) titleInput.value = pod.title || '';
                if (infoInput) infoInput.value = pod.info || '';
                if (urlInput) urlInput.value = pod.url || '';
                if (categorySelect) categorySelect.value = pod.category || 'autres';

                const btnSubmit = document.getElementById('btn-submit-podcast');
                if (btnSubmit) {
                    btnSubmit.innerText = "💾 Enregistrer les modifications";
                    btnSubmit.style.backgroundColor = "#f59e0b";
                }

                const adminCard = document.getElementById('admin-panel');
                if (adminCard) {
                    adminCard.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        document.querySelectorAll('.btn-play').forEach(btn => {
            btn.addEventListener('click', () => {
                const audioUrl = btn.getAttribute('data-url');
                const title = btn.getAttribute('data-title');
                if (mainAudioPlayer) {
                    mainAudioPlayer.src = audioUrl;
                    mainAudioPlayer.play().catch(err => console.log(err));
                    if (customPlayBtn) customPlayBtn.innerText = "⏸";
                    if (currentTitle) currentTitle.innerText = `▶ ${title}`;
                    if (playerStatus) playerStatus.innerText = t.playing || "LECTURE EN COURS";
                }
            });
        });

        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', async () => {
                if (confirm(t.confirmDelete || "Voulez-vous vraiment supprimer cette rediffusion ?")) {
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
        if (instaLink) instaLink.parentNode.insertBefore(iaLink, instaLink);
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
        document.getElementById('lien-cloche').classList.remove('hidden');
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
        const modalCal = document.getElementById('modal-calendrier');
        if (e.target === modalCal) modalCal.classList.add('hidden');
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
                document.getElementById('lien-cloche').classList.remove('hidden');
                injectIALink();
                loginForm.reset();
                applyTranslations(currentLang);
                loadPodcastsFromSupabase();
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
            document.getElementById('lien-cloche').classList.add('hidden');
            removeIALink();
            applyTranslations(currentLang);
            loadPodcastsFromSupabase();
        });
    }
});

window.closeParamModal = function(modalId) {
    const targetModal = document.getElementById(modalId);
    if (targetModal) {
        targetModal.classList.add('hidden');
    }
};

// --- VITESSE DU LECTEUR ---
document.querySelectorAll('.speed-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const speed = parseFloat(e.target.getAttribute('data-speed'));
        const mainAudio = document.querySelector('audio');
        if (mainAudio) {
            mainAudio.playbackRate = speed;
        }

        const container = e.target.closest('.speed-controls');
        container.querySelectorAll('.speed-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
    });
});
