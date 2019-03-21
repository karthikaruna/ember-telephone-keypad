import layout from './template';

export default Ember.Component.extend({
  layout,
  tagName: 'li',

  click() {
    if (this.get('number') === '0' && this.get('usageIntention') === 'DIAL') {
      if (this.get('isLongPressed')) {
        this.onPress('+');
        return;
      }
    }
    this.onPress(this.get('number'));
  },
  mouseDown() {
    this.set('pressStart', Date.now());
  },
  mouseUp() {
    this.set('pressEnd', Date.now());
    this.set('isLongPressed', (this.get('pressEnd') - this.get('pressStart') < 500) ? false : true);
  }
});
