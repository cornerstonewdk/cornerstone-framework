describe('Cornerstone event extend test',function(){
	it('widget-button',function(){
		require(['widget-button'], function (WidgetButton) {
			console.log(WidgetButton);
			var sTgBtn = new WidgetButton({el: '#singleTgBtn' });
			sTgBtn.render().$el.on('click',function(){
				$( this ).button('toggle');
			});
			

			sTgBtn.$el.on('toggleOn.cs.button', function(e){
				console.log(e);
			}).on('toggleOff.cs.button', function(e){
				console.log(e);
			} );
			
		});
	});
});