const input = document.querySelector('input');
const btn = document.querySelector('button');
const dictionary = document.querySelector('.dictionary-app');

// https://api.dictionaryapi.dev/api/v2/entries/en/<word>

async function dictionaryFun(word) {
    try {
        const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await res.json();
        
        return data[0]; // Corrected to return data[0] instead of res[0]

    } catch (error) {
        console.error('Error fetching the dictionary data:', error);
    }
}

btn.addEventListener('click', fetchandCreateCard);

async function fetchandCreateCard() {
    const data2 = await dictionaryFun(input.value);  
    
    if (!data2) {
        console.error('No data found for the entered word');
        return;
    }
    
    console.log(data2);

    let partOfSpeechArray = [];

    for (let i = 0; i < data2.meanings.length; i++) { // Fixed the loop condition
        partOfSpeechArray.push(data2.meanings[i].partOfSpeech); // Corrected to partOfSpeech
    }

    dictionary.innerHTML = ` 
    <div class="card">
        <div class="property">
            <span>Word : </span>
            <span>${data2.word}</span>
        </div>

        <div class="property">
            <span>Phonetics : </span>
            <span>${data2.phonetic ? data2.phonetic : 'N/A'}</span>
        </div>

        <div class="property">
            <span>
                ${data2.phonetics[0] && data2.phonetics[0].audio ? 
                `<audio controls src="${data2.phonetics[0].audio}"></audio>` : 
                'No audio available'}
            </span>
        </div>

        <div class="property">
            <span>Definition : </span>
            <span>${data2.meanings[0].definitions[0].definition}</span>
        </div>

        <div class="property">
            <span>Example : </span>
            <span>${data2.meanings[1] && data2.meanings[1].definitions[0].example ? 
                   data2.meanings[1].definitions[0].example : 
                   'No example available'}</span>
        </div>

        <div class="property">
            <span>Part of Speech: </span>
            <span>${partOfSpeechArray.join(', ')}</span>
        </div>
    </div>`;
}
