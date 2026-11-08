/* CMDB Health and Maturity Assessment. Copyright 2026 Enamul Haque. MIT. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.CMDBHealthEngine = factory();
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const round = n => Math.round(n*10)/10;
  const isValidNumber = n => n!==null && n!==undefined && n!=='' && Number.isInteger(Number(n));
  function criterionScore(c,a){
    if (!a || a.mode==='unknown'||a.mode==='na') return null;
    if (a.mode==='self'||(a.mode==='measured'&&c.metricType==='maturity')) {
      if(!isValidNumber(a.maturity))return null;
      const m=Number(a.maturity);return m>=0&&m<=4 ? m*25:null;
    }
    if(a.mode!=='measured')return null;
    if(c.metricType==='binary')return a.binary==='pass'?100:a.binary==='fail'?0:null;
    if(!isValidNumber(a.numerator)||!isValidNumber(a.denominator))return null;
    const n=Number(a.numerator),d=Number(a.denominator);
    if(n<0||d<=0||n>d)return null;
    return c.metricType==='lower'?100*(1-n/d):100*n/d;
  }
  function calculate(cfg,answers){
    const rows=cfg.criteria.map(c=>{
      const a=answers[c.id]||{}, isNA=a.mode==='na'&&!!String(a.naReason||'').trim();
      const score=isNA?null:criterionScore(c,a),assessed=score!==null;
      return {...c,score,isNA,assessed,mode:a.mode||'unanswered', reviewed:assessed&&a.mode==='measured'&&a.assurance==='verified',isMeasured:assessed&&a.mode==='measured'};
    });
    const domains=cfg.domains.map(d=>{
      const members=rows.filter(r=>r.domain===d.id),applicable=members.filter(r=>!r.isNA);
      const assessed=applicable.filter(r=>r.assessed),denom=assessed.reduce((s,r)=>s+r.weightWithinDomain,0);
      const score=denom?assessed.reduce((s,r)=>s+r.score*r.weightWithinDomain,0)/denom:null;
      return {...d,score,applicable:applicable.length,assessed:assessed.length,coverage:applicable.length?assessed.length/applicable.length*100:0,reviewed:assessed.filter(r=>r.reviewed).length,measured:assessed.filter(r=>r.isMeasured).length};
    });
    const scoredDomains=domains.filter(d=>d.score!==null);
    const weight=scoredDomains.reduce((s,d)=>s+d.weight,0);
    const overall=weight?scoredDomains.reduce((s,d)=>s+d.score*d.weight,0)/weight:null;
    const applicable=rows.filter(r=>!r.isNA),assessed=applicable.filter(r=>r.assessed);
    const coverage=applicable.length?assessed.length/applicable.length*100:0;
    const reviewCoverage=applicable.length?assessed.filter(r=>r.reviewed).length/applicable.length*100:0;
    const measuredCoverage=applicable.length?assessed.filter(r=>r.isMeasured).length/applicable.length*100:0;
    // Bands are explanatory only. An assessment with fewer than 80% scored checks has no published maturity band.
    const labels=['Initial','Developing','Establishing','Managed','Optimised'];
    const maturityBand=overall===null||coverage<80||scoredDomains.length<4 ? null:labels[Math.min(4,Math.floor(overall/20))];
    const gaps=rows.filter(r=>r.assessed&&r.score<100).sort((a,b)=>a.score-b.score||a.id.localeCompare(b.id));
    return {rows,domains,overall,coverage,reviewCoverage,measuredCoverage,maturityBand,gaps,
      assessed:assessed.length,applicable:applicable.length,excluded:rows.filter(r=>r.isNA).length,
      missing:applicable.length-assessed.length,reviewed:assessed.filter(r=>r.reviewed).length};
  }
  return {round,criterionScore,calculate};
});
