# EazyL

Eazyl is a very simple ACL (Access Control List) implementation.

[![Version](https://img.shields.io/npm/v/eazyl.svg?style=flat-square)](https://www.npmjs.com/package/eazyl)
[![License](https://img.shields.io/npm/l/eazyl.svg?style=flat-square)](https://www.npmjs.com/package/eazyl)
[![Downloads](https://img.shields.io/npm/dt/eazyl.svg?style=flat-square)](https://www.npmjs.com/package/eazyl)
![Filesize](https://img.shields.io/bundlephobia/min/eazyl.svg)
[![Build Status](https://img.shields.io/travis/teefouad/eazyl/master.svg?style=flat-square)](https://travis-ci.org/teefouad/eazyl) 
![Coveralls GitHub](https://img.shields.io/coveralls/github/teefouad/eazyl.svg)

&nbsp;
&nbsp;

# Installation

**Install with npm**
```
npm install --save eazyl
```

**Install with yarn**
```
yarn add eazyl
```

&nbsp;
&nbsp;

# Usage

Simply:

```
import createRole, { checkIf } from 'eazyl';

createRole('people').can('eat')('food');

checkIf('people').can('eat')('food'); // true
checkIf('people').can('have')('wings'); // false
```

Conditionally:

```
import { a, checkIf } from 'eazyl';

a('person').can('buy')('phone').when(phone => phone.price < 800);

const iPhone = {
    model: 'x-tra x-pensive',
    price: 2999,
};

checkIf('person').can('buy')('phone').with(iPhone); // false
```

&nbsp;
&nbsp;

# License

MIT
