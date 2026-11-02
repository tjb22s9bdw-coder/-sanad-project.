
const params = new URLSearchParams(window.location.search);
const projectId = Number(params.get("id"));

const projects = JSON.parse(localStorage.getItem("sanad-projects") || "[]");
const project = projects.find(item => item.id === projectId);

if (project) {
    document.getElementById("project-name").textContent = project.name;
    document.getElementById("project-type").textContent = project.type;
    document.getElementById("project-description").textContent =
        project.description || "لم تتم إضافة وصف لهذا المشروع بعد.";
    document.getElementById("project-date").textContent =
        "تاريخ الإضافة: " + project.createdAt;
} else {
    document.getElementById("project-name").textContent = "لم يتم العثور على المشروع";
}

function getDiagnoses() {
    return JSON.parse(localStorage.getItem("sanad-diagnoses") || "{}");
}

function saveDiagnoses(data) {
    localStorage.setItem("sanad-diagnoses", JSON.stringify(data));
}

function getRecommendations(challenge) {
    const recommendations = {
        "التسويق والوصول للعملاء": [
            "حدّد الفئة المستهدفة بدقة.",
            "أنشئ محتوى يوضح قيمة منتجك أو خدمتك.",
            "جرّب قناة تسويقية واحدة وراقب نتائجها.",
            "تابع عدد العملاء والاستفسارات أسبوعيًا."
        ],
        "الإدارة وتنظيم العمل": [
            "اكتب المهام اليومية والأسبوعية للمشروع.",
            "حدّد مسؤولية واضحة لكل مهمة.",
            "استخدم جدولًا لمتابعة الإنجاز.",
            "راجع سير العمل في نهاية كل أسبوع."
        ],
        "المبيعات والعملاء": [
            "اسأل عملاءك عن احتياجاتهم وملاحظاتهم.",
            "وضّح مزايا منتجك أو خدمتك.",
            "تابع العملاء المهتمين بعد تواصلهم معك.",
            "راقب المبيعات لمعرفة المنتجات الأكثر طلبًا."
        ],
        "الإدارة المالية": [
            "سجّل جميع الإيرادات والمصروفات.",
            "افصل مصروفات المشروع عن المصروفات الشخصية.",
            "ضع ميزانية شهرية واضحة.",
            "راجع التدفق النقدي بانتظام."
        ],
        "الفريق والموظفون": [
            "حدّد الأدوار والمسؤوليات بوضوح.",
            "ضع أهدافًا واضحة للفريق.",
            "اعقد اجتماعًا دوريًا لمتابعة العمل.",
            "اهتم بتطوير مهارات أعضاء الفريق."
        ],
        "لا أعرف من أين أبدأ": [
            "اكتب فكرة المشروع والخدمة التي يقدمها.",
            "حدّد العميل الذي تريد خدمته.",
            "ادرس المنافسين والفرص المتاحة.",
            "ابدأ بخطوة صغيرة واختبر فكرتك."
        ]
    };

    return recommendations[challenge] || [
        "حدّد المشكلة بشكل واضح.",
        "ابحث عن أسباب المشكلة.",
        "ضع خطوة عملية صغيرة للبدء.",
        "راجع النتائج وحدّد الخطوة التالية."
    ];
}

function displayDiagnoses() {
    const history = document.getElementById("diagnosis-history");
    const allDiagnoses = getDiagnoses();
    const diagnoses = allDiagnoses[projectId] || [];

    history.innerHTML = "";

    if (diagnoses.length === 0) {
        history.textContent = "لا توجد تشخيصات محفوظة حتى الآن.";
        return;
    }

    diagnoses.forEach(function(item) {
        if (!item.recommendations) {
            item.recommendations = getRecommendations(item.challenge);
        }

        if (!item.completed) {
            item.completed = [];
        }

        const card = document.createElement("div");
        card.className = "project-card";
        card.style.marginTop = "15px";

        const title = document.createElement("h3");
        title.textContent = item.challenge;

        const details = document.createElement("p");
        details.textContent = item.details || "لم تتم إضافة تفاصيل.";

        const date = document.createElement("small");
        date.textContent = item.date;

        const heading = document.createElement("h4");
        heading.textContent = "توصيات سَنَد لمشروعك";

        const completedCount = item.completed.filter(Boolean).length;
        const totalCount = item.recommendations.length;
        const percentage = totalCount
            ? Math.round((completedCount / totalCount) * 100)
            : 0;

        const progressText = document.createElement("p");
        progressText.textContent = "نسبة الإنجاز: " + percentage + "%";

        const progress = document.createElement("progress");
        progress.max = 100;
        progress.value = percentage;
        progress.style.width = "100%";

        const list = document.createElement("div");

        item.recommendations.forEach(function(recommendation, index) {
            const label = document.createElement("label");
            label.style.display = "flex";
            label.style.alignItems = "center";
            label.style.gap = "10px";
            label.style.margin = "12px 0";
            label.style.cursor = "pointer";

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = Boolean(item.completed[index]);

            const text = document.createElement("span");
            text.textContent = recommendation;

            if (checkbox.checked) {
                text.style.textDecoration = "line-through";
                text.style.opacity = "0.6";
            }

            checkbox.addEventListener("change", function() {
                item.completed[index] = checkbox.checked;
                saveDiagnoses(allDiagnoses);
                displayDiagnoses();
            });

            label.append(checkbox, text);
            list.appendChild(label);
        });

        card.append(title, details, date, heading, progressText, progress, list);
        history.appendChild(card);
    });

    saveDiagnoses(allDiagnoses);
}

document.getElementById("diagnosis-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const challenge = document.getElementById("challenge").value;
    const details = document.getElementById("details").value.trim();

    const allDiagnoses = getDiagnoses();

    if (!allDiagnoses[projectId]) {
        allDiagnoses[projectId] = [];
    }

    allDiagnoses[projectId].push({
        challenge: challenge,
        details: details,
        date: new Date().toLocaleDateString("ar-SA"),
        recommendations: getRecommendations(challenge),
        completed: []
    });

    saveDiagnoses(allDiagnoses);
    document.getElementById("diagnosis-form").reset();
    displayDiagnoses();

    alert("تم حفظ التشخيص والتوصيات بنجاح!");
});

// حفظ محادثة كل مشروع بشكل مستقل
const chatMessages = document.getElementById("chat-messages");
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");

const chatKey = "sanad-chat-" + projectId;
let chatHistory = JSON.parse(localStorage.getItem(chatKey) || "[]");

function addMessage(sender, message) {
    const paragraph = document.createElement("p");
    const strong = document.createElement("strong");

    strong.textContent = sender + ": ";
    paragraph.append(strong, document.createTextNode(message));

    chatMessages.appendChild(paragraph);
}

function displayChat() {
    chatMessages.innerHTML = "";

    addMessage("مساعد سَنَد", "أهلًا بك! كيف أقدر أساعدك في تطوير مشروعك؟");

    chatHistory.forEach(function(item) {
        addMessage(item.sender, item.message);
    });
}

function getAssistantReply(question) {
    const text = question.toLowerCase();

    if (text.includes("عميل") || text.includes("تسويق") || text.includes("مبيعات")) {
        return "لبداية أفضل، حدّد العميل المستهدف، ثم اعرض له قيمة منتجك بمحتوى واضح. جرّب قناة تسويقية واحدة، وتابع عدد الاستفسارات والعملاء أسبوعيًا.";
    }

    if (text.includes("مال") || text.includes("ميزاني") || text.includes("مصروف")) {
        return "ابدأ بتسجيل الإيرادات والمصروفات، وافصل مصاريف المشروع عن مصاريفك الشخصية. بعد ذلك ضع ميزانية شهرية وراجعها بانتظام.";
    }

    if (text.includes("فريق") || text.includes("موظف") || text.includes("مهام")) {
        return "اكتب مهام كل شخص ومسؤولياته، وحدّد أهدافًا واضحة للفريق. اجتماع أسبوعي قصير يساعدك على متابعة الإنجاز.";
    }

    if (text.includes("مشروع") || text.includes("أبدأ") || text.includes("بداية")) {
        return "خلنا نبدأ بتحديد هدف مشروعك والعميل الذي تريد خدمته. بعدها نختار خطوة صغيرة قابلة للتنفيذ ونقيس نتيجتها.";
    }

    return "شكرًا على سؤالك. حتى أساعدك بشكل أفضل، وضّح لي التحدي الذي تواجهه في مشروعك، وما النتيجة التي تتمنى الوصول إليها.";
}

chatForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const question = chatInput.value.trim();

    if (!question) return;

    chatHistory.push({
        sender: "أنت",
        message: question
    });

    const reply = getAssistantReply(question);

    chatHistory.push({
        sender: "مساعد سَنَد",
        message: reply
    });

    localStorage.setItem(chatKey, JSON.stringify(chatHistory));

    chatInput.value = "";
    displayChat();
});

displayDiagnoses();
displayChat();
