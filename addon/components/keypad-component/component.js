import Component from '@ember/component';
import layout from './template';
import { computed } from '@ember/object';

export default Component.extend({
  layout,
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
      this.$('input').on('keypress', this._displayKeypressHandler);
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
      }

      if (this.get('targetDisplay')) {
        const targetDisplay = document.querySelector(this.get('targetDisplay'));
        targetDisplay.value = (targetDisplay.value || '') + key;
      }

      this.keyPressCallback(key);
    }
  }
});
