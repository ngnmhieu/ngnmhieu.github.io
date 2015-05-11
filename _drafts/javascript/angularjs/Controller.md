# AngularJS Controller

Controller is Javascript *constructor function*. A new *child scope*(?) willbe available as an *injectable parameter*(?) to the Controller's constructor as `$scope`.

## Purpose
Expose variables & functionality to expressions and directives.

```
// In HTML
// Instantiate controller & save it in `invoice` variable
<div ng-controller="InvoiceController as invoice">
```

## $scope
We can attach *properties* or *behaviors* (methods): 
- Any objects/primitives assigned to the `$scope` become model properties.
- Any methods assigned to the `$scope` is avaiable to the view, can be invoked in expression / event handler. 

### (?) Associating Controllers w. Scope Objects
