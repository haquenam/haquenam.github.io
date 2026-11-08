/* Independent CMDB readiness prototype. Licence to be selected before publication. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.CMDBEngine = factory();
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const clamp = n => Math.max(0,Math.min(100,n));
  const round = n => Math.round(n * 10) / 10;
  function criterionScore(c, a) {
    if (!a || a.mode === 'unknown' || a.mode === 'na') return null;
    if (a.mode === 'self') {
      if (a.maturity === '' || a.maturity == null) return null;
      const x = Number(a.maturity);
      return Number.isInteger(x) && x >= 0 && x <= 4 ? x*25 : null;
    }
    if (a.mode !== 'measured') return null;
    if (c.metricType === 'maturity') {
      if (a.maturity === '' || a.maturity == null) return null;
      const x = Number(a.maturity);
      return Number.isInteger(x) && x>=0 && x<=4 ? x*25 : null;
    }
    if (c.metricType === 'binary') {
      return a.binary === 'pass' ? 100 : a.binary === 'fail' ? 0 : null;
    }
    if (a.numerator === '' || a.denominator === '' || a.numerator == null || a.denominator == null) return null;
    const n = Number(a.numerator), d = Number(a.denominator);
    if (!Number.isFinite(n)||!Number.isFinite(d)|| !Number.isInteger(n)||!Number.isInteger(d)||n<0||d<=0||n>d) return null;
    const pct = n/d*100;
    return clamp(c.metricType === 'lower' ? 100-pct : pct);
  }
  function calculate(cfg, answers) {
    const rows = cfg.criteria.map(c => {
      const a = answers[c.id] || {mode:'unknown'};
      const isNA = a.mode === 'na' && !!String(a.naReason||'').trim() && !c.critical;
      const score = isNA ? null : criterionScore(c,a);
      const assessed = score!==null;
      const gate = c.critical ? (!assessed ? 'unknown' : c.metricType==='binary' && a.mode==='measured' && a.binary==='fail' ? 'fail' : (a.gate==='pass'||a.gate==='fail'?a.gate:'unknown')) : null;
      const assured = assessed && a.mode === 'measured' && a.assurance === 'verified';
      return {...c,score,assessed,assured,isNA,gate,mode:a.mode||'unknown'};
    });
    const summaries = cfg.domains.map(d => {
      const members=rows.filter(r=>r.domain===d.id && !r.isNA);
      const possible=members.reduce((s,r)=>s+r.weightWithinDomain,0);
      const measured=members.filter(r=>r.assessed);
      const used=measured.reduce((s,r)=>s+r.weightWithinDomain,0);
      const assured=measured.filter(r=>r.assured).reduce((s,r)=>s+r.weightWithinDomain,0);
      return {...d,score:used ? measured.reduce((s,r)=>s+r.score*r.weightWithinDomain,0)/used : null,
        coverage:possible?used/possible*100:0, assurance:possible?assured/possible*100:0,
        completed:measured.length, eligible:members.length};
    });
    const totalWeight=summaries.reduce((s,d)=>s+d.weight,0);
    const covered=summaries.reduce((s,d)=>s+d.weight*d.coverage/100,0);
    const verified=summaries.reduce((s,d)=>s+d.weight*d.assurance/100,0);
    const scoreDenom=summaries.filter(d=>d.score!==null).reduce((s,d)=>s+d.weight,0);
    const overall=scoreDenom?summaries.filter(d=>d.score!==null).reduce((s,d)=>s+d.score*d.weight,0)/scoreDenom:null;
    const blocked=rows.filter(r=>r.critical&&r.gate==='fail');
    const unresolved=rows.filter(r=>r.critical&&r.gate==='unknown');
    const unverifiedCritical=rows.filter(r=>r.critical&&r.gate==='pass'&&!r.assured);
    const coverage=totalWeight?covered/totalWeight*100:0;
    const assurance=totalWeight?verified/totalWeight*100:0;
    let status='Not verifiable';
    if (blocked.length) status='Blocked by critical control';
    else if (!unresolved.length && coverage>=cfg.pilotMinimumCoverage && overall!==null) {
      if (overall<cfg.pilotMinimumScore) status='Remediation required';
      else if (assurance<cfg.pilotMinimumCoverage || unverifiedCritical.length) status='Indicative pilot candidate';
      else status='Evidence-supported pilot candidate';
    }
    const gaps=rows.filter(r=>r.assessed&&r.score<100).sort((a,b)=>{
      if (a.gate==='fail'&&b.gate!=='fail')return -1;
      if (b.gate==='fail'&&a.gate!=='fail')return 1;
      const wa=cfg.domains.find(d=>d.id===a.domain).weight;
      const wb=cfg.domains.find(d=>d.id===b.domain).weight;
      return (100-b.score)*wb-(100-a.score)*wa;
    });
    return {rows,domains:summaries,overall,coverage,assurance,status,blocked,unresolved,unverifiedCritical,gaps,
      assessed:rows.filter(r=>r.assessed).length,applicable:rows.filter(r=>!r.isNA).length};
  }
  return {criterionScore,calculate,round};
});
