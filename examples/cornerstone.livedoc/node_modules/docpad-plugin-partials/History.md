## History

- v2.2.0 October 7, 2012
	- `@partial` signature now changed from `@partial(name,data)` to `@partial(name,objs...)`
		- If multiple objects are specified, they will be shallow-y merged into an empty object
		- This allows you to do things like `@partial('blah',@,{blah:'blah'})` to extend the partial `blah` with the template data and some custom partial data

- v2.1.2 August 10, 2012
	- Re-added markdown files to npm distribution as they are required for the npm website

- v2.1.1 July 8, 2012
	- Moved the insertion of the partial template helper into the new `extendTemplateData` event

- v2.1.0 July 8, 2012
	- Fixed path exists warning
	- Updated for DocPad 6.1

- v1.0.1 May 5, 2012
	- Updated for DocPad v5.2
	- Partials are now created with `createDocument` instead of `createPartial` which has been removed
	- Partials which aren't found will now throw a warning

- v1.0.0 April 14, 2012
	- Updated for DocPad v5.0
	- Fixed multiple partials on the same document bug

- v0.1.0 March 31, 2012
	- Initial working version for [Benjamin Lupton's Website](https://github.com/balupton/balupton.docpad)