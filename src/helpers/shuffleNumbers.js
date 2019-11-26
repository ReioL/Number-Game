export default function shuffle(nums) {
  const shuffledNums = nums
  for (let i = nums.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = shuffledNums[i]
    shuffledNums[i] = shuffledNums[j]
    shuffledNums[j] = temp
  }
  return shuffledNums
}
