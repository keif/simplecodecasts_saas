var $form;
var $formSubmitBtn;

var stripeResponseHandler = function ( status, response ) {
    var token = response.id;

    $form
        .append( '<input type="hidden" name="user[stripe_card_token]" value="' + token + '" />' )
        .trigger("submit");
}

var bindEvents = function () {
    $formSubmitBtn.on( "click", function ( event ) {
        var error = false;
        var ccNum = $( '#card_number' ).val();
        var cvcNum = $( '#card_code' ).val();
        var expMonth = $( '#card_month' ).val();
        var expYear = $( '#card_year' ).val();

        event.preventDefault();

        $formSubmitBtn.prop( 'disabled', true );

        if ( !error ) {
            Stripe.createToken( {
                number: ccNum,
                cvc: cvcNum,
                exp_month: expMonth,
                exp_year: expYear
            }, stripeResponseHandler );
        }

        return false;
    } );
};

var init = function () {
    Stripe.setPublishableKey( $( 'meta[name="stripe-key"]' ).attr( 'content' ) );

    $form = $( "#new_user" );
    $formSubmitBtn = $( "#form-submit-btn" );

    bindEvents();
};

$( document ).ready( function () {
    init();
} );