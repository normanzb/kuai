/*
 *  @module Registrable
 *  Providing basic mechanism to register, unregister or retrieve the registered entity
 */
define(['rsvp', 'ctor', 'Emitter'], function (RSVP, ctor, Emitter) {

    function findById( id, found ){
        var me = this;
        for( var l = me.registration.length; l--; ) {
            if ( me.registration[l].id === id ) {
                if ( found(me.registration[l], l) === true ) {
                    return;
                }
            }
        }
    }

    var Ctor = ctor(function() {
        this._waiting = [];
        this.registration = [];
    }).inherit(Emitter);

    var p = Ctor.prototype;

    /*
     *  @method get 
     *  Retrieve the entity by id, if the id hasn't registered yet, it waits until it is registered
     *  @returns {Promise}
     */
    p.get = function ( id ) {
        var me = this;

        return new RSVP.Promise(function(resolve, reject){
            findById.call(me, id, function(entity, index){
                resolve(entity);
                return true;
            });

            if ( me._waiting[id] == null ) {
                me._waiting[id] = [];
            }

            me._waiting[id].push( {resolve: resolve, reject: reject} );

        });
    };

    /*
     *  @method has
     *  @returns {Promise} Resolve true to indicate the id is registered
     */
    p.has = function ( id ) {
        var me = this;
        return new RSVP.Promise(function(resolve, reject){
            findById.call( me, id, function( entity, index ){
                resolve( true );
                return true;
            } );
            resolve( false );
        });
    };

    /*
     *  @method register 
     *  To register the entity
     *  @param {Entity} Entity must has an unique id, if the id is already registered, 
     *      the previous entity will be replaced.
     */
    p.register = function( entity ) {
        var me = this;
        var overwrite = -1;

        if ( entity.id == null ) {
            throw new Error('Entity id is not provided');
        }

        findById.call(me, entity.id, function(entity, index){
            overwrite = index;
            return true;
        });

        if ( overwrite >= 0 ) {
            me.registration[overwrite] = entity;
            me._waiting[entity.id] = RSVP.resolve(entity);
        }
        else {
            me.registration.push( entity );

            if ( me._waiting[entity.id] ) {
                var waiting = me._waiting[entity.id];
                for(var i = 0 ; i < waiting.length; i++) {
                    waiting[i].resolve( entity );
                }
            }
        }

        me.emit('register', entity);

        return RSVP.resolve();
    };

    /*
     * @method unregister
     * To unregister the entity
     */
    p.unregister = function ( entity ) {
        var me = this;

        for(var l = me.registration.length; l--; ) {
            if ( me.registration[l] == entity ) {
                me.registration.splice(l, 1);
            }
        }

        me.emit('unregister', entity);
    };

    return Ctor;
});