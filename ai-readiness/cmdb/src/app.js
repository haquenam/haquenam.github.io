(() => {
'use strict';
const cfg=window.ASSESSMENT_CONFIG, E=window.CMDBEngine, app=document.getElementById('app');
if(!cfg||!E){app.textContent='The assessment configuration could not be loaded.';return;}
const state={view:'home',domainIndex:0,validationStage:null,answers:{},meta:{organisation:'',release:'',scope:'',period:'',assessor:'',usecase:'AI-assisted change and service impact analysis'},demo:false};
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const pct=n=>n===null||n===undefined?'Not scored':E.round(n)+'%';
const option=(value,label,current)=>`<option value="${esc(value)}" ${value===current?'selected':''}>${esc(label)}</option>`;
const attr=(a,k)=>esc(a?.[k]??'');
const btn=(text,act,cl='btn ghost')=>`<button type="button" class="${cl}" data-action="${act}">${esc(text)}</button>`;
const result=()=>E.calculate(cfg,state.answers);
const inDomain=i=>cfg.criteria.filter(c=>c.domain===cfg.domains[i].id);
function completeAnswer(c,a){
  if(!a || !Object.prototype.hasOwnProperty.call(a,'mode'))return false;
  if(a.mode==='unknown')return true; // an explicitly selected 'not assessed' is a response, not positive evidence
  if(a.mode==='na')return !c.critical && !!String(a.naReason||'').trim();
  if(a.mode!=='self' && a.mode!=='measured')return false;
  if(E.criterionScore(c,a)===null)return false;
  if(a.mode==='measured' && !['verified','unverified','self'].includes(a.assurance))return false;
  if(c.critical && !['unknown','pass','fail'].includes(a.gate))return false;
  return true;
}
const completedIn=i=>inDomain(i).filter(c=>completeAnswer(c,state.answers[c.id])).length;
const stageComplete=i=>completedIn(i)===inDomain(i).length;
const totalCompleted=()=>cfg.criteria.filter(c=>completeAnswer(c,state.answers[c.id])).length;
const canVisit=i=>i>=0 && i<cfg.domains.length && Array.from({length:i},(_,j)=>j).every(stageComplete);
const allComplete=()=>cfg.domains.every((_,i)=>stageComplete(i));
function help(text,label='Help'){
  return `<span class="help-wrap"><button type="button" class="help-button" data-help-toggle aria-label="${esc(label)}" aria-expanded="false">?</button><span class="help-tooltip" role="tooltip">${esc(text)}</span></span>`;
}
function field(id,key,label,explain,input){
  return `<div class="field"><div class="field-head"><label for="${key}_${id}">${esc(label)}</label>${help(explain,label+' explanation')}</div>${input}</div>`;
}
const ctrl=(id,key,kind,attrs,content='')=>kind==='input'?`<input id="${key}_${id}" data-id="${id}" data-field="${key}" ${attrs}>`:`<${kind} id="${key}_${id}" data-id="${id}" data-field="${key}" ${attrs}>${content}</${kind}>`;
function stageSidebar(){return `<aside class="stage-nav card no-print" aria-label="Assessment stages"><div class="aside-title">Your assessment journey</div><p class="small muted">Six stages · 30 required responses</p><nav class="stages">${cfg.domains.map((d,i)=>{
  const n=inDomain(i).length,done=completedIn(i),open=canVisit(i),isCurrent=i===state.domainIndex;
  return `<button type="button" class="stage ${isCurrent?'current':''} ${done===n?'complete':''}" data-action="stage" data-stage="${i}" ${open?'':'disabled'} ${isCurrent?'aria-current="step"':''} title="${open?'Open this stage':'Complete earlier stages to unlock'}"><span class="step-circle">${done===n?'✓':i+1}</span><span class="stage-content"><strong>${esc(d.name)}</strong><small>${done}/${n} responses ${done===n?'completed':open?'entered':'· locked'}</small></span><span class="step-lock" aria-hidden="true">${open?'':'🔒'}</span></button>`;
 }).join('')}</nav><p class="tiny muted stage-instruction">Stages unlock in sequence. You can revisit earlier stages at any time. Save your progress as JSON before closing the page.</p></aside>`;}
function refreshCompletionUI(){
 if(state.view!=='questions')return;
 const count=totalCompleted(),all=cfg.criteria.length,here=completedIn(state.domainIndex);
 const countEl=document.querySelector('.completion-indicator strong');if(countEl)countEl.textContent=count+' / '+all;
 const bar=document.querySelector('.assessment-page>.progress>span');if(bar)bar.style.width=(count/all*100)+'%';
 const root=document.querySelector('.assessment-page>.progress');if(root)root.setAttribute('aria-valuenow',String(count));
 const parts=document.querySelectorAll('.stage-bar span');
 if(parts[0])parts[0].innerHTML='<strong>Step '+(state.domainIndex+1)+' of 6</strong> · '+here+'/'+inDomain(state.domainIndex).length+' responses completed';
 if(parts[1])parts[1].textContent=stageComplete(state.domainIndex)?'Stage complete ✓':'Complete every response to unlock the next stage';
 document.querySelectorAll('button.stage').forEach((b,i)=>{
  const open=canVisit(i),num=inDomain(i).length,done=completedIn(i),complete=done===num;
  b.disabled=!open;b.classList.toggle('complete',complete);b.title=open?'Open this stage':'Complete earlier stages to unlock';
  b.querySelector('.step-circle').textContent=complete?'✓':String(i+1);
  b.querySelector('.stage-content small').textContent=done+'/'+num+' responses '+(complete?'completed':open?'entered':'· locked');
  b.querySelector('.step-lock').textContent=open?'':'🔒';
 });
 cfg.criteria.filter(c=>c.domain===cfg.domains[state.domainIndex].id).forEach(c=>{
  const card=document.getElementById('question_'+c.id);if(!card)return;
  const done=completeAnswer(c,state.answers[c.id]);const existing=card.querySelector('.question-tags .answered');
  if(done&&!existing){const span=document.createElement('span');span.className='tag answered';span.textContent='Answered ✓';card.querySelector('.question-tags').appendChild(span);}
  if(!done&&existing)existing.remove();
  if(done)card.classList.remove('is-incomplete');
 });
}
function attemptStage(i){
  if(canVisit(i)){state.validationStage=null;go('questions',i);return;}
  const j=Array.from({length:i},(_,k)=>k).find(k=>!stageComplete(k));
  if(j!==undefined){go('questions',j);state.validationStage=j;render();message(`Complete all ${inDomain(j).length} responses in Stage ${j+1} before continuing. Select “Not assessed” if the evidence is unavailable.`,true);focusFirstIncomplete(j);}
}
function focusFirstIncomplete(i){const c=inDomain(i).find(x=>!completeAnswer(x,state.answers[x.id]));if(!c)return;const el=document.getElementById('question_'+c.id);el?.scrollIntoView({block:'center',behavior:'smooth'});}
function advance(){if(!stageComplete(state.domainIndex)){
  state.validationStage=state.domainIndex;render();message(`Stage ${state.domainIndex+1} is incomplete. Please provide a response to every question. “Not assessed” is allowed when evidence is unavailable.`,true);focusFirstIncomplete(state.domainIndex);return;
}
 state.validationStage=null;
 if(state.domainIndex===cfg.domains.length-1){showResults();}else{go('questions',state.domainIndex+1);}
}
function showResults(){if(!allComplete()){const i=cfg.domains.findIndex((_,j)=>!stageComplete(j));go('questions',i);state.validationStage=i;render();message('Complete each stage before viewing your final report. You can explicitly choose “Not assessed” rather than guessing.',true);focusFirstIncomplete(i);return;}go('results');}

function message(text,isError=false){const p=document.createElement('div');p.className='feedback'+(isError?' error':'');p.setAttribute('role','status');p.textContent=text;app.prepend(p);p.scrollIntoView({block:'nearest'});}
function go(view,domainIndex){state.view=view;if(domainIndex!==undefined)state.domainIndex=domainIndex;render();window.scrollTo(0,0);}
function home(){const r=result();return `<section class="intro"><p class="eyebrow">Working prototype · v${esc(cfg.version)}</p><h1>Assess whether your CMDB can support trustworthy AI-assisted impact analysis.</h1><p class="lead">A 30-check, evidence-aware assessment covering data integrity, CSDM, service relationships, governance, security and AI scenario validation.</p>
<div class="actions">${btn('Start assessment','questions','btn')}${btn('Explore methodology','methodology')}${btn('Try synthetic example','demo')}</div>
<div class="notice"><strong>Privacy:</strong> This prototype processes responses locally in your browser. Nothing is uploaded. To preserve your work, use <strong>Save as JSON</strong>. A refresh loses unsaved changes. Do not enter credentials, raw client data or confidential CMDB exports.</div>
<div class="grid3 facts"><div class="card"><div class="fact-number">30</div><div class="fact-label">Source-informed assessment criteria</div></div><div class="card"><div class="fact-number">6</div><div class="fact-label">Weighted assessment domains</div></div><div class="card"><div class="fact-number">8</div><div class="fact-label">Proposed independent critical controls</div></div></div>
<section class="card" style="margin-bottom:20px"><h2>Six clear stages</h2><p class="small muted">You can see the full journey before starting. Once started, later stages unlock only after every question in the current stage has a recorded response.</p><div class="stage-preview">${cfg.domains.map((d,i)=>`<div><span class="qid">${i+1}</span><strong>${esc(d.name)}</strong><small>${inDomain(i).length} questions</small></div>`).join('')}</div></section>
<section class="card"><h2>Assessment scope</h2><p class="muted small">These optional labels are included in your exported report. Keep organisation-identifying details generic if privacy requires it.</p><div class="grid2">${metaField('organisation','Organisation / pseudonym','e.g. Example organisation')}${metaField('release','ServiceNow release / relevant application version','e.g. release and plugin version')}${metaField('scope','Critical services / CI classes in scope','e.g. Payment service; application and server CIs')}${metaField('period','Assessment period','e.g. Q4 2026')}</div>
<div class="actions">${btn('Continue to the questions','questions','btn')}${btn('Load saved assessment','import')}</div><p class="small muted">An informative self-rating is allowed where measurements are unavailable. However, self-ratings cannot establish verified readiness, and passing a critical gate must be recorded separately.</p></section></section>`;}
function metaField(id,label,placeholder){return `<label class="field"><span>${esc(label)}</span><input type="text" data-meta="${id}" value="${attr(state.meta,id)}" placeholder="${esc(placeholder)}" maxlength="200"></label>`;}
function question(c){
 const a=state.answers[c.id]||{},mode=a.mode||'',sources=c.sourceCodes.map(k=>{const s=cfg.sources[k];return s?`<a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(k)}</a>`:esc(k)}).join(' · ');
 const invalid=state.validationStage===state.domainIndex && !completeAnswer(c,a);
 let controls='';
 if(mode==='measured'){
  if(c.metricType==='maturity'){
    controls=field(c.id,'maturity','Evidence-backed maturity (0–4)','0 = absent; 1 = informal; 2 = documented; 3 = implemented with supporting evidence; 4 = routinely measured and improved.',ctrl(c.id,'maturity','select','',option('','Select evidence-backed level',String(a.maturity??''))+['0 — Absent','1 — Informal','2 — Documented','3 — Implemented with evidence','4 — Measured and improved'].map((x,i)=>option(String(i),x,String(a.maturity??''))).join('')));
  }else if(c.metricType==='binary'){
    controls=field(c.id,'binary','Observed control outcome','Pass only if the control was tested successfully. Otherwise select Fail; if it has not been tested, choose Not assessed as the answer method.',ctrl(c.id,'binary','select','',option('','Select test outcome',a.binary)+option('pass','Passed',a.binary)+option('fail','Failed',a.binary)));
  }else{
    controls=`<div class="inline-fields">${field(c.id,'numerator',c.metricType==='lower'?'Number of adverse findings':'Number passing / verified',c.metricType==='lower'?'Count the duplicate, stale, incorrect or otherwise adverse records in the scoped sample. Lower is better.':'Count only items passing the stated quality or validation rule in the sample. Higher is better.',ctrl(c.id,'numerator','input',`type="number" min="0" step="1" inputmode="numeric" value="${attr(a,'numerator')}" placeholder="e.g. 18"`))}${field(c.id,'denominator','Total eligible / tested','Total number of applicable records, relationships or test cases in the sample. It must be greater than zero and not smaller than the numerator.',ctrl(c.id,'denominator','input',`type="number" min="1" step="1" inputmode="numeric" value="${attr(a,'denominator')}" placeholder="e.g. 20"`))}</div><p class="helper">${c.metricType==='lower'?'Lower adverse percentage produces a higher score.':'Higher passing percentage produces a higher score.'} Example: 18 passing out of 20 = 90/100. These are prototype scoring rules, not official ServiceNow readiness thresholds.</p>`;
  }
  controls+=field(c.id,'assurance','Evidence review status','Reviewed means you personally checked the underlying evidence; it does not imply independent audit or ServiceNow certification.',ctrl(c.id,'assurance','select','',option('','Select evidence status',a.assurance)+option('verified','I reviewed the source evidence',a.assurance)+option('unverified','Measured but not reviewed',a.assurance)+option('self','Estimated / source not reviewed',a.assurance)));
 }else if(mode==='self'){
  controls=field(c.id,'maturity','Indicative self-rating (0–4)','Use your best professional judgement. This produces an indicative score, not independently verified readiness.',ctrl(c.id,'maturity','select','',option('','Choose indicative level',String(a.maturity??''))+['0 — No capability demonstrated','1 — Initial / ad hoc','2 — Documented','3 — Implemented','4 — Consistently measured and improved'].map((x,i)=>option(String(i),x,String(a.maturity??''))).join('')))+'<p class="helper">Self-ratings do not prove that the underlying data or AI output has been tested.</p>';
 }else if(mode==='na'){
  controls=field(c.id,'naReason','Why is this check not applicable?','Required when selecting Not applicable. Explain the scope boundary, not simply that the evidence is unavailable.',ctrl(c.id,'naReason','textarea','maxlength="1000" placeholder="Explain why this does not apply to the assessed scope"',attr(a,'naReason')));
 }else if(mode==='unknown')controls='<p class="helper">You have explicitly recorded that this criterion is not assessed. It will reduce evidence coverage; if it is a critical check, readiness cannot be fully confirmed.</p>';
 else controls='<p class="helper">Choose how you want to answer this question. You may select Not assessed if you do not have evidence, rather than guessing.</p>';
 const tip=`Purpose: ${c.measure} Expected supporting evidence: ${c.evidence} ${c.critical?'This question has a critical readiness gate.':'A response is required; Not applicable may be selected with a reason.'}`;
 const gateControls=c.critical && mode && mode!=='unknown' ? `<div class="gate"><div class="field-head"><h4>Critical readiness control</h4>${help('This is a separate safety or reliability check. A failed critical control blocks a positive readiness outcome even if the total score is high. An unknown gate remains unresolved.','Critical gate explanation')}</div><p class="tiny">${esc(c.criticalContext)}</p>${field(c.id,'gate','Gate outcome','Pass = the critical requirement was tested; Fail = a significant deficiency was found; Unknown = it has not been sufficiently evaluated. A self-rating cannot establish verified readiness.',ctrl(c.id,'gate','select','',option('','Select a gate outcome',a.gate)+option('pass','Passed — critical cases verified',a.gate)+option('fail','Failed — critical deficiency found',a.gate)+option('unknown','Not verified / unknown',a.gate)))}</div>` : '';
 return `<article class="card question ${invalid?'is-incomplete':''}" id="question_${c.id}"><div class="question-head"><span class="qid">${esc(c.id)}</span><div class="question-title"><div class="question-title-line"><h3>${esc(c.question)}</h3>${help(tip,'Help for question '+c.id)}</div><div class="question-tags"><span class="tag required">Response required</span><span class="tag">${esc(c.metricType==='higher'?'Higher is better':c.metricType==='lower'?'Lower is better':c.metricType==='maturity'?'Maturity rating':'Pass / fail')}</span>${c.critical?'<span class="tag critical">Critical gate</span>':'<span class="tag">N/A allowed with reason</span>'}${completeAnswer(c,a)?'<span class="tag answered">Answered ✓</span>':''}</div></div></div>
 <div class="response">${field(c.id,'mode','How will you answer?','Measured evidence uses a count, outcome or documented rating; self-rating uses your judgement; Not assessed means there is no usable evidence; N/A is allowed only for non-critical checks with justification.',ctrl(c.id,'mode','select','',option('','Select an answer method',mode)+option('measured','Measured evidence',mode)+option('self','Indicative self-rating',mode)+option('unknown','Not assessed — no evidence',mode)+(c.critical?'':option('na','Not applicable — explain why',mode))))}<div class="response-content">${controls}${gateControls}${field(c.id,'note','Evidence reference / additional note (optional)','For example: report name, date, sample definition or anonymised issue reference. Do not enter confidential production data.',ctrl(c.id,'note','textarea','maxlength="3000" placeholder="Optional: source reference or assessment note"',attr(a,'note')))}</div></div>
 <details class="detail"><summary>See official source references, measurement definition and remediation</summary><p><strong>Measurement:</strong> ${esc(c.measure)}</p><p><strong>Expected evidence:</strong> ${esc(c.evidence)}</p><p><strong>Source basis:</strong> ${sources}</p><p><strong>Suggested remediation:</strong> ${esc(c.remediation)}</p></details>${invalid?'<p class="field-error" role="alert">Complete the selected answer method and, where shown, the critical gate before proceeding.</p>':''}</article>`;
}
function questions(){
 const d=cfg.domains[state.domainIndex],members=inDomain(state.domainIndex),r=result(),done=totalCompleted(),here=completedIn(state.domainIndex),all=cfg.criteria.length;
 return `<section class="assessment-page"><div class="assessment-header"><div><p class="eyebrow">Guided assessment · Step ${state.domainIndex+1} of ${cfg.domains.length}</p><h1>${esc(d.name)}</h1><p class="muted small">${members.length} required responses in this stage · provisional weight ${d.weight}%</p></div><div class="completion-indicator"><strong>${done} / ${all}</strong><span>Responses completed</span></div></div>
 <div class="progress" role="progressbar" aria-valuenow="${done}" aria-valuemin="0" aria-valuemax="${all}" aria-label="Questionnaire completion"><span style="width:${Math.round(done/all*100)}%"></span></div>
 <div class="assessment-grid">${stageSidebar()}<div class="assessment-main"><section class="score-explainer" aria-label="Scoring guide"><div class="scoring-title"><h2>How your answers are scored</h2>${help('Each applicable criterion is scored from 0–100. Higher-is-better ratios use 100 × passing / tested. Lower-is-better metrics use 100 × (1 − adverse / tested). Maturity ratings use 0–4 × 25. Domain scores are combined using provisional domain weights. The prototype’s 75/100 decision boundary is not a universal ServiceNow standard.','Scoring methodology details')}</div><div class="score-facts"><div><strong>0–100</strong><span>Each scored criterion</span></div><div><strong>${d.weight}%</strong><span>This stage's pilot weight</span></div><div><strong>Critical gates</strong><span>Can override any score</span></div></div><p class="small">All ${members.length} questions require an explicit response. If you cannot verify a check, choose <strong>Not assessed</strong>. It counts as a completed response, but not as positive evidence. For non-critical checks, <strong>Not applicable</strong> requires a reason. <a href="#" data-action="methodology" class="explain-link">Full methodology</a>.</p></section>
 <div class="stage-bar"><span><strong>Step ${state.domainIndex+1} of 6</strong> · ${here}/${members.length} responses completed</span><span>${here===members.length?'Stage complete ✓':'Complete every response to unlock the next stage'}</span></div>
 ${members.map(question).join('')}
 <div class="actions no-print stage-actions">${state.domainIndex>0?btn('← Previous stage','prev'):btn('← Back to overview','home')}${btn('Save progress (JSON)','save')}${state.domainIndex<cfg.domains.length-1?btn('Complete stage and continue →','next','btn'):btn('Finish and view report →','finish','btn')}</div>
 </div></div></section>`;
}
function scoreBar(name,score,weight,coverage){return `<div class="domainline"><div class="barmeta"><span><strong>${esc(name)}</strong> <span class="muted">(${weight}% weight)</span></span><span>${pct(score)}</span></div><div class="progress"><span style="width:${Math.max(0,Math.min(score||0,100))}%"></span></div><p class="tiny muted">Assessed weight: ${pct(coverage)}</p></div>`;}
function reportRows(rows){return `<div class="scroll-x"><table class="resulttable"><thead><tr><th>Check</th><th>Score</th><th>Evidence</th><th>Gate</th><th>Suggested action</th></tr></thead><tbody>${rows.map(x=>`<tr><td><strong>${x.id}</strong> ${esc(x.question)}</td><td>${x.isNA?'N/A':pct(x.score)}</td><td>${x.assured?'Marked reviewed':x.mode==='self'?'Self-rating':x.isNA?'Excluded':x.assessed?'Unverified measured':'Missing'}</td><td>${x.critical?esc(x.gate):'—'}</td><td>${esc(x.remediation)}</td></tr>`).join('')}</tbody></table></div>`;}
function results(){const r=result(),m=state.meta;const ranking=[...r.blocked,...r.gaps.filter(x=>!r.blocked.some(y=>y.id===x.id))].slice(0,8);return `<section class="report"><p class="eyebrow">Assessment report · Prototype ${esc(cfg.version)}</p><div class="section-head"><div><h1 class="report-title">CMDB AI Readiness</h1><p class="muted">AI-assisted change and service impact analysis · ${esc(m.organisation||'Unnamed assessment')}</p></div><div><span class="pill ${r.blocked.length?'danger':r.status.includes('Evidence-supported')?'good':''}">${esc(r.status)}</span></div></div>
<div class="notice"><strong>Interpretation:</strong> Scores are provisional and based on the entered responses. A score of 75 and evidence coverage of 80% are project pilot settings, NOT official ServiceNow readiness thresholds. No result constitutes production approval or ServiceNow certification.</div>
<div class="metrics"><div class="card"><div class="eyebrow">Overall score</div><div class="metric">${r.overall===null?'—':E.round(r.overall)}<span class="small muted"> / 100</span></div></div><div class="card"><div class="eyebrow">Evidence coverage</div><div class="metric sm">${pct(r.coverage)}</div></div><div class="card"><div class="eyebrow">Evidence marked reviewed</div><div class="metric sm">${pct(r.assurance)}</div></div><div class="card"><div class="eyebrow">Critical controls</div><div class="metric sm">${r.blocked.length} <span class="small">failed</span></div><div class="tiny muted">${r.unresolved.length} unresolved</div></div></div>
<div class="grid2"><div class="card"><h2>Performance by domain</h2>${r.domains.map(d=>scoreBar(d.name,d.score,d.weight,d.coverage)).join('')}</div><div class="card"><h2>Decision explanation</h2><p><strong>${esc(r.status)}</strong></p><p class="small">${r.blocked.length?`${r.blocked.length} required use-case control(s) failed. Score cannot override them.`:r.unresolved.length?`${r.unresolved.length} critical use-case control(s) have not been demonstrated.`:r.coverage<cfg.pilotMinimumCoverage?'Too much of the applicable assessment is unassessed.':r.overall<cfg.pilotMinimumScore?'The provisional aggregate is below the pilot threshold.':r.unverifiedCritical.length?'At least one critical pass relies on unverified or self-declared evidence.':'The pilot screening conditions are met; this is not a production go-live decision.'}</p><p class="small muted">Scope: ${esc(m.scope||'Not recorded')}<br>Release: ${esc(m.release||'Not recorded')}<br>Period: ${esc(m.period||'Not recorded')}<br>Method: ${esc(cfg.scoringVersion)}</p>${state.demo?'<p class="pill danger">Synthetic demonstration answers</p>':''}</div></div>
<section class="card" style="margin-top:16px"><h2>Priority remediation</h2>${ranking.length?`<ol class="note-list">${ranking.map(x=>`<li><strong>${esc(x.id)}</strong> ${esc(x.remediation)} <span class="muted small">(${pct(x.score)}${x.gate==='fail'?', failed critical gate':''})</span></li>`).join('')}</ol>`:'<p class="muted">No measured gaps available. Complete the assessment to generate recommendations.</p>'}<p class="tiny muted">Prioritisation is a preliminary weighted-gap sort with failed gates first. It has not been calibrated to remediation effort or business cost.</p></section>
<section class="card report-break" style="margin-top:16px"><h2>Criterion-level findings</h2>${reportRows(r.rows)}</section>
<div class="actions no-print">${btn('Print / Save as PDF','print','btn')}${btn('Save full assessment JSON','save')}${btn('Return to questions','questions')}${btn('Import saved assessment','import')}${btn('Clear assessment','reset','btn warn')}</div>
<p class="small muted">Independent educational research prototype. The criteria are source-informed but our wording, weightings, gates and thresholds are project-defined. Review official documentation for your actual ServiceNow release.</p></section>`;}
function methodology(){return `<section><p class="eyebrow">Transparent, source-informed methodology</p><h1>How the assessment works</h1><p class="lead muted">The prototype reuses the 30 checks in the CMDB Criteria Register v0.1. All formulae and critical gates are independent project designs and require calibration before publication as a formal framework.</p>
<div class="grid2"><div class="card"><h2>Question-level scoring</h2><p><strong>Higher-is-better:</strong> 100 × passing / eligible.</p><p><strong>Lower-is-better:</strong> 100 × (1 − adverse / eligible).</p><p><strong>Binary:</strong> verified pass 100; fail 0.</p><p><strong>Maturity:</strong> 0–4 anchored rating × 25.</p><p><strong>Indicative self-rating:</strong> 0–4 × 25, labelled unverified.</p><p class="small muted">No vendor universal targets are claimed; raw ratios are reported, and the pilot decision boundary is project-defined.</p></div><div class="card"><h2>Aggregation and gate logic</h2><p>Each domain averages its applicable answered criteria (equal criterion weights within that domain). The overall score aggregates answered domains using pilot domain weights.</p><p>Unanswered criteria reduce evidence coverage rather than silently scoring zero. A justified non-critical N/A is excluded. Missing or failed critical controls override the composite score.</p><p>A positive preliminary screen is called a <em>pilot candidate</em>, never deployment certification.</p></div></div>
<div class="card" style="margin:16px 0"><h2>Published pilot weights</h2>${cfg.domains.map(d=>`<div class="barmeta"><span>${esc(d.name)}</span><strong>${d.weight}%</strong></div>`).join('')}<p class="small muted">Weights and the illustrative score boundary (${cfg.pilotMinimumScore}/100) require synthetic and expert review. Current results are appropriate for prototype testing, not commercial assurance.</p></div>
<div class="card"><h2>Source register</h2><p class="small muted">These are the source bases for the criteria; they do not imply the publisher has endorsed the exact question, gate or weighting.</p>${Object.entries(cfg.sources).map(([code,s])=>`<div class="source-item"><strong>${esc(code)}:</strong> ${esc(s.name)}<br><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.url)}</a></div>`).join('')}</div>
<div class="actions no-print">${btn('Start the assessment','questions','btn')}${btn('Back to overview','home')}</div></section>`;}
function render(){app.innerHTML=state.view==='home'?home():state.view==='questions'?questions():state.view==='results'?results():methodology();document.querySelectorAll('.topnav button').forEach(b=>{b.classList.toggle('active',b.dataset.action===(state.view==='home'?'home':state.view==='questions'?'questions':state.view==='methodology'?'methodology':'none'))});}
function save(){const output={format:'eh-cmdb-assessment',schemaVersion:1,assessmentVersion:cfg.version,scoringVersion:cfg.scoringVersion,savedAt:new Date().toISOString(),meta:state.meta,answers:state.answers,syntheticExample:state.demo};const blob=new Blob([JSON.stringify(output,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=`CMDB_AI_Readiness_${new Date().toISOString().slice(0,10)}.json`;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),3000);message('Assessment saved as a JSON file on your device. No data has been uploaded.');}
function demo(){state.demo=true;state.meta.organisation='SYNTHETIC EXAMPLE — no real organisation';state.meta.release='Synthetic demonstration';state.meta.scope='Illustrative critical business service';state.meta.period='Demonstration';for(const c of cfg.criteria){if(c.metricType==='maturity')state.answers[c.id]={mode:'measured',maturity:3,assurance:'verified',gate:'pass'};else if(c.metricType==='binary')state.answers[c.id]={mode:'measured',binary:'pass',assurance:'verified',gate:'pass'};else state.answers[c.id]={mode:'measured',numerator:c.metricType==='lower'?5:85,denominator:100,assurance:'verified',gate:'pass'};}
state.answers.C13.gate='fail';state.answers.C12.numerator=55;state.answers.C18.numerator=70;state.answers.C29.numerator=60;go('results');}
function loadFile(file){if(!file)return;if(file.size>2_000_000){message('File is too large. Only assessment snapshots below 2 MB are supported.',true);return;}file.text().then(raw=>{let x;try{x=JSON.parse(raw)}catch{throw Error('The selected file is not valid JSON.')}if(x.format!=='eh-cmdb-assessment'||x.schemaVersion!==1||![cfg.version,'0.2.0-prototype','0.1.0-prototype'].includes(x.assessmentVersion)||typeof x.answers!=='object'||!x.answers)throw Error('The snapshot is from another assessment or version.');const ids=new Set(cfg.criteria.map(c=>c.id));const next={};for(const [id,a] of Object.entries(x.answers)){if(!ids.has(id)||!a||typeof a!=='object')continue;const v={};for(const k of ['mode','maturity','numerator','denominator','binary','assurance','gate','naReason','note']){if(a[k]!==undefined){if(['note','naReason'].includes(k))v[k]=String(a[k]).slice(0,3000);else if(['numerator','denominator','maturity'].includes(k))v[k]=String(a[k]).slice(0,40);else v[k]=String(a[k]).slice(0,50);}}if(['unknown','measured','self','na'].includes(v.mode))next[id]=v;}
state.answers=next;for(const key of Object.keys(state.meta)){state.meta[key]=String(x.meta?.[key]??'').slice(0,200);}state.demo=!!x.syntheticExample;if(allComplete()){go('results');}else{const i=cfg.domains.findIndex((_,j)=>!stageComplete(j));go('questions',i);}message('Assessment loaded. Continue from the first incomplete stage; previous format snapshots are supported.');}).catch(e=>message(e.message||'Could not load the file.',true));}
document.addEventListener('click',ev=>{
 const tip=ev.target.closest('[data-help-toggle]');
 if(tip){ev.preventDefault();const wrap=tip.closest('.help-wrap'),open=wrap.classList.toggle('open');tip.setAttribute('aria-expanded',String(open));return;}
 const el=ev.target.closest('[data-action]');if(!el)return;
 if(el.tagName==='A')ev.preventDefault();
 const action=el.dataset.action;
 switch(action){
 case 'home':go('home');break;
 case 'questions':go('questions');break;
 case 'results':showResults();break;
 case 'methodology':go('methodology');break;
 case 'stage':attemptStage(Number(el.dataset.stage));break;
 case 'prev':state.validationStage=null;go('questions',Math.max(0,state.domainIndex-1));break;
 case 'next':case 'finish':advance();break;
 case 'save':save();break;
 case 'print':window.print();break;
 case 'import':{let f=document.getElementById('import-file');if(!f){f=document.createElement('input');f.type='file';f.id='import-file';f.accept='.json,application/json';f.hidden=true;f.addEventListener('change',e=>{loadFile(e.target.files[0]);e.target.value='';});document.body.appendChild(f);}f.click();break;}
 case 'demo':demo();break;
 case 'reset':if(confirm('Clear all answers from this browser page? Download JSON first if you need to preserve them.')){state.answers={};state.demo=false;state.domainIndex=0;state.validationStage=null;go('home');}break;
 }
});
document.addEventListener('input',ev=>{
 const el=ev.target;
 if(el.dataset.meta){state.meta[el.dataset.meta]=el.value;return;}
 if(el.dataset.id&&el.dataset.field){const a=state.answers[el.dataset.id]||(state.answers[el.dataset.id]={});a[el.dataset.field]=el.value;refreshCompletionUI();}
});
document.addEventListener('change',ev=>{
 const el=ev.target;
 if(el.dataset.id&&el.dataset.field){
   const a=state.answers[el.dataset.id]||(state.answers[el.dataset.id]={});a[el.dataset.field]=el.value;
   if(el.dataset.field==='mode'){const old=window.scrollY;render();window.scrollTo(0,old);}
   else {refreshCompletionUI();}
 }
});
render();
})();
