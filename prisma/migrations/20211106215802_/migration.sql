-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(200) NOT NULL,
    `price` INTEGER NOT NULL,
    `zipcode` VARCHAR(12) NOT NULL,
    `seller` VARCHAR(191) NOT NULL,
    `thumbnailHd` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Buy` (
    `purchase_id` INTEGER NOT NULL AUTO_INCREMENT,
    `client_id` INTEGER NOT NULL,
    `client_name` VARCHAR(191) NOT NULL,
    `total_to_pay` INTEGER NOT NULL,

    PRIMARY KEY (`purchase_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `History` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `client_id` INTEGER NOT NULL,
    `buyId` INTEGER NULL,
    `value` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `card_number` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Card` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `card_number` VARCHAR(191) NOT NULL,
    `card_holder_name` VARCHAR(191) NOT NULL,
    `value` INTEGER NOT NULL,
    `cvv` INTEGER NOT NULL,
    `buyId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `History` ADD CONSTRAINT `History_buyId_fkey` FOREIGN KEY (`buyId`) REFERENCES `Buy`(`purchase_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Card` ADD CONSTRAINT `Card_buyId_fkey` FOREIGN KEY (`buyId`) REFERENCES `Buy`(`purchase_id`) ON DELETE SET NULL ON UPDATE CASCADE;
