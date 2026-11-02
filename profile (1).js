
const profileForm = document.getElementById("profile-form");

const savedProfile = JSON.parse(
    localStorage.getItem("sanad-profile") || "{}"
);

// عرض البيانات المحفوظة
document.getElementById("full-name").value =
    savedProfile.name || "";

document.getElementById("email").value =
    savedProfile.email || "";

document.getElementById("phone").value =
    savedProfile.phone || "";

// حفظ البيانات
profileForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const profile = {
        name: document.getElementById("full-name").value.trim(),
        email: document.getElementById("email").value.trim(),
        phone: document.getElementById("phone").value.trim()
    };

    localStorage.setItem("sanad-profile", JSON.stringify(profile));

    document.getElementById("profile-message").textContent =
        "تم حفظ بياناتك بنجاح 💚";
});
