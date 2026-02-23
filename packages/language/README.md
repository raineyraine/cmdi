# cmdi-language

Language used for the ui. Commands can be run without the language or ui, though
it's much easier to just use this.

## Syntax

### Literals

#### String Literals

#### Numeric Literals

The [same rules for numbers in Luau](https://luau.org/syntax/#number-literals)
are used in cmdi

- Hexadecimal integer literals, 0xABC or 0XABC
- Binary integer literals, 0b01010101 or 0B01010101
- Decimal separators in all integer literals, using \_ for readability:
  1_048_576, 0xFFFF_FFFF, 0b_0101_0101
