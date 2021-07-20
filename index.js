#!/usr/bin/env node

const fs = require('fs');
const util = require('util');
const chalk = require('chalk');
const path = require('path')

//LSTAT IMPLEMENTATION - method 3
const { lstat } = fs.promises;

const targetDirectory = process.argv[2] || process.cwd();

console.log(process.argv)

fs.readdir(targetDirectory, async (err, filenames) => {
    if (err) {
        console.log(err)
    }

    const statPromises = filenames.map(filename => {
        return lstat(path.join(targetDirectory, filename));
    });

    const allStats = await Promise.all(statPromises);

    for (let stats of allStats) {
        const index = allStats.indexOf(stats);
        if (stats.isFile()) {
            console.log(filenames[index]);
        } else {
            //use dependency chalk to make folders blue
            console.log(chalk.blue(filenames[index]))
        }

    }

    //LSTAT IMPLEMENTATION - method 2
    /* const allStats = Array(filenames.length).fill(null);

    for (let filename of filenames) {
        const index = filenames.indexOf(filename);

        fs.lstat(filename, (err, stats) => {
            if (err) {
                console.log(err)
            }

            allStats[index] = stats;

            const ready = allStats.every((stats) => {
                return stats;
            });

            if (ready) {
                allStats.forEach((stats, index) => {
                    console.log(filenames[index], stats.isFile());
                })
            }
        })
    } */

    //LSTAT IMPLEMENTATION - method 1
    /* const lstat = (filename) => {
        return new Promise((resolve, reject) => {
            fs.lstat(filename, (err, stats) => {
                if (err) {
                    reject(err);
                }

                resolve(stats);
            });
        });
    } */
})