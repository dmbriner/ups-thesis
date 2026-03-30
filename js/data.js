/**
 * UPS Investment Thesis — Financial Data
 * All figures sourced from UPS press releases, SEC filings, and public data.
 * Adjusted figures used throughout unless noted.
 * Sources: UPS Q4 2025 Earnings Release (Jan 27, 2026), UPS 10-K filings,
 *          EIA crude oil data, Goldman Sachs research notes.
 */

const UPS_DATA = {

  // ─── Annual Financials ────────────────────────────────────────────────────
  // Source: UPS Annual Reports / 10-K / Earnings Releases
  // Operating margins below are GAAP; adjusted margins noted separately
  annual: {
    years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
    revenue: [71900, 74094, 84628, 97287, 100338, 90958, 91070, 88661], // $M
    operatingIncome: [7566, 7558, 8553, 12810, 13094, 9141, 8468, 7867],  // $M GAAP
    operatingMargin: [10.52, 10.20, 10.10, 13.17, 13.05, 10.05, 9.30, 8.87], // % GAAP
    adjustedOperatingMargin: [10.9, 10.6, 10.5, 13.4, 13.2, 11.2, 10.1, 9.80], // % Non-GAAP
    ebitda: [10200, 10400, 11200, 15763, 16282, 12507, 12077, 11613], // $M
    epsGAAP:     [7.24, 7.53, 8.27, 14.68, 13.20, 7.80, 6.75, 6.56],
    epsAdjusted: [7.41, 8.62, 8.45, 14.87, 13.37, 9.06, 7.59, 7.16],
    dividendPerShare: [3.84, 4.00, 4.04, 4.08, 5.04, 6.48, 6.56, 6.56],
  },

  // ─── Guidance / Estimates ─────────────────────────────────────────────────
  // Source: UPS Q4 2025 Earnings Release, Jan 27 2026
  guidance2026: {
    revenue: 89700,          // $M — confirmed guidance
    adjustedOpMargin: 9.6,   // % — confirmed guidance
    costSavingsTarget: 3000, // $M — "approximately $3B" per earnings release
    volumeGrowthH2: 'mid-single digit', // qualitative guidance
  },

  // ─── Q4 2025 Beat ─────────────────────────────────────────────────────────
  q4_2025: {
    revenueActual:   24500,  // $M
    revenueEstimate: 24010,  // $M (consensus at time of report)
    epsActual:       2.38,   // adjusted
    epsEstimate:     2.20,   // consensus adjusted
    revenuePerPieceGrowth: 8.3, // % YoY Q4 2025
  },

  // ─── U.S. Domestic Segment ────────────────────────────────────────────────
  // Revenue Per Piece (US Domestic, indexed to 2022 = 100 for chart clarity)
  // Source: UPS earnings releases, confirmed directional trends
  revPerPiece: {
    // Actual approximate annual avg RPP for US Domestic ($)
    years:  [2022, 2023, 2024, 2025],
    values: [12.05, 12.42, 12.72, 13.48], // $ per piece — approximate, directionally confirmed
    // Q4 YoY growth rates: Q4 2024 +2.4%, Q1 2025 +4.5%, Q4 2025 +8.3%
  },

  // Average Daily Packages — US Domestic (millions)
  // Source: UPS earnings releases
  avgDailyVolume: {
    years:  [2022, 2023, 2024, 2025],
    values: [20.8, 19.0, 17.5, 16.7], // millions — 2024/2025 reflect Amazon volume reduction
    // Note: Amazon volume ~50% reduction underway through mid-2026
  },

  // ─── Healthcare Segment ───────────────────────────────────────────────────
  // Source: UPS earnings calls, investor presentations
  healthcare: {
    years:   [2022, 2023, 2024, 2025, '2026E'],
    revenue: [8200, 9300, 10400, 11200, 13000], // $M
    // $20B is aspirational long-term target; near-term 2026E ~$13B
    longTermTarget: 20000,
    note: '$20B is UPS\'s stated strategic aspiration; 2026E reflects analyst consensus'
  },

  // ─── SMB Penetration (% of U.S. Volume) ──────────────────────────────────
  // Source: UPS earnings calls
  smb: {
    years:   [2022,  2023,  2024,  2025,  '2026E'],
    percent: [27.2,  28.6,  29.4,  31.2,  33.0],
    // Note: thesis referenced 32.8% — Q4 2025 peak quarter figure was 31.2% full-year avg
  },

  // ─── Network Transformation ───────────────────────────────────────────────
  // Source: UPS Q4 2025 Earnings Release, Network Reconfiguration program
  networkTransformation: {
    automationPenetration: {
      years:   [2022, 2023, 2024, 2025, '2026E'],
      percent: [51,   57,   62,   66,   70],
    },
    cumulativeSavings: {
      // $M savings from "Efficiency Reimagined" + "Network of the Future"
      years:   [2023, 2024, 2025, '2026E'],
      values:  [800,  1700, 2200, 3000],
    },
    facilitiesClosed: '~200 facilities targeted through 2026',
    efficiencyGain: '30-35% more efficient vs legacy sort facilities',
  },

  // ─── Balance Sheet (2025 year-end) ────────────────────────────────────────
  // Source: UPS 10-K / stockanalysis.com / SEC filings
  balanceSheet: {
    cash: 5890,          // $M
    totalDebt: 28590,    // $M
    netDebt: 22700,      // $M
    dilutedShares: 850,  // millions — actual ~850M (Class A + Class B)
    dividendAnnual: 6.56, // $/share
    payoutRatioGAAP: 100, // % — $6.56 dividend / $6.56 GAAP EPS = 100%
  },

  // ─── Valuation ────────────────────────────────────────────────────────────
  valuation: {
    currentPrice: 98.00,         // approximate as of late March 2026
    fiftyTwoWeekHigh: 122.41,
    dividendYield: 6.70,          // % at ~$98
    evEbitdaCurrent: 9.1,         // LTM at ~$98 price
    evEbitdaFiveYrAvg: 11.6,
    // EV calc: market cap ($98 × 850M = $83.3B) + net debt $22.7B = ~$106B
    // EV/EBITDA: $106B / $11.6B ≈ 9.1x
    scenarios: {
      bear: { multiple: 8.9, impliedPrice: 86,     label: 'Bear' },
      base: { multiple: 9.9, impliedPrice: 115.72, label: 'Base' },
      bull: { multiple: 10.9, impliedPrice: 145,   label: 'Bull' },
    },
    analystTargets: {
      consensus: 116,
      high: 147,   // Goldman Sachs
      low:  75,    // Morgan Stanley
    },
  },

  // ─── WTI Crude Oil ────────────────────────────────────────────────────────
  // Annual average prices, nominal $/bbl
  // Source: EIA / MacroTrends
  wti: {
    annual: {
      years:  [2018,  2019,  2020,  2021,  2022,  2023,  2024,  2025],
      prices: [64.77, 56.98, 41.47, 68.14, 94.53, 77.58, 76.96, 70.00],
    },
    // Key price points for thesis narrative
    keyLevels: {
      jan2026:   78.50,
      marchPeak: 98.32, // WTI intraday peak
      brentPeak: 112.00,
      currentWTI: 92.00,    // ~March 26, 2026
      currentBrent: 106.00,
      gsRiskPremium: '15–20', // $/bbl Goldman estimate
      gsBrentForecast2026: 85,
      gsMarchEstimate: 110,
    },
    // Indexed series for UPS vs WTI chart (semi-annual, Jan 2018 = 100)
    // Both series indexed to their Jan 2018 value
    indexedChart: {
      labels: [
        'Jan 2018','Jul 2018','Jan 2019','Jul 2019',
        'Jan 2020','Jul 2020','Jan 2021','Jul 2021',
        'Jan 2022','Jul 2022','Jan 2023','Jul 2023',
        'Jan 2024','Jul 2024','Jan 2025','Jul 2025',
        'Jan 2026','Mar 2026'
      ],
      // UPS stock price indexed to 100 at Jan 2018 (~$99/share)
      ups: [100, 104, 97, 122, 116, 155, 165, 220, 217, 192, 183, 163, 148, 122, 119, 116, 104, 99],
      // WTI indexed to 100 at Jan 2018 (~$62/bbl)
      wti: [100, 121, 92,  97, 103,  69,  91, 116, 129, 171, 129, 123, 124, 132, 126, 113, 127, 148],
      hormuzAnnotationIndex: 17, // "Mar 2026" is index 17
    },
  },

  // ─── Margin Sensitivity to Oil ────────────────────────────────────────────
  // Based on: ~50bps operating margin impact per $10/bbl move in WTI
  // Baseline: $70 WTI / ~10.4% adj op margin (normalized)
  marginSensitivity: {
    baseline: { wti: 70, opMargin: 10.4 },
    bpsPerTenDollars: 50,
    rows: [
      { wti:  70, opMargin: 10.4, deltaBps:    0, epsImpact:  0.00 },
      { wti:  80, opMargin:  9.9, deltaBps:  -50, epsImpact: -0.35 },
      { wti:  90, opMargin:  9.4, deltaBps: -100, epsImpact: -0.71 },
      { wti: 100, opMargin:  8.9, deltaBps: -150, epsImpact: -1.06 },
      { wti: 110, opMargin:  8.4, deltaBps: -200, epsImpact: -1.42 },
    ],
    footnote: 'Each $10/bbl increase in WTI estimated to impact adjusted operating margin by ~50bps. EPS impact based on $89.7B revenue, ~850M diluted shares, ~30% effective tax rate.',
  },

  // ─── Teamsters / Labor ────────────────────────────────────────────────────
  labor: {
    contractSigned: 2023,
    frontLoaded: true,
    q4_2024_wageGrowth: 3.0, // % YoY — confirming deceleration from peak
    note: 'Contract ratified Aug 2023. Largest wage increases in 2023–24; growth slowing to ~3% by Q4 2024. Multi-year drag is backward-looking.',
  },

};

// Export for use in other modules
if (typeof module !== 'undefined') module.exports = UPS_DATA;
