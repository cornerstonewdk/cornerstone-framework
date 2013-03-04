# Cachr Plugin for DocPad
This [DocPad](https://github.com/bevry/docpad) plugin provides a template helper that will take in a remote URL, download it, and provide the local URL for you.


## Install

```
npm install --save docpad-plugin-cachr
```


## Usage

To use, simply wrap any url you want to cache locally within the exposed `@cachr(url)` function inside your templates.

- [Eco](https://github.com/sstephenson/eco) example:

	``` coffeescript
	<img src="http://somewebsite.com/someimage.gif"/>
	```

	would become:

	``` coffeescript
	<img src="<%=@cachr('http://somewebsite.com/someimage.gif')%>"/>
	```

- [CoffeeKup](http://coffeekup.org/) example:

	``` coffeescript
	img src:'http://somewebsite.com/someimage.gif'
	```

	would become:

	``` coffeescript
	img src:@cachr('http://somewebsite.com/someimage.gif')
	```



## History
You can discover the history inside the `History.md` file


## License
Licensed under the incredibly [permissive](http://en.wikipedia.org/wiki/Permissive_free_software_licence) [MIT License](http://creativecommons.org/licenses/MIT/)
<br/>Copyright &copy; 2012 [Bevry Pty Ltd](http://bevry.me)