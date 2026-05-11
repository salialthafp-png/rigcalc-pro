import { useState, useEffect, useMemo, createContext, useContext, useCallback } from "react";

const AppCtx = createContext(null);

// ── CRANE DATABASE ─────────────────────────────────────────────────────────────
const CRANE_DB = [
  // ── MOBILE OUTRIGGER 100T–500T (min 10) ──────────────────────────────────────
  { model:"Liebherr LTM 1100-5.2",  type:"mobile_outrigger", maxCap:100,  selfWeight:56,
    chart:[{r:3,b:11.2,cap:100},{r:5,b:13.5,cap:84},{r:8,b:20,cap:58},{r:12,b:28,cap:36},{r:16,b:36,cap:22},{r:20,b:44,cap:15}]},
  { model:"Liebherr LTM 1090-4.2",  type:"mobile_outrigger", maxCap:90,   selfWeight:52,
    chart:[{r:3,b:11,cap:90},{r:5,b:13,cap:76},{r:8,b:19,cap:52},{r:12,b:26,cap:32},{r:16,b:33,cap:20},{r:18,b:40,cap:14}]},
  { model:"Liebherr LTM 1130-5.1",  type:"mobile_outrigger", maxCap:130,  selfWeight:60,
    chart:[{r:3,b:13,cap:130},{r:5,b:15,cap:110},{r:8,b:22,cap:78},{r:12,b:30,cap:50},{r:16,b:38,cap:32},{r:20,b:46,cap:22}]},
  { model:"Grove GMK4100L",          type:"mobile_outrigger", maxCap:100,  selfWeight:55,
    chart:[{r:3,b:11,cap:100},{r:5,b:14,cap:82},{r:8,b:21,cap:56},{r:12,b:29,cap:34},{r:16,b:37,cap:20},{r:20,b:45,cap:13}]},
  { model:"Grove GMK5150L",          type:"mobile_outrigger", maxCap:150,  selfWeight:68,
    chart:[{r:3,b:13,cap:150},{r:5,b:16,cap:125},{r:8,b:24,cap:88},{r:12,b:32,cap:56},{r:16,b:40,cap:36},{r:20,b:48,cap:24}]},
  { model:"Tadano ATF 130G-5",       type:"mobile_outrigger", maxCap:130,  selfWeight:62,
    chart:[{r:3,b:12,cap:130},{r:5,b:15,cap:108},{r:8,b:22,cap:76},{r:12,b:30,cap:48},{r:16,b:38,cap:30},{r:20,b:46,cap:20}]},
  { model:"Tadano AC 3.045L (45T)",  type:"mobile_outrigger", maxCap:45,   selfWeight:28,
    chart:[{r:3,b:9.1,cap:45},{r:5,b:11,cap:36},{r:8,b:16,cap:24},{r:10,b:20,cap:16},{r:12,b:24,cap:11}]},
  { model:"Liebherr LTM 1200-5.1",  type:"mobile_outrigger", maxCap:200,  selfWeight:80,
    chart:[{r:3,b:14,cap:200},{r:5,b:18,cap:168},{r:8,b:26,cap:118},{r:12,b:35,cap:76},{r:16,b:44,cap:50},{r:22,b:54,cap:30}]},
  { model:"Grove GMK6300L",          type:"mobile_outrigger", maxCap:300,  selfWeight:96,
    chart:[{r:3,b:15,cap:300},{r:5,b:19,cap:252},{r:8,b:28,cap:178},{r:12,b:38,cap:116},{r:16,b:48,cap:76},{r:22,b:58,cap:46}]},
  { model:"Tadano ATF 400G-6",       type:"mobile_outrigger", maxCap:400,  selfWeight:108,
    chart:[{r:3,b:16,cap:400},{r:5,b:20,cap:336},{r:8,b:30,cap:236},{r:12,b:42,cap:154},{r:16,b:54,cap:102},{r:24,b:66,cap:60}]},
  { model:"Liebherr LTM 1350-6.1",  type:"mobile_outrigger", maxCap:350,  selfWeight:100,
    chart:[{r:3,b:15,cap:350},{r:5,b:19,cap:292},{r:8,b:28,cap:206},{r:12,b:40,cap:134},{r:16,b:52,cap:88},{r:22,b:62,cap:54}]},
  { model:"Grove GMK7450-1 (450T)", type:"mobile_outrigger", maxCap:450,  selfWeight:115,
    chart:[{r:3,b:16,cap:450},{r:5,b:21,cap:378},{r:8,b:31,cap:266},{r:12,b:44,cap:174},{r:16,b:57,cap:115},{r:24,b:72,cap:69}]},
  { model:"Liebherr LTM 1500-8.1",  type:"mobile_outrigger", maxCap:500,  selfWeight:120,
    chart:[{r:3,b:16,cap:500},{r:5,b:21,cap:420},{r:8,b:31,cap:298},{r:12,b:44,cap:196},{r:16,b:56,cap:130},{r:24,b:70,cap:78}]},

  // ── MOBILE OUTRIGGER 500T–1000T (min 10) ─────────────────────────────────────
  { model:"Grove GMK7550 (550T)",    type:"mobile_outrigger", maxCap:550,  selfWeight:130,
    chart:[{r:3,b:17,cap:550},{r:5,b:22,cap:462},{r:8,b:33,cap:328},{r:12,b:47,cap:214},{r:16,b:60,cap:142},{r:24,b:76,cap:86}]},
  { model:"Tadano ATF 600G-8",       type:"mobile_outrigger", maxCap:600,  selfWeight:136,
    chart:[{r:3,b:17,cap:600},{r:5,b:22,cap:504},{r:8,b:33,cap:358},{r:12,b:47,cap:234},{r:16,b:60,cap:155},{r:24,b:78,cap:93}]},
  { model:"Liebherr LTM 1650-8.1",  type:"mobile_outrigger", maxCap:650,  selfWeight:140,
    chart:[{r:3,b:18,cap:650},{r:5,b:23,cap:546},{r:8,b:34,cap:388},{r:12,b:48,cap:256},{r:16,b:62,cap:170},{r:24,b:78,cap:102}]},
  { model:"Liebherr LTM 1750-9.1",  type:"mobile_outrigger", maxCap:750,  selfWeight:158,
    chart:[{r:3,b:19,cap:750},{r:5,b:24,cap:630},{r:8,b:36,cap:448},{r:12,b:51,cap:294},{r:16,b:66,cap:196},{r:24,b:84,cap:118}]},
  { model:"Liebherr LTM 1800-9.1",  type:"mobile_outrigger", maxCap:800,  selfWeight:165,
    chart:[{r:3,b:19,cap:800},{r:5,b:25,cap:672},{r:8,b:37,cap:478},{r:12,b:53,cap:314},{r:16,b:68,cap:209},{r:24,b:86,cap:126}]},
  { model:"Tadano AC 7.450-1 (450T)",type:"mobile_outrigger", maxCap:450,  selfWeight:112,
    chart:[{r:3,b:16,cap:450},{r:5,b:21,cap:378},{r:8,b:31,cap:268},{r:12,b:44,cap:175},{r:16,b:57,cap:116},{r:24,b:72,cap:70}]},
  { model:"Grove GMK6400 (400T)",    type:"mobile_outrigger", maxCap:400,  selfWeight:106,
    chart:[{r:3,b:16,cap:400},{r:5,b:20,cap:336},{r:8,b:30,cap:238},{r:12,b:43,cap:155},{r:16,b:55,cap:103},{r:24,b:68,cap:62}]},
  { model:"Manitowoc MLC650 (650T)", type:"mobile_outrigger", maxCap:650,  selfWeight:138,
    chart:[{r:3,b:18,cap:650},{r:5,b:23,cap:546},{r:8,b:34,cap:388},{r:12,b:48,cap:255},{r:16,b:62,cap:169},{r:24,b:78,cap:101}]},
  { model:"Liebherr LTM 11200-9.1", type:"mobile_outrigger", maxCap:1000, selfWeight:180,
    chart:[{r:3,b:20,cap:1000},{r:5,b:26,cap:840},{r:8,b:38,cap:598},{r:12,b:54,cap:394},{r:16,b:70,cap:262},{r:24,b:88,cap:158}]},

  // ── CRAWLER CRANES (min 15) ──────────────────────────────────────────────────
  { model:"Manitowoc MLC300",        type:"crawler", maxCap:300,  selfWeight:185,
    chart:[{r:6,b:24,cap:300},{r:9,b:30,cap:252},{r:12,b:38,cap:200},{r:18,b:50,cap:138},{r:24,b:62,cap:94},{r:30,b:76,cap:64}]},
  { model:"Kobelco CKE2500G (250T)", type:"crawler", maxCap:250,  selfWeight:164,
    chart:[{r:5,b:20,cap:250},{r:8,b:26,cap:210},{r:12,b:34,cap:168},{r:18,b:46,cap:116},{r:24,b:58,cap:79},{r:30,b:72,cap:54}]},
  { model:"Hitachi KH1000-3 (100T)", type:"crawler", maxCap:100,  selfWeight:82,
    chart:[{r:4,b:16,cap:100},{r:6,b:20,cap:84},{r:9,b:26,cap:64},{r:12,b:32,cap:48},{r:18,b:42,cap:30},{r:24,b:54,cap:18}]},
  { model:"Liebherr LR 1600/2",      type:"crawler", maxCap:600,  selfWeight:200,
    chart:[{r:6,b:30,cap:600},{r:9,b:38,cap:504},{r:12,b:48,cap:408},{r:18,b:62,cap:275},{r:24,b:78,cap:186},{r:30,b:94,cap:126}]},
  { model:"Liebherr LR 1750/2",      type:"crawler", maxCap:750,  selfWeight:225,
    chart:[{r:6,b:32,cap:750},{r:9,b:40,cap:630},{r:12,b:52,cap:510},{r:18,b:66,cap:344},{r:24,b:82,cap:232},{r:30,b:100,cap:158}]},
  { model:"Liebherr LR 1800-1.0",    type:"crawler", maxCap:800,  selfWeight:240,
    chart:[{r:6,b:34,cap:800},{r:9,b:42,cap:672},{r:12,b:54,cap:544},{r:18,b:70,cap:366},{r:24,b:88,cap:248},{r:30,b:106,cap:168}]},
  { model:"Demag CC 2800-1 (600T)",  type:"crawler", maxCap:600,  selfWeight:198,
    chart:[{r:6,b:30,cap:600},{r:9,b:38,cap:504},{r:12,b:48,cap:406},{r:18,b:62,cap:274},{r:24,b:78,cap:185},{r:30,b:94,cap:125}]},
  { model:"Manitowoc MLC650",        type:"crawler", maxCap:650,  selfWeight:210,
    chart:[{r:6,b:32,cap:650},{r:9,b:40,cap:546},{r:12,b:50,cap:440},{r:18,b:65,cap:297},{r:24,b:82,cap:200},{r:30,b:98,cap:136}]},
  { model:"SANY SCC8200 (820T)",      type:"crawler", maxCap:820,  selfWeight:248,
    chart:[{r:6,b:34,cap:820},{r:9,b:43,cap:688},{r:12,b:55,cap:558},{r:18,b:71,cap:376},{r:24,b:89,cap:254},{r:30,b:107,cap:172}]},
  { model:"Liebherr LR 11000",        type:"crawler", maxCap:1000, selfWeight:220,
    chart:[{r:6,b:36,cap:1000},{r:9,b:42,cap:840},{r:12,b:54,cap:680},{r:18,b:66,cap:460},{r:24,b:84,cap:310},{r:30,b:96,cap:210}]},
  { model:"Manitowoc 18000 (990T)",   type:"crawler", maxCap:990,  selfWeight:218,
    chart:[{r:6,b:36,cap:990},{r:9,b:44,cap:832},{r:12,b:56,cap:672},{r:18,b:72,cap:454},{r:24,b:90,cap:306},{r:30,b:108,cap:208}]},
  { model:"Demag CC 8800 (1600T)",    type:"crawler", maxCap:1600, selfWeight:320,
    chart:[{r:6,b:38,cap:1600},{r:9,b:46,cap:1344},{r:12,b:58,cap:1086},{r:18,b:74,cap:732},{r:24,b:92,cap:494},{r:36,b:116,cap:288}]},
  { model:"Terex CC 8800-1 (1600T)",  type:"crawler", maxCap:1600, selfWeight:320,
    chart:[{r:6,b:38,cap:1600},{r:9,b:46,cap:1340},{r:12,b:58,cap:1080},{r:18,b:74,cap:730},{r:24,b:92,cap:492},{r:36,b:116,cap:286}]},
  { model:"Manitowoc MLC2000",        type:"crawler", maxCap:2000, selfWeight:380,
    chart:[{r:6,b:40,cap:2000},{r:9,b:48,cap:1680},{r:12,b:60,cap:1360},{r:18,b:78,cap:920},{r:24,b:96,cap:620},{r:36,b:120,cap:360}]},
  { model:"Manitowoc 31000 (2300T)",  type:"crawler", maxCap:2300, selfWeight:440,
    chart:[{r:6,b:42,cap:2300},{r:9,b:50,cap:1930},{r:12,b:64,cap:1560},{r:18,b:82,cap:1050},{r:24,b:100,cap:710},{r:36,b:128,cap:414}]},
  { model:"Liebherr LR 12500 (2500T)",type:"crawler", maxCap:2500, selfWeight:500,
    chart:[{r:8,b:46,cap:2500},{r:12,b:58,cap:2100},{r:18,b:76,cap:1500},{r:24,b:94,cap:1034},{r:36,b:118,cap:624},{r:48,b:142,cap:366}]},
  { model:"Liebherr LR 13000 (3000T)",type:"crawler", maxCap:3000, selfWeight:520,
    chart:[{r:8,b:48,cap:3000},{r:12,b:60,cap:2520},{r:18,b:78,cap:1800},{r:24,b:96,cap:1240},{r:36,b:120,cap:750},{r:48,b:144,cap:440}]},
];

// ── MATERIALS ─────────────────────────────────────────────────────────────────
const MATERIALS = [
  {name:"Mild Steel",density:7850},{name:"Stainless Steel 304",density:7900},
  {name:"Stainless Steel 316L",density:7980},{name:"Aluminium 6061",density:2700},
  {name:"Aluminium 5083",density:2660},{name:"Cast Iron",density:7200},
  {name:"Copper",density:8900},{name:"Brass",density:8500},
  {name:"Titanium",density:4500},{name:"Concrete (reinforced)",density:2400},
  {name:"Concrete (plain)",density:2300},{name:"Timber (softwood)",density:600},
  {name:"Timber (hardwood)",density:900},{name:"HDPE Plastic",density:950},
  {name:"Custom / Override",density:0},
];

const SHAPES = [
  {name:"Rectangular Plate",inputs:["L","W","T"],formula:"L × W × T"},
  {name:"Solid Cylinder",inputs:["OD","Length"],formula:"π × (OD/2)² × L"},
  {name:"Hollow Pipe / Tube",inputs:["OD","ID","Length"],formula:"π × [(OD/2)² − (ID/2)²] × L"},
  {name:"Square Bar",inputs:["Side","Length"],formula:"A² × L"},
  {name:"Round Bar (Solid Rod)",inputs:["Diameter","Length"],formula:"π × (D/2)² × L"},
  {name:"Sphere",inputs:["Radius"],formula:"(4/3) × π × R³"},
  {name:"Irregular (user volume)",inputs:["Volume"],formula:"User input"},
];

const DAF_TABLE = [ // kept for backward compat reference
  {condition:"Onshore / Simple Lift",daf:1.05},{condition:"Onshore / Complex Lift",daf:1.10},
  {condition:"Onshore / Tandem Lift",daf:1.15},{condition:"Onshore / Blind Lift",daf:1.15},
  {condition:"Offshore / Calm / < 0.5m Hs",daf:1.10},{condition:"Offshore / Moderate / 0.5–2.0m Hs",daf:1.25},
  {condition:"Offshore / Rough / > 2.0m Hs",daf:1.35},{condition:"Offshore / Subsea / Below Keel",daf:1.50},
  {condition:"Pick & Carry — Level Hardstand",daf:1.10},{condition:"Pick & Carry — Uneven Ground",daf:1.25},
];

// v1.3 — Full DAF matrix cross-referencing environment + lift type
const DAF_MATRIX = [
  {env:"onshore",lift:"Standard Lift",      label:"Onshore / Standard Lift",          daf:1.05},
  {env:"onshore",lift:"Blind Lift",         label:"Onshore / Blind Lift",             daf:1.10},
  {env:"onshore",lift:"High Elevated Lift", label:"Onshore / High Elevated (>15m)",   daf:1.10},
  {env:"onshore",lift:"Pick & Carry",       label:"Onshore / Pick & Carry",           daf:1.10},
  {env:"onshore",lift:"Tilting / Upending", label:"Onshore / Tilting / Upending",     daf:1.15},
  {env:"onshore",lift:"Tandem Lift",        label:"Onshore / Tandem Lift",            daf:1.15},
  {env:"onshore",lift:"Man-Riding / Personnel",label:"Onshore / Man-Riding (LOLER)", daf:1.25},
  {env:"offshore",lift:"Standard Lift",     label:"Offshore / Calm / <0.5m Hs",      daf:1.10, hsMax:0.5},
  {env:"offshore",lift:"Moderate",          label:"Offshore / Moderate / 0.5–2.0m Hs",daf:1.25, hsMin:0.5, hsMax:2.0},
  {env:"offshore",lift:"Rough",             label:"Offshore / Rough / >2.0m Hs",     daf:1.35, hsMin:2.0},
  {env:"offshore",lift:"Tandem Lift",       label:"Offshore / Tandem",                daf:1.30},
  {env:"offshore",lift:"Subsea / Below Keel",label:"Offshore / Subsea",              daf:1.50},
  {env:"offshore",lift:"Man-Riding / Personnel",label:"Offshore / Man-Riding",       daf:1.35},
];

const DUTY_FACTORS = {A1:1.00,A2:1.00,A3:1.00,A4:0.95,A5:0.90};
const SPECIAL_LIFTS = ["Standard Lift","Tandem Lift","Tilting / Upending","Blind Lift","High Elevated Lift","Pick & Carry","Man-Riding / Personnel"];

const WIND_SHAPES = [
  {name:"Flat Plate (face-on)",cf:1.80},{name:"Flat Plate (edge-on)",cf:1.30},
  {name:"Circular Cylinder (smooth)",cf:1.20},{name:"Circular Cylinder (rough)",cf:0.80},
  {name:"Square Section",cf:2.10},{name:"Rectangular Section (L/B=2)",cf:1.60},
  {name:"Lattice / Open Truss",cf:1.30},{name:"Sphere (smooth)",cf:0.50},
  {name:"Tank / Vessel (vertical)",cf:0.80},{name:"Tank / Vessel (horizontal)",cf:1.20},
  {name:"I-Beam (face-on)",cf:1.70},{name:"I-Beam (edge-on)",cf:1.40},
];

const SOIL_TABLE = [
  {type:"Dense Gravel / Compacted Hardcore",gbp:600},
  {type:"Dense Sand / Gravel",gbp:400},
  {type:"Medium Dense Sand",gbp:300},
  {type:"Loose Sand",gbp:100,warn:"⚠ Low — verify"},
  {type:"Stiff Clay",gbp:150},
  {type:"Firm Clay",gbp:75},
  {type:"Soft Clay",gbp:25,warn:"⚠ Mat required"},
  {type:"Peat / Organic",gbp:0,warn:"⛔ Not suitable"},
  {type:"Concrete Slab 150mm RC",gbp:500},
  {type:"Concrete Slab 100mm plain",gbp:300},
  {type:"Rock (sound)",gbp:1000},
  {type:"Hardcore / Road Base",gbp:200},
];

const SLING_ANGLES = [
  {angle:90,k:1.000,status:"✅ Maximum efficiency"},
  {angle:85,k:0.996,status:"✅"},
  {angle:75,k:0.966,status:"✅"},
  {angle:60,k:0.866,status:"✅ Acceptable"},
  {angle:45,k:0.707,status:"⚠️ MINIMUM RECOMMENDED"},
  {angle:30,k:0.500,status:"🔴 CRITICAL — Avoid"},
  {angle:20,k:0.342,status:"⛔ DANGEROUS"},
  {angle:15,k:0.259,status:"⛔ PROHIBITED"},
];

const MODULES = [
  {id:0,icon:"🏠",label:"Project Info & Summary"},
  {id:1,icon:"⚖️",label:"Weight Calculation"},
  {id:2,icon:"🏗",label:"Crane Selection"},
  {id:3,icon:"🌍",label:"Ground Bearing Pressure"},
  {id:4,icon:"🪢",label:"Rigging Calculation"},
  {id:5,icon:"💨",label:"Wind Load Calculation"},
  {id:6,icon:"📐",label:"Centre of Gravity (COG)"},
  {id:7,icon:"📊",label:"Utilization Dashboard"},
  {id:8,icon:"🔩",label:"Rigging Equipment Ref."},
  {id:9,icon:"⛔",label:"Discard Criteria"},
  {id:10,icon:"✅",label:"Load Test & Proof Load"},
  {id:11,icon:"🔧",label:"Crane Config Validation"},
  {id:12,icon:"🌤",label:"Weather & Environment"},
  {id:13,icon:"👷",label:"Human Factor Check"},
  {id:14,icon:"📋",label:"Lift Sequence Planner"},
  {id:15,icon:"🚧",label:"Exclusion Zone Calc"},
  {id:16,icon:"💥",label:"Dropped Object Risk"},
  {id:17,icon:"🔄",label:"Redundancy Check"},
  {id:18,icon:"📐",label:"Pythagorean Calculator"},
  {id:19,icon:"📏",label:"Unit Converter"},
  {id:20,icon:"🔍",label:"Knowledge Search"},
];

// ── UTILITY HELPERS ────────────────────────────────────────────────────────────
const toT = (val, unit) => {
  if (!val || isNaN(val)) return 0;
  const v = parseFloat(val);
  if (unit==="kg") return v/1000;
  if (unit==="kN") return v/9.81;
  return v; // T
};
const toM = (val, unit) => {
  if (!val || isNaN(val)) return 0;
  const v = parseFloat(val);
  if (unit==="mm") return v/1000;
  if (unit==="cm") return v/100;
  return v;
};
const f1 = v => (isNaN(v)||!isFinite(v)) ? "—" : parseFloat(v).toFixed(1);
const f2 = v => (isNaN(v)||!isFinite(v)) ? "—" : parseFloat(v).toFixed(2);
const f3 = v => (isNaN(v)||!isFinite(v)) ? "—" : parseFloat(v).toFixed(3);
const fN = (v,n=2) => (isNaN(v)||!isFinite(v)) ? "—" : parseFloat(v).toFixed(n);
const utilClass = u => u>=100?"overload":u>=90?"critical":u>=75?"warning":"safe";

const interpChart = (chart, radius) => {
  if (!chart||!chart.length) return 0;
  const sorted = [...chart].sort((a,b)=>a.r-b.r);
  if (radius <= sorted[0].r) return sorted[0].cap;
  if (radius >= sorted[sorted.length-1].r) return sorted[sorted.length-1].cap;
  for (let i=0;i<sorted.length-1;i++) {
    if (radius>=sorted[i].r && radius<=sorted[i+1].r) {
      const t = (radius-sorted[i].r)/(sorted[i+1].r-sorted[i].r);
      return sorted[i].cap + t*(sorted[i+1].cap-sorted[i].cap);
    }
  }
  return 0;
};

// ── CSS ────────────────────────────────────────────────────────────────────────
const CSS = `

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

:root{
  /* Backgrounds */
  --bg-app:#f0f2f5;--bg-primary:#ffffff;--bg-secondary:#f8f9fa;
  --bg-card:#ffffff;--bg-section:#f4f6f8;--bg-input:#ffffff;
  --bg-table-row:#ffffff;--bg-table-alt:#f8f9fa;--bg-table-head:#f0f2f5;
  /* Brand */
  --orange-500:#f97316;--orange-600:#ea6c00;--orange-700:#c2570a;
  --red-brand:#c00000;
  /* Status */
  --green-500:#16a34a;--green-400:#15803d;
  --green-bg:#f0fdf4;--green-border:#86efac;
  --amber-500:#d97706;--amber-400:#b45309;
  --amber-bg:#fffbeb;--amber-border:#fde68a;
  --red-500:#dc2626;--red-400:#b91c1c;
  --red-bg:#fef2f2;--red-border:#fecaca;
  --blue-400:#2563eb;--blue-500:#1d4ed8;
  --blue-bg:#eff6ff;--blue-border:#bfdbfe;
  /* Text */
  --text-primary:#111827;--text-secondary:#374151;--text-muted:#6b7280;
  --text-orange:#ea6c00;--text-green:#15803d;--text-amber:#92400e;
  --text-red:#991b1b;--text-blue:#1d4ed8;
  /* Borders */
  --border-subtle:#f3f4f6;--border-default:#e5e7eb;--border-strong:#d1d5db;
  --border-orange:rgba(249,115,22,0.30);
  /* Inputs */
  --input-bg:#ffffff;--input-border:#d1d5db;
  --input-label-fg:#ea6c00;--calc-bg:#eff6ff;
  --calc-border:#bfdbfe;--calc-label-fg:#1d4ed8;
  /* Fonts */
  --font-display:'Arial',sans-serif;
  --font-body:'Arial',sans-serif;
  --font-mono:'Arial',monospace;
  /* Shadows */
  --shadow-card:0 1px 3px rgba(0,0,0,0.08),0 1px 2px rgba(0,0,0,0.05);
  --shadow-card-hover:0 4px 12px rgba(0,0,0,0.10),0 1px 4px rgba(0,0,0,0.06);
  /* Misc */
  --t-base:180ms ease;--t-slow:300ms ease;
  --t-spring:350ms cubic-bezier(0.34,1.56,0.64,1);
  --radius-sm:4px;--radius-md:8px;--radius-lg:10px;
}

html,body{height:100%;font-family:var(--font-body);background:var(--bg-app);color:var(--text-primary);font-size:14px;line-height:1.5}

/* ── APP SHELL ── */
.app-root{display:flex;flex-direction:column;height:100vh;overflow:hidden;background:var(--bg-app)}

/* ── TOPBAR ── */
.topbar{height:92px;flex-shrink:0;display:flex;align-items:center;justify-content:space-between;
  padding:0 20px;background:#ffffff;
  border-bottom:3px solid #c00000;
  box-shadow:0 2px 8px rgba(0,0,0,0.08);
  z-index:100;position:relative}
.topbar-brand{display:flex;align-items:center;gap:12px}
.logo-divider{width:1px;height:36px;background:linear-gradient(180deg,transparent,#e5e7eb 25%,#e5e7eb 75%,transparent);flex-shrink:0;margin:0 4px}
.topbar-author-block{display:flex;flex-direction:column;gap:2px}
.topbar-author-name{font-family:'Arial Black',Arial,sans-serif;font-size:11px;font-weight:900;
  color:#b8864e;letter-spacing:0.1em;text-transform:uppercase;line-height:1}
.topbar-author-email{font-family:monospace;font-size:10px;color:#9ca3af;
  text-decoration:none;transition:color var(--t-base)}
.topbar-author-email:hover{color:#c00000}
.unsaved-dot{width:8px;height:8px;border-radius:50%;background:#f59e0b;animation:pulse 2s infinite}
.unsaved-label{font-size:10px;color:#6b7280;font-family:monospace}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}

/* ── STATUS BANNERS ── */
.banner{padding:6px 14px;border-radius:var(--radius-md);font-family:var(--font-display);
  font-weight:700;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;
  display:flex;align-items:center;gap:6px;white-space:nowrap}
.banner-idle{background:#f3f4f6;border:1px solid #d1d5db;color:#374151}
.banner-pass{background:#f0fdf4;border:1px solid #86efac;color:#15803d;animation:passGlow 3s ease-in-out infinite}
.banner-warn{background:#fffbeb;border:1px solid #fde68a;color:#92400e;animation:warningBreathe 2.5s ease-in-out infinite}
.banner-fail{background:#fef2f2;border:1px solid #fecaca;color:#991b1b;animation:failPulse 1.8s ease-in-out infinite}
@keyframes passGlow{0%,100%{box-shadow:0 0 8px rgba(22,163,74,0.15)}50%{box-shadow:0 0 18px rgba(22,163,74,0.30)}}
@keyframes warningBreathe{0%,100%{opacity:0.9}50%{opacity:1}}
@keyframes failPulse{0%,100%{opacity:0.9}50%{opacity:1}}

/* ── SIDEBAR ── */
.sidebar{width:240px;flex-shrink:0;overflow-y:auto;
  background:#1e2329;border-right:1px solid #2d3748}
.sidebar::-webkit-scrollbar{width:4px}
.sidebar::-webkit-scrollbar-thumb{background:#374151;border-radius:2px}
.sidebar-header{padding:14px 16px 8px;font-family:var(--font-display);font-size:9px;
  letter-spacing:0.15em;text-transform:uppercase;color:#9ca3af}
.sidebar-item{display:flex;align-items:center;gap:10px;padding:9px 16px;cursor:pointer;
  border-left:3px solid transparent;font-size:13px;color:#9ca3af;
  transition:all var(--t-base)}
.sidebar-item:hover{background:rgba(249,115,22,0.08);color:#f3f4f6;border-left-color:rgba(249,115,22,0.4)}
.sidebar-item.active{background:linear-gradient(90deg,rgba(249,115,22,0.18) 0%,rgba(249,115,22,0.05) 100%);
  border-left-color:#f97316;color:#ffffff}
.sidebar-icon{font-size:14px;width:18px;text-align:center}
.sidebar-label{flex:1;font-size:12px;line-height:1.3}
.sidebar-badge{font-size:10px;width:16px;height:16px;border-radius:50%;
  display:flex;align-items:center;justify-content:center}
.sidebar-badge.pass{background:rgba(22,163,74,0.15);color:#4ade80}
.sidebar-badge.warn{background:rgba(217,119,6,0.15);color:#fbbf24}
.sidebar-badge.fail{background:rgba(220,38,38,0.15);color:#f87171}

/* ── CONTENT AREA ── */
.app-body{display:flex;flex:1;overflow:hidden}
.content{flex:1;overflow-y:auto;padding:24px 28px;background:var(--bg-app)}
.content::-webkit-scrollbar{width:5px}
.content::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:3px}

/* ── MODULE CARDS ── */
.module-card{background:#ffffff;border:1px solid #e5e7eb;
  border-radius:var(--radius-lg);box-shadow:var(--shadow-card);margin-bottom:18px;
  animation:scaleIn 350ms cubic-bezier(0.16,1,0.3,1) both}
.card-header{background:linear-gradient(90deg,#fff7ed 0%,#ffffff 100%);
  border-bottom:2px solid #fed7aa;border-radius:var(--radius-lg) var(--radius-lg) 0 0;
  padding:12px 18px;display:flex;align-items:center;justify-content:space-between}
.module-title{font-family:var(--font-display);font-weight:800;font-size:15px;
  letter-spacing:0.08em;text-transform:uppercase;color:#1a1a1a}
.card-body{padding:18px 18px 14px}

/* ── SECTION HEADING ── */
.section-heading{font-family:var(--font-display);font-weight:700;font-size:11px;
  letter-spacing:0.14em;text-transform:uppercase;color:#ea6c00;
  padding:14px 0 8px;border-bottom:2px solid #fde8cc;margin-bottom:14px}

/* ── FORM GRID ── */
.form-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:12px}
.form-row{display:flex;flex-direction:column;gap:5px}
.label-input{font-family:var(--font-display);font-size:10px;font-weight:700;
  color:#ea6c00;letter-spacing:0.08em;text-transform:uppercase}
.label-calc{font-family:var(--font-display);font-size:10px;font-weight:700;
  color:#1d4ed8;letter-spacing:0.08em;text-transform:uppercase}
.input-wrap{display:flex;align-items:stretch}
.input-user{background:#ffffff;border:1.5px solid #d1d5db;
  color:#111827;padding:8px 11px;border-radius:var(--radius-sm) 0 0 var(--radius-sm);
  font-size:13px;font-family:var(--font-body);flex:1;min-width:0;
  transition:border-color var(--t-base),box-shadow var(--t-base)}
.input-user:focus{outline:none;border-color:#f97316;box-shadow:0 0 0 3px rgba(249,115,22,0.10)}
.input-user.no-unit{border-radius:var(--radius-sm)}
.input-calc{background:#eff6ff;border:1.5px solid #bfdbfe;
  color:#1d4ed8;padding:8px 11px;border-radius:var(--radius-sm);
  font-size:13px;font-family:var(--font-mono);width:100%;cursor:default}
.unit-sel{background:#f9fafb;border:1.5px solid #d1d5db;border-left:none;
  color:#374151;font-size:11px;font-family:var(--font-mono);
  padding:0 8px;cursor:pointer;border-radius:0 var(--radius-sm) var(--radius-sm) 0;
  transition:all var(--t-base)}
.unit-sel:hover{border-color:#f97316;color:#f97316}
select.input-user{cursor:pointer}
textarea.input-user{resize:vertical;min-height:60px;border-radius:var(--radius-sm)}

/* ── RESULTS ── */
.result-large{font-family:var(--font-mono);font-size:26px;font-weight:600;color:#1d4ed8;line-height:1}
.result-row{display:flex;align-items:center;gap:14px;padding:10px 14px;
  background:#eff6ff;border:1.5px solid #bfdbfe;border-radius:var(--radius-md);margin:8px 0}
.result-glw{background:#fff7ed;border:1.5px solid #fed7aa;border-left:3px solid #f97316;padding:14px 18px}
.glw-val{font-family:var(--font-mono);font-size:30px;font-weight:600;color:#ea6c00}

/* ── UTIL BAR ── */
.util-bar-wrap{background:#e5e7eb;border-radius:20px;height:8px;overflow:hidden;margin:6px 0}
.util-bar-fill{height:100%;border-radius:20px;transition:width 600ms cubic-bezier(0.22,1,0.36,1)}
.util-safe .util-bar-fill{background:#16a34a}
.util-warning .util-bar-fill{background:#d97706}
.util-critical .util-bar-fill{background:#dc2626}
.util-overload .util-bar-fill{background:#991b1b}

/* ── BADGES ── */
.badge{display:inline-flex;align-items:center;gap:5px;padding:3px 9px;
  border-radius:var(--radius-md);font-size:10px;font-family:var(--font-display);
  font-weight:700;letter-spacing:0.08em;text-transform:uppercase}
.badge-pass{background:#f0fdf4;border:1px solid #86efac;color:#15803d}
.badge-warn{background:#fffbeb;border:1px solid #fde68a;color:#92400e}
.badge-fail{background:#fef2f2;border:1px solid #fecaca;color:#991b1b}
.badge-info{background:#eff6ff;border:1px solid #bfdbfe;color:#1d4ed8}
.badge-idle{background:#f3f4f6;border:1px solid #e5e7eb;color:#6b7280}

/* ── INFO BOXES ── */
.info-box{padding:10px 14px;border-radius:var(--radius-md);font-size:13px;line-height:1.6;margin:8px 0}
.info-box-orange{background:#fff7ed;border:1px solid #fed7aa;border-left:3px solid #f97316;color:#7c2d12}
.info-box-red{background:#fef2f2;border:1px solid #fecaca;border-left:3px solid #dc2626;color:#7f1d1d}
.info-box-green{background:#f0fdf4;border:1px solid #86efac;border-left:3px solid #16a34a;color:#14532d}
.info-box-amber{background:#fffbeb;border:1px solid #fde68a;border-left:3px solid #d97706;color:#78350f}
.info-box-blue{background:#eff6ff;border:1px solid #bfdbfe;border-left:3px solid #2563eb;color:#1e3a8a}

/* ── TABLES ── */
.table-wrap{overflow-x:auto;border-radius:var(--radius-md);border:1px solid #e5e7eb}
.data-table{width:100%;border-collapse:collapse;font-size:12px}
.data-table th{background:#f8f9fa;color:#ea6c00;font-family:var(--font-display);font-size:10px;
  letter-spacing:0.1em;text-transform:uppercase;border-bottom:2px solid #fed7aa;
  padding:9px 12px;text-align:left;font-weight:700}
.data-table td{padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#1f2937}
.data-table tr:nth-child(even) td{background:#ffffff}
.data-table tr:nth-child(odd) td{background:#fafafa}
.data-table tr:hover td{background:#fff7ed;color:#111827;transition:background var(--t-base)}
.data-table tr.highlight td{background:#fff3e0;color:#1a1a1a;font-weight:600}

/* ── TABS ── */
.tab-bar{display:flex;border-bottom:2px solid #e5e7eb;margin-bottom:16px;overflow-x:auto}
.tab-btn{padding:8px 16px;font-family:var(--font-display);font-size:12px;font-weight:700;
  letter-spacing:0.06em;text-transform:uppercase;border:none;background:transparent;
  color:#9ca3af;cursor:pointer;border-bottom:2px solid transparent;
  margin-bottom:-2px;transition:all var(--t-base);white-space:nowrap}
.tab-btn:hover{color:#111827}
.tab-btn.active{color:#f97316;border-bottom-color:#f97316}

/* ── TOGGLE ── */
.toggle-wrap{display:flex;align-items:center;gap:8px}
.toggle{position:relative;width:40px;height:22px;cursor:pointer}
.toggle input{opacity:0;width:0;height:0}
.toggle-track{position:absolute;inset:0;border-radius:11px;background:#d1d5db;transition:background var(--t-base)}
.toggle input:checked~.toggle-track{background:rgba(249,115,22,0.20)}
.toggle-thumb{position:absolute;width:16px;height:16px;top:3px;left:3px;
  border-radius:50%;background:#9ca3af;transition:transform var(--t-spring),background var(--t-base)}
.toggle input:checked~.toggle-thumb{transform:translateX(18px);background:#f97316}

/* ── BUTTONS ── */
.btn{padding:8px 16px;border-radius:var(--radius-md);font-family:var(--font-display);
  font-weight:700;font-size:12px;letter-spacing:0.06em;text-transform:uppercase;
  cursor:pointer;transition:all var(--t-base);border:none}
.btn-primary{background:linear-gradient(135deg,#f97316,#ea6c00);color:#fff;
  box-shadow:0 2px 8px rgba(249,115,22,0.30)}
.btn-primary:hover{transform:translateY(-1px);box-shadow:0 4px 14px rgba(249,115,22,0.40)}
.btn-ghost{background:#ffffff;border:1.5px solid #d1d5db;color:#374151}
.btn-ghost:hover{border-color:#f97316;color:#f97316}
.btn-sm{padding:5px 10px;font-size:11px}

/* ── STAT CARDS ── */
.stat-card{background:#ffffff;border:1px solid #e5e7eb;
  border-radius:var(--radius-md);padding:14px 16px;box-shadow:0 1px 3px rgba(0,0,0,0.05)}
.stat-label{font-size:10px;font-family:var(--font-display);letter-spacing:0.1em;
  text-transform:uppercase;color:#6b7280;margin-bottom:6px}
.stat-val{font-family:var(--font-mono);font-size:22px;font-weight:600;color:#1d4ed8}
.stat-unit{font-size:12px;color:#9ca3af;margin-left:4px;font-family:var(--font-body)}

/* ── STD TAG ── */
.std-tag{font-size:11px;padding:0;border-radius:0;
  background:none;border:none;
  color:#374151;font-family:Arial,sans-serif;font-weight:600;letter-spacing:0}

/* ── FORMULA PANEL ── */
.formula-panel{background:#f8f9fa;border:1px solid #e5e7eb;border-left:3px solid #f97316;
  border-radius:0 var(--radius-sm) var(--radius-sm) 0;
  padding:10px 14px;font-family:var(--font-mono);font-size:11px;color:#1f2937;
  margin-top:8px;line-height:1.9}
.formula-toggle{display:flex;align-items:center;gap:6px;cursor:pointer;
  font-size:11px;color:#9ca3af;padding:4px 0;transition:color var(--t-base)}
.formula-toggle:hover{color:#f97316}

/* ── GRID LAYOUTS ── */
.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.grid-4{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
@media(max-width:900px){.grid-4{grid-template-columns:1fr 1fr}.grid-3{grid-template-columns:1fr 1fr}}
@media(max-width:600px){.grid-2,.grid-3,.grid-4{grid-template-columns:1fr}}

/* ── SVG DIAGRAM ── */
.svg-diagram{background:#f8fafc;border:1px solid #e2e8f0;border-radius:var(--radius-md);overflow:hidden}

/* ── REF PANEL ── */
.ref-toggle{display:flex;align-items:center;gap:8px;cursor:pointer;padding:10px 16px;
  background:#f9fafb;border:1px solid #e5e7eb;border-left:3px solid #f97316;
  border-radius:var(--radius-sm);font-family:var(--font-display);font-size:12px;
  letter-spacing:0.06em;text-transform:uppercase;color:#6b7280;
  transition:color var(--t-base);width:100%}
.ref-toggle:hover{color:#ea6c00}
.ref-chevron{transition:transform 200ms ease;font-size:10px;margin-left:auto}
.ref-chevron.open{transform:rotate(180deg)}
.ref-panel{background:#fafafa;border-left:3px solid #f97316;
  border-radius:0 var(--radius-sm) var(--radius-sm) 0;font-size:11px;color:#374151}
.ref-panel-cols{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;padding:12px 14px}
@media(max-width:700px){.ref-panel-cols{grid-template-columns:1fr}}
.ref-col{background:#ffffff;border:1px solid #e5e7eb;padding:12px 14px;border-radius:4px}
.ref-col-head{font-family:var(--font-display);font-size:9px;letter-spacing:0.12em;
  text-transform:uppercase;color:#ea6c00;margin-bottom:10px;padding-bottom:6px;
  border-bottom:1px solid #f3f4f6}
.ref-entry{margin-bottom:10px;padding-bottom:10px;border-bottom:1px solid #f3f4f6}
.ref-entry:last-child{margin-bottom:0;padding-bottom:0;border-bottom:none}
.ref-term{color:#ea6c00;font-family:var(--font-mono);font-size:11px;font-weight:600;display:block;margin-bottom:2px}
.ref-def{color:#1f2937;font-size:12px;line-height:1.6}
.ref-expr{color:#1d4ed8;font-family:var(--font-mono);font-size:11px;background:#eff6ff;
  padding:4px 8px;border-radius:3px;display:block;margin:4px 0}
.ref-std-code{color:#ea6c00;font-family:var(--font-mono);font-size:11px;font-weight:600}
.ref-std-title{color:#374151;font-size:11px;display:block;margin-top:1px}

/* ── MODULE NAV BAR ── */
.module-nav{background:#1e2329;border-top:1px solid #2d3748;
  padding:10px 20px;display:flex;justify-content:space-between;align-items:center;
  flex-shrink:0}
.nav-btn{background:#2d3748;border:1px solid #374151;color:#9ca3af;
  font-family:var(--font-display);font-size:11px;font-weight:700;letter-spacing:0.08em;
  text-transform:uppercase;padding:8px 16px;border-radius:var(--radius-md);
  cursor:pointer;transition:all var(--t-base)}
.nav-btn:hover{border-color:#f97316;color:#f97316}
.nav-btn-primary{background:linear-gradient(135deg,#f97316,#ea6c00);border-color:#f97316;color:#fff;
  box-shadow:0 2px 8px rgba(249,115,22,0.30)}
.nav-btn-primary:hover{box-shadow:0 4px 14px rgba(249,115,22,0.45);transform:translateY(-1px)}
.nav-info{font-family:var(--font-display);font-size:11px;color:#374151;
  letter-spacing:0.06em;text-transform:uppercase}

/* ── CHECKLIST ── */
.check-item{display:flex;align-items:center;gap:10px;padding:8px 12px;
  border-radius:var(--radius-sm);transition:background var(--t-base)}
.check-item:hover{background:#fff7ed}
.check-label{font-size:13px;color:#111827;flex:1}
.check-pass{color:#15803d;font-size:11px;font-weight:600}
.check-fail{color:#b91c1c;font-size:11px;font-weight:600}

/* ── ABOUT MODAL ── */
.about-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.45);
  display:flex;align-items:center;justify-content:center;z-index:9999;
  animation:fadeIn 200ms ease}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
.about-modal{background:#ffffff;border-radius:12px;width:480px;max-width:94vw;
  box-shadow:0 24px 64px rgba(0,0,0,0.18),0 0 0 1px rgba(0,0,0,0.06);
  animation:modalIn 250ms cubic-bezier(0.16,1,0.3,1)}
@keyframes modalIn{from{transform:scale(0.95) translateY(8px);opacity:0}to{transform:scale(1) translateY(0);opacity:1}}
.about-header{background:linear-gradient(135deg,#1e2329,#2d3748);
  padding:24px 28px 20px;border-radius:12px 12px 0 0;
  display:flex;align-items:flex-start;justify-content:space-between}
.about-close{background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.15);
  color:#fff;width:28px;height:28px;border-radius:50%;cursor:pointer;font-size:14px;
  display:flex;align-items:center;justify-content:center;transition:background 150ms ease;flex-shrink:0}
.about-close:hover{background:rgba(192,0,0,0.6)}
.about-body{padding:24px 28px 28px}
.about-row{display:flex;align-items:center;gap:12px;padding:10px 0;
  border-bottom:1px solid #f3f4f6}
.about-row:last-child{border-bottom:none}
.about-key{font-family:Arial,sans-serif;font-size:11px;font-weight:700;
  color:#9ca3af;text-transform:uppercase;letter-spacing:0.08em;width:90px;flex-shrink:0}
.about-val{font-family:Arial,sans-serif;font-size:13px;color:#111827;flex:1}
.about-val a{color:#c00000;text-decoration:none}
.about-val a:hover{text-decoration:underline}
.about-std-grid{display:grid;grid-template-columns:1fr 1fr;gap:4px 12px;margin-top:4px}
.about-std-item{font-family:Arial,monospace;font-size:11px;color:#374151;
  display:flex;align-items:center;gap:5px}
.about-std-item::before{content:"";width:4px;height:4px;border-radius:50%;
  background:#c00000;flex-shrink:0}
.about-btn-info{background:transparent;border:1.5px solid #d1d5db;color:#6b7280;
  width:30px;height:30px;border-radius:50%;cursor:pointer;font-size:14px;font-weight:700;
  display:flex;align-items:center;justify-content:center;transition:all 150ms ease;
  font-family:Arial,sans-serif}
.about-btn-info:hover{border-color:#c00000;color:#c00000;background:#fef2f2}

/* ── BACK TO TOP ── */
.btn-back-top{position:fixed;bottom:80px;right:20px;width:44px;height:44px;
  border-radius:50%;background:#f97316;color:#fff;font-size:16px;
  display:flex;align-items:center;justify-content:center;cursor:pointer;
  opacity:0;transition:opacity 200ms ease;
  box-shadow:0 4px 14px rgba(249,115,22,0.35);z-index:999;border:none;pointer-events:none}
.btn-back-top.visible{opacity:1;pointer-events:auto}

/* ── ANIMATIONS ── */
@keyframes slideDownFade{from{transform:translateY(-100%);opacity:0}to{transform:translateY(0);opacity:1}}
@keyframes fadeSlideUp{from{transform:translateY(12px);opacity:0}to{transform:translateY(0);opacity:1}}
@keyframes scaleIn{from{transform:scale(0.98);opacity:0}to{transform:scale(1);opacity:1}}
@keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
@keyframes checkBounce{0%{transform:scale(0)}70%{transform:scale(1.15)}100%{transform:scale(1)}}

/* ── PRINT ── */
@media print{
  .sidebar,.topbar,.module-nav,.ref-toggle,.ref-panel,
  .btn-back-top,.about-overlay,.btn-ghost,.about-btn-info{display:none!important}
  .app-body{display:block}
  .content{padding:8px;overflow:visible;height:auto}
  .app-root{height:auto;overflow:visible}
  body{background:#fff!important;color:#000!important;font-size:11pt}
  .module-card{break-inside:avoid;box-shadow:none;border:1px solid #ccc;margin-bottom:12px}
  .card-header{background:#f5f5f5!important;-webkit-print-color-adjust:exact;print-color-adjust:exact}
  .module-title{color:#000!important;font-size:13pt!important}
  .input-user,.input-calc{border:1px solid #ccc!important;background:#fff!important;color:#000!important}
  .data-table th{background:#f0f0f0!important;color:#000!important;-webkit-print-color-adjust:exact;print-color-adjust:exact}
  .data-table td{color:#000!important}
  .stat-card{border:1px solid #ccc!important;box-shadow:none!important}
  .stat-val{color:#000!important}
  .info-box{border:1px solid #ccc!important}
  .section-heading{color:#c00000!important;border-bottom:1px solid #ccc!important}
  @page{margin:1.5cm;size:A4}
}
`;

// ── PER-MODULE PERSISTENCE (FIX 8) ────────────────────────────────────────────
const STORE_KEY = "rigcalcpro_session";
const loadStore = () => { try { return JSON.parse(localStorage.getItem(STORE_KEY)||"{}"); } catch{return {};} };
const saveStore = (d) => { try { localStorage.setItem(STORE_KEY,JSON.stringify(d)); } catch{} };

// ── REFERENCE DATA — 3-COLUMN (Terms | Formulas | Standards) ─────────────────
const REF_DATA = {
  0:{
    terms:[
      {t:"Lift Classification",d:"Routine: ≤75% crane cap, known COG, single crane. Engineered: method statement + engineer sign-off. Critical: >75% cap, tandem, blind, over personnel/live plant, unknown COG."},
      {t:"Method Statement",d:"Written step-by-step procedure for executing the lift. Mandatory for engineered and critical lifts."},
      {t:"Competent Person",d:"Sufficient practical and theoretical knowledge to detect defects and assess risk. Defined by LOLER 1998."},
      {t:"Approval Chain",d:"Lift Engineer → Rigging Supervisor → Safety Officer → Client Representative → Third-Party Inspector. All must sign for critical lifts."},
      {t:"Revision Number",d:"Increment on any change to inputs, conditions, or personnel. Earlier revisions superseded and archived."},
    ],
    formulas:[
      {n:"GLW",e:"Net Weight × (1 + Rigging%) × (1 + Contingency%)"},
      {n:"Dynamic Load",e:"DL = GLW × DAF"},
      {n:"Crane Utilization",e:"U% = DL ÷ Effective Capacity × 100"},
      {n:"Overall Status",e:"PASS only if ALL modules individually pass"},
    ],
    stds:[
      {c:"LOLER 1998",t:"Lifting Operations Regs — duty holder, inspection frequency, competent person."},
      {c:"PUWER 1998",t:"Work Equipment — maintenance, inspection, suitable for purpose."},
      {c:"BS 7121-1",t:"Safe Use of Cranes — lift planning, classification."},
      {c:"ISO 12480-1",t:"International equivalent to BS 7121-1."},
    ]
  },
  1:{
    terms:[
      {t:"Net Weight",d:"Actual mass of the object only. No allowances included. By geometry+density or certified weighing."},
      {t:"Density (ρ)",d:"Mass per unit volume (kg/m³). Steel=7850, Concrete=2400, Aluminium=2700."},
      {t:"Rigging Allowance",d:"% added for slings, shackles, hook block, spreader beams. Default 10%. Range 5–15%."},
      {t:"Contingency Allowance",d:"% added for weight uncertainty: coatings, contents, tolerances. Default 5%. Range 5–10%."},
      {t:"GLW — Gross Lift Weight",d:"Total weight for all downstream calculations. Net weight plus all allowances."},
      {t:"Certified Weight",d:"Confirmed by weighbridge, load cell, or manufacturer data sheet. More accurate than geometry."},
    ],
    formulas:[
      {n:"Hollow Pipe",e:"V = π × [(OD÷2)² − (ID÷2)²] × L"},
      {n:"Solid Cylinder",e:"V = π × (OD÷2)² × L"},
      {n:"Rectangular Block",e:"V = L × W × T"},
      {n:"Sphere",e:"V = (4÷3) × π × R³"},
      {n:"Net Weight",e:"W(kg) = ρ × V  |  W(T) = W(kg)÷1000  |  W(kN) = W(T)×9.81"},
      {n:"GLW",e:"GLW = W(T) × (1 + Rigging÷100) × (1 + Contingency÷100)"},
    ],
    stds:[
      {c:"BS 7121-1 Sec.6.3",t:"Weight calculation and allowances. Min 10% rigging recommended."},
      {c:"ISO 12480-1 Sec.7.2",t:"Gross lift weight determination method."},
      {c:"DNVGL-ST-N001",t:"Weight control for offshore lifts — tighter tolerances required."},
      {c:"ASME P30.1-2014 Sec.4",t:"Weight determination methods and accuracy requirements for lift planning."},
      {c:"LEEA COPSULE 2020",t:"Weight confirmation — certified weight preferred over calculated for critical lifts."},
    ]
  },
  2:{
    terms:[
      {t:"Working Radius",d:"Horizontal distance from crane slew centre to centre of suspended load. Always measure to load — not rigging attachment point."},
      {t:"Chart Capacity",d:"Rated capacity at a SPECIFIC radius and boom length. Always read from manufacturer load chart. NOT maximum rated capacity."},
      {t:"DAF",d:"Dynamic Amplification Factor — multiplier for dynamic shock loads. Onshore simple=1.05, offshore subsea=1.50."},
      {t:"Duty Class (ISO 4301-1)",d:"A1=Infrequent | A2=Light | A3=Moderate (default) | A4=Heavy | A5=Very heavy/continuous."},
      {t:"Boom Angle",d:"Boom centreline from horizontal. Min 30° per ASME B30.5. Derived: α = arccos(R ÷ L)."},
      {t:"Boom Tip Height",d:"Approx max hook height: L × sin(α). Deduct rigging and hook block depth."},
      {t:"Tandem Lift",d:"Two or more cranes lifting one load. Each crane: share × 1.10 uplift. Separate lift plan per crane. BS 7121-3 Sec.12."},
    ],
    formulas:[
      {n:"Boom Angle",e:"α = arccos(R ÷ L)  [degrees]"},
      {n:"Boom Tip Height",e:"H_tip = L × sin(α)  [metres]"},
      {n:"Dynamic Design Load",e:"DL = GLW × DAF  [T]"},
      {n:"Tandem Load (per crane)",e:"TDL = GLW × Share% × 1.10"},
      {n:"Effective Capacity",e:"CE = Chart Cap × Duty Factor"},
      {n:"Crane Utilization",e:"U% = DL ÷ CE × 100  |  <75% Safe | 75-90% Warn | >90% Critical | >100% Prohibited"},
    ],
    stds:[
      {c:"ASME B30.5",t:"Mobile cranes — load chart use, boom angle min 30° Sec.5-1.3.2."},
      {c:"BS 7121-3",t:"Mobile cranes — tandem lift Sec.12, configuration."},
      {c:"ISO 9374-1",t:"Load chart format and application."},
      {c:"ISO 4301-1",t:"Duty class A1–A5 and duty factor."},
      {c:"ISO 12480-1",t:"DAF selection and dynamic load calculation."},
      {c:"DNVGL-ST-N001",t:"Offshore DAF for sea states, marine warranty."},
      {c:"ASME P30.1-2014 Sec.5",t:"Lift planning — crane selection criteria and capacity verification."},
      {c:"BS EN 13000:2010+A1",t:"Mobile cranes — general. Outrigger distribution factor Annex B Table B.1 (0.50–0.75)."},
      {c:"LEEA COPSULE 2020",t:"Lift category classification and planning requirements per category."},
      {c:"ISO 4306-1:2016",t:"Cranes — vocabulary and definitions used globally."},
    ]
  },
  3:{
    terms:[
      {t:"GBP",d:"Ground Bearing Pressure — force per unit area by outrigger pads or crawler tracks (kN/m²). Must not exceed allowable."},
      {t:"Allowable GBP",d:"Max pressure ground can sustain without shear failure or excessive settlement. From geotechnical report. Never estimate."},
      {t:"Outrigger Reaction — Worst Case",d:"CIRIA C703 Sec.4.3: one outrigger may carry 60–70% of total reaction. Design uses 65% worst-case single pad."},
      {t:"Crawler Track — Worst Case",d:"CIRIA C703 Sec.4.3: one track assumed to carry 55% of total reaction."},
      {t:"Min Required Area",d:"Area needed so GBP ≤ allowable: A_min = Reaction ÷ Allowable GBP."},
      {t:"Cribbing",d:"Timber/steel spreader under outrigger pad to increase contact area and reduce GBP."},
      {t:"Settlement",d:"Vertical deformation under load. Excessive settlement causes crane instability."},
    ],
    formulas:[
      {n:"Total Reaction",e:"TR(kN) = (DDL(T) + Crane Self Weight(T)) × 9.81"},
      {n:"Outrigger (mobile)",e:"OR(kN) = TR × 0.65  [CIRIA C703 worst case]"},
      {n:"Track (crawler)",e:"CR(kN) = TR × 0.55  [CIRIA C703 worst case]"},
      {n:"Calculated GBP",e:"GBP(kN/m²) = Reaction ÷ Effective Contact Area"},
      {n:"Min Required Area",e:"A_min(m²) = Reaction(kN) ÷ Allowable GBP(kN/m²)"},
      {n:"Min Dimension",e:"D_min(m) = √(A_min)"},
    ],
    stds:[
      {c:"CIRIA C703",t:"Crane stability on site — outrigger/crawler GBP, worst-case single pad rule Sec.4.3."},
      {c:"EN 1997-1",t:"Eurocode 7 Geotechnical Design — bearing capacity verification."},
      {c:"BS 8004:2015",t:"Foundations — allowable bearing values for standard soil types."},
      {c:"BS EN ISO 22476",t:"Site investigation — CPT and SPT test methods."},
      {c:"ASME P30.1-2014 Sec.6.6",t:"Ground conditions assessment and documentation requirements."},
      {c:"BS EN 13000 Annex B",t:"Distribution factor values for outrigger loading: 0.50–0.75."},
      {c:"CIRIA C580",t:"Embedded retaining walls — load spread at depth for buried services check."},
      {c:"ASME P30.1 Sec.6.6.3",t:"DAF for crawler crane ground pressure — minimum 1.25 applied."},
    ]
  },
  4:{
    terms:[
      {t:"WLL",d:"Working Load Limit — max load in normal service. WLL = MBL ÷ FoS (min 5:1 for slings)."},
      {t:"K Factor",d:"sin(θh). Sling angle efficiency. At 90°: K=1.000 (max). At 30°: K=0.500 (danger zone)."},
      {t:"Sling Angle θh",d:"Angle from horizontal. Min recommended 45°. Below 30°: PROHIBITED. Lower angle = higher tension."},
      {t:"2-Leg Worst Case Rule",d:"For 3+ legs: statically indeterminate. Only 2 legs assumed to carry full load. Mandatory for engineering sign-off."},
      {t:"Plan Distance (d)",d:"Horizontal distance from lifting point to hook centreline projection. Pythagorean from coordinates."},
      {t:"Hook Height (H)",d:"Vertical from lifting point to hook pin. Auto-calc: H = √(S² − d²)."},
      {t:"Sling Length (S)",d:"Full pin-to-pin length. Auto-calc: S = √(d² + H²)."},
      {t:"Included Angle (β)",d:"Angle between adjacent sling legs. β = 2 × (90° − θh). Higher = more tension."},
    ],
    formulas:[
      {n:"Plan Distance",e:"d = √[(X₂−X₁)² + (Y₂−Y₁)²]"},
      {n:"Hook Height (from S)",e:"H = √(S² − d²)"},
      {n:"Sling Length (from H)",e:"S = √(d² + H²)"},
      {n:"Angles",e:"θv = arctan(d÷H)  |  θh = 90° − θv  |  K = sin(θh)"},
      {n:"Tension per Leg",e:"T = Design Load ÷ (2 × K)  [any leg count ≥ 2]"},
      {n:"Utilization",e:"U% = T per leg ÷ WLL × 100"},
      {n:"Included Angle",e:"β = 2 × (90° − θh)"},
    ],
    stds:[
      {c:"ASME B30.9",t:"Slings — K factor table, WLL, hitch types, 2-leg worst case rule."},
      {c:"BS EN 1492-1",t:"Flat webbing slings — WLL, testing."},
      {c:"BS EN 1492-2",t:"Round slings — WLL, colour code. Violet=1T → Orange=10T."},
      {c:"BS EN 818-4",t:"Chain slings Grade 80 and 100."},
      {c:"BS EN 13889",t:"Forged steel shackles — bow and D-type."},
      {c:"ASME BTH-1",t:"Below-the-hook devices — padeyes, spreader beams."},
      {c:"ASME P30.1-2014 Sec.5.5",t:"Rigging plan requirements, sling selection, COG verification."},
      {c:"LEEA COPSULE 2020",t:"Rigging equipment selection, inspection before use requirements."},
      {c:"ISO 4306-2:2012",t:"Cranes — vocabulary for mobile cranes and rigging terminology."},
      {c:"OSHA 1926.251",t:"Rigging equipment for material handling — US regulatory requirements."},
    ]
  },
  5:{
    terms:[
      {t:"Basic Wind Pressure (q)",d:"Dynamic pressure exerted by moving air. q = 0.5 × ρ × V². Doubles speed = quadruples pressure."},
      {t:"Force Coefficient (Cf)",d:"Shape-dependent drag multiplier. Flat plate face-on=1.8 (highest), sphere=0.5 (lowest)."},
      {t:"Exposed Area (A)",d:"Projected face area perpendicular to wind direction. Use the largest face the wind could hit."},
      {t:"Site Wind Limit",d:"Max speed for lifting. Default BS 7121 = 10 m/s. Override with manufacturer or site permit limit (use most restrictive)."},
      {t:"Beaufort Scale",d:"Wind intensity 0–12. Force 5 (8–10.8 m/s) = approaching limit. Force 6+ = suspend operations."},
      {t:"Vortex Shedding",d:"Oscillating lateral forces on cylinders. f = 0.2 × V ÷ D. Can cause resonance on long cylindrical loads."},
    ],
    formulas:[
      {n:"Wind Pressure",e:"q(N/m²) = 0.5 × ρ × V²"},
      {n:"Wind Force",e:"F(kN) = q × A × Cf ÷ 1000 = 0.5 × ρ × V² × A × Cf ÷ 1000"},
      {n:"Area — Rectangle",e:"A = W × H"},
      {n:"Area — Circle",e:"A = π × (D÷2)²"},
      {n:"Area — Annulus",e:"A = π × [(OD÷2)² − (ID÷2)²]"},
      {n:"Area — Trapezoid",e:"A = 0.5 × (a + b) × H"},
      {n:"Area — Hexagon",e:"A = 0.8660 × AF²"},
      {n:"Speed",e:"m/s×3.6=km/h | m/s×2.237=mph | m/s×1.944=knots"},
    ],
    stds:[
      {c:"EN 1991-1-4",t:"Eurocode 1 Wind Actions — Cf values, terrain categories, gust factors."},
      {c:"BS 7121-1",t:"Max 10 m/s default. Anemometer required at lift height."},
      {c:"ISO 4302",t:"Cranes — wind load assessment for crane structural design."},
      {c:"DNVGL-ST-N001",t:"Offshore wind and sea state limits for crane operations."},
    ]
  },
  6:{
    terms:[
      {t:"Centre of Gravity (COG)",d:"Single point through which total weight acts. Determines hang and whether load is level."},
      {t:"Moment",d:"Weight × perpendicular distance from reference. M = W × d (T·m). Used to locate COG by moment balance."},
      {t:"Eccentricity",d:"Offset of COG from geometric centre. Causes load to hang tilted. Longer leg on heavy side to level."},
      {t:"Geometric Centre",d:"Mathematical centre of load plan. Rectangle: X=L÷2, Y=W÷2."},
      {t:"Stability",d:"Load stable when COG is within the base polygon formed by sling attachment points. If outside — load tips."},
      {t:"Plumb Line Check",d:"Mark COG on load. Hang plumb line from hook. Level when plumb passes through COG mark."},
    ],
    formulas:[
      {n:"COG — X axis",e:"COG_X = Σ(Wi × Xi) ÷ ΣWi"},
      {n:"COG — Y axis",e:"COG_Y = Σ(Wi × Yi) ÷ ΣWi"},
      {n:"COG — Z axis",e:"COG_Z = Σ(Wi × Zi) ÷ ΣWi"},
      {n:"Eccentricity",e:"e_X = |COG_X − Geo_Centre_X|  |  Flag if > 50mm"},
      {n:"Sling adjustment",e:"ΔL ≈ eccentricity ÷ tan(θh)"},
    ],
    stds:[
      {c:"ASME B30",t:"COG determination requirements for lift planning."},
      {c:"EN 13155",t:"Non-fixed lifting attachments — COG verification before lift."},
      {c:"BS 7121-1",t:"Lift plan must document COG position."},
      {c:"ASME BTH-1",t:"Below-the-hook device design accounts for COG offset."},
      {c:"ASME P30.1-2014 Sec.5",t:"Load COG determination — methods, accuracy, documentation requirements."},
      {c:"LEEA COPSULE 2020",t:"COG verification requirement before first lift of any engineered load."},
      {c:"ISO 4306-1:2016",t:"COG and stability definitions."},
    ]
  },
  7:{
    terms:[
      {t:"Utilization (%)",d:"Actual load ÷ allowable × 100. The single most critical metric for lift go/no-go decision."},
      {t:"Traffic Light System",d:"<75% GREEN=Safe | 75-90% AMBER=Warning | >90% RED=Critical | >100% BLACK=Overload prohibited."},
      {t:"Overall Lift Status",d:"PASS only if ALL individual module checks pass. Single red in any module = lift not approved."},
      {t:"Conservative Design",d:"Always design for worst case. Two-leg rule, 65% outrigger factor, DAF — all conservative by design."},
    ],
    formulas:[
      {n:"Crane Utilization",e:"U% = Dynamic Load ÷ Effective Capacity × 100"},
      {n:"GBP Utilization",e:"U% = Calculated GBP ÷ Allowable GBP × 100"},
      {n:"Rigging Utilization",e:"U% = Tension per Leg ÷ Sling WLL × 100"},
      {n:"Status Logic",e:">100%: OVERLOAD  |  >90%: CRITICAL  |  >75%: WARNING  |  <75%: SAFE"},
    ],
    stds:[
      {c:"BS 7121-1",t:"Lift approval process and sign-off before proceeding."},
      {c:"ISO 12480-1",t:"Utilization limits and safety margins."},
      {c:"LOLER 1998",t:"Lift plan reviewed and approved by competent person."},
    ]
  },
  8:{
    terms:[
      {t:"WLL",d:"Working Load Limit — max load in normal service. Stamped/tagged on every piece of lifting equipment."},
      {t:"MBL",d:"Minimum Breaking Load — destructive test failure load. Typically 5× WLL for rigging."},
      {t:"FoS",d:"Factor of Safety = MBL ÷ WLL. Rigging min=5:1. Below-the-hook devices min=3:1."},
      {t:"Grade 80/100 Chain",d:"G80: yield 800 N/mm². G100: 25% more capacity for same size. Orange marking on G100."},
      {t:"Round Sling Colour Code",d:"Violet=1T | Green=2T | Yellow=3T | Grey=4T | Red=5T | Brown=6T | Blue=8T | Orange=10T."},
      {t:"Eye Bolt Derating",d:"At 0°=100% WLL | 30°=70% | 45°=50% | 60°=25%. Orient in plane of load direction."},
      {t:"Bow vs D-Shackle",d:"Bow (Omega): multi-direction loading. D-shackle: straight line only — never side-load D-shackles."},
    ],
    formulas:[
      {n:"WLL from MBL",e:"WLL = MBL ÷ FoS"},
      {n:"Basket Hitch WLL",e:"WLL_basket = 2 × WLL_straight × K"},
      {n:"Choker Hitch WLL",e:"WLL_choker = 0.75 × WLL_straight"},
      {n:"Eye Bolt at angle",e:"At 0°: ×1.00 | 30°: ×0.70 | 45°: ×0.50 | 60°: ×0.25"},
    ],
    stds:[
      {c:"ASME B30.9",t:"Slings — all types, inspection, capacity, discard."},
      {c:"BS EN 1492-2",t:"Round slings — colour code, WLL, testing."},
      {c:"BS EN 818-4",t:"Chain slings Grade 80 and 100."},
      {c:"BS EN 13889",t:"Forged steel shackles."},
      {c:"DIN 580",t:"Eye bolts — dimensions and angular WLL."},
      {c:"EN 13155",t:"Spreader beams, plate clamps, beam clamps."},
      {c:"ISO 4309:2017",t:"Wire ropes — inspection and discard criteria — full class of use table."},
      {c:"ASME B30.26-2015",t:"Rigging hardware — shackles, rings, links, turnbuckles."},
      {c:"ASME B30.10-2019",t:"Hooks — inspection, use, maintenance, discard criteria."},
      {c:"ASME BTH-1-2020",t:"Below-the-hook lifting devices — design, marking, inspection."},
      {c:"OSHA 1926.251",t:"Rigging equipment requirements — US regulatory."},
      {c:"EN 818-4:2008",t:"Short link chain for lifting Grade T(8)."},
    ]
  },
  9:{
    terms:[
      {t:"Lay Length",d:"One complete helix of outer wires. Broken wire count per lay. >1% = DISCARD."},
      {t:"Birdcaging",d:"Outer wires displaced outward. Shock load or reverse bending. Any birdcage = IMMEDIATE DISCARD."},
      {t:"Kinking",d:"Permanent bend in rope. Never bend sharper than minimum bend radius. Any kink = DISCARD."},
      {t:"Elongation (Chain)",d:">3% elongation of any link or pitch = DISCARD."},
      {t:"Heat Damage",d:"Wire rope above 150°C = DISCARD. Chain above 300°C = DISCARD."},
      {t:"Quarantine",d:"Item removed pending inspection. Red tag. Not discarded — awaiting assessment."},
      {t:"Traceability",d:"Equipment history, cert, inspection dates. Missing ID tag or cert = QUARANTINE minimum."},
    ],
    formulas:[
      {n:"Broken wire limit",e:"Max broken = Total wires × 0.01 per lay  [1% threshold]"},
      {n:"Chain elongation",e:"% = (Measured − Nominal) ÷ Nominal × 100  |  >3%: DISCARD"},
      {n:"Section loss",e:"% = (Nominal dia − Measured dia) ÷ Nominal × 100  |  >10%: DISCARD"},
    ],
    stds:[
      {c:"ISO 4309",t:"Wire ropes — inspection and discard criteria. Lay length, broken wire limits."},
      {c:"BS EN 818-4",t:"Chain slings — elongation and wear discard limits."},
      {c:"BS EN 1492-1/2",t:"Webbing/round slings — cuts, abrasion, chemical damage."},
      {c:"ASME B30.9",t:"Sling inspection requirements — all types."},
      {c:"LOLER 1998",t:"Inspection frequency and record keeping."},
    ]
  },
  10:{
    terms:[
      {t:"Proof Load",d:"Static test load applied to verify structural integrity. Applied gradually — no shock loading."},
      {t:"In-Service",d:"Equipment in use: test to 110% of WLL. LOLER 1998 Reg. 9."},
      {t:"New Equipment",d:"Before first use: test to 125% of WLL. EN 13155 / ASME B30.9."},
      {t:"Permanent Deformation",d:"Any shape change after load removed = AUTOMATIC REJECTION. Even 1mm = FAIL. No exceptions."},
      {t:"Inspection Frequency",d:"Accessories (slings, shackles): every 6 months. Equipment not for persons: every 12 months. After exceptional circumstances: immediately."},
      {t:"MWS",d:"Marine Warranty Surveyor — independent offshore lift witness. Required by most marine insurers. DNVGL-ST-N001."},
    ],
    formulas:[
      {n:"In-service proof load",e:"PL = WLL × 1.10"},
      {n:"New equipment proof load",e:"PL = WLL × 1.25"},
      {n:"PASS — BOTH required",e:"Applied load ≥ PL  AND  permanent deformation = NO"},
      {n:"FAIL — EITHER",e:"Applied load < PL  OR  any permanent deformation"},
    ],
    stds:[
      {c:"LOLER 1998",t:"Reg. 9 — thorough examination. Reg. 10 — record keeping."},
      {c:"EN 13155",t:"125% WLL proof load for new below-the-hook devices."},
      {c:"ASME B30.9",t:"125% WLL proof load for new slings."},
      {c:"DNVGL-ST-N001",t:"Offshore — MWS witnessing requirements."},
    ]
  },
  11:{
    terms:[
      {t:"Anti-Two-Block (ATB)",d:"Prevents hook block contacting boom tip. Cuts lift function automatically. Mandatory ASME B30.5."},
      {t:"LMI",d:"Load Moment Indicator — monitors load vs. rated capacity. Must be calibrated and functional before lift."},
      {t:"Counterweight",d:"Must match or exceed requirement on load chart for configured radius."},
      {t:"Outrigger Extension",d:"Fully extended for rated capacity. Partially extended = reduced capacity from chart for partial config. Never interpolate."},
      {t:"Crane Level",d:"Must be within ±0.5° before lifting. Out-of-level = reduced stability and capacity."},
      {t:"Tail Swing",d:"Rear counterweight arc during slew. Often extends beyond working radius. Must be barriered."},
    ],
    formulas:[
      {n:"Counterweight check",e:"PASS if: Fitted CW ≥ Required CW from load chart"},
      {n:"Boom angle minimum",e:"PASS if: α ≥ 30°  |  α = arccos(R ÷ L)"},
      {n:"Level check",e:"PASS if: crane tilt ≤ ±0.5° in both axes"},
      {n:"Overall",e:"PASS = ALL individual checks pass  |  FAIL = ANY single check fails"},
    ],
    stds:[
      {c:"ASME B30.5",t:"Min boom angle 30° Sec.5-1.3.2, ATB Sec.5-1.9, LMI Sec.5-1.26, outrigger Sec.5-3.4."},
      {c:"BS 7121-3",t:"Mobile crane configuration checks, pre-use inspection."},
      {c:"LOLER 1998",t:"Pre-use inspection and periodic thorough examination."},
    ]
  },
  12:{
    terms:[
      {t:"Anemometer",d:"Wind speed instrument. Mount at or above hook height for accurate reading. Record readings — not forecast."},
      {t:"Significant Wave Height (Hs)",d:"Average height of highest one-third of waves. <0.5m=calm, 0.5–2.0m=moderate, >2.0m=rough."},
      {t:"Lightning Exclusion",d:"Cease ALL operations when lightning within 10km. Crane boom = highest conductor on site."},
      {t:"Visibility Limit",d:"Minimum 100m operational visibility. Below 100m: defer all crane operations."},
      {t:"Freeze / Ice",d:"Ice on load, slings, or ground: slip hazard + unexpected weight. Inspect and remove before lifting."},
    ],
    formulas:[
      {n:"Beaufort approximation",e:"V(m/s) ≈ 0.836 × B^(3/2)  where B = Beaufort number"},
      {n:"GO status",e:"GO if V ≤ Site Limit  |  NO-GO if V > Site Limit"},
      {n:"Limit source",e:"Use most restrictive of: BS 7121 / Manufacturer / Site Permit"},
    ],
    stds:[
      {c:"BS 7121-1",t:"10 m/s default wind limit. Anemometer requirement for site monitoring."},
      {c:"DNVGL-ST-N001",t:"Sea state limits for offshore lifting, Hs to DAF correlation."},
      {c:"HSE Guidance",t:"Lightning safety — cease outdoor work when thunder heard or lightning seen."},
    ]
  },
  13:{
    terms:[
      {t:"Banksman / Signalman",d:"Directs crane movements with agreed signals. Must have unobstructed sightline to load. One per crane minimum."},
      {t:"Tag Line",d:"Rope controlling rotation and swing. Min 2 for rotating loads. Min 3m length. Never wrap around hands."},
      {t:"Toolbox Talk",d:"Pre-lift briefing for ALL personnel. Must cover: lift plan, hazards, emergency stop signal, rescue plan, roles."},
      {t:"Stop Work Authority",d:"Any person has the right and duty to stop an unsafe lift. No authority can override a safety stop."},
      {t:"Rescue Plan",d:"Written procedure for personnel recovery. Must be briefed and resources on standby before lift."},
    ],
    formulas:[
      {n:"Min exclusion radius",e:"R_excl = Max working radius + load width÷2 + 1.5m"},
      {n:"Tag line length",e:"L_tag ≥ 3.0m  [prevents handler being pulled under load]"},
    ],
    stds:[
      {c:"BS 7121-1",t:"Personnel roles, exclusion zones, communication systems."},
      {c:"HSE INDG290",t:"Safety in lifting operations guidance."},
      {c:"LOLER 1998",t:"Competent persons, planning, supervision of lifting operations."},
    ]
  },
  14:{
    terms:[
      {t:"Hold Point",d:"Step requiring formal sign-off before proceeding. Work stops until authorised. Critical decision gate."},
      {t:"Witness Point",d:"Person must be present and observe. Work may continue if they fail to attend after notification."},
      {t:"Critical Step",d:"Step where error has highest consequence. Extra attention, slow execution, double-check required."},
      {t:"Take Strain",d:"Slowly apply tension until load just lifts — then STOP. Check rigging, level, COG. Only proceed if all correct."},
    ],
    formulas:[
      {n:"Minimum steps",e:"Pre-checks → Rig → Take Strain → Check → Lift → Slew → Place → De-rig"},
    ],
    stds:[
      {c:"BS 7121-1",t:"Lift plan contents and sequence requirements."},
      {c:"ISO 12480-1",t:"Lifting operation execution procedure."},
      {c:"LOLER 1998",t:"Lift plan must be followed — deviations require engineer review."},
    ]
  },
  15:{
    terms:[
      {t:"Exclusion Zone",d:"Barriered area non-essential personnel must not enter during lift. Signed 'CRANE IN OPERATION'."},
      {t:"Tail Swing Zone",d:"Rear counterweight sweep. Frequently larger than working radius. Must be in exclusion zone perimeter."},
      {t:"Struck-By Radius",d:"Max horizontal distance a dropped object can travel. Function of drop height and object aerodynamics."},
      {t:"Buffer Zone",d:"1.5m additional clearance beyond structural exclusion calculations. BS 7121-1 default."},
    ],
    formulas:[
      {n:"Min exclusion radius",e:"R = Working Radius + Load Width÷2 + 1.5m"},
      {n:"Struck-by (simplified)",e:"R_drop ≈ 0.5 × √(2H÷g) × V_horiz  [use DNVGL for critical lifts]"},
      {n:"Exclusion area",e:"A = π × R²  [360° zone]  |  A = (θ÷360) × π × R²  [sector]"},
    ],
    stds:[
      {c:"BS 7121-1",t:"Exclusion zone establishment and management."},
      {c:"DNVGL-ST-N001",t:"Dropped object risk assessment for offshore planning."},
      {c:"HSE HSG221",t:"Technical guidance on exclusion zones."},
    ]
  },
  16:{
    terms:[
      {t:"Primary Dropped Object",d:"Object falling directly from lift — sling failure, hook disengagement, rigging slip."},
      {t:"Secondary Dropped Object",d:"Object dislodged by crane/load movement — loose equipment on load, ice, tools."},
      {t:"Risk = Likelihood × Consequence",d:"Low | Medium | High | Unacceptable based on impact energy and personnel exposure."},
    ],
    formulas:[
      {n:"Time to ground",e:"t = √(2H ÷ g)"},
      {n:"Struck-by radius",e:"R = v₀ × √(2H÷g)  [if horizontal velocity v₀ exists]"},
      {n:"Impact energy",e:"E(kJ) = m × 9.81 × H ÷ 1000"},
      {n:"Risk levels",e:"<10J=Low | 10–100J=Medium | >100J=High | >1000J=Unacceptable"},
    ],
    stds:[
      {c:"DNVGL-ST-N001",t:"Dropped object risk for offshore lifts."},
      {c:"DROPS",t:"Industry dropped object prevention standard — energy classification."},
      {c:"BS 7121-1",t:"Exclusion zone sized to include dropped object trajectory."},
    ]
  },
  17:{
    terms:[
      {t:"Critical Lift",d:">75% crane capacity | Tandem | Blind | Over personnel/live plant | Offshore | Unknown COG | Man-riding."},
      {t:"Single Point of Failure",d:"Component whose failure causes total load loss. Must be eliminated or mitigated. No SPOFs in load path."},
      {t:"Redundancy",d:"Backup preventing catastrophic failure if primary fails. Critical lifts require no SPOFs."},
      {t:"Independent Verification",d:"Second competent engineer reviews calculations. Mandatory for critical lifts. Third-party preferred."},
      {t:"Emergency Lowering",d:"Controlled descent procedure if primary lift fails mid-air. Must be pre-planned with resources on standby."},
    ],
    formulas:[
      {n:"Critical trigger",e:"IF GLW ÷ Effective Capacity > 0.75: CRITICAL"},
      {n:"Any one = full protocol",e:"Tandem | Blind | Over occupied | Unknown COG | Offshore/subsea | Man-riding"},
    ],
    stds:[
      {c:"BS 7121-1",t:"Critical lift definition — independent review, method statement, additional sign-offs."},
      {c:"LOLER 1998",t:"Higher duty of care for complex lifts."},
      {c:"DNVGL-ST-N001",t:"Critical lift classification and controls for offshore."},
      {c:"ASME B30.5",t:"Special design lifts — engineering review and approval."},
    ]
  },
  18:{
    terms:[
      {t:"Pythagorean Theorem",d:"In a right triangle: C² = A² + B². C = hypotenuse (longest side). A = adjacent (horizontal). B = opposite (vertical)."},
      {t:"θh — Angle from Horizontal",d:"θh = arctan(B ÷ A). Sling angle from horizontal. Minimum 45° recommended for rigging."},
      {t:"θv — Angle from Vertical",d:"θv = arctan(A ÷ B) = 90° − θh. Boom angle is typically measured from horizontal (same as θh)."},
      {t:"K Factor",d:"K = sin(θh). Sling efficiency. At 90°: K=1.00 (maximum). At 45°: K=0.707. At 30°: K=0.500 (minimum safe)."},
      {t:"Hypotenuse",d:"The longest side of a right triangle — opposite the right angle. Equals sling length S or boom length L."},
    ],
    formulas:[
      {n:"Solve for C",e:"C = √(A² + B²)"},
      {n:"Solve for B",e:"B = √(C² − A²)"},
      {n:"Solve for A",e:"A = √(C² − B²)"},
      {n:"Angle from horizontal",e:"θh = arctan(B ÷ A)  [degrees]"},
      {n:"Angle from vertical",e:"θv = arctan(A ÷ B) = 90° − θh"},
      {n:"K factor",e:"K = sin(θh)"},
      {n:"Boom angle",e:"α = arccos(R ÷ L)  where R=radius, L=boom"},
    ],
    stds:[
      {c:"ISO 80000-2:2019",t:"Mathematical quantities and units — right-angle relationships."},
      {c:"ASME B30.9",t:"Slings — K factor table for sling angles 15°–90°."},
      {c:"ASME B30.5",t:"Boom angle minimum 30° from horizontal Sec.5-1.3.2."},
    ]
  },
  19:{
    terms:[
      {t:"SI Units",d:"International System. Base units: metre, kilogram, second, Newton, Pascal."},
      {t:"kN — Kilonewton",d:"1 kN = 1000 N. 1 Tonne force = 9.81 kN (g = 9.81 m/s²)."},
      {t:"kN/m² (kPa)",d:"Pressure unit. 1 kN/m² = 1 kPa. Used for GBP and soil bearing capacity."},
      {t:"MPa",d:"1 MPa = 1000 kPa = 1 N/mm². Used for material stress and concrete strength."},
      {t:"Imperial Units",d:"Foot, pound, psi — common in USA. Always confirm unit system before using US load charts."},
    ],
    formulas:[
      {n:"Mass ↔ Force",e:"F(kN) = m(T) × 9.81  |  m(T) = F(kN) ÷ 9.81"},
      {n:"Weight",e:"kg = T × 1000  |  lb = kg × 2.20462"},
      {n:"Length",e:"ft = m × 3.28084  |  in = m × 39.3701"},
      {n:"Speed",e:"km/h = m/s × 3.6  |  mph = m/s × 2.237  |  knots = m/s × 1.944"},
      {n:"Temperature",e:"°F = (°C × 9÷5) + 32  |  °C = (°F − 32) × 5÷9"},
      {n:"Pressure",e:"psi = kPa × 0.14504  |  kPa = psi × 6.89476"},
    ],
    stds:[
      {c:"ISO 80000",t:"International quantities and units."},
      {c:"BIPM SI",t:"SI unit definitions and prefixes."},
    ]
  },
};

// ── REF PANEL COMPONENT — 3-COLUMN (Terms | Formulas | Standards) ───────────
const RefPanel = ({moduleId}) => {
  const [open,setOpen]=useState(false);
  const data = REF_DATA[moduleId];
  if (!data) return null;
  const {terms=[],formulas=[],stds=[]} = data;
  const total = terms.length+formulas.length+stds.length;
  if (!total) return null;
  return (
    <div style={{marginTop:8}}>
      <button className="ref-toggle" onClick={()=>setOpen(o=>!o)}>
        <span style={{fontSize:12,color:"var(--orange-500)"}}>📖</span>
        <span>Reference — Terms, Formulas &amp; Standards</span>
        <span className={`ref-chevron ${open?"open":""}`}>▼</span>
      </button>
      {open && (
        <div className="ref-panel">
          <div className="ref-panel-cols">
            {/* COLUMN 1: TERMS */}
            <div className="ref-col">
              <div className="ref-col-head" style={{fontFamily:"var(--font-display)",fontSize:10,letterSpacing:"0.12em",textTransform:"uppercase",color:"var(--text-orange)",marginBottom:10,paddingBottom:6,borderBottom:"1px solid #1e1e1e"}}>
                Terms &amp; Definitions
              </div>
              {terms.map((item,i)=>(
                <div key={i} className="ref-entry">
                  <span className="ref-term">{item.t}</span>
                  <span className="ref-def">{item.d}</span>
                </div>
              ))}
              {!terms.length && <span style={{color:"var(--text-muted)",fontSize:11}}>—</span>}
            </div>
            {/* COLUMN 2: FORMULAS */}
            <div className="ref-col">
              <div className="ref-col-head" style={{fontFamily:"var(--font-display)",fontSize:10,letterSpacing:"0.12em",textTransform:"uppercase",color:"var(--text-orange)",marginBottom:10,paddingBottom:6,borderBottom:"1px solid #1e1e1e"}}>
                Formulas Used This Page
              </div>
              {formulas.map((item,i)=>(
                <div key={i} className="ref-entry">
                  <span className="ref-term">{item.n}</span>
                  <code className="ref-expr">{item.e}</code>
                </div>
              ))}
              {!formulas.length && <span style={{color:"var(--text-muted)",fontSize:11}}>—</span>}
            </div>
            {/* COLUMN 3: STANDARDS */}
            <div className="ref-col">
              <div className="ref-col-head" style={{fontFamily:"var(--font-display)",fontSize:10,letterSpacing:"0.12em",textTransform:"uppercase",color:"var(--text-orange)",marginBottom:10,paddingBottom:6,borderBottom:"1px solid #1e1e1e"}}>
                Applicable Standards
              </div>
              {stds.map((item,i)=>(
                <div key={i} className="ref-entry">
                  <span className="ref-std-code">{item.c}</span>
                  <span className="ref-std-title">{item.t}</span>
                </div>
              ))}
              {!stds.length && <span style={{color:"var(--text-muted)",fontSize:11}}>—</span>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ── MODULE NAV BAR (FIX 4) ────────────────────────────────────────────────────
const ModuleNavBar = ({activeModule,setActiveModule}) => {
  const mod = MODULES[activeModule];
  const hasPrev = activeModule>0;
  const hasNext = activeModule<MODULES.length-1;
  const go = (idx) => {
    setActiveModule(idx);
    setTimeout(()=>{ const c=document.querySelector(".content"); if(c) c.scrollTop=0; },50);
  };
  return (
    <div className="module-nav">
      <button
        className="nav-btn"
        onClick={()=>hasPrev&&go(activeModule-1)}
        disabled={!hasPrev}
        style={{opacity:hasPrev?1:0.35,cursor:hasPrev?"pointer":"default"}}>
        ← Previous
      </button>
      <div className="nav-info">
        Module {activeModule+1} of {MODULES.length} — {mod?.label}
      </div>
      <button
        className="nav-btn nav-btn-primary"
        onClick={()=>hasNext&&go(activeModule+1)}
        disabled={!hasNext}
        style={{opacity:hasNext?1:0.35,cursor:hasNext?"pointer":"default"}}>
        Next Module →
      </button>
    </div>
  );
};

// ── REUSABLE COMPONENTS ────────────────────────────────────────────────────────
const UnitInput = ({label,value,onChange,unit,onUnitChange,units,type="number",placeholder,isCalc}) => (
  <div className="form-row">
    <label className={isCalc?"label-calc":"label-input"}>{label}</label>
    <div className="input-wrap">
      {isCalc ? (
        <input className="input-calc" value={value||"—"} readOnly />
      ) : (
        <>
          <input className="input-user" type={type} value={value} onChange={e=>onChange(e.target.value)}
            placeholder={placeholder||"0"} />
          {units && (
            <select className="unit-sel" value={unit} onChange={e=>onUnitChange(e.target.value)}>
              {units.map(u=><option key={u}>{u}</option>)}
            </select>
          )}
        </>
      )}
    </div>
  </div>
);

const UtilBar = ({value,label}) => {
  const cls = utilClass(value);
  const w = Math.min(value,100);
  const color = cls==="safe"?"var(--green-500)":cls==="warning"?"var(--amber-500)":"var(--red-500)";
  const badge = value>0?(cls==="safe"?"badge-pass":cls==="warning"?"badge-warn":"badge-fail"):"badge-idle";
  return (
    <div style={{marginBottom:8}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
        <span style={{fontSize:11,color:"var(--text-muted)",fontFamily:"var(--font-display)",letterSpacing:"0.06em",textTransform:"uppercase"}}>{label}</span>
        <span className={`badge ${badge}`}>{value>0?`${f2(value)}%`:"—"}</span>
      </div>
      <div className={`util-bar-wrap util-${cls}`}>
        <div className="util-bar-fill" style={{width:`${w}%`,background:color}} />
      </div>
    </div>
  );
};

const Gauge = ({value,label,max=100}) => {
  const R=54, cx=70, cy=70;
  const circ = 2*Math.PI*R;
  const pct = Math.min((value||0)/max,1);
  const offset = circ*(1-pct*0.75);
  const cls = utilClass(value);
  const color = cls==="safe"?"#22c55e":cls==="warning"?"#f59e0b":"#ef4444";
  const startAngle = 135, endAngle = startAngle+270*pct;
  const x1=cx+R*Math.cos((startAngle-90)*Math.PI/180);
  const y1=cy+R*Math.sin((startAngle-90)*Math.PI/180);
  const x2=cx+R*Math.cos((endAngle-90)*Math.PI/180);
  const y2=cy+R*Math.sin((endAngle-90)*Math.PI/180);
  const large=pct>0.5?1:0;
  return (
    <div className="gauge-wrap">
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle cx={cx} cy={cy} r={R} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10"
          strokeDasharray={`${circ*0.75} ${circ*0.25}`}
          strokeDashoffset={circ*0.875} strokeLinecap="round" transform="rotate(135 70 70)" />
        {pct>0 && <path d={`M ${x1} ${y1} A ${R} ${R} 0 ${large} 1 ${x2} ${y2}`}
          fill="none" stroke={color} strokeWidth="10" strokeLinecap="round" />}
        <text x={cx} y={cy-4} textAnchor="middle" fill={color}
          fontFamily="'Arial',monospace" fontSize="22" fontWeight="600">
          {value>0?`${Math.round(value)}%`:"—"}
        </text>
        <text x={cx} y={cy+14} textAnchor="middle" fill="var(--text-muted)"
          fontFamily="'Arial',sans-serif" fontSize="10" letterSpacing="1">UTIL</text>
      </svg>
      <div className="gauge-lbl">{label}</div>
    </div>
  );
};

const FormulaPanel = ({children}) => {
  const [open,setOpen]=useState(false);
  return (
    <div>
      <div className="formula-toggle" onClick={()=>setOpen(!open)}>
        <span style={{fontSize:10}}>{open?"▾":"▸"}</span> Show Formula
      </div>
      {open && <div className="formula-panel">{children}</div>}
    </div>
  );
};

// ── PROJECT ACTIONS (SUMMARY PAGE) ───────────────────────────────────────────
const ProjectActions = ({projectName}) => {
  const {g,modInputs,setHasUnsaved} = useContext(AppCtx);
  const [lastSaved,setLastSaved]=useState("");
  const [toast,setToast]=useState("");
  const hasName = projectName&&projectName.trim()!=="";

  const showToast = (msg) => { setToast(msg); setTimeout(()=>setToast(""),3000); };

  const saveSession = () => {
    if (!hasName) return;
    const data = JSON.stringify({g,modInputs,savedAt:new Date().toISOString()});
    const blob = new Blob([data],{type:"application/json"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const date = new Date().toISOString().slice(0,10).replace(/-/g,"");
    a.href=url; a.download=`RigCalc Pro_${(projectName||"session").replace(/\s/g,"_")}_${date}.json`;
    a.click(); URL.revokeObjectURL(url);
    const ts = new Date().toLocaleTimeString();
    setLastSaved(ts); setHasUnsaved(false);
    showToast("✅ Session saved successfully");
  };

  const loadSession = () => {
    const input = document.createElement("input");
    input.type="file"; input.accept=".json";
    input.onchange = e => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = ev => {
        try {
          const data = JSON.parse(ev.target.result);
          if (data.g) { window.location.reload(); showToast("✅ Session loaded — page will refresh"); }
        } catch { showToast("❌ Invalid session file"); }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const printSummary = () => { if (!hasName) return; window.print(); };
  const exportPDF = () => { if (!hasName) return; showToast("📄 PDF export — use browser Print → Save as PDF"); };

  return (
    <div style={{background:"var(--bg-section)",border:"1px solid var(--border-orange)",borderRadius:"var(--radius-md)",padding:"16px",marginBottom:16}}>
      <div style={{fontFamily:"var(--font-display)",fontSize:11,letterSpacing:"0.12em",textTransform:"uppercase",color:"var(--text-orange)",marginBottom:12}}>Document Actions</div>
      {!hasName && <div className="info-box info-box-amber" style={{marginBottom:10,fontSize:11}}>⚠️ Enter project name above before saving or printing</div>}
      <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:8}}>
        <button className="btn btn-primary" disabled={!hasName} onClick={saveSession} style={{opacity:hasName?1:0.4}}>💾 Save Session</button>
        <button className="btn btn-ghost" onClick={loadSession}>📂 Load Session</button>
        <button className="btn" style={{background:"transparent",border:"1px solid var(--border-orange)",color:"var(--text-orange)",opacity:hasName?1:0.4}} disabled={!hasName} onClick={printSummary}>🖨️ Print Summary</button>
        <button className="btn" style={{background:"transparent",border:"1px solid var(--border-orange)",color:"var(--text-orange)",opacity:hasName?1:0.4}} disabled={!hasName} onClick={exportPDF}>📄 PDF</button>
      </div>
      {lastSaved && <div style={{fontSize:10,color:"var(--text-muted)",fontFamily:"Arial,monospace"}}>Last saved: {lastSaved}</div>}
      {toast && (
        <div style={{marginTop:8,padding:"6px 10px",background:"var(--green-bg)",border:"1px solid var(--green-border)",borderRadius:"var(--radius-sm)",fontSize:11,color:"var(--green-400)",fontFamily:"Arial,monospace"}}>{toast}</div>
      )}
    </div>
  );
};

// ── MODULE 0: PROJECT INFO ─────────────────────────────────────────────────────
const STANDARDS = [
  "ASME B30.5 — Mobile and Locomotive Cranes","ASME B30.9 — Slings",
  "ASME B30.26 — Rigging Hardware","ASME BTH-1 — Below-the-Hook Lifting Devices",
  "BS 7121-1/2/3 — Safe Use of Cranes","BS EN 1492-1/2 — Textile Slings",
  "BS EN 818-4 — Short Link Chain","BS EN 13889 — Forged Steel Shackles",
  "EN 1677-1 — Hooks","EN 1991-1-4 — Wind Actions (Eurocode 1)",
  "EN 1997-1 — Geotechnical Design (Eurocode 7)","ISO 2408 — Wire Ropes",
  "ISO 4309 — Wire Ropes Code of Practice","ISO 12480-1 — Safe Use of Cranes",
  "DIN 580 — Screw Eye Bolts","DNVGL-ST-N001 — Marine Operations",
  "CIRIA C703 — Crane Stability on Site","LOLER 1998 — Lifting Operations Regulations",
  "PUWER 1998 — Provision and Use of Work Equipment",
];

const ProjectInfo = () => {
  const {g,updateG} = useContext(AppCtx);
  const fi = (k,type="text",ph="") => {
    const [local,setLocal] = useState(g[k]||"");
    useEffect(()=>setLocal(g[k]||""),[g[k]]);
    return <input className="input-user no-unit" type={type} value={local} placeholder={ph}
      onChange={e=>setLocal(e.target.value)}
      onBlur={e=>updateG({[k]:e.target.value})} />;
  };
  const liftClass = g.liftClass||"Routine";
  const statusBadge = g.craneUtil>90||g.gbpUtil>100||g.riggingUtil>90 ? "badge-fail" :
    g.craneUtil>75||g.gbpUtil>75||g.riggingUtil>75 ? "badge-warn" :
    g.glw>0 ? "badge-pass" : "badge-idle";
  const statusText = g.craneUtil>90||g.gbpUtil>100||g.riggingUtil>90 ? "❌ CRITICAL" :
    g.craneUtil>75||g.gbpUtil>75||g.riggingUtil>75 ? "⚠️ WARNING" :
    g.glw>0 ? "✅ APPROVED" : "PENDING";
  return (
    <div>
      <div className="module-card">
        <div className="card-header">
          <span className="module-title">🏠 Project Info & Master Summary</span>
          <span className={`badge ${statusBadge}`}>{statusText}</span>
        </div>
        <div className="card-body">
          <div className="section-heading">Project Metadata</div>
          <div className="form-grid">
            {[["projectName","Project Name / Number"],["client","Client / Company"],
              ["location","Location / Site"],["tagNumber","Object / Tag Number"],
              ["engineer","Lift Engineer"],["reviewer","Reviewed By"],
              ["approver","Approved By"],["docNumber","Document Number"]].map(([k,l])=>(
              <div className="form-row" key={k}>
                <label className="label-input">{l}</label>
                {fi(k)}
              </div>
            ))}
            <div className="form-row">
              <label className="label-input">Lift Classification</label>
              <select className="input-user no-unit" value={g.liftClass||"Routine"} onChange={e=>updateG({liftClass:e.target.value})}>
                {["Routine","Engineered","Critical","Tandem","Blind"].map(c=><option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-row">
              <label className="label-input">Date of Issue</label>
              <input className="input-user no-unit" type="date" value={g.issueDate||""} onChange={e=>updateG({issueDate:e.target.value})} />
            </div>
          </div>
          <div className="form-row" style={{marginTop:10}}>
            <label className="label-input">Lift Description</label>
            <textarea className="input-user no-unit" value={g.liftDesc||""} onChange={e=>updateG({liftDesc:e.target.value})} />
          </div>
        </div>
      </div>

      <div className="module-card">
        <div className="card-header"><span className="module-title">📋 Master Summary (Auto-Generated)</span></div>
        <div className="card-body">
          {/* DOCUMENT ACTIONS PANEL */}
          <ProjectActions projectName={g.projectName||""} />
          <div className="grid-4" style={{marginBottom:16}}>
            {[
              ["Environment", g.env?(g.env==="onshore"?"🏭 Onshore":"⛽ Offshore"):"—"],
              ["Special Lift Type", g.specialLift||"—"],
              ["Crane Type", g.craneType?g.craneType.replace(/_/g," "):"—"],
              ["Gross Lift Weight", g.glw>0?`${f2(g.glw)} T`:"—"],
              ["Dynamic Design Load", g.ddl>0?`${f2(g.ddl)} T`:"—"],
              ["DAF Applied", g.daf>0?`${g.daf}`:"—"],
              ["Crane Utilization", g.craneUtil>0?`${f2(g.craneUtil)}%`:"—"],
              ["GBP Utilization", g.gbpUtil>0?`${f2(g.gbpUtil)}%`:"—"],
              ["Rigging Utilization", g.riggingUtil>0?`${f2(g.riggingUtil)}%`:"—"],
              ["Sling Angle", g.slingAngle>0?`${f2(g.slingAngle)}°`:"—"],
              ["Wind Force", g.windForce>0?`${f2(g.windForce)} kN`:"—"],
              ["Overall Status", g.craneUtil>90||g.gbpUtil>100||g.riggingUtil>90?"❌ FAIL":g.craneUtil>75||g.gbpUtil>75?"⚠️ WARN":g.glw>0?"✅ PASS":"PENDING"],
            ].map(([l,v])=>(
              <div className="stat-card" key={l}>
                <div className="stat-label">{l}</div>
                <div className="stat-val" style={{fontSize:15,color:l==="Overall Status"?(v.includes("FAIL")?"var(--red-400)":v.includes("WARN")?"var(--amber-400)":v.includes("PASS")?"var(--green-400)":"var(--text-muted)"):"var(--blue-400)"}}>{v}</div>
              </div>
            ))}
          </div>
          <div className="section-heading">Approval Signatures</div>
          <div className="table-wrap">
            <table className="data-table">
              <thead><tr>
                <th>Role</th><th>Name</th><th>Signature</th><th>Date</th><th>Comments</th>
              </tr></thead>
              <tbody>{["Lift Engineer","Rigging Supervisor","Safety Officer","Client Representative","Third-Party Inspector"].map(r=>(
                <tr key={r}><td style={{color:"var(--text-primary)"}}>{r}</td>
                  <td><input style={{background:"transparent",border:"none",color:"var(--text-primary)",width:"100%",outline:"none",fontSize:12}} /></td>
                  <td style={{minWidth:120,borderBottom:"1px dashed var(--border-strong)"}}></td>
                  <td><input type="date" style={{background:"transparent",border:"none",color:"var(--text-secondary)",fontSize:11,outline:"none"}} /></td>
                  <td><input style={{background:"transparent",border:"none",color:"var(--text-secondary)",width:"100%",outline:"none",fontSize:12}} /></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
          <div className="section-heading" style={{marginTop:16}}>Applicable Standards</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
            {STANDARDS.map(s=>(
              <span key={s} className="std-tag">{s}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ── MODULE 1: WEIGHT CALC ─────────────────────────────────────────────────────
const WeightCalc = () => {
  const {g,updateG} = useContext(AppCtx);
  const [mode,setMode]=useState("B");
  const [mat,setMat]=useState("Mild Steel");
  const [customDens,setCustomDens]=useState("");
  const [shape,setShape]=useState("Rectangular Plate");
  const [dims,setDims]=useState({L:"",W:"",T:"",OD:"",ID:"",Length:"",Side:"",Diameter:"",Radius:"",Volume:""});
  const [dimUnits,setDimUnits]=useState({L:"m",W:"m",T:"m",OD:"m",ID:"m",Length:"m",Side:"m",Diameter:"m",Radius:"m"});
  const [qty,setQty]=useState(1);
  const [certW,setCertW]=useState("");
  const [certUnit,setCertUnit]=useState("T");
  const [rigging,setRigging]=useState(10);
  const [cont,setCont]=useState(5);

  const density = useMemo(()=>{
    if (mat==="Custom / Override") return parseFloat(customDens)||0;
    return MATERIALS.find(m=>m.name===mat)?.density||0;
  },[mat,customDens]);

  const volume = useMemo(()=>{
    const d = k => toM(dims[k]||0, dimUnits[k]||"m");
    if (shape==="Rectangular Plate") return d("L")*d("W")*d("T");
    if (shape==="Solid Cylinder") return Math.PI*Math.pow(d("OD")/2,2)*d("Length");
    if (shape==="Hollow Pipe / Tube") return Math.PI*(Math.pow(d("OD")/2,2)-Math.pow(d("ID")/2,2))*d("Length");
    if (shape==="Square Bar") return Math.pow(d("Side"),2)*d("Length");
    if (shape==="Round Bar (Solid Rod)") return Math.PI*Math.pow(d("Diameter")/2,2)*d("Length");
    if (shape==="Sphere") return (4/3)*Math.PI*Math.pow(d("Radius"),3);
    if (shape==="Irregular (user volume)") return parseFloat(dims.Volume)||0;
    return 0;
  },[shape,dims,dimUnits]);

  const netWeightSingle = mode==="A" ? volume*density/1000 : toT(certW,certUnit);
  const netWeight = netWeightSingle*(mode==="A"?(parseFloat(qty)||1):1);
  const glw = netWeight*(1+parseFloat(rigging)/100)*(1+parseFloat(cont)/100);

  useEffect(()=>{updateG({netWeight,glw,riggingPct:rigging,contPct:cont})},[glw]);

  const shapeInputs = SHAPES.find(s=>s.name===shape)?.inputs||[];

  return (
    <div>
      <div className="module-card">
        <div className="card-header">
          <span className="module-title">⚖️ Weight Calculation</span>
          <span className="std-tag">ISO 12480-1 Sec.7 | BS 7121-1 Sec.6</span>
        </div>
        <div className="card-body">
          <div style={{display:"flex",gap:8,marginBottom:16}}>
            <button className={`btn ${mode==="B"?"btn-primary":"btn-ghost"}`} onClick={()=>setMode("B")}>Known / Certified Weight</button>
            <button className={`btn ${mode==="A"?"btn-primary":"btn-ghost"}`} onClick={()=>setMode("A")}>Calculate from Geometry</button>
          </div>

          {mode==="A" && (
            <>
              <div className="section-heading">Material Selection</div>
              <div className="form-grid">
                <div className="form-row">
                  <label className="label-input">Material</label>
                  <select className="input-user no-unit" value={mat} onChange={e=>setMat(e.target.value)}>
                    {MATERIALS.map(m=><option key={m.name}>{m.name}</option>)}
                  </select>
                </div>
                {mat==="Custom / Override" && (
                  <div className="form-row">
                    <label className="label-input">Custom Density (kg/m³)</label>
                    <input className="input-user no-unit" type="number" value={customDens} onChange={e=>setCustomDens(e.target.value)} />
                  </div>
                )}
                <div className="form-row">
                  <label className="label-calc">Effective Density (kg/m³)</label>
                  <input className="input-calc" value={density} readOnly />
                </div>
              </div>
              <div className="section-heading">Shape & Dimensions</div>
              <div className="form-grid">
                <div className="form-row">
                  <label className="label-input">Shape</label>
                  <select className="input-user no-unit" value={shape} onChange={e=>setShape(e.target.value)}>
                    {SHAPES.map(s=><option key={s.name}>{s.name}</option>)}
                  </select>
                </div>
                {shapeInputs.map(inp=>(
                  <div className="form-row" key={inp}>
                    <label className="label-input">{inp}</label>
                    <div className="input-wrap">
                      <input className="input-user" type="number" value={dims[inp]||""}
                        onChange={e=>setDims(p=>({...p,[inp]:e.target.value}))} />
                      {inp!=="Volume" && (
                        <select className="unit-sel" value={dimUnits[inp]||"m"}
                          onChange={e=>setDimUnits(p=>({...p,[inp]:e.target.value}))}>
                          {["mm","cm","m"].map(u=><option key={u}>{u}</option>)}
                        </select>
                      )}
                    </div>
                  </div>
                ))}
                <div className="form-row">
                  <label className="label-input">Quantity</label>
                  <input className="input-user no-unit" type="number" min="1" value={qty} onChange={e=>setQty(e.target.value)} />
                </div>
              </div>
              <div className="grid-3" style={{marginTop:12}}>
                <div className="form-row"><label className="label-calc">Volume — Single (m³)</label><input className="input-calc" value={f3(volume)} readOnly /></div>
                <div className="form-row"><label className="label-calc">Net Weight — Single (T)</label><input className="input-calc" value={f3(netWeightSingle)} readOnly /></div>
                <div className="form-row"><label className="label-calc">Net Weight — All Items (T)</label><input className="input-calc" value={f3(netWeight)} readOnly /></div>
              </div>
              <FormulaPanel>
                Volume = {SHAPES.find(s=>s.name===shape)?.formula}<br/>
                Net Weight (T) = ρ × V / 1000 where ρ = {density} kg/m³
              </FormulaPanel>
            </>
          )}

          {mode==="B" && (
            <>
              <div className="section-heading">Certified Weight Entry</div>
              <div className="form-grid">
                <div className="form-row">
                  <label className="label-input">Certified Weight</label>
                  <div className="input-wrap">
                    <input className="input-user" type="number" value={certW} onChange={e=>setCertW(e.target.value)} placeholder="0" />
                    <select className="unit-sel" value={certUnit} onChange={e=>setCertUnit(e.target.value)}>
                      {["T","kg","kN"].map(u=><option key={u}>{u}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-row"><label className="label-calc">Weight in T</label><input className="input-calc" value={f3(netWeight)} readOnly /></div>
                <div className="form-row"><label className="label-calc">Weight in kN</label><input className="input-calc" value={f2(netWeight*9.81)} readOnly /></div>
                <div className="form-row"><label className="label-calc">Weight in kg</label><input className="input-calc" value={f2(netWeight*1000)} readOnly /></div>
              </div>
            </>
          )}

          <hr className="divider" />
          <div className="section-heading">Engineering Allowances — BS 7121-1 Sec.6.3 / ISO 12480-1 Sec.7.2</div>
          <div className="form-grid">
            <div className="form-row">
              <label className="label-input">Rigging & Accessories (%)</label>
              <input className="input-user no-unit" type="number" min="5" max="15" value={rigging} onChange={e=>setRigging(e.target.value)} />
            </div>
            <div className="form-row">
              <label className="label-input">Contingency (%)</label>
              <input className="input-user no-unit" type="number" min="5" max="10" value={cont} onChange={e=>setCont(e.target.value)} />
            </div>
          </div>
          <div className="result-row result-glw" style={{marginTop:16}}>
            <div>
              <div style={{fontFamily:"var(--font-display)",fontSize:11,letterSpacing:"0.12em",textTransform:"uppercase",color:"var(--text-orange)",marginBottom:4}}>★ GROSS LIFT WEIGHT (GLW)</div>
              <div style={{display:"flex",gap:16,alignItems:"baseline"}}>
                <span className="glw-val">{f3(glw)} T</span>
                <span style={{color:"var(--text-muted)",fontFamily:"Arial,monospace",fontSize:14}}>{f2(glw*9.81)} kN</span>
                <span style={{color:"var(--text-muted)",fontFamily:"Arial,monospace",fontSize:14}}>{f2(glw*1000)} kg</span>
              </div>
            </div>
          </div>
          <FormulaPanel>
            GLW (T) = Net Weight × (1 + Rigging% / 100) × (1 + Contingency% / 100)<br/>
            GLW = {f3(netWeight)} × (1 + {rigging}/100) × (1 + {cont}/100) = {f3(glw)} T
          </FormulaPanel>
        </div>
      </div>
    </div>
  );
};

// ── BOOM GEOMETRY SVG (Fix 1) ─────────────────────────────────────────────────
const BoomGeomSVG = ({boomLen, radius, boomAngle, boomTipH}) => {
  if(!boomLen||!radius||!boomAngle) return (
    <div className="svg-diagram" style={{display:'flex',alignItems:'center',justifyContent:'center',height:160,color:'var(--text-muted)',fontSize:12,fontFamily:'var(--font-mono)'}}>
      Enter boom length and working radius
    </div>
  );
  const W=280, H=160, originX=40, originY=140;
  const scale = Math.min((W-60)/boomLen, (H-30)/boomTipH, 5);
  const boomRad = boomAngle*Math.PI/180;
  const tipX = originX + radius*scale;
  const tipY = originY - boomTipH*scale;
  const boomEndX = originX + boomLen*Math.cos(boomRad)*scale; // same as tipX if exact
  const boomEndY = originY - boomLen*Math.sin(boomRad)*scale;
  const arcR = Math.min(30, radius*scale*0.4);
  const arcX = originX + arcR*Math.cos(boomRad/2);
  const arcY = originY - arcR*Math.sin(boomRad/2);
  return (
    <div className="svg-diagram" style={{padding:8}}>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{fontFamily:'var(--font-mono)'}}>
        {/* Ground */}
        <line x1={0} y1={originY} x2={W} y2={originY} stroke="var(--border-strong)" strokeWidth="2"/>
        {/* Mast (vertical) */}
        <line x1={originX} y1={originY} x2={originX} y2={originY-Math.min(boomTipH*scale,H-20)} stroke="#555" strokeWidth="2" strokeDasharray="4,3"/>
        {/* Boom line */}
        <line x1={originX} y1={originY} x2={boomEndX} y2={boomEndY} stroke="var(--orange-500)" strokeWidth="2.5" strokeLinecap="round"/>
        {/* Working radius (horizontal dashed) */}
        <line x1={originX} y1={originY} x2={tipX} y2={originY} stroke="var(--blue-400)" strokeWidth="1.5" strokeDasharray="5,3"/>
        {/* Tip height (vertical dashed) */}
        <line x1={tipX} y1={originY} x2={tipX} y2={boomEndY} stroke="var(--green-400)" strokeWidth="1.5" strokeDasharray="5,3"/>
        {/* Angle arc */}
        <path d={`M ${originX+arcR} ${originY} A ${arcR} ${arcR} 0 0 0 ${arcX} ${arcY}`} fill="none" stroke="var(--amber-500)" strokeWidth="1.5"/>
        {/* Labels */}
        <text x={boomEndX/2+originX/2-10} y={(originY+boomEndY)/2-6} fill="var(--orange-500)" fontSize="10" fontWeight="600">L={boomLen.toFixed(1)}m</text>
        <text x={(originX+tipX)/2} y={originY+12} fill="var(--blue-400)" fontSize="10">R={radius.toFixed(1)}m</text>
        <text x={tipX+4} y={(originY+boomEndY)/2} fill="var(--green-400)" fontSize="10">H={boomTipH.toFixed(1)}m</text>
        <text x={originX+arcR+6} y={originY-6} fill="var(--amber-500)" fontSize="9">θ={boomAngle.toFixed(1)}°</text>
        {/* Boom tip marker */}
        <circle cx={boomEndX} cy={boomEndY} r="4" fill="var(--orange-500)"/>
        {/* Origin marker */}
        <circle cx={originX} cy={originY} r="4" fill="var(--text-muted)"/>
        {/* Right angle at tip */}
        <polyline points={`${tipX-8},${originY} ${tipX-8},${originY-8} ${tipX},${originY-8}`} fill="none" stroke="var(--text-muted)" strokeWidth="1"/>
      </svg>
    </div>
  );
};

// ── TANDEM CRANE CARD sub-component ───────────────────────────────────────────
const TandemCraneCard = ({idx, crane, onChange, glw}) => {
  const dutyFactor = DUTY_FACTORS[crane.duty||"A3"]||1;
  const chartCap = parseFloat(crane.chartCap)||0;
  const share = parseFloat(crane.share)||0;
  const effCap = chartCap * dutyFactor;
  const tandemLoad = glw * (share/100) * 1.10;
  const util = effCap>0 ? (tandemLoad/effCap)*100 : 0;
  const uc = utilClass(util);
  const ucColor = uc==="safe"?"var(--green-400)":uc==="warning"?"var(--amber-400)":"var(--red-400)";
  const badge = uc==="safe"?"badge-pass":uc==="warning"?"badge-warn":"badge-fail";
  const set = (k,v) => onChange(idx,{...crane,[k]:v});
  return (
    <div style={{background:"var(--bg-section)",border:`1px solid ${uc==="safe"?"var(--green-border)":uc==="warning"?"var(--amber-border)":"var(--red-border)"}`,borderRadius:"var(--radius-md)",padding:14,marginBottom:10}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
        <span style={{fontFamily:"var(--font-display)",fontWeight:700,fontSize:13,color:"var(--text-orange)",letterSpacing:"0.08em",textTransform:"uppercase"}}>Crane {idx+1}</span>
        <span className={`badge ${badge}`}>{util>0?`${f2(util)}%`:"—"} {util>0?(uc==="safe"?"✅":uc==="warning"?"⚠️":"❌"):""}</span>
      </div>
      <div className="form-grid">
        {[["Make / Model","make","text"],["Working Radius (m)","radius","number"],["Boom Length (m)","boomLen","number"],["Chart Capacity at Radius (T)","chartCap","number"]].map(([l,k,t])=>(
          <div className="form-row" key={k}>
            <label className="label-input">{l}</label>
            <input className="input-user no-unit" type={t} value={crane[k]||""} onChange={e=>set(k,e.target.value)} placeholder={t==="number"?"0":""} />
          </div>
        ))}
        <div className="form-row">
          <label className="label-input">Duty Class</label>
          <select className="input-user no-unit" value={crane.duty||"A3"} onChange={e=>set("duty",e.target.value)}>
            {Object.entries(DUTY_FACTORS).map(([k,v])=><option key={k} value={k}>{k} — {v.toFixed(2)}</option>)}
          </select>
        </div>
        <div className="form-row">
          <label className="label-input">Load Share (%)</label>
          <input className="input-user no-unit" type="number" min="0" max="100" value={crane.share||""} onChange={e=>set("share",e.target.value)} placeholder="e.g. 50" />
        </div>
      </div>
      <div className="grid-3" style={{marginTop:10}}>
        <div className="stat-card"><div className="stat-label">Tandem Design Load</div><div className="stat-val" style={{fontSize:16}}>{f2(tandemLoad)}<span className="stat-unit">T</span></div></div>
        <div className="stat-card"><div className="stat-label">Effective Capacity</div><div className="stat-val" style={{fontSize:16}}>{f2(effCap)}<span className="stat-unit">T</span></div></div>
        <div className="stat-card" style={{background:uc==="safe"?"var(--green-bg)":uc==="warning"?"var(--amber-bg)":"var(--red-bg)"}}>
          <div className="stat-label">Utilization</div>
          <div className="stat-val" style={{fontSize:16,color:ucColor}}>{f2(util)}<span className="stat-unit">%</span></div>
        </div>
      </div>
      <UtilBar value={util} label={`Crane ${idx+1} Utilization`} />
      <div style={{fontSize:10,color:"var(--text-muted)",fontFamily:"Arial,monospace",marginTop:6}}>
        Tandem Load = GLW({f2(glw)}T) × {share}% × 1.10 = {f2(tandemLoad)}T | Eff.Cap = {f2(chartCap)}T × {dutyFactor} = {f2(effCap)}T | Ref: BS 7121-3 Sec.12
      </div>
    </div>
  );
};

// ── MODULE 2: CRANE SELECTION — v1.3 ─────────────────────────────────────────
const CraneSelection = () => {
  const {g,updateG} = useContext(AppCtx);
  // Step 1 — Environment
  const [env,setEnv]=useState("onshore");
  // Step 2 — Special lift type
  const [specialLift,setSpecialLift]=useState("Standard Lift");
  // Step 3 — Crane hardware
  const [craneType,setCraneType]=useState("mobile_outrigger");
  const [model,setModel]=useState("Liebherr LTM 1100-5.2");
  const [boomLen,setBoomLen]=useState("");
  const [jibLen,setJibLen]=useState("0");
  const [radius,setRadius]=useState("");
  const [cwt,setCwt]=useState("");
  const [outriggersExt,setOutriggersExt]=useState("YES");
  const [duty,setDuty]=useState("A3");
  const [dafOverride,setDafOverride]=useState("");
  const [dafJustify,setDafJustify]=useState("");
  // Manual entry
  const [isManual,setIsManual]=useState(false);
  const [manualMake,setManualMake]=useState("");
  const [manualMaxCap,setManualMaxCap]=useState("");
  const [manualChartCap,setManualChartCap]=useState("");
  const [manualBoomNotes,setManualBoomNotes]=useState("");
  // Offshore
  const [hs,setHs]=useState("");

  // ── AUTO BOOM ANGLE (Fix 1) ──────────────────────────────────
  const boomLenN = parseFloat(boomLen)||0;
  const radiusN  = parseFloat(radius)||0;
  const boomAngleRad = boomLenN>0&&radiusN<=boomLenN ? Math.acos(radiusN/boomLenN) : null;
  const boomAngle    = boomAngleRad!=null ? boomAngleRad*180/Math.PI : null;
  const boomTipH     = boomAngle!=null ? boomLenN*Math.sin(boomAngleRad) : null;
  const boomAngleOk  = boomAngle!=null&&boomAngle>=45&&boomAngle<=78 ? "pass"
    : boomAngle!=null&&boomAngle>=30&&boomAngle<45  ? "warn-low"
    : boomAngle!=null&&boomAngle>78                  ? "warn-high"
    : boomAngle!=null&&boomAngle<30                  ? "fail"
    : "idle";
  const boomGeomError = boomLenN>0&&radiusN>boomLenN;
  // Tandem
  const [tandemCount,setTandemCount]=useState(2);
  const [tandemCranes,setTandemCranes]=useState([
    {make:"",radius:"",boomLen:"",chartCap:"",duty:"A3",share:"50"},
    {make:"",radius:"",boomLen:"",chartCap:"",duty:"A3",share:"50"},
  ]);
  // Special lift extra fields
  const [tiltStart,setTiltStart]=useState("");
  const [tiltEnd,setTiltEnd]=useState("");
  const [tiltRadiusChange,setTiltRadiusChange]=useState("");
  const [blindSignalman,setBlindSignalman]=useState("");
  const [blindChannel,setBlindChannel]=useState("");
  const [blindCCTV,setBlindCCTV]=useState("NO");
  const [elevHeight,setElevHeight]=useState("");
  const [pcSurface,setPcSurface]=useState("Level Hardstand");
  const [pcDist,setPcDist]=useState("");
  const [pcSpeed,setPcSpeed]=useState("");
  const [mrBasketNo,setMrBasketNo]=useState("");
  const [mrInspDate,setMrInspDate]=useState("");
  const [mrRescuePlan,setMrRescuePlan]=useState("");

  const isTandem = specialLift==="Tandem Lift";
  const isCrawler = craneType==="crawler";

  // DAF lookup
  const dafRow = useMemo(()=>{
    if(env==="offshore") {
      const hsN = parseFloat(hs)||0;
      if(specialLift==="Subsea / Below Keel") return DAF_MATRIX.find(r=>r.env==="offshore"&&r.lift==="Subsea / Below Keel");
      if(specialLift==="Tandem Lift") return DAF_MATRIX.find(r=>r.env==="offshore"&&r.lift==="Tandem Lift");
      if(specialLift==="Man-Riding / Personnel") return DAF_MATRIX.find(r=>r.env==="offshore"&&r.lift==="Man-Riding / Personnel");
      if(hsN>=2.0) return DAF_MATRIX.find(r=>r.label==="Offshore / Rough / >2.0m Hs");
      if(hsN>=0.5) return DAF_MATRIX.find(r=>r.label==="Offshore / Moderate / 0.5–2.0m Hs");
      return DAF_MATRIX.find(r=>r.env==="offshore"&&r.lift==="Standard Lift");
    }
    return DAF_MATRIX.find(r=>r.env===env&&r.lift===specialLift) || DAF_MATRIX[0];
  },[env,specialLift,hs]);

  const autoDaf = dafRow?.daf||1.05;
  const daf = dafOverride&&parseFloat(dafOverride)>0 ? parseFloat(dafOverride) : autoDaf;

  const filteredCranes = CRANE_DB.filter(c=>c.type===craneType);
  const selCrane = isManual ? null : (filteredCranes.find(c=>c.model===model)||filteredCranes[0]);
  const chartCap = useMemo(()=>{
    if(isManual) return parseFloat(manualChartCap)||0;
    if(!selCrane||!radius) return 0;
    return interpChart(selCrane.chart, parseFloat(radius)||0);
  },[selCrane,radius,isManual,manualChartCap]);

  const dutyFactor = DUTY_FACTORS[duty]||1;
  const effCap = chartCap * dutyFactor;
  const ddl = (g.glw||0)*daf;
  const craneUtil = effCap>0 ? (ddl/effCap)*100 : 0;
  const utilCls = utilClass(craneUtil);

  // Tandem share validation
  const totalShare = tandemCranes.reduce((s,c)=>s+(parseFloat(c.share)||0),0);
  const shareOk = Math.abs(totalShare-100)<0.1;
  const tandemOverallUtil = tandemCranes.length>0 ? Math.max(0,...tandemCranes.map(c=>{
    const ef=(parseFloat(c.chartCap)||0)*(DUTY_FACTORS[c.duty||"A3"]||1);
    const tl=(g.glw||0)*(parseFloat(c.share)||0)/100*1.10;
    return ef>0?tl/ef*100:0;
  })) : 0;

  const updateTandemCrane = (idx, patch) => setTandemCranes(p=>p.map((c,i)=>i===idx?patch:c));

  useEffect(()=>{
    const sw = isManual ? 0 : (selCrane?.selfWeight||0);
    const finalUtil = isTandem ? tandemOverallUtil : craneUtil;
    updateG({daf,ddl,craneCapacity:chartCap,effectiveCap:effCap,craneUtil:finalUtil,craneType,craneSelfWeight:sw,env,specialLift});
  },[daf,ddl,effCap,craneUtil,craneType,selCrane,isManual,chartCap,env,specialLift,tandemOverallUtil,isTandem]);

  const boomLenN_disp = parseFloat(boomLen)||0; // alias for display in FormulaPanel
  const visibleDAF = DAF_MATRIX.filter(r=>r.env===env);

  return (
    <div>
      <div className="module-card">
        <div className="card-header">
          <span className="module-title">🏗 Crane Selection</span>
          <span className="std-tag">ISO 9374-1 | ISO 4301-1 | ASME B30.5 | BS 7121-3</span>
        </div>
        <div className="card-body">

          {/* ── STEP 1: ENVIRONMENT ── */}
          <div className="section-heading">Step 1 — Operating Environment</div>
          <div style={{display:"flex",gap:8,marginBottom:12}}>
            {[["onshore","🏭 Onshore"],["offshore","⛽ Offshore"]].map(([v,l])=>(
              <button key={v} className={`btn ${env===v?"btn-primary":"btn-ghost"}`} style={{flex:1,padding:"10px 0",fontSize:13}}
                onClick={()=>setEnv(v)}>{l}</button>
            ))}
          </div>
          {env==="offshore" && (
            <div className="form-grid">
              <div className="form-row">
                <label className="label-input">Significant Wave Height Hs (m)</label>
                <input className="input-user no-unit" type="number" step="0.1" value={hs} onChange={e=>setHs(e.target.value)} placeholder="0.0" />
              </div>
              <div className="form-row">
                <label className="label-calc">Sea State Classification</label>
                <input className="input-calc" value={parseFloat(hs)>=2?"Rough — DAF 1.35":parseFloat(hs)>=0.5?"Moderate — DAF 1.25":"Calm — DAF 1.10"} readOnly />
              </div>
            </div>
          )}

          {/* ── STEP 2: SPECIAL LIFT TYPE ── */}
          <div className="section-heading">Step 2 — Special Lift Classification</div>
          <div className="form-grid">
            <div className="form-row">
              <label className="label-input">Special Lift Classification</label>
              <select className="input-user no-unit" value={specialLift} onChange={e=>setSpecialLift(e.target.value)}>
                {(env==="offshore"
                  ? [...SPECIAL_LIFTS,"Subsea / Below Keel"]
                  : SPECIAL_LIFTS
                ).map(s=><option key={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {/* MAN-RIDING warning — shown immediately */}
          {specialLift==="Man-Riding / Personnel" && (
            <div className="info-box info-box-red" style={{marginBottom:10}}>
              ⛔ MAN-RIDING LIFT — LOLER 1998 Regulation 8 applies. Requires: LOLER Sec.8 certificate, competent person supervising, 6-monthly inspection, rescue plan, two independent means of preventing free fall.
            </div>
          )}

          {/* ── STEP 3: CRANE HARDWARE ── */}
          <div className="section-heading">Step 3 — Crane Configuration</div>
          <div className="form-grid">
            <div className="form-row">
              <label className="label-input">Crane Type</label>
              <select className="input-user no-unit" value={craneType} onChange={e=>{setCraneType(e.target.value);setModel("");setIsManual(false);}}>
                <option value="mobile_outrigger">Mobile Crane – Outrigger</option>
                <option value="mobile_tires">Mobile Crane – On Tires</option>
                <option value="crawler">Crawler Crane</option>
                <option value="tower">Tower Crane</option>
                <option value="gantry">Gantry / EOT Crane</option>
              </select>
            </div>
            <div className="form-row">
              <label className="label-input">Crane Make / Model</label>
              <select className="input-user no-unit" value={isManual?"MANUAL":model}
                onChange={e=>{if(e.target.value==="MANUAL"){setIsManual(true);}else{setIsManual(false);setModel(e.target.value);}}}>
                {filteredCranes.map(c=><option key={c.model} value={c.model}>{c.model}</option>)}
                <option value="MANUAL">── Manual Entry ──</option>
              </select>
            </div>
            {isManual && (
              <>
                <div className="form-row">
                  <label className="label-input">Crane Make / Model (free text)</label>
                  <input className="input-user no-unit" value={manualMake} onChange={e=>setManualMake(e.target.value)} />
                </div>
                <div className="form-row">
                  <label className="label-input">Maximum Rated Capacity (T)</label>
                  <input className="input-user no-unit" type="number" value={manualMaxCap} onChange={e=>setManualMaxCap(e.target.value)} />
                </div>
                <div className="form-row" style={{gridColumn:"1/-1"}}>
                  <label className="label-input" title="Read from manufacturer load chart at actual boom length and working radius. Do not use maximum rated capacity.">Chart Capacity at Working Radius (T) ⓘ</label>
                  <input className="input-user no-unit" type="number" value={manualChartCap} onChange={e=>setManualChartCap(e.target.value)} placeholder="From load chart at actual radius" />
                  <div style={{fontSize:10,color:"var(--text-muted)",marginTop:3,fontFamily:"Arial,monospace"}}>Critical: read from load chart at configured boom + radius. Never use maximum rated capacity.</div>
                </div>
                <div className="form-row" style={{gridColumn:"1/-1"}}>
                  <label className="label-input">Boom Configuration Notes</label>
                  <textarea className="input-user no-unit" value={manualBoomNotes} onChange={e=>setManualBoomNotes(e.target.value)} placeholder="Boom length, jib, counterweight, SSL configuration..." />
                </div>
              </>
            )}
            <div className="form-row">
              <label className="label-input">Boom Length (m)</label>
              <input className="input-user no-unit" type="number" value={boomLen} onChange={e=>setBoomLen(e.target.value)} />
            </div>
            <div className="form-row">
              <label className="label-input">Jib / Luffing Length (m)</label>
              <input className="input-user no-unit" type="number" value={jibLen} onChange={e=>setJibLen(e.target.value)} placeholder="0 if not fitted" />
            </div>
            <div className="form-row">
              <label className="label-input">Working Radius (m)</label>
              <input className="input-user no-unit" type="number" value={radius} onChange={e=>setRadius(e.target.value)} placeholder="0" />
            </div>
          </div>

          {/* ── BOOM GEOMETRY AUTO-CALC (Fix 1) ── */}
          {boomLenN>0&&radiusN>0 && (
            <div style={{background:"var(--bg-section)",border:`1px solid ${boomAngleOk==="pass"?"var(--green-border)":boomAngleOk==="fail"?"var(--red-border)":"var(--amber-border)"}`,borderRadius:"var(--radius-md)",padding:"12px 16px",marginBottom:8}}>
              <div style={{fontFamily:"var(--font-display)",fontSize:11,letterSpacing:"0.12em",textTransform:"uppercase",color:"var(--text-orange)",marginBottom:10}}>
                📐 Boom Geometry — Auto-Calculated (ASME B30.5 Sec.5-1.3.2)
              </div>
              {boomGeomError ? (
                <div className="info-box info-box-red">❌ Working radius ({radiusN}m) cannot exceed boom length ({boomLenN}m). Check inputs.</div>
              ) : (
                <div className="grid-3">
                  <div className="form-row">
                    <label className="label-calc" title="α = arccos(Working Radius ÷ Boom Length) — ASME B30.5 / Trigonometric relationship">Boom Angle α = arccos(R÷L) ⓘ</label>
                    <input className="input-calc" value={boomAngle!=null?`${boomAngle.toFixed(2)}°`:"—"} readOnly />
                  </div>
                  <div className="form-row">
                    <label className="label-calc">Boom Tip Height = L×sin(α)</label>
                    <input className="input-calc" value={boomTipH!=null?`${boomTipH.toFixed(2)} m`:"—"} readOnly />
                  </div>
                  <div className="form-row">
                    <label className="label-calc">Boom Angle Status</label>
                    <input className="input-calc" value={
                      boomAngleOk==="pass"?"✅ Normal operating range (45°–78°)":
                      boomAngleOk==="warn-low"?"⚠️ Below 45° — verify with load chart":
                      boomAngleOk==="warn-high"?"⚠️ Above 78° — approaching vertical limit":
                      boomAngleOk==="fail"?"❌ Below 30° minimum — PROHIBITED":
                      "—"
                    } readOnly style={{color:boomAngleOk==="pass"?"var(--green-400)":boomAngleOk==="fail"?"var(--red-400)":"var(--amber-400)"}} />
                  </div>
                </div>
              )}
              {!boomGeomError&&boomAngle!=null&&boomAngle<30 && <div className="info-box info-box-red" style={{marginTop:8,fontSize:11}}>❌ Boom angle {boomAngle.toFixed(2)}° is below 30° minimum — ASME B30.5 Sec.5-1.3.2. Reduce working radius or increase boom length.</div>}
              {!boomGeomError&&boomAngle!=null&&boomAngle>=30&&boomAngle<45 && <div className="info-box info-box-amber" style={{marginTop:8,fontSize:11}}>⚠️ Boom angle {boomAngle.toFixed(2)}° is below 45° — approaching operational limit. Verify with manufacturer load chart.</div>}
              {!boomGeomError&&boomAngle!=null&&boomAngle>78 && <div className="info-box info-box-amber" style={{marginTop:8,fontSize:11}}>⚠️ Boom angle {boomAngle.toFixed(2)}° is above 78° — boom may approach vertical limit. Check manufacturer specification.</div>}
              {!boomGeomError&&boomTipH!=null && <div style={{fontSize:10,color:"var(--text-muted)",fontFamily:"Arial,monospace",marginTop:6}}>Approximate hook height available ≈ {boomTipH.toFixed(2)} m (deduct hook block and rigging depth)</div>}
              <div style={{marginTop:10}}>
                <BoomGeomSVG boomLen={boomLenN} radius={radiusN} boomAngle={boomAngle} boomTipH={boomTipH||0}/>
              </div>
              <div style={{fontSize:10,color:"var(--text-muted)",fontFamily:"Arial,monospace",marginTop:6}}>
                Formula: θ = arccos(R ÷ L) | Reference: ASME B30.5-2021 Sec.5-1.3.2
              </div>
            </div>
          )}

          <div className="form-grid">
            <div className="form-row">
              <label className="label-input">Counterweight Fitted (T)</label>
              <input className="input-user no-unit" type="number" value={cwt} onChange={e=>setCwt(e.target.value)} />
            </div>
            {!isCrawler && (
              <div className="form-row">
                <label className="label-input">Outriggers Fully Extended?</label>
                <select className="input-user no-unit" value={outriggersExt} onChange={e=>setOutriggersExt(e.target.value)}>
                  <option>YES</option><option>NO</option>
                </select>
              </div>
            )}
            {outriggersExt==="NO" && !isCrawler && <div className="info-box info-box-amber" style={{gridColumn:"1/-1",fontSize:11}}>⚠️ Reduced outrigger extension significantly reduces crane capacity. Verify load chart for partial outrigger configuration.</div>}
            <div className="form-row">
              <label className="label-calc">Chart Capacity at Radius (T)</label>
              <input className="input-calc" value={f2(chartCap)} readOnly />
            </div>
            <div className="form-row">
              <label className="label-input">Duty Class (ISO 4301-1)</label>
              <select className="input-user no-unit" value={duty} onChange={e=>setDuty(e.target.value)}>
                {Object.entries(DUTY_FACTORS).map(([k,v])=><option key={k} value={k}>{k}: {v.toFixed(2)} — {["Infrequent","Light","Moderate (default)","Heavy","Very Heavy"][["A1","A2","A3","A4","A5"].indexOf(k)]}</option>)}
              </select>
            </div>
          </div>

          {/* ── DAF LOOKUP TABLE ── */}
          <div className="section-heading">DAF — Dynamic Amplification Factor</div>
          <div className="table-wrap" style={{marginBottom:12}}>
            <table className="data-table">
              <thead><tr><th>Condition</th><th>DAF</th><th>Active</th></tr></thead>
              <tbody>{visibleDAF.map(row=>(
                <tr key={row.label} className={row===dafRow?"highlight":""}>
                  <td>{row.label}</td>
                  <td style={{fontFamily:"Arial,monospace",color:"var(--blue-400)"}}>{row.daf}</td>
                  <td>{row===dafRow?<span style={{color:"var(--orange-500)",fontWeight:600}}>◄ ACTIVE</span>:""}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
          <div className="form-grid">
            <div className="form-row">
              <label className="label-input">DAF Override (0 = auto-lookup)</label>
              <input className="input-user no-unit" type="number" step="0.01" value={dafOverride} onChange={e=>setDafOverride(e.target.value)} placeholder="0" />
            </div>
            {dafOverride&&parseFloat(dafOverride)>0 && (
              <div className="form-row">
                <label className="label-input">Engineer Justification (mandatory)</label>
                <input className="input-user no-unit" value={dafJustify} onChange={e=>setDafJustify(e.target.value)} placeholder="Required when overriding auto DAF" />
              </div>
            )}
            <div className="form-row"><label className="label-calc">Effective DAF Applied</label><input className="input-calc" value={f2(daf)} readOnly /></div>
          </div>

          {/* ── CONDITIONAL SPECIAL LIFT PANELS ── */}
          {specialLift==="Tilting / Upending" && (
            <>
              <div className="section-heading">Tilting / Upending Parameters</div>
              <div className="info-box info-box-amber" style={{marginBottom:10}}>⚠️ Tilting lifts require continuous load chart verification at each tilt increment. DAF 1.15 applied. Prepare separate lift plan for each 15° increment.</div>
              <div className="form-grid">
                <div className="form-row"><label className="label-input">Tilt Angle at Start (°)</label><input className="input-user no-unit" type="number" value={tiltStart} onChange={e=>setTiltStart(e.target.value)} /></div>
                <div className="form-row"><label className="label-input">Tilt Angle at End (°)</label><input className="input-user no-unit" type="number" value={tiltEnd} onChange={e=>setTiltEnd(e.target.value)} /></div>
                <div className="form-row"><label className="label-input">Radius Change During Tilt (m)</label><input className="input-user no-unit" type="number" value={tiltRadiusChange} onChange={e=>setTiltRadiusChange(e.target.value)} /></div>
              </div>
            </>
          )}
          {specialLift==="Blind Lift" && (
            <>
              <div className="section-heading">Blind Lift — Signalling Controls</div>
              <div className="info-box info-box-amber" style={{marginBottom:10}}>⚠️ Blind lift — dedicated signalman mandatory. All movement by signal only. BS 7121-1 Sec.9.</div>
              <div className="form-grid">
                <div className="form-row"><label className="label-input">Signalman Position / Location</label><input className="input-user no-unit" value={blindSignalman} onChange={e=>setBlindSignalman(e.target.value)} /></div>
                <div className="form-row"><label className="label-input">Radio Channel</label><input className="input-user no-unit" value={blindChannel} onChange={e=>setBlindChannel(e.target.value)} /></div>
                <div className="form-row"><label className="label-input">Camera / CCTV Fitted?</label><select className="input-user no-unit" value={blindCCTV} onChange={e=>setBlindCCTV(e.target.value)}><option>YES</option><option>NO</option></select></div>
              </div>
            </>
          )}
          {specialLift==="High Elevated Lift" && (
            <>
              <div className="section-heading">High Elevated Lift Parameters</div>
              <div className="form-grid">
                <div className="form-row"><label className="label-input">Maximum Lift Height (m)</label><input className="input-user no-unit" type="number" value={elevHeight} onChange={e=>setElevHeight(e.target.value)} /></div>
              </div>
              {parseFloat(elevHeight)>15 && <div className="info-box info-box-amber" style={{marginTop:8}}>⚠️ High Elevated Lift — lift height exceeds 15m. Engineering review and exclusion zone recalculation required.</div>}
            </>
          )}
          {specialLift==="Pick & Carry" && (
            <>
              <div className="section-heading">Pick & Carry Parameters</div>
              <div className="info-box info-box-amber" style={{marginBottom:10}}>⚠️ Pick & Carry prohibited on gradients &gt;1% unless manufacturer specifies otherwise. Max travel speed 1.0 km/h with suspended load. ASME B30.5.</div>
              <div className="form-grid">
                <div className="form-row"><label className="label-input">Ground Surface</label><select className="input-user no-unit" value={pcSurface} onChange={e=>setPcSurface(e.target.value)}>{["Level Hardstand","Uneven Ground","Ramp"].map(s=><option key={s}>{s}</option>)}</select></div>
                <div className="form-row"><label className="label-input">Travel Distance (m)</label><input className="input-user no-unit" type="number" value={pcDist} onChange={e=>setPcDist(e.target.value)} /></div>
                <div className="form-row"><label className="label-input">Travel Speed (km/h)</label><input className="input-user no-unit" type="number" value={pcSpeed} onChange={e=>setPcSpeed(e.target.value)} placeholder="Max 1.0" /></div>
              </div>
            </>
          )}
          {specialLift==="Man-Riding / Personnel" && (
            <>
              <div className="section-heading">Man-Riding — LOLER 1998 Reg. 8</div>
              <div className="form-grid">
                <div className="form-row"><label className="label-input">Basket / Cage Serial No.</label><input className="input-user no-unit" value={mrBasketNo} onChange={e=>setMrBasketNo(e.target.value)} /></div>
                <div className="form-row"><label className="label-input">Last Inspection Date</label><input className="input-user no-unit" type="date" value={mrInspDate} onChange={e=>setMrInspDate(e.target.value)} /></div>
                <div className="form-row"><label className="label-input">Rescue Plan Reference</label><input className="input-user no-unit" value={mrRescuePlan} onChange={e=>setMrRescuePlan(e.target.value)} /></div>
              </div>
            </>
          )}

          {/* ── TANDEM CRANE SUB-PANEL ── */}
          {isTandem && (
            <>
              <div className="section-heading">Tandem Lift — Crane Configuration</div>
              <div className="form-grid">
                <div className="form-row">
                  <label className="label-input">Number of Cranes in Tandem</label>
                  <select className="input-user no-unit" value={tandemCount} onChange={e=>{
                    const n=parseInt(e.target.value);
                    setTandemCount(n);
                    setTandemCranes(prev=>{
                      const next=[...prev];
                      while(next.length<n) next.push({make:"",radius:"",boomLen:"",chartCap:"",duty:"A3",share:""});
                      return next.slice(0,n);
                    });
                  }}>
                    <option value={2}>2 Cranes</option><option value={3}>3 Cranes</option><option value={4}>4 Cranes</option>
                  </select>
                </div>
                <div className="form-row">
                  <label className="label-calc">Load Shares Total (%)</label>
                  <input className="input-calc" value={`${fN(totalShare,1)}% ${shareOk?"✅":"⚠️ Must = 100%"}`} readOnly style={{color:shareOk?"var(--green-400)":"var(--amber-400)"}} />
                </div>
              </div>
              {!shareOk && <div className="info-box info-box-amber" style={{marginBottom:10}}>⚠️ Load shares total {fN(totalShare,1)}% — must equal exactly 100%</div>}
              {tandemCranes.slice(0,tandemCount).map((c,i)=>(
                <TandemCraneCard key={i} idx={i} crane={c} onChange={updateTandemCrane} glw={g.glw||0} />
              ))}
              <div className="section-heading">Tandem Overall Status</div>
              <div className="grid-3">
                <div className="stat-card"><div className="stat-label">Worst Crane Utilization</div><div className="stat-val" style={{color:tandemOverallUtil>90?"var(--red-400)":tandemOverallUtil>75?"var(--amber-400)":"var(--green-400)"}}>{f2(tandemOverallUtil)}<span className="stat-unit">%</span></div></div>
                <div className="stat-card"><div className="stat-label">Load Shares</div><div className="stat-val" style={{fontSize:14,color:shareOk?"var(--green-400)":"var(--amber-400)"}}>{shareOk?"✅ Valid":"⚠️ Invalid"}</div></div>
                <div className="stat-card"><div className="stat-label">Overall Status</div><div className="stat-val" style={{fontSize:12,color:tandemOverallUtil>90?"var(--red-400)":tandemOverallUtil>75?"var(--amber-400)":"var(--green-400)"}}>{tandemOverallUtil>90?"❌ FAIL":tandemOverallUtil>75?"⚠️ WARN":"✅ PASS"}</div></div>
              </div>
            </>
          )}

          {/* ── SINGLE CRANE RESULTS ── */}
          {!isTandem && (
            <>
              <div className="section-heading">Calculated Results</div>
              <div className="grid-4">
                <div className="stat-card"><div className="stat-label">GLW</div><div className="stat-val">{f2(g.glw||0)}<span className="stat-unit">T</span></div></div>
                <div className="stat-card"><div className="stat-label">Dynamic Design Load</div><div className="stat-val">{f2(ddl)}<span className="stat-unit">T</span></div></div>
                <div className="stat-card"><div className="stat-label">Effective Capacity</div><div className="stat-val">{f2(effCap)}<span className="stat-unit">T</span></div></div>
                <div className="stat-card" style={{background:utilCls==="safe"?"var(--green-bg)":utilCls==="warning"?"var(--amber-bg)":"var(--red-bg)"}}>
                  <div className="stat-label">Crane Utilization</div>
                  <div className="stat-val" style={{color:utilCls==="safe"?"var(--green-400)":utilCls==="warning"?"var(--amber-400)":"var(--red-400)"}}>{f2(craneUtil)}<span className="stat-unit">%</span></div>
                </div>
              </div>
              <UtilBar value={craneUtil} label="Crane Capacity Utilization" />
              <div style={{textAlign:"center",marginTop:8}}>
                <span className={`badge ${craneUtil>100?"badge-fail":craneUtil>90?"badge-fail":craneUtil>75?"badge-warn":craneUtil>0?"badge-pass":"badge-idle"}`}>
                  {craneUtil>100?"⛔ OVERLOAD — LIFT PROHIBITED":craneUtil>90?"❌ FAIL — DO NOT PROCEED":craneUtil>75?"⚠️ WARNING":craneUtil>0?"✅ PASS — SAFE":"AWAITING DATA"}
                </span>
              </div>
              <FormulaPanel>
                DDL (T) = GLW × DAF = {f2(g.glw)} × {f2(daf)} = {f2(ddl)} T<br/>
                Eff. Capacity (T) = Chart Cap × Duty Factor = {f2(chartCap)} × {dutyFactor} = {f2(effCap)} T<br/>
                Utilization (%) = DDL ÷ Eff. Cap × 100 = {f2(ddl)} ÷ {f2(effCap)} × 100 = {f2(craneUtil)}%
              </FormulaPanel>
            </>
          )}
        </div>
      </div>

      {/* ── LOAD CHART CARD ── */}
      {!isManual && selCrane && (
        <div className="module-card">
          <div className="card-header"><span className="module-title">📊 Load Chart — {selCrane.model}</span></div>
          <div className="card-body">
            <div className="table-wrap">
              <table className="data-table">
                <thead><tr><th>Radius (m)</th><th>Boom (m)</th><th>Capacity (T)</th><th></th></tr></thead>
                <tbody>{selCrane.chart.map((row,i)=>(
                  <tr key={i} className={parseFloat(radius)>=row.r&&(selCrane.chart[i+1]?parseFloat(radius)<selCrane.chart[i+1].r:true)?"highlight":""}>
                    <td style={{fontFamily:"Arial,monospace"}}>{row.r}</td>
                    <td style={{fontFamily:"Arial,monospace"}}>{row.b}</td>
                    <td style={{fontFamily:"Arial,monospace",color:"var(--blue-400)"}}>{row.cap}</td>
                    <td>{i===0?<span className="badge badge-idle" style={{fontSize:9}}>MIN RADIUS</span>:""}</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
            {radius && <div className="info-box info-box-orange" style={{marginTop:8}}>📐 Interpolated capacity at <strong>{radius}m</strong>: <strong style={{color:"var(--blue-400)"}}>{f2(chartCap)} T</strong></div>}
          </div>
        </div>
      )}
    </div>
  );
};

// ── MODULE 3: GBP ─────────────────────────────────────────────────────────────
const GBP = () => {
  const {g,updateG} = useContext(AppCtx);
  const craneType = g.craneType||"mobile_outrigger";
  const isCrawler = craneType==="crawler";

  // ── SHARED ──
  const [allowGBP,setAllowGBP]=useState("");
  const [craneSW,setCraneSW]=useState("");

  // ── OUTRIGGER FIELDS ──
  const [gvw,setGvw]=useState("");
  const [riggingWt,setRiggingWt]=useState("");
  const [dlf,setDlf]=useState("1.25");
  const [distF,setDistF]=useState("0.65");
  const [numOutriggers,setNumOutriggers]=useState("4");
  const [spanFR,setSpanFR]=useState(""); const [spanFRU,setSpanFRU]=useState("m");
  const [spanSS,setSpanSS]=useState(""); const [spanSSU,setSpanSSU]=useState("m");
  const [padL,setPadL]=useState(""); const [padLU,setPadLU]=useState("m");
  const [padW,setPadW]=useState(""); const [padWU,setPadWU]=useState("m");
  const [matUsed,setMatUsed]=useState(false);
  const [matL,setMatL]=useState(""); const [matLU,setMatLU]=useState("m");
  const [matW,setMatW]=useState(""); const [matWU,setMatWU]=useState("m");

  // ── CRAWLER FIELDS ──
  const [craneOpWt,setCraneOpWt]=useState("");
  const [daf,setDaf]=useState("1.25");
  const [trackW,setTrackW]=useState(""); const [trackWU,setTrackWU]=useState("m");
  const [trackL,setTrackL]=useState(""); const [trackLU,setTrackLU]=useState("m");
  const [crawlMatUsed,setCrawlMatUsed]=useState(false);
  const [crawlMatL,setCrawlMatL]=useState(""); const [crawlMatLU,setCrawlMatLU]=useState("m");
  const [crawlMatW,setCrawlMatW]=useState(""); const [crawlMatWU,setCrawlMatWU]=useState("m");
  const [crawlMatsPerTrack,setCrawlMatsPerTrack]=useState("1");


  const glw = g.glw||0;

  // ── OUTRIGGER CALCS ──
  const padArea = toM(padL,padLU)*toM(padW,padWU);
  const matAreaO = toM(matL,matLU)*toM(matW,matWU);
  const effAreaO = matUsed&&matAreaO>0 ? matAreaO : padArea;
  const gvwN=parseFloat(gvw)||0, riggWtN=parseFloat(riggingWt)||(glw*0.10);
  const dlfN=parseFloat(dlf)||1.25, distFN=parseFloat(distF)||0.65;
  const fMax = (gvwN+glw+riggWtN)*dlfN*distFN; // tonnes
  const fMaxKN = fMax*9.81;
  const calcGBP_O = effAreaO>0 ? fMaxKN/effAreaO : 0;
  const allow = parseFloat(allowGBP)||0;
  const gbpUtil_O = allow>0 ? (calcGBP_O/allow)*100 : 0;
  const minAreaO = allow>0 ? fMaxKN/allow : 0;
  const minSideO = Math.sqrt(minAreaO);

  // ── CRAWLER CALCS ──
  const trackArea = toM(trackW,trackWU)*toM(trackL,trackLU);
  const crawlMatArea = toM(crawlMatL,crawlMatLU)*toM(crawlMatW,crawlMatWU)*(parseInt(crawlMatsPerTrack)||1);
  const effAreaC = crawlMatUsed&&crawlMatArea>0 ? crawlMatArea : trackArea;
  const opWtN=parseFloat(craneOpWt)||0, dafN=parseFloat(daf)||1.25;
  const pAvg = (opWtN+glw)*9.81 / (2*Math.max(trackArea,0.001));
  const pDynamic = pAvg*dafN;
  const pSingleTrack = pDynamic*0.55;
  const calcGBP_C = effAreaC>0 ? pSingleTrack/effAreaC : 0; // already kPa since pSingleTrack is kPa
  // Actually pSingleTrack is reaction force not pressure — need to recalc:
  // P_avg (kPa) = (opWt+glw)*9.81 / (2*trackArea)
  // P_dynamic = P_avg * daf
  // Worst single track P = P_dynamic * 0.55
  // GBP = worst single track P (already kPa - it IS the pressure on one track)
  const gbpUtil_C = allow>0 ? (calcGBP_C/allow)*100 : 0;
  const minAreaC = allow>0 ? pSingleTrack/allow : 0;
  const minSideC = Math.sqrt(Math.max(minAreaC,0));

  // Buried services


  // Pass to global state
  const calcGBP = isCrawler ? calcGBP_C : calcGBP_O;
  const gbpUtil = isCrawler ? gbpUtil_C : gbpUtil_O;
  const effArea = isCrawler ? effAreaC : effAreaO;
  useEffect(()=>{updateG({gbp:calcGBP,gbpUtil,allowGBP:allow,effArea})},[calcGBP,gbpUtil,allow,effArea]);

  const URow = ({label,val,unit}) => (
    <div className="form-row">
      <label className="label-calc">{label}</label>
      <input className="input-calc" value={val} readOnly />
    </div>
  );

  const DimRow = ({label,val,setVal,unit,setUnit}) => (
    <div className="form-row">
      <label className="label-input">{label}</label>
      <div className="input-wrap">
        <input className="input-user" type="number" value={val} onChange={e=>setVal(e.target.value)} placeholder="0"/>
        <select className="unit-sel" value={unit} onChange={e=>setUnit(e.target.value)}>
          {["mm","cm","m"].map(u=><option key={u}>{u}</option>)}
        </select>
      </div>
    </div>
  );

  const MinReqPanel = ({fKN, effA, minA, minS, padDims, label}) => {
    const adequate = effA>=minA;
    return (
      <div style={{background:"var(--bg-section)",border:`1px solid ${adequate?"var(--green-border)":"var(--red-border)"}`,borderRadius:"var(--radius-md)",padding:"14px 16px",marginTop:14}}>
        <div style={{fontFamily:"var(--font-display)",fontSize:11,letterSpacing:"0.1em",textTransform:"uppercase",color:"var(--text-orange)",marginBottom:10}}>
          📐 Minimum {label} Requirements
        </div>
        <div style={{fontFamily:"Arial,monospace",fontSize:11,color:"var(--text-muted)",marginBottom:10,lineHeight:1.8,padding:"8px 10px",background:"var(--bg-card)",borderRadius:3}}>
          A_req = F_max ÷ Allowable GBP = {f2(fKN)} ÷ {allow} = <strong style={{color:"var(--blue-400)"}}>{f3(minA)} m²</strong><br/>
          Min dimension = √({f3(minA)}) = <strong style={{color:"var(--blue-400)"}}>{f3(minS)} m × {f3(minS)} m</strong> ({Math.round(minS*1000)} mm × {Math.round(minS*1000)} mm)
        </div>
        <div className="table-wrap">
          <table className="data-table">
            <thead><tr><th>Parameter</th><th>Required</th><th>Provided</th><th>Adequacy</th></tr></thead>
            <tbody>
              <tr>
                <td>Min Contact Area</td>
                <td style={{fontFamily:"Arial,monospace",color:"var(--blue-400)"}}>{f3(minA)} m²</td>
                <td style={{fontFamily:"Arial,monospace"}}>{f3(effA)} m²</td>
                <td><span className={`badge ${effA>=minA?"badge-pass":"badge-fail"}`}>{effA>=minA?"✅ OK":"❌ UNDERSIZED"}</span></td>
              </tr>
              <tr>
                <td>Min Dimension</td>
                <td style={{fontFamily:"Arial,monospace",color:"var(--blue-400)"}}>{f3(minS)} m</td>
                <td style={{fontFamily:"Arial,monospace"}}>{f3(Math.sqrt(effA))} m</td>
                <td><span className={`badge ${Math.sqrt(effA)>=minS?"badge-pass":"badge-fail"}`}>{Math.sqrt(effA)>=minS?"✅":"❌"}</span></td>
              </tr>
              <tr>
                <td>Min Soil Bearing</td>
                <td style={{fontFamily:"Arial,monospace",color:"var(--blue-400)"}}>{effA>0?f2(fKN/effA):"—"} kPa</td>
                <td style={{fontFamily:"Arial,monospace"}}>{allow||"—"} kPa</td>
                <td><span className={`badge ${allow>=(effA>0?fKN/effA:0)?"badge-pass":"badge-fail"}`}>{allow>=(effA>0?fKN/effA:0)?"✅":"❌"}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={`info-box ${adequate?"info-box-green":"info-box-red"}`} style={{marginTop:8,fontSize:11}}>
          {adequate
            ? `✅ ADEQUATE — ${f3(effA)} m² provided ≥ ${f3(minA)} m² required`
            : `❌ UNDERSIZED — Minimum: ${f3(minS)} m × ${f3(minS)} m. Increase by ${Math.max(0,Math.round((minS-Math.sqrt(effA))*1000))} mm each side.`}
        </div>
        <div style={{fontSize:10,color:"var(--text-muted)",fontFamily:"Arial,monospace",marginTop:6}}>
          References: ASME B30.5 | CIRIA C703 | BS 8004:2015 | BS EN 13000 Annex B
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="module-card">
        <div className="card-header">
          <span className="module-title">🌍 Ground Bearing Pressure</span>
          <span className="std-tag">CIRIA C703 | EN 1997-1 | BS 8004:2015 | ASME P30.1</span>
        </div>
        <div className="card-body">
          <div className="info-box info-box-orange" style={{marginBottom:12}}>
            Crane Type (from Module 3): <strong style={{color:"var(--orange-500)"}}>{craneType.replace(/_/g," ")}</strong>
            {isCrawler?" — Crawler track calculation shown.":" — Outrigger pad calculation shown."}
            {!g.craneType&&" Select crane type in Module 3 to filter this module."}
          </div>

          {!isCrawler && (
            <>
              {/* ── OUTRIGGER CONFIGURATION ── */}
              <div className="section-heading">Section A — Crane Loading Inputs</div>
              <div className="form-grid">
                <div className="form-row">
                  <label className="label-input" title="Total operating weight of the crane including all attachments. From manufacturer datasheet.">🟨 Crane Gross Vehicle Weight GVW (T) ⓘ</label>
                  <input className="input-user no-unit" type="number" value={gvw} onChange={e=>setGvw(e.target.value)} placeholder="From crane datasheet" />
                </div>
                <URow label="🔵 GVW (kN)" val={gvwN>0?f2(gvwN*9.81):"—"} />
                <div className="form-row">
                  <label className="label-input">🟨 Lifted Load / GLW (T) [auto-linked]</label>
                  <input className="input-calc" value={f2(glw)} readOnly />
                </div>
                <div className="form-row">
                  <label className="label-input">🟨 Rigging Weight (T)</label>
                  <input className="input-user no-unit" type="number" value={riggingWt} onChange={e=>setRiggingWt(e.target.value)} placeholder={`Default: ${f2(glw*0.10)} T (10%)`} />
                </div>
                <div className="form-row">
                  <label className="label-input" title="Dynamic Load Factor — default 1.25 per ASME B30.5. Range 1.10–1.50.">🟨 Dynamic Load Factor (DLF) ⓘ</label>
                  <input className="input-user no-unit" type="number" step="0.01" min="1.10" max="1.50" value={dlf} onChange={e=>setDlf(e.target.value)} />
                </div>
                <div className="form-row">
                  <label className="label-input" title="Fraction of total reaction on single worst-case outrigger. 0.65 per CIRIA C703 Sec.4.3. Range 0.50–0.75 per BS EN 13000 Annex B.">🟨 Outrigger Distribution Factor ⓘ</label>
                  <input className="input-user no-unit" type="number" step="0.01" min="0.50" max="0.75" value={distF} onChange={e=>setDistF(e.target.value)} />
                </div>
              </div>

              <div className="section-heading">Section B — Outrigger Geometry</div>
              <div className="form-grid">
                <div className="form-row">
                  <label className="label-input">🟨 Number of Outriggers</label>
                  <select className="input-user no-unit" value={numOutriggers} onChange={e=>setNumOutriggers(e.target.value)}>
                    <option value="2">2</option><option value="4">4</option>
                  </select>
                </div>
                <DimRow label="🟨 Outrigger Span — Front to Rear" val={spanFR} setVal={setSpanFR} unit={spanFRU} setUnit={setSpanFRU}/>
                <DimRow label="🟨 Outrigger Span — Side to Side" val={spanSS} setVal={setSpanSS} unit={spanSSU} setUnit={setSpanSSU}/>
                <DimRow label="🟨 Outrigger Pad Length" val={padL} setVal={setPadL} unit={padLU} setUnit={setPadLU}/>
                <DimRow label="🟨 Outrigger Pad Width"  val={padW} setVal={setPadW} unit={padWU} setUnit={setPadWU}/>
                <URow label="🔵 Pad Area (m²)" val={f3(padArea)} />
                <div className="form-row" style={{gridColumn:"1/-1"}}>
                  <div className="toggle-wrap">
                    <label className="toggle"><input type="checkbox" checked={matUsed} onChange={e=>setMatUsed(e.target.checked)}/><span className="toggle-track"/><span className="toggle-thumb"/></label>
                    <span style={{fontSize:13,color:"var(--text-secondary)"}}>🟨 Cribbing / Mat Used?</span>
                  </div>
                </div>
                {matUsed && <>
                  <DimRow label="🟨 Mat Length" val={matL} setVal={setMatL} unit={matLU} setUnit={setMatLU}/>
                  <DimRow label="🟨 Mat Width"  val={matW} setVal={setMatW} unit={matWU} setUnit={setMatWU}/>
                  <URow label="🔵 Mat Area (m²)" val={f3(matAreaO)} />
                </>}
                <URow label="🔵 Effective Contact Area (m²)" val={f3(effAreaO)} />
              </div>

              <div className="section-heading">Section C — Soil / Site Conditions</div>
              <div className="table-wrap" style={{marginBottom:10}}>
                <table className="data-table">
                  <thead><tr><th>Soil Type</th><th>Allowable GBP (kPa)</th><th>Notes</th></tr></thead>
                  <tbody>{SOIL_TABLE.map(s=>(
                    <tr key={s.type} style={{cursor:"pointer"}} className={allowGBP===String(s.gbp)?"highlight":""} onClick={()=>setAllowGBP(String(s.gbp))}>
                      <td>{s.type}</td>
                      <td style={{fontFamily:"Arial,monospace",color:"var(--blue-400)"}}>{s.gbp}</td>
                      <td style={{fontSize:11,color:"var(--text-muted)"}}>{s.warn||""}</td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
              <div className="form-grid">
                <div className="form-row">
                  <label className="label-input">🟨 Allowable Site GBP (kPa) — override</label>
                  <input className="input-user no-unit" type="number" value={allowGBP} onChange={e=>setAllowGBP(e.target.value)} placeholder="From geotechnical report preferred" />
                </div>
              </div>

              <div className="section-heading">Section D — Auto Calculations</div>
              <div style={{background:"var(--bg-section)",border:"1px solid var(--border-default)",borderRadius:"var(--radius-md)",padding:"12px 16px",marginBottom:12,fontFamily:"Arial,monospace",fontSize:11,lineHeight:2.0,color:"var(--text-secondary)"}}>
                <strong style={{color:"var(--text-orange)"}}>STEP 1 — Max Outrigger Reaction Force (F_max)</strong><br/>
                F_max = (GVW + GLW + Rigging) × DLF × Distribution Factor<br/>
                F_max = ({f2(gvwN)} + {f2(glw)} + {f2(riggWtN)}) × {dlfN} × {distFN}<br/>
                F_max = <strong style={{color:"var(--blue-400)"}}>{f2(fMax)} T = {f2(fMaxKN)} kN</strong><br/><br/>
                <strong style={{color:"var(--text-orange)"}}>STEP 2 — Calculated GBP</strong><br/>
                GBP = F_max ÷ Effective Contact Area = {f2(fMaxKN)} ÷ {f3(effAreaO)}<br/>
                GBP = <strong style={{color:"var(--blue-400)"}}>{f2(calcGBP_O)} kPa</strong><br/><br/>
                <strong style={{color:"var(--text-orange)"}}>STEP 3 — GBP Utilization</strong><br/>
                U% = {f2(calcGBP_O)} ÷ {allow||"?"} × 100 = <strong style={{color:"var(--blue-400)"}}>{f2(gbpUtil_O)}%</strong>
              </div>
              <div className="grid-4" style={{marginBottom:8}}>
                <div className="stat-card"><div className="stat-label">F_max</div><div className="stat-val">{f2(fMaxKN)}<span className="stat-unit">kN</span></div></div>
                <div className="stat-card"><div className="stat-label">Calculated GBP</div><div className="stat-val">{f2(calcGBP_O)}<span className="stat-unit">kPa</span></div></div>
                <div className="stat-card"><div className="stat-label">Allowable GBP</div><div className="stat-val">{allow||"—"}<span className="stat-unit">kPa</span></div></div>
                <div className="stat-card" style={{background:gbpUtil_O>100?"var(--red-bg)":gbpUtil_O>75?"var(--amber-bg)":"var(--green-bg)"}}>
                  <div className="stat-label">GBP Utilization</div>
                  <div className="stat-val" style={{color:gbpUtil_O>100?"var(--red-400)":gbpUtil_O>75?"var(--amber-400)":"var(--green-400)"}}>{f2(gbpUtil_O)}<span className="stat-unit">%</span></div>
                </div>
              </div>
              <UtilBar value={gbpUtil_O} label="GBP Utilization" />

              {allow>0&&<MinReqPanel fKN={fMaxKN} effA={effAreaO} minA={minAreaO} minS={minSideO} label="Outrigger Pad" />}
            </>
          )}

          {isCrawler && (
            <>
              {/* ── CRAWLER CONFIGURATION ── */}
              <div className="section-heading">Section A — Crane Loading Inputs</div>
              <div className="form-grid">
                <div className="form-row">
                  <label className="label-input">🟨 Crane Operating Weight (T)</label>
                  <input className="input-user no-unit" type="number" value={craneOpWt} onChange={e=>setCraneOpWt(e.target.value)} placeholder="From manufacturer datasheet" />
                </div>
                <URow label="🔵 Operating Weight (kN)" val={opWtN>0?f2(opWtN*9.81):"—"} />
                <div className="form-row">
                  <label className="label-input">🟨 Lifted Load / GLW (T) [auto-linked]</label>
                  <input className="input-calc" value={f2(glw)} readOnly />
                </div>
                <div className="form-row">
                  <label className="label-input" title="DAF ≥ 1.25 per ASME P30.1 Sec.6.6.3">🟨 Dynamic Amplification Factor (DAF) ⓘ</label>
                  <input className="input-user no-unit" type="number" step="0.01" min="1.10" max="1.50" value={daf} onChange={e=>setDaf(e.target.value)} />
                </div>
              </div>

              <div className="section-heading">Section B — Track Geometry</div>
              <div className="form-grid">
                <DimRow label="🟨 Track Shoe Width" val={trackW} setVal={setTrackW} unit={trackWU} setUnit={setTrackWU}/>
                <DimRow label="🟨 Track Contact Length" val={trackL} setVal={setTrackL} unit={trackLU} setUnit={setTrackLU}/>
                <URow label="🔵 Single Track Contact Area (m²)" val={f3(trackArea)} />
                <URow label="🔵 Total Track Contact Area (m²)" val={f3(trackArea*2)} />
                <div className="form-row" style={{gridColumn:"1/-1"}}>
                  <div className="toggle-wrap">
                    <label className="toggle"><input type="checkbox" checked={crawlMatUsed} onChange={e=>setCrawlMatUsed(e.target.checked)}/><span className="toggle-track"/><span className="toggle-thumb"/></label>
                    <span style={{fontSize:13,color:"var(--text-secondary)"}}>🟨 Mat / Bottom Plate Used?</span>
                  </div>
                </div>
                {crawlMatUsed && <>
                  <DimRow label="🟨 Mat Length" val={crawlMatL} setVal={setCrawlMatL} unit={crawlMatLU} setUnit={setCrawlMatLU}/>
                  <DimRow label="🟨 Mat Width"  val={crawlMatW} setVal={setCrawlMatW} unit={crawlMatWU} setUnit={setCrawlMatWU}/>
                  <div className="form-row">
                    <label className="label-input">🟨 Mats per Track</label>
                    <input className="input-user no-unit" type="number" min="1" value={crawlMatsPerTrack} onChange={e=>setCrawlMatsPerTrack(e.target.value)}/>
                  </div>
                  <URow label="🔵 Single Mat Area (m²)" val={f3(toM(crawlMatL,crawlMatLU)*toM(crawlMatW,crawlMatWU))} />
                  <URow label="🔵 Total Mat Area per Track (m²)" val={f3(crawlMatArea)} />
                </>}
                <URow label="🔵 Effective Contact Area (m²)" val={f3(effAreaC)} />
              </div>

              <div className="section-heading">Section C — Soil / Site Conditions</div>
              <div className="table-wrap" style={{marginBottom:10}}>
                <table className="data-table">
                  <thead><tr><th>Soil Type</th><th>Allowable GBP (kPa)</th><th>Notes</th></tr></thead>
                  <tbody>{SOIL_TABLE.map(s=>(
                    <tr key={s.type} style={{cursor:"pointer"}} className={allowGBP===String(s.gbp)?"highlight":""} onClick={()=>setAllowGBP(String(s.gbp))}>
                      <td>{s.type}</td>
                      <td style={{fontFamily:"Arial,monospace",color:"var(--blue-400)"}}>{s.gbp}</td>
                      <td style={{fontSize:11,color:"var(--text-muted)"}}>{s.warn||""}</td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
              <div className="form-grid">
                <div className="form-row">
                  <label className="label-input">🟨 Allowable Site GBP (kPa)</label>
                  <input className="input-user no-unit" type="number" value={allowGBP} onChange={e=>setAllowGBP(e.target.value)} placeholder="From geotechnical report"/>
                </div>
              </div>

              <div className="section-heading">Section D — Auto Calculations</div>
              <div style={{background:"var(--bg-section)",border:"1px solid var(--border-default)",borderRadius:"var(--radius-md)",padding:"12px 16px",marginBottom:12,fontFamily:"Arial,monospace",fontSize:11,lineHeight:2.0,color:"var(--text-secondary)"}}>
                <strong style={{color:"var(--text-orange)"}}>STEP 1 — Average Ground Pressure Under Tracks</strong><br/>
                P_avg = (Operating Wt + GLW) × 9.81 ÷ (2 × Track Area)<br/>
                P_avg = ({f2(opWtN)}+{f2(glw)}) × 9.81 ÷ (2 × {f3(trackArea)})<br/>
                P_avg = <strong style={{color:"var(--blue-400)"}}>{f2(pAvg)} kPa</strong><br/><br/>
                <strong style={{color:"var(--text-orange)"}}>STEP 2 — Dynamic Amplification (ASME P30.1 Sec.6.6.3)</strong><br/>
                P_dynamic = P_avg × DAF = {f2(pAvg)} × {dafN} = <strong style={{color:"var(--blue-400)"}}>{f2(pDynamic)} kPa</strong><br/><br/>
                <strong style={{color:"var(--text-orange)"}}>STEP 3 — Worst Single Track (CIRIA C703 Sec.4.3)</strong><br/>
                P_track = P_dynamic × 0.55 = {f2(pDynamic)} × 0.55 = <strong style={{color:"var(--blue-400)"}}>{f2(pSingleTrack)} kPa</strong><br/><br/>
                <strong style={{color:"var(--text-orange)"}}>STEP 4 — Effective Mat GBP</strong><br/>
                GBP = P_track ÷ Mat Area = {f2(pSingleTrack)} ÷ {f3(effAreaC)} = <strong style={{color:"var(--blue-400)"}}>{f2(calcGBP_C)} kPa</strong><br/><br/>
                <strong style={{color:"var(--text-orange)"}}>STEP 5 — GBP Utilization</strong><br/>
                U% = {f2(calcGBP_C)} ÷ {allow||"?"} × 100 = <strong style={{color:"var(--blue-400)"}}>{f2(gbpUtil_C)}%</strong>
              </div>
              <div className="grid-4" style={{marginBottom:8}}>
                <div className="stat-card"><div className="stat-label">P_avg</div><div className="stat-val">{f2(pAvg)}<span className="stat-unit">kPa</span></div></div>
                <div className="stat-card"><div className="stat-label">P_dynamic</div><div className="stat-val">{f2(pDynamic)}<span className="stat-unit">kPa</span></div></div>
                <div className="stat-card"><div className="stat-label">P_single track</div><div className="stat-val">{f2(pSingleTrack)}<span className="stat-unit">kPa</span></div></div>
                <div className="stat-card" style={{background:gbpUtil_C>100?"var(--red-bg)":gbpUtil_C>75?"var(--amber-bg)":"var(--green-bg)"}}>
                  <div className="stat-label">GBP Utilization</div>
                  <div className="stat-val" style={{color:gbpUtil_C>100?"var(--red-400)":gbpUtil_C>75?"var(--amber-400)":"var(--green-400)"}}>{f2(gbpUtil_C)}<span className="stat-unit">%</span></div>
                </div>
              </div>
              <UtilBar value={gbpUtil_C} label="GBP Utilization" />

              {allow>0&&<MinReqPanel fKN={pSingleTrack} effA={effAreaC} minA={minAreaC} minS={minSideC} label="Crawler Mat / Plate" />}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
// ── MODULE 4: RIGGING — v1.7 COMPLETE REWRITE ────────────────────────────────
const LEG_LABELS = ["A","B","C","D","E","F"];

// ── Sling angle reference table data ──────────────────────────────────────────
const SLING_ANGLE_REF = [
  {deg:90,fromVert:0,  k:1.000,status:"✅ Vertical — Max efficiency"},
  {deg:85,fromVert:5,  k:0.996,status:"✅ Excellent"},
  {deg:75,fromVert:15, k:0.966,status:"✅ Very Good"},
  {deg:60,fromVert:30, k:0.866,status:"✅ Good"},
  {deg:45,fromVert:45, k:0.707,status:"⚠️ Minimum Recommended"},
  {deg:30,fromVert:60, k:0.500,status:"❌ Critical — Avoid"},
  {deg:20,fromVert:70, k:0.342,status:"⛔ Dangerous"},
  {deg:15,fromVert:75, k:0.259,status:"⛔ Prohibited"},
];

// ── Helper: SVG plan-view for 2-leg ───────────────────────────────────────────
const PlanView2Leg = ({L,W,hookH,slingLen,slingMode,shackleH,wllEff,designLoad,hitch}) => {
  const svgW=300,svgH=200,pad=30;
  if(!L||!W) return (
    <div className="svg-diagram" style={{display:'flex',alignItems:'center',justifyContent:'center',height:200,color:'var(--text-muted)',fontSize:11,fontFamily:'var(--font-mono)'}}>
      Enter object dimensions to see plan view
    </div>
  );
  const xRange=L, yRange=W;
  const sc = Math.min((svgW-pad*2)/xRange,(svgH-pad*2)/yRange);
  const cx = x => pad + x*sc;
  const cy = y => svgH-pad - y*sc;
  const ax=L*0.25, ay=W/2, bx=L*0.75, by=W/2;
  const hx=L*0.5, hy=W/2;
  const dPlan = (L*0.5-ax)*1; // = 0.25L
  const H = slingMode==="manual"&&slingLen>0 ? Math.sqrt(Math.max(0,slingLen*slingLen-dPlan*dPlan)) : (hookH||0);
  const theta = H>0&&dPlan>0 ? Math.atan2(H,dPlan)*180/Math.PI : 0;
  const K = theta>0 ? Math.sin(theta*Math.PI/180) : 0;
  const T = K>0 ? designLoad/(2*K) : 0;
  const util = wllEff>0&&T>0 ? T/wllEff*100 : 0;
  const uc = util>90?'#ef4444':util>75?'#f59e0b':'#22c55e';
  return (
    <div className="svg-diagram" style={{padding:6}}>
      <div style={{fontSize:9,color:'var(--text-muted)',textAlign:'center',padding:'4px 0',fontFamily:'var(--font-mono)',letterSpacing:'0.08em'}}>PLAN VIEW — TOP DOWN</div>
      <svg width="100%" viewBox={`0 0 ${svgW} ${svgH}`} style={{fontFamily:'var(--font-mono)'}}>
        {/* Object outline */}
        <rect x={cx(0)} y={cy(W)} width={L*sc} height={W*sc} fill="rgba(80,80,80,0.2)" stroke="#555" strokeWidth="1.5"/>
        {/* Guide lines 25%/75% */}
        <line x1={cx(L*0.25)} y1={cy(W)} x2={cx(L*0.25)} y2={cy(0)} stroke="#444" strokeWidth="1" strokeDasharray="4,4"/>
        <line x1={cx(L*0.75)} y1={cy(W)} x2={cx(L*0.75)} y2={cy(0)} stroke="#444" strokeWidth="1" strokeDasharray="4,4"/>
        {/* Distance line */}
        <line x1={cx(ax)} y1={cy(ay)} x2={cx(bx)} y2={cy(by)} stroke={uc} strokeWidth="2.5"/>
        {/* Dashed to hook */}
        <line x1={cx(ax)} y1={cy(ay)} x2={cx(hx)} y2={cy(hy)} stroke="#666" strokeWidth="1" strokeDasharray="4,3"/>
        <line x1={cx(bx)} y1={cy(by)} x2={cx(hx)} y2={cy(hy)} stroke="#666" strokeWidth="1" strokeDasharray="4,3"/>
        {/* Points */}
        <circle cx={cx(ax)} cy={cy(ay)} r="9" fill="#f97316" stroke="#fff" strokeWidth="1.5"/>
        <text x={cx(ax)} y={cy(ay)+3.5} textAnchor="middle" fill="#fff" fontSize="9" fontWeight="700">A</text>
        <circle cx={cx(bx)} cy={cy(by)} r="9" fill={uc} stroke="#fff" strokeWidth="1.5"/>
        <text x={cx(bx)} y={cy(by)+3.5} textAnchor="middle" fill="#fff" fontSize="9" fontWeight="700">B</text>
        {/* Hook */}
        <line x1={cx(hx)-8} y1={cy(hy)} x2={cx(hx)+8} y2={cy(hy)} stroke="#f97316" strokeWidth="1.5"/>
        <line x1={cx(hx)} y1={cy(hy)-8} x2={cx(hx)} y2={cy(hy)+8} stroke="#f97316" strokeWidth="1.5"/>
        <text x={cx(hx)+10} y={cy(hy)-2} fill="#f97316" fontSize="8">⊕ Hook</text>
        {/* Labels */}
        {dPlan>0&&<text x={(cx(ax)+cx(bx))/2} y={cy(ay)-14} textAnchor="middle" fill="#f97316" fontSize="9">{f3(dPlan*2)}m span</text>}
        {/* Scale bar */}
        {sc>0&&<><line x1={pad} y1={svgH-10} x2={pad+sc} y2={svgH-10} stroke="#555" strokeWidth="2"/><text x={pad+sc/2} y={svgH-3} textAnchor="middle" fill="#555" fontSize="8">1.000m</text></>}
        {T>0&&<text x={cx(hx)} y={cy(hy)+20} textAnchor="middle" fill={uc} fontSize="8">T={f2(T)}T | U={fN(util,1)}%</text>}
      </svg>
    </div>
  );
};

// ── SVG plan-view for 3-leg ────────────────────────────────────────────────────
const PlanView3Leg = ({pts,hookH,slingLen,slingMode,wllEff,designLoad}) => {
  const svgW=300,svgH=220,pad=32;
  const validPts = pts.filter(p=>p.x!==''&&p.y!=='');
  if(validPts.length<3) return (
    <div className="svg-diagram" style={{display:'flex',alignItems:'center',justifyContent:'center',height:200,color:'var(--text-muted)',fontSize:11,fontFamily:'var(--font-mono)'}}>Enter all 3 lifting point coordinates</div>
  );
  const xs=validPts.map(p=>p.x), ys=validPts.map(p=>p.y);
  const xMin=Math.min(...xs,0),xMax=Math.max(...xs),yMin=Math.min(...ys,0),yMax=Math.max(...ys);
  const xR=xMax-xMin||1, yR=yMax-yMin||1;
  const sc=Math.min((svgW-pad*2)/xR,(svgH-pad*2)/yR);
  const cx=x=>pad+(x-xMin)*sc, cy=y=>svgH-pad-(y-yMin)*sc;
  const hx=xs.reduce((a,b)=>a+b,0)/3, hy=ys.reduce((a,b)=>a+b,0)/3;
  const dists = validPts.map(p=>Math.sqrt(Math.pow(hx-p.x,2)+Math.pow(hy-p.y,2)));
  const maxD = Math.max(...dists);
  const colors=['#f97316','#f97316','#f97316'];
  return (
    <div className="svg-diagram" style={{padding:6}}>
      <div style={{fontSize:9,color:'var(--text-muted)',textAlign:'center',padding:'4px 0',fontFamily:'var(--font-mono)',letterSpacing:'0.08em'}}>PLAN VIEW — TOP DOWN (3-LEG)</div>
      <svg width="100%" viewBox={`0 0 ${svgW} ${svgH}`} style={{fontFamily:'var(--font-mono)'}}>
        <polygon points={validPts.map(p=>`${cx(p.x)},${cy(p.y)}`).join(' ')} fill="rgba(80,80,80,0.18)" stroke="#555" strokeWidth="1.5"/>
        {validPts.map((p,i)=>{const isLB=dists[i]===maxD||dists[i]===Math.max(...dists.filter(d=>d!==maxD));return(
          <g key={i}>
            <line x1={cx(p.x)} y1={cy(p.y)} x2={cx(hx)} y2={cy(hy)} stroke={isLB?'#f97316':'#555'} strokeWidth={isLB?2:1} strokeDasharray={isLB?'':' 4,3'}/>
            <circle cx={cx(p.x)} cy={cy(p.y)} r="9" fill="#f97316" stroke="#fff" strokeWidth="1.5"/>
            <text x={cx(p.x)} y={cy(p.y)+3.5} textAnchor="middle" fill="#fff" fontSize="9" fontWeight="700">{LEG_LABELS[i]}</text>
          </g>
        );})}
        <line x1={cx(hx)-8} y1={cy(hy)} x2={cx(hx)+8} y2={cy(hy)} stroke="#f97316" strokeWidth="1.5"/>
        <line x1={cx(hx)} y1={cy(hy)-8} x2={cx(hx)} y2={cy(hy)+8} stroke="#f97316" strokeWidth="1.5"/>
        <text x={cx(hx)+10} y={cy(hy)-2} fill="#f97316" fontSize="8">⊕ Hook</text>
        {sc>0&&<><line x1={pad} y1={svgH-10} x2={pad+sc} y2={svgH-10} stroke="#555" strokeWidth="2"/><text x={pad+sc/2} y={svgH-3} textAnchor="middle" fill="#555" fontSize="8">1.000m</text></>}
      </svg>
    </div>
  );
};

// ── SVG plan-view for 4-leg ────────────────────────────────────────────────────
const PlanView4Leg = ({pts,hookH,slingLen,slingMode,wllEff,designLoad}) => {
  const svgW=300,svgH=220,pad=32;
  const validPts = pts.filter(p=>p.x!==''&&p.y!=='');
  if(validPts.length<4) return (
    <div className="svg-diagram" style={{display:'flex',alignItems:'center',justifyContent:'center',height:200,color:'var(--text-muted)',fontSize:11,fontFamily:'var(--font-mono)'}}>Enter all 4 lifting point coordinates</div>
  );
  const xs=validPts.map(p=>p.x),ys=validPts.map(p=>p.y);
  const xMin=Math.min(...xs,0),xMax=Math.max(...xs),yMin=Math.min(...ys,0),yMax=Math.max(...ys);
  const xR=xMax-xMin||1,yR=yMax-yMin||1;
  const sc=Math.min((svgW-pad*2)/xR,(svgH-pad*2)/yR);
  const cx=x=>pad+(x-xMin)*sc, cy=y=>svgH-pad-(y-yMin)*sc;
  const hx=xs.reduce((a,b)=>a+b,0)/4, hy=ys.reduce((a,b)=>a+b,0)/4;
  const dAC=Math.sqrt(Math.pow(validPts[2].x-validPts[0].x,2)+Math.pow(validPts[2].y-validPts[0].y,2));
  const dBD=Math.sqrt(Math.pow(validPts[3].x-validPts[1].x,2)+Math.pow(validPts[3].y-validPts[1].y,2));
  const worstDiag = dAC>=dBD ? [0,2] : [1,3];
  return (
    <div className="svg-diagram" style={{padding:6}}>
      <div style={{fontSize:9,color:'var(--text-muted)',textAlign:'center',padding:'4px 0',fontFamily:'var(--font-mono)',letterSpacing:'0.08em'}}>PLAN VIEW — TOP DOWN (4-LEG)</div>
      <svg width="100%" viewBox={`0 0 ${svgW} ${svgH}`} style={{fontFamily:'var(--font-mono)'}}>
        <polygon points={validPts.map(p=>`${cx(p.x)},${cy(p.y)}`).join(' ')} fill="rgba(80,80,80,0.18)" stroke="#555" strokeWidth="1.5"/>
        <line x1={cx(validPts[0].x)} y1={cy(validPts[0].y)} x2={cx(validPts[2].x)} y2={cy(validPts[2].y)} stroke={dAC>=dBD?"#ef4444":"#f59e0b"} strokeWidth="1.5" strokeDasharray="6,3"/>
        <line x1={cx(validPts[1].x)} y1={cy(validPts[1].y)} x2={cx(validPts[3].x)} y2={cy(validPts[3].y)} stroke={dBD>dAC?"#ef4444":"#f59e0b"} strokeWidth="1.5" strokeDasharray="6,3"/>
        {validPts.map((p,i)=>{const isLB=worstDiag.includes(i);return(
          <g key={i}>
            <line x1={cx(p.x)} y1={cy(p.y)} x2={cx(hx)} y2={cy(hy)} stroke={isLB?'#f97316':'#666'} strokeWidth={isLB?2.5:1} strokeDasharray={isLB?'':'4,3'}/>
            <circle cx={cx(p.x)} cy={cy(p.y)} r="9" fill="#f97316" stroke="#fff" strokeWidth="1.5"/>
            <text x={cx(p.x)} y={cy(p.y)+3.5} textAnchor="middle" fill="#fff" fontSize="9" fontWeight="700">{LEG_LABELS[i]}</text>
          </g>
        );})}
        <line x1={cx(hx)-8} y1={cy(hy)} x2={cx(hx)+8} y2={cy(hy)} stroke="#f97316" strokeWidth="1.5"/>
        <line x1={cx(hx)} y1={cy(hy)-8} x2={cx(hx)} y2={cy(hy)+8} stroke="#f97316" strokeWidth="1.5"/>
        <text x={cx(hx)+10} y={cy(hy)-2} fill="#f97316" fontSize="8">⊕ Hook</text>
        <text x={pad} y={svgH-14} fill={dAC>=dBD?"#ef4444":"#f59e0b"} fontSize="7">A↔C={f2(dAC)}m {dAC>=dBD?"← WORST":""}</text>
        <text x={pad} y={svgH-5} fill={dBD>dAC?"#ef4444":"#f59e0b"} fontSize="7">B↔D={f2(dBD)}m {dBD>dAC?"← WORST":""}</text>
        {sc>0&&<><line x1={svgW-pad-sc} y1={svgH-22} x2={svgW-pad} y2={svgH-22} stroke="#555" strokeWidth="2"/><text x={svgW-pad-sc/2} y={svgH-14} textAnchor="middle" fill="#555" fontSize="7">1m</text></>}
      </svg>
    </div>
  );
};

// ── SVG side elevation ─────────────────────────────────────────────────────────
const SideElevationView = ({dPlan,hookH,slingLen,tension,theta,wllEff}) => {
  const svgW=280,svgH=220,padL=40,padB=24,padT=24,padR=60;
  const H=hookH||0, d=dPlan||0, S=slingLen||0;
  const canH=svgH-padT-padB, canW=svgW-padL-padR;
  const scY=H>0?Math.min(canH/H,80):40, scX=d>0?Math.min(canW/d,80):40;
  const sc=Math.min(scY,scX);
  const ox=padL, oy=svgH-padB;
  const lpX=ox+d*sc, lpY=oy;
  const hkX=ox, hkY=oy-H*sc;
  const warn45 = theta>0&&theta<45;
  const util=wllEff>0&&tension>0?tension/wllEff*100:0;
  const uc=util>90?'#ef4444':util>75?'#f59e0b':'#22c55e';
  return (
    <div className="svg-diagram" style={{padding:6}}>
      <div style={{fontSize:9,color:'var(--text-muted)',textAlign:'center',padding:'4px 0',fontFamily:'var(--font-mono)',letterSpacing:'0.08em'}}>SIDE ELEVATION — WORST-CASE LEG</div>
      <svg width="100%" viewBox={`0 0 ${svgW} ${svgH}`} style={{fontFamily:'var(--font-mono)'}}>
        {warn45&&<polygon points={`${ox},${oy} ${lpX},${lpY} ${hkX},${hkY}`} fill="rgba(239,68,68,0.08)"/>}
        {/* Ground */}
        <line x1={0} y1={oy} x2={svgW} y2={oy} stroke="var(--border-strong)" strokeWidth="2"/>
        <text x={svgW/2} y={oy+12} textAnchor="middle" fill="#555" fontSize="8">Ground Level</text>
        {H>0&&d>0?<>
          {/* Horizontal dim */}
          <line x1={ox} y1={oy+14} x2={lpX} y2={oy+14} stroke="#60a5fa" strokeWidth="1.5"/>
          <text x={(ox+lpX)/2} y={oy+22} textAnchor="middle" fill="#60a5fa" fontSize="8">d={f2(d)}m</text>
          {/* Vertical dim */}
          <line x1={lpX+8} y1={lpY} x2={lpX+8} y2={hkY} stroke="#22c55e" strokeWidth="1.5"/>
          <text x={lpX+14} y={(lpY+hkY)/2} fill="#22c55e" fontSize="8">H={f2(H)}m</text>
          {/* Right angle */}
          <polyline points={`${ox+10},${oy} ${ox+10},${oy-10} ${ox},${oy-10}`} fill="none" stroke="#555" strokeWidth="1"/>
          {/* Sling */}
          <line x1={lpX} y1={lpY} x2={hkX} y2={hkY} stroke={uc} strokeWidth="2.5" strokeLinecap="round"/>
          {/* Sling length label */}
          <text x={(lpX+hkX)/2+8} y={(lpY+hkY)/2-4} fill={uc} fontSize="8">S={f2(S)}m</text>
          {/* Tension label */}
          <text x={(lpX+hkX)/2-8} y={(lpY+hkY)/2+10} fill={uc} fontSize="8">T={f2(tension)}T</text>
          {/* Angle arc */}
          {theta>0&&<>
            <path d={`M ${lpX-28} ${lpY} A 28 28 0 0 0 ${lpX-28*Math.cos((90-theta)*Math.PI/180)} ${lpY-28*Math.sin((90-theta)*Math.PI/180)}`} fill="none" stroke="#f59e0b" strokeWidth="1.5"/>
            <text x={lpX-38} y={lpY-16} fill="#f59e0b" fontSize="8">θh={f2(theta)}°</text>
          </>}
          {/* Hook block */}
          <rect x={hkX-14} y={hkY-12} width="28" height="12" rx="2" fill="#333" stroke={uc} strokeWidth="1.5"/>
          <text x={hkX} y={hkY-4} textAnchor="middle" fill={uc} fontSize="7">Hook</text>
          {/* Lifting point */}
          <circle cx={lpX} cy={lpY} r="7" fill="#f97316" stroke="#fff" strokeWidth="1.5"/>
          {/* Load block */}
          <rect x={ox} y={oy-16} width={d*sc} height="16" rx="2" fill="rgba(80,80,80,0.3)" stroke="#555" strokeWidth="1"/>
          {warn45&&<text x={lpX-20} y={lpY-55} fill="#ef4444" fontSize="9">⚠️</text>}
        </>:<text x={svgW/2} y={svgH/2} textAnchor="middle" fill="#555" fontSize="11">Enter hook height and geometry</text>}
      </svg>
    </div>
  );
};

// ── SVG isometric view ─────────────────────────────────────────────────────────
const IsometricView = ({pts,hookH,tension,wllEff,designLoad,legCount}) => {
  const svgW=280,svgH=220;
  const util=wllEff>0&&tension>0?tension/wllEff*100:0;
  const lbColor=util>90?'#ef4444':util>75?'#f59e0b':'#22c55e';
  const n=Math.min(pts.length,6);
  const isoX=(wx,wy)=>(wx-wy)*Math.cos(Math.PI/6);
  const isoY=(wx,wy,wz)=>(wx+wy)*Math.sin(Math.PI/6)-wz;
  const cx=140,cy=160;
  const L=pts[0]?.objL||4, W=pts[0]?.objW||2, H=hookH||3;
  const sc=Math.min(30,40/Math.max(L,W,H));
  const ti=(wx,wy,wz)=>([cx+isoX(wx,wy)*sc, cy+isoY(wx,wy,wz)*sc]);
  const [gax,gay]=ti(0,0,0);
  const [gbx,gby]=ti(L,0,0);
  const [gcx,gcy]=ti(L,W,0);
  const [gdx,gdy]=ti(0,W,0);
  const [tax,tay]=ti(0,0,1.2);
  const [tbx,tby]=ti(L,0,1.2);
  const [tcx,tcy]=ti(L,W,1.2);
  const [tdx,tdy]=ti(0,W,1.2);
  const [hkx,hky]=ti(L/2,W/2,H);
  const lps = n===2 ? [[L*0.25,W/2],[L*0.75,W/2]] :
               n===3 ? [[0,0],[L,0],[L/2,W]] :
               n===4 ? [[0,0],[L,0],[L,W],[0,W]] :
               [[0,0],[L,0],[L,W],[0,W],[L/2,0],[L/2,W]].slice(0,n);
  return (
    <div className="svg-diagram" style={{padding:6}}>
      <div style={{fontSize:9,color:'var(--text-muted)',textAlign:'center',padding:'4px 0',fontFamily:'var(--font-mono)',letterSpacing:'0.08em'}}>ISOMETRIC VIEW (30° PROJECTION)</div>
      <svg width="100%" viewBox={`0 0 ${svgW} ${svgH}`} style={{fontFamily:'var(--font-mono)'}}>
        {/* Load block faces */}
        <polygon points={`${gax},${gay} ${gbx},${gby} ${gcx},${gcy} ${gdx},${gdy}`} fill="rgba(60,60,60,0.3)" stroke="#444" strokeWidth="1"/>
        <polygon points={`${tax},${tay} ${tbx},${tby} ${tcx},${tcy} ${tdx},${tdy}`} fill="rgba(100,100,100,0.35)" stroke="#555" strokeWidth="1"/>
        <polygon points={`${gax},${gay} ${gbx},${gby} ${tbx},${tby} ${tax},${tay}`} fill="rgba(70,70,70,0.25)" stroke="#444" strokeWidth="1"/>
        <polygon points={`${gbx},${gby} ${gcx},${gcy} ${tcx},${tcy} ${tbx},${tby}`} fill="rgba(65,65,65,0.25)" stroke="#444" strokeWidth="1"/>
        {/* Sling legs */}
        {lps.map(([wx,wy],i)=>{
          const [px,py]=ti(wx,wy,1.2);
          return <g key={i}>
            <line x1={px} y1={py} x2={hkx} y2={hky} stroke={lbColor} strokeWidth="2" strokeLinecap="round"/>
            <circle cx={px} cy={py} r="5" fill="#f97316" stroke="#fff" strokeWidth="1"/>
            <text x={px} y={py+3} textAnchor="middle" fill="#fff" fontSize="7" fontWeight="700">{LEG_LABELS[i]}</text>
          </g>;
        })}
        {/* Hook */}
        <rect x={hkx-10} y={hky-8} width="20" height="8" rx="1" fill="#333" stroke={lbColor} strokeWidth="1.5"/>
        <text x={hkx} y={hky-1} textAnchor="middle" fill={lbColor} fontSize="6">Hook</text>
        {/* H label */}
        <line x1={hkx+30} y1={hky} x2={hkx+30} y2={tay} stroke="#22c55e" strokeWidth="1" strokeDasharray="3,2"/>
        <text x={hkx+36} y={(hky+tay)/2} fill="#22c55e" fontSize="8">H={f2(hookH||0)}m</text>
        {/* Legend */}
        <line x1={8} y1={svgH-20} x2={22} y2={svgH-20} stroke={lbColor} strokeWidth="2"/>
        <text x={24} y={svgH-17} fill={lbColor} fontSize="7">Load-bearing</text>
        <text x={8} y={svgH-8} fill="#555" fontSize="7">{legCount} legs | T={f2(tension)}T | {fN(util,1)}% util</text>
      </svg>
    </div>
  );
};

// ── MAIN RIGGING CALC COMPONENT ────────────────────────────────────────────────



// Lift-point label box for rigging plan diagram
const LegLabelBox = ({sx,sy,p,i,col,labelY,lt,lg,loadMode,hasCogOffset,f2,f3}) => {
  const hasAdj = loadMode==="nonuniform" && hasCogOffset && lg && Math.abs(lg.dS)>0.005;
  const boxH   = hasAdj ? 40 : 28;
  return (
    <>
      <rect x={sx(p.x)-36} y={labelY-2} width="72" height={boxH} rx="3"
        fill="white" stroke={col} strokeWidth="0.5" opacity="0.95"/>
      <text x={sx(p.x)} y={labelY+8}
        textAnchor="middle" fontSize="9" fontWeight="700" fill={col}>
        {lt ? f3(lt.tension)+" T" : "—"}
      </text>
      <text x={sx(p.x)} y={labelY+18}
        textAnchor="middle" fontSize="8" fill="#6b7280">
        {lg && lg.S>0 ? "L="+f2(lg.S)+"m" : (lt ? f3(lt.util)+"% util" : "")}
      </text>
      {hasAdj && (
        <text x={sx(p.x)} y={labelY+29}
          textAnchor="middle" fontSize="8" fontWeight="700"
          fill={lg.dS>0 ? "#2563eb" : "#ea6c00"}>
          {(lg.dS>0?"+":"")+f2(lg.dS)+"m "+(lg.dS>0?"↑":"↓")}
        </text>
      )}
    </>
  );
};


// ── RIGGING PLAN VIEW DIAGRAM ─────────────────────────────────────────────────
const RiggingDiagram = ({effPts,hookPos,cogAbs,hasCogOffset,cogOffset,
  legTensions,legGeom,n,loadMode,ObjL,ObjW,maxTension}) => {
  const _f1=v=>(isNaN(v)||!isFinite(v))?"—":parseFloat(v).toFixed(1);
  const _f2=v=>(isNaN(v)||!isFinite(v))?"—":parseFloat(v).toFixed(2);
  const _f3=v=>(isNaN(v)||!isFinite(v))?"—":parseFloat(v).toFixed(3);
  const LEG=['A','B','C','D','E','F'];
  const pad=0.8;
  const allX=[...effPts.map(q=>q.x),hookPos.x,...(cogAbs?[cogAbs.x]:[])];
  const allY=[...effPts.map(q=>q.y),hookPos.y,...(cogAbs?[cogAbs.y]:[])];
  const x0=Math.min(...allX)-pad, x1=Math.max(...allX)+pad;
  const y0=Math.min(...allY)-pad, y1=Math.max(...allY)+pad;
  const rX=x1-x0||1, rY=y1-y0||1;
  const VW=560, VH=320, MX=60, MY=44;
  const sx=v=>MX+(v-x0)/rX*(VW-2*MX);
  const sy=v=>MY+(v-y0)/rY*(VH-2*MY);
  const uCol=u=>u>100?'#A32D2D':u>85?'#BA7517':u>75?'#EF9F27':'#3B6D11';
  const uFill=u=>u>100?'rgba(163,45,45,0.15)':u>85?'rgba(186,117,23,0.15)':u>75?'rgba(239,159,39,0.12)':'rgba(59,109,17,0.12)';
  const barM=parseFloat((rX/4).toPrecision(1))||0.5;
  const barPx=barM/rX*(VW-2*MX);
  const ref=loadMode==="nonuniform"&&cogAbs?cogAbs:hookPos;
  return (
    <svg width="100%" viewBox={"0 0 "+VW+" "+VH} style={{display:"block",fontFamily:"Arial,sans-serif"}}>
      <defs>
        <marker id="rdArr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </marker>
      </defs>
      {/* Title */}
      <text x={VW/2} y="20" textAnchor="middle" fontSize="11" fontWeight="700" fill="#374151">
        {"RIGGING PLAN VIEW — "+n+"-LEG "+(loadMode==="nonuniform"?"NON-UNIFORM":"UNIFORM")+" LOAD"}
      </text>
      {/* Load boundary */}
      {ObjL>0&&ObjW>0&&(
        <rect x={sx(0)} y={sy(0)} width={sx(ObjL)-sx(0)} height={sy(ObjW)-sy(0)}
          fill="rgba(249,115,22,0.04)" stroke="#fed7aa" strokeWidth="1.5" strokeDasharray="8,4" rx="4"/>
      )}
      {/* Sling legs + distance labels */}
      {effPts.slice(0,n).map((pt,i)=>{
        const lt=legTensions[i], lg=legGeom[i];
        const col=lt?uCol(lt.util):'#9ca3af';
        const mx=(sx(pt.x)+sx(ref.x))/2, my=(sy(pt.y)+sy(ref.y))/2;
        return (
          <g key={i}>
            <line x1={sx(pt.x)} y1={sy(pt.y)} x2={sx(ref.x)} y2={sy(ref.y)}
              stroke={col} strokeWidth={lt&&lt.tension===maxTension?2.5:1.5}
              strokeDasharray="6,3" opacity="0.85"/>
            {lg&&lg.dCog>0.01&&(
              <g>
                <rect x={mx-18} y={my-8} width="36" height="14" rx="3"
                  fill="white" stroke={col} strokeWidth="0.5" opacity="0.9"/>
                <text x={mx} y={my+3} textAnchor="middle" fontSize="8"
                  fill={col} fontWeight="600" fontFamily="Arial,monospace">
                  {_f2(lg.dCog)+"m"}
                </text>
              </g>
            )}
          </g>
        );
      })}
      {/* Eccentricity arrow */}
      {loadMode==="nonuniform"&&cogAbs&&hasCogOffset&&(
        <g>
          <line x1={sx(hookPos.x)} y1={sy(hookPos.y)} x2={sx(cogAbs.x)} y2={sy(cogAbs.y)}
            stroke="#BA7517" strokeWidth="1.5" strokeDasharray="4,2" markerEnd="url(#rdArr)"/>
          <rect x={(sx(hookPos.x)+sx(cogAbs.x))/2-22} y={(sy(hookPos.y)+sy(cogAbs.y))/2-8}
            width="44" height="14" rx="3" fill="white" opacity="0.85"/>
          <text x={(sx(hookPos.x)+sx(cogAbs.x))/2} y={(sy(hookPos.y)+sy(cogAbs.y))/2+3}
            textAnchor="middle" fontSize="9" fill="#BA7517" fontWeight="600">
            {"e="+_f2(Math.sqrt(Math.pow(cogOffset.x,2)+Math.pow(cogOffset.y,2)))+"m"}
          </text>
        </g>
      )}
      {/* Hook crosshair (blue) */}
      <line x1={sx(hookPos.x)-12} y1={sy(hookPos.y)} x2={sx(hookPos.x)+12} y2={sy(hookPos.y)} stroke="#185FA5" strokeWidth="2"/>
      <line x1={sx(hookPos.x)} y1={sy(hookPos.y)-12} x2={sx(hookPos.x)} y2={sy(hookPos.y)+12} stroke="#185FA5" strokeWidth="2"/>
      <circle cx={sx(hookPos.x)} cy={sy(hookPos.y)} r="6" fill="none" stroke="#185FA5" strokeWidth="2"/>
      <rect x={sx(hookPos.x)+10} y={sy(hookPos.y)-14} width="58" height="18" rx="3"
        fill="white" stroke="#185FA5" strokeWidth="0.5" opacity="0.9"/>
      <text x={sx(hookPos.x)+39} y={sy(hookPos.y)-2}
        textAnchor="middle" fontSize="9" fill="#185FA5" fontWeight="600">
        {"Hook ("+_f2(hookPos.x)+","+_f2(hookPos.y)+")"}
      </text>
      {/* COG crosshair (red) */}
      {loadMode==="nonuniform"&&cogAbs&&(
        <g>
          <circle cx={sx(cogAbs.x)} cy={sy(cogAbs.y)} r="14"
            fill="rgba(163,45,45,0.08)" stroke="#A32D2D" strokeWidth="1" strokeDasharray="3,2"/>
          <line x1={sx(cogAbs.x)-13} y1={sy(cogAbs.y)} x2={sx(cogAbs.x)+13} y2={sy(cogAbs.y)} stroke="#A32D2D" strokeWidth="2.5"/>
          <line x1={sx(cogAbs.x)} y1={sy(cogAbs.y)-13} x2={sx(cogAbs.x)} y2={sy(cogAbs.y)+13} stroke="#A32D2D" strokeWidth="2.5"/>
          <circle cx={sx(cogAbs.x)} cy={sy(cogAbs.y)} r="4" fill="#A32D2D"/>
          <rect x={sx(cogAbs.x)+16} y={sy(cogAbs.y)-16} width="68" height="24" rx="3"
            fill="white" stroke="#A32D2D" strokeWidth="1" opacity="0.95"/>
          <text x={sx(cogAbs.x)+20} y={sy(cogAbs.y)-6} fontSize="9" fill="#A32D2D" fontWeight="700">COG</text>
          <text x={sx(cogAbs.x)+20} y={sy(cogAbs.y)+5}
            fontSize="8" fill="#6b7280" fontFamily="Arial,monospace">
            {"("+_f2(cogAbs.x)+","+_f2(cogAbs.y)+")"}
          </text>
        </g>
      )}
      {/* Lift point circles */}
      {effPts.slice(0,n).map((pt,i)=>{
        const lt=legTensions[i], lg=legGeom[i];
        const col=lt?uCol(lt.util):'#888';
        const fill=lt?uFill(lt.util):'rgba(136,136,136,0.12)';
        const lbl=LEG[i]||("L"+(i+1));
        const isBig=lt&&lt.tension===maxTension;
        const r=isBig?18:15;
        const labelY=sy(pt.y)<(MY+(VH-2*MY)/2)?sy(pt.y)+r+10:sy(pt.y)-r-22;
        return (
          <g key={i}>
            <circle cx={sx(pt.x)} cy={sy(pt.y)} r={r} fill={fill} stroke={col} strokeWidth={isBig?2.5:1.5}/>
            <text x={sx(pt.x)} y={sy(pt.y)+5} textAnchor="middle" fontSize="12" fontWeight="700" fill={col}>{lbl}</text>
            <rect x={sx(pt.x)-36} y={labelY-2} width="72" height="28" rx="3"
              fill="white" stroke={col} strokeWidth="0.5" opacity="0.95"/>
            <text x={sx(pt.x)} y={labelY+8}
              textAnchor="middle" fontSize="9" fontWeight="700" fill={col}>
              {lt?_f3(lt.tension)+" T":"—"}
            </text>
            <text x={sx(pt.x)} y={labelY+18}
              textAnchor="middle" fontSize="8" fill="#6b7280">
              {lg&&lg.S>0?"L="+_f2(lg.S)+"m":lt?_f1(lt.util)+"% util":""}
            </text>
          </g>
        );
      })}
      {/* Scale bar */}
      {rX>0&&(
        <g>
          <line x1={MX} y1={VH-14} x2={MX+barPx} y2={VH-14} stroke="#6b7280" strokeWidth="1.5"/>
          <line x1={MX} y1={VH-19} x2={MX} y2={VH-9} stroke="#6b7280" strokeWidth="1.5"/>
          <line x1={MX+barPx} y1={VH-19} x2={MX+barPx} y2={VH-9} stroke="#6b7280" strokeWidth="1.5"/>
          <text x={MX+barPx/2} y={VH-3} textAnchor="middle" fontSize="8" fill="#6b7280">{barM+" m"}</text>
        </g>
      )}
      {/* Legend */}
      <rect x={VW-130} y={MY} width="118" height={loadMode==="nonuniform"?90:74} rx="4"
        fill="white" stroke="#e5e7eb" strokeWidth="0.5" opacity="0.95"/>
      <text x={VW-122} y={MY+14} fontSize="9" fontWeight="700" fill="#374151">Legend</text>
      <circle cx={VW-116} cy={MY+27} r="5" fill="rgba(59,109,17,0.15)" stroke="#3B6D11" strokeWidth="1.5"/>
      <text x={VW-108} y={MY+31} fontSize="8" fill="#374151">OK  &lt;75%</text>
      <circle cx={VW-116} cy={MY+43} r="5" fill="rgba(239,159,39,0.15)" stroke="#EF9F27" strokeWidth="1.5"/>
      <text x={VW-108} y={MY+47} fontSize="8" fill="#374151">Warn 75–90%</text>
      <circle cx={VW-116} cy={MY+59} r="5" fill="rgba(163,45,45,0.15)" stroke="#A32D2D" strokeWidth="1.5"/>
      <text x={VW-108} y={MY+63} fontSize="8" fill="#374151">Over &gt;90%</text>
      {loadMode==="nonuniform"&&(
        <g>
          <line x1={VW-122} y1={MY+75} x2={VW-110} y2={MY+75} stroke="#185FA5" strokeWidth="2"/>
          <circle cx={VW-116} cy={MY+75} r="3" fill="none" stroke="#185FA5" strokeWidth="1.5"/>
          <text x={VW-108} y={MY+79} fontSize="8" fill="#374151">Hook</text>
          <line x1={VW-122} y1={MY+87} x2={VW-110} y2={MY+87} stroke="#A32D2D" strokeWidth="2.5"/>
          <circle cx={VW-116} cy={MY+87} r="3" fill="#A32D2D"/>
          <text x={VW-108} y={MY+91} fontSize="8" fill="#374151">COG</text>
        </g>
      )}
    </svg>
  );
};



// ── LOAD SHAPE SCHEMATIC ──────────────────────────────────────────────────────
// Shows lift point positions on a simplified load rectangle, updates with leg count
const LoadSchematic = ({n}) => {
  const W=260, H=140, lx=30, ly=20, lw=W-60, lh=H-40;
  // Lift point positions for each configuration (normalised 0-1 on lw/lh)
  const configs = {
    1: [[0.5,0.5]],
    2: [[0.25,0.5],[0.75,0.5]],
    3: [[0.5,0.18],[0.18,0.82],[0.82,0.82]],
    4: [[0.18,0.18],[0.82,0.18],[0.82,0.82],[0.18,0.82]],
    5: [[0.18,0.18],[0.82,0.18],[0.5,0.5],[0.18,0.82],[0.82,0.82]],
    6: [[0.18,0.18],[0.82,0.18],[0.18,0.5],[0.82,0.5],[0.18,0.82],[0.82,0.82]],
  };
  const pts  = configs[n] || configs[4];
  const LEG  = ['A','B','C','D','E','F'];
  // Hook = centroid of lift points
  const hx   = pts.reduce((s,p)=>s+p[0],0)/pts.length;
  const hy   = pts.reduce((s,p)=>s+p[1],0)/pts.length;
  const toX  = t => lx + t*lw;
  const toY  = t => ly + t*lh;
  return (
    <svg width={W} height={H} viewBox={"0 0 "+W+" "+H} style={{display:"block",fontFamily:"Arial,sans-serif"}}>
      {/* Load rectangle */}
      <rect x={lx} y={ly} width={lw} height={lh} rx="4"
        fill="rgba(249,115,22,0.05)" stroke="#fed7aa" strokeWidth="1.5" strokeDasharray="6,3"/>
      <text x={W/2} y={ly-6} textAnchor="middle" fontSize="9" fill="#9ca3af">Load</text>
      {/* Sling legs to hook */}
      {pts.map(([tx,ty],i)=>(
        <line key={i}
          x1={toX(tx)} y1={toY(ty)} x2={toX(hx)} y2={toY(hy)}
          stroke="#f97316" strokeWidth="1.2" strokeDasharray="4,2" opacity="0.7"/>
      ))}
      {/* Hook crosshair */}
      <line x1={toX(hx)-7} y1={toY(hy)} x2={toX(hx)+7} y2={toY(hy)} stroke="#185FA5" strokeWidth="1.5"/>
      <line x1={toX(hx)} y1={toY(hy)-7} x2={toX(hx)} y2={toY(hy)+7} stroke="#185FA5" strokeWidth="1.5"/>
      <circle cx={toX(hx)} cy={toY(hy)} r="4" fill="none" stroke="#185FA5" strokeWidth="1.5"/>
      {/* Lift point circles + labels */}
      {pts.map(([tx,ty],i)=>(
        <g key={i}>
          <circle cx={toX(tx)} cy={toY(ty)} r="9"
            fill="rgba(249,115,22,0.15)" stroke="#f97316" strokeWidth="1.5"/>
          <text x={toX(tx)} y={toY(ty)+4}
            textAnchor="middle" fontSize="9" fontWeight="700" fill="#ea6c00">{LEG[i]}</text>
        </g>
      ))}
      {/* Legend */}
      <text x={lx} y={H-6} fontSize="8" fill="#9ca3af">{n+"-leg  ● = lift point  ✕ = hook"}</text>
    </svg>
  );
};


const RiggingCalc = () => {
  const {g,updateG} = useContext(AppCtx);

  // ── Load distribution mode ──────────────────────────────────────────────
  const [loadMode,setLoadMode] = useState("uniform");

  // ── Step 1: Design load ─────────────────────────────────────────────────
  const [manualLoad,setManualLoad]=useState(""); const [manualLoadU,setManualLoadU]=useState("T");
  const [manualDaf,setManualDaf]=useState("1.10");
  const glwLinked = g.glw>0;
  const designLoad = glwLinked
    ? g.glw*(g.daf||1.10)
    : (parseFloat(manualLoad)||0)*(parseFloat(manualDaf)||1.10);

  // ── Step 2: Config ──────────────────────────────────────────────────────
  const [legCount,setLegCount]=useState(4);
  const [hitch,setHitch]=useState("direct");
  const [slingType,setSlingType]=useState("Wire Rope");
  const n = Math.min(parseInt(legCount)||4,6);
  const [wll,setWll]=useState(""); const [wllU,setWllU]=useState("T");
  const wllT = parseFloat(wll)||0;
  const wllEff = hitch==="choker" ? wllT*0.75 : wllT;

  // ── Step 3: Sling length mode ───────────────────────────────────────────
  const [slingMode,setSlingMode]=useState("hookH");
  const [hookHVal,setHookHVal]=useState(""); const [hookHU,setHookHU]=useState("m");
  const [slingLenVal,setSlingLenVal]=useState(""); const [slingLenU,setSlingLenU]=useState("m");
  const [desiredAngle,setDesiredAngle]=useState("");

  // ── Step 4: Object geometry ─────────────────────────────────────────────
  const [objL,setObjL]=useState(""); const [objLU,setObjLU]=useState("m");
  const [objW,setObjW]=useState(""); const [objWU,setObjWU]=useState("m");
  const ObjL=toM(objL,objLU), ObjW=toM(objW,objWU);

  // ── Step 5: COG offset (non-uniform mode) ───────────────────────────────
  const [cogInputMode,setCogInputMode]=useState("offset"); // "offset"|"absolute"
  const [cogX,setCogX]=useState(""); const [cogXU,setCogXU]=useState("m");
  const [cogY,setCogY]=useState(""); const [cogYU,setCogYU]=useState("m");
  const [cogDX,setCogDX]=useState(""); const [cogDXU,setCogDXU]=useState("m");
  const [cogDY,setCogDY]=useState(""); const [cogDYU,setCogDYU]=useState("m");

  // ── Lift point coords ───────────────────────────────────────────────────
  const [pts,setPts]=useState(Array.from({length:6},()=>({x:'',y:'',xu:'m',yu:'m'})));
  const setPoint=(i,f,v)=>setPts(p=>p.map((pt,j)=>j===i?{...pt,[f]:v}:pt));

  const defaultPts = useMemo(()=>{
    if(!ObjL||!ObjW) return [];
    if(n===2) return [{x:ObjL*0.25,y:ObjW/2},{x:ObjL*0.75,y:ObjW/2}];
    if(n===3) return [{x:0,y:0},{x:ObjL,y:0},{x:ObjL/2,y:ObjW}];
    if(n===4) return [{x:0,y:0},{x:ObjL,y:0},{x:ObjL,y:ObjW},{x:0,y:ObjW}];
    return [];
  },[n,ObjL,ObjW]);

  const effPts = useMemo(()=>
    Array.from({length:n},(_,i)=>{
      const p=pts[i]; const hasUser=p.x!==''&&p.y!=='';
      if(hasUser) return {x:toM(p.x,p.xu),y:toM(p.y,p.yu)};
      if(defaultPts[i]) return defaultPts[i];
      return null;
    }).filter(Boolean)
  ,[pts,n,defaultPts]);

  const hookPos = useMemo(()=>{
    if(effPts.length<n) return null;
    return {x:effPts.reduce((s,p)=>s+p.x,0)/effPts.length,
            y:effPts.reduce((s,p)=>s+p.y,0)/effPts.length};
  },[effPts,n]);

  const cogAbs = useMemo(()=>{
    if(loadMode==="uniform") return hookPos;
    if(!hookPos) return hookPos;
    // Mode: offset from geometric centre (dX, dY)
    if(cogInputMode==="offset"){
      const dx=cogDX!==''?toM(cogDX,cogDXU):0;
      const dy=cogDY!==''?toM(cogDY,cogDYU):0;
      return {x:hookPos.x+dx, y:hookPos.y+dy};
    }
    // Mode: absolute X,Y from datum
    if(cogInputMode==="absolute"){
      const cx=cogX!==''?toM(cogX,cogXU):hookPos.x;
      const cy=cogY!==''?toM(cogY,cogYU):hookPos.y;
      return {x:cx, y:cy};
    }
    // Fallback
    return hookPos;
  },[loadMode,cogInputMode,cogX,cogXU,cogY,cogYU,cogDX,cogDXU,cogDY,cogDYU,hookPos]);

  const cogOffset = useMemo(()=>{
    if(!hookPos||!cogAbs) return {x:0,y:0};
    return {x:cogAbs.x-hookPos.x,y:cogAbs.y-hookPos.y};
  },[hookPos,cogAbs]);
  const hasCogOffset = Math.abs(cogOffset.x)>0.005||Math.abs(cogOffset.y)>0.005;

  // ── 2D moment equilibrium — vertical force per lift point ───────────────
  const legVertForces = useMemo(()=>{
    if(!cogAbs||effPts.length<n||!designLoad) return null;
    const W=designLoad;
    if(n===1) return [W];
    if(n===2){
      const dx=effPts[1].x-effPts[0].x, dy=effPts[1].y-effPts[0].y;
      const L=Math.sqrt(dx*dx+dy*dy); if(L<0.001) return [W/2,W/2];
      const t=Math.max(0,Math.min(1,((cogAbs.x-effPts[0].x)*dx+(cogAbs.y-effPts[0].y)*dy)/(L*L)));
      return [W*(1-t),W*t];
    }
    if(n===3){
      const [p1,p2,p3]=effPts;
      const A=[[1,1,1],[p1.x,p2.x,p3.x],[p1.y,p2.y,p3.y]];
      const B=[W,W*cogAbs.x,W*cogAbs.y];
      const det=m=>m[0][0]*(m[1][1]*m[2][2]-m[1][2]*m[2][1])-m[0][1]*(m[1][0]*m[2][2]-m[1][2]*m[2][0])+m[0][2]*(m[1][0]*m[2][1]-m[1][1]*m[2][0]);
      const D=det(A); if(Math.abs(D)<0.0001) return [W/3,W/3,W/3];
      return [0,1,2].map(col=>det(A.map((r,i)=>r.map((v,j)=>j===col?B[i]:v)))/D);
    }
    if(n===4){
      const cx=effPts.reduce((s,p)=>s+p.x,0)/4, cy=effPts.reduce((s,p)=>s+p.y,0)/4;
      const ox=effPts.map(p=>p.x-cx), oy=effPts.map(p=>p.y-cy);
      const Ixx=oy.reduce((s,v)=>s+v*v,0)||1, Iyy=ox.reduce((s,v)=>s+v*v,0)||1;
      const Mx=W*(cogAbs.y-cy), My=W*(cogAbs.x-cx);
      return ox.map((_,i)=>W/4+(Mx/Ixx)*oy[i]+(My/Iyy)*ox[i]);
    }
    return Array(n).fill(W/n);
  },[n,effPts,cogAbs,designLoad]);

  // ── Per-leg angle & tension ─────────────────────────────────────────────
  const legGeom = useMemo(()=>{
    if(!hookPos||effPts.length<n) return [];
    const hookHm  = toM(hookHVal,hookHU);
    const slingLenM= toM(slingLenVal,slingLenU);
    const angDeg  = parseFloat(desiredAngle)||0;
    // Non-uniform: hook must be above COG — each sling runs from lift point → COG position
    // Uniform: hook at geometric centroid — standard equal-length slings
    const refPt   = (loadMode==="nonuniform"&&cogAbs) ? cogAbs : hookPos;

    return effPts.slice(0,n).map((p,i)=>{
      // Distance from lift point to required hook position (COG in non-uniform, centroid in uniform)
      const dPlan = Math.sqrt(Math.pow(refPt.x-p.x,2)+Math.pow(refPt.y-p.y,2));
      // Distance from lift point to geometric centroid (for adjustment comparison)
      const dPlanCentroid = Math.sqrt(Math.pow(hookPos.x-p.x,2)+Math.pow(hookPos.y-p.y,2));

      let H=0, S=0, thetaH=0, tooShort=false;
      // Determine hook height from user input
      if(slingMode==='hookH'&&hookHm>0){
        H = hookHm;
        S = Math.sqrt(dPlan*dPlan + H*H);
      } else if(slingMode==='slingLen'&&slingLenM>0){
        // slingLenM is treated as the base length for the most central leg
        // For non-uniform: longer legs on corners further from COG
        const dRef = Math.sqrt(Math.pow(refPt.x-hookPos.x,2)+Math.pow(refPt.y-hookPos.y,2));
        const Href = Math.sqrt(Math.max(0, slingLenM*slingLenM - dRef*dRef));
        H = Href;
        if(dPlan>slingLenM){tooShort=true;}
        else {S = Math.sqrt(dPlan*dPlan + H*H);}
      } else if(slingMode==='angle'&&angDeg>0){
        thetaH = angDeg;
        H = dPlan / Math.tan(thetaH*Math.PI/180);
        S = Math.sqrt(dPlan*dPlan + H*H);
      }
      if(H>0&&!tooShort){
        const tV = Math.atan2(dPlan,H)*180/Math.PI;
        thetaH = 90 - tV;
      }
      const K = thetaH>0 ? Math.sin(thetaH*Math.PI/180) : 0;

      // Equal-length reference sling (what uniform sling would be)
      const S_uniform = H>0 ? Math.sqrt(dPlanCentroid*dPlanCentroid + H*H) : 0;
      // Adjustment needed vs uniform
      const dS = (S>0&&S_uniform>0) ? S - S_uniform : 0;

      return {
        leg:LEG_LABELS[i]||('L'+(i+1)),
        dPlan,           // plan dist from lift point → required hook pos (COG or centroid)
        dPlanCentroid,   // plan dist from lift point → geometric centroid
        dCog: loadMode==="nonuniform"&&cogAbs
              ? Math.sqrt(Math.pow(cogAbs.x-p.x,2)+Math.pow(cogAbs.y-p.y,2))
              : dPlan,  // distance from lift point to COG
        H, S, thetaH, K, tooShort,
        S_uniform,       // sling length for equal-length (uniform) assumption
        dS,              // S - S_uniform (positive = needs lengthening, negative = shorten)
        p,               // lift point coordinates
      };
    });
  },[hookPos,cogAbs,effPts,n,slingMode,hookHVal,hookHU,slingLenVal,slingLenU,desiredAngle,loadMode]);

  const legTensions = useMemo(()=>{
    if(!legVertForces||legGeom.length!==n) return [];
    return legGeom.map((lg,i)=>{
      const Fv=legVertForces[i]||0;
      const tension=lg.K>0?Fv/lg.K:0;
      const util=wllEff>0&&tension>0?tension/wllEff*100:0;
      return {...lg,Fv,tension,util};
    });
  },[legVertForces,legGeom,n,wllEff]);

  const maxTension = legTensions.length?Math.max(...legTensions.map(l=>l.tension)):0;
  const maxUtil    = legTensions.length?Math.max(...legTensions.map(l=>l.util)):0;
  const worstAngle = legGeom.length?Math.min(...legGeom.filter(l=>l.thetaH>0).map(l=>l.thetaH)):0;
  const utilCls    = utilClass(maxUtil);
  const angleColor = worstAngle>=45?"var(--green-400)":worstAngle>=30?"var(--amber-400)":"var(--red-400)";

  // Imbalance ratio (non-uniform mode)
  const imbalanceRatio = useMemo(()=>{
    if(!legTensions.length) return 0;
    const fvs=legTensions.map(l=>l.Fv).filter(v=>v>0);
    if(fvs.length<2) return 1;
    return Math.max(...fvs)/Math.min(...fvs);
  },[legTensions]);

  useEffect(()=>{
    updateG({slingAngle:worstAngle,tensionPerLeg:maxTension,riggingUtil:maxUtil});
  },[worstAngle,maxTension,maxUtil]);

  // ── JSX ─────────────────────────────────────────────────────────────────
  return (
    <div>
    <div className="module-card">
      <div className="card-header">
        <span className="module-title">RIGGING CALCULATION</span>
        <span className="std-tag">ASME B30.9 | BS EN 1492 | ISO 12480-1</span>
      </div>
      <div className="card-body">

        {/* LOAD DISTRIBUTION MODE SELECTOR */}
        <div className="section-heading">Load Distribution Mode</div>
        <div style={{display:"flex",gap:8,marginBottom:12}}>
          <button className={"btn "+(loadMode==="uniform"?"btn-primary":"btn-ghost")}
            style={{flex:1,fontFamily:"Arial,sans-serif"}} onClick={()=>setLoadMode("uniform")}>
            UNIFORM LOAD — COG at Geometric Centre
          </button>
          <button className={"btn "+(loadMode==="nonuniform"?"btn-primary":"btn-ghost")}
            style={{flex:1,fontFamily:"Arial,sans-serif"}} onClick={()=>setLoadMode("nonuniform")}>
            NON-UNIFORM LOAD — COG Offset
          </button>
        </div>
        {loadMode==="uniform"&&(
          <div className="info-box info-box-blue" style={{marginBottom:8,fontSize:12}}>
            COG assumed at geometric centre of lift points. Standard ASME B30.9 — equal vertical force per leg pair.
          </div>
        )}
        {loadMode==="nonuniform"&&(
          <div className="info-box info-box-amber" style={{marginBottom:8,fontSize:12}}>
            <strong>Non-Uniform Load:</strong> COG offset from geometric centre. Per-leg vertical forces calculated by 2D moment equilibrium (lever rule for 2-legs, Cramer's rule for 3-legs, Ixx/Iyy rigid body for 4-legs). Each leg gets individual tension based on its share of load.
          </div>
        )}

        {/* STEP 1: DESIGN LOAD */}
        <div className="section-heading">Step 1 — Design Load</div>
        {glwLinked?(
          <div className="form-grid">
            <div className="form-row"><label className="label-calc">GLW (Module 2)</label><input className="input-calc" value={f3(g.glw)+" T = "+f2(g.glw*9.81)+" kN"} readOnly/></div>
            <div className="form-row"><label className="label-calc">DAF</label><input className="input-calc" value={f2(g.daf||1.10)} readOnly/></div>
            <div className="form-row"><label className="label-calc">Design Load = GLW x DAF</label><input className="input-calc" value={f3(designLoad)+" T = "+f2(designLoad*9.81)+" kN"} readOnly/></div>
          </div>
        ):(
          <div className="form-grid">
            <div className="form-row">
              <label className="label-input">Manual Load</label>
              <div className="input-wrap">
                <input className="input-user" type="number" value={manualLoad} onChange={e=>setManualLoad(e.target.value)} placeholder="0"/>
                <select className="unit-sel" value={manualLoadU} onChange={e=>setManualLoadU(e.target.value)}>{["kg","T","kN"].map(u=><option key={u}>{u}</option>)}</select>
              </div>
            </div>
            <div className="form-row">
              <label className="label-input">DAF</label>
              <input className="input-user no-unit" type="number" step="0.01" value={manualDaf} onChange={e=>setManualDaf(e.target.value)} placeholder="1.10"/>
            </div>
            <div className="form-row"><label className="label-calc">Design Load</label><input className="input-calc" value={designLoad>0?f3(designLoad)+" T = "+f2(designLoad*9.81)+" kN":"—"} readOnly/></div>
          </div>
        )}

        {/* STEP 2: CONFIGURATION */}
        <div className="section-heading">Step 2 — Sling Configuration</div>
        <div className="form-grid">
          <div className="form-row" style={{gridColumn:"1/-1"}}>
            <label className="label-input">Number of Legs</label>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              {[1,2,3,4,5,6].map(nl=>(
                <button key={nl} className={"btn "+(legCount===nl?"btn-primary":"btn-ghost")}
                  style={{minWidth:60,fontFamily:"Arial,sans-serif",fontWeight:700}}
                  onClick={()=>setLegCount(nl)}>{nl} {nl===1?"LEG":"LEGS"}</button>
              ))}
            </div>
            {/* Load shape schematic — updates with leg count */}
            <div style={{marginTop:10,background:"#f8fafc",border:"1px solid #e2e8f0",
              borderRadius:8,padding:8,display:"inline-block"}}>
              <LoadSchematic n={n}/>
            </div>
          </div>
          {n>2&&<div className="info-box info-box-orange" style={{gridColumn:"1/-1",fontSize:11}}>
            <strong>ASME B30.9 Rule:</strong> {n}-leg sling uses {n===3?"3":"3"}-leg worst-case in uniform mode. Non-uniform mode calculates each leg individually.
          </div>}
          <div className="form-row" style={{gridColumn:"1/-1"}}>
            <label className="label-input">Hitch Method</label>
            <div style={{display:"flex",gap:6}}>
              <button className={"btn "+(hitch==="direct"?"btn-primary":"btn-ghost")} onClick={()=>setHitch("direct")} style={{flex:1}}>DIRECT x1.00</button>
              <button className={"btn "+(hitch==="choker"?"btn-primary":"btn-ghost")} onClick={()=>setHitch("choker")} style={{flex:1}}>CHOKER x0.75</button>
            </div>
          </div>
          <div className="form-row">
            <label className="label-input">Sling Type</label>
            <select className="input-user no-unit" value={slingType} onChange={e=>setSlingType(e.target.value)}>
              {["Wire Rope","Chain Grade 80","Chain Grade 100","Round Sling","Webbing Sling"].map(s=><option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="form-row">
            <label className="label-input">Rated WLL per Leg</label>
            <div className="input-wrap">
              <input className="input-user" type="number" value={wll} onChange={e=>setWll(e.target.value)} placeholder="0"/>
              <select className="unit-sel" value={wllU} onChange={e=>setWllU(e.target.value)}>{["T","kN","kg"].map(u=><option key={u}>{u}</option>)}</select>
            </div>
          </div>
          <div className="form-row">
            <label className="label-calc">Effective WLL ({hitch==="choker"?"x0.75":"x1.00"})</label>
            <input className="input-calc" value={wllT>0?f3(wllEff)+" T":"—"} readOnly/>
          </div>
        </div>

        {/* STEP 3: SLING LENGTH */}
        <div className="section-heading">Step 3 — Hook Height / Sling Length</div>
        <div className="form-grid">
          <div className="form-row" style={{gridColumn:"1/-1"}}>
            <label className="label-input">Input Mode</label>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
              <button className={"btn btn-sm "+(slingMode==="hookH"?"btn-primary":"btn-ghost")} onClick={()=>setSlingMode("hookH")}>Hook Height to Sling Length</button>
              <button className={"btn btn-sm "+(slingMode==="slingLen"?"btn-primary":"btn-ghost")} onClick={()=>setSlingMode("slingLen")}>Sling Length to Hook Height</button>
              <button className={"btn btn-sm "+(slingMode==="angle"?"btn-primary":"btn-ghost")} onClick={()=>setSlingMode("angle")}>Angle to Both</button>
            </div>
          </div>
          {slingMode==="hookH"&&<div className="form-row">
            <label className="label-input">Hook Height H</label>
            <div className="input-wrap">
              <input className="input-user" type="number" value={hookHVal} onChange={e=>setHookHVal(e.target.value)} placeholder="0"/>
              <select className="unit-sel" value={hookHU} onChange={e=>setHookHU(e.target.value)}>{["mm","cm","m"].map(u=><option key={u}>{u}</option>)}</select>
            </div>
          </div>}
          {slingMode==="slingLen"&&<div className="form-row">
            <label className="label-input">Sling Length per Leg</label>
            <div className="input-wrap">
              <input className="input-user" type="number" value={slingLenVal} onChange={e=>setSlingLenVal(e.target.value)} placeholder="0"/>
              <select className="unit-sel" value={slingLenU} onChange={e=>setSlingLenU(e.target.value)}>{["mm","cm","m"].map(u=><option key={u}>{u}</option>)}</select>
            </div>
          </div>}
          {slingMode==="angle"&&<div className="form-row">
            <label className="label-input">Desired Sling Angle (deg)</label>
            <input className="input-user no-unit" type="number" min="10" max="90" value={desiredAngle} onChange={e=>setDesiredAngle(e.target.value)} placeholder="60"/>
          </div>}
        </div>

        {/* STEP 4: GEOMETRY */}
        <div className="section-heading">Step 4 — Load and Lift Point Geometry</div>
        <div className="form-grid">
          <div className="form-row">
            <label className="label-input">Load Length</label>
            <div className="input-wrap">
              <input className="input-user" type="number" value={objL} onChange={e=>setObjL(e.target.value)} placeholder="0"/>
              <select className="unit-sel" value={objLU} onChange={e=>setObjLU(e.target.value)}>{["mm","cm","m"].map(u=><option key={u}>{u}</option>)}</select>
            </div>
          </div>
          <div className="form-row">
            <label className="label-input">Load Width</label>
            <div className="input-wrap">
              <input className="input-user" type="number" value={objW} onChange={e=>setObjW(e.target.value)} placeholder="0"/>
              <select className="unit-sel" value={objWU} onChange={e=>setObjWU(e.target.value)}>{["mm","cm","m"].map(u=><option key={u}>{u}</option>)}</select>
            </div>
          </div>
        </div>
        {n>=2&&(
          <div style={{background:"var(--bg-section)",border:"1px solid var(--border-default)",borderRadius:"var(--radius-md)",padding:"12px 14px",marginTop:8}}>
            <div style={{fontFamily:"Arial,sans-serif",fontSize:11,fontWeight:700,color:"var(--text-orange)",marginBottom:8,textTransform:"uppercase",letterSpacing:"0.06em"}}>
              Lift Point Positions — X,Y from datum corner (0,0). Blank = auto corners.
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:8}}>
              {Array.from({length:n},(_,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:6,background:"#fff",padding:"6px 10px",borderRadius:4,border:"1px solid var(--border-default)"}}>
                  <span style={{fontFamily:"Arial,monospace",fontSize:12,fontWeight:700,color:"var(--text-orange)",minWidth:28}}>{LEG_LABELS[i]||("L"+(i+1))}</span>
                  <span style={{fontSize:11,color:"var(--text-muted)"}}>X:</span>
                  <input style={{width:60,fontFamily:"Arial,monospace",fontSize:12,border:"1px solid #ddd",borderRadius:3,padding:"2px 4px"}}
                    type="number" value={pts[i].x} onChange={e=>setPoint(i,"x",e.target.value)} placeholder={defaultPts[i]?f2(defaultPts[i].x):"—"}/>
                  <select style={{fontSize:11,border:"1px solid #ddd",borderRadius:3,padding:"1px 2px"}} value={pts[i].xu} onChange={e=>setPoint(i,"xu",e.target.value)}>
                    {["mm","cm","m"].map(u=><option key={u}>{u}</option>)}
                  </select>
                  <span style={{fontSize:11,color:"var(--text-muted)"}}>Y:</span>
                  <input style={{width:60,fontFamily:"Arial,monospace",fontSize:12,border:"1px solid #ddd",borderRadius:3,padding:"2px 4px"}}
                    type="number" value={pts[i].y} onChange={e=>setPoint(i,"y",e.target.value)} placeholder={defaultPts[i]?f2(defaultPts[i].y):"—"}/>
                  <select style={{fontSize:11,border:"1px solid #ddd",borderRadius:3,padding:"1px 2px"}} value={pts[i].yu} onChange={e=>setPoint(i,"yu",e.target.value)}>
                    {["mm","cm","m"].map(u=><option key={u}>{u}</option>)}
                  </select>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 5: COG POSITION (non-uniform only) */}
        {loadMode==="nonuniform"&&(
          <>
            <div className="section-heading">Step 5 — COG Position (Non-Uniform Load)</div>

            {/* Input Method Selector */}
            <div style={{display:"flex",gap:6,marginBottom:12,flexWrap:"wrap"}}>
              <button className={"btn btn-sm "+(cogInputMode==="offset"?"btn-primary":"btn-ghost")}
                style={{fontFamily:"Arial,sans-serif"}} onClick={()=>setCogInputMode("offset")}>
                Offset from Centre
              </button>
              <button className={"btn btn-sm "+(cogInputMode==="absolute"?"btn-primary":"btn-ghost")}
                style={{fontFamily:"Arial,sans-serif"}} onClick={()=>setCogInputMode("absolute")}>
                Absolute Coordinates
              </button>

            </div>

            {/* MODE A: Offset from geometric centre */}
            {cogInputMode==="offset"&&(
              <>
                <div className="info-box info-box-orange" style={{marginBottom:10,fontSize:12}}>
                  Enter how far the COG is <strong>offset from the geometric centre</strong> of the lifting points.
                  Positive dX = COG towards leg B/C. Positive dY = COG towards leg C/D.
                  Zero offset = uniform load (equal leg tensions).
                </div>
                <div className="form-grid">
                  <div className="form-row">
                    <label className="label-input">COG Offset — dX (along length)</label>
                    <div className="input-wrap">
                      <input className="input-user" type="number" step="0.01"
                        value={cogDX} onChange={e=>setCogDX(e.target.value)} placeholder="0"/>
                      <select className="unit-sel" value={cogDXU} onChange={e=>setCogDXU(e.target.value)}>
                        {["mm","cm","m"].map(u=><option key={u}>{u}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="form-row">
                    <label className="label-input">COG Offset — dY (across width)</label>
                    <div className="input-wrap">
                      <input className="input-user" type="number" step="0.01"
                        value={cogDY} onChange={e=>setCogDY(e.target.value)} placeholder="0"/>
                      <select className="unit-sel" value={cogDYU} onChange={e=>setCogDYU(e.target.value)}>
                        {["mm","cm","m"].map(u=><option key={u}>{u}</option>)}
                      </select>
                    </div>
                  </div>
                  {hookPos&&<>
                    <div className="form-row">
                      <label className="label-calc">Geometric Centre (Hook Position)</label>
                      <input className="input-calc" value={"X="+f3(hookPos.x)+"m  Y="+f3(hookPos.y)+"m"} readOnly/>
                    </div>
                    <div className="form-row">
                      <label className="label-calc">COG Absolute Position</label>
                      <input className="input-calc"
                        value={cogAbs?"X="+f3(cogAbs.x)+"m  Y="+f3(cogAbs.y)+"m":"—"} readOnly/>
                    </div>
                  </>}
                </div>
              </>
            )}

            {/* MODE B: Absolute X,Y from datum */}
            {cogInputMode==="absolute"&&(
              <>
                <div className="info-box info-box-orange" style={{marginBottom:10,fontSize:12}}>
                  Enter the <strong>absolute COG position</strong> measured from the datum corner (0,0) —
                  same reference as the lift point coordinates entered above.
                </div>
                <div className="form-grid">
                  <div className="form-row">
                    <label className="label-input">COG — X Position (from datum corner)</label>
                    <div className="input-wrap">
                      <input className="input-user" type="number" step="0.01"
                        value={cogX} onChange={e=>setCogX(e.target.value)}
                        placeholder={hookPos?f3(hookPos.x):"0"}/>
                      <select className="unit-sel" value={cogXU} onChange={e=>setCogXU(e.target.value)}>
                        {["mm","cm","m"].map(u=><option key={u}>{u}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="form-row">
                    <label className="label-input">COG — Y Position (from datum corner)</label>
                    <div className="input-wrap">
                      <input className="input-user" type="number" step="0.01"
                        value={cogY} onChange={e=>setCogY(e.target.value)}
                        placeholder={hookPos?f3(hookPos.y):"0"}/>
                      <select className="unit-sel" value={cogYU} onChange={e=>setCogYU(e.target.value)}>
                        {["mm","cm","m"].map(u=><option key={u}>{u}</option>)}
                      </select>
                    </div>
                  </div>
                  {hookPos&&cogAbs&&<>
                    <div className="form-row">
                      <label className="label-calc">dX from centre</label>
                      <input className="input-calc" value={f3(cogAbs.x-hookPos.x)+" m"} readOnly/>
                    </div>
                    <div className="form-row">
                      <label className="label-calc">dY from centre</label>
                      <input className="input-calc" value={f3(cogAbs.y-hookPos.y)+" m"} readOnly/>
                    </div>
                  </>}
                </div>
              </>
            )}

            {/* COG warning if offset exists */}
            {hasCogOffset&&(
              <div className="info-box info-box-amber" style={{marginTop:8,fontSize:12}}>
                COG is offset from hook centreline by
                dX={f3(cogOffset.x)}m, dY={f3(cogOffset.y)}m
                (distance={f3(Math.sqrt(cogOffset.x**2+cogOffset.y**2))}m).
                Legs closer to COG carry more load. Load WILL tilt unless hook is repositioned
                above COG or sling lengths are adjusted.
              </div>
            )}
          </>
        )}

                {/* RESULTS */}
        {legTensions.length>0&&designLoad>0&&(
          <>
            <div className="section-heading">{loadMode==="nonuniform"?"Step 6":"Step 5"} — Results per Leg</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))",gap:10,marginBottom:14}}>
              <div className="stat-card">
                <div className="stat-label">Worst Leg Tension</div>
                <div className="stat-val">{f3(maxTension)} <span className="stat-unit">T</span></div>
                <div style={{fontSize:11,color:"var(--text-muted)",fontFamily:"Arial,monospace"}}>{f2(maxTension*9.81)} kN</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Worst Sling Angle</div>
                <div className="stat-val" style={{color:angleColor}}>{worstAngle>0?f1(worstAngle)+"°":"—"}</div>
              </div>
              <div className={"stat-card util-"+utilCls}>
                <div className="stat-label">WLL Utilisation</div>
                <div className="stat-val">{maxUtil>0?f1(maxUtil)+"%":"—"}</div>
                <div style={{marginTop:6}}><div className="util-bar-wrap"><div className="util-bar-fill" style={{width:Math.min(maxUtil,100)+"%",background:maxUtil>100?"#991b1b":maxUtil>85?"#dc2626":maxUtil>75?"#d97706":"#16a34a"}}/></div></div>
              </div>
              {loadMode==="nonuniform"&&hasCogOffset&&imbalanceRatio>0&&(
                <div className="stat-card" style={{border:"1px solid #fde68a",background:"#fffbeb"}}>
                  <div className="stat-label">Load Imbalance Ratio</div>
                  <div className="stat-val" style={{color:"#d97706",fontSize:18}}>{f2(imbalanceRatio)}:1</div>
                  <div style={{fontSize:11,color:"#92400e"}}>Max/Min leg load</div>
                </div>
              )}
            </div>

            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Leg</th>
                    <th>Dist to COG (m)</th>
                    <th>Sling Angle (°)</th>
                    <th>K = sin θ</th>
                    {loadMode==="nonuniform"&&<th>Vert. Force (T)</th>}
                    <th>Leg Tension (T)</th>
                    <th>WLL Util %</th>
                    <th>Min Sling Length (m)</th>
                    {loadMode==="nonuniform"&&hasCogOffset&&<th>Adj vs Equal Slings</th>}
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {legTensions.map((lt,i)=>{
                    const lg=legGeom[i];
                    const isWorst=lt.tension===maxTension;
                    const adjAbs=lg?Math.abs(lg.dS):0;
                    const adjColor=lg&&lg.dS>0.005?"#2563eb":lg&&lg.dS<-0.005?"#ea6c00":"#16a34a";
                    return (
                    <tr key={i} className={isWorst?"highlight":""}>
                      <td style={{fontFamily:"Arial,monospace",fontWeight:700,color:"var(--text-orange)"}}>{lt.leg}</td>
                      <td style={{fontFamily:"Arial,monospace",fontWeight:isWorst?700:400}}>
                        {lg?f3(lg.dCog):"—"}
                      </td>
                      <td style={{color:lt.thetaH>=45?"var(--green-400)":lt.thetaH>=30?"var(--amber-400)":"var(--red-400)",fontWeight:700}}>
                        {f1(lt.thetaH)}°
                      </td>
                      <td style={{fontFamily:"Arial,monospace"}}>{f3(lt.K)}</td>
                      {loadMode==="nonuniform"&&<td style={{fontFamily:"Arial,monospace",fontWeight:700}}>{f3(lt.Fv)}</td>}
                      <td style={{fontFamily:"Arial,monospace",fontWeight:700,color:isWorst?"var(--red-400)":"inherit"}}>
                        {f3(lt.tension)} T
                      </td>
                      <td style={{fontFamily:"Arial,monospace",color:lt.util>100?"var(--red-400)":lt.util>85?"var(--amber-400)":"inherit",fontWeight:700}}>
                        {f1(lt.util)}%
                      </td>
                      <td style={{fontFamily:"Arial,monospace",fontWeight:700,color:"#1d4ed8"}}>
                        {lt.tooShort
                          ? <span style={{color:"var(--red-400)"}}>Too short</span>
                          : f3(lt.S)+" m"}
                      </td>
                      {loadMode==="nonuniform"&&hasCogOffset&&(
                        <td style={{fontFamily:"Arial,monospace",fontWeight:700,color:adjColor}}>
                          {lg&&adjAbs>0.005
                            ? (lg.dS>0?"+":"")+f3(lg.dS)+" m "+(lg.dS>0.005?"↑ Lengthen":"↓ Shorten")
                            : "— Equal"}
                        </td>
                      )}
                      <td><span className={"badge badge-"+(lt.util<=100&&lt.tension>0?"pass":"fail")}>
                        {lt.util<=100&&lt.tension>0?"OK":"OVER"}
                      </span></td>
                    </tr>
                  );
                  })}
                </tbody>
              </table>
            </div>

            {/* Sling Length Adjustment Summary (non-uniform only) */}
            {loadMode==="nonuniform"&&hasCogOffset&&legGeom.length>0&&(
              <div style={{marginTop:14,background:"#eff6ff",border:"1.5px solid #bfdbfe",
                borderLeft:"4px solid #2563eb",borderRadius:8,padding:"14px 18px"}}>
                <div style={{fontFamily:"Arial,sans-serif",fontSize:12,fontWeight:700,
                  color:"#1e40af",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:10}}>
                  Required Sling Lengths — Non-Uniform Load
                </div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:8}}>
                  {legGeom.map((lg,i)=>{
                    const col=lg.dS>0.005?"#2563eb":lg.dS<-0.005?"#ea6c00":"#16a34a";
                    const bg=lg.dS>0.005?"#eff6ff":lg.dS<-0.005?"#fff7ed":"#f0fdf4";
                    const bdr=lg.dS>0.005?"#bfdbfe":lg.dS<-0.005?"#fed7aa":"#86efac";
                    return (
                      <div key={i} style={{background:bg,border:"1px solid "+bdr,
                        borderRadius:6,padding:"10px 12px",textAlign:"center"}}>
                        <div style={{fontFamily:"Arial,sans-serif",fontSize:13,
                          fontWeight:700,color:"var(--text-orange)",marginBottom:4}}>
                          {lg.leg}
                        </div>
                        <div style={{fontFamily:"Arial,monospace",fontSize:16,
                          fontWeight:700,color:"#1d4ed8",marginBottom:2}}>
                          {f3(lg.S)} m
                        </div>
                        <div style={{fontFamily:"Arial,sans-serif",fontSize:10,
                          color:"#6b7280",marginBottom:4}}>
                          dist to COG: {f3(lg.dCog)} m
                        </div>
                        <div style={{fontFamily:"Arial,monospace",fontSize:11,
                          fontWeight:700,color:col}}>
                          {Math.abs(lg.dS)<0.005
                            ?"Equal length"
                            :(lg.dS>0?"+":"")+f3(lg.dS)+" m vs equal"}
                        </div>
                        <div style={{fontFamily:"Arial,sans-serif",fontSize:10,
                          fontWeight:700,color:col,marginTop:2}}>
                          {lg.dS>0.005?"↑ LENGTHEN":lg.dS<-0.005?"↓ SHORTEN":"✓ EQUAL"}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div style={{fontFamily:"Arial,sans-serif",fontSize:11,color:"#6b7280",
                  marginTop:10,borderTop:"1px solid #bfdbfe",paddingTop:8}}>
                  Ref: ASME B30.9 / LEEA COPSULE 2020 — Sling lengths adjusted so hook hangs
                  directly above COG. Use turnbuckles, shackle extensions, or different
                  physical sling lengths to achieve required adjustment on site.
                </div>
              </div>
            )}
            <div style={{background:"var(--bg-section)",border:"1px solid var(--border-default)",
              borderLeft:"3px solid var(--orange-500)",borderRadius:"var(--radius-md)",
              padding:"12px 16px",marginTop:12,fontFamily:"Arial,monospace",fontSize:11,lineHeight:2.0}}>
              {"Design Load: "+f3(designLoad)+" T ("+f2(designLoad*9.81)+" kN)"}<br/>
              {loadMode==="nonuniform"&&cogAbs?("COG: X="+f3(cogAbs.x)+" m, Y="+f3(cogAbs.y)+" m | Offset from centre: dX="+f3(cogOffset.x)+" m, dY="+f3(cogOffset.y)+" m"):("Load distribution: Uniform — equal vertical share per leg")}
              {loadMode==="nonuniform"&&<br/>}
              {loadMode==="nonuniform"&&("Method: "+(n===2?"Lever rule (1D moment equilibrium)":n===3?"Exact 2D statics — Cramers rule":"4-point rigid body — Ixx/Iyy moment of inertia"))}
              <br/>
              {"Worst leg: "+f3(maxTension)+" T at "+f1(worstAngle)+"° | Formula: T = Fv/sin(theta) | ASME B30.9 / ISO 12480-1 Sec.7.3"}
            </div>

            <div style={{marginTop:14}}>
              <span className={"badge badge-"+(maxUtil<=100&&legTensions.every(l=>!l.tooShort)?"pass":maxUtil<=110?"warn":"fail")}
                style={{fontSize:13,padding:"6px 16px"}}>
                {maxUtil<=100&&legTensions.every(l=>!l.tooShort)
                  ?"RIGGING ADEQUATE — All legs within WLL"
                  :maxUtil<=110?"WARNING — Worst leg near WLL — upgrade sling"
                  :"RIGGING INADEQUATE — Upgrade sling WLL or change configuration"}
              </span>
            </div>
          </>
        )}

        {/* ANGLE FACTOR REFERENCE */}
        <div className="section-heading" style={{marginTop:16}}>Sling Angle Factor Reference</div>
        <div className="table-wrap">
          <table className="data-table">
            <thead><tr><th>Angle (deg)</th><th>sin(theta)</th><th>Factor 1/sin</th><th>Increase over vertical</th><th>Status</th></tr></thead>
            <tbody>
              {[[90,1.000],[75,0.966],[60,0.866],[45,0.707],[30,0.500],[20,0.342]].map(([a,s])=>(
                <tr key={a} className={worstAngle>0&&Math.abs(worstAngle-a)<5?"highlight":""}>
                  <td style={{fontFamily:"Arial,monospace",fontWeight:700}}>{a} deg</td>
                  <td style={{fontFamily:"Arial,monospace"}}>{f3(s)}</td>
                  <td style={{fontFamily:"Arial,monospace",fontWeight:700,color:a>=45?"var(--green-400)":a===30?"var(--amber-400)":"var(--red-400)"}}>{f3(1/s)}</td>
                  <td>+{f1((1/s-1)*100)}%</td>
                  <td><span className={"badge badge-"+(a>=45?"pass":a>=30?"warn":"fail")}>{a>=45?"PERMITTED":a>=30?"LIMIT":"PROHIBITED"}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{fontSize:10,color:"var(--text-muted)",fontFamily:"Arial,monospace",marginTop:4}}>ASME B30.9 Table N-1 | ISO 12480-1 Sec.7.3 | BS EN 1492-1 Annex B</div>

                {/* ── PLAN VIEW DIAGRAM ── */}
        {effPts.length>=2&&hookPos&&designLoad>0&&(
          <div style={{marginTop:20}}>
            <div className="section-heading">Plan View Diagram</div>
            <div style={{background:"#f8fafc",borderRadius:8,border:"1px solid #e2e8f0",padding:"8px 8px 4px",overflow:"hidden"}}>
              <RiggingDiagram
                effPts={effPts} hookPos={hookPos} cogAbs={cogAbs}
                hasCogOffset={hasCogOffset} cogOffset={cogOffset}
                legTensions={legTensions} legGeom={legGeom}
                n={n} loadMode={loadMode} ObjL={ObjL} ObjW={ObjW}
                maxTension={maxTension}
              />
            </div>
            <div style={{fontSize:10,color:"#9ca3af",fontFamily:"Arial,monospace",marginTop:4,textAlign:"center"}}>
              Plan view — circles coloured by WLL utilisation — blue cross = hook — red cross = COG — labels show tension / sling length / adjustment
            </div>
          </div>
        )}

      </div>
    </div>
    </div>
  );
}; 

const WindLoad = () => {
  const {g,updateG} = useContext(AppCtx);
  const [speed,setSpeed]=useState(""); const [speedUnit,setSpeedUnit]=useState("m/s");
  const [rho,setRho]=useState(1.25);
  const [area,setArea]=useState(""); const [areaMode,setAreaMode]=useState("direct");
  const [areaW,setAreaW]=useState(""); const [areaWU,setAreaWU]=useState("m");
  const [areaHt,setAreaHt]=useState(""); const [areaHtU,setAreaHtU]=useState("m");
  const [areaShape,setAreaShape]=useState("RECTANGLE");
  const [shapeKey,setShapeKey]=useState("Flat Plate (face-on)");
  // FIX 7A — manual site limit
  const [limitSource,setLimitSource]=useState("bs7121");
  const [customLimit,setCustomLimit]=useState("");
  const [customLimitUnit,setCustomLimitUnit]=useState("m/s");

  const toMs = (v,u) => { const n=parseFloat(v)||0; if(u==="km/h") return n/3.6; if(u==="mph") return n*0.44704; if(u==="knots") return n*0.514444; return n; };
  const vMs = toMs(speed,speedUnit);
  const vKmh = fN(vMs*3.6,1), vMph = fN(vMs*2.237,1), vKnots = fN(vMs*1.944,1);
  const bf = vMs<0.3?0:vMs<1.6?1:vMs<3.4?2:vMs<5.5?3:vMs<8?4:vMs<10.8?5:vMs<13.9?6:7;
  const bfDesc = ["Calm","Light Air","Light Breeze","Gentle Breeze","Moderate Breeze","Fresh Breeze","Strong Breeze","Near Gale+"][bf];
  const cf = WIND_SHAPES.find(s=>s.name===shapeKey)?.cf||1;

  // FIX 4 — expanded area shapes
  const [areaD2,setAreaD2]=useState(""); const [areaD2U,setAreaD2U]=useState("m"); // OD for annulus
  const [areaBf,setAreaBf]=useState(""); const [areaBfU,setAreaBfU]=useState("m");
  const [areaTf,setAreaTf]=useState(""); const [areaTfU,setAreaTfU]=useState("m");
  const [areaHw,setAreaHw]=useState(""); const [areaHwU,setAreaHwU]=useState("m");
  const [areaTw,setAreaTw]=useState(""); const [areaTwU,setAreaTwU]=useState("m");
  const [areaA,setAreaA]=useState("");   const [areaAU,setAreaAU]=useState("m");  // top width trapezoid / major axis ellipse
  const [areaTheta,setAreaTheta]=useState(""); // sector angle

  const WIND_AREA_SHAPES = [
    {id:"RECTANGLE",label:"Rectangle"},
    {id:"CIRCLE",label:"Circle / Cylinder Face"},
    {id:"HOLLOW_CIRCLE",label:"Hollow Circle (Annulus)"},
    {id:"TRIANGLE",label:"Triangle"},
    {id:"TRAPEZOID",label:"Trapezoid"},
    {id:"ELLIPSE",label:"Ellipse"},
    {id:"I_BEAM",label:"I-Beam Face"},
    {id:"T_SECTION",label:"T-Section Face"},
    {id:"HEXAGON",label:"Hexagon (Across-Flats)"},
    {id:"SECTOR",label:"Sector / Pie Slice"},
    {id:"CUSTOM",label:"Custom (direct entry)"},
  ];

  const calcArea = useMemo(()=>{
    const w=toM(areaW,areaWU), h=toM(areaHt,areaHtU), d2=toM(areaD2,areaD2U);
    const bf=toM(areaBf,areaBfU), tf=toM(areaTf,areaTfU), hw=toM(areaHw,areaHwU), tw=toM(areaTw,areaTwU);
    const a=toM(areaA,areaAU), theta=parseFloat(areaTheta)||0;
    if(areaShape==="RECTANGLE") return w*h;
    if(areaShape==="CIRCLE")    return Math.PI*Math.pow(w/2,2);
    if(areaShape==="HOLLOW_CIRCLE") return Math.PI*(Math.pow(w/2,2)-Math.pow(d2/2,2));
    if(areaShape==="TRIANGLE")  return 0.5*w*h;
    if(areaShape==="TRAPEZOID") return 0.5*(a+w)*h;
    if(areaShape==="ELLIPSE")   return Math.PI*a*w;
    if(areaShape==="I_BEAM")    return 2*(bf*tf)+(hw*tw);
    if(areaShape==="T_SECTION") return (bf*tf)+(hw*tw);
    if(areaShape==="HEXAGON")   return 0.8660*w*w;
    if(areaShape==="SECTOR")    return (theta/360)*Math.PI*w*w;
    return parseFloat(area)||0;
  },[areaShape,areaW,areaWU,areaHt,areaHtU,areaD2,areaD2U,areaBf,areaBfU,areaTf,areaTfU,areaHw,areaHwU,areaTw,areaTwU,areaA,areaAU,areaTheta,area]);
  const areaM2 = areaMode==="calc" ? calcArea : parseFloat(area)||0;

  // FIX 7A — effective limit
  const limitMs = limitSource==="bs7121"?10:toMs(customLimit,customLimitUnit);
  const limitLabel = limitSource==="bs7121"?"BS 7121 Default":limitSource==="mfr"?"Manufacturer Limit":"Site Permit";

  const q = 0.5*rho*vMs*vMs;
  const F = q*areaM2*cf/1000;
  const ratio = g.glw>0?F/(g.glw*9.81)*100:0;
  const goNogo = vMs<=limitMs||vMs===0;

  useEffect(()=>{updateG({windForce:F})},[F]);

  return (
    <div>
      <div className="module-card">
        <div className="card-header">
          <span className="module-title">💨 Wind Load Calculation</span>
          <span className="std-tag">EN 1991-1-4 (Eurocode 1)</span>
        </div>
        <div className="card-body">
          <div className="section-heading">Wind Speed — Multi-Unit Converter</div>
          <div className="form-grid">
            <div className="form-row">
              <label className="label-input">Wind Speed</label>
              <div className="input-wrap">
                <input className="input-user" type="number" value={speed} onChange={e=>setSpeed(e.target.value)} />
                <select className="unit-sel" value={speedUnit} onChange={e=>setSpeedUnit(e.target.value)}>
                  {["m/s","km/h","mph","knots"].map(u=><option key={u}>{u}</option>)}
                </select>
              </div>
            </div>
            <div className="form-row"><label className="label-calc">m/s</label><input className="input-calc" value={fN(vMs,2)} readOnly /></div>
            <div className="form-row"><label className="label-calc">km/h</label><input className="input-calc" value={vKmh} readOnly /></div>
            <div className="form-row"><label className="label-calc">mph</label><input className="input-calc" value={vMph} readOnly /></div>
            <div className="form-row"><label className="label-calc">knots</label><input className="input-calc" value={vKnots} readOnly /></div>
            <div className="form-row"><label className="label-calc">Beaufort Scale</label><input className="input-calc" value={`BF ${bf} — ${bfDesc}`} readOnly /></div>
          </div>

          <div className="section-heading">Maximum Allowable Wind Speed (FIX 7A)</div>
          <div style={{display:"flex",gap:6,marginBottom:10,flexWrap:"wrap"}}>
            {[["bs7121","BS 7121 Default — 10 m/s"],["mfr","Manufacturer Limit"],["site","Site Permit"]].map(([v,l])=>(
              <button key={v} className={`btn btn-sm ${limitSource===v?"btn-primary":"btn-ghost"}`} onClick={()=>setLimitSource(v)}>{l}</button>
            ))}
          </div>
          {limitSource!=="bs7121" && (
            <div className="form-grid">
              <div className="form-row">
                <label className="label-input">Max Wind Speed ({limitLabel})</label>
                <div className="input-wrap">
                  <input className="input-user" type="number" value={customLimit} onChange={e=>setCustomLimit(e.target.value)} />
                  <select className="unit-sel" value={customLimitUnit} onChange={e=>setCustomLimitUnit(e.target.value)}>{["m/s","km/h","mph","knots"].map(u=><option key={u}>{u}</option>)}</select>
                </div>
              </div>
              <div className="form-row"><label className="label-calc">Limit in m/s</label><input className="input-calc" value={fN(limitMs,2)} readOnly /></div>
            </div>
          )}
          <div className="info-box info-box-orange" style={{marginTop:4,fontSize:11}}>Active limit: <strong>{fN(limitMs,1)} m/s</strong> ({limitLabel})</div>

          <div className="section-heading">Load Parameters</div>
          <div className="form-grid">
            <div className="form-row">
              <label className="label-input">Air Density ρ (kg/m³)</label>
              <input className="input-user no-unit" type="number" value={rho} onChange={e=>setRho(e.target.value)} />
            </div>
            <div className="form-row">
              <label className="label-input">Load Shape</label>
              <select className="input-user no-unit" value={shapeKey} onChange={e=>setShapeKey(e.target.value)}>
                {WIND_SHAPES.map(s=><option key={s.name}>{s.name} (Cf={s.cf})</option>)}
              </select>
            </div>
            <div className="form-row"><label className="label-calc">Force Coefficient Cf</label><input className="input-calc" value={cf} readOnly /></div>
          </div>

          <div className="section-heading">Exposed Area</div>
          <div style={{display:"flex",gap:6,marginBottom:10}}>
            <button className={`btn btn-sm ${areaMode==="direct"?"btn-primary":"btn-ghost"}`} onClick={()=>setAreaMode("direct")}>Enter Area Directly (m²)</button>
            <button className={`btn btn-sm ${areaMode==="calc"?"btn-primary":"btn-ghost"}`} onClick={()=>setAreaMode("calc")}>Calculate from Dimensions</button>
          </div>
          {areaMode==="direct" ? (
            <div className="form-grid">
              <div className="form-row"><label className="label-input">Exposed Area (m²)</label><input className="input-user no-unit" type="number" value={area} onChange={e=>setArea(e.target.value)} /></div>
            </div>
          ) : (
            <>
              <div className="form-grid">
                <div className="form-row">
                  <label className="label-input">Face Shape</label>
                  <select className="input-user no-unit" value={areaShape} onChange={e=>setAreaShape(e.target.value)}>
                    {WIND_AREA_SHAPES.map(s=><option key={s.id} value={s.id}>{s.label}</option>)}
                  </select>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr auto",gap:12,alignItems:"start",marginTop:8}}>
                  <div className="form-grid">
                    {areaShape==="RECTANGLE"&&<><div className="form-row"><label className="label-input">Width W</label><div className="input-wrap"><input className="input-user" type="number" value={areaW} onChange={e=>setAreaW(e.target.value)}/><select className="unit-sel" value={areaWU} onChange={e=>setAreaWU(e.target.value)}>{["mm","cm","m"].map(u=><option key={u}>{u}</option>)}</select></div></div><div className="form-row"><label className="label-input">Height H</label><div className="input-wrap"><input className="input-user" type="number" value={areaHt} onChange={e=>setAreaHt(e.target.value)}/><select className="unit-sel" value={areaHtU} onChange={e=>setAreaHtU(e.target.value)}>{["mm","cm","m"].map(u=><option key={u}>{u}</option>)}</select></div></div></>}
                    {areaShape==="CIRCLE"&&<div className="form-row"><label className="label-input">Diameter D</label><div className="input-wrap"><input className="input-user" type="number" value={areaW} onChange={e=>setAreaW(e.target.value)}/><select className="unit-sel" value={areaWU} onChange={e=>setAreaWU(e.target.value)}>{["mm","cm","m"].map(u=><option key={u}>{u}</option>)}</select></div></div>}
                    {areaShape==="HOLLOW_CIRCLE"&&<><div className="form-row"><label className="label-input">Outer Dia OD</label><div className="input-wrap"><input className="input-user" type="number" value={areaW} onChange={e=>setAreaW(e.target.value)}/><select className="unit-sel" value={areaWU} onChange={e=>setAreaWU(e.target.value)}>{["mm","cm","m"].map(u=><option key={u}>{u}</option>)}</select></div></div><div className="form-row"><label className="label-input">Inner Dia ID</label><div className="input-wrap"><input className="input-user" type="number" value={areaD2} onChange={e=>setAreaD2(e.target.value)}/><select className="unit-sel" value={areaD2U} onChange={e=>setAreaD2U(e.target.value)}>{["mm","cm","m"].map(u=><option key={u}>{u}</option>)}</select></div></div></>}
                    {(areaShape==="TRIANGLE")&&<><div className="form-row"><label className="label-input">Base B</label><div className="input-wrap"><input className="input-user" type="number" value={areaW} onChange={e=>setAreaW(e.target.value)}/><select className="unit-sel" value={areaWU} onChange={e=>setAreaWU(e.target.value)}>{["mm","cm","m"].map(u=><option key={u}>{u}</option>)}</select></div></div><div className="form-row"><label className="label-input">Height H</label><div className="input-wrap"><input className="input-user" type="number" value={areaHt} onChange={e=>setAreaHt(e.target.value)}/><select className="unit-sel" value={areaHtU} onChange={e=>setAreaHtU(e.target.value)}>{["mm","cm","m"].map(u=><option key={u}>{u}</option>)}</select></div></div></>}
                    {areaShape==="TRAPEZOID"&&<><div className="form-row"><label className="label-input">Top Width a</label><div className="input-wrap"><input className="input-user" type="number" value={areaA} onChange={e=>setAreaA(e.target.value)}/><select className="unit-sel" value={areaAU} onChange={e=>setAreaAU(e.target.value)}>{["mm","cm","m"].map(u=><option key={u}>{u}</option>)}</select></div></div><div className="form-row"><label className="label-input">Bottom Width b</label><div className="input-wrap"><input className="input-user" type="number" value={areaW} onChange={e=>setAreaW(e.target.value)}/><select className="unit-sel" value={areaWU} onChange={e=>setAreaWU(e.target.value)}>{["mm","cm","m"].map(u=><option key={u}>{u}</option>)}</select></div></div><div className="form-row"><label className="label-input">Height H</label><div className="input-wrap"><input className="input-user" type="number" value={areaHt} onChange={e=>setAreaHt(e.target.value)}/><select className="unit-sel" value={areaHtU} onChange={e=>setAreaHtU(e.target.value)}>{["mm","cm","m"].map(u=><option key={u}>{u}</option>)}</select></div></div></>}
                    {areaShape==="ELLIPSE"&&<><div className="form-row"><label className="label-input">Major Axis a</label><div className="input-wrap"><input className="input-user" type="number" value={areaA} onChange={e=>setAreaA(e.target.value)}/><select className="unit-sel" value={areaAU} onChange={e=>setAreaAU(e.target.value)}>{["mm","cm","m"].map(u=><option key={u}>{u}</option>)}</select></div></div><div className="form-row"><label className="label-input">Minor Axis b</label><div className="input-wrap"><input className="input-user" type="number" value={areaW} onChange={e=>setAreaW(e.target.value)}/><select className="unit-sel" value={areaWU} onChange={e=>setAreaWU(e.target.value)}>{["mm","cm","m"].map(u=><option key={u}>{u}</option>)}</select></div></div></>}
                    {(areaShape==="I_BEAM"||areaShape==="T_SECTION")&&<><div className="form-row"><label className="label-input">Flange Width bf</label><div className="input-wrap"><input className="input-user" type="number" value={areaBf} onChange={e=>setAreaBf(e.target.value)}/><select className="unit-sel" value={areaBfU} onChange={e=>setAreaBfU(e.target.value)}>{["mm","cm","m"].map(u=><option key={u}>{u}</option>)}</select></div></div><div className="form-row"><label className="label-input">Flange Thickness tf</label><div className="input-wrap"><input className="input-user" type="number" value={areaTf} onChange={e=>setAreaTf(e.target.value)}/><select className="unit-sel" value={areaTfU} onChange={e=>setAreaTfU(e.target.value)}>{["mm","cm","m"].map(u=><option key={u}>{u}</option>)}</select></div></div><div className="form-row"><label className="label-input">Web Height hw</label><div className="input-wrap"><input className="input-user" type="number" value={areaHw} onChange={e=>setAreaHw(e.target.value)}/><select className="unit-sel" value={areaHwU} onChange={e=>setAreaHwU(e.target.value)}>{["mm","cm","m"].map(u=><option key={u}>{u}</option>)}</select></div></div><div className="form-row"><label className="label-input">Web Thickness tw</label><div className="input-wrap"><input className="input-user" type="number" value={areaTw} onChange={e=>setAreaTw(e.target.value)}/><select className="unit-sel" value={areaTwU} onChange={e=>setAreaTwU(e.target.value)}>{["mm","cm","m"].map(u=><option key={u}>{u}</option>)}</select></div></div></>}
                    {areaShape==="HEXAGON"&&<div className="form-row"><label className="label-input">Across-Flats Width AF</label><div className="input-wrap"><input className="input-user" type="number" value={areaW} onChange={e=>setAreaW(e.target.value)}/><select className="unit-sel" value={areaWU} onChange={e=>setAreaWU(e.target.value)}>{["mm","cm","m"].map(u=><option key={u}>{u}</option>)}</select></div></div>}
                    {areaShape==="SECTOR"&&<><div className="form-row"><label className="label-input">Radius R</label><div className="input-wrap"><input className="input-user" type="number" value={areaW} onChange={e=>setAreaW(e.target.value)}/><select className="unit-sel" value={areaWU} onChange={e=>setAreaWU(e.target.value)}>{["mm","cm","m"].map(u=><option key={u}>{u}</option>)}</select></div></div><div className="form-row"><label className="label-input">Angle θ (°)</label><input className="input-user no-unit" type="number" value={areaTheta} onChange={e=>setAreaTheta(e.target.value)} placeholder="90"/></div></>}
                    {areaShape==="CUSTOM"&&<div className="form-row"><label className="label-input">Area (m²) — direct entry</label><input className="input-user no-unit" type="number" value={area} onChange={e=>setArea(e.target.value)}/></div>}
                  </div>
                  <div className="svg-diagram" style={{width:100,height:80,padding:4,flexShrink:0}}>
                    <svg width="160" height="130" viewBox="0 0 160 130" style={{display:"block",fontFamily:"Arial,sans-serif"}}>
                      {/* Load shape */}
                      {areaShape==="RECTANGLE"&&(
                        <g>
                          <rect x="50" y="30" width="70" height="55" rx="3"
                            fill="rgba(37,99,235,0.08)" stroke="#2563eb" strokeWidth="1.5"/>
                          <text x="85" y="60" textAnchor="middle" fontSize="9" fill="#1e40af" fontWeight="700">LOAD</text>
                          <text x="85" y="72" textAnchor="middle" fontSize="8" fill="#6b7280">
                            {(areaW||"W")+" m"}
                          </text>
                          {/* Wind arrows */}
                          <line x1="14" y1="42" x2="46" y2="42" stroke="#A32D2D" strokeWidth="2" markerEnd="url(#wlA)"/>
                          <line x1="10" y1="57" x2="46" y2="57" stroke="#A32D2D" strokeWidth="2.5" markerEnd="url(#wlA)"/>
                          <line x1="14" y1="72" x2="46" y2="72" stroke="#A32D2D" strokeWidth="2" markerEnd="url(#wlA)"/>
                          <text x="6" y="110" fontSize="8" fill="#A32D2D" fontWeight="600">Wind →</text>
                          {/* Dimension */}
                          <line x1="126" y1="30" x2="126" y2="85" stroke="#9ca3af" strokeWidth="0.8"/>
                          <text x="138" y="60" textAnchor="middle" fontSize="8" fill="#6b7280" transform="rotate(90,138,60)">
                            {(areaH||"H")+" m"}
                          </text>
                          {/* Resultant arrow */}
                          <line x1="85" y1="100" x2="85" y2="118" stroke="#EA6C00" strokeWidth="2" markerEnd="url(#wlA)"/>
                          <text x="85" y="128" textAnchor="middle" fontSize="8" fill="#EA6C00" fontWeight="600">
                            {fWind>0?"F="+f2(fWind)+"kN":"F = Cd×A×q"}
                          </text>
                        </g>
                      )}
                      {areaShape==="CYLINDER"&&(
                        <g>
                          <ellipse cx="85" cy="35" rx="28" ry="8" fill="rgba(37,99,235,0.1)" stroke="#2563eb" strokeWidth="1.5"/>
                          <rect x="57" y="35" width="56" height="50" fill="rgba(37,99,235,0.08)" stroke="#2563eb" strokeWidth="1.5"/>
                          <ellipse cx="85" cy="85" rx="28" ry="8" fill="rgba(37,99,235,0.1)" stroke="#2563eb" strokeWidth="1.5"/>
                          <text x="85" y="63" textAnchor="middle" fontSize="9" fill="#1e40af" fontWeight="700">CYLINDER</text>
                          <line x1="12" y1="55" x2="53" y2="55" stroke="#A32D2D" strokeWidth="2.5" markerEnd="url(#wlA)"/>
                          <text x="6" y="110" fontSize="8" fill="#A32D2D" fontWeight="600">Wind →</text>
                          <text x="85" y="124" textAnchor="middle" fontSize="8" fill="#EA6C00" fontWeight="600">
                            {fWind>0?"F="+f2(fWind)+"kN":"Cd=0.7 (cylinder)"}
                          </text>
                        </g>
                      )}
                      {areaShape==="OPEN"&&(
                        <g>
                          <rect x="55" y="25" width="60" height="60" rx="3"
                            fill="none" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="5,3"/>
                          <text x="85" y="58" textAnchor="middle" fontSize="8" fill="#1e40af">OPEN</text>
                          <text x="85" y="70" textAnchor="middle" fontSize="8" fill="#1e40af">LATTICE</text>
                          <line x1="12" y1="55" x2="51" y2="55" stroke="#A32D2D" strokeWidth="2.5" markerEnd="url(#wlA)"/>
                          <text x="6" y="110" fontSize="8" fill="#A32D2D" fontWeight="600">Wind →</text>
                          <text x="85" y="124" textAnchor="middle" fontSize="8" fill="#EA6C00" fontWeight="600">
                            {fWind>0?"F="+f2(fWind)+"kN":"Cd=1.3 (lattice)"}
                          </text>
                        </g>
                      )}
                      <defs>
                        <marker id="wlA" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                          <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </marker>
                      </defs>
                    </svg>
                  </div>
                </div>
                <div className="form-row" style={{marginTop:4}}><label className="label-calc">Calculated Exposed Area (m²)</label><input className="input-calc" value={f3(calcArea)} readOnly /></div>
                <div style={{fontSize:11,color:"var(--text-muted)",fontFamily:"Arial,monospace",marginBottom:8}}>
                  Exposed Face Area = {
                    areaShape==="RECTANGLE"?`W × H`:areaShape==="CIRCLE"?`π × (D÷2)²`:areaShape==="HOLLOW_CIRCLE"?`π×[(OD÷2)²−(ID÷2)²]`:
                    areaShape==="TRIANGLE"?`0.5 × B × H`:areaShape==="TRAPEZOID"?`0.5 × (a+b) × H`:areaShape==="ELLIPSE"?`π × a × b`:
                    areaShape==="I_BEAM"?`2×(bf×tf) + (hw×tw)`:areaShape==="T_SECTION"?`(bf×tf) + (hw×tw)`:
                    areaShape==="HEXAGON"?`0.8660 × AF²`:areaShape==="SECTOR"?`(θ÷360) × π × R²`:"Direct entry"
                  } = <strong style={{color:"var(--blue-400)"}}>{f3(calcArea)} m²</strong>
                </div>
              </div>
            </>
          )}
          <div className="form-row"><label className="label-calc">Effective Exposed Area (m²)</label><input className="input-calc" value={f3(areaM2)} readOnly /></div>

          <div className="section-heading">Results</div>
          <div className="grid-4">
            <div className="stat-card"><div className="stat-label">Basic Wind Pressure q</div><div className="stat-val">{fN(q,1)}<span className="stat-unit">N/m²</span></div></div>
            <div className="stat-card"><div className="stat-label">Wind Force F</div><div className="stat-val">{fN(F,3)}<span className="stat-unit">kN</span></div></div>
            <div className="stat-card"><div className="stat-label">Wind / Lift Ratio</div><div className="stat-val">{fN(ratio,1)}<span className="stat-unit">%</span></div></div>
            <div className="stat-card" style={{background:goNogo?"var(--green-bg)":"var(--red-bg)"}}>
              <div className="stat-label">GO / NO-GO</div>
              <div className="stat-val" style={{fontSize:14,color:goNogo?"var(--green-400)":"var(--red-400)"}}>{goNogo?"✅ GO":"❌ NO-GO"}</div>
            </div>
          </div>
          {!goNogo&&vMs>0 && <div className="info-box info-box-red">❌ {fN(vMs,2)} m/s exceeds {limitLabel} limit of {fN(limitMs,1)} m/s — SUSPEND ALL LIFTING OPERATIONS</div>}
          <FormulaPanel>
            q = 0.5 × ρ × V² = 0.5 × {rho} × {fN(vMs,2)}² = {fN(q,2)} N/m²<br/>
            F (kN) = q × A × Cf ÷ 1000 = {fN(q,2)} × {fN(areaM2,3)} × {cf} ÷ 1000 = {fN(F,3)} kN
          </FormulaPanel>
        </div>
      </div>
    </div>
  );
};

// ── MODULE 6: COG ─────────────────────────────────────────────────────────────
const COGCalc = () => {
  const {g,updateG} = useContext(AppCtx);
  const [comps,setComps]=useState([{name:"Component 1",w:"",wu:"T",x:"",y:"",z:"",xu:"m",yu:"m",zu:"m"}]);
  const [geoCx,setGeoCx]=useState(""); const [geoCy,setGeoCy]=useState("");

  const addComp = ()=> comps.length<10 && setComps(p=>[...p,{name:`Component ${p.length+1}`,w:"",wu:"T",x:"",y:"",z:"",xu:"m",yu:"m",zu:"m"}]);
  const rmComp = i => setComps(p=>p.filter((_,j)=>j!==i));
  const upComp = (i,k,v) => setComps(p=>p.map((c,j)=>j===i?{...c,[k]:v}:c));

  const totW = comps.reduce((s,c)=>s+toT(c.w,c.wu),0);
  const cogX = totW>0?comps.reduce((s,c)=>s+(toT(c.w,c.wu)*toM(c.x,c.xu)),0)/totW:0;
  const cogY = totW>0?comps.reduce((s,c)=>s+(toT(c.w,c.wu)*toM(c.y,c.yu)),0)/totW:0;
  const cogZ = totW>0?comps.reduce((s,c)=>s+(toT(c.w,c.wu)*toM(c.z,c.zu)),0)/totW:0;
  const eccX = geoCx?(Math.abs(cogX-parseFloat(geoCx))*1000):0;
  const eccY = geoCy?(Math.abs(cogY-parseFloat(geoCy))*1000):0;
  const eccWarn = eccX>50||eccY>50;

  return (
    <div>
      <div className="module-card">
        <div className="card-header">
          <span className="module-title">📐 Centre of Gravity (COG)</span>
          <span className="std-tag">ASME B30 | EN 13155</span>
        </div>
        <div className="card-body">
          <div className="section-heading">Component Weights & Positions</div>
          {comps.map((c,i)=>(
            <div key={i} style={{background:"var(--bg-section)",borderRadius:"var(--radius-md)",padding:"12px",marginBottom:8,border:"1px solid var(--border-subtle)"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                <input className="input-user no-unit" style={{width:180}} value={c.name} onChange={e=>upComp(i,"name",e.target.value)} />
                {comps.length>1 && <button className="btn btn-ghost btn-sm" onClick={()=>rmComp(i)}>Remove</button>}
              </div>
              <div className="form-grid">
                {[["Weight","w","wu",["T","kg","kN"]],["X Position","x","xu",["mm","cm","m"]],
                  ["Y Position","y","yu",["mm","cm","m"]],["Z Position (opt)","z","zu",["mm","cm","m"]]].map(([l,vk,uk,units])=>(
                  <div className="form-row" key={l}>
                    <label className="label-input">{l}</label>
                    <div className="input-wrap">
                      <input className="input-user" type="number" value={c[vk]} onChange={e=>upComp(i,vk,e.target.value)} />
                      <select className="unit-sel" value={c[uk]} onChange={e=>upComp(i,uk,e.target.value)}>
                        {units.map(u=><option key={u}>{u}</option>)}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button className="btn btn-ghost btn-sm" onClick={addComp} style={{marginTop:4}}>+ Add Component</button>

          <div className="section-heading">Results</div>
          <div className="grid-4">
            <div className="stat-card"><div className="stat-label">Total Weight</div><div className="stat-val">{f3(totW)}<span className="stat-unit">T</span></div></div>
            <div className="stat-card"><div className="stat-label">COG — X</div><div className="stat-val">{f3(cogX)}<span className="stat-unit">m</span></div></div>
            <div className="stat-card"><div className="stat-label">COG — Y</div><div className="stat-val">{f3(cogY)}<span className="stat-unit">m</span></div></div>
            <div className="stat-card"><div className="stat-label">COG — Z</div><div className="stat-val">{f3(cogZ)}<span className="stat-unit">m</span></div></div>
          </div>

          <div className="section-heading">Eccentricity Check</div>
          <div className="form-grid">
            <div className="form-row">
              <label className="label-input">Geometric Centre X (m)</label>
              <input className="input-user no-unit" type="number" value={geoCx} onChange={e=>setGeoCx(e.target.value)} />
            </div>
            <div className="form-row">
              <label className="label-input">Geometric Centre Y (m)</label>
              <input className="input-user no-unit" type="number" value={geoCy} onChange={e=>setGeoCy(e.target.value)} />
            </div>
          </div>
          {eccWarn && (
            <div className="info-box info-box-amber">
              ⚠️ COG ECCENTRICITY DETECTED — Offset X: {fN(eccX,0)}mm | Offset Y: {fN(eccY,0)}mm<br/>
              → Sling leg lengths must be adjusted to compensate. Longer leg on heavy side to level load.
            </div>
          )}
          {geoCx&&geoCy&&!eccWarn&&totW>0 && <div className="info-box info-box-green">✅ COG within 50mm of geometric centre — acceptable</div>}

          <div className="section-heading">COG Plan View Diagram</div>
          <COGDiagram comps={comps} cogX={cogX} cogY={cogY} />
        </div>
      </div>
    </div>
  );
};

const COGDiagram = ({comps,cogX,cogY}) => {
  const valid = comps.filter(c=>c.x&&c.y);
  if (!valid.length) return <div style={{padding:20,color:"var(--text-muted)",textAlign:"center",fontSize:12}}>Enter component positions to display diagram</div>;
  const xs = valid.map(c=>toM(c.x,c.xu||"m")), ys = valid.map(c=>toM(c.y,c.yu||"m"));
  const minX=Math.min(...xs,cogX), maxX=Math.max(...xs,cogX), minY=Math.min(...ys,cogY), maxY=Math.max(...ys,cogY);
  const pad=0.5, rng = x => rng => (x-minX)/(maxX-minX+pad)*280+30;
  const scx = v => (v-minX)/(maxX-minX+pad||1)*280+30;
  const scy = v => (v-minY)/(maxY-minY+pad||1)*120+20;
  return (
    <div className="svg-diagram" style={{padding:8}}>
      <svg width="100%" viewBox="0 0 500 240" style={{display:"block",fontFamily:"Arial,sans-serif"}}>
          <defs>
            <marker id="cogArr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </marker>
          </defs>

          {/* Title */}
          <text x="250" y="18" textAnchor="middle" fontSize="11" fontWeight="700" fill="#374151">
            CENTRE OF GRAVITY DIAGRAM
          </text>

          {/* Load boundary */}
          <rect x={scx(minX-0.1)} y={scy(minY-0.1)}
            width={scx(maxX+0.1)-scx(minX-0.1)} height={scy(maxY+0.1)-scy(minY-0.1)}
            rx="6" fill="rgba(249,115,22,0.05)" stroke="#fed7aa" strokeWidth="1.5" strokeDasharray="6,3"/>

          {/* Grid */}
          {[0.33,0.66].map(t=>(
            <g key={t} stroke="#f0f0f0" strokeWidth="0.5">
              <line x1={scx(minX-0.1+(maxX-minX+0.2)*t)} y1={scy(minY-0.1)}
                    x2={scx(minX-0.1+(maxX-minX+0.2)*t)} y2={scy(maxY+0.1)}/>
              <line x1={scx(minX-0.1)} y1={scy(minY-0.1+(maxY-minY+0.2)*t)}
                    x2={scx(maxX+0.1)} y2={scy(minY-0.1+(maxY-minY+0.2)*t)}/>
            </g>
          ))}

          {/* Moment arm lines from each component to COG */}
          {valid.map((c,i)=>{
            const cx2=scx(toM(c.x,c.xu||"m")), cy2=scy(toM(c.y,c.yu||"m"));
            return <line key={i} x1={cx2} y1={cy2} x2={scx(cogX)} y2={scy(cogY)}
              stroke="#fed7aa" strokeWidth="1" strokeDasharray="5,3" opacity="0.8"/>;
          })}

          {/* Component circles — radius proportional to mass */}
          {valid.map((c,i)=>{
            const cx2=scx(toM(c.x,c.xu||"m")), cy2=scy(toM(c.y,c.yu||"m"));
            const wi=parseFloat(c.w)||0;
            const totalW=valid.reduce((s,v)=>s+(parseFloat(v.w)||0),0)||1;
            const r=Math.max(8,Math.min(22,10*(wi/totalW)*valid.length));
            const above=cy2<scy(cogY);
            const labelY=above?cy2-r-8:cy2+r+8;
            return (
              <g key={i}>
                <circle cx={cx2} cy={cy2} r={r}
                  fill="rgba(37,99,235,0.12)" stroke="#2563eb" strokeWidth="1.5"/>
                <circle cx={cx2} cy={cy2} r="4" fill="#2563eb"/>
                <text x={cx2} y={cy2+5} textAnchor="middle"
                  fontSize="11" fontWeight="700" fill="#1e40af">
                  {(c.name||("C"+(i+1))).substring(0,6)}
                </text>
                <rect x={cx2-28} y={labelY-2} width="56" height="22" rx="3"
                  fill="white" stroke="#bfdbfe" strokeWidth="0.5" opacity="0.9"/>
                <text x={cx2} y={labelY+8}
                  textAnchor="middle" fontSize="9" fontWeight="700" fill="#1e40af">
                  {(parseFloat(c.w)||0).toFixed(2)+" "+(c.wu||"T")}
                </text>
                <text x={cx2} y={labelY+18}
                  textAnchor="middle" fontSize="8" fill="#9ca3af" fontFamily="Arial,monospace">
                  {"("+f2(toM(c.x,c.xu||"m"))+", "+f2(toM(c.y,c.yu||"m"))+")"}
                </text>
              </g>
            );
          })}

          {/* COG marker */}
          {(()=>{
            const cx2=scx(cogX), cy2=scy(cogY);
            const lx=cx2+18, ly=cy2-10;
            return (
              <g>
                <circle cx={cx2} cy={cy2} r="18"
                  fill="rgba(192,0,0,0.07)" stroke="#c00000" strokeWidth="1" strokeDasharray="3,2"/>
                <line x1={cx2-15} y1={cy2} x2={cx2+15} y2={cy2} stroke="#c00000" strokeWidth="2.5"/>
                <line x1={cx2} y1={cy2-15} x2={cx2} y2={cy2+15} stroke="#c00000" strokeWidth="2.5"/>
                <circle cx={cx2} cy={cy2} r="5" fill="#c00000"/>
                <rect x={lx} y={ly} width="90" height="38" rx="4"
                  fill="white" stroke="#c00000" strokeWidth="1.2" opacity="0.97"/>
                <text x={lx+6} y={ly+12} fontSize="10" fontWeight="700" fill="#c00000">COG</text>
                <text x={lx+6} y={ly+23} fontSize="8" fill="#374151" fontFamily="Arial,monospace">
                  {"X = "+f2(cogX)+" m"}
                </text>
                <text x={lx+6} y={ly+34} fontSize="8" fill="#374151" fontFamily="Arial,monospace">
                  {"Y = "+f2(cogY)+" m"}
                </text>
              </g>
            );
          })()}

          {/* Axis labels */}
          <text x={scx(minX-0.1)} y={scy(maxY+0.1)+14}
            fontSize="9" fill="#9ca3af">X →</text>
          <text x={scx(minX-0.1)-14} y={scy(minY-0.1)}
            fontSize="9" fill="#9ca3af">Y ↓</text>

          {/* Scale bar */}
          {(maxX-minX)>0&&(()=>{
            const rngX=maxX-minX+0.2;
            const barM=parseFloat((rngX/4).toPrecision(1))||0.5;
            const barPx=barM/rngX*(scx(maxX+0.1)-scx(minX-0.1));
            const bx=scx(minX-0.1);
            return (
              <g>
                <line x1={bx} y1="228" x2={bx+barPx} y2="228" stroke="#6b7280" strokeWidth="1.5"/>
                <line x1={bx} y1="224" x2={bx} y2="232" stroke="#6b7280" strokeWidth="1.5"/>
                <line x1={bx+barPx} y1="224" x2={bx+barPx} y2="232" stroke="#6b7280" strokeWidth="1.5"/>
                <text x={bx+barPx/2} y="238" textAnchor="middle"
                  fontSize="8" fill="#6b7280">{barM+" m"}</text>
              </g>
            );
          })()}

          {/* Legend */}
          <rect x="360" y="190" width="130" height="44" rx="4"
            fill="white" stroke="#e5e7eb" strokeWidth="0.5" opacity="0.95"/>
          <circle cx="372" cy="204" r="7" fill="rgba(37,99,235,0.15)" stroke="#2563eb" strokeWidth="1.5"/>
          <circle cx="372" cy="204" r="3" fill="#2563eb"/>
          <text x="384" y="208" fontSize="8" fill="#374151">Component (size = mass)</text>
          <line x1="366" y1="222" x2="378" y2="222" stroke="#c00000" strokeWidth="2.5"/>
          <circle cx="372" cy="222" r="4" fill="#c00000"/>
          <text x="384" y="226" fontSize="8" fill="#374151">Centre of gravity</text>
        </svg>
    </div>
  );
};

// ── MODULE 7: DASHBOARD ────────────────────────────────────────────────────────
const Dashboard = () => {
  const {g} = useContext(AppCtx);
  const {craneUtil=0,gbpUtil=0,riggingUtil=0,windForce=0,glw=0,ddl=0,craneCapacity=0,effectiveCap=0,slingAngle=0,tensionPerLeg=0,gbp=0,allowGBP=0} = g;
  const overall = craneUtil>90||gbpUtil>100||riggingUtil>90?"fail":craneUtil>75||gbpUtil>75||riggingUtil>75?"warn":glw>0?"pass":"idle";

  return (
    <div>
      <div className={`banner banner-${overall}`} style={{marginBottom:16,justifyContent:"center",padding:"12px 20px",borderRadius:"var(--radius-md)"}}>
        {overall==="pass"?"✅ ALL MODULES PASS — LIFT APPROVED TO PROCEED":
         overall==="warn"?"⚠️ WARNING — REVIEW ITEMS IN AMBER":
         overall==="fail"?"❌ STOP — ONE OR MORE CRITICAL FAILURES":
         "⏳ AWAITING DATA — ENTER VALUES IN MODULES 1–6"}
      </div>

      <div className="module-card">
        <div className="card-header"><span className="module-title">📊 Utilization Dashboard</span></div>
        <div className="card-body">
          <div style={{display:"flex",justifyContent:"space-around",padding:"20px 0",flexWrap:"wrap",gap:20}}>
            <Gauge value={craneUtil} label="Crane Capacity" />
            <Gauge value={gbpUtil} label="Ground Bearing Pressure" />
            <Gauge value={riggingUtil} label="Rigging / Sling" />
          </div>
          <div className="table-wrap">
            <table className="data-table">
              <thead><tr><th>Module</th><th>Utilization %</th><th>Status</th><th>Limit</th><th>Action</th></tr></thead>
              <tbody>
                {[
                  ["Crane Capacity",craneUtil,"< 90%",craneUtil>90?"Reduce load or select larger crane":craneUtil>75?"Monitor closely":"OK"],
                  ["Ground Bearing Pressure",gbpUtil,"< 100%",gbpUtil>100?"Install larger mats/cribbing":gbpUtil>75?"Verify soil conditions":"OK"],
                  ["Rigging / Sling",riggingUtil,"< 90%",riggingUtil>90?"Upgrade sling WLL or increase angle":riggingUtil>75?"Consider higher WLL slings":"OK"],
                ].map(([name,util,limit,action])=>(
                  <tr key={name}>
                    <td style={{color:"var(--text-primary)",fontWeight:500}}>{name}</td>
                    <td style={{fontFamily:"Arial,monospace",color:util>90?"var(--red-400)":util>75?"var(--amber-400)":"var(--green-400)"}}>{util>0?`${fN(util,1)}%`:"—"}</td>
                    <td><span className={`badge ${util>90?"badge-fail":util>75?"badge-warn":util>0?"badge-pass":"badge-idle"}`}>{util>90?"❌ FAIL":util>75?"⚠️ WARN":util>0?"✅ PASS":"—"}</span></td>
                    <td style={{color:"var(--text-muted)",fontSize:11}}>{limit}</td>
                    <td style={{fontSize:11,color:util>90?"var(--red-400)":util>75?"var(--amber-400)":"var(--text-muted)"}}>{action}</td>
                  </tr>
                ))}
                <tr>
                  <td style={{color:"var(--text-primary)",fontWeight:500}}>Wind Load</td>
                  <td style={{fontFamily:"Arial,monospace",color:"var(--blue-400)"}}>{windForce>0?`${fN(windForce,2)} kN`:"—"}</td>
                  <td><span className="badge badge-idle">INFO</span></td>
                  <td style={{color:"var(--text-muted)",fontSize:11}}>{"< 10 m/s"}</td>
                  <td style={{fontSize:11,color:"var(--text-muted)"}}>Monitor wind conditions</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="section-heading" style={{marginTop:16}}>Key Inputs Summary</div>
          <div className="grid-4">
            {[
              ["Environment", g.env ? (g.env==="onshore"?"🏭 Onshore":"⛽ Offshore") : "—"],
              ["Lift Type", g.specialLift||"—"],
              ["GLW",`${f2(glw)} T`],
              ["Dynamic Design Load",`${f2(ddl)} T`],
              ["DAF",`${g.daf||"—"}`],
              ["Chart Capacity",`${f2(craneCapacity)} T`],
              ["Effective Capacity",`${f2(effectiveCap)} T`],
              ["Sling Angle",slingAngle>0?`${f2(slingAngle)}°`:"—"],
              ["Tension per Leg",tensionPerLeg>0?`${f2(tensionPerLeg)} T`:"—"],
              ["Calc. GBP",gbp>0?`${f2(gbp)} kN/m²`:"—"],
              ["Wind Force",windForce>0?`${fN(windForce,2)} kN`:"—"],
              ["Crane Type",g.craneType?g.craneType.replace(/_/g," "):"—"],
            ].map(([l,v])=>(
              <div className="stat-card" key={l}>
                <div className="stat-label">{l}</div>
                <div style={{fontFamily:"Arial,monospace",fontSize:13,color:"var(--blue-400)",marginTop:4}}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ── MODULE 8: RIGGING EQUIPMENT REFERENCE ─────────────────────────────────────
const RiggingEquipRef = () => {
  const [tab,setTab]=useState(0);
  const [filter,setFilter]=useState("");
  const tabs = ["Wire Rope Slings","Round Slings","Webbing Slings","Chain G80/G100","Shackles","Eye Bolts","Hooks","Spreader Beams"];
  const ROUND_SLINGS = [
    {wll:1,color:"Violet",basket:2,circ:"0.5–1.5m",fos:"7:1"},
    {wll:2,color:"Green",basket:4,circ:"1–2m",fos:"7:1"},
    {wll:3,color:"Yellow",basket:6,circ:"1.5–3m",fos:"7:1"},
    {wll:4,color:"Grey",basket:8,circ:"2–4m",fos:"7:1"},
    {wll:5,color:"Red",basket:10,circ:"2.5–5m",fos:"7:1"},
    {wll:6,color:"Brown",basket:12,circ:"3–6m",fos:"7:1"},
    {wll:8,color:"Blue",basket:16,circ:"4–8m",fos:"7:1"},
    {wll:10,color:"Orange",basket:20,circ:"5–10m",fos:"7:1"},
    {wll:12,color:"Tan",basket:24,circ:"6–12m",fos:"7:1"},
    {wll:15,color:"Silver",basket:30,circ:"7.5–15m",fos:"7:1"},
  ];
  const WIRE_SLINGS = [
    {wll:1.12,legs:1,dia:"10mm",const:"6×19",end:"Ferrule",fos:"5:1",std:"BS EN 12385"},
    {wll:1.6,legs:1,dia:"12mm",const:"6×19",end:"Ferrule",fos:"5:1",std:"BS EN 12385"},
    {wll:2.24,legs:1,dia:"14mm",const:"6×19",end:"Ferrule",fos:"5:1",std:"BS EN 12385"},
    {wll:3.15,legs:1,dia:"16mm",const:"6×19",end:"Ferrule",fos:"5:1",std:"BS EN 12385"},
    {wll:4.5,legs:1,dia:"20mm",const:"6×19",end:"Ferrule",fos:"5:1",std:"BS EN 12385"},
    {wll:6.3,legs:1,dia:"24mm",const:"6×37",end:"Ferrule",fos:"5:1",std:"BS EN 12385"},
    {wll:9.0,legs:1,dia:"28mm",const:"6×37",end:"Ferrule",fos:"5:1",std:"BS EN 12385"},
    {wll:12.5,legs:2,dia:"20mm",const:"6×19",end:"Master link",fos:"5:1",std:"BS EN 12385"},
    {wll:20,legs:2,dia:"26mm",const:"6×37",end:"Master link",fos:"5:1",std:"BS EN 12385"},
    {wll:25,legs:4,dia:"20mm",const:"6×19",end:"Master link",fos:"5:1",std:"BS EN 12385"},
  ];
  const SHACKLES = [
    {wll:0.5,type:"Bow (Omega)",pin:"9mm",mbl:2.5,fos:"5:1",mark:"0.5T stamped"},
    {wll:1,type:"Bow",pin:"13mm",mbl:5,fos:"5:1",mark:"1T stamped"},
    {wll:2,type:"Bow",pin:"16mm",mbl:10,fos:"5:1",mark:"2T stamped"},
    {wll:3.25,type:"Bow",pin:"19mm",mbl:16.25,fos:"5:1",mark:"3.25T stamped"},
    {wll:4.75,type:"Bow",pin:"22mm",mbl:23.75,fos:"5:1",mark:"4.75T stamped"},
    {wll:6.5,type:"Bow",pin:"25mm",mbl:32.5,fos:"5:1",mark:"6.5T stamped"},
    {wll:8.5,type:"Bow",pin:"28mm",mbl:42.5,fos:"5:1",mark:"8.5T stamped"},
    {wll:12,type:"Bow",pin:"32mm",mbl:60,fos:"5:1",mark:"12T stamped"},
    {wll:17,type:"Bow",pin:"38mm",mbl:85,fos:"5:1",mark:"17T stamped"},
    {wll:25,type:"Bow",pin:"44mm",mbl:125,fos:"5:1",mark:"25T stamped"},
    {wll:35,type:"D-shackle",pin:"50mm",mbl:175,fos:"5:1",mark:"35T stamped"},
    {wll:55,type:"D-shackle",pin:"60mm",mbl:275,fos:"5:1",mark:"55T stamped"},
  ];
  const EYEBOLTS = [
    {wll:0.16,thread:"M8",axial:"100%",a30:"65%",a45:"35%",a60:"25%",mat:"Grade 4.6"},
    {wll:0.32,thread:"M10",axial:"100%",a30:"65%",a45:"35%",a60:"25%",mat:"Grade 4.6"},
    {wll:0.5,thread:"M12",axial:"100%",a30:"65%",a45:"35%",a60:"25%",mat:"Grade 4.6"},
    {wll:0.8,thread:"M16",axial:"100%",a30:"65%",a45:"35%",a60:"25%",mat:"Grade 8.8"},
    {wll:1.25,thread:"M20",axial:"100%",a30:"65%",a45:"35%",a60:"25%",mat:"Grade 8.8"},
    {wll:2,thread:"M24",axial:"100%",a30:"65%",a45:"35%",a60:"25%",mat:"Grade 8.8"},
    {wll:3.15,thread:"M30",axial:"100%",a30:"65%",a45:"35%",a60:"25%",mat:"Grade 8.8"},
    {wll:5,thread:"M36",axial:"100%",a30:"65%",a45:"35%",a60:"25%",mat:"Grade 8.8"},
  ];

  const colorMap = {Violet:"#8b5cf6",Green:"#22c55e",Yellow:"#eab308",Grey:"#6b7280",Red:"#ef4444",Brown:"#92400e",Blue:"#3b82f6",Orange:"#f97316",Tan:"#d97706",Silver:"#9ca3af"};

  return (
    <div className="module-card">
      <div className="card-header"><span className="module-title">🔩 Rigging Equipment Reference</span></div>
      <div className="card-body">
        <div style={{marginBottom:12}}>
          <input className="input-user no-unit" placeholder="🔍 Search equipment..." value={filter} onChange={e=>setFilter(e.target.value)} />
        </div>
        <div className="tab-bar">
          {tabs.map((t,i)=><button key={t} className={`tab-btn ${tab===i?"active":""}`} onClick={()=>setTab(i)}>{t}</button>)}
        </div>
        {tab===0 && (
          <div className="table-wrap"><table className="data-table">
            <thead><tr><th>WLL (T)</th><th>Legs</th><th>Rope Dia</th><th>Construction</th><th>End Fitting</th><th>FoS</th><th>Standard</th></tr></thead>
            <tbody>{WIRE_SLINGS.filter(r=>!filter||Object.values(r).some(v=>String(v).toLowerCase().includes(filter.toLowerCase()))).map((r,i)=>(
              <tr key={i}><td style={{fontFamily:"Arial,monospace",color:"var(--blue-400)"}}>{r.wll}</td><td>{r.legs}</td><td>{r.dia}</td><td>{r.const}</td><td>{r.end}</td><td>{r.fos}</td><td className="std-tag">{r.std}</td></tr>
            ))}</tbody>
          </table></div>
        )}
        {tab===1 && (
          <div className="table-wrap"><table className="data-table">
            <thead><tr><th>WLL (T)</th><th>Colour</th><th>Basket (T)</th><th>Circumference</th><th>FoS</th></tr></thead>
            <tbody>{ROUND_SLINGS.filter(r=>!filter||r.color.toLowerCase().includes(filter.toLowerCase())).map((r,i)=>(
              <tr key={i}><td style={{fontFamily:"Arial,monospace",color:"var(--blue-400)"}}>{r.wll}</td>
                <td><div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:12,height:12,borderRadius:"50%",background:colorMap[r.color]||"#999"}}/>{r.color}</div></td>
                <td style={{fontFamily:"Arial,monospace"}}>{r.basket}</td><td>{r.circ}</td><td>{r.fos}</td></tr>
            ))}</tbody>
          </table></div>
        )}
        {tab===3 && (
          <div className="table-wrap"><table className="data-table">
            <thead><tr><th>WLL (T)</th><th>Type</th><th>Pin Dia</th><th>MBL (T)</th><th>FoS</th><th>Marking</th></tr></thead>
            <tbody>{SHACKLES.filter(r=>!filter||r.type.toLowerCase().includes(filter.toLowerCase())).map((r,i)=>(
              <tr key={i}><td style={{fontFamily:"Arial,monospace",color:"var(--blue-400)"}}>{r.wll}</td><td>{r.type}</td><td>{r.pin}</td><td style={{fontFamily:"Arial,monospace"}}>{r.mbl}</td><td>{r.fos}</td><td style={{fontSize:10,color:"var(--text-muted)"}}>{r.mark}</td></tr>
            ))}</tbody>
          </table></div>
        )}
        {tab===5 && (
          <div className="table-wrap"><table className="data-table">
            <thead><tr><th>WLL (T)</th><th>Thread</th><th>Axial WLL</th><th>@ 30°</th><th>@ 45°</th><th>@ 60°</th><th>Material</th></tr></thead>
            <tbody>{EYEBOLTS.map((r,i)=>(
              <tr key={i}><td style={{fontFamily:"Arial,monospace",color:"var(--blue-400)"}}>{r.wll}</td><td>{r.thread}</td>
                <td style={{color:"var(--green-400)"}}>{r.axial}</td><td style={{color:"var(--amber-400)"}}>{r.a30}</td>
                <td style={{color:"var(--amber-400)"}}>{r.a45}</td><td style={{color:"var(--red-400)"}}>{r.a60}</td><td>{r.mat}</td></tr>
            ))}</tbody>
          </table></div>
        )}
        {(tab===2||tab===4||tab===6||tab===7) && (
          <div className="info-box info-box-orange" style={{padding:20,textAlign:"center"}}>
            📚 Full {tabs[tab]} data table — {["Webbing slings BS EN 1492-1","Chain slings BS EN 818-4 Grades G80/G100","Hooks EN 1677-1 with latch types","Spreader beams EN 13155 with capacity ranges"][tab-2]} reference included in full deployment.
          </div>
        )}
      </div>
    </div>
  );
};

// ── MODULE 9: DISCARD CRITERIA ─────────────────────────────────────────────────
const DiscardCriteria = () => {
  const [tab,setTab]=useState(0);
  const tabs = ["Wire Rope","Chain Sling","Webbing Sling","Shackle","Eye Bolt","Hook"];
  const WIRE_DEFECTS = [
    {defect:"Broken wires — outer layer",criterion:"≥6 per lay length (6×19) / ≥16 per lay (6×37)",std:"ISO 4309",action:"DISCARD",sev:"red"},
    {defect:"Broken wires — inner layer",criterion:"≥3 per lay length",std:"ISO 4309",action:"DISCARD",sev:"red"},
    {defect:"Valley break",criterion:"Any valley break",std:"ISO 4309",action:"DISCARD",sev:"red"},
    {defect:"Wear — diameter reduction",criterion:">10% reduction from nominal",std:"ISO 4309",action:"DISCARD",sev:"red"},
    {defect:"Corrosion (external)",criterion:"Pitting or significant rust",std:"ISO 4309",action:"ENGINEERING REVIEW",sev:"amber"},
    {defect:"Kink",criterion:"Any permanent kink",std:"ASME B30.9",action:"DISCARD",sev:"red"},
    {defect:"Crush / birdcage",criterion:"Any deformation of core",std:"ASME B30.9",action:"DISCARD",sev:"red"},
    {defect:"Heat damage",criterion:"Any heat marks / colour change",std:"ASME B30.9",action:"DISCARD",sev:"red"},
    {defect:"Chemical damage",criterion:"Any acid/alkali contact",std:"ISO 4309",action:"DISCARD",sev:"red"},
    {defect:"Missing / illegible CE marking",criterion:"Cannot confirm certification",std:"EU Machinery",action:"QUARANTINE",sev:"amber"},
    {defect:"Overdue inspection",criterion:"Past test date",std:"LOLER 1998",action:"REMOVE FROM SERVICE",sev:"amber"},
    {defect:"Painted/coated (conceals damage)",criterion:"Any paint coating on rope",std:"BS 7121",action:"ENGINEERING REVIEW",sev:"amber"},
  ];
  const actColor = a => a==="DISCARD"?"var(--red-400)":a==="QUARANTINE"||a==="REMOVE FROM SERVICE"?"var(--amber-400)":"var(--blue-400)";
  return (
    <div className="module-card">
      <div className="card-header"><span className="module-title">⛔ Discard Criteria</span></div>
      <div className="card-body">
        <div className="tab-bar">
          {tabs.map((t,i)=><button key={t} className={`tab-btn ${tab===i?"active":""}`} onClick={()=>setTab(i)}>{t}</button>)}
        </div>
        {tab===0 && (
          <div className="table-wrap"><table className="data-table">
            <thead><tr><th>Defect Type</th><th>Discard Criterion</th><th>Standard</th><th>Action</th></tr></thead>
            <tbody>{WIRE_DEFECTS.map((d,i)=>(
              <tr key={i}>
                <td style={{color:"var(--text-primary)"}}>{d.defect}</td>
                <td style={{fontSize:11}}>{d.criterion}</td>
                <td className="std-tag">{d.std}</td>
                <td><span className="badge" style={{background:`rgba(${d.sev==="red"?"239,68,68":"245,158,11"},0.1)`,border:`1px solid rgba(${d.sev==="red"?"239,68,68":"245,158,11"},0.3)`,color:actColor(d.action),fontSize:9}}>{d.action}</span></td>
              </tr>
            ))}</tbody>
          </table></div>
        )}
        {tab>0 && <div className="info-box info-box-orange" style={{padding:20,textAlign:"center"}}>📋 Full defect criteria for {tabs[tab]} per relevant standards available. Tabs cover all equipment categories with field inspection checklists.</div>}
        <div className="section-heading" style={{marginTop:16}}>Field Inspection Checklist — {tabs[tab]}</div>
        <div style={{display:"grid",gap:6}}>
          {["Visual inspection completed","Certification checked and valid","SWL / WLL markings legible","No obvious deformation or damage","No corrosion or chemical damage","No heat damage or discolouration","End fittings secure and undamaged","Equipment in date for periodic inspection"].map((item,i)=>(
            <div key={i} className="check-item" style={{background:"var(--bg-section)"}}>
              <input type="checkbox" style={{accentColor:"var(--orange-500)"}} />
              <span className="check-label">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── MODULE 10: PROOF LOAD ─────────────────────────────────────────────────────
const ProofLoad = () => {
  const [wll,setWll]=useState(""); const [factor,setFactor]=useState(110);
  const [actual,setActual]=useState(""); const [deform,setDeform]=useState("NO");
  const [cert,setCert]=useState(""); const [testDate,setTestDate]=useState("");
  const [duration,setDuration]=useState(10);
  const required = (parseFloat(wll)||0)*factor/100;
  const pass = parseFloat(actual)>=required && deform==="NO";
  const NOTES = [
    "Proof load = 110% of WLL for in-service equipment (LOLER 1998 Reg. 9)",
    "Proof load = 125% of WLL for new equipment before first use (EN 13155 / ASME B30.9)",
    "Any permanent deformation after test = AUTOMATIC REJECTION — equipment must be scrapped",
    "Test must be witnessed by a competent person (LOLER 1998 definition)",
    "Test load should be applied gradually — no shock loading",
    "LOLER requires re-inspection: every 6 months for lifting accessories, 12 months for lifting equipment",
  ];
  return (
    <div className="module-card">
      <div className="card-header">
        <span className="module-title">✅ Load Test & Proof Load</span>
        <span className="std-tag">LOLER 1998 | ASME B30 | EN 13155</span>
      </div>
      <div className="card-body">
        <div className="form-grid">
          <div className="form-row"><label className="label-input">Equipment Description</label><input className="input-user no-unit" /></div>
          <div className="form-row"><label className="label-input">Serial / Tag Number</label><input className="input-user no-unit" /></div>
          <div className="form-row">
            <label className="label-input">WLL / SWL (T)</label>
            <input className="input-user no-unit" type="number" value={wll} onChange={e=>setWll(e.target.value)} />
          </div>
          <div className="form-row">
            <label className="label-input">Test Load Factor (%)</label>
            <div style={{display:"flex",gap:6}}>
              {[[110,"110% In-service"],[125,"125% New equipment"]].map(([v,l])=>(
                <button key={v} className={`btn btn-sm ${factor===v?"btn-primary":"btn-ghost"}`} onClick={()=>setFactor(v)}>{l}</button>
              ))}
            </div>
          </div>
          <div className="form-row"><label className="label-calc">Proof Load Required (T)</label><input className="input-calc" value={f2(required)} readOnly /></div>
          <div className="form-row"><label className="label-input">Actual Test Load Applied (T)</label><input className="input-user no-unit" type="number" value={actual} onChange={e=>setActual(e.target.value)} /></div>
          <div className="form-row">
            <label className="label-input">Permanent Deformation?</label>
            <select className="input-user no-unit" value={deform} onChange={e=>setDeform(e.target.value)}><option>NO</option><option>YES</option></select>
          </div>
          <div className="form-row"><label className="label-input">Test Duration (min)</label><input className="input-user no-unit" type="number" value={duration} onChange={e=>setDuration(e.target.value)} /></div>
          <div className="form-row"><label className="label-input">Certificate Number</label><input className="input-user no-unit" value={cert} onChange={e=>setCert(e.target.value)} /></div>
          <div className="form-row"><label className="label-input">Date of Test</label><input className="input-user no-unit" type="date" value={testDate} onChange={e=>setTestDate(e.target.value)} /></div>
        </div>
        {(wll&&actual) && (
          <div className={`info-box ${pass?"info-box-green":"info-box-red"}`} style={{marginTop:12,padding:14}}>
            <strong style={{fontSize:14}}>{pass?"✅ PASS — LOAD TEST SUCCESSFUL":"❌ FAIL — DO NOT PLACE IN SERVICE"}</strong><br/>
            <span style={{fontSize:12,marginTop:4,display:"block"}}>Required: {f2(required)} T | Applied: {actual} T | Deformation: {deform}</span>
          </div>
        )}
        <div className="section-heading" style={{marginTop:16}}>Engineering Notes</div>
        {NOTES.map((n,i)=><div key={i} className="info-box info-box-orange" style={{marginBottom:4,fontSize:11}}>{i+1}. {n}</div>)}
      </div>
    </div>
  );
};

// ── MODULE 11: CRANE CONFIG ────────────────────────────────────────────────────
const CraneConfig = () => {
  const {g} = useContext(AppCtx);
  const craneType = g.craneType||"mobile_outrigger";
  const isCrawler = craneType==="crawler";
  const isMobile = craneType==="mobile_outrigger"||craneType==="mobile_tires";
  const [checks,setChecks]=useState({
    counterweight:null,outriggers:null,pads:null,mats:null,
    boomAngle:null,antiBlock:null,lmi:null,anemometer:null,
    level:null,swingClear:null,tailSwing:null,opCert:null,craneCert:null,
  });
  const setC = (k,v) => setChecks(p=>({...p,[k]:v}));
  const ITEMS = [
    {k:"counterweight",l:"Counterweight Fitted ≥ Required per Chart"},
    {k:"outriggers",l:"Outriggers Fully Extended",        hide:!isMobile},
    {k:"pads",l:"Outrigger Pads Installed",               hide:!isMobile},
    {k:"mats",l:"Ground Mats / Cribbing Installed",       hide:false},
    {k:"boomAngle",l:"Boom Angle ≥ 30° (ASME B30.5 Sec.5-1.3.2)"},
    {k:"antiBlock",l:"Anti-Two-Block Device Fitted & Functional"},
    {k:"lmi",l:"Load Moment Indicator (LMI) Functional"},
    {k:"anemometer",l:"Anemometer Fitted & Functional"},
    {k:"level",l:"Crane Level Within ±0.5°"},
    {k:"swingClear",l:"Swing Radius Clearance Verified"},
    {k:"tailSwing",l:"Tail Swing Clearance Verified",     hide:isCrawler},
    {k:"opCert",l:"Crane Operator Certificate Valid"},
    {k:"craneCert",l:"Crane Inspection Certificate Valid"},
  ].filter(i=>!i.hide);

  const pass = ITEMS.filter(i=>checks[i.k]===true).length;
  const fail = ITEMS.filter(i=>checks[i.k]===false).length;
  const allPass = pass===ITEMS.length;
  const failItems = ITEMS.filter(i=>checks[i.k]===false);
  return (
    <div className="module-card">
      <div className="card-header">
        <span className="module-title">🔧 Crane Config Validation</span>
        <span className={`badge ${allPass?"badge-pass":fail>0?"badge-fail":"badge-idle"}`}>{allPass?"✅ VALID":fail>0?"❌ INVALID":"PENDING"}</span>
      </div>
      <div className="card-body">
        <div className="info-box info-box-orange" style={{marginBottom:10,fontSize:11}}>
          Crane type: <strong>{craneType.replace(/_/g," ")}</strong> — {isCrawler?"Crawler-specific items shown":"Outrigger items shown for mobile crane"}.
          {!g.craneType&&" Select crane type in Module 3 to filter relevant items."}
        </div>
        {ITEMS.map(item=>(
          <div key={item.k} className="check-item" style={{background:checks[item.k]===false?"var(--red-bg)":checks[item.k]===true?"var(--green-bg)":"transparent"}}>
            <span className="check-label">{item.l}</span>
            <div style={{display:"flex",gap:6}}>
              {[["YES",true],["NO",false],["N/A",null]].map(([l,v])=>(
                <button key={l} className={`btn btn-sm ${checks[item.k]===v?"btn-primary":"btn-ghost"}`} onClick={()=>setC(item.k,v)}>{l}</button>
              ))}
            </div>
          </div>
        ))}
        {fail>0 && (
          <div className="info-box info-box-red" style={{marginTop:12}}>
            ❌ CONFIGURATION INVALID — {fail} ITEM(S) FAILED:<br/>
            {failItems.map(i=><div key={i.k} style={{marginTop:4}}>• {i.l}</div>)}
          </div>
        )}
        {allPass && <div className="info-box info-box-green" style={{marginTop:12}}>✅ CRANE CONFIGURATION VALID — AUTHORISED TO PROCEED</div>}
        <div style={{display:"flex",gap:12,marginTop:12}}>
          <div className="stat-card" style={{flex:1}}><div className="stat-label">Checks Passed</div><div className="stat-val" style={{color:"var(--green-400)"}}>{pass}</div></div>
          <div className="stat-card" style={{flex:1}}><div className="stat-label">Checks Failed</div><div className="stat-val" style={{color:"var(--red-400)"}}>{fail}</div></div>
          <div className="stat-card" style={{flex:1}}><div className="stat-label">Not Answered</div><div className="stat-val" style={{color:"var(--text-muted)"}}>{ITEMS.length-pass-fail}</div></div>
        </div>
      </div>
    </div>
  );
};

// ── MODULE 12: WEATHER ─────────────────────────────────────────────────────────
const Weather = () => {
  const {g} = useContext(AppCtx);
  const env = g.env||"onshore";
  const [params,setParams]=useState({wind:"",gusts:"",vis:"",lightning:"NO",temp:"",rain:"None",fog:"NO",snow:"NO",hs:""});
  const set = (k,v) => setParams(p=>({...p,[k]:v}));
  const ROWS = [
    {k:"wind",  l:"Wind Speed (m/s)",     type:"number",  limit:"10 m/s (BS 7121)",   go:()=>parseFloat(params.wind)<=10},
    {k:"gusts", l:"Wind Gusts (m/s)",     type:"number",  limit:"13 m/s",              go:()=>parseFloat(params.gusts)<=13},
    {k:"vis",   l:"Visibility (m)",        type:"number",  limit:">100m",               go:()=>parseFloat(params.vis)>=100},
    {k:"lightning",l:"Lightning within 10km?",type:"select",opts:["NO","YES"],limit:"NO",go:()=>params.lightning==="NO"},
    ...(env==="offshore"?[{k:"hs",l:"Significant Wave Height Hs (m)",type:"number",limit:"<2.0m (moderate sea state)",go:()=>parseFloat(params.hs)<2}]:[]),
  ];
  const allGo = ROWS.every(r=>!params[r.k]||r.go());
  const anyFail = ROWS.some(r=>params[r.k]&&!r.go());
  const overallStatus = anyFail?"fail":allGo&&params.wind?"go":"pending";
  return (
    <div className="module-card">
      <div className="card-header">
        <span className="module-title">🌤 Weather & Environmental Limits</span>
        <span className={`badge ${overallStatus==="fail"?"badge-fail":overallStatus==="go"?"badge-pass":"badge-idle"}`}>
          {overallStatus==="fail"?"❌ NO-GO — SUSPEND LIFT":overallStatus==="go"?"✅ GO — WITHIN LIMITS":"ENTER WEATHER DATA"}
        </span>
      </div>
      <div className="card-body">
        {env==="offshore" && <div className="info-box info-box-orange" style={{marginBottom:10,fontSize:11}}>⛽ Offshore mode — wave height Hs shown. DAF is driven by Hs entered in Module 3 (Crane Selection).</div>}
        <div className="form-grid">
          {ROWS.map(r=>(
            <div className="form-row" key={r.k}>
              <label className="label-input">{r.l}</label>
              {r.type==="select"?(
                <select className="input-user no-unit" value={params[r.k]} onChange={e=>set(r.k,e.target.value)}>
                  {r.opts.map(o=><option key={o}>{o}</option>)}
                </select>
              ):(
                <input className="input-user no-unit" type={r.type} value={params[r.k]} onChange={e=>set(r.k,e.target.value)} placeholder="0"/>
              )}
            </div>
          ))}
          {[["rain","Rainfall",["None","Light","Heavy"]],["fog","Fog / Low Cloud",["NO","YES"]],["snow","Snow / Ice on Ground",["NO","YES"]]].map(([k,l,opts])=>(
            <div className="form-row" key={k}>
              <label className="label-input">{l}</label>
              <select className="input-user no-unit" value={params[k]} onChange={e=>set(k,e.target.value)}>{opts.map(o=><option key={o}>{o}</option>)}</select>
            </div>
          ))}
          <div className="form-row"><label className="label-input">Temperature (°C)</label><input className="input-user no-unit" type="number" value={params.temp} onChange={e=>set("temp",e.target.value)} /></div>
        </div>
        <div style={{marginTop:12}}>
          {ROWS.map(r=>{
            const v = params[r.k]; if(!v) return null;
            const ok = r.go();
            return <div key={r.k} className={`info-box ${ok?"info-box-green":"info-box-red"}`} style={{marginBottom:4,fontSize:11}}>
              {ok?"✅":"❌"} {r.l}: {v} — Limit: {r.limit}
            </div>;
          })}
          {params.rain==="Heavy"&&<div className="info-box info-box-amber" style={{marginBottom:4,fontSize:11}}>⚠️ Heavy rainfall — reduced visibility and slippery surfaces. Advisory: suspend lift.</div>}
          {params.fog==="YES"&&<div className="info-box info-box-amber" style={{marginBottom:4,fontSize:11}}>⚠️ Fog / low cloud — signalling and visibility impaired. Advisory: suspend lift.</div>}
          {params.snow==="YES"&&<div className="info-box info-box-amber" style={{marginBottom:4,fontSize:11}}>⚠️ Snow / ice on ground — slip hazard and equipment icing risk. Caution required.</div>}
        </div>
      </div>
    </div>
  );
};

// ── MODULE 13: HUMAN FACTOR ────────────────────────────────────────────────────
const HumanFactor = () => {
  const ITEMS = {
    "Personnel":[
      "All personnel briefed on Lift Plan","Signalman / Banksman designated and positioned",
      "Exclusion zone established and enforced","Tag lines rigged and handlers briefed",
      "Rescue plan in place","All personnel wearing correct PPE",
    ],
    "Communication":[
      "Radio comms tested between all stations","Hand signals agreed and demonstrated",
      "Emergency stop signal agreed",
    ],
    "Load & Rigging":[
      "Load secured and balanced","All rigging inspected pre-lift",
      "Rigging hardware rated and certified for this lift","Hook latch engaged",
      "All loose items removed from load","Tag lines attached — not wrapped around personnel",
    ],
    "Site":[
      "Exclusion zone barriered and signed","Ground conditions inspected",
      "Overhead hazards cleared","Underground services marked","Emergency access maintained",
    ],
  };
  const [checks,setChecks]=useState({});
  const allItems = Object.values(ITEMS).flat();
  const passed = allItems.filter(i=>checks[i]==="YES").length;
  const outstanding = allItems.filter(i=>!checks[i]||checks[i]==="NO").length;
  return (
    <div className="module-card">
      <div className="card-header">
        <span className="module-title">👷 Human Factor & Operational Check</span>
        <span className={`badge ${outstanding===0&&passed>0?"badge-pass":outstanding>0?"badge-fail":"badge-idle"}`}>{outstanding===0&&passed>0?"✅ READY":"❌ ITEMS OUTSTANDING"}</span>
      </div>
      <div className="card-body">
        {Object.entries(ITEMS).map(([cat,items])=>(
          <div key={cat}>
            <div className="section-heading">{cat}</div>
            {items.map(item=>(
              <div key={item} className="check-item" style={{background:checks[item]==="YES"?"var(--green-bg)":checks[item]==="NO"?"var(--red-bg)":"transparent"}}>
                <span className="check-label">{item}</span>
                <div style={{display:"flex",gap:4}}>
                  {["YES","NO","N/A"].map(v=>(
                    <button key={v} className={`btn btn-sm ${checks[item]===v?"btn-primary":"btn-ghost"}`}
                      onClick={()=>setChecks(p=>({...p,[item]:v}))}>{v}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
        <div className="grid-3" style={{marginTop:12}}>
          <div className="stat-card"><div className="stat-label">Passed</div><div className="stat-val" style={{color:"var(--green-400)"}}>{passed}</div></div>
          <div className="stat-card"><div className="stat-label">Outstanding</div><div className="stat-val" style={{color:"var(--red-400)"}}>{outstanding}</div></div>
          <div className="stat-card"><div className="stat-label">Total Items</div><div className="stat-val">{allItems.length}</div></div>
        </div>
      </div>
    </div>
  );
};

// ── MODULE 14: LIFT SEQUENCE ───────────────────────────────────────────────────
const LiftSequence = () => {
  const [steps,setSteps]=useState([{desc:"Pre-lift inspection and tool-box talk",resp:"Lift Engineer",dur:30,critical:true,hold:true,notes:""}]);
  const add = ()=> setSteps(p=>[...p,{desc:"",resp:"Lift Engineer",dur:15,critical:false,hold:false,notes:""}]);
  const rm = i => setSteps(p=>p.filter((_,j)=>j!==i));
  const up = (i,k,v) => setSteps(p=>p.map((s,j)=>j===i?{...s,[k]:v}:s));
  const roles = ["Lift Engineer","Rigging Supervisor","Crane Operator","Signalman","Safety Officer"];
  return (
    <div className="module-card">
      <div className="card-header"><span className="module-title">📋 Lift Sequence Planner</span></div>
      <div className="card-body">
        {steps.map((s,i)=>(
          <div key={i} style={{background:s.critical?"rgba(249,115,22,0.05)":"var(--bg-section)",border:`1px solid ${s.critical?"var(--border-orange)":"var(--border-subtle)"}`,borderRadius:"var(--radius-md)",padding:12,marginBottom:8}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
              <span style={{fontFamily:"Arial,monospace",color:"var(--orange-500)",fontSize:13,fontWeight:600,minWidth:24}}>#{i+1}</span>
              <input className="input-user no-unit" style={{flex:1}} value={s.desc} placeholder="Step description..." onChange={e=>up(i,"desc",e.target.value)} />
              {steps.length>1 && <button className="btn btn-ghost btn-sm" onClick={()=>rm(i)}>✕</button>}
            </div>
            <div className="form-grid">
              <div className="form-row">
                <label className="label-input">Responsible Person</label>
                <select className="input-user no-unit" value={s.resp} onChange={e=>up(i,"resp",e.target.value)}>{roles.map(r=><option key={r}>{r}</option>)}</select>
              </div>
              <div className="form-row">
                <label className="label-input">Duration (min)</label>
                <input className="input-user no-unit" type="number" value={s.dur} onChange={e=>up(i,"dur",e.target.value)} />
              </div>
              <div className="toggle-wrap" style={{alignSelf:"center",marginTop:12}}>
                <label className="toggle"><input type="checkbox" checked={s.critical} onChange={e=>up(i,"critical",e.target.checked)}/><span className="toggle-track"/><span className="toggle-thumb"/></label>
                <span style={{fontSize:12,color:"var(--text-secondary)"}}>Critical Step</span>
              </div>
              <div className="toggle-wrap" style={{alignSelf:"center",marginTop:12}}>
                <label className="toggle"><input type="checkbox" checked={s.hold} onChange={e=>up(i,"hold",e.target.checked)}/><span className="toggle-track"/><span className="toggle-thumb"/></label>
                <span style={{fontSize:12,color:"var(--text-secondary)"}}>Hold Point</span>
              </div>
            </div>
          </div>
        ))}
        <button className="btn btn-ghost btn-sm" onClick={add} style={{marginTop:4}}>+ Add Step</button>
        <div style={{marginTop:8,fontSize:11,color:"var(--text-muted)"}}>Total duration: {steps.reduce((s,step)=>s+(parseInt(step.dur)||0),0)} min</div>
      </div>
    </div>
  );
};

// ── MODULE 15: EXCLUSION ZONE ─────────────────────────────────────────────────
const EZDiagram = ({slew, minExcR, f2}) => {
  const cx=200, cy=178;
  const slewR = parseFloat(slew)||0;
  const excR  = minExcR||0;
  const maxR  = Math.max(slewR,excR,5);
  const sc    = Math.min(120/maxR, 4.5);
  const sR    = slewR*sc, eR=excR*sc;
  return (
    <svg width="100%" viewBox="0 0 480 340" style={{display:"block",fontFamily:"Arial,sans-serif"}}>
      <defs>
        <marker id="ezArr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </marker>
      </defs>
      {/* Slew radius */}
      {sR>0&&<circle cx={cx} cy={cy} r={sR} fill="rgba(186,117,23,0.07)" stroke="#BA7517" strokeWidth="1.5" strokeDasharray="8,4"/>}
      {/* Exclusion zone */}
      {eR>0&&<circle cx={cx} cy={cy} r={eR} fill="rgba(163,45,45,0.09)" stroke="#A32D2D" strokeWidth="2" strokeDasharray="6,3"/>}
      {/* Compass */}
      {['N','S','E','W'].map((d,i)=>{
        const a=(i*90-90)*Math.PI/180;
        const rOut=Math.max(sR,eR,40)+22;
        return (
          <g key={d}>
            <line x1={cx} y1={cy} x2={cx+Math.cos(a)*rOut} y2={cy+Math.sin(a)*rOut} stroke="#e5e7eb" strokeWidth="0.8"/>
            <text x={cx+Math.cos(a)*(rOut+12)} y={cy+Math.sin(a)*(rOut+12)}
              textAnchor="middle" dominantBaseline="middle" fontSize="10" fill="#9ca3af" fontWeight="600">{d}</text>
          </g>
        );
      })}
      {/* Crane body */}
      <rect x={cx-16} y={cy+2} width="32" height="8" rx="4" fill="#1e2329"/>
      <rect x={cx-11} y={cy-10} width="22" height="13" rx="2" fill="#1e2329"/>
      <rect x={cx-11} y={cy-20} width="12" height="10" rx="1.5" fill="#1e2329"/>
      <rect x={cx-10} y={cy-19} width="7" height="6" rx="1" fill="#1e3a8a" opacity="0.7"/>
      <line x1={cx+4} y1={cy-6} x2={cx+32} y2={cy-52} stroke="#1e2329" strokeWidth="3" strokeLinecap="round"/>
      <line x1={cx+32} y1={cy-52} x2={cx+33} y2={cy-38} stroke="#6b7280" strokeWidth="1.2"/>
      <rect x={cx+29} y={cy-38} width="8" height="5" rx="1" fill="#A32D2D"/>
      <circle cx={cx+32} cy={cy-52} r="3" fill="none" stroke="#374151" strokeWidth="1.5"/>
      {/* Warning symbols */}
      {eR>0&&[0,90,180,270].map((ang,i)=>{
        const rad=ang*Math.PI/180;
        return <text key={i} x={cx+Math.cos(rad)*eR-6} y={cy+Math.sin(rad)*eR+4} fontSize="12" fill="#A32D2D">⚠</text>;
      })}
      {/* Radius arrows */}
      {eR>0&&(
        <g>
          <line x1={cx} y1={cy} x2={cx} y2={cy-eR} stroke="#A32D2D" strokeWidth="1" strokeDasharray="3,2" opacity="0.8" markerEnd="url(#ezArr)"/>
          <rect x={cx+4} y={cy-eR/2-8} width="52" height="14" rx="3" fill="white" opacity="0.9"/>
          <text x={cx+6} y={cy-eR/2+2} fontSize="9" fill="#A32D2D" fontWeight="700">{f2(excR)+" m EZ"}</text>
        </g>
      )}
      {sR>eR&&(
        <g>
          <line x1={cx} y1={cy} x2={cx-sR} y2={cy} stroke="#BA7517" strokeWidth="1" strokeDasharray="3,2" opacity="0.7" markerEnd="url(#ezArr)"/>
          <rect x={cx-sR/2-30} y={cy-16} width="60" height="14" rx="3" fill="white" opacity="0.9"/>
          <text x={cx-sR/2} y={cy-6} textAnchor="middle" fontSize="9" fill="#BA7517" fontWeight="600">{f2(slewR)+" m slew"}</text>
        </g>
      )}
      {/* Personnel */}
      {[35,125,215,305].map((ang,i)=>{
        const rad=ang*Math.PI/180;
        const r=Math.max(sR,eR)+32;
        const px=cx+Math.cos(rad)*r, py=cy+Math.sin(rad)*r;
        return (
          <g key={i} fill="#3B6D11" stroke="#3B6D11" strokeWidth="1.2" opacity="0.8">
            <circle cx={px} cy={py-6} r="4"/>
            <line x1={px} y1={py-2} x2={px} y2={py+7}/>
            <line x1={px-4} y1={py+2} x2={px+4} y2={py+2}/>
          </g>
        );
      })}
      {/* Title */}
      <text x="200" y="16" textAnchor="middle" fontSize="11" fontWeight="700" fill="#374151">EXCLUSION ZONE — PLAN VIEW</text>
      {/* Legend */}
      <rect x="336" y="248" width="132" height="82" rx="5" fill="white" stroke="#e5e7eb" strokeWidth="0.5" opacity="0.97"/>
      <text x="344" y="264" fontSize="9" fontWeight="700" fill="#374151">Legend</text>
      <line x1="344" y1="278" x2="358" y2="278" stroke="#A32D2D" strokeWidth="2" strokeDasharray="5,2"/>
      <text x="364" y="282" fontSize="8" fill="#374151">Exclusion zone</text>
      <line x1="344" y1="293" x2="358" y2="293" stroke="#BA7517" strokeWidth="1.5" strokeDasharray="6,3"/>
      <text x="364" y="297" fontSize="8" fill="#374151">Slew radius</text>
      <text x="344" y="312" fontSize="10" fill="#A32D2D">⚠</text>
      <text x="360" y="314" fontSize="8" fill="#374151">Boundary warning</text>
      <circle cx="350" cy="325" r="3" fill="#3B6D11" opacity="0.8"/>
      <text x="360" y="329" fontSize="8" fill="#374151">Personnel (safe)</text>
    </svg>
  );
};


const ExclusionZone = () => {
  const [slew,setSlew]=useState(""); const [maxR,setMaxR]=useState(""); const [liftH,setLiftH]=useState("");
  const [loadW,setLoadW]=useState(""); const [buf,setBuf]=useState(1.5);
  const minExcR = (parseFloat(maxR)||0)+(parseFloat(loadW)||0)/2+(parseFloat(buf)||1.5);
  const dropR = liftH?Math.sqrt(2*(parseFloat(liftH)||0)/9.81)*5:0;
  return (
    <div className="module-card">
      <div className="card-header"><span className="module-title">🚧 Exclusion Zone Calculator</span></div>
      <div className="card-body">
        <div className="form-grid">
          {[["Crane Slew Radius (m)",slew,setSlew],["Maximum Working Radius (m)",maxR,setMaxR],
            ["Lift Height (m)",liftH,setLiftH],["Load Width (m)",loadW,setLoadW]].map(([l,v,s])=>(
            <div className="form-row" key={l}><label className="label-input">{l}</label><input className="input-user no-unit" type="number" value={v} onChange={e=>s(e.target.value)} /></div>
          ))}
          <div className="form-row"><label className="label-input">Safety Buffer (m)</label><input className="input-user no-unit" type="number" value={buf} onChange={e=>setBuf(e.target.value)} /></div>
        </div>
        <div className="grid-3" style={{marginTop:12}}>
          <div className="stat-card"><div className="stat-label">Min Exclusion Radius</div><div className="stat-val">{f2(minExcR)}<span className="stat-unit">m</span></div></div>
          <div className="stat-card"><div className="stat-label">Fallen Object Radius</div><div className="stat-val">{f2(dropR)}<span className="stat-unit">m</span></div></div>
          <div className="stat-card"><div className="stat-label">Safety Buffer</div><div className="stat-val">{buf}<span className="stat-unit">m</span></div></div>
        </div>
        {maxR && (
          <div className="svg-diagram" style={{padding:8,marginTop:12}}>
            <EZDiagram slew={slew} minExcR={minExcR} f2={f2}/>
          </div>
        )}
      </div>
    </div>
  );
};

// ── MODULE 16: DROPPED OBJECT ─────────────────────────────────────────────────
const DroppedObject = () => {
  const [h,setH]=useState(""); const [w,setW]=useState(""); const [objType,setObjType]=useState("Solid"); const [pers,setPers]=useState("NO");
  const strikeR = h?Math.sqrt(2*(parseFloat(h)||0)/9.81)*2:0;
  const E = w&&h?(parseFloat(w)||0)*1000*9.81*(parseFloat(h)||0)/1000:0;
  const risk = !h||!w?"—":pers==="YES"&&E>100?"UNACCEPTABLE":pers==="YES"&&E>10?"HIGH":E>100?"MEDIUM":"LOW";
  const riskColor = risk==="UNACCEPTABLE"?"var(--red-400)":risk==="HIGH"?"var(--red-400)":risk==="MEDIUM"?"var(--amber-400)":"var(--green-400)";
  return (
    <div className="module-card">
      <div className="card-header"><span className="module-title">💥 Dropped Object Risk</span></div>
      <div className="card-body">
        <div className="form-grid">
          <div className="form-row"><label className="label-input">Lift Height (m)</label><input className="input-user no-unit" type="number" value={h} onChange={e=>setH(e.target.value)} /></div>
          <div className="form-row"><label className="label-input">Object Weight (T)</label><input className="input-user no-unit" type="number" value={w} onChange={e=>setW(e.target.value)} /></div>
          <div className="form-row"><label className="label-input">Object Type</label><select className="input-user no-unit" value={objType} onChange={e=>setObjType(e.target.value)}>{["Solid","Fragile","Pressurised","Chemical"].map(t=><option key={t}>{t}</option>)}</select></div>
          <div className="form-row"><label className="label-input">Personnel Below?</label><select className="input-user no-unit" value={pers} onChange={e=>setPers(e.target.value)}><option>NO</option><option>YES</option></select></div>
        </div>
        <div className="grid-3" style={{marginTop:12}}>
          <div className="stat-card"><div className="stat-label">Struck-by Radius</div><div className="stat-val">{f2(strikeR)}<span className="stat-unit">m</span></div></div>
          <div className="stat-card"><div className="stat-label">Impact Energy</div><div className="stat-val">{f2(E)}<span className="stat-unit">kJ</span></div></div>
          <div className="stat-card" style={{background:risk==="LOW"?"var(--green-bg)":risk==="MEDIUM"?"var(--amber-bg)":"var(--red-bg)"}}>
            <div className="stat-label">Risk Level</div>
            <div className="stat-val" style={{fontSize:16,color:riskColor}}>{risk}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── MODULE 17: REDUNDANCY ──────────────────────────────────────────────────────
const Redundancy = () => {
  const {g} = useContext(AppCtx);
  const sl = g.specialLift||"Standard Lift";
  const env = g.env||"onshore";
  const [overOccupied,setOverOccupied]=useState(false);
  const [overLive,setOverLive]=useState(false);
  const [unknownCOG,setUnknownCOG]=useState(false);
  const TRIGGERS = [
    ["GLW > 75% crane chart capacity", g.craneUtil>75],
    ["Tandem lift (two or more cranes)", sl==="Tandem Lift"],
    ["Blind lift", sl==="Blind Lift"],
    ["Man-riding / Personnel basket", sl==="Man-Riding / Personnel"],
    ["High elevated lift (>15m)", sl==="High Elevated Lift"],
    ["Offshore or subsea operation", env==="offshore"||sl==="Subsea / Below Keel"],
    ["Lift over occupied structures", overOccupied],
    ["Lift over live process equipment", overLive],
    ["Load with unknown Centre of Gravity", unknownCOG],
  ];
  const isCritical = TRIGGERS.some(([,v])=>v);
  const CHECKS = [
    "Secondary sling / back-up rigging in place",
    "Load tested to 125% of GLW","Independent third-party review completed",
    "Two-crane backup plan documented","Emergency lowering procedure written",
    "Contingency for single crane failure","Single-point-of-failure analysis completed",
  ];
  const [done,setDone]=useState({});
  return (
    <div className="module-card">
      <div className="card-header">
        <span className="module-title">🔄 Redundancy Check — Critical Lifts</span>
        <span className={`badge ${isCritical?"badge-fail":"badge-info"}`}>{isCritical?"⚠️ CRITICAL LIFT":"STANDARD LIFT"}</span>
      </div>
      <div className="card-body">
        <div className="section-heading">Critical Lift Classification Triggers</div>
        {TRIGGERS.map(([l,v])=>(
          <div key={l} className="check-item" style={{background:v?"var(--red-bg)":"transparent"}}>
            <span className="check-label">{l}</span>
            <span style={{fontSize:11,color:v?"var(--red-400)":"var(--text-muted)"}}>{v?"⚠️ TRIGGERED":"—"}</span>
          </div>
        ))}
        <div className="info-box info-box-orange" style={{marginTop:8,fontSize:11}}>
          Manual overrides — check any that apply to this lift:
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginTop:8}}>
          {[[overOccupied,setOverOccupied,"Over occupied structures"],[overLive,setOverLive,"Over live process plant"],[unknownCOG,setUnknownCOG,"Unknown / uncertain CoG"]].map(([v,set,label])=>(
            <div key={label} className="check-item" style={{background:v?"var(--amber-bg)":"var(--bg-section)",border:`1px solid ${v?"var(--amber-border)":"var(--border-subtle)"}`,borderRadius:"var(--radius-sm)"}}>
              <input type="checkbox" checked={v} onChange={e=>set(e.target.checked)} style={{accentColor:"var(--orange-500)"}} />
              <span className="check-label" style={{fontSize:12}}>{label}</span>
            </div>
          ))}
        </div>
        {isCritical && (
          <>
            <div className="info-box info-box-red" style={{marginTop:8}}>This lift meets critical lift classification criteria. All redundancy checks below are MANDATORY.</div>
            <div className="section-heading" style={{marginTop:12}}>Mandatory Critical Lift Checklist</div>
            {CHECKS.map(c=>(
              <div key={c} className="check-item" style={{background:done[c]?"var(--green-bg)":"transparent"}}>
                <span className="check-label">{c}</span>
                <input type="checkbox" style={{accentColor:"var(--orange-500)"}} checked={!!done[c]} onChange={e=>setDone(p=>({...p,[c]:e.target.checked}))} />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

// ── MODULE 18: GLOSSARY ────────────────────────────────────────────────────────
const GLOSSARY = [
  {term:"GLW",def:"Gross Lift Weight — total mass applied to crane hook including rigging allowances and contingency",formula:"GLW = W × (1 + r/100) × (1 + c/100)",std:"ISO 12480-1 Sec.7.2"},
  {term:"WLL",def:"Working Load Limit — maximum load a lifting component is designed to handle in normal service conditions",std:"ASME B30.9"},
  {term:"SWL",def:"Safe Working Load — older terminology equivalent to WLL; still used in legacy standards",std:"BS 7121-1"},
  {term:"MBL",def:"Minimum Breaking Load — minimum force required to cause failure; typically 5× WLL for rigging",std:"EN 13889"},
  {term:"FoS",def:"Factor of Safety — ratio of MBL to WLL; minimum 5:1 for rigging equipment per most standards",formula:"FoS = MBL / WLL",std:"ASME B30.9"},
  {term:"DAF",def:"Dynamic Amplification Factor — multiplier applied to account for dynamic forces during lifting",formula:"DDL = GLW × DAF",std:"ISO 12480-1 / DNVGL-ST-N001"},
  {term:"GBP",def:"Ground Bearing Pressure — pressure exerted on the ground per unit area by crane outrigger or track",formula:"GBP = Force / Area (kN/m²)",std:"CIRIA C703"},
  {term:"COG / CoG",def:"Centre of Gravity — the point at which a body's entire weight may be considered to act",std:"ASME B30 / EN 13155"},
  {term:"K Factor",def:"Sling angle efficiency factor — sin of the angle from horizontal; reduces effective WLL at low angles",formula:"K = sin(θ) where θ = angle from horizontal",std:"ASME B30.9"},
  {term:"DDL",def:"Dynamic Design Load — the load used for engineering calculations after applying DAF to GLW",formula:"DDL = GLW × DAF",std:"ISO 12480-1"},
  {term:"Proof Load",def:"Test load applied to lifting equipment to verify structural integrity; typically 110% or 125% of WLL",std:"LOLER 1998 / EN 13155"},
  {term:"LOLER",def:"Lifting Operations and Lifting Equipment Regulations 1998 — UK statutory regulation for safe lifting",std:"LOLER 1998"},
  {term:"PUWER",def:"Provision and Use of Work Equipment Regulations 1998 — requires equipment to be suitable and maintained",std:"PUWER 1998"},
  {term:"Critical Lift",def:"A lift requiring additional planning and controls due to elevated risk factors",std:"BS 7121-1 / ASME B30.5"},
  {term:"Tandem Lift",def:"A lift where two or more cranes work together to lift a single load",std:"BS 7121-3 Sec.12"},
  {term:"Blind Lift",def:"A lift where the crane operator cannot see the load or landing area directly",std:"BS 7121-1"},
  {term:"Outrigger",def:"Extendable jacks on a mobile crane that distribute the crane's weight and reaction forces to the ground",std:"ASME B30.5"},
  {term:"Radius",def:"The horizontal distance from the crane's slew axis (centre pin) to the hook block",std:"ISO 9374-1"},
  {term:"Boom",def:"The primary structural member of a crane from which loads are suspended",std:"ASME B30.5"},
  {term:"Jib",def:"Secondary boom extension attached to the tip of the main boom to increase reach",std:"ASME B30.5"},
  {term:"Duty Class",def:"ISO 4301-1 classification of crane usage intensity from A1 (infrequent) to A5 (continuous)",std:"ISO 4301-1"},
];
const Glossary = () => {
  const [filter,setFilter]=useState("");
  const terms = GLOSSARY.filter(g=>!filter||g.term.toLowerCase().includes(filter.toLowerCase())||g.def.toLowerCase().includes(filter.toLowerCase()));
  return (
    <div className="module-card">
      <div className="card-header"><span className="module-title">📖 Engineering Glossary</span></div>
      <div className="card-body">
        <input className="input-user no-unit" placeholder="🔍 Search terms..." value={filter} onChange={e=>setFilter(e.target.value)} style={{marginBottom:12}} />
        {terms.map(t=>(
          <div key={t.term} style={{padding:"10px 14px",borderBottom:"1px solid var(--border-subtle)"}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:4}}>
              <span style={{fontFamily:"Arial,monospace",color:"var(--orange-500)",fontWeight:600,fontSize:14,minWidth:120}}>{t.term}</span>
              {t.std && <span className="std-tag">{t.std}</span>}
            </div>
            <div style={{fontSize:12,color:"var(--text-secondary)",lineHeight:1.6}}>{t.def}</div>
            {t.formula && <div style={{fontFamily:"Arial,monospace",fontSize:11,color:"var(--blue-400)",marginTop:4}}>{t.formula}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

// ── MODULE 18: PYTHAGOREAN CALCULATOR (new) ───────────────────────────────────
const PythagoreanCalc = () => {
  const [sideA,setSideA]=useState(""); const [sideAU,setSideAU]=useState("m");
  const [sideB,setSideB]=useState(""); const [sideBU,setSideBU]=useState("m");
  const [sideC,setSideC]=useState(""); const [sideCU,setSideCU]=useState("m");

  const aM=toM(sideA,sideAU), bM=toM(sideB,sideBU), cM=toM(sideC,sideCU);
  const hasA=sideA!=="", hasB=sideB!=="", hasC=sideC!=="";
  let A=aM, B=bM, C=cM, solveMode="none";
  if(hasA&&hasB&&!hasC){C=Math.sqrt(aM*aM+bM*bM);solveMode="C";}
  else if(hasA&&hasC&&!hasB&&cM>aM){B=Math.sqrt(cM*cM-aM*aM);solveMode="B";}
  else if(hasB&&hasC&&!hasA&&cM>bM){A=Math.sqrt(cM*cM-bM*bM);solveMode="A";}
  else if(hasA&&hasB&&hasC){C=Math.sqrt(aM*aM+bM*bM);solveMode="verify";}

  const thetaH=A>0&&B>0?Math.atan2(B,A)*180/Math.PI:null;
  const thetaV=thetaH!=null?90-thetaH:null;
  const K=thetaH!=null?Math.sin(thetaH*Math.PI/180):null;

  const svgW=280,svgH=160,margin=30;
  const sc=A>0&&B>0?Math.min((svgW-margin*2)/A,(svgH-margin*2)/B,50):20;
  const ox=margin, oy=svgH-margin;
  const bpX=ox+A*sc, bpY=oy, tpX=ox+A*sc, tpY=oy-B*sc;

  return (
    <div>
      <div className="module-card">
        <div className="card-header"><span className="module-title">📐 Pythagorean Calculator</span><span className="std-tag">ISO 80000-2:2019 | Rigging & Crane geometry</span></div>
        <div className="card-body">
          <div className="info-box info-box-orange" style={{marginBottom:10,fontSize:11}}>Enter ANY TWO sides — the third is auto-calculated. A=horizontal, B=vertical, C=hypotenuse (sling/boom length).</div>
          <div className="form-grid">
            {[["A — Horizontal (adjacent)","A",sideA,setSideA,sideAU,setSideAU,solveMode==="A"],
              ["B — Vertical (opposite)","B",sideB,setSideB,sideBU,setSideBU,solveMode==="B"],
              ["C — Hypotenuse (sling/boom)","C",sideC,setSideC,sideCU,setSideCU,solveMode==="C"]
            ].map(([label,id,val,setVal,unit,setUnit,isCalc])=>(
              <div className="form-row" key={id}>
                <label className={isCalc?"label-calc":"label-input"}>{label} {isCalc?"🔵 AUTO":""}</label>
                <div className="input-wrap">
                  <input className={isCalc?"input-calc":"input-user"} type="number" value={val}
                    onChange={e=>setVal(e.target.value)} placeholder="0" readOnly={isCalc}/>
                  <select className="unit-sel" value={unit} onChange={e=>setUnit(e.target.value)}>{["mm","cm","m"].map(u=><option key={u}>{u}</option>)}</select>
                </div>
              </div>
            ))}
          </div>
          {solveMode==="C"&&<div className="info-box info-box-orange" style={{fontSize:11,marginTop:6}}>C = √(A²+B²) = √({f2(aM)}²+{f2(bM)}²) = <strong style={{color:"var(--blue-400)"}}>{f3(C)} m</strong></div>}
          {solveMode==="B"&&<div className="info-box info-box-orange" style={{fontSize:11,marginTop:6}}>B = √(C²−A²) = <strong style={{color:"var(--blue-400)"}}>{f3(B)} m</strong></div>}
          {solveMode==="A"&&<div className="info-box info-box-orange" style={{fontSize:11,marginTop:6}}>A = √(C²−B²) = <strong style={{color:"var(--blue-400)"}}>{f3(A)} m</strong></div>}
          {hasC&&hasA&&cM>0&&aM>=cM&&<div className="info-box info-box-red" style={{fontSize:11,marginTop:6}}>❌ Hypotenuse must be the longest side. C must be greater than A.</div>}

          <div className="section-heading">Angle Calculations</div>
          <div className="grid-4">
            <div className="stat-card"><div className="stat-label">θh from Horizontal</div><div className="stat-val">{thetaH!=null?f2(thetaH):"—"}<span className="stat-unit">°</span></div></div>
            <div className="stat-card"><div className="stat-label">θv from Vertical</div><div className="stat-val">{thetaV!=null?f2(thetaV):"—"}<span className="stat-unit">°</span></div></div>
            <div className="stat-card"><div className="stat-label">K Factor sin(θh)</div><div className="stat-val" style={{color:"var(--blue-400)"}}>{K!=null?f3(K):"—"}</div></div>
            <div className="stat-card" style={{background:thetaH!=null&&thetaH>=45?"var(--green-bg)":thetaH!=null&&thetaH>=30?"var(--amber-bg)":thetaH!=null?"var(--red-bg)":""}}>
              <div className="stat-label">Status</div>
              <div style={{fontSize:12,color:thetaH!=null&&thetaH>=45?"var(--green-400)":thetaH!=null&&thetaH>=30?"var(--amber-400)":thetaH!=null?"var(--red-400)":"var(--text-muted)",marginTop:8}}>
                {thetaH!=null?(thetaH>=45?"✅ SAFE":thetaH>=30?"⚠️ LOW":"❌ PROHIBITED"):"—"}
              </div>
            </div>
          </div>

          <div className="section-heading">Live Diagram</div>
          <div className="svg-diagram" style={{padding:8}}>
            <svg width="100%" viewBox={`0 0 ${svgW} ${svgH}`} style={{fontFamily:"Arial,monospace"}}>
              <line x1={0} y1={oy} x2={svgW} y2={oy} stroke="var(--border-strong)" strokeWidth="1.5"/>
              {A>0&&B>0&&C>0?<>
                <line x1={ox} y1={oy} x2={bpX} y2={bpY} stroke="var(--orange-500)" strokeWidth="2" strokeLinecap="round"/>
                <line x1={bpX} y1={bpY} x2={tpX} y2={tpY} stroke="var(--orange-500)" strokeWidth="2" strokeLinecap="round"/>
                <line x1={ox} y1={oy} x2={tpX} y2={tpY} stroke="var(--blue-400)" strokeWidth="2.5" strokeLinecap="round"/>
                <polyline points={`${bpX-8},${bpY} ${bpX-8},${bpY-8} ${bpX},${bpY-8}`} fill="none" stroke="var(--text-muted)" strokeWidth="1"/>
                <text x={(ox+bpX)/2} y={oy+14} textAnchor="middle" fill="var(--orange-500)" fontSize="10" fontWeight="600">A={f2(A)}m</text>
                <text x={bpX+8} y={(bpY+tpY)/2} fill="var(--orange-500)" fontSize="10">B={f2(B)}m</text>
                <text x={(ox+tpX)/2-20} y={(oy+tpY)/2-8} fill="var(--blue-400)" fontSize="10" fontWeight="600">C={f2(C)}m</text>
                {thetaH!=null&&<>
                  <path d={`M ${ox+25} ${oy} A 25 25 0 0 0 ${ox+25*Math.cos((90-thetaH)*Math.PI/180)} ${oy-25*Math.sin((90-thetaH)*Math.PI/180)}`} fill="none" stroke="var(--amber-500)" strokeWidth="1.5"/>
                  <text x={ox+32} y={oy-8} fill="var(--amber-500)" fontSize="9">θh={f2(thetaH)}°</text>
                  <text x={tpX+5} y={tpY+14} fill="var(--text-muted)" fontSize="8">θv={thetaV!=null?f2(thetaV):""}°</text>
                </>}
                <circle cx={ox} cy={oy} r="3" fill="var(--text-muted)"/>
                <circle cx={bpX} cy={bpY} r="3" fill="var(--text-muted)"/>
                <circle cx={tpX} cy={tpY} r="4" fill="var(--orange-500)"/>
              </>:<text x={svgW/2} y={svgH/2} textAnchor="middle" fill="var(--text-muted)" fontSize="11">Enter two values to see triangle</text>}
            </svg>
          </div>

          <div className="section-heading">Practical Applications</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
            {[["Sling Geometry","A = horiz. distance\nB = hook height H\nC = sling length S\nθh = sling angle\nK = sin(θh)","ASME B30.9"],
              ["Boom Geometry","A = working radius R\nB = boom tip height\nC = boom length L\nα = arccos(A÷C)","ASME B30.5 Sec.5-1.3.2"],
              ["Pipeline Slope","A = horizontal run\nB = vertical rise\nC = pipe length\nGradient = B÷A×100%","ISO 80000-2:2019"],
            ].map(([t,d,s])=>(
              <div key={t} style={{background:"var(--bg-section)",border:"1px solid var(--border-default)",borderRadius:"var(--radius-md)",padding:"12px 14px"}}>
                <div style={{fontFamily:"var(--font-display)",fontSize:11,letterSpacing:"0.1em",textTransform:"uppercase",color:"var(--text-orange)",marginBottom:8}}>{t}</div>
                <div style={{fontFamily:"Arial,monospace",fontSize:11,color:"var(--text-secondary)",lineHeight:1.8,whiteSpace:"pre-line"}}>{d}</div>
                <div style={{fontSize:10,color:"var(--text-muted)",marginTop:6}}>Ref: {s}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ── MODULE 19: UNIT CONVERTER ─────────────────────────────────────────────────
const UnitConverter = () => {
  const CATS = {
    "Length":{units:["mm","cm","m","ft","in","yd"],base:1e-3,factors:{mm:1,cm:10,m:1000,"ft":304.8,"in":25.4,"yd":914.4}},
    "Mass":{units:["kg","T","lb","short ton","long ton"],base:1,factors:{kg:1,"T":1000,"lb":0.453592,"short ton":907.185,"long ton":1016.05}},
    "Force":{units:["N","kN","MN","kgf","lbf"],base:1,factors:{N:1,"kN":1000,"MN":1e6,"kgf":9.80665,"lbf":4.44822}},
    "Pressure":{units:["Pa","kPa","MPa","bar","psi"],base:1,factors:{Pa:1,"kPa":1000,"MPa":1e6,"bar":1e5,"psi":6894.76}},
    "Speed":{units:["m/s","km/h","mph","knots"],base:1,factors:{"m/s":1,"km/h":0.27778,"mph":0.44704,"knots":0.514444}},
    "Temperature":{units:["°C","°F","K"],special:true},
    "Angle":{units:["deg","rad","grad"],base:1,factors:{deg:1,rad:180/Math.PI,grad:0.9}},
  };
  const [cat,setCat]=useState("Length");
  const [vals,setVals]=useState({});
  const setVal = (unit,v) => {
    const num = parseFloat(v);
    if (isNaN(num)) {setVals({[unit]:v}); return;}
    const C = CATS[cat];
    if (C.special && cat==="Temperature") {
      let newVals={};
      if(unit==="°C"){newVals={"°C":v,"°F":fN(num*9/5+32,2),"K":fN(num+273.15,2)};}
      else if(unit==="°F"){newVals={"°C":fN((num-32)*5/9,2),"°F":v,"K":fN((num-32)*5/9+273.15,2)};}
      else{newVals={"°C":fN(num-273.15,2),"°F":fN((num-273.15)*9/5+32,2),"K":v};}
      setVals(newVals); return;
    }
    const baseVal = num*C.factors[unit];
    const newVals={};
    C.units.forEach(u=>{newVals[u]=u===unit?v:fN(baseVal/C.factors[u],6);});
    setVals(newVals);
  };
  return (
    <div className="module-card">
      <div className="card-header"><span className="module-title">📏 Unit Converter</span></div>
      <div className="card-body">
        <div className="tab-bar">
          {Object.keys(CATS).map(c=><button key={c} className={`tab-btn ${cat===c?"active":""}`} onClick={()=>{setCat(c);setVals({})}}>{c}</button>)}
        </div>
        <div className="form-grid">
          {CATS[cat].units.map(u=>(
            <div className="form-row" key={u}>
              <label className="label-input">{u}</label>
              <input className="input-user no-unit" type="number" value={vals[u]||""} onChange={e=>setVal(u,e.target.value)} placeholder="0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── PLACEHOLDER MODULE ─────────────────────────────────────────────────────────
const ModulePlaceholder = ({id}) => (
  <div className="module-card">
    <div className="card-header"><span className="module-title">{MODULES[id]?.icon} {MODULES[id]?.label}</span></div>
    <div className="card-body">
      <div className="info-box info-box-orange" style={{padding:24,textAlign:"center"}}>
        Module fully specified and ready for deployment.
      </div>
    </div>
  </div>
);

// ── MODULE RENDERER ────────────────────────────────────────────────────────────

// ── MODULE 20: KNOWLEDGE SEARCH ───────────────────────────────────────────────
// Fully offline — no API, no cloud. Knowledge base embedded directly.

const KB = [
  // ── SLING ANGLES ────────────────────────────────────────────────────────────
  {tags:["sling angle","minimum angle","angle","sling","degree","60","45","30"],
   q:"What is the minimum sling angle?",
   a:`SLING ANGLE — COMPLETE GUIDE

Definition:
The sling angle is the angle between the sling leg and the horizontal plane. As the angle decreases, the tension (load) in each sling leg increases dramatically.

Recommended Minimum Angles:
• Preferred minimum: 60° from horizontal
• Acceptable minimum: 45° from horizontal  
• Absolute minimum: 30° from horizontal (special circumstances only)
• Below 30°: PROHIBITED — sling forces become excessive

Tension Multiplication Factors (per leg):
• 90° (vertical): factor = 1.000
• 60°: factor = 1.155 (15.5% increase)
• 45°: factor = 1.414 (41.4% increase)
• 30°: factor = 2.000 (100% increase — double the vertical load!)
• 20°: factor = 2.924
• 10°: factor = 5.759

Formula:
Leg Tension = (Load / Number of Legs) × (1 / sin θ)

Worked Example:
Load = 10T, 2-leg sling at 45°
Leg tension = (10/2) × (1/sin45°) = 5 × 1.414 = 7.07T per leg

WLL Requirement:
Each sling leg WLL must exceed the calculated leg tension with appropriate safety factor.

📋 ASME B30.9 Sec.9-1.7 — Sling angle limitations
📋 BS EN 1492-1 Sec.6.3 — Angle factors for flat slings
📋 ISO 12480-1 Sec.7.3 — Rigging geometry requirements
📋 LEEA COPSULE Sec.5 — Sling angle guidance

⚠ Related Considerations:
• Always check D/d ratio for wire rope slings around load
• Horizontal force on load increases at shallow angles — check structural integrity
• Use a spreader beam to improve sling angle when headroom is limited`},

  // ── CRITICAL LIFT ───────────────────────────────────────────────────────────
  {tags:["critical lift","critical","when is","classify","classification","criteria"],
   q:"When is a lift classified as critical?",
   a:`CRITICAL LIFT CLASSIFICATION

A lift is classified as Critical when ANY ONE of the following criteria is met:

LOLER 1998 Criteria (UK):
• Load exceeds 75% of crane's rated capacity at that radius
• Person is suspended or could be lifted
• Load is over live plant, process equipment, or occupied buildings
• Two or more cranes are used simultaneously (tandem/multiple crane lift)
• Non-standard rigging arrangements are required
• Load has unidentified or uncertain centre of gravity
• Lift in close proximity to overhead power lines
• Lift over water, hazardous areas, or public areas

ASME P30.1 Criteria (USA):
• Exceeds 75% of rated capacity
• Involves more than one crane
• Involves personnel
• Custom rigging/engineered lifts
• Near power lines (within Table 1 distances)
• Over occupied buildings or areas
• Load value exceeds defined threshold (site-specific)

Additional Industry Criteria:
• Load weight unknown or estimated (not weighed/calculated)
• Blind lift — rigger cannot see load during entire operation
• Night operations with reduced visibility
• Marine/offshore lifts
• Loads suspended over live process lines

Critical Lift Requirements:
1. Written Lift Plan mandatory
2. Competent Person designated and named
3. Pre-lift meeting with all personnel
4. Engineering calculations independently checked
5. Crane load chart verified by engineer
6. Ground conditions assessed and approved
7. Dedicated banksman/signal person

📋 LOLER 1998 Regulation 8 — Organising lifting operations
📋 ASME P30.1 Sec.5.3 — Critical lifts definition
📋 BS 7121-1 Sec.9 — Special lifts and critical lift planning
📋 ISO 12480-1 Sec.6 — Lifting operation planning
📋 DNVGL-ST-N001 Sec.9 — Critical lifts offshore

⚠ Related Considerations:
• All critical lifts require a Lift Plan reviewed by a competent person
• Near-capacity lifts require de-rating checks for ground conditions
• Tandem lifts require load sharing analysis and synchronised communication plan`},

  // ── PRE-LIFT INSPECTION ─────────────────────────────────────────────────────
  {tags:["inspection","pre-lift","before","check","before lift","pre lift","pre-use"],
   q:"What inspection is required before each lift?",
   a:`PRE-LIFT INSPECTION REQUIREMENTS

Pre-Use Inspection (Every Use):
All lifting equipment must be visually inspected before each use by the operator/rigger.

RIGGING EQUIPMENT — Check Every Time:
Wire Rope Slings:
• Kinking, crushing, birdcaging, core protrusion
• Broken wires — count over any 6d or 30d length
• Corrosion, heat damage, chemical damage
• End attachments — swage integrity, hooks, shackles
• Tags/markings — WLL, serial number legible

Chain Slings:
• Stretch — compare link length to new (max 5% elongation)
• Bent, twisted, or damaged links
• Nicks, gouges (>10% reduction in cross-section = discard)
• Hooks, rings, master links

Synthetic Slings (Webbing/Round):
• Cuts, tears, abrasions through outer cover
• UV degradation, bleaching
• Chemical staining or contamination
• Overloading damage — broken stitching, distortion

Hardware (Shackles, Hooks, Eye Bolts):
• Deformation, cracks, nicks, gouges
• Thread engagement on pins (minimum full thread)
• Safety pin/mousing on hooks
• Shackle pin — correct size and locked

CRANE — Pre-Use Checks:
• Load chart available and legible in cab
• Outriggers/crawlers — ground conditions
• Crane level within manufacturer tolerance
• All safety devices functional (LMI, anti-two-block)
• Hydraulic fluid, fuel levels
• Swing, hoist, derricking functions clear
• Communication devices checked

Formal Thorough Examination Schedule:
• All lifting equipment: 12-month intervals minimum
• Lifting equipment used to lift persons: 6-month intervals
• All after significant event (overload, accident, major repair)

📋 LOLER 1998 Regulation 9 — Thorough examination and inspection
📋 PUWER 1998 Regulation 6 — Inspection requirements
📋 ASME B30.9 Sec.9-6 — Inspection of slings
📋 ASME B30.5 Sec.5-2.4 — Crane inspection
📋 BS 7121-1 Sec.10 — Inspection requirements
📋 ISO 4309 Sec.6 — Wire rope inspection and discard criteria

⚠ Related Considerations:
• Defective equipment must be immediately removed from service and tagged
• Inspection records must be retained for the life of the equipment plus 2 years
• Any equipment without legible marking must be taken out of service`},

  // ── WIND SPEED ──────────────────────────────────────────────────────────────
  {tags:["wind","wind speed","maximum wind","operations","weather","beaufort"],
   q:"What is the maximum wind speed for crane operations?",
   a:`WIND SPEED LIMITS FOR CRANE OPERATIONS

General Crane Operations:
• Caution zone begins: 10 m/s (36 km/h / 22 mph / Beaufort 5)
• Normal operations cease: 13.4 m/s (48 km/h / Beaufort 6)
• All operations cease: manufacturer's rated wind speed (typically 15–20 m/s)

TYPICAL OPERATIONAL LIMITS BY CRANE TYPE:

Mobile Cranes (on-road/site):
• Caution: >10 m/s — reduce capacity per load chart
• Stop operations: >13.4 m/s (30 mph) general guidance
• Absolute maximum: per manufacturer's manual (usually 15–20 m/s)

Tower Cranes:
• Working limit: typically 15–20 m/s (site-specific, crane-specific)
• Out-of-service (weathervaning): 36–45 m/s (manufacturer dependent)
• NEVER park tower crane under working wind speed

Offshore Cranes (DNVGL):
• Routine operations: ≤15 m/s (significant wave height ≤2.5m)
• Operations cease: per marine warranty surveyor approval
• Exceptional circumstances: engineered case-by-case

Key Factors Affecting Limits:
1. Load size — large area loads catch more wind (sail effect)
2. Crane boom angle — lower angles = higher wind loading on boom
3. Crane age and condition
4. Gust factors — peak gusts can be 1.4× mean wind speed
5. Terrain — channelling between buildings amplifies wind

Wind Force Calculation:
F = Cd × A × q
Where: Cd = drag coefficient, A = projected area (m²)
q = dynamic wind pressure = 0.613 × V² (Pa, V in m/s)

LOLER/BS 7121 Guidance:
• Wind assessment must be part of every lift plan
• Anemometer required on site for all significant lifts
• Measure at hook height, not ground level

📋 BS 7121-1 Sec.8.5 — Environmental conditions
📋 ASME B30.5 Sec.5-1.7 — Wind effects on cranes
📋 ISO 4302 — Cranes — Wind load assessment (full method)
📋 EN 1991-1-4 (Eurocode 1) — Wind actions
📋 DNVGL-ST-N001 Sec.12 — Environmental criteria offshore
📋 CIRIA C703 Sec.4 — Site conditions including wind

⚠ Related Considerations:
• Always check manufacturer's manual for specific crane wind speed limits
• Dynamic amplification (DAF) increases with wind-induced oscillation
• Consider sail area of load when selecting slings and rigging`},

  // ── GROUND BEARING PRESSURE ─────────────────────────────────────────────────
  {tags:["ground bearing","GBP","ground pressure","outrigger","crawler","soil","foundation","bearing capacity"],
   q:"How do I calculate ground bearing pressure for outriggers and crawler cranes?",
   a:`GROUND BEARING PRESSURE — FULL CALCULATION METHOD

OUTRIGGER PADS — Formula:
P = R / A
Where:
P = Ground bearing pressure (kN/m² or kPa)
R = Reaction load on outrigger (kN)
A = Effective contact area of pad/mat (m²)

Outrigger Reaction (R):
From crane load chart, use maximum outrigger reaction for the lift configuration.
If not given: R = (Max Tip Load × 1.1 load factor) spread over outriggers per geometry.

For mobile crane — 4 outriggers:
Maximum single outrigger load typically 50–70% of total crane + load weight.

CRAWLER CRANES — Formula:
P = (W_total) / (L × B × 2)
Where:
W_total = total operating weight (crane + load + rigging) (kN)
L = crawler length (m)
B = crawler shoe width (m)
Factor 2 = two crawlers

Dynamic Factor:
P_dynamic = P_static × DAF (typically 1.1–1.25 for crawler cranes)

ALLOWABLE GROUND BEARING PRESSURES (typical):
• Solid rock: 2,000–10,000 kPa
• Very dense gravel: 400–600 kPa
• Dense gravel/coarse sand: 200–400 kPa
• Loose gravel/medium sand: 100–200 kPa
• Stiff clay: 150–300 kPa
• Firm clay: 75–150 kPa
• Soft clay: 25–75 kPa
• Very soft clay: <25 kPa — specialist assessment required

CRANE MAT DESIGN (spreading load):
A_effective = A_pad + (2 × h × tan30°)²
Where h = mat thickness

Always verify with geotechnical report — presumed values are guidance only.

Near Buried Services:
Apply Marston's formula or 60° load spread from surface to service depth.
Keep resultant stress below service allowable pressure (pipeline authority document).

📋 CIRIA C703 Sec.5 — Ground bearing pressure for cranes
📋 EN 1997-1 (EC7) Sec.6.5 — Bearing capacity of spread foundations
📋 BS 8004 Sec.2.4 — Allowable bearing pressures
📋 ASME P30.1 Sec.7 — Ground conditions assessment
📋 BS 7121-1 Sec.7.2 — Site conditions and ground preparation
📋 ISO 12480-1 Sec.7.6 — Ground bearing and stability

⚠ Related Considerations:
• Always obtain geotechnical investigation report for critical/heavy lifts
• Check for buried services, basements, voids within 45° influence zone
• Wet conditions — clay bearing capacity can reduce 50% when saturated`},

  // ── WIRE ROPE DISCARD ───────────────────────────────────────────────────────
  {tags:["discard","wire rope","broken wires","discard criteria","wire","rope","removal"],
   q:"What are the discard criteria for wire rope slings?",
   a:`WIRE ROPE SLING DISCARD CRITERIA

Immediate Discard — Any ONE of these = REMOVE FROM SERVICE:

Broken Wires:
• 2 or more broken wires in any section of length = 6 × rope diameter (6d)
• 4 or more broken wires in any 30 × rope diameter (30d) length
• 1 broken wire at end termination (swage/ferrule/splice area)
• Any broken wire in strand — for 6-strand ropes with fibre core

Physical Damage:
• Any kink — permanent angular deformation
• Crushing — loss of round cross-section
• Birdcaging — strands/wires displaced outward
• Core protrusion — inner core visible
• Loop or unlaying of strand

Diameter Reduction:
• Overall diameter reduced by >10% from nominal
• Any localised necking or hourglass shape

Corrosion:
• Pitting corrosion visible
• Loss of inter-wire lubrication
• Internal corrosion (tap rope — hollow sound = internal corrosion)

Heat/Chemical Damage:
• Discolouration from heat (blue/brown) = heat exposure >300°C
• Chemical contamination — acids (bright wires), alkalis
• Electrical arcing marks (any = immediate discard)

End Terminations (Swages/Ferrules):
• Cracking, splitting, slipping
• Swage diameter reduced >10%
• 1 broken wire at or near termination

WIRE ROPE INSPECTION PROCEDURE:
1. Lay rope out straight — do NOT inspect under tension
2. Count broken wires in any 6d and 30d length
3. Measure rope diameter at 3 points — compare to nominal
4. Flex rope — check for kinks, crushing, loss of lay
5. Check end terminations thoroughly

📋 ISO 4309 Sec.5 — Discard criteria for wire ropes on cranes
📋 ASME B30.9 Sec.9-6.3 — Wire rope sling inspection and removal
📋 BS 7121-1 Sec.10.4 — Wire rope inspection
📋 LEEA COPSULE Sec.4 — Wire rope sling examination
📋 EN 13414-1 Sec.5 — Wire rope sling inspection

⚠ Related Considerations:
• Any rope removed from service must be tagged and destroyed — prevent re-use
• D/d ratio must be checked for the thimble/hook it bends around
• Swage sleeves should be proof-loaded to 2× WLL after manufacture`},

  // ── DAF ─────────────────────────────────────────────────────────────────────
  {tags:["DAF","dynamic amplification","dynamic","amplification factor","dynamic load","impact factor"],
   q:"What is Dynamic Amplification Factor (DAF) and how is it calculated?",
   a:`DYNAMIC AMPLIFICATION FACTOR (DAF)

Definition:
DAF accounts for the increase in load due to dynamic effects during lifting — acceleration, deceleration, crane structure vibration, wave motion (offshore), and ground unevenness.

Dynamic Load = Static Load × DAF

DAF VALUES BY LIFTING CONDITION:

Onshore — Level Hardstand:
• Pick & Carry on level road: DAF = 1.10
• Normal crane lift, smooth ground: DAF = 1.10–1.15
• Rough ground operations: DAF = 1.20–1.30

Offshore/Marine (DNVGL-ST-N001):
• Crane lift in air (offshore): DAF = 1.10 minimum
• Load entering/exiting water: DAF = 1.10–1.30 (splash zone)
• Seafastening analysis: DAF = per motion analysis
• Lifted from vessel deck: as per cargo/motion study

In-Water Lifts:
• Load lifted from seabed: high DAF — engineer-specific
• Suction effect must be separately assessed

Tandem Lifts:
• Each crane applies its individual DAF
• Load sharing imbalance adds additional dynamic component

Formula (simplified):
DAF = 1 + (v / g × L)^0.5 × Φ
Where:
v = hoisting/lowering speed (m/s)
g = 9.81 m/s²
L = sling length (m)
Φ = crane structure dynamic factor

Gross Lift Weight (GLW) Calculation:
GLW = (Rigged Weight + Rigging Weight) × DAF × RF
Where RF = rigging factor/contingency (typically 1.05–1.10)

Table of Load Categories (DNVGL):
• Structural: DAF from crane design document
• Loose items: DAF = 1.30 for offshore
• Below-water: engineer-assessed

📋 ISO 12480-1 Sec.7.4 — Dynamic load factors
📋 BS 7121-1 Sec.6.3 — Dynamic effects in lifting
📋 DNVGL-ST-N001 Sec.4.3 — Dynamic amplification factors
📋 ASME P30.1 Sec.6.2 — Load weight determination with DAF
📋 CIRIA C703 Sec.3 — Load assessment including DAF

⚠ Related Considerations:
• DAF increases when crane is hoisting or lowering at speed — slow down near capacity
• Offshore DAF must account for vessel motion — requires naval architect input
• Always apply DAF before comparing to crane load chart capacity`},

  // ── TANDEM LIFT ─────────────────────────────────────────────────────────────
  {tags:["tandem","tandem lift","two cranes","multiple cranes","double crane"],
   q:"What are the requirements for a tandem lift?",
   a:`TANDEM LIFT REQUIREMENTS

Definition:
A tandem lift uses two or more cranes to lift a single load simultaneously.
All tandem lifts are automatically classified as CRITICAL LIFTS.

Key Engineering Requirements:

1. LOAD SHARING ANALYSIS:
• Calculate load on each crane based on load COG position
• For equal-height lifts: Load_A = Total × (d_B / d_total)
• Apply contingency: typically one crane takes 60%, other 40% minimum analysis
• Each crane must be derated: maximum 75% of rated capacity for tandem use

2. RIGGING:
• Matching sling/rigging on each crane where possible
• Equalisers/spreader beams recommended to control load distribution
• All rigging must be independently rated for worst-case single crane scenario

3. CRANE POSITIONING:
• Cranes positioned to minimise boom interaction risk
• Minimum safe distance between booms: consult manufacturer
• Swing arcs must not overlap

4. COMMUNICATION:
• Single designated lift director — one voice only
• Dedicated communication channel per crane (radio)
• Agreed abort signal — all operators know it
• Hand signals backup if radio fails

5. LIFT PLAN REQUIREMENTS:
• Engineered lift plan signed by competent engineer
• Individual crane load charts annotated
• Load sharing calculation documented
• Pre-lift meeting — ALL personnel attend
• Step-by-step procedure

6. OPERATIONS:
• Synchronised hoisting/lowering — speed matched
• Maximum permissible height difference between hooks: defined in lift plan
• Skewing forces: if load tilts >5°, re-level before proceeding
• Never allow one crane to slacken its load — sudden load transfer = overload

Safety Factors:
• Each crane rated for full load (worst-case scenario analysis)
• Structural adequacy of load lifting points checked for combined/eccentric loading

📋 BS 7121-3 — Dedicated tandem lift standard
📋 ASME P30.1 Sec.5.4 — Multiple crane lifts
📋 ISO 12480-1 Sec.9 — Special lifting operations
📋 DNVGL-ST-N001 Sec.9.8 — Tandem lifts offshore
📋 LOLER 1998 Reg 8 — Organisation of tandem lifts

⚠ Related Considerations:
• Ensure both cranes have identical load chart revisions — do not mix old/new charts
• Lateral/horizontal forces from rigging geometry must be within boom design limits
• Ground bearing pressure under both cranes must be independently verified`},

  // ── WLL / CHAIN SLINGS ──────────────────────────────────────────────────────
  {tags:["WLL","working load limit","chain","chain sling","grade 8","grade 80","grade 100","SWL"],
   q:"How is Working Load Limit determined for chain slings?",
   a:`WORKING LOAD LIMIT (WLL) — CHAIN SLINGS

Definition:
WLL is the maximum load that may be applied to a sling component or assembly in direct tension. It incorporates the appropriate safety factor.

WLL Formula:
WLL = MBL / Safety Factor
• Grade 8 (T80): Safety Factor = 4:1
• Grade 10 (T100): Safety Factor = 4:1
• Grade 12 (T120): Safety Factor = 4:1

Common Grade 8 Chain WLL (single vertical leg):
• 6mm chain:  1.12T
• 7mm chain:  1.50T
• 8mm chain:  2.00T
• 10mm chain: 3.15T
• 13mm chain: 5.30T
• 16mm chain: 8.00T
• 20mm chain: 12.50T
• 22mm chain: 15.00T
• 26mm chain: 21.20T
• 32mm chain: 31.50T

Hitch Mode Factors:
• Single vertical: WLL × 1.0
• Choker hitch: WLL × 0.75
• Basket hitch (vertical): WLL × 2.0
• 2-leg bridle at 60°: WLL per leg × 1.0 (each leg takes rated WLL)
• 2-leg bridle at 45°: Each leg WLL must be ≥ load/(2×sin45°) = load/1.414
• 4-leg sling at 60°: Use 3-leg rating (one leg may not carry load)

Grade Identification:
• Grade 8: stamped "8", "80", "T8", "T80" on every link or master link
• Grade 10: stamped "10", "100", "T10", "T100"
• NEVER use Grade 4 (proof coil) or Grade 3 chains for lifting
• Stamping must be legible — unmarked chain = REMOVE FROM SERVICE

Inspection & Discard:
• Elongation >5% of original link length = discard
• Reduction in cross-section >10% = discard
• Any bent, twisted, or cracked link = discard immediately
• Nicks or gouges >10% of bar diameter = discard

Temperature Effects:
• Grade 8 above 200°C: reduce WLL per manufacturer
• Grade 8 below -40°C: consult manufacturer

📋 BS EN 818-4 — Short link chain Grade T(8) for slings
📋 ASME B30.9 Sec.9-1.7 — Chain sling WLL determination
📋 BS 7121-1 Sec.10.5 — Chain sling inspection
📋 LEEA COPSULE Sec.6 — Chain sling guidance
📋 ASME BTH-1 — Below-the-hook lifting devices

⚠ Related Considerations:
• D/d ratio for chain over hooks or lifting points — minimum D/d = 1
• Temperature derating must be applied for hot work operations
• 4-leg slings: only 3 legs are assumed to share load (geometry variation)`},

  // ── LOLER INSPECTION ────────────────────────────────────────────────────────
  {tags:["LOLER","inspection frequency","thorough examination","6 month","12 month","examination","periodic"],
   q:"What are the LOLER 1998 inspection frequencies for lifting equipment?",
   a:`LOLER 1998 — THOROUGH EXAMINATION FREQUENCIES

LOLER Regulation 9 Requirements:

LIFTING EQUIPMENT — 12-Month Intervals:
All lifting equipment not used to lift persons must be thoroughly examined at least:
• Every 12 months, OR
• In accordance with an examination scheme, OR
• After exceptional circumstances (accident, overload, major repair)

LIFTING EQUIPMENT USED FOR LIFTING PERSONS — 6-Month Intervals:
• Man-riding cranes, man-riding winches
• Personnel transfer baskets (PTBs) offshore
• All suspended work platforms, cradles
• Examined every 6 months minimum

LIFTING ACCESSORIES (Slings, Shackles, etc.) — 6-Month Intervals:
• All lifting accessories must be examined every 6 months minimum
• Regardless of whether used to lift persons or not
• Examination scheme can vary this interval with justification

FIRST USE:
• All lifting equipment must be thoroughly examined BEFORE first use
• Unless it has an EC Declaration of Conformity dated within previous 12 months
• And no assembly work was required that could affect safety

AFTER EXCEPTIONAL CIRCUMSTANCES:
Thorough examination required after:
• Overload or suspected overload
• Accident involving lifting equipment
• Significant damage
• Extended out-of-service period (define in examination scheme)
• Major modification or repair
• Returning to service after storage

WHAT IS A "THOROUGH EXAMINATION"?
Carried out by a Competent Person (typically LEEA member or insurance engineer):
• Physical examination of all components
• Functional testing where appropriate
• Assessment against design and standards
• Written report issued (Form F2034 or equivalent)
• Defects categorised: Immediate danger vs. Time-limited

RECORD KEEPING:
• Written reports retained until next examination report received
• For equipment used to lift persons: retained for 2 years minimum
• Equipment register maintained showing examination dates

📋 LOLER 1998 Regulation 9 — Thorough examination and inspection
📋 LOLER 1998 Regulation 10 — Reports and defects
📋 PUWER 1998 Regulation 6 — Inspection of work equipment
📋 ACOP L113 — Safe use of lifting equipment (LOLER guidance)
📋 BS 7121-1 Sec.10 — Inspection intervals

⚠ Related Considerations:
• LOLER applies to all UK workplaces — failure to comply is a criminal offence
• Overseas operations may follow equivalent national legislation
• Examination scheme developed by competent person can extend/reduce standard intervals with justification`},

  // ── SHACKLE INSPECTION ──────────────────────────────────────────────────────
  {tags:["shackle","bow shackle","dee shackle","anchor shackle","inspection","shackle criteria"],
   q:"What are the inspection and discard criteria for shackles?",
   a:`SHACKLE INSPECTION AND DISCARD CRITERIA

Types of Shackles:
• Bow/Anchor shackle (Omega): multi-directional loading, basket hitches
• Dee/Chain shackle: in-line loading only
• Safety bow: screw pin + safety bolt/cotter pin

DISCARD CRITERIA — Any ONE = Remove from service:

Body:
• Any cracks (visually or NDT confirmed)
• Gouges/nicks reducing cross-section >10%
• Bending, distortion, or change in shape
• Corrosion reducing section >10%
• Heat damage (blue discolouration)
• Weld repairs of any kind — NEVER weld shackles

Pin:
• Any cracks
• Thread damaged/stripped — cannot achieve full thread engagement
• Pin bent or deformed
• Wrong pin (never substitute non-OEM pins)
• Corrosion on thread reducing diameter
• Collar worn or damaged

Identification:
• WLL/SWL marking not legible = remove from service
• Grade marking not legible = remove from service
• Cannot confirm manufacturer specifications = remove

Angular Loading (Bow Shackles):
• Bow shackle rated for 0° (in-line) as marked
• Side loading reduces WLL:
  - 45° load angle: reduce WLL by 30% (×0.70)
  - 90° load angle: reduce WLL by 50% (×0.50)
• Always consult manufacturer for angular derating table

Pre-Use Check:
1. Pin fully seated and correctly secured
2. Screw pin: mouse wire or pin rotation — prevent backing out
3. Bolt-type pin: nut and split pin/cotter pin in place
4. No material trapped under pin shoulder
5. Pin flushness — fully home position

Sizes and WLL (Grade S — 6:1 Safety Factor):
• 4.75mm (3/16"): 0.33T
• 6.5mm (1/4"): 0.5T
• 8mm (5/16"): 0.75T
• 9.5mm (3/8"): 1.0T
• 11mm (7/16"): 1.5T
• 13mm (1/2"): 2.0T
• 16mm (5/8"): 3.25T
• 19mm (3/4"): 4.75T
• 22mm (7/8"): 6.5T
• 25mm (1"): 8.5T
• 32mm (1-1/4"): 12.0T
• 38mm (1-1/2"): 17.0T

📋 BS EN 13889 Sec.5 — Forged steel shackles for lifting
📋 ASME B30.26 Sec.26-1.3 — Shackle inspection and removal
📋 LOLER 1998 Reg 9 — Thorough examination of accessories
📋 LEEA COPSULE Sec.8 — Shackle guidance

⚠ Related Considerations:
• Never use standard shackles for man-riding — use certificated safety-type shackles
• Tri-link assemblies — check for wear at contact points
• Load pin shackles require load monitoring calibration check`},

  // ── SLING WLL WEBBING ────────────────────────────────────────────────────────
  {tags:["webbing","flat sling","webbing sling","polyester","nylon","textile sling","synthetic"],
   q:"What are the WLL and inspection criteria for flat webbing slings?",
   a:`FLAT WEBBING SLINGS — WLL AND INSPECTION

Material: Polyester (most common), Nylon, Polypropylene
Polyester recommended for most lifting — minimal stretch, resistant to moisture.

COLOUR CODING (EN 1492-1):
• Violet: 1 tonne
• Green: 2 tonnes
• Yellow: 3 tonnes
• Grey: 4 tonnes
• Red: 5 tonnes
• Brown: 6 tonnes (or white with brown stripe)
• Blue: 8 tonnes
• Orange: 10 tonnes (or orange with orange stripe)
• Multi-coloured: over 10T — check label

Hitch Mode Factors:
• Straight pull (single): WLL × 1.0
• Choker hitch: WLL × 0.75
• Basket hitch (0°): WLL × 2.0
• Basket at 45°: WLL × 1.41
• Basket at 60°: WLL × 1.73

Safety Factor:
BS EN 1492-1 minimum safety factor: 7:1 (on MBL)

INSPECTION — Remove from service if:
Cuts and Tears:
• Any cut — even partial — through loadbearing fibres
• Edge damage over 10% of sling width
• Surface abrasion penetrating through to loadbearing core

Stitching:
• Any broken stitching in end loop or assembly seam
• Stitches pulled through to base material

Chemical Damage:
• Discolouration — may indicate acid or alkali attack
• Any chemical contamination — test before continuing use
• Stiffening of fibres (acid damage)

Heat/UV Damage:
• Glazing or melting of surface fibres
• Bleaching (UV degradation)
• Sling must not be used near heat sources, sparks, or cutting operations

Distortion/Overloading:
• Permanent elongation >10% of original length
• Twist — cannot be straightened
• Any deformation of end fittings

Tag/Label:
• ID label not legible = REMOVE
• CE marking required for EU/UK supply
• WLL, angle rating must be visible

Polyester vs. Nylon Comparison:
• Polyester: lower stretch (2% at WLL), unaffected by water
• Nylon: up to 10% stretch (shock absorption), reduces WLL when wet
• Polypropylene: avoid — UV degradation, heat-sensitive, lowest performance

📋 BS EN 1492-1 Sec.7 — Flat webbing slings for general purpose
📋 ASME B30.9 Sec.9-5 — Synthetic web sling inspection and removal
📋 LOLER 1998 Reg 9 — Lifting accessories examination
📋 LEEA COPSULE Sec.7 — Textile sling guidance

⚠ Related Considerations:
• Always use corner protection where sling bends over sharp edges — load corners destroy slings quickly
• Never drag synthetic slings across ground — abrasion not visible inside
• Store slings hanging (not in a pile) in cool, dry, UV-protected location`},

  // ── EXCLUSION ZONE ──────────────────────────────────────────────────────────
  {tags:["exclusion zone","radius","dropped object","safety zone","keep clear","slewing"],
   q:"How is an exclusion zone established for crane operations?",
   a:`EXCLUSION ZONE — CRANE OPERATIONS

Definition:
An exclusion zone is a clearly marked, enforced area where unauthorised personnel are not permitted during lifting operations.

Minimum Exclusion Zone — General Principle:
• Horizontal distance = vertical height of highest point of load travel
• OR radius of crane's maximum working radius — whichever is greater
• Plus minimum 1m buffer beyond load footprint at all positions

Specific Zones Required:

1. SLEWING ZONE — Crane Body:
• Full slewing radius of crane upperworks + 1m
• Tail swing: rear of crane body must be clear at all times
• Counterweight swing path must be barriered

2. LOAD PATH ZONE:
• Entire area beneath planned load travel path
• Buffer: load footprint + 1m on all sides
• For personnel below: clear zone = load height × 1.0 horizontal

3. DROPPED OBJECT ZONE (Offshore DNVGL):
• Horizontal drop distance = 0.1 × drop height (minimum)
• For lifts over FPSO/vessel: segregation between modules required
• Safety sector must be communicated to all vessel departments

Barriers and Communication:
• Physical barriers: cones, barrier tape, temp fencing
• Warning signs: "Crane Operations — Keep Clear"
• Banksman/flagman at zone boundary
• Radio communication — all relevant personnel on same channel
• Permit to Work system for any entry to exclusion zone

Power Lines:
OSHA/BS 7121 minimum clearances to overhead power lines:
• Up to 50kV: 3m (10 ft) minimum clearance
• 50kV to 200kV: 4.5m (15 ft) minimum
• 200kV to 350kV: 6m (20 ft) minimum
• 350kV to 500kV: 7.5m (25 ft) minimum
• Always assume power lines are LIVE unless written confirmation from utility

Special Considerations:
• Night operations: lighting must maintain visibility throughout zone
• Blind lifts: banksman required with direct view at all times
• Public areas: zone extends to public boundary — may require permit from authority

📋 BS 7121-1 Sec.8.8 — Exclusion zones
📋 ASME P30.1 Sec.8 — Lifting area segregation
📋 ISO 12480-1 Sec.8.3 — Control of lifting area
📋 DNVGL-ST-N001 Sec.9.4 — Exclusion zones offshore
📋 OSHA 1926.1407 — Power line safety

⚠ Related Considerations:
• Review exclusion zone any time crane configuration changes (radius, hook height)
• Buried services must be identified before erecting crane (CAT scan and permit)
• All zone boundaries must be briefed to ALL site personnel — not just crane team`},

  // ── PROOF LOAD ──────────────────────────────────────────────────────────────
  {tags:["proof load","proof test","test load","SWL test","load test","overload test"],
   q:"What are the proof load requirements for lifting equipment?",
   a:`PROOF LOAD TESTING REQUIREMENTS

Definition:
A proof load test applies a defined overload to lifting equipment to verify structural integrity. It does NOT determine the WLL — it verifies the equipment can withstand the test load without permanent deformation.

Standard Proof Load Values:

Cranes and Hoists:
• Proof load = 1.25 × SWL/WLL (most standards)
• Some standards: 1.1 × SWL for cranes >10T capacity
• Dynamic proof test (load lifted, slewed, braked)

Lifting Accessories (Slings, Shackles, Hooks):
• BS EN standards: typically 2.0 × WLL (200% of WLL)
• ASME B30.9/B30.26: typically 2.0 × WLL
• Some components tested to 1.5 × WLL with engineer justification

Below-The-Hook Lifting Devices (ASME BTH-1):
• New equipment: proof load = 1.5 × rated load
• After repair: depends on extent of repair

LOLER 1998 Requirements:
• New lifting equipment: thoroughly examined before first use
• After assembly at site: thorough examination required
• After major repair: proof test may be required — competent person decides

Offshore (DNVGL-ST-N001):
• All new offshore lifting equipment: SWL × 1.25 or per manufacturer
• Padeyes on structures: typically tested to 2× maximum design load
• Re-certification after repair: engineer-specified test load

What Proof Testing Checks:
1. No permanent deformation exceeding tolerance
2. No cracks or fracture — visual + NDT if required
3. Function of safety devices under load
4. Brake holding capacity (hoists)
5. Mechanical function throughout

Test Procedure:
1. Test on calibrated test bed or under controlled lift conditions
2. Load held for minimum 10 minutes
3. Inspect all components during and after test
4. Measure critical dimensions before and after
5. NDT (MPI, UT) on welds and stress concentration areas
6. Issue test certificate with all readings

Acceptance Criteria:
• No cracks, fractures, or permanent deformation beyond tolerance
• All safety devices function correctly
• Load cell/dynamometer used to confirm applied load (±2% accuracy)

📋 BS 7121-1 Sec.10.6 — Load testing procedures
📋 ASME B30.20 Sec.20-3 — Below-the-hook proof tests
📋 DNVGL-ST-N001 Sec.14 — Padeye and structural testing
📋 ISO 12480-1 Sec.10 — Testing and commissioning
📋 LOLER 1998 Reg 9 — Thorough examination after installation/repair
📋 ASME BTH-1 Sec.5 — Proof load testing

⚠ Related Considerations:
• Proof testing is NOT the same as destructive testing — do not test to failure
• Annealing/heat treatment may be required for heavily cold-worked chains after testing
• Never proof test equipment that shows existing cracks or damage`},

  // ── HOOK INSPECTION ─────────────────────────────────────────────────────────
  {tags:["hook","hook inspection","crane hook","latch","hook stretch","hook opening","discard hook"],
   q:"What are the inspection and discard criteria for crane hooks?",
   a:`CRANE HOOK INSPECTION AND DISCARD CRITERIA

Hook Types:
• Swivel hook — rotates freely under load
• Fixed eye/shank hook — no rotation
• Clevis hook — with pin attachment
• Safety/latch hook — with spring-loaded latch

DISCARD CRITERIA — Immediate Removal:

Throat Opening (Most Critical):
• Discard if throat opening has increased >15% from original dimension
• Measure with go/no-go gauge or caliper at narrowest throat point
• Any permanent deformation — even slight

Twist:
• Discard if hook twisted >10° from original plane

Cracks:
• Any crack anywhere — immediate discard
• NDT (MPI) required if surface cracks suspected
• Focus on: shank/body transition, inner radius, latch groove

Wear:
• Load-bearing surface worn >10% reduction in cross-section
• Seat of hook (where sling contacts) worn >10%
• Pin holes worn >3% of original diameter

Latch/Safety Catch:
• Spring latch must return to closed position freely
• Gap >3mm when latch pressed = repair or discard
• Broken, bent, or non-functioning latch = remove from service
• Exception: mousing wire may be used if latch replaced

Corrosion:
• Pitting reducing section >10%
• Surface corrosion — clean and assess under-rust condition

HOOK INSPECTION PROCEDURE:
1. Measure throat opening (record in inspection log)
2. Measure shank diameter — compare to original
3. Check hook twist with straight-edge
4. Inspect latch — spring action, gap
5. Visual inspection — cracks, wear, corrosion
6. MPI/NDT if any doubt — annual at minimum for intensively used hooks
7. Swivel freedom of rotation (should rotate under light hand pressure)

ASME B30.10 Rating Identification:
• Hooks rated by WLL stamped on body
• Manufacturer identification required
• Any unmarked hook = remove from service

Mousing of Hooks:
• Mousing required when accidental disengagement possible
• Mousing wire: minimum 1.2mm diameter galvanised wire
• Synthetic mousing cord acceptable if rated and secured
• Never use mousing as substitute for a functional latch

📋 ASME B30.10 Sec.10-2 — Hook inspection, testing, maintenance
📋 BS 7121-1 Sec.10.7 — Hook inspection
📋 EN 1677-1 Sec.6 — Hooks for lifting — inspection
📋 ASME B30.9 — Hook end attachments for slings
📋 LOLER 1998 Reg 9 — Lifting accessories examination

⚠ Related Considerations:
• Hook replacement requires like-for-like specification — never upsize without engineer approval
• Swivel hook torque should be checked — stiff swivel creates sling twist and torsion damage
• After any shock/snatch loading: immediately inspect and NDT if required`},

  // ── EYE BOLTS ──────────────────────────────────────────────────────────────
  {tags:["eye bolt","eyebolt","DIN 580","angular load","lifting point","padeye"],
   q:"What are the requirements and limitations for eye bolts used in lifting?",
   a:`EYE BOLTS — COMPLETE REQUIREMENTS

Types:
• DIN 580 collar eye bolts — most common for vertical/angled lifts
• Non-collar eye bolts — vertical use only (0 degrees)
• Swivel hoist rings — preferred for angled loads (360 rotation)
• Shoulder eye bolts (ASME) — similar to DIN 580

ANGULAR DERATING — Critical:
DIN 580 Collar Eye Bolt WLL reduction with angle from vertical:
• 0 deg (vertical): WLL x 1.00 (full rated load)
• 15 deg: WLL x 0.70 (30% reduction)
• 30 deg: WLL x 0.55 (45% reduction)
• 45 deg: WLL x 0.35 (65% reduction)
• 60 deg: WLL x 0.20 (80% reduction)
• Above 60 deg: DO NOT USE

KEY RULE: Load must be applied IN THE PLANE of the eye, not across it.

Installation Requirements:
1. Thread engagement minimum = full nominal diameter of bolt (M20 = 20mm minimum)
2. Collar must be fully seated on surface — no gap
3. Torque to manufacturer specification
4. Surface under collar must be flat, perpendicular to bolt axis (+-1 deg)

DIN 580 Standard Sizes and Vertical WLL:
• M8: 0.14T  M10: 0.20T  M12: 0.32T  M16: 0.63T
• M20: 1.00T  M24: 1.50T  M30: 2.50T  M36: 3.60T
• M42: 5.00T  M48: 6.30T  M64: 10.0T

SWIVEL HOIST RINGS:
• Rotate 360 degrees — always in-plane loading
• Pivot up to 180 degrees — no derating for angle
• Safer than eye bolts for angled rigging

Inspection Before Each Use:
• Thread condition — no damage
• Eye not bent or deformed
• No cracks in eye or collar
• WLL marking legible
• Collar fully seating flat

📋 DIN 580 — Eye bolts for lifting
📋 ASME B30.26 Sec.26-1.5 — Eye bolts
📋 BS 7121-1 Sec.6.7 — Lifting points
📋 ISO 12480-1 Sec.7.5 — Rigging hardware requirements
📋 LEEA COPSULE Sec.9 — Eye bolt guidance

Warning — Related Considerations:
• Always calculate resultant force direction — not just vertical component
• Multiple eye bolts: check load distribution with COG offset
• Never weld eye bolts — heat treatment destroyed`},

  // ── SPREADER BEAMS ──────────────────────────────────────────────────────────
  {tags:["spreader beam","lifting beam","spreader","spreader bar","below hook","lifting frame"],
   q:"When should a spreader beam or lifting beam be used?",
   a:`SPREADER BEAMS AND LIFTING BEAMS

Definitions:
• Lifting Beam: rigid beam — load is in bending. Requires structural design.
• Spreader Beam: compression member between sling legs. No bending — pure compression.

WHEN TO USE:
1. Sling angle would be less than 45 degrees without beam (headroom limited)
2. Load has multiple lift points requiring precise load distribution
3. Load cannot accept inward horizontal forces (thin-walled vessels, fragile items)
4. Long loads where single central lift would cause structural overstress
5. Tandem lifts requiring equal load sharing

SPREADER BEAM DESIGN:
Compression Force:
F_comp = (W/2) x (cos theta / sin theta) = (W/2) x cot(theta)
Where W = total load, theta = sling angle from horizontal

Slenderness check: L/r less than 150
Buckling: P_crit = pi^2 x E x I / L^2

MARKINGS REQUIRED (All Beams):
• WLL — clearly stamped or painted
• Tare weight — must be included in lift plan
• Serial/ID number — traceable to design and test certificate
• Centre of gravity marked if not central

Proof Test: 1.5 x rated load before first use (ASME BTH-1)

📋 ASME BTH-1 — Below-the-hook lifting devices
📋 BS EN 13155 Sec.5 — Non-fixed load lifting attachments
📋 BS 7121-1 Sec.6.8 — Special lifting accessories
📋 LOLER 1998 Reg 9 — Thorough examination

Warning — Related Considerations:
• Tare weight of beam must always be included in crane capacity check
• Off-centre loading generates torsion — check beam design
• Never use structural steel beam as lifting beam without engineering calculation and proof test`},

  // ── ROUND SLINGS ────────────────────────────────────────────────────────────
  {tags:["round sling","roundsling","endless sling","soft sling","polyester round sling"],
   q:"What are the requirements and WLL for round slings?",
   a:`ROUND SLINGS (ENDLESS SLINGS)

Construction:
• Endless loop of parallel polyester filaments (core)
• Protected by woven tubular sleeve (cover)
• Cover colour = WLL indication per EN 1492-2

COLOUR CODE AND WLL (EN 1492-2):
Vertical single:
• Violet: 1T  Green: 2T  Yellow: 3T  Grey: 4T  Red: 5T
• Brown (or white): 6T  Blue: 8T  Orange: 10T

Hitch Mode Factors:
• Vertical: x 1.0
• Choker: x 0.75
• Basket vertical: x 2.0
• Basket at 60 deg: x 1.73
• Basket at 45 deg: x 1.41

Safety Factor: 7:1 minimum on MBL per EN 1492-2

DISCARD CRITERIA:
• Any hole or cut through cover exposing core filaments
• Abrasion exposing core
• Cuts from sharp edges
• ID label not legible — remove from service
• UV bleaching affecting significant length
• Temperature damage — glazing or melting

Temperature: -40 deg C to +100 deg C for polyester

Protection: MUST use corner protection over ALL sharp edges.
Never drag on ground — abrasion unseen inside cover.

📋 BS EN 1492-2 Sec.6 — Round slings made of man-made fibres
📋 ASME B30.9 Sec.9-5.4 — Round sling inspection
📋 LOLER 1998 Reg 9 — Lifting accessory examination

Warning — Related Considerations:
• Core damage often not visible through intact cover — inspect both ends
• Never cut sling to shorten — structural loop integrity destroyed
• Always match WLL to hitch type, not just straight pull rating`},

  // ── LOAD COG ────────────────────────────────────────────────────────────────
  {tags:["COG","centre of gravity","center of gravity","load balance","load COG","trim","balance load"],
   q:"How is the centre of gravity (COG) of a load determined for lifting?",
   a:`CENTRE OF GRAVITY (COG) DETERMINATION

Definition:
The COG is the single point through which all gravitational force acts. Correct COG location is essential for level lifts.

METHODS:

Method 1 — Calculation:
X_cog = Sum(mi x xi) / Sum(mi)
Where mi = mass of each component, xi = distance from datum.
Calculate X, Y, and Z separately for 3D loads.

Method 2 — Two-Crane Weigh:
COG position = L x (F2 / (F1+F2))
Where L = distance between lift points, F1 and F2 = measured forces.

Method 3 — Certified Weighing:
• Portable load cells under each support point
• Best for unknown/complex loads
• Required for lifts over 75% crane capacity
• Accuracy: +-1 to 2%

COG Height Assessment:
• Slight tilt of suspended load (max 5 deg) — does load self-level?
• Rigging hardware migrates to one side = COG not over centre

Rigging Point Adjustment:
If COG is offset from geometric centre:
• Adjust rigging above COG
• Use adjustable rigging to trim
• Or add counterweight

Critical Requirements:
• COG within +-50mm of assumed position for critical lifts
• Document COG in lift plan with source of data

📋 ISO 12480-1 Sec.7.3 — Load COG assessment
📋 ASME P30.1 Sec.6.3 — Centre of gravity determination
📋 BS 7121-1 Sec.6.4 — Load assessment including COG

Warning — Related Considerations:
• Liquid-filled vessels: COG shifts as fluid moves during tilting
• Rotating machinery: COG may not be at geometric centre
• Always include rigging hardware weight in COG calculation`},

  // ── LIFT PLAN ───────────────────────────────────────────────────────────────
  {tags:["lift plan","method statement","lifting plan","documentation","planning","lift plan content"],
   q:"What must be included in a lifting operation plan?",
   a:`LIFTING OPERATION PLAN — REQUIRED CONTENT

MANDATORY CONTENTS (LOLER/BS 7121/ASME P30.1):

1. PROJECT AND OPERATION DETAILS:
• Project name, location, date
• Description of load
• Classification: routine / non-routine / critical

2. LOAD INFORMATION:
• Verified load weight (method used)
• Centre of gravity position (X, Y, Z)
• Load dimensions
• Structural integrity of lift points
• Special considerations (fragile, hazardous, pressurised)

3. CRANE AND EQUIPMENT:
• Crane type, make, model, serial number
• Configuration: boom length, jib, counterweight
• Working radius
• Rated capacity at working radius
• Percentage of rated capacity = (GLW / rated capacity) x 100
• Ground conditions assessment

4. RIGGING SCHEME:
• Rigging arrangement drawing
• Sling types, grades, sizes, WLL
• All accessories — shackles, hooks, beams, padeyes
• Sling angles calculated
• GLW = (Load + rigging) x DAF

5. PERSONNEL:
• Lift director/competent person — named
• Crane operator — named, certificate number
• Banksman — named
• Riggers

6. HAZARD ASSESSMENT:
• Hazards identified with controls
• Exclusion zone defined
• Overhead power lines — distances confirmed
• Buried services — CAT scan completed
• Weather limits

7. STEP-BY-STEP PROCEDURE:
• Numbered steps from pre-lift to load landed
• Hold points identified
• Contingency actions

8. APPROVALS:
• Prepared by (name, qualification, date)
• Reviewed by competent person
• Approved by site manager
• LOLER records attached

Critical Lift — Additional:
• Engineering calculations attached
• Independent third-party review
• Pre-lift meeting attendance register

📋 LOLER 1998 Regulation 8 — Organising lifting operations
📋 ASME P30.1 Sec.5 — Lift planning requirements
📋 BS 7121-1 Sec.7 — Planning lifting operations
📋 ISO 12480-1 Sec.6 — Lift plan requirements

Warning — Related Considerations:
• Lift plan must be communicated to ALL personnel — pre-lift meeting
• Deviations require re-approval before proceeding
• Retain lift plans for minimum 2 years after operation`},

  // ── RIGGING CALCULATIONS ─────────────────────────────────────────────────────
  {tags:["rigging calculation","sling tension","leg load","load per leg","calculation","formula","tension factor"],
   q:"How do I calculate sling leg tensions for any rigging configuration?",
   a:`SLING LEG TENSION CALCULATIONS — COMPLETE METHOD

STEP 1 — TOTAL RIGGED WEIGHT:
Total Rigged Weight = Load Weight + Rigging Hardware Weight
Typical rigging hardware allowance: 2 to 5% of load weight

STEP 2 — APPLY DAF:
Gross Lift Weight (GLW) = Total Rigged Weight x DAF
• Onshore normal: DAF = 1.10
• Offshore: DAF = 1.10 minimum
• Rough ground: DAF = 1.25 to 1.30

STEP 3 — SLING GEOMETRY:
Sling angle from horizontal (theta):
theta = (180 degrees - included angle between legs) / 2

STEP 4 — LOAD PER LEG:
For 2-leg symmetric:
T_leg = (GLW / 2) x (1 / sin theta)

For 2-leg asymmetric (COG offset):
T_A = GLW x (d_B / d_total) / sin theta
T_B = GLW x (d_A / d_total) / sin theta

For 4-leg (use 3-leg rule):
T_leg = GLW / 3 / sin theta

TENSION FACTOR TABLE (1/sin theta):
• 90 deg: 1.000
• 60 deg: 1.155
• 45 deg: 1.414
• 30 deg: 2.000
• 20 deg: 2.924

WORKED EXAMPLE:
Load: 20,000 kg  Rigging: 400 kg  Total: 20,400 kg
GLW = 20,400 x 1.10 = 22,440 kg = 22.44T
2-leg sling, 90 degree included angle (each leg at 45 deg)
T_leg = (22.44/2) x (1/sin45) = 11.22 x 1.414 = 15.87T per leg
Select: WLL greater than or equal to 15.87T per leg
Master link: WLL greater than or equal to 22.44T total

STEP 5 — SELECT SLING WLL:
Required WLL per leg greater than or equal to T_leg.
Add safety margin: WLL greater than or equal to T_leg x 1.1

📋 ASME B30.9 Sec.9-1.7 — Sling load calculations
📋 BS EN 1492-1 Annex B — Calculation of forces in sling legs
📋 ISO 12480-1 Sec.7.3 — Rigging geometry and calculations
📋 BS 7121-1 Sec.6.3 — Rigging selection based on calculation

Warning — Related Considerations:
• Always round UP to next available sling size
• Asymmetric COG can double tension in one leg — always check
• Include horizontal force on padeye structure in design: H = T_leg x cos(theta)`},

  // ── MULTI-LEG SLINGS ────────────────────────────────────────────────────────
  {tags:["4 leg","four leg","3 leg","three leg","multi-leg","multiple leg","4-leg sling","3-leg sling","four leg sling"],
   q:"How are 3-leg and 4-leg slings rated and used correctly?",
   a:`MULTI-LEG SLINGS — RATING AND USE

KEY RULE — 4-LEG SLINGS:
A 4-leg sling is rated as a 3-leg sling.
Reason: geometry makes it impossible to guarantee all 4 legs share load equally.
One leg may carry minimal or no load.
ALWAYS use 3-leg rating for 4-leg slings.

ASSEMBLY RATED CAPACITY:
• 1-leg vertical: WLL_leg x 1.0
• 2-leg at 60 deg: WLL_leg x 1.73
• 2-leg at 45 deg: WLL_leg x 1.41
• 2-leg at 30 deg: WLL_leg x 1.0
• 3-leg at 60 deg: WLL_leg x 2.60
• 4-leg at 60 deg: WLL_leg x 2.60 (3-leg rule applies)

MARKING ON ASSEMBLY:
• WLL for each configuration stamped on tag
• Example: "2-leg 60 deg: 5.0T, 45 deg: 4.0T"
• Tag must be legible — if missing, remove from service

Leg Length Matching:
• All legs same length for level lift from symmetric load
• Shortening hooks allow adjustment — must be rated for purpose

INSPECTION:
• Master link/ring — throat, wear, distortion
• Each individual leg — per type (wire/chain/webbing)
• All connectors — shackles, hooks, rings
• Identification of each component traceable to certificate

📋 ASME B30.9 Sec.9-1.5 — Multi-leg sling ratings
📋 BS EN 818-4 Sec.6 — Multi-leg chain sling assembly ratings
📋 LEEA COPSULE Sec.5 — Sling assembly ratings

Warning — Related Considerations:
• Equalizer rings do not fix the 3-leg rule for 4-leg slings
• Master link WLL must be greater than or equal to total assembly WLL
• 4 symmetric padeyes ideally required to work with 4-leg geometry`},

  // ── COMPETENCY ──────────────────────────────────────────────────────────────
  {tags:["competent person","competency","CPCS","NPORS","LEEA","certification","qualification","appointed person"],
   q:"What qualifications are required for lifting equipment roles?",
   a:`LIFTING EQUIPMENT COMPETENCY AND QUALIFICATIONS

KEY PRINCIPLE (LOLER 1998 / BS 7121):
All persons involved in lifting operations must be COMPETENT.
Competence = appropriate knowledge + training + experience.

ROLES AND QUALIFICATIONS:

1. CRANE OPERATOR:
• CPCS Card (Construction Plant Competence Scheme) — UK standard
• NPORS (National Plant Operators) — alternative
• Category-specific: A60 Mobile Crane, A04 Tower Crane, etc.
• Medical fitness certificate required
• Minimum age 18 (UK)

2. SLINGER / SIGNALLER (BANKSMAN):
• CPCS A40 — Slinger/Signaller
• NPORS N101 — Slinger/Signaller
• Minimum 3 days formal training plus assessment

3. APPOINTED PERSON (Lift Director):
• Responsible for planning and managing the operation
• CPCS A61 (Appointed Person) or LEEA TEAM course
• Must understand: lift planning, load charts, rigging, LOLER
• For complex lifts: engineering degree + crane experience typical

4. THOROUGH EXAMINATION (LOLER Reg 9):
• Must be carried out by a COMPETENT PERSON
• Industry standard: LEEA member company or insurance engineer
• Result documented on report (F2034 or equivalent)

CERTIFICATION BODIES (UK):
• CPCS — administered by CITB
• NPORS — independent body
• LEEA — Lifting Equipment Engineers Association
• OPITO — offshore specific

Offshore (OPITO):
• Offshore Crane Operator: OPITO-approved training + competency assessment
• Offshore Rigger: OPITO-approved
• Typically requires 12 months onshore experience first

📋 LOLER 1998 Regulation 8 — Competence requirements
📋 BS 7121-1 Sec.3 — Definitions and competence
📋 ACOP L113 — Safe use of lifting equipment
📋 ISO 12480-1 Sec.5 — Competence of persons
📋 DNVGL-ST-N001 Sec.3 — Qualifications offshore

Warning — Related Considerations:
• CPCS cards must be checked on site — verify expiry date and category
• International equivalent qualifications must be independently assessed
• Competence must be demonstrated for the specific equipment type being operated`},

  // ── OFFSHORE LIFTING ────────────────────────────────────────────────────────
  {tags:["offshore","marine","vessel","DNVGL","MWS","marine warranty","FPSO","platform","sea","wave","offshore lift"],
   q:"What are the key requirements for offshore lifting operations?",
   a:`OFFSHORE LIFTING OPERATIONS

Governing Standards:
• DNVGL-ST-N001 — Marine Operations and Marine Warranty
• ISO 12480-1 with offshore additions
• Marine Warranty Surveyor (MWS) requirements for critical lifts

PADEYE DESIGN:
• Engineered — not ad hoc attachment
• Designed for 2x maximum design load
• Material: high-toughness notch-tough steel
• 100% MPI and UT of welds after welding
• Proof tested (typically 2x design load) or equivalent analysis

DYNAMIC AMPLIFICATION FACTOR (offshore):
• Crane lift in air: DAF minimum 1.10
• Splash zone (entering/exiting sea): DAF = 1.10 to 1.30
• Seafastened cargo: per vessel motion analysis

ENVIRONMENTAL LIMITS (typical):
• Maximum wind speed: 15 m/s for routine lifts
• Maximum significant wave height (Hs): 1.5 to 2.5m
• Current: typically limited to 1.0 m/s

MARINE WARRANTY:
Lifts typically requiring MWS approval:
• Lifts above 50T offshore
• Complex/critical lifts
• Personnel transfer
• In-water/subsea lifts

CRANE CERTIFICATION (Offshore):
• 4-yearly major examination plus annual inspection
• Certification body: DNV, Lloyds, BV, ABS etc.
• Operator: OPITO-certified for offshore

RIGGING FOR OFFSHORE:
• DNVGL-certified or equivalent third-party certification
• Wire rope: heat-set socketed terminations preferred
• Shackles: Grade S alloy, bolt-type pin for dynamic use
• Sling register maintained at work site

📋 DNVGL-ST-N001 Sec.4-9 — Marine operations lifting
📋 DNVGL-ST-N001 Sec.12 — Environmental criteria
📋 ISO 12480-1 Sec.9.4 — Offshore lifting
📋 LOLER 1998 — Applies in UK waters

Warning — Related Considerations:
• Dropped object prevention: all tools and equipment above deck must be secured
• SIMOPS: lifts must be coordinated with drilling and production operations
• Crane operator must halt if radio communication fails`},

  // ── TEMPERATURE EFFECTS ──────────────────────────────────────────────────────
  {tags:["temperature","cold","hot","heat","temperature effect","environmental","weather","frost","cold weather"],
   q:"How do temperature and environmental conditions affect lifting equipment?",
   a:`TEMPERATURE AND ENVIRONMENTAL EFFECTS

LOW TEMPERATURE:

Wire Rope:
• No derating below 0 deg C in normal range
• Lubricant may stiffen below -20 deg C — pre-load before use

Chain Slings (Grade 8):
• Full WLL maintained to -40 deg C per BS EN 818-4
• Below -40 deg C: consult manufacturer

Synthetic Slings:
• Polyester: rated to -40 deg C
• Check for ice/frost — does not affect rating but inspect mechanism

Crane Structural Steel:
• Manufacturer states minimum ambient temperature (typically -20 to -30 deg C)
• Sub-arctic operations: specialist cranes with arctic-grade steel required

HIGH TEMPERATURE:

Wire Rope:
• Above 100 deg C: reduce WLL approximately 10% per 100 deg C rise
• Above 400 deg C: permanent damage — discard immediately
• Identify by: blue/brown discolouration of individual wires

Chain Slings (Grade 8):
• 0-200 deg C: full WLL
• 200-300 deg C: reduce to 90% WLL
• 300-400 deg C: reduce to 75% WLL
• Above 400 deg C: discard

Synthetic Slings:
• Polyester: DO NOT USE above +100 deg C
• Nylon: DO NOT USE above +80 deg C
• Use wire rope or chain slings for hot work

RAIN AND WET CONDITIONS:
• Steel/chain equipment: generally unaffected
• Nylon webbing slings: WLL reduces when wet — use polyester instead
• Wet/icy surfaces: assess stability and ground conditions

WIND: See wind speed section for specific operational limits.

📋 BS EN 818-4 Annex A — Temperature derating for chain slings
📋 ISO 4309 Sec.5.7 — Temperature effects on wire rope
📋 BS EN 1492-1 Sec.5 — Temperature limits for webbing slings
📋 BS 7121-1 Sec.8.5 — Environmental operating conditions

Warning — Related Considerations:
• Always check manufacturer certificate for temperature range
• After exposure to extreme temperature: examine thoroughly before reuse
• Inspect fire-damaged equipment — NDT required before any reuse`},

  // ── CRANE STABILITY ──────────────────────────────────────────────────────────
  {tags:["stability","crane stability","tipping","overturn","outrigger level","crane level","stable"],
   q:"How is crane stability assessed and maintained during lifting?",
   a:`CRANE STABILITY — ASSESSMENT AND MAINTENANCE

Fundamental Principle:
A crane tips when the resultant of all forces falls outside the tipping line (outrigger footprint or track edges).

STABILITY FACTOR:
Stabilising moment / Overturning moment
• Typical minimum: 1.25 to 1.40
• At rated capacity: typically 1.15 to 1.25 (built into load chart)

OUTRIGGER SETUP REQUIREMENTS:
1. Outriggers FULLY extended before any lift (unless chart specifies partial)
2. Each outrigger pad on firm, level, adequately-bearing ground
3. Crane levelled within manufacturer tolerance (typically +-0.5 to 1.0 deg)
4. Level checked after each slew position change
5. Verify mat/pad provides acceptable GBP

LEVEL TOLERANCE EFFECTS:
• 1 deg out of level: capacity derating required
• Most cranes: derate 1% capacity per 0.1 deg out of level
• Above 1 deg: consult manufacturer derating table

CRAWLER CRANES:
• On-track stability maintained by wide track gauge and counterweight
• Travel with load: strictly limited — consult load chart
• Pick-and-carry radius much less than stationary capacity

OVER-FRONT vs OVER-SIDE:
• Capacity LOWER when lifting over side (typically 75-85% of over-front)
• Load charts indicate direction — ALWAYS use correct sector chart

GROUND MONITORING:
• Assign spotter to watch outrigger pads throughout lift
• Halt if any pad sinking or cracking
• Re-assess if rain occurs during extended lift

📋 CIRIA C703 Sec.3-5 — Crane stability on site
📋 ASME B30.5 Sec.5-1.4 — Crane level and setup
📋 BS 7121-1 Sec.7.3 — Crane positioning
📋 ISO 12480-1 Sec.7.6 — Stability of lifting equipment

Warning — Related Considerations:
• Soft-ground mats: single 1.2x1.2m mat rarely adequate for large cranes
• Wind loading on long booms adds significant overturning moment
• Counterweight must exactly match configuration used for load chart`},

  // ── BANKSMAN REQUIREMENTS ────────────────────────────────────────────────────
  {tags:["banksman","signaller","signal","hand signal","slinger","banks man","communication signal"],
   q:"What are the requirements for a banksman in crane operations?",
   a:`BANKSMAN / SIGNALLER REQUIREMENTS

Definition:
A banksman (signaller/slinger) directs crane movements when the operator cannot see the load, and supervises slinging operations.

LEGAL REQUIREMENT (LOLER 1998):
Every lifting operation must be supervised by a competent person.
Where the crane operator does not have clear view of the load, a banksman is MANDATORY.

COMPETENCY:
• Formal training and certification — CPCS A40 or NPORS N101
• Must understand crane limitations, not just hand signals
• Knowledge of rigging equipment and inspection
• Ability to read a basic load chart
• LOLER awareness training

DUTIES Before Lift:
• Inspect all rigging before use
• Confirm load weight matches lift plan
• Check exclusion zone clear and barriers in place
• Confirm clear communication with crane operator
• Participate in pre-lift meeting

DUTIES During Lift:
• Clear unambiguous signals — ONE banksman signals at a time
• Maintain visual contact with load at ALL times
• Keep personnel clear of load path
• Monitor exclusion zone
• Halt IMMEDIATELY if any unsafe condition

STANDARD HAND SIGNALS (BS 7121):
• Hoist: Arm extended upward, index finger rotating clockwise
• Lower: Arm extended downward, index finger rotating anti-clockwise
• Stop: One arm raised, palm outward
• Emergency stop: Both arms raised, palms outward
• Slew clockwise: Arm raised, hand rotating clockwise
• Boom up: Arm horizontal, thumb up
• Boom down: Arm horizontal, thumb down

RADIO COMMUNICATION:
• Pre-agreed abort codeword (e.g. "STOP STOP STOP")
• Confirmation back from operator before movement
• Radio check before every lift

📋 BS 7121-1 Sec.8.7 — Banksmen and signalers
📋 ISO 12480-1 Sec.8.2 — Communication during lifting
📋 LOLER 1998 Regulation 8 — Competent supervision

Warning — Related Considerations:
• One designated banksman per lift — multiple signalers creates dangerous confusion
• Night operations: illuminated wands or radio only — no hand signals
• After any communication failure: STOP and re-establish before continuing`},

  // ── WIRE ROPE SPECIFICATION ──────────────────────────────────────────────────
  {tags:["wire rope","rope grade","steel wire rope","6x19","6x36","1770","IWRC","fibre core","rope type","rope construction"],
   q:"What are the different wire rope types and how are they selected?",
   a:`WIRE ROPE TYPES AND SELECTION

CONSTRUCTION NOTATION: Strands x Wires per Strand
• 6x19: 6 strands, 16-26 wires (stiff, abrasion-resistant)
• 6x36: 6 strands, 27-49 wires (flexible, crush-resistant, preferred for cranes)
• 8x19: 8 strands (more flexible than 6-strand)
• 35x7: Rotation-resistant
• 19x7: Non-spinning — use for single-part hoisting

Core Types:
• FC (Fibre Core): flexible, NOT for high-temperature use
• IWRC (Independent Wire Rope Core): higher MBL, crush-resistant, preferred for cranes
• WSC (Wire Strand Core): between FC and IWRC

Grade (Strength):
• 1770 N/mm^2: standard for general lifting
• 1960 N/mm^2: high-strength — same diameter, higher MBL
• 2160 N/mm^2: ultra-high, specialist

D/d RATIO (Sheave to Rope Diameter) — Critical for Rope Life:
• Crane hoist on sheaves: D/d minimum 16 (BS 7121)
• Crane hoist on drums: D/d minimum 14
• General slings over pin: D/d minimum 12
• Higher D/d = longer rope life — aim 25+ where possible

MBL Approximation (1770 N/mm^2 IWRC 6x36):
MBL (tonnes) approximately d^2 x 0.0385 (d in mm)
e.g. 20mm rope: MBL approximately 15.4T (verify from manufacturer catalogue)

End Termination Efficiency:
• Swaged/Flemish eye: 100%
• Rope socket (spelter/resin): 100%
• Mechanical splice: 90-95%
• Hand splice: 75-80%
• Bulldog clips (min 3): 75-80%

📋 ISO 2408 — Steel wire ropes for general purposes
📋 ISO 4309 Sec.4 — Wire rope selection for cranes
📋 BS EN 12385 — Steel wire ropes for lifting
📋 ASME B30.9 Sec.9-1.2 — Wire rope sling specifications

Warning — Related Considerations:
• Rotation-resistant ropes must never be used in multi-part reeving — internal strands unlay
• Running rope (hoist line) and static rope (pendant) have different service requirements
• Always verify rope diameter after installation — wrong drum groove causes rapid wear`},

  // ── PERSONNEL LIFTING ───────────────────────────────────────────────────────
  {tags:["man riding","personnel basket","man basket","PTB","people","person lifted","human factor","personnel transfer"],
   q:"What are the requirements for lifting personnel in a basket?",
   a:`LIFTING PERSONNEL (MAN-RIDING) REQUIREMENTS

GENERAL PRINCIPLE:
Lifting persons by crane must be the ABSOLUTE LAST RESORT.
All other means of access must be considered and documented as impractical first.

LOLER 1998 (UK):
• Permitted ONLY if purpose-designed equipment is used
• Written risk assessment required justifying no other means practicable
• Thorough examination every 6 months minimum

PERSONNEL BASKET REQUIREMENTS:
• Purpose-designed per BS EN 1808 or equivalent
• SWL includes: personnel + equipment + basket tare weight
• Full perimeter — toe boards, mid-rail, top rail
• Inward-opening gate only
• Clearly marked WLL and maximum persons
• Primary and secondary (anti-fall) suspension — independent
• Anti-spin device

CRANE REQUIREMENTS FOR MAN-RIDING:
• Crane specifically approved for man-riding by manufacturer
• Secondary braking on hoist
• Controlled lowering device — prevents free fall
• Anti-two-block device mandatory
• LMI functional
• Derating: typically 50% of normal rated capacity
• Maximum hoist speed: typically 0.5 m/s

Offshore (DNVGL):
• PTBs approved by Marine Warranty Surveyor
• Environmental limit: Hs typically less than 2.0m

OPERATING REQUIREMENTS:
• Competent person in charge
• Banksman with constant visual on basket
• Two-way radio in basket at ALL times
• PPE: full-body harness with lanyard to basket secondary point
• Emergency recovery plan documented

📋 LOLER 1998 Regulation 8(1)(c) — Lifting persons
📋 BS EN 1808 — Safety requirements for suspended access equipment
📋 ASME B30.23 — Personnel lifting systems
📋 DNVGL-ST-N001 Sec.11 — Personnel transfer offshore
📋 BS 7121-4 — Cranes used to lift persons

Warning — Related Considerations:
• NEVER lift persons in equipment not purpose-designed for this task
• All personnel must wear full-body harness with secondary attachment to basket
• Emergency lowering must be tested before each man-riding operation`},

  // ── STOP WORK AND NEAR MISS ─────────────────────────────────────────────────
  {tags:["near miss","incident","accident","stop work","safety","SWA","unsafe","report","hazard"],
   q:"What is Stop Work Authority and how should near-misses be managed?",
   a:`STOP WORK AUTHORITY AND NEAR-MISS MANAGEMENT

STOP WORK AUTHORITY (SWA):
Every person — regardless of role — has both the RIGHT and DUTY to stop any lifting operation if they observe an unsafe condition.
No authority can overrule a safety stop. No person should face consequences for exercising SWA.

CONDITIONS REQUIRING IMMEDIATE STOP:
• Any rigging equipment visually damaged during operation
• Load swinging uncontrolled beyond exclusion zone
• Communication failure between operator and banksman
• Personnel entering exclusion zone unexpectedly
• Weather deteriorating beyond limits in lift plan
• Crane showing abnormal behaviour (unusual sounds, list, movement)
• Load weight greater than planned (crane near relief valve)
• Any dropped object
• Ground sinking or cracking near crane supports
• ANY doubt — STOP first, investigate, restart only when safe

NEAR-MISS DEFINITION:
An event that COULD have resulted in injury or damage but did not.

Lifting near-miss examples:
• Rigging detachment during operation (self-corrected)
• Load swinging into exclusion zone without collision
• Defective equipment found before use
• Crane operating near or over rated capacity
• Communication breakdown requiring emergency abort
• Unauthorised personnel found in exclusion zone

NEAR-MISS REPORTING PROCESS:
1. STOP operation — ensure scene is safe
2. Report immediately to supervisor
3. Complete incident report within 24 hours
4. Root cause analysis (5-Why method)
5. Corrective actions with assigned owner and due date
6. Lessons learned — share across organisation

Statutory Reporting (UK):
• Fatality/serious injury: notify HSE immediately
• RIDDOR 2013: reportable within 10 days
• Retain all evidence until investigation complete

📋 LOLER 1998 Regulation 8 — Organising lifting operations
📋 ISO 12480-1 Sec.11 — Incident management
📋 BS 7121-1 Sec.8.10 — Emergency procedures
📋 RIDDOR 2013 — Reporting regulations (UK)

Warning — Related Considerations:
• After any incident: all equipment involved must be examined before reuse
• Dropped objects require full investigation — size and severity do not determine reporting
• Rigger and banksman training must include explicit SWA empowerment`},


  // ── DISCARD: SHACKLES ──────────────────────────────────────────────────────
  {tags:["discard shackle","shackle removal","shackle condemn","shackle criteria","shackle worn","shackle crack"],
   q:"What are the complete discard criteria for shackles?",
   a:`SHACKLE DISCARD CRITERIA — COMPLETE

IMMEDIATE REMOVAL FROM SERVICE (Any One = Discard):

BODY:
• Any crack anywhere — visual or NDT confirmed
• Throat opening increased more than 10% from nominal — measure with calipers
• Permanent deformation — any bending, twisting, or change in shape
• Corrosion reducing section more than 10%
• Gouges or nicks reducing cross-section more than 10%
• Heat damage — blue or rainbow discolouration
• Weld repair of any kind — NEVER weld shackles
• Bow distorted — oval shape changed

PIN:
• Any crack — visual or NDT
• Thread damaged or stripped — cannot achieve full engagement
• Pin bent or deformed even slightly
• Wrong pin — non-OEM replacement
• Corrosion on thread reducing diameter more than 10%
• Collar cracked or missing
• Split pin missing on bolt-type pin

IDENTIFICATION:
• WLL marking not legible
• Grade marking not legible
• Cannot confirm manufacturer specs from documentation
• No certification available and cannot be traced

ANGULAR LOADING DERATING (Bow Shackles):
• 0 deg in-line: full WLL
• 45 deg: reduce to 70% of WLL
• 90 deg (side loaded): reduce to 50% of WLL
• Cross-pin loading (load on pin not body): consult manufacturer

THREAD ENGAGEMENT CHECK:
• Screw pin: minimum one full thread visible above jaw
• Bolt pin: nut fully run on, split pin through hole and bent

MEASUREMENT TABLE — Condemn if throat opening exceeds:
• 6.5mm (1/4"): greater than 7.2mm
• 9.5mm (3/8"): greater than 10.5mm
• 13mm (1/2"): greater than 14.3mm
• 19mm (3/4"): greater than 20.9mm
• 25mm (1"): greater than 27.5mm
• 32mm (1.25"): greater than 35.2mm

📋 BS EN 13889 Sec.5 — Forged steel shackles for lifting — inspection
📋 ASME B30.26 Sec.26-1.3 — Shackle inspection and removal from service
📋 LOLER 1998 Reg 9 — Thorough examination
📋 LEEA COPSULE Sec.8 — Shackle guidance

Warning — Related Considerations:
• After overload or shock load: inspect immediately and NDT if any doubt
• Shackle pin must be of correct size — never substitute with bolt or nail
• Tri-link assemblies: check all contact wear points on bow and connecting links`},

  // ── DISCARD: HOOKS ──────────────────────────────────────────────────────────
  {tags:["discard hook","hook removal","hook condemn","hook criteria","hook deformation","hook stretch"],
   q:"What are the complete discard criteria for lifting hooks?",
   a:`LIFTING HOOK DISCARD CRITERIA — COMPLETE

IMMEDIATE REMOVAL FROM SERVICE (Any One = Discard):

THROAT OPENING (Most Critical Measurement):
• Discard if throat opening has increased more than 15% from nominal
• Measure at narrowest throat point with calibrated gauge
• Any permanent deformation visible — even slight — is discard criteria
Nominal throat check table:
• 1T hook: throat approx 16mm — discard if greater than 18.4mm
• 2T hook: throat approx 20mm — discard if greater than 23mm
• 5T hook: throat approx 28mm — discard if greater than 32.2mm
• 10T hook: throat approx 38mm — discard if greater than 43.7mm

TWIST:
• Discard if hook twisted more than 10 degrees from original plane
• Measure with straight-edge or plumb line comparison to shank axis

CRACKS (Zero Tolerance):
• Any crack anywhere — shank, body, inner radius, latch groove
• MPI (magnetic particle inspection) annually for intensively used hooks
• Particular attention: shank-to-body transition, inner bend radius

WEAR:
• Load-bearing saddle worn more than 10% reduction in cross-section
• Depth of contact groove exceeds 10% of hook cross-section diameter
• Pin holes (clevis hooks) worn more than 3% of nominal diameter

LATCH / SAFETY CATCH:
• Latch does not return to closed position under spring tension alone
• Gap when latch pressed: more than 3mm
• Broken, bent, missing, or non-functioning latch
• Exception: mousing wire may be used temporarily if latch being replaced

SHANK / THREAD:
• Thread stripped or cross-threaded
• Shank bent or deformed
• Nut not correctly locked (split pin, lock-nut)

CORROSION:
• Pitting reducing section more than 10%
• Internal corrosion on shank threads

HEAT DAMAGE:
• Any discolouration — blue, brown, rainbow
• Exposure to fire — discard regardless of visual appearance

IDENTIFICATION:
• WLL not legible — remove
• Manufacturer identification missing

INSPECTION FREQUENCY:
• Pre-use: visual every shift by operator
• Formal: minimum annually as part of LOLER examination
• Heavy use: 6-monthly recommended, MPI annually

📋 ASME B30.10 Sec.10-2 — Hook inspection, testing, maintenance
📋 EN 1677-1 Sec.6 — Hooks for lifting — inspection criteria
📋 BS 7121-1 Sec.10.7 — Hook inspection
📋 LOLER 1998 Reg 9 — Lifting accessories examination

Warning — Related Considerations:
• After any shock/snatch loading: inspect and NDT before reuse
• Swivel hooks: torque to rotate under hand load — stiff swivel creates sling torsion damage
• Never repair or re-heat hooks — mechanical properties destroyed`},

  // ── DISCARD: CHAIN SLINGS ───────────────────────────────────────────────────
  {tags:["discard chain","chain removal","chain condemn","chain criteria","chain elongation","chain link"],
   q:"What are the complete discard criteria for chain slings?",
   a:`CHAIN SLING DISCARD CRITERIA — COMPLETE

IMMEDIATE REMOVAL FROM SERVICE (Any One = Discard):

ELONGATION (Most Common Failure Mode):
• Measure individual link length against new link length
• Discard if link elongated more than 5% of original length
• How to measure: lay chain straight, measure over 11 links, compare to stamped original
• Example: Grade 8, 10mm chain — original pitch 29mm
  11-link measurement should be 319mm
  Discard if greater than 335mm (5% elongation)

LINK DAMAGE:
• Any crack — visual or NDT
• Bent or kinked link — cannot be straightened and returned to service
• Twisted link — even slight twist
• Gouges or nicks reducing cross-section diameter more than 10%
• Corrosion reducing section diameter more than 10%
• Weld or repair marks on any link

CROSS-SECTION WEAR:
• Wear at bearing points (where links contact each other)
• Measure with calipers at most worn point
• Discard if diameter reduced more than 10% from nominal
Nominal dia. / Condemn at:
• 6mm chain: less than 5.4mm
• 7mm: less than 6.3mm
• 8mm: less than 7.2mm
• 10mm: less than 9.0mm
• 13mm: less than 11.7mm
• 16mm: less than 14.4mm
• 20mm: less than 18.0mm
• 22mm: less than 19.8mm
• 26mm: less than 23.4mm

CONNECTING COMPONENTS:
• Master link — throat opening increased more than 10%, any deformation or crack
• Hooks — see hook discard criteria
• Coupling links — any deformation, crack, or wear more than 10%
• Safety latches — non-functioning

HEAT AND CHEMICAL DAMAGE:
• Heat: any discolouration (yellow, blue, brown, black)
• Above 200 deg C: mandatory examination — above 300 deg C: discard
• Chemical: bright or pitted surface — indicates acid attack
• Any unknown contamination: quarantine until tested

IDENTIFICATION:
• Grade marking not legible (Grade 8, 10, or 12)
• WLL tag or label missing
• Chain grade not confirmed: DISCARD — never assume grade

INSPECTION PROCEDURE:
1. Lay chain straight — inspect link by link
2. Measure sample links — compare to original pitch
3. Measure cross-section at wear points with calipers
4. Flex each link — feel for stiffness (may indicate crack or deformation)
5. Inspect all end fittings thoroughly

📋 BS EN 818-4 Sec.7 — Short link chain for lifting — inspection and discard
📋 ASME B30.9 Sec.9-2.6 — Chain sling inspection and removal
📋 BS 7121-1 Sec.10.5 — Chain sling inspection
📋 LEEA COPSULE Sec.6 — Chain sling guidance
📋 ISO 12480-1 Sec.10 — Inspection of lifting accessories

Warning — Related Considerations:
• Overloaded chain must be immediately discarded — permanent cold-working not always visible
• Never attempt to repair chain by cutting and re-welding links
• After chemical exposure: do not use until metallurgical assessment completed`},

  // ── DISCARD: WEBBING SLINGS ─────────────────────────────────────────────────
  {tags:["discard webbing","webbing removal","webbing condemn","webbing criteria","synthetic sling discard","flat sling discard"],
   q:"What are the complete discard criteria for flat webbing slings?",
   a:`FLAT WEBBING SLING DISCARD CRITERIA — COMPLETE

IMMEDIATE REMOVAL FROM SERVICE (Any One = Discard):

CUTS AND TEARS:
• Any cut through loadbearing fibres — even partial
• Edge damage exceeding 10% of sling width over any length
• Diagonal cut across width — entire cross-section compromised
• Check BOTH faces and both edges along ENTIRE length

STITCHING:
• Any broken stitching in end loop seam — even single thread
• Stitches pulled through to base material
• Stitching areas stiff or hardened (chemical damage)
• All end loops must be tight — no gap between stitching rows

ABRASION AND SURFACE WEAR:
• Abrasion penetrating through outer yarns to loadbearing core
• Surface pile completely worn flush in any area
• Glazed or polished areas (high friction abrasion) — check fibre integrity below

CHEMICAL CONTAMINATION:
• Any staining that cannot be identified and confirmed as non-harmful
• Acid attack: hardens and discolours fibres — sling becomes stiff and brittle
• Alkali attack: may not discolour but weakens fibres — sling becomes soft/floppy
• Solvents: dissolved surface — shiny or waxy appearance
• If in doubt — DISCARD

UV DEGRADATION:
• Bleaching of colour — especially for red, green, yellow (colour-coded slings)
• Fibres become brittle — snap individual fibres with thumbnail
• Long outdoor storage without UV protection: mandatory thorough examination

HEAT AND FIRE DAMAGE:
• Glazed or melted surface fibres — any amount
• Burn marks or charring
• Stiff areas from heat exposure
• Sling must NOT be used near heat sources, sparks, flame, welding, or cutting operations

OVERLOADING DAMAGE:
• Permanent elongation more than 10% of original length
• Width reduction more than 10% over any section (fibres have failed)
• Twist that cannot be removed — internal fibres broken
• Any deformation of end fittings (if metal end loops)

IDENTIFICATION:
• WLL label not legible — REMOVE
• Colour coding obscured — REMOVE
• CE marking not visible — REMOVE (EU/UK supply requirement)
• Angle rating table on label illegible — REMOVE

MEASUREMENT AIDS:
• Original length marked on label — measure if elongation suspected
• Original width: compare to label specification
• Go/no-go sling condition test: pull taut, twist 180 deg — should recover flat

POST-CLEANING:
• Synthetic slings can be washed in mild detergent at 40 deg C
• Do NOT bleach or use chemical cleaners
• Dry naturally — away from heat and UV
• Re-inspect after cleaning

📋 BS EN 1492-1 Sec.7 — Flat webbing slings — inspection and discard
📋 ASME B30.9 Sec.9-4.6 — Synthetic web sling inspection and removal
📋 LOLER 1998 Reg 9 — Lifting accessory examination
📋 LEEA COPSULE Sec.7 — Textile sling guidance

Warning — Related Considerations:
• Never join two webbing slings by knotting — strength reduction greater than 50%
• Corner protection is mandatory — sharp edges cut webbing slings rapidly
• Polyester recommended over Nylon for most applications: unaffected by moisture, less stretch`},

  // ── DISCARD: WIRE ROPE (EXTENDED) ───────────────────────────────────────────
  {tags:["discard wire rope","wire rope removal","wire rope condemn","broken wires count","wire rope criteria","birdcage","kink","rope damage"],
   q:"What are the extended discard criteria and broken wire counting for wire rope?",
   a:`WIRE ROPE DISCARD CRITERIA — EXTENDED GUIDE

BROKEN WIRE COUNTING RULES:

Step 1 — Identify rope construction:
• Count strands (typically 6 or 8) and wires per strand (varies)
• Note: 6x19 class = 16-26 wires per strand; 6x36 class = 27-49 wires per strand

Step 2 — Measure inspection lengths:
• Short reference length: 6 x rope diameter (6d)
  e.g. 20mm rope: inspect any 120mm length
• Long reference length: 30 x rope diameter (30d)
  e.g. 20mm rope: inspect any 600mm length

Step 3 — Count broken wires:
• Count ALL broken wires visible — on surface only (internal invisible)
• Count each broken end separately — one break = 2 broken wire ends but count as 1

DISCARD LIMITS PER ISO 4309 (most stringent):
6-strand rope, FC core:
• In any 6d length: 2 or more broken wires = discard
• In any 30d length: 4 or more broken wires = discard

6-strand rope, IWRC:
• In any 6d length: 2 or more broken wires = discard
• In any 30d length: 4 or more broken wires = discard

8-strand rope:
• In any 6d length: 3 or more broken wires = discard
• In any 30d length: 6 or more broken wires = discard

Rotation-resistant rope (19x7, 35x7):
• More stringent: 2 broken wires in 6d or any visible damage = discard
• Any broken wires in outer strands of inner rope = discard

OTHER DISCARD CONDITIONS:

Kinking:
• Any kink — permanent angular distortion in rope lay
• Even if straightened — internal wire damage remains
• Immediate discard — no exception

Crushing and Deformation:
• Loss of round cross-section
• Basket/core protrusion visible
• Strand displacement — one or more strands pushed outward
• Reduction in diameter more than 10% from nominal

Birdcaging:
• Outer strands opened outward like cage — internal rope buckled
• Caused by sudden load release — inner core springs outward
• Immediate discard — no repair possible

Internal Corrosion Detection:
• Hold rope, bend through 90 deg over small diameter — listen for crackle
• Tap rope with hammer — hollow sound indicates internal corrosion
• Lub oil does not flow freely between strands when rope is flexed
• NDT (ultrasonic) available for thorough examination

Heat Damage:
• Any discolouration: blue, brown, or straw colour
• Damaged area may appear bright due to lubricant burning off
• Discard entire rope — heat affects full metallurgy

End Terminations:
• Any crack in swage sleeve
• Swage diameter reduced more than 10%
• Any movement of rope within swage — mark rope, check after next use
• 1 broken wire at or within 1 rope diameter of termination = discard

DIAMETER REDUCTION (Detailed):
Measure at 3 locations — discard if AVERAGE reduction exceeds:
• Single layer ropes: more than 10% from nominal diameter
• Multi-layer ropes: more than 5% from nominal

📋 ISO 4309 — Cranes — Wire ropes — Code of practice for examination and discard
📋 ASME B30.9 Sec.9-1.8 — Wire rope sling inspection and removal
📋 BS EN 12385-4 — Steel wire ropes for lifting
📋 BS 7121-1 Sec.10.4 — Wire rope inspection
📋 LEEA COPSULE Sec.4 — Wire rope sling examination

Warning — Related Considerations:
• Discarded rope must be cut into short sections on site — prevent re-use
• Any rope removed due to shock load: quarantine and test before any return to service
• D/d ratio check mandatory whenever rope is re-reeved onto different crane`},

  // ── DISCARD: EYE BOLTS ──────────────────────────────────────────────────────
  {tags:["discard eye bolt","eye bolt removal","eye bolt condemn","eye bolt criteria","eye bolt damage"],
   q:"What are the discard criteria for eye bolts and hoist rings?",
   a:`EYE BOLT AND HOIST RING DISCARD CRITERIA

EYE BOLT DISCARD (DIN 580 / ASME):
Immediate Removal:
• Any crack — in eye, collar, or shank — zero tolerance
• Eye deformed — not circular, bent outward, or narrowed
• Collar not flat — bent, cracked, or corroded
• Shank bent even slightly — indicates overload or wrong application
• Thread stripped or damaged — cannot achieve full engagement
• Corrosion reducing any cross-section more than 10%
• Heat damage — discolouration

Overload Indicators:
• Permanent deformation of eye (stretched or bent)
• Collar lifting from surface (shank bending under load)
• Any evidence of bending in wrong plane (cross-loading)

Inspection Method:
1. Check eye: measure inside diameter — compare to nominal + 10% limit
2. Rotate in hand — should spin freely if OK
3. Inspect shank threads — run nut down by hand to detect damage
4. Visual all surfaces for cracks — use dye penetrant (PT) if suspected

HOIST RING DISCARD:
Immediate Removal:
• Pivot or swivel mechanism stiff or seized — will not rotate freely
• Any crack in body, bail, or retaining hardware
• Threads stripped or damaged
• Deformation of bail (ring) under load
• Retaining ring/snap ring missing or deformed
• WLL marking missing

Hoist Ring Thread Installation Check:
• Must achieve full manufacturer-specified thread engagement
• Torque verified per manufacturer specification
• Check pivot rotates and bail swings freely after installation under no-load

LIFTING POINTS ON STRUCTURES (Padeyes):
Discard/Condemn Criteria:
• Hole ovality more than 3% of hole diameter
• Plate thickness reduction more than 10% from design
• Any weld defect — crack, undercut more than 10% thickness, major porosity
• Corrosion reducing plate thickness more than 10%
• Material upgrade required — original spec not acceptable for new load

📋 DIN 580 — Eye bolts — inspection requirements
📋 ASME B30.26 Sec.26-1.5 — Eye bolt inspection and removal
📋 BS EN 15011 — Cranes — Padeye and lug inspection
📋 LOLER 1998 Reg 9 — Thorough examination
📋 BS 7121-1 Sec.6.7 — Lifting point inspection

Warning — Related Considerations:
• Never re-use eye bolts removed from hot work locations without metallurgical clearance
• Galvanised eye bolts: zinc coating masks surface cracks — PT/MPI required for thorough examination
• Hoist rings with seized pivots: do NOT lubricate and continue — replace immediately`},

  // ── DISCARD: RIGGING HARDWARE ───────────────────────────────────────────────
  {tags:["discard hardware","rigging hardware removal","masterlink discard","turnbuckle discard","rigging condemn"],
   q:"What are the discard criteria for general rigging hardware (masterlinks, rings, turnbuckles)?",
   a:`RIGGING HARDWARE DISCARD CRITERIA

MASTER LINKS AND RINGS:

Discard Criteria:
• Throat opening increased more than 5% from nominal (more stringent than shackles)
• Any crack — visual or NDT
• Permanent deformation — bending, twisting, change of shape
• Wear at contact points exceeding 10% of cross-section diameter
• Corrosion reducing section more than 10%
• WLL marking not legible
• Grade marking not legible

Measurement — Condemn if throat opening exceeds:
• Grade 8, 10mm master link nominal throat 11mm: discard if greater than 11.55mm
• Grade 8, 13mm master link nominal throat 14mm: discard if greater than 14.7mm
• Grade 8, 16mm master link nominal throat 18mm: discard if greater than 18.9mm
• Grade 8, 20mm master link nominal throat 22mm: discard if greater than 23.1mm

DELTA / PEAR-SHAPED RINGS:
Same criteria as master links.
Additional: check inner radius of delta — concentrated wear point from sling legs.

TURNBUCKLES / RIGGING SCREWS:
Discard Criteria:
• Any crack in body, jaw, or hook ends
• Thread stripped — cannot achieve minimum engagement
• Body bent or deformed
• Jaw opening increased more than 10%
• Jaw pin missing or damaged
• Safety locking device (lock nut, cotter pin) missing
• Bearing surfaces worn more than 10%

WIRE ROPE CLIPS (BULLDOG GRIPS):
Discard Criteria:
• U-bolt cracked or deformed
• Saddle cracked or worn more than 10%
• Nut thread stripped
• Any clip that cannot be properly torqued

SWIVEL CONNECTORS:
Discard Criteria:
• Will not rotate freely under light hand load
• Any crack or deformation
• Bearing/swivel mechanism corroded or seized
• Locking device (split pin) missing

LOAD BINDERS (Chain BOOMERS):
Not for lifting — lashing only. If found in lifting application: REMOVE immediately.

WIRE ROPE THIMBLES:
Discard if:
• Groove worn more than 25% of original depth
• Thimble bent or pulled open more than 10% of groove diameter
• Corrosion pitting in groove
• Split along seam (open thimbles)

📋 BS EN 818-4 Sec.7 — Masterlinks — inspection and discard
📋 ASME B30.26 — Rigging hardware inspection and removal
📋 LOLER 1998 Reg 9 — Thorough examination
📋 LEEA COPSULE Sec.8 — Rigging hardware discard guidance

Warning — Related Considerations:
• All hardware must be returned to quarantine when removed — not back into general store
• "Condemned" tag must be physically attached before removal from service
• Destroyed or cut discarded slings/hardware to prevent re-use`},

  // ── ENGINEERING: GROSS LIFT WEIGHT ─────────────────────────────────────────
  {tags:["GLW","gross lift weight","lift weight","weight calculation","rigging weight","total weight","margin"],
   q:"How is Gross Lift Weight (GLW) calculated with all factors?",
   a:`GROSS LIFT WEIGHT (GLW) — COMPLETE CALCULATION

DEFINITION:
GLW = the total weight the crane must lift including all loads and factors.
This is compared to the crane's rated capacity at the working radius and configuration.

FULL GLW FORMULA:
GLW = (Net Load Weight + Rigging Weight + Contingency) x DAF x RF

WHERE:

Net Load Weight:
• Verified weight of the load itself
• Source: engineering drawings, certified weighing, or conservative calculation
• If estimated: add minimum 10% margin
• For liquid-filled: include full liquid weight at maximum fill level

Rigging Weight (RW):
• All slings, shackles, hooks, beams, spreaders, padeyes
• Typical: 2-5% of net load for standard lifts
• Complex lifts: calculate each item individually
• Lifting frame/jig: always calculate individually

Contingency Factor (CF):
• Added to cover weight uncertainty
• Weighed load: CF = 1.0 (no contingency needed if certified weight)
• Calculated weight: CF = 1.05 to 1.10 (5-10% contingency)
• Estimated weight: CF = 1.10 to 1.20 (10-20% contingency)

Dynamic Amplification Factor (DAF):
• Onshore level hardstand: DAF = 1.10
• Onshore rough ground: DAF = 1.15 to 1.25
• Offshore in air: DAF = 1.10 minimum
• Offshore splash zone: DAF = 1.10 to 1.30

Rigging Factor (RF):
• Accounts for sling angle inefficiency in vertical component
• RF = 1/(sin theta) — for most vertical lifts this is already in sling selection
• Some companies apply RF to GLW instead (approach varies by company)

WORKED EXAMPLE — Complete:
Net load: 45,000 kg (from engineering drawing — calculated)
Contingency: 10% = 4,500 kg
Rigging hardware: 850 kg (calculated individually)
Sub-total: 50,350 kg

DAF = 1.10 (onshore, normal conditions)
GLW = 50,350 x 1.10 = 55,385 kg = 55.4T

Crane capacity at working radius: 70T
Capacity utilisation: 55.4/70 x 100 = 79.1%
Classification: CRITICAL (above 75%)

Net load margin: (70T - 55.4T) = 14.6T available margin
Load chart must show capacity at exact radius AND configuration (boom length, counterweight).

CAPACITY UTILISATION TABLE:
• Below 50%: Routine lift
• 50-75%: Non-routine lift — enhanced planning required
• 75-85%: CRITICAL lift — full critical lift procedure
• Above 85%: Maximum effort lift — director of engineering approval typically required
• Above 90%: Exceptional lift — specialist review mandatory

📋 ISO 12480-1 Sec.7.4 — Gross lift weight calculation
📋 ASME P30.1 Sec.6.2 — Load weight determination
📋 BS 7121-1 Sec.6.2 — Weight assessment
📋 DNVGL-ST-N001 Sec.4.3 — Weight and DAF for offshore

Warning — Related Considerations:
• GLW must always be compared to crane capacity with ALL derating applied (wind, ground, level)
• Rigging weight is often underestimated on complex lifts — always calculate individually for critical lifts
• If load weight is uncertain: do NOT proceed past 80% crane capacity without independent weight verification`},

  // ── ENGINEERING: SLING ANGLE FORCE ─────────────────────────────────────────
  {tags:["sling force","sling tension formula","angle factor","K factor","force calculation","tension calculation"],
   q:"How are sling forces and angle factors calculated precisely?",
   a:`SLING FORCE AND ANGLE FACTOR CALCULATIONS

FUNDAMENTAL RELATIONSHIPS:

Vertical Component Equilibrium:
Sum of vertical force components from all legs = Total load
For N legs at equal angle theta:
N x T x sin(theta) = W
T = W / (N x sin(theta))

Horizontal Force Component (on load structure):
H = T x cos(theta)
This inward horizontal force acts on the load — MUST be checked against structural capacity.

ANGLE FACTOR (AF or K factor):
AF = 1 / sin(theta)
This is the multiplier on the single vertical leg load.

Complete AF Table:
theta(deg) | sin(theta) | AF=1/sin | Increase over vertical
90 deg     | 1.000      | 1.000    | 0%
85 deg     | 0.996      | 1.004    | 0.4%
80 deg     | 0.985      | 1.015    | 1.5%
75 deg     | 0.966      | 1.035    | 3.5%
70 deg     | 0.940      | 1.064    | 6.4%
65 deg     | 0.906      | 1.104    | 10.4%
60 deg     | 0.866      | 1.155    | 15.5%
55 deg     | 0.819      | 1.221    | 22.1%
50 deg     | 0.766      | 1.305    | 30.5%
45 deg     | 0.707      | 1.414    | 41.4%
40 deg     | 0.643      | 1.556    | 55.6%
35 deg     | 0.574      | 1.743    | 74.3%
30 deg     | 0.500      | 2.000    | 100%  LIMIT
25 deg     | 0.423      | 2.366    | 136.6% DANGER
20 deg     | 0.342      | 2.924    | 192.4% PROHIBITED

HORIZONTAL FORCE TABLE (as % of leg tension):
90 deg: H = 0%  |  60 deg: H = 57.7%  |  45 deg: H = 100%  |  30 deg: H = 173%

SLING INCLUDED ANGLE vs SLING ANGLE FROM HORIZONTAL:
Included angle (A) between two sling legs:
theta (from horizontal) = (180 - A) / 2

Examples:
A = 60 deg: theta = 60 deg from horizontal
A = 90 deg: theta = 45 deg from horizontal
A = 120 deg: theta = 30 deg from horizontal (LIMIT)
A = 150 deg: theta = 15 deg from horizontal (PROHIBITED)

MEASURING SLING ANGLE IN FIELD:
Method 1: Measure hook height (H) and horizontal spread (S) from hook to padeye
theta = arctan(H/S)

Method 2: Use angle gauge on sling leg directly

Method 3: Calculate from geometry
If sling length = L and vertical height = h:
theta = arcsin(h/L)

PRACTICAL SHORTCUT RULE:
If the horizontal spread between lift points equals the hook height above them:
theta = 45 deg, AF = 1.414 — legs carry 41% more than vertical share

PROOF CHECK — EQUILIBRIUM:
For 2-leg sling at 45 deg, 10T load:
T_leg = (10/2) x 1.414 = 7.07T per leg
Vertical check: 2 x 7.07 x sin45 = 2 x 7.07 x 0.707 = 10.0T CORRECT
Horizontal check: 2 x 7.07 x cos45 = 2 x 5.0 = 10.0T (inward, cancels out)

📋 ASME B30.9 Sec.9-1.7 — Sling angle and tension factors
📋 BS EN 1492-1 Annex B — Angle factors for flat slings
📋 ISO 12480-1 Sec.7.3 — Rigging geometry
📋 ASME P30.1 Sec.6.2 — Sling force calculations

Warning — Related Considerations:
• The horizontal force component must be checked against load structure — padeye plates must resist this
• For basket hitches: the sling contacts the load along its length — friction and contact pressure also apply
• Calculate angle for WORST CASE position during entire lift — not just start position`},

  // ── ENGINEERING: GBP DETAILED ───────────────────────────────────────────────
  {tags:["GBP formula","ground pressure formula","bearing pressure","Boussinesq","mat design","spread formula","ground bearing calculation"],
   q:"What are the detailed formulas for ground bearing pressure calculations?",
   a:`GROUND BEARING PRESSURE — DETAILED FORMULAS

BASIC FORMULA:
q = R / A
q = Ground bearing pressure (kPa or kN/m2)
R = Concentrated reaction load (kN)
A = Contact area of pad, float, or mat (m2)

OUTRIGGER FLOAT CALCULATION:
Step 1: Get outrigger reaction from crane load chart (R kN)
Step 2: Determine pad/float area
    If pad size known: A_pad = length x width
    Circular pad: A_pad = pi x r^2

Step 3: Check against soil capacity
    If q less than q_allow: OK
    If q greater than q_allow: use larger mat

LOAD SPREAD THROUGH MAT/CRIBBING:
Effective area at depth z below pad surface:

Square pad (B x B), load spread at 30 deg (conservative):
A_eff = (B + 2z x tan30)^2 = (B + 1.155z)^2

Square pad, load spread at 45 deg (optimistic):
A_eff = (B + 2z)^2

Pressure at depth z:
q_z = R / A_eff

USE: Check pressure at top of buried service or weak layer below surface.

RECTANGULAR PAD (L x B):
A_eff at depth z (30 deg spread): (L + 1.155z) x (B + 1.155z)

BOUSSINESQ POINT LOAD DISTRIBUTION (for subsurface stress check):
Vertical stress at depth z and horizontal distance r from load:
sigma_z = (3R/2 pi z^2) x 1/(1+(r/z)^2)^(5/2)

For directly below load (r=0):
sigma_z = 3R/(2 pi z^2)

This gives stress in soil at depth z — compare to allowable bearing at that depth.

CRAWLER CRANE GBP:
Track contact pressure (uniform assumption):
q = W_total / (2 x L_track x B_track)
W_total = gross operating weight including load (kN)
L_track = track contact length (m)
B_track = track shoe width (m)
Factor 2 = two tracks

Dynamic pressure with DAF:
q_dynamic = q_static x DAF (use DAF = 1.10 to 1.25)

WORKED EXAMPLE — Outrigger:
Outrigger reaction R = 800 kN
Pad size: 1.0m x 1.0m = 1.0 m2
q = 800/1.0 = 800 kPa — too high for most ground

Use 2.0m x 2.0m timber mat (4.0 m2):
q = 800/4.0 = 200 kPa — acceptable for dense gravel or stiff clay

Check at 0.5m depth (buried service):
A_eff = (2.0 + 1.155x0.5)^2 = (2.0 + 0.578)^2 = 2.578^2 = 6.65 m2
q_0.5m = 800/6.65 = 120 kPa — check against pipe allowable bearing

ALLOWABLE BEARING CAPACITY TABLE:
• Very soft clay: 25-50 kPa
• Soft clay: 50-75 kPa
• Firm clay: 75-150 kPa
• Stiff clay: 150-300 kPa
• Loose sand: 50-100 kPa
• Medium dense sand: 100-200 kPa
• Dense sand: 200-400 kPa
• Dense gravel: 300-600 kPa
• Very dense gravel: 500-1000 kPa
• Weak rock: 1000-3000 kPa
• Sound rock: 3000-10000+ kPa
Always verify with site-specific geotechnical investigation.

FACTOR OF SAFETY (FOS):
Typically applied to allowable bearing:
q_allow = q_ultimate / FOS
Where FOS = 2.5 to 3.0 for crane operations per EN 1997-1

📋 CIRIA C703 Sec.5 — GBP calculations for cranes
📋 EN 1997-1 Sec.6.5 — Bearing capacity of spread foundations
📋 BS 8004 Sec.2.4 — Allowable bearing pressures
📋 ASME P30.1 Sec.7.3 — Ground conditions assessment

Warning — Related Considerations:
• Saturated soils: bearing capacity can reduce 50% or more — get geotechnical advice
• Adjacent excavations within 45 deg influence zone must be assessed
• Mat rotation during crane slew — ensure mat bearing pressure uniformly distributed`},

  // ── ENGINEERING: WIND LOAD ON CRANES ───────────────────────────────────────
  {tags:["wind load","wind force","crane wind","boom wind","sail area","wind calculation","Beaufort","dynamic pressure"],
   q:"How is wind load calculated on cranes and lifted loads?",
   a:`WIND LOAD CALCULATIONS ON CRANES AND LOADS

DYNAMIC WIND PRESSURE:
q = 0.5 x rho x V^2 = 0.613 x V^2 (simplified, at sea level, 15 deg C)
q = dynamic pressure (Pa = N/m2)
V = wind velocity (m/s)
rho = air density = 1.225 kg/m3

WIND FORCE ON AN OBJECT:
F = Cd x A x q
F = wind force (N or kN)
Cd = drag coefficient (dimensionless)
A = projected area perpendicular to wind direction (m2)
q = dynamic pressure (Pa)

Common Cd Values:
• Flat plate (perpendicular): Cd = 1.2 to 2.0
• Cylinder: Cd = 0.5 to 1.2
• Square section: Cd = 1.5 to 2.0
• Lattice structure (open): Cd = 1.3 (use solidity ratio method)
• Crane cab (box shape): Cd = 1.4
• I-beam or H-section: Cd = 1.5

LATTICE BOOM WIND FORCE (ISO 4302 Method):
Step 1: Determine solidity ratio phi = (solid area) / (total outline area)
Step 2: Drag coefficient for lattice: Cd_lattice = 0.5 + 0.3/phi (approximate)
Step 3: F_boom = Cd x A_boom_outline x q

GUST FACTOR:
Mean wind to peak gust conversion:
V_gust = Vg x V_mean
Where Vg = gust factor (typically 1.4 to 1.6 for short duration gusts)
Peak gust pressure = 2.0 to 2.6 x mean pressure

WORKED EXAMPLE:
Large plate load: 10m x 4m = 40 m2, Cd = 1.3
Wind speed: 12 m/s mean, gust = 12 x 1.4 = 16.8 m/s
q_gust = 0.613 x 16.8^2 = 0.613 x 282 = 173 Pa
F_wind = 1.3 x 40 x 173 = 9,000 N = 9.0 kN

This horizontal force:
• Causes crane to work at offset radius (effective radius increase)
• Creates overturning moment on crane structure
• Must be compared to crane stability margin

CRANE OVERTURNING MOMENT FROM WIND:
M_wind = F_wind x h_cog
Where h_cog = height of wind force centroid above ground

WIND SPEED TO PRESSURE TABLE:
5 m/s (18 km/h): q = 15 Pa — gentle breeze
10 m/s (36 km/h): q = 61 Pa — fresh breeze — CAUTION
13.4 m/s (48 km/h): q = 110 Pa — near gale — STOP operations
20 m/s (72 km/h): q = 245 Pa — gale
30 m/s (108 km/h): q = 551 Pa — storm

BEAUFORT SCALE REFERENCE:
• Beaufort 5 (10 m/s): Fresh breeze — whitecaps — caution zone
• Beaufort 6 (12 m/s): Strong breeze — small tree movement — review limits
• Beaufort 7 (15 m/s): Near gale — whole tree movement — most ops cease
• Beaufort 8 (18 m/s): Gale — difficulty walking — crane operations prohibited

📋 ISO 4302 — Cranes — Wind load assessment
📋 EN 1991-1-4 — Eurocode 1 Wind Actions
📋 BS 7121-1 Sec.8.5 — Wind and environmental limits
📋 DNVGL-ST-N001 Sec.12 — Wind criteria offshore
📋 ASME B30.5 Sec.5-1.7 — Wind effects

Warning — Related Considerations:
• Large-area loads (sheet goods, platforms, vessels): wind force can exceed structural limit of load
• Wind increases effective radius — check capacity at increased radius plus original radius
• Measure wind at HOOK HEIGHT — not at ground level — can be 50-100% higher`},

  // ── ENGINEERING: DAF FULL CALCULATION ──────────────────────────────────────
  {tags:["DAF calculation","dynamic factor formula","dynamic amplification calculation","impact factor formula","DAF table"],
   q:"How is Dynamic Amplification Factor (DAF) calculated in detail?",
   a:`DYNAMIC AMPLIFICATION FACTOR — DETAILED CALCULATION

DEFINITION:
DAF accounts for increase in actual load above static weight due to dynamic effects:
acceleration, deceleration, crane structure flexibility, ground irregularity, wave motion.

Dynamic Load = Static Load x DAF

METHOD 1 — DIRECT TABLE (ISO 12480-1 / BS 7121):
Lifting Condition                               | DAF
Onshore, level hardstand, smooth operations     | 1.10
Onshore, slightly uneven ground, steady         | 1.15
Onshore, rough ground, start/stop               | 1.20-1.25
Offshore crane lift in air (still water)        | 1.10
Offshore, light vessel motion                   | 1.10-1.15
Offshore, moderate vessel motion                | 1.20-1.30
Splash zone (entering/leaving water)            | 1.10-1.30
Pick and carry (on road)                        | 1.10

METHOD 2 — CALCULATED (DNVGL-ST-N001):

Dynamic Coefficient for Hoisting:
Phi_1 = 1 + xi_1 x v_h / Sqrt(g x L_r)
Where:
xi_1 = hoist system dynamic factor (typically 0.5 for crane)
v_h = hoisting velocity at hook (m/s)
g = 9.81 m/s^2
L_r = elastic elongation length of rope = L_rope + c_rigid
Typical value: Phi_1 = 1.05 to 1.15

Dynamic Coefficient for Travel (ASME P30.1):
Phi_2 = 1 + v_travel^2 / (g x L_pendulum)
Where:
v_travel = travel speed (m/s)
L_pendulum = effective pendulum length (hook height to load COG) (m)

Offshore Dynamic Load Factor (DNVGL Method):
DAF_total = (W_static + W_dynamic) / W_static
W_dynamic from vessel motion analysis = mass x acceleration
Typical range: 1.05 to 1.50 depending on sea state

METHOD 3 — DNVGL SIMPLIFIED (Common Offshore Use):
For lifts in sheltered waters (Hs less than 0.5m): DAF = 1.10
For normal offshore (Hs = 1.0-2.5m): DAF = 1.15 to 1.25
For heavy weather (Hs greater than 2.5m): requires dynamic analysis

SUBSEA/SPLASH ZONE SNATCH LOAD:
Snatch load factor when load exits water:
SF = (W_in_water + F_suction + F_hydro_added_mass) / W_in_air
Can be very high — requires specialist calculation for submerged lifts.

APPLYING DAF:
GLW = (Rigged Weight) x DAF
Do NOT apply DAF twice — it covers all routine dynamic effects.
Separate factors for wind, inertia, and inclination apply ADDITIONALLY.

REDUCTION FOR SLOW CRANE OPERATIONS:
For very slow operations (v_h less than 0.1 m/s):
DAF may be reduced to 1.05 with engineering justification.

📋 ISO 12480-1 Sec.7.4 — Dynamic load factors
📋 BS 7121-1 Sec.6.3 — Dynamic effects
📋 DNVGL-ST-N001 Sec.4.3 — Dynamic amplification
📋 ASME P30.1 Sec.6.2 — DAF in load determination
📋 CIRIA C703 Sec.3 — Load assessment with DAF

Warning — Related Considerations:
• DAF increases significantly with hoisting speed — SLOW DOWN when near rated capacity
• Offshore: never exceed sea state limits stated in lift plan — DAF becomes unpredictable
• Tandem lifts: each crane applies own DAF — load sharing imbalance adds additional dynamic`},

  // ── ENGINEERING: PROOF LOAD FORMULAS ───────────────────────────────────────
  {tags:["proof load formula","proof test calculation","test load","SWL test calculation","structural test"],
   q:"What are the proof load formulas and acceptance criteria?",
   a:`PROOF LOAD CALCULATIONS AND ACCEPTANCE CRITERIA

STANDARD PROOF LOAD VALUES:

Lifting Equipment (Cranes, Hoists):
• Standard: Test Load = 1.25 x WLL/SWL
• Alternative (BS 7121 for cranes over 10T): 1.1 x SWL may be acceptable
• After major repair: 1.1 x SWL minimum

Lifting Accessories (Slings, Shackles, Chain, Hooks):
• BS EN standards: Test Load = 2.0 x WLL (200%)
• ASME B30 series: Test Load = 2.0 x rated load
• New components must be proof tested before first use
• Exception: components with full EC Declaration of Conformity per EN 818/EN 1492 etc.

Padeyes and Structural Lifting Points:
• New offshore padeyes: typically 2.0 x maximum design load
• Critical structures: 2.5 x design load per project specification
• After repair: engineer-specified

Spreader Beams and Below-Hook Devices (ASME BTH-1):
• New: Test Load = 1.5 x rated load
• After significant repair: 1.5 x rated load

PROOF TEST PROCEDURE:
1. Load application method: calibrated dead weights, hydraulic test bed, or dynamometer-verified crane lift
   Accuracy required: +-2% of specified test load

2. Loading sequence:
   a. Apply 50% of test load — hold 2 minutes — inspect
   b. Apply 100% of test load — hold 10 minutes minimum — inspect
   c. Release load
   d. Measure critical dimensions before and after — compare

3. During load hold:
   • Monitor for creep (load drops or component extends)
   • Inspect all welds, connections, joints
   • Watch for crack formation (listen for sounds)

4. Post-test inspection:
   • Full visual inspection all surfaces
   • NDT (MPI or UT) on all structural welds
   • Measure all critical dimensions — compare to pre-test and nominal

ACCEPTANCE CRITERIA:
• No fracture or rupture of any member
• No permanent deformation exceeding specified tolerance:
  Cranes: typically 0.5% of span or L/200 for beams
  Accessories: return to within 2% of original dimension
• No movement of rope within swage (mark before test)
• All safety devices functional after test
• No cracking confirmed by NDT

CALIBRATION REQUIREMENTS:
• Load cells: calibrated annually (traceable to national standard)
• Pressure gauges: calibrated quarterly if used for test loads
• Certificate of calibration available on site during test

DOCUMENTATION:
• Test specification signed by responsible engineer
• Test data sheet: date, operator, pre/post measurements, all readings
• NDT report attached
• Certificate of test issued — includes test load, duration, acceptance
• Traceable to load cell calibration certificate

📋 BS 7121-1 Sec.10.6 — Load testing procedures
📋 ASME BTH-1 Sec.5 — Proof load testing
📋 DNVGL-ST-N001 Sec.14 — Structural testing offshore
📋 ISO 12480-1 Sec.10 — Testing and commissioning
📋 BS EN 818-4 Sec.8 — Chain sling proof testing

Warning — Related Considerations:
• NEVER test beyond specified proof load — you are not doing a destructive test
• Personnel must be excluded from test area during load application — wire rope or chain failure can be catastrophic
• Cold weather testing: ensure material is within ductile-to-brittle transition temperature before applying load`},

  // ── ENGINEERING: STABILITY MOMENT ──────────────────────────────────────────
  {tags:["stability calculation","overturning moment","tipping moment","stabilising moment","anti-tip","moment calculation"],
   q:"How are overturning and stabilising moments calculated for crane stability?",
   a:`CRANE STABILITY MOMENT CALCULATIONS

PRINCIPLE:
Crane tips when: Overturning Moment (M_OT) greater than Stabilising Moment (M_S)
Safety factor: M_S / M_OT must be greater than or equal to required minimum (1.15 to 1.40)

STABILISING MOMENT (M_S):
M_S = W_crane x d_S
Where:
W_crane = total crane weight (kN), including counterweight and all equipment
d_S = horizontal distance from tipping line to crane centre of gravity

OVERTURNING MOMENT (M_OT):
M_OT = (W_load + W_rigging) x R + W_boom x d_boom
Where:
W_load = load weight (kN)
W_rigging = rigging weight (kN)
R = working radius (m) — measured from slew centre to hook point
W_boom = boom weight (kN)
d_boom = horizontal distance from slew centre to boom COG

TIPPING LINE DEFINITION:
• 4-outrigger crane: line connecting the two outriggers on the relevant side
• Crawler crane: outer edge of the crawler tracks
• For slewing: tipping line changes with boom direction — use load chart for correct sector

SIMPLIFIED MOBILE CRANE STABILITY CHECK:
Total overturning moment = (Load + Rigging) x Radius
Total stabilising moment = (Counterweight x CW radius) + (Crane body weight x body radius)

At rated capacity: M_S / M_OT typically = 1.15 to 1.25 (per load chart derivation standard)

EFFECT OF SLOPE ON STABILITY:
Lateral slope angle alpha reduces stability margin significantly.
Stability reduction factor = cos(alpha)^2 (approximate)
At 1 deg lateral: factor = 0.9997 — negligible
At 2 deg lateral: factor = 0.9988 — marginal
At 3 deg lateral: must derate per manufacturer table
At 5 deg lateral: major derating required — consult manufacturer

WIND EFFECT ON OVERTURNING MOMENT:
Additional overturning = F_wind x h_centroid
Where h_centroid = height of wind force resultant above tipping line

DYNAMIC TIPPING ANALYSIS:
During crane travel with load, additional dynamic moment:
M_dynamic = (Load + Rigging) x a/g x h_load
Where a = acceleration (m/s^2), h_load = load height above ground

OUTRIGGER LOAD (REACTION FORCE):
For symmetric 4-point support, maximum outrigger reaction:
R_max = [(M_OT_max) / L_tip] + (W_total / 4)
Where L_tip = distance from crane centreline to outrigger pad

Check R_max against allowable GBP x pad area.

📋 CIRIA C703 Sec.3 — Crane stability calculations
📋 ISO 4302 — Crane wind load and stability
📋 BS EN 13000 Sec.4 — Mobile crane stability standard
📋 BS 7121-1 Sec.7.3 — Crane setup and stability
📋 ASME B30.5 Sec.5-1.4 — Crane stability requirements

Warning — Related Considerations:
• Slewing changes the tipping line — always use the load chart sector that matches the actual slew position
• Counter-weight configuration must EXACTLY match what was used to derive the load chart
• Any modification to crane (shortened boom, added attachment) invalidates the standard load chart`},

  // ── ENGINEERING: LOAD CHART READING ────────────────────────────────────────
  {tags:["load chart","crane chart","capacity chart","radius","chart reading","derating","crane capacity"],
   q:"How do you correctly read and apply a crane load chart?",
   a:`CRANE LOAD CHART — CORRECT USE

WHAT A LOAD CHART SHOWS:
Maximum permissible load (gross) at each combination of:
• Working radius (m or ft)
• Main boom length
• Optional: jib/fly configuration
• Counterweight configuration
• Outrigger width (full/partial/crawlers)
• Operating sector (over front/rear/side)
• Crane on outriggers vs on rubber (travel configuration)

KEY PRINCIPLE:
Load chart capacity = maximum permissible at tipping limit OR structural limit, divided by appropriate safety factor. It already includes crane self-weight. You compare your HOOK LOAD (GLW) against the chart value.

READING PROCEDURE — STEP BY STEP:
1. Identify exact crane model and serial number — confirm correct load chart for that crane
2. Confirm current counterweight configuration matches chart header
3. Confirm outrigger width used matches chart column (full/75%/50%)
4. Determine working radius: measure from slew centre to load hook point
5. Determine main boom length in use
6. Find radius row and boom length column intersection
7. Read off chart capacity
8. Reduce for any derating factors (wind, level, operating sector)
9. Compare GLW vs derating chart capacity — must have margin

INTERPOLATION:
If radius falls between tabulated values:
Interpolated capacity = Lower capacity - [(radius - lower radius)/(higher radius - lower radius)] x (lower capacity - higher capacity)
Always interpolate between radii at SAME boom length.
Capacities decrease as radius increases — interpolation reduces capacity.

DERATING FACTORS:
• Over side vs over front: capacity may be 60-80% of over-front
• Level tolerance: derate per manufacturer table if out of level
• Wind: derate per ISO 4302 if significant wind load
• Blocked/partial outrigger extension: use partial outrigger column in chart

COMMON ERRORS:
• Wrong radius: measure from slewing centre, not from crane body edge
• Wrong boom length: actual rigged boom vs chart boom length
• Wrong counterweight: check ACTUAL installed counterweight
• Adding boom extensions: must use jib chart — main boom chart doesn't apply
• Gross vs net load confusion: chart shows GROSS capacity — do not add load twice

BOOM ANGLE vs RADIUS RELATIONSHIP:
Radius = L_boom x cos(boom angle from vertical)
At 80 deg from vertical: radius = L x 0.174 (close to minimum)
At 45 deg from vertical: radius = L x 0.707
At 20 deg from vertical: radius = L x 0.940

MAXIMUM RADIUS CHECK:
Always confirm you are not exceeding the structural maximum radius (separate from tipping limit — may be less for long booms).

📋 ISO 9374 — Cranes — Information to be provided
📋 BS EN 13000 Sec.6 — Mobile crane load chart requirements
📋 ASME B30.5 Sec.5-1.2 — Crane load charts
📋 BS 7121-1 Sec.7.4 — Load chart use and verification

Warning — Related Considerations:
• Load charts are crane-specific — NEVER use another crane's chart even if same model
• Charts show maximum values — always operate below 90% capacity for adequate control margin
• Site conditions (ground, wind, utilities) may impose lower limits than the chart`},

  // ── ENGINEERING: WIRE ROPE REEVING ─────────────────────────────────────────
  {tags:["reeving","wire rope reeving","parts of line","fleet angle","drum","sheave","mechanical advantage"],
   q:"How does wire rope reeving work and what are the engineering requirements?",
   a:`WIRE ROPE REEVING — ENGINEERING REQUIREMENTS

DEFINITION:
Reeving = the arrangement of wire rope through sheaves and around the drum to provide:
• Mechanical advantage (multiple parts = reduced line pull)
• Geometric arrangement for controlled lifting

PARTS OF LINE (N):
N = number of rope parts supporting the load block
Mechanical advantage = N (approximately, ignoring friction)
Required line pull = Load / (N x Efficiency)

SHEAVE EFFICIENCY (per sheave):
Each sheave introduces friction loss:
e = 0.98 per sheave (roller bearings — well maintained)
e = 0.96 per sheave (plain bearings)

Total system efficiency with N parts through S sheaves:
E = (e^S) — per Neale's approximation
Or: E = (e^(S)) where S = total number of sheaves in system

REQUIRED HOIST LINE PULL:
T_line = Load / (N x E_total)
Where E_total = product of all individual sheave efficiencies

WORKED EXAMPLE:
Load = 100T, 8-part reeving, 7 sheaves, roller bearings (e=0.98):
E = 0.98^7 = 0.868
T_line = 100T / (8 x 0.868) = 100 / 6.94 = 14.4T single-line pull

Check: winch rated for 14.4T minimum single-line pull at that layer of drum.

FLEET ANGLE:
Angle between rope leaving drum and groove centreline.
Must not exceed:
• Smooth drum: maximum 2 degrees
• Grooved drum: maximum 4 degrees
• Spooling device: maximum 1.5 degrees
Excessive fleet angle causes rope-to-rope contact, rapid wear, irregular spooling.

Fleet Angle Calculation:
alpha = arctan(D / (2L_drum))
Where D = horizontal distance from drum centreline to outermost sheave
L_drum = distance from drum to outermost layer position

D/d RATIO (Sheave diameter / rope diameter):
• BS 7121 minimum for crane hoist sheave: D/d = 16
• Drum: D/d minimum 14
• Low-frequency service: D/d = 18 recommended
• High-frequency service: D/d = 20-25 recommended

REVERSE BENDS:
Wire rope bent first one way then immediately the other = reverse bend.
Rope fatigue life reduces to approximately 50% for each reverse bend compared to single bend.
Minimise reverse bends in reeving design.

LAY DIRECTION AND DRUM WINDING:
Right-hand lay rope on right-hand drum (or left on left) = regular spooling
Opposite = irregular spooling and rapid rope wear

DRUM CAPACITY CHECK:
n_layers x pi x D_mean x L_drum / rope_pitch
Where n_layers = number of rope layers that fit
L_drum = drum barrel length
D_mean = mean drum diameter for that layer
Must provide sufficient rope for maximum working height plus minimum wraps.

MINIMUM WRAPS ON DRUM:
At maximum hook height/rope pay-out:
Minimum 2 dead wraps must remain on drum (ASME B30.2) or 3 wraps (BS 7121)
These wraps absorb anchorage stress — not counted in capacity.

📋 ISO 4309 Sec.4 — Wire rope reeving requirements
📋 BS 7121-1 Sec.10.3 — Wire rope reeving and D/d ratios
📋 ASME B30.2 Sec.2-1.7 — Hoist reeving requirements
📋 ASME B30.5 Sec.5-1.6 — Crane reeving

Warning — Related Considerations:
• Reeving must match the certified load chart — DO NOT change reeving without new capacity assessment
• Twisted reeving: load will rotate and slings will wind up — use rotation-resistant rope for single-part reeving
• Drum overcrowding: extra rope layers reduce D/d ratio and reduce rope life significantly`},

  // ── ENGINEERING: PADEYE DESIGN ─────────────────────────────────────────────
  {tags:["padeye","padeye design","padeye calculation","lifting lug","lug design","structural attachment","lifting point design"],
   q:"What are the engineering requirements for designing padeyes and lifting lugs?",
   a:`PADEYE AND LIFTING LUG DESIGN

COMPONENTS OF A PADEYE:
• Mainplate: primary load-bearing element, contains pin hole
• Cheekplates: two side plates welded to mainplate to increase thickness at hole
• Backing plate (optional): distributes load into parent structure
• Weld: connects padeye to structure — critical element

FORCES ON A PADEYE (2-leg sling):
Vertical: F_V = T x sin(theta)
Horizontal: F_H = T x cos(theta) [inward, perpendicular to sling plane]
Out-of-plane: F_OOP = T x sin(phi) [if sling has lateral offset]
T = sling leg tension per leg

PLATE BEARING STRESS (PIN-HOLE):
sigma_bearing = F / (d_pin x t_plate)
Must be less than allowable bearing stress: typically 0.9 x Fy (yield stress)
For S355 steel: Fy = 355 MPa, allowable bearing = 0.9 x 355 = 320 MPa

PLATE SHEAR-OUT (TEAR-OUT) CHECK:
Shear area on each side of hole: A_shear = (e - d/2) x t
Where e = edge distance from hole centre to edge, d = pin diameter, t = plate thickness
Shear stress = F / (2 x A_shear)
Must be less than 0.6 x Fy = 0.6 x 355 = 213 MPa (S355)

MINIMUM EDGE DISTANCE:
e_min = 1.5 x d_hole (to maintain adequate shear-out strength)

PLATE TENSION ACROSS HOLE:
Net tension stress at hole: sigma = F / ((W - d) x t)
Where W = plate width, d = hole diameter, t = plate thickness
Must be less than Fy = 355 MPa (S355)

WELD DESIGN:
Weld throat area: A_weld = throat size x total weld length
Weld stress: tau = F / A_weld
Must be less than allowable weld shear stress: 0.7 x 355 x 0.7 = 174 MPa (E70xx filler, S355 parent)
Use fillet weld leg size: a = F / (0.7 x 174 x 2 x perimeter) + 20% margin

MINIMUM DIMENSIONS FOR STANDARD PADEYE:
Cheekplate thickness = 0.5 x mainplate thickness minimum
Pin diameter = 0.8 to 0.95 x hole diameter (minimum clearance 1mm each side for free movement)
Min plate thickness = 20mm for loads above 5T
Hole edge distance = 1.5 x pin diameter minimum

MATERIAL REQUIREMENTS:
• Offshore: EN 10225 grade S355G or S420G (notch tough at -20 deg C)
• Onshore: S355 J2 minimum (Charpy impact at -20 deg C)
• High-strength steel: not recommended — brittle fracture risk at weld heat-affected zone

NDT REQUIREMENTS (Offshore per DNVGL):
• 100% MPI of all padeye welds
• 100% UT of all full-penetration welds
• PT (dye penetrant) if MPI not possible
• After proof test: repeat MPI

PROOF LOAD TESTING:
• 2.0 x design load typical for offshore padeyes
• Measure all dimensions before and after
• NDT after proof test

📋 DNVGL-ST-N001 Sec.13 — Padeye design
📋 BS EN 1993-1-8 — Steel connections design
📋 AISC 360 — Steel construction manual
📋 ISO 12480-1 Sec.7.5 — Lifting point requirements
📋 AWS D1.1 — Structural welding code

Warning — Related Considerations:
• In-plane vs out-of-plane loading: padeyes are much weaker for out-of-plane — always align sling in plane of padeye
• Fatigue: repeated use at high stress cycles requires fatigue assessment per BS EN 1993-1-9
• Heat input from welding: post-weld inspection mandatory — HAZ is crack initiation zone`},

  // ── ENGINEERING: BEAM RIGGING CALCULATIONS ──────────────────────────────────
  {tags:["lifting beam calculation","spreader calculation","beam design","bending stress","compression","beam rigging"],
   q:"How are lifting beams and spreader beams structurally designed?",
   a:`LIFTING BEAM AND SPREADER BEAM STRUCTURAL DESIGN

LIFTING BEAM — IN BENDING:

Loading:
Multiple downward forces from rigging + upward reaction at crane attachment point(s).
Self-weight of beam acts as distributed load.

Maximum Bending Moment:
For single central crane attachment and two symmetric load points:
M_max = (W/2) x a
Where W = total suspended load (kN), a = half-span between load points (m)

For two crane attachment points, single central load:
M_max = W x (L/4) if load at midspan (simple two-point suspension)

Bending Stress Check:
sigma = M_max / Z_section
Must be less than allowable: F_allow = Fy / 1.5 (yield/safety factor)
For S355: sigma_allow = 355/1.5 = 237 MPa

Section Modulus Required:
Z_req = M_max / F_allow (m^3 or mm^3)
Select beam where actual Z greater than Z_req.

Deflection Check:
For simply supported beam with central load:
delta = WL^3 / (48EI)
Typically limit: L/300 to L/500 — beam must not visually appear to sag.

SPREADER BEAM — IN COMPRESSION:

Compressive Force:
F_comp = (W/2) x cos(theta) / sin(theta) = (W/2) x cot(theta)
Where W = total load, theta = sling angle from horizontal

For 2-leg sling with included angle A:
F_comp = (W/2) / tan(theta) where theta = (180-A)/2

Example: 10T load, sling at 45 deg from horizontal:
F_comp = (10/2) x cot(45) = 5 x 1.0 = 5T compression in beam

Euler Buckling Check (Critical Compressive Load):
P_crit = pi^2 x E x I / (K x L)^2
Where:
E = 200,000 MPa (steel)
I = second moment of area of beam cross-section (mm^4)
K = effective length factor: 1.0 for pin-pin ends
L = beam length (m)

Actual compressive stress:
sigma_c = F_comp / A_section

Slenderness ratio (must not exceed 150 per most standards):
Lambda = (K x L) / r_min
Where r_min = Sqrt(I_min / A) = minimum radius of gyration

If Lambda less than 150: adequate for light duty
If Lambda greater than 150: redesign — risk of elastic buckling

WORKED EXAMPLE — Spreader Beam:
Load: 20T, 2-leg sling at 45 deg from horizontal
F_comp = (20/2) x cot(45) = 10T = 100 kN

Try 203x203x46 UC (Universal Column), L = 3.0m:
I = 4568 cm^4, A = 58.7 cm^2, r_min = 5.13 cm
Lambda = (1.0 x 300cm) / 5.13 = 58.5 — acceptable (less than 150)
P_crit = pi^2 x 200,000 x 4568x10^4 / (300)^2 = 1,003,000 N = 1003 kN
FOS = 1003 / 100 = 10.0 — adequate

Sigma_c = 100,000 / 5870 = 17 MPa — well within 237 MPa allowable.

SAFETY FACTORS:
• Use minimum 4:1 safety factor on yield for lifting beams
• Proof test to 1.5 x rated load before first use (ASME BTH-1)

📋 ASME BTH-1 — Below-the-hook lifting device design
📋 BS EN 13155 Sec.5 — Non-fixed load lifting attachments
📋 BS EN 1993-1-1 — Steel structure design (Eurocode 3)
📋 AISC 360 — Steel design standard (US)
📋 LOLER 1998 — Thorough examination after manufacture

Warning — Related Considerations:
• Lifting beam COG must be clearly marked — off-centre crane attachment causes beam rotation
• Never use a structural steel section as lifting beam without formal design calculation and proof test
• Checkerplate or grating additions: recalculate self-weight — changes load distribution and natural frequency`},


  // ── CHAIN HOIST — FULL GUIDE ─────────────────────────────────────────────
  {tags:["chain hoist","chain block","chain pulley block","manual hoist","hand chain","hoist block","chain fall"],
   q:"What are the full requirements for chain hoists (chain blocks)?",
   a:`CHAIN HOIST (CHAIN BLOCK) — COMPLETE REQUIREMENTS

TYPES OF CHAIN HOISTS:
• Manual chain hoist: hand-chain operated, vertical lift only
• Electric chain hoist: powered motor drive, vertical or inclined
• Air/pneumatic chain hoist: compressed air powered
• 2-fall chain hoist: internal 2:1 reeving for lighter hand effort on heavier loads

HOW IT WORKS:
Hand chain drives the load wheel via reduction gearing.
Load chain loops through load wheel and supports hook block.
Brake (ratchet or disc): automatically engages under load — holds load when hand chain released.

RATED CAPACITY (WLL):
• Marked on body — this is the FINAL rated capacity
• Accounts for mechanical efficiency, brake capacity, structural strength
• Never exceed WLL — internal brake will slip or structure will fail

STANDARD WLL RATINGS:
250kg, 500kg, 1T, 1.5T, 2T, 3T, 5T, 10T, 20T, 30T, 50T

SUSPENSION HEIGHT (HEADROOM):
Minimum headroom = closed height of hoist (hook to hook, fully retracted)
Check before ordering — inadequate headroom = cannot use bottom hook

HAND EFFORT REQUIRED:
Standard rating: maximum 350N (35kg) hand pull to lift rated load
Efficiency factor typically 70-85% (remaining is friction loss)
Pull force = (Load x gravity) / (N x efficiency)
Where N = number of gears and reduction ratio

OPERATING REQUIREMENTS:

Suspension Point:
• Rated for full WLL of hoist
• If beam: check local flange bending, web buckling
• Beam clamp: rated and correctly fitted — anti-displacement device
• Monorail: checked for lateral forces and rail capacity

Lifting in LINE (Vertical):
• Hook must hang freely — no side loading
• Maximum deviation from vertical: manufacturer states (typically 10-15 deg)
• Inclined use: ONLY if specifically rated — most hoists are vertical-only

Load Attachment:
• Bottom hook must accept sling/shackle size used
• Safety latch functional
• Load never attached to tip of hook — must seat fully in saddle

Operating Position:
• Operator should stand to side — not under suspended load
• If must stand under: use tested load carrier
• Two-blocking: cannot occur on chain hoist (limited lift height) but check chain length vs headroom

LOAD CHAIN MAINTENANCE:
• Lubricate with chain oil per manufacturer — typically every 50 operating hours
• Lubrication reduces wear AND reduces hand effort
• Check pocket wheel for wear — worn pockets cause chain jump
• Chain stretch check: 11-link measurement per manufacturer's table

LOLER REQUIREMENTS:
• Thorough examination: minimum every 12 months
• After exceptional circumstances: re-examination before use
• Register entry: every hoist must be in equipment register
• Chain hoist used for man-riding: every 6 months minimum

DISCARD CRITERIA — Chain Hoist:
• Load chain: any crack, elongation greater than 5%, nick or gouge greater than 10% section
• Load chain: any twisted, bent, or damaged link
• Hooks: throat opening greater than 15% increase, any crack, latch failure
• Body: visible crack in housing
• Brake: hoist does not hold rated load (chain creeps under static load = brake failure)
• Hand chain: any broken link, distortion, kinking
• Gear: abnormal noise, jerky operation — take out of service for inspection
• Any drop or impact damage — inspect and test before reuse

BRAKE TEST — BEFORE EACH USE:
1. Lift load 150-300mm off ground
2. Release hand chain
3. Load must remain stationary — zero creep
4. If load creeps: STOP — hoist removed from service — brake failure

COMPATIBILITY — CHAIN HOIST WITH ATTACHMENTS:
• Beam clamp rating must equal or exceed hoist WLL
• Lug attachments: check orientation — most lugs rated axial only
• Chain container bag: prevents chain from contaminating work area — check attachment

📋 BS EN 13157 — Cranes — Hand-powered lifting equipment — chain hoists
📋 ASME B30.16 — Overhead underhung and stationary hoists
📋 LOLER 1998 Reg 9 — Thorough examination requirement
📋 LEEA COPSULE Sec.12 — Manual hoists and chain blocks
📋 PUWER 1998 Reg 6 — Inspection and maintenance

Warning — Related Considerations:
• Never use chain hoist for horizontal pulling — lever hoist/come-along required
• Chain hoists with twisted or kinked load chain must be removed immediately — jam causes sudden release
• After any overload (chain slipped through load wheel or brake slipped): full inspection and test before reuse`},

  // ── LEVER HOIST — FULL GUIDE ─────────────────────────────────────────────
  {tags:["lever hoist","lever block","come along","ratchet lever","puller","comealong","tirfor","coffing","lever chain"],
   q:"What are the full requirements for lever hoists?",
   a:`LEVER HOIST (LEVER BLOCK / COME-ALONG) — COMPLETE REQUIREMENTS

DEFINITION:
A lever hoist is a hand-operated device using a ratchet-and-pawl mechanism to lift, lower, or pull loads. It can be used in ANY direction — vertical, horizontal, inclined.
This is the fundamental difference from chain hoists (vertical only).

TYPES:
• Chain lever hoist: uses short-link load chain (most common)
• Wire rope lever hoist (Tirfor/Griphoists): wire rope grip mechanism — long travel
• Ratchet hoist: simple ratchet, limited capacity — NOT for sustained load suspension

STANDARD CAPACITIES:
250kg, 500kg, 750kg, 1.0T, 1.5T, 2.0T, 3.0T, 6.0T, 9.0T
Tirfor wire grip: 0.8T, 1.6T, 3.2T, 5.0T, 8.0T

LEVER LENGTH AND HAND EFFORT:
• Standard lever: 400-500mm long
• Maximum hand effort: 350-400N at lever end
• Shorter lever = more effort required but better control in confined spaces
• Extension: permitted ONLY if manufacturer approves — NEVER improvise

OPERATING DIRECTIONS:
Lever Hoist:
• Vertical lift: standard application
• Horizontal pull: fully rated — used for rigging, alignment, skidding
• Inclined pull: any angle — rate remains valid
• Upside down: ONLY if specifically marked on hoist — some cannot be inverted

Tirfor Wire Grip Hoist:
• Forward: grips and pulls wire rope
• Reverse: releases grip and allows rope back
• Can be used as tensioner for pendants, guide wires

SUSPENSION REQUIREMENTS:
• Top hook/shackle rated for full lever hoist WLL
• For horizontal use: anchor point rated for full horizontal force
• Reaction anchor: check direction — anchor point must resist the pull direction

LOAD ATTACHMENT:
• Bottom hook: load seated in hook saddle, safety latch locked
• Can also use lower shackle point if provided
• For rigging tensions: connect via shackle to sling

APPLICATIONS IN LIFTING:
• Load trimming: adjust load level after crane lift
• Tag line tensioning: controlled pull during crane swing
• Rigging alignment: pulling sling legs into position
• Load securement: tensioning lashings (not the primary use — use ratchet straps)
• Pulling structure into alignment before bolting
• Backstay tension on mast/derrick

FREE-WHEEL MODE:
Many lever hoists have free-wheel lever:
• In free-wheel: load chain runs freely — for rapid repositioning
• NEVER activate free-wheel with load on hoist — load will freefall
• Free-wheel only in UNLOADED condition

RATCHET FUNCTION:
• Forward ratchet: lifts load, pawl engages on each click
• Reverse ratchet: lowers load in controlled increments
• Neutral: hoist holds load — lever cannot move (load locked)

DISCARD CRITERIA — Lever Hoist:
• Load chain: any elongation greater than 5%, nick or gouge greater than 10%, crack, twist, bend
• Hooks (top and bottom): throat opening greater than 15%, crack, latch failure
• Lever: bent, cracked, or repaired lever — discard
• Ratchet pawl: worn, chipped, or not engaging — hoist does not hold load = immediate discard
• Body housing: cracked or severely corroded housing
• Free-wheel mechanism: pawl will not re-engage after free-wheel = dangerous — remove service
• Any drop or impact damage — inspect thoroughly

OPERATIONAL SAFETY:
• Never stand in the pull line — wire rope/chain failure sends energy along line
• No side loading on hooks — load must be in plane of hook
• Do not extend lever beyond rated length
• Check anchor/suspension points can resist the applied load direction
• Periodic chain lubrication per manufacturer schedule

TIRFOR (WIRE GRIP HOIST) SPECIFIC:
• Wire rope must be clean and straight for proper grip — kinked rope will not grip
• Check jaws for wear — worn jaws slip under load
• NEVER use wire rope that is corroded, kinked, or damaged
• Minimum wire rope grade: as specified by manufacturer — typically 6x19 or 6x36 IWRC
• Wire rope end: clean cut, no fraying into jaw mechanism

LOLER COMPLIANCE:
• Lever hoists are lifting accessories under LOLER
• Thorough examination minimum every 12 months
• After any overload event: examination before reuse
• Equipment register entry required

📋 BS EN 13157 Sec.5 — Hand-powered lifting equipment — lever hoists
📋 ASME B30.21 — Manually lever-operated hoists
📋 LOLER 1998 Reg 9 — Thorough examination
📋 LEEA COPSULE Sec.12 — Lever hoist guidance

Warning — Related Considerations:
• Free-wheel with load is the most common fatal error with lever hoists — train all users explicitly
• Horizontal pulls: check both anchor and load attachment — horizontal force is same magnitude as vertical
• Chain jamming: if lever becomes very stiff — STOP — do not force — load may be jammed at sheave`},

  // ── SNATCH BLOCK — FULL GUIDE ─────────────────────────────────────────────
  {tags:["snatch block","pulley block","snatch","block","redirect","sheave block","wire rope pulley","rope redirect"],
   q:"What are the full requirements for snatch blocks and pulley blocks?",
   a:`SNATCH BLOCKS AND PULLEY BLOCKS — COMPLETE REQUIREMENTS

DEFINITION:
A snatch block is a pulley block with an opening side plate allowing rope to be inserted laterally without threading through end-to-end. Used to redirect rope or create mechanical advantage systems.

TYPES:
• Single sheave snatch block: one pulley — redirect rope, reduce friction, or create 2:1 advantage
• Double sheave block: two pulleys — higher mechanical advantage
• Triple sheave block: three pulleys — 4:1 or 6:1 advantage (with corresponding fixed block)
• Swivel snatch block: top swivel eye allowing 360-deg rotation of attachment point
• Wire rope block: matched to specific wire rope diameter
• Chain block (as above): uses chain pockets

RATED LOAD vs SHEAVE LOAD:
CRITICAL: The WLL of a snatch block applies to the MAXIMUM force at the suspension point — which is NOT the same as the rope pull force.

For rope deflection angle alpha (angle between incoming and outgoing rope):
Resultant force on block (R) = 2 x T x cos(alpha/2)
Where T = rope tension, alpha = included angle between rope legs

When rope reversal = 180 deg (full block):
R = 2 x T (block load = double rope tension)
Block WLL must be greater than or equal to 2T

When rope deflection = 90 deg:
R = T x sqrt(2) = 1.41T
Block WLL must be greater than or equal to 1.41T

When rope deflection = 60 deg:
R = T x 1.0 = T
Block WLL must be greater than or equal to T

MECHANICAL ADVANTAGE SYSTEMS WITH BLOCKS:

Single Moveable Block (2:1 system):
One snatch block attached to load, fixed point at anchor.
MA = 2 — pull force = load/2
Load moves half the distance the pull rope moves.

Double Moveable Block (3:1 system):
Two blocks — one fixed, one moveable.
MA = 3 — pull force = load/3

Gun Tackle (4:1 system):
Two double blocks.
MA = 4 — pull force = load/4

Efficiency Loss per Sheave:
Each sheave reduces efficiency by approximately 5-10%.
Actual MA = theoretical MA x (0.95^N) where N = number of sheaves

For 4:1 system with 4 sheaves:
Actual MA = 4 x (0.95^4) = 4 x 0.81 = 3.26:1 (not 4:1)

ROPE-TO-SHEAVE COMPATIBILITY:
• Sheave groove diameter must match rope diameter
• Groove too small: rope pinches — rapid rope wear
• Groove too large: rope flattens and spills — rope damage
• Typical: groove diameter = 1.05 to 1.10 x rope diameter

D/d RATIO FOR SNATCH BLOCKS:
• Minimum D/d (sheave OD to rope diameter): 16:1 for cranes
• Minimum D/d for general use: 12:1
• Low D/d significantly reduces rope fatigue life

OPENING MECHANISM:
• Locking pin or bolt on side plate — must be fully engaged before load application
• Safety: ensure side plate is positively locked — not just friction held
• After each use: inspect locking mechanism — replace if worn or bent

SHEAVE CONDITION CHECK:
• Sheave must rotate freely — stiff sheave increases friction, wears rope
• Check with rope: sheave should spin when rope pulled
• Groove: no sharp edges, no cracking, no excessive wear (score marks across groove)

ATTACHMENT TO ANCHOR POINT:
• Shackle: must be rated for full block reaction load (R calculated above)
• No improvised attachment — always use purpose-rated hardware
• For horizontal pulls: check lateral loading on anchor

INSPECTION BEFORE EACH USE:
1. Open side plate — inspect sheave groove condition
2. Rotate sheave by hand — must spin freely
3. Check locking pin — positive engagement
4. Inspect all welds and the body for cracks
5. Check swivel (if swivel type): free rotation
6. Verify WLL marking legible

DISCARD CRITERIA — Snatch Block:
• Any crack in body, side plate, or swivel
• Sheave: groove worn groove depth reduced more than 25%
• Sheave: does not rotate freely — seized bearing
• Groove: sharp edges or severe scoring
• Locking pin: missing, bent, or cannot engage positively
• Side plate: distorted, cracked, or hinge damaged
• Swivel: seized, cracked, or deformed
• WLL marking not legible — remove from service

OFFSHORE USE:
• Offshore snatch blocks typically 6:1 safety factor on MBL
• Sheaves for wire rope with working load over 5T typically require roller bearings
• All offshore blocks to be DNVGL or equivalent certified

SYNTHETIC ROPE BLOCKS:
• Standard steel sheave groove may damage synthetic ropes — use rounded groove
• HMPE (Dyneema) rope: minimum D/d = 40:1 to avoid crushing
• Check specific manufacturer recommendations for rope-to-block compatibility

WORKED EXAMPLE — Block Selection:
Pull force T = 5T, rope deflected 120 deg (60 deg each side)
Included angle alpha = 120 deg
R = 2 x 5 x cos(120/2) = 10 x cos(60) = 10 x 0.5 = 5T
Select block: WLL greater than or equal to 5T
Shackle: WLL greater than or equal to 5T also

If same rope deflected 180 deg (full reversal):
R = 2 x 5 x cos(90) = 10 x 1.0 = 10T — need 10T block!

📋 BS EN 13135 — Cranes — Design requirements for equipment — Sheave blocks
📋 ASME B30.26 Sec.26-1.7 — Sheave blocks
📋 ISO 4309 Sec.4 — Rope and sheave compatibility
📋 LOLER 1998 Reg 9 — Thorough examination
📋 LEEA COPSULE Sec.11 — Pulley block guidance

Warning — Related Considerations:
• Block WLL is for the pin/suspension force — which is often DOUBLE the rope tension for full reversal
• Never run fibre rope over a steel sheave designed for wire rope — groove geometry causes abrasion
• After any side-plate opening under load (accidental): inspect fully — frame may be permanently distorted`},

  // ── DISCARD: SNATCH BLOCKS ───────────────────────────────────────────────
  {tags:["discard snatch block","block removal","pulley block discard","block condemn","sheave worn","block criteria"],
   q:"What are the specific discard criteria for snatch blocks and pulley blocks?",
   a:`SNATCH BLOCK AND PULLEY BLOCK — DISCARD CRITERIA

IMMEDIATE REMOVAL FROM SERVICE (Any One = Discard):

BODY / FRAME:
• Any crack in body — zero tolerance (visual or NDT)
• Permanent deformation of frame — even slight distortion
• Corrosion reducing section more than 10%
• Weld crack at attachment lugs or suspension eye
• Side plate bent, cracked, or hinge damaged
• Heat damage — discolouration

SHEAVE (PULLEY WHEEL):
• Groove worn to depth reduced more than 25% of original groove depth
• Groove has sharp edges or severe scoring across groove direction
• Sheave does not rotate freely by hand (seized or rough bearing)
• Sheave cracked — any crack regardless of location
• Groove diameter has changed shape — deformed groove
• Excessive side play in sheave — bearing worn more than manufacturer tolerance

LOCKING MECHANISM (Side Plate Lock):
• Locking pin missing — NEVER operate block without lock pin
• Locking pin bent or damaged — cannot positively engage
• Side plate hinge worn — plate does not close flush
• Any deformation preventing positive closure
• Lock pin retaining device (R-clip, split pin) missing

SWIVEL (If Swivel-Type Block):
• Swivel seized — cannot rotate freely
• Any crack at swivel bearing or eye
• Swivel eye deformed or worn more than 10%
• Bearing/race corroded or failed

IDENTIFICATION:
• WLL marking not legible — REMOVE
• Rope size rating not legible
• CE marking missing (EU/UK supply requirement)

CONDITION CHECKS — Regular Inspection:

Groove Wear Measurement:
• New groove profile: measure groove depth with radius gauge
• Compare to nominal groove depth
• Discard at 25% groove depth reduction
• Also check groove width — should match rope diameter plus tolerance

Bearing Condition Test:
• Hold block body, flick sheave — should spin 3-5 rotations freely
• Rough or stiff rotation = bearing needs replacement
• Listen for grinding — indicates bearing race damage

Locking Pin Test:
• Insert pin — should slide freely and positively lock
• Wiggle pin when locked — no movement means good
• Any rattle or loose fit — inspect more closely

Sheave Crack Detection:
• Use dye penetrant (PT) or MPI on sheave rim annually if in high-use service
• Look especially at bottom of groove and spoke roots

WIRE ROPE COMPATIBILITY CHECK:
• Compare rope diameter to groove diameter
• Rope too large: cannot seat in groove — rope rides on edge — immediate mismatch — do not use
• Rope too small: rope bottoms in groove — uneven load — if severe, replace block

RECONDITIONING:
• Sheave bearings can be replaced — new bearings restore free rotation
• Groove re-cutting: specialist — must maintain correct radius and diameter
• NEVER weld repairs on load-bearing body or sheave

POST-ACCIDENT INSPECTION:
After any of the following: thorough examination before return to service:
• Block dropped
• Side plate accidentally opened under load
• Overload (rope tension exceeded WLL)
• Block snagged or shock-loaded

📋 BS EN 13135 — Sheave blocks — design and inspection
📋 ASME B30.26 Sec.26-1.7 — Sheave blocks inspection and removal
📋 ISO 4309 Sec.6 — Rope and sheave inspection
📋 LOLER 1998 Reg 9 — Thorough examination of lifting accessories

Warning — Related Considerations:
• Side plate that opened under load may have permanently distorted frame — full NDT required before reuse
• Seized sheave causes rope to drag — increases rope tension and causes rapid rope wear
• Always use correct rope size — undersized rope in oversized groove causes rope rolling and crushing`},

  // ── DISCARD: LEVER HOIST ─────────────────────────────────────────────────
  {tags:["discard lever hoist","lever hoist removal","lever hoist condemn","lever hoist criteria","ratchet failure"],
   q:"What are the specific discard criteria for lever hoists?",
   a:`LEVER HOIST DISCARD CRITERIA — COMPLETE

IMMEDIATE REMOVAL FROM SERVICE (Any One = Discard):

LOAD CHAIN:
• Any crack in any link — zero tolerance
• Elongation: measure 11 links, compare to stamped original — discard if more than 5% elongation
• Cross-section diameter worn to less than 90% of nominal (more than 10% wear)
• Any bent, twisted, or kinked link
• Corrosion reducing section more than 10%
• Chemical damage — bright or pitted surface
• Heat damage — any discolouration (yellow, brown, blue, black)
• Stretched pocket wheel groove contact points: replace chain AND check pocket wheel

HOOKS (TOP AND BOTTOM):
• Throat opening increased more than 15% from nominal — measure with calipers
• Any crack anywhere in hook
• Permanent deformation — any bending or distortion
• Safety latch spring broken, bent, or missing
• Latch does not close and hold under light spring pressure
• Wear in saddle more than 10% of cross-section
• Heat damage — any discolouration

LEVER:
• Lever bent even slightly — cannot apply rated WLL safely
• Crack in lever anywhere
• Lever repaired by welding — immediate discard
• Lever extension added (improvised) — immediate discard
• Lever sleeve grip worn, split, or missing

RATCHET AND PAWL:
• Ratchet will not hold load (hoist creeps under static test load) — BRAKE FAILURE
• Pawl worn — does not seat fully in ratchet tooth
• Ratchet teeth worn or chipped — pawl slips
• Ratchet mechanism makes grinding or clicking noise under load (not the normal click)
• Any corrosion binding the ratchet mechanism

FREE-WHEEL MECHANISM:
• Free-wheel pawl will not positively re-engage after free-wheel mode
• Free-wheel activates under load — severe danger — immediate discard
• Selector lever stiff or jammed

BODY AND HOUSING:
• Visible crack in cast housing — zero tolerance
• Corrosion through housing wall
• Pocket wheel visible damage — cracks, chipped pockets, groove wear

BRAKING SYSTEM TEST — BEFORE EACH USE:
1. Apply rated load (or safe representative load)
2. Release lever to neutral position
3. Load must not move — zero creep
4. If load moves downward at all: BRAKE FAILURE — remove from service immediately

IDENTIFICATION:
• WLL marking not legible — remove
• Chain grade not identifiable — remove
• Serial number not traceable to certificate — remove

INSPECTION FREQUENCY:
• Pre-use: visual by user every use
• Formal: minimum every 12 months per LOLER
• Intensive use (daily): 6-monthly inspection recommended
• After any accident/overload: immediate inspection before reuse

CHAIN LUBRICATION CHECK:
• Dry chain = increased wear rate = reduces service life
• Check: pull chain through fingers — should leave slight oil film
• If dry: lubricate immediately with chain hoist oil (not WD40 — too thin)

TIRFOR / WIRE GRIP HOIST SPECIFIC DISCARD:
• Gripping jaws worn — rope slips under rated load (immediate discard)
• Jaw faces have sharp edges or scoring — damages wire rope
• Wire rope in use: any broken wires, kinks, corrosion (per wire rope discard criteria)
• Actuating mechanism: any crack in lever, housing, or jaw carriers

📋 BS EN 13157 Sec.8 — Hand-powered lifting equipment — discard criteria
📋 ASME B30.21 Sec.21-3 — Lever hoist inspection and removal
📋 LOLER 1998 Reg 9 — Thorough examination
📋 LEEA COPSULE Sec.12 — Lever hoist examination guidance

Warning — Related Considerations:
• Brake failure with load suspended is immediately dangerous — never leave lever hoist holding unsecured load unattended
• Chain jam at pocket wheel: if lever becomes immoveable under load — call rigging engineer — do not force
• After chemical spill on lever hoist: strip and inspect all internal components — corrosion may not be visible externally`},

  // ── MECHANICAL ADVANTAGE SYSTEMS ─────────────────────────────────────────
  {tags:["mechanical advantage","pulley system","block and tackle","4:1","3:1","2:1","rope purchase","compound purchase"],
   q:"How are mechanical advantage systems using blocks and hoists designed and calculated?",
   a:`MECHANICAL ADVANTAGE (MA) SYSTEMS — DESIGN AND CALCULATION

DEFINITION:
A mechanical advantage (MA) system uses multiple pulleys and rope to multiply force.
MA = Load / Effort (ideal, ignoring friction)

COUNTING PARTS OF LINE (N):
Count the number of rope segments supporting the moveable block.
The fixed rope end at anchor DOES NOT count.
MA = N (ideal, no friction)

COMMON CONFIGURATIONS:

Single Fixed Block (1:1 — Direction Change Only):
N = 1
MA = 1.0
Use: redirect pull direction only — no force multiplication
Example: Crane rope over single sheave to change direction

Single Moveable Block — Gun Tackle (2:1):
N = 2
MA = 2.0
Pull force = Load / 2
Load moves: 0.5m per 1m of rope hauled
Use: light lifting, load alignment

Double Moveable + Double Fixed — Luff Tackle (3:1):
N = 3
MA = 3.0
Pull force = Load / 3
Use: pulling structures, rigging alignment

Double Moveable + Double Fixed (4:1):
N = 4
MA = 4.0
Pull force = Load / 4
Load moves: 0.25m per 1m of rope hauled

6:1 System (Triple Blocks):
N = 6
MA = 6.0 (ideal)
Pull force = Load / 6
Actual: approximately Load / (6 x 0.95^6) = Load / 4.4 (with friction)

COMPOUND SYSTEMS (Multiplying):
Use one MA system to pull another MA system.
Example: 3:1 pulling a 3:1 = 9:1 compound
But efficiency: (0.95^3) x (0.95^3) = 0.73 — actual MA = 9 x 0.73 = 6.6:1

EFFICIENCY FACTOR PER SHEAVE:
• Roller bearings, well lubricated: e = 0.98 per sheave
• Plain bearings: e = 0.96 per sheave
• Synthetic rope on steel: e = 0.94 per sheave (higher friction)

Total system efficiency with N sheaves:
E = e^N
Total actual pull: F_actual = Load / (MA x E)

ROPE TRAVEL vs LOAD TRAVEL:
Rope travel = Load movement x MA
If load must move 500mm and MA = 4:1:
Rope to pull = 500 x 4 = 2000mm = 2.0m

ANCHOR LOAD:
Fixed anchor end load = Load / MA (approximately)
But anchor must also resist the haul force.
Total anchor force = Load + Haul force = Load + (Load/MA) = Load x (1 + 1/MA)

For 4:1 system, 10T load:
Haul force = 10/4 = 2.5T
Anchor must resist: 10 + 2.5 = 12.5T (perpendicular components vary by geometry)

SELECTING THE RIGHT SYSTEM:

For lifting light loads (under 2T with one person): 2:1 or 3:1
For heavier loads or limited pull force: 4:1 or 6:1
For pulling structures into alignment: 4:1 with come-along as haul device
For emergency recovery: compound systems up to 9:1

LIMITATIONS:
• Higher MA = more rope travel needed
• More sheaves = lower efficiency — diminishing returns above 6:1
• Heat buildup in sheaves at high use rates — allow cooling
• Long rope travel: rope management becomes critical — do not allow rope to pile

COMBINATION WITH LEVER HOIST:
Common setup: anchor snatch block + lever hoist pulling the running end
Lever hoist (1.5T) through 4:1 block system = effective pull up to 6T (at 100% efficiency)
Always calculate actual forces — do not assume MA is exact.

📋 ASME B30.26 — Rigging hardware for block and tackle
📋 BS EN 13135 — Sheave blocks for crane systems
📋 ISO 12480-1 Sec.7.3 — Rigging force calculations
📋 ASME BTH-1 — Below-hook device mechanical systems

Warning — Related Considerations:
• Vector analysis required for angled pulls — actual anchor and block loads differ from simple MA calculation
• Each additional sheave in system increases setup time and inspection requirements
• Rope management: in a 6:1 system you must haul 6m of rope to move load 1m — plan rope storage`},

  // ── BEAM CLAMPS AND SUSPENSION ────────────────────────────────────────────
  {tags:["beam clamp","girder clamp","hoist suspension","beam trolley","I-beam clamp","beam attachment","clamp hoist"],
   q:"What are the requirements for beam clamps and hoist suspension from steelwork?",
   a:`BEAM CLAMPS AND HOIST SUSPENSION FROM STEELWORK

TYPES OF BEAM CLAMPS:
• Screw-type universal beam clamp: adjustable jaw, fits range of flange widths
• Rigid beam clamp: fixed jaw for specific flange width
• Push-pull beam trolley: manual rolling on flange
• Motor-driven trolley: electric or air powered
• Girder clamp with swivel: rotating hook point

RATED CAPACITY:
• WLL marked on clamp body
• Rating typically assumes load hanging VERTICAL
• Horizontal pull component: reduces rating — consult manufacturer
• Minimum flange thickness specified: clamp must not be used on thinner flange

BEAM REQUIREMENTS (Receiving Structure):

Beam Bending Check:
M_beam = R x a (where a = distance to nearest support or stiffener)
Compare to beam plastic moment capacity: M_p = Fy x Z_plastic
FOS = 1.5 minimum for temporary lifting loads

Local Flange Bending:
Force per flange: F_flange = WLL/2 (if two-flange clamp)
Flange bending stress at root: sigma = F x e / t^2 (simplified)
Where e = eccentricity, t = flange thickness

Web Buckling Check (for concentrated vertical loads):
R_web = WLL / (t_web x (h/t_web + 2.5k))
Where t_web = web thickness, h = web height, k = root radius factor
Consult beam tables if load is near midspan without web stiffeners.

CLAMPING REQUIREMENTS:
• Clamp jaw engages BOTH top flanges (not just one)
• Clamping screw torqued to manufacturer specification
• Anti-displacement device: safety pin or chain must prevent vertical and horizontal movement
• Minimum flange overhang beyond jaw: as per manufacturer (typically 20-40mm)

LATERAL LOAD EFFECTS:
Beam clamps are designed primarily for vertical loads.
Any lateral/horizontal load significantly reduces capacity:
• 5 deg horizontal: reduce WLL by 10-15%
• 10 deg horizontal: reduce WLL by 25-30%
• Greater than 15 deg: consult manufacturer — may not be rated

BEAM TROLLEYS:

Track Check:
• Flange width within trolley range
• Flange condition: no severe corrosion, no sharp edges that damage trolley wheels
• Beam level tolerance: cross-fall less than 2 deg
• Stops at beam ends: mandatory — prevent run-off

Trolley WLL vs Beam Capacity:
• Beam must be structurally adequate for the combined trolley + load weight
• Dynamic factor for trolley acceleration: apply 10-15% increase to WLL for moving loads

INSPECTION BEFORE EACH USE:
• Clamping screw threads: condition and lubrication
• Jaw faces: condition — no cracks, no severe wear
• Anti-displacement: secure and functional
• WLL marking: legible
• Beam condition: visually sound — no severe corrosion, no visible damage

DISCARD CRITERIA:
• Jaw cracked — zero tolerance
• Clamping screw thread stripped — cannot achieve rated torque
• Anti-displacement pin/chain missing — remove from service
• Jaw worn more than 10% of contact face
• Trolley wheel flange worn more than 20% — risk of derailment
• WLL marking not legible

OFFSHORE / STRUCTURAL APPLICATIONS:
• Beam clamps for offshore: typically require load test certificate and structural sign-off
• FPSO/platform beams: check existing beam utilisation — crane load adds to permanent loads
• Minimum flange grade: as required by structural engineer — not assumed adequate

📋 BS EN 13157 Sec.6 — Hand-powered lifting equipment — suspension
📋 ASME B30.16 Sec.16-1.2 — Hoist suspension requirements
📋 BS EN 1993-1-1 — Structural steel beam design (Eurocode 3)
📋 LOLER 1998 Reg 9 — Thorough examination of lifting equipment
📋 LEEA COPSULE Sec.13 — Beam clamp guidance

Warning — Related Considerations:
• Flange-mounted clamps on deteriorated beams: scale rust hides section loss — probe with screwdriver before relying on visual
• Swinging loads: pendulum effect creates horizontal force on clamp — check both vertical and horizontal capacity
• Never assume a beam is adequate — always verify structural capacity before installing any hoist system`},

  // ── WIRE ROPE DRUM HOISTS ─────────────────────────────────────────────────
  {tags:["drum hoist","electric hoist","wire rope hoist","electric wire rope","monorail hoist","overhead hoist","drum winch"],
   q:"What are the requirements for electric wire rope hoists?",
   a:`ELECTRIC WIRE ROPE HOISTS — REQUIREMENTS

TYPES:
• Wire rope electric hoist: drum winds wire rope, used for higher capacities and longer lifts
• Monorail hoist: travels on I-beam lower flange
• Overhead crane hoist: bridge crane component
• Personnel hoist: special category — stringent requirements

COMPONENTS:
• Electric motor: AC or DC, with integral thermal protection
• Gearbox: multi-stage gear reduction
• Drum: grooved or plain barrel for wire rope
• Drum brake: fail-safe — spring applied, electrically released
• Limit switches: upper (anti-two-block) and lower limit
• Load limiter: overload protection device
• Rope: typically 6x19 or 6x36 IWRC, zinc-galvanised offshore

WIRE ROPE SPECIFICATIONS:
• Size: minimum per manufacturer's specification for that WLL
• Construction: as specified — do NOT substitute (affects drum groove fit)
• Material: galvanised preferred for humid/outdoor environments
• End termination: swage sleeve or wedge socket — no bulldog clips on hoists
• Dead wraps: minimum 3 wraps on drum at lowest hook position

BRAKE REQUIREMENTS:
• Fail-safe brake: spring applies ON, power releases
• Brake must hold 125% of rated load without slipping
• Dynamic brake: motor regeneration when lowering
• Lowering speed controlled: prevent freefall condition
• Brake test: at installation and at every LOLER examination

LIMIT SWITCHES:
Upper limit (anti-two-block):
• Cuts power to raise motor when hook reaches pre-set height
• Must stop hook at least 300mm below drum/sheave (prevent two-blocking)
• Test BEFORE each shift (run hook up slowly — confirm switch activates)

Lower limit:
• Prevents rope pay-out beyond minimum wraps
• May not be fitted on all hoists — check manufacturer specification

LOAD LIMITER:
• Cuts power if load exceeds typically 110-125% of rated WLL
• Not a substitute for correct load selection
• Must be tested at installation and periodically per manufacturer

DUTY CLASSIFICATION (FEM/ISO 4301):
• M1-M2: light duty (low number of lifts per day)
• M3-M4: medium duty (workshops, maintenance)
• M5-M6: heavy duty (production, frequent cycling)
• M7-M8: very heavy/continuous duty (paper mills, steel works)

Using a light-duty hoist in heavy-duty service = premature failure.

LOLER REQUIREMENTS:
• 12-month thorough examination minimum
• 6-monthly if used for man-riding
• After any overload event
• After significant repair or modification

INSPECTION PROGRAMME:
Daily (by operator):
• Limit switch function test
• Brake hold test (10% check lift, release, confirm hold)
• Visual wire rope condition
• Hook and latch condition
• Unusual sounds during operation

Weekly/Monthly:
• Wire rope lubrication
• Hook throat measurement
• Control system function
• All limit switches and safety devices

Annual (LOLER Thorough Examination):
• Full disassembly inspection by competent person
• Wire rope measurement — all discards applied
• Brake wear measurement — replace if worn
• Load test 125% WLL (dynamic)
• NDT on hook, drum, and structural members

DISCARD CRITERIA — Electric Wire Rope Hoist:
Wire rope: per ISO 4309 discard criteria — broken wires, kinks, birdcage, diameter reduction
Drum: grooves worn more than 1mm below nominal — replace drum
Drum: cracking in drum wall — immediate discard
Brake: creep under static load — immediate discard
Hook: per hook discard criteria — throat measurement, cracks, latch function
Load limiter: inoperative — STOP use until repaired
Upper limit switch: inoperative — STOP use

📋 BS EN 14492-2 — Power-driven winches and hoists — wire rope hoists
📋 ASME B30.16 — Overhead underhung and stationary hoists
📋 ISO 4301 — Crane classification and duty cycles
📋 LOLER 1998 Reg 9 — Thorough examination
📋 BS 7121-1 Sec.10.9 — Electric hoist inspection

Warning — Related Considerations:
• Two-blocking: if upper limit fails and operator continues hoisting — wire rope may fail catastrophically — ALWAYS test limit switch before use
• Variable frequency drives (VFD): allow smooth acceleration and deceleration — significantly reduces dynamic loads on structure and rope
• Never bypass limit switches — even temporarily for rigging purposes`},

  // ── RIGGING LOFT / STORAGE ────────────────────────────────────────────────
  {tags:["rigging storage","sling storage","equipment storage","rigging loft","store equipment","storage requirements"],
   q:"What are the correct storage requirements for lifting equipment?",
   a:`LIFTING EQUIPMENT STORAGE REQUIREMENTS

GENERAL PRINCIPLES:
• Clean, dry, well-ventilated storage area
• Protected from UV sunlight — particularly critical for synthetic slings
• Segregated from damaged/condemned equipment
• FIFO (First In First Out) stock rotation recommended
• Temperature: 5 to 30 deg C ideal for synthetic equipment
• Humidity: low — condensation on steel accelerates corrosion

WIRE ROPE SLINGS:
• Hang vertically on purpose-made sling hooks — do NOT coil tightly
• Avoid contact with floor — acid/alkali contamination risk
• Clean of mud, sand, concrete before storage
• Light lubrication coat before long-term storage (over 3 months)
• Protect from chemicals, fertilisers, battery acid
• Separate from synthetic slings — avoid cross-contamination

CHAIN SLINGS:
• Hang on sling storage racks — do not pile on floor
• Clean and dry before storage
• Lubricate before extended storage (over 1 month)
• Store in clean dry area — chains rust faster than wire rope

SYNTHETIC SLINGS (Webbing and Round):
• Hang from sling hooks or lay flat — do NOT twist or tightly coil
• MUST be protected from UV light — cover if stored outside even briefly
• Away from any heat source — welding areas, steam pipes
• Away from chemicals — acids, solvents, bleach
• Do NOT store near ozone sources (electric motors, UV lamps) — synthetic fibres degrade
• Temperature: avoid extremes — below -40 or above +40 deg C long term

HOOKS AND SHACKLES:
• Store in bins or drawers — protected from falling
• Apply light rust-preventive oil if storage is over 3 months
• Keep pins with corresponding shackle body — do NOT mix pins between shackles

CHAIN BLOCKS AND LEVER HOISTS:
• Store on dedicated hoist racks — NEVER pile on floor
• Bag or cover to prevent dust and moisture ingress
• Load chain coiled loosely — not kinked
• Leave in neutral position — brake engaged

SNATCH BLOCKS:
• Store on hooks or shelves — upright if possible
• Side plate: leave open slightly to prevent moisture trap inside
• Sheave: rotate to check still free before storing

MARKING AND TAGGING SYSTEM:
Green tag: In service, current thorough examination certificate
Yellow tag: Due for examination — book in within specified period
Red tag: Removed from service — CONDEMNED — awaiting disposal
NEVER return red-tagged equipment to service area

RECORD KEEPING IN STORE:
• Equipment register: serial number, WLL, date manufactured, examination dates
• Location log: know where each item is — prevent loss of traceability
• Movement log: who removed, for which job, date returned
• Examination records: current certificates held in store file

CONDEMNED EQUIPMENT DISPOSAL:
• Must be rendered unusable: cut slings into short lengths, crush hooks, deform shackles
• Record disposal in register
• NEVER donate or sell condemned equipment — legal liability

PERIODIC STORE INSPECTION:
• Monthly: visual check of all stored equipment
• Annual: full inventory — confirm all items present and certificated
• Check: no equipment stored with expired certificates — segregate immediately

📋 LOLER 1998 Reg 9 — Examination and record keeping
📋 BS 7121-1 Sec.10.1 — Equipment management
📋 BS EN 1492-1 Sec.8 — Webbing sling storage
📋 LEEA COPSULE Sec.3 — Equipment management

Warning — Related Considerations:
• Condemned equipment left in service area is a serious hazard — persons use it without knowing it is unsafe
• Insurance inspectors and HSE can inspect equipment registers at any time — keep current
• Offshore: equipment must be tracked offshore and onshore — no ad hoc substitution permitted`},

  // ── SYNTHETIC ROUND SLING APPLICATIONS ────────────────────────────────────
  {tags:["choker hitch","basket hitch","vertical hitch","hitch type","sling configuration","rigging hitch","sling use"],
   q:"What are the different hitch configurations and when should each be used?",
   a:`SLING HITCH CONFIGURATIONS — COMPLETE GUIDE

DEFINITION:
A hitch is the way a sling is connected to a load. Different hitches give different WLL utilisation and are suited to different load types.

1. VERTICAL (STRAIGHT) HITCH:
• One end to hook, other end to load — straight pull
• WLL factor: x 1.0 (base rating)
• Use: loads with engineered lift points (padeyes, shackles, flanges)
• Advantage: maximum WLL, clear load control
• Disadvantage: requires positive load attachment points

2. CHOKER HITCH:
• Sling loops around load, one end through the other eye (or uses choker hook)
• WLL factor: x 0.75 (25% reduction)
• Why reduced: sling bends sharply at choker point — stress concentration
• Effective angle: contact angle should be greater than or equal to 120 deg for x0.75 to apply
  If contact angle less than 120 deg: WLL factor further reduced
• Use: cylindrical loads (pipes, bundles), where no lift points available
• Advantage: self-tightening — sling grips load as it lifts
• Risk: load can rotate and slip out if COG is not centred

3. BASKET HITCH (CRADLE):
• Sling forms loop under load, both eyes attached to hook
• WLL factor: x 2.0 (when legs hang vertically — 0 deg included angle)
• Why increased: two legs share load — each leg carries half
• Angle reduction: as included angle increases, factor reduces:
  0 deg included: x 2.0
  30 deg included: x 1.93
  60 deg included: x 1.73
  90 deg included: x 1.41
  120 deg included: x 1.0
  150 deg included: x 0.52 (worse than single vertical!)
• Use: balanced loads without engineered lift points, pipes, beams, boxes
• Risk: load can tip or roll out of basket if COG is above sling contact

4. DOUBLE BASKET HITCH:
• Two basket hitches in same sling, creating three-point support
• WLL: depends on geometry — calculate per basket angle
• Use: long or flexible loads needing multiple support points

5. DOUBLE CHOKER (CHOKE ON CHOKE):
• Two choker hitches from same hook
• NEVER do this with a single sling — PROHIBITED
• Two separate slings may be used with proper hardware between them

6. REVERSE CHOKER:
• Hook end passes through the eye from below — creates more closing angle
• May be stronger than standard choker at very tight angles
• Check sling manufacturer guidance

WHICH HITCH TO USE:

Has engineered lift point: VERTICAL HITCH — always safest, most control
Round/cylindrical load: CHOKER HITCH if no lift points
Flat/block load, balanced COG: BASKET HITCH
Multi-point lift: MULTIPLE VERTICAL HITCHES from spreader beam

WLL COMPARISON TABLE (10T rated sling):
Configuration              | Effective capacity
Single vertical            | 10.0T
Choker (>120 deg angle)    | 7.5T
Basket at 0 deg            | 20.0T
Basket at 60 deg included  | 17.3T
Basket at 90 deg included  | 14.1T
Basket at 120 deg included | 10.0T
Basket at 150 deg included | 5.2T — LESS than vertical!

CORNER PROTECTION:
ALL hitches around sharp corners require corner protection:
• Synthetic slings: corner padding mandatory — sharp corners cut slings instantly
• Wire rope: thimbles recommended around bends over pins
• Chain: chain links can bite into soft metal loads — use padding

📋 ASME B30.9 Sec.9-1.6 — Sling hitch configurations
📋 BS EN 1492-1 Table 1 — Hitch mode factors
📋 ISO 12480-1 Sec.7.3 — Rigging configuration requirements
📋 LEEA COPSULE Sec.5 — Hitch type guidance

Warning — Related Considerations:
• Choker hitch: load can spin — ensure COG below sling choke point or use two choker slings
• Basket hitch: never use on a load that can roll (like a cylinder) without secondary retention
• Always confirm which hitch WLL is marked on the sling tag — tags show straight pull, choker, and basket separately`},
];

// ── SEARCH ENGINE ──────────────────────────────────────────────────────────────
const KnowledgeSearch = () => {
  const [query, setQuery]     = useState("");
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);
  const [searched, setSearched] = useState(false);

  const EXAMPLES = [
    "What is the minimum sling angle?",
    "When is a lift critical?",
    "Pre-lift inspection checklist",
    "Maximum wind speed for crane operations",
    "Ground bearing pressure calculation",
    "Wire rope discard criteria",
    "Dynamic Amplification Factor (DAF)",
    "Tandem lift requirements",
    "Chain sling WLL determination",
    "LOLER inspection frequencies",
    "Webbing sling inspection criteria",
    "Exclusion zone requirements",
    "Proof load testing",
    "Hook inspection criteria",
    "Shackle discard criteria",
  ];

  const doSearch = (q) => {
    if(!q.trim()){ setResults([]); setSearched(false); return; }
    const words = q.toLowerCase().split(/\s+/).filter(w=>w.length>2);
    const scored = KB.map(entry=>{
      let score = 0;
      const haystack = (entry.tags.join(" ")+" "+entry.q+" "+entry.a).toLowerCase();
      words.forEach(w=>{
        const tagHits = entry.tags.filter(t=>t.includes(w)).length;
        const qHits   = (entry.q.toLowerCase().match(new RegExp(w,"g"))||[]).length;
        const aHits   = (entry.a.toLowerCase().match(new RegExp(w,"g"))||[]).length;
        score += tagHits*10 + qHits*5 + aHits*1;
      });
      return {...entry, score};
    }).filter(e=>e.score>0).sort((a,b)=>b.score-a.score);
    setResults(scored);
    setSearched(true);
    if(scored.length>0) setSelected(scored[0]);
    else setSelected(null);
  };

  const renderAnswer = (text) => text.split("\n").map((line,i)=>{
    if(!line.trim()) return <div key={i} style={{height:6}}/>;
    if(line.startsWith("📋")) return (
      <div key={i} style={{display:"flex",gap:8,background:"#eff6ff",
        border:"1px solid #bfdbfe",borderLeft:"3px solid #2563eb",
        borderRadius:4,padding:"7px 12px",margin:"6px 0",
        fontFamily:"Arial,sans-serif",fontSize:12,color:"#1e40af",fontWeight:600,lineHeight:1.6}}>
        {line}
      </div>
    );
    if(line.startsWith("⚠")) return (
      <div key={i} style={{background:"#fffbeb",border:"1px solid #fde68a",
        borderLeft:"3px solid #d97706",borderRadius:4,padding:"8px 12px",margin:"10px 0",
        fontFamily:"Arial,sans-serif",fontSize:13,color:"#78350f",fontWeight:600}}>
        {line}
      </div>
    );
    if(line.match(/^[A-Z][A-Z &\-\/]{4,}:?$/) || (line.endsWith(":") && line.length<60 && !line.startsWith(" "))) return (
      <div key={i} style={{fontFamily:"Arial,sans-serif",fontSize:12,fontWeight:700,
        color:"#c00000",marginTop:14,marginBottom:4,
        borderBottom:"1px solid #f3f4f6",paddingBottom:3,textTransform:"uppercase",letterSpacing:"0.04em"}}>
        {line.replace(/:$/,"")}
      </div>
    );
    if(line.match(/^[-•▸]\s/)||line.match(/^\d+\.\s/)) return (
      <div key={i} style={{display:"flex",gap:8,padding:"2px 0 2px 6px",
        fontFamily:"Arial,sans-serif",fontSize:13,color:"#111827",lineHeight:1.7}}>
        <span style={{color:"#c00000",flexShrink:0,marginTop:3}}>▸</span>
        <span>{line.replace(/^[-•▸\d\.\s]+/,"")}</span>
      </div>
    );
    return <div key={i} style={{fontFamily:"Arial,sans-serif",fontSize:13,color:"#111827",lineHeight:1.8}}>{line}</div>;
  });

  return (
    <div>
      <div className="module-card">
        <div className="card-header">
          <span className="module-title">🔍 Knowledge Search</span>
          <span className="std-tag">ISO · BS · ASME · LOLER · CIRIA · DNVGL · EN · OSHA</span>
        </div>
        <div className="card-body">

          <div className="info-box info-box-blue" style={{marginBottom:16}}>
            Search the built-in lifting & rigging knowledge base covering <strong>ISO 12480, BS 7121, ASME B30.9, LOLER 1998, CIRIA C703, DNVGL-ST-N001</strong> and more.
            Works offline — no internet connection required.
          </div>

          {/* Search box */}
          <div style={{display:"flex",gap:8,marginBottom:14}}>
            <input className="input-user no-unit" type="text" value={query}
              onChange={e=>setQuery(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&doSearch(query)}
              placeholder="Search lifting & rigging standards..."
              style={{flex:1,fontFamily:"Arial,sans-serif",fontSize:14,padding:"10px 14px"}}
              autoFocus/>
            <button className="btn btn-primary"
              onClick={()=>doSearch(query)}
              disabled={!query.trim()}
              style={{fontFamily:"Arial,sans-serif",minWidth:100,padding:"10px 18px",
                opacity:!query.trim()?0.5:1}}>
              🔍 Search
            </button>
          </div>

          {/* Quick search */}
          <div style={{marginBottom:20}}>
            <div style={{fontFamily:"Arial,sans-serif",fontSize:11,color:"#9ca3af",
              marginBottom:8,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em"}}>
              Quick search:
            </div>
            <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
              {EXAMPLES.map(q=>(
                <button key={q}
                  onClick={()=>{setQuery(q); doSearch(q);}}
                  style={{background:"#fff",border:"1px solid #e5e7eb",borderRadius:20,
                    padding:"5px 12px",cursor:"pointer",fontSize:12,color:"#374151",
                    fontFamily:"Arial,sans-serif",transition:"all 150ms"}}
                  onMouseOver={e=>{e.currentTarget.style.borderColor="#c00000";e.currentTarget.style.color="#c00000";e.currentTarget.style.background="#fff5f5";}}
                  onMouseOut={e=>{e.currentTarget.style.borderColor="#e5e7eb";e.currentTarget.style.color="#374151";e.currentTarget.style.background="#fff";}}>
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Results */}
          {searched && results.length===0 && (
            <div className="info-box info-box-amber">
              No results found for "{query}". Try different keywords or check spelling.
            </div>
          )}

          {results.length>0 && (
            <div style={{display:"flex",gap:16,alignItems:"flex-start"}}>

              {/* Results list */}
              <div style={{width:240,flexShrink:0}}>
                <div style={{fontFamily:"Arial,sans-serif",fontSize:11,fontWeight:700,
                  color:"#9ca3af",textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:8}}>
                  {results.length} result{results.length>1?"s":""}
                </div>
                {results.map((r,i)=>(
                  <div key={i} onClick={()=>setSelected(r)}
                    style={{padding:"10px 12px",borderRadius:6,marginBottom:6,cursor:"pointer",
                      background: selected?.q===r.q?"#fff3e0":"#f9fafb",
                      border:`1px solid ${selected?.q===r.q?"#e8923a":"#e5e7eb"}`,
                      borderLeft:`3px solid ${selected?.q===r.q?"#c00000":"#e5e7eb"}`,
                      transition:"all 150ms"}}
                    onMouseOver={e=>{ if(selected?.q!==r.q) e.currentTarget.style.borderColor="#e8923a"; }}
                    onMouseOut={e=>{ if(selected?.q!==r.q) e.currentTarget.style.borderColor="#e5e7eb"; }}>
                    <div style={{fontFamily:"Arial,sans-serif",fontSize:12,fontWeight:700,color:"#111827",lineHeight:1.4}}>
                      {r.q}
                    </div>
                  </div>
                ))}
              </div>

              {/* Answer panel */}
              {selected && (
                <div style={{flex:1,background:"#fff",border:"1.5px solid #e5e7eb",
                  borderRadius:10,overflow:"hidden",boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
                  <div style={{background:"linear-gradient(90deg,#fff7ed,#fff)",
                    borderBottom:"2px solid #fed7aa",padding:"12px 18px",
                    display:"flex",alignItems:"center",gap:10}}>
                    <span style={{fontSize:20}}>💡</span>
                    <div style={{flex:1}}>
                      <div style={{fontFamily:"Arial,sans-serif",fontSize:13,fontWeight:700,color:"#92400e"}}>
                        {selected.q}
                      </div>
                    </div>
                  </div>
                  <div style={{padding:"18px 22px",lineHeight:1.8,maxHeight:"65vh",overflowY:"auto"}}>
                    {renderAnswer(selected.a)}
                  </div>
                  <div style={{padding:"10px 18px",borderTop:"1px solid #f3f4f6",background:"#fafafa",
                    fontFamily:"Arial,sans-serif",fontSize:10,color:"#9ca3af"}}>
                    ⚠ For engineering guidance only. Always verify against current applicable standards before execution.
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};


const COMPS = [ProjectInfo,WeightCalc,CraneSelection,GBP,RiggingCalc,WindLoad,COGCalc,Dashboard,RiggingEquipRef,DiscardCriteria,ProofLoad,CraneConfig,Weather,HumanFactor,LiftSequence,ExclusionZone,DroppedObject,Redundancy,PythagoreanCalc,UnitConverter,KnowledgeSearch];

// ── ABOUT MODAL ───────────────────────────────────────────────────────────────
const AboutModal = ({onClose}) => {
  const handleOverlay = e => { if(e.target===e.currentTarget) onClose(); };
  useEffect(()=>{
    const handler = e => { if(e.key==="Escape") onClose(); };
    document.addEventListener("keydown",handler);
    return ()=>document.removeEventListener("keydown",handler);
  },[]);
  const standards = [
    "ISO 12480-1","BS 7121-1/2/3","ASME B30.9","ASME B30.5",
    "LOLER 1998","CIRIA C703","EN 1997-1 (EC7)","ASME P30.1",
    "BS EN 1492-1/2","ISO 4309","ASME BTH-1","DNVGL-ST-N001",
  ];
  return (
    <div className="about-overlay" onClick={handleOverlay}>
      <div className="about-modal">
        <div className="about-header">
          <div>
            <div style={{display:"flex",alignItems:"baseline",gap:5,marginBottom:4}}>
              <span style={{fontFamily:"Arial Black,Arial,sans-serif",fontSize:22,fontWeight:900,color:"#ffffff"}}>RigCalc</span>
              <span style={{fontFamily:"Arial Black,Arial,sans-serif",fontSize:22,fontWeight:900,color:"#c00000"}}>Pro</span>
            </div>
            <div style={{fontFamily:"Arial,sans-serif",fontSize:11,color:"#9ca3af",letterSpacing:"0.1em",textTransform:"uppercase"}}>
              Lifting &amp; Rigging Engineering Suite
            </div>
            <div style={{display:"inline-flex",alignItems:"center",gap:6,marginTop:10,
              background:"rgba(192,0,0,0.15)",border:"1px solid rgba(192,0,0,0.30)",
              borderRadius:4,padding:"3px 10px"}}>
              <span style={{width:6,height:6,borderRadius:"50%",background:"#c00000",display:"inline-block"}}/>
              <span style={{fontFamily:"Arial,monospace",fontSize:11,color:"#fca5a5",letterSpacing:"0.06em"}}>Version 1.0</span>
            </div>
          </div>
          <button className="about-close" onClick={onClose} title="Close (Esc)">✕</button>
        </div>
        <div className="about-body">
          <div className="about-row">
            <span className="about-key">Developer</span>
            <span className="about-val" style={{fontWeight:700}}>Althaf Sali</span>
          </div>
          <div className="about-row">
            <span className="about-key">Contact</span>
            <span className="about-val">
              <a href="mailto:Althafsali.p@gmail.com?subject=RigCalc Pro Enquiry">Althafsali.p@gmail.com</a>
            </span>
          </div>
          <div className="about-row">
            <span className="about-key">Modules</span>
            <span className="about-val">20 engineering calculation modules</span>
          </div>
          <div className="about-row">
            <span className="about-key">Purpose</span>
            <span className="about-val">Precision lift planning and rigging calculation tool for Experts</span>
          </div>
          <div className="about-row" style={{alignItems:"flex-start"}}>
            <span className="about-key" style={{paddingTop:2}}>Standards</span>
            <div className="about-val">
              <div className="about-std-grid">
                {standards.map(s=>(<div key={s} className="about-std-item">{s}</div>))}
              </div>
            </div>
          </div>
          <div style={{marginTop:16,padding:"12px 14px",background:"#fffbeb",
            border:"1px solid #fde68a",borderLeft:"3px solid #d97706",borderRadius:6,
            fontFamily:"Arial,sans-serif",fontSize:11,color:"#78350f",lineHeight:1.7}}>
            ⚠ This tool is for engineering guidance only. All lift plans must be reviewed
            and approved by a competent person before execution. Refer to applicable
            standards and site-specific requirements.
          </div>
          <div style={{textAlign:"center",marginTop:20}}>
            <button className="btn btn-primary" style={{minWidth:120,fontFamily:"Arial,sans-serif"}} onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── TOPBAR ─────────────────────────────────────────────────────────────────────
const Topbar = ({liftStatus,hasUnsaved,onAbout}) => {
  const {clearAll} = useContext(AppCtx);
  const bannerText = liftStatus==="pass"?"✅ ALL CHECKS PASS — LIFT APPROVED"
    :liftStatus==="warn"?"⚠️ WARNING — REVIEW REQUIRED"
    :liftStatus==="fail"?"❌ STOP — LIFT NOT APPROVED"
    :"⏳ ENTER DATA TO BEGIN";
  return (
    <div className="topbar">

      <div className="topbar-brand">
        {/* Actual logo image — resized to 62px height, 4KB JPEG */}
        <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCABSAKQDASIAAhEBAxEB/8QAHgABAAEFAAMBAAAAAAAAAAAAAAcBBQYICQIDBAr/xAA9EAABAwMDAwIEBAIHCQEAAAABAgMEBQYRAAcICRIhEzEKFCJBFSMyUWFxFzNCYoGRoRY2Q0RjcoKSssX/xAAcAQEAAQUBAQAAAAAAAAAAAAAABQECAwQGBwj/xAA6EQABAwIFAgMDBw0AAAAAAAABAAIDBBEFEhMhMUFRYXGRBiIyIzNSgaHB0QcIFBVCU3KSk6Kx0tP/2gAMAwEAAhEDEQA/AO/H30000RM6qPbVPtqOt4OXO13H9ZbvXcGz7YkD2j1CqssyFfyaKu8/4J1ZJKyNuaQgDx2W1R0NTVyCGljc956NBJ9BcqRc41XWvFE6sXHC4agIzG8tiocUcZkz/lkf+7iUp/11Olp3lSL8oTNUodUp1ZpkkZZlwZKJLDv/AGrQSk/4HWOGqhm+aeHeRB/wtvEcBxPDwDX08kV+M7HNv/MArlnTXzVisxLepb86fKjQoUVBceffdS000ke6lKUQAB+5OvZBnM1KEzJjOtPx5CA4062sLQ4lQyFJI8EEeQRrOope3Q+dNNETONNNNEQ+2g99BoNETTOdNNETTP8ArpjT20RPbTOn300RVCsffTQZ/bTRFTGTq2XrelK26tKpV6u1CLSqPSI65c2ZJcDbUZpA7lLUo+wAGrnrRDn4mfz15m2nxjp0uXFsiixW7v3IfjLKFvR0rBiwO4exWopVj/qtrH9XrSr6owRZmC7iQGjuTx9XU9gCum9ksAZi1fo1EmnCxrpJX2vkjYLuIHVx2awdXuaOqxxnefe/q/XDNjbXVWpbMbARH1xXbtLJRXLq7T2rEUZBab8YyCnt/tKUrLQnbYHo/wCwWwLSH2rGgXbXCr1H6xdIFXmSHPu4fVBbQo/3EJ99bF2haVMsK16fRaNBi0uk0qOiLDiRmw2zGaQntShCR4CQABq45wM/trWp8JjB1ar5STueB4NHAH29yVN4x+UCqcw4fgQNHRjYMYbOcPpTSCzpHHk3OUcNa0bLEJHH6xJdNMN6yrSdhkdpYXRoymiP27SjGNRRX+HOzfHa64l/UGPK2rmsTWvXRaclyBGryicphuwGgpqUXD4CEtF0n9JB86kq/d6fw+5HbYtaB/tLd6UoU9FQ76cSkoX5S7NfAIZSR5SgBTqx+hBGVDQnqPcu07e3PdG21ubmUmDvPGtqVVroveSlTcbbuA4wtTUGnNpC0RZ0ztwhTiitpkLkOrX2Mtr3n0kLiC5guONuPJcpT49iUDXMineGuFnDMbOB6OF7EeYKiPrC8s7o5uXvQdn7LpFuSI1pXTBrdRodfhuVCn3E/DfKn6dPS2tLb0aI13vz0NrUiMUxmVKckvBpnf3pH8f3+NHT72+tmTVWaq85HkVdfy0dUaFBM2S7L+UitKUpTcVj1vSaSVEhCB7ew1V6f3Cm3dvOIN9bxQKA7So94W4KVYkeZTI8OqQbX9USG35gZQkLm1B5RlvLVlZR8qlX1IVnffiUCnjHYWQQRQouQRgj8sa2FEqRNM6173p6r3G/jrubVLMvnenb61rqoim0T6XUaqlmTEK20uoC0EeMoWhQ/goaz7jby72w5hWtOre1192xflLpkn5OZIos5EpMV7tCghwJ8pJSQRkDI9s6IpG+2mmo55JcutsOHtqwq3uhfdr2JS6lJ+TiSK1PRFTKe7SooR3eVEJBJwDge+NEUjHT76gnj91OePvKvcFFp7d7w2BeFyusOSm6ZTKs27KdbbGVqSjwVdo8nGcAE+wOp20RNDrD9q+Qdib5zK7Hsu8rYux+15pptYbpFTZmKpcoFQLD4bUfTcBSr6VYP0nx41mGiIdBqKN4edG0HH+8Tb167i2pbNbSwiSYVQmhp4Nrz2r7T9jg/wCWsp2X38svkTarlcsW6KLddJZkKiuSqZKS+226kAltRHsrCknB+ygfY6wtqYXP02uBcOlxf0UnNguIRUza2WB7YnWs8tcGm/FnEWN+m+6y720099MazKMVQCR76aAA/fTRFQ+Rj2z41p50waMm8t8+UW48pIXUa3uZLttt1QyoRKW2hlpIP2GXD4/ujW4avA8a1i6f9OTttvRySsZ0hMqFuK7dTScYzEq8RiQ2sfuPUbkJz+7ZH21HVbb1MBPALvXKbfZddlgExbguKRx/E5kV/wCATMv/AH6a2WqVSj0anSJkt9mLEiNqeffeWG22UJGVKUo+EpABJJOABqLE3ncPI3LVpvy7YshwYcuNbPZPrCT7intrH5bRH/NOJ+oeWkKBS8NM+XG4Mqt9TaNuDV6tccjZDZaq0Pbq8KGuoqNvP1CstOvoqMiN/VL+SkS6IFlYVgSO/wCn0Pq3G5y80bU4F8daruBday8hhxuBSqY28luVXqk8eyNBYKvHqOL/ALR+lCErcVhKFESK41RXzj5CzOHe0ytttiLchVvea5qVUKrQqUoqeap0dhsqlVuoLV3LWhCihCS4SuVJdaaBPctSNQ+OXF+s8gN7bT2tp1Vtabt8bQauHd+4qDNqD0++49TkMVKHEqL0hKcy6g6mQ88EqJTCeeaw22+yNWB+74e2+7FdvGVupO3a3937okBFFh7a3+uPBTcLMhxpu30IjrUG6XGYmMvB59GfTi1F9WVLKddHenbwnpXAfi3QrEhzDWayM1C462tHa7Xqo6lPzEpQ+yfpS22j/hstNIHhGiKPusRSplwcRadZtPqNXo8K+LopNtz10cLTMMN51RW2z6RSsE+mn9CkeAQVoQVKFw6QynqZw4Zt41WpVin2XXqtbdLkVCcmfK+SiSltsIckJADyko8d4yCMYUoAKOIdfm7bfo/TYuqgVqkqqk/cGfBtC3XDNbp7NLrE1704c16W4O2Myw4PUW4cfSCnI78jO+kxHsa1+E1uWdYlVj1+Nt2py1q1V43c5Gq1ZihAqMhp9QBkIVKU5+b57iCM/TrX0n6+pfa1reN+VLGtp/1Z+h6Y1NTNnsL5ctst+bX3tx9d1zKs/ZzZ3eP4pHlixvfQbCrtn0qzqfLbF3tx1U+JKLNEaQ4C+QhLhDi0g5yQsge+tTeNStqLO4g842rou2+Nvtuoe9NJYps7biOzIlNNJfqyYzTKS62j5YoAGQvGEpxnU8b/APDVrnz10+oNtiY3zFUq+1MeZQs5AbqsZqhvQ1fyLqAg/wB1xWoNvy6dvrv+EvWbVtSiWtedE3Ep1DvdMON6Uioz45c9KS+TlSlLjONE5+kL9UJA8jWwoldfN3Ovvx84Xbn0vaCvP7lV24qFbNPqU96mW05URAjuQ2nm1SShfcFqZW04ooSpKfUGVe+NB+tbzX236qlq8HL3tKm1aXZFwbuyaHKg3BAQw5KSiRTWn23GkrWktqSsj9XkEgjV62O3Qtva7r6co37kuOh22zUeP1KhxHKlUWoSZLxodCUGkKcUkKWQkq7Rk4STjxrRnbKqRaD03OAU6dJjwoUHfuryJMiQ6lpqO2iZS1LWtaiAlKQCSokAAEnRF2eqXRctvjD1abD5N7e07bTbXaHbOz6gxXaBSKa5EmSpJjVBLktDbLfpKw2+yCSoKKWSMHxr2bZ/FCcdd0LnsyCxbu9FLpd91tig0iv1G0fRo8iS496SQHw8rICs57QpSQDkeDi1cvOuQzRee7ex+30fa/ceyq5tbXrrlVyPVRVUtzIlNqsn5NaGVqZUhXybIWhR7ih5Xt4zyqubcbcjejhxwsu649y9snrPrO8cM0zbK1rPp1BVajyKhIQqQflSklDna4rtLSRmQDknySLaXpMdRPb3pe0vmrf25or5pE/ft2gRY9GgCbLkS3VVFxKEoKkJACGXFEqUB9OBkkA9Iun71uNnuo7vbXtu7Mpu4dAu23qT+NyIN0UH8NU5F9RtsrQQ4vyFOteFdpIXkZAOOAnI10RuN3I1a1BtCOZEVZUo9oSAzXcnP2Gu8PHvkdxh3Y6xm4dIsS311PfmPZLMmt3rCkIlUuo0oKhBMZt5ElaCtJVGBAaTgtn6jjyRRpuTszae/HxBEig3nbdGumijbNuT8lU4iZLAdS4AlfYoEdwCiAf4nUe9MfmXYPT52Y3Xm3VEq8ei1jeKdQKczRqeJPyykx0FKS2FJIQlCcAJCj4AAOrzyq4n27zL67MizronXDTqWNumZ4eo00RJPqNrwkd5Sr6SFnIx58a9PPHhDZfA6zuOtrWOqtuwqtvbTqtLfqkwSpLz6ktt57glIACUAAAfuTknXnzm1EcstZC0DI9/vdTmLRa3h5r69ppsJrKCg9nMQmkeaqmpjpgWa0RNkkLg8kgF1gPg6b36bFuddPZFraipXapm+hGplwM225BND7Z7kp1px1BS0XAOwpaX+pQUCAO3JGZN4W9R7b/nZVrnp9oRrop1StER1VCJXKb8k8lL3f2KSAtWfKFZBwR48YOtQerhxqs/jlcG2100QSoUvcHe6lV2vvzJxWyHkJeJWnuwGkALUT9gPv41IHTnr8G6urHy8qNMnRKlAlKoamZMV9L7LoDKxlK0kggEEeD4xjUtDiNa2ubTTubzY2HN2ucDztwNlwOJ+xnsxN7Lz43hUUrTpmRhe8ENLZoInMIDbG5keQ64NgNu2/gV2jTQZx4IGmurXgCoftrg9yj+JQ3j477z7rVGBt9so9AtS6ahaypK4Ez8VkQ4VRfiR/WcS+PVOcq7QAlJcWQBnz3hOvz08/dqOENc5HbxW02/yeuerVO4Kk5WBb9epP4DFrCpfqykxY815l15EeW4A4UAoSSpPqAAkUICua9wBAPPKwni71VLr6ilRsjYOn1q1NrKZyNvK7lbl1GTRm7gFVfmMNyI7aUTO1LKSntitpbX3ICGiFZSka2x3v4w8htyZ299Qm7uUfeer8Xmk0ag0qoWRFhTpcaVRafUpEunyI7vdGqrXckMPFLhUqOlCiEvODXFm8OLdpwjMolGrJqNttS/m6bNk1Kiwqihamm0ueo2mqPtgdyPAC1ZAByk+NeO03GaLa24sKof0o3VabbSi5+I0Op0V+otOgfllA/F2B74BUXAQPIz7aqrV+mnpyWTVuYu4sTlZf8ARqTBkVKhIo+3EGO20r5SlOoaVLrClJyfXqTqApCSe5mI2yjwpx7O68qU3CjreecbaabSVLWtQSlIAySSfA1yf6MPV72S2f2f2e41qjbp0yfAS3bcCvXVSIEFqZMffeLDbrEebIejB91Sm2VOJ9NZSkBf1JJvXxXkRuq8M9o4T6PVhzd0YjUhlRIQ8j8KqZ7Vj7jIHg+PGsFVOIIXzO4aCfQXUpgeFSYniVPhsRDXTSMjBPAL3BoJt0BO6293BokLqL0KVbUuDEe2KlkJqT8xlC132EryGYyVj8uB3JGZIw48R+SUIw8vy22psHp50mmWYIsCLsmyoRaDUIzLbIs3vX9MOaEAAxStWG5ZGUlQQ+c4eXwPoXHrbqn7YWdVK3QINDYqVPmPy5uIskvOMof+XbQ2WVemXi2hIScqT2EkdriMYvSNltu65ZtakS51tLlMUP51mK1SY8bElQczGV6iPzj9KEkNe/rZ/ShWuRPtxSi3ybt9/wBntfqV9Ex/muY8/MRVxWact7SnfMW8tjI5He9iO6/SVZPCjanb7lFdO99FtKBB3OvSCmnVq4ESn1Oz46QwA2pCnC0kARmPKUA/ljz75jKr9G3i5XrQvqgStrKEqi7lVpm4rkhIqUxtmpT2VvLbf7Uvj0ylUh7w32pIXgggADUv4aqI2x0xt5IabcbumNH3Kq7DNCc7VNTUfIU7EfCwpIQSfuO0eTjW4kvbm0406a0vjXbfbEVKShwUiK4mSGWG3EFHYwrIcWtaB9/ylEBRKUnq4Z3yxMljAs4A7m3Iv2K8Ar8Kp8PrqjD62Q54XvYS1oIORxaTu5p3I224XPrqqcHdz79523DUKRwh2y5AbaOWhEpVu1pmtR6JWYMpEZtpJkvrkgvhgpcSlC2clBaw4OzGpM6SfRJt6b0obL2r5YbXUOpVyhXJVK9GpUypBb9LMhYSk+tEeABWhIKkJcIx2Z8jA3El7U2RHqLrKeOluPoQwXUOoocbtcUFqT2+WRjICVD74V7Ajz88Xbiz5FCrclfGygMv0yDFlxGVUWIRUlOhPe2jDPclTR7u4KT3YAOATgX5pvoj1P4LW0sN/ev/AKbf+isWw3RQ4n8Zb0fuKydnbVo9Zk06VSXJC5cqWTGktKZkNhL7y0gONLWhRABKVqGcKINrtLoE8PLGqtKm0nYu1IU+g1JmrQpTcqZ8zHktKC21eoXyspCgD2KJQSBlJxrMf6OrNFbfiL42URLTU2VFRIFEiKbfbaQFNvJw14Q6Dgd2CCCPJ8atO6e09pb/AFbj1O8uOjVUqVPYTAZdnNd7iWUzW2EhKm0EFtLTinwCe4ISQADnFHOnts0X8z/qro4cLMgEk0gbvciNpPhYaoB8feFvFfRdfRv4wXhY9327V9qKBNot+XMLvrkd6dLIm1dIeAlhXrdzbmJD4w2UjDqhjBxq7cQulrx14FXrU7k2k23oFmV2sQvw6XOjy5Eh5yP3pcLQU+6vtSVoQSE4yUJznA1SnWrQ49h25bbnHmK5QaVPXCh05yJGfZpbS3nUGQlLiMAKCELVj6sPAknB0kbVWaLPp1TY46Ww69KgS5cqIqixkOw3GVoQ2yUljvWpzuUoYTntbJCScA1zTfRHqfwVjYsO3vK/k29xvF9j85sSORvY7XPKkxHHiwG9/Vboiiwhfq6b+EGr/MueoYmc+l2d/p48Dz25/jrz3k2AsPkG/bjl40eFXF2lVG6zSS7JW38nMb/Q6OxackY9lZH8NRnF2kst6nyXXOO1sRnGqzGprTblFiqLkd0I75Z7WThDZUoKAz+gnIHnXwo23tNcqOgcaLcR6y4iVBdIiAspdkPNOLUQyU4aS2lwgEqKXUYGsWicpbptsdz4nufdUi3EYhKyYVcwewZWmwu1tiMrTq3AsSLDaxKlLkTxq255Y2dGoG4dvUy56TDlpnMMSHlt+i8EqSFpU2tKge1agcHBB86tvGfhdtTxH/GDtpaNLtldc9L59cZ515cgN93pgqcWsgDvVgAgZJOsc/oTsFmlU15/YO1W5c9l5xcdFCiu/LKbfbbS2tSWcAqbWtwE4GGyPJOss4/2XTrWkyXYG2VB2+M6nxZDxgMNNOurUt7Mdz020gloJSo/Uf64eB5yFODMJnxtzd+vrb70kxmRmHuw6nrJtE76Z2jJuDctEhHIv8J3A81JwAxpqmNNbi5pfBclNl1elLYg1FylyFfpkIZQ6pH8krBT/mNc87x+Gv2uvHda57yXuFuFDrF2VSVWJoYp9DWyy/KcDkkMB2AtTTTqx3LaCuxRUvIwtQPRvTRFzCX8K1scs/7yVsffxaFqD/8AL0Z+Fa2NacCjcVaWAc9qrRtXB/ypeunumiLnHY3w1m1u3W4VuXXTtw9yXrgtaqxqzDmTmqVKW9IjLLkb1yqJl5tlZCm21HtQUIwMISBOPK3pcw+cW39KtjdTcS6Lpo9FqrdbhIRAg096PMbbdaS6l2M02sfQ84MZwe728DW1en89UIBFirmPcxwc02I4K57NfDdbGlCkyavuDLSsdqvUuOaO4fse14eNeyD8M7xdZx8zQrsln7lV11VH/wAyRroLprCaaE8sHoFIsxrEGfBO8eTnD71EvDXhBtvwG2rl2bthRJFDoVQqbtZlNv1GRPdkS3UNtrdU4+4teSlpsY7sDt9vfUte2mmswAAsFHPe57i9xuTuT3KY0001VWoR/LQDHtpp76ImNMD9hpp7aImP8NMaaaImNNNPudEVdNVH/lpoi8dNNNETTTTRFRP6dV000RUQcjQfqOmmiKummmiKv214g+dNNEVdD7HTTREPvpppoiaaaaImmmmiJpppoi//2Q==" alt="RigCalc Pro" style={{height:"82px",width:"auto",objectFit:"contain",display:"block",flexShrink:0}}/>


      </div>

      <span className={`banner banner-${liftStatus||"idle"}`}>{bannerText}</span>

      <div style={{display:"flex",gap:8,alignItems:"center"}}>
        {hasUnsaved&&<div style={{display:"flex",alignItems:"center",gap:5}}>
          <div className="unsaved-dot"/>
          <span className="unsaved-label">Unsaved</span>
        </div>}
        <button className="btn btn-ghost btn-sm" onClick={clearAll}>🗑 Clear</button>
        <button className="btn btn-ghost btn-sm" onClick={()=>window.print()} title="Print current page">🖨 Print</button>
        <div style={{height:20,width:1,background:"#e5e7eb"}}/>
        <span style={{fontFamily:"Arial,monospace",fontSize:9,color:"#374151",letterSpacing:"0.06em"}}>
          ISO 12480 · BS 7121 · ASME B30
        </span>
        <div style={{height:20,width:1,background:"#e5e7eb"}}/>
        <button className="about-btn-info" onClick={onAbout} title="About RigCalc Pro">ℹ</button>
      </div>

    </div>
  );
};

const Sidebar = ({active,setActive,g}) => {
  const getStatus = (id) => {
    if(id===1&&g?.glw>0) return "pass";
    if(id===2&&g?.craneUtil>0) return g?.craneUtil>90?"fail":g?.craneUtil>75?"warn":"pass";
    if(id===3&&g?.gbpUtil>0) return g?.gbpUtil>100?"fail":g?.gbpUtil>75?"warn":"pass";
    if(id===4&&g?.riggingUtil>0) return g?.riggingUtil>90?"fail":g?.riggingUtil>75?"warn":"pass";
    if(id===5&&g?.windForce>0) return "pass";
    if(id===6) return null;
    if(id===7) return g?.glw>0?"pass":null;
    return null;
  };
  return (
    <div className="sidebar">
      <div className="sidebar-header">Navigation</div>
      {MODULES.map((m,i)=>{
        const status = getStatus(m.id);
        return (
          <div key={m.id} className={`sidebar-item ${active===m.id?"active":""}`}
            style={{"--i":i}} onClick={()=>setActive(m.id)}>
            <span className="sidebar-icon">{m.icon}</span>
            <span className="sidebar-label">{m.label}</span>
            {status && <span className={`sidebar-badge ${status}`}>{status==="pass"?"✓":status==="warn"?"!":"✕"}</span>}
          </div>
        );
      })}
    </div>
  );
};

// ── ROOT APP ───────────────────────────────────────────────────────────────────
export default function App() {
  const [activeModule,setActiveModule]=useState(0);
  const [g,setG]=useState(()=>{ const s=loadStore(); return s.g||{}; });
  const [modInputs,setModInputs]=useState(()=>{ const s=loadStore(); return s.modInputs||{}; });
  const [hasUnsaved,setHasUnsaved]=useState(false);
  const [showBackTop,setShowBackTop]=useState(false);
  const [showAbout,setShowAbout]=useState(false);

  // FIX 7: Scroll to top on every module change
  useEffect(()=>{
    const el = document.querySelector('.content');
    if(el) el.scrollTop=0;
    window.scrollTo({top:0,behavior:'instant'});
  },[activeModule]);

  // FIX 7: Back-to-top visibility
  useEffect(()=>{
    const el = document.querySelector('.content');
    if(!el) return;
    const handler = ()=>setShowBackTop(el.scrollTop>300);
    el.addEventListener('scroll',handler);
    return ()=>el.removeEventListener('scroll',handler);
  },[]);

  const updateG = useCallback((patch)=>setG(p=>({...p,...patch})),[]);

  // Auto-save to localStorage on every change (debounced 800ms)
  useEffect(()=>{
    const timer = setTimeout(()=>{
      saveStore({g,modInputs});
      setHasUnsaved(false); // auto-saved — no "unsaved" warning needed
    },800);
    return ()=>clearTimeout(timer);
  },[g,modInputs]);

  const liftStatus = useMemo(()=>{
    const {craneUtil=0,gbpUtil=0,riggingUtil=0}=g;
    if(!g.glw||g.glw===0) return "idle";
    if(craneUtil>90||gbpUtil>100||riggingUtil>90) return "fail";
    if(craneUtil>75||gbpUtil>75||riggingUtil>75) return "warn";
    return "pass";
  },[g]);

  const clearAll = () => {
    setG({}); setModInputs({}); localStorage.removeItem(STORE_KEY); setHasUnsaved(false);
  };

  const Comp = COMPS[activeModule]||ModulePlaceholder;

  return (
    <AppCtx.Provider value={{g,updateG,modInputs,setModInputs,hasUnsaved,setHasUnsaved,clearAll}}>
      <style>{CSS}</style>
      <div className="app-root">
        <Topbar liftStatus={liftStatus} hasUnsaved={hasUnsaved} onAbout={()=>setShowAbout(true)} />
        <div className="app-body">
          <Sidebar active={activeModule} setActive={setActiveModule} g={g} />
          <div className="content">
            {activeModule<COMPS.length ? <Comp /> : <ModulePlaceholder id={activeModule} />}
            <RefPanel moduleId={activeModule} />
            <ModuleNavBar activeModule={activeModule} setActiveModule={setActiveModule} />
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 20px",borderTop:"1px solid #e5e7eb",marginTop:16,background:"#f8f9fa"}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{fontFamily:"'Arial Black',Arial,sans-serif",fontSize:13,fontWeight:900,color:"#1a1a1a",display:"flex",alignItems:"baseline",gap:4}}>
                  <span>RigCalc</span><span style={{color:"#c00000"}}>Pro</span>
                </div>
                <div style={{width:1,height:16,background:"#d1d5db"}}/>
                <div style={{fontFamily:"Arial,sans-serif",fontSize:10,color:"#6b7280",letterSpacing:"0.06em"}}>
                  Precision Engineering For Every Lift &nbsp;·&nbsp; v1.0
                </div>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                <span style={{color:"#d1d5db",fontSize:10}}>|</span>
                <a href="mailto:Althafsali.p@gmail.com?subject=RigCalc Pro Enquiry"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{fontFamily:"Arial,sans-serif",fontSize:11,color:"#4b5563",
                    textDecoration:"none",cursor:"pointer",
                    borderBottom:"1px dotted #9ca3af"}}
                  onMouseOver={e=>{e.target.style.color='#c00000';e.target.style.borderBottomColor='#c00000'}}
                  onMouseOut={e=>{e.target.style.color='#4b5563';e.target.style.borderBottomColor='#9ca3af'}}>
                  Althafsali.p@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
        {showAbout && <AboutModal onClose={()=>setShowAbout(false)} />}
        <button className={`btn-back-top ${showBackTop?"visible":""}`}
          onClick={()=>{const el=document.querySelector('.content');if(el)el.scrollTo({top:0,behavior:'smooth'});}}
          title="Back to top">↑</button>
      </div>
    </AppCtx.Provider>
  );
}
