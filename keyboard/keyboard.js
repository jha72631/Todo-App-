const keyboard = {

  properties: {
    value: "",
    isCapital:false
  },

  elements: {
    keys: []
  },

  _toggleClass(btnElem) {
    btnElem.classList.toggle('keyboard-key-active');
    this.properties.isCapital = !this.properties.isCapital;
  },

  _createKeys() {
    const fragment = document.createDocumentFragment();

    const keys = [
           '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'backspace',
           'q', 'w','e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
           'capslock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'enter',
           'done', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '?',
                              'spacebar',
          ]

    function createIconButton(font){
      return `<i class ="material-icons" > ${font} </i>`
    }

    let alignmentElement = document.createElement('div');
    alignmentElement.classList.add('keys-alignment');

    keys.forEach((item) => {
      let icon;
      let btn;
      const textualElement = document.querySelector('.textmate');
      switch (item) {
        case 'backspace':
          icon = createIconButton('backspace');
          btn = document.createElement('button');
          btn.classList.add('keyboard-key', 'keyboard-key-wide');
          btn.innerHTML = icon;
          alignmentElement.appendChild(btn);
          fragment.appendChild(alignmentElement);
          //add btn with event listener to keep track of value
          btn.addEventListener('click', (event) => {
            textualElement.value = textualElement.value.substring(0, textualElement.value.length - 1);
          });
          //creating new alignment div  for new line
          alignmentElement = document.createElement('div');
          alignmentElement.classList.add('keys-alignment');
          break;
        case 'p':
          btn = document.createElement('button');
          btn.classList.add('keyboard-key');
          btn.append('p');
          alignmentElement.appendChild(btn);
          fragment.appendChild(alignmentElement);
          //add btn with event listener to keep track of value
          btn.addEventListener('click', (event) => {
            textualElement.value = textualElement.value + event.target.textContent;
          });
          //creating new alignment div  for new line
          alignmentElement = document.createElement('div');
          alignmentElement.classList.add('keys-alignment');
          break;
        case 'enter':
          icon = createIconButton('keyboard_return');
          btn = document.createElement('button');
          btn.classList.add('keyboard-key', 'keyboard-key-wide');
          btn.innerHTML = icon
          alignmentElement.appendChild(btn);
          fragment.appendChild(alignmentElement);
          //add btn with event listener to keep track of value
          btn.addEventListener('click', (event) => {
            textualElement.value = textualElement.value + '\n';
          });
          //creating new alignment div  for new line
          alignmentElement = document.createElement('div');
          alignmentElement.classList.add('keys-alignment');
          break;
        case '?':
          btn = document.createElement('button');
          btn.classList.add('keyboard-key');
          btn.append('?');
          alignmentElement.appendChild(btn);
          fragment.appendChild(alignmentElement);
          //add btn with event listener to keep track of value
          btn.addEventListener('click', (event) => {
            textualElement.value = textualElement.value + event.target.textContent;
          });
          //creating new alignment div  for new line
          alignmentElement = document.createElement('div');
          alignmentElement.classList.add('keys-alignment');
          break;
        case 'capslock':
          icon = createIconButton('keyboard_capslock');
          btn = document.createElement('button');
          btn.classList.add('keyboard-key', 'keyboard-key-wide', 'keyboard-key-activable');
          btn.innerHTML = icon
          //add event listener to capitalize or smallerise alphabets
          btn.addEventListener('click', () => {
            this._toggleClass(btn);
            if(this.properties.isCapital){
              this.elements.keys.forEach((item) => {
                item.innerText = item.innerText.toUpperCase();
              });
            }else{
              this.elements.keys.forEach((item) => {
                item.innerText = item.innerText.toLowerCase();
              });
            }
          });

          alignmentElement.appendChild(btn);
          break;
        case 'done':
          icon = createIconButton('check_circle');
          btn = document.createElement('button');
          btn.classList.add('keyboard-key', 'keyboard-key-wide');
          btn.innerHTML = icon
          //collapse keyboard elem on event
          btn.addEventListener('click', () => {
            document.querySelector('.keyboard').classList.toggle('keyboard-hidden');
          })
          alignmentElement.appendChild(btn);
          break;
        case 'spacebar':
          icon = createIconButton('space_bar');
          btn = document.createElement('button');
          btn.classList.add('keyboard-key', 'keyboard-key-wide', 'keyboard-key-extrawide');
          btn.innerHTML = icon
          //add btn with event listener to keep track of value
          btn.addEventListener('click', () => {
            textualElement.value = textualElement.value + " ";
          });
          alignmentElement.appendChild(btn);
          fragment.appendChild(alignmentElement);
          break;
        default:
          btn = document.createElement('button');
          btn.classList.add('keyboard-key');
          btn.append(item);
          //add btn with event listener to keep track of value
          btn.addEventListener('click', (event) => {
            textualElement.value = textualElement.value + event.target.textContent;
          });

          alignmentElement.appendChild(btn);
          break;

      }
    })
    return fragment;
  },



  init() {
    const keyboard = document.createElement('div');
    const keyboardKeys = document.createElement('div');
    //add classlist names
    keyboard.classList.add('keyboard');
    keyboardKeys.classList.add('keyboard-keys');
    //append keys container into keyboard
    keyboardKeys.appendChild(this._createKeys());
    keyboard.appendChild(keyboardKeys);
    document.body.appendChild(keyboard);

    //referencing keys and putting into keys array
    document.querySelectorAll('.keys-alignment').forEach((alignedElement) => {
      for(let elem of alignedElement.childNodes){
        if(elem.textContent.length==1 && (elem.textContent.charCodeAt(0)>=97 && elem.textContent.charCodeAt(0)<=122)) {
          this.elements.keys.push(elem);
        }
      }
    });

    //initialising virtual keyboard on 'focus' event for textarea
    document.querySelector('.textmate').addEventListener('focus', () => {
      const keyboard = document.querySelector('.keyboard');
      keyboard.classList.forEach((item) => {
        if(item ==='keyboard-hidden'){
          keyboard.classList.toggle('keyboard-hidden');
          return;
        }
      });
    });

    document.querySelector('.textmate').value = "";
  }

};

window.addEventListener('DOMContentLoaded', () => {
  keyboard.init();
})
