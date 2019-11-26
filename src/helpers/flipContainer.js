export const flipToGame = particleAnimations => {
  const homeContentEl = document.querySelector(".homeContent")
  const gameContentEl = document.querySelector(".gameContent")
  particleAnimations.forEach(particle => {
    particle.pause()
  })
  homeContentEl.style.transform = "rotateX(180deg)"
  gameContentEl.style.transform = "rotateX(360deg)"
}

export const flipToHome = particleAnimations => {
  const homeContentEl = document.querySelector(".homeContent")
  const gameContentEl = document.querySelector(".gameContent")
  homeContentEl.style.transform = "rotateX(360deg)"
  gameContentEl.style.transform = "rotateX(180deg)"
  document.querySelectorAll(".particle").forEach(particle => {
    const modifiedParticle = particle
    //particle.style.top = "0px"
    //particle.style.left = "0px"
    modifiedParticle.style = ""
  })
  particleAnimations.forEach(particle => particle.play())
}
