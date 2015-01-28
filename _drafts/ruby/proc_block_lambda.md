# Proc, Block and Lambda in Ruby

### Proc.new
When given no block, `Proc.new` will take the block of the surrounding method as it's argument.
If `Proc.new` is not called within a method, it raises an `ArgumentError` exception
```
def proc_from 
  Proc.new
end

a = proc_from { "Hello" }
a.call #=> "Hello"
```

### &:foo
When `&` operator is placed in front of a `Proc`, it tell ruby to interprete it as a block.
```
def greeting(name, &block)
  block.call(name)
end

greeter = ->(name) { print "Hello #{name}" }
greeting("John", &greeter)

# => Hello John
```
When `&` is placed in front of other object, ruby will try to convert that object into a Proc using `#to_proc`.

```
a = %w( barz weeee foo )
sorted = a.sort_by &:length
#=> sorted == ["foo", "barz", "weeee"]
```
`Symbol#to_proc` turn `:length` into `{ |x| x.length }`
