
const PREFIX = 'Ctrl+';
const CRITICAL_SHORTCUT = PREFIX + '8';
const WARNING_SHORTCUT = PREFIX + '9';
const GOOD_SHORTCUT = PREFIX + '0';
const PREV_RADIO_SHORTCUT = PREFIX + 'h';
const NEXT_RADIO_SHORTCUT = PREFIX + 'l';

const SHORTCUTS = {
  [CRITICAL_SHORTCUT]: { action: 'focusRadio', index: 0 },
  [WARNING_SHORTCUT]: { action: 'focusRadio', index: 1 },
  [GOOD_SHORTCUT]: { action: 'focusRadio', index: 2 },
  [PREV_RADIO_SHORTCUT]: { action: 'cyclePrevRadio' },
  [NEXT_RADIO_SHORTCUT]: { action: 'cycleNextRadio' },
};

document.addEventListener('keydown', handleKeydown);

function handleKeydown(event) {
  if (!event.ctrlKey || event.altKey || event.metaKey) return;

  const shortcut = PREFIX + event.key;
  if (!SHORTCUTS[shortcut]) return;

  const isEditable = event.target.isContentEditable || event.target.tagName.toLowerCase() === 'textarea';
  const isCommentEditorElement = event.target.closest('.comment-editor');

  if (!isEditable && !isCommentEditorElement) return;

  event.preventDefault();
  performShortcutAction(SHORTCUTS[shortcut].action, SHORTCUTS[shortcut].index);
}

function performShortcutAction(action, index) {
  const radioControls = document.querySelectorAll('.radio__control');
  const radioInputs = document.querySelectorAll('.radio__input');

  switch (action) {
    case 'focusRadio':
      if (radioControls[index] && radioInputs[index]) {
        radioControls[index].focus();
        radioInputs[index].click();
      }
      break;
    case 'cyclePrevRadio':
      cycleRadioControls(radioControls, radioInputs, -1);
      break;
    case 'cycleNextRadio':
      cycleRadioControls(radioControls, radioInputs, 1);
      break;
  }

  setTimeout(simulateCmdEnter, 100);
}

function cycleRadioControls(radioControls, radioInputs, direction) {
  const currentIndex = Array.from(radioInputs).findIndex(input => input.checked);
  let newIndex = (currentIndex + direction + radioControls.length) % radioControls.length;

  if (radioControls[newIndex]) {
    radioControls[newIndex].focus();
    radioInputs[newIndex].click();
  }
}

function simulateCmdEnter() {
  var event = new KeyboardEvent('keydown', {
    bubbles: true,
    cancelable: true,
    keyCode: 13,
    ctrlKey: true
  });
  document.activeElement.dispatchEvent(event);
}
