const createButton = document.getElementById('create');
const clearButton = document.getElementById('clear');
const deleteButton = document.getElementById('delete');
const confirmButton = document.getElementById('confirm-btn');

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

    const tdEdit = document.createElement('td')
    tdEdit.type = 'submit';
    tdEdit.name = 'редакция';
    tdEdit.value = 'редакция';

    const tdCheckBox = document.createElement('td')
    tdCheckBox.className = 'check';
    const checkBoxInput = document.createElement('input');
    checkBoxInput.type = 'checkbox';
    checkBoxInput.name = 'select';
    tdCheckBox.appendChild(checkBoxInput);

    const newRow = document.createElement('tr');
    newRow.append(tdCode, tdQtty, tdWeight1Piece, tdTottalyWeight, tdPackage, tdNumberPackage, tdPalletType, tdPalletType, tdCheckBox)

    tBodyElement.appendChild(newRow);
    createRowTotal();
    clearInputs();

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
})

clearButton.addEventListener('click', (e) => {
    e.preventDefault()

    const tBodyElement = document.querySelector('tbody');
    tBodyElement.innerHTML = '';
})

confirmButton.addEventListener('click', () => {
    const confirmedSheet = {
        totalQuantity: sumColumnTotal('thQtty'),
        totalWeight: sumColumnTotal('thTotalWeight'),
        totalPackage: sumColumnTotal('thPackage'), // ТРАБВА ДА СЕ РЕДАКТИРА!
        totalNumberOfPallets: sumColumnTotal('thNumberOfPallets'),
    }
    const tBodyElement = document.querySelector('tbody');
    tBodyElement.innerHTML = '';
    console.log(confirmedSheet);
})

function clearInputs() {
    const codeInput = document.getElementById('Code');
    const qttyInput = document.getElementById('Qtty'); 
    const packageInput = document.getElementById('package'); 
    const numberPackageInput = document.getElementById('numberOfPallets');
    const palletTypeInput = document.getElementById('palletType');

    codeInput.value = '';
    qttyInput.value = '';
    packageInput.value = '';
    numberPackageInput.value = '';
    palletTypeInput.value = '';
}

function createRowTotal() {
    const tBodyElement = document.querySelector('tbody');
    const createdRows = tBodyElement.children;

    if (createdRows.length > 1) {
        const removedRow =  createdRows[createdRows.length - 1]
        createdRows[createdRows.length - 1].remove()
        const totalRow = createdRows[createdRows.length - 1]
        createdRows[createdRows.length - 1].remove()
        tBodyElement.appendChild(removedRow)
        tBodyElement.appendChild(totalRow)

        const tdQtty = totalRow.querySelector(`td:nth-child(${2})`);
        tdQtty.textContent = sumColumnTotal('thQtty');

        const tdTotalWeight = totalRow.querySelector(`td:nth-child(${4})`);
        tdTotalWeight.textContent = sumColumnTotal('thTotalWeight');

        const tdPackage = totalRow.querySelector(`td:nth-child(${5})`);
        tdPackage.textContent = sumColumnTotal('thPackage');

        const tdNumberOfPallets = totalRow.querySelector(`td:nth-child(${6})`);
        tdNumberOfPallets.textContent = sumColumnTotal('thNumberOfPallets');
        return
    }

    const tdCodeTotal = document.createElement('td');
    tdCodeTotal.textContent = 'TОТАЛ';

    const tdQttyTotal = document.createElement('td');
    tdQttyTotal.textContent = '';

    const tdWeight1PieceTotal = document.createElement('td');
    tdWeight1PieceTotal.textContent = '';

    const tdTottalyWeightTotal = document.createElement('td');
    tdTottalyWeightTotal.textContent = '';

    const tdPackageTotal = document.createElement('td');
    tdPackageTotal.textContent = '';

    const tdNumberPackageTotal = document.createElement('td');
    tdNumberPackageTotal.textContent = '';

    const tdPalletTypeTotal = document.createElement('td');
    tdPalletTypeTotal.textContent = '';

    const newRowTotal = document.createElement('tr');
    newRowTotal.append(tdCodeTotal, tdQttyTotal, tdWeight1PieceTotal, tdTottalyWeightTotal, tdPackageTotal, tdNumberPackageTotal, tdPalletTypeTotal)

    tBodyElement.appendChild(newRowTotal);

    tdQttyTotal.textContent = sumColumnTotal('thQtty');
    tdTottalyWeightTotal.textContent = sumColumnTotal('thTotalWeight');
    tdPackageTotal.textContent = sumColumnTotal('thPackage');
    tdNumberPackageTotal.textContent = sumColumnTotal('thNumberOfPallets');
}

function sumColumnTotal(columnidStr) {
    // Find the column wich elements we want to sum
    const col = document.getElementById(columnidStr);

    //const tBodyElement = document.querySelector('tbody');

    const nColumn = Number(col.getAttribute('n'));  
    const qttyColumnElementsList = [];

    // Get all tr elements within the tbody except the last one ( last one is TOTAL ROW where we sum)
    const trElements = document.querySelectorAll('tbody tr:not(:last-child)');

    // Iterate over each tr element
    trElements.forEach(tr => {

        // Get the nth child td element within each tr
        const tdElement = tr.querySelector(`td:nth-child(${nColumn})`);

        // Check if the td element exists
        if (tdElement) {
            // Add the td element to the list
            qttyColumnElementsList.push(tdElement);
        }
    })
    const result = qttyColumnElementsList.reduce((acc, element) => acc + Number(element.textContent) ,0);
    return result;
}
