// modalne vikno

const overlay = document.querySelector(".overlay");
const button = document.querySelector("#openModal");
const buttonClose = document.querySelector("#closeModal");
const submitBtn = document.querySelector("form");
const allFaq = document.querySelectorAll(".faq-question");
const faqItems = document.querySelectorAll(".faq-item");

button.addEventListener("click", () => {
  overlay.style.display = "flex";
});

buttonClose.addEventListener("click", closedModal);

function closedModal() {
  overlay.style.display = "none";
}

overlay.addEventListener("click", (event) => {
  if (event.target === overlay) {
    closedModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closedModal();
  }
});

submitBtn.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = {
    name: event.target.elements.name.value,
    phone: event.target.elements.phone.value,
    email: event.target.elements.email.value,
    comment: event.target.elements.comment.value,
    agreement: event.target.elements.agreement.checked,
  };

  try {
    const response = await fetch("web.telegram.org/a/#7575337693", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        message: formData.comment,
      }),
    });
    if (!response.ok) {
      throw new Error("Помилка при надсиланні форми");
    }

    alert("Дані успішно надіслані!");
    overlay.style.display = "none";
    submitBtn.reset();
  } catch (error) {
    console.error(error);
    alert("Сталася помилка при надсиланні форми. Спробуйте ще раз.");
  }
});

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");

  question.addEventListener("click", () => {
    item.classList.toggle("open");
  });
});

