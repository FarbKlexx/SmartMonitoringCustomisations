// ------------------------------------------------------------------
//  Updatet den Gerätestatus basierend auf der Zeit des 
//  neusten Datenpunktes
// ------------------------------------------------------------------
document.addEventListener(
    'swac_Component_deviceTable_lastSetFromRequestAdded',
    function () {
        updateOnlineStatus();
    }
);

function updateOnlineStatus() {

    const statusCells = document.querySelectorAll('td[id^="status_"]');
    const now = new Date();

    statusCells.forEach(cell => {

        const raw = extractTimestamp(cell);

        // Neues Status-DIV erstellen
        const statusDiv = document.createElement('div');
        statusDiv.classList.add('status-indicator');

        // Kein Timestamp -> Unbekannt anzeigen
        if (!raw) {
            statusDiv.classList.add("status-unknown");
            statusDiv.setAttribute('swac_lang', 'status_unknown');
            cell.innerHTML = "";
            cell.appendChild(statusDiv);
            return;
        }

        // Versuchen zu parsen
        const parsed = parseUSTimestamp(raw);

        if (!parsed) {
            // Fehlerhafte Daten → Unbekannt
            statusDiv.classList.add("status-unknown");
            statusDiv.setAttribute('swac_lang', 'status_unknown');
        } else {
            const diffMinutes = (now - parsed) / (1000 * 60);

            if (diffMinutes >= 0 && diffMinutes <= 30) {
                statusDiv.textContent = "Online";
                statusDiv.classList.add("status-online");
            } else {
                statusDiv.textContent = "Offline";
                statusDiv.classList.add("status-offline");
            }
        }

        cell.innerHTML = "";
        cell.appendChild(statusDiv);
    });
    window.swac.lang.translateAll(statusCells);
}

// ------------------------------------------------------------------
// Holt reinen Text, filtert Platzhalter raus
// ------------------------------------------------------------------
function extractTimestamp(cell) {

    const raw = cell.textContent.trim();

    if (!raw) return "";

    // Fälle ausschließen:
    if (raw === "{ts}") return "";
    if (raw.startsWith("{ts}x")) return "";
    if (raw.includes("error occured")) return "";

    // Muss ein Timestamp sein
    return raw;
}

// ------------------------------------------------------------------
//  PARSER für US Format: "11/11/2025, 11:09:39 AM"
// ------------------------------------------------------------------
function parseUSTimestamp(ts) {

    const regex = /^(\d{1,2})\/(\d{1,2})\/(\d{4}),\s*(\d{1,2}):(\d{2}):(\d{2})\s*(AM|PM)$/i;
    const m = ts.match(regex);

    if (!m) return null;

    let [_, mm, dd, yyyy, hh, min, sec, ampm] = m;

    mm = Number(mm);
    dd = Number(dd);
    yyyy = Number(yyyy);
    hh = Number(hh);
    min = Number(min);
    sec = Number(sec);

    if (ampm.toUpperCase() === "PM" && hh !== 12) hh += 12;
    if (ampm.toUpperCase() === "AM" && hh === 12) hh = 0;

    return new Date(yyyy, mm - 1, dd, hh, min, sec);
}