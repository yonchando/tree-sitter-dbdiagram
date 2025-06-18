from unittest import TestCase

import tree_sitter
import tree_sitter_tree_sitter_http


class TestLanguage(TestCase):
    def test_can_load_grammar(self):
        try:
            tree_sitter.Language(tree_sitter_tree_sitter_http.language())
        except Exception:
            self.fail("Error loading TreeSitterHttp grammar")
