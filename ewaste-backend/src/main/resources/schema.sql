create table t_user
(
    id                  bigint auto_increment comment 'ID'
        primary key,
    version             int          default 0                 null comment 'version',

    gender              int          default 0                 null comment 'gender',
    login_name          varchar(50)  default ''                null comment 'login_name',
    password            varchar(300) default '$2a$12$N9/TwUIFOUc5pa/Hoz4iOOGTG26tX1RUlBpPcF9CkTZDhRLw4mA8G'                null comment 'password',
    provider_id         varchar(300) default ''                null comment 'provider_id',
    provider            varchar(300) default ''                null comment 'provider',
    user_code           varchar(32)  default ''                null comment 'user_code',
    user_name           varchar(50)  default ''                null comment 'user_name',
    image_url           varchar(500)  default ''                null comment 'image_url',
    phone               varchar(15)  default ''                null comment 'phone',
    email               varchar(50)  default ''                null comment 'email',
    status              varchar(20)  default ''                null comment 'status',
    remark              varchar(300) default ''                null comment 'remark',

    creator             varchar(20)  default ''                null comment 'creator',
    creator_id          bigint                                 null comment 'creator_id',
    gmt_created         datetime     default CURRENT_TIMESTAMP null comment 'gmt_created',
    last_operator       varchar(20)  default ''                null comment 'last_operator',
    last_operator_id    bigint                                 null comment 'last_operator_id',
    gmt_modified        datetime     default CURRENT_TIMESTAMP null comment 'gmt_modified',
    is_deleted          int          default 0                 null comment 'is_deleted'
);


create table t_role
(
    id               bigint auto_increment comment 'ID'
        primary key,
    version          int          default 0                 null comment 'version',

    role_name        varchar(100) default ''                null comment 'role_name',
    role_code        varchar(100) default ''                null comment 'role_code',
    data_scope       varchar(100) default '1'               null comment 'data_scope',
    status           varchar(20)  default ''                null comment 'status',
    remark           varchar(300) default ''                null comment 'remark',

    creator             varchar(20)  default ''                null comment 'creator',
    creator_id          bigint                                 null comment 'creator_id',
    gmt_created         datetime     default CURRENT_TIMESTAMP null comment 'gmt_created',
    last_operator       varchar(20)  default ''                null comment 'last_operator',
    last_operator_id    bigint                                 null comment 'last_operator_id',
    gmt_modified        datetime     default CURRENT_TIMESTAMP null comment 'gmt_modified',
    is_deleted          int          default 0                 null comment 'is_deleted'
);

create table t_user_role
(
    id               bigint auto_increment comment 'ID'
        primary key,

    user_id          bigint      default 0                 null comment 'user id',
    role_id          bigint      default 0                 null comment 'role id',

    creator             varchar(20)  default ''                null comment 'creator',
    creator_id          bigint                                 null comment 'creator_id',
    gmt_created         datetime     default CURRENT_TIMESTAMP null comment 'gmt_created',
    last_operator       varchar(20)  default ''                null comment 'last_operator',
    last_operator_id    bigint                                 null comment 'last_operator_id',
    gmt_modified        datetime     default CURRENT_TIMESTAMP null comment 'gmt_modified',
    is_deleted          int          default 0                 null comment 'is_deleted'
);

create table t_order
(
    id                  bigint auto_increment comment 'ID'
        primary key,
    receiver_id         bigint                                 null comment 'receiver user_id',
    product_id          bigint                                 null comment 'product_id',

    status              int          default 0                 null comment 'status',
    receiver_phone      varchar(15)  default ''                null comment 'receiver_phone',
    receiver_address    varchar(150)  default ''               null comment 'receiver_address',
    total_amount        numeric(20,2)                          null comment 'total_amount',
    real_pay_amount     numeric(20,2)                          null comment 'real_pay_amount',
    postage_amount      numeric(20,2)                          null comment 'postage_amount',
    service_fee_amount  numeric(20,2)                          null comment 'service_fee_amount',

    third_party_id      bigint                                 null comment 'third_party_id',
    order_type          int          default 0                 null comment '1:recycle or 2:data retrieve',
    payment_type        int          default 0                 null comment 'paypal or strip',
    qrcode              int          default 0                 null comment '',
--     paymentid         varchar(300) default ''                null comment ' payment id from paypal or strip',
    data_url            varchar(500)  default ''               null comment 'image_url',

    remark              varchar(300) default ''                null comment 'remark',

    creator             varchar(20)  default ''                null comment 'creator',
    creator_id          bigint                                 null comment 'creator_id',
    gmt_created         datetime     default CURRENT_TIMESTAMP null comment 'gmt_created',
    last_operator       varchar(20)  default ''                null comment 'last_operator',
    last_operator_id    bigint                                 null comment 'last_operator_id',
    gmt_modified        datetime     default CURRENT_TIMESTAMP null comment 'gmt_modified',
    is_deleted          int          default 0                 null comment 'is_deleted'
);

create table t_brand
(
    id               bigint auto_increment comment 'ID'
        primary key,

    name                varchar(20)  default ''                null comment 'name',
    image_url           varchar(500) default ''                null comment 'image_url',
    brand_value               int          default 0                 null comment '0: high, 1: medium, 2: low',

    creator             varchar(20)  default ''                null comment 'creator',
    creator_id          bigint                                 null comment 'creator_id',
    gmt_created         datetime     default CURRENT_TIMESTAMP null comment 'gmt_created',
    last_operator       varchar(20)  default ''                null comment 'last_operator',
    last_operator_id    bigint                                 null comment 'last_operator_id',
    gmt_modified        datetime     default CURRENT_TIMESTAMP null comment 'gmt_modified',
    is_deleted          int          default 0                 null comment 'is_deleted'
);

create table t_series
(
    id               bigint auto_increment comment 'ID'
        primary key,

    brand_id            bigint                                 null comment 'brand_id',
    name                varchar(20)  default ''                null comment 'name',
    image_url           varchar(500) default ''                null comment 'image_url',
    series_value               int          default 0                 null comment '0: high, 1: medium, 2: low',
    expected_value      numeric(10,2)                          null comment 'products expected value',


    creator             varchar(20)  default ''                null comment 'creator',
    creator_id          bigint                                 null comment 'creator_id',
    gmt_created         datetime     default CURRENT_TIMESTAMP null comment 'gmt_created',
    last_operator       varchar(20)  default ''                null comment 'last_operator',
    last_operator_id    bigint                                 null comment 'last_operator_id',
    gmt_modified        datetime     default CURRENT_TIMESTAMP null comment 'gmt_modified',
    is_deleted          int          default 0                 null comment 'is_deleted'
);

create table t_store
(
    id               bigint auto_increment comment 'ID'
        primary key,

    name                varchar(20)  default ''                null comment 'name',
    image_url           varchar(500) default ''                null comment 'image_url',

    creator             varchar(20)  default ''                null comment 'creator',
    creator_id          bigint                                 null comment 'creator_id',
    gmt_created         datetime     default CURRENT_TIMESTAMP null comment 'gmt_created',
    last_operator       varchar(20)  default ''                null comment 'last_operator',
    last_operator_id    bigint                                 null comment 'last_operator_id',
    gmt_modified        datetime     default CURRENT_TIMESTAMP null comment 'gmt_modified',
    is_deleted          int          default 0                 null comment 'is_deleted'
);

create table t_store_productV2
(
    id               bigint auto_increment comment 'ID'
        primary key,

    store_id            bigint                                 null comment 'creator_id',
    brand_id            bigint                                 null comment 'brand_id',
    series_id           bigint                                 null comment 'series_id',
    expected_value      numeric(10,2)                          null comment 'products expected value',

    creator             varchar(20)  default ''                null comment 'creator',
    creator_id          bigint                                 null comment 'creator_id',
    gmt_created         datetime     default CURRENT_TIMESTAMP null comment 'gmt_created',
    last_operator       varchar(20)  default ''                null comment 'last_operator',
    last_operator_id    bigint                                 null comment 'last_operator_id',
    gmt_modified        datetime     default CURRENT_TIMESTAMP null comment 'gmt_modified',
    is_deleted          int          default 0                 null comment 'is_deleted'
);


create table t_productV2
(
    id               bigint auto_increment comment 'ID'
        primary key,

    receiver_id         bigint                                 null comment 'receiver user_id',
    description         varchar(2000)                            null comment 'description',
    brand_id            bigint                                 null comment 'brand_id',
    series_id           bigint                                 null comment 'series_id',
    year_of_release     int                                    null comment 'year of release',
    condition           int                                    null comment 'product condition',
    colour              int                                    null comment 'colour',
    capacity            varchar(15)                            null comment 'capacity',
    type                varchar(15)                            null comment 'type',
    classification      int                                    null comment 'classification',
    visibility          int                                    null comment 'visibility',
    expected_value      numeric(10,2)                          null comment 'products expected value',
    image_url           varchar(500)  default ''               null comment 'image_url',
    data_retrieve_url   varchar(500)  default ''               null comment 'data_store_url',

    creator             varchar(20)  default ''                null comment 'creator',
    creator_id          bigint                                 null comment 'creator_id',
    gmt_created         datetime     default CURRENT_TIMESTAMP null comment 'gmt_created',
    last_operator       varchar(20)  default ''                null comment 'last_operator',
    last_operator_id    bigint                                 null comment 'last_operator_id',
    gmt_modified        datetime     default CURRENT_TIMESTAMP null comment 'gmt_modified',
    is_deleted          int          default 0                 null comment 'is_deleted'
);



