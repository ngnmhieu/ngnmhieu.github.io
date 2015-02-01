# Service

A service is registered to the app through the method `#factory` which
create a Singleton. This service object can be accessed by different parts
in the application.

``` 
app.factory('ServiceName', [function() { 
  return {
  };
});
```
