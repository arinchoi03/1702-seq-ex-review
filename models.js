var Sequelize = require('sequelize');

var db = new Sequelize('postgres://localhost:5432/catstravaganza', {
    logging: false
});

var Cat = db.define('cats', {

    name: {
        type: Sequelize.STRING,
        allowNull: false
    },

    fluffiness: {
        type: Sequelize.ENUM('shorthaired', 'longhaired')
    },

    color: {
        type: Sequelize.STRING
    },

    wuv: {
        type: Sequelize.INTEGER,
        validate: {
            min: 0,
            max: 10
        }
    }

}, {

    getterMethods: {
        description: function() {
            return `${this.color} ${this.fluffiness}`;
        }
    },

    instanceMethods: {
        grooming: function() {
            this.update({
                fluffiness: 'shorthaired'
            })
            .catch();

        }
    },

    classMethods: {
        findFluffyOrangeCats: function() {
            return this.findAll({
                where: {
                    color: 'orange',
                    fluffiness: 'longhaired'
                }
            });
        },
        count: function() {
            return this.findAll()
                .then(function(cats) {
                    return cats.length
            });
        }
    },

    hooks: {
        beforeValidate: function(cat) {
            cat.wuv = 10;
        }

    }

});

var Owner = db.define('owners', {

    name: {
        type: Sequelize.STRING,
        allowNull: false
    },

    craziness: {
        type: Sequelize.INTEGER,
        validate: {
            min: 0,
            max: 10
        }
    }

}, {

    instanceMethods: {
        isCrazyCatPerson: function() {
            if (this.countCats() > 3 || this.craziness >= 5) {
                return `${this.name} is a crazy cat person!`;
            } else {
                return `${this.name} is just a regular cat person!`;
            }
        },
        adopt: function(catId) {
            if (catId) {
                this.addCat(catId) // this method can take the entire instance/catId
                // 'this' is the owner
                // this method allows catId to be attached to owner
            } else {
                //find the first cat in the db w/o ownerId
                Cat.findOne({
                    where: {
                        ownerId: null
                    }
                })
                .then(cat => this.addCat(cat)) // this necessary to bind addCat to this...or will not work!
                /* if function(cat) {this.addCat(cat)} would NOT work!!! */
                .catch();
            }
        }
    }
});

Owner.hasMany(Cat);

module.exports = {
    db: db,
    Cat: Cat,
    Owner: Owner
};
