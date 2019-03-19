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

  actions: {
    onKeyPress(key) {
      if (this.get('showDisplay')) {
        this.set('displayValue', (this.get('displayValue') || '') + key);
      }

      this.keyPressCallback(key);
    }
  }
});
