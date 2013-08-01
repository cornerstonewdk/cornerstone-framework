/**
 * Multipage Router
 *
 * Backbone.Router를 확장하여 여러 페이지로 구성된 웹앱에서 라우팅을 통하여 페이지 이동이 쉽도록 지원한다.
 * 기존의 Router와는 다르게 routes 속성 대신 pages 속성으로 라우팅을 정의한다.
 */

( function( root, factory ) {

	// Require.js가 있을 경우
	if ( typeof define === 'function' && define.amd )
		define( [ 'backbone', 'underscore', 'jquery', 'transition' ], factory );
	else
		root.MultipageRouter = factory( root.Backbone, root._, root.$, root.Transition );

} )( window, function( Backbone, _, $, Transition ) {

	return Backbone.Router.extend( {
		
		constructor: function( attributes, options ) {
		
			var self = this;

			// Data Attribute를 사용하면 기존 pages 속성은 삭제되고, 마크업에 의해서 pages 속성이 다시 작성된다.
			if ( this.useDataAttributes ) {

				this.pages = {};

				_.each( $( '[data-url],[data-default-page]' ), function( value, key ) {

					var defaultPage = $( value ).attr( 'data-default-page' );
					var url = $( value ).attr( 'data-url' );
					var fragments = [];

					if ( defaultPage == 'true' ) fragments.push( '' );
					if ( url ) fragments.push( url );

					self.pages[ 'page' + key ] = {
						fragment: fragments,
						el: value
					};
				} );
			}
			
			/* routes 대신 pages 속성으로 라우팅을 정의한다.
			 * 해당 페이지가 시작되면 먼저 render가 실행되고, Transition이 일어난 후, active가 실행된다.
			 *
			 * pages: {
			 *   page-id: {
			 *     fragment: fragment ID의 패턴, 기존 routes 속성의 key와 동일한 값이며, 여러개를 배열로 지정할 수도 있다.
			 *     el: 현재 페이지를 나타내는 selector
			 *     render: 현재 페이지가 그려져야 할 때 실행될 callback 함수 또는 함수명
			 *     active: 현재 페이지가 완전히 활성화될 때 실행될 callback 함수 또는 함수명
			 *     inactive: 현재 페이지가 비활성화될 때 실행될 callback 함수 또는 함수명
			 *   }
			 * }
			 *
			 * transitions: {
			 *   'from-page-id:to-page-id': 'transition 종류',
			 *   'from-page-id:to-page-id': { type: 'transition 종류', duration: 시간(ms) }
			 * }
			 */
			if ( this.pages ) {
				
				var routes = this.routes = {};
				
				_.each( this.pages, function( value, key ) {
				
					if ( key == 'default' ) {
						if ( value ) routes[ '*path' ] = key + '_handler';
					}
					else if ( value.fragment ) {
						if ( !_.isArray( value.fragment ) ) value.fragment = [ value.fragment ];
						
						_.each( value.fragment, function( fragment ) {
							routes[ fragment ] = key + '_handler';
						} );
					}
					
					// 기본적으로 pages와 연결된 el은 숨긴다.
					value.el && $( value.el ).hide();
					
					self[ key + '_handler' ] = function() {
						
						var handlerArg = arguments;
					
						self.runInactive( key );
						
						var prevPageId = self.currentPageId, prevPage = self.currentPage;
						self.currentPageId = key;
						self.currentPage = value;
						self.runRender.apply( self, arguments );
						
						// Transition 설정이 있으면 Transition 실행
						var transition = self.findTransition( prevPageId, key );
						
						if ( transition ) {
							
							var params = {
								transitionType: transition.type,
								inTarget: { el: value.el },
								outTarget: { el: prevPage.el },
								isReverse: transition.reverse || false,
								done: function() {
									// Transition 완료 후에 active 실행
									self.runActive.apply( self, handlerArg );
								}
							};
			
							if ( transition.duration ) {
								params.inTarget.duration = transition.duration / 2;
								params.outTarget.duration = transition.duration / 2;
							}
							
							Transition.launcher( params );
						}
						// Transition 설정이 없으면 그냥 이전 페이지를 숨기고 새 페이지를 보여준다.
						else {
							prevPage && prevPage.el && $( prevPage.el ).hide();
							value.el && $( value.el ).show();
							
							self.runActive.apply( self, arguments );
						}
					};
				} );
			}
			
			// data-transition을 사용해서 지정된 Transition 설정을 보관한다.
			// data-transition을 사용하면 현재 페이지는 알 수 있으나 도착 페이지는 현재 시점에서는 알 수 없다.
			// 반대 방향의 설정이 없을 때 동일한 type의 reverse transition을 적용하기 위해 보관한다.
			// data-transition은 click이 가능한 요소면 어디든 붙일 수 있다.
			this.dataTransitions = {};
			
			$( document ).on( 'click', '[data-transition]', function( e ) {
			
				var transition = {
					type: $( this ).attr( 'data-transition' )
				};
			
				var dataDuration = $( this ).attr( 'data-duration' );
				if ( dataDuration ) transition.duration = parseInt( dataDuration );
				
				self.dataTransitions[ self.currentPageId ] = transition;
				e.stopPropagation();
			} );
			
			$( document ).on( 'click', ':not([data-transition])', function( e ) {
				delete self.dataTransitions[ self.currentPageId ];
				e.stopPropagation();
			} );
			
			// 여기서 extend 된 Router들의 initialize가 실행된다.
			// 따라서 extend 된 Router들의 initialize보다 먼저 실행하려면 앞쪽에, 나중에 실행하려면 뒷쪽에 코드를 작성한다.
			Backbone.Router.apply( this, arguments );
		},
		
		_findDataTransitionObject: function( from ) {
			var transition = this.dataTransitions[ from ];
			return _.isString( transition ) ? { type: transition } : transition;
		},
		
		_findTransitionObject: function( from, to ) {
			if ( !this.transitions ) return null;
			var transition = this.transitions[ from + ':' + to ];
			return _.isString( transition ) ? { type: transition } : transition;
		},
		
		// from 페이지에서 to 페이지로 이동할 때의 Transition 설정을 찾는다.
		// returns {
		//   type: transition의 종류
		//   duration: 생략 가능, 이동 시간 (ms)
		//   reverse: 생략 가능, true/false
		// }
		findTransition: function( from, to ) {
			
			var transition;
			
			if ( transition = this._findDataTransitionObject( from ) ) {
				transition.reverse = false;
				return transition;
			}
			if ( transition = this._findDataTransitionObject( to ) ) {
				transition.reverse = true;
				return transition;
			}
			
			// from -> to 방향의 Transition 설정이 없으면 to -> from 방향을 찾는다.
			if ( transition = this._findTransitionObject( from, to ) ) {
				transition.reverse = false;
				return transition;
			}
			if ( transition = this._findTransitionObject( to, from ) ) {
				transition.reverse = true;
				return transition;
			}
			
			return null;
		},
		
		// 현재 페이지의 render callback을 실행한다.
		runRender: function() {
		
			if ( !this.currentPage ) return;

			$( this.currentPage.el ).trigger( 'render', _.values( arguments ) );
		
			if ( !this.currentPage.render ) return;
			
			// render는 함수 또는 함수 이름을 지정할 수 있다.
			var renderCallback = _.isFunction( this.currentPage.render ) ? this.currentPage.render : this[ this.currentPage.render ];
			
			_.isFunction( renderCallback ) && renderCallback.apply( this, arguments );
		},
		
		// 현재 페이지의 active callback을 실행한다.
		runActive: function() {
		
			if ( !this.currentPage ) return;

			$( this.currentPage.el ).trigger( 'active', _.values( arguments ) );
		
			if ( !this.currentPage.active ) return;
			
			// active는 함수 또는 함수 이름을 지정할 수 있다.
			var activeCallback = _.isFunction( this.currentPage.active ) ? this.currentPage.active : this[ this.currentPage.active ];
			
			_.isFunction( activeCallback ) && activeCallback.apply( this, arguments );
		},
		
		// 현재 페이지의 inactive callback을 실행한다.
		runInactive: function( nextPageId ) {
		
			if ( !this.currentPage ) return;

			$( this.currentPage.el ).trigger( 'inactive', _.values( arguments ) );
		
			if ( !this.currentPage.inactive ) return;
			
			// inactive는 함수 또는 함수 이름을 지정할 수 있다.
			var inactiveCallback = _.isFunction( this.currentPage.inactive ) ? this.currentPage.inactive : this[ this.currentPage.inactive ];
			
			// 새로 변경될 화면의 id를 넘겨준다.
			_.isFunction( inactiveCallback ) && inactiveCallback( nextPageId );
		}
	} );
} );
