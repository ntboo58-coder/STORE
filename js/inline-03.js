
(function(){

        // ═══════════════════════════════════════════════════════════════
        //  🔥 FIREBASE CONFIGS
        // ═══════════════════════════════════════════════════════════════

        const PANEL_CONFIGS = {
            12: {
                name: 'panel12',
                config: {
                    apiKey: "AIzaSyDeMGBMbNobqZuHiA3UUOQ5YtLnxCa-Bm8",
                    databaseURL: "https://purple-all-default-rtdb.firebaseio.com",
                    projectId: "purple-all",
                    storageBucket: "purple-all.firebasestorage.app",
                    appId: "1:879435499970:android:5925517a2777bc3fde2e5b"
                },
                auth: { email: "sylhetifoga531@gmail.com", password: "Allxcvip" },
                type: 'user',
                label: 'Username',
                placeholder: 'e.g. XC_ABCD123',
                keyPrefix: 'XC_',
                outputLabel: 'New Username',
                outputClass: 'user',
                getKeyFromData: (data) => data.password || '',
                buildNewKey: () => {
                    const u = 'XC_' +
                        randomStr(4, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') +
                        randomStr(3, '0123456789');
                    const p = randomStr(3, 'ABCDEFGHJKLMNPQRSTUVWXYZ') +
                        randomStr(4, '23456789') +
                        randomStr(1, '!@#$');
                    return { username: u, password: p };
                },
                path: 'users'
            },
            13: {
                name: 'panel13',
                config: {
                    apiKey: "AIzaSyBXFsHhziCb475CQrhEY0kOUi_DTD5GAOw",
                    databaseURL: "https://greengalacy-default-rtdb.firebaseio.com",
                    projectId: "greengalacy",
                    storageBucket: "greengalacy.firebasestorage.app",
                    appId: "1:101994253395:android:7f7d7ea0039b22d6b30aa6"
                },
                auth: { email: "sylhetifoga531@gmail.com", password: "greengalaxycsa" },
                type: 'key',
                label: 'License Key',
                placeholder: 'e.g. GHOST XGalaxy_ABCD1234',
                keyPrefix: 'GHOST XGalaxy_',
                outputLabel: 'New Key',
                outputClass: 'key',
                getKeyFromData: (data) => data.key || '',
                buildNewKey: () => {
                    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                    const numbers = '0123456789';
                    let r = '',
                        n = '';
                    for (let i = 0; i < 4; i++) r += chars.charAt(Math.floor(Math.random() * chars.length));
                    for (let i = 0; i < 4; i++) n += numbers.charAt(Math.floor(Math.random() * numbers.length));
                    return 'GHOST XGalaxy_' + r + n;
                },
                path: 'keys'
            },
            15: {
                name: 'panel15',
                config: {
                    apiKey: "AIzaSyDWW82lFNy7bw7-HO4EGE9S27UarOVh6Ao",
                    databaseURL: "https://ffnormalgalaxy-default-rtdb.firebaseio.com",
                    projectId: "ffnormalgalaxy",
                    storageBucket: "ffnormalgalaxy.firebasestorage.app",
                    appId: "1:477934181587:android:58c2a321928ca9b2244826"
                },
                auth: { email: "msidratul408@gmail.com", password: "ffgalaxy" },
                type: 'key',
                label: 'License Key',
                placeholder: 'e.g. FF-GHOST XGalaxy_ABCD1234',
                keyPrefix: 'FF-GHOST XGalaxy_',
                outputLabel: 'New Key',
                outputClass: 'key',
                getKeyFromData: (data) => data.key || '',
                buildNewKey: () => {
                    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                    const numbers = '0123456789';
                    let r = '',
                        n = '';
                    for (let i = 0; i < 4; i++) r += chars.charAt(Math.floor(Math.random() * chars.length));
                    for (let i = 0; i < 4; i++) n += numbers.charAt(Math.floor(Math.random() * numbers.length));
                    return 'FF-GHOST XGalaxy_' + r + n;
                },
                path: 'keys'
            },
            26: {
                name: 'panel26',
                config: {
                    apiKey: "AIzaSyDhWxcA8xFrqdxQcidsJEfJmJ4kOIH4SHA",
                    databaseURL: "https://dGHOST Xdad-default-rtdb.firebaseio.com",
                    projectId: "dGHOST Xdad",
                    storageBucket: "dGHOST Xdad.firebasestorage.app",
                    appId: "1:500951508166:android:bada29d0019f1fc98623c7"
                },
                auth: { email: "sylhetifoga531@gmail.com", password: "3dpanelGHOST Xx" },
                type: 'key',
                label: 'License Key',
                placeholder: 'e.g. 3DPanelGHOST X_ABCD1234',
                keyPrefix: '3DPanelGHOST X_',
                outputLabel: 'New Key',
                outputClass: 'key',
                getKeyFromData: (data) => data.key || '',
                buildNewKey: () => {
                    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                    const numbers = '0123456789';
                    let r = '',
                        n = '';
                    for (let i = 0; i < 4; i++) r += chars.charAt(Math.floor(Math.random() * chars.length));
                    for (let i = 0; i < 4; i++) n += numbers.charAt(Math.floor(Math.random() * numbers.length));
                    return '3DPanelGHOST X_' + r + n;
                },
                path: 'keys'
            },
            31: {
                name: 'panel31',
                config: {
                    apiKey: "AIzaSyB-SITPTsDuKujjZTe_9U0ly0-2kWmchyo",
                    databaseURL: "https://progalaxy-e8cac-default-rtdb.firebaseio.com",
                    projectId: "progalaxy-e8cac",
                    storageBucket: "progalaxy-e8cac.firebasestorage.app",
                    appId: "1:876291501692:android:57f3b2d87983cd23b423f9"
                },
                auth: { email: "sylhetifoga531@gmail.com", password: "Progalaxy21" },
                type: 'user',
                label: 'Username',
                placeholder: 'e.g. XC_ABCD123',
                keyPrefix: 'XC_',
                outputLabel: 'New Credentials',
                outputClass: 'user',
                getKeyFromData: (data) => data.username || '',
                buildNewKey: () => {
                    const u = 'XC_' +
                        randomStr(4, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') +
                        randomStr(3, '0123456789');
                    const p = randomStr(3, 'ABCDEFGHJKLMNPQRSTUVWXYZ') +
                        randomStr(4, '23456789') +
                        randomStr(1, '!@#$');
                    return { username: u, password: p };
                },
                path: 'users'
            }
        };

        function randomStr(len, chars) {
            let s = '';
            for (let i = 0; i < len; i++) s += chars.charAt(Math.floor(Math.random() * chars.length));
            return s;
        }

        // ═══════════════════════════════════════════════════════════════
        //  🔥 SMART DEVICE DETECTION — finds device model anywhere in data
        // ═══════════════════════════════════════════════════════════════

        function findDeviceField(data) {
            // All possible field names that might contain device model
            const deviceFieldNames = [
                'usedByDevice', 'device', 'deviceModel', 'deviceName',
                'model', 'phoneModel', 'device_model', 'device_name',
                'usedDeviceId', 'lastDeviceName', 'deviceId',
                'phone', 'androidDevice', 'iosDevice', 'deviceInfo',
                'device_info', 'deviceModelName', 'modelName',
                'device_type', 'deviceType', 'hardware', 'hardwareModel',
                'product', 'productName', 'manufacturer', 'brand'
            ];

            // Recursive search through object
            function search(obj, depth = 0) {
                if (depth > 5) return null;
                if (!obj || typeof obj !== 'object') return null;

                // Check all fields at current level
                for (const field of deviceFieldNames) {
                    if (obj[field] !== undefined && obj[field] !== null) {
                        const val = obj[field];
                        if (typeof val === 'string' && val.trim().length > 0) {
                            return val.trim();
                        }
                        // If it's an object with a 'name' or 'model' field
                        if (typeof val === 'object' && val !== null) {
                            const sub = search(val, depth + 1);
                            if (sub) return sub;
                        }
                    }
                }

                // Check all nested objects
                for (const key of Object.keys(obj)) {
                    if (obj[key] && typeof obj[key] === 'object') {
                        const result = search(obj[key], depth + 1);
                        if (result) return result;
                    }
                }

                return null;
            }

            const result = search(data);
            return result || '';
        }

        // ═══════════════════════════════════════════════════════════════
        //  🔥 INIT FIREBASE APPS
        // ═══════════════════════════════════════════════════════════════

        const apps = {};
        const dbs = {};
        const auths = {};
        let currentPanel = 13;

        for (const [panel, cfg] of Object.entries(PANEL_CONFIGS)) {
            let app;
            try { app = firebase.app(cfg.name); }
            catch (e) { app = firebase.initializeApp(cfg.config, cfg.name); }
            apps[panel] = app;
            dbs[panel] = firebase.database(app);
            auths[panel] = firebase.auth(app);
        }

        // ═══════════════════════════════════════════════════════════════
        //  TOAST
        // ═══════════════════════════════════════════════════════════════

        function kr2ShowToast(message, type = 'error', duration = 3000) {
            const container = document.getElementById('kr2-toast-container');
            const toast = document.createElement('div');
            toast.className = `toast ${type}`;
            let iconClass = 'fa-regular fa-circle-xmark';
            if (type === 'success') iconClass = 'fa-regular fa-circle-check';
            else if (type === 'info') iconClass = 'fa-regular fa-circle-info';
            toast.innerHTML = `
                <div class="toast-icon ${type}"><i class="${iconClass}"></i></div>
                <div class="toast-message">${message}</div>
            `;
            container.appendChild(toast);
            setTimeout(() => {
                toast.classList.add('hide');
                setTimeout(() => { if (toast.parentNode) toast.parentNode.removeChild(toast); }, 300);
            }, duration);
        }

        // ═══════════════════════════════════════════════════════════════
        //  STATE
        // ═══════════════════════════════════════════════════════════════

        let checkedData = null;
        let storedDevice = '';
        let deviceExists = false;

        // ═══════════════════════════════════════════════════════════════
        //  UI HELPERS
        // ═══════════════════════════════════════════════════════════════

        function getPanelCfg() { return PANEL_CONFIGS[currentPanel]; }

        function getDb() { return dbs[currentPanel]; }

        function getAuth() { return auths[currentPanel]; }

        function updatePanelUI() {
            const cfg = getPanelCfg();
            const isKey = cfg.type === 'key';
            document.getElementById('panelBadgeText').textContent =
                '#' + currentPanel + ' · ' + (currentPanel == 12 ? 'ALL MOD (User+Pass)' :
                    currentPanel == 13 ? 'Tournament Galaxy / FF MAX' :
                    currentPanel == 15 ? 'FF Normal Tournament' :
                    currentPanel == 26 ? '3D Hologram Main ID' :
                    'Galaxy Main ID (User+Pass)');
            document.getElementById('badgeType').textContent = isKey ? '🔑 Key Reset' : '👤 User+Pass Reset';
            document.getElementById('inputLabel').innerHTML = (isKey ?
                '<i class="fa-regular fa-keyboard"></i> Enter Old License Key' :
                '<i class="fa-regular fa-user"></i> Enter Old Username');
            document.getElementById('oldInput').placeholder = cfg.placeholder;
            // Reset
            checkedData = null;
            storedDevice = '';
            deviceExists = false;
            document.getElementById('resetBtn').disabled = false;
            document.getElementById('deviceInput').disabled = true;
            document.getElementById('deviceInput').value = '';
            document.getElementById('deviceInput').className = '';
            document.getElementById('deviceInput').placeholder = 'Enter key / username';
            document.getElementById('infoStatus').innerHTML =
                '<span style="color:#888;">Type a ' + (isKey ? 'key' : 'username') + ' and click <strong>CHECK</strong></span>';
            document.getElementById('previewText').textContent = 'Awaiting input…';
            document.getElementById('statusMsg').className = 'status-msg';
            document.getElementById('statusMsg').style.display = 'none';
            document.getElementById('statusMsg').textContent = '';
            document.getElementById('outputBox').classList.remove('show');
            document.getElementById('oldInput').value = '';
        }

        // ═══════════════════════════════════════════════════════════════
        //  AUTH
        // ═══════════════════════════════════════════════════════════════

        function autoSignIn(panel) {
            const cfg = PANEL_CONFIGS[panel];
            const auth = auths[panel];
            const statusEl = document.getElementById('statusText');
            statusEl.textContent = 'Signing in…';
            statusEl.className = 'status-loading';
            auth.signInWithEmailAndPassword(cfg.auth.email, cfg.auth.password)
                .then(() => {
                    statusEl.innerHTML = '✅ NEAMOT 2.0 VERIFIED';
                    statusEl.className = 'status-verified';
                })
                .catch((err) => {
                    statusEl.textContent = '❌ ' + err.message;
                    statusEl.className = 'status-fail';
                    alert('Auth Error for Panel #' + panel + ':\n' + err.message);
                });
        }

        // ─── Validate device ───
        function validateDevice() {
            const resetBtn = document.getElementById('resetBtn');
            if (!checkedData) { if (resetBtn) resetBtn.disabled = true; return; }
            if (resetBtn) resetBtn.disabled = false;
            const statusMsg = document.getElementById('statusMsg');
            if (statusMsg) {
                statusMsg.style.display = 'none';
                statusMsg.textContent = '';
            }
        }

        // ═══════════════════════════════════════════════════════════════
        //  CHECK
        // ═══════════════════════════════════════════════════════════════

        function handleCheck() {
            const input = document.getElementById('oldInput');
            const raw = input.value.trim();
            const cfg = getPanelCfg();
            const isKey = cfg.type === 'key';
            const db = getDb();
            const statusMsg = document.getElementById('statusMsg');
            const deviceInput = document.getElementById('deviceInput') || {disabled:true,value:'',className:'',placeholder:''};

            statusMsg.className = 'status-msg';
            statusMsg.style.display = 'none';
            statusMsg.textContent = '';
            document.getElementById('outputBox').classList.remove('show');
            document.getElementById('resetBtn').disabled = true;
            checkedData = null;
            storedDevice = '';
            deviceExists = false;
            deviceInput.disabled = true;
            deviceInput.value = '';
            deviceInput.className = '';
            deviceInput.placeholder = 'Enter key / username';

            if (!raw) {
                document.getElementById('infoStatus').innerHTML =
                    '<span style="color:#888;">Please type a ' + (isKey ? 'key' : 'username') + '.</span>';
                document.getElementById('previewText').innerHTML =
                    '<i class="fa-regular fa-circle-xmark" style="color:#ff3333;"></i> No input entered.';
                return Promise.resolve(false);
            }

            const path = cfg.path + '/' + raw;

            return db.ref(path).once('value')
                .then((snap) => {
                    if (!snap.exists()) {
                        document.getElementById('infoStatus').innerHTML =
                            '<span style="color:#ff6600;font-weight:700;">❌ Not found in database</span>';
                        document.getElementById('previewText').innerHTML =
                            `<i class="fa-regular fa-circle-xmark" style="color:#ff3333;"></i> <strong>${raw}</strong> — not found.`;
                        document.getElementById('resetBtn').disabled = true;
                        checkedData = null;
                        return;
                    }

                    const data = snap.val();

                    // ── SMART DEVICE DETECTION ──
                    const device = findDeviceField(data);
                    storedDevice = device;
                    deviceExists = true;

                    checkedData = { key: raw, data: data, panel: currentPanel, device: device };

                    // Check status
                    if (data.status && data.status !== 'active') {
                        document.getElementById('infoStatus').innerHTML =
                            `<span style="color:#ff3333;font-weight:700;">⛔ Deactivated</span> (status: ${data.status})`;
                        document.getElementById('previewText').innerHTML =
                            `<i class="fa-regular fa-circle-xmark" style="color:#ff3333;"></i> <strong>${raw}</strong> — status: ${data.status}. Cannot reset.`;
                        document.getElementById('resetBtn').disabled = true;
                        deviceInput.disabled = true;
                        return;
                    }

                    const isUsed = data.isUsed === true;
                    if (!isUsed) {
                        document.getElementById('infoStatus').innerHTML =
                            `<span class="value unused">⚠️ Not used on any device — cannot reset</span>`;
                        document.getElementById('previewText').innerHTML =
                            `<i class="fa-regular fa-circle-xmark" style="color:#ff6600;"></i> <strong>${raw}</strong> — unused. Reset only allowed for used keys/users.`;
                        document.getElementById('resetBtn').disabled = true;
                        deviceInput.disabled = true;
                        document.getElementById('statusMsg').className = 'status-msg error';
                        document.getElementById('statusMsg').style.display = 'block';
                        document.getElementById('statusMsg').textContent =
                            '❌ This ' + (isKey ? 'key' : 'user') + ' has not been used on any device. Reset is not allowed.';
                        return;
                    }

                    // Calculate remaining
                    const remaining = calculateRemaining(data, cfg);
                    const durText = data.duration === 'lifetime' ? 'Lifetime' :
                        data.duration === '1min' ? '1 Min' :
                        data.duration + ' Days';
                    const modeText = data.mode === 'unlimited' ? 'Unlimited' : '1 Device';

                    let html = '';
                    let canReset = false;
                    let previewExtra = '';

                    if (remaining === null) {
                        html = '<span class="value expired">❌ Invalid expiry data</span>';
                        previewExtra = ' — invalid expiry';
                        canReset = false;
                    } else if (remaining === 'lifetime') {
                        html = '<span class="value lifetime">♾️ Lifetime — never expires</span>';
                        previewExtra = ' — ♾️ Lifetime';
                        canReset = true;
                    } else if (remaining === 'unused') {
                        html = '<span class="value unused">⚠️ Unused — cannot reset</span>';
                        previewExtra = ' — unused';
                        canReset = false;
                    } else if (typeof remaining === 'number') {
                        if (remaining <= 0) {
                            html = '<span class="value expired">⛔ Expired — no remaining time</span>';
                            previewExtra = ' — expired';
                            canReset = false;
                        } else {
                            const days = Math.floor(remaining / (24 * 60 * 60 * 1000));
                            const hours = Math.floor((remaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
                            const mins = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));
                            let parts = [];
                            if (days > 0) parts.push(days + 'd');
                            if (hours > 0) parts.push(hours + 'h');
                            if (mins > 0 && days < 2) parts.push(mins + 'm');
                            if (parts.length === 0) parts.push('< 1m');
                            html = `<span class="value valid">⏳ <strong>${parts.join(' ')}</strong> remaining</span>`;
                            previewExtra = ` — ${parts.join(' ')} remaining`;
                            canReset = true;
                        }
                    } else {
                        html = '<span class="value muted">Unable to calculate</span>';
                        previewExtra = ' — unknown';
                        canReset = false;
                    }

                    // Device found AND canReset
                    if (deviceExists && canReset && isUsed) {
                        deviceInput.disabled = false;
                        deviceInput.value = storedDevice || 'RESET';
                        deviceInput.className = 'device-found';
                        deviceInput.placeholder = storedDevice;
                        document.getElementById('infoStatus').innerHTML = html +
                            `  <span style="color:#777;font-weight:400;margin-left:8px;">·</span> <span class="device-info">Device: <strong>${storedDevice}</strong></span>`;
                    } else {
                        deviceInput.disabled = true;
                        document.getElementById('infoStatus').innerHTML = html;
                        if (deviceExists && !canReset) {
                            deviceInput.className = 'device-error';
                            deviceInput.placeholder = 'Device found but cannot reset';
                        } else if (!deviceExists) {
                            deviceInput.className = 'device-error';
                            deviceInput.placeholder = '❌ No device model stored';
                        }
                    }

                    const isUsedText = data.isUsed ? '✅ Used' : '🟢 Unused';
                    document.getElementById('previewText').innerHTML =
                        `<strong>${raw}</strong>  ·  ${durText}  ·  ${modeText}  ·  ${isUsedText}${previewExtra}`;

                    document.getElementById('resetBtn').disabled = true;
                    if (deviceExists && canReset) {
                        document.getElementById('statusMsg').className = 'status-msg info';
                        document.getElementById('statusMsg').style.display = 'block';
                        document.getElementById('statusMsg').textContent =
                            '✅ Key verified. Resetting…';
                    } else if (!deviceExists && canReset) {
                        document.getElementById('statusMsg').className = 'status-msg error';
                        document.getElementById('statusMsg').style.display = 'block';
                        document.getElementById('statusMsg').textContent =
                            '❌ Device model not recorded for this ' + (isKey ? 'key' : 'user') +
                            '. Reset requires device model verification.';
                    } else {
                        document.getElementById('statusMsg').className = 'status-msg error';
                        document.getElementById('statusMsg').style.display = 'block';
                        document.getElementById('statusMsg').textContent =
                            '❌ Cannot reset — ' + (isKey ? 'key' : 'user') +
                            ' is deactivated, expired, or not used.';
                    }

                    validateDevice();
                })
                .catch((err) => {
                    document.getElementById('infoStatus').innerHTML =
                        `<span style="color:#ff3333;">⚠️ Error: ${err.message}</span>`;
                    document.getElementById('previewText').innerHTML =
                        `<i class="fa-regular fa-circle-xmark" style="color:#ff3333;"></i> Error checking.`;
                    document.getElementById('resetBtn').disabled = true;
                    checkedData = null;
                    deviceInput.disabled = true;
                });
        }

        function calculateRemaining(data, cfg) {
            if (data.duration === 'lifetime') return 'lifetime';
            if (!data.isUsed) return 'unused';
            const expiry = data.expiryTimestamp;
            if (!expiry || expiry === 0) return null;
            return expiry - Date.now();
        }

        // ═══════════════════════════════════════════════════════════════
        //  RESET
        // ═══════════════════════════════════════════════════════════════

        function handleResetDirect() {
            const input = document.getElementById('oldInput');
            if (!input || !input.value.trim()) {
                kr2ShowToast('Please enter a key or username first.', 'error');
                input && input.focus();
                return;
            }
            const resetBtn = document.getElementById('resetBtn');
            if (resetBtn) resetBtn.disabled = true;
            Promise.resolve(handleCheck()).then(function() {
                if (checkedData) {
                    handleReset();
                } else {
                    if (resetBtn) resetBtn.disabled = false;
                    kr2ShowToast('Key / username not found or cannot reset.', 'error');
                }
            }).catch(function(err) {
                if (resetBtn) resetBtn.disabled = false;
                kr2ShowToast('Check failed.', 'error');
            });
        }

        function handleReset() {
            if (!checkedData) {
                kr2ShowToast('Please check a valid ' + (getPanelCfg().type === 'key' ? 'key' : 'user') + ' first.', 'error');
                return;
            }

            const { key: oldId, data: oldData, panel, device } = checkedData;
            const cfg = getPanelCfg();
            const isKey = cfg.type === 'key';
            const db = getDb();
            const statusMsg = document.getElementById('statusMsg');

            // device verification removed


            // Panel #12 (purple-all) uses usedDeviceId; other panels use isUsed
            const hasBeenUsed = (oldData.isUsed === true) ||
                (oldData.usedDeviceId && String(oldData.usedDeviceId).length > 0) ||
                (oldData.usedByDevice && String(oldData.usedByDevice).length > 0);
            if (!hasBeenUsed) {
                const msg = 'This ' + (isKey ? 'key' : 'user') +
                    ' has not been used on any device. Reset is not allowed.';
                kr2ShowToast(msg, 'error');
                statusMsg.className = 'status-msg error';
                statusMsg.style.display = 'block';
                statusMsg.textContent = '❌ ' + msg;
                return;
            }

            const remaining = calculateRemaining(oldData, cfg);

            if (oldData.status !== 'active') {
                kr2ShowToast('❌ This ' + (isKey ? 'key' : 'user') + ' is not active. Cannot reset.', 'error');
                return;
            }
            if (remaining === null) {
                kr2ShowToast('❌ Invalid expiry data. Cannot reset.', 'error');
                return;
            }
            if (typeof remaining === 'number' && remaining <= 0) {
                kr2ShowToast('❌ This ' + (isKey ? 'key' : 'user') + ' has already expired. Cannot reset.', 'error');
                return;
            }

            const label = isKey ? 'key' : 'user';
            if (!confirm(`🔄 Reset ${label}:\n\n  ${oldId}\n\nThis will deactivate the old ${label} and generate a new one with the SAME remaining validity.`)) {
                return;
            }

            let newId, newData;
            if (isKey) {
                newId = cfg.buildNewKey();
                let newDuration = oldData.duration;
                let newExpiry = 0;

                if (remaining === 'lifetime') {
                    newDuration = 'lifetime';
                } else if (remaining === 'unused') {
                    newDuration = oldData.duration;
                } else if (typeof remaining === 'number') {
                    const remainingDays = remaining / (24 * 60 * 60 * 1000);
                    if (remainingDays >= 1) {
                        newDuration = String(Math.min(Math.ceil(remainingDays), 30));
                    } else {
                        newDuration = '1';
                    }
                    if (oldData.isUsed && oldData.expiryTimestamp) {
                        const now = Date.now();
                        const remainingMs = oldData.expiryTimestamp - now;
                        if (remainingMs > 0) {
                            newExpiry = now + remainingMs;
                        }
                    }
                }

                newData = {
                    duration: newDuration,
                    mode: oldData.mode || '1device',
                    status: 'active',
                    isUsed: false,
                    expiryTimestamp: 0,
                    usedByDevice: ''
                };

                if (newExpiry > 0) {
                    newData.expiryTimestamp = newExpiry;
                    newData.isUsed = true;
                    newData.registerDate = new Date().toLocaleString();
                    newData.usedByDevice = 'RESET_KEY';
                }
            } else {
                const creds = cfg.buildNewKey();
                newId = creds.username;
                const newPass = creds.password;

                let newExpiry = 0;
                let newActivated = 0;
                const duration = oldData.duration || '7';
                const now = Date.now();

                if (duration === 'lifetime') {
                    newExpiry = 4102444800000;
                    newActivated = now;
                } else if (duration === '1min') {
                    newExpiry = now + 60 * 1000;
                    newActivated = now;
                } else {
                    if (oldData.expiryTimestamp > 0 && now < oldData.expiryTimestamp) {
                        newExpiry = oldData.expiryTimestamp;
                        newActivated = oldData.activatedAt || now;
                    } else {
                        const days = parseInt(duration);
                        newExpiry = now + (days * 24 * 60 * 60 * 1000);
                        newActivated = now;
                    }
                }

                newData = {
                    password: newPass,
                    duration: duration,
                    mode: '1device',
                    status: 'active',
                    usedDeviceId: '',
                    createdAt: oldData.createdAt || now,
                    activatedAt: newActivated,
                    expiryTimestamp: newExpiry,
                    lastLogin: 0,
                    lastDeviceName: '',
                    resetCount: (oldData.resetCount || 0) + 1,
                    resetFrom: oldId,
                    isUsed: false
                };
            }

            const path = cfg.path;

            db.ref(path + '/' + oldId).update({ status: 'deactive' })
                .then(() => {
                    return db.ref(path + '/' + newId).set(newData);
                })
                .then(() => {
                    const outputBox = document.getElementById('outputBox');
                    outputBox.classList.add('show');

                    let html = '';
                    if (isKey) {
                        html = `
                            <div class="kr2-reset-key-line">
                                <span class="kr2-reset-key-text" id="kr2NewKeyText">${newId}</span>
                                <button type="button" class="kr2-reset-key-copy" onclick="kr2CopyText('${newId}')"><i class="fa-solid fa-copy"></i> Copy</button>
                            </div>
                            <div class="sub-note" style="margin-top:10px;"><i class="fa-regular fa-circle-check" style="color:#00ff44;"></i> Old key <strong>${oldId}</strong> deactivated · Same validity preserved</div>
                        `;
                    } else {
                        const pass = newData.password;
                        const expLabel = newData.duration === 'lifetime' ? '♾️ Lifetime' :
                            new Date(newData.expiryTimestamp).toLocaleString();
                        html = `
                            <div class="gen-label"><i class="fa-regular fa-user"></i> New Username</div>
                            <div class="gen-value user">${newId}</div>
                            <div class="gen-label" style="margin-top:6px;"><i class="fa-solid fa-lock"></i> New Password</div>
                            <div class="gen-value pass">${pass}</div>
                            <div class="gen-label" style="margin-top:6px;"><i class="fa-regular fa-clock"></i> Expiry</div>
                            <div class="gen-value expiry">${expLabel}</div>
                            <div class="actions">
                                <button class="btn-copy" onclick="kr2CopyText('${newId}')"><i class="fa-solid fa-copy"></i> User</button>
                                <button class="btn-copy" onclick="kr2CopyText('${pass}')"><i class="fa-solid fa-copy"></i> Pass</button>
                                <button class="btn-copy" onclick="kr2CopyBoth('${newId}','${pass}')"><i class="fa-solid fa-copy"></i> Both</button>
                            </div>
                            <div class="sub-note"><i class="fa-regular fa-circle-check" style="color:#00ff44;"></i> Old user <strong>${oldId}</strong> deactivated · Same validity preserved</div>
                        `;
                    }
                    document.getElementById('outputContent').innerHTML = html;
                    document.getElementById('outputBox').classList.add('show');

                    const panelEl = document.getElementById('resetPanel');
                    panelEl.classList.remove('flash-success');
                    void panelEl.offsetWidth;
                    panelEl.classList.add('flash-success');

                    document.getElementById('statusMsg').className = 'status-msg success';
                    document.getElementById('statusMsg').style.display = 'block';
                    document.getElementById('statusMsg').textContent =
                        `✅ Reset successful! New ${isKey ? 'key' : 'credentials'} generated.`;

                    document.getElementById('infoStatus').innerHTML =
                        `<span style="color:#00ff44;">✅ Reset complete</span> <span style="color:#777;font-weight:400;margin-left:8px;">·</span> Old ${isKey ? 'key' : 'user'} deactivated`;
                    document.getElementById('previewText').innerHTML =
                        `<i class="fa-regular fa-circle-check" style="color:#00ff44;"></i> Old <strong>${oldId}</strong> deactivated · New ${isKey ? 'key' : 'credentials'} ready below.`;

                    document.getElementById('resetBtn').disabled = true;
                    checkedData = null;
                    document.getElementById('oldInput').value = '';
                    document.getElementById('deviceInput').value = '';
                    document.getElementById('deviceInput').disabled = true;
                    document.getElementById('deviceInput').className = '';
                    document.getElementById('deviceInput').placeholder = 'Enter key / username';
                    document.getElementById('oldInput').placeholder =
                        'Reset complete! Enter another ' + (isKey ? 'key' : 'username') + '…';

                    const safePass = (newData && newData.password) ? newData.password : '';
                    const safeExp = (newData && newData.duration === 'lifetime')
                        ? '♾️ Lifetime'
                        : (newData && newData.expiryTimestamp ? new Date(newData.expiryTimestamp).toLocaleString() : '—');
                    const msg = isKey ?
                        `✅ RESET SUCCESSFUL!\n\nNew Key: ${newId}` :
                        `✅ RESET SUCCESSFUL!\n\nNew Username: ${newId}\nNew Password: ${safePass}\nExpiry: ${safeExp}`;
                    if (typeof kr2ShowToast === 'function') kr2ShowToast(msg, 'success');
                    else if (typeof showToast === 'function') showToast(msg, '#22c55e', '✅');
                })
                .catch((err) => {
                    const errMsg = '❌ Error during reset: ' + err.message;
                    kr2ShowToast(errMsg, 'error');
                    document.getElementById('statusMsg').className = 'status-msg error';
                    document.getElementById('statusMsg').style.display = 'block';
                    document.getElementById('statusMsg').textContent = errMsg;
                });
        }

        // ═══════════════════════════════════════════════════════════════
        //  COPY HELPERS
        // ═══════════════════════════════════════════════════════════════

        function copyText(text) {
            if (text && text !== '—') {
                navigator.clipboard.writeText(text).then(() => kr2ShowToast('Copied: ' + text, 'success', 2000));
            } else {
                kr2ShowToast('Nothing to copy.', 'error');
            }
        }

        function copyBoth(user, pass) {
            if (user && pass && user !== '—' && pass !== '—') {
                navigator.clipboard.writeText('Username: ' + user + '\nPassword: ' + pass)
                    .then(() => kr2ShowToast('Both copied!', 'success', 2000));
            } else {
                kr2ShowToast('Generate credentials first.', 'error');
            }
        }


        function kr2Init() {
            if (window.__kr2Initialized) return;
            window.__kr2Initialized = true;
            currentPanel = 13;
            document.getElementById('panelSelect').value = '13';
            updatePanelUI();
            autoSignIn(13);

            document.getElementById('panelSelect').addEventListener('change', function() {
                currentPanel = parseInt(this.value);
                updatePanelUI();
                autoSignIn(currentPanel);
                const val = document.getElementById('oldInput').value.trim();
                if (val) handleCheck();
            });
            document.getElementById('deviceInput').addEventListener('input', function() { validateDevice(); });
            document.getElementById('oldInput').addEventListener('keydown', function(e) {
                if (e.key === 'Enter') { e.preventDefault(); handleResetDirect(); }
            });
            document.getElementById('oldInput').addEventListener('blur', function() {
                if (this.value.trim()) { document.getElementById('resetBtn').disabled = false; }
            });
        }
        window.kr2Init = kr2Init;
        window.kr2HandleCheck = handleCheck;
        window.kr2HandleReset = handleResetDirect;

        // Ensure deviceInput exists (UI field removed) so legacy reset logic stays safe
        (function ensureDeviceInput(){
            if (!document.getElementById('deviceInput')) {
                const ghost = document.createElement('input');
                ghost.type = 'hidden';
                ghost.id = 'deviceInput';
                ghost.disabled = true;
                document.body.appendChild(ghost);
            }
        })();

        window.kr2CopyText = copyText;
        window.kr2CopyBoth = copyBoth;

})();
