const createButton = document.getElementById('create');
const clearButton = document.getElementById('clear');
const deleteButton = document.getElementById('delete');


createButton.addEventListener('click', (e) => {
    e.preventDefault();

    const codeInput = document.getElementById('Code');
    const qttyInput = document.getElementById('Qtty'); 
    const packageInput = document.getElementById('package'); 
    const numberPackageInput = document.getElementById('numberOfPallets');
    const palletTypeInput = document.getElementById('palletType');
    
    const tBodyElement = document.querySelector('tbody');


    const tdCode = document.createElement('td');
    tdCode.textContent = codeInput.value;

    const tdQtty = document.createElement('td');
    tdQtty.textContent = qttyInput.value;

    const tdWeight1Piece = document.createElement('td');
    tdWeight1Piece.textContent = 1;

    const tdTottalyWeight = document.createElement('td');
    tdTottalyWeight.textContent = Number(qttyInput.value) * 1

    const tdPackage = document.createElement('td');
    tdPackage.textContent = packageInput.value;

    const tdNumberPackage = document.createElement('td');
    tdNumberPackage.textContent = numberPackageInput.value;

    const tdPalletType = document.createElement('td');
    tdPalletType.textContent = palletTypeInput.value;

    const tdCheckBox = document.createElement('td')
    tdCheckBox.className = 'check';
    const checkBoxInput = document.createElement('input');
    checkBoxInput.type = 'checkbox';
    checkBoxInput.name = 'select';
    tdCheckBox.appendChild(checkBoxInput);

    const newRow = document.createElement('tr');
    newRow.append(tdCode, tdQtty, tdWeight1Piece, tdTottalyWeight, tdPackage, tdNumberPackage, tdPalletType, tdPalletType, tdCheckBox)

    tBodyElement.appendChild(newRow);


})

deleteButton.addEventListener('click', (e) => {
    e.preventDefault();
    const tbodyElement = document.querySelector('tBody');
    const checkedRows = document.querySelectorAll('tbody tr td.check input');
    checkedRows.forEach(row => {
        if (row.checked){
            const rowElement = row.closest('tr');
            rowElement.remove();
        }
    })


    //console.log(tbodyElement);
    // console.log(checkedRows);
})