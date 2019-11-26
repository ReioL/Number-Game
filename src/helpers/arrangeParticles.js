export default function arrangeParticles(paused) {
  const particleArray = document.querySelectorAll(".particle")
  const mainDivHeight = (document.querySelector(".particleContainer").clientHeight * 0.8) / 2
  const mainDivWidth = (document.querySelector(".particleContainer").clientWidth * 0.8) / 2
  const numberOfParticles = 20
  particleArray.forEach((particle, i) => {
    const modifiedParticle = particle
    const fromTop =
      mainDivHeight + -mainDivHeight * Math.cos((360 / numberOfParticles / 180) * i * Math.PI) + mainDivHeight * 0.2
    const fromLeft =
      mainDivWidth + mainDivWidth * Math.sin((360 / numberOfParticles / 180) * i * Math.PI) + mainDivWidth * 0.2
    const { top } = particle.getBoundingClientRect()
    const { left } = particle.getBoundingClientRect()
    const computedTop = fromTop - top
    const computedLeft = fromLeft - left
    if (paused) {
      modifiedParticle.style.top = `${parseFloat(particle.style.top) + computedTop}px`
      modifiedParticle.style.left = `${parseFloat(particle.style.left) + computedLeft}px`
    } else {
      modifiedParticle.style.top = `${computedTop}px`
      modifiedParticle.style.left = `${computedLeft}px`
    }
  })
}
