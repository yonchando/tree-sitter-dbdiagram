// swift-tools-version:5.3

import Foundation
import PackageDescription

var sources = ["src/parser.c"]
if FileManager.default.fileExists(atPath: "src/scanner.c") {
    sources.append("src/scanner.c")
}

let package = Package(
    name: "TreeSitterTreeSitterHttp",
    products: [
        .library(name: "TreeSitterTreeSitterHttp", targets: ["TreeSitterTreeSitterHttp"]),
    ],
    dependencies: [
        .package(url: "https://github.com/tree-sitter/swift-tree-sitter", from: "0.8.0"),
    ],
    targets: [
        .target(
            name: "TreeSitterTreeSitterHttp",
            dependencies: [],
            path: ".",
            sources: sources,
            resources: [
                .copy("queries")
            ],
            publicHeadersPath: "bindings/swift",
            cSettings: [.headerSearchPath("src")]
        ),
        .testTarget(
            name: "TreeSitterTreeSitterHttpTests",
            dependencies: [
                "SwiftTreeSitter",
                "TreeSitterTreeSitterHttp",
            ],
            path: "bindings/swift/TreeSitterTreeSitterHttpTests"
        )
    ],
    cLanguageStandard: .c11
)
