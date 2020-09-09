const button = document.getElementById('submit-todo');

// creating orderedList
const orderedList = document.createElement('ul');
orderedList.classList.add('list-todos');
// appending orderedList to a parent Element called savedtodo
const savedTodoElement = document.getElementById('saved-section');
savedTodoElement.appendChild(orderedList);

// add event listener
button.addEventListener('click', () => {

  const textualElement = document.getElementById('textElement');
  // creating list element, para element and button element
  if(textualElement.value.length>0) {
    const listItem = document.createElement('li');
    const paragraph = document.createElement('p');
    const remButton = document.createElement('button');
    // adding class to list items, para, button
    listItem.classList.add('specific-todo');
    paragraph.classList.add('para');
    remButton.classList.add('remove-button');
    //adding textualvalue to para and button
    paragraph.append(textualElement.value);
    remButton.append('remove');
    //adding para and button to list item
    listItem.appendChild(paragraph);
    listItem.appendChild(remButton);
    //appending list item to orderedList
    orderedList.appendChild(listItem);

    //adding remove event to remButton
    remButton.addEventListener('click', (event) => {
      event.target.parentNode.parentNode.removeChild(event.target.parentNode);
    })

    //clear text textarea
    textualElement.value = "";
  }

})
