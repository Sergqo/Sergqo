function saveData() {
    document.getElementById('error-message').innerHTML = '';
    document.getElementById('result').innerHTML = '';

    const firstName = document.getElementById('first-name').value.trim();
    const lastName = document.getElementById('last-name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const question1 = document.getElementById('question1').value.trim();
    const question2 = document.getElementById('question2').value.trim();
    const question3 = document.getElementById('question3').value.trim();
    const question4 = document.getElementById('question4').value.trim();
    const question5 = document.getElementById('question5').value.trim();

    if (!firstName || !lastName || !email || !phone || !address || 
        !question1 || !question2 || !question3 || !question4 || !question5) {
        document.getElementById('error-message').innerText = 'Visi laukai turi būti užpildyti!';
        return;
    }

    let errorMessage = '';
    if (!validateEmail(email)) {
        errorMessage += 'Neteisingas el. pašto adresas. ';
    }
    if (!validatePhone(phone)) {
        errorMessage += 'Neteisingas telefono numeris. ';
    }
    if (!validateAddress(address)) {
        errorMessage += 'Adresas turi būti ne trumpesnis nei 5 simboliai. ';
    }

    if (errorMessage) {
        document.getElementById('error-message').innerText = errorMessage;
        return;
    }

    const formData = {
        firstName,
        lastName,
        email,
        phone,
        address,
        question1: parseInt(question1),
        question2: parseInt(question2),
        question3: parseInt(question3),
        question4: parseInt(question4),
        question5: parseInt(question5),
    };

    const averageScore = (
        formData.question1 +
        formData.question2 +
        formData.question3 +
        formData.question4 +
        formData.question5
    ) / 5;

    const result = `
        <p><strong>Vardas:</strong> ${formData.firstName}</p>
        <p><strong>Pavardė:</strong> ${formData.lastName}</p>
        <p><strong>El. paštas:</strong> ${formData.email}</p>
        <p><strong>Telefonas:</strong> ${formData.phone}</p>
        <p><strong>Adresas:</strong> ${formData.address}</p>
        <p id="average-score"><strong>Vidutinis įvertinimas:</strong> ${averageScore.toFixed(2)}</p>
    `;
    document.getElementById('result').innerHTML = result;

    const averageScoreElement = document.getElementById('average-score');
    if (averageScore <= 3.4) {
        averageScoreElement.classList.add('red');
    } else if (averageScore <= 7.1) {
        averageScoreElement.classList.add('orange');
    } else {
        averageScoreElement.classList.add('green');
    }

    console.log(formData);
}

function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^(\+370|8)\d{8}$/;
    return phoneRegex.test(phone);
}

function validateAddress(address) {
    return address.length >= 5;
}
