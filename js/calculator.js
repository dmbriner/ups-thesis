/**
 * UPS Investment Thesis — Oil Drag Calculator
 *
 * Model:
 *   adjustedMargin = baseMargin − ((oilPrice − 70) / 10) × 0.5
 *   operatingIncome = revenue × adjustedMargin
 *   EBITDA ≈ operatingIncome + 3.7   ($B — 2025 historical D&A)
 *   EV = EBITDA × 9.9   (base multiple)
 *   equityValue = EV − 22.7   (net debt, $B)
 *   pricePerShare = equityValue / 0.850   (850M shares, $B → $)
 *   upside = (pricePerShare − 98) / 98 × 100
 */

(function () {
  'use strict';

  const CURRENT_PRICE = 98;
  const NET_DEBT      = 22.7;   // $B
  const SHARES        = 0.850;  // billions
  const DA            = 3.7;    // $B D&A (historical avg)
  const MULTIPLE      = 9.9;    // base EV/EBITDA
  const OIL_BASELINE  = 70;     // $/bbl baseline
  const OIL_SENS      = 0.5;    // pct-pts per $10/bbl
  const UPSIDE_THRESH_BULL = 15;  // % → green
  const UPSIDE_THRESH_BEAR = -5;  // % → red

  // DOM refs
  const sliderOil    = document.getElementById('slider-oil');
  const sliderRev    = document.getElementById('slider-rev');
  const sliderMargin = document.getElementById('slider-margin');

  const valOil    = document.getElementById('val-oil');
  const valRev    = document.getElementById('val-rev');
  const valMargin = document.getElementById('val-margin');

  const outAdjMargin  = document.getElementById('out-adj-margin');
  const outOpIncome   = document.getElementById('out-op-income');
  const outFairValue  = document.getElementById('out-fair-value');
  const outUpside     = document.getElementById('out-upside');

  const cardAdjMargin = document.getElementById('card-adj-margin');
  const cardOpIncome  = document.getElementById('card-op-income');
  const cardFairValue = document.getElementById('card-fair-value');
  const cardUpside    = document.getElementById('card-upside');

  if (!sliderOil || !sliderRev || !sliderMargin) return;

  function fmt(n, decimals) {
    return n.toFixed(decimals !== undefined ? decimals : 2);
  }

  function setCardTheme(card, valueEl, upside) {
    card.classList.remove('bull', 'bear');
    if (upside > UPSIDE_THRESH_BULL) {
      card.classList.add('bull');
    } else if (upside < UPSIDE_THRESH_BEAR) {
      card.classList.add('bear');
    }
  }

  function calculate() {
    const oilPrice  = parseFloat(sliderOil.value);
    const revB      = parseFloat(sliderRev.value);     // $B
    const baseMargin = parseFloat(sliderMargin.value); // %

    // Update display labels
    valOil.textContent    = oilPrice;
    valRev.textContent    = revB.toFixed(1);
    valMargin.textContent = baseMargin.toFixed(1);

    // ── Core model ────────────────────────────────────────────────────────
    const oilDragPts = ((oilPrice - OIL_BASELINE) / 10) * OIL_SENS; // pct-pts
    const adjMargin  = Math.max(0, baseMargin - oilDragPts);          // %
    const opIncomeB  = (revB * adjMargin) / 100;                       // $B
    const ebitdaB    = opIncomeB + DA;                                  // $B
    const evB        = ebitdaB * MULTIPLE;                              // $B
    const equityB    = evB - NET_DEBT;                                  // $B
    const fairValue  = equityB / SHARES;                                // $/share
    const upside     = ((fairValue - CURRENT_PRICE) / CURRENT_PRICE) * 100;

    // ── Update cards ──────────────────────────────────────────────────────
    outAdjMargin.textContent = `${fmt(adjMargin, 1)}%`;
    outOpIncome.textContent  = `$${fmt(opIncomeB, 2)}B`;
    outFairValue.textContent = fairValue > 0 ? `$${fmt(fairValue, 2)}` : 'N/A';
    outUpside.textContent    = `${upside >= 0 ? '+' : ''}${fmt(upside, 1)}%`;

    // Apply color theme to all four cards based on upside
    [cardAdjMargin, cardOpIncome, cardFairValue, cardUpside].forEach(card => {
      setCardTheme(card, null, upside);
    });
  }

  // ── Event listeners ───────────────────────────────────────────────────────
  sliderOil.addEventListener('input', calculate);
  sliderRev.addEventListener('input', calculate);
  sliderMargin.addEventListener('input', calculate);

  // Run on load
  calculate();

})();
