import {paragraphs} from "./paragraphs";
import {settings as s} from "./settings";
import {randomInteger} from "./helpers";

const monkeyType = {
    paragraphElement: document.querySelector(s.paragraphElementSelector),
    currentParagraphIdx: randomInteger(0, paragraphs.length),
    currentWordIdx: 0,
    currentLetterIdx: 0,
    correctLetters: 0,
    errorLetters: 0,
    init() {
        this.words = paragraphs[this.currentParagraphIdx];
        this.generateWords();
        this.displayCursor();
        window.addEventListener('keydown', (evt) => {
            this.handleKey(evt);
        })
    },

    generateWordSpanElement(word) {
        const spanWordElement = document.createElement('span');
        spanWordElement.className = 'word';
        word.spanWordElement = spanWordElement;
    },

    generateLetterSpanElement(letterObj, word) {
        const letterSpanElement = document.createElement('span');
        letterSpanElement.textContent = letterObj.letter;
        letterObj.spanLetterElement = letterSpanElement;
        word.spanWordElement.appendChild(letterSpanElement);
    },

    generateWords() {
        for (const word of this.words) {
            this.generateWordSpanElement(word);
            for (const letterObj of word.letters) {
                this.generateLetterSpanElement(letterObj, word);
            }
            this.paragraphElement.appendChild(word.spanWordElement);
        }
    },

    displayCursor() {
        this.words[this.currentWordIdx].spanWordElement.classList.add(s.currentWordClass);
        this.words[this.currentWordIdx].letters[this.currentLetterIdx].spanLetterElement.className = s.currentClass;
    },
    incrementLetter() {
        this.words[this.currentWordIdx].letters[this.currentLetterIdx].spanLetterElement.classList.remove(s.correctClass)
        this.currentLetterIdx++
        if (this.currentWordIdx === this.words[this.currentWordIdx].letters.length) {

        } else {

            this.words[this.currentWordIdx].letters[this.currentLetterIdx].spanLetterElement.classList.add(s.correctClass)
        }
    },
    handleKey(evt) {

        if (!s.isIgnorableKey(evt)) {
            //expression qui donne le mot courant
            if (evt.key === this.words[this.currentWordIdx].letters[this.currentLetterIdx].letter) {
                this.words[this.currentWordIdx].letters[this.currentLetterIdx].spanLetterElement.classList.add(s.correctClass)
                this.correctLetters++

            } else {
                this.words[this.currentWordIdx].letters[this.currentLetterIdx].spanLetterElement.classList.add(s.errorClass)
                this.errorLetters++
            }
            this.incrementLetter();


        }


    }

}
monkeyType.init();