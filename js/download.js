const usedImages = [];
const randomImages = [
    { src: 'capcha/1.jpg', alt: 'img' },
    { src: 'capcha/2.jpg', alt: 'img' },
    { src: 'capcha/3.jpg', alt: 'img' },
    { src: 'capcha/4.jpg', alt: 'img' },
    { src: 'capcha/5.jpg', alt: 'img' },
    { src: 'capcha/6.jpg', alt: 'img' },
    { src: 'capcha/7.jpg', alt: 'img' },
    { src: 'capcha/8.jpg', alt: 'img' },
    { src: 'capcha/9.jpg', alt: 'img' },
    { src: 'capcha/10.jpg', alt: 'img' },
    { src: 'capcha/11.jpg', alt: 'img' },
    { src: 'capcha/12.jpg', alt: 'img' },
    { src: 'capcha/13.jpg', alt: 'img' },
    { src: 'capcha/14.jpg', alt: 'img' },
    { src: 'capcha/15.jpg', alt: 'img' },
    { src: 'capcha/16.jpg', alt: 'img' },
    { src: 'capcha/17.jpg', alt: 'img' },
    { src: 'capcha/18.jpg', alt: 'img' },
    { src: 'capcha/19.jpg', alt: 'img' },
    { src: 'capcha/20.jpg', alt: 'img' },
    { src: 'capcha/21.jpg', alt: 'img' },
    { src: 'capcha/22.jpg', alt: 'img' },
    { src: 'capcha/23.jpg', alt: 'img' },
    { src: 'capcha/24.jpg', alt: 'img' },
    { src: 'capcha/25.jpg', alt: 'img' },
    { src: 'capcha/26.jpg', alt: 'img' },
    { src: 'capcha/27.jpg', alt: 'img' },
    { src: 'capcha/28.jpg', alt: 'img' },
    { src: 'capcha/29.jpg', alt: 'img' },
    { src: 'capcha/30.jpg', alt: 'img' },
    { src: 'capcha/31.jpg', alt: 'img' },
    { src: 'capcha/32.jpg', alt: 'img' },
    { src: 'capcha/33.jpg', alt: 'img' },
    { src: 'capcha/34.jpg', alt: 'img' },
    { src: 'capcha/35.jpg', alt: 'img' },
    { src: 'capcha/36.jpg', alt: 'img' },
    { src: 'capcha/37.jpg', alt: 'img' },
    { src: 'capcha/38.jpg', alt: 'img' },
    { src: 'capcha/39.jpg', alt: 'img' },
    { src: 'capcha/40.jpg', alt: 'img' },
    { src: 'capcha/41.jpg', alt: 'img' }
]
const vocImages = [
    randomImages[getRandomImage()],
    { src: 'capcha/voc1.jpg', alt: 'img' },
    randomImages[getRandomImage()],
    randomImages[getRandomImage()],
    randomImages[getRandomImage()],
    { src: 'capcha/voc2.jpg', alt: 'img' },
    { src: 'capcha/voc3.jpg', alt: 'img' },
    randomImages[getRandomImage()],
    randomImages[getRandomImage()]
];
const pravImages = [
    { src: 'capcha/pravnost1.jpg', alt: 'img' },
    randomImages[getRandomImage()],
    randomImages[getRandomImage()],
    { src: 'capcha/pravnost2.jpg', alt: 'img' },
    randomImages[getRandomImage()],
    randomImages[getRandomImage()],
    randomImages[getRandomImage()],
    randomImages[getRandomImage()],
    { src: 'capcha/pravnost3.jpg', alt: 'img' }
];
const hlavaImages = [
    randomImages[getRandomImage()],
    randomImages[getRandomImage()],
    randomImages[getRandomImage()],
    { src: 'capcha/hlava1.jpg', alt: 'img' },
    randomImages[getRandomImage()],
    { src: 'capcha/hlava2.jpg', alt: 'img' },
    { src: 'capcha/hlava3.jpg', alt: 'img' },
    randomImages[getRandomImage()],
    randomImages[getRandomImage()]
];
function getRandomImage(){
    let randomNumber = Math.floor(Math.random() * 40);
    let original = false;
    while (original == false){
        let seenInForeach = false;
        usedImages.forEach(element => {
            if (randomNumber == element){
                seenInForeach = true;
            }
        });
        if (!seenInForeach){
            original = true;
        } else {
            if(randomNumber > 40){
                randomNumber = 0;
            }
            else{
                randomNumber++;
            }
        }
    }
    usedImages.push(randomNumber);
    return randomNumber;
}

const imageGrid = document.getElementById('imageGrid');
const captchaHeader = document.getElementById('captchaHeader');
const captchaCheckbox = document.getElementById('captchaCheckbox');
const firstHeader = document.getElementById('firstHeader');
const firstCheckbox = document.getElementById('firstCheckbox');
const imagePanel = document.getElementById('imagePanel');
const instructionHeader = document.getElementById('instructionHeader');
const recapFooter = document.getElementById('captcha-footer');
const downloadBtn = document.getElementById('download-btn');
const downloadTxt = document.getElementById('download-txt');
const promptText = document.getElementById('prompt');
const errorText = document.getElementById('errorMessage');
const paymentModal = document.getElementById('payment-modal');
const modalBackground = document.getElementById('modal-background');
const closeModal = document.getElementById('close-modal');
const paymentOptions = document.querySelectorAll('input[name="payment-method"]');
const payNowBtn = document.querySelector('.pay-now-btn');
const paymentErrorTxt = document.getElementById('payment-error-text');
const paymentOutputModal = document.getElementById('payment-output-modal');
const paymentOutputTitle = document.getElementById('payment-output-title');
const realDownloadButton = document.querySelector('.download-final-btn');
const whatPaymentBtn = document.querySelector('.help-href');
const whatPaymentDialog = document.getElementById('what-payment');
const whatPaymentOkay = document.querySelector('.okay-to-payment');

let stage = 1;
function createImages(){
    while (imageGrid.firstChild) {
        imageGrid.removeChild(imageGrid.firstChild);
    }
    if (stage == 1){
        promptText.innerHTML = "VOCODEX";
        errorText.innerHTML = "Ověření se nezdařilo. Zkuste to znovu.";
        vocImages.forEach((image, index) => {
            const imgElement = document.createElement('img');
            imgElement.src = image.src;
            imgElement.alt = image.alt;
            imgElement.id = `img${index}`;
            imageGrid.appendChild(imgElement);

            imgElement.addEventListener('click', () => {
                imgElement.classList.toggle('selected');
            });
        });
    }
    else if (stage == 2){
        promptText.innerHTML = "PROTOKOL SVÉPRÁVNOSTI";
        errorText.innerHTML = "Ověření se nezdařilo. Zkuste to znovu.";
        pravImages.forEach((image, index) => {
            const imgElement = document.createElement('img');
            imgElement.src = image.src;
            imgElement.alt = image.alt;
            imgElement.id = `img${index}`;
            imageGrid.appendChild(imgElement);

            imgElement.addEventListener('click', () => {
                imgElement.classList.toggle('selected');
            });
        });
    }
    else if (stage == 3){
        promptText.innerHTML = "JAWA 550 PAŘEZ 555 HLAVA VÁLCE";
        errorText.innerHTML = "Ověření se opět nezdařilo. Nejsi náhodou Ableton vocoder?";
        hlavaImages.forEach((image, index) => {
            const imgElement = document.createElement('img');
            imgElement.src = image.src;
            imgElement.alt = image.alt;
            imgElement.id = `img${index}`;
            imageGrid.appendChild(imgElement);

            imgElement.addEventListener('click', () => {
                imgElement.classList.toggle('selected');
            });
        });
    }
    else{
        errorText.innerHTML = "Detekován Ableton vocoder, chystá se ověření.";
        setTimeout(() => { window.location.href = 'quiz.html'; }, 2500);
    }
    stage++;
}
createImages();

captchaHeader.addEventListener('click', () => {
    captchaCheckbox.classList.toggle('checked');
    if (localStorage.getItem("kvizCompleted") == "true") return;
    const isChecked = true;
    instructionHeader.style.display = isChecked ? 'block' : 'none';
    imagePanel.style.display = isChecked ? 'block' : 'none';
    recapFooter.style.display = isChecked ? 'flex' : 'none';
});

firstHeader.addEventListener('click', () => {
    firstCheckbox.classList.toggle('checked');
    const isChecked = captchaCheckbox.classList.contains('checked');
});

document.getElementById('verifyButton').addEventListener('click', () => {
    document.getElementById('errorMessage').style.display = 'block';
    createImages();
});

downloadBtn.addEventListener('click', () => {
    const kvizCompleted = localStorage.getItem("kvizCompleted");
    const isChecked1 = captchaCheckbox.classList.contains('checked');
    const isChecked2 = firstCheckbox.classList.contains('checked');
    if (!isChecked1 || !isChecked2 || kvizCompleted != "true"){
        downloadTxt.innerHTML = 'Zaškrtněte prosím všechna potřebná pole.';
    } else {
        document.getElementById("hlavniNadpis").innerHTML = 'Stáhnout nyní <b>VOCODEX_SAMPLER_PACK.zip</b> 100% žádný malware!';
        paymentModal.style.display = 'block';
        modalBackground.style.display = 'block';
        const favicon = document.querySelector('link[rel="icon"]');
        favicon.href = 'icons/surprise.ico';
    }
});

closeModal.addEventListener('click', () => {
    paymentModal.style.display = 'none';
    modalBackground.style.display = 'none';
    paymentErrorTxt.innerHTML = "";
});

modalBackground.addEventListener('click', () => {
    paymentModal.style.display = 'none';
    modalBackground.style.display = 'none';
    paymentOutputModal.style.display = 'none';
    whatPaymentDialog.style.display = 'none';
    paymentErrorTxt.innerHTML = "";
});

payNowBtn.textContent = "Vyberte způsob platby";
let selectedPayment = false;

paymentOptions.forEach(option => {
    option.addEventListener('change', () => {
        let payText = '';
        document.querySelectorAll('.payment-form').forEach(form => form.style.display = 'none');
        switch (option.value) {
            case 'card': payText = 'Zaplatit 24 520 CZK'; document.getElementById('payment-form-card').style.display = 'block'; break;
            case 'bitcoin': payText = 'Zaplatit 0.017 BTC'; document.getElementById('payment-form-bitcoin').style.display = 'block'; break;
            case 'kidney': payText = 'Darovat svou ledvinu'; document.getElementById('payment-form-kidney').style.display = 'block'; break;
            case 'firstborn': payText = 'Obětovat novorozené dítě'; document.getElementById('payment-form-firstborn').style.display = 'block'; break;
            default: payText = 'Zaplatit'; break;
        }
        payNowBtn.textContent = payText;
        selectedPayment = true;
        paymentErrorTxt.innerHTML = "";
    });
});

payNowBtn.addEventListener('click', () => {
    if (!selectedPayment) paymentErrorTxt.innerHTML = "Vyberte prosím způsob platby.";
    else{
        const selectedMethod = document.querySelector('input[name="payment-method"]:checked').value;
        let forms = document.querySelectorAll(".payment-form");

        forms.forEach(function(form) {
            if (form.style.display !== 'none') {
                let inputs = form.querySelectorAll("input");
                let allFilled = true;
                let dateInput = null;

                inputs.forEach(function(input) {
                    if (input.value.trim() === "") {
                        allFilled = false;
                    }
                    if (input.type === "date") {
                        dateInput = input;
                    }
                });

                if (!allFilled) {
                    paymentErrorTxt.innerHTML = "Vyplňte prosím všechny informace.";
                } else {
                    if (selectedMethod == "card"){
                        PaymentCompleted("Platba kartou neproběhla.");
                    } else if (selectedMethod == "bitcoin"){
                        PaymentCompleted("Platba bitcoinem neproběhla.");
                    } else if (selectedMethod == "kidney"){
                        PaymentCompleted("Platba ledvinou neproběhla.");
                    } else if (selectedMethod == "firstborn"){
                        let enteredDate = new Date(dateInput.value);
                        let currentDate = new Date();
                        let tenMonthsAgo = new Date();
                        tenMonthsAgo.setMonth(currentDate.getMonth() - 10);
                        if (enteredDate < tenMonthsAgo) {
                            paymentErrorTxt.innerHTML = "Dítě je starší 10 měsíců. Toto nebereme.";
                        } else if (enteredDate > currentDate){
                            paymentErrorTxt.innerHTML = "Pokud se dítě ještě nenarodilo, platbu nemůžeme uznat.";
                        } else PaymentCompleted("Platba dítětem neproběhla.");
                    } else paymentErrorTxt.innerHTML = "Něco se pokazilo, zkuste to znovu.";
                }
            }
        });
    }
});

whatPaymentBtn.addEventListener('click', () => {
    paymentModal.style.display = 'none';
    whatPaymentDialog.style.display = 'block';
})
whatPaymentOkay.addEventListener('click', () => {
    whatPaymentDialog.style.display = 'none';
    paymentModal.style.display = 'block';
})

function PaymentCompleted(messageValue){
    paymentOutputTitle.innerHTML = messageValue;
    paymentModal.style.display = 'none';
    paymentOutputModal.style.display = 'block';
}
realDownloadButton.addEventListener('click', () => {
    localStorage.setItem("hubButtonVisible", "true");
    window.location.href = 'https://www.dropbox.com/scl/fi/lom97e0wyp974thk5frv5/Vocodex-Sampler-Pack.zip?rlkey=m6xltt5r8510wut6uh9327fwg&st=xil00d29&dl=1';
    setTimeout(() => {
        document.getElementById("finalText").innerHTML = "Proč by sakra měla platba proběhnout? Proč bychom si účtovali za ten nejzbytečnější sample pack v existenci lidstva? Nejsme takový magoři, abychom chtěli peníze za zvuky určené k produkci hudby, které jsou nemožné použít k produkci hudby. Už jste dost blízko k získání sample packu. Už vás nebudeme přemlouvat, aby jste dělali lepší věci na práci než stahování Vocodex Sampler Packu, protože máte očividně času dost. V tomto případě tedy doufáme, že jste si užili to, co jsme tu pro vás na Apríl 2025 nachystali a utíkejte si konečně stáhnout sample pack.<br>(pomozte nám, toto nebyl náš plán)<br><br>Děkujeme ❤️"
    }, 1000);
});