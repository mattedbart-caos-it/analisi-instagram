const sections = Array.from(document.querySelectorAll('.likes-section'));
const totalPosts = sections.length;
const userLikesCount = {};

// 1. Contiamo la presenza dei soli Post
sections.forEach(section => {
    section.querySelectorAll('.likes-list li').forEach(item => {
        const name = item.innerText.trim();
        if (name && !item.classList.contains('ghost-like')) {
            userLikesCount[name] = (userLikesCount[name] || 0) + 1;
        }
    });
});

const globalTopAndRegularFans = [];
for (const [name, count] of Object.entries(userLikesCount)) {
    const fedeltaPercentuale = (count / totalPosts) * 100;
    if (fedeltaPercentuale >= 40) {
        globalTopAndRegularFans.push({ name: name, percentuale: fedeltaPercentuale });
    }
}

// 2. Disegniamo i badge e calcoliamo i fantasmi
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

        const personalTotalLikes = userLikesCount[name] || 0;
        const fedeltaPercentuale = (personalTotalLikes / totalPosts) * 100;

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

    // Caccia ai fantasmi dei post
    let ghostCount = 0;
    let hasCreatedDivider = false;

    globalTopAndRegularFans.forEach(fan => {
        if (!currentLikesNames.includes(fan.name)) {
            ghostCount++;
            
            if (!hasCreatedDivider) {
                const divider = document.createElement('div');
                divider.className = 'ghost-divider';
                divider.innerText = `👻 Like Fantasma (Top & Regular Fan assenti)`;
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
            countText.innerHTML = `❤️ Numero dei mi piace: ${totale} <span class="ghost-counter">(-${ghostCount} fedeli assenti)</span>`;
        } else {
            countText.innerText = `❤️ Numero dei mi piace: ${totale}`;
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

// Accordion
document.querySelectorAll('.likes-toggle').forEach(button => {
    button.addEventListener('click', () => {
        const accordionContent = button.nextElementSibling;
        button.classList.toggle('active');
        if (button.classList.contains('active')) {
            accordionContent.style.maxHeight = "none";
            accordionContent.style.paddingTop = "15px";
        } else {
            accordionContent.style.maxHeight = 0;
            accordionContent.style.paddingTop = "0px";
        }
    });
});
