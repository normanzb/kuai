define(['./Registrable', 'ctor'], function (Registrable, ctor) {
    var Ctor = ctor(function(){
    }).inherit(Registrable);

    var p = Ctor.prototype;

    return Ctor;
});