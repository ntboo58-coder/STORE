
        // ─── IMGBB API KEY ──────────────────────────────────────────
        const IMGBB_API_KEY = "c42caf97b030034a22a6be143745e52e";

        // ─── CONFIG ────────────────────────────────────────────────
        const firebaseConfig = {
            apiKey: "AIzaSyDIx1m3XrhwBaJeX_8Yvo5a4lRXeqtjcq8",
            authDomain: "store-86763.firebaseapp.com",
            databaseURL: "https://store-86763-default-rtdb.firebaseio.com",
            projectId: "store-86763",
            storageBucket: "store-86763.firebasestorage.app",
            messagingSenderId: "70686893456",
            appId: "1:70686893456:android:a711a7e6e71a1357daff15"
        };

        // ─── FFNORMALGALAXY CONFIG (for Panel #15 key generation) ──
        const ffnormalgalaxyConfig = {
            apiKey: "AIzaSyDWW82lFNy7bw7-HO4EGE9S27UarOVh6Ao",
            databaseURL: "https://ffnormalgalaxy-default-rtdb.firebaseio.com",
            projectId: "ffnormalgalaxy",
            storageBucket: "ffnormalgalaxy.firebasestorage.app",
            appId: "1:477934181587:android:58c2a321928ca9b2244826"
        };

        // Offline-safe Firebase fallback: keeps the store UI usable from cached/local data
        // when Firebase SDK/network is unavailable. Online Firebase behaviour remains unchanged.
        if (typeof firebase === 'undefined') {
            (function(){
                const apps = {};
                const noopRef = () => ({
                    on: function(){ return this; }, once: function(){ return Promise.reject(new Error('offline')); },
                    off: function(){ return this; }, set: function(){ return Promise.reject(new Error('offline')); },
                    update: function(){ return Promise.reject(new Error('offline')); },
                    remove: function(){ return Promise.reject(new Error('offline')); },
                    push: function(){ return { key: 'offline', set: function(){ return Promise.reject(new Error('offline')); } }; }
                });
                const noopDB = () => ({ ref: noopRef });
                const noopAuth = () => ({
                    currentUser: null,
                    onAuthStateChanged: function(){ return function(){}; },
                    setPersistence: function(){ return Promise.resolve(); },
                    signInWithEmailAndPassword: function(){ return Promise.reject(new Error('offline')); },
                    signInAnonymously: function(){ return Promise.reject(new Error('offline')); },
                    signOut: function(){ return Promise.resolve(); },
                    signInWithPopup: function(){ return Promise.reject(new Error('offline')); },
                    createUserWithEmailAndPassword: function(){ return Promise.reject(new Error('offline')); },
                    sendPasswordResetEmail: function(){ return Promise.reject(new Error('offline')); },
                    updateProfile: function(){ return Promise.resolve(); }
                });
                const makeApp = () => ({ database: noopDB, auth: noopAuth, storage: () => ({ ref: noopRef }) });
                window.firebase = {
                    initializeApp: function(config, name){ const a=makeApp(); apps[name||'[DEFAULT]']=a; return a; },
                    app: function(name){ return apps[name||'[DEFAULT]'] || makeApp(); },
                    database: Object.assign(noopDB, { ServerValue: { TIMESTAMP: null } }),
                    auth: Object.assign(noopAuth, { Auth: { Persistence: { LOCAL: 'LOCAL' } }, GoogleAuthProvider: function(){} }),
                    storage: function(){ return { ref: noopRef }; }
                };
            })();
        }
        firebase.initializeApp(firebaseConfig);
        const database = firebase.database();
        const auth = firebase.auth();

        // Initialize ffnormalgalaxy app for Panel #15 key generation
        let ffnormalgalaxyApp;
        let ffnormalgalaxyDB;
        let ffnormalgalaxyAuth;

        try {
            ffnormalgalaxyApp = firebase.app('ffnormalgalaxy');
        } catch (e) {
            ffnormalgalaxyApp = firebase.initializeApp(ffnormalgalaxyConfig, 'ffnormalgalaxy');
        }
        ffnormalgalaxyDB = ffnormalgalaxyApp.database();
        ffnormalgalaxyAuth = ffnormalgalaxyApp.auth();

        // Admin credentials for ffnormalgalaxy
        const FF_ADMIN_EMAIL = "msidratul408@gmail.com";
        const FF_ADMIN_PASSWORD = "ffgalaxy";

        // Sign in to ffnormalgalaxy once (needed for key writes)
        let ffnormalgalaxySignedIn = false;
        ffnormalgalaxyAuth.signInWithEmailAndPassword(FF_ADMIN_EMAIL, FF_ADMIN_PASSWORD)
            .then(() => {
                ffnormalgalaxySignedIn = true;
                console.log('✅ ffnormalgalaxy admin signed in successfully.');
            })
            .catch(err => {
                console.warn('⚠️ ffnormalgalaxy sign-in failed:', err.message);
                // Attempt anonymous fallback
                ffnormalgalaxyAuth.signInAnonymously()
                    .then(() => {
                        ffnormalgalaxySignedIn = true;
                        console.log('✅ ffnormalgalaxy anonymous auth succeeded (fallback).');
                    })
                    .catch(() => {
                        ffnormalgalaxySignedIn = false;
                        console.warn('⚠️ ffnormalgalaxy auth failed. Key generation will fail.');
                    });
            });

        // ─── PROGALAXY CONFIG (for Panel #31 Username+Password generation) ──
        const progalaxyConfig = {
            apiKey: "AIzaSyB-SITPTsDuKujjZTe_9U0ly0-2kWmchyo",
            databaseURL: "https://progalaxy-e8cac-default-rtdb.firebaseio.com",
            projectId: "progalaxy-e8cac",
            storageBucket: "progalaxy-e8cac.firebasestorage.app",
            appId: "1:876291501692:android:57f3b2d87983cd23b423f9"
        };

        let progalaxyApp;
        let progalaxyDB;
        let progalaxyAuth;
        try {
            progalaxyApp = firebase.app('progalaxy');
        } catch (e) {
            progalaxyApp = firebase.initializeApp(progalaxyConfig, 'progalaxy');
        }
        progalaxyDB = progalaxyApp.database();
        progalaxyAuth = progalaxyApp.auth();

        const PROGALAXY_ADMIN_EMAIL = "sylhetifoga531@gmail.com";
        const PROGALAXY_ADMIN_PASSWORD = "Progalaxy21";

        // ─── PURPLE-ALL CONFIG (Panel #12 Username/Password) ──
        const purpleAllConfig = {
            apiKey: "AIzaSyDeMGBMbNobqZuHiA3UUOQ5YtLnxCa-Bm8",
            databaseURL: "https://purple-all-default-rtdb.firebaseio.com",
            projectId: "purple-all",
            storageBucket: "purple-all.firebasestorage.app",
            appId: "1:879435499970:android:5925517a2777bc3fde2e5b"
        };
        let purpleAllApp, purpleAllDB, purpleAllAuth;
        let purpleAllSignedIn = false;
        const PURPLE_ADMIN_EMAIL = "sylhetifoga531@gmail.com";
        const PURPLE_ADMIN_PASSWORD = "Allxcvip";
        try {
            purpleAllApp = firebase.app('purple-all');
        } catch (e) {
            purpleAllApp = firebase.initializeApp(purpleAllConfig, 'purple-all');
        }
        purpleAllDB = purpleAllApp.database();
        purpleAllAuth = purpleAllApp.auth();
        purpleAllAuth.signInWithEmailAndPassword(PURPLE_ADMIN_EMAIL, PURPLE_ADMIN_PASSWORD)
            .then(() => { purpleAllSignedIn = true; console.log('✅ purple-all admin signed in'); })
            .catch(err => {
                console.warn('⚠️ purple-all sign-in failed:', err.message);
                purpleAllAuth.signInAnonymously().then(() => { purpleAllSignedIn = true; }).catch(() => {});
            });

        function panel12RandomStr(len, chars) {
            let s = '';
            for (let i = 0; i < len; i++) s += chars.charAt(Math.floor(Math.random() * chars.length));
            return s;
        }
        function normalizePanel12Duration(plan) {
            const p = String(plan || '').trim().toUpperCase().replace(/\s+/g, ' ');
            if (/LIFE|UNLIMITED|∞/.test(p)) return 'lifetime';
            if (/1\s*MIN/.test(p)) return '1min';
            const m = p.match(/(\d+)/);
            if (m) {
                const d = parseInt(m[1], 10);
                if ([1,3,7,15,30,45,60,90,120,150,180].includes(d)) return String(d);
                if (d > 0) return String(Math.min(d, 180));
            }
            return '7';
        }
        
        
        // ═══════════════════════════════════════════════════════════
        //  PANEL API SYSTEM (Online — Admin can change via Admin Panel)
        //  Reads storeData/panelApis/{panelId} live from Firebase.
        //  Fallback defaults for 12 / 13 / 15 / 16 / 26 / 31 if not set.
        // ═══════════════════════════════════════════════════════════
        let panelApiCache = {};
        const PANEL_API_DEFAULTS = {
            '12': { type: 'userpass', baseUrl: 'https://purple-all-default-rtdb.firebaseio.com', path: 'users', prefix: 'XC_', mode: '1device', owner: 'STORE', enabled: true },
            '13': { type: 'key', baseUrl: 'https://greengalacy-default-rtdb.firebaseio.com', path: 'keys', prefix: 'GHOST XGalaxy_', mode: '1device', owner: 'STORE', enabled: true },
            '15': { type: 'key', baseUrl: 'https://ffnormalgalaxy-default-rtdb.firebaseio.com', path: 'keys', prefix: 'GHOST X-', mode: '1device', owner: 'STORE', enabled: true },
            '16': { type: 'key', baseUrl: 'https://greengalacy-default-rtdb.firebaseio.com', path: 'keys', prefix: 'GHOST XGalaxy_', mode: '1device', owner: 'STORE', enabled: true },
            '26': { type: 'key', baseUrl: 'https://dGHOST Xdad-default-rtdb.firebaseio.com', path: 'keys', prefix: 'GHOST X3D_', mode: '1device', owner: 'STORE', enabled: true },
            '31': { type: 'userpass', baseUrl: 'https://progalaxy-e8cac-default-rtdb.firebaseio.com', path: 'users', prefix: 'XC_', mode: '1device', owner: 'STORE', enabled: true }
        };

        function rand(len, charset) {
            let chars = '';
            if (charset === 'A-Z') chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            else if (charset === '0-9') chars = '0123456789';
            else if (charset === '2-9') chars = '23456789';
            else chars = charset || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let s = '';
            for (let i = 0; i < len; i++) s += chars.charAt(Math.floor(Math.random() * chars.length));
            return s;
        }

        function normalizeDaysForApi(plan) {
            // backward-compatible: returns duration string for API body
            const p = parsePlanDuration(plan);
            return p.durationStr;
        }

        function parsePlanDuration(plan) {
            // Supports: "1 HOUR", "1 HOURS", "2H", "30 DAY", "7 DAYS", "1 MINUTE", "LIFE TIME"
            const raw = String(plan || '').trim().toUpperCase().replace(/\s+/g, ' ');
            if (!raw) return { unit: 'day', value: 7, durationStr: '7 Days', durationDb: '7', expiryMs: 7 * 86400000 };
            if (raw.includes('LIFE')) {
                return { unit: 'lifetime', value: 0, durationStr: 'Lifetime', durationDb: 'lifetime', expiryMs: 4102444800000 - Date.now() };
            }
            const numM = raw.match(/(\d+(?:\.\d+)?)/);
            const n = numM ? parseFloat(numM[1]) : 7;

            // Minutes first (before hours, since "1 Minute" has no hour)
            if (/\bMIN(UTE)?S?\b/.test(raw)) {
                const mins = Math.max(1, Math.round(n));
                return {
                    unit: 'minute',
                    value: mins,
                    durationStr: mins + ' Minute' + (mins > 1 ? 's' : ''),
                    durationDb: mins + ' Minute' + (mins > 1 ? 's' : ''),
                    expiryMs: mins * 60000
                };
            }
            // Hours
            if (/\bHOURS?\b|\bHRS?\b/.test(raw) || /\d\s*H\b/.test(raw) || /HOUR/.test(raw)) {
                const hours = Math.max(1, Math.round(n));
                return {
                    unit: 'hour',
                    value: hours,
                    durationStr: hours + ' Hour' + (hours > 1 ? 's' : ''),
                    durationDb: hours + ' Hour' + (hours > 1 ? 's' : ''),
                    expiryMs: hours * 3600000
                };
            }
            // Days (default)
            const days = Math.max(1, Math.round(n));
            return {
                unit: 'day',
                value: days,
                durationStr: days + ' Days',
                durationDb: String(days),
                expiryMs: days * 86400000
            };
        }

        function getPanelApiConfig(panelId) {
            const id = String(panelId || '');
            const live = panelApiCache[id];
            if (live && live.enabled !== false && live.baseUrl) return live;
            // also try numeric/string key variants
            const live2 = panelApiCache[String(Number(id))] || panelApiCache[id.replace(/^0+/, '')];
            if (live2 && live2.enabled !== false && live2.baseUrl) return live2;
            return PANEL_API_DEFAULTS[id] || PANEL_API_DEFAULTS[String(Number(id))] || null;
        }

        function cleanApiPrefix(prefix) {
            let p = String(prefix || '').trim();
            // Admin often types Dripmodz_xxxx — strip placeholder x's
            p = p.replace(/x+$/i, '').replace(/_+$/, '_');
            if (p && !/[_-]$/.test(p) && /[A-Za-z0-9]$/.test(p)) {
                // keep as-is if no trailing separator needed
            }
            return p || 'KEY_';
        }

        function listenPanelApis() {
            try {
                if (window._panelApiListening) return;
                window._panelApiListening = true;
                database.ref('storeData/panelApis').on('value', (snap) => {
                    panelApiCache = snap.val() || {};
                    console.log('[PanelAPI] online config updated', Object.keys(panelApiCache));
                });
            } catch (e) {
                console.warn('[PanelAPI] listen failed', e);
            }
        }

        async function ensurePanelApisLoaded() {
            try {
                listenPanelApis();
                if (panelApiCache && Object.keys(panelApiCache).length) return panelApiCache;
                const snap = await database.ref('storeData/panelApis').once('value');
                panelApiCache = snap.val() || {};
                return panelApiCache;
            } catch (e) {
                console.warn('[PanelAPI] ensure load failed', e);
                return panelApiCache || {};
            }
        }

        async function generateFromPanelApi(panelId, days) {
            const cfg = getPanelApiConfig(panelId);
            if (!cfg) throw new Error('No API config for Panel #' + panelId);
            if (cfg.enabled === false) throw new Error('Panel #' + panelId + ' API is disabled in Admin');
            const planInfo = parsePlanDuration(days);
            const now = Date.now();
            // durationDb = same style Admin App uses: "1 Hours", "7", "1 Minute"
            // expiryTimestamp always set for hour/minute so validity is correct even if
            // panel only understands integer days in duration field.
            const durationForDb = planInfo.durationDb;
            let expiryTs;
            if (planInfo.unit === 'lifetime') {
                expiryTs = 4102444800000;
            } else if (planInfo.unit === 'hour' || planInfo.unit === 'minute') {
                // Start validity from purchase time (Admin App direction)
                expiryTs = now + planInfo.expiryMs;
            } else {
                // Days: 0 = set on first device activation (full N days from first use)
                expiryTs = 0;
            }
            const d = durationForDb;
            const expiry = planInfo.unit === 'lifetime' ? 4102444800000 : now + planInfo.expiryMs;
            const baseUrl = String(cfg.baseUrl || '').replace(/\/$/, '');
            const path = String(cfg.path || (cfg.type === 'userpass' ? 'users' : 'keys')).replace(/^\/|\/$/g, '');
            const prefix = cleanApiPrefix(cfg.prefix || (cfg.type === 'userpass' ? 'XC_' : 'KEY_'));
            const mode = cfg.mode || '1device';
            const owner = cfg.owner || 'STORE';

            if (cfg.type === 'userpass') {
                const username = prefix + rand(4, 'A-Z') + rand(3, '0-9');
                const password = rand(3, 'A-Z') + rand(4, '2-9') + '!';
                const url = baseUrl + '/' + path + '/' + encodeURIComponent(username) + '.json';
                const body = {
                    password: password,
                    duration: String(d),
                    durationLabel: planInfo.durationStr,
                    durationUnit: planInfo.unit,
                    mode: mode,
                    status: 'active',
                    usedDeviceId: '',
                    createdAt: now,
                    activatedAt: now,
                    expiryTimestamp: expiry, // userpass: always set real expiry
                    lastLogin: 0,
                    lastDeviceName: '',
                    resetCount: 0,
                    owner: owner
                };
                const res = await fetch(url, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
                if (!res.ok) throw new Error('Panel #' + panelId + ' API HTTP ' + res.status);
                await res.json().catch(() => ({}));
                return { type: 'userpass', username, password, duration: planInfo.durationStr, expiry };
            }

            const key = prefix + rand(4, 'A-Z') + rand(4, '0-9');
            const url = baseUrl + '/' + path + '/' + encodeURIComponent(key) + '.json';
            const body = {
                duration: String(d),
                durationLabel: planInfo.durationStr,
                durationUnit: planInfo.unit,
                mode: mode,
                status: 'active',
                isUsed: false,
                expiryTimestamp: expiryTs,
                // Hour/Minute plans: lock expiry from purchase (Admin App style)
                activatedAt: (planInfo.unit === 'hour' || planInfo.unit === 'minute') ? now : 0,
                usedByDevice: '',
                usedDeviceId: '',
                createdAt: now,
                owner: owner
            };
            const res = await fetch(url, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
            if (!res.ok) throw new Error('Panel #' + panelId + ' API HTTP ' + res.status);
            await res.json().catch(() => ({}));
            return { type: 'key', key, duration: d };
        }

        // Legacy-compatible helpers used by confirmWalletOrder
        function generateAllMod(days) { return generateFromPanelApi('12', days).then(r => ({ username: r.username, password: r.password, duration: r.duration, expiry: r.expiry })); }
        function generateProGalaxy(days) { return generateFromPanelApi('31', days).then(r => ({ username: r.username, password: r.password, duration: r.duration, expiry: r.expiry })); }
        function generateFFMax(days) { return generateFromPanelApi('13', days).then(r => ({ key: r.key, duration: r.duration })); }
        function generateFFNormal(days) { return generateFromPanelApi('15', days).then(r => ({ key: r.key, duration: r.duration })); }
        function generateHologram(days) { return generateFromPanelApi('26', days).then(r => ({ key: r.key, duration: r.duration })); }

        async function generatePanel12Credentials(plan) {
            const result = await generateFromPanelApi('12', plan);
            return { username: result.username, password: result.password, duration: result.duration, expiryTimestamp: result.expiry, plan: plan };
        }
        async function generatePanel31Credentials(plan, mode, panelId) {
            const pid = String(panelId || '31');
            const result = await generateFromPanelApi(pid, plan);
            return { username: result.username, password: result.password, duration: result.duration, expiryTimestamp: result.expiry, plan: plan, mode: mode || '1device', panelId: pid };
        }
        function generatePanel13Key(duration, mode) {
            return generateFromPanelApi('13', duration).then(r => r.key);
        }
        function generatePanel15Key(duration, mode) {
            return generateFromPanelApi('15', duration).then(r => r.key);
        }
        function generatePanel26Key(duration, mode) {
            return generateFromPanelApi('26', duration).then(r => r.key);
        }




        

        let progalaxySignedIn = false;
        progalaxyAuth.signInWithEmailAndPassword(PROGALAXY_ADMIN_EMAIL, PROGALAXY_ADMIN_PASSWORD)
            .then(() => {
                progalaxySignedIn = true;
                console.log('✅ progalaxy (Panel #31) admin signed in successfully.');
            })
            .catch(err => {
                console.warn('⚠️ progalaxy sign-in failed:', err.message);
                progalaxyAuth.signInAnonymously()
                    .then(() => {
                        progalaxySignedIn = true;
                        console.log('✅ progalaxy anonymous auth succeeded (fallback).');
                    })
                    .catch(() => {
                        progalaxySignedIn = false;
                        console.warn('⚠️ progalaxy auth failed. Panel #31 user generation will fail.');
                    });
            });

        // Keep the authenticated session after refresh/browser reopen.
        auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).catch((error) => {
            console.warn('Firebase auth persistence setup failed:', error);
        });

        let panelDatabase = {};
        let bkashNumber = "01612360109";
        let nagadNumber = "01610308897";
        let rocketNumber = "01610308897";
        let binanceId = ""; // Set only from the Admin Panel store configuration; never show a hardcoded fallback.
        let telegramLink = "https://t.me/NEAMOTsupport2";
        let paidGroupLink = "https://t.me/+EaGokmJcRQM5N2M1";
        let selectedId = null;
        let selectedPlanGlobal = null;
        let selectedMethod = "bkash";
        let selectedQuantity = 1;
        let activeListeners = {};
        let authMode = "login";
        document.addEventListener('DOMContentLoaded', () => {
            // Standalone Sign Up is opened only when the user taps Sign Up.
        });
        let currentTab = "home";
        let pageHistory = ["home"];
        let totalSpentAmount = 0;
        let panelOpenedFromHash = false;
        let isPanelOpen = false;
        let firebaseDataLoaded = false;
        let pendingHashId = null;
        let currentOrderKey = null;
        let sliderTimer = null;
        let currentSlide = 0;
        let selectedPhotoFile = null;
        let usedTransactionIds = new Set();
        let walletOrderPending = false;
        let walletOrderCompleted = false;
        let walletOrderInFlightId = null;
        let currentLanguage = 'en';
        const imgLink = "https://i.ibb.co.com/wNfyVJ6H/IMG-20250625-WA0001.jpg";
        const DEFAULT_PROFILE_LOGO = "https://i.ibb.co.com/rGrZW1b1/file-00000000507c82119d7dc3aed57307fa.png";
        const logoImg = "https://i.ibb.co.com/7X4X8vP/logo.png";

        const ADMIN_EMAILS = ['admin@GHOST X.com', 'your-email@example.com'];

        const translations = {
            en: {
                home: "Home",
                myKeys: "My Keys",
                myOrders: "My Orders",
                account: "Account",
                addFunds: "Add Funds",
                txnHistory: "Transaction ID History",
                keyResetZone: "Key Reset Zone",
                login: "Login",
                register: "Register",
                logout: "Logout",
                balance: "Balance",
                totalSpent: "Total Spent",
                premiumPanels: "PREMIUM PANELS",
                latestOrders: "Latest Orders",
                buyNow: "BUY NOW",
                stockOut: "STOCK OUT",
                selectPlan: "Select Plan Validity",
                quantity: "Quantity",
                totalAmount: "Total Amount",
                paymentMethod: "Payment Method",
                instantPay: "ACCOUNTS PAY",
                confirmOrder: "Confirm Order",
                cancel: "Cancel",
                availableBalance: "Available Balance",
                total: "Total",
                orderPlaced: "Order Placed",
                success: "Success",
                error: "Error",
                loading: "Loading...",
                noOrders: "No orders found.",
                noKeys: "No keys found. Please purchase a panel first.",
                insufficientBalance: "Insufficient balance! Please add funds.",
                pleaseLogin: "Please login first!",
                selectPlanFirst: "Please select a plan first!",
                transactionId: "Transaction ID",
                verify: "VERIFY",
                back: "Back",
                support: "Support",
                addFundsTitle: "Add Funds",
                customAmount: "Custom Amount",
                proceedPayment: "Proceed to Payment",
                fundHistory: "Fund History",
                noFundHistory: "No fund history yet.",
                privacy: "Privacy Policy",
                about: "About Us",
                official: "Official Details",
                profile: "Profile",
                editProfile: "Edit Profile",
                username: "Username",
                email: "Email",
                phone: "Phone",
                totalOrders: "Total Orders",
                wallet: "Wallet",
                password: "Password",
                confirmPassword: "Confirm Password",
                forgotPassword: "Forgot Password?",
                resetPassword: "Reset Password",
                sendResetLink: "Send Reset Link",
                loginNow: "Login Now",
                registerNow: "Register Now",
                or: "OR",
                loginWithGoogle: "Login with Google",
                welcomeBack: "Welcome back to NEAMOT 2.0",
                createAccount: "Create your account",
                enterCredentials: "Enter your credentials to access your account",
                fullName: "Full Name",
                alreadyMember: "Already a member?",
                dontHaveAccount: "Don't have an account?",
                panelRules: "PANEL RULES & CONDITION",
                stockOutMsg: "This plan is STOCK OUT!",
                txnAlreadyUsed: "This transaction ID has already been used!",
                verifyTransaction: "Please enter your Transaction ID!",
                insufficientBalanceMsg: "Insufficient balance! Please add funds.",
                orderSuccess: "Your order has been placed successfully.",
                fundRequestSubmitted: "Your fund request has been submitted. Wait for admin approval.",
                myKeysTitle: "My Keys",
                myOrdersTitle: "My Orders",
                approved: "Approved",
                pending: "Pending",
                rejected: "Rejected",
                messageFromAdmin: "NEAMOT PANEL STORE",
                copy: "Copy",
                joinGroup: "Join Paid User Group",
                clickToJoin: "Click to join the paid user group for support & updates",
                orderDate: "Order Date",
                plan: "Plan",
                price: "Price",
                qty: "Qty",
                payment: "Payment",
                txnId: "Txn ID",
                all: "All",
                nonRoot: "Non-Root",
                root: "Root",
                ios: "iOS",
                pc: "PC",
                welcome: "Welcome to NEAMOT 2.0",
                getBestPanels: "Get the best gaming panels for IOS & PC & ANDROID ROOT & NON-ROOT & MAIN ID LOCATION",
                safeTrusted: "100% Safe & Trusted",
                verified: "Verified",
                verifiedBadge: "Verified",
            },
            bn: {
                home: "হোম",
                myKeys: "মাই কীস",
                myOrders: "মাই অর্ডার",
                account: "অ্যাকাউন্ট",
                addFunds: "ফান্ড যোগ করুন",
                txnHistory: "ট্রানজেকশন আইডি হিস্টোরি",
                keyResetZone: "Key Reset Zone",
                login: "লগইন",
                register: "রেজিস্টার",
                logout: "লগআউট",
                balance: "ব্যালেন্স",
                totalSpent: "মোট খরচ",
                premiumPanels: "প্রিমিয়াম প্যানেল",
                latestOrders: "সর্বশেষ অর্ডার",
                buyNow: "এখনই কিনুন",
                stockOut: "স্টক আউট",
                selectPlan: "প্ল্যান সিলেক্ট করুন",
                quantity: "পরিমাণ",
                totalAmount: "মোট টাকা",
                paymentMethod: "পেমেন্ট পদ্ধতি",
                instantPay: "ACCOUNTS PAY",
                confirmOrder: "অর্ডার কনফর্ম",
                cancel: "বাতিল",
                availableBalance: "উপলব্ধ ব্যালেন্স",
                total: "মোট",
                orderPlaced: "অর্ডার সম্পন্ন",
                success: "সফল",
                error: "ত্রুটি",
                loading: "লোড হচ্ছে...",
                noOrders: "কোনো অর্ডার পাওয়া যায়নি।",
                noKeys: "কোনো কীস পাওয়া যায়নি। প্রথমে একটি প্যানেল কিনুন।",
                insufficientBalance: "ব্যালেন্স পর্যাপ্ত নয়! অনুগ্রহ করে ফান্ড যোগ করুন।",
                pleaseLogin: "অনুগ্রহ করে প্রথমে লগইন করুন!",
                selectPlanFirst: "অনুগ্রহ করে একটি প্ল্যান সিলেক্ট করুন!",
                transactionId: "ট্রানজেকশন আইডি",
                verify: "ভেরিফাই",
                back: "পেছনে",
                support: "সাপোর্ট",
                addFundsTitle: "ফান্ড যোগ করুন",
                customAmount: "কাস্টম পরিমাণ",
                proceedPayment: "পেমেন্টে যান",
                fundHistory: "ফান্ড হিস্ট্রি",
                noFundHistory: "কোনো ফান্ড হিস্ট্রি নেই।",
                privacy: "গোপনীয়তা নীতি",
                about: "আমাদের সম্পর্কে",
                official: "অফিসিয়াল তথ্য",
                profile: "প্রোফাইল",
                editProfile: "প্রোফাইল সম্পাদনা",
                username: "ইউজারনেম",
                email: "ইমেইল",
                phone: "ফোন",
                totalOrders: "মোট অর্ডার",
                wallet: "ওয়ালেট",
                password: "পাসওয়ার্ড",
                confirmPassword: "পাসওয়ার্ড নিশ্চিত করুন",
                forgotPassword: "পাসওয়ার্ড ভুলে গেছেন?",
                resetPassword: "পাসওয়ার্ড রিসেট",
                sendResetLink: "রিসেট লিংক পাঠান",
                loginNow: "এখনই লগইন করুন",
                registerNow: "এখনই রেজিস্টার করুন",
                or: "অথবা",
                loginWithGoogle: "গুগল দিয়ে লগইন",
                welcomeBack: "NEAMOT 2.0 এ আপনাকে স্বাগতম",
                createAccount: "আপনার অ্যাকাউন্ট তৈরি করুন",
                enterCredentials: "আপনার অ্যাকাউন্ট অ্যাক্সেস করতে আপনার ক্রেডেনশিয়াল লিখুন",
                fullName: "পুরো নাম",
                alreadyMember: "ইতিমধ্যে সদস্য?",
                dontHaveAccount: "অ্যাকাউন্ট নেই?",
                panelRules: "প্যানেল নিয়ম ও শর্ত",
                stockOutMsg: "এই প্ল্যানটি স্টক আউট!",
                txnAlreadyUsed: "এই ট্রানজেকশন আইডি ইতিমধ্যে ব্যবহার করা হয়েছে!",
                verifyTransaction: "অনুগ্রহ করে আপনার Enter Transaction ID!",
                insufficientBalanceMsg: "ব্যালেন্স পর্যাপ্ত নয়! অনুগ্রহ করে ফান্ড যোগ করুন।",
                orderSuccess: "আপনার অর্ডার সফলভাবে সম্পন্ন হয়েছে।",
                fundRequestSubmitted: "আপনার ফান্ড রিকোয়েস্ট জমা দেওয়া হয়েছে। অ্যাডমিন অনুমোদনের জন্য অপেক্ষা করুন।",
                myKeysTitle: "মাই কীস",
                myOrdersTitle: "মাই অর্ডার",
                approved: "অনুমোদিত",
                pending: "বিচারাধীন",
                rejected: "প্রত্যাখ্যাত",
                messageFromAdmin: "NEAMOT PANEL STORE",
                copy: "কপি",
                joinGroup: "পেইড ইউজার গ্রুপে যোগ দিন",
                clickToJoin: "সাপোর্ট ও আপডেটের জন্য পেইড ইউজার গ্রুপে যোগ দিন",
                orderDate: "অর্ডারের তারিখ",
                plan: "প্ল্যান",
                price: "দাম",
                quantity: "পরিমাণ",
                payment: "পেমেন্ট",
                txnId: "ট্রানজেকশন আইডি",
                all: "সব",
                nonRoot: "নন-রুট",
                root: "রুট",
                ios: "আইওএস",
                pc: "পিসি",
                welcome: "NEAMOT 2.0 এ স্বাগতম",
                getBestPanels: "IOS, PC, ANDROID ROOT, NON-ROOT ও MAIN ID LOCATION এর জন্য সেরা গেমিং প্যানেল পান",
                safeTrusted: "১০০% নিরাপদ ও বিশ্বস্ত",
                verified: "ভেরিফাইড",
                verifiedBadge: "ভেরিফাইড",
            },
            hi: {
                home: "होम",
                myKeys: "माई कीज़",
                myOrders: "माई ऑर्डर",
                account: "अकाउंट",
                addFunds: "फंड जोड़ें",
                login: "लॉगिन",
                register: "रजिस्टर",
                logout: "लॉगआउट",
                balance: "बैलेंस",
                totalSpent: "कुल खर्च",
                premiumPanels: "प्रीमियम पैनल",
                latestOrders: "नवीनतम ऑर्डर",
                buyNow: "अभी खरीदें",
                stockOut: "स्टॉक आउट",
                selectPlan: "प्लान चुनें",
                quantity: "मात्रा",
                totalAmount: "कुल राशि",
                paymentMethod: "भुगतान विधि",
                instantPay: "ACCOUNTS PAY",
                confirmOrder: "ऑर्डर कन्फर्म",
                cancel: "रद्द करें",
                availableBalance: "उपलब्ध बैलेंस",
                total: "कुल",
                orderPlaced: "ऑर्डर पूरा",
                success: "सफल",
                error: "त्रुटि",
                loading: "लोड हो रहा है...",
                noOrders: "कोई ऑर्डर नहीं मिला।",
                noKeys: "कोई की नहीं मिली। कृपया पहले एक पैनल खरीदें।",
                insufficientBalance: "बैलेंस अपर्याप्त! कृपया फंड जोड़ें।",
                pleaseLogin: "कृपया पहले लॉगिन करें!",
                selectPlanFirst: "कृपया पहले एक प्लान चुनें!",
                transactionId: "ट्रांजेक्शन आईडी",
                verify: "वेरिफाई",
                back: "पीछे",
                support: "सपोर्ट",
                addFundsTitle: "फंड जोड़ें",
                customAmount: "कस्टम राशि",
                proceedPayment: "भुगतान के लिए आगे बढ़ें",
                fundHistory: "फंड इतिहास",
                noFundHistory: "कोई फंड इतिहास नहीं।",
                privacy: "गोपनीयता नीति",
                about: "हमारे बारे में",
                official: "आधिकारिक विवरण",
                profile: "प्रोफाइल",
                editProfile: "प्रोफाइल संपादित करें",
                username: "यूजरनेम",
                email: "ईमेल",
                phone: "फोन",
                totalOrders: "कुल ऑर्डर",
                wallet: "वॉलेट",
                password: "पासवर्ड",
                confirmPassword: "पासवर्ड पुष्टि करें",
                forgotPassword: "पासवर्ड भूल गए?",
                resetPassword: "पासवर्ड रीसेट",
                sendResetLink: "रीसेट लिंक भेजें",
                loginNow: "अभी लॉगिन करें",
                registerNow: "अभी रजिस्टर करें",
                or: "या",
                loginWithGoogle: "गूगल से लॉगिन करें",
                welcomeBack: "NEAMOT 2.0 में आपका स्वागत है",
                createAccount: "अपना अकाउंट बनाएं",
                enterCredentials: "अपने अकाउंट तक पहुंचने के लिए अपने क्रेडेंशियल दर्ज करें",
                fullName: "पूरा नाम",
                alreadyMember: "पहले से सदस्य हैं?",
                dontHaveAccount: "अकाउंट नहीं है?",
                panelRules: "पैनल नियम और शर्तें",
                stockOutMsg: "यह प्लान स्टॉक आउट है!",
                txnAlreadyUsed: "यह ट्रांजेक्शन आईडी पहले ही उपयोग की जा चुकी है!",
                verifyTransaction: "कृपया अपना ट्रांजेक्शन आईडी दर्ज करें!",
                insufficientBalanceMsg: "बैलेंस अपर्याप्त! कृपया फंड जोड़ें।",
                orderSuccess: "आपका ऑर्डर सफलतापूर्वक पूरा हो गया है।",
                fundRequestSubmitted: "आपका फंड अनुरोध सबमिट कर दिया गया है। प्रशासक की स्वीकृति की प्रतीक्षा करें।",
                myKeysTitle: "माई कीज़",
                myOrdersTitle: "माई ऑर्डर",
                approved: "स्वीकृत",
                pending: "लंबित",
                rejected: "अस्वीकृत",
                messageFromAdmin: "NEAMOT PANEL STORE",
                copy: "कॉपी",
                joinGroup: "पेड यूजर ग्रुप में शामिल हों",
                clickToJoin: "सहायता और अपडेट के लिए पेड यूजर ग्रुप में शामिल हों",
                orderDate: "ऑर्डर की तारीख",
                plan: "प्लान",
                price: "कीमत",
                quantity: "मात्रा",
                payment: "भुगतान",
                txnId: "ट्रांजेक्शन आईडी",
                all: "सभी",
                nonRoot: "नॉन-रूट",
                root: "रूट",
                ios: "आईओएस",
                pc: "पीसी",
                welcome: "NEAMOT 2.0 में आपका स्वागत है",
                getBestPanels: "IOS, PC, ANDROID ROOT, NON-ROOT और MAIN ID LOCATION के लिए सर्वश्रेष्ठ गेमिंग पैनल प्राप्त करें",
                safeTrusted: "१००% सुरक्षित और विश्वसनीय",
                verified: "सत्यापित",
                verifiedBadge: "सत्यापित",
            },
            us: {
                home: "Home",
                myKeys: "My Keys",
                myOrders: "My Orders",
                account: "Account",
                addFunds: "Add Funds",
                login: "Login",
                register: "Register",
                logout: "Logout",
                balance: "Balance",
                totalSpent: "Total Spent",
                premiumPanels: "PREMIUM PANELS",
                latestOrders: "Latest Orders",
                buyNow: "BUY NOW",
                stockOut: "STOCK OUT",
                selectPlan: "Select Plan Validity",
                quantity: "Quantity",
                totalAmount: "Total Amount",
                paymentMethod: "Payment Method",
                instantPay: "ACCOUNTS PAY",
                confirmOrder: "Confirm Order",
                cancel: "Cancel",
                availableBalance: "Available Balance",
                total: "Total",
                orderPlaced: "Order Placed",
                success: "Success",
                error: "Error",
                loading: "Loading...",
                noOrders: "No orders found.",
                noKeys: "No keys found. Please purchase a panel first.",
                insufficientBalance: "Insufficient balance! Please add funds.",
                pleaseLogin: "Please login first!",
                selectPlanFirst: "Please select a plan first!",
                transactionId: "Transaction ID",
                verify: "VERIFY",
                back: "Back",
                support: "Support",
                addFundsTitle: "Add Funds",
                customAmount: "Custom Amount",
                proceedPayment: "Proceed to Payment",
                fundHistory: "Fund History",
                noFundHistory: "No fund history yet.",
                privacy: "Privacy Policy",
                about: "About Us",
                official: "Official Details",
                profile: "Profile",
                editProfile: "Edit Profile",
                username: "Username",
                email: "Email",
                phone: "Phone",
                totalOrders: "Total Orders",
                wallet: "Wallet",
                password: "Password",
                confirmPassword: "Confirm Password",
                forgotPassword: "Forgot Password?",
                resetPassword: "Reset Password",
                sendResetLink: "Send Reset Link",
                loginNow: "Login Now",
                registerNow: "Register Now",
                or: "OR",
                loginWithGoogle: "Login with Google",
                welcomeBack: "Welcome back to NEAMOT 2.0",
                createAccount: "Create your account",
                enterCredentials: "Enter your credentials to access your account",
                fullName: "Full Name",
                alreadyMember: "Already a member?",
                dontHaveAccount: "Don't have an account?",
                panelRules: "PANEL RULES & CONDITION",
                stockOutMsg: "This plan is STOCK OUT!",
                txnAlreadyUsed: "This transaction ID has already been used!",
                verifyTransaction: "Please enter your Transaction ID!",
                insufficientBalanceMsg: "Insufficient balance! Please add funds.",
                orderSuccess: "Your order has been placed successfully.",
                fundRequestSubmitted: "Your fund request has been submitted. Wait for admin approval.",
                myKeysTitle: "My Keys",
                myOrdersTitle: "My Orders",
                approved: "Approved",
                pending: "Pending",
                rejected: "Rejected",
                messageFromAdmin: "NEAMOT PANEL STORE",
                copy: "Copy",
                joinGroup: "Join Paid User Group",
                clickToJoin: "Click to join the paid user group for support & updates",
                orderDate: "Order Date",
                plan: "Plan",
                price: "Price",
                quantity: "Qty",
                payment: "Payment",
                txnId: "Txn ID",
                all: "All",
                nonRoot: "Non-Root",
                root: "Root",
                ios: "iOS",
                pc: "PC",
                welcome: "Welcome to NEAMOT 2.0",
                getBestPanels: "Get the best gaming panels for IOS & PC & ANDROID ROOT & NON-ROOT & MAIN ID LOCATION",
                safeTrusted: "100% Safe & Trusted",
                verified: "Verified",
                verifiedBadge: "Verified",
            }
        };

        const fallbackDatabase = {};

        // ─── INFO MODAL DATA ──────────────────────────────────────
        const infoContent = {
            privacy: {
                title: 'Privacy Policy',
                icon: 'fa-shield-alt',
                body: `
                        <p><strong>N E A M O T ２．０</strong>, we value your privacy.</p>
                        <br />
                        <ul>
                            <li>We only collect the information necessary to process your order.</li>
                            <li>Your personal information will never be sold or shared with third parties without your permission.</li>
                            <li>Payment information is handled securely.</li>
                            <li>We use your contact details only for order updates and customer support.</li>
                            <li>By using our website, you agree to this Privacy Policy.</li>
                        </ul>
                        <br />
                        <p>If you have any questions, please contact us through our official Telegram channel.</p>
                    `
            },
            about: {
                title: 'About Us',
                icon: 'fa-info-circle',
                body: `
                        <p><strong>Welcome to ＡＴＨＡＲ ２．０</strong></p>
                        <br />
                        <p>ＡＴＨＡＲ ２．０ is dedicated to providing premium digital panel services with a focus on quality, fast delivery, and customer satisfaction.</p>
                        <br />
                        <p><strong>Why Choose Us?</strong></p>
                        <ul>
                            <li>✅ Fast Delivery</li>
                            <li>🔒 Secure Payment</li>
                            <li>💬 Friendly Customer Support</li>
                            <li>⭐ High Quality Service</li>
                            <li>📢 Regular Updates</li>
                        </ul>
                        <br />
                        <p>Our goal is to provide a simple, secure, and reliable platform where customers can easily purchase our services.</p>
                        <br />
                        <p>Thank you for trusting <strong>ＡＴＨＡＲ ２．０</strong>.</p>
                    `
            },
            official: {
                title: 'Official Details',
                icon: 'fa-link',
                body: `
                        <p><strong>💳 Payment Proof</strong></p>
                        <p>All successful payment screenshots are shared in our official Payment Proof channel for transparency.</p>
                        <br />
                        <p><strong>📌 Payment Proof:</strong><br />
                        <a href="https://t.me/+EaGokmJcRQM5N2M1" target="_blank" class="link-btn"><i class="fab fa-telegram"></i> Join Payment Proof</a></p>
                        <div class="divider-light"></div>
                        <p><strong>📢 Official Telegram Channel</strong></p>
                        <p>Stay updated with the latest announcements, updates, and offers.</p>
                        <a href="https://t.me/+RIDT4MtWAt1mOGU1" target="_blank" class="link-btn"><i class="fab fa-telegram"></i> Join Channel</a>
                        <div class="divider-light"></div>
                        <p><strong>▶️ Official YouTube Channel</strong></p>
                        <p>Watch tutorials, setup guides, and latest update videos.</p>
                        <a href="https://youtube.com/@x_core-panel?si=5TxjQcoFZUxM5TlL" target="_blank" class="link-btn"><i class="fab fa-youtube"></i> Subscribe</a>
                    `
            }
        };

        // No demo catalogue — wait for Firebase storeData only.

        // ─── LANGUAGE FUNCTIONS ──────────────────────────────────
        function toggleLangDropdown() {
            document.getElementById('langDropdownContent').classList.toggle('show');
        }

        function setLanguage(lang) {
            currentLanguage = lang;
            document.getElementById('langToggleBtn').innerHTML = '<i class="fas fa-globe"></i> ' + lang.toUpperCase();
            document.querySelectorAll('.lang-option').forEach(el => {
                el.classList.toggle('active-lang', el.dataset.lang === lang);
            });
            document.getElementById('langDropdownContent').classList.remove('show');
            applyTranslations(lang);
            updateUITexts(lang);
            generateCategorizedGrid();
        }

        function t(key) {
            return translations[currentLanguage] && translations[currentLanguage][key] ? translations[currentLanguage][key] : key;
        }

        function applyTranslations(lang) {
            const navItems = document.querySelectorAll('.nav-item');
            const navLabels = ['addFunds', 'home', 'myKeys', 'myOrders', 'account'];
            navItems.forEach((item, index) => {
                if (index < navLabels.length) {
                    const textNode = item.childNodes[item.childNodes.length - 1];
                    if (textNode && textNode.nodeType === 3) {
                        textNode.textContent = t(navLabels[index]);
                    }
                }
            });
        }

        function updateUITexts(lang) {
            const navItems = document.querySelectorAll('.nav-item');
            const navLabels = ['addFunds', 'home', 'myKeys', 'myOrders', 'account'];
            navItems.forEach((item, index) => {
                if (index < navLabels.length) {
                    const textNode = item.childNodes[item.childNodes.length - 1];
                    if (textNode && textNode.nodeType === 3) {
                        textNode.textContent = t(navLabels[index]);
                    }
                }
            });

            const drawerItems = document.querySelectorAll('.drawer-menu-item');
            const drawerKeys = ['home', 'myKeys', 'myOrders', 'keyResetZone', 'privacy', 'about', 'official', 'support', 'account', 'addFunds'];
            drawerItems.forEach((el, idx) => {
                if (idx < drawerKeys.length) {
                    const textNode = el.childNodes[el.childNodes.length - 1];
                    if (textNode && textNode.nodeType === 3) {
                        textNode.textContent = t(drawerKeys[idx]);
                    }
                }
            });
            document.querySelector('.drawer-logout-btn').innerHTML = '<i class="fas fa-sign-out-alt"></i> ' + t('logout');

            /* PREMIUM PANELS title removed from home */

            const ordersTitle = document.querySelector('.home-orders-title');
            if (ordersTitle) {
                const textNode = ordersTitle.childNodes[ordersTitle.childNodes.length - 1];
                if (textNode && textNode.nodeType === 3) {
                    textNode.textContent = t('latestOrders');
                }
            }

            document.querySelectorAll('.section-tab').forEach(el => {
                const section = el.dataset.section;
                // Keep the More-menu labels fixed so they can never inherit the PC label.
                if (section === 'other') {
                    el.textContent = 'OTHER';
                } else if (section === 'safe') {
                    el.textContent = 'SAFE PANELS';
                } else {
                    const key = section === 'all' ? 'all' :
                        section === 'nonroot' ? 'nonRoot' :
                        section === 'root' ? 'root' :
                        section === 'ios' ? 'ios' : 'pc';
                    el.textContent = t(key);
                }
                const iconSpan = el.querySelector('.tab-icon');
                if (iconSpan) {
                    el.prepend(iconSpan);
                }
            });

            const verifyTitle = document.querySelector('#verify-view .verify-title');
            if (verifyTitle) {
                const textNode = verifyTitle.childNodes[verifyTitle.childNodes.length - 1];
                if (textNode && textNode.nodeType === 3) {
                    textNode.textContent = t('myKeysTitle');
                }
            }
            const ordersViewTitle = document.querySelector('#orders-view .verify-title');
            if (ordersViewTitle) {
                const textNode = ordersViewTitle.childNodes[ordersViewTitle.childNodes.length - 1];
                if (textNode && textNode.nodeType === 3) {
                    textNode.textContent = t('myOrdersTitle');
                }
            }

            const authTitle = document.getElementById('auth-title');
            if (authTitle) authTitle.textContent = t('register');
            const authSubtitle = document.getElementById('auth-subtitle');
            if (authSubtitle) authSubtitle.textContent = t('createAccount');
            const submitBtn = document.getElementById('auth-submit-btn');
            if (submitBtn) submitBtn.textContent = t('registerNow');
            document.querySelector('#username-group label').textContent = t('fullName');
            document.querySelector('#phone-group label').textContent = t('phone');
            document.querySelector('#acc-email').parentElement.querySelector('label').textContent = t('email');
            document.querySelector('#acc-pass').parentElement.parentElement.querySelector('label').textContent = t('password');
            document.getElementById('acc-email').placeholder = 'email@example.com';
            const confirmLabel = document.querySelector('#confirm-pass-group .confirm-pass-label');
            if (confirmLabel) confirmLabel.textContent = ' ' + t('confirmPassword');

            const _lab = (id, key) => {
                const el = document.getElementById(id);
                if (el && el.parentElement) {
                    const lab = el.parentElement.querySelector('.label');
                    if (lab) lab.textContent = t(key);
                }
            };
            _lab('profile-username-val', 'username');
            _lab('profile-email', 'email');
            _lab('profile-phone', 'phone');
            _lab('profile-total-orders', 'totalOrders');
            _lab('profile-balance', 'balance');
            _lab('profile-total-spent', 'totalSpent');
            const ps = document.querySelector('.profile-subtitle');
            if (ps) ps.textContent = t('welcomeBack');
            const _set = (sel, prop, val) => { const el = document.querySelector(sel); if (el) el[prop] = val; };
            _set('.profile-dev-section .dev-text strong', 'textContent', 'NEAMOT 2.0');
            _set('.add-funds-view h3', 'innerHTML', '💰 <span>' + t('addFundsTitle') + '</span>');
            _set('.add-funds-view .subtitle', 'textContent', t('addFundsTitle'));
            _set('.funds-card .input-group label', 'textContent', t('customAmount'));
            _set('.funds-submit-btn', 'textContent', t('proceedPayment'));
            _set('.funds-history-title', 'textContent', t('fundHistory'));
            _set('.step-label:first-child', 'innerHTML', '<i class="fas fa-check-circle"></i> ' + t('selectPlan'));
            _set('.step-label:nth-child(3)', 'innerHTML', '<i class="fas fa-cubes"></i> ' + t('quantity'));
            _set('.price-label', 'innerHTML', t('totalAmount') + ' <span class="qty-badge" id="qty-badge-label">×1</span>');
            _set('.step-label:last-child', 'innerHTML', '<i class="fas fa-credit-card"></i> ' + t('paymentMethod'));
            _set('.panel-rules-inside h4', 'textContent', t('panelRules'));
            _set('#wallet-tab span', 'textContent', t('instantPay'));
            _set('.wallet-confirm-box h3', 'innerHTML', '<span>' + t('confirmOrder') + '</span>');
            _set('.wallet-confirm-box .confirm-desc', 'textContent', t('availableBalance'));
            _set('.wallet-confirm-actions .cancel-btn', 'textContent', t('cancel'));
            _set('.wallet-confirm-actions .confirm-btn', 'textContent', t('confirmOrder'));
            _set('.balance-info .label', 'textContent', t('availableBalance'));
            _set('.floating-support .support-text', 'textContent', t('support'));
            updateAccountVerificationBadge(auth.currentUser);
        }

        // ─── NOTIFICATION SYSTEM ──────────────────────────────────
        function showNotification(icon, title, desc, btnText = "OK, Got it!", isGreen = false) {
            const popup = document.getElementById('notificationPopup');
            document.getElementById('popupIcon').innerText = icon || '🎉';
            document.getElementById('popupTitle').innerHTML = title || 'Success!';
            document.getElementById('popupDesc').innerText = desc || 'Your action was completed successfully.';
            const btn = document.getElementById('popupBtn');
            btn.innerText = btnText;
            if (isGreen) {
                btn.className = 'popup-btn green';
            } else {
                btn.className = 'popup-btn';
            }
            popup.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeNotification() {
            document.getElementById('notificationPopup').classList.remove('active');
            document.body.style.overflow = '';
        }

        // ─── TOAST ──────────────────────────────────────────────
        let toastHideTimer = null;
        
        window.collapseNEAMOTNotice = function() {
            var n = document.getElementById('NEAMOTTopNotice');
            var c = document.getElementById('noticeCollapseBtn');
            var e = document.getElementById('noticeExpandBtn');
            if (!n) return;
            n.classList.add('collapsed');
            if (c) c.style.display = 'none';
            if (e) e.style.display = 'grid';
            try { localStorage.setItem('NEAMOT_notice_state', 'collapsed'); } catch(err) {}
        };
        window.expandNEAMOTNotice = function() {
            var n = document.getElementById('NEAMOTTopNotice');
            var c = document.getElementById('noticeCollapseBtn');
            var e = document.getElementById('noticeExpandBtn');
            if (!n) return;
            n.classList.remove('collapsed');
            if (c) c.style.display = 'grid';
            if (e) e.style.display = 'none';
            try { localStorage.setItem('NEAMOT_notice_state', 'open'); } catch(err) {}
        };
        window.hideNEAMOTNotice = function() {
            var n = document.getElementById('NEAMOTTopNotice');
            var chip = document.getElementById('NEAMOTNoticeShowChip');
            if (n) n.classList.add('hidden');
            if (chip) chip.classList.add('show');
            try { localStorage.setItem('NEAMOT_notice_state', 'hidden'); } catch(err) {}
        };
        window.showNEAMOTNotice = function() {
            var n = document.getElementById('NEAMOTTopNotice');
            var chip = document.getElementById('NEAMOTNoticeShowChip');
            if (n) { n.classList.remove('hidden'); n.classList.remove('collapsed'); }
            if (chip) chip.classList.remove('show');
            var c = document.getElementById('noticeCollapseBtn');
            var e = document.getElementById('noticeExpandBtn');
            if (c) c.style.display = 'grid';
            if (e) e.style.display = 'none';
            try { localStorage.setItem('NEAMOT_notice_state', 'open'); } catch(err) {}
        };
        (function restoreNEAMOTNotice(){
            try {
                var st = localStorage.getItem('NEAMOT_notice_state');
                if (st === 'hidden') window.hideNEAMOTNotice();
                else if (st === 'collapsed') window.collapseNEAMOTNotice();
            } catch(err) {}
        })();

        function showToast(message, borderColor = "var(--primary-color)", icon = "🔔") {
            const toast = document.getElementById('custom-toast');
            const toastText = document.getElementById('toast-text');
            const toastIcon = document.getElementById('toast-icon');
            if (toast && toastText) {
                toast.style.borderColor = borderColor || "var(--primary-color)";
                if (toastIcon) {
                    toastIcon.style.borderColor = borderColor || "var(--primary-color)";
                    toastIcon.textContent = icon || "🔔";
                }
                toastText.innerText = message;
                toast.classList.add('show');
                if (toastHideTimer) clearTimeout(toastHideTimer);
                toastHideTimer = setTimeout(() => { toast.classList.remove('show'); }, 3000);
            }
        }

        // ─── OPEN / CLOSE INFO MODAL ────────────────────────────
        function openInfoModal(type) {
            const overlay = document.getElementById('infoModalOverlay');
            const titleEl = document.getElementById('infoModalTitle');
            const bodyEl = document.getElementById('infoModalBody');
            const data = infoContent[type];
            if (!data) return;
            titleEl.innerHTML = `<i class="fas ${data.icon}"></i> ${data.title}`;
            bodyEl.innerHTML = data.body;
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            updateMobileBackButton();
        }

        function closeInfoModal() {
            document.getElementById('infoModalOverlay').classList.remove('active');
            document.body.style.overflow = '';
            updateMobileBackButton();
        }

        // ─── HELPER FUNCTIONS ────────────────────────────────────
        
        
        function slugifyPanelName(name) {
            return String(name || '')
                .toLowerCase()
                .trim()
                .replace(/['"`]/g, '')
                .replace(/[^a-z0-9\u0980-\u09FF]+/g, '-')  // keep bangla letters too
                .replace(/^-+|-+$/g, '')
                .replace(/-+/g, '-') || '';
        }

        function findPanelIdBySlug(slug) {
            if (!slug) return null;
            const s = String(slug).toLowerCase().replace(/^#/, '').replace(/^panel-/, '');
            if (/^\d+$/.test(s) && (panelDatabase[s] || (typeof fallbackDatabase !== 'undefined' && fallbackDatabase[s]))) {
                return String(s);
            }
            const db = panelDatabase || {};
            for (const id of Object.keys(db)) {
                const p = db[id] || {};
                const n = slugifyPanelName(p.name || p.title || '');
                if (n && (n === s || n === slugifyPanelName(s))) return String(id);
            }
            // partial match (contains)
            for (const id of Object.keys(db)) {
                const p = db[id] || {};
                const n = slugifyPanelName(p.name || p.title || '');
                if (n && (n.includes(s) || s.includes(n)) && n.length > 3) return String(id);
            }
            return null;
        }

        function getPanelShareSlug(id) {
            const p = (panelDatabase && panelDatabase[id]) || (typeof fallbackDatabase !== 'undefined' && fallbackDatabase[id]) || {};
            const slug = slugifyPanelName(p.name || p.title || '');
            return slug || ('panel-' + String(id));
        }

        function getOrderedPanelIds() {
            const existing = Object.keys(panelDatabase || {})
                .map(Number)
                .filter(n => !isNaN(n) && panelDatabase[n] && typeof panelDatabase[n] === 'object');
            const order = window.__panelOrder;
            if (Array.isArray(order) && order.length) {
                const ordered = order.filter(id => existing.includes(id));
                existing.forEach(id => { if (!ordered.includes(id)) ordered.push(id); });
                return ordered;
            }
            return existing.sort((a, b) => a - b);
        }

        function getPanelById(id) {
            if (panelDatabase[id]) return { id: id, data: panelDatabase[id] };
            if (fallbackDatabase[id]) return { id: id, data: fallbackDatabase[id] };
            return null;
        }

        function togglePasswordVisibility(inputId, btn) {
            const input = document.getElementById(inputId);
            if (!input) return;
            if (input.type === 'password') {
                input.type = 'text';
                btn.innerHTML = '<i class="fas fa-eye"></i>';
            } else {
                input.type = 'password';
                btn.innerHTML = '<i class="fas fa-eye-slash"></i>';
            }
        }

        function showRealLoading() {
            document.getElementById('realLoadingOverlay').classList.add('active');
        }

        function hideRealLoading() {
            document.getElementById('realLoadingOverlay').classList.remove('active');
        }

        function showVerifyingPopup() {
            /* removed — no verifying popup on buy */
        }

        function closeVerifyingPopup() {
            /* removed */
            try {
                var el = document.getElementById('verifyingPopupOverlay');
                if (el) el.classList.remove('active');
            } catch (e) {}
        }

        function toggleDrawer() {
            const user = auth.currentUser;
            if (!user) {
                showToast(t('pleaseLogin'), "#ff4444");
                return;
            }
            const drawer = document.getElementById('drawer');
            const overlay = document.getElementById('drawerOverlay');
            drawer.classList.toggle('open');
            overlay.classList.toggle('active');
            document.body.style.overflow = drawer.classList.contains('open') ? 'hidden' : '';
        }

        function closeDrawer() {
            document.getElementById('drawer').classList.remove('open');
            document.getElementById('drawerOverlay').classList.remove('active');
            document.body.style.overflow = '';
        }

        function syncPanelHeaderUI(user, balanceValue) {
            const balance = (balanceValue === undefined || balanceValue === null) ? 0 : balanceValue;
            document.querySelectorAll('.panel-header-balance span').forEach(el => el.textContent = Number(balance || 0).toFixed(0) +
            ' TK');
            document.querySelectorAll('.panel-header-profile').forEach(btn => {
                const avatar = btn.querySelector('#panelHeaderAvatar');
                if (avatar) avatar.textContent = user ? ((user.displayName || user.email || 'U').charAt(0).toUpperCase()) : 'U';
                if (user && user.photoURL) {
                    btn.style.backgroundImage = `url(${user.photoURL})`;
                    btn.style.backgroundSize = 'cover';
                    btn.style.backgroundPosition = 'center';
                    if (avatar) avatar.style.opacity = '0';
                } else {
                    btn.style.backgroundImage = '';
                    if (avatar) avatar.style.opacity = '1';
                }
            });
        }

        function updateDrawerUI(user) {
            const avatar = document.getElementById('drawerAvatar');
            const name = document.getElementById('drawerUserName');
            const email = document.getElementById('drawerUserEmail');
            const statusDot = document.getElementById('drawerStatusDot');
            const statusText = document.getElementById('drawerStatusText');
            const logoutBtn = document.getElementById('drawerLogoutBtn');
            const verifyItem = document.getElementById('drawerVerifyItem');
            const ordersItem = document.getElementById('drawerOrdersItem');
            const navVerify = document.getElementById('nav-verify-btn');
            const navOrders = document.getElementById('nav-orders-btn');
            const navFunds = document.getElementById('nav-funds-btn');
            const drawerAddFunds = document.getElementById('drawerAddFundsItem');
            const profileAddFunds = document.getElementById('profileAddFundsBtn');
            const profileAvatarBtn = document.getElementById('profileAvatarBtn');
            const topRegisterBtn = document.getElementById('topRegisterBtn');
            const topLoginBtn = document.getElementById('topLoginBtn');
            const headerAvatarText = document.getElementById('headerAvatarText');
            const headerBalance = document.getElementById('headerBalanceDisplay');

            if (user) {
                let displayName = user.displayName || user.email.split('@')[0] || 'User';
                if (user.photoURL) {
                    avatar.style.backgroundImage = `url(${user.photoURL})`;
                    avatar.style.backgroundSize = 'cover';
                    avatar.style.backgroundPosition = 'center';
                    avatar.innerText = '';
                } else {
                    avatar.style.backgroundImage = '';
                    avatar.style.backgroundSize = '';
                    avatar.style.backgroundPosition = '';
                    avatar.innerText = (displayName || user.email || 'U').trim().charAt(0).toUpperCase();
                }
                name.innerText = displayName;
                email.innerText = user.email;
                statusDot.className = 'status-dot online';
                statusText.innerText = 'Online';
                logoutBtn.style.display = 'flex';
                verifyItem.style.display = 'flex';
                ordersItem.style.display = 'flex';
                const keyResetItem = document.getElementById('drawerKeyResetItem');
                if (keyResetItem) keyResetItem.style.display = 'flex';
                navVerify.style.display = 'flex';
                navOrders.style.display = 'flex';
                if (navFunds) navFunds.style.display = 'flex';
                if (drawerAddFunds) drawerAddFunds.style.display = 'flex';
                if (profileAddFunds) profileAddFunds.style.display = 'none';
                const profileKr = document.getElementById('profileKeyResetBtn');
                if (profileKr) profileKr.style.display = 'inline-flex';
                profileAvatarBtn.classList.add('show');
                headerBalance.classList.add('show');
                if (user.photoURL) {
                    profileAvatarBtn.style.backgroundImage = `url(${user.photoURL})`;
                    profileAvatarBtn.style.backgroundSize = 'cover';
                    profileAvatarBtn.style.backgroundPosition = 'center';
                    headerAvatarText.innerText = '';
                } else {
                    profileAvatarBtn.style.backgroundImage = '';
                    profileAvatarBtn.style.backgroundSize = '';
                    profileAvatarBtn.style.backgroundPosition = '';
                    headerAvatarText.innerText = (displayName || user.email || 'U').trim().charAt(0).toUpperCase();
                }
                topRegisterBtn.style.display = 'none';
                if (topLoginBtn) topLoginBtn.style.display = 'none';
                database.ref('User/' + user.uid + '/balance').once('value').then(snap => {
                    const bal = snap.val() || 0;
                    document.getElementById('headerBalanceAmount').innerText = bal;
                    syncPanelHeaderUI(user, bal);
                });
            } else {
                avatar.style.backgroundImage = '';
                avatar.style.backgroundSize = '';
                avatar.style.backgroundPosition = '';
                avatar.innerText = 'U';
                name.innerText = 'Guest User';
                email.innerText = 'Not logged in';
                statusDot.className = 'status-dot';
                statusText.innerText = 'Offline';
                logoutBtn.style.display = 'none';
                verifyItem.style.display = 'none';
                ordersItem.style.display = 'none';
                const keyResetItem = document.getElementById('drawerKeyResetItem');
                if (keyResetItem) keyResetItem.style.display = 'none';
                navVerify.style.display = 'none';
                navOrders.style.display = 'none';
                if (navFunds) navFunds.style.display = 'none';
                if (drawerAddFunds) drawerAddFunds.style.display = 'none';
                if (profileAddFunds) profileAddFunds.style.display = 'none';
                const profileKr = document.getElementById('profileKeyResetBtn');
                if (profileKr) profileKr.style.display = 'none';
                profileAvatarBtn.classList.remove('show');
                headerBalance.classList.remove('show');
                syncPanelHeaderUI(null, 0);
                topRegisterBtn.style.display = 'block';
                if (topLoginBtn) topLoginBtn.style.display = 'block';
                if (document.getElementById('drawer').classList.contains('open')) {
                    closeDrawer();
                }
            }
        }

        function showLogoutDialog() {
            document.getElementById('logoutDialog').classList.add('active');
        }

        function closeLogoutDialog() {
            document.getElementById('logoutDialog').classList.remove('active');
        }

        function buildShareUrl(hash) {
            const base = window.location.href.split('#')[0];
            return base + (hash ? ('#' + hash) : '');
        }

        function shareTextLink(url, title) {
            try {
                if (navigator.share) {
                    navigator.share({ title: title || 'NEAMOT 2.0', url: url }).catch(() => {
                        if (navigator.clipboard) navigator.clipboard.writeText(url).then(() => showToast('Link copied!', '#22c55e'));
                        else showToast(url, '#22c55e');
                    });
                } else if (navigator.clipboard) {
                    navigator.clipboard.writeText(url).then(() => showToast('Link copied!', '#22c55e'));
                } else {
                    showToast(url, '#22c55e');
                }
            } catch (e) {
                showToast(url, '#22c55e');
            }
        }

        function sharePanelLink() {
            const id = selectedId || (window.location.hash || '').replace(/^#panel-/, '');
            if (!id || isNaN(id)) {
                shareTextLink(buildShareUrl('panel-all'), 'NEAMOT 2.0 - All Panels');
                return;
            }
            shareTextLink(buildShareUrl(getPanelShareSlug(id)), (panelDatabase[id]&&panelDatabase[id].name?panelDatabase[id].name:('Panel '+id))+' | NEAMOTpanel.store');
        }

        function sharePanelFromCard(id) {
            if (!id) return;
            shareTextLink(buildShareUrl(getPanelShareSlug(id)), (panelDatabase[id]&&panelDatabase[id].name?panelDatabase[id].name:('Panel '+id))+' | NEAMOTpanel.store');
        }

        // ─── WEBVIEW / ANDROID BACK HISTORY + SHAREABLE HASH ROUTES ───
        let internalHistoryLock = false;
        const TAB_TO_HASH = {
            home: 'home',
            account: 'account',
            addfunds: 'addfunds',
            verify: 'mykeys',
            orders: 'myorder'
        };
        const HASH_TO_TAB = {
            home: 'home',
            account: 'account',
            addfunds: 'addfunds',
            mykeys: 'verify',
            verify: 'verify',
            myorder: 'orders',
            myorders: 'orders',
            orders: 'orders'
        };

        function pushAppHistory(type) {
            try {
                const current = history.state && history.state.NEAMOTApp;
                if (current === type) return;
                const hash = TAB_TO_HASH[type] || type;
                history.pushState({ NEAMOTApp: type }, '', window.location.href.split('#')[0] + '#' + encodeURIComponent(hash));
            } catch (e) {}
        }

        function clearAppHistoryHash() {
            try {
                if (history.replaceState) history.replaceState({ NEAMOTApp: 'home' }, '', window.location.href.split('#')[0] + '#home');
            } catch (e) {}
        }

        function setRouteHash(route, replace) {
            try {
                const url = window.location.href.split('#')[0] + '#' + encodeURIComponent(route);
                if (replace && history.replaceState) history.replaceState({ NEAMOTApp: route }, '', url);
                else history.pushState({ NEAMOTApp: route }, '', url);
            } catch (e) {}
        }

        window.addEventListener('popstate', function() {
            if (internalHistoryLock) return;
            // Android WebView/browser back: close overlays / leave tab or panel → #home
            if (document.getElementById('walletConfirmOverlay').classList.contains('active') ||
                document.getElementById('infoModalOverlay').classList.contains('active') ||
                document.getElementById('funds-payment-page').classList.contains('active') ||
                document.getElementById('other-payment-page').classList.contains('active') ||
                document.getElementById('payment-page').classList.contains('active') ||
                document.getElementById('price-panel').classList.contains('active') ||
                document.getElementById('editProfileOverlay').classList.contains('active') ||
                currentTab !== 'home') {
                goBack();
                return;
            }
            // If state has a route, honor it; otherwise stay home
            const st = (history.state && history.state.NEAMOTApp) || '';
            if (st && st !== 'home' && HASH_TO_TAB[st]) {
                switchTab(HASH_TO_TAB[st], true);
            } else if (st && String(st).startsWith('panel-')) {
                handleHashOnLoad();
            } else {
                switchTab('home', true);
            }
        });

        function updateMobileBackButton() {
            const btn = document.getElementById('mobileBackBtn');
            const isPanelActive = document.getElementById('price-panel').classList.contains('active');
            const isEditActive = document.getElementById('editProfileOverlay').classList.contains('active');
            const isPaymentActive = document.getElementById('payment-page').classList.contains('active');
            const isOtherPaymentActive = document.getElementById('other-payment-page').classList.contains('active');
            const isFundsPaymentActive = document.getElementById('funds-payment-page').classList.contains('active');
            const isInfoActive = document.getElementById('infoModalOverlay').classList.contains('active');
            const isWalletConfirmActive = document.getElementById('walletConfirmOverlay').classList.contains('active');
            const isNotHome = currentTab !== 'home' || pageHistory.length > 1;
            if (isPanelActive || isEditActive || isPaymentActive || isOtherPaymentActive || isFundsPaymentActive || isInfoActive ||
                isWalletConfirmActive || isNotHome) {
                btn.classList.add('visible');
            } else {
                btn.classList.remove('visible');
            }
        }

        function goBack() {
            if (document.getElementById('walletConfirmOverlay').classList.contains('active')) {
                closeWalletConfirm();
                return;
            }
            if (document.getElementById('infoModalOverlay').classList.contains('active')) {
                closeInfoModal();
                return;
            }
            if (document.getElementById('funds-payment-page').classList.contains('active')) {
                closeFundsPaymentPage();
                updateMobileBackButton();
                return;
            }
            if (document.getElementById('other-payment-page').classList.contains('active')) {
                cancelMobileBankingFromBack();
                return;
            }
            if (document.getElementById('payment-page').classList.contains('active')) {
                backToMobileBanking();
                return;
            }
            if (document.getElementById('price-panel').classList.contains('active')) {
                closePanel();
                updateMobileBackButton();
                return;
            }
            if (document.getElementById('editProfileOverlay').classList.contains('active')) {
                closeEditProfile();
                updateMobileBackButton();
                return;
            }
            // Mobile back: always return to home with shareable #home
            internalHistoryLock = true;
            pageHistory = ['home'];
            switchTab('home', true);
            setRouteHash('home', true);
            internalHistoryLock = false;
            updateMobileBackButton();
        }

        // Back from Bkash/Nagad/Rocket payment -> return to Mobile Banking.
                function backToMobileBanking() {
            const payPage = document.getElementById('payment-page');
            if (payPage) payPage.classList.remove('active');
            const other = document.getElementById('other-payment-page');
            if (other) {
                other.classList.add('active');
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
            updateMobileBackButton();
        }

        // Back from the Mobile Banking selector -> cancel invoice, then return after 4 seconds.
        function cancelMobileBankingFromBack() {
            const page = document.getElementById('other-payment-page');
            if (!page || !page.classList.contains('active')) return;
            showMobileBankingBackDialog();
        }

        function showMobileBankingBackDialog() {
            if (document.getElementById('mobile-banking-back-overlay')) return;
            const overlay = document.createElement('div');
            overlay.id = 'mobile-banking-back-overlay';
            overlay.style.cssText = `
                    position: fixed; top:0; left:0; width:100%; height:100%;
                    background: rgba(0,0,0,0.75); backdrop-filter: blur(8px);
                    display: flex; justify-content: center; align-items: center;
                    z-index: 99999999; padding: 16px;
                `;
            overlay.innerHTML = `
                    <div style="background: var(--card-bg); border: 1px solid var(--card-border); border-radius: 20px; padding: 26px 22px 22px; max-width: 320px; width:90%; text-align: center; box-shadow: 0 20px 60px var(--shadow-color); animation: dialogPop 0.35s ease-out;">
                        <div style="font-size: 40px; color: #ff9800; margin-bottom: 8px;"><i class="fas fa-exclamation-triangle"></i></div>
                        <h3 style="color: var(--text-color); font-size: 18px; font-weight: 900; margin-bottom: 4px;">Leave Mobile Banking?</h3>
                        <p style="color: var(--gray-500); font-size: 13px; margin-bottom: 18px; line-height: 1.5;">Back চাপলে payment cancel হয়ে যাবে। Continue চাপলে এখানেই থাকবেন।</p>
                        <div style="display: flex; gap: 10px; justify-content: center;">
                            <button type="button" style="padding:10px 16px;border-radius:10px;font-weight:700;font-size:12px;text-transform:uppercase;cursor:pointer;flex:1;background:rgba(128,128,128,0.08);color:var(--text-color);border:1px solid var(--card-border);" onclick="closeMobileBankingBackDialog()">CONTINUE</button>
                            <button type="button" style="padding:10px 16px;border-radius:10px;font-weight:700;font-size:12px;text-transform:uppercase;cursor:pointer;flex:1;background:linear-gradient(135deg,#20c8f5,#20c8f5);color:#fff;border:none;box-shadow:0 4px 15px rgba(32,200,245,0.3);" onclick="confirmMobileBankingBack()">CANCEL</button>
                        </div>
                    </div>
                `;
            document.body.appendChild(overlay);
        }

        function closeMobileBankingBackDialog() {
            const el = document.getElementById('mobile-banking-back-overlay');
            if (el) el.remove();
        }

        function confirmMobileBankingBack() {
            closeMobileBankingBackDialog();
            const page = document.getElementById('other-payment-page');
            if (page) page.classList.remove('active');
            document.body.style.overflow = '';
            showInvoiceCancelledPopup(4);
            updateMobileBackButton();
        }

        // Kept for compatibility with any older onclick handlers.
        function cancelInvoiceFromBack() {
            cancelMobileBankingFromBack();
        }

        // ─── PAYMENT BACK ────────────────────────────────────────
        function handlePaymentBack() {
            // From bKash/Nagad/Rocket/Binance → return to Mobile Banking (OTHER PAY)
            const payPage = document.getElementById('payment-page');
            if (payPage && payPage.classList.contains('active')) {
                payPage.classList.remove('active');
                const other = document.getElementById('other-payment-page');
                if (other) {
                    other.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
                updateMobileBackButton();
                return;
            }
            showPaymentBackDialog();
        }

        function showPaymentBackDialog() {
            const overlay = document.createElement('div');
            overlay.id = 'payment-back-overlay';
            overlay.style.cssText = `
                    position: fixed; top:0; left:0; width:100%; height:100%;
                    background: rgba(0,0,0,0.7); backdrop-filter: blur(8px);
                    display: flex; justify-content: center; align-items: center;
                    z-index: 99999999; padding: 16px;
                `;
            overlay.innerHTML = `
                    <div style="background: var(--card-bg); border: 1px solid var(--card-border); border-radius: 20px; padding: 26px 22px 22px; max-width: 320px; width:90%; text-align: center; box-shadow: 0 20px 60px var(--shadow-color); animation: dialogPop 0.35s ease-out;">
                        <div style="font-size: 40px; color: #ff9800; margin-bottom: 8px;"><i class="fas fa-exclamation-triangle"></i></div>
                        <h3 style="color: var(--text-color); font-size: 18px; font-weight: 900; margin-bottom: 4px;">${t('cancel')} Payment?</h3>
                        <p style="color: var(--gray-500); font-size: 13px; margin-bottom: 18px; line-height: 1.5;">Are you sure you want to go back? Your payment will be cancelled.</p>
                        <div style="display: flex; gap: 10px; justify-content: center;">
                            <button class="custom-dialog-btn cancel" style="padding:10px 20px;border:none;border-radius:10px;font-weight:700;font-size:12px;text-transform:uppercase;cursor:pointer;transition:0.3s;flex:1;background:rgba(128,128,128,0.08);color:var(--text-color);border:1px solid var(--card-border);" onclick="closePaymentBackDialog()">${t('cancel')}</button>
                            <button class="custom-dialog-btn confirm" style="padding:10px 20px;border:none;border-radius:10px;font-weight:700;font-size:12px;text-transform:uppercase;cursor:pointer;transition:0.3s;flex:1;background:linear-gradient(135deg,#20c8f5,#20c8f5);color:#fff;box-shadow:0 4px 15px rgba(32,200,245,0.3);" onclick="confirmPaymentBack()">Yes, Cancel</button>
                        </div>
                    </div>
                `;
            document.body.appendChild(overlay);
        }

        function closePaymentBackDialog() {
            const el = document.getElementById('payment-back-overlay');
            if (el) el.remove();
        }

        function confirmPaymentBack() {
            closePaymentBackDialog();
            showInvoiceCancelledPopup();
        }

        function showInvoiceCancelledPopup(seconds = 4) {
            const overlay = document.createElement('div');
            overlay.id = 'invoice-cancel-overlay';
            overlay.style.cssText = `
                    position: fixed; top:0; left:0; width:100%; height:100%;
                    background: rgba(0,0,0,0.9); backdrop-filter: blur(12px);
                    display: flex; justify-content: center; align-items: center;
                    z-index: 99999999; flex-direction: column; padding: 16px;
                    animation: dialogPop 0.4s ease-out;
                `;
            overlay.innerHTML = `
                    <div style="background: var(--card-bg); border: 1px solid #20c8f5; border-radius: 20px; padding: 32px 24px; max-width: 340px; width:100%; text-align: center; box-shadow: 0 20px 60px var(--shadow-color);">
                        <div style="font-size: 56px; color: #20c8f5; margin-bottom: 12px;"><i class="fas fa-times-circle"></i></div>
                        <h3 style="color: var(--text-color); font-size: 20px; font-weight: 900; margin-bottom: 6px;">Invoice Cancelled</h3>
                        <p style="color: var(--gray-500); font-size: 13px; margin-bottom: 16px;">Your request to cancel the invoice has been processed successfully.</p>
                        <div style="color: var(--gray-500); font-size: 12px; margin-top: 8px;">Redirecting in <span id="cancel-countdown">${Math.max(1, Number(seconds) || 4)}</span> seconds...</div>
                    </div>
                `;
            document.body.appendChild(overlay);

            let countdown = Math.max(1, Number(seconds) || 4);
            const countdownEl = document.getElementById('cancel-countdown');
            const timer = setInterval(() => {
                countdown--;
                if (countdownEl) countdownEl.innerText = countdown;
                if (countdown <= 0) {
                    clearInterval(timer);
                    if (overlay) overlay.remove();
                    document.body.style.overflow = '';
                    closePaymentPage();
                    closeOtherPaymentPage();
                    closePanel();
                    showToast("Payment cancelled", "#ff9800");
                }
            }, 1000);
        }

        // ─── IMGBB UPLOAD ────────────────────────────────────────
        function uploadPhotoToImgBB(file) {
            return new Promise((resolve, reject) => {
                const formData = new FormData();
                formData.append('image', file);
                formData.append('key', IMGBB_API_KEY);

                fetch('https://api.imgbb.com/1/upload', {
                        method: 'POST',
                        body: formData
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            resolve(data.data.url);
                        } else {
                            reject(new Error(data.error?.message || 'Upload failed'));
                        }
                    })
                    .catch(error => reject(error));
            });
        }

        function handlePhotoSelect(e) {
            const file = e.target.files[0];
            if (!file) {
                showToast("No file selected!", "#ff4444");
                return;
            }
            if (!file.type.startsWith('image/')) {
                showToast("Please select an image file!", "#ff4444");
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                showToast("Image size must be less than 5MB!", "#ff4444");
                return;
            }
            selectedPhotoFile = file;

            const reader = new FileReader();
            reader.onload = function(ev) {
                const preview = document.getElementById('editPhotoPreview');
                preview.style.backgroundImage = `url(${ev.target.result})`;
                preview.style.backgroundSize = 'cover';
                preview.style.backgroundPosition = 'center';
                const initial = document.getElementById('editPhotoInitial');
                if (initial) initial.style.display = 'none';
            };
            reader.readAsDataURL(file);

            if (auth.currentUser) {
                const saveBtn = document.getElementById('saveEditBtn');
                const originalText = saveBtn.innerHTML;
                saveBtn.innerHTML = '<span class="edit-loading-spinner"></span> Uploading...';
                saveBtn.disabled = true;

                uploadPhotoToImgBB(file)
                    .then((url) => {
                        return auth.currentUser.updateProfile({ photoURL: url })
                            .then(() => {
                                return database.ref('User/' + auth.currentUser.uid + '/photoURL').set(url);
                            })
                            .then(() => url);
                    })
                    .then((url) => {
                        updateProfileUI(auth.currentUser);
                        const editPreview = document.getElementById('editPhotoPreview');
                        if (editPreview) {
                            editPreview.style.backgroundImage = `url(${url})`;
                            editPreview.style.backgroundSize = 'cover';
                            editPreview.style.backgroundPosition = 'center';
                            const initial = document.getElementById('editPhotoInitial');
                            if (initial) initial.style.display = 'none';
                        }
                        showNotification('📸', 'Photo Updated!', 'Your profile photo has been updated successfully.', 'OK, Got it!',
                            true);
                    })
                    .catch((err) => {
                        console.warn("Photo upload failed:", err);
                        showToast("Photo upload failed: " + err.message, "#ff4444");
                    })
                    .finally(() => {
                        saveBtn.innerHTML = originalText;
                        saveBtn.disabled = false;
                    });
            } else {
                showToast(t('pleaseLogin'), "#ff4444");
            }
        }

        // ─── REAL ACCOUNT VERIFICATION STATUS ───────────────────
        function updateAccountVerificationBadge(user) {
            const badge = document.getElementById('account-verification-badge');
            if (!badge) return;
            if (!user) {
                badge.textContent = 'Not Signed In';
                badge.className = 'premium-badge verification-neutral';
                return;
            }
            if (user.emailVerified) {
                badge.textContent = '✓ ACCOUNT VERIFIED';
                badge.className = 'premium-badge verification-verified';
                badge.title = 'Your Firebase account email is verified.';
                return;
            }
            badge.innerHTML =
                '⚠ EMAIL NOT VERIFIED <button type="button" class="verify-email-inline" onclick="sendAccountVerificationEmail()">Verify Email</button>';
            badge.className = 'premium-badge verification-unverified';
            badge.title = 'Verify your account email to receive the verified status.';
        }

        function sendAccountVerificationEmail() {
            const user = auth.currentUser;
            if (!user) return showToast(t('pleaseLogin'), '#ff4444');
            if (user.emailVerified) {
                updateAccountVerificationBadge(user);
                return showToast('✅ Your account is already verified.', '#22c55e');
            }
            user.sendEmailVerification().then(() => {
                showNotification('📧', 'Verification Email Sent', 'আপনার email inbox খুলে verification link-এ click করুন। তারপর আবার login/reload করুন।',
                    'OK, Got it!', true);
            }).catch(err => showToast('❌ ' + (err.message || 'Could not send verification email.'), '#ff4444'));
        }


        // ─── REFERRAL SYSTEM ─────────────────────────────────────
        const REFERRAL_DAILY_LIMIT = 4;
        const REFERRAL_DISCOUNT_PERCENT = 15;
        const REF_STORAGE_KEY = 'NEAMOT_incoming_ref';
        let activeReferralCode = null;
        let incomingReferralCode = null;
        let referralListenerUid = null;

        function referralDayKey(){ return new Date().toISOString().slice(0,10); }
        function normalizePhoneNumber(value){ return String(value||'').replace(/[^0-9+]/g,'').replace(/^00/,'+'); }
        function makeReferralCode(){ return 'NEAMOT-' + Math.random().toString(36).slice(2,8).toUpperCase() + '-' + Date.now().toString(36).slice(-4).toUpperCase(); }
        function getIncomingReferralCode(){
            try{
                const p=new URLSearchParams(window.location.search);
                if(p.get('ref')) return String(p.get('ref')).trim();
                const h=window.location.hash||'';
                const m=h.match(/[?&]ref=([^&]+)/i);
                if(m) return decodeURIComponent(m[1]).trim();
                // Persist across login/signup navigation
                const stored = localStorage.getItem(REF_STORAGE_KEY);
                if(stored) return String(stored).trim();
            }catch(e){}
            return null;
        }
        function saveIncomingReferralCode(code){
            try{
                if(code){
                    incomingReferralCode = String(code).trim();
                    localStorage.setItem(REF_STORAGE_KEY, incomingReferralCode);
                }
            }catch(e){}
        }
        function clearIncomingReferralCode(){
            try{
                incomingReferralCode = null;
                localStorage.removeItem(REF_STORAGE_KEY);
            }catch(e){}
        }
        function referralBaseUrl(){ return window.location.href.split('#')[0].split('?')[0]; }
        async function createReferralCode(uid){
            if(!uid) return null;
            const code=makeReferralCode();
            await database.ref('ReferralLinks/'+code).set({ownerUid:uid,createdAt:firebase.database.ServerValue.TIMESTAMP,views:0,completed:0,active:true});
            await database.ref('User/'+uid+'/referral/currentCode').set(code);
            activeReferralCode=code;
            return code;
        }
        async function ensureReferralCode(uid){
            if(!uid) return null;
            const snap=await database.ref('User/'+uid+'/referral/currentCode').once('value');
            let code=snap.val();
            if(!code){ code=await createReferralCode(uid); }
            else { activeReferralCode=code; }
            return code;
        }
        async function recordReferralView(){
            const codeFromUrl = (function(){
                try{
                    const p=new URLSearchParams(window.location.search);
                    if(p.get('ref')) return String(p.get('ref')).trim();
                    const h=window.location.hash||'';
                    const m=h.match(/[?&]ref=([^&]+)/i);
                    return m ? decodeURIComponent(m[1]).trim() : null;
                }catch(e){ return null; }
            })();
            const code = codeFromUrl || getIncomingReferralCode();
            if(code) saveIncomingReferralCode(code);
            if(!code) return;
            try{
                const ref=database.ref('ReferralLinks/'+code); const snap=await ref.once('value'); const data=snap.val();
                if(!data || !data.ownerUid) return;
                const sessionKey='NEAMOT_ref_view_'+code;
                if(sessionStorage.getItem(sessionKey)) return;
                sessionStorage.setItem(sessionKey,'1');
                await ref.child('views').transaction(v=>(Number(v)||0)+1);
            }catch(e){ console.warn('Referral view error',e); }
        }
        async function countOwnerDailyCompletions(ownerUid, day){
            // All under ReferralLinks (same parent as views — rules already allow)
            try{
                const snap = await database.ref('ReferralLinks/_byOwner/'+ownerUid+'/'+day).once('value');
                const val = snap.val();
                if (val && typeof val === 'object') {
                    return Math.min(REFERRAL_DAILY_LIMIT, Object.keys(val).length);
                }
            }catch(e){}
            try{
                const codeSnap = await database.ref('User/'+ownerUid+'/referral/currentCode').once('value');
                const code = codeSnap.val();
                if (code) {
                    const dailySnap = await database.ref('ReferralLinks/'+code+'/daily/'+day).once('value');
                    const daily = dailySnap.val() || {};
                    return Math.min(REFERRAL_DAILY_LIMIT, Object.keys(daily).length);
                }
            }catch(e){}
            try{
                const legacy = await database.ref('User/'+ownerUid+'/referral/daily/'+day+'/completed').once('value');
                return Math.min(REFERRAL_DAILY_LIMIT, Number(legacy.val()||0));
            }catch(e){ return 0; }
        }
        async function completeIncomingReferral(newUserUid){
            const code = incomingReferralCode || getIncomingReferralCode();
            if(!code || !newUserUid) {
                console.warn('[Referral] missing code or uid', {code, newUserUid});
                return false;
            }
            try{
                const linkRef = database.ref('ReferralLinks/'+code);
                const linkSnap = await linkRef.once('value');
                const link = linkSnap.val();
                if(!link || !link.ownerUid) {
                    console.warn('[Referral] invalid link', code);
                    return false;
                }
                if(String(link.ownerUid) === String(newUserUid)) {
                    console.warn('[Referral] self-referral blocked');
                    clearIncomingReferralCode();
                    return false;
                }
                const ownerUid = link.ownerUid;
                const day = referralDayKey();
                const payload = {
                    code: code,
                    referredUid: newUserUid,
                    at: Date.now()
                };

                // Duplicate check under ReferralLinks only
                const dailyUserRef = database.ref('ReferralLinks/'+code+'/daily/'+day+'/'+newUserUid);
                const byOwnerRef = database.ref('ReferralLinks/_byOwner/'+ownerUid+'/'+day+'/'+newUserUid);
                const [dailyExist, ownerExist] = await Promise.all([
                    dailyUserRef.once('value'),
                    byOwnerRef.once('value')
                ]);
                if (dailyExist.exists() || ownerExist.exists()) {
                    clearIncomingReferralCode();
                    return false;
                }

                // Writes ONLY under ReferralLinks (views already work here)
                let wrote = false;
                try {
                    await byOwnerRef.set(payload);
                    wrote = true;
                } catch (e1) {
                    console.warn('[Referral] _byOwner write failed', e1);
                }
                try {
                    await dailyUserRef.set(payload);
                    wrote = true;
                } catch (e2) {
                    console.warn('[Referral] link daily write failed', e2);
                }
                try {
                    await linkRef.child('completed').transaction(v => (Number(v)||0)+1);
                    wrote = true;
                } catch (e3) {
                    console.warn('[Referral] completed txn failed', e3);
                }

                // Best-effort: referred user own path
                try {
                    await database.ref('User/'+newUserUid+'/referral/usedCode').set({
                        code: code,
                        ownerUid: ownerUid,
                        at: Date.now()
                    });
                } catch (e) {}

                // Best-effort: mirror count to owner User path
                try {
                    const count = await countOwnerDailyCompletions(ownerUid, day);
                    await database.ref('User/'+ownerUid+'/referral/daily/'+day+'/completed').set(count);
                } catch (e) {}

                if (wrote) {
                    clearIncomingReferralCode();
                    console.log('[Referral] COMPLETED owner=', ownerUid, 'user=', newUserUid, 'code=', code);
                    return true;
                }
                console.warn('[Referral] all writes failed');
                return false;
            }catch(e){
                console.warn('Referral completion error', e);
                return false;
            }
        }
        async function loadReferralUI(uid){
            if(!uid) return;
            try{
                const code=await ensureReferralCode(uid);
                const day=referralDayKey();
                const [completed, linkSnap]=await Promise.all([
                    countOwnerDailyCompletions(uid, day),
                    database.ref('ReferralLinks/'+code).once('value')
                ]);
                const link=linkSnap.val()||{};
                const views=Number(link.views||0);
                const discount=completed>=REFERRAL_DAILY_LIMIT?REFERRAL_DISCOUNT_PERCENT:0;
                const p=document.getElementById('referralProgressBar'); if(p) p.style.width=(completed/REFERRAL_DAILY_LIMIT*100)+'%';
                const c=document.getElementById('referralCompletedCount'); if(c)c.textContent=completed;
                const v=document.getElementById('referralShareViews'); if(v)v.textContent=views;
                const leftEl=document.getElementById('referralTodayLeft'); if(leftEl) leftEl.textContent=Math.max(0, REFERRAL_DAILY_LIMIT - completed);
                const d=document.getElementById('referralDiscountValue'); if(d)d.textContent=discount+'%';
                const st=document.getElementById('referralDiscountStatus'); if(st) st.textContent=completed>=REFERRAL_DAILY_LIMIT?'✅ 15% Discount Unlocked':(completed+'/'+REFERRAL_DAILY_LIMIT+' আজকের Referral');
                const inp=document.getElementById('referralLinkInput'); if(inp) inp.value=referralBaseUrl()+'?ref='+encodeURIComponent(code);
            }catch(e){ console.warn('Referral UI error',e); }
        }
        async function generateNewReferralCode(){
            const uid=auth.currentUser?.uid; if(!uid) return showToast(t('pleaseLogin'),'#ff4444');
            try{ showRealLoading(); const code=await createReferralCode(uid); hideRealLoading(); await loadReferralUI(uid); showToast('✅ নতুন Referral Link তৈরি হয়েছে!','#22c55e'); }
            catch(e){ hideRealLoading(); showToast('❌ Referral link তৈরি করা যায়নি।','#ff4444'); }
        }
        async function copyReferralLink(){
            const uid=auth.currentUser?.uid; if(!uid) return showToast(t('pleaseLogin'),'#ff4444');
            try{ const code=await ensureReferralCode(uid); const link=referralBaseUrl()+'?ref='+encodeURIComponent(code); const done=()=>showToast('✅ Referral Link copied!','#22c55e'); if(navigator.clipboard&&window.isSecureContext) navigator.clipboard.writeText(link).then(done); else fallbackCopyKey(link); await loadReferralUI(uid); }catch(e){showToast('Copy failed!','#ff4444');}
        }
        async function shareReferralLink(){
            const uid=auth.currentUser?.uid; if(!uid) return showToast(t('pleaseLogin'),'#ff4444');
            try{
                // Reuse current code so views + completes stay on the same link
                const code=await ensureReferralCode(uid);
                const link=referralBaseUrl()+'?ref='+encodeURIComponent(code);
                const inp=document.getElementById('referralLinkInput'); if(inp) inp.value=link;
                const shareData={
                    title:'NEAMOT 2.0 Referral',
                    text:'NEAMOT 2.0 account খুলুন এবং আমার referral link ব্যবহার করুন।',
                    url:link
                };
                if(navigator.share){
                    await navigator.share(shareData);
                }else if(navigator.clipboard&&window.isSecureContext){
                    await navigator.clipboard.writeText(link);
                    showToast('✅ Referral Link copied!','#22c55e');
                }else{
                    fallbackCopyKey(link);
                    showToast('✅ Referral Link copied!','#22c55e');
                }
                await loadReferralUI(uid);
            }catch(e){
                if(e.name!=='AbortError') showToast('Share করা যায়নি।','#ff9800');
            }
        }
        async function getReferralDiscountForUser(uid){
            if(!uid) return 0;
            try{
                const completed = await countOwnerDailyCompletions(uid, referralDayKey());
                return completed >= REFERRAL_DAILY_LIMIT ? REFERRAL_DISCOUNT_PERCENT : 0;
            }catch(e){ return 0; }
        }
        // All panels in SAFE LOCATION / MAIN ID section (keep in sync with generateCategorizedGrid)
        const SAFE_MAIN_ID_PANEL_IDS = [12, 13, 14, 15, 16, 17, 25, 26, 31];
        function isSafeMainIdPanel(id){
            return SAFE_MAIN_ID_PANEL_IDS.includes(Number(id));
        }
        async function getDiscountedTotal(panelId, plan, quantity, baseTotal){
            const user=auth.currentUser; if(!user || !isSafeMainIdPanel(panelId)) return {total:baseTotal,discount:0};
            const discount=await getReferralDiscountForUser(user.uid); return {total:baseTotal*(1-discount/100),discount};
        }

        function updateProfileUI(user) {
            if (!user) return;
            const profileAvatar = document.getElementById('profile-initials');
            if (profileAvatar && user.photoURL) {
                profileAvatar.style.backgroundImage = `url(${user.photoURL})`;
                profileAvatar.style.backgroundSize = 'cover';
                profileAvatar.style.backgroundPosition = 'center';
                profileAvatar.innerText = '';
            } else if (profileAvatar) {
                profileAvatar.style.backgroundImage = '';
                profileAvatar.style.backgroundSize = '';
                profileAvatar.style.backgroundPosition = '';
                profileAvatar.innerText = ((user.displayName || user.email || 'U').trim().charAt(0) || 'U').toUpperCase();
            }
            const drawerAvatar = document.getElementById('drawerAvatar');
            if (drawerAvatar && user.photoURL) {
                drawerAvatar.style.backgroundImage = `url(${user.photoURL})`;
                drawerAvatar.style.backgroundSize = 'cover';
                drawerAvatar.style.backgroundPosition = 'center';
                drawerAvatar.innerText = '';
            } else if (drawerAvatar) {
                drawerAvatar.style.backgroundImage = '';
                drawerAvatar.style.backgroundSize = '';
                drawerAvatar.style.backgroundPosition = '';
                drawerAvatar.innerText = ((user.displayName || user.email || 'U').trim().charAt(0) || 'U').toUpperCase();
            }
            updateDrawerUI(user);
        }

        function openEditProfile() {
            const user = auth.currentUser;
            if (!user) {
                showToast(t('pleaseLogin'), "#ff4444");
                return;
            }
            document.querySelector('.edit-profile-box')?.classList.add('white-edit');
            document.getElementById('edit-username').value = document.getElementById('profile-username-val').innerText || "";
            document.getElementById('edit-phone').value = document.getElementById('profile-phone').innerText === 'N/A' ? '' : document.getElementById('profile-phone').innerText || '';
            document.getElementById('edit-email').value = user.email || document.getElementById('profile-email').innerText || '';
            document.getElementById('edit-password').value = "";
            document.getElementById('edit-confirm-password').value = "";
            selectedPhotoFile = null;

            const preview = document.getElementById('editPhotoPreview');
            preview.style.backgroundImage = '';
            preview.style.backgroundSize = '';
            preview.style.backgroundPosition = '';
            const initial = document.getElementById('editPhotoInitial');
            if (initial) {
                initial.style.display = 'flex';
                const name = document.getElementById('profile-display-name').innerText || 'U';
                initial.innerText = name.charAt(0).toUpperCase();
            }

            if (user.photoURL) {
                preview.style.backgroundImage = `url(${user.photoURL})`;
                preview.style.backgroundSize = 'cover';
                preview.style.backgroundPosition = 'center';
                if (initial) initial.style.display = 'none';
            }

            document.getElementById('editProfileOverlay').classList.add('active');
            updateMobileBackButton();
        }

        function closeEditProfile() {
            document.getElementById('editProfileOverlay').classList.remove('active');
            updateMobileBackButton();
        }

        function saveProfileEdit(e) {
            e.preventDefault();
            const user = auth.currentUser;
            if (!user) {
                showToast(t('pleaseLogin'), "#ff4444");
                return;
            }

            const newUsername = document.getElementById('edit-username').value.trim();
            const newPhone = normalizePhoneNumber(document.getElementById('edit-phone')?.value.trim() || '');
            const newEmail = document.getElementById('edit-email')?.value.trim() || user.email || '';
            const newPassword = document.getElementById('edit-password').value;
            const confirmPassword = document.getElementById('edit-confirm-password').value;

            if (!newUsername) {
                showToast("Username cannot be empty!", "#ff4444");
                return;
            }
            if (!newEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
                showToast("Valid email is required!", "#ff4444"); return;
            }

            const saveBtn = document.getElementById('saveEditBtn');
            saveBtn.disabled = true;
            saveBtn.innerHTML = '<span class="edit-loading-spinner"></span> Saving...';

            let passwordChanged = (newPassword.length > 0);

            if (passwordChanged && newPassword.length < 6) {
                showToast("New password must be at least 6 characters!", "#ff4444");
                saveBtn.innerHTML = 'Save Changes';
                saveBtn.disabled = false;
                return;
            }
            if (passwordChanged && newPassword !== confirmPassword) {
                showToast("Passwords do not match!", "#ff4444");
                saveBtn.innerHTML = 'Save Changes';
                saveBtn.disabled = false;
                return;
            }

            let updateChain = Promise.resolve();

            updateChain = updateChain.then(async () => {
                if (newEmail !== (user.email || '')) {
                    await user.updateEmail(newEmail);
                }
                await database.ref('User/' + user.uid).update({username:newUsername,email:newEmail,phone:newPhone});
            });

            if (passwordChanged) {
                updateChain = updateChain.then(() => {
                    return user.updatePassword(newPassword);
                }).catch((err) => {
                    if (err.code === 'auth/requires-recent-login') {
                        showToast("Please re-login to change password! 🔐", "#ff4444");
                    } else {
                        showToast("Password change failed: " + err.message, "#ff4444");
                    }
                    throw err;
                });
            }

            updateChain.then(() => {
                saveBtn.innerHTML = '✅ Saved!';
                setTimeout(() => {
                    saveBtn.innerHTML = 'Save Changes';
                    saveBtn.disabled = false;
                }, 1500);
                closeEditProfile();
                showNotification('✅', t('profile'), 'Your profile has been updated successfully.', 'OK, Got it!',
                    true);
                document.getElementById('profile-username-val').innerText = newUsername;
                document.getElementById('profile-display-name').innerText = newUsername;
                document.getElementById('profile-phone').innerText = newPhone || 'N/A';
                document.getElementById('profile-email').innerText = newEmail;
                updateProfileUI(user);
                loadSavedOrdersLive();
            }).catch((error) => {
                saveBtn.innerHTML = 'Save Changes';
                saveBtn.disabled = false;
                if (error.code !== 'auth/requires-recent-login') {
                    showToast("Error: " + (error.message || "Unknown error"), "#ff4444");
                }
            });
        }

        function handleLogout() {
            if (!auth.currentUser) {
                showToast(t('pleaseLogin'), "#ff4444");
                return;
            }
            showLogoutDialog();
        }

        function confirmLogout() {
            closeLogoutDialog();
            showToast('Logging out...', '#6b7280', '⏳');
            if (auth.currentUser) {
                database.ref('User/' + auth.currentUser.uid).off();
            }
            auth.signOut().then(() => {
                showNotification('👋', t('logout'), 'You have been logged out successfully.', 'OK, Got it!');
                switchTab('home');
                updateMobileBackButton();
                updateDrawerUI(null);
            }).catch(() => {
                showToast("Logout failed. Please try again.", "#ff4444", '⚠️');
            });
        }

        // ─── SEPARATE LOGIN SYSTEM ───────────────────────────────
        function openLogin() {
            const view = document.getElementById('login-view');
            if (!view) return;
            view.classList.add('active');
            view.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            setTimeout(() => document.getElementById('login-email')?.focus(), 50);
        }

        function closeLogin() {
            const view = document.getElementById('login-view');
            if (!view) return;
            view.classList.remove('active');
            view.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }


        async function resolveLoginEmail(identifier){
            const value=String(identifier||'').trim();
            if(!value) throw new Error('EMPTY_IDENTIFIER');
            if(value.includes('@')) return value.toLowerCase();
            const phone=normalizePhoneNumber(value);
            if(!phone) throw new Error('INVALID_IDENTIFIER');
            const snap=await database.ref('User').orderByChild('phone').equalTo(phone).once('value');
            let found=null; snap.forEach(ch=>{ if(!found) found=ch.val()||null; });
            if(!found || !found.email) throw new Error('PHONE_NOT_FOUND');
            return found.email;
        }

        async function handleLoginSubmit(e) {
            e.preventDefault();
            const emailEl = document.getElementById('login-email');
            const passEl = document.getElementById('login-password');
            const email = emailEl.value.trim();
            const password = passEl.value;
            const btn = document.getElementById('login-submit-btn');

            emailEl.style.borderColor = '';
            passEl.style.borderColor = '';
            if (!email) {
                emailEl.style.borderColor = '#ff4444';
                emailEl.focus();
                return showToast('❌ Please enter your Phone Number or Email!', '#ff4444', '⚠️');
            }
            if (!password) {
                passEl.style.borderColor = '#ff4444';
                passEl.focus();
                return showToast('❌ Please enter your password!', '#ff4444', '⚠️');
            }

            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> LOGGING IN...';
            // Inline button loading instead of full-screen overlay
            // showRealLoading();

            resolveLoginEmail(email).then(loginEmail => auth.signInWithEmailAndPassword(loginEmail, password))
                .then(async () => {
                    const ok = await completeIncomingReferral(auth.currentUser?.uid);
                    if (ok) showToast('✅ Referral counted for inviter!', '#22c55e', '🎁');
                    return ok;
                })
                .then(() => {
                    btn.disabled = false;
                    btn.textContent = 'LOGIN NOW';
                    document.querySelector('#login-view form')?.reset();
                    closeLogin();
                    showNotification('✅', 'Login Successful!', 'আপনার account সফলভাবে login হয়েছে।', 'OK, Got it!', true);
                    switchTab('home');
                    updateDrawerUI(auth.currentUser);
                    loadReferralUI(auth.currentUser.uid);
                    loadSavedOrdersLive();
                })
                .catch(error => {
                    btn.disabled = false;
                    btn.textContent = 'LOGIN NOW';
                    if (error.message === 'PHONE_NOT_FOUND') {
                        showToast('❌ এই Phone Number দিয়ে কোনো account পাওয়া যায়নি!', '#ff4444', '⚠️');
                    } else if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password' || error.code ===
                        'auth/user-not-found') {
                        showToast('❌ Phone/Email অথবা Password ভুল!', '#ff4444', '⚠️');
                    } else if (error.code === 'auth/invalid-email') {
                        showToast('❌ Invalid Gmail/Email!', '#ff4444', '⚠️');
                    } else if (error.code === 'auth/too-many-requests') {
                        showToast('❌ Too many attempts. Please try again later!', '#ff4444', '⏳');
                    } else {
                        showToast('❌ Login failed: ' + error.message, '#ff4444', '⚠️');
                    }
                });
        }

        // ─── SEPARATE SIGN UP SYSTEM ─────────────────────────────
        // ─── SEPARATE SIGN UP SYSTEM ─────────────────────────────
        function openSignUp() {
            const view = document.getElementById('signup-view');
            if (!view) return;
            view.classList.add('active');
            view.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            setTimeout(() => document.getElementById('signup-name')?.focus(), 50);
        }

        function closeSignUp() {
            const view = document.getElementById('signup-view');
            if (!view) return;
            view.classList.remove('active');
            view.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }

        function handleSignupSubmit(e) {
            e.preventDefault();
            const name = document.getElementById('signup-name').value.trim();
            const phone = normalizePhoneNumber(document.getElementById('signup-phone').value.trim());
            const email = document.getElementById('signup-email').value.trim();
            const password = document.getElementById('signup-password').value;
            const confirm = document.getElementById('signup-confirm').value;
            const btn = document.getElementById('signup-submit-btn');

            if (!name) return showToast('❌ Please enter your full name!', '#ff4444');
            if (!phone) return showToast('❌ Please enter your phone number!', '#ff4444');
            if (!email) return showToast('❌ Please enter your email!', '#ff4444');
            if (password.length < 6) return showToast('❌ Password must be at least 6 characters!', '#ff4444');
            if (password !== confirm) return showToast('❌ Passwords do not match!', '#ff4444');

            showRealLoading();
            btn.disabled = true;
            btn.textContent = 'CREATING ACCOUNT...';

            auth.createUserWithEmailAndPassword(email, password)
                .then(async ({ user }) => {
                    await Promise.all([
                        user.sendEmailVerification().catch(() => null),
                        database.ref('User/' + user.uid).set({
                            username: name,
                            email: email,
                            phone: phone,
                            totalSpent: 0,
                            balance: 0,
                            createdAt: Date.now()
                        })
                    ]);
                    await completeIncomingReferral(user.uid);
                    return user;
                })
                .then(() => {
                    hideRealLoading();
                    btn.disabled = false;
                    btn.textContent = 'SIGN UP NOW';
                    document.querySelector('#signup-view form')?.reset();
                    closeSignUp();
                    showNotification('🎉', 'Sign Up Successful!', 'আপনার account সফলভাবে তৈরি হয়েছে।', 'OK, Got it!', true);
                    switchTab('home');
                    updateDrawerUI(auth.currentUser);
                    loadSavedOrdersLive();
                    if (auth.currentUser) loadReferralUI(auth.currentUser.uid);
                })
                .catch(error => {
                    hideRealLoading();
                    btn.disabled = false;
                    btn.textContent = 'SIGN UP NOW';
                    if (error.code === 'auth/email-already-in-use') {
                        showToast('❌ এই Email দিয়ে account already আছে!', '#ff4444');
                    } else if (error.code === 'auth/invalid-email') {
                        showToast('❌ Invalid email address!', '#ff4444');
                    } else {
                        showToast('❌ Sign Up failed: ' + error.message, '#ff4444');
                    }
                });
        }

        function navigateToAuth(mode) {
            authMode = mode === 'login' ? 'login' : 'register';
            const authBox = document.getElementById('auth-form-box');
            const title = document.getElementById('auth-title');
            const subtitle = document.getElementById('auth-subtitle');
            const submitBtn = document.getElementById('auth-submit-btn');
            const usernameGroup = document.getElementById('username-group');
            const phoneGroup = document.getElementById('phone-group');
            const confirmPassGroup = document.getElementById('confirm-pass-group');
            const toggleText = document.getElementById('auth-toggle-text');
            const googleBtn = document.querySelector('#auth-form-box .google-login-btn');
            const emailInput = document.getElementById('acc-email');
            const passInput = document.getElementById('acc-pass');
            const confirmInput = document.getElementById('acc-confirm-pass');

            if (!authBox) return;
            authBox.classList.toggle('login-mode', authMode === 'login');
            authBox.classList.toggle('register-mode', authMode === 'register');

            if (authMode === 'login') {
                if (title) title.textContent = 'Login';
                if (subtitle) subtitle.textContent = 'Enter your credentials to access your account';
                if (submitBtn) submitBtn.textContent = 'LOGIN NOW';
                if (usernameGroup) usernameGroup.style.display = 'none';
                if (phoneGroup) phoneGroup.style.display = 'none';
                if (confirmPassGroup) confirmPassGroup.style.display = 'none';
                if (googleBtn) googleBtn.style.display = 'flex';
                if (toggleText) toggleText.innerHTML =
                    `Don't have an account? <span onclick="openSignUp()" style="color:#20c8f5;font-weight:800;text-decoration:underline;cursor:pointer;">Sign Up Now</span>`;
                if (emailInput) emailInput.required = true;
                if (passInput) passInput.required = true;
                if (confirmInput) confirmInput.required = false;
                if (emailInput) emailInput.placeholder = 'Phone number or email';
            } else {
                if (title) title.textContent = 'Register';
                if (subtitle) subtitle.textContent = 'Create your account';
                if (submitBtn) submitBtn.textContent = 'REGISTER NOW';
                if (usernameGroup) usernameGroup.style.display = 'flex';
                if (phoneGroup) phoneGroup.style.display = 'flex';
                if (confirmPassGroup) confirmPassGroup.style.display = 'flex';
                if (googleBtn) googleBtn.style.display = 'none';
                if (toggleText) toggleText.innerHTML =
                    `Already have an account? <span onclick="navigateToAuth('login')" style="color:#20c8f5;font-weight:800;text-decoration:underline;cursor:pointer;">Login Now</span>`;
                if (emailInput) emailInput.required = true;
                if (passInput) passInput.required = true;
                if (confirmInput) confirmInput.required = true;
                if (emailInput) emailInput.placeholder = 'email@example.com';
            }
        }

        function toggleAuthMode() {
            navigateToAuth(authMode === 'login' ? 'register' : 'login');
        }

        // ─── HANDLE AUTH SUBMIT - FIXED ──────────────────────────
        function handleAuthSubmit(e) {
            e.preventDefault();
            const email = document.getElementById('acc-email').value.trim();
            const password = document.getElementById('acc-pass').value;
            const username = document.getElementById('acc-username').value.trim();
            const phone = normalizePhoneNumber(document.getElementById('acc-phone').value.trim());
            const confirmPass = document.getElementById('acc-confirm-pass').value;
            const submitBtn = document.getElementById('auth-submit-btn');

            if (authMode === 'login') {
                if (!email) return showToast('❌ Please enter your Phone Number or Email!', '#ff4444');
                if (!password) return showToast('❌ Please enter your password!', '#ff4444');
                submitBtn.disabled = true;
                submitBtn.innerText = 'LOGGING IN...';
                showRealLoading();
                resolveLoginEmail(email).then(loginEmail => auth.signInWithEmailAndPassword(loginEmail, password))
                    .then(() => completeIncomingReferral(auth.currentUser?.uid))
                    .then(() => {
                        hideRealLoading();
                        submitBtn.disabled = false;
                        submitBtn.innerText = 'LOGIN NOW';
                        clearAuthInputs();
                        showNotification('✅', 'Login Successful!', 'আপনার account সফলভাবে login হয়েছে।', 'OK, Got it!', true);
                        switchTab('home');
                        updateDrawerUI(auth.currentUser);
                        loadReferralUI(auth.currentUser.uid);
                        loadSavedOrdersLive();
                    })
                    .catch((error) => {
                        hideRealLoading();
                        submitBtn.disabled = false;
                        submitBtn.innerText = 'LOGIN NOW';
                        if (error.message === 'PHONE_NOT_FOUND') {
                            showToast('❌ এই Phone Number দিয়ে কোনো account পাওয়া যায়নি!', '#ff4444');
                        } else if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password' || error.code ===
                            'auth/user-not-found') {
                            showToast('❌ Phone/Email অথবা Password ভুল!', '#ff4444');
                        } else if (error.code === 'auth/invalid-email') {
                            showToast('❌ Invalid Gmail/Email!', '#ff4444');
                        } else if (error.code === 'auth/too-many-requests') {
                            showToast('❌ Too many attempts. Please try again later!', '#ff4444');
                        } else {
                            showToast('❌ Login failed: ' + error.message, '#ff4444');
                        }
                    });
                return;
            }

            if (!username) return showToast('❌ Please enter your full name!', '#ff4444');
            if (!phone) return showToast('❌ Please enter your phone number!', '#ff4444');
            if (!email) return showToast('❌ Please enter your email!', '#ff4444');
            if (password.length < 6) return showToast('❌ Password must be at least 6 characters!', '#ff4444');
            if (password !== confirmPass) return showToast('❌ Passwords do not match!', '#ff4444');

            showRealLoading();
            submitBtn.disabled = true;
            submitBtn.innerText = 'CREATING ACCOUNT...';
            auth.createUserWithEmailAndPassword(email, password)
                .then(({ user }) => database.ref('User/' + user.uid).set({
                    username,
                    email,
                    phone,
                    totalSpent: 0,
                    balance: 0,
                    createdAt: Date.now()
                }).then(() => completeIncomingReferral(user.uid)))
                .then(() => {
                    hideRealLoading();
                    submitBtn.disabled = false;
                    submitBtn.innerText = 'REGISTER NOW';
                    clearAuthInputs();
                    showNotification('🎉', 'Registration Successful!', 'আপনার account সফলভাবে তৈরি হয়েছে।', 'OK, Got it!', true);
                    switchTab('home');
                    updateDrawerUI(auth.currentUser);
                    loadSavedOrdersLive();
                })
                .catch((error) => {
                    hideRealLoading();
                    submitBtn.disabled = false;
                    submitBtn.innerText = 'REGISTER NOW';
                    if (error.code === 'auth/email-already-in-use') {
                        showToast('❌ এই Email দিয়ে account already আছে!', '#ff4444');
                    } else if (error.code === 'auth/invalid-email') {
                        showToast('❌ Invalid email address!', '#ff4444');
                    } else {
                        showToast('❌ Registration failed: ' + error.message, '#ff4444');
                    }
                });
        }

        function handleGoogleLogin() {
            const provider = new firebase.auth.GoogleAuthProvider();
            provider.setCustomParameters({ prompt: 'select_account' });
            showRealLoading();
            auth.signInWithPopup(provider)
                .then(({ user }) => {
                    return database.ref('User/' + user.uid).once('value').then(snapshot => {
                        const existing = snapshot.val() || {};
                        const wasNew = !snapshot.exists();
                        return database.ref('User/' + user.uid).update({
                            username: existing.username || user.displayName || (user.email ? user.email.split('@')[
                                0] : 'User'),
                            email: user.email || existing.email || '',
                            phone: existing.phone || '',
                            photoURL: user.photoURL || existing.photoURL || '',
                            totalSpent: existing.totalSpent || 0,
                            balance: existing.balance || 0,
                            createdAt: existing.createdAt || Date.now()
                        });
                    });
                })
                .then(() => completeIncomingReferral(auth.currentUser?.uid))
                .then(() => {
                    hideRealLoading();
                    showNotification('✅', 'Google Login Successful!', 'আপনার Google account সফলভাবে login হয়েছে।', 'OK, Got it!',
                        true);
                    switchTab('home');
                    updateDrawerUI(auth.currentUser);
                    loadSavedOrdersLive();
                })
                .catch(error => {
                    hideRealLoading();
                    if (error.code === 'auth/popup-closed-by-user') return;
                    showToast('❌ Google Login failed: ' + error.message, '#ff4444');
                });
        }

        function clearAuthInputs() {
            document.getElementById('acc-username').value = "";
            document.getElementById('acc-phone').value = "";
            document.getElementById('acc-email').value = "";
            document.getElementById('acc-pass').value = "";
            document.getElementById('acc-confirm-pass').value = "";
        }

        function loadTotalSpent(uid) {
            if (!uid) return;
            database.ref('User/' + uid + '/totalSpent').on('value', (snapshot) => {
                const spent = snapshot.val() || 0;
                totalSpentAmount = spent;
                document.getElementById('profile-total-spent').innerText = spent.toFixed(0) + ' TK';
            });
        }

        function loadUserBalance(uid) {
            if (!uid) return;
            database.ref('User/' + uid + '/balance').on('value', (snapshot) => {
                const balance = snapshot.val() || 0;
                document.getElementById('profile-balance').innerText = balance.toFixed(0) + ' TK';
                document.getElementById('headerBalanceAmount').innerText = balance;
                syncPanelHeaderUI(auth.currentUser, balance);
                const headerBalance = document.getElementById('headerBalanceDisplay');
                if (uid) {
                    headerBalance.classList.add('show');
                } else {
                    headerBalance.classList.remove('show');
                }
            });
        }

        // ─── UPDATE USER BALANCE ─────────────────────────────────
        function updateUserBalance(uid, amount, operation) {
            return new Promise((resolve, reject) => {
                const cleanAmount = parseFloat(amount);
                if (isNaN(cleanAmount) || cleanAmount <= 0) {
                    reject(new Error('Invalid amount: ' + amount));
                    return;
                }

                const balanceRef = database.ref('User/' + uid + '/balance');
                balanceRef.transaction((currentBalance) => {
                    if (currentBalance === null) currentBalance = 0;
                    if (operation === 'add') {
                        return currentBalance + cleanAmount;
                    } else if (operation === 'subtract') {
                        return currentBalance - cleanAmount;
                    }
                    return currentBalance;
                }, (error, committed, snapshot) => {
                    if (error) {
                        reject(error);
                    } else if (committed) {
                        resolve(snapshot.val());
                    } else {
                        reject(new Error('Transaction not committed'));
                    }
                });
            });
        }

        // ─── FUNDS HISTORY ADMIN APPROVAL ──────────────────────────
        function listenFundsApproval() {
            const processedKeys = new Set();

            database.ref('funds').on('child_added', (snapshot) => {
                const uid = snapshot.key;
                const funds = snapshot.val();
                if (funds) {
                    Object.keys(funds).forEach(key => {
                        const item = funds[key];
                        const uniqueKey = uid + '_' + key;

                        if (processedKeys.has(uniqueKey)) return;

                        if (item.status === 'Approved') {
                            const userUid = uid;
                            let amount = parseFloat(item.amount);

                            if (isNaN(amount) || amount <= 0) {
                                console.warn("Invalid amount:", item.amount);
                                return;
                            }

                            processedKeys.add(uniqueKey);

                            console.log("Adding exact amount:", amount, "TK to user:", userUid);

                            updateUserBalance(userUid, amount, 'add')
                                .then((newBalance) => {
                                    return database.ref('funds/' + userUid + '/' + key + '/status').set('Paid');
                                })
                                .then(() => {
                                    return database.ref('User/' + userUid + '/totalSpent').transaction((current) => {
                                        return (current || 0) + amount;
                                    });
                                })
                                .then(() => {
                                    if (auth.currentUser && auth.currentUser.uid === userUid) {
                                        loadUserBalance(userUid);
                                        loadFundsHistory(userUid);
                                    }
                                    showToast("✅ Fund approved! Added " + amount + " TK to user's balance.",
                                        "#22c55e");
                                })
                                .catch(err => {
                                    console.warn("Balance update error:", err);
                                    processedKeys.delete(uniqueKey);
                                });
                        }
                    });
                }
            });
        }

        // ─── AUTH STATE CHANGED ──────────────────────────────────
        auth.onAuthStateChanged((user) => {
            try { listenPanelApis(); } catch (e) {}
            const authFormBox = document.getElementById('auth-form-box');
            const profileViewBox = document.getElementById('profile-view-box');
            const editOverlay = document.getElementById('editProfileOverlay');
            const signupCtaCard = document.getElementById('signup-cta-card');
            updateDrawerUI(user);

            if (user) {
                updateAccountVerificationBadge(user);
                closeLogin();
                authFormBox.style.display = 'none';
                if (signupCtaCard) signupCtaCard.style.display = 'none';
                profileViewBox.style.display = 'block';
                editOverlay.classList.remove('active');
                document.getElementById('profile-email').innerText = user.email;
                document.getElementById('profile-display-name').innerText = "Loading...";
                document.getElementById('profile-username-val').innerText = "Loading...";
                document.getElementById('profile-phone').innerText = "Loading...";

                // If opened via referral link, complete referral on any successful auth
                const pendingRef = incomingReferralCode || getIncomingReferralCode();
                if (pendingRef) {
                    completeIncomingReferral(user.uid).then((ok) => {
                        if (ok) console.log('[Referral] auth-state completion ok');
                    }).catch(() => {});
                }

                database.ref('User/' + user.uid).on('value', (snapshot) => {
                    const userData = snapshot.val();
                    let activeName = "";
                    let photoUrl = null;
                    let phoneNumber = "N/A";
                    if (userData) {
                        activeName = userData.username || user.displayName || user.email.split('@')[0];
                        photoUrl = userData.photoURL || user.photoURL || null;
                        phoneNumber = userData.phone || "N/A";
                        if (userData.totalSpent !== undefined) {
                            totalSpentAmount = userData.totalSpent || 0;
                            document.getElementById('profile-total-spent').innerText = totalSpentAmount.toFixed(0) +
                            ' TK';
                            updatePremiumMemberBadge(totalSpentAmount);
                        }
                        if (userData.balance !== undefined) {
                            document.getElementById('profile-balance').innerText = userData.balance.toFixed(0) + ' TK';
                            document.getElementById('headerBalanceAmount').innerText = userData.balance;
                            document.getElementById('headerBalanceDisplay').classList.add('show');
                        }
                        if (userData.email) {
                            document.getElementById('profile-email').innerText = userData.email;
                        }
                        if (userData.phone) {
                            document.getElementById('profile-phone').innerText = userData.phone;
                        }
                    } else {
                        activeName = user.displayName || user.email.split('@')[0];
                        photoUrl = user.photoURL || null;
                        database.ref('User/' + user.uid).update({
                            username: activeName,
                            email: user.email,
                            phone: "",
                            totalSpent: 0,
                            balance: 0,
                            photoURL: photoUrl || ""
                        });
                    }
                    document.getElementById('profile-display-name').innerText = activeName;
                    document.getElementById('profile-username-val').innerText = activeName;
                    document.getElementById('profile-phone').innerText = phoneNumber;
                    updateProfileUI(user);
                    loadReferralUI(user.uid);
                }, (error) => {
                    let fallbackErrName = user.displayName || user.email.split('@')[0];
                    document.getElementById('profile-username-val').innerText = fallbackErrName;
                    document.getElementById('profile-display-name').innerText = fallbackErrName;
                    updateProfileUI(user);
                });
                updateTotalOrdersCount();
                loadSavedOrdersLive();
                loadTotalSpent(user.uid);
                loadUserBalance(user.uid);
                loadFundsHistory(user.uid);
                updateAccountVerificationBadge(user);
                checkAdminStatus(user);
            } else {
                authMode = 'login';
                authFormBox.style.display = 'block';
                if (signupCtaCard) signupCtaCard.style.display = 'none';
                navigateToAuth('login');
                profileViewBox.style.display = 'none';
                editOverlay.classList.remove('active');
                document.getElementById('profile-total-orders').innerText = "0";
                document.getElementById('profile-total-spent').innerText = "0 TK";
                document.getElementById('profile-balance').innerText = "0 TK";
                document.getElementById('profile-phone').innerText = "N/A";
                document.getElementById('headerBalanceAmount').innerText = "0";
                document.getElementById('headerBalanceDisplay').classList.remove('show');
                const avatar = document.getElementById('profile-initials');
                avatar.style.backgroundImage = "";
                avatar.style.backgroundSize = "";
                avatar.style.backgroundPosition = "";
                avatar.innerText = "U";
                const verifyContainer = document.getElementById('verify-items-container');
                if (verifyContainer) {
                    verifyContainer.innerHTML =
                        `<div class="empty-verify-msg"><i class="fas fa-lock"></i> দয়া করে লগইন করুন আপনার অর্ডার দেখতে।</div>`;
                }
                const ordersContainer = document.getElementById('orders-items-container');
                if (ordersContainer) {
                    ordersContainer.innerHTML =
                        `<div class="empty-verify-msg"><i class="fas fa-lock"></i> দয়া করে লগইন করুন আপনার অর্ডার দেখতে।</div>`;
                }
                const fundsContainer = document.getElementById('fundsHistoryContainer');
                if (fundsContainer) {
                    fundsContainer.innerHTML = `<div class="funds-history-empty">No fund history yet.</div>`;
                }
                document.getElementById('orderCountBadge').innerText = "0";
                document.getElementById('ordersCountBadge').innerText = "0";
                updateDrawerUI(null);
                document.getElementById('adminMsgArea').style.display = 'none';
            }
            generateCategorizedGrid();
            updateMobileBackButton();
            if (firebaseDataLoaded && pendingHashId) {
                const id = pendingHashId;
                pendingHashId = null;
                if (!panelOpenedFromHash) {
                    panelOpenedFromHash = true;
                    const panel = getPanelById(id);
                    if (panel) {
                        selectedId = id;
                        openPricePanel(id);
                    }
                }
            }
        });

        function checkAdminStatus(user) {
            const adminArea = document.getElementById('adminMsgArea');
            if (user && ADMIN_EMAILS.includes(user.email)) {
                adminArea.style.display = 'block';
            } else {
                adminArea.style.display = 'none';
            }
        }

        function sendAdminMessage() {
            const user = auth.currentUser;
            if (!user || !ADMIN_EMAILS.includes(user.email)) {
                showToast("You are not authorized!", "#ff4444");
                return;
            }
            const msg = document.getElementById('adminMessageInput').value.trim();
            if (!msg) {
                showToast("Please write a message!", "#ff4444");
                return;
            }
            if (!currentOrderKey) {
                showToast("No order selected! Please open a specific order from verify tab.", "#ff4444");
                return;
            }
            database.ref('orders/' + currentOrderKey + '/adminMessage').set(msg)
                .then(() => {
                    showToast("✅ Admin message sent successfully!", "#22c55e");
                    document.getElementById('adminMessageInput').value = '';
                    document.getElementById('adminMsgDisplay').style.display = 'block';
                    document.getElementById('adminMsgDisplay').innerHTML = `<strong>📩 Sent:</strong> ${msg}`;
                    if (msg.includes('t.me/')) {
                        const linkMatch = msg.match(/https?:\/\/t\.me\/[^\s]+/);
                        if (linkMatch) {
                            paidGroupLink = linkMatch[0];
                            updatePaidGroupLinkInOrder(paidGroupLink);
                        }
                    }
                })
                .catch(err => {
                    showToast("Error: " + err.message, "#ff4444");
                });
        }

        function updatePaidGroupLinkInOrder(link) {
            const paidLinkElements = document.querySelectorAll('.paid-link');
            paidLinkElements.forEach(el => {
                el.href = link;
            });
        }

        
        function navClickAnim(el) {
            if (!el) return;
            el.classList.remove('nav-click-anim');
            void el.offsetWidth;
            el.classList.add('nav-click-anim');
            setTimeout(function() { el.classList.remove('nav-click-anim'); }, 400);
        }

        
        // ─── Transaction ID History (Approved panels only) ───
        
        // ─── KEY RESET (SAFE LOCATION MAIN ID: 13, 15, 26, 31) ───
        function openKeyResetPage() {
            if (!auth.currentUser) {
                showToast(t('pleaseLogin'), '#ff4444');
                if (typeof openLogin === 'function') openLogin();
                return;
            }
            ['home-view','verify-view','orders-view','account-view','add-funds-view'].forEach(function(id) {
                const el = document.getElementById(id);
                if (el) { el.style.display = 'none'; el.classList.remove('active-view'); }
            });
            const kr = document.getElementById('key-reset-view');
            if (kr) kr.style.display = 'block';
            if (window.kr2Init) window.kr2Init();
            try { if ((window.location.hash || '').toLowerCase() !== '#keysreset') setRouteHash('keysreset', true); } catch(e) {}
            document.querySelectorAll('.nav-item').forEach(function(n){ n.classList.remove('active'); });
        }

        function closeKeyResetPage() {
            const kr = document.getElementById('key-reset-view');
            if (kr) kr.style.display = 'none';
        }

        function openTxnIdHistory() {
            switchTab('orders');
            // Filter orders list to show only Approved / Success
            setTimeout(function() {
                const container = document.getElementById('orders-items-container');
                const titleEl = document.querySelector('#orders-view .verify-title');
                if (titleEl) {
                    titleEl.innerHTML = '<i class="fas fa-receipt"></i> Transaction ID History';
                }
                if (!container) return;
                const items = container.querySelectorAll('.verify-item-modern, .order-item, [class*="order"]');
                let shown = 0;
                items.forEach(function(item) {
                    const statusEl = item.querySelector('.item-status, .status');
                    const statusText = (statusEl ? statusEl.textContent : item.textContent || '').toLowerCase();
                    const isApproved = statusText.includes('approved') || statusText.includes('success') || statusText.includes('complete') || statusText.includes('paid');
                    if (isApproved) {
                        item.style.display = '';
                        shown++;
                    } else {
                        item.style.display = 'none';
                    }
                });
                // If empty message and nothing approved
                const emptyMsg = container.querySelector('.empty-verify-msg');
                if (emptyMsg) {
                    emptyMsg.style.display = shown === 0 ? 'block' : 'none';
                    if (shown === 0) {
                        emptyMsg.innerHTML = '<i class="fas fa-inbox"></i><br>No approved transaction history yet.';
                    }
                }
            }, 300);
        }

        function switchTab(tab, fromRoute) {
            if (tab === 'addfunds' && !auth.currentUser) {
                if (typeof openLogin === 'function') openLogin();
                else showToast('Please login first!', '#ff4444');
                return;
            }
            currentTab = tab;
            if (typeof closeKeyResetPage === 'function') closeKeyResetPage();
            const homeView = document.getElementById('home-view');
            const verifyView = document.getElementById('verify-view');
            const ordersView = document.getElementById('orders-view');
            const accountView = document.getElementById('account-view');
            const addFundsView = document.getElementById('add-funds-view');
            const homeSlider = document.getElementById('home-slider-container');
            const navHome = document.getElementById('nav-home-btn');
            const navVerify = document.getElementById('nav-verify-btn');
            const navOrders = document.getElementById('nav-orders-btn');
            const navAcc = document.getElementById('nav-acc-btn');
            const navFunds = document.getElementById('nav-funds-btn');

            if (homeView) homeView.style.display = 'none';
            if (verifyView) verifyView.style.display = 'none';
            if (ordersView) ordersView.style.display = 'none';
            if (accountView) accountView.classList.remove('active-view');
            if (accountView) accountView.style.display = 'none';
            if (addFundsView) addFundsView.classList.remove('active-view');
            if (addFundsView) addFundsView.style.display = 'none';
            if (homeSlider) homeSlider.style.display = 'none';

            if (tab === 'home') {
                if (homeView) homeView.style.display = 'block';
                if (homeSlider) homeSlider.style.display = 'block';
                if (navHome) navHome.classList.add('active');
                if (navVerify) navVerify.classList.remove('active');
                if (navOrders) navOrders.classList.remove('active');
                if (navAcc) navAcc.classList.remove('active');
                if (navFunds) navFunds.classList.remove('active');
                if (pageHistory[pageHistory.length - 1] !== 'home') pageHistory.push('home');
                updateUITexts(currentLanguage);
            } else if (tab === 'verify') {
                if (verifyView) verifyView.style.display = 'block';
                if (navHome) navHome.classList.remove('active');
                if (navVerify) navVerify.classList.add('active');
                if (navOrders) navOrders.classList.remove('active');
                if (navAcc) navAcc.classList.remove('active');
                if (navFunds) navFunds.classList.remove('active');
                if (pageHistory[pageHistory.length - 1] !== 'verify') pageHistory.push('verify');
                if (auth.currentUser) {
                    loadSavedOrdersLive();
                } else {
                    document.getElementById('verify-items-container').innerHTML =
                        `<div class="empty-verify-msg"><i class="fas fa-lock"></i> দয়া করে লগইন করুন আপনার অর্ডার দেখতে।</div>`;
                    document.getElementById('orderCountBadge').innerText = "0";
                }
                updateUITexts(currentLanguage);
            } else if (tab === 'orders') {
                if (ordersView) ordersView.style.display = 'block';
                if (navHome) navHome.classList.remove('active');
                if (navVerify) navVerify.classList.remove('active');
                if (navOrders) navOrders.classList.add('active');
                if (navAcc) navAcc.classList.remove('active');
                if (navFunds) navFunds.classList.remove('active');
                if (pageHistory[pageHistory.length - 1] !== 'orders') pageHistory.push('orders');
                if (auth.currentUser) {
                    loadAllOrders();
                } else {
                    document.getElementById('orders-items-container').innerHTML =
                        `<div class="empty-verify-msg"><i class="fas fa-lock"></i> দয়া করে লগইন করুন আপনার অর্ডার দেখতে।</div>`;
                    document.getElementById('ordersCountBadge').innerText = "0";
                }
                updateUITexts(currentLanguage);
            } else if (tab === 'account') {
                if (accountView) {
                    accountView.style.display = 'flex';
                    accountView.classList.add('active-view');
                }
                if (navHome) navHome.classList.remove('active');
                if (navVerify) navVerify.classList.remove('active');
                if (navOrders) navOrders.classList.remove('active');
                if (navAcc) navAcc.classList.add('active');
                if (navFunds) navFunds.classList.remove('active');
                if (pageHistory[pageHistory.length - 1] !== 'account') pageHistory.push('account');
                updateTotalOrdersCount();
                if (auth.currentUser) {
                    loadTotalSpent(auth.currentUser.uid);
                    loadUserBalance(auth.currentUser.uid);
                } else {
                    authMode = 'login';
                    const authBox = document.getElementById('auth-form-box');
                    const profileBox = document.getElementById('profile-view-box');
                    if (authBox) authBox.style.display = 'block';
                    if (profileBox) profileBox.style.display = 'none';
                    if (typeof navigateToAuth === 'function') navigateToAuth('login');
                }
                const editOverlay = document.getElementById('editProfileOverlay');
                if (editOverlay.classList.contains('active')) {
                    editOverlay.classList.remove('active');
                }
                updateUITexts(currentLanguage);
            } else if (tab === 'addfunds') {
                if (addFundsView) {
                    addFundsView.style.display = 'flex';
                    addFundsView.classList.add('active-view');
                }
                if (navHome) navHome.classList.remove('active');
                if (navVerify) navVerify.classList.remove('active');
                if (navOrders) navOrders.classList.remove('active');
                if (navAcc) navAcc.classList.remove('active');
                if (navFunds) navFunds.classList.add('active');
                if (pageHistory[pageHistory.length - 1] !== 'addfunds') pageHistory.push('addfunds');
                if (auth.currentUser) {
                    loadFundsHistory(auth.currentUser.uid);
                }
                document.getElementById('fundsAmountDisplay').innerHTML = '0 <span>TK</span>';
                document.getElementById('fundsCustomAmount').value = '';
                updateUITexts(currentLanguage);
            }
            if (!fromRoute) {
                const hash = TAB_TO_HASH[tab] || tab || 'home';
                setRouteHash(hash, false);
            }
            closeDrawer();
            updateMobileBackButton();
        }

        // ─── TOTAL SPENT ──────────────────────────────────────────
        async function updateTotalOrdersCount() {
            if (!auth.currentUser) {
                document.getElementById('profile-total-orders').innerText = "0";
                document.getElementById('profile-total-spent').innerText = "0 TK";
                document.getElementById('orderCountBadge').innerText = "0";
                document.getElementById('ordersCountBadge').innerText = "0";
                return;
            }
            try {
                const userEmail = auth.currentUser.email;
                const snapshot = await database.ref('orders').orderByChild('userEmail').equalTo(userEmail).once('value');
                const orders = snapshot.val();
                let totalOrders = 0;
                let totalSpentFromApproved = 0;
                if (orders) {
                    const keys = Object.keys(orders);
                    totalOrders = keys.length;
                    keys.forEach(key => {
                        const order = orders[key];
                        const status = order.status || "Pending";
                        if (status === "Approved" || status === "Success") {
                            const priceNum = parseFloat((order.price || "0").replace(/[^0-9.]/g, ''));
                            if (!isNaN(priceNum)) totalSpentFromApproved += priceNum;
                        }
                    });
                }
                document.getElementById('profile-total-orders').innerText = totalOrders;
                document.getElementById('orderCountBadge').innerText = totalOrders;
                document.getElementById('ordersCountBadge').innerText = totalOrders;
                document.getElementById('profile-total-spent').innerText = totalSpentFromApproved.toFixed(0) + ' TK';
                updatePremiumMemberBadge(totalSpentFromApproved);
                if (auth.currentUser) {
                    await database.ref('User/' + auth.currentUser.uid + '/totalSpent').set(totalSpentFromApproved);
                    totalSpentAmount = totalSpentFromApproved;
                }
            } catch (e) {
                console.warn("updateTotalOrdersCount error:", e);
                document.getElementById('profile-total-orders').innerText = "0";
                document.getElementById('orderCountBadge').innerText = "0";
                document.getElementById('ordersCountBadge').innerText = "0";
                document.getElementById('profile-total-spent').innerText = "0 TK";
            }
        }

        // ─── ADMIN MESSAGE LINK FORMATTER ─────────────────────────
        // Keeps message text white/bold and turns http(s) links into clickable links.
        function copyCredentialValue(value, label) {
            navigator.clipboard.writeText(String(value)).then(() => {
                showToast('✅ ' + (label || 'Credential') + ' copied!', '#00ff44');
            }).catch(() => {
                alert('Copy failed. Please copy it manually.');
            });
        }

        function cleanMyKeysAdminMessage(message) {
            return String(message || '').split(/\r?\n/)
                .filter(function(line) {
                    const normalized = line.trim();
                    if (!normalized) return true;
                    // Hide WhatsApp contact/promotional lines from My Keys only.
                    if (/\bwhats\s*app\b/i.test(normalized)) return false;
                    if (/order\s*confirm/i.test(normalized) && /(?:\+?\d[\d\s().-]{7,})/.test(normalized)) return false;
                    return true;
                })
                .join('\n')
                .replace(/\n{3,}/g, '\n\n')
                .trim();
        }

        function formatAdminMessage(message) {
            const text = String(message || '');
            const escaped = text
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#039;');

            let html = escaped.replace(/(https?:\/\/[^\s<]+)/g, (url) => {
                const cleanUrl = url.replace(/[),.!?;:]+$/g, '');
                const trailing = url.slice(cleanUrl.length);
                return `<a class="admin-message-link" href="${cleanUrl}" target="_blank" rel="noopener noreferrer">${cleanUrl}</a>${trailing}`;
            });

            return html;
        }

        // ─── LOAD ORDERS LIVE (My Keys) ──────────────────────────
        async function loadSavedOrdersLive() {
            const verifyContainer = document.getElementById('verify-items-container');
            if (!verifyContainer) return;
            if (!auth.currentUser) {
                verifyContainer.innerHTML =
                    `<div class="empty-verify-msg"><i class="fas fa-lock"></i> দয়া করে লগইন করুন আপনার অর্ডার দেখতে।</div>`;
                document.getElementById('orderCountBadge').innerText = "0";
                return;
            }

            const userEmail = auth.currentUser.email;
            for (let key in activeListeners) {
                database.ref('orders/' + key).off('value', activeListeners[key]);
            }
            activeListeners = {};
            verifyContainer.innerHTML = '<div class="empty-verify-msg" style="opacity:.65">Loading your keys…</div>';

            try {
                const snapshot = await database.ref('orders').orderByChild('userEmail').equalTo(userEmail).once('value');
                const orders = snapshot.val();
                if (!orders) {
                    verifyContainer.innerHTML =
                        `<div class="empty-verify-msg"><i class="fas fa-inbox"></i> ${t('noKeys')}</div>`;
                    document.getElementById('orderCountBadge').innerText = "0";
                    return;
                }
                verifyContainer.innerHTML = '';
                const orderKeys = Object.keys(orders);
                document.getElementById('orderCountBadge').innerText = orderKeys.length;

                const prevStatusMap = {};

                orderKeys.forEach(orderKey => {
                    let orderWrapper = document.createElement('div');
                    orderWrapper.id = 'wrapper-' + orderKey;
                    orderWrapper.className = 'verify-item-modern';
                    orderWrapper.style.cursor = 'pointer';
                    orderWrapper.onclick = function() {
                        currentOrderKey = orderKey;
                        document.querySelectorAll('.verify-item-modern').forEach(el => {
                            el.style.borderColor = 'var(--card-border)';
                        });
                        this.style.borderColor = 'var(--primary-color)';
                        const orderData = orders[orderKey];
                        if (orderData && orderData.adminMessage) {
                            document.getElementById('adminMsgDisplay').style.display = 'block';
                            document.getElementById('adminMsgDisplay').innerHTML =
                                `<strong>📩 ${t('messageFromAdmin')}:</strong> ${orderData.adminMessage}`;
                            if (orderData.adminMessage.includes('t.me/')) {
                                const linkMatch = orderData.adminMessage.match(/https?:\/\/t\.me\/[^\s]+/);
                                if (linkMatch) {
                                    paidGroupLink = linkMatch[0];
                                    updatePaidGroupLinkInOrder(paidGroupLink);
                                }
                            }
                        } else {
                            document.getElementById('adminMsgDisplay').style.display = 'none';
                        }
                    };
                    verifyContainer.appendChild(orderWrapper);

                    let callback = (snapshot) => {
                        const orderData = snapshot.val();
                        const currentWrapper = document.getElementById('wrapper-' + orderKey);
                        if (!orderData) {
                            if (currentWrapper) currentWrapper.remove();
                            const remaining = verifyContainer.querySelectorAll('.verify-item-modern').length;
                            if (remaining === 0) {
                                verifyContainer.innerHTML =
                                    `<div class="empty-verify-msg"><i class="fas fa-inbox"></i> ${t('noKeys')}</div>`;
                                document.getElementById('orderCountBadge').innerText = "0";
                            }
                            return;
                        }

                        const prevStatus = prevStatusMap[orderKey] || "Pending";
                        const currentStatus = orderData.status || "Pending";
                        if ((currentStatus === "Approved" || currentStatus === "Success") &&
                            (prevStatus !== "Approved" && prevStatus !== "Success")) {
                            updateTotalOrdersCount();
                        }
                        prevStatusMap[orderKey] = currentStatus;

                        let statusClass = 'pending',
                            statusText = t('pending');
                        if (orderData.status === "Approved" || orderData.status === "Success") {
                            statusClass = 'approved';
                            statusText = t('approved');
                        }
                        if (orderData.status === "Rejected" || orderData.status === "Failed") {
                            statusClass = 'rejected';
                            statusText = t('rejected');
                        }

                        let adminHtml = '';
                        let paidGroupHtml = '';
                        let orderPaidGroupLink = paidGroupLink;

                        if (orderData.adminMessage && orderData.adminMessage.trim() !== "") {
                            const isApproved = (orderData.status === "Approved" || orderData.status === "Success");
                            const headerLabel = isApproved ? "ACCESS GENERATE SUCCESSFUL" : "NEAMOT PANEL STORE";
                            const msgClass = isApproved ? "item-admin-msg access-success" : "item-admin-msg";
                            // Extract possible key/credential lines for separate copy
                            let keyCopyHtml = "";
                            if (isApproved) {
                                const rawMsg = String(orderData.adminMessage || "");
                                const keyMatch = rawMsg.match(/(?:KEY|Key|Username|Password|USER|PASS)\s*[:=]\s*([^\n<]+)/i)
                                    || rawMsg.match(/([A-Za-z0-9_\-]{8,})/);
                                if (keyMatch) {
                                    const kv = (keyMatch[1] || keyMatch[0] || "").trim();
                                    if (kv) {
                                        keyCopyHtml = `<div class="key-copy-row"><span class="key-value">${kv.replace(/</g,"&lt;")}</span><button type="button" class="copy-key-btn" onclick="event.stopPropagation();copyCredentialValue(decodeURIComponent('${encodeURIComponent(kv)}'),'Key')">📋 Copy Key</button></div>`;
                                    }
                                }
                            }
                            adminHtml = `
                                    <div class="${msgClass}">
                                        <div>
                                            <strong>📩 ${headerLabel}</strong>
                                            <div class="msg-text">${formatAdminMessage(cleanMyKeysAdminMessage(orderData.adminMessage))}</div>
                                            ${keyCopyHtml}
                                        </div>
                                        <button class="copy-msg-btn" onclick="event.stopPropagation();copyAdminMessage('${cleanMyKeysAdminMessage(orderData.adminMessage).replace(/'/g, "\\'")}')">
                                            <i class="fas fa-copy"></i> ${t('copy')}
                                        </button>
                                    </div>
                                `;
                            if (orderData.adminMessage.includes('t.me/')) {
                                const linkMatch = orderData.adminMessage.match(/https?:\/\/t\.me\/[^\s]+/);
                                if (linkMatch) {
                                    orderPaidGroupLink = linkMatch[0];
                                }
                            }
                        }

                        if (orderData.resellerApiUsed) {
                            const apiKeys = Array.isArray(orderData.resellerApiKeys) ? orderData.resellerApiKeys.filter(Boolean) : [];
                            const safeKeys = apiKeys.map(k => String(k).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'));
                            adminHtml = (orderData.status === 'Approved' || orderData.status === 'Success') && safeKeys.length
                                ? `<div class="item-admin-msg access-success"><strong>🔑 Your Key</strong>${safeKeys.map((key, idx) => `<div class="key-copy-row"><span class="key-value">${key}</span><button type="button" class="copy-key-btn" onclick="event.stopPropagation();copyCredentialValue(decodeURIComponent('${encodeURIComponent(apiKeys[idx])}'),'Key')">📋 Copy Key</button></div>`).join('')}</div>`
                                : `<div class="item-admin-msg"><strong>🔑 Your Key</strong><div class="msg-text">Key is not available yet.</div></div>`;
                            paidGroupHtml = '';
                        } else if (orderData.status === "Approved" || orderData.status === "Success") {
                            paidGroupHtml = `
                                    <div class="order-paid-group">
                                        <span class="paid-label">🔑 ${t('joinGroup')}</span>
                                        <a href="${orderPaidGroupLink}" target="_blank" class="paid-link">
                                            <i class="fab fa-telegram-plane"></i> ${t('joinGroup')}
                                        </a>
                                        <div class="paid-note">${t('clickToJoin')}</div>
                                        <div class="order-apk-wrap" style="margin-top:10px;">
                                            <a href="${(typeof panelDatabase!=='undefined'&&panelDatabase[orderData.panelId]&&panelDatabase[orderData.panelId].apkLink)||(typeof fallbackDatabase!=='undefined'&&fallbackDatabase[orderData.panelId]&&fallbackDatabase[orderData.panelId].apkLink)||'#'}" target="_blank" rel="noopener" class="paid-link order-apk-btn" style="background:linear-gradient(135deg,#16a34a,#15803d);">
                                                <i class="fas fa-download"></i> APK FILE &amp; SETUP VIDEO 🎥
                                            </a>
                                        </div>
                                    </div>
                                `;
                        }

                        let methodColor = '#94a3b8';
                        if (orderData.method) {
                            const mm = String(orderData.method).toLowerCase();
                            if (mm.includes('bkash')) methodColor = '#e2136e';
                            else if (mm.includes('nagad')) methodColor = '#f16722';
                            else if (mm.includes('rocket')) methodColor = '#8c3494';
                            else if (mm.includes('binance')) methodColor = '#ffffff';
                        }
                        let orderDate = 'N/A';
                        if (orderData.timestamp) {
                            const date = new Date(orderData.timestamp);
                            orderDate = date.toLocaleDateString('bn-BD', { day: 'numeric', month: 'short',
                                    year: 'numeric' }) + ' ' +
                                date.toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' });
                        }

                        const qty = orderData.quantity || 1;
                        const qtyTag = qty > 1 ? `<span class="qty-tag">×${qty}</span>` : '';
                        const panelBadge = `<span class="panel-badge">${orderData.method || ''}</span>`;

                        if (currentWrapper) {
                            currentWrapper.innerHTML = `
                                    <div class="item-top">
                                        <span class="item-panel">${orderData.panelName || 'N/A'} ${panelBadge} ${qtyTag}</span>
                                        <span class="item-status ${statusClass}">${statusText}</span>
                                    </div>
                                    ${orderData.resellerApiUsed ? `<div class="item-details"><div class="detail"><span class="label">${t('plan')}</span><span class="value">${orderData.plan || 'N/A'}</span></div></div>` : `<div class="item-details">
                                        <div class="detail">
                                            <span class="label">${t('plan')}</span>
                                            <span class="value">${orderData.plan || 'N/A'}</span>
                                        </div>
                                        <div class="detail">
                                            <span class="label">${t('price')}</span>
                                            <span class="value price">${orderData.price || '0 TK'}</span>
                                        </div>
                                        <div class="detail">
                                            <span class="label">${t('qty')}</span>
                                            <span class="value qty-val">${qty}</span>
                                        </div>
                                        <div class="detail">
                                            <span class="label">${t('payment')}</span>
                                            <span class="value" style="color:${methodColor};font-size:11px;">${orderData.method || 'N/A'}</span>
                                        </div>
                                        <div class="detail" style="grid-column: span 2;">
                                            <span class="label">${t('txnId')}</span>
                                            <span class="value txn">${orderData.transactionId || 'N/A'}</span>
                                        </div>
                                        <div class="detail" style="grid-column: span 2;">
                                            <span class="label">${t('orderDate')}</span>
                                            <span class="value date">${orderDate}</span>
                                        </div>
                                    </div>`}
                                    ${adminHtml}
                                    ${paidGroupHtml}
                                `;
                        }
                    };
                    activeListeners[orderKey] = callback;
                    database.ref('orders/' + orderKey).on('value', callback);
                });
                updateTotalOrdersCount();
            } catch (error) {
                console.error("Error loading orders:", error);
                verifyContainer.innerHTML =
                    `<div class="empty-verify-msg"><i class="fas fa-exclamation-triangle" style="color:var(--primary-color);"></i> Error loading orders. Please try again.</div>`;
            }
        }

        // ─── LOAD ALL ORDERS (My Orders) ──────────────────────────
        async function loadAllOrders() {
            const ordersContainer = document.getElementById('orders-items-container');
            if (!ordersContainer) return;
            if (!auth.currentUser) {
                ordersContainer.innerHTML =
                    `<div class="empty-verify-msg"><i class="fas fa-lock"></i> দয়া করে লগইন করুন আপনার অর্ডার দেখতে।</div>`;
                document.getElementById('ordersCountBadge').innerText = "0";
                return;
            }

            const userEmail = auth.currentUser.email;
            ordersContainer.innerHTML = '<div class="empty-verify-msg" style="opacity:.65">Loading your orders…</div>';

            try {
                const snapshot = await database.ref('orders').orderByChild('userEmail').equalTo(userEmail).once('value');
                const orders = snapshot.val();
                if (!orders) {
                    ordersContainer.innerHTML =
                        `<div class="empty-verify-msg"><i class="fas fa-inbox"></i> ${t('noOrders')}</div>`;
                    document.getElementById('ordersCountBadge').innerText = "0";
                    return;
                }
                ordersContainer.innerHTML = '';
                const orderKeys = Object.keys(orders);
                document.getElementById('ordersCountBadge').innerText = orderKeys.length;

                orderKeys.forEach(orderKey => {
                    const order = orders[orderKey];
                    let statusClass = 'pending',
                        statusText = t('pending');
                    if (order.status === "Approved" || order.status === "Success") {
                        statusClass = 'approved';
                        statusText = t('approved');
                    }
                    if (order.status === "Rejected" || order.status === "Failed") {
                        statusClass = 'rejected';
                        statusText = t('rejected');
                    }

                    let methodColor = '#94a3b8';
                    if (order.method) {
                        const m = String(order.method).toLowerCase();
                        if (m.includes('bkash')) methodColor = '#e2136e';
                        else if (m.includes('nagad')) methodColor = '#f16722';
                        else if (m.includes('rocket')) methodColor = '#8c3494';
                        else if (m.includes('binance')) methodColor = '#ffffff';
                    }
                    let orderDate = 'N/A';
                    if (order.timestamp) {
                        const date = new Date(order.timestamp);
                        orderDate = date.toLocaleDateString('bn-BD', { day: 'numeric', month: 'short',
                                year: 'numeric' }) + ' ' +
                            date.toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' });
                    }

                    const qty = order.quantity || 1;
                    const qtyTag = qty > 1 ? `<span class="qty-tag">×${qty}</span>` : '';
                    const panelBadge = `<span class="panel-badge">${order.method || ''}</span>`;

                    let adminHtml = '';
                    if (order.adminMessage && order.adminMessage.trim() !== "") {
                        const isApproved = (order.status === "Approved" || order.status === "Success");
                        const headerLabel = isApproved ? "ACCESS GENERATE SUCCESSFUL" : "NEAMOT PANEL STORE";
                        const msgClass = isApproved ? "item-admin-msg access-success" : "item-admin-msg";
                        let keyCopyHtml = "";
                        if (isApproved) {
                            const rawMsg = String(order.adminMessage || "");
                            const keyMatch = rawMsg.match(/(?:KEY|Key|Username|Password|USER|PASS)\s*[:=]\s*([^\n<]+)/i)
                                || rawMsg.match(/([A-Za-z0-9_\-]{8,})/);
                            if (keyMatch) {
                                const kv = (keyMatch[1] || keyMatch[0] || "").trim();
                                if (kv) {
                                    keyCopyHtml = `<div class="key-copy-row"><span class="key-value">${kv.replace(/</g,"&lt;")}</span><button type="button" class="copy-key-btn" onclick="event.stopPropagation();copyCredentialValue(decodeURIComponent('${encodeURIComponent(kv)}'),'Key')">📋 Copy Key</button></div>`;
                                }
                            }
                        }
                        adminHtml = `
                                <div class="${msgClass}">
                                    <div>
                                        <strong>📩 ${headerLabel}</strong>
                                        <div class="msg-text">${formatAdminMessage(cleanMyKeysAdminMessage(order.adminMessage))}</div>
                                        ${keyCopyHtml}
                                    </div>
                                    <button class="copy-msg-btn" onclick="event.stopPropagation();copyAdminMessage('${cleanMyKeysAdminMessage(order.adminMessage).replace(/'/g, "\\'")}')">
                                        <i class="fas fa-copy"></i> ${t('copy')}
                                    </button>
                                </div>
                            `;
                    }

                    let paidGroupHtml = '';
                    let orderPaidGroupLink = paidGroupLink;
                    if (order.adminMessage && order.adminMessage.includes('t.me/')) {
                        const linkMatch = order.adminMessage.match(/https?:\/\/t\.me\/[^\s]+/);
                        if (linkMatch) {
                            orderPaidGroupLink = linkMatch[0];
                        }
                    }
                    if (order.status === "Approved" || order.status === "Success") {
                        paidGroupHtml = `
                                <div class="order-paid-group">
                                    <span class="paid-label">🔑 ${t('joinGroup')}</span>
                                    <a href="${orderPaidGroupLink}" target="_blank" class="paid-link">
                                        <i class="fab fa-telegram-plane"></i> ${t('joinGroup')}
                                    </a>
                                    <div class="paid-note">${t('clickToJoin')}</div>
                                    <div class="order-apk-wrap" style="margin-top:10px;">
                                        <a href="${(typeof panelDatabase!=='undefined'&&panelDatabase[order.panelId]&&panelDatabase[order.panelId].apkLink)||(typeof fallbackDatabase!=='undefined'&&fallbackDatabase[order.panelId]&&fallbackDatabase[order.panelId].apkLink)||'#'}" target="_blank" rel="noopener" class="paid-link order-apk-btn" style="background:linear-gradient(135deg,#16a34a,#15803d);">
                                            <i class="fas fa-download"></i> APK FILE &amp; SETUP VIDEO 🎥
                                        </a>
                                    </div>
                                </div>
                            `;
                    }

                    let orderHtml = `
                            <div class="verify-item-modern">
                                <div class="item-top">
                                    <span class="item-panel">${order.panelName || 'N/A'} ${panelBadge} ${qtyTag}</span>
                                    <span class="item-status ${statusClass}">${statusText}</span>
                                </div>
                                <div class="item-details">
                                    <div class="detail">
                                        <span class="label">${t('plan')}</span>
                                        <span class="value">${order.plan || 'N/A'}</span>
                                    </div>
                                    <div class="detail">
                                        <span class="label">${t('price')}</span>
                                        <span class="value price">${order.price || '0 TK'}</span>
                                    </div>
                                    <div class="detail">
                                        <span class="label">${t('qty')}</span>
                                        <span class="value qty-val">${qty}</span>
                                    </div>
                                    <div class="detail">
                                        <span class="label">${t('payment')}</span>
                                        <span class="value" style="color:${methodColor};font-size:11px;">${order.method || 'N/A'}</span>
                                    </div>
                                    <div class="detail" style="grid-column: span 2;">
                                        <span class="label">${t('txnId')}</span>
                                        <span class="value txn">${order.transactionId || 'N/A'}</span>
                                    </div>
                                    <div class="detail" style="grid-column: span 2;">
                                        <span class="label">${t('orderDate')}</span>
                                        <span class="value date">${orderDate}</span>
                                    </div>
                                </div>
                                ${adminHtml}
                                ${paidGroupHtml}
                            </div>
                        `;
                    ordersContainer.innerHTML += orderHtml;
                });
                updateTotalOrdersCount();
            } catch (error) {
                console.error("Error loading orders:", error);
                ordersContainer.innerHTML =
                    `<div class="empty-verify-msg"><i class="fas fa-exclamation-triangle" style="color:var(--primary-color);"></i> Error loading orders. Please try again.</div>`;
            }
        }

        // ─── FUNDS HISTORY ──────────────────────────────────────────
        function loadFundsHistory(uid) {
            if (!uid) return;
            const container = document.getElementById('fundsHistoryContainer');
            database.ref('funds/' + uid).orderByChild('timestamp').limitToLast(20).on('value', (snapshot) => {
                const data = snapshot.val();
                if (!data) {
                    container.innerHTML = `<div class="funds-history-empty">${t('noFundHistory')}</div>`;
                    return;
                }
                let html = '';
                const keys = Object.keys(data).reverse();
                keys.forEach(key => {
                    const item = data[key];
                    const statusClass = item.status === 'Approved' || item.status === 'Paid' ? 'paid' : 'pending';
                    const statusText = item.status === 'Approved' || item.status === 'Paid' ? 'PAID ✅' : 'Pending';
                    const date = item.timestamp ? new Date(item.timestamp).toLocaleDateString('bn-BD') : 'N/A';
                    const amount = item.amount || 0;
                    html += `
                            <div class="funds-history-item">
                                <div class="left">
                                    <div class="amount">${amount} <span class="currency-symbol">TK</span></div>
                                    <div class="date">${date}</div>
                                </div>
                                <div class="right">
                                    <span class="status ${statusClass}">${statusText}</span>
                                </div>
                            </div>
                        `;
                });
                if (html === '') {
                    container.innerHTML = `<div class="funds-history-empty">${t('noFundHistory')}</div>`;
                } else {
                    container.innerHTML = html;
                }
            });
        }

        // ─── ADD FUNDS FUNCTIONS ──────────────────────────────────
        let fundsAmount = 0;
        let fundsMethod = 'bkash';

        function initFundsMethodSelection() {
            selectFundsMethod(fundsMethod || 'bkash');
        }

        function setFundsAmount(amount) {
            fundsAmount = parseFloat(amount) || 0;
            document.getElementById('fundsAmountDisplay').innerHTML = fundsAmount + ' <span>TK</span>';
            document.getElementById('fundsCustomAmount').value = '';
        }

        function updateFundsAmountFromInput() {
            const val = parseFloat(document.getElementById('fundsCustomAmount').value);
            fundsAmount = (val && val > 0) ? val : 0;
            const display = document.getElementById('fundsAmountDisplay');
            if (display) display.innerHTML = (fundsAmount || 0) + ' <span>BDT</span>';
            if (typeof updateFundsCurrencyHints === 'function') updateFundsCurrencyHints();
        }

        function selectFundsMethod(method) {
            const allowed = ['bkash', 'nagad', 'rocket', 'binance'];
            fundsMethod = allowed.includes(method) ? method : 'bkash';

            const data = {
                bkash: {
                    name: 'bKash',
                    sub: 'Personal',
                    logo: 'https://i.ibb.co.com/Rm4yRwN/bKash.png'
                },
                nagad: {
                    name: 'Nagad',
                    sub: 'Personal',
                    logo: 'https://i.ibb.co.com/YzGzdFx/Nagad.png'
                },
                rocket: {
                    name: 'Rocket',
                    sub: 'Personal',
                    logo: 'https://i.ibb.co/nMHz4zx2/file-0000000013e4820b9a2f8057bb61ddc3.png'
                },
                binance: {
                    name: 'Binance Pay',
                    sub: 'BDT → USD',
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Binance_logo.svg'
                }
            };

            const selected = data[fundsMethod] || data.bkash;
            const logo = document.getElementById('fundsSelectedMethodLogo');
            const name = document.getElementById('fundsSelectedMethodName');
            const sub = document.getElementById('fundsSelectedMethodSub');

            if (logo) {
                logo.src = selected.logo;
                logo.alt = selected.name;
            }
            if (name) name.textContent = selected.name;
            if (sub) sub.textContent = selected.sub;

            document.querySelectorAll('.funds-method-option').forEach(btn => {
                btn.classList.toggle('selected', btn.dataset.method === fundsMethod);
                btn.setAttribute('aria-checked', btn.dataset.method === fundsMethod ? 'true' : 'false');
            });

            // Keep the original hidden buttons in sync for compatibility with existing code.
            document.querySelectorAll('#funds-method-grid .funds-method-btn').forEach(btn => {
                const active = btn.dataset.method === fundsMethod;
                btn.classList.toggle('active', active);
                btn.setAttribute('aria-pressed', active ? 'true' : 'false');
            });
        }

        function openFundsMethodModal() {
            if (!auth.currentUser) {
                if (typeof openLogin === 'function') openLogin();
                else showToast('Please login first!', '#ff4444');
                return;
            }
            const modal = document.getElementById('funds-method-modal');
            if (!modal) return;
            selectFundsMethod(fundsMethod || 'bkash');
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeFundsMethodModal() {
            const modal = document.getElementById('funds-method-modal');
            if (!modal) return;
            modal.classList.remove('active');

            // Don't change page scrolling if another full-screen payment page is open.
            if (!document.getElementById('funds-payment-page')?.classList.contains('active')) {
                document.body.style.overflow = '';
            }
        }

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') closeFundsMethodModal();
        });

        function updateFundsCurrencyHints(){
            const amount = Number(document.getElementById('fundsCustomAmount')?.value || 0);
            const hint = document.getElementById('fundsUsdHint');
            const rate = Number(window.NEAMOT_USD_RATE || 120);
            if (hint) {
                hint.textContent = amount > 0 ? 'BDT '+amount.toFixed(2)+'  →  $'+(amount/rate).toFixed(2)+' USD' : 'BDT → USD';
                hint.style.display = 'block';
            }
        }

function proceedFundsPayment() {
            if (fundsAmount <= 0) {
                showToast("Please enter a valid amount!", "#ff4444");
                return;
            }
            // Minimum: 10 TK (BD methods) / 10 Rs (IND UPI)
            const methodNow = (typeof fundsMethod !== 'undefined' && fundsMethod) ? String(fundsMethod).toLowerCase() : 'bkash';
            const isIndUpi = methodNow === 'ind_upi' || methodNow === 'upi';
            const minAmt = 10;
            if (Number(fundsAmount) < minAmt) {
                showToast(isIndUpi ? 'IND UPI Minimum 10 Rs' : 'ADD FUNDS Minimum 10 Tk', '#ff4444');
                return;
            }
            if (!auth.currentUser) {
                showToast(t('pleaseLogin'), "#ff4444");
                return;
            }
            openFundsPaymentPage(fundsAmount);
        }

        function openFundsPaymentPage(amount) {
            const card = document.getElementById('fundsPaymentCard');
            const verifyBtn = document.getElementById('funds-pay-verify-btn');
            const method = fundsMethod || 'bkash';

            const logoMap = {
                bkash: 'https://i.ibb.co.com/Rm4yRwN/bKash.png',
                nagad: 'https://i.ibb.co.com/YzGzdFx/Nagad.png',
                rocket: 'https://i.ibb.co/nMHz4zx2/file-0000000013e4820b9a2f8057bb61ddc3.png',
                binance: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Binance_logo.svg'
            };
            document.getElementById('fundsPayMethodLogo').src = logoMap[method] || logoMap.bkash;
            card.className = 'payment-card-exact' + (
                method === 'nagad' ? ' nagad-card' :
                method === 'rocket' ? ' rocket-card' :
                method === 'binance' ? ' binance-card' :
                method === 'upi' ? ' upi-card' :
                ' bkash-card'
            );
            verifyBtn.className = 'verify-btn-exact' + (method === 'nagad' ? ' nagad-btn-exact' : method === 'rocket' ?
                ' rocket-btn-exact' : '');

            document.getElementById('fundsPaymentAmountDisplay').innerText = amount + ' BDT';
            const fundsUsdEl = document.getElementById('fundsPaymentUsdDisplay');
            if (fundsUsdEl) { fundsUsdEl.textContent = '≈ $' + (Number(amount) / Number(window.NEAMOT_USD_RATE || 120)).toFixed(2) + ' USD • Binance Pay'; fundsUsdEl.style.display = method === 'binance' ? 'block' : 'none'; }
            updateFundsPayInstructions(amount, method);
            document.getElementById('funds-payment-page').classList.add('active');
            pushAppHistory('funds-payment');
            document.body.style.overflow = 'hidden';
            document.getElementById('funds-txn-input').value = '';
            updateMobileBackButton();
        }

        function closeFundsPaymentPage() {
            document.getElementById('funds-payment-page').classList.remove('active');
            document.body.style.overflow = '';
            updateMobileBackButton();
        }

        function updateFundsPayInstructions(price, method) {
            const list = document.getElementById('funds-pay-instruction-list');
            const m = method || 'bkash';
            const priceDisplay = typeof price === 'number' ? price.toFixed(0) : price;
            const data = {
                bkash: `<li><span class="highlight-yellow">BKASH</span> Open the app and send the money.</li><li>Recipient number: <span class="highlight-yellow">${bkashNumber}</span> <button class="copy-btn-exact" onclick="copyText('${bkashNumber}')"><i class="far fa-copy"></i> Copy</button></li>`,
                nagad: `<li><span class="highlight-yellow">NAGAD</span> Open the app and send the money.</li><li>Recipient number: <span class="highlight-yellow">${nagadNumber}</span> <button class="copy-btn-exact" onclick="copyText('${nagadNumber}')"><i class="far fa-copy"></i> Copy</button></li>`,
                rocket: `<li><span class="highlight-yellow">ROCKET</span> Open the app and send the money.</li><li>Recipient number: <span class="highlight-yellow">${rocketNumber}</span> <button class="copy-btn-exact" onclick="copyText('${rocketNumber}')"><i class="far fa-copy"></i> Copy</button></li>`,
                binance: `<li><span class="highlight-yellow">BINANCE PAY</span> ব্যবহার করুন।</li><li>Amount: <span class="highlight-yellow">$${(Number(price) / Number(window.NEAMOT_USD_RATE || 120)).toFixed(2)} USD</span> (≈ ${priceDisplay} BDT)</li>${binanceId ? `<li>Binance ID: <span class="highlight-yellow">${binanceId}</span> <button class="copy-btn-exact" onclick="copyText('${binanceId}')"><i class="far fa-copy"></i> Copy</button></li>` : `<li>Binance ID এখনো অ্যাডমিন প্যানেল থেকে সেট করা হয়নি।</li>`}`
            };
            list.innerHTML =
                `${data[m] || data.bkash}<li>Submit the payment amount: <span class="highlight-yellow">${priceDisplay} BDT</span>.</li><li><span class="highlight-yellow">Transaction ID</span> দিয়ে VERIFY করুন।</li>`;
        }

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initFundsMethodSelection);
        } else {
            initFundsMethodSelection();
        }

        // ─── FUNDS TRANSACTION VERIFY TRIGGER ─────────────────────
        // Validates the entered Trx/Transaction ID, checks for duplicates,
        // then creates the Add Funds request as Pending for admin approval.
        function fundsPayTriggerVerify() {
            const input = document.getElementById('funds-txn-input');
            const btn = document.getElementById('funds-pay-verify-btn');
            const txnId = input ? input.value.trim() : '';

            if (!txnId) {
                showToast(t('verifyTransaction'), '#ff4444');
                if (input) input.focus();
                return;
            }

            if (!auth.currentUser) {
                showToast(t('pleaseLogin'), '#ff4444');
                return;
            }

            if (!fundsAmount || parseFloat(fundsAmount) <= 0) {
                showToast('Invalid amount!', '#ff4444');
                return;
            }

            if (btn) btn.disabled = true;
            showVerifyingPopup();

            // orders: transactionId is stored directly on each order.
            // funds: requests are stored under funds/{uid}/{pushId}, so
            // query the whole funds tree and check nested requests safely.
            Promise.all([
                database.ref('orders').once('value'),
                database.ref('funds').once('value')
            ]).then(([ordersSnap, fundsSnap]) => {
                let alreadyUsed = false;

                ordersSnap.forEach(child => {
                    const data = child.val() || {};
                    if (String(data.transactionId || '').trim() === txnId) {
                        alreadyUsed = true;
                    }
                });

                if (!alreadyUsed) {
                    fundsSnap.forEach(userNode => {
                        userNode.forEach(fundNode => {
                            const data = fundNode.val() || {};
                            if (String(data.transactionId || '').trim() === txnId) {
                                alreadyUsed = true;
                            }
                        });
                    });
                }

                if (alreadyUsed) {
                    closeVerifyingPopup();
                    if (btn) btn.disabled = false;
                    showToast(t('txnAlreadyUsed'), '#ff4444');
                    return;
                }

                // The site does not have a live bKash/Nagad/Rocket/Binance
                // gateway API here, so the valid submission becomes Pending
                // and must be approved by the admin.
                proceedFundsVerification(txnId);
            }).catch(err => {
                closeVerifyingPopup();
                if (btn) btn.disabled = false;
                console.error('Funds transaction check error:', err);
                showToast('Transaction check failed! আবার চেষ্টা করুন।', '#ff4444');
            });
        }

        // ─── PROCEED FUNDS VERIFICATION ──────────────────────────
        function proceedFundsVerification(txnId) {
            showVerifyingPopup();
            const btn = document.getElementById('funds-pay-verify-btn');
            btn.disabled = true;

            const methodTextMap = {
                bkash: 'bKash Personal',
                nagad: 'Nagad Personal',
                rocket: 'Rocket Personal',
                binance: 'Binance Pay'
            };
            const methodText = methodTextMap[fundsMethod] || 'bKash Personal';
            const userEmail = auth.currentUser.email;
            const userUid = auth.currentUser.uid;

            const cleanAmount = parseFloat(fundsAmount);
            if (isNaN(cleanAmount) || cleanAmount <= 0) {
                showToast("Invalid amount!", "#ff4444");
                btn.disabled = false;
                closeVerifyingPopup();
                return;
            }

            const fundData = {
                amount: cleanAmount,
                method: methodText,
                transactionId: txnId,
                status: "Pending",
                userEmail: userEmail,
                timestamp: firebase.database.ServerValue.TIMESTAMP
            };

            showRealLoading();
            const fundRef = database.ref('funds/' + userUid).push();
            fundRef.set(fundData)
                .then(() => {
                    try { notifyAdminNewFund(fundData, userUid, fundRef.key); } catch (e) {}
                    hideRealLoading();
                    closeVerifyingPopup();
                    btn.disabled = false;
                    closeFundsPaymentPage();
                    showNotification('✅', t('success'), t('fundRequestSubmitted'),
                        'OK, Got it!', true);
                    switchTab('account');
                })
                .catch((err) => {
                    hideRealLoading();
                    closeVerifyingPopup();
                    btn.disabled = false;
                    showToast("ডাটাবেস ত্রুটি! আবার চেষ্টা করুন।", "#ff4444");
                    console.error(err);
                });
        }

        // ─── SECTION FILTER TABS ──────────────────────────────────
        function toggleMoreSectionOptions() {
            const extra = document.getElementById('sectionExtraTabs');
            const btn = document.getElementById('sectionMoreToggle');
            if (!extra || !btn) return;
            const open = !extra.hidden;
            extra.hidden = open;
            extra.style.display = open ? 'none' : 'flex';
            btn.textContent = open ? 'MORE' : 'LESS';
            btn.setAttribute('aria-expanded', String(!open));
            if (!open) {
                setTimeout(() => {
                    try { extra.scrollIntoView({behavior:'smooth', block:'nearest'}); } catch(e) {}
                }, 20);
            }
        }

        function setupSectionTabs() {
            const tabs = document.querySelectorAll('.section-tab');
            tabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    tabs.forEach(t => t.classList.remove('active'));
                    this.classList.add('active');
                    const section = this.dataset.section;
                    filterGrid(section);
                });
            });
        }

        function filterGrid(section) {
            /* V71b: Tab filter without category headings */
            if (!section || section === 'all') {
                generateCategorizedGrid();
                return;
            }
            const allGrid = document.getElementById('grid-all-panels');
            const safeGrid = document.getElementById('grid-safe-location');
            if (!allGrid) return;
            allGrid.innerHTML = '';
            if (safeGrid) safeGrid.innerHTML = '';
            const safeTitle = document.getElementById('safeSectionTitle');
            if (safeTitle) safeTitle.style.display = 'none';

            const panelIds = getOrderedPanelIds();
            let idsToUse = panelIds.length > 0 ? panelIds.slice() : Object.keys(panelDatabase || {}).map(Number).filter(n => !isNaN(n)).sort((a,b)=>a-b);
            if (!idsToUse.length) {
                try { idsToUse = Object.keys(fallbackDatabase || {}).map(Number).filter(n => !isNaN(n)).sort((a,b)=>a-b); } catch (e) {}
            }
            const safeIds = [12, 13, 14, 15, 16, 17, 25, 26, 31];

            const wrap = document.createElement('div');
            wrap.className = 'logo-grid';
            wrap.style.cssText = 'display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:8px;width:100%;';
            allGrid.appendChild(wrap);

            idsToUse.forEach(id => {
                try {
                    const item = (panelDatabase && panelDatabase[id]) || (typeof fallbackDatabase !== 'undefined' && fallbackDatabase[id]);
                    if (!item) return;
                    if (section === 'safe') {
                        if (safeIds.includes(Number(id))) appendCardToGrid(id, wrap);
                        return;
                    }
                    let sec = 'nonroot';
                    if (typeof classifyPanelSection === 'function') {
                        try { sec = classifyPanelSection(item) || sec; } catch (e) {}
                    }
                    if (String(sec).toLowerCase() === String(section).toLowerCase()) {
                        appendCardToGrid(id, wrap);
                    }
                } catch (e) { console.warn('filter card', id, e); }
            });
        }

        function appendCardToGrid(id, targetGrid) {
            let item = panelDatabase[id] || fallbackDatabase[id];
            if (!item) return;
            let imgUrl = item.image || item.img || item.logo || "";
            if(!imgUrl || imgUrl === 'undefined' || imgUrl === 'null') imgUrl = "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=";
            let displayName = String(item.name || ('ITEM ID: ' + id))
                .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
            const isProductMaintenance = item.maintenance === true || item.maintenance === "true";
            let isFullyStockOut = isProductMaintenance || item.isStockOut === true || item.isStockOut === "true";
            const verifiedText = t('verifiedBadge');
            let firstPrice = '';
            try {
                const prices = item.prices || {};
                const keys = Object.keys(prices);
                if (keys.length) {
                    const planWeight = (label) => {
                        const raw = String(label || '').trim().toLowerCase();
                        const n = parseInt(raw.match(/\d+/)?.[0] || '0', 10);
                        if (/hour|hours|hr|hrs|h\b/.test(raw)) return n;
                        if (/day|days|d\b/.test(raw)) return 100 + n;
                        if (/week|weeks|wk|w\b/.test(raw)) return 200 + n * 7;
                        if (/month|months|mo\b/.test(raw)) return 300 + n * 30;
                        if (/life|lifetime|forever/.test(raw)) return 999999;
                        return 500 + n;
                    };
                    keys.sort((a, b) => planWeight(a) - planWeight(b));
                    const p = prices[keys[0]];
                    const num = parseFloat(String(p).replace(/[^0-9.]/g, '')) || 0;
                    firstPrice = num > 0 ? ('৳' + Math.round(num)) : '';
                }
            } catch(e) {}
            const apkHref = String(item.apkLink || item.apk || '#').replace(/\\/g,'\\').replace(/'/g, "\\'");
            let buyButtonHtml;
            const fileSetupBtn = `<button type="button" class="btn-file-setup" onclick="event.stopPropagation(); window.open('${apkHref}', '_blank', 'noopener');"><i class="fas fa-folder-open"></i> FILE &amp; SETUP</button>`;
            if (isProductMaintenance) {
                buyButtonHtml = fileSetupBtn + `<button type="button" class="btn-buy-now maintenance-action-btn" onclick="event.stopPropagation(); showProductMaintenanceNotice('${id}')"><i class="fas fa-tools"></i> MAINTENANCE</button>`;
            } else if (isFullyStockOut) {
                buyButtonHtml = fileSetupBtn + `<button class="btn-buy-now stockout-btn" disabled><i class="fas fa-tools"></i> STOCK OUT</button>`;
            } else {
                buyButtonHtml = fileSetupBtn + `<button class="btn-buy-now" onclick="event.stopPropagation(); selectPanelAndOpen('${id}')"><i class="fas fa-shopping-cart"></i> BUY NOW</button>`;
            }
            let osIcons = '';
            if (item.os && item.os.length) {
                osIcons = '<span class="os-icons" aria-label="Supported platforms">';
                if (item.os.includes('android')) osIcons += '<i class="fab fa-android" title="Android"></i>';
                if (item.os.includes('ios')) osIcons += '<i class="fab fa-apple" title="iOS"></i>';
                if (item.os.includes('pc')) osIcons += '<i class="fas fa-desktop" title="PC"></i>';
                if (item.os.includes('root') || item.root === true || item.root === 'true') {
                    osIcons += '<i class="fas fa-shield-halved magisk-icon-font" title="Magisk Root" aria-label="Magisk Root"></i>';
                }
                osIcons += '</span>';
            }
            let platformChips = '';
            if (item.os && item.os.length) {
                const platformMap = {
                    android: '<span class="product-platform-chip"><i class="fab fa-android"></i> Android</span>',
                    ios: '<span class="product-platform-chip"><i class="fab fa-apple"></i> iOS</span>',
                    pc: '<span class="product-platform-chip"><i class="fas fa-desktop"></i> PC</span>',
                    root: '<span class="product-platform-chip"><i class="fas fa-shield-halved"></i> Root</span>'
                };
                platformChips = item.os.map(os => platformMap[os]).filter(Boolean).join('');
            }
            if (!platformChips) {
                platformChips = '<span class="product-platform-chip muted">All Devices</span>';
            }

            const availabilityLabel = isProductMaintenance ? 'MAINTENANCE' : (isFullyStockOut ? 'OUT OF STOCK' : 'ONLINE');

            let cardHtml = `
                    <div data-maintenance-message="${String(item.maintenanceMessage || '').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}" class="logo-card unique-product-card ${isProductMaintenance ? 'product-maintenance-active' : ''}" role="button" tabindex="0"
                         onclick="if(${isProductMaintenance}){event.stopPropagation();showProductMaintenanceNotice('${id}');return false;}selectPanelAndOpen('${id}')"
                         onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();if(${isProductMaintenance}){showProductMaintenanceNotice('${id}');}else{selectPanelAndOpen('${id}');}}">

                        <div class="product-card-media">
                            <img src="${imgUrl}" alt="${displayName}" width="300" height="300"
                                 loading="eager" fetchpriority="high" decoding="async"
                                 onerror="this.onerror=null;this.src=\'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=\'" />
                        </div>

                        <div class="product-card-content">
                            <div class="product-card-heading">
                                <div class="product-card-title">${displayName}</div>
                                <div class="product-card-subtitle">Premium Panel</div>
                            </div>

                            <div class="product-platforms">
                                ${platformChips}
                            </div>

                            <div class="product-card-divider"></div>

                            <div class="product-card-price-row">
                                <div class="product-price-block">
                                    <span class="product-price-label">STARTING FROM</span>
                                    <span class="product-price-value">${firstPrice || '৳—'}</span>
                                </div>
                                <span class="product-availability ${isFullyStockOut ? 'is-out' : ''}">
                                    <span class="product-status-dot"></span>${availabilityLabel}
                                </span>
                            </div>

                            <div class="panel-buy-row product-card-action">
                                ${buyButtonHtml}
                            </div>
                        </div>
                    </div>
                `;

            targetGrid.insertAdjacentHTML('beforeend', cardHtml);
        }

        // ─── PANEL 13 KEY GENERATION (greengalacy Firebase) ──────
        // This function generates a new key and saves it directly to greengalacy Firebase.
        // Returns a Promise that resolves with the new key string.
        // Normalize any plan label → Panel #13 duration value for greengalacy
        // Examples: "1 DAY" / "7 DAYS" / "30 DAY" → "1 DAY" / "7 DAY" / "30 DAY"
        //           "LIFE TIME" / "LIFETIME" → "LIFETIME"
        function normalizePanel13Duration(plan) {
            const raw = String(plan || '').trim().toUpperCase().replace(/\s+/g, ' ');
            if (!raw) return '1 DAY';
            if (/LIFE\s*TIME|LIFETIME|\bLT\b/.test(raw)) return 'LIFETIME';
            const m = raw.match(/(\d+)\s*DAY/);
            if (m) {
                const days = parseInt(m[1], 10);
                if (Number.isFinite(days) && days > 0) return days + ' DAY';
            }
            // Fallback: keep original cleaned plan
            return raw;
        }

        

        // ─── PANEL #26 DIRECT KEY GENERATION (dGHOST Xdad) ─────────
        


        // ─── PANEL #26 DIRECT KEY GENERATION (dGHOST Xdad) ───────────
        // Separate Firebase app used only for Panel #26 generated keys.
        const panel26FirebaseConfig = {
            apiKey: "AIzaSyDhWxcA8xFrqdxQcidsJEfJmJ4kOIH4SHA",
            databaseURL: "https://dGHOST Xdad-default-rtdb.firebaseio.com",
            projectId: "dGHOST Xdad",
            storageBucket: "dGHOST Xdad.firebasestorage.app",
            appId: "1:500951508166:android:bada29d0019f1fc98623c7"
        };

        let panel26App;
        try {
            panel26App = firebase.app('panel26_dGHOST Xdad');
        } catch (e) {
            panel26App = firebase.initializeApp(panel26FirebaseConfig, 'panel26_dGHOST Xdad');
        }
        const panel26DB = panel26App.database();

        

        // ─── PANEL #15 DIRECT KEY GENERATION (ffnormalgalaxy) ────
        // Generates a new key in "GHOST X-XXXX" format and saves it to ffnormalgalaxy Firebase.
        // Returns a Promise that resolves with the new key string.
        // Normalize any Store plan name to ffnormalgalaxy/Admin duration format:
        // "7 DAYS" / "15 DAY" / "30 DAYS" → "7" / "15" / "30"
        // "LIFE TIME" / "LIFETIME" → "lifetime"
        // "1 MIN" / "1min" → "1min"
        function normalizePanel15Duration(plan) {
            const raw = String(plan || '').trim().toUpperCase().replace(/\s+/g, ' ');
            if (!raw) return '7';
            if (/LIFE\s*TIME|LIFETIME|\bLT\b/.test(raw)) return 'lifetime';
            if (/1\s*MIN/.test(raw)) return '1min';
            const m = raw.match(/(\d+)\s*DAY/);
            if (m) {
                const days = parseInt(m[1], 10);
                if (Number.isFinite(days) && days > 0) return String(days);
            }
            const numOnly = raw.match(/^(\d+)$/);
            if (numOnly) return numOnly[1];
            return '7';
        }

        

        // ─── PANEL #31 USERNAME + PASSWORD GENERATION (progalaxy) ──
        // Wallet Pay on Panel #31 auto-creates login credentials the same day of purchase.
        // Credentials are written to progalaxy users/ and shown in My Keys.
        function normalizePanel31Duration(plan) {
            // Store buy plan → progalaxy/Admin duration format
            // "7 DAYS" → "7", "LIFE TIME" → "lifetime", "2 Hours" → "2h"
            const raw = String(plan || '').trim().toUpperCase().replace(/\s+/g, ' ');
            if (!raw) return '7';
            if (/LIFE\s*TIME|LIFETIME|\bLT\b/.test(raw)) return 'lifetime';
            if (/1\s*MIN/.test(raw)) return '1min';
            // Hour-based (Admin supports 2h, 10h, 12h)
            const h = raw.match(/(\d+)\s*H(?:OUR)?S?/);
            if (h) {
                const hours = parseInt(h[1], 10);
                if (Number.isFinite(hours) && hours > 0) return hours + 'h';
            }
            const m = raw.match(/(\d+)\s*DAY/);
            if (m) {
                const days = parseInt(m[1], 10);
                if (Number.isFinite(days) && days > 0) return String(days);
            }
            const numOnly = raw.match(/^(\d+)$/);
            if (numOnly) return numOnly[1];
            return '7';
        }

        function panel31RandomStr(len, chars) {
            let s = '';
            for (let i = 0; i < len; i++) s += chars.charAt(Math.floor(Math.random() * chars.length));
            return s;
        }

        

        // ─── SELECT PANEL AND OPEN ──────────────────────────────
        function selectPanelAndOpen(id) {
            resetPanelPaymentMethod();
            selectedId = id;
            selectedQuantity = 1;
            document.getElementById('qty-display').value = '1';
            openPricePanel(id);
        }

        function makeSectionTitle(text) {
            return `<div class="section-title panel-section-title"><span>${text}</span></div>`;
        }

        function classifyPanelSection(item) {
            if (!item) return 'other';
            const os = item.os || [];
            const panelName = String(item.name || '').trim();
            const nameUpper = panelName.toUpperCase();
            const isNamedNonRoot = /\bNON[- ]ROOT\b/.test(nameUpper);
            const isNamedRoot = /\bROOT\b/.test(nameUpper) && !isNamedNonRoot;
            const isRootPanel = isNamedRoot || item.root === true || item.root === 'true' || (Array.isArray(os) && os.includes('root'));
            if (isNamedNonRoot || (!isRootPanel && Array.isArray(os) && os.includes('android') && !nameUpper.includes('ROOT'))) return 'nonroot';
            if (isRootPanel) return 'root';
            if (Array.isArray(os) && os.includes('ios') && !os.includes('android')) return 'ios';
            if (Array.isArray(os) && os.includes('pc') && !os.includes('android') && !os.includes('ios')) return 'pc';
            if (Array.isArray(os) && os.includes('ios')) return 'ios';
            if (Array.isArray(os) && os.includes('pc')) return 'pc';
            return 'nonroot';
        }


        function generateCategorizedGrid() {
            /* V71b: Unified product grid — ALL panels together, no category headings */
            const allGrid = document.getElementById('grid-all-panels');
            const safeGrid = document.getElementById('grid-safe-location');
            if (!allGrid) return;
            allGrid.innerHTML = '';
            if (safeGrid) safeGrid.innerHTML = '';
            const safeTitle = document.getElementById('safeSectionTitle');
            if (safeTitle) safeTitle.style.display = 'none';

            const panelIds = getOrderedPanelIds();
            let idsToUse = panelIds.length > 0 ? panelIds.slice() : Object.keys(panelDatabase || {}).map(Number).filter(n => !isNaN(n)).sort((a,b)=>a-b);
            if (!idsToUse.length) {
                try {
                    idsToUse = Object.keys(fallbackDatabase || {}).map(Number).filter(n => !isNaN(n)).sort((a,b)=>a-b);
                } catch (e) {}
            }

            const wrap = document.createElement('div');
            wrap.className = 'logo-grid';
            wrap.style.cssText = 'display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:8px;width:100%;';
            allGrid.appendChild(wrap);

            idsToUse.forEach(id => {
                try {
                    const item = (panelDatabase && panelDatabase[id]) || (typeof fallbackDatabase !== 'undefined' && fallbackDatabase[id]);
                    if (!item) return;
                    appendCardToGrid(id, wrap);
                } catch (e) { console.warn('card', id, e); }
            });

            document.querySelectorAll('.section-tab').forEach(t => t.classList.remove('active'));
            const allTab = document.querySelector('.section-tab[data-section="all"]');
            if (allTab) allTab.classList.add('active');
            try { console.log('[NEAMOT] unified grid cards:', wrap.children.length); } catch (e) {}
        }

        // ─── FETCH STORE DATA ──────────────────────────────────
        let homeLoadingTimer = null;
        function finishHomeLoading() {
            firebaseDataLoaded = true;
            const loader = document.getElementById('loader');
            const main = document.getElementById('main-content');
            if (loader) loader.style.display = 'none';
            if (main) main.style.display = 'block';
            try {
                console.log('[NEAMOT] panels in memory:', panelDatabase ? Object.keys(panelDatabase).length : 0);
                generateCategorizedGrid();
                setupSectionTabs();
            } catch(e) { console.error('[NEAMOT] grid error', e); }
            if (pendingHashId) { const id = pendingHashId; pendingHashId = null; setTimeout(() => { try { openPanelFromHash(id); } catch(e) {} }, 50); }
            else { try { handleHashOnLoad(); } catch(e) {} }
        }
        
        function applyNoticeFromStore(data) {
            if (!data) return;
            try { renderOfficialNoticeSocialLinks(Array.isArray(data.noticeLinks) ? data.noticeLinks : []); } catch(e) {}
            try {
                // One admin-managed logo URL powers the popup, header brand and favicon.
                const logoUrl = String(data.storeLogoUrl || data.userPanelLogoUrl || '').trim();
                const validLogo = /^https?:\/\//i.test(logoUrl);
                const logo = document.getElementById('officialNoticeLogo');
                const brandWrap = document.getElementById('officialNoticeBrandWrap');
                const headerLogo = document.querySelector('.top-header .header-logo-img');
                const applyImage = function(img, show, onLoaded) {
                    if (!img) return;
                    img.hidden = true;
                    img.style.display = 'none';
                    if (!show) { img.removeAttribute('src'); if (onLoaded) onLoaded(false); return; }
                    img.onload = function(){ img.hidden = false; img.style.display = 'block'; if (onLoaded) onLoaded(true); };
                    img.onerror = function(){ img.hidden = true; img.style.display = 'none'; if (onLoaded) onLoaded(false); };
                    img.src = logoUrl;
                    if (img.complete && img.naturalWidth > 0) { img.hidden = false; img.style.display = 'block'; if (onLoaded) onLoaded(true); }
                };
                if (brandWrap) { brandWrap.style.display = 'flex'; brandWrap.style.alignItems = 'center'; brandWrap.style.justifyContent = 'center'; }
                if (validLogo) {
                    applyImage(logo, true, function(ok){ if (brandWrap) brandWrap.style.display = 'flex'; if (!ok && logo) logo.hidden = true; });
                    applyImage(headerLogo, true);
                    document.querySelectorAll('link[rel~="icon"]').forEach(function(link){ link.href = logoUrl; });
                    let shortcut = document.querySelector('link[rel="shortcut icon"]');
                    if (!shortcut) { shortcut = document.createElement('link'); shortcut.rel = 'shortcut icon'; document.head.appendChild(shortcut); }
                    shortcut.href = logoUrl;
                } else {
                    applyImage(logo, false);
                    applyImage(headerLogo, false);
                    if (brandWrap) brandWrap.style.display = 'none';
                    document.querySelectorAll('link[rel~="icon"], link[rel="shortcut icon"]').forEach(function(link){ link.removeAttribute('href'); });
                }
            } catch(e) {}
            try {
                const noticeEl = document.getElementById('NEAMOTTopNotice');
                const titleEl = noticeEl ? noticeEl.querySelector('.NEAMOT-top-notice-title') : null;
                const bodyEl = document.getElementById('NEAMOTNoticeBody');
                const chip = document.getElementById('NEAMOTNoticeShowChip');
                if (typeof data.noticeTitle === 'string' && titleEl) {
                    titleEl.textContent = data.noticeTitle;
                }
                if (typeof data.noticeBody === 'string' && bodyEl) {
                    // Allow simple line breaks; escape HTML except <br>
                    const safe = String(data.noticeBody)
                        .replace(/&/g, '&amp;')
                        .replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;')
                        .replace(/\n/g, '<br>')
                        .replace(/&lt;br\s*\/?&gt;/gi, '<br>');
                    bodyEl.innerHTML = safe;
                }
                const enabled = !(data.noticeEnabled === false || data.noticeEnabled === 0 || data.noticeEnabled === '0');
                if (noticeEl) {
                    if (!enabled) {
                        noticeEl.classList.add('hidden');
                        if (chip) chip.classList.add('show');
                    } else {
                        // respect admin default only if user has no local preference
                        let local = null;
                        try { local = localStorage.getItem('NEAMOT_notice_state'); } catch (e) {}
                        if (!local) {
                            const def = data.noticeDefault || 'open';
                            noticeEl.classList.remove('hidden', 'collapsed');
                            if (chip) chip.classList.remove('show');
                            if (def === 'collapsed') {
                                noticeEl.classList.add('collapsed');
                                const c = document.getElementById('noticeCollapseBtn');
                                const e = document.getElementById('noticeExpandBtn');
                                if (c) c.style.display = 'none';
                                if (e) e.style.display = 'grid';
                            } else if (def === 'hidden') {
                                noticeEl.classList.add('hidden');
                                if (chip) chip.classList.add('show');
                            }
                        }
                    }
                }
            } catch (e) {}
        }

        // Demo/fallback catalogue disabled — grid paints only after Firebase data.

        function fetchStoreData() {
            try { listenPanelApis(); } catch (e) {}

            clearTimeout(homeLoadingTimer);
            homeLoadingTimer = setTimeout(() => {
                if (!firebaseDataLoaded) {
                    try { console.warn('[NEAMOT] storeData timeout — REST fallback'); } catch(e){}
                    if (typeof fetchStoreDataViaRest === 'function') {
                        fetchStoreDataViaRest().catch(function(){
                            panelDatabase = panelDatabase || {};
                            finishHomeLoading();
                        });
                    } else {
                        panelDatabase = panelDatabase || {};
                        finishHomeLoading();
                    }
                }
            }, 6000);

            function applyStorePayload(data) {
                if (data) {
                    if (data.panels) {
                        // Firebase may return panels as array (sparse) or object map — normalize to object, drop null holes
                        const raw = data.panels;
                        const normalized = {};
                        if (Array.isArray(raw)) {
                            raw.forEach(function (item, idx) {
                                if (item && typeof item === 'object') normalized[String(idx)] = item;
                            });
                        } else if (raw && typeof raw === 'object') {
                            Object.keys(raw).forEach(function (k) {
                                if (raw[k] && typeof raw[k] === 'object') normalized[String(k)] = raw[k];
                            });
                        }
                        panelDatabase = normalized;
                    }
                    window.__panelOrder = Array.isArray(data.panelOrder) ? data.panelOrder.map(Number).filter(n => !isNaN(n)) : null;
                    bkashNumber = data.bkashNumber || bkashNumber;
                    nagadNumber = data.nagadNumber || nagadNumber;
                    rocketNumber = data.rocketNumber || rocketNumber;
                    // Binance ID must come from the Admin Panel config. Never fall back to a hardcoded ID.
                    binanceId = (typeof data.binanceId === 'string' || typeof data.binanceId === 'number') ? String(data.binanceId).trim() : '';
                    paidGroupLink = data.paidGroupLink || paidGroupLink;
                    try {
                        if (data.banner1) {
                            const el = document.getElementById('slide-img-1');
                            if (el) { el.src = data.banner1; el.style.background = 'transparent'; el.style.minHeight = '120px'; el.style.objectFit = 'cover'; }
                        }
                        if (data.banner2) {
                            const el = document.getElementById('slide-img-2');
                            if (el) { el.src = data.banner2; el.style.background = 'transparent'; el.style.minHeight = '120px'; el.style.objectFit = 'cover'; }
                        }
                        if (data.banner1Link) { const el = document.getElementById('slide-link-1'); if (el) el.href = data.banner1Link; }
                        if (data.banner2Link) { const el = document.getElementById('slide-link-2'); if (el) el.href = data.banner2Link; }
                    } catch (e) { console.warn('banner apply', e); }
                    try { applyNoticeFromStore(data); } catch (e) {}
                    if (data.telegramSupport) {
                        telegramLink = data.telegramSupport;
                        const tg = document.getElementById('tg-btn');
                        if (tg) tg.href = telegramLink;
                    }
                } else {
                    panelDatabase = panelDatabase && Object.keys(panelDatabase).length ? panelDatabase : {};
                }
                clearTimeout(homeLoadingTimer);
                finishHomeLoading();
            }
            // Fast first read
            function fetchStoreDataViaRest() {
                return fetch('https://store-86763-default-rtdb.firebaseio.com/storeData.json', { method: 'GET', mode: 'cors', cache: 'no-store' })
                    .then(function(r){ if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
                    .then(function(data){
                        try { console.log('[NEAMOT] storeData REST ok'); } catch(e){}
                        applyStorePayload(data);
                        return data;
                    });
            }
            window.fetchStoreDataViaRest = fetchStoreDataViaRest;
            database.ref('storeData').once('value').then((snapshot) => {
                try { console.log('[NEAMOT] storeData loaded', snapshot.exists() ? 'ok' : 'empty'); } catch (e) {}
                applyStorePayload(snapshot.val());
            }).catch((err) => {
                try { console.warn('[NEAMOT] storeData SDK error', err && err.message); } catch (e) {}
                fetchStoreDataViaRest().catch(function(){
                    panelDatabase = panelDatabase && Object.keys(panelDatabase).length ? panelDatabase : {};
                    clearTimeout(homeLoadingTimer);
                    finishHomeLoading();
                });
            });
            // Live updates after first paint
            database.ref('storeData').on('value', (snapshot) => {
                applyStorePayload(snapshot.val());
            }, (error) => {
                if (!firebaseDataLoaded) {
                    panelDatabase = panelDatabase && Object.keys(panelDatabase).length ? panelDatabase : {};
                    clearTimeout(homeLoadingTimer);
                    finishHomeLoading();
                }
            });

            const ordersListContainer = document.getElementById('home-latest-orders-list');
            if (ordersListContainer) {
                // No startup spinner: Latest Orders stays clean until Firebase returns.
                ordersListContainer.innerHTML = `<div class="orders-empty-soft" aria-hidden="true"></div>`;
                window.clearTimeout(window.latestOrdersLoadingTimeout);
            }

            database.ref('orders').limitToLast(12).on('value', async (snapshot) => {
                const container = document.getElementById('home-latest-orders-list');
                if (!container) return;

                let rawData = snapshot.val();
                window.clearTimeout(window.latestOrdersLoadingTimeout);
                const loadingEl = document.getElementById('ordersLoadingIndicator');
                if (loadingEl) loadingEl.remove();

                if (!rawData) {
                    container.innerHTML =
                        `<div class="empty-verify-msg" style="padding:8px 0;">${t('noOrders')}</div>`;
                    return;
                }

                // Show recent orders (Approved / Success / Complete / Paid preferred; fallback to any)
                let entries = Object.entries(rawData)
                    .filter(([, order]) => {
                        if (!order) return false;
                        const s = String(order.status || '').toLowerCase();
                        return s === 'approved' || s === 'success' || s === 'complete' || s === 'completed' || s === 'paid' || s.includes('approved') || s.includes('success');
                    });
                if (entries.length === 0) {
                    entries = Object.entries(rawData);
                }
                entries.sort((a, b) => {
                    const ta = Number((a[1] && a[1].timestamp) || 0);
                    const tb = Number((b[1] && b[1].timestamp) || 0);
                    return tb - ta;
                });
                entries = entries.slice(0, 5);

                if (entries.length === 0) {
                    container.innerHTML =
                        `<div class="empty-verify-msg" style="padding:8px 0;">${t('noOrders')}</div>`;
                    return;
                }

                const orderUserMap = {};
                for (let [orderKey, order] of entries) {
                    let userRecord = null;
                    const uidCandidate = order && (order.userUid || order.uid || order.userId || order.ownerUid);
                    try {
                        if (uidCandidate) {
                            const directSnap = await database.ref('User/' + String(uidCandidate)).once('value');
                            userRecord = directSnap.val() || null;
                        }
                    } catch (e) { /* try email below */ }

                    if (!userRecord && order && order.userEmail) {
                        try {
                            const userSnap = await database.ref('User').orderByChild('email').equalTo(order.userEmail).once('value');
                            const userData = userSnap.val();
                            if (userData) {
                                const uid = Object.keys(userData)[0];
                                userRecord = userData[uid] || null;
                            }
                        } catch (e) { /* ignore */ }
                    }

                    orderUserMap[orderKey] = userRecord || {};
                }

                container.innerHTML = '';
                entries.slice(0, 5).forEach(([key, order]) => {
                    const userRecord = orderUserMap[key] || {};
                    let nameToShow = userRecord.username || userRecord.displayName || order.userName || '';
                    let photoUrl = userRecord.photoURL || userRecord.photoUrl || order.photoURL || order.userPhotoURL || null;
                    try { if (!photoUrl && auth.currentUser && auth.currentUser.photoURL && order.userEmail && String(order.userEmail).toLowerCase() === String(auth.currentUser.email||'').toLowerCase()) photoUrl = auth.currentUser.photoURL; } catch (e) {}
                    if (!nameToShow && order.userEmail) nameToShow = order.userEmail.split('@')[0];
                    if (!nameToShow) nameToShow = "Guest";
                    if (nameToShow && nameToShow.includes('@')) nameToShow = nameToShow.split('@')[0];
                    // Never use a store/default logo or a letter avatar for Latest Orders.
                    const safePhotoUrl = photoUrl ? String(photoUrl).replace(/"/g, '&quot;') : '';
                    let firstLetter = nameToShow.charAt(0).toUpperCase();
                    try {
                        const cu = auth.currentUser;
                        if (cu && cu.photoURL && order.userEmail && String(order.userEmail).toLowerCase() === String(cu.email || '').toLowerCase() && order.photoURL !== cu.photoURL) {
                            database.ref('orders/' + key).update({ photoURL: cu.photoURL, userUid: cu.uid }).catch(function () {});
                        }
                    } catch (e) {}
                    let cleanPlan = order.plan ? order.plan.replace(" PLAN", "") : "Plan";
                    let cleanPrice = order.price ? order.price.replace(" TK", "") : "0";
                    const qty = order.quantity || 1;
                    const qtyBadge = qty > 1 ?
                        `<span class="order-qty-badge" style="background:#20c8f5;color:#fff;padding:0 6px;border-radius:4px;font-size:9px;font-weight:800;display:inline-flex;align-items:center;justify-content:center;line-height:1.5;min-width:24px;">+${qty}</span>` :
                        '';
                    const panelNameDisplay = order.panelName || 'Panel';
                    // Always show as PAID for approved orders only
                    const statusText = "COMPLETE ✅ (PAID)";

                    let avatarStyle = '';
                    let cardHtml = `
                            <div class="home-order-card">
                                <div class="home-order-left">
                                    <div class="home-order-avatar ${safePhotoUrl ? 'firebase-profile-avatar' : 'no-profile-photo'}"><span class="ho-letter">${firstLetter}</span>${safePhotoUrl ? `<img src="${safePhotoUrl}" alt="" referrerpolicy="no-referrer" onerror="this.remove();" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;border-radius:50%;display:block;background:#fff;">` : ''}</div>
                                    <div>
                                        <div class="home-order-name">${nameToShow}</div>
                                        <div class="home-order-desc">
                                            <span class="order-plan">${panelNameDisplay}</span>
                                            <span>•</span>
                                            <span>${cleanPlan}</span>
                                            <span>•</span>
                                            <span class="order-price">${cleanPrice} ৳</span>
                                            ${qtyBadge}
                                        </div>
                                    </div>
                                </div>
                                <div class="home-order-status">${statusText}</div>
                            </div>
                        `;
                    container.innerHTML += cardHtml;
                });
            });
        }

        // ─── PREMIUM VIP MEMBER SYSTEM ──────────────────────────
        const PREMIUM_MIN_SPENT = 1000;

        function updatePremiumMemberBadge(totalSpent) {
            const badge = document.getElementById('premium-member-badge');
            if (!badge) return;
            const isPremium = Number(totalSpent || 0) >= PREMIUM_MIN_SPENT;
            badge.style.display = isPremium ? 'flex' : 'none';
        }

        async function loadPublicPremiumMembers() {
            const container = document.getElementById('public-premium-members-list');
            if (!container) return;
            try {
                const snap = await database.ref('User').orderByChild('totalSpent').startAt(PREMIUM_MIN_SPENT).limitToLast(8).once('value');
                const data = snap.val() || {};
                const members = Object.values(data).filter(u => Number(u && u.totalSpent || 0) >= PREMIUM_MIN_SPENT);
                members.sort((a,b) => Number(b.totalSpent||0) - Number(a.totalSpent||0));

                if (!members.length) {
                    container.innerHTML = '<div class="empty-verify-msg" style="grid-column:1/-1;padding:10px 0;">No Premium Members yet.</div>';
                    return;
                }

                container.innerHTML = members.slice(0,8).map((u) => {
                    const name = String(u.username || u.displayName || 'Premium Member').replace(/[<>&"']/g, '');
                    const photo = String(u.photoURL || '').trim();
                    const first = name.charAt(0).toUpperCase();
                    const avatar = photo
                        ? `<div class="premium-member-avatar" style="background-image:url('${photo.replace(/'/g,"%27")}');color:transparent;"></div>`
                        : `<div class="premium-member-avatar">${first}</div>`;
                    return `<div class="premium-member-card">
                        ${avatar}
                        <div class="premium-member-info">
                            <div class="premium-member-name">${name}</div>
                            <div class="premium-member-status"><i class="fas fa-circle-check"></i> VIP Verified Member</div>
                        </div>
                    </div>`;
                }).join('');
            } catch (e) {
                console.warn('Premium members load error:', e);
                container.innerHTML = '<div class="empty-verify-msg" style="grid-column:1/-1;padding:10px 0;">Premium Members unavailable.</div>';
            }
        }

        // ─── SLIDER FUNCTIONS ──────────────────────────────────
        function startSlider() {
            if (sliderTimer) clearInterval(sliderTimer);
            sliderTimer = setInterval(() => {
                const slider = document.getElementById('main-slider');
                if (slider) {
                    currentSlide = (currentSlide + 1) % 2;
                    slider.style.transform = `translateX(-${currentSlide * 50}%)`;
                    updateSliderDots(currentSlide);
                }
            }, 3000);
        }

        function updateSliderDots(index) {
            const dots = document.querySelectorAll('.slider-dot');
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }

        function goToSlide(index) {
            const slider = document.getElementById('main-slider');
            if (!slider) return;
            currentSlide = index;
            slider.style.transform = `translateX(-${index * 50}%)`;
            updateSliderDots(index);
            if (sliderTimer) clearInterval(sliderTimer);
            loadPublicPremiumMembers();
        startSlider();
        }

        // Smooth touch/swipe controls + pause on press/hover
        (function initSliderInteractions(){
            const container = document.getElementById('home-slider-container');
            if (!container || container.dataset.motionReady) return;
            container.dataset.motionReady = '1';
            let startX = 0;
            let dragging = false;
            container.addEventListener('pointerdown', e => { startX = e.clientX; dragging = true; if (sliderTimer) clearInterval(sliderTimer); });
            container.addEventListener('pointerup', e => {
                if (!dragging) return;
                dragging = false;
                const dx = e.clientX - startX;
                if (Math.abs(dx) > 35) {
                    goToSlide(dx < 0 ? 1 : 0);
                } else {
                    startSlider();
                }
            });
            container.addEventListener('pointercancel', () => { dragging = false; startSlider(); });
            container.addEventListener('pointerleave', () => { if (dragging) { dragging = false; startSlider(); } });
            container.addEventListener('mouseenter', () => { if (sliderTimer) clearInterval(sliderTimer); });
            container.addEventListener('mouseleave', () => startSlider());
        })();

        function scrollToAllPanels() {
            try {
                const el = document.getElementById('grid-all-panels') || document.getElementById('home-view');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } catch (e) {}
        }

        function openPanelFromHash(idOrSlug) {
            if (!idOrSlug) return;
            let id = String(idOrSlug).replace(/^#/, '');
            // Resolve name/slug → fixed panel ID (ID never changes)
            if (isNaN(id)) {
                const resolved = findPanelIdBySlug(id);
                if (!resolved) return;
                id = resolved;
            }
            if (firebaseDataLoaded) {
                const panel = getPanelById(id);
                if (panel) {
                    selectedId = id;
                    selectedQuantity = 1;
                    const qty = document.getElementById('qty-display');
                    if (qty) qty.value = '1';
                    openPricePanel(id);
                    // Shareable URL uses panel NAME slug, not only #panel-N
                    const slug = getPanelShareSlug(id);
                    setRouteHash(slug, true);
                    try {
                        const nm = (panel.data && panel.data.name) || (panelDatabase[id] && panelDatabase[id].name) || ('Panel ' + id);
                        document.title = nm + ' | NEAMOTpanel.store | panelstoreGHOST X';
                    } catch (e) {}
                }
            } else {
                pendingHashId = id;
            }
        }

        function handleHashOnLoad() {
            const raw = (window.location.hash || '').replace(/^#/, '');
            // Also support ?p=dripclintmod or ?panel=dripclintmod
            try {
                const qs = new URLSearchParams(window.location.search);
                const qp = qs.get('p') || qs.get('panel') || qs.get('name');
                if (qp && !raw) {
                    if (currentTab !== 'home') switchTab('home', true);
                    openPanelFromHash(qp);
                    return;
                }
            } catch (e) {}
            if (!raw) {
                return;
            }
            // #panel-all or #panel-123 (legacy) OR #dripclintmod (name slug)
            if (raw.startsWith('panel-')) {
                const id = raw.slice(6);
                if (id === 'all') {
                    switchTab('home', true);
                    setTimeout(scrollToAllPanels, 80);
                    return;
                }
                if (id && !isNaN(id)) {
                    if (currentTab !== 'home') switchTab('home', true);
                    openPanelFromHash(id);
                    return;
                }
            }
            // Name-based share link: #dripclintmod
            if (raw && raw.toLowerCase() !== 'keysreset' && !HASH_TO_TAB[raw.toLowerCase()]) {
                if (currentTab !== 'home') switchTab('home', true);
                openPanelFromHash(raw);
                return;
            }
            if (raw.toLowerCase() === 'keysreset') {
                openKeyResetPage();
                return;
            }
            const tab = HASH_TO_TAB[raw.toLowerCase()];
            if (tab) {
                // Close panel if open when switching to a main tab via hash
                try {
                    if (document.getElementById('price-panel') && document.getElementById('price-panel').classList.contains('active')) {
                        document.getElementById('price-panel').classList.remove('active');
                        isPanelOpen = false;
                    }
                } catch (e) {}
                switchTab(tab, true);
                return;
            }
        }

        window.addEventListener('hashchange', function() {
            if (internalHistoryLock) return;
            handleHashOnLoad();
        });

        // ─── QUANTITY FUNCTIONS ──────────────────────────────────
        function setQuantityFromKeyboard(value) {
            const input = document.getElementById('qty-display');
            let v = parseInt(value, 10);
            if (!Number.isFinite(v)) return;
            if (v < 1) v = 1;
            if (v > 99) v = 99;
            selectedQuantity = v;
            if (input && String(input.value) !== String(v)) input.value = String(v);
            const badge = document.getElementById('qty-badge-label');
            if (badge) badge.innerText = '×' + v;
            updatePriceTextOnly();
        }

        function adjustQuantity(delta) {
            let newQty = selectedQuantity + delta;
            if (newQty < 1) newQty = 1;
            if (newQty > 99) newQty = 99;
            selectedQuantity = newQty;
            document.getElementById('qty-display').value = String(selectedQuantity);
            updatePriceTextOnly();
            document.getElementById('qty-badge-label').innerText = '×' + selectedQuantity;
        }

        function toMathBoldText(value) {
            const map = {
                '0':'𝟎','1':'𝟏','2':'𝟐','3':'𝟑','4':'𝟒','5':'𝟓','6':'𝟔','7':'𝟕','8':'𝟖','9':'𝟗',
                'A':'𝐀','B':'𝐁','C':'𝐂','D':'𝐃','E':'𝐄','F':'𝐅','G':'𝐆','H':'𝐇','I':'𝐈','J':'𝐉','K':'𝐊','L':'𝐋','M':'𝐌','N':'𝐍','O':'𝐎','P':'𝐏','Q':'𝐐','R':'𝐑','S':'𝐒','T':'𝐓','U':'𝐔','V':'𝐕','W':'𝐖','X':'𝐗','Y':'𝐘','Z':'𝐙',
                'a':'𝐚','b':'𝐛','c':'𝐜','d':'𝐝','e':'𝐞','f':'𝐟','g':'𝐠','h':'𝐡','i':'𝐢','j':'𝐣','k':'𝐤','l':'𝐥','m':'𝐦','n':'𝐧','o':'𝐨','p':'𝐩','q':'𝐪','r':'𝐫','s':'𝐬','t':'𝐭','u':'𝐮','v':'𝐯','w':'𝐰','x':'𝐱','y':'𝐲','z':'𝐳'
            };
            return String(value ?? '').split('').map(ch => map[ch] || ch).join('');
        }
        function formatPlanLabel(label) {
            const raw = String(label || '').trim();
            const m = raw.match(/^(\d+)\s*(day|days)$/i);
            if (m) return toMathBoldText('Days ' + m[1]);
            return toMathBoldText(raw);
        }
        function formatPriceLabel(price) {
            const raw = String(price ?? '0').replace(/^৳\s*/, '');
            return '৳' + toMathBoldText(raw);
        }

        // ─── OPEN PRICE PANEL ──────────────────────────────────
        function openPricePanel(id) {
            selectedId = id;
            selectedQuantity = 1;
            selectedPanelPaymentMethod = null;
            document.getElementById('qty-display').value = '1';
            document.getElementById('qty-badge-label').innerText = '×1';
            try {
                const buyBtn = document.getElementById('panel-payment-buy-btn');
                if (buyBtn) buyBtn.innerHTML = '🛒 PURCHASE NOW';
                document.getElementById('wallet-tab')?.classList.remove('selected');
                document.getElementById('other-pay-tab')?.classList.remove('selected');
                document.getElementById('ind-upi-tab')?.classList.remove('selected');
            } catch(e) {}

            let item = getPanelById(id);
            if (!item) return;
            const panelData = item.data;
            try {
                const slug = getPanelShareSlug(id);
                setRouteHash(slug, true);
                document.title = (panelData.name || ('Panel ' + id)) + ' | NEAMOTpanel.store | panelstoreGHOST X';
            } catch (e) {}
            const panelLogo = document.getElementById('panel-logo-img');
            panelLogo.src = panelData.image || imgLink;
            panelLogo.width = 1254; panelLogo.height = 1254;
            panelLogo.decoding = 'async'; panelLogo.loading = 'eager';
            document.getElementById('panel-item-title').innerText = panelData.name || `ITEM ID: ${id}`;
            document.getElementById('panel-details-text').innerText = panelData.details || "No details available.";
            document.getElementById('panel-apk-link').href = panelData.apkLink || telegramLink;

            let flatContainer = document.getElementById('flat-plan-container');
            flatContainer.innerHTML = "";
            const planStock = panelData.planStock || {};
            if (panelData.prices) {
                let keys = Object.keys(panelData.prices);
                const planWeight = (label) => {
                    const raw = String(label || '').trim().toLowerCase();
                    const n = parseInt(raw.match(/\d+/)?.[0] || '0', 10);
                    if (/hour|hours|hr|hrs|h\b/.test(raw)) return n;
                    if (/day|days|d\b/.test(raw)) return 100 + n;
                    if (/week|weeks|wk|w\b/.test(raw)) return 200 + n * 7;
                    if (/month|months|mo\b/.test(raw)) return 300 + n * 30;
                    if (/life|lifetime|forever/.test(raw)) return 999999;
                    return 500 + n;
                };
                keys.sort((a, b) => planWeight(a) - planWeight(b));
                keys.forEach((planName) => {
                    let priceVal = panelData.prices[planName];
                    let isStockOut = planStock[planName] === true || planStock[planName] === "true";
                    let planItem = document.createElement('div');
                    planItem.className = `flat-price-item ${isStockOut ? 'stock-out-item' : ''}`;
                    planItem.innerHTML = `
                            <span class="flat-plan-name">${formatPlanLabel(planName)}</span>
                            <span class="flat-plan-price">${formatPriceLabel(priceVal)}</span>
                            <span class="plan-verified">✓ Verified Products</span>
                        `;
                    if (!isStockOut) {
                        planItem.onclick = function() {
                            let allItems = flatContainer.querySelectorAll('.flat-price-item');
                            allItems.forEach(el => {
                                if (!el.classList.contains('stock-out-item')) {
                                    el.classList.remove('selected');
                                }
                            });
                            if (!this.classList.contains('stock-out-item')) {
                                this.classList.add('selected');
                                selectedPlanGlobal = planName;
                                updatePlanVerifiedBadges(flatContainer);
                                updatePriceTextOnly();
                            }
                        };
                    }
                    flatContainer.appendChild(planItem);
                });
                let firstAvailable = flatContainer.querySelector('.flat-price-item:not(.stock-out-item)');
                if (firstAvailable) {
                    firstAvailable.classList.add('selected');
                    selectedPlanGlobal = keys.find(k => !(planStock[k] === true || planStock[k] === "true")) || null;
                    updatePlanVerifiedBadges(flatContainer);
                } else {
                    selectedPlanGlobal = null;
                }
            }
            updatePriceTextOnly();
            document.getElementById('price-panel').classList.add('active');
            if (selectedId) setRouteHash(getPanelShareSlug(selectedId), false);
            else pushAppHistory('panel');
            isPanelOpen = true;
            updateMobileBackButton();
        }

        function updatePlanVerifiedBadges(container) {
            if (!container) return;
            container.querySelectorAll('.flat-price-item').forEach(item => {
                const badge = item.querySelector('.plan-verified');
                if (badge) badge.style.display = item.classList.contains('selected') ? 'inline' : 'none';
            });
        }

        async function updatePriceTextOnly() {
            if (!selectedId || !selectedPlanGlobal) return;
            let item = getPanelById(selectedId);
            if (!item) return;
            const panelData = item.data;
            let unitPrice = (panelData.prices && panelData.prices[selectedPlanGlobal]) ? panelData.prices[selectedPlanGlobal] : "0";
            let numericPrice = parseFloat(unitPrice.toString().replace(/[^0-9.]/g, '')) || 0;
            let baseTotal = numericPrice * selectedQuantity;
            let result = await getDiscountedTotal(selectedId, selectedPlanGlobal, selectedQuantity, baseTotal);
            let total = result.total;
            let displayText = total.toFixed(0) + ' TK';
            if (result.discount > 0) displayText += ` <span style="font-size:11px;color:#16a34a;font-weight:900;margin-left:5px;">-${result.discount}% REFERRAL</span><div style="font-size:10px;color:#94a3b8;text-decoration:line-through;margin-top:2px;">${baseTotal.toFixed(0)} TK</div>`;
            else if (selectedQuantity > 1) displayText += ' <span style="font-size:11px;color:var(--gray-500);font-weight:600;margin-left:4px;">(' + unitPrice + ' × ' + selectedQuantity + ')</span>';
            document.getElementById('panel-price-text').innerHTML = displayText;
            document.getElementById('qty-badge-label').innerText = '×' + selectedQuantity;
            if (typeof refreshPanelPayBalance === 'function') refreshPanelPayBalance();
        }

        function closePanel() {
            if (walletOrderCompleted) {
                walletOrderCompleted = false;
                walletOrderPending = false;
                walletOrderInFlightId = null;
            }
            document.getElementById('price-panel').classList.remove('active');
            isPanelOpen = false;
            setRouteHash('home', true);
            updateMobileBackButton();
        }

        // ─── WALLET CONFIRM FUNCTIONS ─────────────────────────────
        function openWalletConfirm(totalPrice, balance) {
            // Reset the confirmation UI for every new purchase.
            // Do not reset anything while an order is actually in-flight.
            if (!walletOrderPending) {
                walletOrderCompleted = false;
                walletOrderInFlightId = null;
                const confirmBtn = document.getElementById('walletConfirmBtn');
                if (confirmBtn) {
                    confirmBtn.disabled = false;
                    confirmBtn.innerHTML = t('confirmOrder') || 'Confirm Order';
                }
            }
            const bal = Number(balance) || 0;
            const total = Number(totalPrice) || 0;
            const after = Math.max(0, bal - total);

            // Product / plan / qty details
            let productName = 'Panel';
            let unitPriceStr = '0';
            try {
                const panel = (typeof getPanelById === 'function') ? getPanelById(selectedId) : null;
                if (panel && panel.data) {
                    productName = panel.data.name || ('Panel ' + selectedId);
                    const prices = panel.data.prices || {};
                    unitPriceStr = prices[selectedPlanGlobal] != null ? String(prices[selectedPlanGlobal]) : '0';
                }
            } catch (e) {}
            const unitNum = parseFloat(String(unitPriceStr).replace(/[^0-9.]/g, '')) || 0;
            const qty = Number(selectedQuantity) || 1;

            const setTxt = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
            setTxt('walletConfirmProduct', productName);
            setTxt('walletConfirmPlan', (selectedPlanGlobal || '—') + (String(selectedPlanGlobal||'').toUpperCase().includes('DAY') || String(selectedPlanGlobal||'').toUpperCase().includes('LIFE') ? '' : ' PLAN'));
            setTxt('walletConfirmUnitPrice', unitNum.toFixed(0) + ' TK');
            setTxt('walletConfirmQty', '×' + qty);
            setTxt('walletConfirmTotal', total.toFixed(0) + ' TK');

            const balEl = document.getElementById('walletConfirmBalance');
            if (balEl) balEl.innerHTML = bal.toFixed(0) + ' <span class="cur">TK</span>';
            const afterEl = document.getElementById('walletConfirmAfter');
            if (afterEl) afterEl.innerHTML = after.toFixed(0) + ' <span class="cur">TK</span>';

            document.getElementById('walletConfirmOverlay').classList.add('active');
            document.body.style.overflow = 'hidden';
            updateMobileBackButton();
        }

        function closeWalletConfirm() {
            document.getElementById('walletConfirmOverlay').classList.remove('active');
            document.body.style.overflow = '';
            updateMobileBackButton();
        }

        // ─── PANEL #12 / #25 USERNAME & PASSWORD STOCK ─────────────────
        // 30 DAY = 5 credentials, 60 DAY = 5 credentials, LIFE TIME = 1 credential.
        // Panel #12 and Panel #25 each use the same credential list, with separate
        // Firebase counters so stock is reserved independently for each panel.
        // ─── ADMIN-MANAGED DELIVERY STOCK ─────────────────────────
        // Admin can pre-stock each panel with Link + Key + Username + Password.
        // Stock is consumed atomically when a Wallet Pay order is completed.
        async function reservePanelDeliveryStock(panelId, plan, quantity) {
            const ref = database.ref('panelDelivery/' + panelId + '/credentials');
            const qty = Math.max(1, Number(quantity || 1));
            let reserved = null;

            // FIFO stock: the first available matching row is delivered first,
            // then the next row on the next Wallet Pay purchase.
            const result = await ref.transaction(current => {
                const list = Array.isArray(current) ? current : [];
                const normalizedPlan = String(plan || '').trim().toUpperCase();

                const available = list.filter(item => {
                    if (!item || item.sold === true || item.reserved === true) return false;
                    const itemPlan = String(item.plan || '').trim().toUpperCase();

                    // Blank Plan means "usable for any plan".
                    return !itemPlan || !normalizedPlan || itemPlan === normalizedPlan;
                });

                if (available.length < qty) return;

                // IMPORTANT: preserve original array order.
                const selected = available.slice(0, qty);
                const ids = new Set(selected.map(x => String(x.id || '')));
                reserved = selected.map(x => ({...x}));

                // Remove only the selected FIFO rows.
                return list.filter(x => !ids.has(String(x.id || '')));
            });

            if (!result.committed || !reserved || reserved.length < qty) {
                throw new Error('Panel #' + panelId + ' · ' + (plan || 'Plan') + ' stock is finished. Admin needs to add stock in panelDelivery.');
            }

            return reserved;
        }


        // Panel #12 exclusive delivery markers — must NEVER be sent to other panels
        function isPanel12ExclusiveMessage(text) {
            const t = String(text || '');
            if (!t) return false;
            const markers = [
                /Panel\s*#\s*12/i,
                /1zBF4-Q4SNdvb0aeG7jv83yRmAmR6JF6B/,
                /s4ukhajzvsfi8y3/i,
                /itxxm7zruhi8pmd/i,
                /np78mcqurxn8t8p/i,
                /ALL\s*MOD\s*WORKING\s*LOCATION\s*FREE\s*FIRE\s*MAX/i,
                /oB55UpTEd\*GHOST X৭0\}98prox0\{max/i,
                /Location\s*Apk\s*👀/i
            ];
            return markers.some(rx => rx.test(t));
        }

        async function loadPanelDelivery(panelId) {
            const snap = await database.ref('panelDelivery/' + panelId).once('value');
            return snap.val() || {};
        }

        // ─── UNIVERSAL WALLET KEY STOCK (per panel + plan, FIFO) ───
        async function reserveWalletKeyStock(panelId, plan, quantity) {
            const qty = Math.max(1, Number(quantity || 1));
            const ref = database.ref('walletDeliveryStock/' + panelId + '/' + plan);
            let reserved = [];
            let configured = false;

            const result = await ref.transaction(current => {
                if (!current || !current.lines) return current;

                configured = true;
                const lines = Array.isArray(current.lines)
                    ? current.lines.map(x => String(x || '').trim()).filter(Boolean)
                    : Object.keys(current.lines).sort((a,b) => Number(a)-Number(b))
                        .map(k => String(current.lines[k] || '').trim()).filter(Boolean);

                if (lines.length < qty) return;

                // ATOMIC FIFO: take first N keys and delete them from Firebase.
                reserved = lines.slice(0, qty);
                return {
                    lines: lines.slice(qty),
                    used: 0
                };
            });

            if (!result.committed) {
                if (configured) throw new Error('KEY_STOCK_EMPTY_OR_INSUFFICIENT');
                return { configured: false, keys: [] };
            }

            return { configured: configured, keys: reserved };
        }

        function formatWalletStockKeys(keys) {
            const arr = Array.isArray(keys) ? keys : [];
            return arr.map((key, idx) => {
                const raw = String(key || '').trim();
                const parts = raw.split(/[|:\t]/).map(x => x.trim()).filter(Boolean);
                if (parts.length >= 2) {
                    return `🔐 Credential${arr.length > 1 ? ' #' + (idx + 1) : ''}\nUsername: ${parts[0]}\nPassword: ${parts[1]}`;
                }
                return `🔑 Key${arr.length > 1 ? ' #' + (idx + 1) : ''}: ${raw}`;
            }).join('\n\n');
        }

        // Match the selected storefront plan to the exact Admin Product ID mapping.
        // Handles harmless label differences such as "1 day", "1 DAY PLAN", and "1 DAY".
        function resolveResellerApiProductId(planMap, selectedPlan) {
            if (!planMap || typeof planMap !== 'object') return '';
            const normalize = value => String(value || '').toUpperCase()
                .replace(/\bPLAN\b/g, '')
                .replace(/\bHOURS?\b/g, 'HOUR')
                .replace(/\bDAYS?\b/g, 'DAY')
                .replace(/\s+/g, ' ').trim()
                .replace(/LIFETIME|LIFE TIME|LIFE-TIME/g, 'LIFETIME');
            const wanted = normalize(selectedPlan);
            if (!wanted) return '';
            for (const [name, id] of Object.entries(planMap)) {
                if (normalize(name) === wanted && id !== null && id !== undefined && String(id).trim() !== '') return id;
            }
            return '';
        }

        // ─── CONFIRM WALLET ORDER (Panel #13 / #15 / #26 key gen + Panel #31 Username+Password) ──
        async function confirmWalletOrder() {
            // Hard guard: one Wallet purchase can only be submitted once.
            if (walletOrderPending) {
                showToast('Wallet order is already being processed. Please wait.', '#ff4444');
                return;
            }
            walletOrderPending = true;
            walletOrderInFlightId = 'WALLET-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8);
            const btn = document.getElementById('walletConfirmBtn');
            btn.disabled = true;
            btn.innerHTML = t('confirmOrder') + '...';

            const user = auth.currentUser;
            const panel = getPanelById(selectedId);
            if (!user || !panel) {
                btn.disabled = false;
                btn.innerHTML = t('confirmOrder');
                return;
            }

            const panelData = panel.data;
            const resellerPlanProductId = resolveResellerApiProductId(panelData && panelData.apiPlanIds, selectedPlanGlobal);
            const unitPrice = panelData.prices && panelData.prices[selectedPlanGlobal]
                ? panelData.prices[selectedPlanGlobal] : "0";
            const numericPrice = parseFloat(unitPrice.toString().replace(/[^0-9.]/g, '')) || 0;
            const baseTotalPrice = numericPrice * selectedQuantity;
            const discountPercent = await getReferralDiscountForUser(user.uid);
            const totalPrice = isSafeMainIdPanel(selectedId) && discountPercent >= REFERRAL_DISCOUNT_PERCENT ? baseTotalPrice * 0.85 : baseTotalPrice;
            const isPanel12 = String(selectedId) === '12';
            const isPanel25 = String(selectedId) === '25';
            const isCredentialPanel = isPanel12 || isPanel25;
            const isPanel13 = String(selectedId) === '13';
            const isPanel16 = String(selectedId) === '16';
            const isPanel15 = String(selectedId) === '15';
            const isPanel26 = String(selectedId) === '26';
            // Panel #17 + #31 share Galaxy Pro Username/Password auto system
            const isPanel17 = String(selectedId) === '17';
            const isPanel31 = String(selectedId) === '31';
            const isGalaxyProCredPanel = isPanel17 || isPanel31;
            let reservedCredentials = [];
            let panelDeliveryData = {};
            let generatedPanel13Key = null;
            let generatedPanel15Key = null;
            let generatedPanel16Key = null;
            let generatedPanel26Key = null;
            let generatedPanel31Creds = [];
            let reservedWalletKeys = [];
            // When this selected plan has a Reseller Product ID, that API is the delivery source;
            // do not consume preloaded/manual stock for the same purchase.
            let walletKeyStockConfigured = !!(resellerPlanProductId !== undefined && resellerPlanProductId !== null && String(resellerPlanProductId).trim() !== '');

            try {
                const balanceSnapshot = await database.ref('User/' + user.uid + '/balance').once('value');
                const balance = Number(balanceSnapshot.val() || 0);
                if (balance < totalPrice) {
                    showNotification('⚠️', 'Insufficient Balance', t('insufficientBalanceMsg') || t('insufficientBalance'), 'OK', false);
                    closeWalletConfirm();
                    return;
                }

                // Load delivery data (message/link always OK).
                // STOCK (credentials FIFO) ONLY for SAFE LOCATION / MAIN ID section.
                panelDeliveryData = await loadPanelDelivery(String(selectedId));

                // ─── ALL-PANEL Wallet Admin Message (from Admin Panel Editor) ───
                // Priority: walletDeliveryStock/{id}/_template.message
                //        → storeData/panelControls/{id}.walletMessage
                //        → panelDelivery/{id}.message / deliveryText
                let walletTemplateMsg = '';
                let walletZipPass = '';
                let walletStockCredText = '';
                try {
                    const wtSnap = await database.ref('walletDeliveryStock/' + String(selectedId) + '/_template').once('value');
                    const wt = wtSnap.val() || {};
                    walletTemplateMsg = String(wt.message || '').trim();
                    walletZipPass = String(wt.zipPassword || '').trim();
                } catch (e) { console.warn('wallet template load', e); }
                try {
                    const pcSnap = await database.ref('storeData/panelControls/' + String(selectedId)).once('value');
                    const pc = pcSnap.val() || {};
                    if (!walletTemplateMsg && pc.walletMessage) {
                        walletTemplateMsg = String(pc.walletMessage || '').trim();
                    }
                    // Optional: one-line SMS/link stock (consume first available)
                    const dStock = Array.isArray(pc.deliveryStock) ? pc.deliveryStock
                        : (Array.isArray(pc.deliveryMessages) ? pc.deliveryMessages : []);
                    if (dStock.length && !walletStockCredText) {
                        const line = String(dStock[0] || '').trim();
                        if (line) {
                            walletStockCredText = line;
                            // remove consumed line
                            const rest = dStock.slice(1);
                            database.ref('storeData/panelControls/' + String(selectedId) + '/deliveryStock').set(rest).catch(()=>{});
                            database.ref('storeData/panelControls/' + String(selectedId) + '/deliveryMessages').set(rest).catch(()=>{});
                        }
                    }
                } catch (e) { console.warn('panelControls load', e); }
                // UNIVERSAL FIFO KEY STOCK: admin-created Panel + Plan queue.
                // If configured, reserve the next key(s) atomically before any auto-generator.
                try {
                    if (!walletKeyStockConfigured) {
                        const stockResult = await reserveWalletKeyStock(String(selectedId), selectedPlanGlobal, selectedQuantity);
                        walletKeyStockConfigured = !!stockResult.configured;
                        if (walletKeyStockConfigured) {
                            reservedWalletKeys = stockResult.keys || [];
                            walletStockCredText = formatWalletStockKeys(reservedWalletKeys);
                            reservedCredentials = reservedWalletKeys.map(key => ({
                                username: '',
                                password: '',
                                plan: selectedPlanGlobal || '',
                                key: key
                            }));
                        }
                    }
                } catch (stockErr) {
                    throw stockErr;
                }

                // Consume legacy user|pass lines only when the new FIFO queue is not configured.
                try {
                    const planKey = String(selectedPlanGlobal || '').trim();
                    if (!walletKeyStockConfigured && planKey) {
                        const wsRef = database.ref('walletDeliveryStock/' + String(selectedId) + '/' + planKey);
                        const wsSnap = await wsRef.once('value');
                        const ws = wsSnap.val() || {};
                        const lines = Array.isArray(ws.lines) ? ws.lines
                            : (typeof ws.lines === 'string' ? ws.lines.split('\n') : []);
                        const used = Number(ws.used || 0);
                        const qty = Math.max(1, Number(selectedQuantity || 1));
                        const available = lines.map(l => String(l || '').trim()).filter(Boolean);
                        if (available.length > used) {
                            const take = available.slice(used, used + qty);
                            if (take.length) {
                                const blocks = take.map((row, idx) => {
                                    const parts = row.split(/[|:\t]/).map(x => x.trim()).filter(Boolean);
                                    if (parts.length >= 2) {
                                        return `🔐 Credential${take.length > 1 ? ' #' + (idx + 1) : ''}\nUsername: ${parts[0]}\nPassword: ${parts[1]}`;
                                    }
                                    return `🔐 Delivery${take.length > 1 ? ' #' + (idx + 1) : ''}: ${row}`;
                                });
                                walletStockCredText = (walletStockCredText ? walletStockCredText + '\n\n' : '') + blocks.join('\n\n');
                                await wsRef.update({ used: used + take.length });
                            }
                        }
                    }
                } catch (e) { console.warn('wallet stock consume', e); }

                const isSafeStockPanel = (typeof isSafeMainIdPanel === 'function')
                    ? isSafeMainIdPanel(selectedId)
                    : [12,13,14,15,16,17,25,26,31].includes(Number(selectedId));
                if (isSafeStockPanel && !resellerPlanProductId) {
                    const deliveryList = Array.isArray(panelDeliveryData.credentials) ? panelDeliveryData.credentials : [];
                    const requestedPlanUpper = String(selectedPlanGlobal || '').trim().toUpperCase();
                    const hasMatchingAdminStock = deliveryList.some(item => {
                        if (!item || item.sold === true || item.reserved === true) return false;
                        const itemPlan = String(item.plan || '').trim().toUpperCase();
                        return (!itemPlan || !requestedPlanUpper || itemPlan === requestedPlanUpper);
                    });
                    // Auto-gen panels continue if stock empty; stock-only safe panels throw.
                    if (hasMatchingAdminStock) {
                        try {
                            reservedCredentials = await reservePanelDeliveryStock(String(selectedId), selectedPlanGlobal, selectedQuantity);
                            // FORCE: Validity / plan always from Store purchase days (selectedPlanGlobal), NEVER from admin stock validity
                            if (Array.isArray(reservedCredentials)) {
                                reservedCredentials = reservedCredentials.map(c => ({
                                    ...c,
                                    plan: selectedPlanGlobal || c.plan || '',
                                    duration: selectedPlanGlobal || c.duration || c.plan || ''
                                }));
                            }

                        } catch (stockErr) {
                            console.warn('Stock reserve failed:', stockErr && stockErr.message);
                            reservedCredentials = [];
                            const autoGenPanels = ['12','13','15','16','17','26','31'];
                            if (!autoGenPanels.includes(String(selectedId))) {
                                throw new Error('Panel #' + selectedId + ' · ' + (selectedPlanGlobal || 'Plan') + ' stock is finished. Admin needs to add stock.');
                            }
                        }
                    }
                }
                // Non–SAFE LOCATION panels: no credential stock required (delivery message/link only).

                
                // ─── RESELLER LICENSE API (per product + per plan product_id) ──
                // Product editor mapping wins when a matching plan ID is configured.
                let resellerApiUsed = false;
                try {
                    const productId = resellerPlanProductId;
                    if (productId !== undefined && productId !== null && String(productId).trim() !== '') {
                        const cfgSnap = await database.ref('storeData/resellerLicenseApi').once('value');
                        const resellerCfg = cfgSnap.val() || {};
                        if (resellerCfg.enabled === false) throw new Error('Reseller License API is disabled in Admin.');
                        if (!resellerCfg.proxyUrl) throw new Error('Reseller API Proxy URL is missing. Admin must save the Cloudflare Worker URL first.');
                        const proxyUrl = String(resellerCfg.proxyUrl).trim().replace(/\/+$/, '');
                        const qty = Math.max(1, Number(selectedQuantity || 1));
                        // Accept either a Cloudflare Worker base URL or a direct PHP proxy endpoint.
                        // Example PHP URL: https://your-domain.com/license-api/generate.php
                        const generateEndpoint = /\.php(?:\?.*)?$/i.test(proxyUrl)
                            ? proxyUrl
                            : (proxyUrl + '/generate');
                        const response = await fetch(generateEndpoint, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                            body: JSON.stringify({ product_id: Number(productId), quantity: qty })
                        });
                        const result = await response.json().catch(() => ({}));
                        if (!response.ok || result.success === false || result.status === 'error') {
                            throw new Error(result.message || result.error || ('Reseller API HTTP ' + response.status));
                        }
                        const payload = result.data || result.result || result;
                        let apiKeys = [];
                        if (Array.isArray(payload.keys)) apiKeys = payload.keys;
                        else if (Array.isArray(payload.items)) apiKeys = payload.items;
                        else if (Array.isArray(payload.licenses)) apiKeys = payload.licenses;
                        else if (payload.key) apiKeys = [payload.key];
                        else if (payload.license_key) apiKeys = [payload.license_key];
                        else if (payload.license) apiKeys = [payload.license];
                        else if (payload.generated_key) apiKeys = [payload.generated_key];
                        else if (payload.data && typeof payload.data === 'string') apiKeys = [payload.data];
                        if (!apiKeys.length && result && typeof result === 'object') {
                            const possible = result.key || result.license_key || result.license || result.code || result.generated_key;
                            if (possible) apiKeys = [possible];
                        }
                        if (!apiKeys.length) throw new Error('API responded, but no key was found in the response. Check generate.php response format.');
                        apiKeys.forEach(item => {
                            const key = (typeof item === 'string') ? item : (item.key || item.license_key || item.license || item.code || '');
                            if (key) reservedCredentials.push({ username: '', password: '', key: String(key), plan: selectedPlanGlobal, duration: selectedPlanGlobal, source: 'reseller-api' });
                        });
                        if (reservedCredentials.filter(c => c && c.source === 'reseller-api').length < qty) {
                            throw new Error('API returned fewer keys than requested (' + qty + '). Contact Admin before retrying.');
                        }
                        resellerApiUsed = true;
                        console.log('[ResellerAPI] generated keys for product', selectedId, 'plan', selectedPlanGlobal);
                    }
                } catch (resellerApiErr) {
                    console.error('[ResellerAPI] generation failed', resellerApiErr);
                    if (resellerApiErr instanceof TypeError && /fetch/i.test(String(resellerApiErr.message || ''))) {
                        throw new Error('Reseller API connection failed. In Admin, set Proxy URL to the full PHP endpoint (for example https://YOUR-DOMAIN/license-api/generate.php), upload generate.php there, and confirm the server can reach licensemanager.site.');
                    }
                    throw resellerApiErr;
                }

                // ─── UNIVERSAL PANEL API (Admin → storeData/panelApis/{id}) ──
                // Legacy API fallback only if this product/day has no Reseller API product_id mapping.
                try {
                    await ensurePanelApisLoaded();
                    const apiCfg = getPanelApiConfig(String(selectedId));
                    console.log('[PanelAPI] wallet gen panel=', selectedId, 'cfg=', apiCfg);
                    if (!resellerApiUsed && !walletKeyStockConfigured && apiCfg && apiCfg.enabled !== false && apiCfg.baseUrl
                        && !generatedPanel13Key && !generatedPanel15Key && !generatedPanel16Key
                        && !generatedPanel26Key && generatedPanel31Creds.length === 0
                        && !reservedCredentials.some(c => c && (c.key || c.username))) {
                        const qty = Math.max(1, Number(selectedQuantity || 1));
                        if (apiCfg.type === 'userpass') {
                            for (let i = 0; i < qty; i++) {
                                const cred = await generateFromPanelApi(String(selectedId), selectedPlanGlobal);
                                reservedCredentials.push({
                                    username: cred.username,
                                    password: cred.password,
                                    plan: selectedPlanGlobal || cred.duration,
                                    key: ''
                                });
                                if (String(selectedId) === '31' || String(selectedId) === '17') {
                                    generatedPanel31Creds.push(cred);
                                }
                            }
                        } else {
                            // key type — first key goes to the matching generated* var for delivery templates
                            const r = await generateFromPanelApi(String(selectedId), selectedPlanGlobal);
                            const k = r.key;
                            if (String(selectedId) === '13') generatedPanel13Key = k;
                            else if (String(selectedId) === '15') generatedPanel15Key = k;
                            else if (String(selectedId) === '16') generatedPanel16Key = k;
                            else if (String(selectedId) === '26') generatedPanel26Key = k;
                            else {
                                // generic panel: put key into reservedCredentials for adminMessage
                                reservedCredentials.push({
                                    username: '',
                                    password: '',
                                    plan: selectedPlanGlobal || r.duration,
                                    key: k
                                });
                            }
                            // extra qty keys
                            for (let i = 1; i < qty; i++) {
                                const r2 = await generateFromPanelApi(String(selectedId), selectedPlanGlobal);
                                reservedCredentials.push({
                                    username: '',
                                    password: '',
                                    plan: selectedPlanGlobal || r2.duration,
                                    key: r2.key
                                });
                            }
                        }
                    }
                } catch (apiGenErr) {
                    console.warn('Universal Panel API gen error:', apiGenErr);
                }

                // ─── PANEL #12 DIRECT USERNAME + PASSWORD (purple-all) ──
                if (isPanel12 && reservedCredentials.length === 0) {
                    const qty = Math.max(1, Number(selectedQuantity || 1));
                    for (let i = 0; i < qty; i++) {
                        try {
                            const cred = await generatePanel12Credentials(selectedPlanGlobal);
                            reservedCredentials.push({
                                username: cred.username,
                                password: cred.password,
                                plan: selectedPlanGlobal || cred.duration,
                                key: ''
                            });
                        } catch (genErr) {
                            console.warn('Panel12 gen error:', genErr);
                            const duration = normalizePanel12Duration(selectedPlanGlobal);
                            const un = 'XC_' + panel12RandomStr(4, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') + panel12RandomStr(3, '0123456789');
                            const pw = panel12RandomStr(3, 'ABCDEFGHJKLMNPQRSTUVWXYZ') + panel12RandomStr(4, '23456789') + '!';
                            reservedCredentials.push({ username: un, password: pw, plan: selectedPlanGlobal || duration, key: '' });
                        }
                    }
                }

                // ─── PANEL #13 DIRECT KEY GENERATION ────────────────
                // If this is Panel #13, generate a fresh key directly from greengalacy Firebase.
                // The duration is derived from selectedPlanGlobal (e.g., "15 DAY", "30 DAY", "60 DAY").
                if (isPanel13 && reservedCredentials.length === 0 && !generatedPanel13Key) {
                    // If Admin pre-stocked Panel #13, its stored Key is delivered instead.
                    // Otherwise keep the existing automatic key generation.
                    const duration = normalizePanel13Duration(selectedPlanGlobal);
                    const mode = "1device";
                    generatedPanel13Key = await generatePanel13Key(duration, mode);
                }

                // ─── PANEL #16 SAME KEY GEN AS #13 (Admin / greengalacy) ──
                if (isPanel16 && reservedCredentials.length === 0 && !generatedPanel16Key) {
                    const duration16 = normalizePanel13Duration(selectedPlanGlobal);
                    const mode16 = "1device";
                    generatedPanel16Key = (await generateFromPanelApi('16', duration16)).key;
                }

                // ─── PANEL #26 DIRECT KEY GENERATION ────────────────
                if (String(selectedId) === '26' && reservedCredentials.length === 0 && !generatedPanel26Key) {
                    generatedPanel26Key = await generatePanel26Key(selectedPlanGlobal, "1device");
                }

                // ─── PANEL #15 DIRECT KEY GENERATION ────────────────
                // Duration ALWAYS from Store buy plan (selectedPlanGlobal), e.g. "7 DAYS", "15 DAY", "30 DAYS", "LIFE TIME".
                // Mapped to Admin/ffnormalgalaxy format (number / lifetime / 1min) inside generatePanel15Key.
                if (isPanel15 && reservedCredentials.length === 0 && !generatedPanel15Key) {
                    const duration = selectedPlanGlobal || '7 DAY';
                    const mode = "1device";
                    generatedPanel15Key = await generatePanel15Key(duration, mode);
                }

                // ─── PANEL #17 / #31 DIRECT USERNAME + PASSWORD GENERATION ──
                // Wallet Pay → same-day auto Username/Password (progalaxy + My Keys).
                // Works for BOTH Panel #17 and Panel #31 (same Galaxy Pro system).
                if (isGalaxyProCredPanel && !walletKeyStockConfigured) {
                    // Prefer auto-generate. Only skip if admin stock already has Username+Password.
                    const stockHasUserPass = reservedCredentials.some(c => c && (c.username || c.password));
                    if (!stockHasUserPass) {
                        const qty = Math.max(1, Number(selectedQuantity || 1));
                        for (let i = 0; i < qty; i++) {
                            try {
                                const cred = await generatePanel31Credentials(selectedPlanGlobal, '1device', String(selectedId));
                                generatedPanel31Creds.push(cred);
                            } catch (genErr) {
                                console.warn('Credential gen error:', genErr);
                                // Emergency local fallback so My Keys never empty
                                const duration = normalizePanel31Duration(selectedPlanGlobal);
                                const now = Date.now();
                                const days = duration === 'lifetime' ? 0 : (parseInt(duration, 10) || 7);
                                const expiryTimestamp = duration === 'lifetime' ? 4102444800000 : now + days * 86400000;
                                generatedPanel31Creds.push({
                                    username: 'XC_' + panel31RandomStr(4, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') + panel31RandomStr(3, '0123456789'),
                                    password: panel31RandomStr(3, 'ABCDEFGHJKLMNPQRSTUVWXYZ') + panel31RandomStr(4, '23456789') + '!',
                                    duration: duration,
                                    expiryTimestamp: expiryTimestamp,
                                    expiryText: duration === 'lifetime' ? 'Lifetime (Never Expires)' : new Date(expiryTimestamp).toLocaleString()
                                });
                            }
                        }
                    }
                }

                await updateUserBalance(user.uid, totalPrice, 'subtract');

                const userSnap = await database.ref('User/' + user.uid + '/username').once('value');
                const userEmail = user.email || '';
                const userName = userSnap.val() || user.displayName || userEmail.split('@')[0] || 'Guest';
                const methodText = 'Accounts Wallet Pay';

                const credentialText = reservedCredentials.length ? reservedCredentials.map((c, idx) => `\n\n🔐 Credential ${idx + 1}${c.plan ? ` — ${c.plan}` : ''}\nKey: ${c.key || ''}\nUsername: ${c.username || ''}\nPassword: ${c.password || ''}`).join('') : '';
                const adminLink = panelDeliveryData.link ? `\n\n🔗 Download / Location Link\n${panelDeliveryData.link}` : '';
                const customMessage = panelDeliveryData.message ? `\n\n${panelDeliveryData.message}` : '';
                const panelCredentialDelivery = `🔥 Panel #${selectedId} Purchase Delivery${adminLink}${credentialText}${customMessage}`;

                // Existing direct-key panels keep their original automatic key generation.
                const panel13KeyText = generatedPanel13Key ? `\n\n🔑 ${selectedPlanGlobal} KEY\n${generatedPanel13Key}\n📋 COPY KEY` : '';
                const panel13Delivery = `TOURNAMENT GALAXY 🔥 FF MAX${panel13KeyText}\n\nFast Game Galaxy Bundle Download Then Location Active ✅\n\nLocation Apk\nhttps://www.mediafire.com/file/t0i2bl5ellwchjt/𝗚𝗮𝗹𝗮𝘅𝘆+𝗫𝗖𝗼𝗿𝗲+V0.2x+Galaxy+🟢+FF+MAX+🎮.apk/file\n\nFree Fire Max\nhttps://play.google.com/store/apps/details?id=com.dts.freefiremax\n\nLink 2 🔗\nhttps://apkpure.com/free-fire-max-game/com.dts.freefiremax\n\nTelegram ID t.me/NEAMOTsupport2\n\nTelegram Channel\nhttps://t.me/+RIDT4MtWAt1mOGU1`;

                const panel15KeyText = generatedPanel15Key ? `\n\n🔑 ${selectedPlanGlobal} KEY\n${generatedPanel15Key}\n📋 COPY KEY` : '';
                const panel15Delivery = `🔑 Panel #15 Purchase Delivery${panel15KeyText}\n\nFree Fire Normal Tournament Location ✅\n\nLocation Apk\nhttps://www.mediafire.com/file/rhrrummj62rl1nv/𝐱+𝐜𝐨𝐫𝐞+𝐩𝐚𝐧𝐞𝐥+𝐯𝐢𝐩_2.0.apk/file\n\nFree Fire Link 🔗\nhttps://play.google.com/store/apps/details?id=com.dts.freefireth`;

                const panel26KeyText = generatedPanel26Key ? `\n\n🔑 ${selectedPlanGlobal} KEY\n${generatedPanel26Key}\n📋 COPY KEY` : '';
                const panel26Delivery = `3D HOLOGRAM MAIN ID SAFE 🔥${panel26KeyText}\n\n3D Location Link 🔗\nhttps://www.mediafire.com/file/4e6lzjez6uhldva/𝟑𝐃+𝐗+𝐂𝐨𝐫𝐞+𝐕𝐢𝐩_.apk/file\n\nFree Fire Max Link 🔗\nhttps://www.mediafire.com/file/np78mcqurxn8t8p/নতুন+Updated+GHOST Xpanel+Free+Fire+Max+🔥.apks/file`;

                // Panel #17 / #31: Username + Password (same-day generation via Wallet Pay)
                let panel31Delivery = '';
                if (generatedPanel31Creds.length || (isGalaxyProCredPanel && reservedCredentials.some(c => c && (c.username || c.password)))) {
                    let credBlocks = '';
                    if (generatedPanel31Creds.length) {
                        credBlocks = generatedPanel31Creds.map((c, idx) => {
                            const label = generatedPanel31Creds.length > 1 ? ` #${idx + 1}` : '';
                            return `\n\n🔐 Login Credential${label}\nUsername: ${c.username}\nPassword: ${c.password}\nDuration: ${c.duration === 'lifetime' ? 'Lifetime' : c.duration + ' Days'}\nExpiry: ${c.expiryText}`;
                        }).join('');
                    } else {
                        credBlocks = reservedCredentials.map((c, idx) => {
                            const label = reservedCredentials.length > 1 ? ` #${idx + 1}` : '';
                            return `\n\n🔐 Login Credential${label}\nUsername: ${c.username || ''}\nPassword: ${c.password || ''}\nKey: ${c.key || ''}`;
                        }).join('');
                    }
                    const panelLabel = isPanel17 ? '17' : '31';
                    panel31Delivery = `🔥 Panel #${panelLabel} SAFE LOCATION / MAIN ID 🔥${credBlocks}\n\n✅ Auto generated on purchase day (Wallet Pay)\n📱 1 Device Only\n\nGalaxy Pro Link 👇\n🔥https://www.mediafire.com/file/ksgstx3cni0bre9/𝗣𝗿𝗼+🔥𝗚𝗮𝗹𝗮𝘅𝘆+𝗫𝗖𝗼𝗿𝗲+👀+𝗦𝗮𝗳𝗲+𝗣𝗮𝗻𝗲𝗹🎯.apk/file\n\nGame Support Link 👇\n\nFree Fire Link 👇\n🔥https://play.google.com/store/apps/details?id=com.dts.freefireth\n\nFree Fire Max Link 👇\n🔥https://play.google.com/store/apps/details?id=com.dts.freefiremax\n\nFree Fire Max Link 👇 2 Browser\n🔥https://apkpure.com/free-fire-max-game/com.dts.freefiremax\nTelegram t.me/NEAMOTsupport2`;
                }

                // Panel #12 delivery — single clean message (no double links)
                // Admin changes body via Firebase: panelDelivery/12/deliveryText
                // (fallback: panelDelivery/12/message). Key / Username / Password stay from stock.
                let panel12Delivery = '';
                if (isPanel12) {
                    const p12Cred = reservedCredentials.length
                        ? reservedCredentials.map((c, idx) => {
                            const label = reservedCredentials.length > 1 ? ` #${idx + 1}` : '';
                            const parts = [];
                            if (c.key) parts.push(`Key: ${c.key}`);
                            if (c.username) parts.push(`Username: ${c.username}`);
                            if (c.password) parts.push(`Password: ${c.password}`);
                            return `\n\n🔐 Credential${label}${c.plan ? ` — ${c.plan}` : ''}\n${parts.join('\n')}`;
                        }).join('')
                        : '';

                    // ONE body only — admin-controlled; never append link+message+hardcoded together
                    const adminBody = String(
                        panelDeliveryData.deliveryText ||
                        panelDeliveryData.message ||
                        ''
                    ).trim();

                    // Panel #12 delivery — credentials + admin message only (no stock links)
                    // Admin sets body via Firebase: panelDelivery/12/deliveryText or message
                    const bodyOnly = adminBody || '';
                    panel12Delivery = `🔥 Panel #12 Purchase Delivery${p12Cred}` + (bodyOnly ? `\n\n${bodyOnly}` : '');
                }

                
                let panel16Delivery = '';
                if (isPanel16) {
                    const p16Key = generatedPanel16Key || (reservedCredentials[0] && (reservedCredentials[0].key || reservedCredentials[0].licenseKey)) || '';
                    const keyLine = p16Key ? `\n\n🔑 Key: ${p16Key}\n` : '';
                    panel16Delivery = `TOURNAMENT GALAXY 🔥 FF MAX

Fast Game Galaxy Bundle Download Then Location Active ✅
${keyLine}
🛒Location Apk 👇
https://www.mediafire.com/file/e7dbfg8f6iz6dic/𝗚𝗮𝗹𝗮𝘅𝘆+𝗫𝗖𝗼𝗿𝗲+V0.2x+Galaxy+🟣+FF+MAX+🎮.apk/file

🛒Free Fire Max 👇
https://play.google.com/store/apps/details?id=com.dts.freefiremax

🛒,Link 2 🔗 👇
https://apkpure.com/free-fire-max-game/com.dts.freefiremax

Telegram ID t.me/NEAMOTsupport2

Telegram Channel https://t.me/+RIDT4MtWAt1mOGU`;
                }

                const orderData = {
                    panelId: String(selectedId),
                    panelName: panelData.name || 'Panel',
                    plan: selectedPlanGlobal + " PLAN",
                    price: totalPrice.toFixed(0) + ' TK',
                    originalPrice: baseTotalPrice.toFixed(0) + ' TK',
                    referralDiscount: (isSafeMainIdPanel(selectedId) && discountPercent >= 15) ? '15%' : '0%',
                    method: methodText,
                    transactionId: walletOrderInFlightId,
                    status: "Approved",
                    resellerApiUsed: !!resellerApiUsed,
                    resellerApiKeys: resellerApiUsed ? reservedCredentials.filter(c => c && c.source === 'reseller-api').map(c => String(c.key || c.licenseKey || '')).filter(Boolean) : [],
                    adminMessage: (function(){
                        // Reseller API keys are the only delivery content for API-linked plans.
                        if (resellerApiUsed) {
                            const apiKeys = reservedCredentials.filter(c => c && c.source === 'reseller-api').map(c => String(c.key || c.licenseKey || '')).filter(Boolean);
                            return apiKeys.map((key, index) => `Your Key${apiKeys.length > 1 ? ' #' + (index + 1) : ''}: ${key}`).join('\n');
                        }
                        // UNIVERSAL FIFO STOCK ALWAYS WINS for the selected Panel + Plan.
                        if (walletKeyStockConfigured && walletStockCredText) {
                            const body = walletTemplateMsg && !isPanel12ExclusiveMessage(walletTemplateMsg)
                                ? '\n\n' + walletTemplateMsg : '';
                            return walletStockCredText + body;
                        }
                        // SAFE LOCATION / MAIN ID — panel-specific delivery only
                        if (isPanel12) return panel12Delivery;
                        if (isPanel13) return panel13Delivery;
                        if (isPanel15) return panel15Delivery;
                        if (isPanel16) return panel16Delivery;
                        if (isPanel26) return panel26Delivery;
                        if (isGalaxyProCredPanel && panel31Delivery) return panel31Delivery;
                        // Universal API / any panel with generated credentials
                        if (reservedCredentials.length && reservedCredentials.some(c => c && (c.key || c.username || c.password))) {
                            return panelCredentialDelivery;
                        }
                        // Safe section with reserved admin stock credentials
                        if ((typeof isSafeMainIdPanel === 'function' ? isSafeMainIdPanel(selectedId) : false)
                            && (reservedCredentials.length || panelDeliveryData.message || panelDeliveryData.link)) {
                            return panelCredentialDelivery;
                        }
                        // ALL OTHER SECTIONS — custom admin message per panel
                        // Panel #12 exclusive links/message are BLOCKED here (only panel 12 may use them)
                        const parts = [];
                        if (walletStockCredText && !isPanel12ExclusiveMessage(walletStockCredText)) {
                            parts.push(walletStockCredText);
                        }
                        let customBody = walletTemplateMsg
                            || String(panelDeliveryData.deliveryText || panelDeliveryData.message || '').trim();
                        // Never leak Panel #12 delivery pack to other panels
                        if (customBody && isPanel12ExclusiveMessage(customBody)) {
                            customBody = '';
                        }
                        if (customBody) parts.push(customBody);
                        if (walletZipPass && !isPanel12ExclusiveMessage(walletZipPass)) {
                            parts.push('🔐 Zip Password: ' + walletZipPass);
                        }
                        const pdLink = String(panelDeliveryData.link || '').trim();
                        if (pdLink && !isPanel12ExclusiveMessage(pdLink)) {
                            parts.push('🔗 Link: ' + pdLink);
                        }
                        if (parts.length) return parts.join('\n\n');
                        // Final fallback if admin has not set a message for this panel
                        return '';
                    })(),
                    userEmail: userEmail,
                    userName: userName,
                    userPhone: "",
                    quantity: selectedQuantity,
                    timestamp: firebase.database.ServerValue.TIMESTAMP
                };

                const walletOrderRef = database.ref('orders').push();
                await walletOrderRef.set(orderData);
                if (walletKeyStockConfigured && reservedWalletKeys.length) {
                    await Promise.all(reservedWalletKeys.map(soldKey => {
                        const h = database.ref('walletKeyHistory').push();
                        return h.set({ key:String(soldKey||''), panelId:String(selectedId), panelName:panelData.name||'Panel', plan:String(selectedPlanGlobal||''), quantity:1, userUid:user.uid, userEmail:userEmail||'', userName:userName||'', orderId:walletOrderRef.key, transactionId:walletOrderInFlightId, price:totalPrice.toFixed(0)+' TK', timestamp:firebase.database.ServerValue.TIMESTAMP });
                    }));
                }
                try { if (typeof notifyAdminNewOrder === 'function') notifyAdminNewOrder(orderData, walletOrderRef.key); } catch (e) {}

                closeWalletConfirm();
                showVerifyingPopup();
                setTimeout(() => {
                    closeVerifyingPopup();
                    closePanel();
                    showNotification('✅', t('orderPlaced'), t('orderSuccess') + ' (×' +
                        selectedQuantity + ')', 'OK, Got it!', true);
                    switchTab('verify');
                    loadUserBalance(user.uid);
                    updateTotalOrdersCount();
                    walletOrderCompleted = false;
                    walletOrderPending = false;
                    walletOrderInFlightId = null;
                    btn.disabled = false;
                    btn.innerHTML = t('confirmOrder');
                }, 1500);
            } catch (err) {
                showToast("Error: " + (err.message || err), "#ff4444");
                walletOrderPending = false;
                walletOrderInFlightId = null;
                btn.disabled = false;
                btn.innerHTML = t('confirmOrder');
                closeWalletConfirm();
            }
        }

        // ─── WALLET PAYMENT ──────────────────────────────────────
        async function buyWithWallet() {
            if (walletOrderPending) {
                showToast('Previous Wallet order is still processing. Please wait.', '#ff4444');
                return;
            }
            if (!auth.currentUser) {
                showToast(t('pleaseLogin'), "#ff4444");
                return;
            }
            if (typeof window.NEAMOTCheckPurchaseControl === 'function' && !(await window.NEAMOTCheckPurchaseControl(selectedId))) return;
            if (!selectedId || !selectedPlanGlobal) {
                showToast('Products Select Please', "#ff4444", "⚠️");
                return;
            }
            {
                const itemChk = typeof getPanelById === 'function' ? getPanelById(selectedId) : null;
                const pricesChk = itemChk && itemChk.data && itemChk.data.prices ? itemChk.data.prices : null;
                const rawChk = pricesChk && pricesChk[selectedPlanGlobal] != null ? String(pricesChk[selectedPlanGlobal]) : '0';
                const unitChk = parseFloat(String(rawChk).replace(/[^0-9.]/g,'')) || 0;
                const totalChk = unitChk * (Number(selectedQuantity) || 1);
                if (!(totalChk > 0)) {
                    showToast('Products Select Please', "#ff4444", "⚠️");
                    return;
                }
            }

            const panel = getPanelById(selectedId);
            if (!panel) return;
            const panelData = panel.data;
            const planStock = panelData.planStock || {};

            if (planStock[selectedPlanGlobal] === true || planStock[selectedPlanGlobal] === "true") {
                showToast(t('stockOutMsg'), "#ff4444");
                return;
            }

            const unitPrice = panelData.prices && panelData.prices[selectedPlanGlobal] ? panelData.prices[selectedPlanGlobal] :
                "0";
            const numericPrice = parseFloat(unitPrice.toString().replace(/[^0-9.]/g, '')) || 0;
            const baseTotalPrice = numericPrice * selectedQuantity;
            const user = auth.currentUser;

            getDiscountedTotal(selectedId, selectedPlanGlobal, selectedQuantity, baseTotalPrice).then(({total:totalPrice,discount}) => {
                database.ref('User/' + user.uid + '/balance').once('value').then((snapshot) => {
                    const balance = snapshot.val() || 0;
                    if (balance < totalPrice) {
                        showNotification('⚠️', 'Insufficient Balance', t('insufficientBalanceMsg') || t('insufficientBalance'), 'OK', false);
                        setTimeout(() => { try { switchTab('addfunds'); } catch(e) {} }, 450);
                        return;
                    }
                    openWalletConfirm(totalPrice, balance);
                }).catch((err)=>showToast('Error: '+err.message,'#ff4444'));
            });
            return;

            /* legacy balance check below intentionally unreachable */

            database.ref('User/' + user.uid + '/balance').once('value')
                .then((snapshot) => {
                    const balance = snapshot.val() || 0;
                    if (balance < totalPrice) {
                        showNotification('⚠️', 'Insufficient Balance', t('insufficientBalanceMsg') || t('insufficientBalance'), 'OK', false);
                        return;
                    }
                    openWalletConfirm(totalPrice, balance);
                })
                .catch((err) => {
                    showToast("Error: " + err.message, "#ff4444");
                });
        }

        function copyDeliveredKey(key) {
            const text = String(key || '').trim();
            if (!text) return;
            const done = () => typeof showToast === 'function' && showToast('✅ Key copied!', '#22c55e');
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopyKey(text));
            } else fallbackCopyKey(text);
        }

        function fallbackCopyKey(text) {
            const ta = document.createElement('textarea');
            ta.value = text;
            ta.style.position = 'fixed';
            ta.style.left = '-9999px';
            document.body.appendChild(ta);
            ta.select();
            try {
                document.execCommand('copy');
                if (typeof showToast === 'function') showToast('✅ Key copied!', '#22c55e');
            } catch (e) {
                if (typeof showToast === 'function') showToast('Copy failed. Copy manually.', '#ff4444');
            }
            ta.remove();
        }

        // ─── PAYMENT METHOD SELECTOR ──────────────────────────
        let selectedPanelPaymentMethod = null;

        function selectPanelPaymentMethod(method) {
            selectedPanelPaymentMethod = method;
            const wallet = document.getElementById('wallet-tab');
            const other = document.getElementById('other-pay-tab');
            const indUpi = document.getElementById('ind-upi-tab');
            if (wallet) wallet.classList.toggle('selected', method === 'wallet');
            if (other) other.classList.toggle('selected', method === 'other');
            if (indUpi) indUpi.classList.toggle('selected', method === 'ind_upi');

            // Update BUY NOW → Purchase Now when payment method selected
            const buyBtn = document.getElementById('panel-payment-buy-btn');
            if (buyBtn && (method === 'wallet' || method === 'ind_upi' || method === 'other')) {
                buyBtn.innerHTML = '🛒 Purchase Now';
            }

            // Wallet Pay click → open Confirm Order popup (if plan selected)
            if (method === 'wallet') {
                if (selectedId && selectedPlanGlobal) {
                    setTimeout(function() { buyWithWallet(); }, 80);
                } else {
                    showToast('Products Select Please', '#ff4444', '⚠️');
                }
            }
            // IND UPI click → open IND UPI QR page (if plan selected)
            if (method === 'ind_upi') {
                if (selectedId && selectedPlanGlobal) {
                    setTimeout(function() { openIndUpiPage(); }, 80);
                } else {
                    showToast('Products Select Please', '#ff4444', '⚠️');
                }
            }
        }

        function confirmPanelPaymentMethod() {
            if (!auth.currentUser) {
                showToast(t('pleaseLogin'), '#ff4444');
                if (typeof openLogin === 'function') openLogin();
                else if (typeof navigateToAuth === 'function') { navigateToAuth('login'); switchTab('account'); }
                return;
            }
            if (!selectedId || !selectedPlanGlobal) {
                showToast('Products Select Please', '#ff4444', '⚠️');
                return;
            }
            {
                const itemChk = typeof getPanelById === 'function' ? getPanelById(selectedId) : null;
                const pricesChk = itemChk && itemChk.data && itemChk.data.prices ? itemChk.data.prices : null;
                const rawChk = pricesChk && pricesChk[selectedPlanGlobal] != null ? String(pricesChk[selectedPlanGlobal]) : '0';
                const unitChk = parseFloat(String(rawChk).replace(/[^0-9.]/g,'')) || 0;
                if (!(unitChk * (Number(selectedQuantity) || 1) > 0)) {
                    showToast('Products Select Please', '#ff4444', '⚠️');
                    return;
                }
            }
            if (!selectedPanelPaymentMethod) {
                showToast('Please select a payment method first', '#ff4444', '⚠️');
                return;
            }
            if (selectedPanelPaymentMethod === 'wallet') {
                buyWithWallet();
            } else if (selectedPanelPaymentMethod === 'other') {
                openOtherPaymentPage();
            } else if (selectedPanelPaymentMethod === 'ind_upi') {
                openIndUpiPage();
            }
        }

        function updatePanelPayBuyBtn() {
            const btn = document.getElementById('panel-payment-buy-btn');
            if (!btn) return;
            if (!auth.currentUser) {
                btn.textContent = 'LOGIN NOW';
            } else if (selectedPanelPaymentMethod === 'wallet' || selectedPanelPaymentMethod === 'ind_upi' || selectedPanelPaymentMethod === 'other') {
                btn.innerHTML = '🛒 Purchase Now';
            } else {
                btn.innerHTML = '🛒 ' + (typeof t === 'function' ? t('buyNow') : 'BUY NOW');
            }
        }

        function refreshPanelPayBalance() {
            const balEl = document.getElementById('panel-user-balance-text');
            const needEl = document.getElementById('panel-need-amount-text');
            if (!needEl) return;
            let need = 0;
            if (selectedId && selectedPlanGlobal) {
                const item = getPanelById(selectedId);
                const prices = item && item.data && item.data.prices ? item.data.prices : null;
                const raw = prices && prices[selectedPlanGlobal] != null ? String(prices[selectedPlanGlobal]) : '0';
                const unit = parseFloat(raw.replace(/[^0-9.]/g,'')) || 0;
                need = unit * (Number(selectedQuantity) || 1);
            }
            needEl.textContent = '৳' + Math.round(need);
            if (!auth.currentUser) {
                if (balEl) balEl.textContent = '৳0';
                updatePanelPayBuyBtn();
                return;
            }
            if (balEl) balEl.textContent = '...';
            const uid = auth.currentUser.uid;
            database.ref('User/' + uid + '/balance').once('value').then(function(snap) {
                const bal = parseFloat(snap.val()) || 0;
                if (balEl) balEl.textContent = '৳' + Math.round(bal);
            }).catch(function() { if (balEl) balEl.textContent = '৳0'; });
            updatePanelPayBuyBtn();
        }

        function resetPanelPaymentMethod() {
            selectedPanelPaymentMethod = null;
            const wallet = document.getElementById('wallet-tab');
            const other = document.getElementById('other-pay-tab');
            const indUpi = document.getElementById('ind-upi-tab');
            if (wallet) wallet.classList.remove('selected');
            if (other) other.classList.remove('selected');
            if (indUpi) indUpi.classList.remove('selected');
        }

        // ─── IND UPI PAYMENT ───────────────────────────────────
        
        async function openIndUpiPage() {
            if (!auth.currentUser) {
                showToast(t('pleaseLogin'), "#ff4444");
                closePanel();
                navigateToAuth('login');
                switchTab('account');
                return;
            }
            if (!selectedId || !selectedPlanGlobal) {
                showToast('Products Select Please', "#ff4444", "⚠️");
                return;
            }
            const panel = getPanelById(selectedId);
            if (!panel) return;
            const unitPrice = panel.data.prices && panel.data.prices[selectedPlanGlobal] ? panel.data.prices[selectedPlanGlobal] : '0';
            const numericPrice = parseFloat(String(unitPrice).replace(/[^0-9.]/g, '')) || 0;
            const baseTotalPrice = numericPrice * (Number(selectedQuantity) || 1);
            let totalPrice = baseTotalPrice;
            try {
                const discount = await getReferralDiscountForUser(auth.currentUser.uid);
                if (typeof isSafeMainIdPanel === 'function' && isSafeMainIdPanel(selectedId) && discount >= (typeof REFERRAL_DISCOUNT_PERCENT !== 'undefined' ? REFERRAL_DISCOUNT_PERCENT : 15)) {
                    totalPrice = baseTotalPrice * 0.85;
                }
            } catch (e) {}
            const amountEl = document.getElementById('ind-upi-amount-pill');
            if (amountEl) amountEl.textContent = '₹' + totalPrice.toFixed(0);
            const page = document.getElementById('ind-upi-payment-page');
            if (page) page.classList.add('active');
            if (typeof pushAppHistory === 'function') pushAppHistory('ind-upi-payment');
            document.body.style.overflow = 'hidden';
            if (typeof updateMobileBackButton === 'function') updateMobileBackButton();
        }

        function showIndUpiMethodSelect() {
            const existing = document.getElementById('ind-upi-method-select-overlay');
            if (existing) existing.remove();
            const overlay = document.createElement('div');
            overlay.id = 'ind-upi-method-select-overlay';
            overlay.style.cssText = 'position:fixed;inset:0;z-index:99999990;background:rgba(0,0,0,.8);backdrop-filter:blur(8px);display:flex;align-items:flex-end;justify-content:center;';
            overlay.innerHTML = `
              <div style="width:100%;max-width:480px;background:#0a0a0a;border-radius:22px 22px 0 0;padding:18px 16px 28px;border-top:1px solid rgba(32,200,245,.4);box-shadow:0 -10px 40px rgba(0,0,0,.5);">
                <div style="width:42px;height:4px;background:#333;border-radius:4px;margin:0 auto 14px;"></div>
                <h3 style="color:#fff;text-align:center;margin:0 0 6px;font-size:16px;font-weight:900;">SELECT PAYMENT</h3>
                <p style="color:#9ca3af;text-align:center;font-size:12px;margin:0 0 14px;">Choose a method • Share link opens directly</p>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
                  <button type="button" onclick="selectSecurePayMethod('bkash')" style="padding:14px 10px;border-radius:14px;border:1px solid #d12053;background:rgba(209,32,83,.15);color:#fff;font-weight:800;cursor:pointer;">bKash</button>
                  <button type="button" onclick="selectSecurePayMethod('nagad')" style="padding:14px 10px;border-radius:14px;border:1px solid #d31219;background:rgba(211,18,25,.15);color:#fff;font-weight:800;cursor:pointer;">Nagad</button>
                  <button type="button" onclick="selectSecurePayMethod('rocket')" style="padding:14px 10px;border-radius:14px;border:1px solid #8b5cf6;background:rgba(139,92,246,.15);color:#fff;font-weight:800;cursor:pointer;">Rocket</button>
                  <button type="button" onclick="selectSecurePayMethod('binance')" style="padding:14px 10px;border-radius:14px;border:1px solid #ffffff;background:rgba(255,255,255,.12);color:#fff;font-weight:800;cursor:pointer;">Binance</button>
                </div>
                <button type="button" onclick="document.getElementById('ind-upi-method-select-overlay')?.remove()" style="margin-top:14px;width:100%;padding:12px;border-radius:12px;border:1px solid #333;background:#111;color:#fff;font-weight:700;cursor:pointer;">Cancel</button>
              </div>`;
            document.body.appendChild(overlay);
        }

        function selectSecurePayMethod(method) {
            const el = document.getElementById('ind-upi-method-select-overlay');
            if (el) el.remove();
            // Hash route so share opens direct: /#securepay/bkash etc.
            try {
              const base = (location.origin + location.pathname).replace(/\/$/, '');
              history.replaceState(null, '', base + '/#securepay/' + method);
            } catch(e) {}
            // Open mobile banking first then specific method so back returns to Mobile Banking
            if (typeof openOtherPaymentPage === 'function') {
              openOtherPaymentPage().then(() => {
                if (typeof goToPaymentPage === 'function') goToPaymentPage(method);
              }).catch(() => {
                if (typeof goToPaymentPage === 'function') goToPaymentPage(method);
              });
            } else if (typeof goToPaymentPage === 'function') {
              goToPaymentPage(method);
            }
        }

        // Deep-link support: /#securepay/bkash | nagad | rocket | binance
        function handleSecurePayHash() {
            const h = (location.hash || '').toLowerCase();
            const m = h.match(/^#\/?securepay\/(bkash|nagad|rocket|binance)/);
            if (!m) return;
            const method = m[1];
            setTimeout(() => {
              if (typeof selectSecurePayMethod === 'function') selectSecurePayMethod(method);
            }, 600);
        }
        window.addEventListener('hashchange', handleSecurePayHash);
        document.addEventListener('DOMContentLoaded', handleSecurePayHash);
        setTimeout(handleSecurePayHash, 1200);

        function closeIndUpiPage() {
            const page = document.getElementById('ind-upi-payment-page');
            if (page) page.classList.remove('active');
            document.body.style.overflow = '';
            updateMobileBackButton();
        }

        // ─── PAYMENT PAGE FUNCTIONS ────────────────────────────
        async function openOtherPaymentPage() {
            if (!auth.currentUser) {
                showToast(t('pleaseLogin'), "#ff4444");
                closePanel();
                navigateToAuth('login');
                switchTab('account');
                return;
            }
            if (typeof window.NEAMOTCheckPurchaseControl === 'function' && !(await window.NEAMOTCheckPurchaseControl(selectedId))) return;
            if (!selectedId || !selectedPlanGlobal) {
                showToast('Products Select Please', "#ff4444", "⚠️");
                return;
            }
            {
                const itemChk = typeof getPanelById === 'function' ? getPanelById(selectedId) : null;
                const pricesChk = itemChk && itemChk.data && itemChk.data.prices ? itemChk.data.prices : null;
                const rawChk = pricesChk && pricesChk[selectedPlanGlobal] != null ? String(pricesChk[selectedPlanGlobal]) : '0';
                const unitChk = parseFloat(String(rawChk).replace(/[^0-9.]/g,'')) || 0;
                const totalChk = unitChk * (Number(selectedQuantity) || 1);
                if (!(totalChk > 0)) {
                    showToast('Products Select Please', "#ff4444", "⚠️");
                    return;
                }
            }
            const panel = getPanelById(selectedId);
            const unitPrice = panel && panel.data.prices && panel.data.prices[selectedPlanGlobal] ? panel.data.prices[
                selectedPlanGlobal] : '0';
            const numericPrice = parseFloat(unitPrice.toString().replace(/[^0-9.]/g, '')) || 0;
            const baseOtherPrice = numericPrice * selectedQuantity;
            const otherDiscount = await getReferralDiscountForUser(auth.currentUser.uid);
            const totalPrice = isSafeMainIdPanel(selectedId) && otherDiscount >= 15 ? baseOtherPrice * 0.85 : baseOtherPrice;
            const otherAmount = document.getElementById('other-pay-total-amount');
            if (otherAmount) otherAmount.textContent = totalPrice.toFixed(0);
            // BDT → USD conversion for Binance Pay (approx rate)
            const USD_RATE = window.NEAMOT_USD_RATE || 120; // 1 USD ≈ 120 BDT
            const usdAmount = totalPrice / USD_RATE;
            const usdHint = document.getElementById('other-pay-usd-hint');
            const usdEl = document.getElementById('other-pay-usd-amount');
            if (usdEl) usdEl.textContent = usdAmount.toFixed(2);
            if (usdHint) usdHint.style.display = 'block';
            window.__otherPayTotalBDT = totalPrice;
            window.__otherPayTotalUSD = usdAmount;

            // Other Pay intentionally has no panel logo/name header.
            document.getElementById('other-payment-page').classList.add('active');
            pushAppHistory('other-payment');
            document.body.style.overflow = 'hidden';
            updateMobileBackButton();
        }

        async function goToSelectedPaymentFromOther() {
            if (!selectedId || !selectedPlanGlobal) { showToast(t('selectPlanFirst'), "#ff4444"); return; }
            if (typeof window.NEAMOTCheckPurchaseControl === 'function' && !(await window.NEAMOTCheckPurchaseControl(selectedId))) return;
            goToPaymentPage('bkash');
        }

        function closeOtherPaymentPage() {
            const page = document.getElementById('other-payment-page');
            if (page) page.classList.remove('active');
            document.body.style.overflow = '';
            updateMobileBackButton();
        }

        function toggleOtherPay() {
            openOtherPaymentPage();
        }

        
        window.spinAndGoPayment = function(btn, method) {
            if (!btn) { goToPaymentPage(method); return; }
            btn.classList.add('spinning');
            setTimeout(function() {
                btn.classList.remove('spinning');
                goToPaymentPage(method);
            }, 520);
        };

        async function goToPaymentPage(method) {
            if (!auth.currentUser) {
                showToast(t('pleaseLogin'), "#ff4444");
                closePanel();
                navigateToAuth('login');
                switchTab('account');
                return;
            }

            if (!selectedId || !selectedPlanGlobal) {
                showToast('Products Select Please', "#ff4444", "⚠️");
                return;
            }
            {
                const itemChk = typeof getPanelById === 'function' ? getPanelById(selectedId) : null;
                const pricesChk = itemChk && itemChk.data && itemChk.data.prices ? itemChk.data.prices : null;
                const rawChk = pricesChk && pricesChk[selectedPlanGlobal] != null ? String(pricesChk[selectedPlanGlobal]) : '0';
                const unitChk = parseFloat(String(rawChk).replace(/[^0-9.]/g,'')) || 0;
                const totalChk = unitChk * (Number(selectedQuantity) || 1);
                if (!(totalChk > 0)) {
                    showToast('Products Select Please', "#ff4444", "⚠️");
                    return;
                }
            }

            const panel = getPanelById(selectedId);
            if (!panel) return;
            const panelData = panel.data;
            const planStock = panelData.planStock || {};

            if (planStock[selectedPlanGlobal] === true || planStock[selectedPlanGlobal] === "true") {
                showToast(t('stockOutMsg'), "#ff4444");
                return;
            }

            const unitPrice = panelData.prices && panelData.prices[selectedPlanGlobal] ? panelData.prices[selectedPlanGlobal] :
                "0";
            const numericPrice = parseFloat(unitPrice.toString().replace(/[^0-9.]/g, '')) || 0;
            const baseTotalPrice = numericPrice * selectedQuantity;
            const discount = await getReferralDiscountForUser(auth.currentUser.uid);
            const totalPrice = isSafeMainIdPanel(selectedId) && discount >= REFERRAL_DISCOUNT_PERCENT ? baseTotalPrice * 0.85 : baseTotalPrice;
            selectedMethod = method;
            openPaymentPage(selectedId, selectedPlanGlobal, totalPrice, method);
        }

        function openPaymentPage(panelId, planName, totalPrice, method) {
            const card = document.getElementById('payment-card-exact');
            const verifyBtn = document.getElementById('pay-verify-btn');
            const headerTitle = document.getElementById('pay-header-title');
            const summaryPanel = document.getElementById('payment-panel-summary');
            const summaryPlan = document.getElementById('payment-plan-summary');
            const summaryPrice = document.getElementById('payment-price-summary');
            const amountPill = document.getElementById('pay-amount-pill');
            const payPage = document.getElementById('payment-page');
            const noticeBar = document.getElementById('pay-notice-bar');
            const logoEl = document.getElementById('pay-method-logo');
            const currentPanel = getPanelById(panelId);
            if (currentPanel && currentPanel.data) {
                if (summaryPanel) summaryPanel.textContent = currentPanel.data.name || 'PANEL NAME';
            }
            if (summaryPlan) summaryPlan.textContent = 'Plan Validity: ' + (planName || selectedPlanGlobal || 'Selected Plan');
            const USD_RATE = window.NEAMOT_USD_RATE || 120;
            const bdtPrice = Number(totalPrice) || 0;
            const usdPrice = bdtPrice / USD_RATE;
            if (summaryPrice) {
                if (method === 'binance') {
                    summaryPrice.textContent = usdPrice.toFixed(2) + ' USD  (≈ ' + bdtPrice.toFixed(0) + ' BDT)';
                } else {
                    summaryPrice.textContent = bdtPrice.toFixed(0) + ' BDT';
                }
            }
            if (amountPill) {
                amountPill.textContent = method === 'binance'
                    ? ('$' + usdPrice.toFixed(2) + ' USD')
                    : ('৳' + bdtPrice.toFixed(0));
            }
            if (payPage) payPage.setAttribute('data-method', method || 'bkash');

            // reset classes
            card.className = 'payment-card-exact';
            verifyBtn.className = 'verify-btn-exact';

            if (method === 'bkash') {
                headerTitle.innerText = "bKash Payment";
                if (logoEl) logoEl.src = 'https://i.ibb.co.com/Rm4yRwN/bKash.png';
                card.classList.add('bkash-card');
                verifyBtn.classList.add('bkash-btn-exact');
                if (noticeBar) noticeBar.textContent = 'নোটঃ টাকা পাঠানোর ৫-১০ সেকেন্ড পর ভেরিফাই করবেন।';
                const txnTitle = document.querySelector('#payment-card-exact .txn-title');
                if (txnTitle) txnTitle.textContent = 'Enter Transaction ID';
                const txnInput = document.getElementById('pay-txn-input');
                if (txnInput) txnInput.placeholder = 'Enter Transaction ID';
            } else if (method === 'nagad') {
                headerTitle.innerText = "Nagad Payment";
                if (logoEl) logoEl.src = 'https://i.ibb.co.com/YzGzdFx/Nagad.png';
                card.classList.add('nagad-card');
                verifyBtn.classList.add('nagad-btn-exact');
                if (noticeBar) noticeBar.textContent = 'নোটঃ টাকা পাঠানোর ৫-১০ সেকেন্ড পর ভেরিফাই করবেন।';
            } else if (method === 'binance') {
                headerTitle.innerText = "Binance Pay 🇬🇧";
                if (logoEl) logoEl.src = 'https://upload.wikimedia.org/wikipedia/commons/1/12/Binance_logo.svg';
                card.classList.add('binance-card');
                verifyBtn.classList.add('binance-btn-exact');
                if (noticeBar) noticeBar.textContent = 'Note: Send the exact USD amount via Binance Pay / Transfer, then verify after 5–10 seconds.';
                // Force UK English labels on Binance page
                const txnTitle = document.querySelector('#payment-card-exact .txn-title');
                if (txnTitle) txnTitle.textContent = 'Enter Transaction ID / Order ID';
                const txnInput = document.getElementById('pay-txn-input');
                if (txnInput) txnInput.placeholder = 'Transaction ID or Order ID';
                if (verifyBtn) verifyBtn.textContent = 'VERIFY TRANSACTION';
                const instHeader = document.querySelector('#payment-card-exact .inst-header');
                if (instHeader) instHeader.textContent = 'INSTRUCTIONS';
                const backBtn = document.querySelector('#payment-page .back-btn');
                if (backBtn) backBtn.innerHTML = '<i class="fas fa-arrow-left"></i> Back';
            } else {
                headerTitle.innerText = "Rocket Payment";
                if (logoEl) logoEl.src = 'https://i.ibb.co/nMHz4zx2/file-0000000013e4820b9a2f8057bb61ddc3.png';
                card.classList.add('rocket-card');
                verifyBtn.classList.add('rocket-btn-exact');
                if (noticeBar) noticeBar.textContent = 'নোটঃ টাকা পাঠানোর ৫-১০ সেকেন্ড পর ভেরিফাই করবেন।';
            }

            if (verifyBtn) verifyBtn.textContent = 'VERIFY TRANSACTION';
            updatePayInstructions(method === 'binance' ? usdPrice : totalPrice, method);
            if (payPage) payPage.classList.add('active');
            pushAppHistory('payment');
            document.body.style.overflow = 'hidden';
            const txnInput = document.getElementById('pay-txn-input');
            if (txnInput) txnInput.value = '';
            updateMobileBackButton();
        }

        function closePaymentPage() {
            document.getElementById('payment-page').classList.remove('active');
            document.body.style.overflow = '';
            updateMobileBackButton();
        }

        function updatePayInstructions(price, method) {
            const list = document.getElementById('pay-instruction-list');
            const methodToUse = method || selectedMethod || 'bkash';
            const isBinance = methodToUse === 'binance';
            const priceDisplay = typeof price === 'number' ? (isBinance ? price.toFixed(2) : price.toFixed(0)) : price;
            if (methodToUse === 'bkash') {
                list.innerHTML =
                    `<li><span class="highlight-yellow">*247#</span> ডায়াল করে আপনার <span class="highlight-yellow">BKASH</span> মোবাইল মেনুতে যান অথবা <span class="highlight-yellow">BKASH</span> অ্যাপে যান।</li>` +
                    `<li><span class="highlight-yellow">"Send Money"</span>-এ ক্লিক করুন।</li>` +
                    `<li>প্রাপক নম্বর হিসেবে এই নম্বরটি লিখুন: <span class="highlight-yellow">${bkashNumber}</span> <button class="copy-btn-exact" onclick="copyText('${bkashNumber}')"><i class="far fa-copy"></i> Copy</button></li>` +
                    `<li>পরিমাণ: <span class="highlight-yellow">${priceDisplay}</span> টাকা দিয়ে <span class="highlight-yellow">SUBMIT</span> করুন।</li>` +
                    `<li>এখন উপরের বক্সে আপনার <span class="highlight-yellow">Transaction ID</span> দিন এবং <span class="highlight-yellow">VERIFY</span> করুন।</li>`;
            } else if (methodToUse === 'nagad') {
                list.innerHTML =
                    `<li><span class="highlight-yellow">*167#</span> ডায়াল করে আপনার <span class="highlight-yellow">NAGAD</span> মেনুতে যান অথবা <span class="highlight-yellow">NAGAD</span> অ্যাপে যান।</li>` +
                    `<li><span class="highlight-yellow">"Send Money"</span>-এ ক্লিক করুন।</li>` +
                    `<li>প্রাপক নম্বর হিসেবে এই নম্বরটি লিখুন: <span class="highlight-yellow">${nagadNumber}</span> <button class="copy-btn-exact" onclick="copyText('${nagadNumber}')"><i class="far fa-copy"></i> Copy</button></li>` +
                    `<li>পরিমাণ: <span class="highlight-yellow">${priceDisplay}</span> টাকা দিয়ে <span class="highlight-yellow">SUBMIT</span> করুন।</li>` +
                    `<li>এখন উপরের বক্সে আপনার <span class="highlight-yellow">Transaction ID</span> দিন এবং <span class="highlight-yellow">VERIFY</span> করুন।</li>`;
            } else if (methodToUse === 'binance') {
                list.innerHTML =
                    `<li>Open the <span class="highlight-yellow">BINANCE</span> App and go to <span class="highlight-yellow">Pay / Transfer</span>.</li>` +
                    (binanceId ? `<li>Binance ID / Pay ID: <span class="highlight-yellow">${binanceId}</span> <button class="copy-btn-exact" onclick="copyText('${binanceId}')"><i class="far fa-copy"></i> Copy</button></li>` : `<li>Binance ID এখনো অ্যাডমিন প্যানেল থেকে সেট করা হয়নি।</li>`) +
                    `<li>Send amount: <span class="highlight-yellow">${priceDisplay} USD</span> (exact amount).</li>` +
                    `<li>Optional: add your Order ID or Username in the Memo / Note field.</li>` +
                    `<li>After payment, enter your <span class="highlight-yellow">Transaction ID</span> or <span class="highlight-yellow">Order ID</span> in the box above and tap <span class="highlight-yellow">VERIFY</span>.</li>`;
            } else {
                list.innerHTML =
                    `<li><span class="highlight-yellow">*322#</span> ডায়াল করে আপনার <span class="highlight-yellow">ROCKET</span> মেনুতে যান অথবা <span class="highlight-yellow">ROCKET</span> অ্যাপে যান।</li>` +
                    `<li><span class="highlight-yellow">"Send Money"</span>-এ ক্লিক করুন।</li>` +
                    `<li>প্রাপক নম্বর হিসেবে এই নম্বরটি লিখুন: <span class="highlight-yellow">${rocketNumber}</span> <button class="copy-btn-exact" onclick="copyText('${rocketNumber}')"><i class="far fa-copy"></i> Copy</button></li>` +
                    `<li>পরিমাণ: <span class="highlight-yellow">${priceDisplay}</span> টাকা দিয়ে <span class="highlight-yellow">SUBMIT</span> করুন।</li>` +
                    `<li>এখন উপরের বক্সে আপনার <span class="highlight-yellow">Transaction ID</span> দিন এবং <span class="highlight-yellow">VERIFY</span> করুন।</li>`;
            }
        }

        function copyText(text) {
            navigator.clipboard.writeText(text).then(() => showToast("কপি করা হয়েছে: " + text, "#22c55e"))
                .catch(() => {
                    const d = document.createElement('textarea');
                    d.value = text;
                    document.body.appendChild(d);
                    d.select();
                    document.execCommand('copy');
                    document.body.removeChild(d);
                    showToast("কপি করা হয়েছে: " + text, "#22c55e");
                });
        }

        // ─── PAY TRIGGER VERIFY ───

        function closeOrderSuccessPopup() {
            const el = document.getElementById('NEAMOT-order-success-overlay');
            if (el) el.remove();
            try { switchTab('orders'); } catch(e) {}
        }
        
        // ─── Telegram alert to admin on new order ───
        
        async function notifyAdminNewFund(fundData, uid, fundKey) {
            const tgToken = '8668311089:AAHaBazEODUusq8wxC6195ZESRLvJUKABLg';
            let tgChat = '8656053500';
            let waPhone = '';
            let waKey = '';
            let tgOn = true;
            let waOn = true;
            try {
                const snap = await database.ref('storeData/adminNotify').once('value');
                const cfg = snap.val() || {};
                if (cfg.enabled === false) tgOn = false;
                if (cfg.chatId) tgChat = String(cfg.chatId);
                if (cfg.waEnabled === false) waOn = false;
                if (cfg.waPhone) waPhone = String(cfg.waPhone).replace(/[^0-9]/g, '');
                if (cfg.waApiKey) waKey = String(cfg.waApiKey).trim();
            } catch (e) {}
            const safe = (v) => String(v == null ? '' : v);
            const text =
                'NEW FUND REQUEST\n' +
                '------------------\n' +
                'Amount: ' + safe(fundData.amount || 0) + ' TK\n' +
                'Method: ' + safe(fundData.method || 'N/A') + '\n' +
                'Trx ID: ' + safe(fundData.transactionId || 'N/A') + '\n' +
                'User: ' + safe(fundData.userEmail || 'Unknown') + '\n' +
                'Status: ' + safe(fundData.status || 'Pending') + '\n' +
                '------------------\n' +
                'Add Funds Admin theke Approve korun';
            if (tgOn && tgChat) {
                try {
                    await fetch('https://api.telegram.org/bot' + tgToken + '/sendMessage', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ chat_id: tgChat, text: text, disable_web_page_preview: true })
                    });
                } catch (e) { console.warn('TG fund', e); }
            }
            if (waOn && waPhone && waKey) {
                if (waPhone.startsWith('01') && waPhone.length === 11) waPhone = '88' + waPhone;
                const waUrl = 'https://api.callmebot.com/whatsapp.php?phone=' + encodeURIComponent(waPhone) +
                    '&text=' + encodeURIComponent(text) + '&apikey=' + encodeURIComponent(waKey);
                try {
                    await fetch(waUrl, { method: 'GET', mode: 'cors' }).catch(() => {});
                    try { const img = new Image(); img.src = waUrl; } catch (e2) {}
                } catch (e) { console.warn('WA fund', e); }
            }
        }


        async function notifyAdminNewOrder(orderData, orderId) {
            const tgToken = '8668311089:AAHaBazEODUusq8wxC6195ZESRLvJUKABLg';
            let tgChat = '8656053500';
            let waPhone = '';
            let waKey = '';
            let tgOn = true;
            let waOn = true;
            try {
                const snap = await database.ref('storeData/adminNotify').once('value');
                const cfg = snap.val() || {};
                if (cfg.enabled === false) tgOn = false;
                if (cfg.chatId) tgChat = String(cfg.chatId);
                if (cfg.waEnabled === false) waOn = false;
                if (cfg.waPhone) waPhone = String(cfg.waPhone).replace(/[^0-9]/g, '');
                if (cfg.waApiKey) waKey = String(cfg.waApiKey).trim();
            } catch (e) {}
            const safe = (v) => String(v == null ? '' : v).replace(/[<>&]/g, '');
            const text =
                'NEW ORDER\n' +
                '------------------\n' +
                'Panel: ' + safe(orderData.panelName || 'N/A') + '\n' +
                'Plan: ' + safe(orderData.plan || 'N/A') + '\n' +
                'Price: ' + safe(orderData.price || '0 TK') + '\n' +
                'Qty: ' + safe(orderData.quantity || 1) + '\n' +
                'Method: ' + safe(orderData.method || 'N/A') + '\n' +
                'Trx ID: ' + safe(orderData.transactionId || 'N/A') + '\n' +
                'User: ' + safe(orderData.userEmail || orderData.userName || 'Guest') + '\n' +
                'Status: ' + safe(orderData.status || 'Pending') + '\n' +
                'OrderID: ' + safe(orderId || '') + '\n' +
                '------------------\n' +
                'Admin panel theke Approve korun';
            // Telegram
            if (tgOn && tgChat) {
                try {
                    await fetch('https://api.telegram.org/bot' + tgToken + '/sendMessage', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ chat_id: tgChat, text: text, disable_web_page_preview: true })
                    });
                } catch (e) { console.warn('TG', e); }
            }
            // WhatsApp CallMeBot
            if (waOn && waPhone && waKey) {
                if (waPhone.startsWith('01') && waPhone.length === 11) waPhone = '88' + waPhone;
                const waUrl = 'https://api.callmebot.com/whatsapp.php?phone=' + encodeURIComponent(waPhone) +
                    '&text=' + encodeURIComponent(text) + '&apikey=' + encodeURIComponent(waKey);
                try {
                    await fetch(waUrl, { method: 'GET', mode: 'cors' }).catch(() => {});
                    try { const img = new Image(); img.src = waUrl; } catch (e2) {}
                } catch (e) { console.warn('WA', e); }
            }
        }



        function showOrderSuccessPopup() {
            const existing = document.getElementById('NEAMOT-order-success-overlay');
            if (existing) existing.remove();
            const overlay = document.createElement('div');
            overlay.id = 'NEAMOT-order-success-overlay';
            overlay.style.cssText = 'position:fixed;inset:0;z-index:99999999;background:rgba(0,0,0,.82);backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;padding:18px;';
            overlay.innerHTML = `
              <div style="max-width:340px;width:100%;background:linear-gradient(160deg,#0b0b0b,#151515);border:1px solid rgba(34,197,94,.45);border-radius:22px;padding:26px 22px;text-align:center;box-shadow:0 0 40px rgba(34,197,94,.25),0 20px 50px rgba(0,0,0,.5);">
                <div style="width:72px;height:72px;margin:0 auto 14px;border-radius:50%;background:radial-gradient(circle at 30% 30%,#4ade80,#16a34a);display:flex;align-items:center;justify-content:center;box-shadow:0 0 28px rgba(34,197,94,.55);font-size:34px;">✓</div>
                <h3 style="color:#fff;font-size:20px;font-weight:900;margin:0 0 8px;letter-spacing:.3px;">Your Order Successfully</h3>
                <p style="color:#9ca3af;font-size:13px;line-height:1.55;margin:0 0 18px;">Order confirm হয়েছে। এখন My Orders থেকে আপনার অর্ডার দেখুন। Admin approve করলে key পাবেন।</p>
                <button type="button" style="width:100%;padding:12px 16px;border:none;border-radius:12px;font-weight:800;font-size:13px;color:#fff;background:linear-gradient(135deg,#22c55e,#16a34a);box-shadow:0 8px 22px rgba(34,197,94,.35);cursor:pointer;" onclick="closeOrderSuccessPopup()">VIEW MY ORDERS</button>
              </div>`;
            document.body.appendChild(overlay);
            setTimeout(() => {
              const el = document.getElementById('NEAMOT-order-success-overlay');
              if (el) el.remove();
            }, 8000);
        }

        function payTriggerVerify() {

            if (!selectedId || !selectedPlanGlobal) { showToast(t('selectPlanFirst'), "#ff4444"); return; }
            const panel = getPanelById(selectedId);
            if (!panel) return;
            const planStock = panel.data.planStock || {};
            if (planStock[selectedPlanGlobal] === true || planStock[selectedPlanGlobal] === "true") {
                showToast(t('stockOutMsg'), "#ff4444");
                return;
            }
            const txnId = document.getElementById('pay-txn-input').value.trim();
            if (!txnId) { showToast(t('verifyTransaction') || 'Enter Transaction ID', "#ff4444"); return; }

            const user = auth.currentUser;
            if (!user) {
                showToast(t('pleaseLogin'), "#ff4444");
                return;
            }

            const verifyBtn = document.getElementById('pay-verify-btn');
            if (verifyBtn) {
                verifyBtn.disabled = true;
                verifyBtn.innerHTML = 'Redirecting... 3';
                let sec = 3;
                const iv = setInterval(function() {
                    sec -= 1;
                    if (sec > 0) {
                        verifyBtn.innerHTML = 'Redirecting... ' + sec;
                    } else {
                        clearInterval(iv);
                        verifyBtn.innerHTML = 'VERIFY TRANSACTION';
                    }
                }, 1000);
            }

            database.ref('orders').orderByChild('transactionId').equalTo(txnId).once('value')
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        if (verifyBtn) { verifyBtn.disabled = false; verifyBtn.innerHTML = 'VERIFY TRANSACTION'; }
                        showToast(t('txnAlreadyUsed'), "#ff4444");
                        return;
                    }
                    return database.ref('funds').orderByChild('transactionId').equalTo(txnId).once('value');
                })
                .then((snapshot) => {
                    if (snapshot && snapshot.exists()) {
                        if (verifyBtn) { verifyBtn.disabled = false; verifyBtn.innerHTML = 'VERIFY TRANSACTION'; }
                        showToast(t('txnAlreadyUsed'), "#ff4444");
                        return;
                    }
                    // Wait remaining of 3s then proceed
                    setTimeout(function() {
                        if (verifyBtn) { verifyBtn.disabled = false; verifyBtn.innerHTML = 'VERIFY TRANSACTION'; }
                        proceedOrderVerificationNoBalance(txnId);
                    }, 3000);
                })
                .catch((err) => {
                    if (verifyBtn) { verifyBtn.disabled = false; verifyBtn.innerHTML = 'VERIFY TRANSACTION'; }
                    showToast("Error checking transaction: " + err.message, "#ff4444");
                });
        }

        // ─── PROCEED ORDER VERIFICATION - NO BALANCE DEDUCT ───
        async function proceedOrderVerificationNoBalance(txnId) {
            const user = auth.currentUser;
            if (!user) {
                showToast(t('pleaseLogin'), "#ff4444");
                return;
            }

            const panel = getPanelById(selectedId);
            const panelData = panel.data;
            const unitPriceStr = panelData.prices && panelData.prices[selectedPlanGlobal] ? panelData.prices[selectedPlanGlobal] :
                "0";
            const unitPriceNum = parseFloat(unitPriceStr.toString().replace(/[^0-9.]/g, '')) || 0;
            const baseTotalPriceNum = unitPriceNum * selectedQuantity;
            const discountPercent = await getReferralDiscountForUser(user.uid);
            const totalPriceNum = isSafeMainIdPanel(selectedId) && discountPercent >= REFERRAL_DISCOUNT_PERCENT ? baseTotalPriceNum * 0.85 : baseTotalPriceNum;

            const methodText = selectedMethod === 'bkash' ? 'bKash Personal' : 'Nagad Personal';
            const userEmail = user.email;
            let userName = "Guest";

            database.ref('User/' + user.uid + '/username').once('value')
                .then(snap => {
                    userName = snap.val() || user.displayName || userEmail.split('@')[0];
                    const orderData = {
                        panelName: panel.data.name || 'Panel',
                        plan: selectedPlanGlobal + " PLAN",
                        price: totalPriceNum.toFixed(0) + ' TK',
                        originalPrice: baseTotalPriceNum.toFixed(0) + ' TK',
                        referralDiscount: (isSafeMainIdPanel(selectedId) && discountPercent >= 15) ? '15%' : '0%',
                        method: methodText,
                        transactionId: txnId,
                        status: "Pending",
                        adminMessage: "Payment received, waiting for admin approval",
                        userEmail: userEmail,
                        userName: userName,
                        userPhone: "",
                        quantity: selectedQuantity,
                        timestamp: firebase.database.ServerValue.TIMESTAMP
                    };
                    const newRef = database.ref('orders').push();
                    return newRef.set(orderData).then(() => {
                        try { notifyAdminNewOrder(orderData, newRef.key); } catch (e) {}
                        return newRef.key;
                    });
                })
                .then(() => {
                    showVerifyingPopup();
                    setTimeout(() => {
                        closeVerifyingPopup();
                        closePaymentPage();
                        closePanel();
                        if (typeof closeOtherPaymentPage === 'function') closeOtherPaymentPage();
                        if (typeof closeIndUpiPage === 'function') closeIndUpiPage();
                        showOrderSuccessPopup();
                        switchTab('orders');
                        updateTotalOrdersCount();
                    }, 1200);
                })
                .catch((err) => {
                    showToast("Error: " + err.message, "#ff4444");
                });
        }

        // ─── SLIDER LOADING ──────────────────────────────────────
        function initSliderLoading() {
            const loadingEl = document.getElementById('sliderLoading');
            const img1 = document.getElementById('slide-img-1');
            const img2 = document.getElementById('slide-img-2');
            let loadedCount = 0;

            function checkLoaded() {
                loadedCount++;
                if (loadedCount >= 2) {
                    if (loadingEl) {
                        loadingEl.classList.add('hidden');
                        setTimeout(() => {
                            loadingEl.style.display = 'none';
                        }, 700);
                    }
                }
            }

            if (img1) {
                if (img1.complete) {
                    checkLoaded();
                } else {
                    img1.addEventListener('load', checkLoaded);
                    img1.addEventListener('error', checkLoaded);
                }
            }
            if (img2) {
                if (img2.complete) {
                    checkLoaded();
                } else {
                    img2.addEventListener('load', checkLoaded);
                    img2.addEventListener('error', checkLoaded);
                }
            }

            setTimeout(() => {
                if (loadingEl && !loadingEl.classList.contains('hidden')) {
                    loadingEl.classList.add('hidden');
                    setTimeout(() => {
                        loadingEl.style.display = 'none';
                    }, 700);
                }
            }, 6000);
        }

        document.querySelectorAll('.slider-dot').forEach(dot => {
            dot.addEventListener('click', function(e) {
                e.stopPropagation();
                const index = parseInt(this.dataset.index);
                if (!isNaN(index)) {
                    goToSlide(index);
                }
            });
        });

        document.addEventListener('backbutton', function(e) {
            e.preventDefault();
            goBack();
        }, false);

        function renderOfficialNoticeSocialLinks(links){
            const root=document.getElementById('officialNoticeSocialLinks'); if(!root) return;
            root.innerHTML='';
            const brandFor = (label, url) => {
                const text = (String(label||'')+' '+String(url||'')).toLowerCase();
                if (/youtu\.be|youtube\.com/.test(text) || /youtube/.test(String(label||'').toLowerCase())) return {cls:'fa-brands fa-youtube', color:'#ff0033'};
                if (/discord\.(gg|com)|discordapp\.com/.test(text) || /discord/.test(String(label||'').toLowerCase())) return {cls:'fa-brands fa-discord', color:'#5865f2'};
                if (/t\.me|telegram\.me|telegram\.org/.test(text) || /telegram/.test(String(label||'').toLowerCase())) return {cls:'fa-brands fa-telegram', color:'#229ed9'};
                if (/instagram\.com/.test(text) || /instagram/.test(String(label||'').toLowerCase())) return {cls:'fa-brands fa-instagram', color:'#d9468f'};
                if (/facebook\.com|fb\.com/.test(text) || /facebook/.test(String(label||'').toLowerCase())) return {cls:'fa-brands fa-facebook', color:'#1877f2'};
                if (/tiktok\.com/.test(text) || /tiktok/.test(String(label||'').toLowerCase())) return {cls:'fa-brands fa-tiktok', color:'#111111'};
                if (/whatsapp\.com|wa\.me/.test(text) || /whatsapp/.test(String(label||'').toLowerCase())) return {cls:'fa-brands fa-whatsapp', color:'#25d366'};
                if (/x\.com|twitter\.com/.test(text) || /(^|\s)x($|\s)|twitter/.test(String(label||'').toLowerCase())) return {cls:'fa-brands fa-x-twitter', color:'#111111'};
                if (/github\.com/.test(text) || /github/.test(String(label||'').toLowerCase())) return {cls:'fa-brands fa-github', color:'#24292f'};
                return {cls:'fa-solid fa-link', color:'#64748b'};
            };
            (Array.isArray(links)?links:[]).filter(x=>x&&x.label&&/^https?:\/\//i.test(String(x.url||''))).forEach(item=>{
                const a=document.createElement('a'); a.className='official-notice-social-link'; a.href=String(item.url); a.target='_blank'; a.rel='noopener noreferrer';
                const brand=brandFor(item.label,item.url);
                const icon=document.createElement('span'); icon.className='social-icon';
                const glyph=document.createElement('i'); glyph.className=brand.cls; glyph.setAttribute('aria-hidden','true'); glyph.style.color=brand.color; icon.appendChild(glyph);
                const label=document.createElement('span'); label.className='social-link-label'; label.textContent=String(item.label);
                a.append(icon,label); a.addEventListener('click',closeOfficialNotice); root.appendChild(a);
            });
        }
        function closeOfficialNotice(){ const p=document.getElementById('officialNoticePopup'); if(p){p.classList.remove('active');p.setAttribute('aria-hidden','true');} document.body.style.overflow=''; document.body.style.pointerEvents=''; }
        function showOfficialNotice(){ const p=document.getElementById('officialNoticePopup'); if(p){p.classList.add('active');p.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';} }
        document.addEventListener('keydown',e=>{if(e.key==='Escape')closeOfficialNotice();});

        document.addEventListener('DOMContentLoaded', async function() {
            recordReferralView();
            fetchStoreData();
            listenFundsApproval();
            if (auth.currentUser) {
                loadSavedOrdersLive();
                updateDrawerUI(auth.currentUser);
                loadTotalSpent(auth.currentUser.uid);
                loadUserBalance(auth.currentUser.uid);
                loadFundsHistory(auth.currentUser.uid);
                checkAdminStatus(auth.currentUser);
                updateProfileUI(auth.currentUser);
            }
            setTimeout(() => {
                startSlider();
                initSliderLoading();
            }, 500);
            pageHistory = ['home'];
            generateCategorizedGrid();
            setupSectionTabs();
            updateMobileBackButton();
            // Seed history so deep-links (#account, #panel-1, …) can back to #home
            try {
                const rawHash = (window.location.hash || '').replace(/^#/, '');
                if (rawHash && rawHash !== 'home') {
                    history.replaceState({ NEAMOTApp: 'home' }, '', window.location.href.split('#')[0] + '#home');
                    history.pushState({ NEAMOTApp: rawHash }, '', window.location.href.split('#')[0] + '#' + encodeURIComponent(rawHash));
                } else if (!rawHash) {
                    history.replaceState({ NEAMOTApp: 'home' }, '', window.location.href.split('#')[0] + '#home');
                }
            } catch (e) {}
            handleHashOnLoad();
            setLanguage('en');
            updateUITexts('en');
            setTimeout(showOfficialNotice, 450);
        });
    