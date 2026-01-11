// ------------------------------------------------------------------
//  Hilfsfunktion um die Dauer zwischen zwei Zeitpunkten zu berechnen
// ------------------------------------------------------------------
  document.addEventListener('swac_ready', function () {
    setTimeout(() => {
      calculateDuration();
    }, 500);
  });

  function calculateDuration() {
    const firstMeasurementElem = document.getElementById('firstMeasurement');
    const lastMeasurementElem = document.getElementById('lastMeasurement');
    const resultElem = document.getElementById('durerg');

    let firstTs = firstMeasurementElem.textContent.trim();
    let lastTs = lastMeasurementElem.textContent.trim();

    firstTs = normalizeTimestamp(firstTs);
    lastTs = normalizeTimestamp(lastTs);
    firstTs = firstTs.slice(0, -2);
    lastTs = lastTs.slice(0, -2);

    const firstDate = new Date(firstTs);
    const lastDate = new Date(lastTs);



    // Überprüfen, ob die Werte gültig sind
    if (isNaN(firstDate.getTime()) || isNaN(lastDate.getTime())) {
      console.error("Ungültige Zeitstempel");
      return;
    }

    const durationMs = lastDate - firstDate;

    const durationMinutes = Math.floor(durationMs / (1000 * 60));
    const durationSeconds = Math.floor((durationMs % (1000 * 60)) / 1000)

    resultElem.innerText = `${durationMinutes} Min, ${durationSeconds} Sek`;

  }

  // korrigiert Timestamps wie "2025-10-28T09:53:20.81"
  function normalizeTimestamp(ts) {
    if (!ts || !ts.includes('T')) return null;

    const fixed = ts.replace(
      /T(\d{2}:\d{2}:\d{2})(?:\.(\d{1,3}))?/,
      (_, time, frac) => {
        if (!frac) return 'T' + time;
        return 'T' + time + '.' + frac.padEnd(3, '0');
      }
    );

    return fixed;
  }