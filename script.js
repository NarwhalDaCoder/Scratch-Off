
window.addEventListener('load', () => {
    const params = new URLSearchParams(window.location.search);
    const currentURL = window.location.href;
    const cookies = Object.fromEntries(document.cookie.split('; ').map(c => c.split('=')));
    const urls = cookies.urls ? JSON.parse(decodeURIComponent(cookies.urls)) : [];

    if (params.toString()) {
        if (urls.includes(currentURL)) {
            // The URL is present in the list of URLs
            toggleDiv('Page4');
        } else {
            urls.push(currentURL);
            document.cookie = `urls=${encodeURIComponent(JSON.stringify(urls))}`;
            // Query string is present
            const characterValues = JSON.parse(atob(params.get('characterValues')));
            const currencyValues = JSON.parse(atob(params.get('currencyValues')));
            const amountValues = JSON.parse(atob(params.get('amountValues')));
            const tryValues = JSON.parse(atob(params.get('tryValues')));
            const seedValues = JSON.parse(atob(params.get('seedValues')));
            const timeValues = JSON.parse(atob(params.get('timeValues')));
            const nameValues = JSON.parse(atob(params.get('nameValues')));

            generateGame(characterValues, currencyValues, amountValues, tryValues, seedValues, timeValues, nameValues);
            toggleDiv('Page3');
        }
    } else {
        // No query string
        toggleDiv('Page1');
    }
});
document.querySelector('#copyButton').addEventListener('click', () => {
    // Copy text to clipboard
    const text = document.querySelector('#exampleModal .modal-body p').textContent;
    navigator.clipboard.writeText(text);

    // Show Toast
    const toast = new bootstrap.Toast(document.querySelector('.toast'));
    toast.show();
});

const formPage1 = document.querySelector("#formPage1");
formPage1.addEventListener('submit', function (event) {
    event.preventDefault(); // prevent the default form submission behavior

    // handle form submission here
    const inputString = document.getElementById('inputString');
    const inputStringVal = inputString.value;
    const encodedString = btoa(inputStringVal);
    if (encodedString === 'bHVuYQ==') {
        console.log(true);
        inputString.classList.remove('is-invalid');
        toggleDiv('Page1');
        toggleDiv('Page2');
        let seedGroup = document.querySelector("#inputSeedGroup");
        let seedElement = seedGroup.querySelector("input");
        seedElement.value = Date.now().toString();
    } else {
        console.log(false);
        inputString.classList.add('is-invalid');
        if (inputStringVal === '') {
            inputString.nextElementSibling.textContent = 'Please enter a password';
        } else {
            inputString.nextElementSibling.textContent = 'Password does not match';
        }
    }
});
window.addEventListener('load', function () {
    let forms = document.getElementsByTagName('form');
    for (let i = 0; i < forms.length; i++) {
        forms[i].reset();
    }
});
function hashCode(str) {
    let hash = 0;
    for (let i = 0, len = str.length; i < len; i++) {
        let chr = str.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

const inputCharacterGroup = document.querySelector("#inputCharacterGroup");
const inputCurrencyGroup = document.querySelector("#inputCurrencyGroup");
const inputAmountGroup = document.querySelector("#inputAmountGroup");
const inputTriesGroup = document.querySelector("#inputTriesGroup");
const inputSeedsGroup = document.querySelector("#inputSeedGroup");

const addButton = document.querySelector("#addButton");
const removeButton = document.querySelector("#removeButton");
const myForm = document.querySelector("#myForm");

addButton.addEventListener("click", () => {
    if (inputCharacterGroup.childElementCount >= 10) return;
    const newCharFormGroup = document.createElement("div");
    newCharFormGroup.classList.add("form-group");
    const newCharInput = document.createElement("input");
    newCharInput.type = "text";
    newCharInput.classList.add("form-control");
    newCharInput.maxLength = 1;
    const newCharInvalidFeedback = document.createElement("div");
    newCharInvalidFeedback.classList.add("invalid-feedback");
    newCharFormGroup.appendChild(newCharInput);
    newCharFormGroup.appendChild(newCharInvalidFeedback);
    inputCharacterGroup.appendChild(newCharFormGroup);

    const newCurrFormGroup = document.createElement("div");
    newCurrFormGroup.classList.add("form-group");
    const newCurrInput = document.createElement("input");
    newCurrInput.type = "text";
    newCurrInput.classList.add("form-control");
    const newCurrInvalidFeedback = document.createElement("div");
    newCurrInvalidFeedback.classList.add("invalid-feedback");
    newCurrFormGroup.appendChild(newCurrInput);
    newCurrFormGroup.appendChild(newCurrInvalidFeedback);
    inputCurrencyGroup.appendChild(newCurrFormGroup);

    const newAmtFormGroup = document.createElement("div");
    newAmtFormGroup.classList.add("form-group");
    const newAmtInput = document.createElement("input");
    newAmtInput.type = "text";
    newAmtInput.classList.add("form-control");
    const newAmtInvalidFeedback = document.createElement("div");
    newAmtInvalidFeedback.classList.add("invalid-feedback");
    newAmtFormGroup.appendChild(newAmtInput);
    newAmtFormGroup.appendChild(newAmtInvalidFeedback);
    inputAmountGroup.appendChild(newAmtFormGroup);
});

removeButton.addEventListener("click", () => {
    if (inputCharacterGroup.childElementCount <= 3) return;
    inputCharacterGroup.removeChild(inputCharacterGroup.lastChild);
    inputCurrencyGroup.removeChild(inputCurrencyGroup.lastChild);
    inputAmountGroup.removeChild(inputAmountGroup.lastChild);
});
// Get references to the input elements and the square root indicator element
var inputs = document.querySelectorAll('#inputAmountGroup input');
var squareRootIndicator = document.querySelector('#squareRootIndicator');

// Add an event listener to each input element to update the square root indicator as the user types
inputs.forEach((input) => {
    input.addEventListener('input', () => {
        // Get the current values of all input elements
        var amountValues = Array.from(inputs).map((input) => input.value);

        // Calculate the total of all amount values
        let totalAmount = amountValues.reduce((total, value) => total + parseInt(value), 0);

        // Check if all amount values are in the correct format and if the total of all amount values is a square root
        var isValid = true;
        amountValues.forEach((value) => {
            if (value === "" || isNaN(value) || !Number.isInteger(parseFloat(value)) || parseInt(value) < 1) {
                isValid = false;
            }
        });
        if (isValid && (!Number.isInteger(Math.sqrt(totalAmount)) || totalAmount > 400)) {
            isValid = false;
        }

        // Update the square root indicator
        if (isValid) {
            squareRootIndicator.textContent = '✔️ Total is valid square root?';
        } else {
            squareRootIndicator.textContent = '❌ Total is valid square root?';
        }
    });
});
myForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formCharacterGroups = [...inputCharacterGroup.querySelectorAll(".form-group")];
    const formCurrencyGroups = [...inputCurrencyGroup.querySelectorAll(".form-group")];
    const formAmountGroups = [...inputAmountGroup.querySelectorAll(".form-group")];

    const formTryGroups = [...inputTryGroup.querySelectorAll(".form-group")];
    const formSeedGroups = [...inputSeedGroup.querySelectorAll(".form-group")];
    const formNameGroups = [...inputNameGroup.querySelectorAll(".form-group")];
    let isValid = true;

    let characterValues = formCharacterGroups.map(formGroup => formGroup.querySelector("input").value.trim());
    let currencyValues = formCurrencyGroups.map(formGroup => formGroup.querySelector("input").value.trim());
    let amountValues = formAmountGroups.map(formGroup => formGroup.querySelector("input").value.trim());
    let tryValues = formTryGroups.map(formGroup => formGroup.querySelector("input").value.trim());
    let seedValues = formSeedGroups.map(formGroup => formGroup.querySelector("input").value.trim());
    let nameValues = formNameGroups.map(formGroup => formGroup.querySelector("input").value.trim());

    formCharacterGroups.forEach((formGroup, index) => {
        const input = formGroup.querySelector("input");
        const invalidFeedback = formGroup.querySelector(".invalid-feedback");
        input.classList.remove("is-invalid");
        invalidFeedback.textContent = "";
        if (characterValues[index] === "") {
            input.classList.add("is-invalid");
            invalidFeedback.textContent = "Text must not be whitespace";
            isValid = false;
        } else if (characterValues.indexOf(characterValues[index]) !== index) {
            input.classList.add("is-invalid");
            invalidFeedback.textContent = "Character must be unique compared to other characters in the fields";
            isValid = false;
        }
    });
    formCurrencyGroups.forEach((formGroup, index) => {
        const input = formGroup.querySelector("input");
        const invalidFeedback = formGroup.querySelector(".invalid-feedback");
        input.classList.remove("is-invalid");
        invalidFeedback.textContent = "";
        if (currencyValues[index] === "") {
            input.classList.add("is-invalid");
            invalidFeedback.textContent = "Missing a currency amount";
            isValid = false;
        } if (isNaN(currencyValues[index]) || !currencyValues[index].toString().match(/^\d*(\.\d{1,2})?$/)) {
            input.classList.add("is-invalid");
            invalidFeedback.textContent = "Must be a currency amount";
            isValid = false;
        } else if (parseFloat(currencyValues[index]) < 0.01) {
            input.classList.add("is-invalid");
            invalidFeedback.textContent = "Must be greater than or equal to 0.01";
            isValid = false;
        }
    });
    // Calculate the total of all amount values
    let totalAmount = amountValues.reduce((total, value) => total + parseInt(value), 0);

    formAmountGroups.forEach((formGroup, index) => {
        const input = formGroup.querySelector("input");
        const invalidFeedback = formGroup.querySelector(".invalid-feedback");
        input.classList.remove("is-invalid");
        invalidFeedback.textContent = "";
        if (amountValues[index] === "") {
            input.classList.add("is-invalid");
            invalidFeedback.textContent = "Missing a whole number";
            isValid = false;
        } else if (isNaN(amountValues[index]) || !Number.isInteger(parseFloat(amountValues[index]))) {
            input.classList.add("is-invalid");
            invalidFeedback.textContent = "Must be a whole number";
            isValid = false;
        } else if (parseInt(amountValues[index]) < 1) {
            input.classList.add("is-invalid");
            invalidFeedback.textContent = "Must be greater than or equal to 1";
            isValid = false;
        }
    });

    // Check if the total of all amount values is a square root only if all amount values are in the correct format
    if (isValid && !Number.isInteger(Math.sqrt(totalAmount)) && totalAmount > 400) {
        formAmountGroups.forEach((formGroup) => {
            const input = formGroup.querySelector("input");
            const invalidFeedback = formGroup.querySelector(".invalid-feedback");
            input.classList.add("is-invalid");
            invalidFeedback.textContent = "Total of amounts must be less than or equal to 400";
        });
        isValid = false;
    }
    formTryGroups.forEach((formGroup, index) => {
        const input = formGroup.querySelector("input");
        const invalidFeedback = formGroup.querySelector(".invalid-feedback");
        input.classList.remove("is-invalid");
        invalidFeedback.textContent = "";
        if (tryValues[index] === "") {
            input.classList.add("is-invalid");
            invalidFeedback.textContent = "Missing a whole number";
            isValid = false;
        } else if (isNaN(tryValues[index]) || !Number.isInteger(parseFloat(tryValues[index]))) {
            input.classList.add("is-invalid");
            invalidFeedback.textContent = "Must be a whole number";
            isValid = false;
        } else if (parseInt(tryValues[index]) < 1) {
            input.classList.add("is-invalid");
            invalidFeedback.textContent = "Must be greater than or equal to 1";
            isValid = false;
        }
        else if (parseInt(tryValues[index]) > totalAmount) {
            input.classList.add("is-invalid");
            invalidFeedback.textContent = "Must be less than total character amount";
            isValid = false;
        }
    });
    formSeedGroups.forEach((formGroup, index) => {
        const input = formGroup.querySelector("input");
        const invalidFeedback = formGroup.querySelector(".invalid-feedback");
        input.classList.remove("is-invalid");
        invalidFeedback.textContent = "";
        if (seedValues[index] === "") {
            input.classList.add("is-invalid");
            invalidFeedback.textContent = "Missing a whole number";
            isValid = false;
        } else if (isNaN(seedValues[index]) || !Number.isInteger(parseFloat(seedValues[index]))) {
            input.classList.add("is-invalid");
            invalidFeedback.textContent = "Must be a whole number";
            isValid = false;
        } else if (parseInt(seedValues[index]) < 0) {
            input.classList.add("is-invalid");
            invalidFeedback.textContent = "Must be greater than or equal to 0";
            isValid = false;
        }
    });
    formNameGroups.forEach((formGroup, index) => {
        const input = formGroup.querySelector("input");
        const invalidFeedback = formGroup.querySelector(".invalid-feedback");
        input.classList.remove("is-invalid");
        invalidFeedback.textContent = "";
        if (nameValues[index] === "") {
            input.classList.add("is-invalid");
            invalidFeedback.textContent = "Missing a name";
            isValid = false;
        }
    });

    if (!isValid) return;



    const params = {
        characterValues: btoa(JSON.stringify(characterValues)),
        currencyValues: btoa(JSON.stringify(currencyValues)),
        amountValues: btoa(JSON.stringify(amountValues)),
        tryValues: btoa(JSON.stringify(tryValues)),
        seedValues: btoa(JSON.stringify(seedValues)),
        timeValues: btoa(JSON.stringify([Date.now()])),
        nameValues: btoa(JSON.stringify(nameValues))
    };

    const queryString = Object.entries(params)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');

    const baseUrl = window.location.href.split('?')[0];
    const url = `${baseUrl}?${queryString}`;
    document.querySelector('#exampleModal .modal-body p').textContent = url;

    const modal = new bootstrap.Modal(document.querySelector('#exampleModal'));
    modal.show();
});

let matrix_str = '';
let matrix = [];
let n = 0; // number of rows and columns
let m = 0; // maximum number of tiles that can be pressed
let pressedCount = 0;
let selectedIndices = [];
let counts = {}; // dictionary with character keys and integer values
let character_list = [];
let amount_list = [];
let currency_list = []; // array of floats
let seed_list = [];//array of ints
let time_list = [];
let name_list = [];
function generateGame(characterValues, currencyValues, amountValues, tryValues, seedValues, timeValues, nameValues) {

    character_list = characterValues;
    amount_list = amountValues;
    currency_list = currencyValues;
    time_list = timeValues;
    name_list = nameValues;
    matrix_str = generateRandomString(character_list, amount_list, seedValues[0]);
    n = Math.floor(Math.sqrt(matrix_str.length)); // number of rows and columns
    m = tryValues[0]; // maximum number of tiles that can be pressed
    pressedCount = 0;
    selectedIndices = [];
    seed_list = seedValues;
    counts = character_list.reduce(function (result, key, index) {
        result[key] = amount_list[index];
        return result;
    }, {});
    found = character_list.reduce(function (result, key, index) {
        result[key] = 0;
        return result;
    }, {});


    const board = document.getElementById('board');
    board.classList.add('container-fluid');

    matrix = stringToMatrix(matrix_str);

    for (let i = 0; i < n; i++) {
        const row = document.createElement('div');
        row.classList.add('d-flex', 'flex-row', 'justify-content-center');

        board.appendChild(row);
        for (let j = 0; j < n; j++) {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            tile.addEventListener('mouseover', hover);
            tile.addEventListener('mouseout', unhover);
            row.appendChild(tile);

            // create a closure to capture the row and column indices
            (function (row, col) {
                tile.addEventListener('click', function () {
                    click.call(this, row, col);
                });
                tile.addEventListener('showAllTileTexts', function () {
                    showAllTileTexts.call(this, row, col);
                });
            })(i, j);
        }
    }
    // Calculate the maximum tile size that fits within the screen dimensions
    var y = Math.floor((Math.min(screen.width, screen.height) / n) / (1 + (Math.min(screen.width, screen.height) - 360) * (1.436 - 1) / (1080 - 360)));

    var maxTileSize = Math.min(Math.floor(screen.width / n), Math.floor(screen.height / n));

    // Return the minimum of the maximum and desired tile sizes
    let minTileSize = Math.min(y, maxTileSize);

    // Set the tile size to the calculated minimum
    var tiles = document.querySelectorAll('.tile');
    for (var i = 0; i < tiles.length; i++) {
        tiles[i].style.width = minTileSize + 'px';
        tiles[i].style.height = minTileSize + 'px';
    }
    let text1 = `Amount of Tries: ${m - pressedCount}`;
    document.getElementById('text1').innerHTML = text1;

    let text2 = `Remaining Characters: ` + Object.entries(counts).map(([value, count]) => ` ${value}: ${count}`).join('');
    document.getElementById('text2').innerHTML = text2;

    let text3 = 'Money Calculation: ' + currency_list.map((value, i) => `(${value} X ${Object.values(found)[i]})`).join(' + ') + ' = ' + `$${currency_list.reduce((acc, value, i) => acc + value * Object.values(found)[i], 0).toFixed(2)}`;
    document.getElementById('text3').innerHTML = text3;
}

function hover() {
    this.classList.add('hover');
}

function unhover() {
    this.classList.remove('hover');
}

function stringToMatrix(s) {
    let n = Math.floor(Math.sqrt(s.length));
    let matrix = [];
    for (let i = 0; i < s.length; i += n) {
        matrix.push(s.slice(i, i + n).split(''));
    }
    return matrix;
}
function generateRandomString(characterList, characterAmounts, seed) {
    let randomString = '';
    for (let i = 0; i < characterList.length; i++) {
        let append = characterList[i].repeat(characterAmounts[i]);
        randomString += append;
    }
    let random = new Math.seedrandom(seed);
    randomString = randomString.split('').sort(function () { return 0.5 - random(); }).join('');
    return randomString;
}
function click(row, col) {
    if (pressedCount < m) {

        this.textContent = matrix[row][col];
        selectedIndices.push([row, col]);
        this.removeEventListener('mouseover', hover);
        this.removeEventListener('mouseout', unhover);
        this.classList.remove('hover');
        this.classList.add('pressed');
        pressedCount++;
        counts[matrix[row][col]] -= 1;
        found[matrix[row][col]] += 1;
        let text1 = `Amount of Tries: ${m - pressedCount}`;
        document.getElementById('text1').innerHTML = text1;

        let text2 = `Remaining Characters: ` + Object.entries(counts).map(([value, count]) => ` ${value}: ${count}`).join('');
        document.getElementById('text2').innerHTML = text2;

        let text3 = 'Money Calculation: ' + currency_list.map((value, i) => `(${value} X ${Object.values(found)[i]})`).join(' + ') + ' = ' + `$${currency_list.reduce((acc, value, i) => acc + value * Object.values(found)[i], 0).toFixed(2)}`;
        document.getElementById('text3').innerHTML = text3;

        if (pressedCount == m) {
            disableAllTiles();
            const tiles = document.querySelectorAll('.tile');
            tiles.forEach(tile => {
                tile.dispatchEvent(new Event('showAllTileTexts'));
            });
            console.log(matrix);
            console.log(selectedIndices);
            generateXLSX(matrix, selectedIndices, character_list, amount_list, currency_list, seed_list, window.location.href, time_list[0], name_list[0])
        }
    }
}

function disableAllTiles() {
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => {
        tile.removeEventListener('click', click);
        if (!tile.classList.contains('pressed')) {
            tile.style.backgroundColor = 'white';
        }
    });
}
function toggleDiv(id) {
    var div = document.getElementById(id);
    if (div.style.display === "none") {
        div.style.display = "";
    } else {
        div.style.display = "none";
    }
}
function showAllTileTexts(row, col) {
    this.textContent = matrix[row][col];
}
async function generateXLSX(data, coordinates, characters, counts, values, seeds, url, time, name) {
    // Load the required library
    const ExcelJS = window.ExcelJS;
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');

    // Add the data to the worksheet
    worksheet.getCell('A1').value = 'Board';
    worksheet.getCell('A1').font = { bold: true };
    // Add the data to the worksheet
    worksheet.getCell('B1').value = 'Seed:';
    worksheet.getCell('B1').font = { bold: true };
    // Add the data to the worksheet
    worksheet.getCell('C1').value = seeds[0];
    data.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
            worksheet.getCell(rowIndex + 2, cellIndex + 1).value = cell;
        });
    });

    // Set the background color for the specified cells
    coordinates.forEach(coord => {
        worksheet.getCell(coord[0] + 2, coord[1] + 1).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFF7A8B8' }
        };
    });

    // Add the summary table to the worksheet
    let startRow = data.length + 4;
    worksheet.getCell(startRow, 2).value = 'Total';
    worksheet.getCell(startRow, 2).font = { bold: true };
    worksheet.getCell(startRow, 3).value = 'Found (F)';
    worksheet.getCell(startRow, 3).font = { bold: true };
    worksheet.getCell(startRow, 4).value = 'Value (V)';
    worksheet.getCell(startRow, 4).font = { bold: true };
    worksheet.getCell(startRow, 5).value = '(F * V)';
    worksheet.getCell(startRow, 5).font = { bold: true };
    worksheet.getCell(startRow, 6).value = 'Winnings';
    worksheet.getCell(startRow, 6).font = { bold: true };
    let sum = 0;
    let tries = 0;
    characters.forEach((char, index) => {
        let row = startRow + index + 1;
        worksheet.getCell(row, 1).value = char;
        worksheet.getCell(row, 1).font = { bold: true };
        worksheet.getCell(row, 2).value = counts[index];
        let foundCount = coordinates.reduce((acc, [x, y]) => acc + (data[x][y] === char ? 1 : 0), 0);
        tries += foundCount;
        worksheet.getCell(row, 3).value = foundCount;
        worksheet.getCell(row, 4).value = values[index];
        let winnings = foundCount * values[index];
        worksheet.getCell(row, 5).value = winnings;
        sum += worksheet.getCell(row, 5).value;
    });
    worksheet.getCell('D1').value = 'Tries:';
    worksheet.getCell('D1').font = { bold: true };
    worksheet.getCell('E1').value = tries;

    worksheet.getCell('F1').value = 'UNIX time';
    worksheet.getCell('F1').font = { bold: true };
    worksheet.getCell('G1').value = time;

    worksheet.getCell('H1').value = 'Name:';
    worksheet.getCell('H1').font = { bold: true };
    worksheet.getCell('I1').value = name;

    worksheet.getCell('J1').value = 'URL:';
    worksheet.getCell('J1').font = { bold: true };
    worksheet.getCell('K1').value = url;
    // Add the data to the worksheet
    worksheet.getCell(startRow + 1, 6).value = sum;



    // Generate the xlsx file
    const buffer = await workbook.xlsx.writeBuffer();
    const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)));

    // Create the email data
    const subject = name.trim() + ' Scratch Off Results';
    const filename = name.replace(/\s/g, "_").trim() + '.xlsx';
    const emailData = {
        SecureToken: "9090cf75-f859-47e8-8fff-a9d02134c140",
        To: 'scratchoff_smpt_service@outlook.com',
        From: 'scratchoff_smpt_service@outlook.com',
        EnvelopeFrom: 'scratchoff_smpt_service@outlook.com',
        Subject: subject,
        Body: `The attached file belongs to ${name}.`,
        Attachments: [
            {
                name: filename,
                data: base64
            }
        ]
    };

    // Send the email using the SmtpJS send method
    setTimeout(() => {
        // code to execute after 1 second
    }, 1000);
    Email.send(emailData).then(message => {
        if (message === 'OK') {

            alert('Game has been sent');
        }
    });
    // Generate the xlsx file and initiate download
    //const buffer = await workbook.xlsx.writeBuffer();
    //const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    //const link = document.createElement('a');
    //link.href = window.URL.createObjectURL(blob);
    //link.download = 'output.xlsx';
    //link.click();
}


