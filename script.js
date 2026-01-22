const resultEl = document.getElementById('result')
const lengthEl = document.getElementById('length')
const uppercaseEl = document.getElementById('uppercase')
const lowercaseEl = document.getElementById('lowercase')
const numbersEl = document.getElementById('numbers')
const symbolsEl = document.getElementById('symbols')
const generateEl = document.getElementById('generate')
const clipboardEl = document.getElementById('clipboard')

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
}

clipboardEl.addEventListener('click', () => {
  const textarea = document.createElement('textarea')
  const password = resultEl.innerText

  if (!password) {
    return
  }

  textarea.value = password
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('copy')
  textarea.remove()
  alert('Password copied to clipboard!')
})

generateEl.addEventListener('click', () => {
  const length = +lengthEl.value
  const hasLower = lowercaseEl.checked
  const hasUpper = uppercaseEl.checked
  const hasNumber = numbersEl.checked
  const hasSymbol = symbolsEl.checked

  resultEl.innerText = generatePassword(
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
    length
  )
})

function generatePassword(lower, upper, number, symbol, length) {
  let generatedPassword = ''
  const typesCount = lower + upper + number + symbol
  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  )

  if (typesCount === 0) {
    return ''
  }

  // First, ensure at least one character from each selected type
  typesArr.forEach((type) => {
    const funcName = Object.keys(type)[0]
    generatedPassword += randomFunc[funcName]()
  })

  // Fill the rest with random characters from selected types
  for (let i = typesCount; i < length; i++) {
    const randomType = typesArr[Math.floor(Math.random() * typesArr.length)]
    const funcName = Object.keys(randomType)[0]
    generatedPassword += randomFunc[funcName]()
  }

  // Shuffle the final password to mix the guaranteed characters
  const finalPassword = shuffleString(generatedPassword)
  return finalPassword
}

function shuffleString(string) {
  const array = string.split('')
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array.join('')
}

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function getRandomSymbol() {
  const symbols = '!@#$%^&*(){}[]=<>/,.'
  return symbols[Math.floor(Math.random() * symbols.length)]
}
