
// ========================================
// 18-WEEK WEBSITE
// JAVASCRIPT
// ========================================

// SETTINGS

const MAX_WEEKS = 18;

// DEFAULT WEEKS

const defaultWeeks = Array.from(
    { length: MAX_WEEKS },
    (_, index) => ({
        id: index + 1,
        title: `Week ${index + 1}`,
        description: "Add your weekly lesson, project, or notes here.",
        completed: false,
        custom: false
    })
);

// APP STATE

let sections = [...defaultWeeks];

// ELEMENTS

const weeksContainer =
    document.getElementById("weeks-container");

const sectionForm =
    document.getElementById("section-form");

const sectionTitle =
    document.getElementById("section-title");

const sectionDescription =
    document.getElementById("section-description");

const formMessage =
    document.getElementById("form-message");

const weekCounter =
    document.getElementById("week-counter");

const progressText =
    document.getElementById("progress-text");

const progressFill =
    document.getElementById("progress-fill");

// RENDER SECTIONS

function renderSections() {

    weeksContainer.innerHTML = "";

    sections.forEach(section => {

        const card = document.createElement("article");

        card.className = "week-card";

        const number = document.createElement("span");

        number.className = "week-number";

        number.textContent = section.custom
            ? "CUSTOM SECTION"
            : `WEEK ${section.id}`;

        const title = document.createElement("h3");

        title.textContent = section.title;

        const description = document.createElement("p");

        description.textContent = section.description;

        const actions = document.createElement("div");

        actions.className = "card-actions";

        const label = document.createElement("label");

        label.className = "complete-label";

        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.checked = section.completed;

        checkbox.addEventListener("change", () => {

            section.completed = checkbox.checked;

            updateProgress();

        });

        label.appendChild(checkbox);

        label.appendChild(
            document.createTextNode("Completed")
        );

        actions.appendChild(label);

        // CUSTOM SECTIONS CAN BE REMOVED

        if (section.custom) {

            const deleteButton =
                document.createElement("button");

            deleteButton.className = "delete-button";

            deleteButton.type = "button";

            deleteButton.textContent = "Remove";

            deleteButton.addEventListener("click", () => {

                sections = sections.filter(
                    item => item.id !== section.id
                );

                renderSections();

            });

            actions.appendChild(deleteButton);

        }

        card.appendChild(number);
        card.appendChild(title);
        card.appendChild(description);
        card.appendChild(actions);

        weeksContainer.appendChild(card);

    });

    updateProgress();

}

// UPDATE PROGRESS

function updateProgress() {

    const completed = sections.filter(
        section => section.completed
    ).length;

    const total = sections.length;

    progressText.textContent =
        `${completed} / ${total} sections completed`;

    const percentage = total === 0
        ? 0
        : (completed / total) * 100;

    progressFill.style.width = `${percentage}%`;

    weekCounter.textContent =
        `${total} Sections`;

}

// ADD NEW SECTION

sectionForm.addEventListener("submit", event => {

    event.preventDefault();

    const title = sectionTitle.value.trim();

    const description =
        sectionDescription.value.trim();

    if (!title || !description) {

        formMessage.textContent =
            "Please fill out both fields.";

        return;

    }

    const newId = sections.length > 0
        ? Math.max(...sections.map(section => section.id)) + 1
        : 1;

    const newSection = {

        id: newId,

        title: title,

        description: description,

        completed: false,

        custom: true

    };

    sections.push(newSection);

    renderSections();

    sectionForm.reset();

    formMessage.textContent =
        "New section added successfully!";

    document.getElementById("weeks")
        .scrollIntoView({
            behavior: "smooth"
        });

});

// START WEBSITE

renderSections();