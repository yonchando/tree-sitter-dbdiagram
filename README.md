## tree-sitter-dbdiagram

tree-sitter-dbdiagram is syntax highlighting for dbdiagram.io in neovim

## Install parsers

(NvimTresitter)[https://github.com/nvim-treesitter/nvim-treesitter?tab=readme-ov-file#adding-parsers]

```lua
local parser_config = require "nvim-treesitter.parsers".get_parser_configs()
parser_config.dbdiagram = {
  install_info = {
    url = "https://github.com/yonchando/tree-sitter-dbdiagram", -- local path or git repo
    files = {"src/parser.c"}, -- note that some parsers also require src/scanner.c or src/scanner.cc
    branch = "main", -- default branch in case of git repo if different from master
    generate_requires_npm = false, -- if stand-alone parser without npm dependencies
    requires_generate_from_grammar = false, -- if folder contains pre-generated src/parser.c
  },
  filetype = "dbdiagram", -- if filetype does not match the parser name
}

vim.cmd [[
augroup DBGFiltypeRelated
  au BufNewFile,BufRead *.dbdiagram set ft=dbdiagram
augroup END
]]
```

## Usage

`:TSInstallFromGrammar dbdiagram`
