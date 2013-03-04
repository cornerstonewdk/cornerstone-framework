function smartAnchor ( id ) {
    //alert( id );
    //window.open(id,'_self');
    //goToByScroll(id);
    if (window.innerWidth <= 784)
        location.href = location.href + "#" + id;
    //alert(window.innerWidth);
}

function goToByScroll(id){
    $('html,body').animate({scrollTop: $("#"+id).offset().top},'slow');
}
