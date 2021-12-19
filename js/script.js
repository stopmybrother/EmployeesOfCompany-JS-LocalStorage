const drawStuffList = (data) => {
	const allEmployees = document.querySelector("#allEmployees");

	allEmployees.innerHTML = "";
	data.employees.forEach((employee) => {
		allEmployees.innerHTML += `
			<tr class="wrapper__tableTr" id="${employee.id}">
				<th class="wrapper__tableTh tbodyTh">
					<div class="wrapper__checkboxWrap">
						<input
							type="checkbox"
							name="chooseEmployee"
							id="checkbox"
							class="wrapper__checkbox"
						/>
						<label for="checkbox"></label>
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
	const checkbox = document.querySelector("#checkbox");

	data.employees.push({
		name: inputName.value,
		dateOfBirth: inputDateOfBirth.value,
		dateOfEmployment: inputDateOfEmployment.value,
		wage: inputWage.value,
		id: Date.now(),
	});

	addEmployeeForm.reset();
	drawStuffList(data);
};

const init = () => {
	const stuff = document.querySelector("#stuff");
	const addEmployeeBtn = document.querySelector("#addEmployeeBtn");
	const checkbox = document.querySelector("#checkbox");

	const data = {
		employees: [],
		chosen: [],
	};

	addEmployeeBtn.addEventListener("click", (event) => {
		event.preventDefault();
		addEmployees(data);
		console.log(data);
	});
};
init();
