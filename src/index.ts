import { ColumnItem, LooseObject } from './types.js'

import fs from 'fs'

const columns = JSON.parse(fs.readFileSync('./data/columns.json', 'utf8'))
const planets = JSON.parse(fs.readFileSync('./data/planets.json', 'utf8'))

const descriptionForKey = (key: string) => columns[key]

const findKey = (key: string) => {
    const column = columns.find((column: ColumnItem) => column.key.toLowerCase().includes(key.toLowerCase()))
    return column ? column.key : new Error('Column not found')
}

const find = (key: string, value: string, all: boolean) => {
    return planets[all ? 'filter' : 'find']((planet: LooseObject) => {
        try {
            return planet[key].toLowerCase().includes(value.toLowerCase())
        } catch (e) {
            return false
        }
    })
}

const Exoplanets = {
    descriptionForKey,
    findKey,
    find,
    planets,
    columns
}

export type {
    ColumnItem,
    LooseObject
}

export default Exoplanets