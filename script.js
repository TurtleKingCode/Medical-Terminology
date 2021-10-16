var txt;
fetch('MedicalWordParts.txt')
	.then((response) => {
		return response.text();
	})
	.then((data) => {formatText(data);});

function formatText(text) {
	text = text.split('\n');
	var json = [];
	var skipIndexes = [0, 2, 67, 69, 502, 504];
	for (var i = 0; i < text.length; i++) {
		var line  = text[i];
		if (skipIndexes[0] == i) {
			skipIndexes = skipIndexes.shift();
			continue
		}
		else if (line.includes('- ')) { // Prefixes
			/*Name, Word Part, Definition, Chapter, Information Type {Number, Time, Position, Direction, Negation}, Notes */
			var element = {};
			element.word = text[i].slice(0, text[i].indexOf('- ') + 1);
			element.word_part = "prefix";
			element.definition = text[i].slice(text[i].indexOf('- '));
			element.chapter = 0;
			element.info_type = '';
			element.notes = '';
			json.push(element);
		}
	}
	console.log(json[0]);
}

const container = document.getElementById("container");
function createCard(card) {
	container.innerHTML += `    <div class="card">
  <div class="word">${card.word}</div>
  <div class="word_part">${card.wordPart}</div>
  <div class="definition">${card.definition}</div>
  <div class="examples">${card.examples}</div>
  <details class="additional">
    <summary><!--<i class="fas fa-caret-right"></i>&emsp;-->additional information</summary>
    <div class="content">${card.addInfo}</div>
  </details>
</div>`;
}
// createCard({word: 'ophthalm/o', wordPart: 'combining form', definition: 'eye', examples: 'ophthalmologist', addInfo: 'DO NOT FORGET THE \'phth\''});
