/**
 * Multipage Router's Starter
 *
 * Multipage Router의 인스턴스를 하나 생성하고 Backbone.history를 시작한다.
 */

$( function() {
	new ( MultipageRouter.extend( { useDataAttributes: true } ) )();
	Backbone.history.start();
} );
