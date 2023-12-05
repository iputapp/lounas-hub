-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "auth";

-- CreateTable
CREATE TABLE "public"."restaurants" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "website" TEXT,
    "address" TEXT,
    "longitude" DOUBLE PRECISION NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "travel_time" INTEGER NOT NULL,
    "travel_distance" INTEGER NOT NULL,

    CONSTRAINT "restaurants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."restaurant_tags" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "restaurant_tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."restaurant_opens" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "time_open" TIMETZ NOT NULL,
    "time_close" TIMETZ NOT NULL,
    "week_type_id" INTEGER NOT NULL,
    "restaurant_id" TEXT NOT NULL,

    CONSTRAINT "restaurant_opens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."week_types" (
    "id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,

    CONSTRAINT "week_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."routes" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT,
    "thumbnail_id" TEXT,
    "next_step_id" TEXT,
    "previous_step_id" TEXT,
    "route_type_id" UUID NOT NULL,
    "restaurant_id" TEXT NOT NULL,

    CONSTRAINT "routes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."route_types" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "route_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."payments" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "accepted" BOOLEAN NOT NULL,
    "details" TEXT,
    "payment_type_id" UUID NOT NULL,
    "restaurant_id" TEXT NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."payment_types" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,

    CONSTRAINT "payment_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."dishes" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" INTEGER NOT NULL,
    "eat_time" INTEGER NOT NULL,
    "restaurant_id" TEXT NOT NULL,

    CONSTRAINT "dishes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."dish_tags" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "dish_tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."dish_scores" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "score" INTEGER NOT NULL,
    "dish_id" TEXT NOT NULL,
    "trait_id" UUID NOT NULL,

    CONSTRAINT "dish_scores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."dish_traits" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "dish_traits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."visit_histories" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" UUID NOT NULL,
    "dish_id" TEXT NOT NULL,

    CONSTRAINT "visit_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."users" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "username" TEXT NOT NULL,
    "last_login" TIMESTAMPTZ,
    "data_usage_agreed" BOOLEAN NOT NULL,
    "organization_id" UUID,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."organizations" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "description" TEXT,
    "email_domain" TEXT,
    "is_student" BOOLEAN NOT NULL,
    "is_staff" BOOLEAN NOT NULL,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_restaurant_tagging" (
    "A" TEXT NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "public"."_dish_tagging" (
    "A" TEXT NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "restaurants_id_key" ON "public"."restaurants"("id");

-- CreateIndex
CREATE INDEX "restaurants_travel_time_idx" ON "public"."restaurants"("travel_time");

-- CreateIndex
CREATE UNIQUE INDEX "restaurant_opens_week_type_id_restaurant_id_key" ON "public"."restaurant_opens"("week_type_id", "restaurant_id");

-- CreateIndex
CREATE UNIQUE INDEX "routes_id_key" ON "public"."routes"("id");

-- CreateIndex
CREATE INDEX "routes_id_idx" ON "public"."routes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "payments_payment_type_id_restaurant_id_key" ON "public"."payments"("payment_type_id", "restaurant_id");

-- CreateIndex
CREATE UNIQUE INDEX "dishes_id_key" ON "public"."dishes"("id");

-- CreateIndex
CREATE INDEX "dishes_price_idx" ON "public"."dishes"("price");

-- CreateIndex
CREATE UNIQUE INDEX "dish_scores_dish_id_trait_id_key" ON "public"."dish_scores"("dish_id", "trait_id");

-- CreateIndex
CREATE INDEX "visit_histories_created_at_idx" ON "public"."visit_histories"("created_at");

-- CreateIndex
CREATE INDEX "users_last_login_idx" ON "public"."users"("last_login");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_organization_id_key" ON "public"."users"("username", "organization_id");

-- CreateIndex
CREATE UNIQUE INDEX "organizations_name_key" ON "public"."organizations"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_restaurant_tagging_AB_unique" ON "public"."_restaurant_tagging"("A", "B");

-- CreateIndex
CREATE INDEX "_restaurant_tagging_B_index" ON "public"."_restaurant_tagging"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_dish_tagging_AB_unique" ON "public"."_dish_tagging"("A", "B");

-- CreateIndex
CREATE INDEX "_dish_tagging_B_index" ON "public"."_dish_tagging"("B");

-- AddForeignKey
ALTER TABLE "public"."restaurant_opens" ADD CONSTRAINT "restaurant_opens_week_type_id_fkey" FOREIGN KEY ("week_type_id") REFERENCES "public"."week_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."restaurant_opens" ADD CONSTRAINT "restaurant_opens_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "public"."restaurants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."routes" ADD CONSTRAINT "routes_route_type_id_fkey" FOREIGN KEY ("route_type_id") REFERENCES "public"."route_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."routes" ADD CONSTRAINT "routes_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "public"."restaurants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."payments" ADD CONSTRAINT "payments_payment_type_id_fkey" FOREIGN KEY ("payment_type_id") REFERENCES "public"."payment_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."payments" ADD CONSTRAINT "payments_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "public"."restaurants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."dishes" ADD CONSTRAINT "dishes_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "public"."restaurants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."dish_scores" ADD CONSTRAINT "dish_scores_dish_id_fkey" FOREIGN KEY ("dish_id") REFERENCES "public"."dishes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."dish_scores" ADD CONSTRAINT "dish_scores_trait_id_fkey" FOREIGN KEY ("trait_id") REFERENCES "public"."dish_traits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."visit_histories" ADD CONSTRAINT "visit_histories_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."visit_histories" ADD CONSTRAINT "visit_histories_dish_id_fkey" FOREIGN KEY ("dish_id") REFERENCES "public"."dishes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."users" ADD CONSTRAINT "users_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_restaurant_tagging" ADD CONSTRAINT "_restaurant_tagging_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."restaurants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_restaurant_tagging" ADD CONSTRAINT "_restaurant_tagging_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."restaurant_tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_dish_tagging" ADD CONSTRAINT "_dish_tagging_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."dishes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_dish_tagging" ADD CONSTRAINT "_dish_tagging_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."dish_tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
