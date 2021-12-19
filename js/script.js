const commonVariables = (eventTarget, data) => {
	const employee = eventTarget.closest(".wrapper__tableTr").id;
	const employeeId = +employee.id;
	const chosenEmployee = data.employees.filter(
		(employee) => employee.id === employeeId
	);
	const chooseEmployeeIndex = data.employees.findIndex(
		(employee) => employee.id === chosenEmployee.id
	);

	return { employee, chosenEmployee, chooseEmployeeIndex };
};

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
							class="wrapper__checkbox"
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

const deleteEmployeeFromStuffList = (eventTarget, data) => {
	const { employee, chosenEmployee, chooseEmployeeIndex } = commonVariables(
		eventTarget,
		data
	);
	const checkbox = document.getElementsByName("chooseEmployee");

	for (let i = 0; checkbox[i]; i++) {
		if (checkbox[i].checked) {
			data.employees.splice(chooseEmployeeIndex, 1);
		}
	}
	drawStuffList(data);
	console.log(data);
};//need to fix ! delete another <tr>. Doesn't see, where is checkbox

const init = () => {
	const stuff = document.querySelector("#stuff");
	const addEmployeeBtn = document.querySelector("#addEmployeeBtn");

	const data = {
		employees: [],
	};

	addEmployeeBtn.addEventListener("click", (event) => {
		event.preventDefault();
		addEmployees(data);
		console.log(data);
	});

	stuff.addEventListener("click", (event) => {
		switch (true) {
			case [...event.target.classList].includes("btnFireAnEmployee"):
				deleteEmployeeFromStuffList(event.target, data);
				break;
		}
	});
};
init();
