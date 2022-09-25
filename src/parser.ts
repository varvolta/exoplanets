import { ColumnItem, LooseObject } from './types.js'

import fs from 'fs'

const snakeToCamel = (str: string) =>
    str.toLowerCase().replace(/([-_][a-z])/g, group =>
        group
            .toUpperCase()
            .replace('-', '')
            .replace('_', '')
    )


const columns = fs.readFileSync('data/columns.txt', 'utf8')
const data = fs.readFileSync('data/data.csv', 'utf8')

const columnLines = columns.split(/\r?\n/)
const dataLines = data.split(/\r?\n/)

const columnsList: ColumnItem[] = []

for (let i = 0; i < columnLines.length; i += 2) {
    const key = snakeToCamel(columnLines[i])
    const name = columnLines[i + 1]
    const item: ColumnItem = {
        key,
        name
    }
    columnsList.push(item)
}

let dataList: LooseObject[] = []

for (let i = 0; i < dataLines.length; i++) {
    const values: string[] = dataLines[i].split(',')
    const item: LooseObject = {}

    const length = values.length
    let j = 0
    for (j; j < length; j++) {
        const key = columnsList[j].key
        item[key] = values[j]
    }

    dataList.push(item)
}

fs.writeFileSync('data/planets.json', JSON.stringify(dataList), 'utf8')
fs.writeFileSync('data/columns.json', JSON.stringify(columnsList), 'utf8')