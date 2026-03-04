import { useState, useMemo } from "react";

// ── PREFECT DATA ──────────────────────────────────────────────────────────────
const PREFECTS = [
  { id:"KHANN041", name:"Mani Khanna-Boyle",            portfolio:"Prefect Executive",              role:"Captain",                    events:["Senior Play – 'Cosi'","B Week"],            afternoonTea:null },
  { id:"CHRIS041", name:"Lewis Christie",                portfolio:"Prefect Executive",              role:"Vice (Social Justice)",      events:["Senior Play – 'Cosi'","B Week"],            afternoonTea:null },
  { id:"PHIJI012", name:"Miles Phijidvijan",             portfolio:"Prefect Executive",              role:"Vice (Prefects)",            events:["Senior Play – 'Cosi'","B Week"],            afternoonTea:"PLC" },
  { id:"MORRI191", name:"Lachlan Morris",                portfolio:"Prefect Executive (Head Prefect)",role:"Chairman",                 events:["Knox Christmas Service"],                   afternoonTea:"PLC" },
  { id:"BURWO014", name:"Harry Burwood",                 portfolio:"Prefect Executive (Head Prefect)",role:"Secretary",                events:[],                                           afternoonTea:"Hornsby Girls" },
  { id:"KIM00571", name:"James Kim",                     portfolio:"Prefect Executive (Head Prefect)",role:"Head Cadet Prefect",       events:["Knox Christmas Service"],                   afternoonTea:"Turramurra High" },
  { id:"LIU00411", name:"Rainier Liu",                   portfolio:"Prefect Executive (Head Prefect)",role:"Academic Exec",            events:[],                                           afternoonTea:null },
  { id:"JACOB041", name:"Theodore Jacobs-Preussmann",    portfolio:"Prefect Executive (Head Prefect)",role:"Boarding Exec",            events:[],                                           afternoonTea:"Ascham" },
  { id:"GRELL113", name:"Toby Grellman",                 portfolio:"Prefect Executive (Head Prefect)",role:"Co-Curricular Exec",       events:[],                                           afternoonTea:"Brigidine" },
  { id:"LOW00012", name:"Ryan Low",                      portfolio:"Prefect Executive (Head Prefect)",role:"F&S Exec",                 events:[],                                           afternoonTea:null },
  { id:"PALLA012", name:"James Pallant",                 portfolio:"Prefect Executive (Head Prefect)",role:"House Exec",               events:["B Week"],                                   afternoonTea:"Barker" },
  { id:"NEAL0022", name:"Chris Neal",                    portfolio:"Prefect Executive (Head Prefect)",role:"Sport & Tartan Army Exec", events:["Senior Play – 'Cosi'","B Week"],            afternoonTea:"Queenwood" },
  { id:"HETHE011", name:"Charley Hetherington",          portfolio:"Prefect Executive (Head Prefect)",role:"Wellbeing Exec",           events:[],                                           afternoonTea:null },
  { id:"SENIN011", name:"Xavier Senini",                 portfolio:"Academic",                       role:"Secretary",                events:[],                                           afternoonTea:null },
  { id:"ALLEN132", name:"Freddie Allen",                 portfolio:"Academic",                       role:"Stage 4",                  events:["FED Debating Chair"],                       afternoonTea:null },
  { id:"TONG0111", name:"Harry Tong",                    portfolio:"Academic",                       role:"Stage 4",                  events:[],                                           afternoonTea:null },
  { id:"LIU00491", name:"Frankie Liu",                   portfolio:"Academic",                       role:"Stage 5",                  events:[],                                           afternoonTea:null },
  { id:"YOU00011", name:"Ryan You",                      portfolio:"Academic",                       role:"Stage 5",                  events:["Knox Christmas Service"],                   afternoonTea:"North Sydney Girls" },
  { id:"ZHANG981", name:"Yilun Zhang",                   portfolio:"Academic",                       role:"Stage 6",                  events:[],                                           afternoonTea:"Barker" },
  { id:"ZHENG221", name:"Ryan Zheng",                    portfolio:"Academic",                       role:"Stage 6",                  events:[],                                           afternoonTea:null },
  { id:"LOK00041", name:"Aiden Lok",                     portfolio:"Boarding",                       role:"Secretary",                events:["WPS Centenary Celebration Show"],            afternoonTea:null },
  { id:"MCWIL041", name:"Hamish McWilliam",              portfolio:"Boarding",                       role:"Stage 4",                  events:["Senior Play – 'Cosi'"],                     afternoonTea:"Queenwood" },
  { id:"TURNE162", name:"Toby Turner",                   portfolio:"Boarding",                       role:"Stage 5",                  events:[],                                           afternoonTea:"Ascham" },
  { id:"ARNOT012", name:"Macarthur Arnott",              portfolio:"Boarding",                       role:"Stage 6 (Academics)",      events:[],                                           afternoonTea:"Ascham" },
  { id:"SMART031", name:"James Smart",                   portfolio:"Boarding",                       role:"Stage 6 (Community)",      events:[],                                           afternoonTea:null },
  { id:"FONG0101", name:"Cyrus Fong",                    portfolio:"Co-Curricular",                  role:"Secretary",                events:["PLC"],                                      afternoonTea:"Pymble" },
  { id:"WAN00151", name:"Alexander Wan",                 portfolio:"Co-Curricular",                  role:"KAPA",                     events:[],                                           afternoonTea:null },
  { id:"SIVA0021", name:"Avaneesh Siva",                 portfolio:"Co-Curricular",                  role:"Pipes & Drums",            events:["Co-Curricular Expo"],                       afternoonTea:null },
  { id:"CHEN0981", name:"Summer Chen",                   portfolio:"Co-Curricular",                  role:"Clubs",                    events:[],                                           afternoonTea:null },
  { id:"REDDY031", name:"Ashok Reddy",                   portfolio:"Co-Curricular",                  role:"Clubs",                    events:["Senior Play – 'Cosi'"],                     afternoonTea:null },
  { id:"AZAD0011", name:"Shafin Azad",                   portfolio:"Co-Curricular",                  role:"Student Assemblies",       events:[],                                           afternoonTea:null },
  { id:"WALL0031", name:"Harrison Wall",                 portfolio:"Co-Curricular",                  role:"Student Assemblies",       events:["Co-Curricular Expo"],                       afternoonTea:null },
  { id:"WONGP011", name:"TJ Wongpim",                    portfolio:"Community",                      role:"Secretary",                events:["Y7 Orientation Day"],                       afternoonTea:"Hornsby Girls" },
  { id:"WILLI302", name:"Nicholas Williams",             portfolio:"Community",                      role:"Knox Prep",                events:["Y7 Orientation Day"],                       afternoonTea:null },
  { id:"JOHNS381", name:"Lucas Johnston",                portfolio:"Community",                      role:"WPS",                      events:["B Week","Y7 Orientation Day"],               afternoonTea:"Hornsby Girls" },
  { id:"PETER111", name:"Oscar Peterkin",                portfolio:"Community",                      role:"Stage 4",                  events:["Senior Play – 'Cosi'","Y7 Orientation Day"],afternoonTea:null },
  { id:"PITMA031", name:"Korben Pitman",                 portfolio:"Community",                      role:"Stage 4",                  events:["Y7 Orientation Day"],                       afternoonTea:null },
  { id:"PRASA012", name:"Reyaan Prasad",                 portfolio:"Community",                      role:"Stage 5",                  events:["Senior Play – 'Cosi'","Y7 Orientation Day"],afternoonTea:null },
  { id:"MARKS012", name:"Isaac Marks",                   portfolio:"Community",                      role:"Stage 5",                  events:["Y7 Orientation Day"],                       afternoonTea:null },
  { id:"BAKER142", name:"Benjamin Baker",                portfolio:"Community",                      role:"Stage 6",                  events:["Senior Play – 'Cosi'","Y7 Orientation Day"],afternoonTea:"North Syd Girls" },
  { id:"CARTW021", name:"Jacob Cartwright",              portfolio:"Community",                      role:"Stage 6",                  events:["Y7 Orientation Day"],                       afternoonTea:null },
  { id:"PHIPP052", name:"Harry Phipps",                  portfolio:"F&S",                            role:"Secretary",                events:["Knox Senior Musical Usher – Spamalot"],     afternoonTea:null },
  { id:"THAM0021", name:"Matthew Tham",                  portfolio:"F&S",                            role:"Stage 4",                  events:["Knox Christmas Service"],                   afternoonTea:"North Syd Girls" },
  { id:"HEALY021", name:"Ethan Healy",                   portfolio:"F&S",                            role:"Stage 5",                  events:[],                                           afternoonTea:null },
  { id:"STRYD021", name:"Kyle Strydom",                  portfolio:"F&S",                            role:"Stage 6",                  events:[],                                           afternoonTea:null },
  { id:"WANG0551", name:"Albert Wang",                   portfolio:"House",                          role:"Secretary",                events:[],                                           afternoonTea:"North Syd Girls, Brigidine" },
  { id:"ZOU00081", name:"Jacob Zou",                     portfolio:"House",                          role:"Stage 4",                  events:["Brigidine SJ Forum","B Week"],               afternoonTea:"James Ruse, North Syd Girls, Brigidine" },
  { id:"PHIPS021", name:"Matthew Phipson",               portfolio:"House",                          role:"Stage 5",                  events:[],                                           afternoonTea:null },
  { id:"SANDS012", name:"Alexander Sands",               portfolio:"House",                          role:"Stage 6",                  events:[],                                           afternoonTea:"Sydney Boys" },
  { id:"LIN00671", name:"Sean Lin",                      portfolio:"Social Justice",                 role:"Secretary",                events:["Knox Christmas Service"],                   afternoonTea:null },
  { id:"KEANE011", name:"Christian Keane",               portfolio:"Social Justice",                 role:"Head of KEST",             events:["Senior Play – Cosi"],                       afternoonTea:"Brigidine College" },
  { id:"JENNE021", name:"Wesley Jenner",                 portfolio:"Social Justice",                 role:"Stage 4",                  events:[],                                           afternoonTea:"Hornsby Girls" },
  { id:"DUTT0011", name:"Kabir Dutt",                    portfolio:"Social Justice",                 role:"Stage 5",                  events:["Knox Christmas Service","B Week"],           afternoonTea:"Brigidine College, Barker" },
  { id:"MCFAR011", name:"Will McFarlane",                portfolio:"Social Justice",                 role:"Stage 6",                  events:["Senior Play – 'Cosi'","B Week"],            afternoonTea:null },
  { id:"KIM00611", name:"Joseph Kim",                    portfolio:"Sport",                          role:"Secretary",                events:[],                                           afternoonTea:"Barker" },
  { id:"HOUGH032", name:"Drake Houghton",                portfolio:"Sport",                          role:"Stage 4 & TA",             events:[],                                           afternoonTea:"Ascham, Sydney Boys" },
  { id:"STRAW021", name:"Jack Straw",                    portfolio:"Sport",                          role:"Stage 4",                  events:[],                                           afternoonTea:null },
  { id:"BAKER151", name:"Max Baker",                     portfolio:"Sport",                          role:"Stage 5",                  events:[],                                           afternoonTea:"Wenona" },
  { id:"RYAN0032", name:"Alexander Ryan",                portfolio:"Sport",                          role:"Stage 5",                  events:[],                                           afternoonTea:"Barker" },
  { id:"HUGHE181", name:"Samuel Hughes",                 portfolio:"Sport",                          role:"Stage 6 & TA",             events:["Wenona Christmas Afternoon Tea"],            afternoonTea:"Wenona" },
  { id:"ZHOU0451", name:"Dylan Zhou",                    portfolio:"Sport",                          role:"Stage 6",                  events:[],                                           afternoonTea:null },
  { id:"YATES051", name:"Peter Yates",                   portfolio:"Wellbeing",                      role:"Secretary",                events:[],                                           afternoonTea:null },
  { id:"QADRI011", name:"Aman Qadri",                    portfolio:"Wellbeing",                      role:"Stage 4",                  events:[],                                           afternoonTea:null },
  { id:"SON00011", name:"Hayden Son",                    portfolio:"Wellbeing",                      role:"Stage 4",                  events:[],                                           afternoonTea:null },
  { id:"BOYFI011", name:"William Boyfield",              portfolio:"Wellbeing",                      role:"Stage 5",                  events:[],                                           afternoonTea:"Brigidine" },
  { id:"PEDER011", name:"Frederick Pedersen",            portfolio:"Wellbeing",                      role:"Stage 5",                  events:[],                                           afternoonTea:null },
  { id:"BOOTH041", name:"Luca Booth",                    portfolio:"Wellbeing",                      role:"Stage 6",                  events:[],                                           afternoonTea:"Sydney Boys" },
  { id:"ONG00042", name:"Christian Ong",                 portfolio:"Wellbeing",                      role:"Stage 6",                  events:["Senior Play – Cosi"],                       afternoonTea:"North Sydney Girls" },
];

// name → prefect ID map (lowercase keys)
const NAME_MAP = {
  "avaneesh siva":"SIVA0021","aman qadri":"QADRI011","christian k":"KEANE011",
  "will mcfarlane":"MCFAR011","sean l":"LIN00671","wes jenner":"JENNE021",
  "charley hetherington":"HETHE011","charley h":"HETHE011","ethan healy":"HEALY021",
  "tj wongpim":"WONGP011","reyaan prasad":"PRASA012","reyaan p":"PRASA012",
  "james smart":"SMART031","peter yates":"YATES051","freddie allen":"ALLEN132",
  "lachlan morris":"MORRI191","harry burwood":"BURWO014","mac arnott":"ARNOT012",
  "theo jp":"JACOB041","theo j-p":"JACOB041","alexander sands":"SANDS012",
  "james pallant":"PALLA012","matthew phipson":"PHIPS021","hayden son":"SON00011",
  "dylan":"ZHOU0451","james kim":"KIM00571","isaac marks":"MARKS012",
  "luca booth":"BOOTH041","harrison wall":"WALL0031","mani":"KHANN041",
  "drake houghton":"HOUGH032","lewis":"CHRIS041","kabir dutt":"DUTT0011",
  "wes":"JENNE021","cyrus fong":"FONG0101","harry phipps":"PHIPP052",
  "miles phijidvijan":"PHIJI012","miles phijidvijan":"PHIJI012","miles":"PHIJI012",
  "jack straw":"STRAW021","freddy pedersen":"PEDER011","albert wang":"WANG0551",
  "jacob zou":"ZOU00081","benjamin baker":"BAKER142","christian ong":"ONG00042",
  "xavier senini":"SENIN011","ryan zheng":"ZHENG221","rainier liu":"LIU00411",
  "ryan you":"YOU00011","toby turner":"TURNE162","ashok reddy":"REDDY031",
  "oscar peterkin":"PETER111","jacob cartwright":"CARTW021","nicholas williams":"WILLI302",
  "nick williams":"WILLI302","alexander wan":"WAN00151","summer chen":"CHEN0981",
  "shafin azad":"AZAD0011","toby grellman":"GRELL113","lucas johnston":"JOHNS381",
  "aiden lok":"LOK00041","korben pitman":"PITMA031","hamish mcwilliam":"MCWIL041",
  "harry tong":"TONG0111","frankie liu":"LIU00491","yilun zhang":"ZHANG981",
  "ryan low":"LOW00012","matthew tham":"THAM0021","william boyfield":"BOYFI011",
  "alexander ryan":"RYAN0032","alex ryan":"RYAN0032","joseph kim":"KIM00611",
  "kyle strydom":"STRYD021","max baker":"BAKER151","chris neal":"NEAL0022",
  "sam hughes":"HUGHE181","samuel hughes":"HUGHE181",
};

const PREFECT_BY_ID = Object.fromEntries(PREFECTS.map(p => [p.id, p]));

function resolveName(raw) {
  if (!raw) return null;
  const key = raw.toLowerCase().trim();
  const id = NAME_MAP[key];
  return id ? PREFECT_BY_ID[id] : null;
}

// ── SCHEDULE DATA ─────────────────────────────────────────────────────────────
const SCHEDULE = {
  A: {
    morning: {
      Monday:    [["Avaneesh Siva","Warrawee Station"],["Aman Qadri","Warrawee Station"],["Christian K","Borambil Gate"],["Will McFarlane","Borambil Gate"],["Sean L","Woodville Gate"],["Wes Jenner","Woodville Gate"]],
      Tuesday:   [["Charley Hetherington","Warrawee Station"],["Ethan Healy","Warrawee Station"],["TJ Wongpim","Borambil Gate"],["Reyaan Prasad","Borambil Gate"],["James Smart","Woodville Gate"],["Martin Li","Woodville Gate"]],
      Wednesday: [["Peter Yates","Warrawee Station"],["Freddie Allen","Warrawee Station"],["Lachlan Morris","Borambil Gate"],["Harry Burwood","Borambil Gate"],["Mac Arnott","Woodville Gate"],["Theo JP","Woodville Gate"]],
      Thursday:  [["Alexander Sands","Warrawee Station"],["James Pallant","Warrawee Station"],["Matthew Phipson","Borambil Gate"],["Hayden Son","Borambil Gate"],["Dylan","Woodville Gate"],["James Kim","Woodville Gate"]],
      Friday:    [["Isaac Marks","Warrawee Station"],["Luca Booth","Warrawee Station"],["Harrison Wall","Borambil Gate"],["Mani","Borambil Gate"]],
    },
    japac: {
      Monday:    [["Reyaan P","JAPAC Lounge"],["Ashok Reddy","JAPAC Lounge"],["Oscar Peterkin","JAPAC Rec Area"],["Jacob Cartwright","JAPAC Rec Area"]],
      Tuesday:   [],
      Wednesday: [["Nicholas Williams","JAPAC Lounge"],["Alexander Sands","JAPAC Lounge"],["Miles","JAPAC Rec Area"],["Jack Straw","JAPAC Rec Area"]],
      Thursday:  [["Alexander Wan","JAPAC Lounge"],["Summer Chen","JAPAC Lounge"],["Shafin Azad","JAPAC Rec Area"],["Toby Grellman","JAPAC Rec Area"]],
      Friday:    [["Luca Booth","JAPAC Lounge"],["Isaac Marks","JAPAC Lounge"],["Harrison Wall","JAPAC Rec Area"],["Lucas Johnston","JAPAC Rec Area"]],
    },
    aogc: {
      Monday:    [["Korben Pitman","AoGC Level 2"]],
      Tuesday:   [["Ryan Low","AoGC Level 1"],["Matthew Tham","AoGC Level 1"]],
      Wednesday: [["Yilun Zhang","AoGC Level 1"],["Ryan Zheng","AoGC Level 1"],["Mac Arnott","AoGC Level 2"],["Theo J-P","AoGC Level 2"]],
      Thursday:  [["Lachlan Morris","AoGC Level 1"],["Harry Burwood","AoGC Level 1"],["Rainier Liu","AoGC Level 2"],["Harry Tong","AoGC Level 2"]],
      Friday:    [["William Boyfield","AoGC Level 1"],["Aiden Lok","AoGC Level 1"],["Alexander Ryan","AoGC Level 2"],["Joseph Kim","AoGC Level 2"]],
    },
  },
  B: {
    morning: {
      Monday:    [["Avaneesh Siva","Warrawee Station"],["Aman Qadri","Warrawee Station"],["Christian K","Borambil Gate"],["Sean L","Borambil Gate"],["Toby Turner","Woodville Gate"]],
      Tuesday:   [["Drake Houghton","Warrawee Station"],["Lewis","Warrawee Station"],["Kabir Dutt","Borambil Gate"],["Wes","Borambil Gate"],["Martin Li","Woodville Gate"],["James Kim","Woodville Gate"]],
      Wednesday: [["Cyrus Fong","Warrawee Station"],["Harry Phipps","Warrawee Station"],["Peter Yates","Borambil Gate"],["Freddie Allen","Borambil Gate"],["Miles Phijidvijan","Woodville Gate"],["Jack Straw","Woodville Gate"]],
      Thursday:  [["Will McFarlane","Warrawee Station"],["Freddy Pedersen","Warrawee Station"],["Albert Wang","Borambil Gate"],["Jacob Zou","Borambil Gate"],["Benjamin Baker","Woodville Gate"],["Christian Ong","Woodville Gate"]],
      Friday:    [["Xavier Senini","Warrawee Station"],["Ryan Zheng","Warrawee Station"],["Rainier Liu","Borambil Gate"],["Ryan You","Borambil Gate"]],
    },
    japac: {
      Monday:    [["Charley H","JAPAC Lounge"],["Ashok Reddy","JAPAC Lounge"],["Hamish McWilliam","JAPAC Rec Area"],["Toby Turner","JAPAC Rec Area"]],
      Tuesday:   [["Aiden Lok","JAPAC Lounge"],["Korben Pitman","JAPAC Lounge"],["Matthew Phipson","JAPAC Rec Area"],["Drake Houghton","JAPAC Rec Area"]],
      Wednesday: [["Oscar Peterkin","JAPAC Lounge"],["TJ Wongpim","JAPAC Lounge"],["Benjamin Baker","JAPAC Rec Area"],["Christian Ong","JAPAC Rec Area"]],
      Thursday:  [["Toby Grellman","JAPAC Lounge"],["Shafin Azad","JAPAC Lounge"],["Alexander Wan","JAPAC Rec Area"],["Summer Chen","JAPAC Rec Area"]],
      Friday:    [["Harry Phipps","JAPAC Lounge"],["Cyrus Fong","JAPAC Lounge"],["Lucas Johnston","JAPAC Rec Area"],["Joseph Kim","JAPAC Rec Area"]],
    },
    aogc: {
      Monday:    [["Yilun Zhang","AoGC Level 1"],["Xavier Senini","AoGC Level 1"],["Frankie Liu","AoGC Level 2"],["Ryan You","AoGC Level 2"]],
      Tuesday:   [["Kyle Strydom","AoGC Level 1"],["Hayden Son","AoGC Level 1"],["Max Baker","AoGC Level 2"],["Alex Ryan","AoGC Level 2"]],
      Wednesday: [["Frankie Liu","AoGC Level 1"],["Ryan You","AoGC Level 1"],["Nick Williams","AoGC Level 2"],["Hamish McWilliam","AoGC Level 2"]],
      Thursday:  [["Chris Neal","AoGC Level 1"],["Sam Hughes","AoGC Level 1"],["James Pallant","AoGC Level 2"],["Kabir Dutt","AoGC Level 2"]],
      Friday:    [["William Boyfield","AoGC Level 1"],["Jacob Cartwright","AoGC Level 1"],["Albert Wang","AoGC Level 2"],["Jacob Zou","AoGC Level 2"]],
    },
  },
};

// ── CODE 39 BARCODE ───────────────────────────────────────────────────────────
const C39 = {
  "0":"000110100","1":"100100001","2":"001100001","3":"101100000","4":"000110001",
  "5":"100110000","6":"001110000","7":"000100101","8":"100100100","9":"001100100",
  "A":"100001001","B":"001001001","C":"101001000","D":"000011001","E":"100011000",
  "F":"001011000","G":"000001101","H":"100001100","I":"001001100","J":"000011100",
  "K":"100000011","L":"001000011","M":"101000010","N":"000010011","O":"100010010",
  "P":"001010010","Q":"000000111","R":"100000110","S":"001000110","T":"000010110",
  "U":"110000001","V":"011000001","W":"111000000","X":"010010001","Y":"110010000",
  "Z":"011010000","-":"010000101",".":"110000100"," ":"011000100","*":"010010100",
  "$":"010101000","/":"010100010","+":"010001010","%":"000101010",
};

function Barcode({ value }) {
  const N = 2, W = 6, GAP = 2, BH = 72;
  const chars = ["*", ...value.toUpperCase().split(""), "*"];
  const rects = [];
  let x = 0;
  chars.forEach((ch, ci) => {
    const pat = C39[ch]; if (!pat) return;
    for (let i = 0; i < 9; i++) {
      const w = pat[i] === "1" ? W : N;
      if (i % 2 === 0) rects.push(<rect key={`${ci}-${i}`} x={x} y={0} width={w} height={BH} fill="#0a0a0a" />);
      x += w;
    }
    if (ci < chars.length - 1) x += GAP;
  });
  return (
    <div style={{ background:"#fff", padding:"16px 20px 10px", borderRadius:10, display:"inline-block", boxShadow:"0 4px 24px rgba(0,0,0,0.4)" }}>
      <svg width={x} height={BH}>{rects}</svg>
      <div style={{ textAlign:"center", fontFamily:"'Courier New',monospace", fontSize:13, marginTop:8, color:"#111", letterSpacing:2 }}>{value}</div>
    </div>
  );
}

// ── PORTFOLIO COLOUR MAP ──────────────────────────────────────────────────────
const PORT_COLORS = {
  "Prefect Executive":"#c4920f","Prefect Executive (Head Prefect)":"#c4920f",
  "Academic":"#3b82f6","Boarding":"#8b5cf6","Co-Curricular":"#06b6d4",
  "Community":"#10b981","F&S":"#f59e0b","House":"#ef4444",
  "Social Justice":"#ec4899","Sport":"#14b8a6","Wellbeing":"#a78bfa",
};

function portfolioColor(p) { return PORT_COLORS[p] || "#6b7280"; }

// ── GATE COLOUR MAP ───────────────────────────────────────────────────────────
const GATE_COLORS = {
  "Warrawee Station":"#3b82f6","Borambil Gate":"#10b981","Woodville Gate":"#f59e0b",
  "JAPAC Lounge":"#8b5cf6","JAPAC Rec Area":"#ec4899",
  "AoGC Level 1":"#06b6d4","AoGC Level 2":"#ef4444",
};
function gateColor(g) { return GATE_COLORS[g] || "#6b7280"; }

// ── PREFECT CARD ──────────────────────────────────────────────────────────────
function PrefectCard({ rawName, location, onClick }) {
  const p = resolveName(rawName);
  const displayName = p ? p.name : rawName;
  const loc = location;
  return (
    <button onClick={() => onClick(p, rawName, loc)}
      style={{
        background:"linear-gradient(135deg,#0f2444 0%,#0a1a35 100%)",
        border:`1px solid ${loc ? gateColor(loc) : "#1e3a5f"}`,
        borderRadius:12, padding:"14px 16px", textAlign:"left", cursor:"pointer",
        transition:"all 0.18s", display:"flex", flexDirection:"column", gap:6,
        width:"100%",
      }}
      onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow=`0 8px 24px rgba(0,0,0,0.4)`; }}
      onMouseLeave={e=>{ e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=""; }}
    >
      {loc && (
        <span style={{ fontSize:10, fontWeight:700, letterSpacing:1.2, color: gateColor(loc), textTransform:"uppercase" }}>{loc}</span>
      )}
      <span style={{ fontSize:15, fontWeight:600, color:"#f0f4ff" }}>{displayName}</span>
      {p ? (
        <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginTop:2 }}>
          <span style={{ fontSize:10, padding:"2px 8px", borderRadius:20, background: portfolioColor(p.portfolio)+"22", color: portfolioColor(p.portfolio), fontWeight:600, letterSpacing:0.5 }}>{p.portfolio}</span>
          <span style={{ fontSize:10, padding:"2px 8px", borderRadius:20, background:"#ffffff11", color:"#94a3b8", fontWeight:500 }}>{p.role}</span>
        </div>
      ) : (
        <span style={{ fontSize:11, color:"#64748b" }}>Not in directory</span>
      )}
      {p && <span style={{ fontSize:10, color:"#475569", fontFamily:"monospace", letterSpacing:1 }}>{p.id}</span>}
    </button>
  );
}

// ── PREFECT DETAIL MODAL ──────────────────────────────────────────────────────
function PrefectModal({ prefect, rawName, location, onClose }) {
  const [showBarcode, setShowBarcode] = useState(false);
  const p = prefect;

  return (
    <div style={{
      position:"fixed", inset:0, background:"rgba(0,0,10,0.8)", display:"flex",
      alignItems:"center", justifyContent:"center", zIndex:1000, padding:20,
      backdropFilter:"blur(6px)"
    }} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{
        background:"linear-gradient(160deg,#0d1f3c 0%,#071428 100%)",
        border:"1px solid #1e3a6e", borderRadius:20, padding:32, maxWidth:480,
        width:"100%", position:"relative", boxShadow:"0 20px 60px rgba(0,0,0,0.7)"
      }}>
        <button onClick={onClose} style={{
          position:"absolute", top:16, right:16, background:"#ffffff12",
          border:"none", borderRadius:8, color:"#94a3b8", cursor:"pointer",
          padding:"4px 10px", fontSize:18, lineHeight:1
        }}>✕</button>

        {p ? (
          <>
            <div style={{ marginBottom:20 }}>
              <div style={{ display:"flex", alignItems:"flex-start", gap:14 }}>
                <div style={{
                  width:52, height:52, borderRadius:14,
                  background: portfolioColor(p.portfolio)+"33",
                  border:`2px solid ${portfolioColor(p.portfolio)}`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:22, color: portfolioColor(p.portfolio), flexShrink:0
                }}>
                  {p.name.charAt(0)}
                </div>
                <div>
                  <h2 style={{ margin:0, fontSize:22, fontWeight:700, color:"#f0f4ff" }}>{p.name}</h2>
                  <span style={{ fontSize:12, fontFamily:"monospace", color:"#64748b", letterSpacing:1.5 }}>{p.id}</span>
                </div>
              </div>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:20 }}>
              {[
                ["Portfolio", p.portfolio, portfolioColor(p.portfolio)],
                ["Role", p.role, "#94a3b8"],
              ].map(([label, val, col]) => (
                <div key={label} style={{ background:"#ffffff08", borderRadius:10, padding:"10px 14px" }}>
                  <div style={{ fontSize:10, color:"#64748b", fontWeight:600, letterSpacing:1, textTransform:"uppercase", marginBottom:4 }}>{label}</div>
                  <div style={{ fontSize:13, color: col, fontWeight:600 }}>{val}</div>
                </div>
              ))}
            </div>

            {location && (
              <div style={{ background:"#ffffff08", borderRadius:10, padding:"10px 14px", marginBottom:12 }}>
                <div style={{ fontSize:10, color:"#64748b", fontWeight:600, letterSpacing:1, textTransform:"uppercase", marginBottom:4 }}>Assigned Location</div>
                <div style={{ fontSize:13, fontWeight:600, color: gateColor(location) }}>{location}</div>
              </div>
            )}

            {p.events.length > 0 && (
              <div style={{ background:"#ffffff08", borderRadius:10, padding:"10px 14px", marginBottom:12 }}>
                <div style={{ fontSize:10, color:"#64748b", fontWeight:600, letterSpacing:1, textTransform:"uppercase", marginBottom:8 }}>Events</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                  {p.events.map(ev => (
                    <span key={ev} style={{ fontSize:11, padding:"3px 10px", borderRadius:20, background:"#c4920f22", color:"#c4920f", fontWeight:500 }}>{ev}</span>
                  ))}
                </div>
              </div>
            )}

            {p.afternoonTea && (
              <div style={{ background:"#ffffff08", borderRadius:10, padding:"10px 14px", marginBottom:20 }}>
                <div style={{ fontSize:10, color:"#64748b", fontWeight:600, letterSpacing:1, textTransform:"uppercase", marginBottom:4 }}>Afternoon Tea</div>
                <div style={{ fontSize:13, color:"#10b981", fontWeight:500 }}>{p.afternoonTea}</div>
              </div>
            )}

            <button onClick={() => setShowBarcode(!showBarcode)} style={{
              width:"100%", padding:"11px 0", borderRadius:10,
              background: showBarcode ? "#1e3a5f" : "linear-gradient(90deg,#c4920f,#e6b040)",
              border:"none", color: showBarcode ? "#94a3b8" : "#0a1a2e",
              fontWeight:700, fontSize:14, cursor:"pointer", letterSpacing:0.5,
              transition:"all 0.2s"
            }}>
              {showBarcode ? "Hide Barcode" : "🔳 Show ID Barcode"}
            </button>

            {showBarcode && (
              <div style={{ marginTop:20, display:"flex", justifyContent:"center", overflowX:"auto" }}>
                <Barcode value={p.id} />
              </div>
            )}
          </>
        ) : (
          <div style={{ textAlign:"center", padding:"20px 0" }}>
            <div style={{ fontSize:40, marginBottom:12 }}>👤</div>
            <h3 style={{ color:"#f0f4ff", margin:"0 0 8px" }}>{rawName}</h3>
            <p style={{ color:"#64748b", fontSize:13 }}>This prefect is not in the main directory.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ── DAYS + TABS ───────────────────────────────────────────────────────────────
const DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday"];
const DUTY_TABS = [
  { key:"morning", label:"Morning Gate", icon:"🌅", note:"7:45 am sharp" },
  { key:"japac",   label:"JAPAC Lunch",  icon:"🍽️", note:"JAPAC Building" },
  { key:"aogc",    label:"AoGC Lunch",   icon:"🏛️", note:"AoGC Building" },
];

// ── SEARCH VIEW ───────────────────────────────────────────────────────────────
function SearchView({ query, setQuery, onSelectPrefect }) {
  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    return PREFECTS.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.id.toLowerCase().includes(q) ||
      p.portfolio.toLowerCase().includes(q) ||
      p.role.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div>
      <div style={{ position:"relative", marginBottom:24 }}>
        <span style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", fontSize:18 }}>🔍</span>
        <input
          autoFocus
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search by name, student ID, portfolio or role…"
          style={{
            width:"100%", padding:"13px 16px 13px 44px", borderRadius:12,
            background:"#0f2444", border:"1px solid #1e3a6e",
            color:"#f0f4ff", fontSize:15, outline:"none", boxSizing:"border-box",
          }}
        />
      </div>
      {query && results.length === 0 && (
        <div style={{ textAlign:"center", color:"#475569", padding:"40px 0" }}>No prefects found for "{query}"</div>
      )}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:12 }}>
        {results.map(p => (
          <button key={p.id} onClick={() => onSelectPrefect(p, p.name, null)}
            style={{
              background:"linear-gradient(135deg,#0f2444 0%,#0a1a35 100%)",
              border:`1px solid ${portfolioColor(p.portfolio)}44`,
              borderRadius:12, padding:"14px 16px", textAlign:"left", cursor:"pointer",
              transition:"all 0.18s",
            }}
            onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-2px)"; }}
            onMouseLeave={e=>{ e.currentTarget.style.transform=""; }}
          >
            <div style={{ fontWeight:700, fontSize:15, color:"#f0f4ff", marginBottom:4 }}>{p.name}</div>
            <div style={{ fontSize:10, fontFamily:"monospace", color:"#64748b", letterSpacing:1.5, marginBottom:8 }}>{p.id}</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
              <span style={{ fontSize:10, padding:"2px 8px", borderRadius:20, background: portfolioColor(p.portfolio)+"22", color: portfolioColor(p.portfolio), fontWeight:600 }}>{p.portfolio}</span>
              <span style={{ fontSize:10, padding:"2px 8px", borderRadius:20, background:"#ffffff10", color:"#94a3b8" }}>{p.role}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ── GROUP BY LOCATION ─────────────────────────────────────────────────────────
function groupByLocation(entries) {
  const groups = {};
  entries.forEach(([name, loc]) => {
    if (!groups[loc]) groups[loc] = [];
    groups[loc].push(name);
  });
  return groups;
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────
export default function KnoxPrefectRoster() {
  const [week, setWeek]          = useState("A");
  const [day, setDay]            = useState("Monday");
  const [duty, setDuty]          = useState("morning");
  const [modal, setModal]        = useState(null); // { prefect, rawName, location }
  const [activeView, setView]    = useState("schedule"); // 'schedule' | 'search'
  const [searchQuery, setSearch] = useState("");

  const entries = SCHEDULE[week]?.[duty]?.[day] || [];

  // Find all duties for a prefect across the whole schedule
  function getAllDutiesForPrefect(pid) {
    const duties = [];
    ["A","B"].forEach(w => {
      ["morning","japac","aogc"].forEach(d => {
        DAYS.forEach(day => {
          (SCHEDULE[w][d][day]||[]).forEach(([name,loc]) => {
            const p = resolveName(name);
            if (p && p.id === pid) duties.push({ week:`Week ${w}`, day, type:d, location:loc });
          });
        });
      });
    });
    return duties;
  }

  const openModal = (p, raw, loc) => {
    let enriched = p;
    if (p) {
      const duties = getAllDutiesForPrefect(p.id);
      enriched = { ...p, allDuties: duties };
    }
    setModal({ prefect: enriched, rawName: raw, location: loc });
  };

  return (
    <div style={{
      minHeight:"100vh", background:"#060f1e",
      fontFamily:"'Segoe UI',system-ui,sans-serif", color:"#f0f4ff",
    }}>
      {/* ── HEADER ── */}
      <div style={{
        background:"linear-gradient(180deg,#071a38 0%,#060f1e 100%)",
        borderBottom:"1px solid #1e3a6e", padding:"18px 28px",
        display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12,
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:14 }}>
          <div style={{
            width:44, height:44, borderRadius:10,
            background:"linear-gradient(135deg,#c4920f,#e6b040)",
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:22, fontWeight:900, color:"#071a38"
          }}>K</div>
          <div>
            <div style={{ fontSize:18, fontWeight:800, letterSpacing:0.5 }}>Knox Prefect Roster</div>
            <div style={{ fontSize:11, color:"#64748b", letterSpacing:1 }}>2025–26 · Gate & Lunch Duties</div>
          </div>
        </div>
        {/* Nav */}
        <div style={{ display:"flex", gap:8 }}>
          {[["schedule","📅 Schedule"],["search","🔍 Search"]].map(([v,label]) => (
            <button key={v} onClick={() => setView(v)} style={{
              padding:"8px 16px", borderRadius:9,
              background: activeView===v ? "linear-gradient(90deg,#c4920f,#e6b040)" : "#0f2444",
              border: activeView===v ? "none" : "1px solid #1e3a6e",
              color: activeView===v ? "#0a1a2e" : "#94a3b8",
              fontWeight: activeView===v ? 700 : 500, fontSize:13, cursor:"pointer",
            }}>{label}</button>
          ))}
        </div>
      </div>

      <div style={{ padding:"24px 28px", maxWidth:1100, margin:"0 auto" }}>

        {activeView === "search" ? (
          <SearchView query={searchQuery} setQuery={setSearch} onSelectPrefect={openModal} />
        ) : (
          <>
            {/* ── WEEK + DAY SELECTOR ── */}
            <div style={{ display:"flex", flexWrap:"wrap", gap:20, marginBottom:22, alignItems:"center" }}>
              {/* Week toggle */}
              <div style={{ display:"flex", background:"#0f2444", borderRadius:10, padding:4, gap:4 }}>
                {["A","B"].map(w => (
                  <button key={w} onClick={() => setWeek(w)} style={{
                    padding:"7px 20px", borderRadius:7, border:"none",
                    background: week===w ? "linear-gradient(90deg,#c4920f,#e6b040)" : "transparent",
                    color: week===w ? "#0a1a2e" : "#64748b",
                    fontWeight:700, fontSize:14, cursor:"pointer", transition:"all 0.15s",
                  }}>Week {w}</button>
                ))}
              </div>
              {/* Day pills */}
              <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                {DAYS.map(d => (
                  <button key={d} onClick={() => setDay(d)} style={{
                    padding:"7px 14px", borderRadius:8, border:"1px solid",
                    borderColor: day===d ? "#c4920f" : "#1e3a6e",
                    background: day===d ? "#c4920f18" : "transparent",
                    color: day===d ? "#e6b040" : "#64748b",
                    fontWeight: day===d ? 700 : 500, fontSize:13, cursor:"pointer",
                    transition:"all 0.15s",
                  }}>{d}</button>
                ))}
              </div>
            </div>

            {/* ── DUTY TYPE TABS ── */}
            <div style={{ display:"flex", gap:10, marginBottom:24, flexWrap:"wrap" }}>
              {DUTY_TABS.map(tab => (
                <button key={tab.key} onClick={() => setDuty(tab.key)} style={{
                  padding:"10px 18px", borderRadius:10, border:"1px solid",
                  borderColor: duty===tab.key ? "#c4920f" : "#1e3a6e",
                  background: duty===tab.key ? "#c4920f18" : "#0f2444",
                  color: duty===tab.key ? "#e6b040" : "#94a3b8",
                  fontWeight: duty===tab.key ? 700 : 500, fontSize:13, cursor:"pointer",
                  display:"flex", alignItems:"center", gap:7, transition:"all 0.15s",
                }}>
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                  <span style={{ fontSize:10, color:"#475569" }}>{tab.note}</span>
                </button>
              ))}
            </div>

            {/* ── HEADER LABEL ── */}
            <div style={{ marginBottom:16 }}>
              <h2 style={{ margin:0, fontSize:20, fontWeight:700 }}>
                {DUTY_TABS.find(t=>t.key===duty)?.label}
                <span style={{ color:"#c4920f", marginLeft:10 }}>
                  {day} · Week {week}
                </span>
              </h2>
              {entries.length === 0 && (
                <p style={{ color:"#475569", marginTop:8, fontSize:14 }}>No duties scheduled for this slot.</p>
              )}
            </div>

            {/* ── PREFECT GRID GROUPED BY LOCATION ── */}
            {(() => {
              const groups = groupByLocation(entries);
              return Object.keys(groups).map(loc => (
                <div key={loc} style={{ marginBottom:28 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
                    <div style={{ width:4, height:20, borderRadius:2, background: gateColor(loc) }} />
                    <span style={{ fontSize:13, fontWeight:700, color: gateColor(loc), letterSpacing:0.8, textTransform:"uppercase" }}>{loc}</span>
                    <span style={{ fontSize:11, color:"#475569" }}>— {groups[loc].length} prefect{groups[loc].length>1?"s":""}</span>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:10 }}>
                    {groups[loc].map((name, i) => (
                      <PrefectCard key={i} rawName={name} location={loc} onClick={openModal} />
                    ))}
                  </div>
                </div>
              ));
            })()}
          </>
        )}
      </div>

      {/* ── MODAL ── */}
      {modal && (
        <EnrichedModal
          prefect={modal.prefect}
          rawName={modal.rawName}
          location={modal.location}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}

// ── ENRICHED MODAL WITH ALL DUTIES ───────────────────────────────────────────
function EnrichedModal({ prefect, rawName, location, onClose }) {
  const [showBarcode, setShowBarcode] = useState(false);
  const p = prefect;

  return (
    <div style={{
      position:"fixed", inset:0, background:"rgba(0,5,20,0.85)", display:"flex",
      alignItems:"center", justifyContent:"center", zIndex:1000, padding:20,
      backdropFilter:"blur(8px)"
    }} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{
        background:"linear-gradient(160deg,#0d1f3c 0%,#071428 100%)",
        border:"1px solid #1e3a6e", borderRadius:20, padding:28,
        maxWidth:520, width:"100%", maxHeight:"90vh", overflowY:"auto",
        position:"relative", boxShadow:"0 24px 80px rgba(0,0,0,0.8)"
      }}>
        <button onClick={onClose} style={{
          position:"absolute", top:16, right:16, background:"#ffffff12",
          border:"none", borderRadius:8, color:"#94a3b8", cursor:"pointer",
          padding:"4px 12px", fontSize:16,
        }}>✕</button>

        {p ? (
          <>
            {/* Header */}
            <div style={{ display:"flex", alignItems:"flex-start", gap:14, marginBottom:22 }}>
              <div style={{
                width:54, height:54, borderRadius:14, flexShrink:0,
                background: portfolioColor(p.portfolio)+"33",
                border:`2px solid ${portfolioColor(p.portfolio)}`,
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:24, color: portfolioColor(p.portfolio), fontWeight:700,
              }}>{p.name.charAt(0)}</div>
              <div>
                <h2 style={{ margin:"0 0 2px", fontSize:21, fontWeight:800 }}>{p.name}</h2>
                <span style={{ fontSize:12, fontFamily:"monospace", color:"#64748b", letterSpacing:1.5 }}>{p.id}</span>
              </div>
            </div>

            {/* Role / Portfolio */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:14 }}>
              {[["Portfolio",p.portfolio,portfolioColor(p.portfolio)],["Role",p.role,"#94a3b8"]].map(([l,v,c])=>(
                <div key={l} style={{ background:"#ffffff08", borderRadius:10, padding:"10px 14px" }}>
                  <div style={{ fontSize:10, color:"#64748b", fontWeight:600, letterSpacing:1, textTransform:"uppercase", marginBottom:4 }}>{l}</div>
                  <div style={{ fontSize:13, color:c, fontWeight:600 }}>{v}</div>
                </div>
              ))}
            </div>

            {/* Current location if opened from schedule */}
            {location && (
              <div style={{ background:"#ffffff08", borderRadius:10, padding:"10px 14px", marginBottom:14 }}>
                <div style={{ fontSize:10, color:"#64748b", fontWeight:600, letterSpacing:1, textTransform:"uppercase", marginBottom:4 }}>Assigned Location (this slot)</div>
                <div style={{ fontSize:13, color: gateColor(location), fontWeight:600 }}>{location}</div>
              </div>
            )}

            {/* All Duties */}
            {p.allDuties && p.allDuties.length > 0 && (
              <div style={{ background:"#ffffff08", borderRadius:10, padding:"12px 14px", marginBottom:14 }}>
                <div style={{ fontSize:10, color:"#64748b", fontWeight:600, letterSpacing:1, textTransform:"uppercase", marginBottom:10 }}>All Scheduled Duties</div>
                <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                  {p.allDuties.map((d,i) => (
                    <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", fontSize:12 }}>
                      <span style={{ color:"#94a3b8" }}>{d.week} · {d.day}</span>
                      <div style={{ display:"flex", gap:6 }}>
                        <span style={{ padding:"2px 8px", borderRadius:20, fontSize:10, background:"#ffffff10", color:"#94a3b8" }}>{DUTY_TABS.find(t=>t.key===d.type)?.label}</span>
                        <span style={{ padding:"2px 8px", borderRadius:20, fontSize:10, background: gateColor(d.location)+"22", color: gateColor(d.location) }}>{d.location}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Events */}
            {p.events.length > 0 && (
              <div style={{ background:"#ffffff08", borderRadius:10, padding:"10px 14px", marginBottom:14 }}>
                <div style={{ fontSize:10, color:"#64748b", fontWeight:600, letterSpacing:1, textTransform:"uppercase", marginBottom:8 }}>Events</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                  {p.events.map(ev => <span key={ev} style={{ fontSize:11, padding:"3px 10px", borderRadius:20, background:"#c4920f22", color:"#c4920f", fontWeight:500 }}>{ev}</span>)}
                </div>
              </div>
            )}

            {/* Afternoon Tea */}
            {p.afternoonTea && (
              <div style={{ background:"#ffffff08", borderRadius:10, padding:"10px 14px", marginBottom:20 }}>
                <div style={{ fontSize:10, color:"#64748b", fontWeight:600, letterSpacing:1, textTransform:"uppercase", marginBottom:4 }}>Afternoon Tea</div>
                <div style={{ fontSize:13, color:"#10b981", fontWeight:500 }}>{p.afternoonTea}</div>
              </div>
            )}

            {/* Barcode */}
            <button onClick={() => setShowBarcode(!showBarcode)} style={{
              width:"100%", padding:"12px 0", borderRadius:10,
              background: showBarcode ? "#1e3a5f" : "linear-gradient(90deg,#c4920f,#e6b040)",
              border:"none", color: showBarcode ? "#94a3b8" : "#071428",
              fontWeight:700, fontSize:14, cursor:"pointer", transition:"all 0.2s"
            }}>
              {showBarcode ? "Hide Barcode" : "🔳 Show ID Barcode (Code 39)"}
            </button>
            {showBarcode && (
              <div style={{ marginTop:20, display:"flex", justifyContent:"center", overflowX:"auto" }}>
                <Barcode value={p.id} />
              </div>
            )}
          </>
        ) : (
          <div style={{ textAlign:"center", padding:"24px 0" }}>
            <div style={{ fontSize:48, marginBottom:12 }}>👤</div>
            <h3 style={{ color:"#f0f4ff", margin:"0 0 8px" }}>{rawName}</h3>
            <p style={{ color:"#64748b", fontSize:13 }}>This name doesn't match any prefect in the directory.</p>
          </div>
        )}
      </div>
    </div>
  );
}
