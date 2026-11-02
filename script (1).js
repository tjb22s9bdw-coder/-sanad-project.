
/* ==============================
   نظام تسجيل الدخول وإنشاء الحساب
============================== */

function openAccount(type) {
    const modal = document.getElementById("account-modal");

    modal.style.display = "flex";

    if (type === "login") {
        showLogin();
    } else {
        showRegister();
    }
}

function closeAccount() {
    document.getElementById("account-modal").style.display = "none";
}

function showLogin() {
    document.getElementById("account-content").innerHTML = `
        <h2>مرحباً بعودتك إلى سَنَد</h2>
        <p>سجّل دخولك للعودة إلى مشاريعك ومتابعة رحلتك.</p>

        <form onsubmit="demoAccount(event)">
            <label for="login-email">البريد الإلكتروني</label>
            <input
                type="email"
                id="login-email"
                placeholder="أدخل بريدك الإلكتروني"
                required
            >

            <label for="login-password">كلمة المرور</label>
            <input
                type="password"
                id="login-password"
                placeholder="أدخل كلمة المرور"
                required
            >

            <button type="submit" class="account-submit">
                تسجيل الدخول
            </button>
        </form>

        <span class="account-switch" onclick="showRegister()">
            ليس لديك حساب؟ أنشئ حساباً جديداً
        </span>
    `;
}

function showRegister() {
    document.getElementById("account-content").innerHTML = `
        <h2>ابدأ رحلتك مع سَنَد</h2>
        <p>أنشئ حسابك لتجمع مشاريعك وتتابع تقدمها في مكان واحد.</p>

        <form onsubmit="demoAccount(event)">
            <label for="register-name">الاسم</label>
            <input
                type="text"
                id="register-name"
                placeholder="أدخل اسمك"
                required
            >

            <label for="register-email">البريد الإلكتروني</label>
            <input
                type="email"
                id="register-email"
                placeholder="أدخل بريدك الإلكتروني"
                required
            >

            <label for="register-password">كلمة المرور</label>
            <input
                type="password"
                id="register-password"
                placeholder="أنشئ كلمة مرور"
                minlength="8"
                required
            >

            <button type="submit" class="account-submit">
                إنشاء حساب
            </button>
        </form>

        <span class="account-switch" onclick="showLogin()">
            لديك حساب بالفعل؟ سجّل الدخول
        </span>
    `;
}

/* تنبيه تجريبي إلى حين ربط الحسابات بقاعدة بيانات */
function demoAccount(event) {
    event.preventDefault();

    alert(
        "واجهة الحسابات جاهزة للتصميم. تسجيل الدخول وإنشاء الحساب الفعلي يحتاجان إلى ربط قاعدة بيانات وخدمة آمنة."
    );
}

/* ==============================
   تشخيص المشروع وإعداد التقرير
============================== */

function startDiagnosis() {
    const message = document.getElementById("diagnosis-message");

    message.innerHTML = `
        <div class="diagnosis-form">
            <h3>خلّنا نتعرف على مشروعك</h3>

            <label for="business-type">نوع مشروعك</label>
            <select id="business-type">
                <option value="">اختاري نوع المشروع</option>
                <option value="store">متجر إلكتروني</option>
                <option value="service">مشروع خدمي</option>
                <option value="startup">مشروع ناشئ</option>
                <option value="idea">فكرة مشروع</option>
                <option value="other">أخرى</option>
            </select>

            <label for="business-budget">ميزانية المشروع</label>
            <select id="business-budget">
                <option value="">اختاري الميزانية</option>
                <option value="under5000">أقل من 5,000 ريال</option>
                <option value="5000to20000">من 5,000 إلى 20,000 ريال</option>
                <option value="20000to50000">من 20,000 إلى 50,000 ريال</option>
                <option value="over50000">أكثر من 50,000 ريال</option>
                <option value="undecided">لم أحدد الميزانية بعد</option>
            </select>

            <label for="business-need">وش أكثر شيء يحتاجه مشروعك؟</label>
            <select id="business-need">
                <option value="">اختاري احتياجك</option>
                <option value="marketing">التسويق وجذب العملاء</option>
                <option value="customers">إدارة العملاء وخدمتهم</option>
                <option value="team">تنظيم الفريق والمهام</option>
                <option value="planning">التخطيط وتشغيل المشروع</option>
            </select>

            <button type="button" onclick="showRecommendation()">
                اعرض توصياتي
            </button>

            <div id="recommendation"></div>
        </div>
    `;
}

function showRecommendation() {
    const type = document.getElementById("business-type").value;
    const budget = document.getElementById("business-budget").value;
    const need = document.getElementById("business-need").value;
    const result = document.getElementById("recommendation");

    if (!type || !budget || !need) {
        result.innerHTML = "<p>فضلاً، أكمل جميع الخيارات أولاً.</p>";
        return;
    }

    const typeNames = {
        store: "متجر إلكتروني",
        service: "مشروع خدمي",
        startup: "مشروع ناشئ",
        idea: "فكرة مشروع",
        other: "مشروع آخر"
    };

    const budgetNames = {
        under5000: "أقل من 5,000 ريال",
        "5000to20000": "من 5,000 إلى 20,000 ريال",
        "20000to50000": "من 20,000 إلى 50,000 ريال",
        over50000: "أكثر من 50,000 ريال",
        undecided: "لم يتم تحديد الميزانية"
    };

    const projectInsights = {
        store: "يحتاج المتجر الإلكتروني إلى تجربة شراء سهلة، وعرض واضح للمنتجات، وخطة تساعد على جذب العملاء وتحويل زياراتهم إلى مبيعات.",
        service: "يعتمد المشروع الخدمي على جودة الخدمة وتجربة العميل، لذلك من المهم تنظيم تقديم الخدمة وبناء علاقة مستمرة مع العملاء.",
        startup: "تحتاج المشاريع الناشئة إلى تحديد أولوياتها واختبار أفكارها وتنظيم مواردها قبل التوسع.",
        idea: "في مرحلة الفكرة، من المهم دراسة احتياج السوق والتحقق من جدوى الفكرة ووضع خطوات واضحة للانطلاق.",
        other: "يحتاج المشروع إلى فهم وضعه الحالي وتحديد أولوياته قبل اختيار الحلول المناسبة."
    };

    const recommendations = {
        marketing: {
            title: "تطوير التسويق وجذب العملاء",
            analysis: "يظهر من اختيارك أن الوصول إلى العملاء يمثل أولوية لمشروعك.",
            challenge: "قد يواجه المشروع صعوبة في الوصول إلى الجمهور المناسب أو تحويل الاهتمام إلى عملاء فعليين.",
            strength: "تحديد التسويق كأولوية يساعدك على توجيه جهودك نحو تحسين الظهور والوصول إلى العملاء.",
            steps: [
                "حدد جمهورك المستهدف واحتياجاته.",
                "اختر قنوات التسويق المناسبة لجمهورك.",
                "تابع نتائج التسويق وحدد القنوات الأكثر فاعلية."
            ]
        },

        customers: {
            title: "تحسين تجربة العملاء",
            analysis: "يحتاج مشروعك إلى التركيز على جودة التواصل مع العملاء وتنظيم خدمتهم.",
            challenge: "قد يؤدي عدم تنظيم التواصل والمتابعة إلى ضعف تجربة العميل وفقدان بعض فرص البيع.",
            strength: "الاهتمام بالعملاء خطوة مهمة لبناء الثقة وزيادة فرص عودتهم.",
            steps: [
                "حدد قنوات واضحة للتواصل مع العملاء.",
                "جهز إجابات للأسئلة والاستفسارات المتكررة.",
                "اجمع ملاحظات العملاء وتابع مستوى رضاهم."
            ]
        },

        team: {
            title: "تنظيم الفريق والمهام",
            analysis: "تحتاج إلى تنظيم الأدوار والمسؤوليات حتى يعمل الفريق بوضوح وكفاءة.",
            challenge: "عدم وضوح المهام قد يؤدي إلى تكرار العمل أو تأخر إنجاز المسؤوليات.",
            strength: "تنظيم الفريق يساعد على تحسين الإنتاجية وتوزيع الجهد بشكل أفضل.",
            steps: [
                "اكتب المهام الأساسية في المشروع.",
                "وزع المسؤوليات وحدد مسؤول كل مهمة.",
                "راجع الإنجاز بشكل أسبوعي."
            ]
        },

        planning: {
            title: "التخطيط وتنظيم المشروع",
            analysis: "تحتاج إلى خطة عمل تساعدك على ترتيب الأولويات وتحويل الأهداف إلى خطوات قابلة للتنفيذ.",
            challenge: "غياب خطة واضحة قد يجعل الجهود متفرقة ويصعب قياس تقدم المشروع.",
            strength: "الاهتمام بالتخطيط يمنحك رؤية أوضح ويساعدك على اتخاذ قرارات أفضل.",
            steps: [
                "حدد أهداف المشروع للمرحلة القادمة.",
                "اكتب أهم التحديات والموارد المتاحة.",
                "ضع خطة عمل بمواعيد ومسؤوليات واضحة."
            ]
        }
    };

    const budgetRecommendations = {
        under5000: "ابدأ بالحلول منخفضة التكلفة، وركز على الاحتياجات الضرورية قبل الإنفاق على الجوانب الثانوية.",
        "5000to20000": "وزع الميزانية على الاحتياجات الأساسية، مع تخصيص جزء مناسب للتسويق وتحسين التشغيل.",
        "20000to50000": "وازن بين تطوير الخدمات والتسويق وتحسين العمليات، مع متابعة أثر كل استثمار.",
        over50000: "ضع خطة استثمار واضحة للميزانية، وحدد أهدافًا قابلة للقياس قبل التوسع في الإنفاق.",
        undecided: "ابدأ بتحديد الأولويات وتقدير التكاليف، ثم اعتمد ميزانية تتناسب مع أهداف المشروع ومرحلة نموه."
    };

    const selected = recommendations[need];

    const today = new Date().toLocaleDateString("ar-SA", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    result.innerHTML = `
        <div class="recommendation-card">

            <p><strong>سَنَد | تقرير استشاري مبدئي</strong></p>
            <h3>تقرير سَنَد المبدئي لمشروعك</h3>
            <p>تاريخ التقرير: ${today}</p>

            <hr>

            <h4>1. الملخص التنفيذي</h4>
            <p>
                بناءً على إجاباتك، تم تحديد ${selected.title}
                كأولوية تستحق اهتمام مشروعك في المرحلة الحالية.
                يهدف هذا التقرير إلى مساعدتك على ترتيب خطواتك القادمة.
            </p>

            <h4>2. بيانات المشروع</h4>
            <p><strong>نوع المشروع:</strong> ${typeNames[type]}</p>
            <p><strong>الميزانية:</strong> ${budgetNames[budget]}</p>
            <p><strong>الاحتياج الأساسي:</strong> ${selected.title}</p>

            <h4>3. قراءة سَنَد لطبيعة المشروع</h4>
            <p>${projectInsights[type]}</p>

            <h4>4. تحليل الاحتياج</h4>
            <p>${selected.analysis}</p>

            <h4>5. نقاط تستحق الانتباه</h4>
            <p><strong>نقطة إيجابية:</strong> ${selected.strength}</p>
            <p><strong>تحدٍ محتمل:</strong> ${selected.challenge}</p>

            <h4>6. التوصيات العملية</h4>
            <ul>
                ${selected.steps.map(step => `<li>${step}</li>`).join("")}
            </ul>

            <h4>7. التوصية المالية</h4>
            <p>${budgetRecommendations[budget]}</p>

            <h4>8. خطة العمل المقترحة</h4>
            <ol>
                <li>ابدأ بالخطوة الأولى: ${selected.steps[0]}</li>
                <li>انتقل إلى الخطوة الثانية: ${selected.steps[1]}</li>
                <li>تابع النتائج من خلال الخطوة الثالثة: ${selected.steps[2]}</li>
            </ol>

            <hr>

            <p>
                <strong>رسالة سَنَد لك:</strong>
                نجاح المشروع يبدأ بفهم احتياجه،
                ثم اتخاذ خطوات واضحة ومدروسة.
                نحن هنا لنسند رحلتك.
            </p>

            <p>سَنَد | شريك نجاح مشروعك</p>

        </div>
    `;

    result.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}
