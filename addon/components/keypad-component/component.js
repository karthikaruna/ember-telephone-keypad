import Component from '@ember/component';
import layout from './template';
import { computed } from '@ember/object';
import { scheduleOnce } from '@ember/runloop';

export default Component.extend({
  layout,
  classNames: ['keypad-component'],
  keys: computed({
    get() {
      return {
        1: '',
        2: 'ABC',
        3: 'DEF',
        4: 'GHI',
        5: 'JKL',
        6: 'MNO',
        7: 'PQRS',
        8: 'TUV',
        9: 'WXYZ'
      };
    }
  }),
  focusDisplay: computed({
    get() { },
    set(key, value) {
      if (this.get('showDisplay') && value) {
        scheduleOnce('afterRender', this, function () {
          this.$('input').focus();
        });
      }
      return value;
    }
  }),

  displayKeypressHandler(event) {
    const pattern = this.get('usageIntention') === 'DIAL'
      ? /[\d*+#]/
      : /[\d*#]/;

    event.preventDefault();

    if (pattern.test(event.key)) {
      this.send('onKeyPress', event.key);
    }
  },

  didInsertElement() {
    this._super(...arguments);

    if (this.get('showDisplay')) {
      this.set('_displayKeypressHandler', this.displayKeypressHandler.bind(this));
      this.$('input')
        .on('keypress', this._displayKeypressHandler)
        .on('paste', event => event.preventDefault());
    }
  },
  willDestroyElement() {
    this._super(...arguments);

    if (this.get('showDisplay')) {
      this.$('input').off('keypress', this._displayKeypressHandler);
    }
  },

  actions: {
    onKeyPress(key) {
      if (this.get('showDisplay')) {
        this.set('displayValue', (this.get('displayValue') || '') + key);
        this.$('input').focus();
      }

      if (this.get('targetDisplay')) {
        const targetDisplay = document.querySelector(this.get('targetDisplay'));
        targetDisplay.value = (targetDisplay.value || '') + key;

        if (this.get('targetEvent')) {
          targetDisplay.dispatchEvent(new Event(this.get('targetEvent'), { bubbles: true }));
        }

        targetDisplay.focus();
      }

      this.keyPressCallback(key);
    },
    onKeypadClose() {
      this.keypadCloseCallback();
    }
  }
});
