document.getElementById("fengshui-form").addEventListener("submit", function (event) {
  event.preventDefault();

  const name = encodeURIComponent(document.getElementById("fullname").value);
  const birthdate = decodeURIComponent(document.getElementById("birthdate").value);
  const birthtime = decodeURIComponent(document.getElementById("birthtime").value);
  const birthplace = encodeURIComponent(document.getElementById("birthplace").value);

  const fullReportLink = `/pages/full-report?name=${name}&birthdate=${birthdate}&birthtime=${birthtime}&birthplace=${birthplace}`;
  window.fullReportLink = fullReportLink;

  const baziResult = calculateBaZi(birthdate, birthtime);
  generateSimpleReport(baziResult, decodeURIComponent(name));
});

// 天干地支基础
const heavenlyStems = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const earthlyBranches = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
const stemElements = {
  "甲": "Wood", "乙": "Wood",
  "丙": "Fire", "丁": "Fire",
  "戊": "Earth", "己": "Earth",
  "庚": "Metal", "辛": "Metal",
  "壬": "Water", "癸": "Water"
};

// 四柱推算（当前仅年柱 + 简化日柱+时柱版本）
function calculateBaZi(birthdate, birthtime) {
  const date = new Date(`${birthdate}T${birthtime}`);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();

  // 年柱（最基础）
  const yearStem = heavenlyStems[(year - 4) % 10];
  const yearBranch = earthlyBranches[(year - 4) % 12];

  // 简化日干（日数取模）
  const dayStem = heavenlyStems[(day + 1) % 10];

  // 简化时柱（按2小时分支）
  const hourIndex = Math.floor((hour + 1) / 2) % 12;
  const hourBranch = earthlyBranches[hourIndex];
  const hourStem = heavenlyStems[hourIndex % 10];

  return {
    yearPillar: `${yearStem}${yearBranch}`,
    dayStem: dayStem,
    hourPillar: `${hourStem}${hourBranch}`,
    element: stemElements[dayStem]
  };
}

// 千人千面简报生成
function generateSimpleReport(bazi, name) {
  const traits = getElementTraits(bazi.element);

  document.getElementById("report-section").innerHTML = `
    <h2>Dear ${name}, here’s your Personalized Feng Shui Destiny</h2>
    <h3>Four Pillars Snapshot:</h3>
    <p><strong>Year Pillar:</strong> ${bazi.yearPillar}</p>
    <p><strong>Day Master:</strong> ${bazi.dayStem} (${bazi.element})</p>
    <p><strong>Hour Pillar:</strong> ${bazi.hourPillar}</p>

    <h3>Personality:</h3>
    <p>${traits.personality}</p>

    <h3>Love & Relationships:</h3>
    <p>${traits.love}</p>

    <h3>Family:</h3>
    <p>${traits.family}</p>

    <h3>Wealth Outlook:</h3>
    <p>${traits.wealth}</p>

    <div style="margin-top:30px; padding:20px; background:#fdf7e3; border-radius:12px; text-align:center;">
      <p><strong>Unlock your Full Feng Shui Destiny Report for in-depth analysis, advice, and luck cycles tailored to your BaZi.</strong></p>
      <button onclick="redirectToPayment()" style="margin-top:20px; padding:12px 24px; background-color:#c7a76c; color:white; border:none; border-radius:8px; font-size:16px; cursor:pointer;">Unlock Full Report for $4.99</button>
    </div>
  `;
}

// 五行属性分析话术（千人千面）
function getElementTraits(element) {
  switch (element) {
    case "Wood":
      return {
        personality: "You are idealistic, energetic, and growth-oriented. You thrive when building things from scratch.",
        love: "You're passionate yet sometimes stubborn in love. Balance your ideals with reality.",
        family: "You bring vitality to your family but may clash with rigid traditions.",
        wealth: "You create wealth through innovation, but need patience for sustainable growth."
      };
    case "Fire":
      return {
        personality: "You are dynamic, expressive, and full of ambition. You inspire those around you.",
        love: "Your love burns fast and bright—watch out for emotional impulsiveness.",
        family: "You often take the leadership role at home but may need to listen more.",
        wealth: "You’re bold in money matters—success follows when passion meets timing."
      };
    case "Earth":
      return {
        personality: "You are stable, dependable, and deeply grounded. Others trust your judgment.",
        love: "You are loyal but can be emotionally reserved—openness deepens bonds.",
        family: "You’re the anchor of the family, sometimes at the cost of your own needs.",
        wealth: "You accumulate wealth slowly but securely through effort and planning."
      };
    case "Metal":
      return {
        personality: "You are precise, disciplined, and justice-driven. You value clarity and results.",
        love: "You are protective yet cautious in love—sometimes too guarded.",
        family: "You expect high standards, which may create distance—empathy builds bridges.",
        wealth: "You achieve success through strategy and structure, not shortcuts."
      };
    case "Water":
      return {
        personality: "You are intuitive, fluid, and intellectually sharp. You adapt and observe deeply.",
        love: "Emotionally sensitive and loyal, you crave deep connection but fear betrayal.",
        family: "You are emotionally attuned to family needs but may carry invisible burdens.",
        wealth: "Your income may come in waves—stay focused to ride the tides skillfully."
      };
    default:
      return {
        personality: "Unique and complex, you’re still being shaped by cosmic forces.",
        love: "Your love journey is still unfolding—openness leads to discovery.",
        family: "You are evolving into your family role—reflect and redefine.",
        wealth: "Your potential is hidden—seek clarity to reveal your path."
      };
  }
}

// 支付跳转
function redirectToPayment() {
  const name = encodeURIComponent(document.getElementById("fullname").value);
  const birthdate = encodeURIComponent(document.getElementById("birthdate").value);
  const birthtime = encodeURIComponent(document.getElementById("birthtime").value);
  const birthplace = encodeURIComponent(document.getElementById("birthplace").value);

  const url = `/checkout.html?name=${name}&birthdate=${birthdate}&birthtime=${birthtime}&birthplace=${birthplace}`;
  window.location.href = url;
}
