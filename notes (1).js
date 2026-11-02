
const noteProjectId = new URLSearchParams(window.location.search).get("id");

const notesForm = document.getElementById("notes-form");
const notesList = document.getElementById("notes-list");

if (!noteProjectId) {
    notesList.textContent = "افتح المشروع من لوحة التحكم أولًا.";
} else {
    const notesKey = "sanad-notes-" + noteProjectId;
    let notes = JSON.parse(localStorage.getItem(notesKey) || "[]");

    function displayNotes() {
        notesList.innerHTML = "";

        if (notes.length === 0) {
            notesList.textContent = "لا توجد ملاحظات محفوظة حتى الآن.";
            return;
        }

        notes.forEach(function(note) {
            const card = document.createElement("div");
            card.className = "project-card";
            card.style.marginBottom = "15px";

            const title = document.createElement("h3");
            title.textContent = note.title;

            const content = document.createElement("p");
            content.textContent = note.content;

            const date = document.createElement("small");
            date.textContent = "تاريخ الحفظ: " + note.date;

            const deleteButton = document.createElement("button");
            deleteButton.type = "button";
            deleteButton.className = "cancel-project";
            deleteButton.textContent = "حذف الملاحظة";

            deleteButton.addEventListener("click", function() {
                notes = notes.filter(item => item.id !== note.id);
                localStorage.setItem(notesKey, JSON.stringify(notes));
                displayNotes();
            });

            card.append(title, content, date, deleteButton);
            notesList.appendChild(card);
        });
    }

    notesForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const title = document.getElementById("note-title").value.trim();
        const content = document.getElementById("note-content").value.trim();

        if (!title || !content) {
            alert("اكتبي عنوان الملاحظة وتفاصيلها.");
            return;
        }

        notes.push({
            id: Date.now(),
            title: title,
            content: content,
            date: new Date().toLocaleDateString("ar-SA")
        });

        localStorage.setItem(notesKey, JSON.stringify(notes));

        notesForm.reset();
        displayNotes();

        alert("تم حفظ الملاحظة بنجاح 💚");
    });

    displayNotes();
}

const params = new URLSearchParams(window.location.search);

let noteProjectId = params.get("id");

const savedProjects = JSON.parse(
    localStorage.getItem("sanad-projects") || "[]"
);

// إذا لم يصل رقم المشروع، نستخدم المشروع الوحيد المحفوظ
if (!noteProjectId && savedProjects.length === 1) {
    noteProjectId = String(savedProjects[0].id);
}

const notesForm = document.getElementById("notes-form");
const notesList = document.getElementById("notes-list");

if (!noteProjectId) {
    notesList.textContent = "تعذر تحديد المشروع. تأكدي من وجود مشروع محفوظ.";
} else {
    const notesKey = "sanad-notes-" + noteProjectId;
    let notes = JSON.parse(localStorage.getItem(notesKey) || "[]");

    function displayNotes() {
        notesList.innerHTML = "";

        if (notes.length === 0) {
            notesList.textContent = "لا توجد ملاحظات محفوظة حتى الآن.";
            return;
        }

        notes.forEach(function(note) {
            const card = document.createElement("div");
            card.className = "project-card";
            card.style.marginBottom = "15px";

            const title = document.createElement("h3");
            title.textContent = note.title;

            const content = document.createElement("p");
            content.textContent = note.content;

            const date = document.createElement("small");
            date.textContent = "تاريخ الحفظ: " + note.date;

            const deleteButton = document.createElement("button");
            deleteButton.type = "button";
            deleteButton.className = "cancel-project";
            deleteButton.textContent = "حذف الملاحظة";

            deleteButton.onclick = function() {
                notes = notes.filter(item => item.id !== note.id);
                localStorage.setItem(notesKey, JSON.stringify(notes));
                displayNotes();
            };

            card.append(title, content, date, deleteButton);
            notesList.appendChild(card);
        });
    }

    notesForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const title = document.getElementById("note-title").value.trim();
        const content = document.getElementById("note-content").value.trim();

        if (!title || !content) return;

        notes.push({
            id: Date.now(),
            title: title,
            content: content,
            date: new Date().toLocaleDateString("ar-SA")
        });

        localStorage.setItem(notesKey, JSON.stringify(notes));

        notesForm.reset();
        displayNotes();

        alert("تم حفظ الملاحظة بنجاح 💚");
    });

    displayNotes();
}
