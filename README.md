# input-cookies-directive.js
Dependencies:
1 - angular-cookies.js "ngCookies"
2 - angularJs version > 1.5.x

Directive for insert cookies using angular-cookies

Usage: 
```html
<input name="city" ng-model="city" type="text" input-cookie cookie-name="city" cookie-value="{{New York}}"/>

```
Required ng-model attribute declaration on the input.
