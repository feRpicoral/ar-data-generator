# AR & The Future of Work
_Sample data generator_

This is a fake data generator intend to be used by the BAIC laboratory team in the AR project.

### CLI Options

|   Option  | Alias |                       Description                       |
|:---------:|:-----:|:-------------------------------------------------------:|
| --entries |   -e  | Define the amount of rows to generate. Defaults to 100. |

### Usage

You may either run directly from the `src` directory using

```bash
$ yarn test
```

Or you may transpile the code to JS and run the `tsc` output:

```bash
$ yarn build
$ yarn start
```

If you want to use CLI options, pass them directly to `yarn test` or `yarn start` depending on the method you are using.
