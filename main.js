import {countries} from './countries.js'

const subtitle = document.querySelector('.subtitle')
subtitle.textContent = `Currently, we have ${countries.length} countries`
const graphButtons = document.querySelector('.graph-buttons')
const graphTitle = document.querySelector('.graph-title')
const graphWrapper = document.querySelector('.graph-wrapper')

// Sorting Countries Data
// Either by type - Population, Capital, or Name 
const sortCountries = (arr, type) => {
  const countries = [...arr]
  const sortedCountries = countries.sort((a, b) => {
    if(a[type] > b[type]) return -1
    if(a[type] < b[type]) return 1
    return 0
  })
  return sortedCountries
}

// Counting Languages for bar graph
const languagesWithItsCounts = (arr) => {
  const lang = []
  const finalLangObj = []
  const languageSet = new Set()
  arr.forEach(count => {
    let {languages} = count
    for(const language of languages) {
      lang.push(language)
      languageSet.add(language)
    }
  })
  for(const language of languageSet) {
    const count = lang.filter(l => l === language).length
    finalLangObj.push({language, count})
  }
  return finalLangObj
}

// Most populated countries and spoken languages
const mostPopulatedCountries = sortCountries(countries, 'population').slice(0, 10)
const mostSpokenLanguages = sortCountries(languagesWithItsCounts(countries), 'count').slice(0, 10)

// Finding World Population
const calculateWorldPopulation = (arr) => {
  const countries = [...arr]
  let total = 0
  for(const {population} of countries) {
    total += population
  }
  return total
}
// 7758589152

// creating Data for Population Bar graph 
const populationBarUI = ({name, population}) => {
  const worldPopulation = calculateWorldPopulation(countries)
   let formatName 
   let formattedName = (name === 'United States of America') ? formatName = 'USA' :
   (name === 'Russian Federation') ? formatName = 'Russia' : name
    let width = Math.round((population / worldPopulation) * 100)
  return `<div class="bars">
          <div> ${formattedName} </div>
          <div class="barWidth" style="width:${width}%;height:35px;"> </div>
          <div> ${population.toLocaleString()} </div>
          </div>`
}

// Creating Population Graph
const createPopulationGraph = (arr) => {
  let world = {name: 'World', population: 7758589152}
  let content = ''
  content += populationBarUI(world)
  arr.forEach(country => (content += populationBarUI(country)))
  graphWrapper.innerHTML = content
}

// creating Data for Language Bar Graph
const languagesBarUI = ({language, count}) => {
  return `<div class="bars">
          <div>${language}</div>
          <div class="barWidth" style="width:${count}%;height:35px;"></div>
          <div>${count}</div>
          </div>`
}

// Creating Language Graph
const createLanguageGraph = (arr) => {
  let content = ''
  arr.forEach(country => (content += languagesBarUI(country)))
  graphWrapper.innerHTML = content
}

graphTitle.textContent = '10 Most populated countries in the world'

graphButtons.addEventListener('click', (e) => {
  const className = e.target.className
  if(className === 'population') {
    graphTitle.textContent = '10 Most populated countries in the world'
    createPopulationGraph(mostPopulatedCountries)
  } else if(className === 'languages') {
    graphTitle.textContent = '10 Most Spoken Languages in the world'
    createLanguageGraph(mostSpokenLanguages)
  } else {

  }
})

window.addEventListener('DOMContentLoaded', createPopulationGraph(mostPopulatedCountries))