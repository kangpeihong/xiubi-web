;(function() {
  const baseSizes = 16
  function setRem() {
    const scale = document.documentElement.clientWidth / 375
    document.documentElement.style.fontSize =
      baseSizes * Math.min(scale, 2) + 'px'
  }
  setRem()
  window.onresize = function() {
    setRem()
  }
})()
