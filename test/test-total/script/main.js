requirejs.config( {
	//[ 5 ] paths 사용
    paths: {
        'person': 'model/person',
        'dependency1' : 'dummy/dependency1',
        'dependency2' : 'dummy/dependency2',
        'export1' : 'dummy/export1',
        'user': 'model/user',
        'validationView' : 'view/validationView'
    },
    //[ 6 ] deps 설정 user 모듈이 로드되기전에 dependency1, dependency2 가 선로드 된다.
    shim: {
        'person': {
            deps: [ 'dependency1', 'dependency2' ],
            exports: function() {
                return this.User.noConflict();
            }
        },
        //[ 22 ] style 동적 로드 확인
        'template!tmpl/user': [ 'style!css/user' ]
    }
} );

//[ 5 ] 설정의 모듈명으로 로드( user )
define( [ 'backbone', 
          'gesture-view', 
          'person', 
          'dummy/load-test', 
          'export1', 
          'user',
          'template!tmpl/user',
          'form-view',
          'validationView',
          'sync',
          'multipage-router',
          'logging'
           ],
          function( Backbone, 
                    GestureView, 
                    Person, 
                    Test, 
                    Export1, 
                    User,
                    userTemplate,
                    FormView,
                    ValidationView,
                    Sync,
                    MultipageRouter,
                    Logging
                     ) {
    return {
        launch: function() {
            // [ 29 ] 테스트
            // Backbone.sync = Sync.local;

            /*
            // [ 30 ] 테스트
            var MainRouter = Backbone.Router.extend( {
                // Fragment identifier의 패턴과 함수의 매핑
                routes: {
                    '': 'list',             // # or #이 없는 경우
                    'list': 'list',         // #list
                    'add': 'add',           // #add
                    'detail/:id': 'detail'  // #detail/5
                },
                list: function() {
                    // URL이 # 또는 #list로 끝나거나 #이 없는 경우 실행된다.
                    console.log( '#list 실행' );
                },
                add: function() {
                    console.log( '#add 실행' );
                },
                detail: function( id ) {
                    console.log( '#detail 실행, id : ' + id );
                }
            } );
            */
            
            function config() {
                Logging.config( {
                    debug: $( '#debug-group button.active' ).text(),
                    info: $( '#debug-group button.active' ).text(),
                    warn: $( '#debug-group button.active' ).text(),
                    error: $( '#debug-group button.active' ).text(),
                    time: $( '#debug-group button.active' ).text()
                } );
            }

            Logging.config( {
                defaultLevel: 'debug',
                debug: 'console',
                info: 'none',
                warn: 'console',
                error: 'screen',
                time: 'screen'
            } );

            $( '#debug-group button' ).click( function () {
                config();
            } );
            
            // [ 31 ] 테스트
            var MainRouter = MultipageRouter.extend( {
                pages: {
                    'list-page': {
                        fragment: [ '', 'list' ],
                        el: 'div#list',
                        render: function() {
                            console.log( '[ 31 ] #list 호출 발생 후 화면렌더링시에 실행' );
                        },
                        active: function() {
                            console.log( '[ 31 ] #list active.' );
                        }
                    },
                    'add-page': {
                        fragment: 'add',
                        el: 'div#add',
                        active: 'add'
                    },
                    'detail-page': {
                        fragment: 'detail/:id',
                        el: 'div#detail',
                        active: 'detail'
                    },
                    'default': {
                        active: function( path ) {
                            alert( '존재하지 않는 주소입니다. : ' + path );
                            history.back();
                        }
                    }
                },
                add: function() {
                    console.log( '[ 31 ] #add active.' );
                },
                detail: function( id ) {
                    console.log( '[ 31 ] #detail active. id : ' + id );
                },
                transitions: {
                    'list-page:add-page': 'slide',
                    'list-page:detail-page': { type: 'flip', duration: 2000 }
                }
            } );

            new MainRouter();

            // Fragment identifier의 변경을 감지하고 라우팅을 처리한다.
            Backbone.history.start();

            console.log( '[ 4 ] Application Launched' );
            console.log( '[ 5 ] requirejs의 설정 로드 후 ')
            console.log( '[ 1 ] ' + Person.name + ' / ' + Person.age + ' / ' + Person.gender );
            console.log( '[ 5 ] requirejs의 설정으로 간단히 명명한 Person 모듈이 사용' );
            console.log( '[ 2 ] ' + Test.age );
            //[ 7 ] export1 사용
            Export1.check();

            //[ 9 ] Model 정의 및 초기화
            var user = new User();
            console.log( '[ 10 ] ' + user.get( 'name' ) + ' / ' + user.get( 'age' ) );
            

            console.log( '[ 11 ] start ---------------------------' );
            user.set( 'name', '박영수' );
            console.log( user.get( 'name' ) );
            user.set( { name: '김을동', age: 60 } );
            console.log( user.get( 'name' ) );
            console.log( user.get( 'age' ) );
            console.log( user.get( 'job' ) );
            user.set( 'job', '컨설턴트' );
            console.log( user.get( 'job' ) );
            console.log( '[ 11 ] end   ---------------------------' );


            console.log( '[ 12 ] start ---------------------------' );
            user.on( 'change', function() {
                console.log( '무엇인가 변경됨' );
            } );
            user.set( 'name', '신기섭' );
            user.set( 'gender', true );
            user.off( 'change' );
            user.set( 'name', '안영미' );
            user.set( 'gender', false );
            user.on( 'change:name', function() {
                console.log( '이름이 변경됨' );
            } );
            user.set( 'name', '박윤화' );
            user.set( 'gender', true );
            user.off( 'change:name' );
            user.set( 'name', '홍미선' );
            user.set( 'gender', false );
            user.set( 'age', '25' );
            console.log( '[ 12 ] end   ---------------------------' );


            console.log( '[ 13 ] start ---------------------------' );
            console.log( 'user.cid : ' + user.cid + ', user.name : ' + user.get( 'name' ) );
            console.log( 'user.id : ' + user.id );

            if ( user.isNew() ) {
                console.log( '새로 만들어진 모델' );
            }
            console.log( '[ 13 ] end   ---------------------------' );

            console.log( '[ 14 ] start ---------------------------' );
            var Users = Backbone.Collection.extend( {
                model: User,
                url: '/users'
            } );
            var users1 = new Users();
            var users2 = new Users( [ user ] );
            users2.url = '/users2'
            var users3 = new Users( [
                { name: '홍길동', age: 40 },
                { name: '김철수', age: 35 },
                { name: '이영수', age: 20 }
            ] );
            users3.url = '/users3'

            console.log( '[ 14 ] end   ---------------------------' );


            console.log( '[ 15 ] start ---------------------------' );
            users1.add( [
                { name: '박철수', age: 25, id: 35 },
                { name: '최영희', age: 30, id: 36 }
            ] );
            console.log( '[ 15 ] end   ---------------------------' );

            
            console.log( '[ 16 ] start ---------------------------' );
            var user1 = users1.get( 35 );
            console.log( user1.get( 'name') );

            var user2 = users2.getByCid( 'c0' );
            console.log( user2.get( 'name' ) );
            //[ 26 ] 확인을 위해 id값 설정
            user2.set( 'id', 999 );
            
            var user3 = users1.at( 1 );
            console.log( user3.get( 'name' ) );

            var users4 = users1.where( { age: 25 } );
            console.log( users1.at( 0 ).get( 'name' ) );
            console.log( '[ 16 ] end   ---------------------------' );


            console.log( '[ 17 ] start ---------------------------' );
            var UserView = Backbone.View.extend( {
                tagName: 'ul',
                className: 'user',
                render: function() {
                    // View를 그리는 코드를 작성
                }
            } );
            var userView = new UserView( { model: user } );
            console.log( userView.el );

            var UserView = Backbone.View.extend( {
                el: 'section#list-section',
                render: function() {
                    // View를 그리는 코드를 작성
                }
            } );
            var userView = new UserView( { model: user } );

            console.log( userView.el );
            console.log( userView.$el );
            console.log( 'gender: ' + user.get( 'gender' ) );
            var UserView = Backbone.View.extend( {
                tagName: 'ul',
                className: 'user',
                render: function() {
                    //[ 17 ]
                    //this.$el.html( '<span>' + this.model.get( 'name' ) + '</span>' );
                    //[ 21 ]
                    this.$el.html( userTemplate( { user: this.model.toJSON() } ) );
                    return this;
                }
            } );

            console.log( user.get( 'age' ) );
            var userView = new UserView( { model: user } );

            // View 객체를 그린 후 DOM element를 페이지에 삽입
            $( '#list-section' ).append( userView.render().el );
            console.log( '[ 17 ] end   ---------------------------' );


            console.log( '[ 18 ] start ---------------------------' );
            var UserView = Backbone.View.extend( {
                el: 'section#list-section',
                events: {
                    'dblclick': 'open',
                    'click': 'select',
                    'mouseover': 'showTooltip'
                },
                open: function() {
                    console.log( 'dbclick event.' );
                },
                select: function() {
                    console.log( 'click event' );
                },
                showTooltip: function() {
                    console.log( 'mouseover event' );
                }
            } );
            var userView = new UserView( { model: user } );
            console.log( '[ 18 ] end   ---------------------------' );


            console.log( '[ 19 ] start ---------------------------' );
            var TouchView = Backbone.View.extend( {
                el: 'section#touch-section',
                events: {
                    'touchstart': 'start',
                    'touchmove': 'move',
                    'touchend': 'end',
                    'touchcancel': 'cancel'
                },
                start: function( event ) {
                    $( '#cons' ).html( '[ 19 ] touch start' );
                },
                move: function( event ) {
                   $( '#cons' ).html( '[ 19 ] touch move' );
                },
                end: function( event ) {
                    $( '#cons' ).html( '[ 19 ] touch end' );
                },
                cancel: function ( event ) {
                    alert( '[ 19 ] touch cancel' );
                }
            } );
            var touchView = new TouchView( { model: user } );
            console.log( '[ 19 ] end   ---------------------------' );

            
            console.log( '[ 20 ] start ---------------------------' );
            var TempGestureView = GestureView.extend( {
                el: 'section#gesture-section',
                events: {
                    'tap': 'select',
                    'doubletap': 'open',
                    'hold': 'menu',
                    'dragstart': 'dstart',
                    'drag': 'dmove',
                    'dragend': 'dend',
                    'swipe': 'sw',
                    'transformstart': 'trstart',
                    'transform': 'trmove',
                    'transformend': 'trend'
                    //'release': 'rel'
                },
                select: function( event ) {
                     $( '#cons1_tab' ).html( '[ 20 ] tap.' );
                },
                open: function( event ) {
                    $( '#cons1_tab' ).html( '[ 20 ] doubletap.' );
                },
                menu: function( event ) {
                    $( '#cons1_drag' ).html( '[ 20 ] hold.' );
                },
                dstart: function ( event ) {
                    $( '#cons1_drag' ).html( '[ 20 ] dragstart.' );
                },
                dmove: function ( event ) {
                    $( '#cons1_drag' ).html( '[ 20 ] drag.' );
                },
                dend: function ( event ) {
                    $( '#cons1_drag' ).html( '[ 20 ] dragend.' );
                },
                sw: function ( event ) {
                    $( '#cons1_tab' ).html( '[ 20 ] swipe.' );
                }, 
                trstart: function ( event ) {
                    $( '#cons1_trans' ).html( '[ 20 ] transformstart.' );
                },
                trmove: function ( event ) {
                    $( '#cons1_trans' ).html( '[ 20 ] transform.' );
                },
                trend: function ( event ) {
                    $( '#cons1_trans' ).html( '[ 20 ] transformend.' );
                }
                /*
                ,
                rel: function ( event ) {
                    $( '#cons1_drag' ).html( '[ 20 ] release.' );
                }
                */

            } );
            var gestureView = new TempGestureView( { model: user } );
            console.log( '[ 20 ] end   ---------------------------' );
            

            user.on( 'error', function( model, error ) {
                alert( '[ 24 ] ' + error.attribute + ' 속성: ' + error.message );
            } );
            user.set( 'name', '' );


            var formView = new FormView( { el: '#add-form', model: user } );

            $( '#add-form' ).submit( function () {
                var temp = formView.toModel();
                alert( '[ 23 ] 이름 : ' + temp.get( 'name' ) + ', 나이 : ' + temp.get( 'age' ) + ', 성별 : ' + temp.get( 'gender') );
                return false;
            } );

            var validationView = new FormView( { el: '#add-form1', model: user, validationViewClass: ValidationView } );       

            $( '#add-form1' ).submit( function () {
                var temp = validationView.toModel();
                return false;
            } );     

            console.log( '[ 26 ] ' + users1.at(0).url() );
            users2.each( function ( item ) {
                console.log( '[ 26 ] ' + item.url() );
            } );

            console.log( '[ 27 ] ' + users3.at(0).url() );

            // Model 클래스를 정의하면서 지정하는 방법
            var TestModel1 = Backbone.Model.extend( {
                urlRoot: '/testModel',
                id: 'test'
            } );
            var testModel1 = new TestModel1();
            console.log( '[ 26 - Model 클래스를 정의하면서 지정(urlRoot) ]' + testModel1.urlRoot );
            console.log( '[ 26 - Model 클래스를 정의하면서 지정했을때 url() ]' + testModel1.url() );

            // Model 객체를 생성하면서 지정하는 방법
            var user4 = new User( { id: 4 } );
            user4.urlRoot = '/users';
            console.log( '[ 26 - Model 객체를 생성하면서 지정(urlRoot) ]' + user4.urlRoot );
            console.log( '[ 26 - Model 객체를 생성하면서 지정했을때 url() ]' + user4.url() );

            /* [ 28 ]
            Backbone.sync = Sync.createSync( {
                readAll: function( collection, options ) {
                    console.log( 'Collection.fetch가 실행' );
                    options.success( collection );
                    options.error( '데이터 조회 실패' );
                },
                read: function( model, options ) {
                    console.log( 'Model.fetch가 실행' );
                    options.success( model );
                    options.error( '데이터 조회 실패' );
                },
                create: function( model, options ) {
                    console.log( 'Model.save가 실행되었을 때 (새로 생성된 Model인 경우)' );
                    options.success( model );
                    options.error( '데이터 조회 실패' );
                },
                update: function( model, options ) {
                    console.log( 'Model.save가 실행되었을 때 (이미 존재하는 Model인 경우)' );
                    options.success( model );
                    options.error( '데이터 조회 실패' );
                },
                delete: function( model, options ) {
                    console.log( 'Model.destroy가 실행' );
                    options.success( model );
                    options.error( '데이터 조회 실패' );
                }
            } );
            */

            $( '.sync button' ).on( 'click', function () {
                var elName = $( this ).attr( 'name' );
                if ( elName === 'col.fetch' ){
                    console.log( '[ 27 ] GET 요청 확인 : collection 객체 ]' );
                    users1.fetch();
                } 

                if ( elName === 'mod.fetch' ){
                    console.log( '[ 27 ] GET 요청 확인 : model 객체 ]' );
                    user1.fetch();
                }

                if ( elName === 'mod.save' ){
                    // id가 없을 경우 user1.save() 확인을 위해
                    console.log( '[ 27 ] POST 요청 확인 : model 객체에 id가 없을 경우 ]' );
                    user2.set( 'id', undefined );
                    user2.save();
                }

                if ( elName === 'mod.save.id' ){
                    console.log( '[ 27 ] PUT 요청 확인 : model 객체에 id가 있을 경우 ]' );
                    user1.save();

                }

                if ( elName === 'mod.destroy' ){
                    console.log( '[ 27 ] DELETE 요청 확인 : model 객체 ]' );
                    user1.destroy();
                }
            } );

            $( '.router button' ).on( 'click', function () {
                var elName = $( this ).attr( 'name' );

                if ( elName === 'list' ){
                    console.log( '[ 30 ] #list 실행 요청' );
                    location.href = '#list';
                } 

                if ( elName === 'add' ){
                    console.log( '[ 30 ] #add 실행 요청' );
                    location.href = '#add';
                } 

                if ( elName === 'detail' ){
                    console.log( '[ 30 ] #detail 실행 요청' );
                    location.href = '#detail/10';
                } 
            } );
        }
    };
} );
