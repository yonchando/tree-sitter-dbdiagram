package tree_sitter_tree_sitter_http_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_tree_sitter_http "github.com/tree-sitter/tree-sitter-tree_sitter_http/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_tree_sitter_http.Language())
	if language == nil {
		t.Errorf("Error loading TreeSitterHttp grammar")
	}
}
