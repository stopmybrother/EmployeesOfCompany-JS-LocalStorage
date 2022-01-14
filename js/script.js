const drawStuffList = (employees) => {
	const allEmployees = document.querySelector("#allEmployees");

	allEmployees.innerHTML = "";
	employees.forEach((employee) => {
		allEmployees.innerHTML += `
			<tr class="wrapper__tableTr">
			<th class="wrapper__tableTh tbodyTh">
			<div class="wrapper__checkboxWrap">
			<input
			type="checkbox"
			name="chooseEmployee"
			class="wrapper__checkbox"
			id=${employee.id}
			/>
			</div>
			</th>
			<th class="wrapper__tableTh tbodyTh">${employee.name}</th>
			<th class="wrapper__tableTh tbodyTh">${employee.dateOfBirth}</th>
			<th class="wrapper__tableTh tbodyTh">${employee.dateOfEmployment}</th>
			<th class="wrapper__tableTh tbodyTh">${employee.wage}</th>
			</tr>
			`;
	});
};

const addEmployees = (employees) => {
	const addEmployeeForm = document.querySelector("#addEmployeeForm");
	const inputName = document.querySelector("#inputName");
	const inputDateOfBirth = document.querySelector("#inputDateOfBirth");
	const inputDateOfEmployment = document.querySelector("#inputDateOfEmployment");
	const inputWage = document.querySelector("#inputWage");

	employees.push({
		name: inputName.value,
		dateOfBirth: inputDateOfBirth.value,
		dateOfEmployment: inputDateOfEmployment.value,
		wage: inputWage.value,
		id: Date.now(),
		checked: false,
	});

	localStorage.setItem("employees", JSON.stringify(employees));

	addEmployeeForm.reset();
	drawStuffList(employees);
};

const sortDates = (eventTarget, employees) => {
	if (eventTarget.classList.contains("btnSortUpBirth")) {
		employees.sort(
			(a, b) => new Date(a.dateOfBirth) - new Date(b.dateOfBirth)
		);
	}
	if (eventTarget.classList.contains("btnSortDownBirth")) {
		employees.sort(
			(a, b) => new Date(b.dateOfBirth) - new Date(a.dateOfBirth)
		);
	}
	if (eventTarget.classList.contains("btnSortUpEmploymentDate")) {
		employees.sort(
			(a, b) => new Date(a.dateOfEmployment) - new Date(b.dateOfEmployment)
		);
	}
	if (eventTarget.classList.contains("btnSortDownEmploymentDate")) {
		employees.sort(
			(a, b) => new Date(b.dateOfEmployment) - new Date(a.dateOfEmployment)
		);
	}
	localStorage.setItem("employees", JSON.stringify(employees));
	drawStuffList(employees);
};

const showNumberOfEmployes = (employees) => {
	const numberOfEmployees = document.querySelector("#numberOfEmployees");
	numberOfEmployees.innerHTML = employees.length;
};

const showAmountOfWages = (employees) => {
	const amountOfWages = document.querySelector("#amountOfWages");

	let amount = 0;
	employees.forEach((employee) => {
		if (employee.checked === true) {
			amount += +employee.wage;
		}
	});
	amountOfWages.innerHTML = amount + " $";
};

const deleteEmployeeFromStuffList = (employees) => {
	const newEmployees = employees.filter(
		(employee) => employee.checked === false
	);
	employees = newEmployees;

	localStorage.setItem("employees", JSON.stringify(employees));

	showNumberOfEmployes(employees);
	drawStuffList(employees);
};

const init = () => {
	const stuff = document.querySelector("#stuff");
	const allEmployees = document.querySelector("#allEmployees");
	const addEmployeeBtn = document.querySelector("#addEmployeeBtn");

	const data = {
		employees: [],
	};

	if (localStorage.length > 0) {
		let employeesFromLS = JSON.parse(localStorage.getItem("employees"));
		data.employees = employeesFromLS;
		drawStuffList(data.employees);
		showNumberOfEmployes(data.employees)
		console.log(data.employees);
	}

	addEmployeeBtn.addEventListener("click", (event) => {
		event.preventDefault();
		addEmployees(data.employees);
		showNumberOfEmployes(data.employees);
	});

	allEmployees.addEventListener("click", (event) => {
		if (event.target.tagName === "INPUT") {
			const checkboxId = event.target.id;

			data.employees.forEach((employee) => {
				if (employee.id === +checkboxId) {
					employee.checked = !employee.checked;
				}
				return employee;
			});
		}
	});

	stuff.addEventListener("click", (event) => {
		switch (true) {
			case [...event.target.classList].includes("btnFireAnEmployee"):
				deleteEmployeeFromStuffList(data.employees);
				showAmountOfWages(data.employees);
				break;
			case [...event.target.classList].includes("btnShowAmountOfWages"):
				showAmountOfWages(data.employees);
				break;
			case [...event.target.classList].includes("btnSortUpBirth") ||
				[...event.target.classList].includes("btnSortDownBirth") ||
				[...event.target.classList].includes("btnSortUpEmploymentDate") ||
				[...event.target.classList].includes("btnSortDownEmploymentDate"):
				sortDates(event.target, data.employees);
				break;
		}
	});
};
init();
