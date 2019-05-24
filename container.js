class Container {
    constructor(x) {
        this.$value = x;
    }

    static of(x) {
        return new Container(x);
    }
}

// (a -> b) -> Container a -> Container b
Container.prototype.map = function (f) {
    return Container.of(f(this.$value));
};


Container.of(2).map(two => two + 2);
// Container(4)

Container.of('flamethrowers').map(s => s.toUpperCase());
// Container('FLAMETHROWERS')

Container.of('bombs').map(append(' away')).map(prop('length'));
// Container(10)



class Maybe {
    static of(x) {
        return new Maybe(x);
    }

    get isNothing() {
        return this.$value === null || this.$value === undefined;
    }

    constructor(x) {
        this.$value = x;
    }

    map(fn) {
        return this.isNothing ? this : Maybe.of(fn(this.$value));
    }

    inspect() {
        return this.isNothing ? 'Nothing' : `Just(${inspect(this.$value)})`;
    }
}

// map :: Functor f => (a -> b) -> f a -> f b
const map = curry((f, anyFunctor) => anyFunctor.map(f));



// safeHead :: [a] -> Maybe(a)
const safeHead = xs => Maybe.of(xs[0]);

// streetName :: Object -> Maybe String
const streetName = compose(map(prop('street')), safeHead, prop('addresses'));

streetName({ addresses: [] });
// Nothing

streetName({ addresses: [{ street: 'Shady Ln.', number: 4201 }] });
// Just('Shady Ln.')



// withdraw :: Number -> Account -> Maybe(Account)
const withdraw = curry((amount, { balance }) =>
    Maybe.of(balance >= amount ? { balance: balance - amount } : null));

// This function is hypothetical, not implemented here... nor anywhere else.
// updateLedger :: Account -> Account 
const updateLedger = account => account;

// remainingBalance :: Account -> String
const remainingBalance = ({ balance }) => `Your balance is $${balance}`;

// finishTransaction :: Account -> String
const finishTransaction = compose(remainingBalance, updateLedger);


// getTwenty :: Account -> Maybe(String)
const getTwenty = compose(map(finishTransaction), withdraw(20));

getTwenty({ balance: 200.00 });
// Just('Your balance is $180')

getTwenty({ balance: 10.00 });
// Nothing






class Either {
    static of(x) {
        return new Right(x);
    }

    constructor(x) {
        this.$value = x;
    }
}

class Left extends Either {
    map(f) {
        return this;
    }

    inspect() {
        return `Left(${inspect(this.$value)})`;
    }
}

class Right extends Either {
    map(f) {
        return Either.of(f(this.$value));
    }

    inspect() {
        return `Right(${inspect(this.$value)})`;
    }
}

const left = x => new Left(x);




class IO {
    static of(x) {
        return new IO(() => x);
    }

    constructor(fn) {
        this.$value = fn;
    }

    map(fn) {
        return new IO(compose(fn, this.$value));
    }

    inspect() {
        return `IO(${inspect(this.$value)})`;
    }
}