const baseUrl = "http://localhost:8081/employees";

// Load employees on page load
window.onload = loadEmployees;

function loadEmployees() {
    fetch(baseUrl)
        .then(res => res.json())
        .then(data => {
            const table = document.getElementById("employeeTable");
            table.innerHTML = "";

            data.forEach(e => {
                table.innerHTML += `
                    <tr>
                        <td>${e.id}</td>
                        <td>${e.name}</td>
                        <td>${e.department}</td>
                        <td>
                            <button class="action-btn edit"
                                onclick="editEmployee(${e.id}, '${e.name}', '${e.department}')">
                                Edit
                            </button>
                            <button class="action-btn delete"
                                onclick="deleteEmployee(${e.id})">
                                Delete
                            </button>
                        </td>
                    </tr>
                `;
            });
        });
}

// Save or Update Employee
function saveEmployee() {
    const id = document.getElementById("empId").value;
    const name = document.getElementById("name").value;
    const department = document.getElementById("department").value;

    if (name === "" || department === "") {
        alert("Please fill all fields");
        return;
    }

    const employee = { name, department };

    if (id === "") {
        // POST
        fetch(baseUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(employee)
        }).then(loadEmployees);
    } else {
        // PUT
        fetch(`${baseUrl}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(employee)
        }).then(loadEmployees);
    }

    clearForm();
}

function editEmployee(id, name, department) {
    document.getElementById("empId").value = id;
    document.getElementById("name").value = name;
    document.getElementById("department").value = department;
}

function deleteEmployee(id) {
    fetch(`${baseUrl}/${id}`, {
        method: "DELETE"
    }).then(loadEmployees);
}

function clearForm() {
    document.getElementById("empId").value = "";
    document.getElementById("name").value = "";
    document.getElementById("department").value = "";
}
