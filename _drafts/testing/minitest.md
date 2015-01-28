# Minitest components

MiniTest::Unit - Unit test
MiniTest::Spec - Specs
MiniTest::Mock - Providing mock objects for tests

## MiniTest::Spec

methods: `it`, `describe`

## MiniTest in Rails

*test_helper.rb* will be required in test files. It will contains all the setups needed for tests. This also means all defined methods in test_helper.rb will be available in your test cases.

## Runing Tests in Rails
`bin/rake test [test_files|optional [test_method|optional]]` - if a test file is specified, only test cases in that test file are run, else all the test files are run.
