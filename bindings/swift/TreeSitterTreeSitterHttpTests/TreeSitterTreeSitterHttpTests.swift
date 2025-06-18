import XCTest
import SwiftTreeSitter
import TreeSitterTreeSitterHttp

final class TreeSitterTreeSitterHttpTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_tree_sitter_http())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading TreeSitterHttp grammar")
    }
}
