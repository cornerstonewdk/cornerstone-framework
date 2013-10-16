define( [ 'dummy/calculator' ], function( Calculator ) {

    // 2
    //var age = Math.floor( Math.random() * 100 ) + 1;
    // 3
    var age = Calculator.calculateAge();

    return {
        name: '홍길동',
        age: age,
        gender: '남'
    };
} );