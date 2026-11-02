
let projects = JSON.parse(localStorage.getItem("sanad-projects") || "[]");
let editingProjectId = null;

// عرض نموذج إضافة مشروع
function showNewProject() {
    editingProjectId = null;
    displayProjectForm();
}

// عرض نموذج المشروع
function displayProjectForm(project = null) {
    document.getElementById("new-project-area").innerHTML = `
        <div class="new-project-form">
            <h3>${project ? "تعديل بيانات المشروع" : "إضافة مشروع جديد"}</h3>
            <p>أدخل البيانات الأساسية لمشروعك.</p>

            <form id="project-form">
                <label>اسم المشروع</label>
                <input type="text" id="project-name" required>

                <label>نوع المشروع</label>
                <select id="project-type" required>
                    <option value="">اختر نوع المشروع</option>
                    <option>متجر إلكتروني</option>
                    <option>مشروع خدمي</option>
                    <option>مشروع ناشئ</option>
                    <option>فكرة مشروع</option>
                    <option>أخرى</option>
                </select>

                <label>وصف المشروع</label>
                <textarea id="project-description" rows="4"></textarea>

                <button type="submit" class="primary-button">
                    ${project ? "حفظ التعديلات" : "حفظ المشروع"}
                </button>

                <button type="button" class="cancel-project" onclick="closeNewProject()">
                    إلغاء
                </button>
            </form>
        </div>
    `;

    if (project) {
        document.getElementById("project-name").value = project.name;
        document.getElementById("project-type").value = project.type;
        document.getElementById("project-description").value =
            project.description || "";
    }

    document.getElementById("project-form").addEventListener("submit", saveProject);
}

// تعديل مشروع
function showEditProject(projectId) {
    const project = projects.find(item => item.id === projectId);
    if (!project) return;

    editingProjectId = projectId;
    displayProjectForm(project);
}

// حفظ المشروع
function saveProject(event) {
    event.preventDefault();

    const projectData = {
        name: document.getElementById("project-name").value.trim(),
        type: document.getElementById("project-type").value,
        description: document.getElementById("project-description").value.trim()
    };

    if (editingProjectId !== null) {
        const project = projects.find(item => item.id === editingProjectId);

        if (project) {
            Object.assign(project, projectData);
        }

        alert("تم تعديل المشروع بنجاح 💚");
    } else {
        projects.push({
            id: Date.now(),
            ...projectData,
            createdAt: new Date().toLocaleDateString("ar-SA")
        });

        alert("تم حفظ المشروع بنجاح 💚");
    }

    localStorage.setItem("sanad-projects", JSON.stringify(projects));

    closeNewProject();
    displayProjects();
}

// فتح صفحة المشروع
function openProject(projectId) {
    window.location.href = "project.html?id=" + projectId;
}

// حذف مشروع
function deleteProject(projectId) {
    const project = projects.find(item => item.id === projectId);
    if (!project) return;

    if (!confirm("هل تريد حذف مشروع " + project.name + "؟")) return;

    projects = projects.filter(item => item.id !== projectId);

    localStorage.setItem("sanad-projects", JSON.stringify(projects));

    const diagnoses = JSON.parse(
        localStorage.getItem("sanad-diagnoses") || "{}"
    );

    delete diagnoses[projectId];

    localStorage.setItem("sanad-diagnoses", JSON.stringify(diagnoses));

    localStorage.removeItem("sanad-chat-" + projectId);
    localStorage.removeItem("sanad-notes-" + projectId);

    displayProjects();

    alert("تم حذف المشروع بنجاح.");
}

// إغلاق النموذج
function closeNewProject() {
    editingProjectId = null;
    document.getElementById("new-project-area").innerHTML = "";
}

// عرض المشاريع
function displayProjects() {
    const list = document.getElementById("project-list");
    list.innerHTML = "";

    if (projects.length === 0) {
        list.innerHTML = `
            <div class="empty-projects">
                <h3>مساحتك جاهزة لاستقبال أول مشروع</h3>
                <p>أضيفي مشروعك الأول وابدئي رحلتك معنا.</p>
                <button class="primary-button" onclick="showNewProject()">
                    أضيفي مشروعك الأول
                </button>
            </div>
        `;
        return;
    }

    projects.forEach(function(project) {
        const card = document.createElement("article");
        card.className = "project-card";

        const title = document.createElement("h3");
        title.textContent = project.name;

        const type = document.createElement("p");
        type.textContent = project.type;

        const description = document.createElement("p");
        description.textContent =
            project.description || "لا يوجد وصف للمشروع حتى الآن.";

        const date = document.createElement("small");
        date.textContent = "تاريخ الإضافة: " + project.createdAt;

        const openButton = document.createElement("button");
        openButton.type = "button";
        openButton.className = "primary-button";
        openButton.textContent = "فتح المشروع";

        openButton.addEventListener("click", function() {
            openProject(project.id);
        });

        const editButton = document.createElement("button");
        editButton.type = "button";
        editButton.className = "primary-button";
        editButton.textContent = "تعديل المشروع";

        editButton.addEventListener("click", function() {
            showEditProject(project.id);
        });

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "cancel-project";
        deleteButton.textContent = "حذف المشروع";

        deleteButton.addEventListener("click", function() {
            deleteProject(project.id);
        });

        card.append(
            title,
            type,
            description,
            date,
            openButton,
            editButton,
            deleteButton
        );

        list.appendChild(card);
    });
}

displayProjects();
