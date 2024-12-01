import { exerciceList as exerciceList2024 } from './main.module'

function main () {
  console.log('')
  console.log('#### 2024 ####')

  exerciceList2024.map((seeResult: () => {}) => seeResult())
}

main()