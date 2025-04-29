// Feng Shui Simple Report Generator – Enhanced Version
// Includes: Four Pillars, Five Element Analysis, and Five Destiny Aspects

const heavenlyStems = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const earthlyBranches = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

function getStemBranch(yearOffset) {
  const stem = heavenlyStems[yearOffset % 10];
  const branch = earthlyBranches[yearOffset % 12];
  return `${stem}${branch}`;
}

function calculateBaZi(birthdate, birthtime) {
  const date = new Date(`${birthdate}T${birthtime}`);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();

  const yearOffset = year - 1984;
  const yearPillar = getStemBranch(yearOffset);
  const monthBranch = earthlyBranches[(month + 1) % 12];
  const monthStem = heavenlyStems[(month + yearOffset) % 10];
  const monthPillar = `${monthStem}${monthBranch}`;
  const dayStem = heavenlyStems[(day + 2) % 10];
  const dayBranch = earthlyBranches[(day + 4) % 12];
  const dayPillar = `${dayStem}${dayBranch}`;
  const hourIndex = Math.floor((hour + 1) / 2) % 12;
  const hourBranch = earthlyBranches[hourIndex];
  const hourStem = heavenlyStems[(hourIndex + (day + 2)) % 10];
  const hourPillar = `${hourStem}${hourBranch}`;

  return {
    yearPillar,
    monthPillar,
    dayPillar,
    hourPillar,
    dayStem,
    fiveElements: getFiveElements([yearPillar, monthPillar, dayPillar, hourPillar])
  };
}

function getFiveElements(pillars) {
  const elementMap = {
    "甲": "Wood", "乙": "Wood",
    "丙": "Fire", "丁": "Fire",
    "戊": "Earth", "己": "Earth",
    "庚": "Metal", "辛": "Metal",
    "壬": "Water", "癸": "Water"
  };
  const elements = { Wood: 0, Fire: 0, Earth: 0, Metal: 0, Water: 0 };
  pillars.forEach(pillar => {
    const stem = pillar.charAt(0);
    if (elementMap[stem]) elements[elementMap[stem]]++;
  });
  return elements;
}

function analyzeFate(elements) {
  let dominant = "";
  let max = 0;
  for (const el in elements) {
    if (elements[el] > max) {
      dominant = el;
      max = elements[el];
    }
  }
  const balance = Object.values(elements).filter(x => x > 0).length;
  let summary = "";
  if (balance >= 4) {
    summary = "Your elements are well balanced. You are naturally resilient and adaptive.";
  } else if (max >= 3) {
    summary = `You are heavily influenced by ${dominant}. This defines both your strength and your challenge.`;
  } else {
    summary = "Your chart shows instability. Growth comes from mastering contrast and conflict.";
  }
  return { dominant, summary };
}
function luckyColor(el) {
  return {
    Wood: "Green or Light Blue",
    Fire: "Red or Orange",
    Earth: "Yellow or Brown",
    Metal: "White or Silver",
    Water: "Black or Dark Blue"
  }[el] || "Gray";
}

function generatePhilosophy(el) {
  return {
    Wood: "Even the strongest trees sway in the wind.",
    Fire: "Let your light warm, not burn.",
    Earth: "Steady steps pave lasting roads.",
    Metal: "Sharpness needs purpose.",
    Water: "Flow doesn't mean weakness—it means persistence."
  }[el] || "Balance is born of imbalance.";
}

function todaysFocus(el) {
  return {
    Wood: "Nurture something meaningful today.",
    Fire: "Express your truth with clarity.",
    Earth: "Organize and build your foundation.",
    Metal: "Refine your thoughts, reduce noise.",
    Water: "Stay fluid, but choose a direction."
  }[el];
}

// 命理五维度
function loveAdvice(el) {
  return {
    Wood: "You seek deep connection through shared ideals. Beware of overgiving.",
    Fire: "You love passionately and instantly—slowing down reveals depth.",
    Earth: "You are loyal but reserved—speak more of what you feel.",
    Metal: "You're protective in love—let softness guide your strength.",
    Water: "Your love runs deep—balance emotion with boundaries."
  }[el];
}

function careerAdvice(el) {
  return {
    Wood: "Creative fields, teaching, or social causes suit your ideals.",
    Fire: "Leadership, entrepreneurship, or media tap into your drive.",
    Earth: "Management, property, or consulting reward your stability.",
    Metal: "Law, tech, or finance align with your structure and sharpness.",
    Water: "Travel, psychology, and research fit your fluid intelligence."
  }[el];
}

function wealthAdvice(el) {
  return {
    Wood: "Wealth grows like a tree—consistency matters.",
    Fire: "You earn quickly—channel it wisely.",
    Earth: "Wealth accumulates steadily over time.",
    Metal: "You plan and protect wealth best when disciplined.",
    Water: "You sense financial opportunities—ride waves, but don’t chase storms."
  }[el];
}

function familyAdvice(el) {
  return {
    Wood: "You're the change-bringer—share roots, not just wings.",
    Fire: "You inspire but must pause to hear others.",
    Earth: "You're the rock—just remember to rest too.",
    Metal: "Standards are good—empathy makes them better.",
    Water: "You feel family deeply—guard your energy."
  }[el];
}

function warningAdvice(el) {
  return {
    Wood: "Don’t try to fix everyone—some things grow alone.",
    Fire: "Impulse is powerful—so is regret. Pause before action.",
    Earth: "Avoid stubborn clinging—flexibility doesn’t mean failure.",
    Metal: "Let go of perfection. It blocks connection.",
    Water: "Watch for emotional overflow. You’re deeper than you think."
  }[el];
}

// 输出报告
function generateSimpleReport(bazi, name) {
  const analysis = analyzeFate(bazi.fiveElements);
  const el = analysis.dominant;
  const color = luckyColor(el);
  const wisdom = generatePhilosophy(el);
  const focus = todaysFocus(el);

  document.getElementById("report-section").innerHTML = `
    <h2>Hello ${name}, here is your Personal Feng Shui Reading</h2>
    <h3>Four Pillars:</h3>
    <p><strong>Year:</strong> ${bazi.yearPillar} | <strong>Month:</strong> ${bazi.monthPillar}</p>
    <p><strong>Day:</strong> ${bazi.dayPillar} | <strong>Hour:</strong> ${bazi.hourPillar}</p>

    <h3>Elemental Distribution:</h3>
    <p>Wood: ${bazi.fiveElements.Wood}, Fire: ${bazi.fiveElements.Fire}, Earth: ${bazi.fiveElements.Earth}, Metal: ${bazi.fiveElements.Metal}, Water: ${bazi.fiveElements.Water}</p>

    <h3>Summary:</h3><p>${analysis.summary}</p>
    <h3>Love:</h3><p>${loveAdvice(el)}</p>
    <h3>Career:</h3><p>${careerAdvice(el)}</p>
    <h3>Wealth:</h3><p>${wealthAdvice(el)}</p>
    <h3>Family:</h3><p>${familyAdvice(el)}</p>
    <h3>Watch Out:</h3><p>${warningAdvice(el)}</p>

    <h3>🎨 Lucky Color Today:</h3><p><strong>${color}</strong></p>
    <h3>🎯 Today's Focus:</h3><p>${focus}</p>
    <h3>📖 Wisdom for the Day:</h3><p><em>"${wisdom}"</em></p>

    <div style="margin-top:30px; text-align:center;">
      <p>🌟 Want a full detailed chart with in-depth guidance?</p>
      <button onclick="redirectToPayment()" style="margin-top:20px; padding:12px 24px; background-color:#c7a76c; color:white; border:none; border-radius:8px; font-size:16px; cursor:pointer;">Get Full Report for $9.9</button>
    </div>
  `;
}

// 表单监听 + 支付跳转
document.getElementById("fengshui-form").addEventListener("submit", function (event) {
  event.preventDefault();
  const name = decodeURIComponent(document.getElementById("fullname").value);
  const birthdate = document.getElementById("birthdate").value;
  const birthtime = document.getElementById("birthtime").value;
  const baziResult = calculateBaZi(birthdate, birthtime);
  generateSimpleReport(baziResult, name);
});

function redirectToPayment() {
  const name = encodeURIComponent(document.getElementById("fullname").value);
  const birthdate = encodeURIComponent(document.getElementById("birthdate").value);
  const birthtime = encodeURIComponent(document.getElementById("birthtime").value);
  const birthplace = encodeURIComponent(document.getElementById("birthplace").value);
  const url = `/checkout.html?name=${name}&birthdate=${birthdate}&birthtime=${birthtime}&birthplace=${birthplace}`;
  window.location.href = url;
}
