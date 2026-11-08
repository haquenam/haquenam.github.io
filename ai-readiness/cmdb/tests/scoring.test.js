// Node.js synthetic regression tests for alpha v0.2.0.
const assert=require('node:assert/strict');
const E=require('../src/engine.js');
const cfg=require('../assessment-packs/cmdb.json');
const c=id=>cfg.criteria.find(x=>x.id===id);
assert.equal(cfg.criteria.length,30);
assert.equal(cfg.domains.length,6);
assert.equal(cfg.criteria.filter(x=>x.critical).length,8);
assert.equal(E.criterionScore(c('C01'),{mode:'measured',numerator:9,denominator:10}),90);
assert.equal(E.criterionScore(c('C03'),{mode:'measured',numerator:1,denominator:10}),90);
assert.equal(E.criterionScore(c('C03'),{mode:'measured',numerator:10,denominator:10}),0);
assert.equal(E.criterionScore(c('C23'),{mode:'measured',maturity:3}),75);
assert.equal(E.criterionScore(c('C26'),{mode:'measured',binary:'pass'}),100);
assert.equal(E.criterionScore(c('C01'),{mode:'measured',numerator:11,denominator:10}),null);
assert.equal(E.calculate(cfg,{}).status,'Not verifiable');
const full={};
for(const x of cfg.criteria) {
  if(x.metricType==='binary') full[x.id]={mode:'measured',binary:'pass',assurance:'verified',gate:'pass'};
  else if(x.metricType==='maturity') full[x.id]={mode:'measured',maturity:4,assurance:'verified',gate:'pass'};
  else full[x.id]={mode:'measured',numerator:x.metricType==='lower'?0:100,denominator:100,assurance:'verified',gate:'pass'};
}
let r=E.calculate(cfg,full);
assert.equal(r.overall,100);
assert.equal(r.status,'Evidence-supported pilot candidate');
full.C13.gate='fail';r=E.calculate(cfg,full);
assert.equal(r.overall,100);assert.equal(r.status,'Blocked by critical control');
full.C13.gate='pass';delete full.C30;
assert.equal(E.calculate(cfg,full).status,'Not verifiable');
full.C30={mode:'self',maturity:4,gate:'pass'};
assert.equal(E.calculate(cfg,full).status,'Indicative pilot candidate');
full.C30={mode:'measured',numerator:100,denominator:100,assurance:'verified',gate:'pass'};
full.C03={mode:'na',naReason:'An independently justified exclusion'};
assert.equal(E.calculate(cfg,full).status,'Evidence-supported pilot candidate');
full.C10={mode:'na',naReason:'Critical cannot be excluded'};
assert.equal(E.calculate(cfg,full).status,'Not verifiable');
console.log('All alpha CMDB tests passed.');
