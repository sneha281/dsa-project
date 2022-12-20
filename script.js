import { Stack } from './stack.js';

document.onkeydown = function(event) {
    if (event.ctrlKey || event.metaKey) {  //not allowing copy paste commands 
        event.preventDefault();
    }
};

onload = function () {
    // Get reference to elements
    const textbox = document.getElementById('comment');
    const undo = document.getElementById('undo');
    const clear = document.getElementById('clear');
    const temptext = document.getElementById('temptext');

    textbox.value = "";
    let text = "";
    let stack = new Stack();

    textbox.onclick = function () {
        textbox.selectionStart = textbox.selectionEnd = textbox.value.length;
    };//in middle text editor will not work. cursor always remains end of the string.

    clear.onclick = function () {
        stack.clear();
        text = "";
        textbox.value = ""; //hello
        temptext.innerHTML = "LIFO REAL WORLD EXAMPLE";
    };

    textbox.oninput = function(event){
        // console.log(event);
        switch(event.inputType){
            case "insertText":
                stack.push(0, event.data);
                break;
            case "deleteContentBackward": //backspace 
                stack.push(1, text[text.length-1]);
                break;
        }

        temptext.innerHTML = "On stack "+stack.top()+"<br>"+temptext.innerHTML;//telling what is present on the top of the stack.
        text = textbox.value;
    };

    undo.onclick = function () {
        let operation = stack.pop();
        if(operation[0]!==-1){
            temptext.innerHTML = "Undo operation in Progress..<br>"+temptext.innerHTML;
            if(operation[0] === 0){
                let len = operation[1].length;
                textbox.value = textbox.value.substring(0,textbox.value.length-len);
            } else{
                textbox.value += operation[1];
            }
            text = textbox.value;
        }
    };
};