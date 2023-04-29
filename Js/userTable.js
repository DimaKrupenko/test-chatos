const form = document.querySelector('.user-form');
const table = document.getElementById('users-table');
const tbody = table.querySelector('tbody');
const rows = Array.from(tbody.children);

form.addEventListener('submit', onFormSubmission);

function onFormSubmission(event) {
  event.preventDefault();

  const formEl = event.currentTarget.elements;

  const name = formEl.name.value;
  const email = formEl.email.value;
  const age = formEl.age.value;
  const id = Math.random().toString(36).substr(2, 4);

  if (name.length === 0 || email.length === 0 || age.length === 0) {
    return alert('All fields must be filled!');
  }
  addUser(id, name, email, age);

  event.target.reset();
}

function addUser(id, name, email, age) {
  const newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td>${id}</td>
    <td class="editable">${name}</td>
    <td class="editable">${email}</td>
    <td class="editable">${age}</td>
    <td>
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
    </td>
  `;

  const deleteBtn = newRow.querySelector('.delete-btn');
  deleteBtn.addEventListener('click', function () {
    deleteUser(id, newRow);
  });

  const editBtn = newRow.querySelector('.edit-btn');
  editBtn.addEventListener('click', function () {
    toggleEditable(newRow);
  });

  tbody.appendChild(newRow);
}

function deleteUser(id, rowToDelete) {
  tbody.removeChild(rowToDelete);
}

function toggleEditable(row) {
  const cells = row.querySelectorAll('.editable');

  cells.forEach(cell => {
    const text = cell.innerText;

    cell.innerHTML = `<input type="text" value="${text}">`;

    const input = cell.querySelector('input');
    input.addEventListener('keydown', handleKeydown);
    input.addEventListener('blur', handleBlur);
  });
}

function handleKeydown(event) {
  const key = event.key;
  const input = event.currentTarget;
  if (key === 'Enter') {
    saveChanges(input);
  } else if (key === 'Escape') {
    cancelChanges(input);
  }
}

function handleBlur(event) {
  const input = event.currentTarget;
  saveChanges(input);
}

function saveChanges(input) {
  const newValue = input.value;
  const cell = input.parentNode;
  cell.innerText = newValue;
}

function cancelChanges(input) {
  const cell = input.parentNode;
  const text = input.getAttribute('data-old-value');
  cell.innerText = text;
}
