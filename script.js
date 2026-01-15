const SCOUT = "Scout", SOLDIER = "Soldier", SORCERER = "Sorcerer", SHAMAN = "Shaman";

const descriptions = {
    [SCOUT]: "You excel in speed, stealth, and high-precision strikes.",
    [SOLDIER]: "You possess unmatched strength and the resolve to hold the line.",
    [SORCERER]: "You command reality through calculation and arcane intellect.",
    [SHAMAN]: "You walk between worlds, drawing power from spirits and nature."
};

const jobMatrix = {
    [SOLDIER]: { [SOLDIER]: "Vanguard", [SCOUT]: "Slayer", [SORCERER]: "Battlemage", [SHAMAN]: "Paladin" },
    [SCOUT]: { [SCOUT]: "Assassin", [SOLDIER]: "Duelist", [SORCERER]: "Hexblade", [SHAMAN]: "Outrider" },
    [SORCERER]: { [SORCERER]: "Archmage", [SOLDIER]: "Battlemage", [SCOUT]: "Ninja", [SHAMAN]: "Summoner" },
    [SHAMAN]: { [SHAMAN]: "Elder", [SOLDIER]: "Sentinel", [SCOUT]: "Harbinger", [SORCERER]: "Druid" }
};

const questions = [
    {
        text: "How do you typically engage an obstacle?",
        answerPool: [
            {text: "Smash through it.", type: SOLDIER}, {text: "Overpower it with grit.", type: SOLDIER}, {text: "Challenge it directly.", type: SOLDIER},
            {text: "Find a way around it.", type: SCOUT}, {text: "Navigate it with speed.", type: SCOUT}, {text: "Slip through the gaps.", type: SCOUT},
            {text: "Apply logic to solve it.", type: SORCERER}, {text: "Use a tool to bypass it.", type: SORCERER}, {text: "Analyze its weak points.", type: SORCERER},
            {text: "Ask for help or guidance.", type: SHAMAN}, {text: "Wait for a natural opening.", type: SHAMAN}, {text: "Listen to your intuition.", type: SHAMAN}
        ],
        weights: { [SOLDIER]: 1, [SCOUT]: 1, [SORCERER]: 1, [SHAMAN]: 1 }
    },
    {
        text: "What is your preferred environment?",
        answerPool: [
            {text: "The thick of the fray.", type: SOLDIER}, {text: "A structured fortress.", type: SOLDIER}, {text: "The training grounds.", type: SOLDIER},
            {text: "The high rooftops.", type: SCOUT}, {text: "A hidden vantage point.", type: SCOUT}, {text: "Dark, narrow alleys.", type: SCOUT},
            {text: "A quiet study room.", type: SORCERER}, {text: "A laboratory of ideas.", type: SORCERER}, {text: "A geometric library.", type: SORCERER},
            {text: "A moonlit forest.", type: SHAMAN}, {text: "An ancient shrine.", type: SHAMAN}, {text: "The open wilderness.", type: SHAMAN}
        ],
        weights: { [SOLDIER]: 1, [SCOUT]: 1, [SORCERER]: 1, [SHAMAN]: 1 }
    },
    {
        text: "How do you want to be remembered?",
        answerPool: [
            {text: "As a hero of legend.", type: SOLDIER}, {text: "As a protector of many.", type: SOLDIER}, {text: "As a symbol of power.", type: SOLDIER},
            {text: "As a ghost in the wind.", type: SCOUT}, {text: "As a survivor of all.", type: SCOUT}, {text: "As a silent legend.", type: SCOUT},
            {text: "As a master of truth.", type: SORCERER}, {text: "As a seeker of hidden laws.", type: SORCERER}, {text: "As a peerless mind.", type: SORCERER},
            {text: "As a soul of kindness.", type: SHAMAN}, {text: "As a keeper of balance.", type: SHAMAN}, {text: "As a guiding spirit.", type: SHAMAN}
        ],
        weights: { [SOLDIER]: 1, [SCOUT]: 1, [SORCERER]: 1, [SHAMAN]: 1 }
    },
    {
        text: "What is your reaction to a sudden threat?",
        answerPool: [
            {text: "Brace for impact.", type: SOLDIER}, {text: "Counter-attack immediately.", type: SOLDIER}, {text: "Shout a rallying cry.", type: SOLDIER},
            {text: "Dodge and reposition.", type: SCOUT}, {text: "Flick a concealed blade.", type: SCOUT}, {text: "Blend into the crowd.", type: SCOUT},
            {text: "Invoke a kinetic shield.", type: SORCERER}, {text: "Teleport a few feet away.", type: SORCERER}, {text: "Analyze the threat's origin.", type: SORCERER},
            {text: "Calm the atmosphere.", type: SHAMAN}, {text: "Release a blinding light.", type: SHAMAN}, {text: "Call for ancestral aid.", type: SHAMAN}
        ],
        weights: { [SOLDIER]: 1, [SCOUT]: 1, [SORCERER]: 1, [SHAMAN]: 1 }
    },
    {
        text: "Which gift would you value most?",
        answerPool: [
            {text: "Forged plate armor.", type: SOLDIER}, {text: "A heavy claymore.", type: SOLDIER}, {text: "A banner of honor.", type: SOLDIER},
            {text: "A cloak of invisibility.", type: SCOUT}, {text: "Boots of haste.", type: SCOUT}, {text: "A map of secrets.", type: SCOUT},
            {text: "A crystal of focus.", type: SORCERER}, {text: "An infinite inkwell.", type: SORCERER}, {text: "A ring of mental clarity.", type: SORCERER},
            {text: "A bag of healing herbs.", type: SHAMAN}, {text: "A whistle for spirits.", type: SHAMAN}, {text: "A seed of a world-tree.", type: SHAMAN}
        ],
        weights: { [SOLDIER]: 1, [SCOUT]: 1, [SORCERER]: 1, [SHAMAN]: 1 }
    },
    {
        text: "What is your ideal weapon style?",
        answerPool: [
            {text: "Slow, heavy, and crushing.", type: SOLDIER}, {text: "Balanced and defensive.", type: SOLDIER}, {text: "Unstoppable and loud.", type: SOLDIER},
            {text: "Fast, light, and jagged.", type: SCOUT}, {text: "Ranged and silent.", type: SCOUT}, {text: "Hidden and lethal.", type: SCOUT},
            {text: "Complex and technical.", type: SORCERER}, {text: "Ethereal and mental.", type: SORCERER}, {text: "Unseen and tactical.", type: SORCERER},
            {text: "Organic and symbolic.", type: SHAMAN}, {text: "Fluid and rhythmic.", type: SHAMAN}, {text: "Ancient and mystical.", type: SHAMAN}
        ],
        weights: { [SOLDIER]: 1, [SCOUT]: 1, [SORCERER]: 1, [SHAMAN]: 1 }
    },
    {
        text: "How do you handle intense pressure?",
        answerPool: [
            {text: "Tighten your grip.", type: SOLDIER}, {text: "Push back harder.", type: SOLDIER}, {text: "Dig in your heels.", type: SOLDIER},
            {text: "Maintain your focus.", type: SCOUT}, {text: "Move with the flow.", type: SCOUT}, {text: "Disappear into the work.", type: SCOUT},
            {text: "Break it into data points.", type: SORCERER}, {text: "Rethink the system.", type: SORCERER}, {text: "Stay perfectly logical.", type: SORCERER},
            {text: "Breathe and meditate.", type: SHAMAN}, {text: "Connect with others.", type: SHAMAN}, {text: "Release it to the wind.", type: SHAMAN}
        ],
        weights: { [SOLDIER]: 1, [SCOUT]: 1, [SORCERER]: 1, [SHAMAN]: 1 }
    },
    {
        text: "Choose a legendary title.",
        answerPool: [
            {text: "The Unmovable Wall.", type: SOLDIER}, {text: "The Iron Fist.", type: SOLDIER}, {text: "The War-Bringer.", type: SOLDIER},
            {text: "The Ghost Walker.", type: SCOUT}, {text: "The Shadow Blade.", type: SCOUT}, {text: "The Silent Viper.", type: SCOUT},
            {text: "The Keeper of Knowledge.", type: SORCERER}, {text: "The Weaver of Time.", type: SORCERER}, {text: "The Arcane Mind.", type: SORCERER},
            {text: "The Spirit Speaker.", type: SHAMAN}, {text: "The Nature's Wrath.", type: SHAMAN}, {text: "The Soul Healer.", type: SHAMAN}
        ],
        weights: { [SOLDIER]: 1, [SCOUT]: 1, [SORCERER]: 1, [SHAMAN]: 1 }
    },
    {
        text: "What defines success to you?",
        answerPool: [
            {text: "Winning the fight.", type: SOLDIER}, {text: "Surviving the battle.", type: SOLDIER}, {text: "Earning respect.", type: SOLDIER},
            {text: "Completing the mission.", type: SCOUT}, {text: "Remaining unseen.", type: SCOUT}, {text: "Securing the prize.", type: SCOUT},
            {text: "Gaining new insights.", type: SORCERER}, {text: "Solving the puzzle.", type: SORCERER}, {text: "Optimizing the result.", type: SORCERER},
            {text: "Healing the discord.", type: SHAMAN}, {text: "Helping the group.", type: SHAMAN}, {text: "Finding inner peace.", type: SHAMAN}
        ],
        weights: { [SOLDIER]: 1, [SCOUT]: 1, [SORCERER]: 1, [SHAMAN]: 1 }
    },
    {
        text: "A complex trap has been triggered! How do you escape?",
        answerPool: [
            {text: "Vault over the obstacle.", type: SCOUT}, {text: "Roll through the debris.", type: SCOUT}, {text: "Climb the walls instantly.", type: SCOUT},
            {text: "Cut the mechanism's rope.", type: SCOUT}, {text: "Disarm it with a toothpick.", type: SCOUT}, {text: "Sprint through the gap.", type: SCOUT},
            {text: "Smash the closing gate.", type: SOLDIER}, {text: "Tank the arrow fire.", type: SOLDIER}, {text: "Shoulder-check the wall.", type: SOLDIER},
            {text: "Freeze time for a second.", type: SORCERER}, {text: "Blink past the danger.", type: SORCERER}, {text: "Calculate the safe zone.", type: SORCERER}
        ],
        weights: { [SCOUT]: 2, [SOLDIER]: 1, [SORCERER]: 1, [SHAMAN]: 0 }
    },
    {
        text: "A horde of beasts surrounds your camp! What is the plan?",
        answerPool: [
            {text: "Hold your position.", type: SOLDIER}, {text: "Cleave them in a circle.", type: SOLDIER}, {text: "Shield-bash the leader.", type: SOLDIER},
            {text: "Challenge the biggest one.", type: SOLDIER}, {text: "Lead a counter-strike.", type: SOLDIER}, {text: "Stand as an unbreakable wall.", type: SOLDIER},
            {text: "Leap over them to safety.", type: SCOUT}, {text: "Toss a smoke pellet.", type: SCOUT}, {text: "Pick off the scouts.", type: SCOUT},
            {text: "Bless the ground around you.", type: SHAMAN}, {text: "Command them to sleep.", type: SHAMAN}, {text: "Summon a spirit guardian.", type: SHAMAN}
        ],
        weights: { [SOLDIER]: 2, [SCOUT]: 1, [SHAMAN]: 1, [SORCERER]: 0 }
    },
    {
        text: "An ancient rune begins to glow with an eerie light.",
        answerPool: [
            {text: "Tap into its arcane stream.", type: SORCERER}, {text: "Decode its syntax.", type: SORCERER}, {text: "Absorb its raw energy.", type: SORCERER},
            {text: "Stabilize its vibration.", type: SORCERER}, {text: "Rewrite its programming.", type: SORCERER}, {text: "Overload it with mana.", type: SORCERER},
            {text: "Break the stone it's on.", type: SOLDIER}, {text: "Hammer it into silence.", type: SOLDIER}, {text: "Stand guard against it.", type: SOLDIER},
            {text: "Soothe the angry spirit.", type: SHAMAN}, {text: "Balance its light.", type: SHAMAN}, {text: "Sing a harmonic counter.", type: SHAMAN}
        ],
        weights: { [SORCERER]: 2, [SOLDIER]: 1, [SHAMAN]: 1, [SCOUT]: 0 }
    },
    {
        text: "The land itself is crying out! You feel its pain.",
        answerPool: [
            {text: "Heal the ley lines.", type: SHAMAN}, {text: "Listen to the tree's song.", type: SHAMAN}, {text: "Bury your hands in earth.", type: SHAMAN},
            {text: "Cleanse the corruption.", type: SHAMAN}, {text: "Sacrifice mana to restore.", type: SHAMAN}, {text: "Commune with the wind.", type: SHAMAN},
            {text: "Track the source of rot.", type: SCOUT}, {text: "Climb to find the origin.", type: SCOUT}, {text: "Scout the blighted area.", type: SCOUT},
            {text: "Burn away the sickness.", type: SORCERER}, {text: "Extract the dark mana.", type: SORCERER}, {text: "Calculate the spread.", type: SORCERER}
        ],
        weights: { [SHAMAN]: 2, [SCOUT]: 1, [SORCERER]: 1, [SOLDIER]: 0 }
    }
];

let currentQuestionIndex = 0;
let scores = { [SCOUT]: 0, [SOLDIER]: 0, [SORCERER]: 0, [SHAMAN]: 0 };
let userChoices = []; 

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function getWeightedAnswers(question) {
    let selected = [];
    for (const [type, count] of Object.entries(question.weights)) {
        if (count === 0) continue;
        const typePool = question.answerPool.filter(a => a.type === type);
        selected.push(...shuffle([...typePool]).slice(0, count));
    }
    return shuffle(selected);
}

function startQuiz() {
    currentQuestionIndex = 0;
    scores = { [SCOUT]: 0, [SOLDIER]: 0, [SORCERER]: 0, [SHAMAN]: 0 };
    userChoices = [];
    shuffle(questions); 
    document.getElementById('start-screen').classList.replace('active', 'hidden');
    document.getElementById('result-screen').classList.replace('active', 'hidden');
    document.getElementById('quiz-screen').classList.replace('hidden', 'active');
    showQuestion();
}

function showQuestion() {
    const q = questions[currentQuestionIndex];
    document.getElementById('question-text').innerText = q.text;
    const btnContainer = document.getElementById('answer-buttons');
    btnContainer.innerHTML = '';
    
    const backBtn = document.getElementById('back-btn');
    backBtn.style.display = (currentQuestionIndex === 0) ? 'none' : 'inline-block';

    document.getElementById('progress-bar').style.width = `${(currentQuestionIndex / questions.length) * 100}%`;

    getWeightedAnswers(q).forEach(ans => {
        const btn = document.createElement('button');
        btn.innerText = ans.text;
        btn.classList.add('btn');
        btn.onclick = () => { 
            scores[ans.type]++; 
            userChoices.push({ q: q.text, a: ans.text, type: ans.type });
            currentQuestionIndex++; 
            if (currentQuestionIndex < questions.length) showQuestion(); else showResult(); 
        };
        btnContainer.appendChild(btn);
    });
}

function goBack() {
    if (currentQuestionIndex > 0) {
        if (confirm("Go back and change your previous answer?")) {
            const lastChoice = userChoices.pop();
            scores[lastChoice.type]--;
            currentQuestionIndex--;
            showQuestion();
        }
    }
}

function showResult() {
    document.getElementById('quiz-screen').classList.replace('active', 'hidden');
    document.getElementById('result-screen').classList.replace('hidden', 'active');
    document.getElementById('progress-bar').style.width = '100%';
    document.getElementById('adventure-log-section').classList.add('hidden');
    document.getElementById('log-toggle-btn').innerText = "View Adventure Log";

    const sorted = Object.entries(scores).sort((a,b) => b[1] - a[1]);
    const primary = sorted[0][0], secondary = sorted[1][0];
    const hybridName = jobMatrix[primary][secondary];

    document.getElementById('result-title').innerText = `${primary} / ${secondary}`;
    document.getElementById('result-hybrid-text').innerText = `This is often called a ${hybridName}.`;
    document.getElementById('result-desc').innerText = descriptions[primary];

    const stats = document.getElementById('result-stats');
    stats.innerHTML = '';
    sorted.forEach(([type, score]) => {
        const pct = Math.round((score / questions.length) * 100);
        stats.innerHTML += `
            <div class="stat-row">
                <div class="stat-label"><span>${type}</span><span>${pct}%</span></div>
                <div class="stat-bar-bg"><div class="stat-bar-fill" style="width: ${pct}%"></div></div>
            </div>`;
    });

    const reviewList = document.getElementById('review-list');
    reviewList.innerHTML = '';
    userChoices.forEach(choice => {
        reviewList.innerHTML += `
            <div class="review-item">
                <div class="review-q">${choice.q}</div>
                <div class="review-a"><span>${choice.a}</span><span class="class-tag">${choice.type}</span></div>
            </div>`;
    });
}

function toggleLog() {
    const logSection = document.getElementById('adventure-log-section');
    const toggleBtn = document.getElementById('log-toggle-btn');
    const isHidden = logSection.classList.toggle('hidden');
    toggleBtn.innerText = isHidden ? "View Adventure Log" : "Hide Adventure Log";
}

function shareResults() {
    const sorted = Object.entries(scores).sort((a,b) => b[1] - a[1]);
    const primary = sorted[0][0], secondary = sorted[1][0];
    const hybridName = jobMatrix[primary][secondary];
    let shareText = `⚔️ My RPG Job: ${hybridName} (${primary}/${secondary})\n\n📊 Spectrum:\n`;
    sorted.forEach(([type, score]) => shareText += `${type}: ${Math.round((score/questions.length)*100)}%\n`);
    shareText += `\nTest yourself: ${window.location.href}`;

    navigator.clipboard.writeText(shareText).then(() => {
        const btn = document.getElementById('share-btn');
        btn.innerText = "Copied!";
        btn.classList.add('copied');
    });
}

function restartQuiz() { startQuiz(); }