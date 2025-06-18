/**
 * @file grammar dbdiagram for nvim
 * @author Yon Chando <von.chando@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check
//
// @ts-ignore
module.exports = grammar({
  name: "dbdiagram",
  rules: {
    source_file: $ => repeat($.table),

    table: $ => seq(
      $.keyword_table,
      $.table_name, // table name
      '{',
      repeat($.body),
      '}'
    ),

    keyword_table: () => 'Table',

    table_name: ($) => $.identifier,

    body: ($) => seq($.column, $.type, repeat($.constrant)),

    column: () => seq(/[a-zA-Z_][a-zA-Z0-9_]*/),

    identifier: () => /[a-zA-Z_][a-zA-Z0-9_]*/,

    type: ($) => choice(
      $._basic_type,
      $._type_length,
    ),

    _basic_type: () => choice(
      'bigint', 'string', 'timestamp', 'int', 'bool', 'float', 'varchar'
    ),

    _type_length: ($) => seq(
      choice('varchar', 'nvarchar'),
      $.length,
    ),

    length: () => seq(
      "(",
      /\d+/,
      ")"
    ),

    constrant: () => choice(
      'unique', 'primary key', 'not null',
      'null'
    ),
  },
});
