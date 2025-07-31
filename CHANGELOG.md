# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.4.1] - 2025-07-31

### Fixed
- The og:title was not respecting the removeStoreNameTitle tag from store settings.

### Changed

- Update GitHub actions/cache to v4

## [1.4.0] - 2025-01-22

### Added

- `product:retailer_part_no` and `product:category` to the ProductOpenGraph.

## [1.3.0] - 2024-02-09

### Added
- Settings option to hide price.

## [1.2.2] - 2022-10-14

### Added
- `canonical` prop to `SearchOpenGraph` to support consistency between `<link rel="canonical">` tags and `og:url` metatags

## [1.2.1] - 2020-11-12
### Fixed
- Send spotPrice in product price.

## [1.2.0] - 2020-06-29
### Added
- `HomeOpenGraph` and `SearchOpenGraph` components.

## [1.1.0] - 2020-06-24
### Added
- `og:description` tag to all product pages.

## [1.0.6] - 2020-06-24
### Changed
- ESlint and testing setup.

## [1.0.5] - 2019-12-27

## [1.0.4] - 2019-10-28
### Chore
- Rebuild to enable lazy evaluation of native-types entrypoints.

## [1.0.3] - 2019-06-28

### Fixed

- Improve product title meta.

## [1.0.2] - 2019-06-27

### Fixed

- Build assets with new builder hub.

## [1.0.1] - 2019-06-13

### Fixed

- Use `property` instead of `name` attribute.

## [1.0.0] - 2019-06-13

### Added

- Product type open graph.
