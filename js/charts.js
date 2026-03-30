/**
 * UPS Investment Thesis — Chart Initializations
 * Uses Chart.js 4.x
 * All data pulled from UPS_DATA in data.js
 */

(function () {
  'use strict';

  // ── Shared chart defaults ──────────────────────────────────────────────────
  const FONT_MONO  = "'DM Mono', 'Courier New', monospace";
  const FONT_SERIF = "'Cormorant Garamond', 'Palatino Linotype', serif";
  const INK        = '#111111';
  const INK_MID    = '#444444';
  const INK_LIGHT  = '#888888';
  const GRID       = '#eeeeee';
  const BORDER_LT  = '#cccccc';
  const BULL       = '#1a5c2a';
  const BEAR       = '#8b0000';

  Chart.defaults.font.family     = FONT_MONO;
  Chart.defaults.font.size       = 11;
  Chart.defaults.color           = INK_MID;
  Chart.defaults.borderColor     = GRID;
  Chart.defaults.plugins.legend.labels.font = { family: FONT_MONO, size: 11 };

  function monoTick(value) {
    return String(value);
  }

  // ── Helper: wait for canvas to be in DOM ──────────────────────────────────
  function initChart(id, fn) {
    const el = document.getElementById(id);
    if (!el) return;
    fn(el.getContext('2d'));
  }

  // ══════════════════════════════════════════════════════════════════════════
  // CHART 1: Revenue Per Piece vs. Volume Index
  // ══════════════════════════════════════════════════════════════════════════
  initChart('chart-rpp-volume', function (ctx) {
    const d = UPS_DATA;
    const years  = d.revPerPiece.years.map(String);
    const rpp    = d.revPerPiece.values;

    // Index ADV to 2022 = 100
    const baseADV = d.avgDailyVolume.values[0];
    const advIdx  = d.avgDailyVolume.values.map(v => +((v / baseADV * 100).toFixed(1)));

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: years,
        datasets: [
          {
            label: 'Revenue Per Piece ($)',
            data: rpp,
            borderColor: INK,
            backgroundColor: 'transparent',
            borderWidth: 2,
            pointRadius: 4,
            pointBackgroundColor: INK,
            yAxisID: 'y',
            tension: 0.3,
          },
          {
            label: 'Avg Daily Volume (2022 = 100)',
            data: advIdx,
            borderColor: INK_LIGHT,
            backgroundColor: 'transparent',
            borderWidth: 1.5,
            borderDash: [5, 4],
            pointRadius: 4,
            pointBackgroundColor: INK_LIGHT,
            yAxisID: 'y2',
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: {
            position: 'top',
            align: 'start',
            labels: { boxWidth: 20, padding: 16 },
          },
          tooltip: {
            backgroundColor: '#fff',
            borderColor: BORDER_LT,
            borderWidth: 1,
            titleColor: INK,
            bodyColor: INK_MID,
            callbacks: {
              label: function (ctx) {
                if (ctx.datasetIndex === 0) return ` RPP: $${ctx.parsed.y.toFixed(2)}`;
                return ` ADV Index: ${ctx.parsed.y}`;
              },
            },
          },
        },
        scales: {
          x: {
            grid: { color: GRID },
            ticks: { font: { family: FONT_MONO, size: 11 } },
          },
          y: {
            type: 'linear',
            position: 'left',
            grid: { color: GRID },
            ticks: {
              font: { family: FONT_MONO, size: 11 },
              callback: v => `$${v.toFixed(2)}`,
            },
            title: {
              display: true,
              text: 'Revenue Per Piece ($)',
              font: { family: FONT_MONO, size: 10 },
              color: INK_MID,
            },
          },
          y2: {
            type: 'linear',
            position: 'right',
            grid: { drawOnChartArea: false },
            ticks: {
              font: { family: FONT_MONO, size: 11 },
              callback: v => `${v}`,
            },
            title: {
              display: true,
              text: 'ADV Index (2022=100)',
              font: { family: FONT_MONO, size: 10 },
              color: INK_LIGHT,
            },
          },
        },
      },
    });
  });


  // ══════════════════════════════════════════════════════════════════════════
  // CHART 2: Healthcare Revenue & SMB Penetration
  // ══════════════════════════════════════════════════════════════════════════
  initChart('chart-healthcare-smb', function (ctx) {
    const d      = UPS_DATA;
    const years  = d.healthcare.years.map(String);
    const hcRev  = d.healthcare.revenue.map(v => +(v / 1000).toFixed(1)); // $B
    const smbPct = d.smb.percent;

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: years,
        datasets: [
          {
            type: 'bar',
            label: 'Healthcare Revenue ($B)',
            data: hcRev,
            backgroundColor: 'rgba(17,17,17,0.08)',
            borderColor: INK,
            borderWidth: 1.5,
            yAxisID: 'y',
            order: 2,
          },
          {
            type: 'line',
            label: 'SMB % of U.S. Volume',
            data: smbPct,
            borderColor: INK,
            backgroundColor: 'transparent',
            borderWidth: 2,
            pointRadius: 5,
            pointBackgroundColor: INK,
            yAxisID: 'y2',
            tension: 0.3,
            order: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: {
            position: 'top',
            align: 'start',
            labels: { boxWidth: 20, padding: 16 },
          },
          tooltip: {
            backgroundColor: '#fff',
            borderColor: BORDER_LT,
            borderWidth: 1,
            titleColor: INK,
            bodyColor: INK_MID,
            callbacks: {
              label: function (ctx) {
                if (ctx.dataset.type === 'bar') return ` Healthcare: $${ctx.parsed.y}B`;
                return ` SMB: ${ctx.parsed.y}%`;
              },
            },
          },
          // Long-term target annotation line
          annotation: undefined, // handled via afterDraw plugin below
        },
        scales: {
          x: {
            grid: { color: GRID },
            ticks: { font: { family: FONT_MONO, size: 11 } },
          },
          y: {
            type: 'linear',
            position: 'left',
            grid: { color: GRID },
            ticks: {
              font: { family: FONT_MONO, size: 11 },
              callback: v => `$${v}B`,
            },
            suggestedMax: 22,
            title: {
              display: true,
              text: 'Healthcare Revenue ($B)',
              font: { family: FONT_MONO, size: 10 },
              color: INK_MID,
            },
          },
          y2: {
            type: 'linear',
            position: 'right',
            grid: { drawOnChartArea: false },
            min: 20,
            max: 40,
            ticks: {
              font: { family: FONT_MONO, size: 11 },
              callback: v => `${v}%`,
            },
            title: {
              display: true,
              text: 'SMB % of U.S. Volume',
              font: { family: FONT_MONO, size: 10 },
              color: INK_MID,
            },
          },
        },
      },
      plugins: [
        {
          // Draw a dashed horizontal reference line at $20B healthcare target
          id: 'hcTargetLine',
          afterDraw(chart) {
            const { ctx: c, scales, chartArea } = chart;
            const yScale = scales['y'];
            const y20B = yScale.getPixelForValue(20);

            c.save();
            c.beginPath();
            c.setLineDash([6, 4]);
            c.strokeStyle = INK_LIGHT;
            c.lineWidth = 1;
            c.moveTo(chartArea.left, y20B);
            c.lineTo(chartArea.right, y20B);
            c.stroke();

            c.fillStyle = INK_LIGHT;
            c.font = `400 10px ${FONT_MONO}`;
            c.fillText('$20B LT target', chartArea.left + 6, y20B - 5);
            c.restore();
          },
        },
      ],
    });
  });


  // ══════════════════════════════════════════════════════════════════════════
  // CHART 3: Automation & Cost Savings
  // ══════════════════════════════════════════════════════════════════════════
  initChart('chart-automation', function (ctx) {
    const d      = UPS_DATA.networkTransformation;
    const years  = d.cumulativeSavings.years.map(String);
    const savings = d.cumulativeSavings.values.map(v => +(v / 1000).toFixed(2)); // $B

    // Automation for matching years (2023–2026E)
    const autoAll = d.automationPenetration;
    const autoMatchIdx = autoAll.years.map(y => String(y));
    const autoData = years.map(yr => {
      const idx = autoMatchIdx.indexOf(yr);
      return idx >= 0 ? autoAll.percent[idx] : null;
    });

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: years,
        datasets: [
          {
            type: 'bar',
            label: 'Cumulative Savings ($B)',
            data: savings,
            backgroundColor: 'rgba(17,17,17,0.08)',
            borderColor: INK,
            borderWidth: 1.5,
            yAxisID: 'y',
            order: 2,
          },
          {
            type: 'line',
            label: 'Automation Penetration (%)',
            data: autoData,
            borderColor: INK,
            backgroundColor: 'transparent',
            borderWidth: 2,
            pointRadius: 5,
            pointBackgroundColor: INK,
            yAxisID: 'y2',
            tension: 0.3,
            order: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: {
            position: 'top',
            align: 'start',
            labels: { boxWidth: 20, padding: 16 },
          },
          tooltip: {
            backgroundColor: '#fff',
            borderColor: BORDER_LT,
            borderWidth: 1,
            titleColor: INK,
            bodyColor: INK_MID,
            callbacks: {
              label: function (ctx) {
                if (ctx.dataset.type === 'bar') return ` Savings: $${ctx.parsed.y}B`;
                return ` Automation: ${ctx.parsed.y}%`;
              },
            },
          },
        },
        scales: {
          x: {
            grid: { color: GRID },
            ticks: { font: { family: FONT_MONO, size: 11 } },
          },
          y: {
            type: 'linear',
            position: 'left',
            grid: { color: GRID },
            min: 0,
            max: 4,
            ticks: {
              font: { family: FONT_MONO, size: 11 },
              callback: v => `$${v.toFixed(1)}B`,
            },
            title: {
              display: true,
              text: 'Cumulative Savings ($B)',
              font: { family: FONT_MONO, size: 10 },
              color: INK_MID,
            },
          },
          y2: {
            type: 'linear',
            position: 'right',
            grid: { drawOnChartArea: false },
            min: 40,
            max: 80,
            ticks: {
              font: { family: FONT_MONO, size: 11 },
              callback: v => `${v}%`,
            },
            title: {
              display: true,
              text: 'Automation Penetration (%)',
              font: { family: FONT_MONO, size: 10 },
              color: INK_MID,
            },
          },
        },
      },
    });
  });


  // ══════════════════════════════════════════════════════════════════════════
  // CHART 4: UPS Share Price vs. WTI Crude (Indexed)
  // ══════════════════════════════════════════════════════════════════════════
  initChart('chart-ups-wti', function (ctx) {
    const d       = UPS_DATA.wti.indexedChart;
    const labels  = d.labels;
    const upsData = d.ups;
    const wtiData = d.wti;
    const hormuzIdx = d.hormuzAnnotationIndex;

    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'UPS (Indexed, Jan 2018 = 100)',
            data: upsData,
            borderColor: INK,
            backgroundColor: 'transparent',
            borderWidth: 2,
            pointRadius: 3,
            pointBackgroundColor: INK,
            tension: 0.35,
            yAxisID: 'y',
          },
          {
            label: 'WTI Crude (Indexed, Jan 2018 = 100)',
            data: wtiData,
            borderColor: INK_LIGHT,
            backgroundColor: 'transparent',
            borderWidth: 1.5,
            borderDash: [5, 4],
            pointRadius: 3,
            pointBackgroundColor: INK_LIGHT,
            tension: 0.35,
            yAxisID: 'y',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: {
            position: 'top',
            align: 'start',
            labels: { boxWidth: 20, padding: 16 },
          },
          tooltip: {
            backgroundColor: '#fff',
            borderColor: BORDER_LT,
            borderWidth: 1,
            titleColor: INK,
            bodyColor: INK_MID,
            callbacks: {
              label: function (ctx) {
                const name = ctx.dataset.label.split(' ')[0];
                return ` ${name}: ${ctx.parsed.y}`;
              },
            },
          },
        },
        scales: {
          x: {
            grid: { color: GRID },
            ticks: {
              font: { family: FONT_MONO, size: 10 },
              maxRotation: 45,
              autoSkip: true,
              maxTicksLimit: 12,
            },
          },
          y: {
            grid: { color: GRID },
            ticks: {
              font: { family: FONT_MONO, size: 11 },
              callback: v => `${v}`,
            },
            title: {
              display: true,
              text: 'Index (Jan 2018 = 100)',
              font: { family: FONT_MONO, size: 10 },
              color: INK_MID,
            },
          },
        },
      },
      plugins: [
        {
          id: 'hormuzLine',
          afterDraw(chart) {
            const { ctx: c, scales, chartArea } = chart;
            const xScale = scales['x'];
            const x = xScale.getPixelForValue(hormuzIdx);

            // Vertical dashed line
            c.save();
            c.beginPath();
            c.setLineDash([4, 4]);
            c.strokeStyle = BEAR;
            c.lineWidth = 1.5;
            c.moveTo(x, chartArea.top);
            c.lineTo(x, chartArea.bottom);
            c.stroke();

            // Label
            c.fillStyle = BEAR;
            c.font = `400 10px ${FONT_MONO}`;
            c.textAlign = 'right';
            c.fillText('Hormuz Crisis /  ', x - 4, chartArea.top + 16);
            c.fillText('Geopolitical Spike', x - 4, chartArea.top + 29);
            c.restore();
          },
        },
      ],
    });
  });

})();
