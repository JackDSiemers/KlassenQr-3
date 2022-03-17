const name = new URLSearchParams(window.location.search).get("name");
const surname = new URLSearchParams(window.location.search).get("surname");
const container = document.querySelector(".container");
const url = window.location.href;

/**
 * Diese Funktion holt die Posts vom Server und rendert sie im HTML
 * @param searchTerm
 * @returns {Promise<void>}
 */
async function renderPerson() {

    container.innerHTML = ""

    if (url === "http://127.0.0.1:8000/") {
        const response = await fetch(`http://127.0.0.1:8001/students`);

        const people = await response.json();

        people.map(student => {
            const personNode = document.createElement("article")
            personNode.classList.add("session")
            personNode.innerHTML = `
            <div key=student.id>
                <img class="img" src="/images/${student.imgSrc}">
            </div>
            <div>
                <h2>${student.name}</h2>
                <h2>${student.surname}</h2>
                <h2>${student.lehrjahr}. Lehrjahr</h2>
                <h2>${student.beruf}</h2>
            </div>
            `
            container.appendChild(personNode)
            document.title = `All Students`;
        });
    } else {

        const response = await fetch(`http://127.0.0.1:8001/students?name=${name}&surname=${surname}`);

        const person = await response.json();

        const personNode = document.createElement("article")
        personNode.classList.add("session")
        personNode.innerHTML = `
        <div>
            <img class="img" src="/images/${person[0].imgSrc}">
        </div>
        <div>
            <h2>${person[0].name}</h2>
            <h2>${person[0].surname}</h2>
            <h2>${person[0].lehrjahr}. Lehrjahr</h2>
            <h2>${person[0].beruf}</h2>
        </div>
        `
        container.appendChild(personNode)
        document.title = `${name} ${surname}`;
    }

}
renderPerson()