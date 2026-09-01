if (document.getElementById('detailImg')) {
    const urlParams = new URLSearchParams(window.location.search);
    const likesStr = urlParams.get('likes');
    const trend = urlParams.get('trend');
    const imgName = urlParams.get('img');
    
    const postDate = urlParams.get('date') || '--/--/----';
    const postDay = urlParams.get('day') || 'sconosciuto';
    const postType = urlParams.get('type') || 'sconosciuto';
    const hasFaces = urlParams.get('faces') || 'no';
    const content = urlParams.get('content') || 'generico';
    
    const likersRaw = urlParams.get('likers') || '';
    const likes = parseInt(likesStr, 10) || 0;

    if (imgName) document.getElementById('detailImg').src = `Immagini/${imgName}.JPG`;
    if (likesStr) document.getElementById('detailLikes').textContent = likesStr;
    if (trend) document.getElementById('detailTrend').textContent = (trend === 'up') ? '📈' : '📉';

    const formatBadge = document.getElementById('formatBadge');
    if (postType === 'reel') {
        formatBadge.textContent = '🎬';
    } else {
        formatBadge.textContent = '📁';
    }

    let contentClean = content.replace('_', ' ').toUpperCase();
    document.getElementById('ctxDate').textContent = `${postDate} (${postDay.toUpperCase()})`;
    document.getElementById('ctxContent').textContent = contentClean;

    // LISTE DELLE FASCE DI FEDELTÀ AGGIORNATE
    const highFrequency = [
        'Alessio_Giangrande', 'Giulia_Agnelli', 'Dario_Del_Grosso', 'Gianluca_Manco', 
        'Ludovica_Nuzzo', 'Riccardo_Ramacci', 'Lorenzo_Linguanti', 'Giulia_De_Bartolomeo', 
        'Rossella_Bari', 'Silvia_Flamini', 'Diego_Gettatelli', 'Angelo_Siegrain'
    ];

    const mediumFrequency = [
        'Edoardo_Lisandri', 'Martina_Ligi', 'Debora_Rogante', 'Alessandro_Infantini', 
        'Valentina_Misciattelli', 'Chiara_Bazzicalupo', 'Laura_Martucci', 'Gabriele_Caponi', 
        'Maria_Giovanna_Osso', 'Daniele_Baiocco', 'Micaela_Del_Zotto', 'Marco_Silvestri', 
        'Chicco_Zanon', 'Sara_Raimondi', 'Martina_Fioretti', 'Serena_Biccari', 'Dario_Ciangola', 
        'Luca_Lanni', 'Chiara_Mastrosani', 'Giulia_Maisto', 'Lenny_Guglielmino', 'Camilla_Bulgherini', 
        'Alessia_Taverna', 'Martina_Occhioni', 'Giusy_De_Bartolomeo'
    ];

    const expectedLikers = [...highFrequency, ...mediumFrequency];

    // Generazione dinamica dei tag presenti
    const likersTagsContainer = document.getElementById('likersTags');
    let likersArray = [];
    
    if (likersRaw) {
        likersArray = likersRaw.split(',').map(name => name.trim());
        likersArray.forEach(trimmedName => {
            const tag = document.createElement('span');
            tag.className = 'name-tag';
            let displayName = trimmedName.replace(/_/g, ' ');
            
            if (highFrequency.includes(trimmedName)) {
                displayName += ' 🔥';
            } else if (mediumFrequency.includes(trimmedName)) {
                displayName += ' ⚡';
            } else {
                displayName += ' ❄️';
            }
            
            tag.textContent = displayName;
            likersTagsContainer.appendChild(tag);
        });
    } else {
        likersTagsContainer.textContent = "Nessun dato registrato.";
    }

    // Generazione dinamica dei Like Fantasma
    const ghostTagsContainer = document.getElementById('ghostTags');
    let ghostCount = 0;

    expectedLikers.forEach(fan => {
        if (!likersArray.includes(fan)) {
            ghostCount++;
            const ghostTag = document.createElement('span');
            ghostTag.className = 'name-tag ghost-tag';
            ghostTag.textContent = fan.replace(/_/g, ' ') + ' 👻';
            ghostTagsContainer.appendChild(ghostTag);
        }
    });

    if (ghostCount === 0) {
        ghostTagsContainer.textContent = "Nessun fan assente! Copertura della fanbase al 100%.";
    }

    // --- COMPOSIZIONE COMMENTO AI DEFINITIVO ---
    const aiCommentElement = document.getElementById('aiComment');
    let commento = `Il post del ${postDate} ha totalizzato ${likes} like. `;

    // ANALISI FOTO 1 (SOLO MATTEO DOMENICA)
    if (imgName === '1') {
        commento += `Questo carosello focalizzato interamente sul tuo volto ha registrato una performance solida con 36 interazioni. Scegliere la DOMENICA si conferma una mossa strategica intelligente, poiché gli utenti hanno più tempo a disposizione per soffermarsi sui contenuti personali. `;
        
        const haGiusy = likersArray.includes('Giusy_De_Bartolomeo');
        if (haGiusy) {
            commento += `La presenza di Giusy De Bartolomeo evidenzia come i tuoi contenuti personali mantengano un forte ancoraggio e sostegno nella cerchia familiare. `;
        }
        
        commento += `La quota di super-fan assenti si ferma a ${ghostCount} profili latenti, dimostrando che la tua Fanbase Core (🔥) risponde in modo affidabile quando decidi di metterci la faccia in primo piano nel feed.`;
    } 
    // ANALISI FOTO 2 (COPPIA LUNEDÌ - FESTA A ROMA)
    else if (imgName === '2') {
        commento += `Ottima performance per questo carosello in coppia con la tua compagna, che registra ben 45 like! `;
        const haGiulia = likersArray.includes('Giulia_De_Bartolomeo');
        const haGiusy = likersArray.includes('Giusy_De_Bartolomeo');
        if (haGiulia && haGiusy) {
            commento += `La risposta di Giulia e Giusy De Bartolomeo conferma che i contenuti relazionali uniscono istantaneamente il supporto affettivo familiare alla tua fanbase. `;
        }
        commento += `Il post è stato pubblicato di LUNEDÌ 29 GIUGNO, giorno della festa patronale dei Santi Pietro e Paolo a Roma: l'atmosfera di festa cittadina ha spinto le persone a godersi il tempo libero e a interagire di più sul feed. La quota di super-fan assenti è bassissima (${ghostCount} profili latenti), a dimostrazione che la Fanbase Core (🔥) ha risposto con grande solidarietà.`;
    }
    // ANALISI FOTO 3 (IL TRAMONTO)
    else if (imgName === '3') {
        commento += `Questo carosello dedicato a un paesaggio (il TRAMONTO) mostra le difficoltà tipiche dei contenuti senza presenza umana, fermandosi a 21 interazioni in un giorno debole come il SABATO. `;
        const haGiulia = likersArray.includes('Giulia_De_Bartolomeo');
        if (haGiulia) {
            commento += `Tuttavia, l'analisi del pubblico rileva che Giulia De Bartolomeo (🔥) ha comunque supportato lo scatto. Questo dimostra che i tuoi "Top Fan" mantengono attivo l'engagement affettivo indipendentemente dal tipo di post. `;
        }
        commento += `Attenzione però: si registrano ben ${ghostCount} LIKE FANTASMA in questa sessione. Molti dei tuoi follower storici di fascia media (⚡) hanno completamente saltato l'interazione, confermando che i paesaggi puri non trattengono a sufficienza l'attenzione del tuo pubblico di riferimento durante il weekend.`;
    }
    // ANALISI FOTO 4 (IL REEL DELLA GAG)
    else if (imgName === '4') {
        commento += `Ottima performance strategica! Nonostante la pubblicazione di SABATO (giorno tradizionalmente debole), questo REEL ha registrato ben 41 like. L'algoritmo premia i video dinamici e l'ironia spontanea (la gag) in cui ci metti la faccia. `;
        const haGiulia = likersArray.includes('Giulia_De_Bartolomeo');
        const haGiusy = likersArray.includes('Giusy_De_Bartolomeo');
        if (haGiulia && haGiusy) {
            commento += `L'analisi dei mi piace mostra che Giulia e Giusy De Bartolomeo supportano con entusiasmo anche i tuoi contenuti video ironici. Questo significa che la tua fanbase familiare apprezza molto la tua spontaneità sullo schermo, aiutando il video a rompere la flessione tipica del weekend con appena ${ghostCount} like fantasma.`;
        }
    }
    // ANALISI FOTO 5 (MATTEO & COMPAGNA)
    else if (imgName === '5') {
        commento += `Questo contenuto si posiziona come il TOP PERFORMER della tua griglia analizzata, raggiungendo ben 57 like! Il formato CAROSELLO unito alla domenica sera si conferma imbattibile. `;
        const haGiulia = likersArray.includes('Giulia_De_Bartolomeo');
        const haGiusy = likersArray.includes('Giusy_De_Bartolomeo');
        if (haGiulia || haGiusy) {
            commento += `La presenza contemporanea di membri della famiglia come ${haGiulia ? 'Giulia' : ''}${haGiulia && haGiusy ? ' e ' : ''}${haGiusy ? 'Giusy De Bartolomeo' : ''} dimostra che le foto di coppia attivano al massimo la cerchia dei tuoi affetti più cari. `;
        }
        commento += `L'alto numero di interazioni è guidato dai tuoi fedelissimi contraddistinti dal badge 🔥, lasciando appena ${ghostCount} profili latenti e registrando un successo quasi totale.`;
    } 
    // ANALISI FOTO 6 (IL GELATO)
    else if (content === 'gelato') {
        commento += `Un carosello incentrato sul cibo (il GELATO) fatica a decollare nel tuo profilo di domenica (22 like). Si registrano ben ${ghostCount} LIKE FANTASMA, a dimostrazione che i post di lifestyle senza il tuo volto causano un calo immediato di interazione da parte dei tuoi fan core (🔥).`;
    }

    aiCommentElement.textContent = commento;
}
