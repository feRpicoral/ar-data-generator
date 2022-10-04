import { faker } from '@faker-js/faker';
import commandLineArgs from 'command-line-args';
import * as fs from 'fs';
import * as papaparse from 'papaparse';
import { join, resolve } from 'path';

const OUT_DIR = resolve(__dirname, '../out');

interface Header {
    name: string;
    generator: () => string | number | boolean;
}

interface Options {
    entries: number;
}

const options = commandLineArgs([
    {
        name: 'entries',
        alias: 'e',
        type: Number,
        multiple: false,
        defaultValue: 100
    }
]) as Options;

if (options.entries < 1) {
    console.error('You must generate at least one entry!');
    process.exit(1);
}

const headers: Header[] = [
    {
        name: 'PIN',
        generator: () => faker.datatype.number(options.entries)
    },
    {
        name: 'DATE',
        generator: () => faker.date.recent().toISOString().split('T')[0]
    },
    {
        name: 'AGE',
        generator: () => faker.datatype.number({ min: 12, max: 65 })
    },
    {
        name: 'OCCUPATION',
        generator: faker.name.jobType
    },
    {
        name: 'EXPERIENCE',
        // TODO: Bound the max to half the age & if age < 16 set to 0
        generator: () => faker.datatype.number({ min: 0, max: 15 })
    },
    {
        name: 'HEIGHT (cm)',
        generator: () => faker.datatype.number({ min: 120, max: 195 })
    },
    {
        name: 'EYEGLASSES',
        generator: faker.datatype.boolean
    },
    {
        name: 'AR EXPERIENCE',
        generator: faker.datatype.boolean
    },
    {
        name: 'GROUP',
        generator: () => faker.helpers.arrayElement(['A1', 'A2', 'A3', 'B1', 'B2', 'B3']) // eslint-disable-line prettier/prettier
    },
    {
        name: 'CUBE TEST SCORE',
        generator: () => faker.datatype.number({ min: 0, max: 14 })
    },
    {
        name: 'CARD TEST SCORE',
        generator: () => faker.datatype.number({ min: 0, max: 40 })
    },
    {
        name: 'START TIME',
        // TODO: Define this
        generator: () => 'TODO'
    },
    {
        name: 'END TIME',
        // TODO: Define this
        generator: () => 'TODO'
    },
    {
        name: 'TRUST QS BEFORE PANEL 1',
        // TODO: Define this
        generator: () => 'TODO'
    },
    {
        name: 'PANEL 1 TIME (s)',
        generator: () => faker.datatype.number({ min: 180, max: 300 })
    },
    {
        name: 'PANEL 1 REWORK',
        generator: () => faker.datatype.number({ min: 0, max: 10 })
    },
    {
        name: 'PANEL 1 ERROR',
        generator: () => faker.datatype.number({ min: 0, max: 3 })
    },
    {
        name: 'PANEL 2 TIME (s)',
        generator: () => faker.datatype.number({ min: 240, max: 480 })
    },
    {
        name: 'PANEL 2 REWORK',
        generator: () => faker.datatype.number({ min: 0, max: 15 })
    },
    {
        name: 'PANEL 2 ERROR',
        generator: () => faker.datatype.number({ min: 0, max: 5 })
    },
    {
        name: 'PANEL 2 RED LIGHT',
        generator: faker.datatype.boolean
    },
    {
        name: 'TIME TO NOTICE RED LIGHT (s)',
        // TODO: Check the max value for this field
        generator: () => faker.datatype.number({ min: 3, max: 90 })
    },
    {
        name: 'PANEL 3 TIME (s)',
        generator: () => faker.datatype.number({ min: 300, max: 600 })
    },
    {
        name: 'PANEL 3 REWORK',
        generator: () => faker.datatype.number({ min: 0, max: 15 })
    },
    {
        name: 'PANEL 3 ERROR',
        generator: () => faker.datatype.number({ min: 0, max: 5 })
    },
    {
        name: 'INTENTIONAL ERROR',
        generator: faker.datatype.boolean
    },
    {
        name: 'TRUST QS AFTER PANEL 3',
        // TODO: Define this
        generator: () => 'TODO'
    },
    {
        name: 'HEADACHES',
        generator: faker.datatype.boolean
    },
    {
        name: 'EXIT QS',
        // TODO: Define this
        generator: () => 'TODO'
    }
];

const data = [];

for (let i = 0; i < options.entries; i++) {
    const fake: Record<string, string | number | boolean> = {};

    headers.forEach(header => {
        fake[header.name] = header.generator();
    });

    data.push(fake);
}

const csv = papaparse.unparse(data);
const path = join(OUT_DIR, `${Date.now()}-generation.csv`);

if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
}

fs.writeFileSync(path, csv, {
    flag: 'w',
    encoding: 'utf8'
});

export {};
