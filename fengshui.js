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
    Wood: "As a Wood type, you love through growth and support. You bring nurturing energy and emotional generosity to relationships. Your ideals often inspire partners. However, you may overextend emotionally and expect the same growth from others. Avoid trying to shape someone else's path too forcefully.",
    Fire: "With dominant Fire energy, your love is intense and passionate. You're magnetic, expressive, and emotionally engaging. You create unforgettable romantic moments. However, your emotions can burn too fast or too strong. Learn to slow down and truly understand your partner’s rhythm.",
    Earth: "Earth elements love through consistency and loyalty. You provide grounding, patience, and long-term dedication. Your love is dependable and emotionally stable. Yet, you may suppress emotional needs or expect unspoken understanding. Open communication is vital—don't assume silence equals peace.",
    Metal: "Metal types express love with depth and discipline. You're protective and highly respectful of boundaries. Your love is serious and committed. However, you can be emotionally reserved and hard to read. Practice vulnerability—love doesn't always need rules.",
    Water: "Water-dominant types seek soul-level connection. You intuitively understand partners and love with fluid sensitivity. You are deeply devoted and emotionally present. Still, your moods can shift, and boundaries may blur. Learn to protect your own emotional flow while loving others."
  }[el];
}

function familyAdvice(el) {
  return {
    Wood: "Wood elements value growth and shared experiences in family. You foster learning, development, and support within the home. Your family ties are built on encouragement and mutual upliftment. However, you may impose ideals too strongly or avoid confrontation. Allow differences to coexist without needing resolution.",
    Fire: "Fire types bring joy, action, and drama into family life. You inspire passion and boldness in loved ones. You're often the emotional heartbeat of your household. Yet, your reactions can be intense, and tempers may flare quickly. Practice listening without reacting—warmth doesn't need to burn.",
    Earth: "Earth energy emphasizes duty and stability in family. You are the emotional pillar—reliable, present, and nurturing. Others lean on your calm. But you may carry too much responsibility or avoid change for comfort. Share burdens and allow space for evolution within family roles.",
    Metal: "Metal types seek structure, tradition, and respect in family. You hold high standards and deeply value heritage. Your loyalty is unwavering. However, rigidity may stifle emotional expression or growth. Invite messiness—it brings life into the framework.",
    Water: "Water elements create emotional connection within family. You are deeply attuned to others' feelings and emotional needs. Your home is often a sanctuary of compassion. Still, you may absorb others’ pain too easily or avoid directness. Set emotional filters to protect your peace."
  }[el];
}

function careerAdvice(el) {
  return {
    Wood: "Wood types thrive in careers tied to growth and innovation. You excel in education, design, health, or social change. You’re future-focused and value meaningful impact. However, scattered focus or stubborn idealism may limit progress. Stay rooted while reaching upward.",
    Fire: "Fire energy suits dynamic, expressive, or leadership roles. You perform well in entertainment, marketing, politics, or entrepreneurship. Your enthusiasm ignites teams and visions. Yet, impulsivity and overconfidence can derail long-term goals. Temper passion with patience.",
    Earth: "Earth types are strong in structured and support-oriented careers. You succeed in logistics, consulting, finance, or agriculture. Your reliability builds long-term success. Still, fear of risk or clinging to routine may stagnate growth. Learn to innovate steadily.",
    Metal: "Metal elements fit roles requiring precision, integrity, or justice. You do well in law, strategy, technology, or quality control. You bring excellence and high standards. But excessive perfectionism or emotional distance may alienate others. Balance rigor with warmth.",
    Water: "Water types flow in intellectual and creative fields. You thrive in writing, psychology, travel, research, or diplomacy. You adapt and understand complexity. Yet, emotional overwhelm or indecision can cloud execution. Anchor your flow with clear milestones."
  }[el];
}

function wealthAdvice(el) {
  return {
    Wood: "Wood elements build wealth gradually through expansion. You earn best when growing meaningful projects or nurturing others. Your efforts often yield long-term abundance. But overextension or inconsistent pacing can cause burnout. Plan growth with sustainability in mind.",
    Fire: "Fire types create wealth through bold action and charisma. You shine in fast-moving markets, promotions, and influence. You generate quick income bursts. Still, lack of structure or hasty spending may drain success. Budgeting is your fire extinguisher—use it.",
    Earth: "Earth energy accumulates wealth through stability and planning. You are cautious, consistent, and resourceful. Your savings often reflect strong discipline. However, excessive frugality or fear of risk can stall expansion. Allow strategic risks to grow your foundation.",
    Metal: "Metal types approach wealth with analysis and precision. You excel in finance, investing, and systems optimization. Profit is earned through structure. Yet, obsessing over control or fear of failure may limit returns. Welcome flexibility as a profit multiplier.",
    Water: "Water elements attract wealth through insight and movement. You thrive in international, online, or fluid income models. Money flows when you're aligned emotionally. But disorganization or escapism can block gains. Ground your ideas with action plans and accountability."
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
