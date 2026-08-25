const sections = Array.from(document.querySelectorAll('.likes-section'));
const totalStories = sections.length;
const userStoriesCount = {};

// 1. Contiamo la presenza delle sole Storie
sections.forEach(section => {
    section.querySelectorAll('.likes-list li').forEach(item => {
        const name = item.innerText.trim();
        if (name && !item.classList.contains('ghost-like')) {
            userStoriesCount[name] = (userStoriesCount[name] || 0) + 1;
        }
    });
});

const globalStoriesFans = [];
for (const [name, count] of Object.entries(userStoriesCount)) {
    const fedeltaPercentuale = (count / totalStories) * 100;
    if (fedeltaPercentuale >= 40) {
        globalStoriesFans.push({ name: name, percentuale: fedeltaPercentuale });
    }
}

// 2. Badge e fantasmi delle Storie
sections.forEach((section) => {
    const listContainer = section.querySelector('.likes-list');
    const listItems = section.querySelectorAll('.likes-list li');
    
    let uomini = 0;
    let donne = 0;
    let currentLikesNames = [];

    listItems.forEach(item => {
        const name = item.innerText.trim();
        const gender = item.getAttribute('data-gender');
        if (gender === 'M') uomini++;
        if (gender === 'F') donne++;
        
        currentLikesNames.push(name);

        const personalTotal = userStoriesCount[name] || 0;
        const fedeltaPercentuale = (personalTotal / totalStories) * 100;

        if (fedeltaPercentuale >= 75) {
            item.className = 'top-fan';
            item.innerHTML = `🔥 ${name}`;
        } else if (fedeltaPercentuale >= 40) {
            item.className = 'regular-fan';
            item.innerHTML = `⭐ ${name}`;
        } else {
            item.className = 'occasional-fan';
            item.innerHTML = `🌬️ ${name}`;
        }
    });

    const totale = listItems.length;

    let ghostCount = 0;
    let hasCreatedDivider = false;

    globalStoriesFans.forEach(fan => {
        if (!currentLikesNames.includes(fan.name)) {
            ghostCount++;
            
            if (!hasCreatedDivider) {
                const divider = document.createElement('div');
                divider.className = 'ghost-divider';
                divider.innerText = `👻 Interazioni Fantasma (Fan assenti nelle Storie)`;
                listContainer.appendChild(divider);
                hasCreatedDivider = true;
            }

            const ghostLi = document.createElement('li');
            ghostLi.className = 'ghost-like';
            
            if (fan.percentuale >= 75) {
                ghostLi.classList.add('ghost-top');
                ghostLi.innerHTML = `🔥 ${fan.name}`;
            } else {
                ghostLi.classList.add('ghost-regular');
                ghostLi.innerHTML = `⭐ ${fan.name}`;
            }
            listContainer.appendChild(ghostLi);
        }
    });

    const countText = section.querySelector('.likes-count-text');
    if (countText) {
        if (ghostCount > 0) {
            countText.innerHTML = `❤️ Numero interazioni: ${totale} <span class="ghost-counter">(-${ghostCount} fedeli assenti)</span>`;
        } else {
            countText.innerText = `❤️ Numero interazioni: ${totale}`;
        }
    }

    if (totale > 0) {
        const percUomini = Math.round((uomini / totale) * 100);
        const percDonne = Math.round((donne / totale) * 100);
        section.querySelector('.bar-men').style.width = percUomini + '%';
        section.querySelector('.bar-women').style.width = percDonne + '%';
        section.querySelector('.label-men').innerText = `👨 Uomini: ${percUomini}% (${uomini})`;
        section.querySelector('.label-women').innerText = `👩 Donne: ${percDonne}% (${donne})`;
    } else {
        section.querySelector('.gender-stats').style.display = 'none';
    }
});

// Gestione dell'apertura/chiusura accordion - OTTIMIZZATO MOBILE
document.querySelectorAll('.likes-toggle').forEach(button => {
    // Usiamo sia click che touchend per essere sicuri che prenda il tocco istantaneamente su smartphone
    const handleToggle = (e) => {
        e.preventDefault(); // Evita che il telefono attivi due volte il click
        const accordionContent = button.nextElementSibling;
        button.classList.toggle('active');
        
        if (button.classList.contains('active')) {
            accordionContent.style.maxHeight = "none"; 
            accordionContent.style.display = "block"; // Forza la visibilità su mobile
            accordionContent.style.paddingTop = "15px";
        } else {
            accordionContent.style.maxHeight = "0";
            accordionContent.style.paddingTop = "0px";
            // Aspetta la fine dell'animazione per nasconderlo del tutto se serve
            setTimeout(() => {
                if (!button.classList.contains('active')) {
                    accordionContent.style.display = "none";
                }
            }, 300);
        }
    };

    button.addEventListener('click', handleToggle);
});

