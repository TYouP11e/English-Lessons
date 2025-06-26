const buttonTesting = document.querySelector(".test-label");
const modalTest = document.querySelector(".modal_test");
const closedTest = document.querySelector(".closed_test");


buttonTesting.addEventListener("click", () => {
  modalTest.style.display = "flex";
});

closedTest.addEventListener("click", closedModal);

function closedModal() {
  modalTest.style.display = "none";
}

modalTest.addEventListener("click", (event) => {
  if (event.target === modalTest) {
    closedModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closedModal();
  }
});