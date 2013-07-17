
/**
 * Error
 */

// Validation 오류(express-form 사용)가 발생한 경우
function ValidationError( errors ) {
	this.type = 'ValidationError';
	this.message = 'ValidationError';

	// {field1: [msg1], field2: [msg2]} -> [{field: field1, message: msg1}, {field: field2, message: msg2}]
	var errorArray = [];
	for ( key in errors )
		errorArray.push( { field: key, message: errors[ key ][ 0 ] } );

	this.fieldErrors = errorArray;
	Error.call( this, this.message );
	Error.captureStackTrace( this, arguments.callee );
}

// 특정 필드의 값이 Valid하지 않은 경우
// index는 생략 가능
function FieldError( field, index, msg ) {

	// index를 생략한 경우
	if ( typeof index != 'number' ) {
		msg = arguments[ 1 ];
		index = null;
	}

	this.type = 'FieldError';
	this.field = field;
	this.index = index;
	this.message = msg;
	Error.call( this, this.message );
	Error.captureStackTrace( this, arguments.callee );
}

// 처리 도중 발생한 오류
function ProcessError( msg ) {
	this.type = 'ProcessError';
	this.message = msg;
	Error.call( this, this.message );
	Error.captureStackTrace( this, arguments.callee );
}

// 로그인이 필요한 페이지를 로그인 없이 접근하면 발생하는 오류
function LoginNeededError() {
	this.type = 'LoginNeededError';
	this.message = '로그인이 필요합니다.';
	Error.call( this, this.message );
	Error.captureStackTrace( this, arguments.callee );
}

// 권한이 없는 경우 발생하는 오류 (사용자로 로그인하고 관리자 페이지에 접근할 경우)
function PermissionDeniedError() {
	this.type = 'PermissionDeniedError';
	this.message = '권한이 없습니다.';
	Error.call( this, this.message );
	Error.captureStackTrace( this, arguments.callee );
}

ValidationError.prototype.__proto__ = Error.prototype;
FieldError.prototype.__proto__ = Error.prototype;
ProcessError.prototype.__proto__ = Error.prototype;
LoginNeededError.prototype.__proto__ = Error.prototype;
PermissionDeniedError.prototype.__proto__ = Error.prototype;

exports.ValidationError = ValidationError;
exports.FieldError = FieldError;
exports.ProcessError = ProcessError;
exports.LoginNeededError = LoginNeededError;
exports.PermissionDeniedError = PermissionDeniedError;
