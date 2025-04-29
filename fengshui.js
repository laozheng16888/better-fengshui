// ==============================
// 专业版 风水简版报告生成器（英文版 + 神秘点缀版）
// ==============================

// 天干地支
const heavenlyStems = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const earthlyBranches = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

// 干支配对（60甲子循环）
function getStemBranch(yearOffset) {
    const stem = heavenlyStems[yearOffset % 10];
    const branch = earthlyBranches[yearOffset % 12];
    return `${stem}${branch}`;
}

// 核心：根据出生信息计算八字
function calculateBaZi(birthdate, birthtime) {
    const date = new Date(`${birthdate}T${birthtime}`);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();

    // 年柱
    const yearOffset = year - 1984; // 1984是甲子年
    const yearPillar = getStemBranch(yearOffset);

    // 月柱（简化版）
    const monthBranch = earthlyBranches[(month + 1) % 12];
    const monthStem = heavenlyStems[(month + yearOffset) % 10];
    const monthPillar = `${monthStem}${monthBranch}`;

    // 日柱（简化版）
    const dayStem = heavenlyStems[(day + 2) % 10];
    const dayBranch = earthlyBranches[(day + 4) % 12];
    const dayPillar = `${dayStem}${dayBranch}`;

    // 时柱
    const hourBranches = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
    const hourIndex = Math.floor((hour + 1) / 2) % 12;
    const hourBranch = hourBranches[hourIndex];
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

// 提取五行元素
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

// 分析命局
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
        summary = "Your destiny shows balance among the Five Elements — a rare harmony that empowers resilience.";
    } else if (max >= 3) {
        summary = `A strong inclination towards ${dominant} energy defines your nature. Embrace your strength but beware of its extremes.`;
    } else {
        summary = "Your chart reveals turbulence; mastering change will be key to your growth.";
    }
    return { dominant, summary };
}

// 本日幸运色
function luckyColor(dominant) {
    const colorMap = {
        Wood: "Green or Light Blue",
        Fire: "Red or Orange",
        Earth: "Yellow or Brown",
        Metal: "White or Silver",
        Water: "Black or Dark Blue"
    };
    return colorMap[dominant] || "Gray";
}

// 生成哲学感格言
function generatePhilosophy(dominant) {
    const wisdoms = {
        Wood: "Growth comes to those who bend with the winds yet stay rooted in purpose.",
        Fire: "Passion lights the path, but wisdom steers the journey.",
        Earth: "Steadfastness creates empires, patience nurtures greatness.",
        Metal: "True strength is found in refinement, not resistance.",
        Water: "Those who flow around obstacles carve their own destiny."
    };
    return wisdoms[dominant] || "In every imbalance lies the seed of balance.";
}

// 今日建议
function todaysFocus(dominant) {
    const focusMap = {
        Wood: "Today, focus on creating something new or nurturing growth.",
        Fire: "Today, focus on expressing your true passions with courage.",
        Earth: "Today, focus on grounding yourself and stabilizing your goals.",
        Metal: "Today, focus on setting clear boundaries and refining your plans.",
        Water: "Today, focus on adapting gracefully to unexpected changes."
    };
    return focusMap[dominant] || "Today, focus on observing before acting.";
}

// 主程序：生成简版报告
function generateSimpleReport(bazi, name) {
    const analysis = analyzeFate(bazi.fiveElements);
    const philosophy = generatePhilosophy(analysis.dominant);
    const lucky = luckyColor(analysis.dominant);
    const focus = todaysFocus(analysis.dominant);

    document.getElementById("report-section").innerHTML = `
    <h2>Dear ${name}, here’s your Personalized Feng Shui Destiny</h2>

    <h3>Four Pillars:</h3>
    <p><strong>Year:</strong> ${bazi.yearPillar}</p>
    <p><strong>Month:</strong> ${bazi.monthPillar}</p>
    <p><strong>Day:</strong> ${bazi.dayPillar}</p>
    <p><strong>Hour:</strong> ${bazi.hourPillar}</p>

    <h3>Elemental Balance:</h3>
    <p><strong>Wood:</strong> ${bazi.fiveElements.Wood}, 
       <strong>Fire:</strong> ${bazi.fiveElements.Fire}, 
       <strong>Earth:</strong> ${bazi.fiveElements.Earth}, 
       <strong>Metal:</strong> ${bazi.fiveElements.Metal}, 
       <strong>Water:</strong> ${bazi.fiveElements.Water}</p>

    <h3>Fate Analysis:</h3>
    <p>${analysis.summary}</p>

    <h3>Lucky Color Today:</h3>
    <p><strong>${lucky}</strong></p>

    <h3>Today's Focus:</h3>
    <p>${focus}</p>

    <h3>Philosophical Insight:</h3>
    <p><em>"${philosophy}"</em></p>

    <div style="margin-top:30px; text-align:center;">
      <p>🌟 Unlock deeper secrets of your destiny by accessing the Full Feng Shui Report.</p>
      <button onclick="redirectToPayment()" style="margin-top:20px; padding:12px 24px; background-color:#c7a76c; color:white; border:none; border-radius:8px; font-size:16px; cursor:pointer;">Get Full Report for $9.9</button>
    </div>
    `;
}

// 监听表单提交
document.getElementById("fengshui-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const name = decodeURIComponent(document.getElementById("fullname").value);
    const birthdate = document.getElementById("birthdate").value;
    const birthtime = document.getElementById("birthtime").value;
    const birthplace = document.getElementById("birthplace").value;

    const baziResult = calculateBaZi(birthdate, birthtime);
    generateSimpleReport(baziResult, name);
});

// 支付跳转
function redirectToPayment() {
    const name = encodeURIComponent(document.getElementById("fullname").value);
    const birthdate = encodeURIComponent(document.getElementById("birthdate").value);
    const birthtime = encodeURIComponent(document.getElementById("birthtime").value);
    const birthplace = encodeURIComponent(document.getElementById("birthplace").value);

    const url = `/checkout.html?name=${name}&birthdate=${birthdate}&birthtime=${birthtime}&birthplace=${birthplace}`;
    window.location.href = url;
}
