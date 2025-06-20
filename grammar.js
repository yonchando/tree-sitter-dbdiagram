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
  conflicts: ($) => [[$.table_name, $.schema]],
  rules: {
    source_file: ($) => repeat($.table),

    table: ($) => seq($.keyword_table, $.table_name, "{", repeat($.body), "}"),

    keyword_table: () => "Table",

    table_name: ($) =>
      choice(
        $.identifier,
        seq($.schema, ".", $.identifier),
        seq($.schema, ".", $.identifier, $.keyword, $.alias),
        seq(
          choice($.identifier, seq($.schema, ".", $.identifier)),
          $.keyword,
          $.alias,
        ),
      ),

    schema: ($) => $.identifier,

    alias: ($) => $.identifier,

    body: ($) => seq($.column, $.type, $.setting),

    column: () => /[a-zA-Z_][a-zA-Z0-9_]*/,

    identifier: () => /[a-zA-Z_][a-zA-Z0-9_]*/,

    type: ($) => choice($._basic_type, $._type_length),

    _basic_type: () =>
      choice(
        "string",
        "text",
        "char",
        "varchar",
        "varchar2",
        "tinyint",
        "int",
        "integer",
        "bigint",
        "float",
        "double",
        "decimal",
        "bool",
        "boolean",
        "json",
        "jsonb",
        "clob",
        "date",
        "time",
        "datetime",
        "timestamp",
      ),

    _type_length: ($) =>
      seq(choice("varchar", "nvarchar"), $.bracket, $.length, $.bracket),

    setting: ($) =>
      choice(seq("[", repeat($.setting_keys), "]"), $.setting_key),

    setting_keys: ($) => seq($.setting_key, repeat(seq(",", $.setting_key))),

    setting_key: ($) =>
      choice(
        "null",
        "not null",
        "unique",
        "default",
        "increment",
        "PK",
        "pk",
        $.key_value,
      ),

    length: () => /\d+/,

    bracket: () => choice("(", ")"),

    key_value: ($) => seq($.key, $.separate, /\s?/, $.value),
    separate: () => ":",
    key: () => choice("ref", "note", "default", "Note"),

    value: ($) => choice($._ref, $._note, $._default),

    keyword: () => choice("as", "enum"),

    _ref: ($) =>
      seq(choice(">", "<", "-", "<>"), /\s?/, $.table_name, ".", $.column),

    _note: () => seq("'", /\w+/, "'"),

    _default: () => choice(/\d+/, seq("`", /\w+/, "()", "`")),
  },
});
