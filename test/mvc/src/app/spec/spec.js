describe( 'MVC Test', function () {

    var expect;
    var local = window.localStorage;

    beforeEach( function () {
    } );

    afterEach( function () {
    } );

    it( 'Test 초기화 및 페이지를 다시 로드해도 로컬 스토리지 데이터가 초기화 되지 않았는지 확인', function ( done ){
        require( [ 'js/chai', 'logging' ], function ( chai, Logging ){
            expect = chai.expect;
            expect( local.getItem( 'records.c2' ) ).to.be.not.undefined;
            local.clear();
            done();
        } );
    } );

    it( 'define 함수로 모듈을 정의 ( 정적 Object ) 후 확인', function ( done ) {
        require( [ 'model/person' ], function ( Person ){
            expect( Person ).to.be.an( 'object' );
            expect( Person.name ).to.be.equal( '홍길동' );
            expect( Person.age ).to.be.equal( 40 );
            expect( Person.gender ).to.be.equal( '남' );
            done();
        });
    } );

    it( 'define 함수로 모듈을 정의 ( 동적 Function ) 후 확인', function ( done ) {
        require( [ 'dummy/calculator' ], function ( Calculator ){
            expect( Calculator ).to.be.an( 'object' );
            expect( Calculator.calculateAge ).to.be.a( 'function' );
            expect( Calculator.calculateAge() ).to.be.equal( 1000 );
            done();
        });
    } );

    it( '모듈 정의시 타 모듈과 의존성 정의를 하고 로드, 해당 모듈에서 타 모듈을 사용해 본다.', function ( done ) {
        require( [ 'dummy/load-test' ], function ( LoadTest ){
            expect( LoadTest ).to.be.an( 'object' );
            expect( LoadTest.age ).to.be.equal( 1000 );
            done();
        });
    } );
    
    it( 'paths에 "모듈명": "경로" 를 작성하고 shim 설정 시 해당이름을 사용해본다. 이후 shim 설정을 통해 A 모듈의 deps를 B,C 로 지정하고 재로드 해본다.', function ( done ) {
        expect( window.dependency1 ).to.be.undefined;
        expect( window.dependency2 ).to.be.undefined;

        requirejs.config( {
            paths: {
                'user': 'model/user',
                'dependency1' : 'dummy/dependency1',
                'dependency2' : 'dummy/dependency2',
                'export1' : 'dummy/export1'
            },
            shim: {
                'user': {
                    deps: [ 'dependency1', 'dependency2' ],
                    exports: function() {
                        return this;
                    }
                }
            }
        } );

        require( [ 'user' ], function ( User ){
            expect( User ).to.be.a( 'function' );
            expect( window.dependency1 ).to.be.an( 'object' );
            expect( window.dependency2 ).to.be.an( 'object' );
            done();
        });
    } );


    it( 'exports로 A 모듈 사용 시 전달될 파라미터 내용을 작성 후 해당 A모듈을 사용하는 B모듈작성 및 파라미터 전달확인', function ( done ) {
        require( [ 'export1' ], function ( Export1 ){
            expect( Export1 ).to.be.an( 'object' );
            expect( Export1.check() ).to.be.equal( '홍길동' );
            done();
        });
    } );

    var UserModel, user1;
    var user1ChangeFlag = false;
    var Users, users1, users2, users3;

    it( 'User 모듈을 로드 후 user객체를 생성 및 초기화 함수 실행 확인', function ( done ) {
        require( [ 'user' ], function ( User ){
            UserModel = User;
            user1 = new User();
            expect( user1 ).to.be.an.instanceof( Backbone.Model );
            expect( user1.get( 'init' ) ).to.be.true;

            done();
        });
    } );

    it( '생성된 user 객체에 get 함수를 이용 속성을 출력해본다.', function () {
        expect( user1.get( 'name' ) ).to.be.equal( '홍길동' );
        expect( user1.get( 'age' ) ).to.be.equal( 40 );
        expect( user1.get( 'gender' ) ).to.be.equal( 'male' );
    } );

    it( 'user 객체에 set 함수를 이용 속성을 수정 후 출력해본다. ( "key", "value" )', function () {
        user1.set( 'name', 'david' );
        expect( user1.get( 'name' ) ).to.be.equal( 'david' );
    } );

    it( 'user 객체에 set 함수를 이용 속성을 수정 후 출력해본다. { Object }', function () {
        user1.set( { 'job': '컨설턴트' } );
        expect( user1.get( 'job' ) ).to.be.equal( '컨설턴트' );
    } );

    it( 'user 객체에 change 이벤트 발생 시 실행될 함수를 정의하고 실행되는지 확인한다.', function ( done ) {
        user1.on( 'change', function ( e ) {
            expect( e ).to.be.an( 'object' );
            user1ChangeFlag = !user1ChangeFlag;
            done();
        } );
        user1.set( 'job', '개발자' );
    } );

    it( 'user 객체에 change 이벤트 해제 하고 이벤트 발생 시 함수가 실행되지 않는지 확인한다.', function () {
        expect( user1ChangeFlag ).to.be.true;
        user1.off( 'change' );
        user1.set( 'job', '기확자' );
        expect( user1ChangeFlag ).to.be.true;
    } );

    it( '특정 속성값 변화 이벤트 발생 시 실행될 함수를 정의하고 실행되는지 확인한다.', function ( done ) {
        user1.on( 'change:name', function ( e ) {
            expect( e ).to.be.an( 'object' );
            expect( e.changed[ 'name' ] ).to.be.not.undefined;
            user1ChangeFlag = !user1ChangeFlag;
            done();
        } );
        user1.set( 'gender', 'female' );
        user1.set( 'name', '박윤화' );
    } );

    it( 'user 객체에 change:name 이벤트 해제 하고 이벤트 발생 시 함수가 실행되지 않는지 확인한다.', function () {
        expect( user1ChangeFlag ).to.be.false;
        user1.off( 'change:name' );
        user1.set( 'name', '홍미선' );
        expect( user1ChangeFlag ).to.be.false;
    } );

    it( 'user 객체에 모델의 고유식별자 인 cid 존재하는지 확인한다.', function () {
        expect( user1.cid ).to.be.not.undefined;
        expect( user1.cid ).to.be.a( 'string' );
    } );

    it( 'user 객체에 새로 만들어진(서버와 동기화 되지않은) 모델인지 판별한다. 새로만들어진 모델로 판별되어야 한다.', function () {
        expect( user1.isNew() ).to.be.true;
        expect( user1.id ).to.be.undefined;
    } );

    it( 'Backbone.Collection의 extend를 사용하여 Users 클래스를 정의 및 확인한다.', function () {
        Users = Backbone.Collection.extend( {
            model: UserModel,
            url: '/users'
        } );
        users1 = new Users();
        expect( Users ).to.be.an( 'function' );
        expect( users1.length ).to.be.equal( 0 );
        expect( users1 ).to.be.an.instanceof( Backbone.Collection );
        
    } );

    it( '콜랙션 생성 시 파라미터로 객체 array 전달로 생성되는지 확인한다.', function () {
        users2 = new Users( [ user1 ] );
        expect( users2.length ).to.be.equal( 1 );
        expect( users2 ).to.be.an.instanceof( Backbone.Collection );
    } );

    it( '파라미터로 객체를 생성하면서 array 전달로 생성되는지 확인한다.', function () {
        users3 = new Users( [ 
            { name: '홍길동', age: 40 },
            { name: '김철수', age: 35 },
            { name: '이영수', age: 20 } 
        ] );
        expect( users3.length ).to.be.equal( 3 );
        expect( users3 ).to.be.an.instanceof( Backbone.Collection );
    } );

    it( '생성된 Collection 객체에 Model을 추가되는지 확인한다.', function () {
        users1.add( [
            { name: '박철수', age: 25, gender: 'male' },
            { name: '최영희', age: 30, gender: 'female' }
        ] );
        expect( users1.length ).to.be.equal( 2 );
    } );

    it( 'id로 Model을 찾는다.', function () {
        var tempUser = new UserModel( { name: 'test name', age: 60 } );
        tempUser.id = 999;
        users1.add( tempUser );
        var tempUser2 = users1.get( 999 );
        expect( tempUser2.get( 'name' ) ).to.be.equal( 'test name' );
    } );

    it( 'at함수를 사용 index로 Model을 구한다.', function () {
        var tempUser = users1.at( 1 );
        expect( tempUser ).to.be.an.instanceof( Backbone.Model );
        expect( tempUser.get( 'name' ) ).to.be.equal( '최영희' );
        expect( tempUser.get( 'age' ) ).to.be.equal( 30 );
        expect( tempUser.get( 'gender' ) ).to.be.equal( 'female' );
    } );

    it( 'cid로 Model을 찾는다.', function () {
        var  tempUser = users1.get( 'c6' );
        expect( tempUser ).to.be.an.instanceof( Backbone.Model );
        expect( tempUser.get( 'name' ) ).to.be.equal( '박철수' );
        expect( tempUser.get( 'age' ) ).to.be.equal( 25 );
        expect( tempUser.get( 'gender' ) ).to.be.equal( 'male' );
    } );

    it( 'where함수를 사용 Model들을 찾는다. (Model의 배열을 리턴)', function () {
        var searchResult = users1.where( { age: 25 } );
        expect( searchResult ).to.be.an( 'array' );
        expect( searchResult.length ).to.be.equal( 1 );
        expect( searchResult[ 0 ].get( 'name' ) ).to.be.equal( '박철수' );
        expect( searchResult[ 0 ].get( 'age' ) ).to.be.equal( 25 );
        expect( searchResult[ 0 ].get( 'gender' ) ).to.be.equal( 'male' );
    } );

    var UserView1, UserView2, userView1, userView2, PageView, pageView;
    
    it( 'User model과 상호작용할 UserView 클래스가 생성되는지 확인한다.', function () {
        UserView1 = Backbone.View.extend( {
            tagName: 'ul',
            className: 'user',
            render: function() {
                // View를 그리는 코드를 작성
            }
        } );
        userView1 = new UserView1( { model: new UserModel() } );
        expect( userView1 ).to.be.an.instanceof( Backbone.View );
        expect( userView1.model ).to.be.an.instanceof( Backbone.Model );
        expect( userView1.model.get( 'name' ) ).to.be.equal( '홍길동' );
    } );

    it( 'UserView 생성 시 el을 지정하여 생성되는지 확인한다.', function () {
        PageView = Backbone.View.extend( {
            el: 'section#page1',
            render: function() {
                // View를 그리는 코드를 작성
            }
        } );
        pageView = new PageView( { model: new UserModel() } );
        expect( pageView ).to.be.an.instanceof( Backbone.View );
        expect( pageView.model ).to.be.an.instanceof( Backbone.Model );
        expect( pageView.model.get( 'name' ) ).to.be.equal( '홍길동' );
        expect( pageView ).to.be.not.an.instanceof( UserView1 );
        expect( pageView.el ).to.be.not.undefined;
        expect( pageView.$el ).to.be.an( 'object' );
    } );

    var userView2OldAge = 0;
    it( 'userView를 다음과 같이 정의 render 함수를 정의 및 렌더링 실행 후 화면에 보이는 지 확인.', function ( done ) {
        UserView2 = Backbone.View.extend( {
            tagName: 'li',
            className: 'user',
            events: {
                'click': 'increaseAge'
            },
            render: function () {
                this.$el.html( '<span class="name">' + this.model.get( 'name' ) + '</span>' + ' / <span class="age">' + this.model.get( 'age' ) + '</span>' );
                return this;
            },
            increaseAge: function () {
                userView2OldAge = parseInt( this.model.get( 'age' ) );
                this.model.set( 'age', parseInt( this.model.get( 'age' ) ) + 1 );
                this.render();
            }
        } );
        user1.set( 'male', false );
        userView2 = new UserView2( { model: user1 } );
        pageView.$el.find( 'ul.users' ).append( userView2.render().el );

        expect( userView2 ).to.be.an.instanceof( Backbone.View );
        expect( userView2.model ).to.be.an.instanceof( Backbone.Model );
        var cnt = pageView.$el.find( 'li' ).length;
        pageView.$el.find( 'li' ).each( function ( idx ) {
            expect( $( this ).hasClass( 'user' ) ).to.be.true;
            if( idx + 1 === cnt ) done();
        } );
    } );

    it( 'view에 이벤트 바인딩 및 동작 확인', function ( done ) {
        userView2.$el.click( function () {
            setTimeout( function () {
                expect( parseInt( userView2.model.get( 'age' ) ) ).to.be.equal( userView2OldAge + 1 );
                done();    
            }, 10 );
        } );
        userView2.$el.click();
    } );

    it( 'userTemplate.template 파일을 작성 및 render 확인, 동적 CSS 로드 확인', function ( done ) {
        require( [ 'template!../app/template/user', 'jquery', 'style!../app/css/user' ], function ( userTemplate, $ ){
            var userView3 = new UserView2( { model: new UserModel( { name: '김철수', age: 20, male: true } ), events: null } );
            userView3.render = function () {
                this.$el.html( userTemplate( { user: this.model.toJSON() } ) );
                expect( this.el ).to.be.not.undefined;
                done();
                return this;
            };
            pageView.$el.find( 'ul.template_users' ).append( userView3.render().el );
        } );
    } );

    it( 'require.js에 style을 template과 의존성 설정 후 자동 로드 되는지 확인', function ( done ) {
        requirejs.config( {
            paths: {
                'userTemplate1': '../app/template/user1'
            },
            shim: {
                'template!userTemplate1': ['style!../app/css/user1']
            }
        } );
        require( [ 'template!userTemplate1', 'jquery' ], function ( userTemplate1, $ ){
            var userView4 = new UserView2( { model: new UserModel( { name: '최은수', age: 27, male: false } ), events: null } );
            userView4.render = function () {
                this.$el.html( userTemplate1( { user: this.model.toJSON() } ) );
                var self = this;
                expect( this.el ).to.be.not.undefined;
                setTimeout( function () {
                    expect( self.$el.closest('li').css( 'color' ) ).to.be.equal( 'rgb(0, 128, 0)' );
                    done();
                }, 200 );
                return this;
            };
            pageView.$el.find( 'ol.template_users1' ).append( userView4.render().el );
        } );
    } );
    
    var formView, formView1, formView2;
    var validateUser, validateUser1, validateUser2;
    it( 'form view를 이용하여 model값이 표현되고 model의 값과 표시된 값이 동일한지 확인', function ( done ) {
        require( [ 'template!../app/template/userForm', 'form-view' ], function ( formTamplate, FormView ){
            validateUser = new UserModel( { name: '트래버', age: 35, job: '노동자' } );
            pageView.$el.find( '.btn-group' ).next().append( formTamplate() ).find( 'form' ).attr( 'id', 'add-form' );
            formView = new FormView( { el: '#add-form', model: validateUser } );
            expect( formView ).to.be.an.instanceof( Backbone.View );
            expect( formView.model.get( 'name' ) ).to.be.equal( formView.$el.find( 'input[name="name"]' ).val() );
            expect( formView.model.get( 'age' ) ).to.be.equal( parseInt( formView.$el.find( 'input[name="age"]' ).val() ) );
            expect( formView.model.get( 'job' ) ).to.be.equal( formView.$el.find( 'input[name="job"]' ).val() );
            done();
        } );
    } );

    it( 'form의 내용이 model 객체에 반영되는지 확인', function ( done ) {
        formView.$el.find( 'input[name="name"]' ).val( '마이클' );
        formView.$el.find( 'input[name="age"]' ).val( '39' );
        formView.$el.find( 'input[name="job"]' ).val( '스파이' );

        formView.$el.find( '.js-submit' ).on( 'click', function () {
            var formUser = formView.toModel();
            expect( validateUser.get( 'name' ) ).to.be.equal( '마이클' );
            expect( parseInt( validateUser.get( 'age' ) ) ).to.be.equal( 39 );
            expect( validateUser.get( 'job' ) ).to.be.equal( '스파이' );
            $( this ).off( 'click' );
            done();
        } );
         formView.$el.find( '.js-submit' ).trigger( 'click' );
    } );

    it( 'validation view를 로드 후 formView에 생성옵션으로 지정되는 지 확인', function ( ) {
        require( [ 'validation-view', 'template!../app/template/userForm', 'form-view' ], function ( ValidationView, formTamplate, FormView ){
            validateUser1 = new UserModel( { name: '프랭클린', age: 25, job: '배송업', validate: true } );
            pageView.$el.find( '#add-form' ).parent().append( formTamplate() ).find( 'form:last-child' ).attr( 'id', 'modify-form' );
            formView1 = new FormView( { el: '#modify-form', model: validateUser1, validationViewClass: ValidationView } );
            expect( formView1 ).to.be.an.instanceof( Backbone.View );
        } );
    } );

    it( 'custom validation view를 사용해 본다.', function ( done ) {
        require( [ 'view/validationView', 'template!../app/template/userForm', 'form-view' ], function ( CustomValidationView, formTamplate, FormView ){
            validateUser2 = new UserModel( { name: '데빈', age: 40, job: '공무원', validate: true } );
            pageView.$el.find( '#add-form' ).parent().append( formTamplate() ).find( 'form:last-child' ).attr( 'id', 'valid-form' );
            formView2 = new FormView( { el: '#valid-form', model: validateUser2, validationViewClass: CustomValidationView } );
            pageView.$el.find( '#valid-form input[name="name"]' ).val( '' );
            formView2.$el.find( '.js-submit' ).on( 'click', function () {
                formView2.toModel();
                done();
            } );
            formView2.$el.find( '.js-submit' ).click();
            
        } );
    } );

    var userCollection;
    it( 'Collection에 속한 Model이 url을 이어받는지 확인', function () {
        userCollection = new Users();
        var usr1 = new UserModel( { id: 1 } ), usr2 = new UserModel( { id: 2 } );
        userCollection.add( [ usr1, usr2 ] );
        expect( usr1.url() ).to.be.equal( '/users/1' );
        expect( usr2.url() ).to.be.equal( '/users/2' );
    } );

    it( 'Model 클래스를 정의하면서 root url 지정이 되는지 확인', function () {
        var RootTestUser = Backbone.Model.extend( {
            urlRoot: '/users'
        } );

        var tempUser = new RootTestUser( { id: 3 } );
        expect( tempUser.url() ).to.be.equal( '/users/3' )
    } );
    
    
    it( 'Model 객체를 생성하면서 root url 지정이 되는지 확인', function () {
        var RootTestUser1 = Backbone.Model.extend();
        var tempUser = new RootTestUser1( { id: 100 } );
        tempUser.urlRoot = 'users/';
        expect( tempUser.url() ).to.be.equal( 'users/100' );
    } );

    var sync; 
    it( 'collection.fetch() 실행 시 재정의된 readAll 함수가 호출되어야 한다.', function ( done ) {
        require( [ 'sync' ], function( Sync ) {
            sync = Sync;
            Backbone.sync = sync.createSync( {
                readAll: function( collection, options ) {
                    expect( collection ).to.be.an.instanceof( Backbone.Collection );
                    expect( collection.url ).to.be.equal( '/users' );
                    done();
                }
            } );
            userCollection.fetch();    
        } );
    } );

    it( 'model.fetch() 실행 시 재정의된 read 함수가 호출되어야 한다.', function ( done ) {
        Backbone.sync = sync.createSync( {
            read: function( model, options ) {
                expect( model ).to.be.an.instanceof( Backbone.Model );
                expect( model.url() ).to.be.equal( '/users' );
                done();
            }
        } );
        user1.fetch();
    } );

    it( 'model.save() 실행 시 재정의된 create 함수가 호출되어야 한다.( model에 id값이 없을 때 )', function ( done ) {
        Backbone.sync = sync.createSync( {
            create: function( model, options ) {
                expect( model ).to.be.an.instanceof( Backbone.Model );
                done();
            }
        } );
        var testUser = new UserModel();
        testUser.save();
    } );

    it( 'model.save() 실행 시 재정의된 update 함수가 호출되어야 한다.( model에 id값이 있을 때 )', function ( done ) {
        Backbone.sync = sync.createSync( {
            update: function( model, options ) {
                expect( model ).to.be.an.instanceof( Backbone.Model );
                expect( model.id ).to.be.equal( 200 );
                done();
            }
        } );
        var testUser = new UserModel();
        testUser.id = 200;
        testUser.save();
    } );

    it( 'model.destroy() 실행 시 재정의된 delete 함수가 호출되어야 한다.', function ( done ) {
        Backbone.sync = sync.createSync( {
            delete: function( model, options ) {
                expect( model ).to.be.an.instanceof( Backbone.Model );
                expect( model.id ).to.be.equal( 300 );
                done();
            }
        } );
        var testUser = new UserModel();
        testUser.id = 300;
        testUser.destroy();
    } );

    it( '동기화 방법이 변경되는지 확인( framework내의 sync로 사용변경 )', function ( done ) {
        require( [ 'sync' ], function ( Sync ){
            expect( Sync ).to.be.not.undefined;
            Backbone.sync = Sync.local;
            done();
        });
    } );

    it( '모델이 로컬 스토리지와 동기화되는 지 확인( model.save - 새로 생성된 모델[save] )', function () {
        user1.save();
        var $syncUser = $.parseJSON( local.getItem( 'records.' + user1.cid ) );
        expect( $syncUser ).to.be.not.undefined;
        expect( $syncUser.model.name ).to.be.equal( user1.get( 'name' ) );
        expect( $syncUser.model.age ).to.be.equal( user1.get( 'age' ) );
    } );

    it( '모델이 로컬 스토리지와 동기화되는 지 확인( model.save - 이미 존재하는 모델[update] )', function () {
        user1.set( 'name', '이종석' );
        user1.set( 'age', '20' );
        user1.save();
        var $syncUser = $.parseJSON( local.getItem( 'records.' + user1.cid ) );
        expect( $syncUser ).to.be.not.undefined;
        expect( $syncUser.model.name ).to.be.equal( user1.get( 'name' ) );
        expect( $syncUser.model.age ).to.be.equal( user1.get( 'age' ) );
    } );

    // it( '컬랙션이 로컬 스토리지와 동기화되는지 확인( collection.fetch )', function () {
    //     users1.fetch();
    //     console.log( temp );
    // } );

    // it( '컬랙션이 로컬 스토리지와 동기화되는지 확인( model.fetch )', function () {
    //     var temp = users1.fetch();
    //     console.log( temp );
    // } );

    // it( '모델이 로컬 스토리지와 동기화되는지 확인( model.destroy )', function () {
    //     var $syncUser = $.parseJSON( local.getItem( 'records.' + user1.cid ) );
    //     user1.destroy();
    //     console.log($syncUser, user1);
    //     expect( $syncUser ).to.be.undefined;
    // } );

    it( 'hash fragment를 이용하여 서버요청 없이 분기가 가능한지 확인 (page1 -> page2)', function ( done ) {
        this.timeout( 3000 );
        $( '#page1 button.btn.next' ).click( 
            function () {
                setTimeout( function () {
                expect( $( '#page1' ).css( 'display' ) ).to.be.equal( 'none' );
                expect( $( '#page2' ).css( 'display' ) ).to.be.equal( 'block' );
                done();
            }, 2000 );
        } ).trigger( 'click' );
    } );


    it( 'hash fragment를 이용하여 서버요청 없이 분기가 가능한지 확인 (page2 -> page1)', function ( done ) {
        this.timeout( 3000 );
        $( '#page2 button.btn.prev' ).click( 
            function () {
                setTimeout( function () {
                expect( $( '#page2' ).css( 'display' ) ).to.be.equal( 'none' );
                expect( $( '#page1' ).css( 'display' ) ).to.be.equal( 'block' );
                done();
            }, 2000 );
        } ).trigger( 'click' );
    } );

    it( '#매칭이 실패했을 때 동작하는 default route 확인', function ( done ) {
        this.timeout( 3000 );
        window.location.href = '#asdfasdfaf';
        setTimeout( function () {
            expect( $( '#page2' ).css( 'display' ) ).to.be.equal( 'none' );
            expect( $( '#page1' ).css( 'display' ) ).to.be.equal( 'block' );
            done();
        }, 2000 );
    } );

    it( 'URL 패턴에서 :로 시작되는 부분이 파라미터로 분리되어 전달되는 지 확인 및 active 함수가 정상 동작하는지 확인', function ( done ) {
        this.timeout( 3000 );
        window.location.href = '#page3/1';
        setTimeout( function () {
            expect( parseInt( $( '#page3 p.js-active' ).text() ) ).to.be.equal( 1 );
            window.location.href = '#page1';
            done();
        }, 2000 );
    } );

    it( 'input에 data-placement 를 다르게 지정했을 때 툴팁위치가 수정되서 출력되어야 한다.', function ( done ) {
        formView.$el.find( 'input[name="name"]' ).val( '브라보' );
        formView.$el.find( 'input[name="age"]' ).val( '' );
        formView.$el.find( '.js-submit' ).on( 'click', function () {
            formView.toModel();
            $( this ).off( 'click' );
            setTimeout(function() {
                var $tooltip = $( '.tooltip' );
                expect( $tooltip ).to.be.not.undefined;
                expect( $tooltip.find( '.tooltip-inner' ).text() ).to.be.equal( '나이를 입력하세요.' );
                done();
            }, 1000);
        } );

        formView.$el.find( '.js-submit' ).click();
    } );

    it( 'Model 객체에 validate 함수를 구현하고 동작되는지 확인', function ( done ) {
        formView.$el.find( 'input[name="name"]' ).val( '' );
        formView.$el.find( 'input[name="age"]' ).val( 39 );
        formView.$el.find( '.js-submit' ).on( 'click', function () {
            formView.toModel();
            $( this ).off( 'click' );
            setTimeout(function() {
                var $tooltip = $( '.tooltip' );
                expect( $tooltip ).to.be.not.undefined;
                expect( $tooltip.find( '.tooltip-inner' ).text() ).to.be.equal( '이름을 입력하세요.' );
                done();
            }, 500);
        } );

        formView.$el.find( '.js-submit' ).click();
    } );

    it( 'Model에 invalid 이벤트를 연결하고 model값을 변경했을 때 감지 되는지 확인한다.', function ( done ) {
        validateUser.on( 'invalid', function ( model, error ) {
            expect( model ).to.be.an.instanceof( Backbone.Model );
            expect( error.attribute ).to.be.equal( 'name' );
            this.off( 'invalid' );
            done();
        } );

        formView.$el.find( '.js-submit' ).on( 'click', function () {
            formView.toModel();
        } ).trigger( 'click' );
    } );
} );
