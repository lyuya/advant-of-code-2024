import { promises } from 'fs'

export async function fetchData(path: string) {
    return await promises.readFile(path, 'utf8')
}