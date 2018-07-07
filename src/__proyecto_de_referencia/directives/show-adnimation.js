import Vue from 'vue'

Vue.directive('showAnimation', {
  inserted (el, binding, vnode, oldVnode) {
    el.style.opacity = 0
    el.style.transform = 'translateY(50px)'

    let calculateScroll = () => {
      let scrollBottomPosition = (window.innerHeight + window.scrollY) - 400
      if (el.offsetTop < scrollBottomPosition) {
        el.style.transition = 'all 1.2s ease'
        el.style.opacity = 1
        el.style.transform = 'translateY(0px)'
      }
    }

    calculateScroll()

    setTimeout(() => {
      window.addEventListener('scroll', () => {
        calculateScroll()
      });
    }, 1000)
  }
})
