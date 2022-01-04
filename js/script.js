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

const sortDatesOfBirthUp = (data) => {
	data.employees.sort((a, b) => {
		if (a.dateOfBirth > b.dateOfBirth) {
			return 1;
		}
		if (a.dateOfBirth < b.dateOfBirth) {
			return -1;
		}
		return 0;
	});
	drawStuffList(data);
};

const sortDatesIfBirthDown = (data) => {
	data.employees.sort((a, b) => {
		if (b.dateOfBirth > a.dateOfBirth) {
			return 1;
		}
		if (b.dateOfBirth < a.dateOfBirth) {
			return -1;
		}
		return 0;
	});
	drawStuffList(data);
};

const sortDatesOfEmploymentUp = (data) => {
	data.employees.sort((a, b) => {
		if (a.dateOfBirth > b.dateOfBirth) {
			return 1;
		}
		if (a.dateOfBirth < b.dateOfBirth) {
			return -1;
		}
		return 0;
	});
	drawStuffList(data);
};

const sortDatesOfEmploymentDown = (data) => {
	data.employees.sort((a, b) => {
		if (b.dateOfBirth > a.dateOfBirth) {
			return 1;
		}
		if (b.dateOfBirth < a.dateOfBirth) {
			return -1;
		}
		return 0;
	});
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
	data.employees.forEach((employee, index) => {
		if (employee.checked === true) {
			data.employees.splice(index, 1);
		}
		return data;
	});
	showNumberOfEmployes(data);
	drawStuffList(data);
}; //delete one by one if I click on button "fire employees"

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
			case [...event.target.classList].includes("btnSortUpBirth"):
				sortDatesOfBirthUp(data);
				console.log(data);
				break;
			case [...event.target.classList].includes("btnSortDownBirth"):
				sortDatesIfBirthDown(data);
				console.log(data);
				break;
			case [...event.target.classList].includes("btnSortUpEmploymentDate"):
				sortDatesOfEmploymentUp(data);
				console.log(data);
				break;
			case [...event.target.classList].includes("btnSortDownEmploymentDate"):
				sortDatesOfEmploymentDown(data);
				console.log(data);
				break;
		}
	});
};
init();
