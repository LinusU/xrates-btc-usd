#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const eachDay = require('date-fns/each_day')
const endOfYear = require('date-fns/end_of_year')
const format = require('date-fns/format')
const got = require('got')

async function main (year) {
  const start = new Date(year, 0, 1)
  const end = endOfYear(start)

  const url = 'https://api.coindesk.com/v1/bpi/historical/close.json'
  const query = `start=${format(start, 'YYYY-MM-DD')}&end=${format(end, 'YYYY-MM-DD')}`

  const response = await got(`${url}?${query}`, { json: true })
  const data = response.body.bpi

  const output = new Float64Array(eachDay(start, end).map((date) => {
    const key = format(date, 'YYYY-MM-DD')

    if (!Number.isFinite(data[key])) throw new Error(key)

    return data[key]
  }))

  const asBuffer = Buffer.from(output.buffer, output.byteOffset, output.byteLength)

  fs.writeFileSync(path.join(__dirname, `data/${year}`), asBuffer)
}

const year = Number(process.argv[2])

if (Number.isFinite(year)) {
  main(year).catch((err) => {
    process.exitCode = 1
    console.error(err.stack)
  })
} else {
  console.error('Usage:')
  console.error('  ./download.js <year>')
  process.exitCode = 1
}
