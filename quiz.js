// =====================================================================
//  SF ADMIN TERMINAL QUIZ — Core Logic
//  ✏️  Replace SCRIPT_URL with your Google Apps Script Web App URL
// =====================================================================

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwlx1-TMkL6Ntfl2ZDK9CwiHfcutEP3nByJ3KxEh9NbI1Sg_aGET2NE_tiKGq-DhDth/exec";

// ── Session Storage Keys ───────────────────────────────────────────
const SK = {
  state:     "sfquiz_state",     // current screen
  answers:   "sfquiz_answers",
  candidate: "sfquiz_candidate",
  timer:     "sfquiz_timer",
  questions: "sfquiz_questions", // serialised question set for this session
  idx:       "sfquiz_idx",
};

// ── State ──────────────────────────────────────────────────────────
let currentIdx    = 0;
let answers       = {};
let timerSecs     = 45 * 60;
let timerHandle   = null;
let candidateInfo = {};
// QUESTIONS is declared in questions.js as let QUESTIONS = [];

// ── Session Persistence ────────────────────────────────────────────
function saveSession() {
  try {
    sessionStorage.setItem(SK.answers,   JSON.stringify(answers));
    sessionStorage.setItem(SK.candidate, JSON.stringify(candidateInfo));
    sessionStorage.setItem(SK.timer,     String(timerSecs));
    sessionStorage.setItem(SK.idx,       String(currentIdx));
    sessionStorage.setItem(SK.questions, JSON.stringify(QUESTIONS));
  } catch(e) { /* storage unavailable — silently ignore */ }
}

function loadSession() {
  try {
    const state = sessionStorage.getItem(SK.state);
    if (!state || state === "landing") return false;

    const savedQ   = sessionStorage.getItem(SK.questions);
    const savedA   = sessionStorage.getItem(SK.answers);
    const savedC   = sessionStorage.getItem(SK.candidate);
    const savedT   = sessionStorage.getItem(SK.timer);
    const savedIdx = sessionStorage.getItem(SK.idx);

    if (!savedQ || !savedC) return false;

    QUESTIONS     = JSON.parse(savedQ);
    answers       = savedA   ? JSON.parse(savedA)   : {};
    candidateInfo = savedC   ? JSON.parse(savedC)   : {};
    timerSecs     = savedT   ? parseInt(savedT, 10) : 45 * 60;
    currentIdx    = savedIdx ? parseInt(savedIdx, 10) : 0;

    return state; // "quiz" or "result"
  } catch(e) { return false; }
}

function setSessionState(state) {
  try { sessionStorage.setItem(SK.state, state); } catch(e) {}
}

function clearSession() {
  try { Object.values(SK).forEach(k => sessionStorage.removeItem(k)); } catch(e) {}
}

// ── Init on Page Load ──────────────────────────────────────────────
window.addEventListener("DOMContentLoaded", () => {
  const restored = loadSession();
  if (restored === "quiz") {
    restoreQuizScreen();
  } else if (restored === "result") {
    // Re-derive MCQ score and show result
    const mcqScore = deriveMcqScore();
    showResultScreen(mcqScore, deriveTimeStr());
  } else {
    showScreen("screen-landing");
  }
});

function restoreQuizScreen() {
  document.getElementById("sidebarName").textContent  = candidateInfo.name  || "—";
  document.getElementById("sidebarBatch").textContent = candidateInfo.batch || "—";
  buildQMap();
  showScreen("screen-quiz");
  renderQuestion(currentIdx);
  startTimer();
}

function deriveMcqScore() {
  let score = 0;
  QUESTIONS.forEach((q, i) => {
    if (q.type === "mcq" && answers[i] === q.answer) score++;
  });
  return score;
}

function deriveTimeStr() {
  const taken = 45 * 60 - timerSecs;
  return `${Math.floor(taken / 60)}m ${taken % 60}s`;
}

// ── Start Quiz ─────────────────────────────────────────────────────
function startQuiz() {
  const name  = document.getElementById("inName").value.trim();
  const email = document.getElementById("inEmail").value.trim();
  const batch = document.getElementById("inBatch").value.trim();
  const role  = document.getElementById("inRole").value;

  const err = document.getElementById("errMsg");
  if (!name || !email || !batch || !role) {
    err.textContent = "All fields are required before starting.";
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    err.textContent = "Please enter a valid email address.";
    return;
  }
  err.textContent = "";

  candidateInfo = { name, email, batch, role, startTime: new Date().toISOString() };

  // Build random question set
  QUESTIONS = buildQuestionSet();

  // Populate sidebar
  document.getElementById("sidebarName").textContent  = name;
  document.getElementById("sidebarBatch").textContent = batch;

  // Build question map
  buildQMap();

  setSessionState("quiz");
  saveSession();

  showScreen("screen-quiz");
  renderQuestion(0);
  startTimer();
}

// ── Timer ──────────────────────────────────────────────────────────
function startTimer() {
  updateTimer();
  timerHandle = setInterval(() => {
    timerSecs--;
    updateTimer();
    saveSession(); // persist timer every second
    if (timerSecs <= 0) { clearInterval(timerHandle); doSubmit(); }
    if (timerSecs <= 300) document.getElementById("sidebarTimer").classList.add("urgent");
  }, 1000);
}

function updateTimer() {
  const m = String(Math.floor(timerSecs / 60)).padStart(2, "0");
  const s = String(timerSecs % 60).padStart(2, "0");
  document.getElementById("sidebarTimer").textContent = `${m}:${s}`;
}

// ── Question Map ───────────────────────────────────────────────────
function buildQMap() {
  const map = document.getElementById("qMap");
  map.innerHTML = "";
  QUESTIONS.forEach((q, i) => {
    const d = document.createElement("div");
    d.className = "q-dot";
    d.textContent = String(i + 1).padStart(2, "0");
    d.id = `qdot-${i}`;
    d.onclick = () => goTo(i);
    map.appendChild(d);
  });
}

function updateQMap() {
  QUESTIONS.forEach((q, i) => {
    const d = document.getElementById(`qdot-${i}`);
    if (!d) return;
    d.className = "q-dot" +
      (i === currentIdx ? " current" :
       answers[i] !== undefined && answers[i] !== "" ? " answered" : "");
  });
}

// ── Navigate ───────────────────────────────────────────────────────
function goTo(idx) {
  if (idx < 0 || idx >= QUESTIONS.length) return;
  saveCurrentAnswer();
  currentIdx = idx;
  saveSession();
  renderQuestion(idx);
}

function renderQuestion(idx) {
  const q    = QUESTIONS[idx];
  const card = document.getElementById("qcard");

  card.classList.remove("visible");
  setTimeout(() => {
    // Type badge
    const badge = document.getElementById("qTypeBadge");
    badge.textContent = q.type === "mcq" ? "MCQ" : q.type === "coding" ? "Live Coding" : "Scenario";
    badge.className = "q-type-badge " +
      (q.type === "mcq" ? "badge-mcq" : q.type === "coding" ? "badge-coding" : "badge-scenario");

    document.getElementById("qNum").textContent    = `Q${String(idx+1).padStart(2,"0")} / ${QUESTIONS.length}`;
    document.getElementById("qCatTag").textContent = q.category;

    // Scenario box
    const sBox   = document.getElementById("scenarioBox");
    const sText  = document.getElementById("scenarioText");
    const sLabel = document.getElementById("scenarioLabel");
    sText.textContent = q.scenario;
    sBox.className    = "scenario-box" + (q.type === "coding" ? " coding" : "");
    sLabel.textContent = q.type === "coding" ? "REQUIREMENT" : "SCENARIO";
    sBox.querySelector(".scenario-icon").textContent =
      q.type === "coding" ? "💻" : "🏢";

    // Question text
    document.getElementById("qText").textContent = q.question;

    // Answer area
    const area = document.getElementById("answerArea");
    area.innerHTML = "";

    if (q.type === "mcq")      area.innerHTML = buildMCQ(q, idx);
    else if (q.type === "coding") area.innerHTML = buildCodeEditor(q, idx);
    else                       area.innerHTML = buildDescriptive(q, idx);

    // Nav state
    document.getElementById("btnPrev").disabled = idx === 0;
    document.getElementById("btnNext").disabled = idx === QUESTIONS.length - 1;
    document.getElementById("qProgressText").textContent =
      `${Object.keys(answers).filter(k => answers[k] !== "" && answers[k] !== undefined).length} of ${QUESTIONS.length} answered`;

    updateQMap();
    card.classList.add("visible");
  }, 200);
}

// ── Build Answer Areas ─────────────────────────────────────────────
function buildMCQ(q, idx) {
  const saved = answers[idx];
  return `<div class="mcq-options">
    ${q.options.map((opt, i) => `
      <button class="mcq-opt${saved === i ? " selected" : ""}" onclick="selectMCQ(${idx},${i})">
        <span class="opt-key">${["A","B","C","D"][i]}</span>
        <span>${opt}</span>
      </button>`).join("")}
  </div>`;
}

function buildDescriptive(q, idx) {
  const saved = answers[idx] || "";
  return `
    <textarea class="desc-area" id="desc-${idx}" placeholder="${q.placeholder}"
      oninput="autoSaveDesc(${idx})">${saved}</textarea>
    <div class="desc-footer">
      <p class="desc-hint">💡 Write a detailed step-by-step answer. Be as thorough as possible.</p>
      <span class="char-count" id="cc-${idx}">${saved.length} chars</span>
    </div>`;
}

function buildCodeEditor(q, idx) {
  const saved = answers[idx] || "";
  const ext   = q.language === "SOQL" || q.language === "SOSL" ? "soql"
              : q.language.startsWith("LWC") ? "js" : "apex";
  return `
    <div class="code-editor-wrap">
      <div class="code-editor-bar">
        <span>solution.${ext}</span>
        <span class="lang-tag">${q.language}</span>
      </div>
      <textarea class="code-area" id="code-${idx}" placeholder="${q.placeholder}"
        oninput="autoSaveCode(${idx})" spellcheck="false">${saved}</textarea>
    </div>
    <p class="code-hint">💡 ${q.codeHint}</p>`;
}

// ── Selection / Auto-save ──────────────────────────────────────────
function selectMCQ(qIdx, optIdx) {
  answers[qIdx] = optIdx;
  document.querySelectorAll(".mcq-opt").forEach((b, i) => {
    b.classList.toggle("selected", i === optIdx);
  });
  updateQMap();
  saveSession();
  document.getElementById("qProgressText").textContent =
    `${Object.keys(answers).filter(k => answers[k] !== "" && answers[k] !== undefined).length} of ${QUESTIONS.length} answered`;
}

function autoSaveDesc(qIdx) {
  const ta = document.getElementById(`desc-${qIdx}`);
  if (!ta) return;
  answers[qIdx] = ta.value;
  const cc = document.getElementById(`cc-${qIdx}`);
  if (cc) cc.textContent = ta.value.length + " chars";
  updateQMap();
  saveSession();
}

function autoSaveCode(qIdx) {
  const ta = document.getElementById(`code-${qIdx}`);
  if (!ta) return;
  answers[qIdx] = ta.value;
  updateQMap();
  saveSession();
}

function saveCurrentAnswer() {
  const q = QUESTIONS[currentIdx];
  if (q.type === "scenario") autoSaveDesc(currentIdx);
  if (q.type === "coding")   autoSaveCode(currentIdx);
}

// ── Final Submit ───────────────────────────────────────────────────
function finalSubmit() {
  const answered   = Object.keys(answers).filter(k => answers[k] !== "" && answers[k] !== undefined).length;
  const unanswered = QUESTIONS.length - answered;

  if (unanswered > 0) {
    const go = confirm(`You have ${unanswered} unanswered question(s).\n\nSubmit anyway?`);
    if (!go) return;
  }
  saveCurrentAnswer();
  doSubmit();
}

function doSubmit() {
  clearInterval(timerHandle);
  const timeTaken = 45 * 60 - timerSecs;
  const timeStr   = `${Math.floor(timeTaken / 60)}m ${timeTaken % 60}s`;
  const mcqScore  = deriveMcqScore();

  setSessionState("result");
  saveSession();

  showResultScreen(mcqScore, timeStr);
  sendToSheets(mcqScore, timeStr);
}

// ── Result Screen ──────────────────────────────────────────────────
function showResultScreen(mcqScore, timeStr) {
  showScreen("screen-result");

  document.getElementById("rName").textContent  = candidateInfo.name  || "—";
  document.getElementById("rBatch").textContent = candidateInfo.batch || "—";
  document.getElementById("rMcq").textContent   = `${mcqScore} / 5`;
  document.getElementById("rTime").textContent  = timeStr;

  const pct = Math.round((mcqScore / 5) * 100);
  let statusText;
  if (pct === 100)    statusText = "PERFECT — 5 / 5 MCQ";
  else if (pct >= 60) statusText = "PASSED MCQ";
  else                statusText = "MCQ NEEDS REVIEW";

  const statusEl = document.getElementById("rStatus");
  statusEl.textContent = statusText;
  statusEl.style.color = pct >= 60 ? "var(--green)" : "var(--red)";

  // Result banner
  const banner = document.getElementById("resultBanner");
  if (pct >= 60) {
    banner.textContent = "✓ Assessment Submitted Successfully";
    banner.className   = "result-status-banner pass";
  } else {
    banner.textContent = "Assessment Submitted — MCQ Review Required";
    banner.className   = "result-status-banner fail";
  }
}

// ── Send to Google Sheets ──────────────────────────────────────────
async function sendToSheets(mcqScore, timeStr) {
  const line2 = document.getElementById("submitLine2");
  const line3 = document.getElementById("submitLine3");

  const ts        = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  const candidate = {
    timestamp: ts,
    name:      candidateInfo.name,
    email:     candidateInfo.email,
    batch:     candidateInfo.batch,
    role:      candidateInfo.role
  };

  // ── MCQ rows — one row per MCQ question ──────────────────────────
  const mcqRows = [];
  QUESTIONS.forEach((q, i) => {
    if (q.type !== "mcq") return;
    const selected = answers[i] !== undefined ? q.options[answers[i]] : "Not answered";
    mcqRows.push({
      ...candidate,
      question_no: `Q${String(i+1).padStart(2,"0")}`,
      category:    q.category,
      scenario:    q.scenario,
      question:    q.question,
      option_a:    q.options[0],
      option_b:    q.options[1],
      option_c:    q.options[2],
      option_d:    q.options[3],
      selected_answer: selected,
      correct_answer:  q.options[q.answer],
      result:          answers[i] === q.answer ? "✓ Correct" : "✗ Wrong",
      mcq_total_score: `${mcqScore} / 5`,
      time_taken:      timeStr
    });
  });

  // ── Scenario rows — one row per descriptive question ─────────────
  const scenarioRows = [];
  QUESTIONS.forEach((q, i) => {
    if (q.type !== "scenario") return;
    scenarioRows.push({
      ...candidate,
      question_no: `Q${String(i+1).padStart(2,"0")}`,
      category:    q.category,
      scenario:    q.scenario,
      question:    q.question,
      answer:      answers[i] || "(blank)",
      time_taken:  timeStr
    });
  });

  // ── Coding rows — one row per coding question ─────────────────────
  const codingRows = [];
  QUESTIONS.forEach((q, i) => {
    if (q.type !== "coding") return;
    codingRows.push({
      ...candidate,
      question_no: `Q${String(i+1).padStart(2,"0")}`,
      category:    q.category,
      language:    q.language,
      requirement: q.scenario,
      question:    q.question,
      code_submitted: answers[i] || "(blank)",
      time_taken:  timeStr
    });
  });

  const payload = { mcqRows, scenarioRows, codingRows };

  if (!SCRIPT_URL || SCRIPT_URL.includes("YOUR_GOOGLE")) {
    line2.innerHTML = `Connecting to Google Sheets... <span class="sub-ok">[DEMO MODE]</span>`;
    line3.style.display = "block";
    line3.innerHTML = `<span class="sub-ok">Set SCRIPT_URL in quiz.js to enable real submission.</span>`;
    return;
  }

  try {
    await fetch(SCRIPT_URL, {
      method: "POST",
      mode:   "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    line2.innerHTML = `Connecting to Google Sheets... <span class="sub-ok">[OK]</span>`;
    line3.style.display = "block";
    line3.innerHTML = `<span class="sub-ok">Results successfully written to Google Sheets.</span>`;
  } catch (err) {
    line2.innerHTML = `Connecting to Google Sheets... <span class="sub-err">[FAILED]</span>`;
    line3.style.display = "block";
    line3.innerHTML = `<span class="sub-err">Error: ${err.message}. Check SCRIPT_URL.</span>`;
  }
}

// ── Screen Switch ──────────────────────────────────────────────────
function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  window.scrollTo(0, 0);
}

// ── Retry / Restart ────────────────────────────────────────────────
function retryQuiz() {
  clearInterval(timerHandle);
  clearSession();
  currentIdx    = 0;
  answers       = {};
  timerSecs     = 45 * 60;
  candidateInfo = {};
  QUESTIONS     = [];

  // Reset result lines
  const l2 = document.getElementById("submitLine2");
  const l3 = document.getElementById("submitLine3");
  if (l2) l2.innerHTML = `Connecting to Google Sheets... <span class="sub-spin">●</span>`;
  if (l3) { l3.style.display = "none"; l3.innerHTML = ""; }

  const timer = document.getElementById("sidebarTimer");
  if (timer) timer.classList.remove("urgent");

  showScreen("screen-landing");
}
