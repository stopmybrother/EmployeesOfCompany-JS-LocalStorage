const drawStuffList = (data) => {
	const allEmployees = document.querySelector("#allEmployees");

	allEmployees.innerHTML = "";
	data.employees.forEach((employee) => {
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
	localStorage.setItem("data", JSON.stringify(data));
	console.log(localStorage);
	console.log(JSON.parse(localStorage.getItem("data"))); //????????????????
};

const addEmployees = (data) => {
	const addEmployeeForm = document.querySelector("#addEmployeeForm");
	const inputName = document.querySelector("#inputName");
	const inputDateOfBirth = document.querySelector("#inputDateOfBirth");
	const inputDateOfEmployment = document.querySelector("#inputDateOfEmployment");
	const inputWage = document.querySelector("#inputWage");

	data.employees.push({
		name: inputName.value,
		dateOfBirth: inputDateOfBirth.value,
		dateOfEmployment: inputDateOfEmployment.value,
		wage: inputWage.value,
		id: Date.now(),
		checked: false,
	});

	addEmployeeForm.reset();
	drawStuffList(data);
};

const sortDates = (eventTarget, data) => {
	if (eventTarget.classList.contains("btnSortUpBirth")) {
		data.employees.sort(
			(a, b) => new Date(a.dateOfBirth) - new Date(b.dateOfBirth)
		);
	}
	if (eventTarget.classList.contains("btnSortDownBirth")) {
		data.employees.sort(
			(a, b) => new Date(b.dateOfBirth) - new Date(a.dateOfBirth)
		);
	}
	if (eventTarget.classList.contains("btnSortUpEmploymentDate")) {
		data.employees.sort(
			(a, b) => new Date(a.dateOfEmployment) - new Date(b.dateOfEmployment)
		);
	}
	if (eventTarget.classList.contains("btnSortDownEmploymentDate")) {
		data.employees.sort(
			(a, b) => new Date(b.dateOfEmployment) - new Date(a.dateOfEmployment)
		);
	}
	drawStuffList(data);
};

const showNumberOfEmployes = (data) => {
	const numberOfEmployees = document.querySelector("#numberOfEmployees");
	numberOfEmployees.innerHTML = data.employees.length;
};

const showAmountOfWages = (data) => {
	const amountOfWages = document.querySelector("#amountOfWages");

	let amount = 0;
	data.employees.forEach((employee) => {
		if (employee.checked === true) {
			amount += +employee.wage;
		}
	});
	amountOfWages.innerHTML = amount + " $";
};

const deleteEmployeeFromStuffList = (data) => {
	const newEmployees = data.employees.filter(
		(employee) => employee.checked === false
	);
	data.employees = newEmployees;

	showNumberOfEmployes(data);
	drawStuffList(data);
};

const init = () => {
	const stuff = document.querySelector("#stuff");
	const allEmployees = document.querySelector("#allEmployees");
	const addEmployeeBtn = document.querySelector("#addEmployeeBtn");

	const data = {
		employees: [],
	};

	addEmployeeBtn.addEventListener("click", (event) => {
		event.preventDefault();
		addEmployees(data);
		showNumberOfEmployes(data);
		console.log(data);
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

			console.log(data);
		}
	});

	stuff.addEventListener("click", (event) => {
		switch (true) {
			case [...event.target.classList].includes("btnFireAnEmployee"):
				deleteEmployeeFromStuffList(data);
				showAmountOfWages(data);
				console.log(data);
				break;
			case [...event.target.classList].includes("btnShowAmountOfWages"):
				showAmountOfWages(data);
				console.log(data);
				break;
			case [...event.target.classList].includes("btnSortUpBirth") ||
				[...event.target.classList].includes("btnSortDownBirth") ||
				[...event.target.classList].includes("btnSortUpEmploymentDate") ||
				[...event.target.classList].includes("btnSortDownEmploymentDate"):
				sortDates(event.target, data);
				console.log(data);
				break;
		}
	});
	console.log(JSON.parse(localStorage.getItem("data")));
};
init();
