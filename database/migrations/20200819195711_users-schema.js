
exports.up = function(knex) {
    return knex.schema
        .createTable('users', tbl => {
            tbl.increments('user_id').primary;
            tbl.string('name', 128);
            tbl.string('username', 128).unique().notNullable();
            tbl.string('password', 128).notNullable();
            tbl.string('email', 128).notNullable();
        })

        .createTable('business', tbl => {
            tbl.increments('id').primary;
            tbl.text('name', 128).notNullable();
            tbl.text('description', 128).notNullable();
            tbl.text('location', 128).notNullable();
            tbl.integer('user_id', 128)
                .references('user_id')
                .inTable('users')
                .notNullable()
                .onDelete('cascade');
        })

        .createTable('for-sale', tbl => {
            //
            tbl.increments('item_id').primary;
            tbl.text('item-name', 128).notNullable();
            tbl.text('category', 128).notNullable();
            tbl.text('price', 128).notNullable();
            tbl.text('location', 128).notNullable();
            tbl.text('description', 128).notNullable()
            tbl.integer('business_id', 128)
                .references('id')
                .inTable('business')
                .notNullable()
                .onDelete('cascade')
        })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('for-sale')
        .dropTableIfExists('business')
        .dropTableIfExists('users')
};
