ember-telephone-keypad
==============================================================================

A simple 3x4 telephone keypad (checkout ![screenshot] (screenshots/screenshot.png)).

Installation
------------------------------------------------------------------------------

```
ember install ember-telephone-keypad
```


Usage
------------------------------------------------------------------------------

Place `{{keypad-component}}` where you need the keypad to be rendered.

The following parameters are available.
<ul>
  <li>`title`: string - If you want to provide a title</li>
  <li>`showClose`: boolean - If you want &times; to be displayed</li>
  <li>`keypadCloseCallback`: action - This action will be called when &times; is clicked</li>
  <li>`showDisplay`: boolean - An `input` where the pressed keys are displayed is rendered above the keypad</li>
  <li>`focusDisplay`: boolean - The above `input` will be focussed on initial render</li>
  <li>`targetDisplay`: selector - An `input` in your app to display the keys pressed</li>
  <li>`targetEvent`: string - The event to dispatch from the above display on keypress</li>
  <li>`keyPressCallback`: action - This action will be called with the key pressed</li>
</ul>



License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
