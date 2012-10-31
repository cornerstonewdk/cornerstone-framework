_ = require 'underscore'

# Export Plugin
module.exports = (BasePlugin) ->
	# Define Plugin
	class SectionsPlugin extends BasePlugin
		# Plugin name
		name: 'sections'

		getSections: (obj) ->
			sections = [obj] if _.isString obj
			sections = @getSections obj() if _.isFunction obj
			sections = obj if _.isArray obj

			sections

		renderBefore: ({collection, templateData, logger},next) ->
			try
				templateData[ 'sections' ] = sectionsObject =
					data: {}
					store: (sectionname, obj) ->
						if sectionname
							key = sectionname.toLowerCase()

							#for safety
							key = ['--',key,'--'].join '' if key in ['__proto__', 'prototype']

							if obj
								#set
								if @data[ key ]
									@data[ key ].documents.push obj
								else
									@data[ key ] =
										name : sectionname
										documents : [obj]

								@data

							else
								#get
								@data[ key ]
						else
							@data

				getSections=@getSections
				collection.forEach (document)->
					sections = getSections document.get( 'sections' )

					return if !sections

					for section in sections
						sectionsObject.store section, document

				next()
			catch err
				return next(err)

