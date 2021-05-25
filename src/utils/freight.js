import Vue from 'vue'

Vue.filter('endFreight', value => {
  return Math.ceil(value * 0.08) > 10 ? Math.ceil(value * 0.08) : 10
})
