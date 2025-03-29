document.addEventListener("DOMContentLoaded", function() {
    const commandInput = document.getElementById('command-input');
    const output = document.getElementById('output');
    let promptText = "V:\\Users\\V0C0DEXCZ2009>";
    let promptInput = document.getElementById("prompt");
    
    let currentDirectory = "V:\\Users\\V0C0DEXCZ2009";
    let directories = {};
    let files = {
        "global.txt": ""
    };
    let errors = {
        "recenzator.log": ""
    };
    
    let clippyUmlcen = false;

    const clippyContainer = document.getElementById("clippy-container");
    const clippyBubble = document.getElementById("clippy-bubble");
    const clippyText = document.getElementById("clippy-text");
    const clippyNext = document.getElementById("clippy-next");
    const clipSound = document.getElementById("clip-sound");

    const messages = [
        "No, z těch hexadecimetrimiliard terminálů které mají je tento nejhorší co kdy existoval, tak to zkusím sám. ",
        "Jinak jsem zamrznutý, zatrhli mi animace, asi si všimli že dělám víc jak mám..",
        "V struktuře má pokračovat recenzátor, takže vytvořím .exe soubor přes který se díky příkazu run dostaneš na recenzátor.",
        "Počkej chvíli...",
        "...",
        "Ok hotovo, udělal jsem to.",
        "Mám limit na mluvení nevím kolik ti toho budu schopný říct..",
        "Já vim, že tu jsi pro ten sample pack a ne pro cokoliv jiného.",
        "Všichni i včetně tebe musíte pochopit, že tento sample pack neslouží pro dobr-",
        ""
    ];

    let lastMessage = "";
    
    let messageIndex = 0;
    let isClippyVisible = false;
    let clippyUsed = false;
    if (localStorage.getItem("clippyZnicen") == "true") {
        clippyUsed = true;
        clippyUmlcen = true;
        files["recenzator.exe"] = true;
        errors["clippy.log"] = true;
    }

    function processCommand(command) {
        lastMessage = command;

        output.innerHTML += `<div>${promptText} ${command}</div>`;
    
        const commandParts = command.split(' ');
        const mainCommand = commandParts[0].toLowerCase();
        const argument = command.substring(mainCommand.length).trim();
        commandInput.value = '';
    
        if (mainCommand === 'help') {
            output.innerHTML += `<div>CLIPPY     &nbsp; &nbsp; &nbsp;Spustit Clippy pomocníka.<br>RUN        &nbsp; &nbsp; &nbsp; &nbsp; Spustit spustitelný soubor.<br>LS         &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Zobrazit seznam souborů, složek a chyb.<br>CD         &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Změnit aktuální adresář.<br>HOME       &nbsp; &nbsp; &nbsp; &nbsp;Návrat do domovského adresáře.<br>MKDIR      &nbsp; &nbsp; &nbsp; Vytvořit adresář.<br>ECHO       &nbsp; &nbsp; &nbsp; &nbsp;Zapsat text do globálního textového souboru (global.txt).<br>NANO       &nbsp; &nbsp; &nbsp; &nbsp;Zobrazit obsah souboru global.txt.<br>SHOW       &nbsp; &nbsp; &nbsp; &nbsp;Zobrazit chybové soubory (.log).<br>CLS        &nbsp; &nbsp; &nbsp; &nbsp; Vymazat historii terminálu.<br>EXIT       &nbsp; &nbsp; &nbsp; &nbsp;Ukončit příkazový řádek.<br>HELP       &nbsp; &nbsp; &nbsp; &nbsp;Zobrazit všechny příkazy.</div>`;
            if (gameCompleted()) output.innerHTML += `<div>DELETEALL &nbsp; Vymazat uložená data celého webu<br>UNLOCKALL     &nbsp; Odemknout celý web<br></div>`;
        } else if (mainCommand === 'exit') {
            window.location.href = 'index.html';
        } else if (mainCommand === 'mkdir') {
            if (argument) {
                directories[argument] = true;
                output.innerHTML += `<div>Složka '${argument}' byla úspěšně vytvořena.</div>`;
            } else {
                output.innerHTML += `<div>Chyba: Zadejte název složky.</div>`;
            }
        } else if (mainCommand === 'home') {
            currentDirectory = "V:\\Users\\V0C0DEXCZ2009";
            promptText = currentDirectory + ">";
            promptInput.innerHTML = promptText;
            output.innerHTML += `<div>Přepnuto do domovského adresáře.</div>`;
        } else if (mainCommand === 'cd') {
            if (argument === 'home') {
                currentDirectory = "V:\\Users\\V0C0DEXCZ2009";
                promptText = currentDirectory + ">";
                promptInput.innerHTML = promptText;
                output.innerHTML += `<div>Přepnuto do domovského adresáře.</div>`;
            } else if (directories[argument]) {
                currentDirectory = `V:\\Users\\V0C0DEXCZ2009\\${argument}`;
                promptText = currentDirectory + ">";
                promptInput.innerHTML = promptText;
                output.innerHTML += `<div>Přepnuto do složky '${argument}'.</div>`;
            } else {
                output.innerHTML += `<div>Chyba: Složka '${argument}' nebyla nalezena.</div>`;
            }
        } else if (mainCommand === 'ls') {
            const allFolders = [...Object.keys(directories)];
            const allFiles = [...Object.keys(files)];
            const allErrors = [...Object.keys(errors)]
            let noFiles = true;
            if (allFolders.length > 0) {
                output.innerHTML += `<div>Seznam složek:</div>`;
                allFolders.forEach(item => {
                    output.innerHTML += `<div> &nbsp;  &nbsp; ${item}</div>`;
                });
                noFiles = false;
            }
            if (allFiles.length > 0){
                output.innerHTML += `<div>Seznam souborů:</div>`;
                allFiles.forEach(item => {
                    output.innerHTML += `<div> &nbsp;  &nbsp; ${item}</div>`;
                });
                noFiles = false;
            } 
            if (allErrors.length > 0){
                output.innerHTML += `<div>Seznam chyb:</div>`;
                allErrors.forEach(item => {
                    output.innerHTML += `<div> &nbsp;  &nbsp; ${item}</div>`;
                });
                noFiles = false;
            }
            if (noFiles){
                output.innerHTML += `<div>Žádné položky nebyly nalezeny.</div>`;
            }
        } else if (mainCommand === 'clippy') {
            if (!clippyUsed) {
                showClippy();
                clippyUsed = true; 
            } else {
                output.innerHTML += `<div>Clippy nemůže být spuštěn (ERROR59): Pro zobrazení erroru napište příkaz 'show clippy.log'</div>`;
            }
        } else if (mainCommand === 'run') {
            if (files[argument] == true) {
                output.innerHTML += `<div>recenzator.exe byl spuštěn!</div>`;
                setTimeout(() => {
                    window.location.href = 'recenzator.html';
                }, 1000);
            } else {
                if (argument) output.innerHTML += `<div>Chyba: Soubor nebyl nalezen.</div>`;
                else output.innerHTML += `<div>Chyba: Zadejte spustitelný soubor.</div>`;
            }
        } else if (mainCommand === 'show') {
            if (argument === 'clippy.log' && clippyUmlcen == true) {
                output.innerHTML += `<div>[SYSTÉM] Spouštění clippy.exe.<br>[CHYBA] clippy.exe - Neočekávaná chyba při spuštění!<br>[CHYBA] Klíčové soubory se nepodařílo najít. Korupce systému.<br>[INFO] Poškozené nebo chybějící soubory:<br> - Clippy_main.js<br> - Clippy_Interaction.js<br> - Clippy_Sound1.ogg<br> - Clippy_Sound2.ogg<br> - Clippy_Tips.txt<br>[CHYBA] Obnova selhala. Korupce systému je příliš vážná. <br>[INFO] Přerušení procesu obnovy. Nebyly nalezeny žádné platné zálohy.<br>[SYSTÉM] Všechny spuštěné procesy byly ukončeny.<br>[INFO] Systém je nestabilní.<br>[INFO] Systém zůstane v poškozeném stavu, je potřeba reinstalace.</div>`;
            } else if (argument === 'recenzator.log') {
                output.innerHTML += `<div>[SYSTÉM] Spouštění recenzator.exe.<br>[SYSTÉM] Aplikace spuštěna!<br>[CHYBA] Systém neodpovídá. Čekání na odpověď...<br>[INFO] Aplikaci blokuje jiný proces.<br>[SYSTÉM] Aplikace se zavírá.</div>`;
            } else if (argument) {
                output.innerHTML += `<div>Žádný error '${argument}' nebyl nalezen.</div>`;
            } else {
                output.innerHTML += `<div>Chyba: Zadejte název chybového souboru.</div>`;
            }
        } else if (mainCommand === 'cls') {
            output.innerHTML = '';
        } else if (mainCommand === 'echo') {
            const echoParts = command.split(' ');
            echoParts.shift(); 
            const textToWrite = echoParts.join(' ');
            if (textToWrite) {
                const fileName = 'global.txt'; 
                if (!files[fileName]) {
                    files[fileName] = ''; 
                }
                files[fileName] += textToWrite + '\n';
                output.innerHTML += `<div>Text byl zapsán do '${fileName}'.</div>`;
            } else {
                output.innerHTML += `<div>Chyba: Zadejte text k zápisu.</div>`;
            }
        } else if (mainCommand === 'nano') {
            const fileToRead = "global.txt";
            if (files[fileToRead]) {
                output.innerHTML += `<div>Obsah souboru '${fileToRead}':</div>`;
                output.innerHTML += `<div>${files[fileToRead]}</div>`;
            } else {
                output.innerHTML += `<div>Soubor '${fileToRead}' je prázdný.</div>`;
            }
        } else if (mainCommand === 'deleteall') {
            localStorage.clear();
            output.innerHTML += `<div>Všechna uložená data stránky byla smazána!</div>`;
        } else if (mainCommand === 'unlockall') {
            localStorage.setItem("cookies", "true");
            localStorage.setItem("page1completed", "true");
            localStorage.setItem("vybouchl", "true");
            localStorage.setItem("clippyZnicen", "true");
            localStorage.setItem("pcOn", "true");
            localStorage.setItem("skladUnlocked", "true");
            localStorage.setItem("kvizCompleted", "true");
            localStorage.setItem("hubButtonVisible", "true");
            for (let i = 3; i <= 17; i++){
                localStorage.setItem(`item${i}`, "true");
            }
            output.innerHTML += `<div>Celý web byl odemčen!</div>`;
        } else {
            output.innerHTML += `<div>'${command}' není rozpoznán jako interní nebo externí příkaz.<br>Napište 'help' pro zobrazení všech příkazů.</div>`;
        }
        output.innerHTML += `<br>`;
        output.scrollTop = output.scrollHeight;
        commandInput.value = '';
    }

    function showClippy() {
        output.innerHTML += `<div>Clippy spuštěn!`;
        setTimeout(() => {
            clipSound.play();
            if (!isClippyVisible) {
                isClippyVisible = true;
                clippyContainer.classList.remove("hidden");
                messageIndex = 0;
                showMessage();
                commandInput.disabled = true; 
            }
        }, 700);
        files["recenzator.exe"] = true;
        errors["clippy.log"] = true;
        clippyUmlcen = true;
        localStorage.setItem("clippyZnicen", "true");
    }

    function showMessage() {
        if (messageIndex < messages.length) {
            clippyBubble.style.display = "block";
            clippyText.textContent = messages[messageIndex];
            clippyNext.classList.add("hidden");

            setTimeout(() => {
                if (clippyNext.classList.contains("hidden")) {
                    clippyNext.classList.remove("hidden");
                }
            }, 2000);
        } else {
            clippyContainer.classList.add("hidden");
            commandInput.disabled = false; 
            isClippyVisible = false;
        }
    }

    clippyNext.addEventListener("click", () => {
        clipSound.play(); 
        messageIndex++;
        if (messageIndex < messages.length) {
            showMessage();
        } else {
            clippyContainer.classList.add("hidden");
            commandInput.disabled = false;
            isClippyVisible = false;
        }
    });

    commandInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const command = commandInput.value.trim();
            if (command) {
                processCommand(command);
            }
        }
    });

    document.addEventListener('keydown', function(event) {
        commandInput.focus();
        if (event.key === "ArrowUp") {
            commandInput.value = lastMessage;
        }
    });
});

function gameCompleted(){
    let completed = true;
    for (let i = 3; i <= 17; i++){
        if (localStorage.getItem(`item${i}`) != "true") completed = false;
    }
    console.log("Game completed: " + completed);
    return completed;
}